function PlanTab({ settings, schedule, day, setDay, onEdit, onAddAt, me, onComment, onDelComment, onReact }) {
  let [fold, toggleFold, setFoldAll] = useFold(), [cOpen, setCOpen] = useState(null), { start, days, members } = settings, color = LINE[day % LINE.length], items = schedule.filter((i) => i.day === day).sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99")), clash = overlapIds(items), dateKey = iso(addDays(start, day)), isToday = dateKey === iso(/* @__PURE__ */ new Date()), w = useWeather(start, days);
  return /* @__PURE__ */ jsxs("section", { style: { "--lc": color }, children: [
    /* @__PURE__ */ jsx("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: days }, (_, i) => {
      let d = addDays(start, i), active = i === day, n = schedule.filter((x) => x.day === i).length, today = iso(d) === iso(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ jsxs(
        "button",
        {
          role: "tab",
          "aria-selected": active,
          "aria-label": `DAY ${i + 1}, ${d.getMonth() + 1}월 ${d.getDate()}일 ${wk(d)}요일, 일정 ${n}개`,
          className: "jt-day" + (active ? " active" : ""),
          style: { "--lc": LINE[i % LINE.length] },
          onClick: () => setDay(i),
          children: [
            /* @__PURE__ */ jsxs("span", { className: "jt-day-no", children: [
              "DAY ",
              i + 1
            ] }),
            today && /* @__PURE__ */ jsx("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ jsxs("span", { className: "jt-day-date", children: [
              md(d),
              " ",
              /* @__PURE__ */ jsx("em", { children: wk(d) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "jt-day-count", children: n ? `일정 ${n}개` : "일정 없음" })
          ]
        },
        i
      );
    }) }),
    /* @__PURE__ */ jsx(WeatherCard, { date: dateKey, w }),
    items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "jt-empty", children: [
      /* @__PURE__ */ jsx("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ jsx("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(FoldAll, { ids: items.map((i) => i.id), open: fold, setAll: setFoldAll }),
      /* @__PURE__ */ jsx("ol", { className: "jt-line", children: items.map((i, idx) => {
        let sp = i.time ? span(i) : null, next = items[idx + 1], canRoute = next && placeOf(next);
        return /* @__PURE__ */ jsxs("li", { className: "jt-row", children: [
          /* @__PURE__ */ jsx("div", { className: "jt-time", children: i.time || "미정" }),
          /* @__PURE__ */ jsx("div", { className: "jt-rail", children: /* @__PURE__ */ jsx("span", { className: "jt-node" }) }),
          /* @__PURE__ */ jsxs("div", { className: "jt-card" + (fold[i.id] ? " open" : ""), children: [
            /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-fold-head", onClick: () => toggleFold(i.id), "aria-expanded": !!fold[i.id], children: [
              /* @__PURE__ */ jsx("span", { className: "jt-card-title", children: i.title }),
              /* @__PURE__ */ jsx(ChevronDown, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            fold[i.id] && /* @__PURE__ */ jsxs("div", { className: "jt-fold-body", children: [
              i.time && w.status === "ok" && /* @__PURE__ */ jsx("div", { className: "jt-fold-wx", children: /* @__PURE__ */ jsx(HourChip, { v: w.hourly[`${dateKey}T${i.time.slice(0, 2)}`] }) }),
              sp && i.end && /* @__PURE__ */ jsxs("div", { className: "jt-meta", children: [
                i.time,
                "~",
                i.end,
                ", ",
                durText(sp.e - sp.s)
              ] }),
              clash.has(i.id) && /* @__PURE__ */ jsx("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              i.place && /* @__PURE__ */ jsxs("div", { className: "jt-meta", children: [
                /* @__PURE__ */ jsx(MapPin, { size: 13 }),
                i.place
              ] }),
              i.memo && /* @__PURE__ */ jsx("div", { className: "jt-memo", children: i.memo }),
              (i.place || i.link || hasPos(i)) && /* @__PURE__ */ jsxs("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: mapUrl(i), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ jsx(ExternalLink, { size: 14 }),
                  "구글맵"
                ] }),
                (i.place || hasPos(i)) && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: hereRouteUrl(hasPos(i) ? i : { name: i.place, placeId: i.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ jsx(Navigation, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              canRoute && /* @__PURE__ */ jsxs(
                "a",
                {
                  className: "jt-next",
                  href: routeUrl(i, next),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ jsx(Navigation, { size: 14 }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ jsx("b", { children: next.title }),
                      "까지 길 찾기",
                      placeOf(i) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ jsxs("div", { className: "jt-by", children: [
                  /* @__PURE__ */ jsx(Avatar, { name: i.by, members, size: 16 }),
                  i.by
                ] }),
                /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => onEdit(i), children: [
                  /* @__PURE__ */ jsx(Pencil, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ jsx(Reactions, { item: i, me, members, onReact: (e) => onReact(i.id, e) }),
                /* @__PURE__ */ jsx(
                  CommentButton,
                  {
                    count: (i.comments || []).length,
                    open: cOpen === i.id,
                    onClick: () => setCOpen(cOpen === i.id ? null : i.id)
                  }
                )
              ] }),
              cOpen === i.id && /* @__PURE__ */ jsx(
                CommentBox,
                {
                  comments: i.comments || [],
                  me,
                  members,
                  onAdd: (t) => onComment(i.id, t),
                  onDelete: (cid) => onDelComment(i.id, cid)
                }
              )
            ] })
          ] })
        ] }, i.id);
      }) })
    ] }),
    /* @__PURE__ */ jsx(Timetable, { items, isToday, onEdit, members, onAddAt: (t, e) => onAddAt && onAddAt(day, t, e) })
  ] });
}
function TileMap({ view, setView, pins, temp, selectedId, onTap, onPinTap }) {
  let box = useRef(null), [size, setSize] = useState({ w: 0, h: 0 }), ptrs = useRef(/* @__PURE__ */ new Map()), drag = useRef({ moved: !1, startDist: 0 }), lastWheel = useRef(0), [stat, setStat] = useState({ ok: 0, bad: 0 });
  useEffect(() => {
    let el = box.current;
    if (!el) return;
    let update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    let ro = new ResizeObserver(update);
    return ro.observe(el), () => ro.disconnect();
  }, []);
  let z = view.z, c = worldPx(view.lat, view.lng, z), tlx = c.x - size.w / 2, tly = c.y - size.h / 2, n = 2 ** z, tiles = [];
  if (size.w) {
    let x0 = Math.floor(tlx / TILE), x1 = Math.floor((tlx + size.w) / TILE), y0 = Math.max(0, Math.floor(tly / TILE)), y1 = Math.min(n - 1, Math.floor((tly + size.h) / TILE));
    for (let x = x0; x <= x1; x++)
      for (let y = y0; y <= y1; y++) {
        let wx = (x % n + n) % n;
        tiles.push(
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `https://tile.openstreetmap.org/${z}/${wx}/${y}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => setStat((s) => s.ok ? s : { ...s, ok: 1 }),
              onError: () => setStat((s) => s.bad ? s : { ...s, bad: 1 }),
              style: { left: Math.round(x * TILE - tlx), top: Math.round(y * TILE - tly) }
            },
            `${z}/${x}/${y}`
          )
        );
      }
  }
  let down = (e) => {
    if (!e.target.closest("[data-pin],.jt-zoom,.jt-attr") && (box.current.setPointerCapture(e.pointerId), ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY }), ptrs.current.size === 1 && (drag.current = { moved: !1, startDist: 0 }), ptrs.current.size === 2)) {
      let [a, b] = [...ptrs.current.values()];
      drag.current.startDist = Math.hypot(a.x - b.x, a.y - b.y), drag.current.moved = !0;
    }
  }, move = (e) => {
    let p = ptrs.current.get(e.pointerId);
    if (!p) return;
    let dx = e.clientX - p.x, dy = e.clientY - p.y;
    if (ptrs.current.size === 1) {
      if (!drag.current.moved && Math.hypot(dx, dy) < 4) return;
      drag.current.moved = !0, ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY }), setView((v) => {
        let cc = worldPx(v.lat, v.lng, v.z), next = fromWorld(cc.x - dx, cc.y - dy, v.z);
        return { ...v, lat: Math.max(-80, Math.min(80, next.lat)), lng: next.lng };
      });
    } else
      ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  }, up = (e) => {
    let p = ptrs.current.get(e.pointerId);
    if (!p) return;
    let wasSingle = ptrs.current.size === 1;
    if (ptrs.current.delete(e.pointerId), drag.current.startDist && ptrs.current.size === 1) {
      let [r] = [...ptrs.current.values()], ratio = Math.hypot(p.x - r.x, p.y - r.y) / drag.current.startDist;
      ratio > 1.35 ? setView((v) => ({ ...v, z: clampZ(v.z + (ratio > 2.6 ? 2 : 1)) })) : ratio < 0.7 && setView((v) => ({ ...v, z: clampZ(v.z - (ratio < 0.38 ? 2 : 1)) })), drag.current.startDist = 0;
    }
    if (wasSingle && !drag.current.moved && e.type === "pointerup") {
      let rect = box.current.getBoundingClientRect(), pt = fromWorld(tlx + (e.clientX - rect.left), tly + (e.clientY - rect.top), z);
      onTap(pt.lat, pt.lng);
    }
  }, wheel = (e) => {
    let now = Date.now();
    now - lastWheel.current < 250 || (lastWheel.current = now, setView((v) => ({ ...v, z: clampZ(v.z + (e.deltaY < 0 ? 1 : -1)) })));
  }, place = (lat, lng) => {
    let p = worldPx(lat, lng, z);
    return { left: p.x - tlx, top: p.y - tly };
  }, visible = (q) => q.left > -40 && q.left < size.w + 40 && q.top > -50 && q.top < size.h + 40;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "jt-map",
      ref: box,
      onPointerDown: down,
      onPointerMove: move,
      onPointerUp: up,
      onPointerCancel: up,
      onWheel: wheel,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        tiles,
        stat.bad > 0 && stat.ok === 0 && /* @__PURE__ */ jsx("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        size.w > 0 && pins.map((p) => {
          let q = place(p.lat, p.lng);
          return visible(q) ? /* @__PURE__ */ jsx(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (p.id === selectedId ? " sel" : ""),
              style: { left: q.left, top: q.top, "--pc": p.color },
              onClick: () => onPinTap(p.id),
              "aria-label": p.label,
              children: /* @__PURE__ */ jsx("i", {})
            },
            p.id
          ) : null;
        }),
        size.w > 0 && temp && /* @__PURE__ */ jsx("span", { className: "jt-pin temp", style: { left: place(temp.lat, temp.lng).left, top: place(temp.lat, temp.lng).top }, children: /* @__PURE__ */ jsx("i", {}) }),
        /* @__PURE__ */ jsxs("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setView((v) => ({ ...v, z: clampZ(v.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setView((v) => ({ ...v, z: clampZ(v.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ jsx("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var ML_CDN = "https://unpkg.com/maplibre-gl@4.7.1/dist/", MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty", mlPromise = null;
function loadMapLibre() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : mlPromise || (mlPromise = new Promise((res, rej) => {
    let css = document.createElement("link");
    css.rel = "stylesheet", css.href = ML_CDN + "maplibre-gl.css", document.head.appendChild(css);
    let sc = document.createElement("script");
    sc.src = ML_CDN + "maplibre-gl.js", sc.onload = () => window.maplibregl ? res(window.maplibregl) : rej(new Error("maplibre")), sc.onerror = () => {
      mlPromise = null, rej(new Error("maplibre"));
    }, document.head.appendChild(sc);
  }), mlPromise);
}
var KO_LABEL = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function koreanize(map) {
  (map.getStyle().layers || []).forEach((l) => {
    let tf = l.layout && l.layout["text-field"];
    if (l.type === "symbol" && tf && JSON.stringify(tf).includes("name"))
      try {
        map.setLayoutProperty(l.id, "text-field", KO_LABEL);
      } catch {
      }
  });
}
var xmlEsc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]), pinSvg = (color, big, text) => {
  let w = big ? 34 : 28, h = big ? 44 : 36, mid = text ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${color}" font-family="sans-serif">${xmlEsc(text)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${w}" height="${h}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>${mid}</svg>`;
};
function KoMap(props) {
  let { view, setView, pins, temp, selectedId, onTap, onPinTap } = props, box = useRef(null), mapRef = useRef(null), mlRef = useRef(null), marks = useRef([]), tempMark = useRef(null), cb = useRef({});
  cb.current = { onTap, onPinTap, setView };
  let [state, setState] = useState("loading");
  return useEffect(() => {
    let alive = !0;
    return loadMapLibre().then((ml) => {
      if (!alive || !box.current) return;
      mlRef.current = ml;
      let map = new ml.Map({
        container: box.current,
        style: MAP_STYLE,
        center: [view.lng, view.lat],
        zoom: view.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      map.touchZoomRotate.disableRotation(), map.addControl(new ml.NavigationControl({ showCompass: !1 }), "top-right"), map.on("load", () => {
        koreanize(map), alive && setState("ok");
      }), map.on("click", (e) => {
        e.originalEvent && e.originalEvent.target.closest && e.originalEvent.target.closest(".jt-mlpin") || cb.current.onTap(e.lngLat.lat, e.lngLat.lng);
      }), map.on("moveend", () => {
        let c = map.getCenter();
        cb.current.setView({ lat: c.lat, lng: c.lng, z: map.getZoom() + 1 });
      }), mapRef.current = map, setTimeout(() => alive && !map.loaded() && setState((st) => st === "loading" ? "slow" : st), 6e3), setTimeout(() => {
        alive && mapRef.current === map && !map.loaded() && (map.remove(), mapRef.current = null, setState("fail"));
      }, 15e3);
    }).catch(() => alive && setState("fail")), () => {
      alive = !1, mapRef.current && mapRef.current.remove(), mapRef.current = null;
    };
  }, []), useEffect(() => {
    let map = mapRef.current;
    if (!map) return;
    let c = map.getCenter();
    (Math.abs(c.lat - view.lat) > 1e-6 || Math.abs(c.lng - view.lng) > 1e-6 || Math.abs(map.getZoom() + 1 - view.z) > 0.01) && map.flyTo({ center: [view.lng, view.lat], zoom: view.z - 1, duration: 600 });
  }, [view.lat, view.lng, view.z]), useEffect(() => {
    let map = mapRef.current, ml = mlRef.current;
    !map || !ml || (marks.current.forEach((m) => m.remove()), marks.current = pins.map((p) => {
      let el = document.createElement("button");
      return el.type = "button", el.className = "jt-mlpin" + (p.id === selectedId ? " sel" : ""), el.setAttribute("aria-label", p.label), el.innerHTML = pinSvg(p.color, p.id === selectedId, p.text), el.addEventListener("click", (e) => {
        e.stopPropagation(), cb.current.onPinTap(p.id);
      }), new ml.Marker({ element: el, anchor: "bottom" }).setLngLat([p.lng, p.lat]).addTo(map);
    }));
  }, [pins, selectedId, state]), useEffect(() => {
    let map = mapRef.current, ml = mlRef.current;
    if (tempMark.current && tempMark.current.remove(), tempMark.current = null, !map || !ml || !temp) return;
    let el = document.createElement("div");
    el.className = "jt-mlpin temp", el.innerHTML = pinSvg("#14213D", !0), tempMark.current = new ml.Marker({ element: el, anchor: "bottom" }).setLngLat([temp.lng, temp.lat]).addTo(map);
  }, [temp, state]), state === "fail" ? /* @__PURE__ */ jsx(TileMap, { ...props }) : /* @__PURE__ */ jsxs("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ jsx("div", { ref: box, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (state === "loading" || state === "slow") && /* @__PURE__ */ jsx("div", { className: "jt-mlmsg", role: "status", children: state === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
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
