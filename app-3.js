open: v
    });
  }
  return d;
}
async function So(t, a, n) {
  let r = `[out:json][timeout:20];nwr(around:${n},${t.lat},${t.lng})${a.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(r));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((f) => {
    let p = f.tags || {}, d = p["name:ko"] || p["name:en"] || "";
    return {
      id: "osm" + f.type + f.id,
      name: d || p.name,
      sub: d && p.name && p.name !== d ? p.name : "",
      lat: f.lat != null ? f.lat : f.center && f.center.lat,
      lng: f.lon != null ? f.lon : f.center && f.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((f) => f.lat && f.name);
}
async function Ao(t, a, n) {
  let r = n || { lat: it.lat, lng: it.lng };
  if (a && !kt)
    try {
      let f = await $e(a), { Place: p } = await f.importLibrary("places"), { places: d } = await p.searchText({
        textQuery: t,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: r
      });
      if (d && d.length)
        return d.map((b) => ({
          name: b.displayName,
          area: b.formattedAddress || "",
          lat: b.location.lat(),
          lng: b.location.lng(),
          link: b.googleMapsURI || "",
          placeId: b.id
        }));
    } catch {
    }
  let s = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(t)
  );
  if (!s.ok) throw new Error("search");
  return (await s.json()).map((f) => {
    let p = String(f.display_name || "").split(",").map((d) => d.trim());
    return { name: f.name || p[0] || t, area: p.slice(1, 3).join(" "), lat: Number(f.lat), lng: Number(f.lon), link: "" };
  });
}
function Io({ settings: t, wish: a, onSave: n }) {
  let [r, s] = C(xa[0]), [j, f] = C(1e3), [p, d] = C(null), [b, v] = C(""), [N, c] = C([]), [z, g] = C(!1), [l, u] = C(""), [A, m] = C(""), [k, i] = C({}), h = () => {
    d({ lat: it.lat, lng: it.lng, here: !1, at: Date.now() }), v("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, w = () => {
    if (v("현재 위치를 찾는 중"), !navigator.geolocation) return h();
    navigator.geolocation.getCurrentPosition(
      (E) => {
        d({ lat: E.coords.latitude, lng: E.coords.longitude, here: !0, at: Date.now() }), v("");
      },
      h,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  W(() => {
    w();
  }, []), W(() => {
    if (!p) return;
    let E = !0;
    return (async () => {
      g(!0), u("");
      let R = null, S = "";
      if (t.gmapsKey && !kt)
        try {
          R = await Mo(t.gmapsKey, { lat: p.lat, lng: p.lng }, r, j), S = "google";
        } catch {
          R = null;
        }
      if (!R)
        try {
          R = await So(p, r, j), S = "osm";
        } catch {
          E && (c([]), u("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), g(!1));
          return;
        }
      R.forEach((M) => M.dist = re(p, M)), S === "osm" && R.sort((M, _) => M.dist - _.dist), E && (c(R.slice(0, 20)), m(S), g(!1), R.length || u(`반경 ${we(j)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      E = !1;
    };
  }, [p, r, j, t.gmapsKey]);
  let F = (E) => k[E.id] || a.some((R) => E.placeId && R.placeId === E.placeId || R.name === E.name && Ft(R) && Math.abs(R.lat - E.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ e(Kn, { size: 15 }),
        p ? p.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        we(j)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: w, children: "위치 다시 찾기" })
    ] }),
    b && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: b }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: xa.map((E) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (r.id === E.id ? " on" : ""), onClick: () => s(E), children: E.label }, E.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Eo.map((E) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": j === E, className: j === E ? "on" : "", onClick: () => f(E), children: we(E) }, E)) }),
    z && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      r.label,
      " 찾는 중"
    ] }),
    !z && l && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: l }) }),
    !z && N.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: N.map((E) => {
      let R = F(E);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: E.name }),
          E.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: E.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            E.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(Wn, { size: 13, fill: "currentColor" }),
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
            /* @__PURE__ */ e(Ae, { size: 12 }),
            Fa(E.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          R ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(wa, { size: 14 }),
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
                }), i({ ...k, [E.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: E.url || Pt({ lat: E.lat, lng: E.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Nt, { size: 13 }),
            "구글맵"
          ] })
        ] })
      ] }, E.id);
    }) }),
    A && N.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: A === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Do({ settings: t, wish: a, me: n, onSave: r, onEdit: s, onLike: j, onPlan: f, onDelete: p, onComment: d, onDelComment: b, onReact: v }) {
  let N = a.filter(Ft), [c, z] = C(
    () => N.length ? {
      lat: N.reduce((y, U) => y + U.lat, 0) / N.length,
      lng: N.reduce((y, U) => y + U.lng, 0) / N.length,
      z: N.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [g, l] = C(null), [u, A] = C(null), [m, k] = C(""), [i, h] = C([]), [w, F] = C(!1), [E, R] = C(""), S = a.find((y) => y.id === u), M = N.map((y) => `${y.id}:${y.lat}:${y.lng}:${y.cat}`).join("|"), _ = Wt(
    () => N.map((y) => ({
      id: y.id,
      lat: y.lat,
      lng: y.lng,
      color: It[y.cat] || It.기타,
      label: y.name
    })),
    [M]
  ), K = async () => {
    let y = m.trim();
    if (y) {
      if (F(!0), R(""), h([]), Co(t.gmapsKey))
        try {
          let { Place: U } = await window.google.maps.importLibrary("places"), { places: G } = await U.searchText({
            textQuery: y,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: c.lat, lng: c.lng }
          });
          if (G && G.length) {
            h(
              G.map((nt) => ({
                lat: nt.location.lat(),
                lng: nt.location.lng(),
                name: nt.displayName,
                area: nt.formattedAddress || "",
                link: nt.googleMapsURI || "",
                placeId: nt.id
              }))
            ), F(!1);
            return;
          }
        } catch {
        }
      try {
        let U = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(y)
        );
        if (!U.ok) throw new Error("search failed");
        let G = await U.json();
        G.length || R("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), h(
          G.map((nt) => {
            let bt = String(nt.display_name || "").split(",").map((ie) => ie.trim());
            return {
              lat: Number(nt.lat),
              lng: Number(nt.lon),
              name: nt.name || bt[0] || y,
              area: bt.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        R("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      F(!1);
    }
  }, q = (y) => {
    z({ lat: y.lat, lng: y.lng, z: 16 }), A(null), l({ lat: y.lat, lng: y.lng, name: y.name, cat: "맛집", area: y.area, link: y.link || "", placeId: y.placeId }), h([]);
  }, B = S && S.likes.includes(n);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: m,
          onChange: (y) => k(y.target.value),
          onKeyDown: (y) => y.key === "Enter" && K(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: K, disabled: w, children: w ? "검색 중" : "검색" })
    ] }),
    E && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: E }),
    i.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: i.map((y, U) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => q(y), children: [
      /* @__PURE__ */ e("strong", { children: y.name }),
      /* @__PURE__ */ e("span", { children: y.area })
    ] }) }, U)) }),
    /* @__PURE__ */ e(
      Da,
      {
        gkey: t.gmapsKey,
        onPoi: (y) => {
          A(null), l({ ...y, cat: "맛집" });
        },
        view: c,
        setView: z,
        pins: _,
        temp: g,
        selectedId: u,
        onTap: (y, U) => {
          A(null), l({ lat: Number(y.toFixed(6)), lng: Number(U.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (y) => {
          l(null), A(y);
        }
      }
    ),
    !g && !S && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      N.length,
      "개예요."
    ] }),
    g && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: g.name,
          onChange: (y) => l({ ...g, name: y.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: De.map((y) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (g.cat === y ? " on" : ""),
          onClick: () => l({ ...g, cat: y }),
          children: y
        },
        y
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !g.name.trim(),
            onClick: () => {
              r({
                name: g.name.trim(),
                cat: g.cat,
                area: g.area || "",
                link: g.link || "",
                memo: "",
                lat: g.lat,
                lng: g.lng,
                ...g.placeId ? { placeId: g.placeId } : {}
              }), l(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => l(null), children: "취소" })
      ] })
    ] }),
    S && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: It[S.cat] || It.기타 }, children: S.cat }),
        /* @__PURE__ */ e("strong", { children: S.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => s(S), "aria-label": `${S.name} 수정`, children: /* @__PURE__ */ e(Na, { size: 16 }) })
      ] }),
      S.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(wt, { size: 13 }),
        S.area
      ] }),
      S.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: S.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-like" + (B ? " on" : ""),
            onClick: () => j(S.id),
            "aria-pressed": B,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(Se, { size: 16, fill: B ? "currentColor" : "none" }),
              "가고 싶어요 ",
              S.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Fe, { item: S, me: n, onReact: (y) => v(S.id, y) }),
        S.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: Q[S.planned % Q.length] }, children: [
          S.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => f(S), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(rt, { name: S.by, members: t.members, size: 16 }),
          S.by
        ] }),
        /* @__PURE__ */ e(
          ht,
          {
            onConfirm: () => {
              p(S.id), A(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "jt-maprow", children: /* @__PURE__ */ o("a", { className: "jt-maplink", href: Pt(S), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Nt, { size: 14 }),
        "구글맵에서 열기"
      ] }) }),
      /* @__PURE__ */ e(
        Pe,
        {
          comments: S.comments || [],
          me: n,
          members: t.members,
          onAdd: (y) => d(S.id, y),
          onDelete: (y) => b(S.id, y)
        }
      )
    ] })
  ] });
}
function Fo(t) {
  let [a, n] = C("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([r, s]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === r, className: a === r ? "on" : "", onClick: () => n(r), children: s }, r)) }),
    a === "list" && /* @__PURE__ */ e(Po, { ...t }),
    a === "map" && /* @__PURE__ */ e(Do, { ...t }),
    a === "near" && /* @__PURE__ */ e(Io, { ...t })
  ] });
}
function Po({ settings: t, wish: a, me: n, onAdd: r, onEdit: s, onLike: j, onPlan: f, onDelete: p, onComment: d, onDelComment: b, onReact: v }) {
  let [N, c] = C(null), [z, g] = C("전체"), [l, u] = C(null), A = a.filter((m) => z === "전체" || m.cat === z).sort((m, k) => k.likes.length - m.likes.length || k.createdAt - m.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...De].map((m) => /* @__PURE__ */ e("button", { className: "jt-chip" + (z === m ? " on" : ""), onClick: () => g(m), children: m }, m)) }),
    A.length === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: A.map((m) => {
      let k = m.likes.includes(n);
      return /* @__PURE__ */ o("li", { className: "jt-wish", children: [
        /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: It[m.cat] || It.기타 }, children: m.cat }),
          /* @__PURE__ */ e("strong", { children: m.name }),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => s(m), "aria-label": `${m.name} 수정`, children: /* @__PURE__ */ e(Na, { size: 16 }) })
        ] }),
        m.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(wt, { size: 13 }),
          m.area
        ] }),
        m.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: m.memo }),
        /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: Pt(m), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Nt, { size: 14 }),
            "구글맵에서 열기"
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-maplink",
              onClick: () => u(l === m.id ? null : m.id),
              "aria-expanded": l === m.id,
              children: [
                /* @__PURE__ */ e(bn, { size: 14 }),
                l === m.id ? "지도 닫기" : "지도 미리보기"
              ]
            }
          )
        ] }),
        l === m.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
          /* @__PURE__ */ e(
            "iframe",
            {
              title: `${m.name} 지도`,
              src: Vn(m),
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
              className: "jt-like" + (k ? " on" : ""),
              onClick: () => j(m.id),
              "aria-pressed": k,
              "aria-label": "가고 싶어요",
              children: [
                /* @__PURE__ */ e(Se, { size: 16, fill: k ? "currentColor" : "none" }),
                "가고 싶어요 ",
                m.likes.length
              ]
            }
          ),
          /* @__PURE__ */ e(Fe, { item: m, me: n, onReact: (i) => v(m.id, i) }),
          m.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: Q[m.planned % Q.length] }, children: [
            m.planned + 1,
            "일차 일정에 있어요"
          ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => f(m), children: "일정에 넣기" }),
          /* @__PURE__ */ e(
            Sa,
            {
              count: (m.comments || []).length,
              open: N === m.id,
              onClick: () => c(N === m.id ? null : m.id)
            }
          ),
          /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
            /* @__PURE__ */ e(rt, { name: m.by, members: t.members, size: 16 }),
            m.by
          ] }),
          /* @__PURE__ */ e(ht, { onConfirm: () => p(m.id), label: "" })
        ] }),
        N === m.id && /* @__PURE__ */ e(
          Pe,
          {
            comments: m.comments || [],
            me: n,
            members: t.members,
            onAdd: (i) => d(m.id, i),
            onDelete: (i) => b(m.id, i)
          }
        )
      ] }, m.id);
    }) })
  ] });
}
function ja({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((r, s) => /* @__PURE__ */ o("li", { className: r.from === n || r.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: r.from }),
      /* @__PURE__ */ e(yn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: r.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: J(r.v) }),
      /* @__PURE__ */ e("em", { children: Yt(r.v, a) })
    ] })
  ] }, s)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function $o({ e: t, members: a, rate: n, onEdit: r }) {
  let { Icon: s, color: j } = Ne(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => r(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": j }, children: /* @__PURE__ */ e(s, { size: 18 }) }),
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
      /* @__PURE__ */ e("strong", { children: J(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: Yt(Number(t.amount) || 0, n) })
    ] })
  ] }) });
}
var va = (t) => t > 0.5 ? `받을 돈 ${J(t)}` : t < -0.5 ? `보낼 돈 ${J(-t)}` : "주고받을 돈 없음", ne = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function Ro({ settings: t, spend: a, me: n, onEdit: r }) {
  let { members: s, rate: j, start: f } = t, [p, d] = C("me"), b = a.reduce((l, u) => l + (Number(u.amount) || 0), 0), v = Wt(() => ma(a, s), [a, s]), N = Wt(() => {
    let l = {};
    return a.forEach((u) => l[u.cat] = (l[u.cat] || 0) + (Number(u.amount) || 0)), Ca.filter((u) => l[u]).map((u) => ({ c: u, v: l[u] }));
  }, [a]), c = Wt(() => {
    let l = {};
    return a.forEach((u) => (l[u.day] = l[u.day] || []).push(u)), Object.keys(l).map(Number).sort((u, A) => u - A).map((u) => ({
      day: u,
      sum: l[u].reduce((A, m) => A + (Number(m.amount) || 0), 0),
      items: [...l[u]].sort((A, m) => m.createdAt - A.createdAt),
      res: ma(l[u], s)
    }));
  }, [a, s]), z = v.net[n] || 0, g = v.moves.filter((l) => l.from === n || l.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: J(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: oe(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: J(b) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Yt(b, j),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        J(v.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: oe(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: N.map(({ c: l, v: u }) => /* @__PURE__ */ e("i", { style: { flexGrow: u, background: Ne(l).color } }, l)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: N.map(({ c: l, v: u }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: Ne(l).color } }),
        l,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(u / b * 100),
          "%"
        ] })
      ] }, l)) })
    ] }),
    v.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        v.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: v.skipped.map((l) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => r(l), children: [
        /* @__PURE__ */ o("span", { children: [
          l.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            l.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: J(Number(l.amount) || 0) })
      ] }) }, l.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([l, u]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": p === l, className: p === l ? "on" : "", onClick: () => d(l), children: u }, l)) }),
    p === "me" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (ne(z) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(rt, { name: n, members: s, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: z > 0.5 ? `${J(z)} 받으면 돼요` : z < -0.5 ? `${J(-z)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        g.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: g.map((l, u) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("span", { children: l.from === n ? /* @__PURE__ */ o(ct, { children: [
            /* @__PURE__ */ e("b", { children: l.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(ct, { children: [
            /* @__PURE__ */ e("b", { children: l.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: J(l.v) }),
            /* @__PURE__ */ e("em", { children: Yt(l.v, j) })
          ] })
        ] }, u)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: J(v.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              J(v.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: z > 0.5 ? "더 결제했으니 받을 돈" : z < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: ne(z), children: z > 0.5 ? J(z) : z < -0.5 ? J(-z) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: c.map((l) => {
        let u = dt(f, l.day), A = l.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": Q[l.day % Q.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            l.day + 1,
            "일차 ",
            Ht(u),
            " (",
            Dt(u),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            J(l.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            J(l.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + ne(A), children: va(A) })
        ] }, l.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    p === "day" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      c.map((l) => {
        let u = dt(f, l.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": Q[l.day % Q.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: l.day + 1 }),
            Ht(u),
            " (",
            Dt(u),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: J(l.sum) })
          ] }),
          /* @__PURE__ */ e(ja, { moves: l.res.moves, rate: j, me: n }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: l.items.map((A) => /* @__PURE__ */ e($o, { e: A, members: s, rate: j, onEdit: r }, A.id)) })
        ] }, l.day);
      })
    ] }),
    p === "all" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(ja, { moves: v.moves, rate: j, me: n }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: s.map((l) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e(rt, { name: l, members: s, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: l }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            J(v.paid[l]),
            ", 쓴 돈 ",
            J(v.share[l])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + ne(v.net[l]), children: va(v.net[l]) })
      ] }, l)) })
    ] })
  ] });
}
var ke = "trip:loc:", _o = 3 * 6e4, Lo = (t, a) => Q[(Math.max(0, t.indexOf(a)) * 2 + 3) % Q.length], To = (t) => !!t && t.online && typeof t.lat == "number" && Date.now() - t.at < _o, Pa = (t) => `https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`;
function Bo({ settings: t, me: a, locs: n, shareOn: r, onToggle: s, myPos: j, geoErr: f }) {
  let [p, d] = C(!1), [, b] = C(0);
  W(() => {
    let w = setInterval(() => b((F) => F + 1), 3e4);
    return () => clearInterval(w);
  }, []);
  let v = t.members, N = v.map((w) => ({ m: w, l: n[w], live: To(n[w]) })), c = N.filter((w) => w.live).map((w) => ({ id: w.m, lat: w.l.lat, lng: w.l.lng, color: Lo(v, w.m), label: w.m, text: w.m[0] })), z = c.map((w) => `${w.id}:${w.lat.toFixed(5)}:${w.lng.toFixed(5)}`).join("|"), g = Wt(() => c, [z]), [l, u] = C(null), [A, m] = C(() => {
    let w = c[0] || j;
    return w ? { lat: w.lat, lng: w.lng, z: 14 } : { lat: it.lat, lng: it.lng, z: 12 };
  }), k = () => {
    if (!c.length) return;
    let w = c.reduce((R, S) => R + S.lat, 0) / c.length, F = c.reduce((R, S) => R + S.lng, 0) / c.length, E = Math.max(...c.map((R) => re({ lat: w, lng: F }, R)));
    m({ lat: w, lng: F, z: E < 300 ? 16 : E < 1e3 ? 15 : E < 3e3 ? 13 : E < 1e4 ? 12 : 10 }), u(null);
  }, i = Y(!1);
  W(() => {
    !i.current && c.length && (i.current = !0, k());
  }, [z]);
  let h = N.filter((w) => w.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (r ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ e("strong", { children: r ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ e("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => d(!0), children: [
          /* @__PURE__ */ e(zn, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", role: "switch", "aria-checked": r, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ e("i", {}) })
    ] }),
    r && f && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-share-err", children: f }),
    /* @__PURE__ */ e(
      Da,
      {
        gkey: t.gmapsKey,
        view: A,
        setView: m,
        pins: g,
        temp: null,
        selectedId: l,
        onTap: () => u(null),
        onPinTap: (w) => u(w),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ e("b", { children: h }),
        "/",
        v.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: k, disabled: !h, children: [
        /* @__PURE__ */ e(Cn, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-fam-list", children: N.map(({ m: w, l: F, live: E }) => {
      let R = w === a, S = E && j && !R ? re(j, F) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (E ? " live" : "") + (l === w ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !E,
            onClick: () => {
              u(w), m({ lat: F.lat, lng: F.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ e(rt, { name: w, members: v, size: 34 }),
                E && /* @__PURE__ */ e("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  w,
                  R ? " (나)" : ""
                ] }),
                /* @__PURE__ */ e("span", { children: E ? `위치 공유 중, ${Ce(F.at)}${S != null ? `, 나와 ${Fa(S)}` : ""}` : F && F.at ? `앱 꺼짐, 마지막 접속 ${Ce(F.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        E && !R && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Pa(F), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Ae, { size: 13 }),
          "길 찾기"
        ] })
      ] }, w);
    }) }),
    p && /* @__PURE__ */ o(vt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => d(!1), children: [
      /* @__PURE__ */ o("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ e("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ e("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ e("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "공유 설정" }),
          /* @__PURE__ */ e("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: () => d(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ e("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var $a = "trip:chat:", ya = (t) => $a + t.at.toString(36).padStart(10, "0") + "-" + t.id, Oo = (t) => {
  let a = new Date(t);
