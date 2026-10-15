if (a && !Ct)
    try {
      let h = await Ke(a), { Place: p } = await h.importLibrary("places"), { places: m } = await p.searchText({
        textQuery: t,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: r
      });
      if (m && m.length)
        return m.map((x) => ({
          name: x.displayName,
          area: x.formattedAddress || "",
          lat: x.location.lat(),
          lng: x.location.lng(),
          link: x.googleMapsURI || "",
          placeId: x.id
        }));
    } catch {
    }
  let i = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(t)
  );
  if (!i.ok) throw new Error("search");
  return (await i.json()).map((h) => {
    let p = String(h.display_name || "").split(",").map((m) => m.trim());
    return { name: h.name || p[0] || t, area: p.slice(1, 3).join(" "), lat: Number(h.lat), lng: Number(h.lon), link: "" };
  });
}
function Xo({ settings: t, wish: a, onSave: n }) {
  let [r, i] = z(Ia[0]), [j, h] = z(1e3), [p, m] = z(null), [x, y] = z(""), [E, s] = z([]), [M, b] = z(!1), [l, u] = z(""), [I, d] = z(""), [C, c] = z({}), v = () => {
    m({ lat: it.lat, lng: it.lng, here: !1, at: Date.now() }), y("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, N = () => {
    if (y("현재 위치를 찾는 중"), !navigator.geolocation) return v();
    navigator.geolocation.getCurrentPosition(
      (f) => {
        m({ lat: f.coords.latitude, lng: f.coords.longitude, here: !0, at: Date.now() }), y("");
      },
      v,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  W(() => {
    N();
  }, []), W(() => {
    if (!p) return;
    let f = !0;
    return (async () => {
      b(!0), u("");
      let $ = null, k = "";
      if (t.gmapsKey && !Ct)
        try {
          $ = await Jo(t.gmapsKey, { lat: p.lat, lng: p.lng }, r, j), k = "google";
        } catch {
          $ = null;
        }
      if (!$)
        try {
          $ = await qo(p, r, j), k = "osm";
        } catch {
          f && (s([]), u("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), b(!1));
          return;
        }
      $.forEach((S) => S.dist = de(p, S)), k === "osm" && $.sort((S, _) => S.dist - _.dist), f && (s($.slice(0, 20)), d(k), b(!1), $.length || u(`반경 ${Me(j)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      f = !1;
    };
  }, [p, r, j, t.gmapsKey]);
  let A = (f) => C[f.id] || a.some(($) => f.placeId && $.placeId === f.placeId || $.name === f.name && ht($) && Math.abs($.lat - f.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ e(lo, { size: 15 }),
        p ? p.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Me(j)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: N, children: "위치 다시 찾기" })
    ] }),
    x && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: x }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: Ia.map((f) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (r.id === f.id ? " on" : ""), onClick: () => i(f), children: f.label }, f.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Yo.map((f) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": j === f, className: j === f ? "on" : "", onClick: () => h(f), children: Me(f) }, f)) }),
    M && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      r.label,
      " 찾는 중"
    ] }),
    !M && l && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: l }) }),
    !M && E.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: E.map((f) => {
      let $ = A(f);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: f.name }),
          f.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: f.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            f.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(co, { size: 13, fill: "currentColor" }),
              f.rating.toFixed(1),
              f.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                f.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: f.type }),
            f.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            f.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(Nt, { size: 12 }),
            Ja(f.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          $ ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e($a, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: f.name,
                  cat: r.wish,
                  area: f.addr || f.sub || "",
                  link: f.url || "",
                  memo: f.rating != null ? `구글 평점 ${f.rating.toFixed(1)}${f.count ? ` (${f.count}명)` : ""}` : "",
                  lat: f.lat,
                  lng: f.lng,
                  ...f.placeId ? { placeId: f.placeId } : {}
                }), c({ ...C, [f.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: f.url || $t({ lat: f.lat, lng: f.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(zt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Be(f), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Nt, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, f.id);
    }) }),
    I && E.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: I === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Vo({ settings: t, wish: a, me: n, onSave: r, onEdit: i, onLike: j, onPlan: h, onDelete: p, onComment: m, onDelComment: x, onReact: y }) {
  let E = a.filter(ht), [s, M] = z(
    () => E.length ? {
      lat: E.reduce((w, K) => w + K.lat, 0) / E.length,
      lng: E.reduce((w, K) => w + K.lng, 0) / E.length,
      z: E.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [b, l] = z(null), [u, I] = z(null), [d, C] = z(""), [c, v] = z([]), [N, A] = z(!1), [f, $] = z(""), k = a.find((w) => w.id === u), S = E.map((w) => `${w.id}:${w.lat}:${w.lng}:${w.cat}`).join("|"), _ = Jt(
    () => E.map((w) => ({
      id: w.id,
      lat: w.lat,
      lng: w.lng,
      color: Dt[w.cat] || Dt.기타,
      label: w.name
    })),
    [S]
  ), O = async () => {
    let w = d.trim();
    if (w) {
      if (A(!0), $(""), v([]), Wo(t.gmapsKey))
        try {
          let { Place: K } = await window.google.maps.importLibrary("places"), { places: V } = await K.searchText({
            textQuery: w,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: s.lat, lng: s.lng }
          });
          if (V && V.length) {
            v(
              V.map((X) => ({
                lat: X.location.lat(),
                lng: X.location.lng(),
                name: X.displayName,
                area: X.formattedAddress || "",
                link: X.googleMapsURI || "",
                placeId: X.id
              }))
            ), A(!1);
            return;
          }
        } catch {
        }
      try {
        let K = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(w)
        );
        if (!K.ok) throw new Error("search failed");
        let V = await K.json();
        V.length || $("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), v(
          V.map((X) => {
            let _t = String(X.display_name || "").split(",").map((Zt) => Zt.trim());
            return {
              lat: Number(X.lat),
              lng: Number(X.lon),
              name: X.name || _t[0] || w,
              area: _t.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        $("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      A(!1);
    }
  }, G = (w) => {
    M({ lat: w.lat, lng: w.lng, z: 16 }), I(null), l({ lat: w.lat, lng: w.lng, name: w.name, cat: "맛집", area: w.area, link: w.link || "", placeId: w.placeId }), v([]);
  }, U = k && k.likes.includes(n);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: d,
          onChange: (w) => C(w.target.value),
          onKeyDown: (w) => w.key === "Enter" && O(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: O, disabled: N, children: N ? "검색 중" : "검색" })
    ] }),
    f && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: f }),
    c.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: c.map((w, K) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => G(w), children: [
      /* @__PURE__ */ e("strong", { children: w.name }),
      /* @__PURE__ */ e("span", { children: w.area })
    ] }) }, K)) }),
    /* @__PURE__ */ e(
      Ya,
      {
        gkey: t.gmapsKey,
        onPoi: (w) => {
          I(null), l({ ...w, cat: "맛집" });
        },
        view: s,
        setView: M,
        pins: _,
        temp: b,
        selectedId: u,
        onTap: (w, K) => {
          I(null), l({ lat: Number(w.toFixed(6)), lng: Number(K.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (w) => {
          l(null), I(w);
        }
      }
    ),
    !b && !k && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      E.length,
      "개예요."
    ] }),
    b && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: b.name,
          onChange: (w) => l({ ...b, name: w.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Le.map((w) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (b.cat === w ? " on" : ""),
          onClick: () => l({ ...b, cat: w }),
          children: w
        },
        w
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !b.name.trim(),
            onClick: () => {
              r({
                name: b.name.trim(),
                cat: b.cat,
                area: b.area || "",
                link: b.link || "",
                memo: "",
                lat: b.lat,
                lng: b.lng,
                ...b.placeId ? { placeId: b.placeId } : {}
              }), l(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => l(null), children: "취소" })
      ] })
    ] }),
    k && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Dt[k.cat] || Dt.기타 }, children: k.cat }),
        /* @__PURE__ */ e("strong", { children: k.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => i(k), "aria-label": `${k.name} 수정`, children: /* @__PURE__ */ e(_a, { size: 16 }) })
      ] }),
      k.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(kt, { size: 13 }),
        k.area
      ] }),
      k.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: k.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-like" + (U ? " on" : ""),
            onClick: () => j(k.id),
            "aria-pressed": U,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(Re, { size: 16, fill: U ? "currentColor" : "none" }),
              "가고 싶어요 ",
              k.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(Oe, { item: k, me: n, onReact: (w) => y(k.id, w) }),
        k.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: tt[k.planned % tt.length] }, children: [
          k.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => h(k), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(rt, { name: k.by, members: t.members, size: 16 }),
          k.by
        ] }),
        /* @__PURE__ */ e(
          xt,
          {
            onConfirm: () => {
              p(k.id), I(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t(k), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(zt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Be(k), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Nt, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ e(
        Ue,
        {
          comments: k.comments || [],
          me: n,
          members: t.members,
          onAdd: (w) => m(k.id, w),
          onDelete: (w) => x(k.id, w)
        }
      )
    ] })
  ] });
}
function Zo(t) {
  let [a, n] = z("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([r, i]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === r, className: a === r ? "on" : "", onClick: () => n(r), children: i }, r)) }),
    a === "list" && /* @__PURE__ */ e(Qo, { ...t }),
    a === "map" && /* @__PURE__ */ e(Vo, { ...t }),
    a === "near" && /* @__PURE__ */ e(Xo, { ...t })
  ] });
}
function Qo({ settings: t, wish: a, me: n, onAdd: r, onEdit: i, onLike: j, onPlan: h, onDelete: p, onComment: m, onDelComment: x, onReact: y }) {
  let [E, s] = z(null), [M, b] = z("전체"), [l, u] = z(null), I = a.filter((d) => M === "전체" || d.cat === M).sort((d, C) => C.likes.length - d.likes.length || C.createdAt - d.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...Le].map((d) => /* @__PURE__ */ e("button", { className: "jt-chip" + (M === d ? " on" : ""), onClick: () => b(d), children: d }, d)) }),
    I.length === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: I.map((d) => {
      let C = d.likes.includes(n);
      return /* @__PURE__ */ o("li", { className: "jt-wish", children: [
        /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Dt[d.cat] || Dt.기타 }, children: d.cat }),
          /* @__PURE__ */ e("strong", { children: d.name }),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => i(d), "aria-label": `${d.name} 수정`, children: /* @__PURE__ */ e(_a, { size: 16 }) })
        ] }),
        d.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(kt, { size: 13 }),
          d.area
        ] }),
        d.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: d.memo }),
        /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t(d), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(zt, { size: 14 }),
            "구글맵에서 열기"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Be(d), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Nt, { size: 14 }),
            "여기서 길 찾기"
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-maplink",
              onClick: () => u(l === d.id ? null : d.id),
              "aria-expanded": l === d.id,
              children: [
                /* @__PURE__ */ e($n, { size: 14 }),
                l === d.id ? "지도 닫기" : "지도 미리보기"
              ]
            }
          )
        ] }),
        l === d.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
          /* @__PURE__ */ e(
            "iframe",
            {
              title: `${d.name} 지도`,
              src: ho(d),
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
              className: "jt-like" + (C ? " on" : ""),
              onClick: () => j(d.id),
              "aria-pressed": C,
              "aria-label": "가고 싶어요",
              children: [
                /* @__PURE__ */ e(Re, { size: 16, fill: C ? "currentColor" : "none" }),
                "가고 싶어요 ",
                d.likes.length
              ]
            }
          ),
          /* @__PURE__ */ e(Oe, { item: d, me: n, onReact: (c) => y(d.id, c) }),
          d.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: tt[d.planned % tt.length] }, children: [
            d.planned + 1,
            "일차 일정에 있어요"
          ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => h(d), children: "일정에 넣기" }),
          /* @__PURE__ */ e(
            Ua,
            {
              count: (d.comments || []).length,
              open: E === d.id,
              onClick: () => s(E === d.id ? null : d.id)
            }
          ),
          /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
            /* @__PURE__ */ e(rt, { name: d.by, members: t.members, size: 16 }),
            d.by
          ] }),
          /* @__PURE__ */ e(xt, { onConfirm: () => p(d.id), label: "" })
        ] }),
        E === d.id && /* @__PURE__ */ e(
          Ue,
          {
            comments: d.comments || [],
            me: n,
            members: t.members,
            onAdd: (c) => m(d.id, c),
            onDelete: (c) => x(d.id, c)
          }
        )
      ] }, d.id);
    }) })
  ] });
}
function Fa({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((r, i) => /* @__PURE__ */ o("li", { className: r.from === n || r.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: r.from }),
      /* @__PURE__ */ e(Tn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: r.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: q(r.v) }),
      /* @__PURE__ */ e("em", { children: Gt(r.v, a) })
    ] })
  ] }, i)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function tr({ e: t, members: a, rate: n, onEdit: r }) {
  let { Icon: i, color: j } = Ie(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => r(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": j }, children: /* @__PURE__ */ e(i, { size: 18 }) }),
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
var Da = (t) => t > 0.5 ? `받을 돈 ${q(t)}` : t < -0.5 ? `보낼 돈 ${q(-t)}` : "주고받을 돈 없음", le = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function er({ settings: t, spend: a, me: n, onEdit: r }) {
  let { members: i, rate: j, start: h } = t, [p, m] = z("me"), x = a.reduce((l, u) => l + (Number(u.amount) || 0), 0), y = Jt(() => Ca(a, i), [a, i]), E = Jt(() => {
    let l = {};
    return a.forEach((u) => l[u.cat] = (l[u.cat] || 0) + (Number(u.amount) || 0)), La.filter((u) => l[u]).map((u) => ({ c: u, v: l[u] }));
  }, [a]), s = Jt(() => {
    let l = {};
    return a.forEach((u) => (l[u.day] = l[u.day] || []).push(u)), Object.keys(l).map(Number).sort((u, I) => u - I).map((u) => ({
      day: u,
      sum: l[u].reduce((I, d) => I + (Number(d.amount) || 0), 0),
      items: [...l[u]].sort((I, d) => d.createdAt - I.createdAt),
      res: Ca(l[u], i)
    }));
  }, [a, i]), M = y.net[n] || 0, b = y.moves.filter((l) => l.from === n || l.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: q(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: pe(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: q(x) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Gt(x, j),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        q(y.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: pe(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: E.map(({ c: l, v: u }) => /* @__PURE__ */ e("i", { style: { flexGrow: u, background: Ie(l).color } }, l)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: E.map(({ c: l, v: u }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: Ie(l).color } }),
        l,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(u / x * 100),
          "%"
        ] })
      ] }, l)) })
    ] }),
    y.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        y.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: y.skipped.map((l) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => r(l), children: [
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
    ].map(([l, u]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": p === l, className: p === l ? "on" : "", onClick: () => m(l), children: u }, l)) }),
    p === "me" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (le(M) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(rt, { name: n, members: i, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: M > 0.5 ? `${q(M)} 받으면 돼요` : M < -0.5 ? `${q(-M)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        b.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: b.map((l, u) => /* @__PURE__ */ o("li", { children: [
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
            /* @__PURE__ */ e("b", { children: q(y.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              q(y.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: M > 0.5 ? "더 결제했으니 받을 돈" : M < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: le(M), children: M > 0.5 ? q(M) : M < -0.5 ? q(-M) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: s.map((l) => {
        let u = dt(h, l.day), I = l.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": tt[l.day % tt.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            l.day + 1,
            "일차 ",
            qt(u),
            " (",
            Pt(u),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            q(l.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            q(l.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + le(I), children: Da(I) })
        ] }, l.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    p === "day" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      s.map((l) => {
        let u = dt(h, l.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": tt[l.day % tt.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: l.day + 1 }),
            qt(u),
            " (",
            Pt(u),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: q(l.sum) })
          ] }),
          /* @__PURE__ */ e(Fa, { moves: l.res.moves, rate: j, me: n }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: l.items.map((I) => /* @__PURE__ */ e(tr, { e: I, members: i, rate: j, onEdit: r }, I.id)) })
        ] }, l.day);
      })
    ] }),
    p === "all" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(Fa, { moves: y.moves, rate: j, me: n }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: i.map((l) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e(rt, { name: l, members: i, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: l }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            q(y.paid[l]),
            ", 쓴 돈 ",
            q(y.share[l])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + le(y.net[l]), children: Da(y.net[l]) })
      ] }, l)) })
    ] })
  ] });
}
var Ae = "trip:loc:", ar = 3 * 6e4, nr = (t, a) => tt[(Math.max(0, t.indexOf(a)) * 2 + 3) % tt.length], or = (t) => !!t && t.online && typeof t.lat == "number" && Date.now() - t.at < ar, qa = (t) => `https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`;
function rr({ settings: t, me: a, locs: n, shareOn: r, onToggle: i, myPos: j, geoErr: h }) {
  let [p, m] = z(!1), [, x] = z(0);
  W(() => {
    let N = setInterval(() => x((A) => A + 1), 3e4);
    return () => clearInterval(N);
  }, []);
  let y = t.members, E = y.map((N) => ({ m: N, l: n[N], live: or(n[N]) })), s = E.filter((N) => N.live).map((N) => ({ id: N.m, lat: N.l.lat, lng: N.l.lng, color: nr(y, N.m), label: N.m, text: N.m[0] })), M = s.map((N) => `${N.id}:${N.lat.toFixed(5)}:${N.lng.toFixed(5)}`).join("|"), b = Jt(() => s, [M]), [l, u] = z(null), [I, d] = z(() => {
    let N = s[0] || j;
    return N ? { lat: N.lat, lng: N.lng, z: 14 } : { lat: it.lat, lng: it.lng, z: 12 };
  }), C = () => {
    if (!s.length) return;
    let N = s.reduce(($, k) => $ + k.lat, 0) / s.length, A = s.reduce(($, k) => $ + k.lng, 0) / s.length, f = Math.max(...s.map(($) => de({ lat: N, lng: A }, $)));
    d({ lat: N, lng: A, z: f < 300 ? 16 : f < 1e3 ? 15 : f < 3e3 ? 13 : f < 1e4 ? 12 : 10 }), u(null);
  }, c = Y(!1);
  W(() => {
    !c.current && s.length && (c.current = !0, C());
  }, [M]);
  let v = E.filter((N) => N.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (r ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ e("strong", { children: r ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ e("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => m(!0), children: [
          /* @__PURE__ */ e(Hn, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", role: "switch", "aria-checked": r, "aria-label": "내 위치 공유", className: "jt-switch", onClick: i, children: /* @__PURE__ */ e("i", {}) })
    ] }),
    r && h && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-share-err", children: h }),
    /* @__PURE__ */ e(
      Ya,
      {
        gkey: t.gmapsKey,
        view: I,
        setView: d,
        pins: b,
        temp: null,
        selectedId: l,
        onTap: () => u(null),
        onPinTap: (N) => u(N),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ e("b", { children: v }),
        "/",
        y.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: C, disabled: !v, children: [
        /* @__PURE__ */ e(Wn, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-fam-list", children: E.map(({ m: N, l: A, live: f }) => {
      let $ = N === a, k = f && j && !$ ? de(j, A) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (f ? " live" : "") + (l === N ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !f,
            onClick: () => {
              u(N), d({ lat: A.lat, lng: A.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ e(rt, { name: N, members: y, size: 34 }),
                f && /* @__PURE__ */ e("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  N,
                  $ ? " (나)" : ""
                ] }),
                /* @__PURE__ */ e("span", { children: f ? `위치 공유 중, ${Fe(A.at)}${k != null ? `, 나와 ${Ja(k)}` : ""}` : A && A.at ? `앱 꺼짐, 마지막 접속 ${Fe(A.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        f && !$ && /* @__PURE__ */ o("a", { className: "jt-maplink", href: qa(A), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Nt, { size: 13 }),
          "길 찾기"
        ] })
      ] }, N);
    }) }),
    p && /* @__PURE__ */ o(yt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => m(!1), children: [
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
      /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: () => m(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ e("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var Ga = "trip:chat:", Se = "trip:read:", Pa = (t) => Ga + t.at.toString(36).padStart(10, "0") + "-" + t.id, ir = (t) => {
  let a = new Date(t);
  return `${nt(a.getHours())}:${nt(a.getMinutes())}`;
}, sr = (t) => {
  let a = new Date(t);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${Pt(a)})`;
};
function lr(t) {
  return t.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ e("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function cr({ settings: t, me: a, msgs: n, reads: r, onSend: i, onDelete: j, onSendLoc: h, badgeAsk: p, onBadgeAsk: m }) {
  let x = t.members, [y, E] = z(""), [s, M] = z(null), [b, l] = z(!1), u = Y(null), I = Y(!0), d = n.length;
  W(() => {
    let A = n[d - 1], f = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (I.current || f || A && A.by === a) && u.current && u.current.scrollIntoView({ block: "end", behavior: I.current ? "auto" : "smooth" }), I.current = !1;
  }, [d]);
  let C = () => {
    let A = y.trim();
    A && (i(A), E(""));
  }, c = async () => {
    l(!0), await h(), l(!1);
  }, v = "", N = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    d === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ e("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    p && /* @__PURE__ */ o("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ e("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
