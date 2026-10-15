"주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !z && s && /* @__PURE__ */ t("div", { className: "jt-empty", children: /* @__PURE__ */ t("p", { children: s }) }),
    !z && M.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-near-list", children: M.map((l) => {
      let P = _(l);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ t("strong", { children: l.name }),
          l.sub && /* @__PURE__ */ t("span", { className: "jt-near-sub", children: l.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            l.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ t(co, { size: 13, fill: "currentColor" }),
              l.rating.toFixed(1),
              l.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                l.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ t("span", { children: l.type }),
            l.open === !0 && /* @__PURE__ */ t("span", { className: "jt-open", children: "영업 중" }),
            l.open === !1 && /* @__PURE__ */ t("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ t(vt, { size: 12 }),
            Va(l.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          P ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ t(_a, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: l.name,
                  cat: i.wish,
                  area: l.addr || l.sub || "",
                  link: l.url || "",
                  memo: l.rating != null ? `구글 평점 ${l.rating.toFixed(1)}${l.count ? ` (${l.count}명)` : ""}` : "",
                  lat: l.lat,
                  lng: l.lng,
                  ...l.placeId ? { placeId: l.placeId } : {}
                }), h({ ...k, [l.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: l.url || At({ lat: l.lat, lng: l.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Ut, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: fe(l), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(vt, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, l.id);
    }) }),
    N && M.length > 0 && /* @__PURE__ */ t("p", { className: "jt-near-src", children: N === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Uo({ settings: e, wish: a, plan: n, me: i, onSave: r, onEdit: v, onLike: x, onPlan: b, onDelete: u, onComment: y, onDelComment: c, onReact: M }) {
  let f = a.filter(dt), [z, C] = w(
    () => f.length ? {
      lat: f.reduce((A, W) => A + W.lat, 0) / f.length,
      lng: f.reduce((A, W) => A + W.lng, 0) / f.length,
      z: f.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [s, p] = w(null), [N, E] = w(null), [k, h] = w(""), [S, j] = w([]), [_, l] = w(!1), [P, m] = w(""), g = a.find((A) => A.id === N), R = f.map((A) => `${A.id}:${A.lat}:${A.lng}:${A.cat}`).join("|"), F = te(
    () => f.map((A) => ({
      id: A.id,
      lat: A.lat,
      lng: A.lng,
      color: Bt[A.cat] || Bt.기타,
      label: A.name
    })),
    [R]
  ), X = async () => {
    let A = k.trim();
    if (A) {
      l(!0), m(""), j([]);
      try {
        let W = await Za(A, e.gmapsKey, { lat: z.lat, lng: z.lng });
        W.length || m("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), j(W);
      } catch {
        m("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      l(!1);
    }
  }, H = (A) => {
    C({ lat: A.lat, lng: A.lng, z: 16 }), E(null), p({ lat: A.lat, lng: A.lng, name: A.name, cat: "맛집", area: A.area, link: A.link || "", placeId: A.placeId }), j([]);
  }, T = g && g.likes.includes(i);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: k,
          onChange: (A) => h(A.target.value),
          onKeyDown: (A) => A.key === "Enter" && X(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: X, disabled: _, children: _ ? "검색 중" : "검색" })
    ] }),
    P && /* @__PURE__ */ t("p", { className: "jt-hint jt-mapmsg", children: P }),
    S.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results", children: S.map((A, W) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => H(A), children: [
      /* @__PURE__ */ t("strong", { children: A.name }),
      /* @__PURE__ */ t("span", { children: A.area })
    ] }) }, W)) }),
    /* @__PURE__ */ t(
      Ga,
      {
        gkey: e.gmapsKey,
        onPoi: (A) => {
          E(null), p({ ...A, cat: "맛집" });
        },
        view: z,
        setView: C,
        pins: F,
        temp: s,
        selectedId: N,
        onTap: (A, W) => {
          E(null), p({ lat: Number(A.toFixed(6)), lng: Number(W.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (A) => {
          p(null), E(A);
        }
      }
    ),
    !s && !g && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      f.length,
      "개예요."
    ] }),
    s && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ t("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ t(
        "input",
        {
          value: s.name,
          onChange: (A) => p({ ...s, name: A.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Le.map((A) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-chip" + (s.cat === A ? " on" : ""),
          onClick: () => p({ ...s, cat: A }),
          children: A
        },
        A
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !s.name.trim(),
            onClick: () => {
              r({
                name: s.name.trim(),
                cat: s.cat,
                area: s.area || "",
                link: s.link || "",
                memo: "",
                lat: s.lat,
                lng: s.lng,
                ...s.placeId ? { placeId: s.placeId } : {}
              }), p(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: () => p(null), children: "취소" })
      ] })
    ] }),
    g && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Bt[g.cat] || Bt.기타 }, children: g.cat }),
        /* @__PURE__ */ t("strong", { children: g.name }),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => v(g), "aria-label": `${g.name} 수정`, children: /* @__PURE__ */ t(ge, { size: 16 }) })
      ] }),
      g.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ t(Et, { size: 13 }),
        g.area
      ] }),
      g.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: g.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          Ue,
          {
            className: "jt-like" + (T ? " on" : ""),
            onTap: () => x(g.id),
            names: g.likes,
            members: e.members,
            title: "가고 싶어요",
            "aria-pressed": T,
            "aria-label": `가고 싶어요 ${g.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t(Be, { size: 16, fill: T ? "currentColor" : "none" }),
              "가고 싶어요 ",
              g.likes.length
            ]
          }
        ),
        /* @__PURE__ */ t(Ke, { item: g, me: i, members: e.members, onReact: (A) => M(g.id, A) }),
        ee(g, n) != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: V[ee(g, n) % V.length] }, children: [
          ee(g, n) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => b(g), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ t(rt, { name: g.by, members: e.members, size: 16 }),
          g.by
        ] }),
        /* @__PURE__ */ t(
          St,
          {
            onConfirm: () => {
              u(g.id), E(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ o("a", { className: "jt-maplink", href: At(g), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Ut, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ o("a", { className: "jt-maplink route", href: fe(g), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(vt, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ t(
        We,
        {
          comments: g.comments || [],
          me: i,
          members: e.members,
          onAdd: (A) => y(g.id, A),
          onDelete: (A) => c(g.id, A)
        }
      )
    ] })
  ] });
}
function Ko(e) {
  let [a, n] = w("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([i, r]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": a === i, className: a === i ? "on" : "", onClick: () => n(i), children: r }, i)) }),
    a === "list" && /* @__PURE__ */ t(Wo, { ...e }),
    a === "map" && /* @__PURE__ */ t(Uo, { ...e }),
    a === "near" && /* @__PURE__ */ t(Oo, { ...e })
  ] });
}
function Wo({ settings: e, wish: a, plan: n, me: i, onEdit: r, onLike: v, onPlan: x, onDelete: b, onComment: u, onDelComment: y, onReact: c }) {
  let [M, f] = w(null), [z, C, s] = Wa(), [p, N] = w("전체"), [E, k] = w("all"), h = (m) => ee(m, n) != null, S = a.filter((m) => p === "전체" || m.cat === p), j = { all: S.length, in: S.filter(h).length, out: S.filter((m) => !h(m)).length }, [_, l] = w(null), P = S.filter((m) => E === "all" || (E === "in" ? h(m) : !h(m))).sort((m, g) => g.likes.length - m.likes.length || g.createdAt - m.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: ["전체", ...Le].map((m) => /* @__PURE__ */ t("button", { className: "jt-chip" + (p === m ? " on" : ""), onClick: () => N(m), children: m }, m)) }),
    /* @__PURE__ */ o("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ o("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ o("select", { value: E, onChange: (m) => k(m.target.value), children: [
          /* @__PURE__ */ o("option", { value: "all", children: [
            "전체 (",
            j.all,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "in", children: [
            "일정 반영 (",
            j.in,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "out", children: [
            "미반영 (",
            j.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ t(Lt, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ t(Ha, { ids: P.map((m) => m.id), open: z, setAll: s })
    ] }),
    P.length === 0 && /* @__PURE__ */ t("div", { className: "jt-empty", children: a.length === 0 ? /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ t("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ t("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ t("p", { children: E === "in" ? "일정에 반영된 곳이 없어요." : E === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    /* @__PURE__ */ t("ul", { className: "jt-list", children: P.map((m) => {
      let g = m.likes.includes(i), R = ee(m, n);
      return /* @__PURE__ */ o("li", { className: "jt-wish" + (z[m.id] ? " open" : ""), children: [
        /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => C(m.id), "aria-expanded": !!z[m.id], children: [
          /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Bt[m.cat] || Bt.기타 }, children: m.cat }),
          /* @__PURE__ */ t("strong", { className: "jt-fold-name", children: m.name }),
          R != null && /* @__PURE__ */ o("span", { className: "jt-daybadge", style: { background: V[R % V.length] }, children: [
            R + 1,
            "일차"
          ] }),
          /* @__PURE__ */ t(Lt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        z[m.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ t("div", { className: "jt-fold-tools", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => r(m), children: [
            /* @__PURE__ */ t(ge, { size: 14 }),
            "수정"
          ] }) }),
          m.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
            /* @__PURE__ */ t(Et, { size: 13 }),
            m.area
          ] }),
          m.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: m.memo }),
          /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ o("a", { className: "jt-maplink", href: At(m), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Ut, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ o("a", { className: "jt-maplink route", href: fe(m), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(vt, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => l(_ === m.id ? null : m.id),
                "aria-expanded": _ === m.id,
                children: [
                  /* @__PURE__ */ t(_n, { size: 14 }),
                  _ === m.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          _ === m.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
            /* @__PURE__ */ t(
              "iframe",
              {
                title: `${m.name} 지도`,
                src: bo(m),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ t("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ o(
              Ue,
              {
                className: "jt-like" + (g ? " on" : ""),
                onTap: () => v(m.id),
                names: m.likes,
                members: e.members,
                title: "가고 싶어요",
                "aria-pressed": g,
                "aria-label": `가고 싶어요 ${m.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ t(Be, { size: 16, fill: g ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  m.likes.length
                ]
              }
            ),
            /* @__PURE__ */ t(Ke, { item: m, me: i, members: e.members, onReact: (F) => c(m.id, F) }),
            R != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: V[R % V.length] }, children: [
              R + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ t("button", { className: "jt-secondary sm", onClick: () => x(m), children: "일정에 넣기" }),
            /* @__PURE__ */ t(
              Ya,
              {
                count: (m.comments || []).length,
                open: M === m.id,
                onClick: () => f(M === m.id ? null : m.id)
              }
            ),
            /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ t(rt, { name: m.by, members: e.members, size: 16 }),
              m.by
            ] }),
            /* @__PURE__ */ t(St, { onConfirm: () => b(m.id), label: "" })
          ] }),
          M === m.id && /* @__PURE__ */ t(
            We,
            {
              comments: m.comments || [],
              me: i,
              members: e.members,
              onAdd: (F) => u(m.id, F),
              onDelete: (F) => y(m.id, F)
            }
          )
        ] })
      ] }, m.id);
    }) })
  ] });
}
function $a({ moves: e, rate: a, me: n }) {
  return e.length ? /* @__PURE__ */ t("ul", { className: "jt-moves2", children: e.map((i, r) => /* @__PURE__ */ o("li", { className: i.from === n || i.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ t("b", { children: i.from }),
      /* @__PURE__ */ t(Ln, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ t("b", { children: i.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ t("strong", { children: G(i.v) }),
      /* @__PURE__ */ t("em", { children: ne(i.v, a) })
    ] })
  ] }, r)) }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Ho({ e, members: a, rate: n, onEdit: i }) {
  let { Icon: r, color: v } = De(e.cat);
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => i(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ t("span", { className: "jt-spend-icon", style: { "--cc": v }, children: /* @__PURE__ */ t(r, { size: 18 }) }),
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
      /* @__PURE__ */ t("strong", { children: G(Number(e.amount) || 0) }),
      /* @__PURE__ */ t("span", { children: ne(Number(e.amount) || 0, n) })
    ] })
  ] }) });
}
var Pa = (e) => e > 0.5 ? `받을 돈 ${G(e)}` : e < -0.5 ? `보낼 돈 ${G(-e)}` : "주고받을 돈 없음", pe = (e) => e > 0.5 ? "plus" : e < -0.5 ? "minus" : "";
function Yo({ settings: e, spend: a, me: n, onEdit: i }) {
  let { members: r, rate: v, start: x } = e, [b, u] = w("me"), y = a.reduce((s, p) => s + (Number(p.amount) || 0), 0), c = te(() => Ea(a, r), [a, r]), M = te(() => {
    let s = {};
    return a.forEach((p) => s[p.cat] = (s[p.cat] || 0) + (Number(p.amount) || 0)), La.filter((p) => s[p]).map((p) => ({ c: p, v: s[p] }));
  }, [a]), f = te(() => {
    let s = {};
    return a.forEach((p) => (s[p.day] = s[p.day] || []).push(p)), Object.keys(s).map(Number).sort((p, N) => p - N).map((p) => ({
      day: p,
      sum: s[p].reduce((N, E) => N + (Number(E.amount) || 0), 0),
      items: [...s[p]].sort((N, E) => E.createdAt - N.createdAt),
      res: Ea(s[p], r)
    }));
  }, [a, r]), z = c.net[n] || 0, C = c.moves.filter((s) => s.from === n || s.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: G(0) }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: me(e) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ t("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: G(y) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        ne(y, v),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        G(c.share[n] || 0)
      ] }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: me(e) }),
      /* @__PURE__ */ t("div", { className: "jt-catbar", "aria-hidden": "true", children: M.map(({ c: s, v: p }) => /* @__PURE__ */ t("i", { style: { flexGrow: p, background: De(s).color } }, s)) }),
      /* @__PURE__ */ t("ul", { className: "jt-catlegend", children: M.map(({ c: s, v: p }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("span", { className: "jt-dot", style: { background: De(s).color } }),
        s,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(p / y * 100),
          "%"
        ] })
      ] }, s)) })
    ] }),
    c.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        c.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ t("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ t("ul", { children: c.skipped.map((s) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => i(s), children: [
        /* @__PURE__ */ o("span", { children: [
          s.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            s.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ t("b", { children: G(Number(s.amount) || 0) })
      ] }) }, s.id)) })
    ] }),
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([s, p]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": b === s, className: b === s ? "on" : "", onClick: () => u(s), children: p }, s)) }),
    b === "me" && /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (pe(z) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ t(rt, { name: n, members: r, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ t("strong", { children: z > 0.5 ? `${G(z)} 받으면 돼요` : z < -0.5 ? `${G(-z)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        C.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-moves", children: C.map((s, p) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("span", { children: s.from === n ? /* @__PURE__ */ o(pt, { children: [
            /* @__PURE__ */ t("b", { children: s.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(pt, { children: [
            /* @__PURE__ */ t("b", { children: s.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ t("strong", { children: G(s.v) }),
            /* @__PURE__ */ t("em", { children: ne(s.v, v) })
          ] })
        ] }, p)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ t("b", { children: G(c.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              G(c.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ t("span", { children: z > 0.5 ? "더 결제했으니 받을 돈" : z < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ t("b", { className: pe(z), children: z > 0.5 ? G(z) : z < -0.5 ? G(-z) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ t("ul", { className: "jt-daynet", children: f.map((s) => {
        let p = gt(x, s.day), N = s.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": V[s.day % V.length] }, children: [
          /* @__PURE__ */ t("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            s.day + 1,
            "일차 ",
            ae(p),
            " (",
            Mt(p),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            G(s.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            G(s.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ t("b", { className: "jt-net " + pe(N), children: Pa(N) })
        ] }, s.day);
      }) }),
      /* @__PURE__ */ t("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    b === "day" && /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      f.map((s) => {
        let p = gt(x, s.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": V[s.day % V.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ o("span", { className: "jt-daychip", children: [
              s.day + 1,
              "일차"
            ] }),
            ae(p),
            " (",
            Mt(p),
            ")",
            /* @__PURE__ */ t("span", { className: "jt-group-sum", children: G(s.sum) })
          ] }),
          /* @__PURE__ */ t($a, { moves: s.res.moves, rate: v, me: n }),
          /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: s.items.map((N) => /* @__PURE__ */ t(Ho, { e: N, members: r, rate: v, onEdit: i }, N.id)) })
        ] }, s.day);
      })
    ] }),
    b === "all" && /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ t("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ t($a, { moves: c.moves, rate: v, me: n }),
        /* @__PURE__ */ t("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ t("ul", { className: "jt-people card", children: r.map((s) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(rt, { name: s, members: r, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ t("strong", { children: s }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            G(c.paid[s]),
            ", 쓴 돈 ",
            G(c.share[s])
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "jt-net " + pe(c.net[s]), children: Pa(c.net[s]) })
      ] }, s)) })
    ] })
  ] });
}
var Se = "trip:loc:", Jo = 3 * 6e4, Xo = (e, a) => V[(Math.max(0, e.indexOf(a)) * 2 + 3) % V.length], qo = (e) => !!e && e.online && typeof e.lat == "number" && Date.now() - e.at < Jo, Qa = (e) => `https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`;
function Go({ settings: e, me: a, locs: n, shareOn: i, onToggle: r, myPos: v, geoErr: x }) {
  let [b, u] = w(!1), [, y] = w(0);
  U(() => {
    let j = setInterval(() => y((_) => _ + 1), 3e4);
    return () => clearInterval(j);
  }, []);
  let c = e.members, M = c.map((j) => ({ m: j, l: n[j], live: qo(n[j]) })), f = M.filter((j) => j.live).map((j) => ({ id: j.m, lat: j.l.lat, lng: j.l.lng, color: Xo(c, j.m), label: j.m, text: j.m[0] })), z = f.map((j) => `${j.id}:${j.lat.toFixed(5)}:${j.lng.toFixed(5)}`).join("|"), C = te(() => f, [z]), [s, p] = w(null), [N, E] = w(() => {
    let j = f[0] || v;
    return j ? { lat: j.lat, lng: j.lng, z: 14 } : { lat: mt.lat, lng: mt.lng, z: 12 };
  }), k = () => {
    if (!f.length) return;
    let j = f.reduce((P, m) => P + m.lat, 0) / f.length, _ = f.reduce((P, m) => P + m.lng, 0) / f.length, l = Math.max(...f.map((P) => ue({ lat: j, lng: _ }, P)));
    E({ lat: j, lng: _, z: l < 300 ? 16 : l < 1e3 ? 15 : l < 3e3 ? 13 : l < 1e4 ? 12 : 10 }), p(null);
  }, h = J(!1);
  U(() => {
    !h.current && f.length && (h.current = !0, k());
  }, [z]);
  let S = M.filter((j) => j.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ t("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ t("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => u(!0), children: [
          /* @__PURE__ */ t(Kn, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: r, children: /* @__PURE__ */ t("i", {}) })
    ] }),
    i && x && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-share-err", children: x }),
    /* @__PURE__ */ t(
      Ga,
      {
        gkey: e.gmapsKey,
        view: N,
        setView: E,
        pins: C,
        temp: null,
        selectedId: s,
        onTap: () => p(null),
        onPinTap: (j) => p(j),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ t("b", { children: S }),
        "/",
        c.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: k, disabled: !S, children: [
        /* @__PURE__ */ t(Un, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "jt-fam-list", children: M.map(({ m: j, l: _, live: l }) => {
      let P = j === a, m = l && v && !P ? ue(v, _) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (l ? " live" : "") + (s === j ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !l,
            onClick: () => {
              p(j), E({ lat: _.lat, lng: _.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ t(rt, { name: j, members: c, size: 34 }),
                l && /* @__PURE__ */ t("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  j,
                  P ? " (나)" : ""
                ] }),
                /* @__PURE__ */ t("span", { children: l ? `위치 공유 중, ${$e(_.at)}${m != null ? `, 나와 ${Va(m)}` : ""}` : _ && _.at ? `앱 꺼짐, 마지막 접속 ${$e(_.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        l && !P && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Qa(_), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(vt, { size: 13 }),
          "길 찾기"
        ] })
      ] }, j);
    }) }),
    b && /* @__PURE__ */ o(_t, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => u(!1), children: [
      /* @__PURE__ */ o("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ t("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ t("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ t("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "공유 설정" }),
          /* @__PURE__ */ t("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: () => u(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ t("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var tn = "trip:chat:", Ie = "trip:read:", Fe = (e) => tn + e.at.toString(36).padStart(10, "0") + "-" + e.id, Vo = (e) => {
  let a = new Date(e);
  return `${nt(a.getHours())}:${nt(a.getMinutes())}`;
}, Zo = (e) => {
  let a = new Date(e);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${Mt(a)})`;
};
function Ra(e) {
  return e.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ t("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function Qo({ settings: e, me: a, msgs: n, reads: i, notice: r, onSend: v, onDelete: x, onEdit: b, onPin: u, onUnpin: y, onSendLoc: c, badgeAsk: M, onBadgeAsk: f }) {
  let z = e.members, [C, s] = w(""), [p, N] = w(null), [E, k] = w(!1), [h, S] = w(null), [j, _] = w(""), [l, P] = w(!1), [m, g] = w(null), R = r ? n.find(($) => $.id === r.id) : null, F = r ? { ...r, ...R ? { text: R.text, kind: R.kind, lat: R.lat, lng: R.lng } : {} } : null, X = ($) => {
    let Q = document.getElementById("msg-" + $);
    Q && (Q.scrollIntoView({ block: "center", behavior: "smooth" }), g($), setTimeout(() => g(null), 1600));
  }, H = ($) => {
    S($.id), _($.text), N(null);
  }, T = ($) => {
    let Q = j.trim();
    Q && (Q !== $.text && b($, Q), S(null));
  }, A = J(null), W = J(!0), Ft = n.length;
  U(() => {
    let $ = n[Ft - 1], Q = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (W.current || Q || $ && $.by === a) && A.current && A.current.scrollIntoView({ block: "end", behavior: W.current ? "auto" : "smooth" }), W.current = !1;
  }, [Ft]);
  let Wt = () => {
    let $ = C.trim();
    $ && (v($), s(""));
  }, be = async () => {
    k(!0), await c(), k(!1);
  }, yt = "", Dt = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    Ft === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ t("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    F && /* @__PURE__ */ o("div", { className: "jt-notice" + (l ? " open" : ""), children: [
      /* @__PURE__ */ o("button", { type: "button", className: "jt-notice-head", onClick: () => P(!l), "aria-expanded": l, children: [
        /* @__PURE__ */ t(Hn, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-text", children: F.kind === "loc" ? `${F.by}의 위치` : F.text }),
        /* @__PURE__ */ t(Lt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      l && /* @__PURE__ */ o("div", { className: "jt-notice-body", children: [
        F.kind === "loc" ? /* @__PURE__ */ o("p", { children: [
          F.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ t("a", { href: At({ lat: F.lat, lng: F.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ t("p", { className: "jt-msg-text", children: Ra(F.text) }),
        /* @__PURE__ */ o("span", { className: "jt-notice-meta", children: [
          F.by,
          "의 메시지, ",
          F.pinnedBy,
          "이(가) 공지로 등록",
          R ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-notice-act", children: [
          R && /* @__PURE__ */ t("button", { type: "button", className: "jt-like", onClick: () => X(F.id), children: "메시지로 이동" }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                y(), P(!1);
              },
              children: [
                /* @__PURE__ */ t(ya, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    M && /* @__PURE__ */ o("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ t("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: f, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: n.map(($) => {
      let Q = Zo($.at), ft = Q !== yt, ot = $.by === a, wt = !ft && Dt && Dt.by === $.by && $.at - Dt.at < 5 * 6e4;
      return yt = Q, Dt = $, /* @__PURE__ */ o(Sn.Fragment, { children: [
