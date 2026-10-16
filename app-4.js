"userRatingCount",
      "primaryTypeDisplayName",
      "googleMapsURI",
      "regularOpeningHours",
      "utcOffsetMinutes"
    ],
    locationRestriction: { center: a, radius: i },
    includedTypes: n.g,
    maxResultCount: 15,
    rankPreference: d.POPULARITY,
    language: "ko"
  }), r = [];
  for (let x of c || []) {
    let N;
    try {
      N = x.regularOpeningHours ? await x.isOpen() : void 0;
    } catch {
      N = void 0;
    }
    r.push({
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
      open: N
    });
  }
  return r;
}
async function Ri(e, a, n) {
  let i = `[out:json][timeout:20];nwr(around:${n},${e.lat},${e.lng})${a.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((d) => {
    let c = d.tags || {}, r = c["name:ko"] || c["name:en"] || "";
    return {
      id: "osm" + d.type + d.id,
      name: r || c.name,
      sub: r && c.name && c.name !== r ? c.name : "",
      lat: d.lat != null ? d.lat : d.center && d.center.lat,
      lng: d.lon != null ? d.lon : d.center && d.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((d) => d.lat && d.name);
}
async function Me(e, a, n) {
  let i = n || { lat: xt.lat, lng: xt.lng };
  if (a && !Tt)
    try {
      let d = await pa(a), { Place: c } = await d.importLibrary("places"), { places: r } = await c.searchText({
        textQuery: e,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      if (r && r.length)
        return r.map((x) => ({
          name: x.displayName,
          area: x.formattedAddress || "",
          lat: x.location.lat(),
          lng: x.location.lng(),
          link: x.googleMapsURI || "",
          placeId: x.id
        }));
    } catch {
    }
  let s = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(e)
  );
  if (!s.ok) throw new Error("search");
  return (await s.json()).map((d) => {
    let c = String(d.display_name || "").split(",").map((r) => r.trim());
    return { name: d.name || c[0] || e, area: c.slice(1, 3).join(" "), lat: Number(d.lat), lng: Number(d.lon), link: "" };
  });
}
function Ti({ settings: e, wish: a, onSave: n }) {
  let [i, s] = j(nn[0]), [g, d] = j(1e3), [c, r] = j(null), [x, N] = j(""), [E, u] = j([]), [I, p] = j(!1), [k, w] = j(""), [v, M] = j(""), [m, l] = j({}), A = () => {
    r({ lat: xt.lat, lng: xt.lng, here: !1, at: Date.now() }), N("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, z = () => {
    if (N("현재 위치를 찾는 중"), !navigator.geolocation) return A();
    navigator.geolocation.getCurrentPosition(
      (f) => {
        r({ lat: f.coords.latitude, lng: f.coords.longitude, here: !0, at: Date.now() }), N("");
      },
      A,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  K(() => {
    z();
  }, []), K(() => {
    if (!c) return;
    let f = !0;
    return (async () => {
      p(!0), w("");
      let B = null, D = "";
      if (e.gmapsKey && !Tt)
        try {
          B = await $i(e.gmapsKey, { lat: c.lat, lng: c.lng }, i, g), D = "google";
        } catch {
          B = null;
        }
      if (!B)
        try {
          B = await Ri(c, i, g), D = "osm";
        } catch {
          f && (u([]), w("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), p(!1));
          return;
        }
      B.forEach((y) => y.dist = Jt(c, y)), D === "osm" && B.sort((y, L) => y.dist - L.dist), f && (u(B.slice(0, 20)), M(D), p(!1), B.length || w(`반경 ${Ve(g)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      f = !1;
    };
  }, [c, i, g, e.gmapsKey]);
  let C = (f) => m[f.id] || a.some((B) => f.placeId && B.placeId === f.placeId || B.name === f.name && at(B) && Math.abs(B.lat - f.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ t(Yo, { size: 15 }),
        c ? c.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Ve(g)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: z, children: "위치 다시 찾기" })
    ] }),
    x && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: x }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: nn.map((f) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === f.id ? " on" : ""), onClick: () => s(f), children: f.label }, f.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Pi.map((f) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": g === f, className: g === f ? "on" : "", onClick: () => d(f), children: Ve(f) }, f)) }),
    I && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !I && k && /* @__PURE__ */ t("div", { className: "jt-empty", children: /* @__PURE__ */ t("p", { children: k }) }),
    !I && E.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-near-list", children: E.map((f) => {
      let B = C(f);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ t("strong", { children: f.name }),
          f.sub && /* @__PURE__ */ t("span", { className: "jt-near-sub", children: f.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            f.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ t(Jo, { size: 13, fill: "currentColor" }),
              f.rating.toFixed(1),
              f.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                f.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ t("span", { children: f.type }),
            f.open === !0 && /* @__PURE__ */ t("span", { className: "jt-open", children: "영업 중" }),
            f.open === !1 && /* @__PURE__ */ t("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ t(At, { size: 12 }),
            zn(f.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          B ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ t(cn, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: f.name,
                  cat: i.wish,
                  area: f.addr || f.sub || "",
                  link: f.url || "",
                  memo: f.rating != null ? `구글 평점 ${f.rating.toFixed(1)}${f.count ? ` (${f.count}명)` : ""}` : "",
                  lat: f.lat,
                  lng: f.lng,
                  ...f.placeId ? { placeId: f.placeId } : {}
                }), l({ ...m, [f.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: f.url || Rt({ lat: f.lat, lng: f.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Bt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: ze(f), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(At, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, f.id);
    }) }),
    v && E.length > 0 && /* @__PURE__ */ t("p", { className: "jt-near-src", children: v === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Bi({ settings: e, wish: a, plan: n, me: i, onSave: s, onEdit: g, onLike: d, onPlan: c, onDelete: r, onComment: x, onDelComment: N, onReact: E }) {
  let u = a.filter(at), [I, p] = j(
    () => u.length ? {
      lat: u.reduce((h, H) => h + H.lat, 0) / u.length,
      lng: u.reduce((h, H) => h + H.lng, 0) / u.length,
      z: u.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [k, w] = j(null), [v, M] = j(null), [m, l] = j(""), [A, z] = j([]), [C, f] = j(!1), [B, D] = j(""), y = a.find((h) => h.id === v), L = u.map((h) => `${h.id}:${h.lat}:${h.lng}:${h.cat}`).join("|"), S = le(
    () => u.map((h) => ({
      id: h.id,
      lat: h.lat,
      lng: h.lng,
      color: Ht[h.cat] || Ht.기타,
      label: h.name
    })),
    [L]
  ), W = async () => {
    let h = m.trim();
    if (h) {
      f(!0), D(""), z([]);
      try {
        let H = await Me(h, e.gmapsKey, { lat: I.lat, lng: I.lng });
        H.length || D("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), z(H);
      } catch {
        D("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      f(!1);
    }
  }, G = (h) => {
    p({ lat: h.lat, lng: h.lng, z: 16 }), M(null), w({ lat: h.lat, lng: h.lng, name: h.name, cat: "맛집", area: h.area, link: h.link || "", placeId: h.placeId }), z([]);
  }, R = y && y.likes.includes(i);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: m,
          onChange: (h) => l(h.target.value),
          onKeyDown: (h) => h.key === "Enter" && W(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: W, disabled: C, children: C ? "검색 중" : "검색" })
    ] }),
    B && /* @__PURE__ */ t("p", { className: "jt-hint jt-mapmsg", children: B }),
    A.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results", children: A.map((h, H) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => G(h), children: [
      /* @__PURE__ */ t("strong", { children: h.name }),
      /* @__PURE__ */ t("span", { children: h.area })
    ] }) }, H)) }),
    /* @__PURE__ */ t(
      Cn,
      {
        gkey: e.gmapsKey,
        onPoi: (h) => {
          M(null), w({ ...h, cat: "맛집" });
        },
        view: I,
        setView: p,
        pins: S,
        temp: k,
        selectedId: v,
        onTap: (h, H) => {
          M(null), w({ lat: Number(h.toFixed(6)), lng: Number(H.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (h) => {
          w(null), M(h);
        }
      }
    ),
    !k && !y && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      u.length,
      "개예요."
    ] }),
    k && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ t("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ t(
        "input",
        {
          value: k.name,
          onChange: (h) => w({ ...k, name: h.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: sa.map((h) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-chip" + (k.cat === h ? " on" : ""),
          onClick: () => w({ ...k, cat: h }),
          children: h
        },
        h
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !k.name.trim(),
            onClick: () => {
              s({
                name: k.name.trim(),
                cat: k.cat,
                area: k.area || "",
                link: k.link || "",
                memo: "",
                lat: k.lat,
                lng: k.lng,
                ...k.placeId ? { placeId: k.placeId } : {}
              }), w(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: () => w(null), children: "취소" })
      ] })
    ] }),
    y && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Ht[y.cat] || Ht.기타 }, children: y.cat }),
        /* @__PURE__ */ t("strong", { children: y.name }),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => g(y), "aria-label": `${y.name} 수정`, children: /* @__PURE__ */ t(Xt, { size: 16 }) })
      ] }),
      y.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ t(Et, { size: 13 }),
        y.area
      ] }),
      y.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: y.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          la,
          {
            className: "jt-like" + (R ? " on" : ""),
            onTap: () => d(y.id),
            names: y.likes,
            members: e.members,
            title: "가고 싶어요",
            "aria-pressed": R,
            "aria-label": `가고 싶어요 ${y.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t(oa, { size: 16, fill: R ? "currentColor" : "none" }),
              "가고 싶어요 ",
              y.likes.length
            ]
          }
        ),
        /* @__PURE__ */ t(Ee, { item: y, me: i, members: e.members, onReact: (h) => E(y.id, h) }),
        ce(y, n) != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: q[ce(y, n) % q.length] }, children: [
          ce(y, n) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => c(y), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ t(pt, { name: y.by, members: e.members, size: 16 }),
          y.by
        ] }),
        /* @__PURE__ */ t(
          St,
          {
            onConfirm: () => {
              r(y.id), M(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt(y), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Bt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ o("a", { className: "jt-maplink route", href: ze(y), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(At, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ t(
        Ae,
        {
          comments: y.comments || [],
          me: i,
          members: e.members,
          onAdd: (h) => x(y.id, h),
          onDelete: (h) => N(y.id, h)
        }
      )
    ] })
  ] });
}
function Li(e) {
  let [a, n] = j("list"), i = e.view || a, s = e.setView || n;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([g, d]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": i === g, className: i === g ? "on" : "", onClick: () => s(g), children: d }, g)) }),
    i === "list" && /* @__PURE__ */ t(_i, { ...e }),
    i === "map" && /* @__PURE__ */ t(Bi, { ...e }),
    i === "near" && /* @__PURE__ */ t(Ti, { ...e })
  ] });
}
function _i({ settings: e, wish: a, plan: n, me: i, onBatchPos: s, onEdit: g, onLike: d, onPlan: c, onDelete: r, onComment: x, onDelComment: N, onReact: E }) {
  let [u, I] = j(null), [p, k, w] = yn(), [v, M] = ri(), [m, l] = j("전체"), [A, z] = j("all"), [C, f] = j("all"), [B, D] = j(!1), y = (h) => ce(h, n) != null, L = a.filter((h) => (m === "전체" || h.cat === m) && (C === "all" || h.by === C)), S = { all: L.length, in: L.filter(y).length, out: L.filter((h) => !y(h)).length }, [W, G] = j(null), R = L.filter((h) => A === "all" || (A === "in" ? y(h) : !y(h))).sort((h, H) => H.likes.length - h.likes.length || H.createdAt - h.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: ["전체", ...sa].map((h) => /* @__PURE__ */ t("button", { className: "jt-chip" + (m === h ? " on" : ""), onClick: () => l(h), children: h }, h)) }),
    /* @__PURE__ */ o("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ o("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ o("select", { value: A, onChange: (h) => z(h.target.value), children: [
          /* @__PURE__ */ o("option", { value: "all", children: [
            "전체 (",
            S.all,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "in", children: [
            "일정 반영 (",
            S.in,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "out", children: [
            "미반영 (",
            S.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ t(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ o("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "작성자" }),
        /* @__PURE__ */ o("select", { value: C, onChange: (h) => f(h.target.value), children: [
          /* @__PURE__ */ t("option", { value: "all", children: "작성자 전체" }),
          e.members.map((h) => /* @__PURE__ */ o("option", { value: h, children: [
            h,
            " (",
            a.filter((H) => H.by === h).length,
            ")"
          ] }, h))
        ] }),
        /* @__PURE__ */ t(Ct, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ t(vn, { ids: R.map((h) => h.id), open: p, setAll: w })
    ] }),
    R.length === 0 && /* @__PURE__ */ t("div", { className: "jt-empty", children: a.length === 0 ? /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ t("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ t("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ t("p", { children: C !== "all" ? `${C}이(가) 올린 곳 중 조건에 맞는 곳이 없어요.` : A === "in" ? "일정에 반영된 곳이 없어요." : A === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    !v && M && a.some(at) && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-here-err", children: M === "denied" ? "위치 권한이 꺼져 있어 거리를 표시하지 못해요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "지금 위치를 확인하지 못해 거리를 표시하지 못해요. 잠시 후 다시 시도할게요." }),
    a.some((h) => !at(h)) && /* @__PURE__ */ o("div", { className: "jt-geo-cta", children: [
      /* @__PURE__ */ o("span", { children: [
        "위치 없는 장소 ",
        /* @__PURE__ */ o("b", { children: [
          a.filter((h) => !at(h)).length,
          "곳"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => D(!0), children: "한 번에 찾기" })
    ] }),
    B && /* @__PURE__ */ t(
      ui,
      {
        targets: a.filter((h) => !at(h)),
        gkey: e.gmapsKey,
        onClose: () => D(!1),
        onApply: (h) => {
          s(h), D(!1);
        }
      }
    ),
    /* @__PURE__ */ t("ul", { className: "jt-list", children: R.map((h) => {
      let H = h.likes.includes(i), lt = ce(h, n);
      return /* @__PURE__ */ o("li", { className: "jt-wish" + (p[h.id] ? " open" : ""), children: [
        /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => k(h.id), "aria-expanded": !!p[h.id], children: [
          /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Ht[h.cat] || Ht.기타 }, children: h.cat }),
          /* @__PURE__ */ t("strong", { className: "jt-fold-name", children: h.name }),
          !at(h) && /* @__PURE__ */ t("span", { className: "jt-dist none", children: "위치 없음" }),
          v && at(h) && (() => {
            let Z = Jt(v, h);
            return /* @__PURE__ */ t("span", { className: "jt-dist " + li(Z), "aria-label": `지금 위치에서 ${Va(Z)}`, children: Va(Z) });
          })(),
          lt != null && /* @__PURE__ */ o("span", { className: "jt-daybadge", style: { background: q[lt % q.length] }, children: [
            lt + 1,
            "일차"
          ] }),
          /* @__PURE__ */ t(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        p[h.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ t("div", { className: "jt-fold-tools", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => g(h), children: [
            /* @__PURE__ */ t(Xt, { size: 14 }),
            "수정"
          ] }) }),
          h.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
            /* @__PURE__ */ t(Et, { size: 13 }),
            h.area
          ] }),
          h.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: h.memo }),
          /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt(h), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Bt, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ o("a", { className: "jt-maplink route", href: ze(h), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(At, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => G(W === h.id ? null : h.id),
                "aria-expanded": W === h.id,
                children: [
                  /* @__PURE__ */ t(jo, { size: 14 }),
                  W === h.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          W === h.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
            /* @__PURE__ */ t(
              "iframe",
              {
                title: `${h.name} 지도`,
                src: ti(h),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ t("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ o(
              la,
              {
                className: "jt-like" + (H ? " on" : ""),
                onTap: () => d(h.id),
                names: h.likes,
                members: e.members,
                title: "가고 싶어요",
                "aria-pressed": H,
                "aria-label": `가고 싶어요 ${h.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ t(oa, { size: 16, fill: H ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  h.likes.length
                ]
              }
            ),
            /* @__PURE__ */ t(Ee, { item: h, me: i, members: e.members, onReact: (Z) => E(h.id, Z) }),
            lt != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: q[lt % q.length] }, children: [
              lt + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ t("button", { className: "jt-secondary sm", onClick: () => c(h), children: "일정에 넣기" }),
            /* @__PURE__ */ t(
              ca,
              {
                count: (h.comments || []).length,
                open: u === h.id,
                onClick: () => I(u === h.id ? null : h.id)
              }
            ),
            /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ t(pt, { name: h.by, members: e.members, size: 16 }),
              h.by
            ] }),
            /* @__PURE__ */ t(St, { onConfirm: () => r(h.id), label: "" })
          ] }),
          u === h.id && /* @__PURE__ */ t(
            Ae,
            {
              comments: h.comments || [],
              me: i,
              members: e.members,
              onAdd: (Z) => x(h.id, Z),
              onDelete: (Z) => N(h.id, Z)
            }
          )
        ] })
      ] }, h.id);
    }) })
  ] });
}
function on({ moves: e, rate: a, me: n }) {
  return e.length ? /* @__PURE__ */ t("ul", { className: "jt-moves2", children: e.map((i, s) => /* @__PURE__ */ o("li", { className: i.from === n || i.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ t("b", { children: i.from }),
      /* @__PURE__ */ t(mn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ t("b", { children: i.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ t("strong", { children: Dt(i.v) }),
      /* @__PURE__ */ t("em", { children: Yt(i.v, a) })
    ] })
  ] }, s)) }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function En({ e, members: a, rate: n, onEdit: i }) {
  let { Icon: s, color: g } = ta(e.cat);
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => i(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ t("span", { className: "jt-spend-icon", style: { "--cc": g }, children: /* @__PURE__ */ t(s, { size: 18 }) }),
    /* @__PURE__ */ o("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ t("div", { className: "jt-spend-name", children: e.title }),
      /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        e.payer,
        "이(가) 냄, ",
        (e.split || []).length === a.length ? "모두" : (e.split || []).join(", "),
        " 나눔",
        e.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-spend-amt", children: [
      /* @__PURE__ */ t("strong", { children: Dt(Number(e.amount) || 0) }),
      /* @__PURE__ */ o("span", { children: [
        "(",
        Yt(Number(e.amount) || 0, n),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ t("span", { className: "jt-spend-edit", "aria-hidden": "true", children: /* @__PURE__ */ t(Xt, { size: 14 }) })
  ] }) });
}
var sn = (e) => e > 0.5 ? `받을 돈 ${it(e)}` : e < -0.5 ? `보낼 돈 ${it(-e)}` : "주고받을 돈 없음", we = (e) => e > 0.5 ? "plus" : e < -0.5 ? "minus" : "";
function rn({ days: e, start: a, members: n, rate: i, onEdit: s, filter: g, empty: d }) {
  let c = e.map((r) => ({ ...r, items: g ? r.items.filter(g) : r.items })).filter((r) => r.items.length);
  return c.length ? /* @__PURE__ */ o(st, { children: [
    /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "항목을 누르면 고치거나 지울 수 있어요." }),
    c.map((r) => {
      let x = ft(a, r.day);
      return /* @__PURE__ */ o("div", { className: "jt-group", children: [
        /* @__PURE__ */ o("h4", { style: { "--lc": q[r.day % q.length] }, children: [
          /* @__PURE__ */ o("span", { className: "jt-daychip", children: [
            r.day + 1,
            "일차"
          ] }),
          $t(x),
          " (",
          Mt(x),
          ")"
        ] }),
        /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: r.items.map((N) => /* @__PURE__ */ t(En, { e: N, members: n, rate: i, onEdit: s }, N.id)) })
      ] }, r.day);
    })
  ] }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: d });
}
function Oi({ settings: e, spend: a, me: n, onEdit: i, view: s, setView: g }) {
  let { members: d, rate: c, start: r } = e, [x, N] = j("me"), E = s || x, u = g || N, I = a.reduce((m, l) => m + (Number(l.amount) || 0), 0), p = le(() => Ga(a, d), [a, d]), k = le(() => {
    let m = {};
    return a.forEach((l) => m[l.cat] = (m[l.cat] || 0) + (Number(l.amount) || 0)), gn.filter((l) => m[l]).map((l) => ({ c: l, v: m[l] }));
  }, [a]), w = le(() => {
    let m = {};
    return a.forEach((l) => (m[l.day] = m[l.day] || []).push(l)), Object.keys(m).map(Number).sort((l, A) => l - A).map((l) => ({
      day: l,
      sum: m[l].reduce((A, z) => A + (Number(z.amount) || 0), 0),
      items: [...m[l]].sort((A, z) => z.createdAt - A.createdAt),
      res: Ga(m[l], d)
    }));
  }, [a, d]), v = p.net[n] || 0, M = p.moves.filter((m) => m.from === n || m.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: Dt(0) }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: Ce(e) })
