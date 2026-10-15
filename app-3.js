type: a.label,
      addr: ""
    };
  }).filter((b) => b.lat && b.name);
}
async function Uo(t, a, n) {
  let r = n || { lat: it.lat, lng: it.lng };
  if (a && !zt)
    try {
      let b = await Oe(a), { Place: p } = await b.importLibrary("places"), { places: d } = await p.searchText({
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
  let s = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(t)
  );
  if (!s.ok) throw new Error("search");
  return (await s.json()).map((b) => {
    let p = String(b.display_name || "").split(",").map((d) => d.trim());
    return { name: b.name || p[0] || t, area: p.slice(1, 3).join(" "), lat: Number(b.lat), lng: Number(b.lon), link: "" };
  });
}
function Ko({ settings: t, wish: a, onSave: n }) {
  let [r, s] = z(Ma[0]), [j, b] = z(1e3), [p, d] = z(null), [h, v] = z(""), [E, c] = z([]), [A, g] = z(!1), [l, u] = z(""), [I, m] = z(""), [N, i] = z({}), x = () => {
    d({ lat: it.lat, lng: it.lng, here: !1, at: Date.now() }), v("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, k = () => {
    if (v("현재 위치를 찾는 중"), !navigator.geolocation) return x();
    navigator.geolocation.getCurrentPosition(
      (C) => {
        d({ lat: C.coords.latitude, lng: C.coords.longitude, here: !0, at: Date.now() }), v("");
      },
      x,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  W(() => {
    k();
  }, []), W(() => {
    if (!p) return;
    let C = !0;
    return (async () => {
      g(!0), u("");
      let R = null, w = "";
      if (t.gmapsKey && !zt)
        try {
          R = await Bo(t.gmapsKey, { lat: p.lat, lng: p.lng }, r, j), w = "google";
        } catch {
          R = null;
        }
      if (!R)
        try {
          R = await Oo(p, r, j), w = "osm";
        } catch {
          C && (c([]), u("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), g(!1));
          return;
        }
      R.forEach((M) => M.dist = ce(p, M)), w === "osm" && R.sort((M, _) => M.dist - _.dist), C && (c(R.slice(0, 20)), m(w), g(!1), R.length || u(`반경 ${ze(j)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      C = !1;
    };
  }, [p, r, j, t.gmapsKey]);
  let S = (C) => N[C.id] || a.some((R) => C.placeId && R.placeId === C.placeId || R.name === C.name && ht(R) && Math.abs(R.lat - C.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ e(eo, { size: 15 }),
        p ? p.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        ze(j)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: k, children: "위치 다시 찾기" })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: h }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: Ma.map((C) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (r.id === C.id ? " on" : ""), onClick: () => s(C), children: C.label }, C.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: To.map((C) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": j === C, className: j === C ? "on" : "", onClick: () => b(C), children: ze(C) }, C)) }),
    A && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      r.label,
      " 찾는 중"
    ] }),
    !A && l && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: l }) }),
    !A && E.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: E.map((C) => {
      let R = S(C);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: C.name }),
          C.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: C.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            C.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(ao, { size: 13, fill: "currentColor" }),
              C.rating.toFixed(1),
              C.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                C.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: C.type }),
            C.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            C.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(Ct, { size: 12 }),
            Ka(C.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          R ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(Fa, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: C.name,
                  cat: r.wish,
                  area: C.addr || C.sub || "",
                  link: C.url || "",
                  memo: C.rating != null ? `구글 평점 ${C.rating.toFixed(1)}${C.count ? ` (${C.count}명)` : ""}` : "",
                  lat: C.lat,
                  lng: C.lng,
                  ...C.placeId ? { placeId: C.placeId } : {}
                }), i({ ...N, [C.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: C.url || Rt({ lat: C.lat, lng: C.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Et, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: _e(C), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Ct, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, C.id);
    }) }),
    I && E.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: I === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Wo({ settings: t, wish: a, me: n, onSave: r, onEdit: s, onLike: j, onPlan: b, onDelete: p, onComment: d, onDelComment: h, onReact: v }) {
  let E = a.filter(ht), [c, A] = z(
    () => E.length ? {
      lat: E.reduce((y, K) => y + K.lat, 0) / E.length,
      lng: E.reduce((y, K) => y + K.lng, 0) / E.length,
      z: E.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [g, l] = z(null), [u, I] = z(null), [m, N] = z(""), [i, x] = z([]), [k, S] = z(!1), [C, R] = z(""), w = a.find((y) => y.id === u), M = E.map((y) => `${y.id}:${y.lat}:${y.lng}:${y.cat}`).join("|"), _ = Jt(
    () => E.map((y) => ({
      id: y.id,
      lat: y.lat,
      lng: y.lng,
      color: Pt[y.cat] || Pt.기타,
      label: y.name
    })),
    [M]
  ), O = async () => {
    let y = m.trim();
    if (y) {
      if (S(!0), R(""), x([]), _o(t.gmapsKey))
        try {
          let { Place: K } = await window.google.maps.importLibrary("places"), { places: G } = await K.searchText({
            textQuery: y,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: c.lat, lng: c.lng }
          });
          if (G && G.length) {
            x(
              G.map((nt) => ({
                lat: nt.location.lat(),
                lng: nt.location.lng(),
                name: nt.displayName,
                area: nt.formattedAddress || "",
                link: nt.googleMapsURI || "",
                placeId: nt.id
              }))
            ), S(!1);
            return;
          }
        } catch {
        }
      try {
        let K = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(y)
        );
        if (!K.ok) throw new Error("search failed");
        let G = await K.json();
        G.length || R("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), x(
          G.map((nt) => {
            let jt = String(nt.display_name || "").split(",").map((pe) => pe.trim());
            return {
              lat: Number(nt.lat),
              lng: Number(nt.lon),
              name: nt.name || jt[0] || y,
              area: jt.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        R("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      S(!1);
    }
  }, X = (y) => {
    A({ lat: y.lat, lng: y.lng, z: 16 }), I(null), l({ lat: y.lat, lng: y.lng, name: y.name, cat: "맛집", area: y.area, link: y.link || "", placeId: y.placeId }), x([]);
  }, U = w && w.likes.includes(n);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: m,
          onChange: (y) => N(y.target.value),
          onKeyDown: (y) => y.key === "Enter" && O(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: O, disabled: k, children: k ? "검색 중" : "검색" })
    ] }),
    C && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: C }),
    i.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: i.map((y, K) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => X(y), children: [
      /* @__PURE__ */ e("strong", { children: y.name }),
      /* @__PURE__ */ e("span", { children: y.area })
    ] }) }, K)) }),
    /* @__PURE__ */ e(
      Ua,
      {
        gkey: t.gmapsKey,
        onPoi: (y) => {
          I(null), l({ ...y, cat: "맛집" });
        },
        view: c,
        setView: A,
        pins: _,
        temp: g,
        selectedId: u,
        onTap: (y, K) => {
          I(null), l({ lat: Number(y.toFixed(6)), lng: Number(K.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (y) => {
          l(null), I(y);
        }
      }
    ),
    !g && !w && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      E.length,
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
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Re.map((y) => /* @__PURE__ */ e(
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
    w && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Pt[w.cat] || Pt.기타 }, children: w.cat }),
        /* @__PURE__ */ e("strong", { children: w.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => s(w), "aria-label": `${w.name} 수정`, children: /* @__PURE__ */ e(Pa, { size: 16 }) })
      ] }),
      w.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(Nt, { size: 13 }),
        w.area
      ] }),
      w.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: w.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-like" + (U ? " on" : ""),
            onClick: () => j(w.id),
            "aria-pressed": U,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(Pe, { size: 16, fill: U ? "currentColor" : "none" }),
              "가고 싶어요 ",
              w.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Te, { item: w, me: n, onReact: (y) => v(w.id, y) }),
        w.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: Q[w.planned % Q.length] }, children: [
          w.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => b(w), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(rt, { name: w.by, members: t.members, size: 16 }),
          w.by
        ] }),
        /* @__PURE__ */ e(
          xt,
          {
            onConfirm: () => {
              p(w.id), I(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt(w), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Et, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ o("a", { className: "jt-maplink route", href: _e(w), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Ct, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ e(
        Be,
        {
          comments: w.comments || [],
          me: n,
          members: t.members,
          onAdd: (y) => d(w.id, y),
          onDelete: (y) => h(w.id, y)
        }
      )
    ] })
  ] });
}
function Ho(t) {
  let [a, n] = z("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([r, s]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === r, className: a === r ? "on" : "", onClick: () => n(r), children: s }, r)) }),
    a === "list" && /* @__PURE__ */ e(Yo, { ...t }),
    a === "map" && /* @__PURE__ */ e(Wo, { ...t }),
    a === "near" && /* @__PURE__ */ e(Ko, { ...t })
  ] });
}
function Yo({ settings: t, wish: a, me: n, onAdd: r, onEdit: s, onLike: j, onPlan: b, onDelete: p, onComment: d, onDelComment: h, onReact: v }) {
  let [E, c] = z(null), [A, g] = z("전체"), [l, u] = z(null), I = a.filter((m) => A === "전체" || m.cat === A).sort((m, N) => N.likes.length - m.likes.length || N.createdAt - m.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...Re].map((m) => /* @__PURE__ */ e("button", { className: "jt-chip" + (A === m ? " on" : ""), onClick: () => g(m), children: m }, m)) }),
    I.length === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: I.map((m) => {
      let N = m.likes.includes(n);
      return /* @__PURE__ */ o("li", { className: "jt-wish", children: [
        /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Pt[m.cat] || Pt.기타 }, children: m.cat }),
          /* @__PURE__ */ e("strong", { children: m.name }),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => s(m), "aria-label": `${m.name} 수정`, children: /* @__PURE__ */ e(Pa, { size: 16 }) })
        ] }),
        m.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(Nt, { size: 13 }),
          m.area
        ] }),
        m.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: m.memo }),
        /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt(m), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Et, { size: 14 }),
            "구글맵에서 열기"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: _e(m), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Ct, { size: 14 }),
            "여기서 길 찾기"
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-maplink",
              onClick: () => u(l === m.id ? null : m.id),
              "aria-expanded": l === m.id,
              children: [
                /* @__PURE__ */ e(An, { size: 14 }),
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
              src: co(m),
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
              className: "jt-like" + (N ? " on" : ""),
              onClick: () => j(m.id),
              "aria-pressed": N,
              "aria-label": "가고 싶어요",
              children: [
                /* @__PURE__ */ e(Pe, { size: 16, fill: N ? "currentColor" : "none" }),
                "가고 싶어요 ",
                m.likes.length
              ]
            }
          ),
          /* @__PURE__ */ e(Te, { item: m, me: n, onReact: (i) => v(m.id, i) }),
          m.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: Q[m.planned % Q.length] }, children: [
            m.planned + 1,
            "일차 일정에 있어요"
          ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => b(m), children: "일정에 넣기" }),
          /* @__PURE__ */ e(
            Ta,
            {
              count: (m.comments || []).length,
              open: E === m.id,
              onClick: () => c(E === m.id ? null : m.id)
            }
          ),
          /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
            /* @__PURE__ */ e(rt, { name: m.by, members: t.members, size: 16 }),
            m.by
          ] }),
          /* @__PURE__ */ e(xt, { onConfirm: () => p(m.id), label: "" })
        ] }),
        E === m.id && /* @__PURE__ */ e(
          Be,
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
function Aa({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((r, s) => /* @__PURE__ */ o("li", { className: r.from === n || r.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: r.from }),
      /* @__PURE__ */ e(Dn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: r.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: q(r.v) }),
      /* @__PURE__ */ e("em", { children: Gt(r.v, a) })
    ] })
  ] }, s)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Jo({ e: t, members: a, rate: n, onEdit: r }) {
  let { Icon: s, color: j } = Ae(t.cat);
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
      /* @__PURE__ */ e("strong", { children: q(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: Gt(Number(t.amount) || 0, n) })
    ] })
  ] }) });
}
var Sa = (t) => t > 0.5 ? `받을 돈 ${q(t)}` : t < -0.5 ? `보낼 돈 ${q(-t)}` : "주고받을 돈 없음", ie = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function qo({ settings: t, spend: a, me: n, onEdit: r }) {
  let { members: s, rate: j, start: b } = t, [p, d] = z("me"), h = a.reduce((l, u) => l + (Number(u.amount) || 0), 0), v = Jt(() => wa(a, s), [a, s]), E = Jt(() => {
    let l = {};
    return a.forEach((u) => l[u.cat] = (l[u.cat] || 0) + (Number(u.amount) || 0)), $a.filter((u) => l[u]).map((u) => ({ c: u, v: l[u] }));
  }, [a]), c = Jt(() => {
    let l = {};
    return a.forEach((u) => (l[u.day] = l[u.day] || []).push(u)), Object.keys(l).map(Number).sort((u, I) => u - I).map((u) => ({
      day: u,
      sum: l[u].reduce((I, m) => I + (Number(m.amount) || 0), 0),
      items: [...l[u]].sort((I, m) => m.createdAt - I.createdAt),
      res: wa(l[u], s)
    }));
  }, [a, s]), A = v.net[n] || 0, g = v.moves.filter((l) => l.from === n || l.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: q(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: le(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: q(h) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Gt(h, j),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        q(v.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: le(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: E.map(({ c: l, v: u }) => /* @__PURE__ */ e("i", { style: { flexGrow: u, background: Ae(l).color } }, l)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: E.map(({ c: l, v: u }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: Ae(l).color } }),
        l,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(u / h * 100),
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
        /* @__PURE__ */ e("b", { children: q(Number(l.amount) || 0) })
      ] }) }, l.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([l, u]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": p === l, className: p === l ? "on" : "", onClick: () => d(l), children: u }, l)) }),
    p === "me" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (ie(A) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(rt, { name: n, members: s, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: A > 0.5 ? `${q(A)} 받으면 돼요` : A < -0.5 ? `${q(-A)} 보내면 돼요` : "주고받을 돈이 없어요" })
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
            /* @__PURE__ */ e("strong", { children: q(l.v) }),
            /* @__PURE__ */ e("em", { children: Gt(l.v, j) })
          ] })
        ] }, u)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: q(v.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              q(v.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: A > 0.5 ? "더 결제했으니 받을 돈" : A < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: ie(A), children: A > 0.5 ? q(A) : A < -0.5 ? q(-A) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: c.map((l) => {
        let u = dt(b, l.day), I = l.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": Q[l.day % Q.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            l.day + 1,
            "일차 ",
            qt(u),
            " (",
            $t(u),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            q(l.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            q(l.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + ie(I), children: Sa(I) })
        ] }, l.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    p === "day" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      c.map((l) => {
        let u = dt(b, l.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": Q[l.day % Q.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: l.day + 1 }),
            qt(u),
            " (",
            $t(u),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: q(l.sum) })
          ] }),
          /* @__PURE__ */ e(Aa, { moves: l.res.moves, rate: j, me: n }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: l.items.map((I) => /* @__PURE__ */ e(Jo, { e: I, members: s, rate: j, onEdit: r }, I.id)) })
        ] }, l.day);
      })
    ] }),
    p === "all" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(Aa, { moves: v.moves, rate: j, me: n }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: s.map((l) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e(rt, { name: l, members: s, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: l }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            q(v.paid[l]),
            ", 쓴 돈 ",
            q(v.share[l])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + ie(v.net[l]), children: Sa(v.net[l]) })
      ] }, l)) })
    ] })
  ] });
}
var Ee = "trip:loc:", Go = 3 * 6e4, Xo = (t, a) => Q[(Math.max(0, t.indexOf(a)) * 2 + 3) % Q.length], Vo = (t) => !!t && t.online && typeof t.lat == "number" && Date.now() - t.at < Go, Wa = (t) => `https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`;
function Zo({ settings: t, me: a, locs: n, shareOn: r, onToggle: s, myPos: j, geoErr: b }) {
  let [p, d] = z(!1), [, h] = z(0);
  W(() => {
    let k = setInterval(() => h((S) => S + 1), 3e4);
    return () => clearInterval(k);
  }, []);
  let v = t.members, E = v.map((k) => ({ m: k, l: n[k], live: Vo(n[k]) })), c = E.filter((k) => k.live).map((k) => ({ id: k.m, lat: k.l.lat, lng: k.l.lng, color: Xo(v, k.m), label: k.m, text: k.m[0] })), A = c.map((k) => `${k.id}:${k.lat.toFixed(5)}:${k.lng.toFixed(5)}`).join("|"), g = Jt(() => c, [A]), [l, u] = z(null), [I, m] = z(() => {
    let k = c[0] || j;
    return k ? { lat: k.lat, lng: k.lng, z: 14 } : { lat: it.lat, lng: it.lng, z: 12 };
  }), N = () => {
    if (!c.length) return;
    let k = c.reduce((R, w) => R + w.lat, 0) / c.length, S = c.reduce((R, w) => R + w.lng, 0) / c.length, C = Math.max(...c.map((R) => ce({ lat: k, lng: S }, R)));
    m({ lat: k, lng: S, z: C < 300 ? 16 : C < 1e3 ? 15 : C < 3e3 ? 13 : C < 1e4 ? 12 : 10 }), u(null);
  }, i = Y(!1);
  W(() => {
    !i.current && c.length && (i.current = !0, N());
  }, [A]);
  let x = E.filter((k) => k.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (r ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ e("strong", { children: r ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ e("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => d(!0), children: [
          /* @__PURE__ */ e(Ln, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", role: "switch", "aria-checked": r, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ e("i", {}) })
    ] }),
    r && b && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-share-err", children: b }),
    /* @__PURE__ */ e(
      Ua,
      {
        gkey: t.gmapsKey,
        view: I,
        setView: m,
        pins: g,
        temp: null,
        selectedId: l,
        onTap: () => u(null),
        onPinTap: (k) => u(k),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ e("b", { children: x }),
        "/",
        v.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: N, disabled: !x, children: [
        /* @__PURE__ */ e(_n, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-fam-list", children: E.map(({ m: k, l: S, live: C }) => {
      let R = k === a, w = C && j && !R ? ce(j, S) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (C ? " live" : "") + (l === k ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !C,
            onClick: () => {
              u(k), m({ lat: S.lat, lng: S.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ e(rt, { name: k, members: v, size: 34 }),
                C && /* @__PURE__ */ e("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  k,
                  R ? " (나)" : ""
                ] }),
                /* @__PURE__ */ e("span", { children: C ? `위치 공유 중, ${Se(S.at)}${w != null ? `, 나와 ${Ka(w)}` : ""}` : S && S.at ? `앱 꺼짐, 마지막 접속 ${Se(S.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        C && !R && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Wa(S), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Ct, { size: 13 }),
          "길 찾기"
        ] })
      ] }, k);
    }) }),
    p && /* @__PURE__ */ o(wt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => d(!1), children: [
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
var Ha = "trip:chat:", Me = "trip:read:", Ia = (t) => Ha + t.at.toString(36).padStart(10, "0") + "-" + t.id, Qo = (t) => {
  let a = new Date(t);
  return `${at(a.getHours())}:${at(a.getMinutes())}`;
}, tr = (t) => {
  let a = new Date(t);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${$t(a)})`;
};
function er(t) {
  return t.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ e("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function ar({ settings: t, me: a, msgs: n, reads: r, onSend: s, onDelete: j, onSendLoc: b, badgeAsk: p, onBadgeAsk: d }) {
  let h = t.members, [v, E] = z(""), [c, A] = z(null), [g, l] = z(!1), u = Y(null), I = Y(!0), m = n.length;
  W(() => {
    let S = n[m - 1], C = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (I.current || C || S && S.by === a) && u.current && u.current.scrollIntoView({ block: "end", behavior: I.current ? "auto" : "smooth" }), I.current = !1;
  }, [m]);
  let N = () => {
    let S = v.trim();
    S && (s(S), E(""));
