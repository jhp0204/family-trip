let [f, y] = N(!1), [d, g] = N(""), s = (t.likes || []).includes(n), w = t.photos || [], b = t.urls || [], p = t.comments || [], i = w.slice(0, 4), m = () => {
    let k = d.trim();
    k && (u(t.id, k), g(""));
  };
  return /* @__PURE__ */ o("li", { className: "jt-post", children: [
    /* @__PURE__ */ o("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ e(V, { name: t.by, members: a, size: 34 }),
      /* @__PURE__ */ o("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ e("strong", { children: t.by }),
        /* @__PURE__ */ o("span", { children: [
          he(t.createdAt),
          t.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      t.by === n && /* @__PURE__ */ e("button", { className: "jt-icon sm", onClick: () => r(t), "aria-label": "내 글 고치기", children: /* @__PURE__ */ e(ba, { size: 17 }) })
    ] }),
    t.text && /* @__PURE__ */ e(Ya, { text: t.text }),
    w.length > 0 && /* @__PURE__ */ e("div", { className: "jt-gallery n" + Math.min(w.length, 4), children: i.map((k, F) => /* @__PURE__ */ o("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ e(ae, { id: k, onClick: () => c(w, F) }),
      F === 3 && w.length > 4 && /* @__PURE__ */ o("span", { className: "jt-more", children: [
        "+",
        w.length - 4
      ] })
    ] }, k)) }),
    b.length > 0 && /* @__PURE__ */ e("div", { className: "jt-links", children: b.map((k) => /* @__PURE__ */ e(_e, { url: k }, k)) }),
    /* @__PURE__ */ o("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ o(
        "button",
        {
          className: "jt-like" + (s ? " on" : ""),
          onClick: () => l(t.id),
          "aria-pressed": s,
          "aria-label": "좋아요",
          children: [
            /* @__PURE__ */ e($t, { size: 16, fill: s ? "currentColor" : "none" }),
            (t.likes || []).length
          ]
        }
      ),
      /* @__PURE__ */ o("button", { className: "jt-like" + (f ? " open" : ""), onClick: () => y(!f), "aria-expanded": f, children: [
        /* @__PURE__ */ e(Ae, { size: 16 }),
        "댓글 ",
        p.length
      ] })
    ] }),
    f && /* @__PURE__ */ o("div", { className: "jt-comments", children: [
      p.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
      /* @__PURE__ */ e("ul", { children: p.map((k) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
        /* @__PURE__ */ e(V, { name: k.by, members: a, size: 24 }),
        /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("strong", { children: k.by }),
            /* @__PURE__ */ e("span", { children: he(k.createdAt) })
          ] }),
          /* @__PURE__ */ e("p", { children: k.text })
        ] }),
        k.by === n && /* @__PURE__ */ e(ht, { onConfirm: () => x(t.id, k.id), label: "" })
      ] }, k.id)) }),
      /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: d,
            onChange: (k) => g(k.target.value),
            onKeyDown: (k) => k.key === "Enter" && !k.nativeEvent.isComposing && m(),
            placeholder: "댓글 달기",
            "aria-label": "댓글 내용"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: m, disabled: !d.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(xa, { size: 18 }) })
      ] })
    ] })
  ] });
}
function un({ settings: t, board: n, me: a, ...r }) {
  let [l, u] = N(null), x = [...n].sort((c, f) => f.createdAt - c.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    x.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ e("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ e("ul", { className: "jt-posts", children: x.map((c) => /* @__PURE__ */ e(
      mn,
      {
        post: c,
        me: a,
        members: t.members,
        onOpenPhoto: (f, y) => u({ photos: f, index: y }),
        ...r
      },
      c.id
    )) }),
    l && /* @__PURE__ */ e(Ha, { photos: l.photos, index: l.index, onClose: () => u(null) })
  ] });
}
function ne() {
  let [t, n] = N(!1), [a, r] = N(null), [l, u] = N([]), [x, c] = N([]), [f, y] = N([]), [d, g] = N([]), [s, w] = N(null), [b, p] = N("plan"), [i, m] = N(0), [k, F] = N(!1), [h, I] = N(null), [E, K] = N(""), J = ft(!1), [L, j] = N(null);
  Z(() => {
    let z = !0, M = async () => {
      let A = await Ka();
      if (z)
        if (A) {
          let P = { ...A, at: Date.now() };
          j(P), St(T.fx, P);
        } else {
          let P = await ot(T.fx, null);
          z && P && P.rate > 0 && j({ ...P, cached: !0 });
        }
    };
    M();
    let C = setInterval(M, 3 * 36e5);
    return () => {
      z = !1, clearInterval(C);
    };
  }, []);
  let v = ia(async () => {
    let [z, M, C, A, P] = await Promise.all([
      ot(T.settings, null),
      ot(T.plan, []),
      ot(T.wish, []),
      ot(T.spend, []),
      ot(T.board, [])
    ]);
    r(z), u(M), c(C), y(A), g(P), n(!0);
  }, []);
  Z(() => {
    (async () => {
      try {
        let C = await window.storage.get("me", !1);
        C && C.value && w(C.value);
      } catch {
      }
      await v();
    })();
    let z = window.storage.onChange ? window.storage.onChange(v) : null, M = setInterval(v, z ? 6e4 : 1e4);
    return () => {
      clearInterval(M), z && z();
    };
  }, [v]), Z(() => {
    if (!a || J.current) return;
    J.current = !0;
    let z = Math.round((pt(tt(/* @__PURE__ */ new Date())) - pt(a.start)) / 864e5);
    z >= 0 && z < a.days && m(z);
  }, [a]);
  let S = async (z, M, C, A) => {
    let P = await ot(z, M), G = A(P);
    C(G);
    let $ = await St(z, G);
    return $ || K("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), $;
  }, _ = async (z) => {
    w(z);
    try {
      await window.storage.set("me", z, !1);
    } catch {
    }
  }, H = async (z) => {
    r(z), F(!1), await St(T.settings, z) || K("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), s && !z.members.includes(s) && w(null);
  }, D = () => I(null), O = (z, M, C) => S(
    T.plan,
    [],
    u,
    (A) => M ? A.map((P) => P.id === M ? { ...P, ...z } : P) : [...A, { id: lt(), day: C, by: s, ...z }]
  ), dt = (z) => S(T.plan, [], u, (M) => M.filter((C) => C.id !== z)), Q = (z) => S(T.wish, [], c, (M) => [...M, { id: lt(), by: s, likes: [s], createdAt: Date.now(), ...z }]), Be = (z) => S(
    T.wish,
    [],
    c,
    (M) => M.map(
      (C) => C.id === z ? { ...C, likes: C.likes.includes(s) ? C.likes.filter((A) => A !== s) : [...C.likes, s] } : C
    )
  ), Le = (z) => S(T.wish, [], c, (M) => M.filter((C) => C.id !== z)), We = async (z, M) => {
    await S(T.plan, [], u, (C) => [
      ...C,
      {
        id: lt(),
        day: M,
        by: s,
        time: "",
        title: z.name,
        place: z.area || "",
        link: z.link || "",
        memo: z.memo || "",
        ..._t(z) ? { lat: z.lat, lng: z.lng } : {}
      }
    ]), await S(T.wish, [], c, (C) => C.map((A) => A.id === z.id ? { ...A, planned: M } : A)), m(M);
  }, Oe = (z, M) => S(
    T.spend,
    [],
    y,
    (C) => M ? C.map((A) => A.id === M ? { ...A, ...z, editedAt: Date.now(), editedBy: s } : A) : [...C, { id: lt(), by: s, createdAt: Date.now(), ...z }]
  ), Ue = (z) => S(T.spend, [], y, (M) => M.filter((C) => C.id !== z)), Ke = async ({ text: z, urls: M, photos: C }, A) => {
    for (let R of C.filter((X) => X.data)) {
      if (!await St(Vt(R.id), R.data)) return !1;
      st.set(R.id, R.data);
    }
    let P = C.map((R) => R.id), G = [], $ = await S(T.board, [], g, (R) => A ? R.map((X) => X.id !== A ? X : (G = (X.photos || []).filter((qe) => !P.includes(qe)), { ...X, text: z, urls: M, photos: P, editedAt: Date.now() })) : [{ id: lt(), by: s, createdAt: Date.now(), text: z, urls: M, photos: P, likes: [], comments: [] }, ...R]);
    return $ && G.forEach(we), $;
  }, He = async (z) => {
    let M = [];
    await S(T.board, [], g, (A) => (M = A.find((P) => P.id === z)?.photos || [], A.filter((P) => P.id !== z))) && M.forEach(we);
  }, Ye = (z) => S(
    T.board,
    [],
    g,
    (M) => M.map((C) => {
      if (C.id !== z) return C;
      let A = C.likes || [];
      return { ...C, likes: A.includes(s) ? A.filter((P) => P !== s) : [...A, s] };
    })
  ), Je = (z, M) => S(
    T.board,
    [],
    g,
    (C) => C.map(
      (A) => A.id === z ? { ...A, comments: [...A.comments || [], { id: lt(), by: s, text: M, createdAt: Date.now() }] } : A
    )
  ), Xe = (z, M) => S(
    T.board,
    [],
    g,
    (C) => C.map((A) => A.id === z ? { ...A, comments: (A.comments || []).filter((P) => P.id !== M) } : A)
  ), vt;
  if (!t)
    vt = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!a || k)
    vt = /* @__PURE__ */ e(Ja, { initial: a, onSave: H, onCancel: a ? () => F(!1) : null });
  else if (!s || !a.members.includes(s))
    vt = /* @__PURE__ */ e(qa, { members: a.members, onPick: _ });
  else {
    let z = et(a.start, 0), M = et(a.start, a.days - 1), C = Math.round((pt(a.start) - pt(tt(/* @__PURE__ */ new Date()))) / 864e5), A = Math.round((pt(tt(/* @__PURE__ */ new Date())) - pt(a.start)) / 864e5), P = A >= 0 && A < a.days ? A : i, G = L ? { ...a, rate: L.rate, fx: L } : a;
    vt = /* @__PURE__ */ o(it, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head", children: [
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => w(null), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(V, { name: s, members: a.members, size: 24 }),
            s
          ] }),
          /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => F(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(pa, { size: 20 }) })
        ] }),
        /* @__PURE__ */ e("h1", { children: a.title }),
        /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
          /* @__PURE__ */ o("span", { children: [
            z.getMonth() + 1,
            "월 ",
            z.getDate(),
            "일 – ",
            M.getMonth() + 1,
            "월 ",
            M.getDate(),
            "일"
          ] }),
          C > 0 && /* @__PURE__ */ o("span", { className: "jt-dday", children: [
            "출발까지 ",
            C,
            "일"
          ] }),
          C === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
        ] })
      ] }),
      E && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        E,
        /* @__PURE__ */ e("button", { onClick: () => K(""), "aria-label": "닫기", children: /* @__PURE__ */ e(bt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        b === "plan" && /* @__PURE__ */ e(
          on,
          {
            settings: G,
            schedule: l,
            day: i,
            setDay: m,
            onAdd: () => I({ type: "plan", day: i }),
            onEdit: ($) => I({ type: "plan", item: $, day: $.day })
          }
        ),
        b === "wish" && /* @__PURE__ */ e(
          ln,
          {
            settings: G,
            wish: x,
            me: s,
            onAdd: () => I({ type: "wish" }),
            onSave: Q,
            onLike: Be,
            onPlan: ($) => I({ type: "toPlan", wish: $ }),
            onDelete: Le
          }
        ),
        b === "spend" && /* @__PURE__ */ e(
          dn,
          {
            settings: G,
            spend: f,
            me: s,
            onEdit: ($) => I({ type: "spend", item: $ })
          }
        ),
        b === "board" && /* @__PURE__ */ e(
          un,
          {
            settings: G,
            board: d,
            me: s,
            onEdit: ($) => I({ type: "post", item: $ }),
            onLike: Ye,
            onComment: Je,
            onDelComment: Xe
          }
        )
      ] }),
      (() => {
        let $ = {
          plan: [`${i + 1}일차 일정 추가`, () => I({ type: "plan", day: i })],
          wish: ["가고 싶은 곳 추가", () => I({ type: "wish" })],
          spend: ["경비 추가", () => I({ type: "spend" })],
          board: ["글쓰기", () => I({ type: "post" })]
        }[b];
        return /* @__PURE__ */ o("button", { className: "jt-fab", onClick: $[1], children: [
          /* @__PURE__ */ e(sa, { size: 20, strokeWidth: 2.6 }),
          $[0]
        ] });
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", ca],
        ["wish", "가고 싶은 곳", $t],
        ["spend", "경비", da],
        ["board", "게시판", Ae]
      ].map(([$, R, X]) => /* @__PURE__ */ o("button", { className: b === $ ? "on" : "", onClick: () => p($), "aria-current": b === $, children: [
        /* @__PURE__ */ e("span", { className: "jt-nav-ic", children: /* @__PURE__ */ e(X, { size: 21 }) }),
        R
      ] }, $)) }),
      h?.type === "plan" && /* @__PURE__ */ e(Nt, { title: h.item ? "일정 수정" : `${h.day + 1}일차 일정 추가`, onClose: D, children: /* @__PURE__ */ e(
        Ga,
        {
          initial: h.item,
          dayItems: l.filter(($) => $.day === h.day && $.id !== h.item?.id),
          onSave: ($) => {
            O($, h.item?.id, h.day), D();
          },
          onDelete: () => {
            dt(h.item.id), D();
          }
        }
      ) }),
      h?.type === "wish" && /* @__PURE__ */ e(Nt, { title: "가고 싶은 곳 추가", onClose: D, children: /* @__PURE__ */ e(
        Qa,
        {
          onSave: ($) => {
            Q($), D();
          }
        }
      ) }),
      h?.type === "spend" && /* @__PURE__ */ e(Nt, { title: h.item ? "경비 수정" : "경비 기록", onClose: D, children: /* @__PURE__ */ e(
        Za,
        {
          settings: G,
          me: s,
          defaultDay: P,
          initial: h.item,
          onSave: ($) => {
            Oe($, h.item?.id), D();
          },
          onDelete: () => {
            Ue(h.item.id), D();
          }
        }
      ) }),
      h?.type === "post" && /* @__PURE__ */ e(Nt, { title: h.item ? "글 수정" : "새 글", onClose: D, children: /* @__PURE__ */ e(
        Va,
        {
          initial: h.item,
          onSave: async ($) => {
            let R = await Ke($, h.item?.id);
            return R && D(), R;
          },
          onDelete: () => {
            He(h.item.id), D();
          }
        }
      ) }),
      h?.type === "toPlan" && /* @__PURE__ */ e(Nt, { title: `"${h.wish.name}" 몇째 날에 갈까요?`, onClose: D, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: a.days }, ($, R) => {
        let X = et(a.start, R);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": U[R % U.length] },
            onClick: () => {
              We(h.wish, R), D(), p("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: R + 1 }),
              R + 1,
              "일차 ",
              zt(X),
              " (",
              Ct(X),
              ")"
            ]
          },
          R
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: oe }),
    vt
  ] });
}
var oe = `
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
.jt-seg button{background:none;border:0;padding:8px;border-radius:8px;font-weight:700;color:var(--muted)}
.jt-seg button.on{background:#fff;color:var(--ink)}
.jt-listhint{margin:-4px 0 12px}
.jt-group{margin-bottom:16px}
.jt-group h4{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;margin-bottom:8px}
.jt-pip{width:12px;height:12px;border-radius:50%;background:var(--lc)}
.jt-spend{width:100%;text-align:left;background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px}
.jt-spend:active{background:#F8F9FB}
.jt-spend-main{min-width:0;flex:1}
.jt-spend-title{font-weight:700;display:flex;align-items:center;gap:8px;min-width:0}
.jt-spend-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
