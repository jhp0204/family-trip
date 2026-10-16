{ id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Li = [500, 1e3, 2e3], qe = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function Yt(t, n) {
  let o = (u) => u * Math.PI / 180, i = o(n.lat - t.lat), s = o(n.lng - t.lng), m = Math.sin(i / 2) ** 2 + Math.cos(o(t.lat)) * Math.cos(o(n.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(m));
}
var Sa = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function _i(t, n, o, i) {
  let s = await mn(t), { Place: m, SearchNearbyRankPreference: u } = await s.importLibrary("places"), { places: p } = await m.searchNearby({
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
    rankPreference: u.POPULARITY,
    language: "ko"
  }), l = [];
  for (let h of p || []) {
    let k;
    try {
      k = h.regularOpeningHours ? await h.isOpen() : void 0;
    } catch {
      k = void 0;
    }
    l.push({
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
  return l;
}
async function Oi(t, n, o) {
  let i = `[out:json][timeout:20];nwr(around:${o},${t.lat},${t.lng})${n.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((u) => {
    let p = u.tags || {}, l = p["name:ko"] || p["name:en"] || "";
    return {
      id: "osm" + u.type + u.id,
      name: l || p.name,
      sub: l && p.name && p.name !== l ? p.name : "",
      lat: u.lat != null ? u.lat : u.center && u.center.lat,
      lng: u.lon != null ? u.lon : u.center && u.center.lon,
      type: n.label,
      addr: ""
    };
  }).filter((u) => u.lat && u.name);
}
async function Ma(t, n, o) {
  let i = o || { lat: xt.lat, lng: xt.lng }, s = "";
  if (n && !Mt)
    try {
      let l = await mn(n), { Place: h } = await l.importLibrary("places"), k = h.searchByText || h.searchText, { places: z } = await k.call(h, {
        textQuery: t,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      return { list: (z || []).map((I) => ({
        name: I.displayName,
        area: I.formattedAddress || "",
        lat: I.location.lat(),
        lng: I.location.lng(),
        link: I.googleMapsURI || "",
        placeId: I.id
      })), engine: "google", gErr: "" };
    } catch (l) {
      s = String(l && (l.message || l.code) || l || "error");
    }
  else n && Mt && (s = "auth");
  let m = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(t)
  );
  if (!m.ok) throw new Error("search");
  return { list: (await m.json()).map((l) => {
    let h = String(l.display_name || "").split(",").map((k) => k.trim());
    return { name: l.name || h[0] || t, area: h.slice(1, 3).join(" "), lat: Number(l.lat), lng: Number(l.lon), link: "" };
  }), engine: "osm", gErr: s };
}
async function un(t, n, o) {
  return (await Ma(t, n, o)).list;
}
function Ki({ settings: t, wish: n, onSave: o }) {
  let [i, s] = y(sa[0]), [m, u] = y(1e3), [p, l] = y(null), [h, k] = y(""), [z, d] = y([]), [I, g] = y(!1), [S, j] = y(""), [N, E] = y(""), [C, b] = y({}), M = () => {
    l({ lat: xt.lat, lng: xt.lng, here: !1, at: Date.now() }), k("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, A = () => {
    if (k("현재 위치를 찾는 중"), !navigator.geolocation) return M();
    navigator.geolocation.getCurrentPosition(
      (r) => {
        l({ lat: r.coords.latitude, lng: r.coords.longitude, here: !0, at: Date.now() }), k("");
      },
      M,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  U(() => {
    A();
  }, []), U(() => {
    if (!p) return;
    let r = !0;
    return (async () => {
      g(!0), j("");
      let D = null, _ = "";
      if (t.gmapsKey && !Mt)
        try {
          D = await _i(t.gmapsKey, { lat: p.lat, lng: p.lng }, i, m), _ = "google";
        } catch {
          D = null;
        }
      if (!D)
        try {
          D = await Oi(p, i, m), _ = "osm";
        } catch {
          r && (d([]), j("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), g(!1));
          return;
        }
      D.forEach((w) => w.dist = Yt(p, w)), _ === "osm" && D.sort((w, B) => w.dist - B.dist), r && (d(D.slice(0, 20)), E(_), g(!1), D.length || j(`반경 ${qe(m)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      r = !1;
    };
  }, [p, i, m, t.gmapsKey]);
  let c = (r) => C[r.id] || n.some((D) => r.placeId && D.placeId === r.placeId || D.name === r.name && at(D) && Math.abs(D.lat - r.lat) < 5e-4);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ e(qo, { size: 15 }),
        p ? p.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        qe(m)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: A, children: "위치 다시 찾기" })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: h }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: sa.map((r) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (i.id === r.id ? " on" : ""), onClick: () => s(r), children: r.label }, r.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Li.map((r) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": m === r, className: m === r ? "on" : "", onClick: () => u(r), children: qe(r) }, r)) }),
    I && /* @__PURE__ */ a("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !I && S && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: S }) }),
    !I && z.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: z.map((r) => {
      let D = c(r);
      return /* @__PURE__ */ a("li", { className: "jt-near", children: [
        /* @__PURE__ */ a("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: r.name }),
          r.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: r.sub }),
          /* @__PURE__ */ a("div", { className: "jt-near-meta", children: [
            r.rating != null && /* @__PURE__ */ a("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(Vo, { size: 13, fill: "currentColor" }),
              r.rating.toFixed(1),
              r.count ? /* @__PURE__ */ a("em", { children: [
                "(",
                r.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: r.type }),
            r.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            r.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(At, { size: 12 }),
            Sa(r.dist)
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-near-act", children: [
          D ? /* @__PURE__ */ a("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(ma, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                o({
                  name: r.name,
                  cat: i.wish,
                  area: r.addr || r.sub || "",
                  link: r.url || "",
                  memo: r.rating != null ? `구글 평점 ${r.rating.toFixed(1)}${r.count ? ` (${r.count}명)` : ""}` : "",
                  lat: r.lat,
                  lng: r.lng,
                  ...r.placeId ? { placeId: r.placeId } : {}
                }), b({ ...C, [r.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ a("a", { className: "jt-maplink", href: r.url || $t({ lat: r.lat, lng: r.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Tt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ a("a", { className: "jt-maplink route", href: Ee(r), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(At, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, r.id);
    }) }),
    N && z.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: N === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Wi({ settings: t, wish: n, plan: o, me: i, onSave: s, onEdit: m, onLike: u, onPlan: p, onDelete: l, onComment: h, onDelComment: k, onReact: z }) {
  let d = n.filter(at), [I, g] = y(
    () => d.length ? {
      lat: d.reduce((f, H) => f + H.lat, 0) / d.length,
      lng: d.reduce((f, H) => f + H.lng, 0) / d.length,
      z: d.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [S, j] = y(null), [N, E] = y(null), [C, b] = y(""), [M, A] = y([]), [c, r] = y(!1), [D, _] = y(""), w = n.find((f) => f.id === N), B = d.map((f) => `${f.id}:${f.lat}:${f.lng}:${f.cat}`).join("|"), v = re(
    () => d.map((f) => ({
      id: f.id,
      lat: f.lat,
      lng: f.lng,
      color: Ut[f.cat] || Ut.기타,
      label: f.name
    })),
    [B]
  ), O = async () => {
    let f = C.trim();
    if (f) {
      r(!0), _(""), A([]);
      try {
        let H = await un(f, t.gmapsKey, { lat: I.lat, lng: I.lng });
        H.length || _("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), A(H);
      } catch {
        _("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      r(!1);
    }
  }, J = (f) => {
    g({ lat: f.lat, lng: f.lng, z: 16 }), E(null), j({ lat: f.lat, lng: f.lng, name: f.name, cat: "맛집", area: f.area, link: f.link || "", placeId: f.placeId }), A([]);
  }, $ = w && w.likes.includes(i);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: C,
          onChange: (f) => b(f.target.value),
          onKeyDown: (f) => f.key === "Enter" && O(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: O, disabled: c, children: c ? "검색 중" : "검색" })
    ] }),
    D && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: D }),
    M.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: M.map((f, H) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => J(f), children: [
      /* @__PURE__ */ e("strong", { children: f.name }),
      /* @__PURE__ */ e("span", { children: f.area })
    ] }) }, H)) }),
    /* @__PURE__ */ e(
      Aa,
      {
        gkey: t.gmapsKey,
        onPoi: (f) => {
          E(null), j({ ...f, cat: "맛집" });
        },
        view: I,
        setView: g,
        pins: v,
        temp: S,
        selectedId: N,
        onTap: (f, H) => {
          E(null), j({ lat: Number(f.toFixed(6)), lng: Number(H.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (f) => {
          j(null), E(f);
        }
      }
    ),
    !S && !w && /* @__PURE__ */ a("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      d.length,
      "개예요."
    ] }),
    S && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: S.name,
          onChange: (f) => j({ ...S, name: f.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: rn.map((f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (S.cat === f ? " on" : ""),
          onClick: () => j({ ...S, cat: f }),
          children: f
        },
        f
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
              }), j(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => j(null), children: "취소" })
      ] })
    ] }),
    w && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ a("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Ut[w.cat] || Ut.기타 }, children: w.cat }),
        /* @__PURE__ */ e("strong", { children: w.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => m(w), "aria-label": `${w.name} 수정`, children: /* @__PURE__ */ e(Gt, { size: 16 }) })
      ] }),
      w.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(Et, { size: 13 }),
        w.area
      ] }),
      w.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: w.memo }),
      /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ a(
          pn,
          {
            className: "jt-like" + ($ ? " on" : ""),
            onTap: () => u(w.id),
            names: w.likes,
            members: t.members,
            title: "가고 싶어요",
            "aria-pressed": $,
            "aria-label": `가고 싶어요 ${w.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ e(on, { size: 16, fill: $ ? "currentColor" : "none" }),
              "가고 싶어요 ",
              w.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Ae, { item: w, me: i, members: t.members, onReact: (f) => z(w.id, f) }),
        le(w, o) != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: V[le(w, o) % V.length] }, children: [
          le(w, o) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => p(w), children: "일정에 넣기" }),
        /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(ct, { name: w.by, members: t.members, size: 16 }),
          w.by
        ] }),
        /* @__PURE__ */ e(
          It,
          {
            onConfirm: () => {
              l(w.id), E(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t(w), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Tt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ a("a", { className: "jt-maplink route", href: Ee(w), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(At, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ e(
        Se,
        {
          comments: w.comments || [],
          me: i,
          members: t.members,
          onAdd: (f) => h(w.id, f),
          onDelete: (f) => k(w.id, f)
        }
      )
    ] })
  ] });
}
function Ui(t) {
  let [n, o] = y("list"), i = t.view || n, s = t.setView || o;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([m, u]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": i === m, className: i === m ? "on" : "", onClick: () => s(m), children: u }, m)) }),
    i === "list" && /* @__PURE__ */ e(Hi, { ...t }),
    i === "map" && /* @__PURE__ */ e(Wi, { ...t }),
    i === "near" && /* @__PURE__ */ e(Ki, { ...t })
  ] });
}
function Hi({ settings: t, wish: n, plan: o, me: i, onBatchPos: s, onEdit: m, onLike: u, onPlan: p, onDelete: l, onComment: h, onDelComment: k, onReact: z }) {
  let [d, I] = y(null), [g, S, j] = ka(), [N, E] = di(), [C, b] = y("전체"), [M, A] = y("all"), [c, r] = y("all"), [D, _] = y(!1), w = (f) => le(f, o) != null, B = n.filter((f) => (C === "전체" || f.cat === C) && (c === "all" || f.by === c)), v = { all: B.length, in: B.filter(w).length, out: B.filter((f) => !w(f)).length }, [O, J] = y(null), $ = B.filter((f) => M === "all" || (M === "in" ? w(f) : !w(f))).sort((f, H) => H.likes.length - f.likes.length || H.createdAt - f.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...rn].map((f) => /* @__PURE__ */ e("button", { className: "jt-chip" + (C === f ? " on" : ""), onClick: () => b(f), children: f }, f)) }),
    /* @__PURE__ */ a("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ e("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ a("select", { value: M, onChange: (f) => A(f.target.value), children: [
          /* @__PURE__ */ a("option", { value: "all", children: [
            "전체 (",
            v.all,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "in", children: [
            "일정 반영 (",
            v.in,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "out", children: [
            "미반영 (",
            v.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ e(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ e("span", { className: "jt-sr", children: "작성자" }),
        /* @__PURE__ */ a("select", { value: c, onChange: (f) => r(f.target.value), children: [
          /* @__PURE__ */ e("option", { value: "all", children: "작성자 전체" }),
          t.members.map((f) => /* @__PURE__ */ a("option", { value: f, children: [
            f,
            " (",
            n.filter((H) => H.by === f).length,
            ")"
          ] }, f))
        ] }),
        /* @__PURE__ */ e(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ e(Na, { ids: $.map((f) => f.id), open: g, setAll: j })
    ] }),
    $.length === 0 && /* @__PURE__ */ e("div", { className: "jt-empty", children: n.length === 0 ? /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ e("p", { children: c !== "all" ? `${c}이(가) 올린 곳 중 조건에 맞는 곳이 없어요.` : M === "in" ? "일정에 반영된 곳이 없어요." : M === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    !N && E && n.some(at) && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-here-err", children: E === "denied" ? "위치 권한이 꺼져 있어 거리를 표시하지 못해요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "지금 위치를 확인하지 못해 거리를 표시하지 못해요. 잠시 후 다시 시도할게요." }),
    n.some((f) => !at(f)) && /* @__PURE__ */ a("div", { className: "jt-geo-cta", children: [
      /* @__PURE__ */ a("span", { children: [
        "위치 없는 장소 ",
        /* @__PURE__ */ a("b", { children: [
          n.filter((f) => !at(f)).length,
          "곳"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => _(!0), children: "한 번에 찾기" })
    ] }),
    D && /* @__PURE__ */ e(
      xi,
      {
        targets: n.filter((f) => !at(f)),
        gkey: t.gmapsKey,
        onClose: () => _(!1),
        onApply: (f) => {
          s(f), _(!1);
        }
      }
    ),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: $.map((f) => {
      let H = f.likes.includes(i), rt = le(f, o);
      return /* @__PURE__ */ a("li", { className: "jt-wish" + (g[f.id] ? " open" : ""), children: [
        /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => S(f.id), "aria-expanded": !!g[f.id], children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Ut[f.cat] || Ut.기타 }, children: f.cat }),
          /* @__PURE__ */ e("strong", { className: "jt-fold-name", children: f.name }),
          !at(f) && /* @__PURE__ */ e("span", { className: "jt-dist none", children: "위치 없음" }),
          N && at(f) && (() => {
            let Z = Yt(N, f);
            return /* @__PURE__ */ e("span", { className: "jt-dist " + mi(Z), "aria-label": `지금 위치에서 ${Qn(Z)}`, children: Qn(Z) });
          })(),
          rt != null && /* @__PURE__ */ a("span", { className: "jt-daybadge", style: { background: V[rt % V.length] }, children: [
            rt + 1,
            "일차"
          ] }),
          /* @__PURE__ */ e(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        g[f.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ e("div", { className: "jt-fold-tools", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => m(f), children: [
            /* @__PURE__ */ e(Gt, { size: 14 }),
            "수정"
          ] }) }),
          f.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
            /* @__PURE__ */ e(Et, { size: 13 }),
            f.area
          ] }),
          f.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: f.memo }),
          /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t(f), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ e(Tt, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ a("a", { className: "jt-maplink route", href: Ee(f), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ e(At, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => J(O === f.id ? null : f.id),
                "aria-expanded": O === f.id,
                children: [
                  /* @__PURE__ */ e(ko, { size: 14 }),
                  O === f.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          O === f.id && /* @__PURE__ */ a("div", { className: "jt-embed", children: [
            /* @__PURE__ */ e(
              "iframe",
              {
                title: `${f.name} 지도`,
                src: oi(f),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ e("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ a(
              pn,
              {
                className: "jt-like" + (H ? " on" : ""),
                onTap: () => u(f.id),
                names: f.likes,
                members: t.members,
                title: "가고 싶어요",
                "aria-pressed": H,
                "aria-label": `가고 싶어요 ${f.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ e(on, { size: 16, fill: H ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  f.likes.length
                ]
              }
            ),
            /* @__PURE__ */ e(Ae, { item: f, me: i, members: t.members, onReact: (Z) => z(f.id, Z) }),
            rt != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: V[rt % V.length] }, children: [
              rt + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => p(f), children: "일정에 넣기" }),
            /* @__PURE__ */ e(
              dn,
              {
                count: (f.comments || []).length,
                open: d === f.id,
                onClick: () => I(d === f.id ? null : f.id)
              }
            ),
            /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ e(ct, { name: f.by, members: t.members, size: 16 }),
              f.by
            ] }),
            /* @__PURE__ */ e(It, { onConfirm: () => l(f.id), label: "" })
          ] }),
          d === f.id && /* @__PURE__ */ e(
            Se,
            {
              comments: f.comments || [],
              me: i,
              members: t.members,
              onAdd: (Z) => h(f.id, Z),
              onDelete: (Z) => k(f.id, Z)
            }
          )
        ] })
      ] }, f.id);
    }) })
  ] });
}
function ra(t, n, o) {
  if (!t.some((m) => m.cur === "KRW")) return { ...Vn(t, n), unit: "JPY" };
  let s = t.map((m) => ({
    ...m,
    amount: m.cur === "KRW" ? Number(m.orig) || 0 : (Number(m.amount) || 0) * o / 100
  }));
  return { ...Vn(s, n), unit: "KRW" };
}
var ze = (t) => "₩" + (Math.round(t / 100) * 100).toLocaleString("ko-KR"), ce = (t, n) => n === "KRW" ? ze(t) : ln(t), la = (t, n) => t > 0.5 ? `받을 돈 ${ce(t, n)}` : t < -0.5 ? `보낼 돈 ${ce(-t, n)}` : "주고받을 돈 없음", Yi = (t) => {
  let n = t.filter((i) => i.cur !== "KRW").reduce((i, s) => i + (Number(s.amount) || 0), 0), o = t.filter((i) => i.cur === "KRW").reduce((i, s) => i + (Number(s.orig) || 0), 0);
  return [n ? dt(n) : "", o ? "₩" + o.toLocaleString("ko-KR") : ""].filter(Boolean).join(" + ") || dt(0);
};
function ca({ moves: t, rate: n, me: o, unit: i = "JPY" }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((s, m) => /* @__PURE__ */ a("li", { className: s.from === o || s.to === o ? "mine" : "", children: [
    /* @__PURE__ */ a("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: s.from }),
      /* @__PURE__ */ e(fa, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: s.to })
    ] }),
    /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: i === "KRW" ? ze(s.v) : dt(s.v) }),
      i !== "KRW" && /* @__PURE__ */ e("em", { children: Ht(s.v, n) })
    ] })
  ] }, m)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Ia({ e: t, members: n, rate: o, onEdit: i }) {
  let { Icon: s, color: m } = tn(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("button", { type: "button", className: "jt-spend", onClick: () => i(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": m }, children: /* @__PURE__ */ e(s, { size: 18 }) }),
    /* @__PURE__ */ a("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ e("div", { className: "jt-spend-name", children: t.title }),
      /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        t.payer,
        "이(가) 냄, ",
        (t.split || []).length === n.length ? "모두" : (t.split || []).join(", "),
        " 나눔",
        t.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-spend-amt", children: t.cur === "KRW" ? /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ a("strong", { children: [
        "₩",
        (Number(t.orig) || 0).toLocaleString("ko-KR")
      ] }),
      /* @__PURE__ */ a("span", { children: [
        "(",
        dt(Number(t.amount) || 0),
        ")"
      ] })
    ] }) : /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ e("strong", { children: dt(Number(t.amount) || 0) }),
      /* @__PURE__ */ a("span", { children: [
        "(",
        Ht(Number(t.amount) || 0, o),
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ e("span", { className: "jt-spend-edit", "aria-hidden": "true", children: /* @__PURE__ */ e(Gt, { size: 14 }) })
  ] }) });
}
var we = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function pa({ days: t, start: n, members: o, rate: i, onEdit: s, filter: m, empty: u }) {
  let p = t.map((l) => ({ ...l, items: m ? l.items.filter(m) : l.items })).filter((l) => l.items.length);
  return p.length ? /* @__PURE__ */ a(Q, { children: [
    /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "항목을 누르면 고치거나 지울 수 있어요." }),
    p.map((l) => {
      let h = ut(n, l.day);
      return /* @__PURE__ */ a("div", { className: "jt-group", children: [
        /* @__PURE__ */ a("h4", { style: { "--lc": V[l.day % V.length] }, children: [
          /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
