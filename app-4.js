{ id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Ri = [500, 1e3, 2e3], Xe = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function Jt(e, n) {
  let o = (u) => u * Math.PI / 180, i = o(n.lat - e.lat), s = o(n.lng - e.lng), m = Math.sin(i / 2) ** 2 + Math.cos(o(e.lat)) * Math.cos(o(n.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(m));
}
var za = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function Ti(e, n, o, i) {
  let s = await pn(e), { Place: m, SearchNearbyRankPreference: u } = await s.importLibrary("places"), { places: p } = await m.searchNearby({
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
  }), r = [];
  for (let x of p || []) {
    let k;
    try {
      k = x.regularOpeningHours ? await x.isOpen() : void 0;
    } catch {
      k = void 0;
    }
    r.push({
      id: x.id,
      placeId: x.id,
      name: x.displayName,
      lat: x.location.lat(),
      lng: x.location.lng(),
      type: x.primaryTypeDisplayName || o.label,
      rating: x.rating,
      count: x.userRatingCount,
      addr: x.formattedAddress || "",
      url: x.googleMapsURI || "",
      open: k
    });
  }
  return r;
}
async function Bi(e, n, o) {
  let i = `[out:json][timeout:20];nwr(around:${o},${e.lat},${e.lng})${n.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((u) => {
    let p = u.tags || {}, r = p["name:ko"] || p["name:en"] || "";
    return {
      id: "osm" + u.type + u.id,
      name: r || p.name,
      sub: r && p.name && p.name !== r ? p.name : "",
      lat: u.lat != null ? u.lat : u.center && u.center.lat,
      lng: u.lon != null ? u.lon : u.center && u.center.lon,
      type: n.label,
      addr: ""
    };
  }).filter((u) => u.lat && u.name);
}
async function Ea(e, n, o) {
  let i = o || { lat: xt.lat, lng: xt.lng }, s = "";
  if (n && !Mt)
    try {
      let r = await pn(n), { Place: x } = await r.importLibrary("places"), { places: k } = await x.searchText({
        textQuery: e,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      return { list: (k || []).map((c) => ({
        name: c.displayName,
        area: c.formattedAddress || "",
        lat: c.location.lat(),
        lng: c.location.lng(),
        link: c.googleMapsURI || "",
        placeId: c.id
      })), engine: "google", gErr: "" };
    } catch (r) {
      s = String(r && (r.message || r.code) || r || "error");
    }
  else n && Mt && (s = "auth");
  let m = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(e)
  );
  if (!m.ok) throw new Error("search");
  return { list: (await m.json()).map((r) => {
    let x = String(r.display_name || "").split(",").map((k) => k.trim());
    return { name: r.name || x[0] || e, area: x.slice(1, 3).join(" "), lat: Number(r.lat), lng: Number(r.lon), link: "" };
  }), engine: "osm", gErr: s };
}
async function dn(e, n, o) {
  return (await Ea(e, n, o)).list;
}
function _i({ settings: e, wish: n, onSave: o }) {
  let [i, s] = j(oa[0]), [m, u] = j(1e3), [p, r] = j(null), [x, k] = j(""), [z, c] = j([]), [I, g] = j(!1), [A, w] = j(""), [y, C] = j(""), [d, l] = j({}), S = () => {
    r({ lat: xt.lat, lng: xt.lng, here: !1, at: Date.now() }), k("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, E = () => {
    if (k("현재 위치를 찾는 중"), !navigator.geolocation) return S();
    navigator.geolocation.getCurrentPosition(
      (f) => {
        r({ lat: f.coords.latitude, lng: f.coords.longitude, here: !0, at: Date.now() }), k("");
      },
      S,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  K(() => {
    E();
  }, []), K(() => {
    if (!p) return;
    let f = !0;
    return (async () => {
      g(!0), w("");
      let B = null, F = "";
      if (e.gmapsKey && !Mt)
        try {
          B = await Ti(e.gmapsKey, { lat: p.lat, lng: p.lng }, i, m), F = "google";
        } catch {
          B = null;
        }
      if (!B)
        try {
          B = await Bi(p, i, m), F = "osm";
        } catch {
          f && (c([]), w("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), g(!1));
          return;
        }
      B.forEach((v) => v.dist = Jt(p, v)), F === "osm" && B.sort((v, _) => v.dist - _.dist), f && (c(B.slice(0, 20)), C(F), g(!1), B.length || w(`반경 ${Xe(m)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      f = !1;
    };
  }, [p, i, m, e.gmapsKey]);
  let N = (f) => d[f.id] || n.some((B) => f.placeId && B.placeId === f.placeId || B.name === f.name && nt(B) && Math.abs(B.lat - f.lat) < 5e-4);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ t(Jo, { size: 15 }),
        p ? p.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Xe(m)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: E, children: "위치 다시 찾기" })
    ] }),
    x && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: x }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: oa.map((f) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === f.id ? " on" : ""), onClick: () => s(f), children: f.label }, f.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Ri.map((f) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": m === f, className: m === f ? "on" : "", onClick: () => u(f), children: Xe(f) }, f)) }),
    I && /* @__PURE__ */ a("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !I && A && /* @__PURE__ */ t("div", { className: "jt-empty", children: /* @__PURE__ */ t("p", { children: A }) }),
    !I && z.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-near-list", children: z.map((f) => {
      let B = N(f);
      return /* @__PURE__ */ a("li", { className: "jt-near", children: [
        /* @__PURE__ */ a("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ t("strong", { children: f.name }),
          f.sub && /* @__PURE__ */ t("span", { className: "jt-near-sub", children: f.sub }),
          /* @__PURE__ */ a("div", { className: "jt-near-meta", children: [
            f.rating != null && /* @__PURE__ */ a("span", { className: "jt-star", children: [
              /* @__PURE__ */ t(Go, { size: 13, fill: "currentColor" }),
              f.rating.toFixed(1),
              f.count ? /* @__PURE__ */ a("em", { children: [
                "(",
                f.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ t("span", { children: f.type }),
            f.open === !0 && /* @__PURE__ */ t("span", { className: "jt-open", children: "영업 중" }),
            f.open === !1 && /* @__PURE__ */ t("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ t(At, { size: 12 }),
            za(f.dist)
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-near-act", children: [
          B ? /* @__PURE__ */ a("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ t(ca, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                o({
                  name: f.name,
                  cat: i.wish,
                  area: f.addr || f.sub || "",
                  link: f.url || "",
                  memo: f.rating != null ? `구글 평점 ${f.rating.toFixed(1)}${f.count ? ` (${f.count}명)` : ""}` : "",
                  lat: f.lat,
                  lng: f.lng,
                  ...f.placeId ? { placeId: f.placeId } : {}
                }), l({ ...d, [f.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ a("a", { className: "jt-maplink", href: f.url || Tt({ lat: f.lat, lng: f.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Bt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ a("a", { className: "jt-maplink route", href: ze(f), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(At, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, f.id);
    }) }),
    y && z.length > 0 && /* @__PURE__ */ t("p", { className: "jt-near-src", children: y === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Li({ settings: e, wish: n, plan: o, me: i, onSave: s, onEdit: m, onLike: u, onPlan: p, onDelete: r, onComment: x, onDelComment: k, onReact: z }) {
  let c = n.filter(nt), [I, g] = j(
    () => c.length ? {
      lat: c.reduce((h, H) => h + H.lat, 0) / c.length,
      lng: c.reduce((h, H) => h + H.lng, 0) / c.length,
      z: c.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [A, w] = j(null), [y, C] = j(null), [d, l] = j(""), [S, E] = j([]), [N, f] = j(!1), [B, F] = j(""), v = n.find((h) => h.id === y), _ = c.map((h) => `${h.id}:${h.lat}:${h.lng}:${h.cat}`).join("|"), M = le(
    () => c.map((h) => ({
      id: h.id,
      lat: h.lat,
      lng: h.lng,
      color: Ht[h.cat] || Ht.기타,
      label: h.name
    })),
    [_]
  ), W = async () => {
    let h = d.trim();
    if (h) {
      f(!0), F(""), E([]);
      try {
        let H = await dn(h, e.gmapsKey, { lat: I.lat, lng: I.lng });
        H.length || F("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), E(H);
      } catch {
        F("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      f(!1);
    }
  }, G = (h) => {
    g({ lat: h.lat, lng: h.lng, z: 16 }), C(null), w({ lat: h.lat, lng: h.lng, name: h.name, cat: "맛집", area: h.area, link: h.link || "", placeId: h.placeId }), E([]);
  }, R = v && v.likes.includes(i);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: d,
          onChange: (h) => l(h.target.value),
          onKeyDown: (h) => h.key === "Enter" && W(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: W, disabled: N, children: N ? "검색 중" : "검색" })
    ] }),
    B && /* @__PURE__ */ t("p", { className: "jt-hint jt-mapmsg", children: B }),
    S.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results", children: S.map((h, H) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => G(h), children: [
      /* @__PURE__ */ t("strong", { children: h.name }),
      /* @__PURE__ */ t("span", { children: h.area })
    ] }) }, H)) }),
    /* @__PURE__ */ t(
      Ca,
      {
        gkey: e.gmapsKey,
        onPoi: (h) => {
          C(null), w({ ...h, cat: "맛집" });
        },
        view: I,
        setView: g,
        pins: M,
        temp: A,
        selectedId: y,
        onTap: (h, H) => {
          C(null), w({ lat: Number(h.toFixed(6)), lng: Number(H.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (h) => {
          w(null), C(h);
        }
      }
    ),
    !A && !v && /* @__PURE__ */ a("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      c.length,
      "개예요."
    ] }),
    A && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ t("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ t(
        "input",
        {
          value: A.name,
          onChange: (h) => w({ ...A, name: h.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: sn.map((h) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-chip" + (A.cat === h ? " on" : ""),
          onClick: () => w({ ...A, cat: h }),
          children: h
        },
        h
      )) }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !A.name.trim(),
            onClick: () => {
              s({
                name: A.name.trim(),
                cat: A.cat,
                area: A.area || "",
                link: A.link || "",
                memo: "",
                lat: A.lat,
                lng: A.lng,
                ...A.placeId ? { placeId: A.placeId } : {}
              }), w(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: () => w(null), children: "취소" })
      ] })
    ] }),
    v && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ a("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Ht[v.cat] || Ht.기타 }, children: v.cat }),
        /* @__PURE__ */ t("strong", { children: v.name }),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => m(v), "aria-label": `${v.name} 수정`, children: /* @__PURE__ */ t(Xt, { size: 16 }) })
      ] }),
      v.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        /* @__PURE__ */ t(Et, { size: 13 }),
        v.area
      ] }),
      v.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: v.memo }),
      /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ a(
          ln,
          {
            className: "jt-like" + (R ? " on" : ""),
            onTap: () => u(v.id),
            names: v.likes,
            members: e.members,
            title: "가고 싶어요",
            "aria-pressed": R,
            "aria-label": `가고 싶어요 ${v.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t(an, { size: 16, fill: R ? "currentColor" : "none" }),
              "가고 싶어요 ",
              v.likes.length
            ]
          }
        ),
        /* @__PURE__ */ t(Ee, { item: v, me: i, members: e.members, onReact: (h) => z(v.id, h) }),
        ce(v, o) != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: V[ce(v, o) % V.length] }, children: [
          ce(v, o) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => p(v), children: "일정에 넣기" }),
        /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ t(pt, { name: v.by, members: e.members, size: 16 }),
          v.by
        ] }),
        /* @__PURE__ */ t(
          It,
          {
            onConfirm: () => {
              r(v.id), C(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ a("a", { className: "jt-maplink", href: Tt(v), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Bt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ a("a", { className: "jt-maplink route", href: ze(v), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(At, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ t(
        Ae,
        {
          comments: v.comments || [],
          me: i,
          members: e.members,
          onAdd: (h) => x(v.id, h),
          onDelete: (h) => k(v.id, h)
        }
      )
    ] })
  ] });
}
function Oi(e) {
  let [n, o] = j("list"), i = e.view || n, s = e.setView || o;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([m, u]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": i === m, className: i === m ? "on" : "", onClick: () => s(m), children: u }, m)) }),
    i === "list" && /* @__PURE__ */ t(Ui, { ...e }),
    i === "map" && /* @__PURE__ */ t(Li, { ...e }),
    i === "near" && /* @__PURE__ */ t(_i, { ...e })
  ] });
}
function Ui({ settings: e, wish: n, plan: o, me: i, onBatchPos: s, onEdit: m, onLike: u, onPlan: p, onDelete: r, onComment: x, onDelComment: k, onReact: z }) {
  let [c, I] = j(null), [g, A, w] = ya(), [y, C] = li(), [d, l] = j("전체"), [S, E] = j("all"), [N, f] = j("all"), [B, F] = j(!1), v = (h) => ce(h, o) != null, _ = n.filter((h) => (d === "전체" || h.cat === d) && (N === "all" || h.by === N)), M = { all: _.length, in: _.filter(v).length, out: _.filter((h) => !v(h)).length }, [W, G] = j(null), R = _.filter((h) => S === "all" || (S === "in" ? v(h) : !v(h))).sort((h, H) => H.likes.length - h.likes.length || H.createdAt - h.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: ["전체", ...sn].map((h) => /* @__PURE__ */ t("button", { className: "jt-chip" + (d === h ? " on" : ""), onClick: () => l(h), children: h }, h)) }),
    /* @__PURE__ */ a("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ a("select", { value: S, onChange: (h) => E(h.target.value), children: [
          /* @__PURE__ */ a("option", { value: "all", children: [
            "전체 (",
            M.all,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "in", children: [
            "일정 반영 (",
            M.in,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "out", children: [
            "미반영 (",
            M.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ t(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "작성자" }),
        /* @__PURE__ */ a("select", { value: N, onChange: (h) => f(h.target.value), children: [
          /* @__PURE__ */ t("option", { value: "all", children: "작성자 전체" }),
          e.members.map((h) => /* @__PURE__ */ a("option", { value: h, children: [
            h,
            " (",
            n.filter((H) => H.by === h).length,
            ")"
          ] }, h))
        ] }),
        /* @__PURE__ */ t(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ t(va, { ids: R.map((h) => h.id), open: g, setAll: w })
    ] }),
    R.length === 0 && /* @__PURE__ */ t("div", { className: "jt-empty", children: n.length === 0 ? /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ t("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ t("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ t("p", { children: N !== "all" ? `${N}이(가) 올린 곳 중 조건에 맞는 곳이 없어요.` : S === "in" ? "일정에 반영된 곳이 없어요." : S === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    !y && C && n.some(nt) && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-here-err", children: C === "denied" ? "위치 권한이 꺼져 있어 거리를 표시하지 못해요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "지금 위치를 확인하지 못해 거리를 표시하지 못해요. 잠시 후 다시 시도할게요." }),
    n.some((h) => !nt(h)) && /* @__PURE__ */ a("div", { className: "jt-geo-cta", children: [
      /* @__PURE__ */ a("span", { children: [
        "위치 없는 장소 ",
        /* @__PURE__ */ a("b", { children: [
          n.filter((h) => !nt(h)).length,
          "곳"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => F(!0), children: "한 번에 찾기" })
    ] }),
    B && /* @__PURE__ */ t(
      gi,
      {
        targets: n.filter((h) => !nt(h)),
        gkey: e.gmapsKey,
        onClose: () => F(!1),
        onApply: (h) => {
          s(h), F(!1);
        }
      }
    ),
    /* @__PURE__ */ t("ul", { className: "jt-list", children: R.map((h) => {
      let H = h.likes.includes(i), lt = ce(h, o);
      return /* @__PURE__ */ a("li", { className: "jt-wish" + (g[h.id] ? " open" : ""), children: [
        /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => A(h.id), "aria-expanded": !!g[h.id], children: [
          /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Ht[h.cat] || Ht.기타 }, children: h.cat }),
          /* @__PURE__ */ t("strong", { className: "jt-fold-name", children: h.name }),
          !nt(h) && /* @__PURE__ */ t("span", { className: "jt-dist none", children: "위치 없음" }),
          y && nt(h) && (() => {
            let Z = Jt(y, h);
            return /* @__PURE__ */ t("span", { className: "jt-dist " + ci(Z), "aria-label": `지금 위치에서 ${Vn(Z)}`, children: Vn(Z) });
          })(),
          lt != null && /* @__PURE__ */ a("span", { className: "jt-daybadge", style: { background: V[lt % V.length] }, children: [
            lt + 1,
            "일차"
          ] }),
          /* @__PURE__ */ t(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        g[h.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ t("div", { className: "jt-fold-tools", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => m(h), children: [
            /* @__PURE__ */ t(Xt, { size: 14 }),
            "수정"
          ] }) }),
          h.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
            /* @__PURE__ */ t(Et, { size: 13 }),
            h.area
          ] }),
          h.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: h.memo }),
          /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ a("a", { className: "jt-maplink", href: Tt(h), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Bt, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ a("a", { className: "jt-maplink route", href: ze(h), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(At, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => G(W === h.id ? null : h.id),
                "aria-expanded": W === h.id,
                children: [
                  /* @__PURE__ */ t(yo, { size: 14 }),
                  W === h.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          W === h.id && /* @__PURE__ */ a("div", { className: "jt-embed", children: [
            /* @__PURE__ */ t(
              "iframe",
              {
                title: `${h.name} 지도`,
                src: ei(h),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ t("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ a(
              ln,
              {
                className: "jt-like" + (H ? " on" : ""),
                onTap: () => u(h.id),
                names: h.likes,
                members: e.members,
                title: "가고 싶어요",
                "aria-pressed": H,
                "aria-label": `가고 싶어요 ${h.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ t(an, { size: 16, fill: H ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  h.likes.length
                ]
              }
            ),
            /* @__PURE__ */ t(Ee, { item: h, me: i, members: e.members, onReact: (Z) => z(h.id, Z) }),
            lt != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: V[lt % V.length] }, children: [
              lt + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ t("button", { className: "jt-secondary sm", onClick: () => p(h), children: "일정에 넣기" }),
            /* @__PURE__ */ t(
              cn,
              {
                count: (h.comments || []).length,
                open: c === h.id,
                onClick: () => I(c === h.id ? null : h.id)
              }
            ),
            /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ t(pt, { name: h.by, members: e.members, size: 16 }),
              h.by
            ] }),
            /* @__PURE__ */ t(It, { onConfirm: () => r(h.id), label: "" })
          ] }),
          c === h.id && /* @__PURE__ */ t(
            Ae,
            {
              comments: h.comments || [],
              me: i,
              members: e.members,
              onAdd: (Z) => x(h.id, Z),
              onDelete: (Z) => k(h.id, Z)
            }
          )
        ] })
      ] }, h.id);
    }) })
  ] });
}
function ia({ moves: e, rate: n, me: o }) {
  return e.length ? /* @__PURE__ */ t("ul", { className: "jt-moves2", children: e.map((i, s) => /* @__PURE__ */ a("li", { className: i.from === o || i.to === o ? "mine" : "", children: [
    /* @__PURE__ */ a("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ t("b", { children: i.from }),
      /* @__PURE__ */ t(ma, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ t("b", { children: i.to })
    ] }),
    /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ t("strong", { children: Pt(i.v) }),
      /* @__PURE__ */ t("em", { children: Yt(i.v, n) })
    ] })
  ] }, s)) }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Aa({ e, members: n, rate: o, onEdit: i }) {
  let { Icon: s, color: m } = Qe(e.cat);
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", className: "jt-spend", onClick: () => i(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ t("span", { className: "jt-spend-icon", style: { "--cc": m }, children: /* @__PURE__ */ t(s, { size: 18 }) }),
    /* @__PURE__ */ a("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ t("div", { className: "jt-spend-name", children: e.title }),
      /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        e.payer,
        "이(가) 냄, ",
        (e.split || []).length === n.length ? "모두" : (e.split || []).join(", "),
        " 나눔",
        e.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-spend-amt", children: [
      /* @__PURE__ */ t("strong", { children: Pt(Number(e.amount) || 0) }),
      /* @__PURE__ */ a("span", { children: [
        "(",
        Yt(Number(e.amount) || 0, o),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ t("span", { className: "jt-spend-edit", "aria-hidden": "true", children: /* @__PURE__ */ t(Xt, { size: 14 }) })
  ] }) });
}
var sa = (e) => e > 0.5 ? `받을 돈 ${it(e)}` : e < -0.5 ? `보낼 돈 ${it(-e)}` : "주고받을 돈 없음", we = (e) => e > 0.5 ? "plus" : e < -0.5 ? "minus" : "";
function ra({ days: e, start: n, members: o, rate: i, onEdit: s, filter: m, empty: u }) {
  let p = e.map((r) => ({ ...r, items: m ? r.items.filter(m) : r.items })).filter((r) => r.items.length);
  return p.length ? /* @__PURE__ */ a(st, { children: [
    /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "항목을 누르면 고치거나 지울 수 있어요." }),
    p.map((r) => {
      let x = ft(n, r.day);
      return /* @__PURE__ */ a("div", { className: "jt-group", children: [
        /* @__PURE__ */ a("h4", { style: { "--lc": V[r.day % V.length] }, children: [
          /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
            r.day + 1,
            "일차"
          ] }),
          Rt(x),
          " (",
          St(x),
          ")"
        ] }),
        /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: r.items.map((k) => /* @__PURE__ */ t(Aa, { e: k, members: o, rate: i, onEdit: s }, k.id)) })
      ] }, r.day);
    })
  ] }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: u });
}
function Ki({ settings: e, spend: n, me: o, onEdit: i, view: s, setView: m }) {
  let { members: u, rate: p, start: r } = e, [x, k] = j("me"), z = s || x, c = m || k, I = n.reduce((d, l) => d + (Number(l.amount) || 0), 0), g = le(() => Xn(n, u), [n, u]), A = le(() => {
    let d = {};
    return n.forEach((l) => d[l.cat] = (d[l.cat] || 0) + (Number(l.amount) || 0)), ga.filter((l) => d[l]).map((l) => ({ c: l, v: d[l] }));
