] }),
            /* @__PURE__ */ e("strong", { children: w > 0.5 ? `${J(w)} 받으면 돼요` : w < -0.5 ? `${J(-w)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        m.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: m.map((p, s) => /* @__PURE__ */ r("li", { children: [
          /* @__PURE__ */ e("span", { children: p.from === n ? /* @__PURE__ */ r(at, { children: [
            /* @__PURE__ */ e("b", { children: p.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ r(at, { children: [
            /* @__PURE__ */ e("b", { children: p.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ r("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: J(p.v) }),
            /* @__PURE__ */ e("em", { children: $t(p.v, f) })
          ] })
        ] }, s)) }),
        /* @__PURE__ */ r("div", { className: "jt-calc", children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: J(j.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ r("b", { children: [
              "− ",
              J(j.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: w > 0.5 ? "더 결제했으니 받을 돈" : w < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: Ot(w), children: w > 0.5 ? J(w) : w < -0.5 ? J(-w) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: h.map((p) => {
        let s = rt(g, p.day), v = p.res.net[n] || 0;
        return /* @__PURE__ */ r("li", { style: { "--lc": Z[p.day % Z.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ r("span", { className: "jt-daynet-label", children: [
            p.day + 1,
            "일차 ",
            Dt(s),
            " (",
            Pt(s),
            ")"
          ] }),
          /* @__PURE__ */ r("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            J(p.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            J(p.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + Ot(v), children: Ze(v) })
        ] }, p.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    c === "day" && /* @__PURE__ */ r(at, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      h.map((p) => {
        let s = rt(g, p.day);
        return /* @__PURE__ */ r("div", { className: "jt-daycard", style: { "--lc": Z[p.day % Z.length] }, children: [
          /* @__PURE__ */ r("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: p.day + 1 }),
            Dt(s),
            " (",
            Pt(s),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: J(p.sum) })
          ] }),
          /* @__PURE__ */ e(Xe, { moves: p.res.moves, rate: f, me: n }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: p.items.map((v) => /* @__PURE__ */ e(no, { e: v, members: i, rate: f, onEdit: o }, v.id)) })
        ] }, p.day);
      })
    ] }),
    c === "all" && /* @__PURE__ */ r(at, { children: [
      /* @__PURE__ */ r("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(Xe, { moves: j.moves, rate: f, me: n }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: i.map((p) => /* @__PURE__ */ r("li", { children: [
        /* @__PURE__ */ e(nt, { name: p, members: i, size: 28 }),
        /* @__PURE__ */ r("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: p }),
          /* @__PURE__ */ r("span", { children: [
            "결제 ",
            J(j.paid[p]),
            ", 쓴 돈 ",
            J(j.share[p])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + Ot(j.net[p]), children: Ze(j.net[p]) })
      ] }, p)) })
    ] })
  ] });
}
function ro({ post: t, me: a, members: n, onEdit: o, onLike: i, onComment: f, onDelComment: g, onOpenPhoto: c }) {
  let [d, x] = N(!1), j = t.photos || [], y = t.urls || [], h = t.comments || [], w = j.slice(0, 4);
  return /* @__PURE__ */ r("li", { className: "jt-post", children: [
    /* @__PURE__ */ r("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ e(nt, { name: t.by, members: n, size: 34 }),
      /* @__PURE__ */ r("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ e("strong", { children: t.by }),
        /* @__PURE__ */ r("span", { children: [
          aa(t.createdAt),
          t.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      t.by === a && /* @__PURE__ */ e("button", { className: "jt-icon sm", onClick: () => o(t), "aria-label": "내 글 고치기", children: /* @__PURE__ */ e(ue, { size: 17 }) })
    ] }),
    t.text && /* @__PURE__ */ e(zn, { text: t.text }),
    j.length > 0 && /* @__PURE__ */ e("div", { className: "jt-gallery n" + Math.min(j.length, 4), children: w.map((m, p) => /* @__PURE__ */ r("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ e(he, { id: m, onClick: () => c(j, p) }),
      p === 3 && j.length > 4 && /* @__PURE__ */ r("span", { className: "jt-more", children: [
        "+",
        j.length - 4
      ] })
    ] }, m)) }),
    y.length > 0 && /* @__PURE__ */ e("div", { className: "jt-links", children: y.map((m) => /* @__PURE__ */ e(ia, { url: m }, m)) }),
    /* @__PURE__ */ r("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ e(Ht, { item: t, me: a, boardLikes: !0, onReact: (m) => i(t.id, m) }),
      /* @__PURE__ */ e(be, { count: h.length, open: d, onClick: () => x(!d) })
    ] }),
    d && /* @__PURE__ */ e(
      Yt,
      {
        comments: h,
        me: a,
        members: n,
        onAdd: (m) => f(t.id, m),
        onDelete: (m) => g(t.id, m)
      }
    )
  ] });
}
function io({ settings: t, board: a, me: n, ...o }) {
  let [i, f] = N(null), g = [...a].sort((c, d) => d.createdAt - c.createdAt);
  return /* @__PURE__ */ r("section", { children: [
    g.length === 0 ? /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ e("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ e("ul", { className: "jt-posts", children: g.map((c) => /* @__PURE__ */ e(
      ro,
      {
        post: c,
        me: n,
        members: t.members,
        onOpenPhoto: (d, x) => f({ photos: d, index: x }),
        ...o
      },
      c.id
    )) }),
    i && /* @__PURE__ */ e(Cn, { photos: i.photos, index: i.index, onClose: () => f(null) })
  ] });
}
var bt = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], so = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", lo = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), po = 7e3;
function co() {
  let [t, a] = N(0), [n, o] = N({}), i = G(n);
  if (i.current = n, K(() => {
    let c = setInterval(() => {
      a((d) => {
        let x = d;
        for (let j = 0; j < bt.length && (x = (x + 1) % bt.length, !!i.current[x]); j++)
          ;
        return x;
      });
    }, po);
    return () => clearInterval(c);
  }, []), bt.every((c, d) => n[d])) return null;
  let g = bt[t];
  return /* @__PURE__ */ r(at, { children: [
    /* @__PURE__ */ r("div", { className: "jt-hero", "aria-hidden": "true", children: [
      bt.map((c, d) => /* @__PURE__ */ e(
        "img",
        {
          src: so(c.f),
          alt: "",
          className: d === t ? "on" : "",
          style: { objectPosition: c.pos },
          loading: d === 0 ? "eager" : "lazy",
          onError: () => o((x) => ({ ...x, [d]: !0 }))
        },
        c.f
      )),
      /* @__PURE__ */ e("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: bt.map((c, d) => /* @__PURE__ */ e("i", { className: d === t ? "on" : "" }, c.f)) }),
      /* @__PURE__ */ r("a", { className: "jt-hero-cap", href: lo(g.f), target: "_blank", rel: "noopener noreferrer", children: [
        g.t,
        ", 사진 ",
        g.by,
        " (",
        g.lic,
        ")"
      ] })
    ] })
  ] });
}
function xe() {
  let [t, a] = N(!1), [n, o] = N(null), [i, f] = N([]), [g, c] = N([]), [d, x] = N([]), [j, y] = N([]), [h, w] = N(null), [m, p] = N("plan"), [s, v] = N(0), [u, b] = N(!1), [l, M] = N(null), [F, U] = N(""), S = G(!1), [_, z] = N(null), [k, R] = N(!1);
  K(() => {
    (async () => {
      try {
        let C = await window.storage.get("hdr", !1);
        C && C.value === "min" && R(!0);
      } catch {
      }
    })();
  }, []);
  let T = () => {
    let C = !k;
    R(C);
    try {
      window.storage.set("hdr", C ? "min" : "max", !1);
    } catch {
    }
  };
  K(() => {
    let C = !0, I = async () => {
      let D = await Nn();
      if (C)
        if (D) {
          let L = { ...D, at: Date.now() };
          z(L), Tt(O.fx, L);
        } else {
          let L = await pt(O.fx, null);
          C && L && L.rate > 0 && z({ ...L, cached: !0 });
        }
    };
    I();
    let A = setInterval(I, 3 * 36e5);
    return () => {
      C = !1, clearInterval(A);
    };
  }, []);
  let X = $a(async () => {
    let [C, I, A, D, L] = await Promise.all([
      pt(O.settings, null),
      pt(O.plan, []),
      pt(O.wish, []),
      pt(O.spend, []),
      pt(O.board, [])
    ]);
    o(C), f(I), c(A), x(D), y(L), a(!0);
  }, []);
  K(() => {
    (async () => {
      try {
        let A = await window.storage.get("me", !1);
        A && A.value && w(A.value);
      } catch {
      }
      await X();
    })();
    let C = window.storage.onChange ? window.storage.onChange(X) : null, I = setInterval(X, C ? 6e4 : 1e4);
    return () => {
      clearInterval(I), C && C();
    };
  }, [X]), K(() => {
    if (!n || S.current) return;
    S.current = !0;
    let C = Math.round((mt(ot(/* @__PURE__ */ new Date())) - mt(n.start)) / 864e5);
    C >= 0 && C < n.days && v(C);
  }, [n]);
  let $ = async (C, I, A, D) => {
    let L = await pt(C, I), W = D(L);
    A(W);
    let P = await Tt(C, W);
    return P || U("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), P;
  }, E = async (C) => {
    w(C);
    try {
      await window.storage.set("me", C, !1);
    } catch {
    }
  }, H = async (C) => {
    o(C), b(!1), await Tt(O.settings, C) || U("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), h && !C.members.includes(h) && w(null);
  }, B = () => M(null), V = (C, I) => ({
    add: (A, D) => $(
      C,
      [],
      I,
      (L) => L.map(
        (W) => W.id === A ? { ...W, comments: [...W.comments || [], { id: lt(), by: h, text: D, createdAt: Date.now() }] } : W
      )
    ),
    del: (A, D) => $(
      C,
      [],
      I,
      (L) => L.map((W) => W.id === A ? { ...W, comments: (W.comments || []).filter((P) => P.id !== D) } : W)
    )
  }), ft = (C, I, A = !1) => (D, L) => $(C, [], I, (W) => W.map((P) => P.id === D ? En(P, L, h, A) : P)), Jt = ft(O.plan, f), da = ft(O.wish, c), ma = ft(O.board, y, !0), ve = V(O.plan, f), ye = V(O.wish, c), ua = (C, I, A) => $(
    O.plan,
    [],
    f,
    (D) => I ? D.map((L) => L.id === I ? { ...L, ...C } : L) : [...D, { id: lt(), day: A, by: h, ...C }]
  ), ga = (C) => $(O.plan, [], f, (I) => I.filter((A) => A.id !== C)), we = (C) => $(O.wish, [], c, (I) => [...I, { id: lt(), by: h, likes: [h], createdAt: Date.now(), ...C }]), fa = (C) => $(
    O.wish,
    [],
    c,
    (I) => I.map(
      (A) => A.id === C ? { ...A, likes: A.likes.includes(h) ? A.likes.filter((D) => D !== h) : [...A.likes, h] } : A
    )
  ), ke = (C) => $(O.wish, [], c, (I) => I.filter((A) => A.id !== C)), ha = (C, I) => $(O.wish, [], c, (A) => A.map((D) => D.id === C ? { ...D, ...I, editedAt: Date.now() } : D)), ba = async (C, I) => {
    await $(O.plan, [], f, (A) => [
      ...A,
      {
        id: lt(),
        day: I,
        by: h,
        time: "",
        title: C.name,
        place: C.area || "",
        link: C.link || "",
        memo: C.memo || "",
        comments: C.comments || [],
        reactions: C.reactions || {},
        ...Lt(C) ? { lat: C.lat, lng: C.lng } : {}
      }
    ]), await $(O.wish, [], c, (A) => A.map((D) => D.id === C.id ? { ...D, planned: I } : D)), v(I);
  }, xa = (C, I) => $(
    O.spend,
    [],
    x,
    (A) => I ? A.map((D) => D.id === I ? { ...D, ...C, editedAt: Date.now(), editedBy: h } : D) : [...A, { id: lt(), by: h, createdAt: Date.now(), ...C }]
  ), ja = (C) => $(O.spend, [], x, (I) => I.filter((A) => A.id !== C)), va = async ({ text: C, urls: I, photos: A }, D) => {
    for (let Y of A.filter((tt) => tt.data)) {
      if (!await Tt(ge(Y.id), Y.data)) return !1;
      dt.set(Y.id, Y.data);
    }
    let L = A.map((Y) => Y.id), W = [], P = await $(O.board, [], y, (Y) => D ? Y.map((tt) => tt.id !== D ? tt : (W = (tt.photos || []).filter((Na) => !L.includes(Na)), { ...tt, text: C, urls: I, photos: L, editedAt: Date.now() })) : [{ id: lt(), by: h, createdAt: Date.now(), text: C, urls: I, photos: L, likes: [], comments: [] }, ...Y]);
    return P && W.forEach(Be), P;
  }, ya = async (C) => {
    let I = [];
    await $(O.board, [], y, (D) => (I = D.find((L) => L.id === C)?.photos || [], D.filter((L) => L.id !== C))) && I.forEach(Be);
  }, bo = (C) => $(
    O.board,
    [],
    y,
    (I) => I.map((A) => {
      if (A.id !== C) return A;
      let D = A.likes || [];
      return { ...A, likes: D.includes(h) ? D.filter((L) => L !== h) : [...D, h] };
    })
  ), wa = (C, I) => $(
    O.board,
    [],
    y,
    (A) => A.map(
      (D) => D.id === C ? { ...D, comments: [...D.comments || [], { id: lt(), by: h, text: I, createdAt: Date.now() }] } : D
    )
  ), ka = (C, I) => $(
    O.board,
    [],
    y,
    (A) => A.map((D) => D.id === C ? { ...D, comments: (D.comments || []).filter((L) => L.id !== I) } : D)
  ), zt;
  if (!t)
    zt = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || u)
    zt = /* @__PURE__ */ e(Mn, { initial: n, onSave: H, onCancel: n ? () => b(!1) : null });
  else if (!h || !n.members.includes(h))
    zt = /* @__PURE__ */ e(An, { members: n.members, onPick: E });
  else {
    let C = rt(n.start, 0), I = rt(n.start, n.days - 1), A = Math.round((mt(n.start) - mt(ot(/* @__PURE__ */ new Date()))) / 864e5), D = Math.round((mt(ot(/* @__PURE__ */ new Date())) - mt(n.start)) / 864e5), L = D >= 0 && D < n.days ? D : s, W = _ ? { ...n, rate: _.rate, fx: _ } : n;
    zt = /* @__PURE__ */ r(at, { children: [
      /* @__PURE__ */ r("header", { className: "jt-head hero" + (k ? " mini" : m === "plan" ? " tall" : ""), children: [
        !k && /* @__PURE__ */ e(co, {}),
        /* @__PURE__ */ r("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ r("button", { className: "jt-me", onClick: () => w(null), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(nt, { name: h, members: n.members, size: 24 }),
            h
          ] }),
          k && /* @__PURE__ */ r("strong", { className: "jt-mini-title", children: [
            n.title,
            A > 0 && /* @__PURE__ */ r("em", { children: [
              "D-",
              A
            ] }),
            A === 0 && /* @__PURE__ */ e("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ r("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ e(
              "button",
              {
                className: "jt-icon light",
                onClick: T,
                "aria-label": k ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !k,
                children: k ? /* @__PURE__ */ e(Ya, { size: 20 }) : /* @__PURE__ */ e(Ja, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => b(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(La, { size: 20 }) })
          ] })
        ] }),
        !k && /* @__PURE__ */ r(at, { children: [
          /* @__PURE__ */ e("h1", { children: n.title }),
          /* @__PURE__ */ r("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ r("span", { children: [
              C.getMonth() + 1,
              "월 ",
              C.getDate(),
              "일 – ",
              I.getMonth() + 1,
              "월 ",
              I.getDate(),
              "일"
            ] }),
            A > 0 && /* @__PURE__ */ r("span", { className: "jt-dday", children: [
              "출발까지 ",
              A,
              "일"
            ] }),
            A === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      F && /* @__PURE__ */ r("div", { className: "jt-error", role: "alert", children: [
        F,
        /* @__PURE__ */ e("button", { onClick: () => U(""), "aria-label": "닫기", children: /* @__PURE__ */ e(Nt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ r("main", { className: "jt-main", children: [
        m === "plan" && /* @__PURE__ */ e(
          Tn,
          {
            settings: W,
            schedule: i,
            day: s,
            setDay: v,
            onAdd: () => M({ type: "plan", day: s }),
            onEdit: (P) => M({ type: "plan", item: P, day: P.day }),
            me: h,
            onComment: ve.add,
            onDelComment: ve.del,
            onReact: Jt
          }
        ),
        m === "wish" && /* @__PURE__ */ e(
          eo,
          {
            settings: W,
            wish: g,
            me: h,
            onAdd: () => M({ type: "wish" }),
            onEdit: (P) => M({ type: "wish", item: P }),
            onSave: we,
            onLike: fa,
            onPlan: (P) => M({ type: "toPlan", wish: P }),
            onDelete: ke,
            onComment: ye.add,
            onDelComment: ye.del,
            onReact: da
          }
        ),
        m === "spend" && /* @__PURE__ */ e(
          oo,
          {
            settings: W,
            spend: d,
            me: h,
            onEdit: (P) => M({ type: "spend", item: P })
          }
        ),
        m === "board" && /* @__PURE__ */ e(
          io,
          {
            settings: W,
            board: j,
            me: h,
            onEdit: (P) => M({ type: "post", item: P }),
            onLike: ma,
            onComment: wa,
            onDelComment: ka
          }
        )
      ] }),
      (() => {
        let P = {
          plan: [`${s + 1}일차 일정 추가`, () => M({ type: "plan", day: s })],
          wish: ["가고 싶은 곳 추가", () => M({ type: "wish" })],
          spend: ["경비 추가", () => M({ type: "spend" })],
          board: ["글쓰기", () => M({ type: "post" })]
        }[m];
        return /* @__PURE__ */ r("button", { className: "jt-fab", onClick: P[1], children: [
          /* @__PURE__ */ e(Ra, { size: 20, strokeWidth: 2.6 }),
          P[0]
        ] });
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", Ta],
        ["wish", "가고 싶은 곳", de],
        ["spend", "경비", Ba],
        ["board", "게시판", Qe]
      ].map(([P, Y, tt]) => /* @__PURE__ */ r("button", { className: m === P ? "on" : "", onClick: () => p(P), "aria-current": m === P, children: [
        /* @__PURE__ */ e("span", { className: "jt-nav-ic", children: /* @__PURE__ */ e(tt, { size: 21 }) }),
        Y
      ] }, P)) }),
      l?.type === "plan" && /* @__PURE__ */ e(At, { title: l.item ? "일정 수정" : `${l.day + 1}일차 일정 추가`, onClose: B, children: /* @__PURE__ */ e(
        Fn,
        {
          initial: l.item,
          dayItems: i.filter((P) => P.day === l.day && P.id !== l.item?.id),
          onSave: (P) => {
            ua(P, l.item?.id, l.day), B();
          },
          onDelete: () => {
            ga(l.item.id), B();
          }
        }
      ) }),
      l?.type === "wish" && /* @__PURE__ */ e(At, { title: l.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: B, children: /* @__PURE__ */ e(
        In,
        {
          initial: l.item,
          onSave: (P) => {
            l.item ? ha(l.item.id, P) : we(P), B();
          },
          onDelete: () => {
            ke(l.item.id), B();
          }
        }
      ) }),
      l?.type === "spend" && /* @__PURE__ */ e(At, { title: l.item ? "경비 수정" : "경비 기록", onClose: B, children: /* @__PURE__ */ e(
        Dn,
        {
          settings: W,
          me: h,
          defaultDay: L,
          initial: l.item,
          onSave: (P) => {
            xa(P, l.item?.id), B();
          },
          onDelete: () => {
            ja(l.item.id), B();
          }
        }
      ) }),
      l?.type === "post" && /* @__PURE__ */ e(At, { title: l.item ? "글 수정" : "새 글", onClose: B, children: /* @__PURE__ */ e(
        Pn,
        {
          initial: l.item,
          onSave: async (P) => {
            let Y = await va(P, l.item?.id);
            return Y && B(), Y;
          },
          onDelete: () => {
            ya(l.item.id), B();
          }
        }
      ) }),
      l?.type === "toPlan" && /* @__PURE__ */ e(At, { title: `"${l.wish.name}" 몇째 날에 갈까요?`, onClose: B, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (P, Y) => {
        let tt = rt(n.start, Y);
        return /* @__PURE__ */ r(
          "button",
          {
            style: { "--lc": Z[Y % Z.length] },
            onClick: () => {
              ba(l.wish, Y), B(), p("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: Y + 1 }),
              Y + 1,
              "일차 ",
              Dt(tt),
              " (",
              Pt(tt),
              ")"
            ]
          },
          Y
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ r("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: je }),
    zt
  ] });
}
var je = `
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
.jt-wish-bottom{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.jt-like{display:inline-flex;align-items:center;gap:5px;background:#fff;border:1.5px solid var(--rule);color:var(--muted);border-radius:999px;padding:4px 11px;font-weight:700}
.jt-like.on{color:#D9262E;border-color:#D9262E;background:#FEF3F3}
.jt-like.open{color:var(--ink);border-color:var(--ink)}
.jt-planned{font-size:13px;font-weight:700}

/* spending */
.jt-total{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:16px;display:flex;flex-direction:column;margin-bottom:12px}
.jt-total span{font-size:13px;color:var(--muted);font-weight:600}
.jt-total strong{font-size:34px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.jt-total em{font-style:normal;color:var(--muted)}
.jt-seg{display:grid;grid-template-columns:1fr 1fr;background:#E3E7EE;border-radius:10px;padding:3px;margin-bottom:14px}
