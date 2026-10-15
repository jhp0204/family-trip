return { name: b.name || m[0] || t, area: m.slice(1, 3).join(" "), lat: Number(b.lat), lng: Number(b.lon), link: "" };
  });
}
function Qo({ settings: t, wish: a, onSave: n }) {
  let [i, l] = w(Pa[0]), [x, b] = w(1e3), [m, g] = w(null), [h, v] = w(""), [z, p] = w([]), [C, j] = w(!1), [c, u] = w(""), [M, N] = w(""), [y, d] = w({}), S = () => {
    g({ lat: lt.lat, lng: lt.lng, here: !1, at: Date.now() }), v("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, k = () => {
    if (v("현재 위치를 찾는 중"), !navigator.geolocation) return S();
    navigator.geolocation.getCurrentPosition(
      (s) => {
        g({ lat: s.coords.latitude, lng: s.coords.longitude, here: !0, at: Date.now() }), v("");
      },
      S,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  W(() => {
    k();
  }, []), W(() => {
    if (!m) return;
    let s = !0;
    return (async () => {
      j(!0), u("");
      let P = null, A = "";
      if (t.gmapsKey && !zt)
        try {
          P = await Xo(t.gmapsKey, { lat: m.lat, lng: m.lng }, i, x), A = "google";
        } catch {
          P = null;
        }
      if (!P)
        try {
          P = await Vo(m, i, x), A = "osm";
        } catch {
          s && (p([]), u("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), j(!1));
          return;
        }
      P.forEach((r) => r.dist = ge(m, r)), A === "osm" && P.sort((r, L) => r.dist - L.dist), s && (p(P.slice(0, 20)), N(A), j(!1), P.length || u(`반경 ${Ie(x)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      s = !1;
    };
  }, [m, i, x, t.gmapsKey]);
  let E = (s) => y[s.id] || a.some((P) => s.placeId && P.placeId === s.placeId || P.name === s.name && xt(P) && Math.abs(P.lat - s.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ e(mo, { size: 15 }),
        m ? m.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Ie(x)
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: k, children: "위치 다시 찾기" })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "jt-hint jt-near-msg", children: h }),
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: Pa.map((s) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (i.id === s.id ? " on" : ""), onClick: () => l(s), children: s.label }, s.id)) }),
    /* @__PURE__ */ e("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Go.map((s) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": x === s, className: x === s ? "on" : "", onClick: () => b(s), children: Ie(s) }, s)) }),
    C && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !C && c && /* @__PURE__ */ e("div", { className: "jt-empty", children: /* @__PURE__ */ e("p", { children: c }) }),
    !C && z.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-near-list", children: z.map((s) => {
      let P = E(s);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ e("strong", { children: s.name }),
          s.sub && /* @__PURE__ */ e("span", { className: "jt-near-sub", children: s.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            s.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ e(uo, { size: 13, fill: "currentColor" }),
              s.rating.toFixed(1),
              s.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                s.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ e("span", { children: s.type }),
            s.open === !0 && /* @__PURE__ */ e("span", { className: "jt-open", children: "영업 중" }),
            s.open === !1 && /* @__PURE__ */ e("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ e(Ct, { size: 12 }),
            Za(s.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          P ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ e(La, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: s.name,
                  cat: i.wish,
                  area: s.addr || s.sub || "",
                  link: s.url || "",
                  memo: s.rating != null ? `구글 평점 ${s.rating.toFixed(1)}${s.count ? ` (${s.count}명)` : ""}` : "",
                  lat: s.lat,
                  lng: s.lng,
                  ...s.placeId ? { placeId: s.placeId } : {}
                }), d({ ...y, [s.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: s.url || $t({ lat: s.lat, lng: s.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Et, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Ke(s), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Ct, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, s.id);
    }) }),
    M && z.length > 0 && /* @__PURE__ */ e("p", { className: "jt-near-src", children: M === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function ti({ settings: t, wish: a, plan: n, me: i, onSave: l, onEdit: x, onLike: b, onPlan: m, onDelete: g, onComment: h, onDelComment: v, onReact: z }) {
  let p = a.filter(xt), [C, j] = w(
    () => p.length ? {
      lat: p.reduce((F, J) => F + J.lat, 0) / p.length,
      lng: p.reduce((F, J) => F + J.lng, 0) / p.length,
      z: p.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [c, u] = w(null), [M, N] = w(null), [y, d] = w(""), [S, k] = w([]), [E, s] = w(!1), [P, A] = w(""), r = a.find((F) => F.id === M), L = p.map((F) => `${F.id}:${F.lat}:${F.lng}:${F.cat}`).join("|"), B = qt(
    () => p.map((F) => ({
      id: F.id,
      lat: F.lat,
      lng: F.lng,
      color: Pt[F.cat] || Pt.기타,
      label: F.name
    })),
    [L]
  ), Y = async () => {
    let F = y.trim();
    if (F) {
      if (s(!0), A(""), k([]), Jo(t.gmapsKey))
        try {
          let { Place: J } = await window.google.maps.importLibrary("places"), { places: tt } = await J.searchText({
            textQuery: F,
            fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
            language: "ko",
            maxResultCount: 6,
            locationBias: { lat: C.lat, lng: C.lng }
          });
          if (tt && tt.length) {
            k(
              tt.map((et) => ({
                lat: et.location.lat(),
                lng: et.location.lng(),
                name: et.displayName,
                area: et.formattedAddress || "",
                link: et.googleMapsURI || "",
                placeId: et.id
              }))
            ), s(!1);
            return;
          }
        } catch {
        }
      try {
        let J = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(F)
        );
        if (!J.ok) throw new Error("search failed");
        let tt = await J.json();
        tt.length || A("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), k(
          tt.map((et) => {
            let Lt = String(et.display_name || "").split(",").map((ee) => ee.trim());
            return {
              lat: Number(et.lat),
              lng: Number(et.lon),
              name: et.name || Lt[0] || F,
              area: Lt.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        A("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      s(!1);
    }
  }, K = (F) => {
    j({ lat: F.lat, lng: F.lng, z: 16 }), N(null), u({ lat: F.lat, lng: F.lng, name: F.name, cat: "맛집", area: F.area, link: F.link || "", placeId: F.placeId }), k([]);
  }, $ = r && r.likes.includes(i);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: y,
          onChange: (F) => d(F.target.value),
          onKeyDown: (F) => F.key === "Enter" && Y(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: Y, disabled: E, children: E ? "검색 중" : "검색" })
    ] }),
    P && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: P }),
    S.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: S.map((F, J) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => K(F), children: [
      /* @__PURE__ */ e("strong", { children: F.name }),
      /* @__PURE__ */ e("span", { children: F.area })
    ] }) }, J)) }),
    /* @__PURE__ */ e(
      Va,
      {
        gkey: t.gmapsKey,
        onPoi: (F) => {
          N(null), u({ ...F, cat: "맛집" });
        },
        view: C,
        setView: j,
        pins: B,
        temp: c,
        selectedId: M,
        onTap: (F, J) => {
          N(null), u({ lat: Number(F.toFixed(6)), lng: Number(J.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (F) => {
          u(null), N(F);
        }
      }
    ),
    !c && !r && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      p.length,
      "개예요."
    ] }),
    c && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: c.name,
          onChange: (F) => u({ ...c, name: F.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Ue.map((F) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (c.cat === F ? " on" : ""),
          onClick: () => u({ ...c, cat: F }),
          children: F
        },
        F
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !c.name.trim(),
            onClick: () => {
              l({
                name: c.name.trim(),
                cat: c.cat,
                area: c.area || "",
                link: c.link || "",
                memo: "",
                lat: c.lat,
                lng: c.lng,
                ...c.placeId ? { placeId: c.placeId } : {}
              }), u(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => u(null), children: "취소" })
      ] })
    ] }),
    r && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Pt[r.cat] || Pt.기타 }, children: r.cat }),
        /* @__PURE__ */ e("strong", { children: r.name }),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => x(r), "aria-label": `${r.name} 수정`, children: /* @__PURE__ */ e(Te, { size: 16 }) })
      ] }),
      r.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(Nt, { size: 13 }),
        r.area
      ] }),
      r.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: r.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-like" + ($ ? " on" : ""),
            onClick: () => b(r.id),
            "aria-pressed": $,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e(Be, { size: 16, fill: $ ? "currentColor" : "none" }),
              "가고 싶어요 ",
              r.likes.length
            ]
          }
        ),
        /* @__PURE__ */ e(He, { item: r, me: i, onReact: (F) => z(r.id, F) }),
        Gt(r, n) != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: V[Gt(r, n) % V.length] }, children: [
          Gt(r, n) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => m(r), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(st, { name: r.by, members: t.members, size: 16 }),
          r.by
        ] }),
        /* @__PURE__ */ e(
          jt,
          {
            onConfirm: () => {
              g(r.id), N(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t(r), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Et, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Ke(r), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Ct, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ e(
        Ye,
        {
          comments: r.comments || [],
          me: i,
          members: t.members,
          onAdd: (F) => h(r.id, F),
          onDelete: (F) => v(r.id, F)
        }
      )
    ] })
  ] });
}
function ei(t) {
  let [a, n] = w("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([i, l]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": a === i, className: a === i ? "on" : "", onClick: () => n(i), children: l }, i)) }),
    a === "list" && /* @__PURE__ */ e(ai, { ...t }),
    a === "map" && /* @__PURE__ */ e(ti, { ...t }),
    a === "near" && /* @__PURE__ */ e(Qo, { ...t })
  ] });
}
function ai({ settings: t, wish: a, plan: n, me: i, onAdd: l, onEdit: x, onLike: b, onPlan: m, onDelete: g, onComment: h, onDelComment: v, onReact: z }) {
  let [p, C] = w(null), [j, c, u] = Ha(), [M, N] = w("전체"), [y, d] = w("all"), S = (r) => Gt(r, n) != null, k = a.filter((r) => M === "전체" || r.cat === M), E = { all: k.length, in: k.filter(S).length, out: k.filter((r) => !S(r)).length }, [s, P] = w(null), A = k.filter((r) => y === "all" || (y === "in" ? S(r) : !S(r))).sort((r, L) => L.likes.length - r.likes.length || L.createdAt - r.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...Ue].map((r) => /* @__PURE__ */ e("button", { className: "jt-chip" + (M === r ? " on" : ""), onClick: () => N(r), children: r }, r)) }),
    /* @__PURE__ */ o("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ o("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ e("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ o("select", { value: y, onChange: (r) => d(r.target.value), children: [
          /* @__PURE__ */ o("option", { value: "all", children: [
            "전체 (",
            E.all,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "in", children: [
            "일정 반영 (",
            E.in,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "out", children: [
            "미반영 (",
            E.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ e(Xt, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ e(Ya, { ids: A.map((r) => r.id), open: j, setAll: u })
    ] }),
    A.length === 0 && /* @__PURE__ */ e("div", { className: "jt-empty", children: a.length === 0 ? /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ e("p", { children: y === "in" ? "일정에 반영된 곳이 없어요." : y === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: A.map((r) => {
      let L = r.likes.includes(i), B = Gt(r, n);
      return /* @__PURE__ */ o("li", { className: "jt-wish" + (j[r.id] ? " open" : ""), children: [
        /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => c(r.id), "aria-expanded": !!j[r.id], children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: Pt[r.cat] || Pt.기타 }, children: r.cat }),
          /* @__PURE__ */ e("strong", { className: "jt-fold-name", children: r.name }),
          B != null && /* @__PURE__ */ o("span", { className: "jt-daybadge", style: { background: V[B % V.length] }, children: [
            B + 1,
            "일차"
          ] }),
          /* @__PURE__ */ e(Xt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        j[r.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ e("div", { className: "jt-fold-tools", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => x(r), children: [
            /* @__PURE__ */ e(Te, { size: 14 }),
            "수정"
          ] }) }),
          r.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
            /* @__PURE__ */ e(Nt, { size: 13 }),
            r.area
          ] }),
          r.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: r.memo }),
          /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t(r), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ e(Et, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Ke(r), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ e(Ct, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => P(s === r.id ? null : r.id),
                "aria-expanded": s === r.id,
                children: [
                  /* @__PURE__ */ e(Tn, { size: 14 }),
                  s === r.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          s === r.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
            /* @__PURE__ */ e(
              "iframe",
              {
                title: `${r.name} 지도`,
                src: vo(r),
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
                className: "jt-like" + (L ? " on" : ""),
                onClick: () => b(r.id),
                "aria-pressed": L,
                "aria-label": "가고 싶어요",
                children: [
                  /* @__PURE__ */ e(Be, { size: 16, fill: L ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  r.likes.length
                ]
              }
            ),
            /* @__PURE__ */ e(He, { item: r, me: i, onReact: (Y) => z(r.id, Y) }),
            B != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: V[B % V.length] }, children: [
              B + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => m(r), children: "일정에 넣기" }),
            /* @__PURE__ */ e(
              Ja,
              {
                count: (r.comments || []).length,
                open: p === r.id,
                onClick: () => C(p === r.id ? null : r.id)
              }
            ),
            /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ e(st, { name: r.by, members: t.members, size: 16 }),
              r.by
            ] }),
            /* @__PURE__ */ e(jt, { onConfirm: () => g(r.id), label: "" })
          ] }),
          p === r.id && /* @__PURE__ */ e(
            Ye,
            {
              comments: r.comments || [],
              me: i,
              members: t.members,
              onAdd: (Y) => h(r.id, Y),
              onDelete: (Y) => v(r.id, Y)
            }
          )
        ] })
      ] }, r.id);
    }) })
  ] });
}
function Ra({ moves: t, rate: a, me: n }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((i, l) => /* @__PURE__ */ o("li", { className: i.from === n || i.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: i.from }),
      /* @__PURE__ */ e(Hn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: i.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: X(i.v) }),
      /* @__PURE__ */ e("em", { children: Zt(i.v, a) })
    ] })
  ] }, l)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function ni({ e: t, members: a, rate: n, onEdit: i }) {
  let { Icon: l, color: x } = Pe(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => i(t), "aria-label": `${t.title} 고치기`, children: [
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
      /* @__PURE__ */ e("strong", { children: X(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: Zt(Number(t.amount) || 0, n) })
    ] })
  ] }) });
}
var $a = (t) => t > 0.5 ? `받을 돈 ${X(t)}` : t < -0.5 ? `보낼 돈 ${X(-t)}` : "주고받을 돈 없음", de = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function oi({ settings: t, spend: a, me: n, onEdit: i }) {
  let { members: l, rate: x, start: b } = t, [m, g] = w("me"), h = a.reduce((c, u) => c + (Number(u.amount) || 0), 0), v = qt(() => Ma(a, l), [a, l]), z = qt(() => {
    let c = {};
    return a.forEach((u) => c[u.cat] = (c[u.cat] || 0) + (Number(u.amount) || 0)), Oa.filter((u) => c[u]).map((u) => ({ c: u, v: c[u] }));
  }, [a]), p = qt(() => {
    let c = {};
    return a.forEach((u) => (c[u.day] = c[u.day] || []).push(u)), Object.keys(c).map(Number).sort((u, M) => u - M).map((u) => ({
      day: u,
      sum: c[u].reduce((M, N) => M + (Number(N.amount) || 0), 0),
      items: [...c[u]].sort((M, N) => N.createdAt - M.createdAt),
      res: Ma(c[u], l)
    }));
  }, [a, l]), C = v.net[n] || 0, j = v.moves.filter((c) => c.from === n || c.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: X(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: ue(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: X(h) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Zt(h, x),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        X(v.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: ue(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: z.map(({ c, v: u }) => /* @__PURE__ */ e("i", { style: { flexGrow: u, background: Pe(c).color } }, c)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: z.map(({ c, v: u }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: Pe(c).color } }),
        c,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(u / h * 100),
          "%"
        ] })
      ] }, c)) })
    ] }),
    v.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        v.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: v.skipped.map((c) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => i(c), children: [
        /* @__PURE__ */ o("span", { children: [
          c.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            c.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: X(Number(c.amount) || 0) })
      ] }) }, c.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([c, u]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": m === c, className: m === c ? "on" : "", onClick: () => g(c), children: u }, c)) }),
    m === "me" && /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (de(C) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(st, { name: n, members: l, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: C > 0.5 ? `${X(C)} 받으면 돼요` : C < -0.5 ? `${X(-C)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        j.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: j.map((c, u) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("span", { children: c.from === n ? /* @__PURE__ */ o(rt, { children: [
            /* @__PURE__ */ e("b", { children: c.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(rt, { children: [
            /* @__PURE__ */ e("b", { children: c.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: X(c.v) }),
            /* @__PURE__ */ e("em", { children: Zt(c.v, x) })
          ] })
        ] }, u)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: X(v.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              X(v.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: C > 0.5 ? "더 결제했으니 받을 돈" : C < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: de(C), children: C > 0.5 ? X(C) : C < -0.5 ? X(-C) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: p.map((c) => {
        let u = mt(b, c.day), M = c.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": V[c.day % V.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            c.day + 1,
            "일차 ",
            Vt(u),
            " (",
            Rt(u),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            X(c.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            X(c.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + de(M), children: $a(M) })
        ] }, c.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    m === "day" && /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      p.map((c) => {
        let u = mt(b, c.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": V[c.day % V.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: c.day + 1 }),
            Vt(u),
            " (",
            Rt(u),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: X(c.sum) })
          ] }),
          /* @__PURE__ */ e(Ra, { moves: c.res.moves, rate: x, me: n }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: c.items.map((M) => /* @__PURE__ */ e(ni, { e: M, members: l, rate: x, onEdit: i }, M.id)) })
        ] }, c.day);
      })
    ] }),
    m === "all" && /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(Ra, { moves: v.moves, rate: x, me: n }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: l.map((c) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e(st, { name: c, members: l, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: c }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            X(v.paid[c]),
            ", 쓴 돈 ",
            X(v.share[c])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + de(v.net[c]), children: $a(v.net[c]) })
      ] }, c)) })
    ] })
  ] });
}
var Fe = "trip:loc:", ii = 3 * 6e4, ri = (t, a) => V[(Math.max(0, t.indexOf(a)) * 2 + 3) % V.length], si = (t) => !!t && t.online && typeof t.lat == "number" && Date.now() - t.at < ii, Qa = (t) => `https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`;
function li({ settings: t, me: a, locs: n, shareOn: i, onToggle: l, myPos: x, geoErr: b }) {
  let [m, g] = w(!1), [, h] = w(0);
  W(() => {
    let k = setInterval(() => h((E) => E + 1), 3e4);
    return () => clearInterval(k);
  }, []);
  let v = t.members, z = v.map((k) => ({ m: k, l: n[k], live: si(n[k]) })), p = z.filter((k) => k.live).map((k) => ({ id: k.m, lat: k.l.lat, lng: k.l.lng, color: ri(v, k.m), label: k.m, text: k.m[0] })), C = p.map((k) => `${k.id}:${k.lat.toFixed(5)}:${k.lng.toFixed(5)}`).join("|"), j = qt(() => p, [C]), [c, u] = w(null), [M, N] = w(() => {
    let k = p[0] || x;
    return k ? { lat: k.lat, lng: k.lng, z: 14 } : { lat: lt.lat, lng: lt.lng, z: 12 };
  }), y = () => {
    if (!p.length) return;
    let k = p.reduce((P, A) => P + A.lat, 0) / p.length, E = p.reduce((P, A) => P + A.lng, 0) / p.length, s = Math.max(...p.map((P) => ge({ lat: k, lng: E }, P)));
    N({ lat: k, lng: E, z: s < 300 ? 16 : s < 1e3 ? 15 : s < 3e3 ? 13 : s < 1e4 ? 12 : 10 }), u(null);
  }, d = q(!1);
  W(() => {
    !d.current && p.length && (d.current = !0, y());
  }, [C]);
  let S = z.filter((k) => k.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ e("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ e("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => g(!0), children: [
          /* @__PURE__ */ e(qn, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: l, children: /* @__PURE__ */ e("i", {}) })
    ] }),
    i && b && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-share-err", children: b }),
    /* @__PURE__ */ e(
      Va,
      {
        gkey: t.gmapsKey,
        view: M,
        setView: N,
        pins: j,
        temp: null,
        selectedId: c,
        onTap: () => u(null),
        onPinTap: (k) => u(k),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ e("b", { children: S }),
        "/",
        v.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: y, disabled: !S, children: [
        /* @__PURE__ */ e(Jn, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-fam-list", children: z.map(({ m: k, l: E, live: s }) => {
      let P = k === a, A = s && x && !P ? ge(x, E) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (s ? " live" : "") + (c === k ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !s,
            onClick: () => {
              u(k), N({ lat: E.lat, lng: E.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ e(st, { name: k, members: v, size: 34 }),
                s && /* @__PURE__ */ e("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  k,
                  P ? " (나)" : ""
                ] }),
                /* @__PURE__ */ e("span", { children: s ? `위치 공유 중, ${Re(E.at)}${A != null ? `, 나와 ${Za(A)}` : ""}` : E && E.at ? `앱 꺼짐, 마지막 접속 ${Re(E.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        s && !P && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Qa(E), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(Ct, { size: 13 }),
          "길 찾기"
        ] })
      ] }, k);
    }) }),
    m && /* @__PURE__ */ o(wt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => g(!1), children: [
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
      /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: () => g(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ e("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var tn = "trip:chat:", De = "trip:read:", _a = (t) => tn + t.at.toString(36).padStart(10, "0") + "-" + t.id, pi = (t) => {
  let a = new Date(t);
  return `${ot(a.getHours())}:${ot(a.getMinutes())}`;
}, ci = (t) => {
  let a = new Date(t);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${Rt(a)})`;
};
function di(t) {
  return t.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ e("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function mi({ settings: t, me: a, msgs: n, reads: i, onSend: l, onDelete: x, onSendLoc: b, badgeAsk: m, onBadgeAsk: g }) {
  let h = t.members, [v, z] = w(""), [p, C] = w(null), [j, c] = w(!1), u = q(null), M = q(!0), N = n.length;
  W(() => {
    let E = n[N - 1], s = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (M.current || s || E && E.by === a) && u.current && u.current.scrollIntoView({ block: "end", behavior: M.current ? "auto" : "smooth" }), M.current = !1;
  }, [N]);
  let y = () => {
    let E = v.trim();
    E && (l(E), z(""));
  }, d = async () => {
    c(!0), await b(), c(!1);
  }, S = "", k = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    N === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ e("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    m && /* @__PURE__ */ o("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ e("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
