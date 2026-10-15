day: i,
      sum: p[i].reduce((c, k) => c + (Number(k.amount) || 0), 0),
      items: [...p[i]].sort((c, k) => k.createdAt - c.createdAt),
      res: Le(p[i], s)
    }));
  }, [a, s]), w = h.net[n] || 0, u = h.moves.filter((p) => p.from === n || p.to === n);
  return a.length === 0 ? /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: H(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Ot(t) })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ r("section", { children: [
    /* @__PURE__ */ r("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: H(j) }),
      /* @__PURE__ */ r("em", { children: [
        "약 ",
        It(j, g),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        H(h.share[n] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Ot(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: v.map(({ c: p, v: i }) => /* @__PURE__ */ e("i", { style: { flexGrow: i, background: re(p).color } }, p)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: v.map(({ c: p, v: i }) => /* @__PURE__ */ r("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: re(p).color } }),
        p,
        " ",
        /* @__PURE__ */ r("b", { children: [
          Math.round(i / j * 100),
          "%"
        ] })
      ] }, p)) })
    ] }),
    h.skipped.length > 0 && /* @__PURE__ */ r("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ r("strong", { children: [
        "정산에서 빠진 경비가 ",
        h.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: h.skipped.map((p) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => o(p), children: [
        /* @__PURE__ */ r("span", { children: [
          p.title,
          " ",
          /* @__PURE__ */ r("em", { children: [
            "(",
            p.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: H(Number(p.amount) || 0) })
      ] }) }, p.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([p, i]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": d === p, className: d === p ? "on" : "", onClick: () => m(p), children: i }, p)) }),
    d === "me" && /* @__PURE__ */ r(pt, { children: [
      /* @__PURE__ */ r("div", { className: "jt-mybal " + (Tt(w) || "even"), children: [
        /* @__PURE__ */ r("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(et, { name: n, members: s, size: 32 }),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ r("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: w > 0.5 ? `${H(w)} 받으면 돼요` : w < -0.5 ? `${H(-w)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        u.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: u.map((p, i) => /* @__PURE__ */ r("li", { children: [
          /* @__PURE__ */ e("span", { children: p.from === n ? /* @__PURE__ */ r(pt, { children: [
            /* @__PURE__ */ e("b", { children: p.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ r(pt, { children: [
            /* @__PURE__ */ e("b", { children: p.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ r("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: H(p.v) }),
            /* @__PURE__ */ e("em", { children: It(p.v, g) })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ r("div", { className: "jt-calc", children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: H(h.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ r("b", { children: [
              "− ",
              H(h.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: w > 0.5 ? "더 결제했으니 받을 돈" : w < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: Tt(w), children: w > 0.5 ? H(w) : w < -0.5 ? H(-w) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: b.map((p) => {
        let i = nt(f, p.day), c = p.res.net[n] || 0;
        return /* @__PURE__ */ r("li", { style: { "--lc": X[p.day % X.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ r("span", { className: "jt-daynet-label", children: [
            p.day + 1,
            "일차 ",
            At(i),
            " (",
            Ft(i),
            ")"
          ] }),
          /* @__PURE__ */ r("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            H(p.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            H(p.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + Tt(c), children: Je(c) })
        ] }, p.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    d === "day" && /* @__PURE__ */ r(pt, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      b.map((p) => {
        let i = nt(f, p.day);
        return /* @__PURE__ */ r("div", { className: "jt-daycard", style: { "--lc": X[p.day % X.length] }, children: [
          /* @__PURE__ */ r("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: p.day + 1 }),
            At(i),
            " (",
            Ft(i),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: H(p.sum) })
          ] }),
          /* @__PURE__ */ e(Ye, { moves: p.res.moves, rate: g, me: n }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: p.items.map((c) => /* @__PURE__ */ e(Xn, { e: c, members: s, rate: g, onEdit: o }, c.id)) })
        ] }, p.day);
      })
    ] }),
    d === "all" && /* @__PURE__ */ r(pt, { children: [
      /* @__PURE__ */ r("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(Ye, { moves: h.moves, rate: g, me: n }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: s.map((p) => /* @__PURE__ */ r("li", { children: [
        /* @__PURE__ */ e(et, { name: p, members: s, size: 28 }),
        /* @__PURE__ */ r("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: p }),
          /* @__PURE__ */ r("span", { children: [
            "결제 ",
            H(h.paid[p]),
            ", 쓴 돈 ",
            H(h.share[p])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + Tt(h.net[p]), children: Je(h.net[p]) })
      ] }, p)) })
    ] })
  ] });
}
function Vn({ post: t, me: a, members: n, onEdit: o, onLike: s, onComment: g, onDelComment: f, onOpenPhoto: d }) {
  let [m, j] = C(!1), h = t.photos || [], v = t.urls || [], b = t.comments || [], w = h.slice(0, 4);
  return /* @__PURE__ */ r("li", { className: "jt-post", children: [
    /* @__PURE__ */ r("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ e(et, { name: t.by, members: n, size: 34 }),
      /* @__PURE__ */ r("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ e("strong", { children: t.by }),
        /* @__PURE__ */ r("span", { children: [
          Ve(t.createdAt),
          t.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      t.by === a && /* @__PURE__ */ e("button", { className: "jt-icon sm", onClick: () => o(t), "aria-label": "내 글 고치기", children: /* @__PURE__ */ e(Ta, { size: 17 }) })
    ] }),
    t.text && /* @__PURE__ */ e(jn, { text: t.text }),
    h.length > 0 && /* @__PURE__ */ e("div", { className: "jt-gallery n" + Math.min(h.length, 4), children: w.map((u, p) => /* @__PURE__ */ r("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ e(ue, { id: u, onClick: () => d(h, p) }),
      p === 3 && h.length > 4 && /* @__PURE__ */ r("span", { className: "jt-more", children: [
        "+",
        h.length - 4
      ] })
    ] }, u)) }),
    v.length > 0 && /* @__PURE__ */ e("div", { className: "jt-links", children: v.map((u) => /* @__PURE__ */ e(aa, { url: u }, u)) }),
    /* @__PURE__ */ r("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ e(Kt, { item: t, me: a, boardLikes: !0, onReact: (u) => s(t.id, u) }),
      /* @__PURE__ */ e(ge, { count: b.length, open: m, onClick: () => j(!m) })
    ] }),
    m && /* @__PURE__ */ e(
      Wt,
      {
        comments: b,
        me: a,
        members: n,
        onAdd: (u) => g(t.id, u),
        onDelete: (u) => f(t.id, u)
      }
    )
  ] });
}
function Qn({ settings: t, board: a, me: n, ...o }) {
  let [s, g] = C(null), f = [...a].sort((d, m) => m.createdAt - d.createdAt);
  return /* @__PURE__ */ r("section", { children: [
    f.length === 0 ? /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ e("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ e("ul", { className: "jt-posts", children: f.map((d) => /* @__PURE__ */ e(
      Vn,
      {
        post: d,
        me: n,
        members: t.members,
        onOpenPhoto: (m, j) => g({ photos: m, index: j }),
        ...o
      },
      d.id
    )) }),
    s && /* @__PURE__ */ e(xn, { photos: s.photos, index: s.index, onClose: () => g(null) })
  ] });
}
function fe() {
  let [t, a] = C(!1), [n, o] = C(null), [s, g] = C([]), [f, d] = C([]), [m, j] = C([]), [h, v] = C([]), [b, w] = C(null), [u, p] = C("plan"), [i, c] = C(0), [k, x] = C(!1), [l, M] = C(null), [I, O] = C(""), z = J(!1), [S, D] = C(null);
  Y(() => {
    let E = !0, P = async () => {
      let $ = await hn();
      if (E)
        if ($) {
          let _ = { ...$, at: Date.now() };
          D(_), _t(B.fx, _);
        } else {
          let _ = await st(B.fx, null);
          E && _ && _.rate > 0 && D({ ..._, cached: !0 });
        }
    };
    P();
    let F = setInterval(P, 3 * 36e5);
    return () => {
      E = !1, clearInterval(F);
    };
  }, []);
  let N = Sa(async () => {
    let [E, P, F, $, _] = await Promise.all([
      st(B.settings, null),
      st(B.plan, []),
      st(B.wish, []),
      st(B.spend, []),
      st(B.board, [])
    ]);
    o(E), g(P), d(F), j($), v(_), a(!0);
  }, []);
  Y(() => {
    (async () => {
      try {
        let F = await window.storage.get("me", !1);
        F && F.value && w(F.value);
      } catch {
      }
      await N();
    })();
    let E = window.storage.onChange ? window.storage.onChange(N) : null, P = setInterval(N, E ? 6e4 : 1e4);
    return () => {
      clearInterval(P), E && E();
    };
  }, [N]), Y(() => {
    if (!n || z.current) return;
    z.current = !0;
    let E = Math.round((dt(at(/* @__PURE__ */ new Date())) - dt(n.start)) / 864e5);
    E >= 0 && E < n.days && c(E);
  }, [n]);
  let A = async (E, P, F, $) => {
    let _ = await st(E, P), U = $(_);
    F(U);
    let R = await _t(E, U);
    return R || O("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), R;
  }, T = async (E) => {
    w(E);
    try {
      await window.storage.set("me", E, !1);
    } catch {
    }
  }, q = async (E) => {
    o(E), x(!1), await _t(B.settings, E) || O("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), b && !E.members.includes(b) && w(null);
  }, y = () => M(null), L = (E, P) => ({
    add: (F, $) => A(
      E,
      [],
      P,
      (_) => _.map(
        (U) => U.id === F ? { ...U, comments: [...U.comments || [], { id: it(), by: b, text: $, createdAt: Date.now() }] } : U
      )
    ),
    del: (F, $) => A(
      E,
      [],
      P,
      (_) => _.map((U) => U.id === F ? { ...U, comments: (U.comments || []).filter((R) => R.id !== $) } : U)
    )
  }), Z = (E, P, F = !1) => ($, _) => A(E, [], P, (U) => U.map((R) => R.id === $ ? vn(R, _, b, F) : R)), K = Z(B.plan, g), Rt = Z(B.wish, d), Ht = Z(B.board, v, !0), he = L(B.plan, g), xe = L(B.wish, d), sa = (E, P, F) => A(
    B.plan,
    [],
    g,
    ($) => P ? $.map((_) => _.id === P ? { ..._, ...E } : _) : [...$, { id: it(), day: F, by: b, ...E }]
  ), la = (E) => A(B.plan, [], g, (P) => P.filter((F) => F.id !== E)), je = (E) => A(B.wish, [], d, (P) => [...P, { id: it(), by: b, likes: [b], createdAt: Date.now(), ...E }]), pa = (E) => A(
    B.wish,
    [],
    d,
    (P) => P.map(
      (F) => F.id === E ? { ...F, likes: F.likes.includes(b) ? F.likes.filter(($) => $ !== b) : [...F.likes, b] } : F
    )
  ), ca = (E) => A(B.wish, [], d, (P) => P.filter((F) => F.id !== E)), da = async (E, P) => {
    await A(B.plan, [], g, (F) => [
      ...F,
      {
        id: it(),
        day: P,
        by: b,
        time: "",
        title: E.name,
        place: E.area || "",
        link: E.link || "",
        memo: E.memo || "",
        comments: E.comments || [],
        reactions: E.reactions || {},
        ...$t(E) ? { lat: E.lat, lng: E.lng } : {}
      }
    ]), await A(B.wish, [], d, (F) => F.map(($) => $.id === E.id ? { ...$, planned: P } : $)), c(P);
  }, ma = (E, P) => A(
    B.spend,
    [],
    j,
    (F) => P ? F.map(($) => $.id === P ? { ...$, ...E, editedAt: Date.now(), editedBy: b } : $) : [...F, { id: it(), by: b, createdAt: Date.now(), ...E }]
  ), ua = (E) => A(B.spend, [], j, (P) => P.filter((F) => F.id !== E)), ga = async ({ text: E, urls: P, photos: F }, $) => {
    for (let W of F.filter((Q) => Q.data)) {
      if (!await _t(de(W.id), W.data)) return !1;
      ct.set(W.id, W.data);
    }
    let _ = F.map((W) => W.id), U = [], R = await A(B.board, [], v, (W) => $ ? W.map((Q) => Q.id !== $ ? Q : (U = (Q.photos || []).filter((xa) => !_.includes(xa)), { ...Q, text: E, urls: P, photos: _, editedAt: Date.now() })) : [{ id: it(), by: b, createdAt: Date.now(), text: E, urls: P, photos: _, likes: [], comments: [] }, ...W]);
    return R && U.forEach(Re), R;
  }, fa = async (E) => {
    let P = [];
    await A(B.board, [], v, ($) => (P = $.find((_) => _.id === E)?.photos || [], $.filter((_) => _.id !== E))) && P.forEach(Re);
  }, ro = (E) => A(
    B.board,
    [],
    v,
    (P) => P.map((F) => {
      if (F.id !== E) return F;
      let $ = F.likes || [];
      return { ...F, likes: $.includes(b) ? $.filter((_) => _ !== b) : [...$, b] };
    })
  ), ba = (E, P) => A(
    B.board,
    [],
    v,
    (F) => F.map(
      ($) => $.id === E ? { ...$, comments: [...$.comments || [], { id: it(), by: b, text: P, createdAt: Date.now() }] } : $
    )
  ), ha = (E, P) => A(
    B.board,
    [],
    v,
    (F) => F.map(($) => $.id === E ? { ...$, comments: ($.comments || []).filter((_) => _.id !== P) } : $)
  ), kt;
  if (!t)
    kt = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || k)
    kt = /* @__PURE__ */ e(yn, { initial: n, onSave: q, onCancel: n ? () => x(!1) : null });
  else if (!b || !n.members.includes(b))
    kt = /* @__PURE__ */ e(kn, { members: n.members, onPick: T });
  else {
    let E = nt(n.start, 0), P = nt(n.start, n.days - 1), F = Math.round((dt(n.start) - dt(at(/* @__PURE__ */ new Date()))) / 864e5), $ = Math.round((dt(at(/* @__PURE__ */ new Date())) - dt(n.start)) / 864e5), _ = $ >= 0 && $ < n.days ? $ : i, U = S ? { ...n, rate: S.rate, fx: S } : n;
    kt = /* @__PURE__ */ r(pt, { children: [
      /* @__PURE__ */ r("header", { className: "jt-head", children: [
        /* @__PURE__ */ r("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ r("button", { className: "jt-me", onClick: () => w(null), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(et, { name: b, members: n.members, size: 24 }),
            b
          ] }),
          /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => x(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(Ia, { size: 20 }) })
        ] }),
        /* @__PURE__ */ e("h1", { children: n.title }),
        /* @__PURE__ */ r("div", { className: "jt-head-sub", children: [
          /* @__PURE__ */ r("span", { children: [
            E.getMonth() + 1,
            "월 ",
            E.getDate(),
            "일 – ",
            P.getMonth() + 1,
            "월 ",
            P.getDate(),
            "일"
          ] }),
          F > 0 && /* @__PURE__ */ r("span", { className: "jt-dday", children: [
            "출발까지 ",
            F,
            "일"
          ] }),
          F === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
        ] })
      ] }),
      I && /* @__PURE__ */ r("div", { className: "jt-error", role: "alert", children: [
        I,
        /* @__PURE__ */ e("button", { onClick: () => O(""), "aria-label": "닫기", children: /* @__PURE__ */ e(vt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ r("main", { className: "jt-main", children: [
        u === "plan" && /* @__PURE__ */ e(
          In,
          {
            settings: U,
            schedule: s,
            day: i,
            setDay: c,
            onAdd: () => M({ type: "plan", day: i }),
            onEdit: (R) => M({ type: "plan", item: R, day: R.day }),
            me: b,
            onComment: he.add,
            onDelComment: he.del,
            onReact: K
          }
        ),
        u === "wish" && /* @__PURE__ */ e(
          Gn,
          {
            settings: U,
            wish: f,
            me: b,
            onAdd: () => M({ type: "wish" }),
            onSave: je,
            onLike: pa,
            onPlan: (R) => M({ type: "toPlan", wish: R }),
            onDelete: ca,
            onComment: xe.add,
            onDelComment: xe.del,
            onReact: Rt
          }
        ),
        u === "spend" && /* @__PURE__ */ e(
          Zn,
          {
            settings: U,
            spend: m,
            me: b,
            onEdit: (R) => M({ type: "spend", item: R })
          }
        ),
        u === "board" && /* @__PURE__ */ e(
          Qn,
          {
            settings: U,
            board: h,
            me: b,
            onEdit: (R) => M({ type: "post", item: R }),
            onLike: Ht,
            onComment: ba,
            onDelComment: ha
          }
        )
      ] }),
      (() => {
        let R = {
          plan: [`${i + 1}일차 일정 추가`, () => M({ type: "plan", day: i })],
          wish: ["가고 싶은 곳 추가", () => M({ type: "wish" })],
          spend: ["경비 추가", () => M({ type: "spend" })],
          board: ["글쓰기", () => M({ type: "post" })]
        }[u];
        return /* @__PURE__ */ r("button", { className: "jt-fab", onClick: R[1], children: [
          /* @__PURE__ */ e(Aa, { size: 20, strokeWidth: 2.6 }),
          R[0]
        ] });
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", Da],
        ["wish", "가고 싶은 곳", pe],
        ["spend", "경비", Pa],
        ["board", "게시판", qe]
      ].map(([R, W, Q]) => /* @__PURE__ */ r("button", { className: u === R ? "on" : "", onClick: () => p(R), "aria-current": u === R, children: [
        /* @__PURE__ */ e("span", { className: "jt-nav-ic", children: /* @__PURE__ */ e(Q, { size: 21 }) }),
        W
      ] }, R)) }),
      l?.type === "plan" && /* @__PURE__ */ e(Et, { title: l.item ? "일정 수정" : `${l.day + 1}일차 일정 추가`, onClose: y, children: /* @__PURE__ */ e(
        Nn,
        {
          initial: l.item,
          dayItems: s.filter((R) => R.day === l.day && R.id !== l.item?.id),
          onSave: (R) => {
            sa(R, l.item?.id, l.day), y();
          },
          onDelete: () => {
            la(l.item.id), y();
          }
        }
      ) }),
      l?.type === "wish" && /* @__PURE__ */ e(Et, { title: "가고 싶은 곳 추가", onClose: y, children: /* @__PURE__ */ e(
        Cn,
        {
          onSave: (R) => {
            je(R), y();
          }
        }
      ) }),
      l?.type === "spend" && /* @__PURE__ */ e(Et, { title: l.item ? "경비 수정" : "경비 기록", onClose: y, children: /* @__PURE__ */ e(
        zn,
        {
          settings: U,
          me: b,
          defaultDay: _,
          initial: l.item,
          onSave: (R) => {
            ma(R, l.item?.id), y();
          },
          onDelete: () => {
            ua(l.item.id), y();
          }
        }
      ) }),
      l?.type === "post" && /* @__PURE__ */ e(Et, { title: l.item ? "글 수정" : "새 글", onClose: y, children: /* @__PURE__ */ e(
        En,
        {
          initial: l.item,
          onSave: async (R) => {
            let W = await ga(R, l.item?.id);
            return W && y(), W;
          },
          onDelete: () => {
            fa(l.item.id), y();
          }
        }
      ) }),
      l?.type === "toPlan" && /* @__PURE__ */ e(Et, { title: `"${l.wish.name}" 몇째 날에 갈까요?`, onClose: y, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (R, W) => {
        let Q = nt(n.start, W);
        return /* @__PURE__ */ r(
          "button",
          {
            style: { "--lc": X[W % X.length] },
            onClick: () => {
              da(l.wish, W), y(), p("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: W + 1 }),
              W + 1,
              "일차 ",
              At(Q),
              " (",
              Ft(Q),
              ")"
            ]
          },
          W
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ r("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: be }),
    kt
  ] });
}
var be = `
.jt{--paper:#F2F4F7;--ink:#14213D;--muted:#66718A;--rule:#DCE1EA;--card:#fff;--blue:#0C86AE;
  font-family:"Pretendard","Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif;
  background:var(--paper);color:var(--ink);min-height:100vh;max-width:520px;margin:0 auto;
  display:flex;flex-direction:column;position:relative;font-size:15px;line-height:1.45;
  -webkit-text-size-adjust:100%}
.jt *{box-sizing:border-box}
:where(.jt) button{font:inherit;color:inherit;cursor:pointer}
.jt button:focus-visible,.jt input:focus-visible,.jt select:focus-visible,.jt textarea:focus-visible,.jt [role=button]:focus-visible,.jt a:focus-visible{outline:3px solid var(--blue);outline-offset:2px}
.jt h1,.jt h3,.jt h4,.jt p,.jt ul,.jt ol{margin:0;padding:0}
.jt ul,.jt ol{list-style:none}

.jt-loading{padding:80px 20px;text-align:center;color:var(--muted)}

/* header */
.jt-head{background:var(--ink);color:#fff;padding:14px 20px 20px}
.jt-head-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.jt-head h1{font-size:26px;font-weight:800;letter-spacing:-.02em;line-height:1.2}
.jt-head-sub{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:6px;color:#C4CCDD;font-size:14px}
.jt-dday{background:#fff;color:var(--ink);font-weight:700;font-size:13px;padding:2px 10px;border-radius:999px}
.jt-me{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:0;color:#fff;
  padding:4px 12px 4px 4px;border-radius:999px;font-weight:600}
.jt-avatar{display:inline-grid;place-items:center;border-radius:50%;color:#fff;font-weight:800;flex:0 0 auto}
.jt-icon{background:none;border:0;padding:8px;border-radius:50%;display:grid;place-items:center;color:var(--ink)}
.jt-icon.sm{padding:6px;color:var(--muted)}
.jt-icon.light{color:#fff}

.jt-error{margin:12px 16px 0;background:#FDECEC;color:#9B1C1C;border-radius:10px;padding:10px 12px;display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:14px}
.jt-error button{background:none;border:0;padding:2px;color:inherit}

.jt-main{flex:1;padding:16px 16px 96px}

/* bottom nav */
.jt-nav{position:sticky;bottom:0;display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-top:1px solid var(--rule);padding-bottom:env(safe-area-inset-bottom);z-index:10}
.jt-nav button{background:none;border:0;padding:10px 2px 9px;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:12px;font-weight:600;color:var(--muted);white-space:nowrap}
.jt-nav button.on{color:var(--ink);box-shadow:inset 0 3px 0 var(--ink)}

/* day selector */
.jt-days{display:flex;gap:4px;overflow-x:auto;padding:2px 2px 14px;margin:0 -4px;scrollbar-width:none}
.jt-days::-webkit-scrollbar{display:none}
.jt-day{flex:0 0 auto;width:58px;background:none;border:0;padding:4px 0;display:flex;flex-direction:column;align-items:center;gap:1px}
.jt-day-dot{width:38px;height:38px;border-radius:50%;background:var(--lc);color:#fff;font-weight:800;font-size:17px;display:grid;place-items:center;opacity:.4;transition:opacity .15s,box-shadow .15s}
.jt-day.active .jt-day-dot{opacity:1;box-shadow:0 0 0 3px var(--paper),0 0 0 5px var(--lc)}
.jt-day-date{font-size:13px;font-weight:700;margin-top:5px}
.jt-day-wk{font-size:12px;color:var(--muted)}

/* train-line timeline */
.jt-line{margin-top:4px}
.jt-row{display:grid;grid-template-columns:46px 26px 1fr;column-gap:4px;padding-bottom:10px}
.jt-time{font-size:13px;font-weight:700;color:var(--muted);text-align:right;padding-top:11px;font-variant-numeric:tabular-nums}
.jt-rail{position:relative}
.jt-rail::before{content:"";position:absolute;left:50%;top:0;bottom:-10px;width:5px;margin-left:-2.5px;background:var(--lc)}
.jt-row:first-child .jt-rail::before{top:22px}
.jt-row:last-child .jt-rail::before{bottom:auto;height:22px}
.jt-row:only-child .jt-rail::before{display:none}
.jt-node{position:absolute;left:50%;top:14px;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#fff;border:5px solid var(--lc)}
.jt-card{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:10px 12px;cursor:pointer}
.jt-card:active{background:#F8F9FB}
.jt-card-title{font-weight:700;font-size:16px}
.jt-meta{display:flex;align-items:center;gap:4px;color:var(--muted);font-size:13px;margin-top:2px}
.jt-memo{font-size:14px;margin-top:6px;white-space:pre-wrap;color:#33405C}
.jt-by{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);margin-top:8px}
.jt-by.grow{margin:0;margin-left:auto}

.jt-empty{text-align:center;color:var(--muted);padding:36px 12px 24px}
.jt-empty p:first-child{font-weight:700;color:var(--ink);margin-bottom:4px}

.jt-add{width:100%;margin-top:14px;background:#fff;border:2px dashed #B4BDCF;color:var(--ink);padding:13px;border-radius:12px;font-weight:700;display:flex;gap:6px;justify-content:center;align-items:center}
.jt-add:active{background:#EDF0F5}

/* chips / buttons / forms */
.jt-chips{display:flex;flex-wrap:wrap;gap:8px}
.jt-filter{margin-bottom:12px}
.jt-chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid var(--rule);border-radius:999px;padding:6px 14px;font-weight:600;font-size:14px;color:var(--muted)}
.jt-chip.on{background:var(--ink);border-color:var(--ink);color:#fff}
.jt-chip button{background:none;border:0;padding:0;display:grid;color:inherit}
.jt-primary{background:var(--ink);color:#fff;border:0;border-radius:12px;padding:14px;font-weight:700;font-size:16px;width:100%}
.jt-primary:disabled{opacity:.35;cursor:not-allowed}
.jt-secondary{background:#fff;border:1.5px solid var(--ink);border-radius:10px;padding:8px 14px;font-weight:700;white-space:nowrap}
.jt-secondary:disabled{opacity:.4;cursor:not-allowed}
.jt-secondary.sm{padding:5px 11px;font-size:13px;border-radius:999px}
.jt-ghost{background:none;border:0;padding:10px;color:var(--muted);font-weight:600}
.jt-del{background:none;border:0;color:var(--muted);display:inline-flex;align-items:center;gap:4px;padding:6px;font-size:13px;border-radius:8px}
.jt-del.armed{background:#FDECEC;color:#B42318;font-weight:700}

.jt-form{display:flex;flex-direction:column;gap:14px}
.jt-field{display:flex;flex-direction:column;gap:6px}
.jt-field>span{font-size:13px;font-weight:700;color:#33405C}
.jt input,.jt select,.jt textarea{font:inherit;font-size:16px;color:var(--ink);background:#fff;border:1.5px solid var(--rule);border-radius:10px;padding:11px 12px;width:100%}
.jt textarea{resize:vertical}
.jt-inline{display:flex;gap:8px;margin-top:4px}
.jt-hint{font-size:13px;color:var(--muted);margin-top:-6px}
.jt-note{font-size:12px;color:var(--muted);text-align:center}
.jt-stepper{display:flex;align-items:center;gap:16px}
.jt-stepper button{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--ink);background:#fff;font-size:22px;font-weight:700;line-height:1}
.jt-stepper strong{font-size:18px;min-width:44px;text-align:center}

.jt-setup{padding:28px 20px 40px}
.jt-setup h1{font-size:26px;font-weight:800;letter-spacing:-.02em;margin-bottom:20px}
.jt-who-list{display:flex;flex-direction:column;gap:10px}
.jt-who-btn{display:flex;align-items:center;gap:14px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:12px 16px;font-size:18px;font-weight:700;text-align:left}
.jt-who-btn:active{background:#EDF0F5}

/* bottom sheet */
.jt-scrim{position:fixed;inset:0;background:rgba(20,33,61,.5);display:flex;align-items:flex-end;justify-content:center;z-index:50}
.jt-sheet{background:var(--paper);width:100%;max-width:520px;max-height:90vh;overflow:auto;border-radius:18px 18px 0 0;padding:8px 20px 28px;animation:jt-up .22s ease-out}
@keyframes jt-up{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}
.jt-sheet-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.jt-sheet-head h3{font-size:18px;font-weight:800}
.jt-daypick{display:flex;flex-direction:column;gap:8px}
.jt-daypick button{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:10px 14px;font-weight:700;text-align:left}
.jt-daypick .jt-day-dot{opacity:1;width:32px;height:32px;font-size:15px}

/* wishlist */
.jt-list{display:flex;flex-direction:column;gap:10px}
.jt-wish{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:12px}
.jt-wish-top{display:flex;align-items:center;gap:8px}
.jt-wish-top strong{font-size:16px}
.jt-tag{color:#fff;font-size:12px;font-weight:700;padding:2px 9px;border-radius:6px}
