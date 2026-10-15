})(), () => {
      p = !1;
    };
  }, [f, i, h, e.gmapsKey]);
  let M = (p) => r[p.id] || n.some(($) => p.placeId && $.placeId === p.placeId || $.name === p.name && ut($) && Math.abs($.lat - p.lat) < 5e-4);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ t(jo, { size: 15 }),
        f ? f.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        $e(h)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: k, children: "위치 다시 찾기" })
    ] }),
    j && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: j }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: Kn.map((p) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === p.id ? " on" : ""), onClick: () => s(p), children: p.label }, p.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: qo.map((p) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": h === p, className: h === p ? "on" : "", onClick: () => g(p), children: $e(p) }, p)) }),
    A && /* @__PURE__ */ a("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !A && E && /* @__PURE__ */ t("div", { className: "jt-empty", children: /* @__PURE__ */ t("p", { children: E }) }),
    !A && z.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-near-list", children: z.map((p) => {
      let $ = M(p);
      return /* @__PURE__ */ a("li", { className: "jt-near", children: [
        /* @__PURE__ */ a("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ t("strong", { children: p.name }),
          p.sub && /* @__PURE__ */ t("span", { className: "jt-near-sub", children: p.sub }),
          /* @__PURE__ */ a("div", { className: "jt-near-meta", children: [
            p.rating != null && /* @__PURE__ */ a("span", { className: "jt-star", children: [
              /* @__PURE__ */ t(vo, { size: 13, fill: "currentColor" }),
              p.rating.toFixed(1),
              p.count ? /* @__PURE__ */ a("em", { children: [
                "(",
                p.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ t("span", { children: p.type }),
            p.open === !0 && /* @__PURE__ */ t("span", { className: "jt-open", children: "영업 중" }),
            p.open === !1 && /* @__PURE__ */ t("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ t(vt, { size: 12 }),
            sa(p.dist)
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-near-act", children: [
          $ ? /* @__PURE__ */ a("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ t(Yn, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ t(
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
                }), l({ ...r, [p.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ a("a", { className: "jt-maplink", href: p.url || Mt({ lat: p.lat, lng: p.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Kt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ a("a", { className: "jt-maplink route", href: xe(p), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(vt, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, p.id);
    }) }),
    y && z.length > 0 && /* @__PURE__ */ t("p", { className: "jt-near-src", children: y === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function ti({ settings: e, wish: n, plan: o, me: i, onSave: s, onEdit: h, onLike: g, onPlan: f, onDelete: d, onComment: j, onDelComment: b, onReact: z }) {
  let x = n.filter(ut), [A, v] = w(
    () => x.length ? {
      lat: x.reduce((F, W) => F + W.lat, 0) / x.length,
      lng: x.reduce((F, W) => F + W.lng, 0) / x.length,
      z: x.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [E, N] = w(null), [y, C] = w(null), [r, l] = w(""), [S, k] = w([]), [M, p] = w(!1), [$, u] = w(""), c = n.find((F) => F.id === y), D = x.map((F) => `${F.id}:${F.lat}:${F.lng}:${F.cat}`).join("|"), R = te(
    () => x.map((F) => ({
      id: F.id,
      lat: F.lat,
      lng: F.lng,
      color: Bt[F.cat] || Bt.기타,
      label: F.name
    })),
    [D]
  ), V = async () => {
    let F = r.trim();
    if (F) {
      p(!0), u(""), k([]);
      try {
        let W = await ra(F, e.gmapsKey, { lat: A.lat, lng: A.lng });
        W.length || u("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), k(W);
      } catch {
        u("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      p(!1);
    }
  }, J = (F) => {
    v({ lat: F.lat, lng: F.lng, z: 16 }), C(null), N({ lat: F.lat, lng: F.lng, name: F.name, cat: "맛집", area: F.area, link: F.link || "", placeId: F.placeId }), k([]);
  }, _ = c && c.likes.includes(i);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: r,
          onChange: (F) => l(F.target.value),
          onKeyDown: (F) => F.key === "Enter" && V(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: V, disabled: M, children: M ? "검색 중" : "검색" })
    ] }),
    $ && /* @__PURE__ */ t("p", { className: "jt-hint jt-mapmsg", children: $ }),
    S.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results", children: S.map((F, W) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => J(F), children: [
      /* @__PURE__ */ t("strong", { children: F.name }),
      /* @__PURE__ */ t("span", { children: F.area })
    ] }) }, W)) }),
    /* @__PURE__ */ t(
      ia,
      {
        gkey: e.gmapsKey,
        onPoi: (F) => {
          C(null), N({ ...F, cat: "맛집" });
        },
        view: A,
        setView: v,
        pins: R,
        temp: E,
        selectedId: y,
        onTap: (F, W) => {
          C(null), N({ lat: Number(F.toFixed(6)), lng: Number(W.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (F) => {
          N(null), C(F);
        }
      }
    ),
    !E && !c && /* @__PURE__ */ a("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      x.length,
      "개예요."
    ] }),
    E && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ t("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ t(
        "input",
        {
          value: E.name,
          onChange: (F) => N({ ...E, name: F.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Ye.map((F) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-chip" + (E.cat === F ? " on" : ""),
          onClick: () => N({ ...E, cat: F }),
          children: F
        },
        F
      )) }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !E.name.trim(),
            onClick: () => {
              s({
                name: E.name.trim(),
                cat: E.cat,
                area: E.area || "",
                link: E.link || "",
                memo: "",
                lat: E.lat,
                lng: E.lng,
                ...E.placeId ? { placeId: E.placeId } : {}
              }), N(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: () => N(null), children: "취소" })
      ] })
    ] }),
    c && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ a("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Bt[c.cat] || Bt.기타 }, children: c.cat }),
        /* @__PURE__ */ t("strong", { children: c.name }),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => h(c), "aria-label": `${c.name} 수정`, children: /* @__PURE__ */ t(be, { size: 16 }) })
      ] }),
      c.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        /* @__PURE__ */ t(Et, { size: 13 }),
        c.area
      ] }),
      c.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: c.memo }),
      /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ a(
          Ve,
          {
            className: "jt-like" + (_ ? " on" : ""),
            onTap: () => g(c.id),
            names: c.likes,
            members: e.members,
            title: "가고 싶어요",
            "aria-pressed": _,
            "aria-label": `가고 싶어요 ${c.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t(He, { size: 16, fill: _ ? "currentColor" : "none" }),
              "가고 싶어요 ",
              c.likes.length
            ]
          }
        ),
        /* @__PURE__ */ t(Xe, { item: c, me: i, members: e.members, onReact: (F) => z(c.id, F) }),
        ee(c, o) != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: G[ee(c, o) % G.length] }, children: [
          ee(c, o) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => f(c), children: "일정에 넣기" }),
        /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ t(rt, { name: c.by, members: e.members, size: 16 }),
          c.by
        ] }),
        /* @__PURE__ */ t(
          Ft,
          {
            onConfirm: () => {
              d(c.id), C(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ a("a", { className: "jt-maplink", href: Mt(c), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Kt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ a("a", { className: "jt-maplink route", href: xe(c), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(vt, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ t(
        qe,
        {
          comments: c.comments || [],
          me: i,
          members: e.members,
          onAdd: (F) => j(c.id, F),
          onDelete: (F) => b(c.id, F)
        }
      )
    ] })
  ] });
}
function ei(e) {
  let [n, o] = w("list"), i = e.view || n, s = e.setView || o;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([h, g]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": i === h, className: i === h ? "on" : "", onClick: () => s(h), children: g }, h)) }),
    i === "list" && /* @__PURE__ */ t(ni, { ...e }),
    i === "map" && /* @__PURE__ */ t(ti, { ...e }),
    i === "near" && /* @__PURE__ */ t(Qo, { ...e })
  ] });
}
function ni({ settings: e, wish: n, plan: o, me: i, onEdit: s, onLike: h, onPlan: g, onDelete: f, onComment: d, onDelComment: j, onReact: b }) {
  let [z, x] = w(null), [A, v, E] = Qn(), [N, y] = w("전체"), [C, r] = w("all"), l = (u) => ee(u, o) != null, S = n.filter((u) => N === "전체" || u.cat === N), k = { all: S.length, in: S.filter(l).length, out: S.filter((u) => !l(u)).length }, [M, p] = w(null), $ = S.filter((u) => C === "all" || (C === "in" ? l(u) : !l(u))).sort((u, c) => c.likes.length - u.likes.length || c.createdAt - u.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: ["전체", ...Ye].map((u) => /* @__PURE__ */ t("button", { className: "jt-chip" + (N === u ? " on" : ""), onClick: () => y(u), children: u }, u)) }),
    /* @__PURE__ */ a("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ a("select", { value: C, onChange: (u) => r(u.target.value), children: [
          /* @__PURE__ */ a("option", { value: "all", children: [
            "전체 (",
            k.all,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "in", children: [
            "일정 반영 (",
            k.in,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "out", children: [
            "미반영 (",
            k.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ t(At, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ t(ta, { ids: $.map((u) => u.id), open: A, setAll: E })
    ] }),
    $.length === 0 && /* @__PURE__ */ t("div", { className: "jt-empty", children: n.length === 0 ? /* @__PURE__ */ a(dt, { children: [
      /* @__PURE__ */ t("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ t("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ t("p", { children: C === "in" ? "일정에 반영된 곳이 없어요." : C === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    /* @__PURE__ */ t("ul", { className: "jt-list", children: $.map((u) => {
      let c = u.likes.includes(i), D = ee(u, o);
      return /* @__PURE__ */ a("li", { className: "jt-wish" + (A[u.id] ? " open" : ""), children: [
        /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => v(u.id), "aria-expanded": !!A[u.id], children: [
          /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Bt[u.cat] || Bt.기타 }, children: u.cat }),
          /* @__PURE__ */ t("strong", { className: "jt-fold-name", children: u.name }),
          D != null && /* @__PURE__ */ a("span", { className: "jt-daybadge", style: { background: G[D % G.length] }, children: [
            D + 1,
            "일차"
          ] }),
          /* @__PURE__ */ t(At, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        A[u.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ t("div", { className: "jt-fold-tools", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(u), children: [
            /* @__PURE__ */ t(be, { size: 14 }),
            "수정"
          ] }) }),
          u.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
            /* @__PURE__ */ t(Et, { size: 13 }),
            u.area
          ] }),
          u.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: u.memo }),
          /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ a("a", { className: "jt-maplink", href: Mt(u), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Kt, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ a("a", { className: "jt-maplink route", href: xe(u), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(vt, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => p(M === u.id ? null : u.id),
                "aria-expanded": M === u.id,
                children: [
                  /* @__PURE__ */ t(Wa, { size: 14 }),
                  M === u.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          M === u.id && /* @__PURE__ */ a("div", { className: "jt-embed", children: [
            /* @__PURE__ */ t(
              "iframe",
              {
                title: `${u.name} 지도`,
                src: zo(u),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ t("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ a(
              Ve,
              {
                className: "jt-like" + (c ? " on" : ""),
                onTap: () => h(u.id),
                names: u.likes,
                members: e.members,
                title: "가고 싶어요",
                "aria-pressed": c,
                "aria-label": `가고 싶어요 ${u.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ t(He, { size: 16, fill: c ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  u.likes.length
                ]
              }
            ),
            /* @__PURE__ */ t(Xe, { item: u, me: i, members: e.members, onReact: (R) => b(u.id, R) }),
            D != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: G[D % G.length] }, children: [
              D + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ t("button", { className: "jt-secondary sm", onClick: () => g(u), children: "일정에 넣기" }),
            /* @__PURE__ */ t(
              ea,
              {
                count: (u.comments || []).length,
                open: z === u.id,
                onClick: () => x(z === u.id ? null : u.id)
              }
            ),
            /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ t(rt, { name: u.by, members: e.members, size: 16 }),
              u.by
            ] }),
            /* @__PURE__ */ t(Ft, { onConfirm: () => f(u.id), label: "" })
          ] }),
          z === u.id && /* @__PURE__ */ t(
            qe,
            {
              comments: u.comments || [],
              me: i,
              members: e.members,
              onAdd: (R) => d(u.id, R),
              onDelete: (R) => j(u.id, R)
            }
          )
        ] })
      ] }, u.id);
    }) })
  ] });
}
function Un({ moves: e, rate: n, me: o }) {
  return e.length ? /* @__PURE__ */ t("ul", { className: "jt-moves2", children: e.map((i, s) => /* @__PURE__ */ a("li", { className: i.from === o || i.to === o ? "mine" : "", children: [
    /* @__PURE__ */ a("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ t("b", { children: i.from }),
      /* @__PURE__ */ t(Ja, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ t("b", { children: i.to })
    ] }),
    /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ t("strong", { children: q(i.v) }),
      /* @__PURE__ */ t("em", { children: ne(i.v, n) })
    ] })
  ] }, s)) }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function ai({ e, members: n, rate: o, onEdit: i }) {
  let { Icon: s, color: h } = Be(e.cat);
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", className: "jt-spend", onClick: () => i(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ t("span", { className: "jt-spend-icon", style: { "--cc": h }, children: /* @__PURE__ */ t(s, { size: 18 }) }),
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
      /* @__PURE__ */ t("strong", { children: q(Number(e.amount) || 0) }),
      /* @__PURE__ */ t("span", { children: ne(Number(e.amount) || 0, o) })
    ] })
  ] }) });
}
var Wn = (e) => e > 0.5 ? `받을 돈 ${q(e)}` : e < -0.5 ? `보낼 돈 ${q(-e)}` : "주고받을 돈 없음", me = (e) => e > 0.5 ? "plus" : e < -0.5 ? "minus" : "";
function oi({ settings: e, spend: n, me: o, onEdit: i, view: s, setView: h }) {
  let { members: g, rate: f, start: d } = e, [j, b] = w("me"), z = s || j, x = h || b, A = n.reduce((r, l) => r + (Number(l.amount) || 0), 0), v = te(() => Tn(n, g), [n, g]), E = te(() => {
    let r = {};
    return n.forEach((l) => r[l.cat] = (r[l.cat] || 0) + (Number(l.amount) || 0)), Xn.filter((l) => r[l]).map((l) => ({ c: l, v: r[l] }));
  }, [n]), N = te(() => {
    let r = {};
    return n.forEach((l) => (r[l.day] = r[l.day] || []).push(l)), Object.keys(r).map(Number).sort((l, S) => l - S).map((l) => ({
      day: l,
      sum: r[l].reduce((S, k) => S + (Number(k.amount) || 0), 0),
      items: [...r[l]].sort((S, k) => k.createdAt - S.createdAt),
      res: Tn(r[l], g)
    }));
  }, [n, g]), y = v.net[o] || 0, C = v.moves.filter((r) => r.from === o || r.to === o);
  return n.length === 0 ? /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: q(0) }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: fe(e) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ t("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: q(A) }),
      /* @__PURE__ */ a("em", { children: [
        "약 ",
        ne(A, f),
        ", 그중 ",
        o,
        "가 쓴 돈 ",
        q(v.share[o] || 0)
      ] }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: fe(e) }),
      /* @__PURE__ */ t("div", { className: "jt-catbar", "aria-hidden": "true", children: E.map(({ c: r, v: l }) => /* @__PURE__ */ t("i", { style: { flexGrow: l, background: Be(r).color } }, r)) }),
      /* @__PURE__ */ t("ul", { className: "jt-catlegend", children: E.map(({ c: r, v: l }) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("span", { className: "jt-dot", style: { background: Be(r).color } }),
        r,
        " ",
        /* @__PURE__ */ a("b", { children: [
          Math.round(l / A * 100),
          "%"
        ] })
      ] }, r)) })
    ] }),
    v.skipped.length > 0 && /* @__PURE__ */ a("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ a("strong", { children: [
        "정산에서 빠진 경비가 ",
        v.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ t("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ t("ul", { children: v.skipped.map((r) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => i(r), children: [
        /* @__PURE__ */ a("span", { children: [
          r.title,
          " ",
          /* @__PURE__ */ a("em", { children: [
            "(",
            r.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ t("b", { children: q(Number(r.amount) || 0) })
      ] }) }, r.id)) })
    ] }),
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([r, l]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": z === r, className: z === r ? "on" : "", onClick: () => x(r), children: l }, r)) }),
    z === "me" && /* @__PURE__ */ a(dt, { children: [
      /* @__PURE__ */ a("div", { className: "jt-mybal " + (me(y) || "even"), children: [
        /* @__PURE__ */ a("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ t(rt, { name: o, members: g, size: 32 }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a("span", { children: [
              "여행 전체 기준, ",
              o,
              "는"
            ] }),
            /* @__PURE__ */ t("strong", { children: y > 0.5 ? `${q(y)} 받으면 돼요` : y < -0.5 ? `${q(-y)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        C.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-moves", children: C.map((r, l) => /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ t("span", { children: r.from === o ? /* @__PURE__ */ a(dt, { children: [
            /* @__PURE__ */ t("b", { children: r.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ a(dt, { children: [
            /* @__PURE__ */ t("b", { children: r.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ t("strong", { children: q(r.v) }),
            /* @__PURE__ */ t("em", { children: ne(r.v, f) })
          ] })
        ] }, l)) }),
        /* @__PURE__ */ a("div", { className: "jt-calc", children: [
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ t("b", { children: q(v.paid[o] || 0) })
          ] }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ a("b", { children: [
              "− ",
              q(v.share[o] || 0)
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "sum", children: [
            /* @__PURE__ */ t("span", { children: y > 0.5 ? "더 결제했으니 받을 돈" : y < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ t("b", { className: me(y), children: y > 0.5 ? q(y) : y < -0.5 ? q(-y) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ t("ul", { className: "jt-daynet", children: N.map((r) => {
        let l = mt(d, r.day), S = r.res.net[o] || 0;
        return /* @__PURE__ */ a("li", { style: { "--lc": G[r.day % G.length] }, children: [
          /* @__PURE__ */ t("span", { className: "jt-pip" }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-label", children: [
            r.day + 1,
            "일차 ",
            Lt(l),
            " (",
            St(l),
            ")"
          ] }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            q(r.res.paid[o] || 0),
            ", 내가 쓴 돈 ",
            q(r.res.share[o] || 0)
          ] }),
          /* @__PURE__ */ t("b", { className: "jt-net " + me(S), children: Wn(S) })
        ] }, r.day);
      }) }),
      /* @__PURE__ */ t("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    z === "day" && /* @__PURE__ */ a(dt, { children: [
      /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      N.map((r) => {
        let l = mt(d, r.day);
        return /* @__PURE__ */ a("div", { className: "jt-daycard", style: { "--lc": G[r.day % G.length] }, children: [
          /* @__PURE__ */ a("h4", { children: [
            /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
              r.day + 1,
              "일차"
            ] }),
            Lt(l),
            " (",
            St(l),
            ")",
            /* @__PURE__ */ t("span", { className: "jt-group-sum", children: q(r.sum) })
          ] }),
          /* @__PURE__ */ t(Un, { moves: r.res.moves, rate: f, me: o }),
          /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: r.items.map((S) => /* @__PURE__ */ t(ai, { e: S, members: g, rate: f, onEdit: i }, S.id)) })
        ] }, r.day);
      })
    ] }),
    z === "all" && /* @__PURE__ */ a(dt, { children: [
      /* @__PURE__ */ a("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ t("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ t(Un, { moves: v.moves, rate: f, me: o }),
        /* @__PURE__ */ t("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ t("ul", { className: "jt-people card", children: g.map((r) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t(rt, { name: r, members: g, size: 28 }),
        /* @__PURE__ */ a("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ t("strong", { children: r }),
          /* @__PURE__ */ a("span", { children: [
            "결제 ",
            q(v.paid[r]),
            ", 쓴 돈 ",
            q(v.share[r])
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "jt-net " + me(v.net[r]), children: Wn(v.net[r]) })
      ] }, r)) })
    ] })
  ] });
}
var Te = "trip:loc:", ii = 3 * 6e4, si = (e, n) => G[(Math.max(0, e.indexOf(n)) * 2 + 3) % G.length], ri = (e) => !!e && e.online && typeof e.lat == "number" && Date.now() - e.at < ii, la = (e) => `https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`;
function li({ settings: e, me: n, locs: o, shareOn: i, onToggle: s, myPos: h, geoErr: g }) {
  let [f, d] = w(!1), [, j] = w(0);
  K(() => {
    let k = setInterval(() => j((M) => M + 1), 3e4);
    return () => clearInterval(k);
  }, []);
  let b = e.members, z = b.map((k) => ({ m: k, l: o[k], live: ri(o[k]) })), x = z.filter((k) => k.live).map((k) => ({ id: k.m, lat: k.l.lat, lng: k.l.lng, color: si(b, k.m), label: k.m, text: k.m[0] })), A = x.map((k) => `${k.id}:${k.lat.toFixed(5)}:${k.lng.toFixed(5)}`).join("|"), v = te(() => x, [A]), [E, N] = w(null), [y, C] = w(() => {
    let k = x[0] || h;
    return k ? { lat: k.lat, lng: k.lng, z: 14 } : { lat: ft.lat, lng: ft.lng, z: 12 };
  }), r = () => {
    if (!x.length) return;
    let k = x.reduce(($, u) => $ + u.lat, 0) / x.length, M = x.reduce(($, u) => $ + u.lng, 0) / x.length, p = Math.max(...x.map(($) => ge({ lat: k, lng: M }, $)));
    C({ lat: k, lng: M, z: p < 300 ? 16 : p < 1e3 ? 15 : p < 3e3 ? 13 : p < 1e4 ? 12 : 10 }), N(null);
  }, l = Y(!1);
  K(() => {
    !l.current && x.length && (l.current = !0, r());
  }, [A]);
  let S = z.filter((k) => k.live).length;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ a("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ t("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ t("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ a("button", { type: "button", className: "jt-helpbtn", onClick: () => d(!0), children: [
          /* @__PURE__ */ t(qa, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ t("i", {}) })
    ] }),
    i && g && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-share-err", children: g }),
    /* @__PURE__ */ t(
      ia,
      {
        gkey: e.gmapsKey,
        view: y,
        setView: C,
        pins: v,
        temp: null,
        selectedId: E,
        onTap: () => N(null),
        onPinTap: (k) => N(k),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ a("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ a("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ t("b", { children: S }),
        "/",
        b.length,
        "명"
      ] }),
      /* @__PURE__ */ a("button", { type: "button", className: "jt-secondary sm", onClick: r, disabled: !S, children: [
        /* @__PURE__ */ t(Xa, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "jt-fam-list", children: z.map(({ m: k, l: M, live: p }) => {
      let $ = k === n, u = p && h && !$ ? ge(h, M) : null;
      return /* @__PURE__ */ a("li", { className: "jt-fam" + (p ? " live" : "") + (E === k ? " sel" : ""), children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !p,
            onClick: () => {
              N(k), C({ lat: M.lat, lng: M.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ a("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ t(rt, { name: k, members: b, size: 34 }),
                p && /* @__PURE__ */ t("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ a("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ a("strong", { children: [
                  k,
                  $ ? " (나)" : ""
                ] }),
                /* @__PURE__ */ t("span", { children: p ? `위치 공유 중, ${Le(M.at)}${u != null ? `, 나와 ${sa(u)}` : ""}` : M && M.at ? `앱 꺼짐, 마지막 접속 ${Le(M.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        p && !$ && /* @__PURE__ */ a("a", { className: "jt-maplink", href: la(M), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(vt, { size: 13 }),
          "길 찾기"
        ] })
      ] }, k);
    }) }),
    f && /* @__PURE__ */ a(Rt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => d(!1), children: [
      /* @__PURE__ */ a("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ t("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ t("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ t("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ t("b", { children: "공유 설정" }),
          /* @__PURE__ */ t("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: () => d(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ t("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var ca = "trip:chat:", Re = "trip:read:", _e = (e) => ca + e.at.toString(36).padStart(10, "0") + "-" + e.id, ci = (e) => {
  let n = new Date(e);
  return `${et(n.getHours())}:${et(n.getMinutes())}`;
}, pi = (e) => {
  let n = new Date(e);
  return `${n.getMonth() + 1}월 ${n.getDate()}일 (${St(n)})`;
};
function Hn(e) {
  return e.split(/(https?:\/\/[^\s]+)/g).map(
    (n, o) => o % 2 ? /* @__PURE__ */ t("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, o) : n
  );
}
function di({ settings: e, me: n, msgs: o, reads: i, notice: s, onSend: h, onDelete: g, onEdit: f, onPin: d, onUnpin: j, onSendLoc: b, badgeAsk: z, onBadgeAsk: x }) {
  let A = e.members, [v, E] = w(""), [N, y] = w(null), [C, r] = w(!1), [l, S] = w(null), [k, M] = w(""), [p, $] = w(!1), [u, c] = w(null), D = s ? o.find((T) => T.id === s.id) : null, R = s ? { ...s, ...D ? { text: D.text, kind: D.kind, lat: D.lat, lng: D.lng } : {} } : null, V = (T) => {
    let Q = document.getElementById("msg-" + T);
    Q && (Q.scrollIntoView({ block: "center", behavior: "smooth" }), c(T), setTimeout(() => c(null), 1600));
  }, J = (T) => {
    S(T.id), M(T.text), y(null);
  }, _ = (T) => {
    let Q = k.trim();
    Q && (Q !== T.text && f(T, Q), S(null));
  }, F = Y(null), W = Y(!0), Dt = o.length;
  K(() => {
    let T = o[Dt - 1], Q = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (W.current || Q || T && T.by === n) && F.current && F.current.scrollIntoView({ block: "end", behavior: W.current ? "auto" : "smooth" }), W.current = !1;
  }, [Dt]);
  let oe = () => {
    let T = v.trim();
    T && (h(T), E(""));
  }, he = async () => {
    r(!0), await b(), r(!1);
  }, lt = "", yt = null;
  return /* @__PURE__ */ a("section", { className: "jt-chat", children: [
    Dt === 0 && /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ t("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    R && /* @__PURE__ */ a("div", { className: "jt-notice" + (p ? " open" : ""), children: [
      /* @__PURE__ */ a("button", { type: "button", className: "jt-notice-head", onClick: () => $(!p), "aria-expanded": p, children: [
        /* @__PURE__ */ t(Za, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-text", children: R.kind === "loc" ? `${R.by}의 위치` : R.text }),
        /* @__PURE__ */ t(At, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      p && /* @__PURE__ */ a("div", { className: "jt-notice-body", children: [
        R.kind === "loc" ? /* @__PURE__ */ a("p", { children: [
          R.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ t("a", { href: Mt({ lat: R.lat, lng: R.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ t("p", { className: "jt-msg-text", children: Hn(R.text) }),
        /* @__PURE__ */ a("span", { className: "jt-notice-meta", children: [
          R.by,
          "의 메시지, ",
          R.pinnedBy,
          "이(가) 공지로 등록",
          D ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-notice-act", children: [
          D && /* @__PURE__ */ t("button", { type: "button", className: "jt-like", onClick: () => V(R.id), children: "메시지로 이동" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                j(), $(!1);
              },
              children: [
                /* @__PURE__ */ t(Mn, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    z && /* @__PURE__ */ a("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ t("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: x, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: o.map((T) => {
      let Q = pi(T.at), ie = Q !== lt, at = T.by === n, Wt = !ie && yt && yt.by === T.by && T.at - yt.at < 5 * 6e4;
      return lt = Q, yt = T, /* @__PURE__ */ a(Ra.Fragment, { children: [
        ie && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": Q, children: /* @__PURE__ */ t("span", { children: Q }) }),
        /* @__PURE__ */ a(
          "li",
          {
            id: "msg-" + T.id,
            className: "jt-msg" + (at ? " mine" : "") + (Wt ? " cont" : "") + (u === T.id ? " flash" : ""),
            children: [
              !at && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !Wt && /* @__PURE__ */ t(rt, { name: T.by, members: A, size: 30 }) }),
              /* @__PURE__ */ a("div", { className: "jt-msg-col", children: [
                !at && !Wt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: T.by }),
                /* @__PURE__ */ a("div", { className: "jt-msg-row", children: [
