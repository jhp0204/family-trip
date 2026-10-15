Me(y)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: j, children: "위치 다시 찾기" })
    ] }),
    h && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: h }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: Pn.map((l) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === l.id ? " on" : ""), onClick: () => r(l), children: l.label }, l.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: Lo.map((l) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": y === l, className: y === l ? "on" : "", onClick: () => x(l), children: Me(l) }, l)) }),
    C && /* @__PURE__ */ a("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !C && s && /* @__PURE__ */ t("div", { className: "jt-empty", children: /* @__PURE__ */ t("p", { children: s }) }),
    !C && E.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-near-list", children: E.map((l) => {
      let R = A(l);
      return /* @__PURE__ */ a("li", { className: "jt-near", children: [
        /* @__PURE__ */ a("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ t("strong", { children: l.name }),
          l.sub && /* @__PURE__ */ t("span", { className: "jt-near-sub", children: l.sub }),
          /* @__PURE__ */ a("div", { className: "jt-near-meta", children: [
            l.rating != null && /* @__PURE__ */ a("span", { className: "jt-star", children: [
              /* @__PURE__ */ t(po, { size: 13, fill: "currentColor" }),
              l.rating.toFixed(1),
              l.count ? /* @__PURE__ */ a("em", { children: [
                "(",
                l.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ t("span", { children: l.type }),
            l.open === !0 && /* @__PURE__ */ t("span", { className: "jt-open", children: "영업 중" }),
            l.open === !1 && /* @__PURE__ */ t("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ t(vt, { size: 12 }),
            Zn(l.dist)
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-near-act", children: [
          R ? /* @__PURE__ */ a("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ t(_n, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                o({
                  name: l.name,
                  cat: i.wish,
                  area: l.addr || l.sub || "",
                  link: l.url || "",
                  memo: l.rating != null ? `구글 평점 ${l.rating.toFixed(1)}${l.count ? ` (${l.count}명)` : ""}` : "",
                  lat: l.lat,
                  lng: l.lng,
                  ...l.placeId ? { placeId: l.placeId } : {}
                }), v({ ...M, [l.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ a("a", { className: "jt-maplink", href: l.url || Mt({ lat: l.lat, lng: l.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Kt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ a("a", { className: "jt-maplink route", href: ge(l), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(vt, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, l.id);
    }) }),
    k && E.length > 0 && /* @__PURE__ */ t("p", { className: "jt-near-src", children: k === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Wo({ settings: e, wish: n, plan: o, me: i, onSave: r, onEdit: y, onLike: x, onPlan: g, onDelete: m, onComment: h, onDelComment: c, onReact: E }) {
  let b = n.filter(dt), [C, N] = w(
    () => b.length ? {
      lat: b.reduce((S, W) => S + W.lat, 0) / b.length,
      lng: b.reduce((S, W) => S + W.lng, 0) / b.length,
      z: b.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [s, p] = w(null), [k, z] = w(null), [M, v] = w(""), [I, j] = w([]), [A, l] = w(!1), [R, u] = w(""), f = n.find((S) => S.id === k), T = b.map((S) => `${S.id}:${S.lat}:${S.lng}:${S.cat}`).join("|"), D = te(
    () => b.map((S) => ({
      id: S.id,
      lat: S.lat,
      lng: S.lng,
      color: Bt[S.cat] || Bt.기타,
      label: S.name
    })),
    [T]
  ), X = async () => {
    let S = M.trim();
    if (S) {
      l(!0), u(""), j([]);
      try {
        let W = await Qn(S, e.gmapsKey, { lat: C.lat, lng: C.lng });
        W.length || u("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), j(W);
      } catch {
        u("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      l(!1);
    }
  }, Y = (S) => {
    N({ lat: S.lat, lng: S.lng, z: 16 }), z(null), p({ lat: S.lat, lng: S.lng, name: S.name, cat: "맛집", area: S.area, link: S.link || "", placeId: S.placeId }), j([]);
  }, _ = f && f.likes.includes(i);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: M,
          onChange: (S) => v(S.target.value),
          onKeyDown: (S) => S.key === "Enter" && X(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: X, disabled: A, children: A ? "검색 중" : "검색" })
    ] }),
    R && /* @__PURE__ */ t("p", { className: "jt-hint jt-mapmsg", children: R }),
    I.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results", children: I.map((S, W) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => Y(S), children: [
      /* @__PURE__ */ t("strong", { children: S.name }),
      /* @__PURE__ */ t("span", { children: S.area })
    ] }) }, W)) }),
    /* @__PURE__ */ t(
      Vn,
      {
        gkey: e.gmapsKey,
        onPoi: (S) => {
          z(null), p({ ...S, cat: "맛집" });
        },
        view: C,
        setView: N,
        pins: D,
        temp: s,
        selectedId: k,
        onTap: (S, W) => {
          z(null), p({ lat: Number(S.toFixed(6)), lng: Number(W.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (S) => {
          p(null), z(S);
        }
      }
    ),
    !s && !f && /* @__PURE__ */ a("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      b.length,
      "개예요."
    ] }),
    s && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ t("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ t(
        "input",
        {
          value: s.name,
          onChange: (S) => p({ ...s, name: S.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Le.map((S) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-chip" + (s.cat === S ? " on" : ""),
          onClick: () => p({ ...s, cat: S }),
          children: S
        },
        S
      )) }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
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
    f && /* @__PURE__ */ a("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ a("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Bt[f.cat] || Bt.기타 }, children: f.cat }),
        /* @__PURE__ */ t("strong", { children: f.name }),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => y(f), "aria-label": `${f.name} 수정`, children: /* @__PURE__ */ t(fe, { size: 16 }) })
      ] }),
      f.area && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
        /* @__PURE__ */ t(Et, { size: 13 }),
        f.area
      ] }),
      f.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: f.memo }),
      /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ a(
          Ke,
          {
            className: "jt-like" + (_ ? " on" : ""),
            onTap: () => x(f.id),
            names: f.likes,
            members: e.members,
            title: "가고 싶어요",
            "aria-pressed": _,
            "aria-label": `가고 싶어요 ${f.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t(Be, { size: 16, fill: _ ? "currentColor" : "none" }),
              "가고 싶어요 ",
              f.likes.length
            ]
          }
        ),
        /* @__PURE__ */ t(Ue, { item: f, me: i, members: e.members, onReact: (S) => E(f.id, S) }),
        ee(f, o) != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: V[ee(f, o) % V.length] }, children: [
          ee(f, o) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => g(f), children: "일정에 넣기" }),
        /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ t(rt, { name: f.by, members: e.members, size: 16 }),
          f.by
        ] }),
        /* @__PURE__ */ t(
          St,
          {
            onConfirm: () => {
              m(f.id), z(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ a("a", { className: "jt-maplink", href: Mt(f), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Kt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ a("a", { className: "jt-maplink route", href: ge(f), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(vt, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ t(
        We,
        {
          comments: f.comments || [],
          me: i,
          members: e.members,
          onAdd: (S) => h(f.id, S),
          onDelete: (S) => c(f.id, S)
        }
      )
    ] })
  ] });
}
function Ho(e) {
  let [n, o] = w("list");
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([i, r]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": n === i, className: n === i ? "on" : "", onClick: () => o(i), children: r }, i)) }),
    n === "list" && /* @__PURE__ */ t(Yo, { ...e }),
    n === "map" && /* @__PURE__ */ t(Wo, { ...e }),
    n === "near" && /* @__PURE__ */ t(Uo, { ...e })
  ] });
}
function Yo({ settings: e, wish: n, plan: o, me: i, onEdit: r, onLike: y, onPlan: x, onDelete: g, onComment: m, onDelComment: h, onReact: c }) {
  let [E, b] = w(null), [C, N, s] = Hn(), [p, k] = w("전체"), [z, M] = w("all"), v = (u) => ee(u, o) != null, I = n.filter((u) => p === "전체" || u.cat === p), j = { all: I.length, in: I.filter(v).length, out: I.filter((u) => !v(u)).length }, [A, l] = w(null), R = I.filter((u) => z === "all" || (z === "in" ? v(u) : !v(u))).sort((u, f) => f.likes.length - u.likes.length || f.createdAt - u.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: ["전체", ...Le].map((u) => /* @__PURE__ */ t("button", { className: "jt-chip" + (p === u ? " on" : ""), onClick: () => k(u), children: u }, u)) }),
    /* @__PURE__ */ a("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ a("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ a("select", { value: z, onChange: (u) => M(u.target.value), children: [
          /* @__PURE__ */ a("option", { value: "all", children: [
            "전체 (",
            j.all,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "in", children: [
            "일정 반영 (",
            j.in,
            ")"
          ] }),
          /* @__PURE__ */ a("option", { value: "out", children: [
            "미반영 (",
            j.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ t(Lt, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ t(Yn, { ids: R.map((u) => u.id), open: C, setAll: s })
    ] }),
    R.length === 0 && /* @__PURE__ */ t("div", { className: "jt-empty", children: n.length === 0 ? /* @__PURE__ */ a(pt, { children: [
      /* @__PURE__ */ t("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ t("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ t("p", { children: z === "in" ? "일정에 반영된 곳이 없어요." : z === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    /* @__PURE__ */ t("ul", { className: "jt-list", children: R.map((u) => {
      let f = u.likes.includes(i), T = ee(u, o);
      return /* @__PURE__ */ a("li", { className: "jt-wish" + (C[u.id] ? " open" : ""), children: [
        /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => N(u.id), "aria-expanded": !!C[u.id], children: [
          /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Bt[u.cat] || Bt.기타 }, children: u.cat }),
          /* @__PURE__ */ t("strong", { className: "jt-fold-name", children: u.name }),
          T != null && /* @__PURE__ */ a("span", { className: "jt-daybadge", style: { background: V[T % V.length] }, children: [
            T + 1,
            "일차"
          ] }),
          /* @__PURE__ */ t(Lt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        C[u.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ t("div", { className: "jt-fold-tools", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => r(u), children: [
            /* @__PURE__ */ t(fe, { size: 14 }),
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
            /* @__PURE__ */ a("a", { className: "jt-maplink route", href: ge(u), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(vt, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => l(A === u.id ? null : u.id),
                "aria-expanded": A === u.id,
                children: [
                  /* @__PURE__ */ t(Ta, { size: 14 }),
                  A === u.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          A === u.id && /* @__PURE__ */ a("div", { className: "jt-embed", children: [
            /* @__PURE__ */ t(
              "iframe",
              {
                title: `${u.name} 지도`,
                src: xo(u),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ t("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ a(
              Ke,
              {
                className: "jt-like" + (f ? " on" : ""),
                onTap: () => y(u.id),
                names: u.likes,
                members: e.members,
                title: "가고 싶어요",
                "aria-pressed": f,
                "aria-label": `가고 싶어요 ${u.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ t(Be, { size: 16, fill: f ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  u.likes.length
                ]
              }
            ),
            /* @__PURE__ */ t(Ue, { item: u, me: i, members: e.members, onReact: (D) => c(u.id, D) }),
            T != null ? /* @__PURE__ */ a("span", { className: "jt-planned", style: { color: V[T % V.length] }, children: [
              T + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ t("button", { className: "jt-secondary sm", onClick: () => x(u), children: "일정에 넣기" }),
            /* @__PURE__ */ t(
              Jn,
              {
                count: (u.comments || []).length,
                open: E === u.id,
                onClick: () => b(E === u.id ? null : u.id)
              }
            ),
            /* @__PURE__ */ a("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ t(rt, { name: u.by, members: e.members, size: 16 }),
              u.by
            ] }),
            /* @__PURE__ */ t(St, { onConfirm: () => g(u.id), label: "" })
          ] }),
          E === u.id && /* @__PURE__ */ t(
            We,
            {
              comments: u.comments || [],
              me: i,
              members: e.members,
              onAdd: (D) => m(u.id, D),
              onDelete: (D) => h(u.id, D)
            }
          )
        ] })
      ] }, u.id);
    }) })
  ] });
}
function $n({ moves: e, rate: n, me: o }) {
  return e.length ? /* @__PURE__ */ t("ul", { className: "jt-moves2", children: e.map((i, r) => /* @__PURE__ */ a("li", { className: i.from === o || i.to === o ? "mine" : "", children: [
    /* @__PURE__ */ a("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ t("b", { children: i.from }),
      /* @__PURE__ */ t(La, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ t("b", { children: i.to })
    ] }),
    /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ t("strong", { children: G(i.v) }),
      /* @__PURE__ */ t("em", { children: ae(i.v, n) })
    ] })
  ] }, r)) }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Jo({ e, members: n, rate: o, onEdit: i }) {
  let { Icon: r, color: y } = De(e.cat);
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", className: "jt-spend", onClick: () => i(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ t("span", { className: "jt-spend-icon", style: { "--cc": y }, children: /* @__PURE__ */ t(r, { size: 18 }) }),
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
      /* @__PURE__ */ t("strong", { children: G(Number(e.amount) || 0) }),
      /* @__PURE__ */ t("span", { children: ae(Number(e.amount) || 0, o) })
    ] })
  ] }) });
}
var Rn = (e) => e > 0.5 ? `받을 돈 ${G(e)}` : e < -0.5 ? `보낼 돈 ${G(-e)}` : "주고받을 돈 없음", pe = (e) => e > 0.5 ? "plus" : e < -0.5 ? "minus" : "";
function Xo({ settings: e, spend: n, me: o, onEdit: i }) {
  let { members: r, rate: y, start: x } = e, [g, m] = w("me"), h = n.reduce((s, p) => s + (Number(p.amount) || 0), 0), c = te(() => An(n, r), [n, r]), E = te(() => {
    let s = {};
    return n.forEach((p) => s[p.cat] = (s[p.cat] || 0) + (Number(p.amount) || 0)), On.filter((p) => s[p]).map((p) => ({ c: p, v: s[p] }));
  }, [n]), b = te(() => {
    let s = {};
    return n.forEach((p) => (s[p.day] = s[p.day] || []).push(p)), Object.keys(s).map(Number).sort((p, k) => p - k).map((p) => ({
      day: p,
      sum: s[p].reduce((k, z) => k + (Number(z.amount) || 0), 0),
      items: [...s[p]].sort((k, z) => z.createdAt - k.createdAt),
      res: An(s[p], r)
    }));
  }, [n, r]), C = c.net[o] || 0, N = c.moves.filter((s) => s.from === o || s.to === o);
  return n.length === 0 ? /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: G(0) }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: me(e) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ t("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: G(h) }),
      /* @__PURE__ */ a("em", { children: [
        "약 ",
        ae(h, y),
        ", 그중 ",
        o,
        "가 쓴 돈 ",
        G(c.share[o] || 0)
      ] }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: me(e) }),
      /* @__PURE__ */ t("div", { className: "jt-catbar", "aria-hidden": "true", children: E.map(({ c: s, v: p }) => /* @__PURE__ */ t("i", { style: { flexGrow: p, background: De(s).color } }, s)) }),
      /* @__PURE__ */ t("ul", { className: "jt-catlegend", children: E.map(({ c: s, v: p }) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("span", { className: "jt-dot", style: { background: De(s).color } }),
        s,
        " ",
        /* @__PURE__ */ a("b", { children: [
          Math.round(p / h * 100),
          "%"
        ] })
      ] }, s)) })
    ] }),
    c.skipped.length > 0 && /* @__PURE__ */ a("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ a("strong", { children: [
        "정산에서 빠진 경비가 ",
        c.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ t("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ t("ul", { children: c.skipped.map((s) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => i(s), children: [
        /* @__PURE__ */ a("span", { children: [
          s.title,
          " ",
          /* @__PURE__ */ a("em", { children: [
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
    ].map(([s, p]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": g === s, className: g === s ? "on" : "", onClick: () => m(s), children: p }, s)) }),
    g === "me" && /* @__PURE__ */ a(pt, { children: [
      /* @__PURE__ */ a("div", { className: "jt-mybal " + (pe(C) || "even"), children: [
        /* @__PURE__ */ a("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ t(rt, { name: o, members: r, size: 32 }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a("span", { children: [
              "여행 전체 기준, ",
              o,
              "는"
            ] }),
            /* @__PURE__ */ t("strong", { children: C > 0.5 ? `${G(C)} 받으면 돼요` : C < -0.5 ? `${G(-C)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        N.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-moves", children: N.map((s, p) => /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ t("span", { children: s.from === o ? /* @__PURE__ */ a(pt, { children: [
            /* @__PURE__ */ t("b", { children: s.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ a(pt, { children: [
            /* @__PURE__ */ t("b", { children: s.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ t("strong", { children: G(s.v) }),
            /* @__PURE__ */ t("em", { children: ae(s.v, y) })
          ] })
        ] }, p)) }),
        /* @__PURE__ */ a("div", { className: "jt-calc", children: [
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ t("b", { children: G(c.paid[o] || 0) })
          ] }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ a("b", { children: [
              "− ",
              G(c.share[o] || 0)
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "sum", children: [
            /* @__PURE__ */ t("span", { children: C > 0.5 ? "더 결제했으니 받을 돈" : C < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ t("b", { className: pe(C), children: C > 0.5 ? G(C) : C < -0.5 ? G(-C) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ t("ul", { className: "jt-daynet", children: b.map((s) => {
        let p = ft(x, s.day), k = s.res.net[o] || 0;
        return /* @__PURE__ */ a("li", { style: { "--lc": V[s.day % V.length] }, children: [
          /* @__PURE__ */ t("span", { className: "jt-pip" }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-label", children: [
            s.day + 1,
            "일차 ",
            ne(p),
            " (",
            At(p),
            ")"
          ] }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            G(s.res.paid[o] || 0),
            ", 내가 쓴 돈 ",
            G(s.res.share[o] || 0)
          ] }),
          /* @__PURE__ */ t("b", { className: "jt-net " + pe(k), children: Rn(k) })
        ] }, s.day);
      }) }),
      /* @__PURE__ */ t("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    g === "day" && /* @__PURE__ */ a(pt, { children: [
      /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      b.map((s) => {
        let p = ft(x, s.day);
        return /* @__PURE__ */ a("div", { className: "jt-daycard", style: { "--lc": V[s.day % V.length] }, children: [
          /* @__PURE__ */ a("h4", { children: [
            /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
              s.day + 1,
              "일차"
            ] }),
            ne(p),
            " (",
            At(p),
            ")",
            /* @__PURE__ */ t("span", { className: "jt-group-sum", children: G(s.sum) })
          ] }),
          /* @__PURE__ */ t($n, { moves: s.res.moves, rate: y, me: o }),
          /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: s.items.map((k) => /* @__PURE__ */ t(Jo, { e: k, members: r, rate: y, onEdit: i }, k.id)) })
        ] }, s.day);
      })
    ] }),
    g === "all" && /* @__PURE__ */ a(pt, { children: [
      /* @__PURE__ */ a("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ t("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ t($n, { moves: c.moves, rate: y, me: o }),
        /* @__PURE__ */ t("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ t("ul", { className: "jt-people card", children: r.map((s) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t(rt, { name: s, members: r, size: 28 }),
        /* @__PURE__ */ a("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ t("strong", { children: s }),
          /* @__PURE__ */ a("span", { children: [
            "결제 ",
            G(c.paid[s]),
            ", 쓴 돈 ",
            G(c.share[s])
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "jt-net " + pe(c.net[s]), children: Rn(c.net[s]) })
      ] }, s)) })
    ] })
  ] });
}
var Se = "trip:loc:", qo = 3 * 6e4, Go = (e, n) => V[(Math.max(0, e.indexOf(n)) * 2 + 3) % V.length], Vo = (e) => !!e && e.online && typeof e.lat == "number" && Date.now() - e.at < qo, ta = (e) => `https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`;
function Zo({ settings: e, me: n, locs: o, shareOn: i, onToggle: r, myPos: y, geoErr: x }) {
  let [g, m] = w(!1), [, h] = w(0);
  O(() => {
    let j = setInterval(() => h((A) => A + 1), 3e4);
    return () => clearInterval(j);
  }, []);
  let c = e.members, E = c.map((j) => ({ m: j, l: o[j], live: Vo(o[j]) })), b = E.filter((j) => j.live).map((j) => ({ id: j.m, lat: j.l.lat, lng: j.l.lng, color: Go(c, j.m), label: j.m, text: j.m[0] })), C = b.map((j) => `${j.id}:${j.lat.toFixed(5)}:${j.lng.toFixed(5)}`).join("|"), N = te(() => b, [C]), [s, p] = w(null), [k, z] = w(() => {
    let j = b[0] || y;
    return j ? { lat: j.lat, lng: j.lng, z: 14 } : { lat: mt.lat, lng: mt.lng, z: 12 };
  }), M = () => {
    if (!b.length) return;
    let j = b.reduce((R, u) => R + u.lat, 0) / b.length, A = b.reduce((R, u) => R + u.lng, 0) / b.length, l = Math.max(...b.map((R) => ue({ lat: j, lng: A }, R)));
    z({ lat: j, lng: A, z: l < 300 ? 16 : l < 1e3 ? 15 : l < 3e3 ? 13 : l < 1e4 ? 12 : 10 }), p(null);
  }, v = H(!1);
  O(() => {
    !v.current && b.length && (v.current = !0, M());
  }, [C]);
  let I = E.filter((j) => j.live).length;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ a("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ t("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ t("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ a("button", { type: "button", className: "jt-helpbtn", onClick: () => m(!0), children: [
          /* @__PURE__ */ t(Ua, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: r, children: /* @__PURE__ */ t("i", {}) })
    ] }),
    i && x && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-share-err", children: x }),
    /* @__PURE__ */ t(
      Vn,
      {
        gkey: e.gmapsKey,
        view: k,
        setView: z,
        pins: N,
        temp: null,
        selectedId: s,
        onTap: () => p(null),
        onPinTap: (j) => p(j),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ a("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ a("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ t("b", { children: I }),
        "/",
        c.length,
        "명"
      ] }),
      /* @__PURE__ */ a("button", { type: "button", className: "jt-secondary sm", onClick: M, disabled: !I, children: [
        /* @__PURE__ */ t(Ka, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "jt-fam-list", children: E.map(({ m: j, l: A, live: l }) => {
      let R = j === n, u = l && y && !R ? ue(y, A) : null;
      return /* @__PURE__ */ a("li", { className: "jt-fam" + (l ? " live" : "") + (s === j ? " sel" : ""), children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !l,
            onClick: () => {
              p(j), z({ lat: A.lat, lng: A.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ a("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ t(rt, { name: j, members: c, size: 34 }),
                l && /* @__PURE__ */ t("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ a("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ a("strong", { children: [
                  j,
                  R ? " (나)" : ""
                ] }),
                /* @__PURE__ */ t("span", { children: l ? `위치 공유 중, ${Pe(A.at)}${u != null ? `, 나와 ${Zn(u)}` : ""}` : A && A.at ? `앱 꺼짐, 마지막 접속 ${Pe(A.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        l && !R && /* @__PURE__ */ a("a", { className: "jt-maplink", href: ta(A), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(vt, { size: 13 }),
          "길 찾기"
        ] })
      ] }, j);
    }) }),
    g && /* @__PURE__ */ a(Tt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => m(!1), children: [
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
      /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: () => m(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ t("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var ea = "trip:chat:", Ie = "trip:read:", Fe = (e) => ea + e.at.toString(36).padStart(10, "0") + "-" + e.id, Qo = (e) => {
  let n = new Date(e);
  return `${nt(n.getHours())}:${nt(n.getMinutes())}`;
}, ti = (e) => {
  let n = new Date(e);
  return `${n.getMonth() + 1}월 ${n.getDate()}일 (${At(n)})`;
};
function Tn(e) {
  return e.split(/(https?:\/\/[^\s]+)/g).map(
    (n, o) => o % 2 ? /* @__PURE__ */ t("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, o) : n
  );
}
function ei({ settings: e, me: n, msgs: o, reads: i, notice: r, onSend: y, onDelete: x, onEdit: g, onPin: m, onUnpin: h, onSendLoc: c, badgeAsk: E, onBadgeAsk: b }) {
  let C = e.members, [N, s] = w(""), [p, k] = w(null), [z, M] = w(!1), [v, I] = w(null), [j, A] = w(""), [l, R] = w(!1), [u, f] = w(null), T = r ? o.find(($) => $.id === r.id) : null, D = r ? { ...r, ...T ? { text: T.text, kind: T.kind, lat: T.lat, lng: T.lng } : {} } : null, X = ($) => {
    let Q = document.getElementById("msg-" + $);
    Q && (Q.scrollIntoView({ block: "center", behavior: "smooth" }), f($), setTimeout(() => f(null), 1600));
  }, Y = ($) => {
    I($.id), A($.text), k(null);
  }, _ = ($) => {
    let Q = j.trim();
    Q && (Q !== $.text && g($, Q), I(null));
  }, S = H(null), W = H(!0), Ft = o.length;
  O(() => {
    let $ = o[Ft - 1], Q = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (W.current || Q || $ && $.by === n) && S.current && S.current.scrollIntoView({ block: "end", behavior: W.current ? "auto" : "smooth" }), W.current = !1;
  }, [Ft]);
  let Wt = () => {
    let $ = N.trim();
    $ && (y($), s(""));
  }, be = async () => {
    M(!0), await c(), M(!1);
  }, yt = "", Dt = null;
  return /* @__PURE__ */ a("section", { className: "jt-chat", children: [
    Ft === 0 && /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ t("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    D && /* @__PURE__ */ a("div", { className: "jt-notice" + (l ? " open" : ""), children: [
      /* @__PURE__ */ a("button", { type: "button", className: "jt-notice-head", onClick: () => R(!l), "aria-expanded": l, children: [
        /* @__PURE__ */ t(Ha, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-text", children: D.kind === "loc" ? `${D.by}의 위치` : D.text }),
        /* @__PURE__ */ t(Lt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      l && /* @__PURE__ */ a("div", { className: "jt-notice-body", children: [
        D.kind === "loc" ? /* @__PURE__ */ a("p", { children: [
          D.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ t("a", { href: Mt({ lat: D.lat, lng: D.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ t("p", { className: "jt-msg-text", children: Tn(D.text) }),
        /* @__PURE__ */ a("span", { className: "jt-notice-meta", children: [
          D.by,
          "의 메시지, ",
          D.pinnedBy,
          "이(가) 공지로 등록",
          T ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-notice-act", children: [
          T && /* @__PURE__ */ t("button", { type: "button", className: "jt-like", onClick: () => X(D.id), children: "메시지로 이동" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                h(), R(!1);
              },
              children: [
                /* @__PURE__ */ t(wn, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    E && /* @__PURE__ */ a("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ t("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: b, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: o.map(($) => {
      let Q = ti($.at), gt = Q !== yt, ot = $.by === n, wt = !gt && Dt && Dt.by === $.by && $.at - Dt.at < 5 * 6e4;
      return yt = Q, Dt = $, /* @__PURE__ */ a(Sa.Fragment, { children: [
        gt && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": Q, children: /* @__PURE__ */ t("span", { children: Q }) }),
        /* @__PURE__ */ a(
          "li",
          {
            id: "msg-" + $.id,
            className: "jt-msg" + (ot ? " mine" : "") + (wt ? " cont" : "") + (u === $.id ? " flash" : ""),
