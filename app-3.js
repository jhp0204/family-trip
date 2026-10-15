u.className = "jt-mlpin temp", u.innerHTML = pe("#14213D", !0), h.current = new v.Marker({ element: u, anchor: "bottom" }).setLngLat([i.lng, i.lat]).addTo(s);
  }, [i, m]), m === "fail" ? /* @__PURE__ */ e(Bn, { ...t }) : /* @__PURE__ */ r("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: d, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (m === "loading" || m === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: m === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var It = null, jt = "", kt = !1, ce = /* @__PURE__ */ new Set();
function pa(t) {
  return kt ? Promise.reject(new Error("auth")) : It && jt === t ? It : jt && jt !== t ? Promise.reject(new Error("reload")) : (jt = t, It = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      kt = !0, ce.forEach((i) => i()), n(new Error("auth"));
    };
    let o = document.createElement("script");
    o.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", o.async = !0, o.onerror = () => {
      It = null, jt = "", n(new Error("load"));
    }, document.head.appendChild(o);
  }), It);
}
var Hn = (t) => !!t && !kt && jt === t && !!(window.google && window.google.maps);
function Yn(t) {
  let { view: a, setView: n, pins: o, temp: i, selectedId: f, onTap: g, onPinTap: c, onPoi: d, gkey: x } = t, j = G(null), y = G(null), h = G(null), w = G([]), m = G(null), p = G({});
  p.current = { onTap: g, onPinTap: c, onPoi: d, setView: n };
  let [s, v] = N(kt ? "fail" : "loading");
  K(() => {
    let b = !0, l = () => b && v("fail");
    return ce.add(l), pa(x).then(async (M) => {
      let { Map: F } = await M.importLibrary("maps"), { Marker: U } = await M.importLibrary("marker"), { Size: S, Point: _ } = await M.importLibrary("core");
      if (!b || !j.current) return;
      h.current = { Marker: U, Size: S, Point: _ };
      let z = new F(j.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      z.addListener("click", async (k) => {
        if (k.placeId) {
          k.stop();
          try {
            let { Place: R } = await M.importLibrary("places"), T = new R({ id: k.placeId });
            await T.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), p.current.onPoi({
              name: T.displayName || "",
              lat: T.location.lat(),
              lng: T.location.lng(),
              area: T.formattedAddress || "",
              link: T.googleMapsURI || "",
              placeId: k.placeId
            });
            return;
          } catch {
          }
        }
        p.current.onTap(k.latLng.lat(), k.latLng.lng());
      }), z.addListener("idle", () => {
        let k = z.getCenter();
        p.current.setView({ lat: k.lat(), lng: k.lng(), z: z.getZoom() });
      }), y.current = z, v("ok");
    }).catch(() => b && v("fail")), () => {
      b = !1, ce.delete(l);
    };
  }, [x]), K(() => {
    let b = y.current;
    if (!b) return;
    let l = b.getCenter();
    (Math.abs(l.lat() - a.lat) > 1e-6 || Math.abs(l.lng() - a.lng) > 1e-6) && b.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== b.getZoom() && b.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let u = (b, l) => {
    let M = h.current, F = l ? 34 : 28, U = l ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(pe(b, l).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new M.Size(F, U),
      anchor: new M.Point(F / 2, U)
    };
  };
  return K(() => {
    let b = y.current, l = h.current;
    !b || !l || (w.current.forEach((M) => M.setMap(null)), w.current = o.map((M) => {
      let F = new l.Marker({ position: { lat: M.lat, lng: M.lng }, map: b, title: M.label, icon: u(M.color, M.id === f), zIndex: M.id === f ? 10 : 1 });
      return F.addListener("click", () => p.current.onPinTap(M.id)), F;
    }));
  }, [o, f, s]), K(() => {
    let b = y.current, l = h.current;
    m.current && m.current.setMap(null), m.current = null, !(!b || !l || !i) && (m.current = new l.Marker({ position: { lat: i.lat, lng: i.lng }, map: b, icon: u("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [i, s]), s === "fail" ? /* @__PURE__ */ e(la, { ...t }) : /* @__PURE__ */ r("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: j, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    s === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Jn(t) {
  return t.gkey && !kt ? /* @__PURE__ */ e(Yn, { ...t }) : /* @__PURE__ */ e(la, { ...t });
}
var qe = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Gn = [500, 1e3, 2e3], ie = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function qn(t, a) {
  let n = (g) => g * Math.PI / 180, o = n(a.lat - t.lat), i = n(a.lng - t.lng), f = Math.sin(o / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(i / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(f));
}
var Xn = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Zn(t, a, n, o) {
  let i = await pa(t), { Place: f, SearchNearbyRankPreference: g } = await i.importLibrary("places"), { places: c } = await f.searchNearby({
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
    rankPreference: g.POPULARITY,
    language: "ko"
  }), d = [];
  for (let x of c || []) {
    let j;
    try {
      j = x.regularOpeningHours ? await x.isOpen() : void 0;
    } catch {
      j = void 0;
    }
    d.push({
      id: x.id,
      placeId: x.id,
      name: x.displayName,
      lat: x.location.lat(),
      lng: x.location.lng(),
      type: x.primaryTypeDisplayName || n.label,
      rating: x.rating,
      count: x.userRatingCount,
      addr: x.formattedAddress || "",
      url: x.googleMapsURI || "",
      open: j
    });
  }
  return d;
}
async function Vn(t, a, n) {
  let o = `[out:json][timeout:20];nwr(around:${n},${t.lat},${t.lng})${a.osm}["name"];out center 40;`, i = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(o));
  if (!i.ok) throw new Error("osm");
  return ((await i.json()).elements || []).map((g) => {
    let c = g.tags || {}, d = c["name:ko"] || c["name:en"] || "";
    return {
      id: "osm" + g.type + g.id,
      name: d || c.name,
      sub: d && c.name && c.name !== d ? c.name : "",
      lat: g.lat != null ? g.lat : g.center && g.center.lat,
      lng: g.lon != null ? g.lon : g.center && g.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((g) => g.lat && g.name);
}
function Qn({ settings: t, wish: a, onSave: n }) {
  let [o, i] = N(qe[0]), [f, g] = N(1e3), [c, d] = N(null), [x, j] = N(""), [y, h] = N([]), [w, m] = N(!1), [p, s] = N(""), [v, u] = N(""), [b, l] = N({}), M = () => {
    d({ lat: wt.lat, lng: wt.lng, here: !1, at: Date.now() }), j("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, F = () => {
    if (j("현재 위치를 찾는 중"), !navigator.geolocation) return M();
    navigator.geolocation.getCurrentPosition(
      (S) => {
        d({ lat: S.coords.latitude, lng: S.coords.longitude, here: !0, at: Date.now() }), j("");
      },
      M,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  K(() => {
    F();
  }, []), K(() => {
    if (!c) return;
    let S = !0;
    return (async () => {
      m(!0), s("");
      let _ = null, z = "";
      if (t.gmapsKey && !kt)
        try {
          _ = await Zn(t.gmapsKey, { lat: c.lat, lng: c.lng }, o, f), z = "google";
        } catch {
          _ = null;
        }
      if (!_)
        try {
          _ = await Vn(c, o, f), z = "osm";
        } catch {
          S && (h([]), s("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), m(!1));
          return;
        }
      _.forEach((k) => k.dist = qn(c, k)), z === "osm" && _.sort((k, R) => k.dist - R.dist), S && (h(_.slice(0, 20)), u(z), m(!1), _.length || s(`반경 ${ie(f)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      S = !1;
    };
  }, [c, o, f, t.gmapsKey]);
  let U = (S) => b[S.id] || a.some((_) => S.placeId && _.placeId === S.placeId || _.name === S.name && Lt(_) && Math.abs(_.lat - S.lat) < 5e-4);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ r("span", { children: [
        /* @__PURE__ */ e(cn, { size: 15 }),
        c ? c.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        ie(f)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: F, children: "위치 다시 찾기" })
    ] }),
    x && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: x }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: qe.map((S) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (o.id === S.id ? " on" : ""), onClick: () => i(S), children: S.label }, S.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Gn.map((S) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": f === S, className: f === S ? "on" : "", onClick: () => g(S), children: ie(S) }, S)) }),
    w && /* @__PURE__ */ r("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      o.label,
      " 찾는 중"
    ] }),
    !w && p && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: p }) }),
    !w && y.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: y.map((S) => {
      let _ = U(S);
      return /* @__PURE__ */ r("li", { className: "jt-near", children: [
        /* @__PURE__ */ r("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: S.name }),
          S.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: S.sub }),
          /* @__PURE__ */ r("div", { className: "jt-near-meta", children: [
            S.rating != null && /* @__PURE__ */ r("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(dn, { size: 13, fill: "currentColor" }),
              S.rating.toFixed(1),
              S.count ? /* @__PURE__ */ r("em", { children: [
                "(",
                S.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: S.type }),
            S.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            S.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ r("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(mn, { size: 12 }),
            Xn(S.dist)
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "jt-near-act", children: [
          _ ? /* @__PURE__ */ r("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(Ve, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: S.name,
                  cat: o.wish,
                  area: S.addr || S.sub || "",
                  link: S.url || "",
                  memo: S.rating != null ? `구글 평점 ${S.rating.toFixed(1)}${S.count ? ` (${S.count}명)` : ""}` : "",
                  lat: S.lat,
                  lng: S.lng,
                  ...S.placeId ? { placeId: S.placeId } : {}
                }), l({ ...b, [S.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ r("a", { className: "jt-maplink", href: S.url || Kt({ lat: S.lat, lng: S.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(_t, { size: 13 }),
            "구글맵"
          ] })
        ] })
      ] }, S.id);
    }) }),
    v && y.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: v === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function to({ settings: t, wish: a, me: n, onSave: o, onEdit: i, onLike: f, onPlan: g, onDelete: c, onComment: d, onDelComment: x, onReact: j }) {
  let y = a.filter(Lt), [h, w] = N(
    () => y.length ? {
      lat: y.reduce((E, H) => E + H.lat, 0) / y.length,
      lng: y.reduce((E, H) => E + H.lng, 0) / y.length,
      z: y.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [m, p] = N(null), [s, v] = N(null), [u, b] = N(""), [l, M] = N([]), [F, U] = N(!1), [S, _] = N(""), z = a.find((E) => E.id === s), k = y.map((E) => `${E.id}:${E.lat}:${E.lng}:${E.cat}`).join("|"), R = Ut(
    () => y.map((E) => ({
      id: E.id,
      lat: E.lat,
      lng: E.lng,
      color: vt[E.cat] || vt.기타,
      label: E.name
    })),
    [k]
  ), T = async () => {
    let E = u.trim();
    if (E) {
      if (U(!0), _(""), M([]), Hn(t.gmapsKey))
        try {
          let { Place: H } = await window.google.maps.importLibrary("places"), { places: B } = await H.searchText({
            textQuery: E,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: h.lat, lng: h.lng }
          });
          if (B && B.length) {
            M(
              B.map((V) => ({
                lat: V.location.lat(),
                lng: V.location.lng(),
                name: V.displayName,
                area: V.formattedAddress || "",
                link: V.googleMapsURI || "",
                placeId: V.id
              }))
            ), U(!1);
            return;
          }
        } catch {
        }
      try {
        let H = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(E)
        );
        if (!H.ok) throw new Error("search failed");
        let B = await H.json();
        B.length || _("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), M(
          B.map((V) => {
            let ft = String(V.display_name || "").split(",").map((Jt) => Jt.trim());
            return {
              lat: Number(V.lat),
              lng: Number(V.lon),
              name: V.name || ft[0] || E,
              area: ft.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        _("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      U(!1);
    }
  }, X = (E) => {
    w({ lat: E.lat, lng: E.lng, z: 16 }), v(null), p({ lat: E.lat, lng: E.lng, name: E.name, cat: "맛집", area: E.area, link: E.link || "", placeId: E.placeId }), M([]);
  }, $ = z && z.likes.includes(n);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: u,
          onChange: (E) => b(E.target.value),
          onKeyDown: (E) => E.key === "Enter" && T(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: T, disabled: F, children: F ? "검색 중" : "검색" })
    ] }),
    S && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: S }),
    l.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: l.map((E, H) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => X(E), children: [
      /* @__PURE__ */ e("strong", { children: E.name }),
      /* @__PURE__ */ e("span", { children: E.area })
    ] }) }, H)) }),
    /* @__PURE__ */ e(
      Jn,
      {
        gkey: t.gmapsKey,
        onPoi: (E) => {
          v(null), p({ ...E, cat: "맛집" });
        },
        view: h,
        setView: w,
        pins: R,
        temp: m,
        selectedId: s,
        onTap: (E, H) => {
          v(null), p({ lat: Number(E.toFixed(6)), lng: Number(H.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (E) => {
          p(null), v(E);
        }
      }
    ),
    !m && !z && /* @__PURE__ */ r("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      y.length,
      "개예요."
    ] }),
    m && /* @__PURE__ */ r("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: m.name,
          onChange: (E) => p({ ...m, name: E.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: fe.map((E) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (m.cat === E ? " on" : ""),
          onClick: () => p({ ...m, cat: E }),
          children: E
        },
        E
      )) }),
      /* @__PURE__ */ r("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !m.name.trim(),
            onClick: () => {
              o({
                name: m.name.trim(),
                cat: m.cat,
                area: m.area || "",
                link: m.link || "",
                memo: "",
                lat: m.lat,
                lng: m.lng,
                ...m.placeId ? { placeId: m.placeId } : {}
              }), p(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => p(null), children: "취소" })
      ] })
    ] }),
    z && /* @__PURE__ */ r("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ r("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: vt[z.cat] || vt.기타 }, children: z.cat }),
        /* @__PURE__ */ e("strong", { children: z.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => i(z), "aria-label": `${z.name} 수정`, children: /* @__PURE__ */ e(ue, { size: 16 }) })
      ] }),
      z.area && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(me, { size: 13 }),
        z.area
      ] }),
      z.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: z.memo }),
      /* @__PURE__ */ r("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "jt-like" + ($ ? " on" : ""),
            onClick: () => f(z.id),
            "aria-pressed": $,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(de, { size: 16, fill: $ ? "currentColor" : "none" }),
              "가고 싶어요 ",
              z.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Ht, { item: z, me: n, onReact: (E) => j(z.id, E) }),
        z.planned != null ? /* @__PURE__ */ r("span", { className: "jt-planned", style: { color: Z[z.planned % Z.length] }, children: [
          z.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => g(z), children: "일정에 넣기" }),
        /* @__PURE__ */ r("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(nt, { name: z.by, members: t.members, size: 16 }),
          z.by
        ] }),
        /* @__PURE__ */ e(
          ut,
          {
            onConfirm: () => {
              c(z.id), v(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "jt-maprow", children: /* @__PURE__ */ r("a", { className: "jt-maplink", href: Kt(z), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(_t, { size: 14 }),
        "구글맵에서 열기"
      ] }) }),
      /* @__PURE__ */ e(
        Yt,
        {
          comments: z.comments || [],
          me: n,
          members: t.members,
          onAdd: (E) => d(z.id, E),
          onDelete: (E) => x(z.id, E)
        }
      )
    ] })
  ] });
}
function eo(t) {
  let [a, n] = N("list");
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([o, i]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === o, className: a === o ? "on" : "", onClick: () => n(o), children: i }, o)) }),
    a === "list" && /* @__PURE__ */ e(ao, { ...t }),
    a === "map" && /* @__PURE__ */ e(to, { ...t }),
    a === "near" && /* @__PURE__ */ e(Qn, { ...t })
  ] });
}
function ao({ settings: t, wish: a, me: n, onAdd: o, onEdit: i, onLike: f, onPlan: g, onDelete: c, onComment: d, onDelComment: x, onReact: j }) {
  let [y, h] = N(null), [w, m] = N("전체"), [p, s] = N(null), v = a.filter((u) => w === "전체" || u.cat === w).sort((u, b) => b.likes.length - u.likes.length || b.createdAt - u.createdAt);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...fe].map((u) => /* @__PURE__ */ e("button", { className: "jt-chip" + (w === u ? " on" : ""), onClick: () => m(u), children: u }, u)) }),
    v.length === 0 && /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: v.map((u) => {
      let b = u.likes.includes(n);
      return /* @__PURE__ */ r("li", { className: "jt-wish", children: [
        /* @__PURE__ */ r("div", { className: "jt-wish-top", children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: vt[u.cat] || vt.기타 }, children: u.cat }),
          /* @__PURE__ */ e("strong", { children: u.name }),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => i(u), "aria-label": `${u.name} 수정`, children: /* @__PURE__ */ e(ue, { size: 16 }) })
        ] }),
        u.area && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(me, { size: 13 }),
          u.area
        ] }),
        u.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: u.memo }),
        /* @__PURE__ */ r("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ r("a", { className: "jt-maplink", href: Kt(u), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(_t, { size: 14 }),
            "구글맵에서 열기"
          ] }),
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "jt-maplink",
              onClick: () => s(p === u.id ? null : u.id),
              "aria-expanded": p === u.id,
              children: [
                /* @__PURE__ */ e(Oa, { size: 14 }),
                p === u.id ? "지도 닫기" : "지도 미리보기"
              ]
            }
          )
        ] }),
        p === u.id && /* @__PURE__ */ r("div", { className: "jt-embed", children: [
          /* @__PURE__ */ e(
            "iframe",
            {
              title: `${u.name} 지도`,
              src: jn(u),
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
              className: "jt-like" + (b ? " on" : ""),
              onClick: () => f(u.id),
              "aria-pressed": b,
              "aria-label": "가고 싶어요",
              children: [
                /* @__PURE__ */ e(de, { size: 16, fill: b ? "currentColor" : "none" }),
                "가고 싶어요 ",
                u.likes.length
              ]
            }
          ),
          /* @__PURE__ */ e(Ht, { item: u, me: n, onReact: (l) => j(u.id, l) }),
          u.planned != null ? /* @__PURE__ */ r("span", { className: "jt-planned", style: { color: Z[u.planned % Z.length] }, children: [
            u.planned + 1,
            "일차 일정에 있어요"
          ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => g(u), children: "일정에 넣기" }),
          /* @__PURE__ */ e(
            be,
            {
              count: (u.comments || []).length,
              open: y === u.id,
              onClick: () => h(y === u.id ? null : u.id)
            }
          ),
          /* @__PURE__ */ r("span", { className: "jt-by grow", children: [
            /* @__PURE__ */ e(nt, { name: u.by, members: t.members, size: 16 }),
            u.by
          ] }),
          /* @__PURE__ */ e(ut, { onConfirm: () => c(u.id), label: "" })
        ] }),
        y === u.id && /* @__PURE__ */ e(
          Yt,
          {
            comments: u.comments || [],
            me: n,
            members: t.members,
            onAdd: (l) => d(u.id, l),
            onDelete: (l) => x(u.id, l)
          }
        )
      ] }, u.id);
    }) })
  ] });
}
function Xe({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((o, i) => /* @__PURE__ */ r("li", { className: o.from === n || o.to === n ? "mine" : "", children: [
    /* @__PURE__ */ r("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: o.from }),
      /* @__PURE__ */ e(ta, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: o.to })
    ] }),
    /* @__PURE__ */ r("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: J(o.v) }),
      /* @__PURE__ */ e("em", { children: $t(o.v, a) })
    ] })
  ] }, i)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function no({ e: t, members: a, rate: n, onEdit: o }) {
  let { Icon: i, color: f } = se(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ r("button", { type: "button", className: "jt-spend", onClick: () => o(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": f }, children: /* @__PURE__ */ e(i, { size: 18 }) }),
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
      /* @__PURE__ */ e("strong", { children: J(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: $t(Number(t.amount) || 0, n) })
    ] })
  ] }) });
}
var Ze = (t) => t > 0.5 ? `받을 돈 ${J(t)}` : t < -0.5 ? `보낼 돈 ${J(-t)}` : "주고받을 돈 없음", Ot = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function oo({ settings: t, spend: a, me: n, onEdit: o }) {
  let { members: i, rate: f, start: g } = t, [c, d] = N("me"), x = a.reduce((p, s) => p + (Number(s.amount) || 0), 0), j = Ut(() => Ue(a, i), [a, i]), y = Ut(() => {
    let p = {};
    return a.forEach((s) => p[s.cat] = (p[s.cat] || 0) + (Number(s.amount) || 0)), ea.filter((s) => p[s]).map((s) => ({ c: s, v: p[s] }));
  }, [a]), h = Ut(() => {
    let p = {};
    return a.forEach((s) => (p[s.day] = p[s.day] || []).push(s)), Object.keys(p).map(Number).sort((s, v) => s - v).map((s) => ({
      day: s,
      sum: p[s].reduce((v, u) => v + (Number(u.amount) || 0), 0),
      items: [...p[s]].sort((v, u) => u.createdAt - v.createdAt),
      res: Ue(p[s], i)
    }));
  }, [a, i]), w = j.net[n] || 0, m = j.moves.filter((p) => p.from === n || p.to === n);
  return a.length === 0 ? /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: J(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Wt(t) })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: J(x) }),
      /* @__PURE__ */ r("em", { children: [
        "약 ",
        $t(x, f),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        J(j.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Wt(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: y.map(({ c: p, v: s }) => /* @__PURE__ */ e("i", { style: { flexGrow: s, background: se(p).color } }, p)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: y.map(({ c: p, v: s }) => /* @__PURE__ */ r("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: se(p).color } }),
        p,
        " ",
        /* @__PURE__ */ r("b", { children: [
          Math.round(s / x * 100),
          "%"
        ] })
      ] }, p)) })
    ] }),
    j.skipped.length > 0 && /* @__PURE__ */ r("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ r("strong", { children: [
        "정산에서 빠진 경비가 ",
        j.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: j.skipped.map((p) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => o(p), children: [
        /* @__PURE__ */ r("span", { children: [
          p.title,
          " ",
          /* @__PURE__ */ r("em", { children: [
            "(",
            p.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: J(Number(p.amount) || 0) })
      ] }) }, p.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([p, s]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": c === p, className: c === p ? "on" : "", onClick: () => d(p), children: s }, p)) }),
    c === "me" && /* @__PURE__ */ r(at, { children: [
      /* @__PURE__ */ r("div", { className: "jt-mybal " + (Ot(w) || "even"), children: [
        /* @__PURE__ */ r("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(nt, { name: n, members: i, size: 32 }),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ r("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
