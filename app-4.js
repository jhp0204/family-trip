{ id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Ki = [500, 1e3, 2e3], Qe = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function Gt(t, n) {
  let o = (m) => m * Math.PI / 180, i = o(n.lat - t.lat), s = o(n.lng - t.lng), d = Math.sin(i / 2) ** 2 + Math.cos(o(t.lat)) * Math.cos(o(n.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(d));
}
var Fa = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Wi(t, n, o, i) {
  let s = await hn(t), { Place: d, SearchNearbyRankPreference: m } = await s.importLibrary("places"), { places: l } = await d.searchNearby({
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
    locationRestriction: { center: n, radius: i },
    includedTypes: o.g,
    maxResultCount: 15,
    rankPreference: m.POPULARITY,
    language: "ko"
  }), r = [];
  for (let h of l || []) {
    let k;
    try {
      k = h.regularOpeningHours ? await h.isOpen() : void 0;
    } catch {
      k = void 0;
    }
    r.push({
      id: h.id,
      placeId: h.id,
      name: h.displayName,
      lat: h.location.lat(),
      lng: h.location.lng(),
      type: h.primaryTypeDisplayName || o.label,
      rating: h.rating,
      count: h.userRatingCount,
      addr: h.formattedAddress || "",
      url: h.googleMapsURI || "",
      open: k
    });
  }
  return r;
}
async function Ui(t, n, o) {
  let i = `[out:json][timeout:20];nwr(around:${o},${t.lat},${t.lng})${n.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((m) => {
    let l = m.tags || {}, r = l["name:ko"] || l["name:en"] || "";
    return {
      id: "osm" + m.type + m.id,
      name: r || l.name,
      sub: r && l.name && l.name !== r ? l.name : "",
      lat: m.lat != null ? m.lat : m.center && m.center.lat,
      lng: m.lon != null ? m.lon : m.center && m.center.lon,
      type: n.label,
      addr: ""
    };
  }).filter((m) => m.lat && m.name);
}
async function Da(t, n, o) {
  let i = o || { lat: xt.lat, lng: xt.lng }, s = "";
  if (n && !Mt)
    try {
      let r = await hn(n), { Place: h } = await r.importLibrary("places"), k = h.searchByText || h.searchText, { places: E } = await k.call(h, {
        textQuery: t,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      return { list: (E || []).map((F) => ({
        name: F.displayName,
        area: F.formattedAddress || "",
        lat: F.location.lat(),
        lng: F.location.lng(),
        link: F.googleMapsURI || "",
        placeId: F.id
      })), engine: "google", gErr: "" };
    } catch (r) {
      s = String(r && (r.message || r.code) || r || "error");
    }
  else n && Mt && (s = "auth");
  let d = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(t)
  );
  if (!d.ok) throw new Error("search");
  return { list: (await d.json()).map((r) => {
    let h = String(r.display_name || "").split(",").map((k) => k.trim());
    return { name: r.name || h[0] || t, area: h.slice(1, 3).join(" "), lat: Number(r.lat), lng: Number(r.lon), link: "" };
  }), engine: "osm", gErr: s };
}
async function bn(t, n, o) {
  return (await Da(t, n, o)).list;
}
function Hi({ settings: t, wish: n, onSave: o }) {
  let [i, s] = y(pa[0]), [d, m] = y(1e3), [l, r] = y(null), [h, k] = y(""), [E, c] = y([]), [F, f] = y(!1), [S, v] = y(""), [N, A] = y(""), [w, x] = y({}), M = () => {
    r({ lat: xt.lat, lng: xt.lng, here: !1, at: Date.now() }), k("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, z = () => {
    if (k("현재 위치를 찾는 중"), !navigator.geolocation) return M();
    navigator.geolocation.getCurrentPosition(
      (p) => {
        r({ lat: p.coords.latitude, lng: p.coords.longitude, here: !0, at: Date.now() }), k("");
      },
      M,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  H(() => {
    z();
  }, []), H(() => {
    if (!l) return;
    let p = !0;
    return (async () => {
      f(!0), v("");
      let B = null, j = "";
      if (t.gmapsKey && !Mt)
        try {
          B = await Wi(t.gmapsKey, { lat: l.lat, lng: l.lng }, i, d), j = "google";
        } catch {
          B = null;
        }
      if (!B)
        try {
          B = await Ui(l, i, d), j = "osm";
        } catch {
          p && (c([]), v("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), f(!1));
          return;
        }
      B.forEach((u) => u.dist = Gt(l, u)), j === "osm" && B.sort((u, $) => u.dist - $.dist), p && (c(B.slice(0, 20)), A(j), f(!1), B.length || v(`반경 ${Qe(d)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      p = !1;
    };
  }, [l, i, d, t.gmapsKey]);
  let C = (p) => w[p.id] || n.some((B) => p.placeId && B.placeId === p.placeId || B.name === p.name && at(B) && Math.abs(B.lat - p.lat) < 5e-4);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ e(Qo, { size: 15 }),
        l ? l.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Qe(d)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: z, children: "위치 다시 찾기" })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: h }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: pa.map((p) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (i.id === p.id ? " on" : ""), onClick: () => s(p), children: p.label }, p.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Ki.map((p) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": d === p, className: d === p ? "on" : "", onClick: () => m(p), children: Qe(p) }, p)) }),
    F && /* @__PURE__ */ a("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !F && S && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: S }) }),
    !F && E.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: E.map((p) => {
      let B = C(p);
      return /* @__PURE__ */ a("li", { className: "jt-near", children: [
        /* @__PURE__ */ a("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: p.name }),
          p.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: p.sub }),
          /* @__PURE__ */ a("div", { className: "jt-near-meta", children: [
            p.rating != null && /* @__PURE__ */ a("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(ti, { size: 13, fill: "currentColor" }),
              p.rating.toFixed(1),
              p.count ? /* @__PURE__ */ a("em", { children: [
                "(",
                p.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: p.type }),
            p.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            p.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(At, { size: 12 }),
            Fa(p.dist)
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-near-act", children: [
          B ? /* @__PURE__ */ a("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(an, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                o({
                  name: p.name,
                  cat: i.wish,
                  area: p.addr || p.sub || "",
                  link: p.url || "",
                  memo: p.rating != null ? `구글 평점 ${p.rating.toFixed(1)}${p.count ? ` (${p.count}명)` : ""}` : "",
                  lat: p.lat,
                  lng: p.lng,
                  ...p.placeId ? { placeId: p.placeId } : {}
                }), x({ ...w, [p.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ a("a", { className: "jt-maplink", href: p.url || $t({ lat: p.lat, lng: p.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Tt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ a("a", { className: "jt-maplink route", href: Me(p), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(At, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, p.id);
    }) }),
    N && E.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: N === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Yi({ settings: t, wish: n, plan: o, me: i, onSave: s, onEdit: d, onLike: m, onPlan: l, onDelete: r, onComment: h, onDelComment: k, onReact: E }) {
  let c = n.filter(at), [F, f] = y(
    () => c.length ? {
      lat: c.reduce((g, Y) => g + Y.lat, 0) / c.length,
      lng: c.reduce((g, Y) => g + Y.lng, 0) / c.length,
      z: c.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [S, v] = y(null), [N, A] = y(null), [w, x] = y(""), [M, z] = y([]), [C, p] = y(!1), [B, j] = y(""), u = n.find((g) => g.id === N), $ = c.map((g) => `${g.id}:${g.lat}:${g.lng}:${g.cat}`).join("|"), I = ce(
    () => c.map((g) => ({
      id: g.id,
      lat: g.lat,
      lng: g.lng,
      color: Ut[g.cat] || Ut.기타,
      label: g.name
    })),
    [$]
  ), U = async () => {
    let g = w.trim();
    if (g) {
      p(!0), j(""), z([]);
      try {
        let Y = await bn(g, t.gmapsKey, { lat: F.lat, lng: F.lng });
        Y.length || j("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), z(Y);
      } catch {
        j("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      p(!1);
    }
  }, T = (g) => {
    f({ lat: g.lat, lng: g.lng, z: 16 }), A(null), v({ lat: g.lat, lng: g.lng, name: g.name, cat: "맛집", area: g.area, link: g.link || "", placeId: g.placeId }), z([]);
  }, R = u && u.likes.includes(i);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: w,
          onChange: (g) => x(g.target.value),
          onKeyDown: (g) => g.key === "Enter" && U(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: U, disabled: C, children: C ? "검색 중" : "검색" })
    ] }),
    B && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: B }),
    M.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: M.map((g, Y) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => T(g), children: [
      /* @__PURE__ */ e("strong", { children: g.name }),
      /* @__PURE__ */ e("span", { children: g.area })
    ] }) }, Y)) }),
    /* @__PURE__ */ e(
      Ia,
      {
        gkey: t.gmapsKey,
        onPoi: (g) => {
          A(null), v({ ...g, cat: "맛집" });
        },
        view: F,
        setView: f,
        pins: I,
        temp: S,
        selectedId: N,
        onTap: (g, Y) => {
          A(null), v({ lat: Number(g.toFixed(6)), lng: Number(Y.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (g) => {
          v(null), A(g);
        }
      }
    ),
    !S && !u && /* @__PURE__ */ a("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      c.length,
      "개예요."
    ] }),
    S && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: S.name,
          onChange: (g) => v({ ...S, name: g.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: dn.map((g) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (S.cat === g ? " on" : ""),
          onClick: () => v({ ...S, cat: g }),
          children: g
        },
        g
      )) }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !S.name.trim(),
            onClick: () => {
              s({
                name: S.name.trim(),
                cat: S.cat,
                area: S.area || "",
                link: S.link || "",
                memo: "",
                lat: S.lat,
                lng: S.lng,
                ...S.placeId ? { placeId: S.placeId } : {}
              }), v(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => v(null), children: "취소" })
      ] })
    ] }),
    u && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ a("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Ut[u.cat] || Ut.기타 }, children: u.cat }),
        /* @__PURE__ */ e("strong", { children: u.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => d(u), "aria-label": `${u.name} 수정`, children: /* @__PURE__ */ e(qt, { size: 16 }) })
      ] }),
      u.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(Et, { size: 13 }),
        u.area
      ] }),
      u.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: u.memo }),
      /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ a(
          fn,
          {
            className: "jt-like" + (R ? " on" : ""),
            onTap: () => m(u.id),
            names: u.likes,
            members: t.members,
            title: "가고 싶어요",
            "aria-pressed": R,
            "aria-label": `가고 싶어요 ${u.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ e(cn, { size: 16, fill: R ? "currentColor" : "none" }),
              "가고 싶어요 ",
              u.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Ie, { item: u, me: i, members: t.members, onReact: (g) => E(u.id, g) }),
        pe(u, o) != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: Z[pe(u, o) % Z.length] }, children: [
          pe(u, o) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => l(u), children: "일정에 넣기" }),
        /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(rt, { name: u.by, members: t.members, size: 16 }),
          u.by
        ] }),
        /* @__PURE__ */ e(
          It,
          {
            onConfirm: () => {
              r(u.id), A(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t(u), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Tt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ a("a", { className: "jt-maplink route", href: Me(u), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(At, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ e(
        Fe,
        {
          comments: u.comments || [],
          me: i,
          members: t.members,
          onAdd: (g) => h(u.id, g),
          onDelete: (g) => k(u.id, g)
        }
      )
    ] })
  ] });
}
function Ji(t) {
  let [n, o] = y("list"), i = t.view || n, s = t.setView || o;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([d, m]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": i === d, className: i === d ? "on" : "", onClick: () => s(d), children: m }, d)) }),
    i === "list" && /* @__PURE__ */ e(Gi, { ...t }),
    i === "map" && /* @__PURE__ */ e(Yi, { ...t }),
    i === "near" && /* @__PURE__ */ e(Hi, { ...t })
  ] });
}
function Gi({ settings: t, wish: n, plan: o, me: i, onBatchPos: s, onEdit: d, onLike: m, onPlan: l, onDelete: r, onComment: h, onDelComment: k, onReact: E }) {
  let [c, F] = y(null), [f, S, v] = za(), [N, A] = fi(), [w, x] = y("전체"), [M, z] = y("all"), [C, p] = y("all"), [B, j] = y(!1), u = (g) => pe(g, o) != null, $ = n.filter((g) => (w === "전체" || g.cat === w) && (C === "all" || g.by === C)), I = { all: $.length, in: $.filter(u).length, out: $.filter((g) => !u(g)).length }, [U, T] = y(null), R = $.filter((g) => M === "all" || (M === "in" ? u(g) : !u(g))).sort((g, Y) => Y.likes.length - g.likes.length || Y.createdAt - g.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...dn].map((g) => /* @__PURE__ */ e("button", { className: "jt-chip" + (w === g ? " on" : ""), onClick: () => x(g), children: g }, g)) }),
    /* @__PURE__ */ a("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ e("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ a("select", { value: M, onChange: (g) => z(g.target.value), children: [
          /* @__PURE__ */ a("option", { value: "all", children: [
            "전체 (",
            I.all,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "in", children: [
            "일정 반영 (",
            I.in,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "out", children: [
            "미반영 (",
            I.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ e(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ e("span", { className: "jt-sr", children: "작성자" }),
        /* @__PURE__ */ a("select", { value: C, onChange: (g) => p(g.target.value), children: [
          /* @__PURE__ */ e("option", { value: "all", children: "작성자 전체" }),
          t.members.map((g) => /* @__PURE__ */ a("option", { value: g, children: [
            g,
            " (",
            n.filter((Y) => Y.by === g).length,
            ")"
          ] }, g))
        ] }),
        /* @__PURE__ */ e(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ e(Ea, { ids: R.map((g) => g.id), open: f, setAll: v })
    ] }),
    R.length === 0 && /* @__PURE__ */ e("div", { className: "jt-empty", children: n.length === 0 ? /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ e("p", { children: C !== "all" ? `${C}이(가) 올린 곳 중 조건에 맞는 곳이 없어요.` : M === "in" ? "일정에 반영된 곳이 없어요." : M === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    !N && A && n.some(at) && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-here-err", children: A === "denied" ? "위치 권한이 꺼져 있어 거리를 표시하지 못해요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "지금 위치를 확인하지 못해 거리를 표시하지 못해요. 잠시 후 다시 시도할게요." }),
    n.some((g) => !at(g)) && /* @__PURE__ */ a("div", { className: "jt-geo-cta", children: [
      /* @__PURE__ */ a("span", { children: [
        "위치 없는 장소 ",
        /* @__PURE__ */ a("b", { children: [
          n.filter((g) => !at(g)).length,
          "곳"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => j(!0), children: "한 번에 찾기" })
    ] }),
    B && /* @__PURE__ */ e(
      vi,
      {
        targets: n.filter((g) => !at(g)),
        gkey: t.gmapsKey,
        onClose: () => j(!1),
        onApply: (g) => {
          s(g), j(!1);
        }
      }
    ),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: R.map((g) => {
      let Y = g.likes.includes(i), lt = pe(g, o);
      return /* @__PURE__ */ a("li", { className: "jt-wish" + (f[g.id] ? " open" : ""), children: [
        /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => S(g.id), "aria-expanded": !!f[g.id], children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Ut[g.cat] || Ut.기타 }, children: g.cat }),
          /* @__PURE__ */ e("strong", { className: "jt-fold-name", children: g.name }),
          !at(g) && /* @__PURE__ */ e("span", { className: "jt-dist none", children: "위치 없음" }),
          N && at(g) && (() => {
            let Q = Gt(N, g);
            return /* @__PURE__ */ e("span", { className: "jt-dist " + gi(Q), "aria-label": `지금 위치에서 ${aa(Q)}`, children: aa(Q) });
          })(),
          lt != null && /* @__PURE__ */ a("span", { className: "jt-daybadge", style: { background: Z[lt % Z.length] }, children: [
            lt + 1,
            "일차"
          ] }),
          /* @__PURE__ */ e(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        f[g.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ e("div", { className: "jt-fold-tools", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => d(g), children: [
            /* @__PURE__ */ e(qt, { size: 14 }),
            "수정"
          ] }) }),
          g.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
            /* @__PURE__ */ e(Et, { size: 13 }),
            g.area
          ] }),
          g.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: g.memo }),
          /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t(g), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ e(Tt, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ a("a", { className: "jt-maplink route", href: Me(g), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ e(At, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => T(U === g.id ? null : g.id),
                "aria-expanded": U === g.id,
                children: [
                  /* @__PURE__ */ e(zo, { size: 14 }),
                  U === g.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          U === g.id && /* @__PURE__ */ a("div", { className: "jt-embed", children: [
            /* @__PURE__ */ e(
              "iframe",
              {
                title: `${g.name} 지도`,
                src: ri(g),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ e("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ a(
              fn,
              {
                className: "jt-like" + (Y ? " on" : ""),
                onTap: () => m(g.id),
                names: g.likes,
                members: t.members,
                title: "가고 싶어요",
                "aria-pressed": Y,
                "aria-label": `가고 싶어요 ${g.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ e(cn, { size: 16, fill: Y ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  g.likes.length
                ]
              }
            ),
            /* @__PURE__ */ e(Ie, { item: g, me: i, members: t.members, onReact: (Q) => E(g.id, Q) }),
            lt != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: Z[lt % Z.length] }, children: [
              lt + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => l(g), children: "일정에 넣기" }),
            /* @__PURE__ */ e(
              gn,
              {
                count: (g.comments || []).length,
                open: c === g.id,
                onClick: () => F(c === g.id ? null : g.id)
              }
            ),
            /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ e(rt, { name: g.by, members: t.members, size: 16 }),
              g.by
            ] }),
            /* @__PURE__ */ e(It, { onConfirm: () => r(g.id), label: "" })
          ] }),
          c === g.id && /* @__PURE__ */ e(
            Fe,
            {
              comments: g.comments || [],
              me: i,
              members: t.members,
              onAdd: (Q) => h(g.id, Q),
              onDelete: (Q) => k(g.id, Q)
            }
          )
        ] })
      ] }, g.id);
    }) })
  ] });
}
function da(t, n, o) {
  if (!t.some((d) => d.cur === "KRW")) return { ...ea(t, n), unit: "JPY" };
  let s = t.map((d) => ({
    ...d,
    amount: d.cur === "KRW" ? Number(d.orig) || 0 : (Number(d.amount) || 0) * o / 100
  }));
  return { ...ea(s, n), unit: "KRW" };
}
var Se = (t) => "₩" + (Math.round(t / 100) * 100).toLocaleString("ko-KR"), de = (t, n) => n === "KRW" ? Se(t) : un(t), ua = (t, n) => t > 0.5 ? `받을 돈 ${de(t, n)}` : t < -0.5 ? `보낼 돈 ${de(-t, n)}` : "주고받을 돈 없음", Ne = (t) => {
  let n = t.filter((i) => i.cur !== "KRW").reduce((i, s) => i + (Number(s.amount) || 0), 0), o = t.filter((i) => i.cur === "KRW").reduce((i, s) => i + (Number(s.orig) || 0), 0);
  return [n ? dt(n) : "", o ? "₩" + o.toLocaleString("ko-KR") : ""].filter(Boolean).join(" + ") || dt(0);
};
function ma({ moves: t, rate: n, me: o, unit: i = "JPY" }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((s, d) => /* @__PURE__ */ a("li", { className: s.from === o || s.to === o ? "mine" : "", children: [
    /* @__PURE__ */ a("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: s.from }),
      /* @__PURE__ */ e(xa, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: s.to })
    ] }),
    /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: i === "KRW" ? Se(s.v) : dt(s.v) }),
      i !== "KRW" && /* @__PURE__ */ e("em", { children: Jt(s.v, n) })
    ] })
  ] }, d)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Pa({ e: t, members: n, rate: o, onEdit: i }) {
  let { Icon: s, color: d } = on(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("button", { type: "button", className: "jt-spend", onClick: () => i(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": d }, children: /* @__PURE__ */ e(s, { size: 18 }) }),
    /* @__PURE__ */ a("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ e("div", { className: "jt-spend-name", children: t.title }),
      /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        Yt(t) ? /* @__PURE__ */ a(V, { children: [
          t.payer === Ht ? "" : `${t.payer}이(가) 냄, `,
          /* @__PURE__ */ e("span", { className: "jt-fundtag", children: "공금" }),
          " 처리"
        ] }) : /* @__PURE__ */ a(V, { children: [
          t.payer,
          "이(가) 냄, ",
          (t.split || []).length === n.length ? "모두" : (t.split || []).join(", "),
          " 나눔"
        ] }),
        t.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-spend-amt", children: t.cur === "KRW" ? /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ a("strong", { children: [
        "₩",
        (Number(t.orig) || 0).toLocaleString("ko-KR")
      ] }),
      /* @__PURE__ */ a("span", { children: [
        "(",
        dt(Number(t.amount) || 0),
        ")"
      ] })
    ] }) : /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ e("strong", { children: dt(Number(t.amount) || 0) }),
      /* @__PURE__ */ a("span", { children: [
        "(",
        Jt(Number(t.amount) || 0, o),
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ e("span", { className: "jt-spend-edit", "aria-hidden": "true", children: /* @__PURE__ */ e(qt, { size: 14 }) })
  ] }) });
}
var Ce = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function fa({ days: t, start: n, members: o, rate: i, onEdit: s, filter: d, empty: m }) {
  let l = t.map((r) => ({ ...r, items: d ? r.items.filter(d) : r.items })).filter((r) => r.items.length);
  return l.length ? /* @__PURE__ */ a(V, { children: [
    /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "항목을 누르면 고치거나 지울 수 있어요." }),
    l.map((r) => {
      let h = mt(n, r.day);
      return /* @__PURE__ */ a("div", { className: "jt-group", children: [
        /* @__PURE__ */ a("h4", { style: { "--lc": Z[r.day % Z.length] }, children: [
          /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
            r.day + 1,
            "일차"
          ] }),
          Rt(h),
          " (",
          St(h),
          ")"
        ] }),
        /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: r.items.map((k) => /* @__PURE__ */ e(Pa, { e: k, members: o, rate: i, onEdit: s }, k.id)) })
      ] }, r.day);
    })
  ] }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: m });
