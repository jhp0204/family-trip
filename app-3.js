scaledSize: new y.Size(D, E),
      anchor: new y.Point(D / 2, E)
    };
  };
  return H(() => {
    let w = k.current, i = c.current;
    !w || !i || (z.current.forEach((b) => b.setMap(null)), z.current = r.map((b) => {
      let y = new i.Marker({ position: { lat: b.lat, lng: b.lng }, map: w, title: b.label, icon: m(b.color, b.id === x, b.text), zIndex: b.id === x ? 10 : 1 });
      return y.addListener("click", () => s.current.onPinTap(b.id)), y;
    }));
  }, [r, x, u]), H(() => {
    let w = k.current, i = c.current;
    f.current && f.current.setMap(null), f.current = null, !(!w || !i || !l) && (f.current = new i.Marker({ position: { lat: l.lat, lng: l.lng }, map: w, icon: m("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [l, u]), u === "fail" ? /* @__PURE__ */ e(ya, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: v, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    u === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function wa(t) {
  return t.gkey && !yt ? /* @__PURE__ */ e(co, { ...t }) : /* @__PURE__ */ e(ya, { ...t });
}
var pa = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], mo = [500, 1e3, 2e3], be = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function ee(t, a) {
  let n = (g) => g * Math.PI / 180, r = n(a.lat - t.lat), l = n(a.lng - t.lng), x = Math.sin(r / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(l / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(x));
}
var ka = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function uo(t, a, n, r) {
  let l = await Se(t), { Place: x, SearchNearbyRankPreference: g } = await l.importLibrary("places"), { places: p } = await x.searchNearby({
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
    locationRestriction: { center: a, radius: r },
    includedTypes: n.g,
    maxResultCount: 15,
    rankPreference: g.POPULARITY,
    language: "ko"
  }), d = [];
  for (let h of p || []) {
    let v;
    try {
      v = h.regularOpeningHours ? await h.isOpen() : void 0;
    } catch {
      v = void 0;
    }
    d.push({
      id: h.id,
      placeId: h.id,
      name: h.displayName,
      lat: h.location.lat(),
      lng: h.location.lng(),
      type: h.primaryTypeDisplayName || n.label,
      rating: h.rating,
      count: h.userRatingCount,
      addr: h.formattedAddress || "",
      url: h.googleMapsURI || "",
      open: v
    });
  }
  return d;
}
async function go(t, a, n) {
  let r = `[out:json][timeout:20];nwr(around:${n},${t.lat},${t.lng})${a.osm}["name"];out center 40;`, l = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(r));
  if (!l.ok) throw new Error("osm");
  return ((await l.json()).elements || []).map((g) => {
    let p = g.tags || {}, d = p["name:ko"] || p["name:en"] || "";
    return {
      id: "osm" + g.type + g.id,
      name: d || p.name,
      sub: d && p.name && p.name !== d ? p.name : "",
      lat: g.lat != null ? g.lat : g.center && g.center.lat,
      lng: g.lon != null ? g.lon : g.center && g.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((g) => g.lat && g.name);
}
async function fo(t, a, n) {
  let r = n || { lat: st.lat, lng: st.lng };
  if (a && !yt)
    try {
      let g = await Se(a), { Place: p } = await g.importLibrary("places"), { places: d } = await p.searchText({
        textQuery: t,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: r
      });
      if (d && d.length)
        return d.map((h) => ({
          name: h.displayName,
          area: h.formattedAddress || "",
          lat: h.location.lat(),
          lng: h.location.lng(),
          link: h.googleMapsURI || "",
          placeId: h.id
        }));
    } catch {
    }
  let l = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(t)
  );
  if (!l.ok) throw new Error("search");
  return (await l.json()).map((g) => {
    let p = String(g.display_name || "").split(",").map((d) => d.trim());
    return { name: g.name || p[0] || t, area: p.slice(1, 3).join(" "), lat: Number(g.lat), lng: Number(g.lon), link: "" };
  });
}
function ho({ settings: t, wish: a, onSave: n }) {
  let [r, l] = N(pa[0]), [x, g] = N(1e3), [p, d] = N(null), [h, v] = N(""), [k, c] = N([]), [z, f] = N(!1), [s, u] = N(""), [A, m] = N(""), [w, i] = N({}), b = () => {
    d({ lat: st.lat, lng: st.lng, here: !1, at: Date.now() }), v("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, y = () => {
    if (v("현재 위치를 찾는 중"), !navigator.geolocation) return b();
    navigator.geolocation.getCurrentPosition(
      (E) => {
        d({ lat: E.coords.latitude, lng: E.coords.longitude, here: !0, at: Date.now() }), v("");
      },
      b,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  H(() => {
    y();
  }, []), H(() => {
    if (!p) return;
    let E = !0;
    return (async () => {
      f(!0), u("");
      let R = null, S = "";
      if (t.gmapsKey && !yt)
        try {
          R = await uo(t.gmapsKey, { lat: p.lat, lng: p.lng }, r, x), S = "google";
        } catch {
          R = null;
        }
      if (!R)
        try {
          R = await go(p, r, x), S = "osm";
        } catch {
          E && (c([]), u("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), f(!1));
          return;
        }
      R.forEach((M) => M.dist = ee(p, M)), S === "osm" && R.sort((M, _) => M.dist - _.dist), E && (c(R.slice(0, 20)), m(S), f(!1), R.length || u(`반경 ${be(x)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      E = !1;
    };
  }, [p, r, x, t.gmapsKey]);
  let D = (E) => w[E.id] || a.some((R) => E.placeId && R.placeId === E.placeId || R.name === E.name && Ft(R) && Math.abs(R.lat - E.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ e(Mn, { size: 15 }),
        p ? p.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        be(x)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: y, children: "위치 다시 찾기" })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: h }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: pa.map((E) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (r.id === E.id ? " on" : ""), onClick: () => l(E), children: E.label }, E.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: mo.map((E) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": x === E, className: x === E ? "on" : "", onClick: () => g(E), children: be(E) }, E)) }),
    z && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      r.label,
      " 찾는 중"
    ] }),
    !z && s && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: s }) }),
    !z && k.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: k.map((E) => {
      let R = D(E);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: E.name }),
          E.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: E.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            E.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(Sn, { size: 13, fill: "currentColor" }),
              E.rating.toFixed(1),
              E.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                E.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: E.type }),
            E.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            E.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(ga, { size: 12 }),
            ka(E.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          R ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(ma, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: E.name,
                  cat: r.wish,
                  area: E.addr || E.sub || "",
                  link: E.url || "",
                  memo: E.rating != null ? `구글 평점 ${E.rating.toFixed(1)}${E.count ? ` (${E.count}명)` : ""}` : "",
                  lat: E.lat,
                  lng: E.lng,
                  ...E.placeId ? { placeId: E.placeId } : {}
                }), i({ ...w, [E.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: E.url || Jt({ lat: E.lat, lng: E.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(It, { size: 13 }),
            "구글맵"
          ] })
        ] })
      ] }, E.id);
    }) }),
    A && k.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: A === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function bo({ settings: t, wish: a, me: n, onSave: r, onEdit: l, onLike: x, onPlan: g, onDelete: p, onComment: d, onDelComment: h, onReact: v }) {
  let k = a.filter(Ft), [c, z] = N(
    () => k.length ? {
      lat: k.reduce((j, O) => j + O.lat, 0) / k.length,
      lng: k.reduce((j, O) => j + O.lng, 0) / k.length,
      z: k.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [f, s] = N(null), [u, A] = N(null), [m, w] = N(""), [i, b] = N([]), [y, D] = N(!1), [E, R] = N(""), S = a.find((j) => j.id === u), M = k.map((j) => `${j.id}:${j.lat}:${j.lng}:${j.cat}`).join("|"), _ = Bt(
    () => k.map((j) => ({
      id: j.id,
      lat: j.lat,
      lng: j.lng,
      color: At[j.cat] || At.기타,
      label: j.name
    })),
    [M]
  ), B = async () => {
    let j = m.trim();
    if (j) {
      if (D(!0), R(""), b([]), po(t.gmapsKey))
        try {
          let { Place: O } = await window.google.maps.importLibrary("places"), { places: G } = await O.searchText({
            textQuery: j,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: c.lat, lng: c.lng }
          });
          if (G && G.length) {
            b(
              G.map((nt) => ({
                lat: nt.location.lat(),
                lng: nt.location.lng(),
                name: nt.displayName,
                area: nt.formattedAddress || "",
                link: nt.googleMapsURI || "",
                placeId: nt.id
              }))
            ), D(!1);
            return;
          }
        } catch {
        }
      try {
        let O = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(j)
        );
        if (!O.ok) throw new Error("search failed");
        let G = await O.json();
        G.length || R("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), b(
          G.map((nt) => {
            let bt = String(nt.display_name || "").split(",").map((ae) => ae.trim());
            return {
              lat: Number(nt.lat),
              lng: Number(nt.lon),
              name: nt.name || bt[0] || j,
              area: bt.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        R("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      D(!1);
    }
  }, q = (j) => {
    z({ lat: j.lat, lng: j.lng, z: 16 }), A(null), s({ lat: j.lat, lng: j.lng, name: j.name, cat: "맛집", area: j.area, link: j.link || "", placeId: j.placeId }), b([]);
  }, L = S && S.likes.includes(n);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: m,
          onChange: (j) => w(j.target.value),
          onKeyDown: (j) => j.key === "Enter" && B(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: B, disabled: y, children: y ? "검색 중" : "검색" })
    ] }),
    E && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: E }),
    i.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: i.map((j, O) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => q(j), children: [
      /* @__PURE__ */ e("strong", { children: j.name }),
      /* @__PURE__ */ e("span", { children: j.area })
    ] }) }, O)) }),
    /* @__PURE__ */ e(
      wa,
      {
        gkey: t.gmapsKey,
        onPoi: (j) => {
          A(null), s({ ...j, cat: "맛집" });
        },
        view: c,
        setView: z,
        pins: _,
        temp: f,
        selectedId: u,
        onTap: (j, O) => {
          A(null), s({ lat: Number(j.toFixed(6)), lng: Number(O.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (j) => {
          s(null), A(j);
        }
      }
    ),
    !f && !S && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      k.length,
      "개예요."
    ] }),
    f && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: f.name,
          onChange: (j) => s({ ...f, name: j.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: ze.map((j) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (f.cat === j ? " on" : ""),
          onClick: () => s({ ...f, cat: j }),
          children: j
        },
        j
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !f.name.trim(),
            onClick: () => {
              r({
                name: f.name.trim(),
                cat: f.cat,
                area: f.area || "",
                link: f.link || "",
                memo: "",
                lat: f.lat,
                lng: f.lng,
                ...f.placeId ? { placeId: f.placeId } : {}
              }), s(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => s(null), children: "취소" })
      ] })
    ] }),
    S && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: At[S.cat] || At.기타 }, children: S.cat }),
        /* @__PURE__ */ e("strong", { children: S.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => l(S), "aria-label": `${S.name} 수정`, children: /* @__PURE__ */ e(ua, { size: 16 }) })
      ] }),
      S.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(Yt, { size: 13 }),
        S.area
      ] }),
      S.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: S.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-like" + (L ? " on" : ""),
            onClick: () => x(S.id),
            "aria-pressed": L,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(Ne, { size: 16, fill: L ? "currentColor" : "none" }),
              "가고 싶어요 ",
              S.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Ee, { item: S, me: n, onReact: (j) => v(S.id, j) }),
        S.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: Q[S.planned % Q.length] }, children: [
          S.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => g(S), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(it, { name: S.by, members: t.members, size: 16 }),
          S.by
        ] }),
        /* @__PURE__ */ e(
          wt,
          {
            onConfirm: () => {
              p(S.id), A(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "jt-maprow", children: /* @__PURE__ */ o("a", { className: "jt-maplink", href: Jt(S), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(It, { size: 14 }),
        "구글맵에서 열기"
      ] }) }),
      /* @__PURE__ */ e(
        Me,
        {
          comments: S.comments || [],
          me: n,
          members: t.members,
          onAdd: (j) => d(S.id, j),
          onDelete: (j) => h(S.id, j)
        }
      )
    ] })
  ] });
}
function xo(t) {
  let [a, n] = N("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([r, l]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === r, className: a === r ? "on" : "", onClick: () => n(r), children: l }, r)) }),
    a === "list" && /* @__PURE__ */ e(jo, { ...t }),
    a === "map" && /* @__PURE__ */ e(bo, { ...t }),
    a === "near" && /* @__PURE__ */ e(ho, { ...t })
  ] });
}
function jo({ settings: t, wish: a, me: n, onAdd: r, onEdit: l, onLike: x, onPlan: g, onDelete: p, onComment: d, onDelComment: h, onReact: v }) {
  let [k, c] = N(null), [z, f] = N("전체"), [s, u] = N(null), A = a.filter((m) => z === "전체" || m.cat === z).sort((m, w) => w.likes.length - m.likes.length || w.createdAt - m.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...ze].map((m) => /* @__PURE__ */ e("button", { className: "jt-chip" + (z === m ? " on" : ""), onClick: () => f(m), children: m }, m)) }),
    A.length === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: A.map((m) => {
      let w = m.likes.includes(n);
      return /* @__PURE__ */ o("li", { className: "jt-wish", children: [
        /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: At[m.cat] || At.기타 }, children: m.cat }),
          /* @__PURE__ */ e("strong", { children: m.name }),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => l(m), "aria-label": `${m.name} 수정`, children: /* @__PURE__ */ e(ua, { size: 16 }) })
        ] }),
        m.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(Yt, { size: 13 }),
          m.area
        ] }),
        m.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: m.memo }),
        /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: Jt(m), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(It, { size: 14 }),
            "구글맵에서 열기"
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-maplink",
              onClick: () => u(s === m.id ? null : m.id),
              "aria-expanded": s === m.id,
              children: [
                /* @__PURE__ */ e(en, { size: 14 }),
                s === m.id ? "지도 닫기" : "지도 미리보기"
              ]
            }
          )
        ] }),
        s === m.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
          /* @__PURE__ */ e(
            "iframe",
            {
              title: `${m.name} 지도`,
              src: Rn(m),
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              allowFullScreen: !0
            }
          ),
          /* @__PURE__ */ e("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
          /* @__PURE__ */ o(
            "button",
            {
              className: "jt-like" + (w ? " on" : ""),
              onClick: () => x(m.id),
              "aria-pressed": w,
              "aria-label": "가고 싶어요",
              children: [
                /* @__PURE__ */ e(Ne, { size: 16, fill: w ? "currentColor" : "none" }),
                "가고 싶어요 ",
                m.likes.length
              ]
            }
          ),
          /* @__PURE__ */ e(Ee, { item: m, me: n, onReact: (i) => v(m.id, i) }),
          m.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: Q[m.planned % Q.length] }, children: [
            m.planned + 1,
            "일차 일정에 있어요"
          ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => g(m), children: "일정에 넣기" }),
          /* @__PURE__ */ e(
            ja,
            {
              count: (m.comments || []).length,
              open: k === m.id,
              onClick: () => c(k === m.id ? null : m.id)
            }
          ),
          /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
            /* @__PURE__ */ e(it, { name: m.by, members: t.members, size: 16 }),
            m.by
          ] }),
          /* @__PURE__ */ e(wt, { onConfirm: () => p(m.id), label: "" })
        ] }),
        k === m.id && /* @__PURE__ */ e(
          Me,
          {
            comments: m.comments || [],
            me: n,
            members: t.members,
            onAdd: (i) => d(m.id, i),
            onDelete: (i) => h(m.id, i)
          }
        )
      ] }, m.id);
    }) })
  ] });
}
function ca({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((r, l) => /* @__PURE__ */ o("li", { className: r.from === n || r.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: r.from }),
      /* @__PURE__ */ e(sn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: r.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: Y(r.v) }),
      /* @__PURE__ */ e("em", { children: Kt(r.v, a) })
    ] })
  ] }, l)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function vo({ e: t, members: a, rate: n, onEdit: r }) {
  let { Icon: l, color: x } = je(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => r(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": x }, children: /* @__PURE__ */ e(l, { size: 18 }) }),
    /* @__PURE__ */ o("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ e("div", { className: "jt-spend-name", children: t.title }),
      /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        t.payer,
        "이(가) 냄, ",
        (t.split || []).length === a.length ? "모두" : (t.split || []).join(", "),
        " 나눔",
        t.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-spend-amt", children: [
      /* @__PURE__ */ e("strong", { children: Y(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: Kt(Number(t.amount) || 0, n) })
    ] })
  ] }) });
}
var da = (t) => t > 0.5 ? `받을 돈 ${Y(t)}` : t < -0.5 ? `보낼 돈 ${Y(-t)}` : "주고받을 돈 없음", Qt = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function yo({ settings: t, spend: a, me: n, onEdit: r }) {
  let { members: l, rate: x, start: g } = t, [p, d] = N("me"), h = a.reduce((s, u) => s + (Number(u.amount) || 0), 0), v = Bt(() => na(a, l), [a, l]), k = Bt(() => {
    let s = {};
    return a.forEach((u) => s[u.cat] = (s[u.cat] || 0) + (Number(u.amount) || 0)), fa.filter((u) => s[u]).map((u) => ({ c: u, v: s[u] }));
  }, [a]), c = Bt(() => {
    let s = {};
    return a.forEach((u) => (s[u.day] = s[u.day] || []).push(u)), Object.keys(s).map(Number).sort((u, A) => u - A).map((u) => ({
      day: u,
      sum: s[u].reduce((A, m) => A + (Number(m.amount) || 0), 0),
      items: [...s[u]].sort((A, m) => m.createdAt - A.createdAt),
      res: na(s[u], l)
    }));
  }, [a, l]), z = v.net[n] || 0, f = v.moves.filter((s) => s.from === n || s.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: Y(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: te(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: Y(h) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Kt(h, x),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        Y(v.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: te(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: k.map(({ c: s, v: u }) => /* @__PURE__ */ e("i", { style: { flexGrow: u, background: je(s).color } }, s)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: k.map(({ c: s, v: u }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: je(s).color } }),
        s,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(u / h * 100),
          "%"
        ] })
      ] }, s)) })
    ] }),
    v.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        v.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: v.skipped.map((s) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => r(s), children: [
        /* @__PURE__ */ o("span", { children: [
          s.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            s.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: Y(Number(s.amount) || 0) })
      ] }) }, s.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([s, u]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": p === s, className: p === s ? "on" : "", onClick: () => d(s), children: u }, s)) }),
    p === "me" && /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (Qt(z) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(it, { name: n, members: l, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: z > 0.5 ? `${Y(z)} 받으면 돼요` : z < -0.5 ? `${Y(-z)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        f.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: f.map((s, u) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("span", { children: s.from === n ? /* @__PURE__ */ o(pt, { children: [
            /* @__PURE__ */ e("b", { children: s.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(pt, { children: [
            /* @__PURE__ */ e("b", { children: s.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: Y(s.v) }),
            /* @__PURE__ */ e("em", { children: Kt(s.v, x) })
          ] })
        ] }, u)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: Y(v.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              Y(v.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: z > 0.5 ? "더 결제했으니 받을 돈" : z < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: Qt(z), children: z > 0.5 ? Y(z) : z < -0.5 ? Y(-z) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: c.map((s) => {
        let u = dt(g, s.day), A = s.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": Q[s.day % Q.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            s.day + 1,
            "일차 ",
            Ot(u),
            " (",
            Ut(u),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            Y(s.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            Y(s.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + Qt(A), children: da(A) })
        ] }, s.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    p === "day" && /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      c.map((s) => {
        let u = dt(g, s.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": Q[s.day % Q.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: s.day + 1 }),
            Ot(u),
            " (",
            Ut(u),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: Y(s.sum) })
          ] }),
          /* @__PURE__ */ e(ca, { moves: s.res.moves, rate: x, me: n }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: s.items.map((A) => /* @__PURE__ */ e(vo, { e: A, members: l, rate: x, onEdit: r }, A.id)) })
        ] }, s.day);
      })
    ] }),
    p === "all" && /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(ca, { moves: v.moves, rate: x, me: n }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: l.map((s) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e(it, { name: s, members: l, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: s }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            Y(v.paid[s]),
            ", 쓴 돈 ",
            Y(v.share[s])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + Qt(v.net[s]), children: da(v.net[s]) })
      ] }, s)) })
    ] })
  ] });
}
var xe = "trip:loc:", wo = 3 * 6e4, ko = (t, a) => Q[(Math.max(0, t.indexOf(a)) * 2 + 3) % Q.length], No = (t) => !!t && t.online && typeof t.lat == "number" && Date.now() - t.at < wo, Co = (t) => `https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`;
function zo({ settings: t, me: a, locs: n, shareOn: r, onToggle: l, myPos: x, geoErr: g }) {
  let [p, d] = N(!1), [, h] = N(0);
  H(() => {
    let y = setInterval(() => h((D) => D + 1), 3e4);
    return () => clearInterval(y);
  }, []);
  let v = t.members, k = v.map((y) => ({ m: y, l: n[y], live: No(n[y]) })), c = k.filter((y) => y.live).map((y) => ({ id: y.m, lat: y.l.lat, lng: y.l.lng, color: ko(v, y.m), label: y.m, text: y.m[0] })), z = c.map((y) => `${y.id}:${y.lat.toFixed(5)}:${y.lng.toFixed(5)}`).join("|"), f = Bt(() => c, [z]), [s, u] = N(null), [A, m] = N(() => {
