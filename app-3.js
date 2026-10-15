let s = x.current, v = j.current;
    !s || !v || (y.current.forEach((u) => u.remove()), y.current = o.map((u) => {
      let b = document.createElement("button");
      return b.type = "button", b.className = "jt-mlpin" + (u.id === f ? " sel" : ""), b.setAttribute("aria-label", u.label), b.innerHTML = pe(u.color, u.id === f), b.addEventListener("click", (l) => {
        l.stopPropagation(), w.current.onPinTap(u.id);
      }), new v.Marker({ element: b, anchor: "bottom" }).setLngLat([u.lng, u.lat]).addTo(s);
    }));
  }, [o, f, m]), K(() => {
    let s = x.current, v = j.current;
    if (h.current && h.current.remove(), h.current = null, !s || !v || !i) return;
    let u = document.createElement("div");
    u.className = "jt-mlpin temp", u.innerHTML = pe("#14213D", !0), h.current = new v.Marker({ element: u, anchor: "bottom" }).setLngLat([i.lng, i.lat]).addTo(s);
  }, [i, m]), m === "fail" ? /* @__PURE__ */ e($n, { ...t }) : /* @__PURE__ */ r("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: d, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (m === "loading" || m === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: m === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Ft = null, xt = "", wt = !1, ce = /* @__PURE__ */ new Set();
function la(t) {
  return wt ? Promise.reject(new Error("auth")) : Ft && xt === t ? Ft : xt && xt !== t ? Promise.reject(new Error("reload")) : (xt = t, Ft = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      wt = !0, ce.forEach((i) => i()), n(new Error("auth"));
    };
    let o = document.createElement("script");
    o.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", o.async = !0, o.onerror = () => {
      Ft = null, xt = "", n(new Error("load"));
    }, document.head.appendChild(o);
  }), Ft);
}
var Bn = (t) => !!t && !wt && xt === t && !!(window.google && window.google.maps);
function On(t) {
  let { view: a, setView: n, pins: o, temp: i, selectedId: f, onTap: g, onPinTap: c, onPoi: d, gkey: x } = t, j = J(null), y = J(null), h = J(null), w = J([]), m = J(null), p = J({});
  p.current = { onTap: g, onPinTap: c, onPoi: d, setView: n };
  let [s, v] = N(wt ? "fail" : "loading");
  K(() => {
    let b = !0, l = () => b && v("fail");
    return ce.add(l), la(x).then(async (M) => {
      let { Map: I } = await M.importLibrary("maps"), { Marker: O } = await M.importLibrary("marker"), { Size: S, Point: _ } = await M.importLibrary("core");
      if (!b || !j.current) return;
      h.current = { Marker: O, Size: S, Point: _ };
      let C = new I(j.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      C.addListener("click", async (k) => {
        if (k.placeId) {
          k.stop();
          try {
            let { Place: F } = await M.importLibrary("places"), T = new F({ id: k.placeId });
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
      }), C.addListener("idle", () => {
        let k = C.getCenter();
        p.current.setView({ lat: k.lat(), lng: k.lng(), z: C.getZoom() });
      }), y.current = C, v("ok");
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
    let M = h.current, I = l ? 34 : 28, O = l ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(pe(b, l).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new M.Size(I, O),
      anchor: new M.Point(I / 2, O)
    };
  };
  return K(() => {
    let b = y.current, l = h.current;
    !b || !l || (w.current.forEach((M) => M.setMap(null)), w.current = o.map((M) => {
      let I = new l.Marker({ position: { lat: M.lat, lng: M.lng }, map: b, title: M.label, icon: u(M.color, M.id === f), zIndex: M.id === f ? 10 : 1 });
      return I.addListener("click", () => p.current.onPinTap(M.id)), I;
    }));
  }, [o, f, s]), K(() => {
    let b = y.current, l = h.current;
    m.current && m.current.setMap(null), m.current = null, !(!b || !l || !i) && (m.current = new l.Marker({ position: { lat: i.lat, lng: i.lng }, map: b, icon: u("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [i, s]), s === "fail" ? /* @__PURE__ */ e(sa, { ...t }) : /* @__PURE__ */ r("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: j, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    s === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Un(t) {
  return t.gkey && !wt ? /* @__PURE__ */ e(On, { ...t }) : /* @__PURE__ */ e(sa, { ...t });
}
var Ge = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Wn = [500, 1e3, 2e3], ie = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function Kn(t, a) {
  let n = (g) => g * Math.PI / 180, o = n(a.lat - t.lat), i = n(a.lng - t.lng), f = Math.sin(o / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(i / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(f));
}
var Hn = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Yn(t, a, n, o) {
  let i = await la(t), { Place: f, SearchNearbyRankPreference: g } = await i.importLibrary("places"), { places: c } = await f.searchNearby({
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
async function Jn(t, a, n) {
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
function Gn({ settings: t, wish: a, onSave: n }) {
  let [o, i] = N(Ge[0]), [f, g] = N(1e3), [c, d] = N(null), [x, j] = N(""), [y, h] = N([]), [w, m] = N(!1), [p, s] = N(""), [v, u] = N(""), [b, l] = N({}), M = () => {
    d({ lat: yt.lat, lng: yt.lng, here: !1, at: Date.now() }), j("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, I = () => {
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
    I();
  }, []), K(() => {
    if (!c) return;
    let S = !0;
    return (async () => {
      m(!0), s("");
      let _ = null, C = "";
      if (t.gmapsKey && !wt)
        try {
          _ = await Yn(t.gmapsKey, { lat: c.lat, lng: c.lng }, o, f), C = "google";
        } catch {
          _ = null;
        }
      if (!_)
        try {
          _ = await Jn(c, o, f), C = "osm";
        } catch {
          S && (h([]), s("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), m(!1));
          return;
        }
      _.forEach((k) => k.dist = Kn(c, k)), C === "osm" && _.sort((k, F) => k.dist - F.dist), S && (h(_.slice(0, 20)), u(C), m(!1), _.length || s(`반경 ${ie(f)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      S = !1;
    };
  }, [c, o, f, t.gmapsKey]);
  let O = (S) => b[S.id] || a.some((_) => S.placeId && _.placeId === S.placeId || _.name === S.name && _t(_) && Math.abs(_.lat - S.lat) < 5e-4);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ r("span", { children: [
        /* @__PURE__ */ e(on, { size: 15 }),
        c ? c.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        ie(f)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: I, children: "위치 다시 찾기" })
    ] }),
    x && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: x }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: Ge.map((S) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (o.id === S.id ? " on" : ""), onClick: () => i(S), children: S.label }, S.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Wn.map((S) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": f === S, className: f === S ? "on" : "", onClick: () => g(S), children: ie(S) }, S)) }),
    w && /* @__PURE__ */ r("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      o.label,
      " 찾는 중"
    ] }),
    !w && p && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: p }) }),
    !w && y.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: y.map((S) => {
      let _ = O(S);
      return /* @__PURE__ */ r("li", { className: "jt-near", children: [
        /* @__PURE__ */ r("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: S.name }),
          S.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: S.sub }),
          /* @__PURE__ */ r("div", { className: "jt-near-meta", children: [
            S.rating != null && /* @__PURE__ */ r("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(rn, { size: 13, fill: "currentColor" }),
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
            /* @__PURE__ */ e(sn, { size: 12 }),
            Hn(S.dist)
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "jt-near-act", children: [
          _ ? /* @__PURE__ */ r("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(Ze, { size: 14 }),
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
          /* @__PURE__ */ r("a", { className: "jt-maplink", href: S.url || Ht({ lat: S.lat, lng: S.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Rt, { size: 13 }),
            "구글맵"
          ] })
        ] })
      ] }, S.id);
    }) }),
    v && y.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: v === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function qn({ settings: t, wish: a, me: n, onSave: o, onEdit: i, onLike: f, onPlan: g, onDelete: c, onComment: d, onDelComment: x, onReact: j }) {
  let y = a.filter(_t), [h, w] = N(
    () => y.length ? {
      lat: y.reduce((z, U) => z + U.lat, 0) / y.length,
      lng: y.reduce((z, U) => z + U.lng, 0) / y.length,
      z: y.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [m, p] = N(null), [s, v] = N(null), [u, b] = N(""), [l, M] = N([]), [I, O] = N(!1), [S, _] = N(""), C = a.find((z) => z.id === s), k = y.map((z) => `${z.id}:${z.lat}:${z.lng}:${z.cat}`).join("|"), F = Wt(
    () => y.map((z) => ({
      id: z.id,
      lat: z.lat,
      lng: z.lng,
      color: jt[z.cat] || jt.기타,
      label: z.name
    })),
    [k]
  ), T = async () => {
    let z = u.trim();
    if (z) {
      if (O(!0), _(""), M([]), Bn(t.gmapsKey))
        try {
          let { Place: U } = await window.google.maps.importLibrary("places"), { places: q } = await U.searchText({
            textQuery: z,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: h.lat, lng: h.lng }
          });
          if (q && q.length) {
            M(
              q.map((Q) => ({
                lat: Q.location.lat(),
                lng: Q.location.lng(),
                name: Q.displayName,
                area: Q.formattedAddress || "",
                link: Q.googleMapsURI || "",
                placeId: Q.id
              }))
            ), O(!1);
            return;
          }
        } catch {
        }
      try {
        let U = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(z)
        );
        if (!U.ok) throw new Error("search failed");
        let q = await U.json();
        q.length || _("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), M(
          q.map((Q) => {
            let Lt = String(Q.display_name || "").split(",").map((Tt) => Tt.trim());
            return {
              lat: Number(Q.lat),
              lng: Number(Q.lon),
              name: Q.name || Lt[0] || z,
              area: Lt.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        _("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      O(!1);
    }
  }, Z = (z) => {
    w({ lat: z.lat, lng: z.lng, z: 16 }), v(null), p({ lat: z.lat, lng: z.lng, name: z.name, cat: "맛집", area: z.area, link: z.link || "", placeId: z.placeId }), M([]);
  }, R = C && C.likes.includes(n);
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: u,
          onChange: (z) => b(z.target.value),
          onKeyDown: (z) => z.key === "Enter" && T(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: T, disabled: I, children: I ? "검색 중" : "검색" })
    ] }),
    S && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: S }),
    l.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: l.map((z, U) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => Z(z), children: [
      /* @__PURE__ */ e("strong", { children: z.name }),
      /* @__PURE__ */ e("span", { children: z.area })
    ] }) }, U)) }),
    /* @__PURE__ */ e(
      Un,
      {
        gkey: t.gmapsKey,
        onPoi: (z) => {
          v(null), p({ ...z, cat: "맛집" });
        },
        view: h,
        setView: w,
        pins: F,
        temp: m,
        selectedId: s,
        onTap: (z, U) => {
          v(null), p({ lat: Number(z.toFixed(6)), lng: Number(U.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (z) => {
          p(null), v(z);
        }
      }
    ),
    !m && !C && /* @__PURE__ */ r("p", { className: "jt-hint jt-mapmsg", children: [
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
          onChange: (z) => p({ ...m, name: z.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: fe.map((z) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (m.cat === z ? " on" : ""),
          onClick: () => p({ ...m, cat: z }),
          children: z
        },
        z
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
    C && /* @__PURE__ */ r("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ r("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: jt[C.cat] || jt.기타 }, children: C.cat }),
        /* @__PURE__ */ e("strong", { children: C.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => i(C), "aria-label": `${C.name} 수정`, children: /* @__PURE__ */ e(ue, { size: 16 }) })
      ] }),
      C.area && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(me, { size: 13 }),
        C.area
      ] }),
      C.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: C.memo }),
      /* @__PURE__ */ r("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "jt-like" + (R ? " on" : ""),
            onClick: () => f(C.id),
            "aria-pressed": R,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(de, { size: 16, fill: R ? "currentColor" : "none" }),
              "가고 싶어요 ",
              C.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Yt, { item: C, me: n, onReact: (z) => j(C.id, z) }),
        C.planned != null ? /* @__PURE__ */ r("span", { className: "jt-planned", style: { color: X[C.planned % X.length] }, children: [
          C.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => g(C), children: "일정에 넣기" }),
        /* @__PURE__ */ r("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(at, { name: C.by, members: t.members, size: 16 }),
          C.by
        ] }),
        /* @__PURE__ */ e(
          ut,
          {
            onConfirm: () => {
              c(C.id), v(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "jt-maprow", children: /* @__PURE__ */ r("a", { className: "jt-maplink", href: Ht(C), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Rt, { size: 14 }),
        "구글맵에서 열기"
      ] }) }),
      /* @__PURE__ */ e(
        Jt,
        {
          comments: C.comments || [],
          me: n,
          members: t.members,
          onAdd: (z) => d(C.id, z),
          onDelete: (z) => x(C.id, z)
        }
      )
    ] })
  ] });
}
function Xn(t) {
  let [a, n] = N("list");
  return /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([o, i]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === o, className: a === o ? "on" : "", onClick: () => n(o), children: i }, o)) }),
    a === "list" && /* @__PURE__ */ e(Zn, { ...t }),
    a === "map" && /* @__PURE__ */ e(qn, { ...t }),
    a === "near" && /* @__PURE__ */ e(Gn, { ...t })
  ] });
}
function Zn({ settings: t, wish: a, me: n, onAdd: o, onEdit: i, onLike: f, onPlan: g, onDelete: c, onComment: d, onDelComment: x, onReact: j }) {
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
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: jt[u.cat] || jt.기타 }, children: u.cat }),
          /* @__PURE__ */ e("strong", { children: u.name }),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => i(u), "aria-label": `${u.name} 수정`, children: /* @__PURE__ */ e(ue, { size: 16 }) })
        ] }),
        u.area && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(me, { size: 13 }),
          u.area
        ] }),
        u.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: u.memo }),
        /* @__PURE__ */ r("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ r("a", { className: "jt-maplink", href: Ht(u), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Rt, { size: 14 }),
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
                /* @__PURE__ */ e(La, { size: 14 }),
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
              src: gn(u),
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
          /* @__PURE__ */ e(Yt, { item: u, me: n, onReact: (l) => j(u.id, l) }),
          u.planned != null ? /* @__PURE__ */ r("span", { className: "jt-planned", style: { color: X[u.planned % X.length] }, children: [
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
            /* @__PURE__ */ e(at, { name: u.by, members: t.members, size: 16 }),
            u.by
          ] }),
          /* @__PURE__ */ e(ut, { onConfirm: () => c(u.id), label: "" })
        ] }),
        y === u.id && /* @__PURE__ */ e(
          Jt,
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
function qe({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((o, i) => /* @__PURE__ */ r("li", { className: o.from === n || o.to === n ? "mine" : "", children: [
    /* @__PURE__ */ r("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: o.from }),
      /* @__PURE__ */ e(Qe, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: o.to })
    ] }),
    /* @__PURE__ */ r("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: Y(o.v) }),
      /* @__PURE__ */ e("em", { children: Pt(o.v, a) })
    ] })
  ] }, i)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Vn({ e: t, members: a, rate: n, onEdit: o }) {
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
      /* @__PURE__ */ e("strong", { children: Y(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: Pt(Number(t.amount) || 0, n) })
    ] })
  ] }) });
}
var Xe = (t) => t > 0.5 ? `받을 돈 ${Y(t)}` : t < -0.5 ? `보낼 돈 ${Y(-t)}` : "주고받을 돈 없음", Ut = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function Qn({ settings: t, spend: a, me: n, onEdit: o }) {
  let { members: i, rate: f, start: g } = t, [c, d] = N("me"), x = a.reduce((p, s) => p + (Number(s.amount) || 0), 0), j = Wt(() => Oe(a, i), [a, i]), y = Wt(() => {
    let p = {};
    return a.forEach((s) => p[s.cat] = (p[s.cat] || 0) + (Number(s.amount) || 0)), ta.filter((s) => p[s]).map((s) => ({ c: s, v: p[s] }));
  }, [a]), h = Wt(() => {
    let p = {};
    return a.forEach((s) => (p[s.day] = p[s.day] || []).push(s)), Object.keys(p).map(Number).sort((s, v) => s - v).map((s) => ({
      day: s,
      sum: p[s].reduce((v, u) => v + (Number(u.amount) || 0), 0),
      items: [...p[s]].sort((v, u) => u.createdAt - v.createdAt),
      res: Oe(p[s], i)
    }));
  }, [a, i]), w = j.net[n] || 0, m = j.moves.filter((p) => p.from === n || p.to === n);
  return a.length === 0 ? /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: Y(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Kt(t) })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: Y(x) }),
      /* @__PURE__ */ r("em", { children: [
        "약 ",
        Pt(x, f),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        Y(j.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Kt(t) }),
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
