function oa(t) {
  let { view: a, setView: n, pins: o, temp: s, selectedId: g, onTap: f, onPinTap: d } = t, m = J(null), j = J(null), h = J(null), v = J([]), b = J(null), w = J({});
  w.current = { onTap: f, onPinTap: d, setView: n };
  let [u, p] = C("loading");
  return Y(() => {
    let i = !0;
    return $n().then((c) => {
      if (!i || !m.current) return;
      h.current = c;
      let k = new c.Map({
        container: m.current,
        style: Pn,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      k.touchZoomRotate.disableRotation(), k.addControl(new c.NavigationControl({ showCompass: !1 }), "top-right"), k.on("load", () => {
        _n(k), i && p("ok");
      }), k.on("click", (x) => {
        x.originalEvent && x.originalEvent.target.closest && x.originalEvent.target.closest(".jt-mlpin") || w.current.onTap(x.lngLat.lat, x.lngLat.lng);
      }), k.on("moveend", () => {
        let x = k.getCenter();
        w.current.setView({ lat: x.lat, lng: x.lng, z: k.getZoom() + 1 });
      }), j.current = k, setTimeout(() => i && !k.loaded() && p((x) => x === "loading" ? "slow" : x), 6e3), setTimeout(() => {
        i && j.current === k && !k.loaded() && (k.remove(), j.current = null, p("fail"));
      }, 15e3);
    }).catch(() => i && p("fail")), () => {
      i = !1, j.current && j.current.remove(), j.current = null;
    };
  }, []), Y(() => {
    let i = j.current;
    if (!i) return;
    let c = i.getCenter();
    (Math.abs(c.lat - a.lat) > 1e-6 || Math.abs(c.lng - a.lng) > 1e-6 || Math.abs(i.getZoom() + 1 - a.z) > 0.01) && i.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), Y(() => {
    let i = j.current, c = h.current;
    !i || !c || (v.current.forEach((k) => k.remove()), v.current = o.map((k) => {
      let x = document.createElement("button");
      return x.type = "button", x.className = "jt-mlpin" + (k.id === g ? " sel" : ""), x.setAttribute("aria-label", k.label), x.innerHTML = se(k.color, k.id === g), x.addEventListener("click", (l) => {
        l.stopPropagation(), w.current.onPinTap(k.id);
      }), new c.Marker({ element: x, anchor: "bottom" }).setLngLat([k.lng, k.lat]).addTo(i);
    }));
  }, [o, g, u]), Y(() => {
    let i = j.current, c = h.current;
    if (b.current && b.current.remove(), b.current = null, !i || !c || !s) return;
    let k = document.createElement("div");
    k.className = "jt-mlpin temp", k.innerHTML = se("#14213D", !0), b.current = new c.Marker({ element: k, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(i);
  }, [s, u]), u === "fail" ? /* @__PURE__ */ e(Dn, { ...t }) : /* @__PURE__ */ r("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: m, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (u === "loading" || u === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: u === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var St = null, ft = "", jt = !1, le = /* @__PURE__ */ new Set();
function ra(t) {
  return jt ? Promise.reject(new Error("auth")) : St && ft === t ? St : ft && ft !== t ? Promise.reject(new Error("reload")) : (ft = t, St = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      jt = !0, le.forEach((s) => s()), n(new Error("auth"));
    };
    let o = document.createElement("script");
    o.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", o.async = !0, o.onerror = () => {
      St = null, ft = "", n(new Error("load"));
    }, document.head.appendChild(o);
  }), St);
}
var Ln = (t) => !!t && !jt && ft === t && !!(window.google && window.google.maps);
function Tn(t) {
  let { view: a, setView: n, pins: o, temp: s, selectedId: g, onTap: f, onPinTap: d, onPoi: m, gkey: j } = t, h = J(null), v = J(null), b = J(null), w = J([]), u = J(null), p = J({});
  p.current = { onTap: f, onPinTap: d, onPoi: m, setView: n };
  let [i, c] = C(jt ? "fail" : "loading");
  Y(() => {
    let x = !0, l = () => x && c("fail");
    return le.add(l), ra(j).then(async (M) => {
      let { Map: I } = await M.importLibrary("maps"), { Marker: O } = await M.importLibrary("marker"), { Size: z, Point: S } = await M.importLibrary("core");
      if (!x || !h.current) return;
      b.current = { Marker: O, Size: z, Point: S };
      let D = new I(h.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      D.addListener("click", async (N) => {
        if (N.placeId) {
          N.stop();
          try {
            let { Place: A } = await M.importLibrary("places"), T = new A({ id: N.placeId });
            await T.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), p.current.onPoi({
              name: T.displayName || "",
              lat: T.location.lat(),
              lng: T.location.lng(),
              area: T.formattedAddress || "",
              link: T.googleMapsURI || "",
              placeId: N.placeId
            });
            return;
          } catch {
          }
        }
        p.current.onTap(N.latLng.lat(), N.latLng.lng());
      }), D.addListener("idle", () => {
        let N = D.getCenter();
        p.current.setView({ lat: N.lat(), lng: N.lng(), z: D.getZoom() });
      }), v.current = D, c("ok");
    }).catch(() => x && c("fail")), () => {
      x = !1, le.delete(l);
    };
  }, [j]), Y(() => {
    let x = v.current;
    if (!x) return;
    let l = x.getCenter();
    (Math.abs(l.lat() - a.lat) > 1e-6 || Math.abs(l.lng() - a.lng) > 1e-6) && x.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== x.getZoom() && x.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let k = (x, l) => {
    let M = b.current, I = l ? 34 : 28, O = l ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(se(x, l).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new M.Size(I, O),
      anchor: new M.Point(I / 2, O)
    };
  };
  return Y(() => {
    let x = v.current, l = b.current;
    !x || !l || (w.current.forEach((M) => M.setMap(null)), w.current = o.map((M) => {
      let I = new l.Marker({ position: { lat: M.lat, lng: M.lng }, map: x, title: M.label, icon: k(M.color, M.id === g), zIndex: M.id === g ? 10 : 1 });
      return I.addListener("click", () => p.current.onPinTap(M.id)), I;
    }));
  }, [o, g, i]), Y(() => {
    let x = v.current, l = b.current;
    u.current && u.current.setMap(null), u.current = null, !(!x || !l || !s) && (u.current = new l.Marker({ position: { lat: s.lat, lng: s.lng }, map: x, icon: k("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, i]), i === "fail" ? /* @__PURE__ */ e(oa, { ...t }) : /* @__PURE__ */ r("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: h, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    i === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Bn(t) {
  return t.gkey && !jt ? /* @__PURE__ */ e(Tn, { ...t }) : /* @__PURE__ */ e(oa, { ...t });
}
var He = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], On = [500, 1e3, 2e3], oe = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function Un(t, a) {
  let n = (f) => f * Math.PI / 180, o = n(a.lat - t.lat), s = n(a.lng - t.lng), g = Math.sin(o / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(g));
}
var Kn = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Wn(t, a, n, o) {
  let s = await ra(t), { Place: g, SearchNearbyRankPreference: f } = await s.importLibrary("places"), { places: d } = await g.searchNearby({
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
    locationRestriction: { center: a, radius: o },
    includedTypes: n.g,
    maxResultCount: 15,
    rankPreference: f.POPULARITY,
    language: "ko"
  }), m = [];
  for (let j of d || []) {
    let h;
    try {
      h = j.regularOpeningHours ? await j.isOpen() : void 0;
    } catch {
      h = void 0;
    }
    m.push({
      id: j.id,
      placeId: j.id,
      name: j.displayName,
      lat: j.location.lat(),
      lng: j.location.lng(),
      type: j.primaryTypeDisplayName || n.label,
      rating: j.rating,
      count: j.userRatingCount,
      addr: j.formattedAddress || "",
      url: j.googleMapsURI || "",
      open: h
    });
  }
  return m;
}
async function Hn(t, a, n) {
  let o = `[out:json][timeout:20];nwr(around:${n},${t.lat},${t.lng})${a.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(o));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((f) => {
    let d = f.tags || {}, m = d["name:ko"] || d["name:en"] || "";
    return {
      id: "osm" + f.type + f.id,
      name: m || d.name,
      sub: m && d.name && d.name !== m ? d.name : "",
      lat: f.lat != null ? f.lat : f.center && f.center.lat,
      lng: f.lon != null ? f.lon : f.center && f.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((f) => f.lat && f.name);
}
function Yn({ settings: t, wish: a, onSave: n }) {
  let [o, s] = C(He[0]), [g, f] = C(1e3), [d, m] = C(null), [j, h] = C(""), [v, b] = C([]), [w, u] = C(!1), [p, i] = C(""), [c, k] = C(""), [x, l] = C({}), M = () => {
    m({ lat: xt.lat, lng: xt.lng, here: !1, at: Date.now() }), h("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, I = () => {
    if (h("현재 위치를 찾는 중"), !navigator.geolocation) return M();
    navigator.geolocation.getCurrentPosition(
      (z) => {
        m({ lat: z.coords.latitude, lng: z.coords.longitude, here: !0, at: Date.now() }), h("");
      },
      M,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  Y(() => {
    I();
  }, []), Y(() => {
    if (!d) return;
    let z = !0;
    return (async () => {
      u(!0), i("");
      let S = null, D = "";
      if (t.gmapsKey && !jt)
        try {
          S = await Wn(t.gmapsKey, { lat: d.lat, lng: d.lng }, o, g), D = "google";
        } catch {
          S = null;
        }
      if (!S)
        try {
          S = await Hn(d, o, g), D = "osm";
        } catch {
          z && (b([]), i("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), u(!1));
          return;
        }
      S.forEach((N) => N.dist = Un(d, N)), D === "osm" && S.sort((N, A) => N.dist - A.dist), z && (b(S.slice(0, 20)), k(D), u(!1), S.length || i(`반경 ${oe(g)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      z = !1;
    };
  }, [d, o, g, t.gmapsKey]);
  let O = (z) => x[z.id] || a.some((S) => z.placeId && S.placeId === z.placeId || S.name === z.name && $t(S) && Math.abs(S.lat - z.lat) < 5e-4);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ r("span", { children: [
        /* @__PURE__ */ e(an, { size: 15 }),
        d ? d.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        oe(g)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: I, children: "위치 다시 찾기" })
    ] }),
    j && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: j }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: He.map((z) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (o.id === z.id ? " on" : ""), onClick: () => s(z), children: z.label }, z.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: On.map((z) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": g === z, className: g === z ? "on" : "", onClick: () => f(z), children: oe(z) }, z)) }),
    w && /* @__PURE__ */ r("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      o.label,
      " 찾는 중"
    ] }),
    !w && p && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: p }) }),
    !w && v.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: v.map((z) => {
      let S = O(z);
      return /* @__PURE__ */ r("li", { className: "jt-near", children: [
        /* @__PURE__ */ r("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: z.name }),
          z.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: z.sub }),
          /* @__PURE__ */ r("div", { className: "jt-near-meta", children: [
            z.rating != null && /* @__PURE__ */ r("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(nn, { size: 13, fill: "currentColor" }),
              z.rating.toFixed(1),
              z.count ? /* @__PURE__ */ r("em", { children: [
                "(",
                z.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: z.type }),
            z.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            z.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ r("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(on, { size: 12 }),
            Kn(z.dist)
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "jt-near-act", children: [
          S ? /* @__PURE__ */ r("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(Ge, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: z.name,
                  cat: o.wish,
                  area: z.addr || z.sub || "",
                  link: z.url || "",
                  memo: z.rating != null ? `구글 평점 ${z.rating.toFixed(1)}${z.count ? ` (${z.count}명)` : ""}` : "",
                  lat: z.lat,
                  lng: z.lng,
                  ...z.placeId ? { placeId: z.placeId } : {}
                }), l({ ...x, [z.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ r("a", { className: "jt-maplink", href: z.url || Ut({ lat: z.lat, lng: z.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Pt, { size: 13 }),
            "구글맵"
          ] })
        ] })
      ] }, z.id);
    }) }),
    c && v.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: c === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Jn({ settings: t, wish: a, me: n, onSave: o, onLike: s, onPlan: g, onDelete: f, onComment: d, onDelComment: m, onReact: j }) {
  let h = a.filter($t), [v, b] = C(
    () => h.length ? {
      lat: h.reduce((y, L) => y + L.lat, 0) / h.length,
      lng: h.reduce((y, L) => y + L.lng, 0) / h.length,
      z: h.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [w, u] = C(null), [p, i] = C(null), [c, k] = C(""), [x, l] = C([]), [M, I] = C(!1), [O, z] = C(""), S = a.find((y) => y.id === p), D = h.map((y) => `${y.id}:${y.lat}:${y.lng}:${y.cat}`).join("|"), N = Bt(
    () => h.map((y) => ({
      id: y.id,
      lat: y.lat,
      lng: y.lng,
      color: bt[y.cat] || bt.기타,
      label: y.name
    })),
    [D]
  ), A = async () => {
    let y = c.trim();
    if (y) {
      if (I(!0), z(""), l([]), Ln(t.gmapsKey))
        try {
          let { Place: L } = await window.google.maps.importLibrary("places"), { places: Z } = await L.searchText({
            textQuery: y,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: v.lat, lng: v.lng }
          });
          if (Z && Z.length) {
            l(
              Z.map((K) => ({
                lat: K.location.lat(),
                lng: K.location.lng(),
                name: K.displayName,
                area: K.formattedAddress || "",
                link: K.googleMapsURI || "",
                placeId: K.id
              }))
            ), I(!1);
            return;
          }
        } catch {
        }
      try {
        let L = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(y)
        );
        if (!L.ok) throw new Error("search failed");
        let Z = await L.json();
        Z.length || z("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), l(
          Z.map((K) => {
            let Rt = String(K.display_name || "").split(",").map((Ht) => Ht.trim());
            return {
              lat: Number(K.lat),
              lng: Number(K.lon),
              name: K.name || Rt[0] || y,
              area: Rt.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        z("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      I(!1);
    }
  }, T = (y) => {
    b({ lat: y.lat, lng: y.lng, z: 16 }), i(null), u({ lat: y.lat, lng: y.lng, name: y.name, cat: "맛집", area: y.area, link: y.link || "", placeId: y.placeId }), l([]);
  }, q = S && S.likes.includes(n);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: c,
          onChange: (y) => k(y.target.value),
          onKeyDown: (y) => y.key === "Enter" && A(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: A, disabled: M, children: M ? "검색 중" : "검색" })
    ] }),
    O && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: O }),
    x.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: x.map((y, L) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => T(y), children: [
      /* @__PURE__ */ e("strong", { children: y.name }),
      /* @__PURE__ */ e("span", { children: y.area })
    ] }) }, L)) }),
    /* @__PURE__ */ e(
      Bn,
      {
        gkey: t.gmapsKey,
        onPoi: (y) => {
          i(null), u({ ...y, cat: "맛집" });
        },
        view: v,
        setView: b,
        pins: N,
        temp: w,
        selectedId: p,
        onTap: (y, L) => {
          i(null), u({ lat: Number(y.toFixed(6)), lng: Number(L.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (y) => {
          u(null), i(y);
        }
      }
    ),
    !w && !S && /* @__PURE__ */ r("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      h.length,
      "개예요."
    ] }),
    w && /* @__PURE__ */ r("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: w.name,
          onChange: (y) => u({ ...w, name: y.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: me.map((y) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (w.cat === y ? " on" : ""),
          onClick: () => u({ ...w, cat: y }),
          children: y
        },
        y
      )) }),
      /* @__PURE__ */ r("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !w.name.trim(),
            onClick: () => {
              o({
                name: w.name.trim(),
                cat: w.cat,
                area: w.area || "",
                link: w.link || "",
                memo: "",
                lat: w.lat,
                lng: w.lng,
                ...w.placeId ? { placeId: w.placeId } : {}
              }), u(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => u(null), children: "취소" })
      ] })
    ] }),
    S && /* @__PURE__ */ r("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ r("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: bt[S.cat] || bt.기타 }, children: S.cat }),
        /* @__PURE__ */ e("strong", { children: S.name })
      ] }),
      S.area && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(ce, { size: 13 }),
        S.area
      ] }),
      S.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: S.memo }),
      /* @__PURE__ */ r("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "jt-like" + (q ? " on" : ""),
            onClick: () => s(S.id),
            "aria-pressed": q,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(pe, { size: 16, fill: q ? "currentColor" : "none" }),
              "가고 싶어요 ",
              S.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Kt, { item: S, me: n, onReact: (y) => j(S.id, y) }),
        S.planned != null ? /* @__PURE__ */ r("span", { className: "jt-planned", style: { color: X[S.planned % X.length] }, children: [
          S.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => g(S), children: "일정에 넣기" }),
        /* @__PURE__ */ r("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(et, { name: S.by, members: t.members, size: 16 }),
          S.by
        ] }),
        /* @__PURE__ */ e(
          yt,
          {
            onConfirm: () => {
              f(S.id), i(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "jt-maprow", children: /* @__PURE__ */ r("a", { className: "jt-maplink", href: Ut(S), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Pt, { size: 14 }),
        "구글맵에서 열기"
      ] }) }),
      /* @__PURE__ */ e(
        Wt,
        {
          comments: S.comments || [],
          me: n,
          members: t.members,
          onAdd: (y) => d(S.id, y),
          onDelete: (y) => m(S.id, y)
        }
      )
    ] })
  ] });
}
function Gn(t) {
  let [a, n] = C("list");
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([o, s]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === o, className: a === o ? "on" : "", onClick: () => n(o), children: s }, o)) }),
    a === "list" && /* @__PURE__ */ e(qn, { ...t }),
    a === "map" && /* @__PURE__ */ e(Jn, { ...t }),
    a === "near" && /* @__PURE__ */ e(Yn, { ...t })
  ] });
}
function qn({ settings: t, wish: a, me: n, onAdd: o, onLike: s, onPlan: g, onDelete: f, onComment: d, onDelComment: m, onReact: j }) {
  let [h, v] = C(null), [b, w] = C("전체"), [u, p] = C(null), i = a.filter((c) => b === "전체" || c.cat === b).sort((c, k) => k.likes.length - c.likes.length || k.createdAt - c.createdAt);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...me].map((c) => /* @__PURE__ */ e("button", { className: "jt-chip" + (b === c ? " on" : ""), onClick: () => w(c), children: c }, c)) }),
    i.length === 0 && /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: i.map((c) => {
      let k = c.likes.includes(n);
      return /* @__PURE__ */ r("li", { className: "jt-wish", children: [
        /* @__PURE__ */ r("div", { className: "jt-wish-top", children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: bt[c.cat] || bt.기타 }, children: c.cat }),
          /* @__PURE__ */ e("strong", { children: c.name })
        ] }),
        c.area && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(ce, { size: 13 }),
          c.area
        ] }),
        c.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: c.memo }),
        /* @__PURE__ */ r("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ r("a", { className: "jt-maplink", href: Ut(c), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Pt, { size: 14 }),
            "구글맵에서 열기"
          ] }),
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "jt-maplink",
              onClick: () => p(u === c.id ? null : c.id),
              "aria-expanded": u === c.id,
              children: [
                /* @__PURE__ */ e($a, { size: 14 }),
                u === c.id ? "지도 닫기" : "지도 미리보기"
              ]
            }
          )
        ] }),
        u === c.id && /* @__PURE__ */ r("div", { className: "jt-embed", children: [
          /* @__PURE__ */ e(
            "iframe",
            {
              title: `${c.name} 지도`,
              src: mn(c),
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              allowFullScreen: !0
            }
          ),
          /* @__PURE__ */ e("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
        ] }),
        /* @__PURE__ */ r("div", { className: "jt-wish-bottom", children: [
          /* @__PURE__ */ r(
            "button",
            {
              className: "jt-like" + (k ? " on" : ""),
              onClick: () => s(c.id),
              "aria-pressed": k,
              "aria-label": "가고 싶어요",
              children: [
                /* @__PURE__ */ e(pe, { size: 16, fill: k ? "currentColor" : "none" }),
                "가고 싶어요 ",
                c.likes.length
              ]
            }
          ),
          /* @__PURE__ */ e(Kt, { item: c, me: n, onReact: (x) => j(c.id, x) }),
          c.planned != null ? /* @__PURE__ */ r("span", { className: "jt-planned", style: { color: X[c.planned % X.length] }, children: [
            c.planned + 1,
            "일차 일정에 있어요"
          ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => g(c), children: "일정에 넣기" }),
          /* @__PURE__ */ e(
            ge,
            {
              count: (c.comments || []).length,
              open: h === c.id,
              onClick: () => v(h === c.id ? null : c.id)
            }
          ),
          /* @__PURE__ */ r("span", { className: "jt-by grow", children: [
            /* @__PURE__ */ e(et, { name: c.by, members: t.members, size: 16 }),
            c.by
          ] }),
          /* @__PURE__ */ e(yt, { onConfirm: () => f(c.id), label: "" })
        ] }),
        h === c.id && /* @__PURE__ */ e(
          Wt,
          {
            comments: c.comments || [],
            me: n,
            members: t.members,
            onAdd: (x) => d(c.id, x),
            onDelete: (x) => m(c.id, x)
          }
        )
      ] }, c.id);
    }) })
  ] });
}
function Ye({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((o, s) => /* @__PURE__ */ r("li", { className: o.from === n || o.to === n ? "mine" : "", children: [
    /* @__PURE__ */ r("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: o.from }),
      /* @__PURE__ */ e(Xe, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: o.to })
    ] }),
    /* @__PURE__ */ r("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: H(o.v) }),
      /* @__PURE__ */ e("em", { children: It(o.v, a) })
    ] })
  ] }, s)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Xn({ e: t, members: a, rate: n, onEdit: o }) {
  let { Icon: s, color: g } = re(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ r("button", { type: "button", className: "jt-spend", onClick: () => o(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": g }, children: /* @__PURE__ */ e(s, { size: 18 }) }),
    /* @__PURE__ */ r("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ e("div", { className: "jt-spend-name", children: t.title }),
      /* @__PURE__ */ r("div", { className: "jt-meta", children: [
        t.payer,
        "이(가) 냄, ",
        (t.split || []).length === a.length ? "모두" : (t.split || []).join(", "),
        " 나눔",
        t.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-spend-amt", children: [
      /* @__PURE__ */ e("strong", { children: H(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: It(Number(t.amount) || 0, n) })
    ] })
  ] }) });
}
var Je = (t) => t > 0.5 ? `받을 돈 ${H(t)}` : t < -0.5 ? `보낼 돈 ${H(-t)}` : "주고받을 돈 없음", Tt = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function Zn({ settings: t, spend: a, me: n, onEdit: o }) {
  let { members: s, rate: g, start: f } = t, [d, m] = C("me"), j = a.reduce((p, i) => p + (Number(i.amount) || 0), 0), h = Bt(() => Le(a, s), [a, s]), v = Bt(() => {
    let p = {};
    return a.forEach((i) => p[i.cat] = (p[i.cat] || 0) + (Number(i.amount) || 0)), Ze.filter((i) => p[i]).map((i) => ({ c: i, v: p[i] }));
  }, [a]), b = Bt(() => {
    let p = {};
    return a.forEach((i) => (p[i.day] = p[i.day] || []).push(i)), Object.keys(p).map(Number).sort((i, c) => i - c).map((i) => ({
