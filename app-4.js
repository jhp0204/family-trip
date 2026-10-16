var gmPromise = null, gmKeyLoaded = "", gmAuthFailed = !1, gmFailListeners = /* @__PURE__ */ new Set();
function loadGoogleMaps(key) {
  return gmAuthFailed ? Promise.reject(new Error("auth")) : gmPromise && gmKeyLoaded === key ? gmPromise : gmKeyLoaded && gmKeyLoaded !== key ? Promise.reject(new Error("reload")) : (gmKeyLoaded = key, gmPromise = new Promise((res, rej) => {
    window.__jtGmReady = () => res(window.google.maps), window.gm_authFailure = () => {
      gmAuthFailed = !0, gmFailListeners.forEach((f) => f()), rej(new Error("auth"));
    };
    let sc = document.createElement("script");
    sc.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(key) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", sc.async = !0, sc.onerror = () => {
      gmPromise = null, gmKeyLoaded = "", rej(new Error("load"));
    }, document.head.appendChild(sc);
  }), gmPromise);
}
function GMap(props) {
  let { view, setView, pins, temp, selectedId, onTap, onPinTap, onPoi, gkey } = props, box = useRef(null), mapRef = useRef(null), gmRef = useRef(null), marks = useRef([]), tempMark = useRef(null), cb = useRef({});
  cb.current = { onTap, onPinTap, onPoi, setView };
  let [state, setState] = useState(gmAuthFailed ? "fail" : "loading");
  useEffect(() => {
    let alive = !0, onFail = () => alive && setState("fail");
    return gmFailListeners.add(onFail), loadGoogleMaps(gkey).then(async (gm) => {
      let { Map: Map2 } = await gm.importLibrary("maps"), { Marker } = await gm.importLibrary("marker"), { Size, Point } = await gm.importLibrary("core");
      if (!alive || !box.current) return;
      gmRef.current = { Marker, Size, Point };
      let map = new Map2(box.current, {
        center: { lat: view.lat, lng: view.lng },
        zoom: Math.round(view.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      map.addListener("click", async (e) => {
        if (e.placeId) {
          e.stop();
          try {
            let { Place } = await gm.importLibrary("places"), pl = new Place({ id: e.placeId });
            await pl.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), cb.current.onPoi({
              name: pl.displayName || "",
              lat: pl.location.lat(),
              lng: pl.location.lng(),
              area: pl.formattedAddress || "",
              link: pl.googleMapsURI || "",
              placeId: e.placeId
            });
            return;
          } catch {
          }
        }
        cb.current.onTap(e.latLng.lat(), e.latLng.lng());
      }), map.addListener("idle", () => {
        let c = map.getCenter();
        cb.current.setView({ lat: c.lat(), lng: c.lng(), z: map.getZoom() });
      }), mapRef.current = map, setState("ok");
    }).catch(() => alive && setState("fail")), () => {
      alive = !1, gmFailListeners.delete(onFail);
    };
  }, [gkey]), useEffect(() => {
    let map = mapRef.current;
    if (!map) return;
    let c = map.getCenter();
    (Math.abs(c.lat() - view.lat) > 1e-6 || Math.abs(c.lng() - view.lng) > 1e-6) && map.panTo({ lat: view.lat, lng: view.lng }), Math.round(view.z) !== map.getZoom() && map.setZoom(Math.round(view.z));
  }, [view.lat, view.lng, view.z]);
  let icon = (color, big, text) => {
    let gm = gmRef.current, w = big ? 34 : 28, h = big ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(pinSvg(color, big, text).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new gm.Size(w, h),
      anchor: new gm.Point(w / 2, h)
    };
  };
  return useEffect(() => {
    let map = mapRef.current, gm = gmRef.current;
    !map || !gm || (marks.current.forEach((m) => m.setMap(null)), marks.current = pins.map((p) => {
      let m = new gm.Marker({ position: { lat: p.lat, lng: p.lng }, map, title: p.label, icon: icon(p.color, p.id === selectedId, p.text), zIndex: p.id === selectedId ? 10 : 1 });
      return m.addListener("click", () => cb.current.onPinTap(p.id)), m;
    }));
  }, [pins, selectedId, state]), useEffect(() => {
    let map = mapRef.current, gm = gmRef.current;
    tempMark.current && tempMark.current.setMap(null), tempMark.current = null, !(!map || !gm || !temp) && (tempMark.current = new gm.Marker({ position: { lat: temp.lat, lng: temp.lng }, map, icon: icon("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [temp, state]), state === "fail" ? /* @__PURE__ */ jsx(KoMap, { ...props }) : /* @__PURE__ */ jsxs("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ jsx("div", { ref: box, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    state === "loading" && /* @__PURE__ */ jsx("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function TripMap(props) {
  return props.gkey && !gmAuthFailed ? /* @__PURE__ */ jsx(GMap, { ...props }) : /* @__PURE__ */ jsx(KoMap, { ...props });
}
var NEAR_CATS = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], RADII = [500, 1e3, 2e3], radText = (r) => r >= 1e3 ? r / 1e3 + "km" : r + "m";
function distM(a, b) {
  let t = (x) => x * Math.PI / 180, dLat = t(b.lat - a.lat), dLng = t(b.lng - a.lng), h = Math.sin(dLat / 2) ** 2 + Math.cos(t(a.lat)) * Math.cos(t(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(h));
}
var distText = (m) => (m < 1e3 ? `${Math.round(m / 10) * 10}m` : `${(m / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(m / 75))}분`;
async function nearbyGoogle(key, center, cat, radius) {
  let gm = await loadGoogleMaps(key), { Place, SearchNearbyRankPreference } = await gm.importLibrary("places"), { places } = await Place.searchNearby({
    fields: [
      "id",
      "displayName",
      "location",
      "formattedAddress",
      "rating",
      "userRatingCount",
      "primaryTypeDisplayName",
      "googleMapsURI",
      "regularOpeningHours",
      "utcOffsetMinutes"
    ],
    locationRestriction: { center, radius },
    includedTypes: cat.g,
    maxResultCount: 15,
    rankPreference: SearchNearbyRankPreference.POPULARITY,
    language: "ko"
  }), out = [];
  for (let p of places || []) {
    let open;
    try {
      open = p.regularOpeningHours ? await p.isOpen() : void 0;
    } catch {
      open = void 0;
    }
    out.push({
      id: p.id,
      placeId: p.id,
      name: p.displayName,
      lat: p.location.lat(),
      lng: p.location.lng(),
      type: p.primaryTypeDisplayName || cat.label,
      rating: p.rating,
      count: p.userRatingCount,
      addr: p.formattedAddress || "",
      url: p.googleMapsURI || "",
      open
    });
  }
  return out;
}
async function nearbyOsm(center, cat, radius) {
  let q = `[out:json][timeout:20];nwr(around:${radius},${center.lat},${center.lng})${cat.osm}["name"];out center 40;`, r = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(q));
  if (!r.ok) throw new Error("osm");
  return ((await r.json()).elements || []).map((e) => {
    let t = e.tags || {}, nice = t["name:ko"] || t["name:en"] || "";
    return {
      id: "osm" + e.type + e.id,
      name: nice || t.name,
      sub: nice && t.name && t.name !== nice ? t.name : "",
      lat: e.lat != null ? e.lat : e.center && e.center.lat,
      lng: e.lon != null ? e.lon : e.center && e.center.lon,
      type: cat.label,
      addr: ""
    };
  }).filter((x) => x.lat && x.name);
}
async function placeSearchDetailed(text, gkey, bias) {
  let center = bias || { lat: WEATHER_SPOT.lat, lng: WEATHER_SPOT.lng }, gErr = "";
  if (gkey && !gmAuthFailed)
    try {
      let gm = await loadGoogleMaps(gkey), { Place } = await gm.importLibrary("places"), search = Place.searchByText || Place.searchText, { places } = await search.call(Place, {
        textQuery: text,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: center
      });
      return { list: (places || []).map((pl) => ({
        name: pl.displayName,
        area: pl.formattedAddress || "",
        lat: pl.location.lat(),
        lng: pl.location.lng(),
        link: pl.googleMapsURI || "",
        placeId: pl.id
      })), engine: "google", gErr: "" };
    } catch (e) {
      gErr = String(e && (e.message || e.code) || e || "error");
    }
  else gkey && gmAuthFailed && (gErr = "auth");
  let r = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(text)
  );
  if (!r.ok) throw new Error("search");
  return { list: (await r.json()).map((d) => {
    let parts = String(d.display_name || "").split(",").map((x) => x.trim());
    return { name: d.name || parts[0] || text, area: parts.slice(1, 3).join(" "), lat: Number(d.lat), lng: Number(d.lon), link: "" };
  }), engine: "osm", gErr };
}
async function placeSearch(text, gkey, bias) {
  return (await placeSearchDetailed(text, gkey, bias)).list;
}
function NearbyTab({ settings, wish, onSave }) {
  let [cat, setCat] = useState(NEAR_CATS[0]), [radius, setRadius] = useState(1e3), [pos, setPos] = useState(null), [posMsg, setPosMsg] = useState(""), [list, setList] = useState([]), [busy, setBusy] = useState(!1), [msg, setMsg] = useState(""), [src, setSrc] = useState(""), [savedNow, setSavedNow] = useState({}), fallback = () => {
    setPos({ lat: WEATHER_SPOT.lat, lng: WEATHER_SPOT.lng, here: !1, at: Date.now() }), setPosMsg("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, locate = () => {
    if (setPosMsg("현재 위치를 찾는 중"), !navigator.geolocation) return fallback();
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos({ lat: p.coords.latitude, lng: p.coords.longitude, here: !0, at: Date.now() }), setPosMsg("");
      },
      fallback,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  useEffect(() => {
    locate();
  }, []), useEffect(() => {
    if (!pos) return;
    let alive = !0;
    return (async () => {
      setBusy(!0), setMsg("");
      let res = null, from = "";
      if (settings.gmapsKey && !gmAuthFailed)
        try {
          res = await nearbyGoogle(settings.gmapsKey, { lat: pos.lat, lng: pos.lng }, cat, radius), from = "google";
        } catch {
          res = null;
        }
      if (!res)
        try {
          res = await nearbyOsm(pos, cat, radius), from = "osm";
        } catch {
          alive && (setList([]), setMsg("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), setBusy(!1));
          return;
        }
      res.forEach((x) => x.dist = distM(pos, x)), from === "osm" && res.sort((a, b) => a.dist - b.dist), alive && (setList(res.slice(0, 20)), setSrc(from), setBusy(!1), res.length || setMsg(`반경 ${radText(radius)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      alive = !1;
    };
  }, [pos, cat, radius, settings.gmapsKey]);
  let isSaved = (x) => savedNow[x.id] || wish.some((w) => x.placeId && w.placeId === x.placeId || w.name === x.name && hasPos(w) && Math.abs(w.lat - x.lat) < 5e-4);
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx(LocateFixed, { size: 15 }),
        pos ? pos.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        radText(radius)
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary sm", onClick: locate, children: "위치 다시 찾기" })
    ] }),
    posMsg && /* @__PURE__ */ jsx("p", { className: "jt-hint jt-near-msg", children: posMsg }),
    /* @__PURE__ */ jsx("div", { className: "jt-chips jt-filter", children: NEAR_CATS.map((c) => /* @__PURE__ */ jsx("button", { type: "button", className: "jt-chip" + (cat.id === c.id ? " on" : ""), onClick: () => setCat(c), children: c.label }, c.id)) }),
    /* @__PURE__ */ jsx("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: RADII.map((r) => /* @__PURE__ */ jsx("button", { role: "tab", "aria-selected": radius === r, className: radius === r ? "on" : "", onClick: () => setRadius(r), children: radText(r) }, r)) }),
    busy && /* @__PURE__ */ jsxs("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      cat.label,
      " 찾는 중"
    ] }),
    !busy && msg && /* @__PURE__ */ jsx("div", { className: "jt-empty", children: /* @__PURE__ */ jsx("p", { children: msg }) }),
    !busy && list.length > 0 && /* @__PURE__ */ jsx("ul", { className: "jt-near-list", children: list.map((x) => {
      let saved = isSaved(x);
      return /* @__PURE__ */ jsxs("li", { className: "jt-near", children: [
        /* @__PURE__ */ jsxs("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ jsx("strong", { children: x.name }),
          x.sub && /* @__PURE__ */ jsx("span", { className: "jt-near-sub", children: x.sub }),
          /* @__PURE__ */ jsxs("div", { className: "jt-near-meta", children: [
            x.rating != null && /* @__PURE__ */ jsxs("span", { className: "jt-star", children: [
              /* @__PURE__ */ jsx(Star, { size: 13, fill: "currentColor" }),
              x.rating.toFixed(1),
              x.count ? /* @__PURE__ */ jsxs("em", { children: [
                "(",
                x.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ jsx("span", { children: x.type }),
            x.open === !0 && /* @__PURE__ */ jsx("span", { className: "jt-open", children: "영업 중" }),
            x.open === !1 && /* @__PURE__ */ jsx("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ jsx(Navigation, { size: 12 }),
            distText(x.dist)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "jt-near-act", children: [
          saved ? /* @__PURE__ */ jsxs("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ jsx(Check, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                onSave({
                  name: x.name,
                  cat: cat.wish,
                  area: x.addr || x.sub || "",
                  link: x.url || "",
                  memo: x.rating != null ? `구글 평점 ${x.rating.toFixed(1)}${x.count ? ` (${x.count}명)` : ""}` : "",
                  lat: x.lat,
                  lng: x.lng,
                  ...x.placeId ? { placeId: x.placeId } : {}
                }), setSavedNow({ ...savedNow, [x.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: x.url || mapUrl({ lat: x.lat, lng: x.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ jsx(ExternalLink, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ jsxs("a", { className: "jt-maplink route", href: hereRouteUrl(x), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ jsx(Navigation, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, x.id);
    }) }),
    src && list.length > 0 && /* @__PURE__ */ jsx("p", { className: "jt-near-src", children: src === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function WishMap({ settings, wish, plan, me, onSave, onEdit, onLike, onPlan, onDelete, onComment, onDelComment, onReact }) {
  let pinned = wish.filter(hasPos), [view, setView] = useState(
    () => pinned.length ? {
      lat: pinned.reduce((s, w) => s + w.lat, 0) / pinned.length,
      lng: pinned.reduce((s, w) => s + w.lng, 0) / pinned.length,
      z: pinned.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [temp, setTemp] = useState(null), [sel, setSel] = useState(null), [q, setQ] = useState(""), [results, setResults] = useState([]), [busy, setBusy] = useState(!1), [msg, setMsg] = useState(""), selected = wish.find((w) => w.id === sel), pinKey = pinned.map((w) => `${w.id}:${w.lat}:${w.lng}:${w.cat}`).join("|"), pinsMemo = useMemo(
    () => pinned.map((w) => ({
      id: w.id,
      lat: w.lat,
      lng: w.lng,
      color: WISH_TONE[w.cat] || WISH_TONE.기타,
      label: w.name
    })),
    [pinKey]
  ), search = async () => {
    let text = q.trim();
    if (text) {
      setBusy(!0), setMsg(""), setResults([]);
      try {
        let res = await placeSearch(text, settings.gmapsKey, { lat: view.lat, lng: view.lng });
        res.length || setMsg("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), setResults(res);
      } catch {
        setMsg("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      setBusy(!1);
    }
  }, pick = (r) => {
    setView({ lat: r.lat, lng: r.lng, z: 16 }), setSel(null), setTemp({ lat: r.lat, lng: r.lng, name: r.name, cat: "맛집", area: r.area, link: r.link || "", placeId: r.placeId }), setResults([]);
  }, liked = selected && selected.likes.includes(me);
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: q,
          onChange: (e) => setQ(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && search(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary", onClick: search, disabled: busy, children: busy ? "검색 중" : "검색" })
    ] }),
    msg && /* @__PURE__ */ jsx("p", { className: "jt-hint jt-mapmsg", children: msg }),
    results.length > 0 && /* @__PURE__ */ jsx("ul", { className: "jt-results", children: results.map((r, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => pick(r), children: [
      /* @__PURE__ */ jsx("strong", { children: r.name }),
      /* @__PURE__ */ jsx("span", { children: r.area })
    ] }) }, i)) }),
    /* @__PURE__ */ jsx(
      TripMap,
      {
        gkey: settings.gmapsKey,
        onPoi: (poi) => {
          setSel(null), setTemp({ ...poi, cat: "맛집" });
        },
        view,
        setView,
        pins: pinsMemo,
        temp,
        selectedId: sel,
        onTap: (lat, lng) => {
          setSel(null), setTemp({ lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (id) => {
          setTemp(null), setSel(id);
        }
      }
    ),
    !temp && !selected && /* @__PURE__ */ jsxs("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      pinned.length,
      "개예요."
    ] }),
    temp && /* @__PURE__ */ jsxs("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ jsx("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: temp.name,
          onChange: (e) => setTemp({ ...temp, name: e.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "jt-chips", children: WISH_CATS.map((c) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "jt-chip" + (temp.cat === c ? " on" : ""),
          onClick: () => setTemp({ ...temp, cat: c }),
          children: c
        },
        c
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "jt-inline", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !temp.name.trim(),
            onClick: () => {
              onSave({
                name: temp.name.trim(),
                cat: temp.cat,
                area: temp.area || "",
                link: temp.link || "",
                memo: "",
                lat: temp.lat,
                lng: temp.lng,
                ...temp.placeId ? { placeId: temp.placeId } : {}
              }), setTemp(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary", onClick: () => setTemp(null), children: "취소" })
      ] })
    ] }),
    selected && /* @__PURE__ */ jsxs("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ jsx("span", { className: "jt-tag", style: { background: WISH_TONE[selected.cat] || WISH_TONE.기타 }, children: selected.cat }),
        /* @__PURE__ */ jsx("strong", { children: selected.name }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => onEdit(selected), "aria-label": `${selected.name} 수정`, children: /* @__PURE__ */ jsx(Pencil, { size: 16 }) })
      ] }),
      selected.area && /* @__PURE__ */ jsxs("div", { className: "jt-meta", children: [
        /* @__PURE__ */ jsx(MapPin, { size: 13 }),
        selected.area
      ] }),
      selected.memo && /* @__PURE__ */ jsx("div", { className: "jt-memo", children: selected.memo }),
      /* @__PURE__ */ jsxs("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ jsxs(
          HoldButton,
          {
            className: "jt-like" + (liked ? " on" : ""),
            onTap: () => onLike(selected.id),
            names: selected.likes,
            members: settings.members,
            title: "가고 싶어요",
            "aria-pressed": liked,
            "aria-label": `가고 싶어요 ${selected.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ jsx(Heart, { size: 16, fill: liked ? "currentColor" : "none" }),
              "가고 싶어요 ",
              selected.likes.length
            ]
          }
        ),
        /* @__PURE__ */ jsx(Reactions, { item: selected, me, members: settings.members, onReact: (e) => onReact(selected.id, e) }),
        plannedDay(selected, plan) != null ? /* @__PURE__ */ jsxs("span", { className: "jt-planned", style: { color: LINE[plannedDay(selected, plan) % LINE.length] }, children: [
          plannedDay(selected, plan) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary sm", onClick: () => onPlan(selected), children: "일정에 넣기" }),
        /* @__PURE__ */ jsxs("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ jsx(Avatar, { name: selected.by, members: settings.members, size: 16 }),
          selected.by
        ] }),
        /* @__PURE__ */ jsx(
          DeleteButton,
          {
            onConfirm: () => {
              onDelete(selected.id), setSel(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: mapUrl(selected), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(ExternalLink, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ jsxs("a", { className: "jt-maplink route", href: hereRouteUrl(selected), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(Navigation, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        CommentBox,
        {
          comments: selected.comments || [],
          me,
          members: settings.members,
          onAdd: (t) => onComment(selected.id, t),
          onDelete: (cid) => onDelComment(selected.id, cid)
        }
      )
    ] })
  ] });
}
function WishTab(props) {
  let [own, setOwn] = useState("list"), view = props.view || own, setView = props.setView || setOwn;
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([id, label]) => /* @__PURE__ */ jsx("button", { role: "tab", "aria-selected": view === id, className: view === id ? "on" : "", onClick: () => setView(id), children: label }, id)) }),
    view === "list" && /* @__PURE__ */ jsx(WishList, { ...props }),
    view === "map" && /* @__PURE__ */ jsx(WishMap, { ...props }),
    view === "near" && /* @__PURE__ */ jsx(NearbyTab, { ...props })
  ] });
}
function WishList({ settings, wish, plan, me, onBatchPos, onEdit, onLike, onPlan, onDelete, onComment, onDelComment, onReact }) {
  let [cOpen, setCOpen] = useState(null), [fold, toggleFold, setFoldAll] = useFold(), [here, hereErr] = useHere(), [filter, setFilter] = useState("전체"), [pf, setPf] = useState("all"), [author, setAuthor] = useState("all"), inPlan = (w) => plannedDay(w, plan) != null, byCat = wish.filter((w) => (filter === "전체" || w.cat === filter) && (author === "all" || w.by === author)), pcount = { all: byCat.length, in: byCat.filter(inPlan).length, out: byCat.filter((w) => !inPlan(w)).length }, [open, setOpen] = useState(null), list = byCat.filter((w) => pf === "all" || (pf === "in" ? inPlan(w) : !inPlan(w))).sort((a, b) => b.likes.length - a.likes.length || b.createdAt - a.createdAt);
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx("div", { className: "jt-chips jt-filter", children: ["전체", ...WISH_CATS].map((c) => /* @__PURE__ */ jsx("button", { className: "jt-chip" + (filter === c ? " on" : ""), onClick: () => setFilter(c), children: c }, c)) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ jsxs("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ jsx("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ jsxs("select", { value: pf, onChange: (e) => setPf(e.target.value), children: [
          /* @__PURE__ */ jsxs("option", { value: "all", children: [
            "전체 (",
            pcount.all,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("option", { value: "in", children: [
            "일정 반영 (",
            pcount.in,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("option", { value: "out", children: [
            "미반영 (",
            pcount.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsx(ChevronDown, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ jsx("span", { className: "jt-sr", children: "작성자" }),
        /* @__PURE__ */ jsxs("select", { value: author, onChange: (e) => setAuthor(e.target.value), children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "작성자 전체" }),
          settings.members.map((m) => /* @__PURE__ */ jsxs("option", { value: m, children: [
            m,
            " (",
            wish.filter((w) => w.by === m).length,
            ")"
          ] }, m))
        ] }),
        /* @__PURE__ */ jsx(ChevronDown, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsx(FoldAll, { ids: list.map((w) => w.id), open: fold, setAll: setFoldAll })
    ] }),
    list.length === 0 && /* @__PURE__ */ jsx("div", { className: "jt-empty", children: wish.length === 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ jsx("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ jsx("p", { children: author !== "all" ? `${author}이(가) 올린 곳 중 조건에 맞는 곳이 없어요.` : pf === "in" ? "일정에 반영된 곳이 없어요." : pf === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    !here && hereErr && wish.some(hasPos) && /* @__PURE__ */ jsx("p", { className: "jt-warn-inline jt-here-err", children: hereErr === "denied" ? "위치 권한이 꺼져 있어 거리를 표시하지 못해요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "지금 위치를 확인하지 못해 거리를 표시하지 못해요. 잠시 후 다시 시도할게요." }),
    /* @__PURE__ */ jsx("ul", { className: "jt-list", children: list.map((w) => {
      let liked = w.likes.includes(me), pd = plannedDay(w, plan);
      return /* @__PURE__ */ jsxs("li", { className: "jt-wish" + (fold[w.id] ? " open" : ""), children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-fold-head", onClick: () => toggleFold(w.id), "aria-expanded": !!fold[w.id], children: [
          /* @__PURE__ */ jsx("span", { className: "jt-tag", style: { background: WISH_TONE[w.cat] || WISH_TONE.기타 }, children: w.cat }),
          /* @__PURE__ */ jsx("strong", { className: "jt-fold-name", children: w.name }),
          !hasPos(w) && /* @__PURE__ */ jsx("span", { className: "jt-dist none", children: "위치 없음" }),
          here && hasPos(w) && (() => {
            let m = distM(here, w);
            return /* @__PURE__ */ jsx("span", { className: "jt-dist " + distTone(m), "aria-label": `지금 위치에서 ${distShort(m)}`, children: distShort(m) });
          })(),
          pd != null && /* @__PURE__ */ jsxs("span", { className: "jt-daybadge", style: { background: LINE[pd % LINE.length] }, children: [
            pd + 1,
            "일차"
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        fold[w.id] && /* @__PURE__ */ jsxs("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ jsx("div", { className: "jt-fold-tools", children: /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => onEdit(w), children: [
            /* @__PURE__ */ jsx(Pencil, { size: 14 }),
            "수정"
          ] }) }),
          w.area && /* @__PURE__ */ jsxs("div", { className: "jt-meta", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 13 }),
            w.area
          ] }),
          w.memo && /* @__PURE__ */ jsx("div", { className: "jt-memo", children: w.memo }),
          /* @__PURE__ */ jsxs("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: mapUrl(w), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ jsx(ExternalLink, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "jt-maplink route", href: hereRouteUrl(w), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ jsx(Navigation, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => setOpen(open === w.id ? null : w.id),
                "aria-expanded": open === w.id,
                children: [
                  /* @__PURE__ */ jsx(MapIcon, { size: 14 }),
                  open === w.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          open === w.id && /* @__PURE__ */ jsxs("div", { className: "jt-embed", children: [
            /* @__PURE__ */ jsx(
              "iframe",
              {
                title: `${w.name} 지도`,
                src: embedUrl(w),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ jsx("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ jsxs(
              HoldButton,
              {
                className: "jt-like" + (liked ? " on" : ""),
                onTap: () => onLike(w.id),
                names: w.likes,
                members: settings.members,
                title: "가고 싶어요",
                "aria-pressed": liked,
                "aria-label": `가고 싶어요 ${w.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ jsx(Heart, { size: 16, fill: liked ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  w.likes.length
                ]
              }
            ),
            /* @__PURE__ */ jsx(Reactions, { item: w, me, members: settings.members, onReact: (e) => onReact(w.id, e) }),
            pd != null ? /* @__PURE__ */ jsxs("span", { className: "jt-planned", style: { color: LINE[pd % LINE.length] }, children: [
              pd + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ jsx("button", { className: "jt-secondary sm", onClick: () => onPlan(w), children: "일정에 넣기" }),
            /* @__PURE__ */ jsx(
              CommentButton,
              {
                count: (w.comments || []).length,
                open: cOpen === w.id,
                onClick: () => setCOpen(cOpen === w.id ? null : w.id)
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ jsx(Avatar, { name: w.by, members: settings.members, size: 16 }),
              w.by
            ] }),
            /* @__PURE__ */ jsx(DeleteButton, { onConfirm: () => onDelete(w.id), label: "" })
          ] }),
          cOpen === w.id && /* @__PURE__ */ jsx(
            CommentBox,
            {
              comments: w.comments || [],
              me,
              members: settings.members,
              onAdd: (t) => onComment(w.id, t),
              onDelete: (cid) => onDelComment(w.id, cid)
            }
          )
        ] })
      ] }, w.id);
    }) })
  ] });
}
