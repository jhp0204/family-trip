] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ t("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: Dt(I) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Yt(I, c),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        it(p.share[n] || 0)
      ] }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: Ce(e) }),
      /* @__PURE__ */ t("div", { className: "jt-catbar", "aria-hidden": "true", children: k.map(({ c: m, v: l }) => /* @__PURE__ */ t("i", { style: { flexGrow: l, background: ta(m).color } }, m)) }),
      /* @__PURE__ */ t("ul", { className: "jt-catlegend", children: k.map(({ c: m, v: l }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("span", { className: "jt-dot", style: { background: ta(m).color } }),
        m,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(l / I * 100),
          "%"
        ] })
      ] }, m)) })
    ] }),
    p.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        p.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ t("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ t("ul", { children: p.skipped.map((m) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => i(m), children: [
        /* @__PURE__ */ o("span", { children: [
          m.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            m.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ t("b", { children: Dt(Number(m.amount) || 0) })
      ] }) }, m.id)) })
    ] }),
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([m, l]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": E === m, className: E === m ? "on" : "", onClick: () => u(m), children: l }, m)) }),
    E === "me" && /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (we(v) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ t(pt, { name: n, members: d, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ t("strong", { children: v > 0.5 ? `${it(v)} 받으면 돼요` : v < -0.5 ? `${it(-v)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        M.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-moves", children: M.map((m, l) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("span", { children: m.from === n ? /* @__PURE__ */ o(st, { children: [
            /* @__PURE__ */ t("b", { children: m.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(st, { children: [
            /* @__PURE__ */ t("b", { children: m.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ t("strong", { children: Dt(m.v) }),
            /* @__PURE__ */ t("em", { children: Yt(m.v, c) })
          ] })
        ] }, l)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ t("b", { children: it(p.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 쓴 돈" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              it(p.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ t("span", { children: v > 0.5 ? "더 결제했으니 받을 돈" : v < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ t("b", { className: we(v), children: v > 0.5 ? it(v) : v < -0.5 ? it(-v) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ t("ul", { className: "jt-daynet", children: w.map((m) => {
        let l = ft(r, m.day), A = m.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": q[m.day % q.length] }, children: [
          /* @__PURE__ */ t("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            m.day + 1,
            "일차 ",
            $t(l),
            " (",
            Mt(l),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            it(m.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            it(m.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ t("b", { className: "jt-net " + we(A), children: sn(A) })
        ] }, m.day);
      }) }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "나와 관련된 경비" }),
      /* @__PURE__ */ t(
        rn,
        {
          days: w,
          start: r,
          members: d,
          rate: c,
          onEdit: i,
          filter: (m) => m.payer === n || (m.split || []).includes(n),
          empty: "나와 관련된 경비가 아직 없어요."
        }
      ),
      /* @__PURE__ */ t("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    E === "day" && /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      w.map((m) => {
        let l = ft(r, m.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": q[m.day % q.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ o("span", { className: "jt-daychip", children: [
              m.day + 1,
              "일차"
            ] }),
            $t(l),
            " (",
            Mt(l),
            ")",
            /* @__PURE__ */ t("span", { className: "jt-group-sum", children: it(m.sum) })
          ] }),
          /* @__PURE__ */ t(on, { moves: m.res.moves, rate: c, me: n }),
          /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: m.items.map((A) => /* @__PURE__ */ t(En, { e: A, members: d, rate: c, onEdit: i }, A.id)) })
        ] }, m.day);
      })
    ] }),
    E === "all" && /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ t("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ t(on, { moves: p.moves, rate: c, me: n }),
        /* @__PURE__ */ t("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "전체 경비" }),
      /* @__PURE__ */ t(rn, { days: w, start: r, members: d, rate: c, onEdit: i, empty: "기록된 경비가 없어요." }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ t("ul", { className: "jt-people card", children: d.map((m) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(pt, { name: m, members: d, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ t("strong", { children: m }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            it(p.paid[m]),
            ", 쓴 돈 ",
            it(p.share[m])
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "jt-net " + we(p.net[m]), children: sn(p.net[m]) })
      ] }, m)) })
    ] })
  ] });
}
function da({ id: e, data: a, className: n, onClick: i, alt: s = "사진" }) {
  let [g, d] = j(a || zt.get(e) || null), [c, r] = j(!1);
  K(() => {
    if (a) {
      d(a);
      return;
    }
    if (zt.has(e)) {
      d(zt.get(e));
      return;
    }
    let N = !0;
    return r(!1), ei(e).then((E) => {
      N && (E ? d(E) : r(!0));
    }), () => {
      N = !1;
    };
  }, [e, a]);
  let x = g ? /* @__PURE__ */ t("img", { src: g, alt: s, draggable: !1 }) : /* @__PURE__ */ t("span", { className: "jt-photo-wait", children: c ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return i ? /* @__PURE__ */ t("button", { type: "button", className: "jt-photo " + (n || ""), onClick: i, "aria-label": "사진 크게 보기", children: x }) : /* @__PURE__ */ t("span", { className: "jt-photo " + (n || ""), children: x });
}
function Ui({ photos: e, index: a, onClose: n }) {
  let [i, s] = j(a), g = e.length;
  return K(() => {
    let d = (c) => {
      c.key === "Escape" && n(), c.key === "ArrowRight" && s((r) => (r + 1) % g), c.key === "ArrowLeft" && s((r) => (r - 1 + g) % g);
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [g, n]), /* @__PURE__ */ o("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: n, children: [
    /* @__PURE__ */ t("button", { className: "jt-lb-close", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ t(Gt, { size: 24 }) }),
    /* @__PURE__ */ t("div", { className: "jt-lb-stage", onClick: (d) => d.stopPropagation(), children: /* @__PURE__ */ t(da, { id: e[i], className: "contain" }) }),
    g > 1 && /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (d) => {
            d.stopPropagation(), s((i - 1 + g) % g);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ t(dn, { size: 26 })
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (d) => {
            d.stopPropagation(), s((i + 1) % g);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ t(mn, { size: 26 })
        }
      ),
      /* @__PURE__ */ o("div", { className: "jt-lb-count", children: [
        i + 1,
        " / ",
        g
      ] })
    ] })
  ] });
}
function Ki({ text: e }) {
  let a = e.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ t("p", { className: "jt-post-text", children: a.map(
    (n, i) => i % 2 ? /* @__PURE__ */ t("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, i) : n
  ) });
}
function An({ url: e, onRemove: a }) {
  let n = /* @__PURE__ */ o(st, { children: [
    /* @__PURE__ */ t("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ t(wo, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ t("strong", { children: Xo(e) }),
      /* @__PURE__ */ t("span", { children: e })
    ] })
  ] });
  return a ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ t(Gt, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: e, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ t(Bt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function Wi({ initial: e, onSave: a, onDelete: n }) {
  let [i, s] = j(e?.text || ""), [g, d] = j(e?.urls || []), [c, r] = j(""), [x, N] = j(() => (e?.photos || []).map((l) => ({ id: l }))), [E, u] = j(!1), [I, p] = j(""), k = J(null), w = () => {
    if (!c.trim()) return;
    let l = Ka(c);
    if (!l) {
      p("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    g.includes(l) || d([...g, l]), r(""), p("");
  }, v = async (l) => {
    let A = Array.from(l || []).filter((B) => B.type.startsWith("image/"));
    if (!A.length) return;
    let z = ne - x.length;
    if (z <= 0) {
      p(`사진은 글 하나에 ${ne}장까지 올릴 수 있어요.`);
      return;
    }
    u(!0), p("사진 준비 중");
    let C = [], f = 0;
    for (let B of A.slice(0, z))
      try {
        C.push({ id: yt(), data: await ni(B) });
      } catch {
        f++;
      }
    N((B) => [...B, ...C]), u(!1), f ? p(`${f}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : A.length > z ? p(`${ne}장까지만 넣었어요.`) : p(""), k.current && (k.current.value = "");
  }, M = async () => {
    let l = g;
    if (c.trim()) {
      let z = Ka(c);
      if (!z) {
        p("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      l.includes(z) || (l = [...l, z]);
    }
    u(!0), p(x.some((z) => z.data) ? "사진 올리는 중" : ""), await a({ text: i.trim(), urls: l, photos: x }) || (u(!1), p("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, m = !E && (i.trim() || g.length || c.trim() || x.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(
      "textarea",
      {
        rows: 4,
        value: i,
        onChange: (l) => s(l.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    x.length > 0 && /* @__PURE__ */ t("div", { className: "jt-thumbs", children: x.map((l) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ t(da, { id: l.id, data: l.data }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => N(x.filter((A) => A.id !== l.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ t(Gt, { size: 14 })
        }
      )
    ] }, l.id)) }),
    /* @__PURE__ */ t(
      "input",
      {
        ref: k,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (l) => v(l.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => k.current && k.current.click(),
        disabled: E || x.length >= ne,
        children: [
          /* @__PURE__ */ t(vo, { size: 17 }),
          "사진 추가 (",
          x.length,
          "/",
          ne,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "링크 (선택)" }),
      g.map((l) => /* @__PURE__ */ t(An, { url: l, onRemove: () => d(g.filter((A) => A !== l)) }, l)),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: c,
            onChange: (l) => r(l.target.value),
            onKeyDown: (l) => l.key === "Enter" && w(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: w, children: "추가" })
      ] })
    ] }),
    I && /* @__PURE__ */ t("p", { className: "jt-hint jt-formmsg", role: "status", children: I }),
    /* @__PURE__ */ t("button", { className: "jt-primary", disabled: !m, onClick: M, children: E ? "잠시만요" : e ? "수정 저장" : "올리기" }),
    e && /* @__PURE__ */ t(St, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
function Hi({ post: e, me: a, members: n, onEdit: i, onLike: s, onComment: g, onDelComment: d, onOpenPhoto: c }) {
  let [r, x] = j(!1), N = e.photos || [], E = e.urls || [], u = e.comments || [], I = N.slice(0, 4);
  return /* @__PURE__ */ o("li", { className: "jt-post", children: [
    /* @__PURE__ */ o("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ t(pt, { name: e.by, members: n, size: 34 }),
      /* @__PURE__ */ o("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ t("strong", { children: e.by }),
        /* @__PURE__ */ o("span", { children: [
          ke(e.createdAt),
          e.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      e.by === a && /* @__PURE__ */ t("button", { className: "jt-icon sm", onClick: () => i(e), "aria-label": "내 글 고치기", children: /* @__PURE__ */ t(Xt, { size: 17 }) })
    ] }),
    e.text && /* @__PURE__ */ t(Ki, { text: e.text }),
    N.length > 0 && /* @__PURE__ */ t("div", { className: "jt-gallery n" + Math.min(N.length, 4), children: I.map((p, k) => /* @__PURE__ */ o("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ t(da, { id: p, onClick: () => c(N, k) }),
      k === 3 && N.length > 4 && /* @__PURE__ */ o("span", { className: "jt-more", children: [
        "+",
        N.length - 4
      ] })
    ] }, p)) }),
    E.length > 0 && /* @__PURE__ */ t("div", { className: "jt-links", children: E.map((p) => /* @__PURE__ */ t(An, { url: p }, p)) }),
    /* @__PURE__ */ o("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ t(Ee, { item: e, me: a, members: n, onReact: (p) => s(e.id, p) }),
      /* @__PURE__ */ t(ca, { count: u.length, open: r, onClick: () => x(!r) })
    ] }),
    r && /* @__PURE__ */ t(
      Ae,
      {
        comments: u,
        me: a,
        members: n,
        onAdd: (p) => g(e.id, p),
        onDelete: (p) => d(e.id, p)
      }
    )
  ] });
}
function Yi({ settings: e, board: a, me: n, ...i }) {
  let [s, g] = j(null), d = [...a].sort((c, r) => r.createdAt - c.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    d.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ t("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ t("ul", { className: "jt-posts", children: d.map((c) => /* @__PURE__ */ t(
      Hi,
      {
        post: c,
        me: n,
        members: e.members,
        onOpenPhoto: (r, x) => g({ photos: r, index: x }),
        ...i
      },
      c.id
    )) }),
    s && /* @__PURE__ */ t(Ui, { photos: s.photos, index: s.index, onClose: () => g(null) })
  ] });
}
var qe = "trip:loc:", Ji = 3 * 6e4, Gi = (e, a) => q[(Math.max(0, e.indexOf(a)) * 2 + 3) % q.length], Xi = (e) => !!e && e.online && typeof e.lat == "number" && Date.now() - e.at < Ji, Mn = (e) => `https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`;
function Vi({ settings: e, me: a, locs: n, shareOn: i, onToggle: s, myPos: g, geoErr: d }) {
  let [c, r] = j(!1), [, x] = j(0);
  K(() => {
    let z = setInterval(() => x((C) => C + 1), 3e4);
    return () => clearInterval(z);
  }, []);
  let N = e.members, E = N.map((z) => ({ m: z, l: n[z], live: Xi(n[z]) })), u = E.filter((z) => z.live).map((z) => ({ id: z.m, lat: z.l.lat, lng: z.l.lng, color: Gi(N, z.m), label: z.m, text: z.m[0] })), I = u.map((z) => `${z.id}:${z.lat.toFixed(5)}:${z.lng.toFixed(5)}`).join("|"), p = le(() => u, [I]), [k, w] = j(null), [v, M] = j(() => {
    let z = u[0] || g;
    return z ? { lat: z.lat, lng: z.lng, z: 14 } : { lat: xt.lat, lng: xt.lng, z: 12 };
  }), m = () => {
    if (!u.length) return;
    let z = u.reduce((B, D) => B + D.lat, 0) / u.length, C = u.reduce((B, D) => B + D.lng, 0) / u.length, f = Math.max(...u.map((B) => Jt({ lat: z, lng: C }, B)));
    M({ lat: z, lng: C, z: f < 300 ? 16 : f < 1e3 ? 15 : f < 3e3 ? 13 : f < 1e4 ? 12 : 10 }), w(null);
  }, l = J(!1);
  K(() => {
    !l.current && u.length && (l.current = !0, m());
  }, [I]);
  let A = E.filter((z) => z.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ t("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ t("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => r(!0), children: [
          /* @__PURE__ */ t(Co, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ t("i", {}) })
    ] }),
    i && d && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-share-err", children: d }),
    /* @__PURE__ */ t(
      Cn,
      {
        gkey: e.gmapsKey,
        view: v,
        setView: M,
        pins: p,
        temp: null,
        selectedId: k,
        onTap: () => w(null),
        onPinTap: (z) => w(z),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ t("b", { children: A }),
        "/",
        N.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: m, disabled: !A, children: [
        /* @__PURE__ */ t(No, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "jt-fam-list", children: E.map(({ m: z, l: C, live: f }) => {
      let B = z === a, D = f && g && !B ? Jt(g, C) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (f ? " live" : "") + (k === z ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !f,
            onClick: () => {
              w(z), M({ lat: C.lat, lng: C.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ t(pt, { name: z, members: N, size: 34 }),
                f && /* @__PURE__ */ t("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  z,
                  B ? " (나)" : ""
                ] }),
                /* @__PURE__ */ t("span", { children: f ? `위치 공유 중, ${ke(C.at)}${D != null ? `, 나와 ${zn(D)}` : ""}` : C && C.at ? `앱 꺼짐, 마지막 접속 ${ke(C.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        f && !B && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mn(C), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(At, { size: 13 }),
          "길 찾기"
        ] })
      ] }, z);
    }) }),
    c && /* @__PURE__ */ o(Nt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => r(!1), children: [
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
      /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: () => r(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ t("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var Sn = "trip:chat:", Ze = "trip:read:", Qe = (e) => Sn + e.at.toString(36).padStart(10, "0") + "-" + e.id, qi = (e) => {
  let a = new Date(e);
  return `${ot(a.getHours())}:${ot(a.getMinutes())}`;
}, Zi = (e) => {
  let a = new Date(e);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${Mt(a)})`;
};
function ln(e) {
  return e.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ t("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function Qi({ settings: e, me: a, msgs: n, reads: i, notice: s, onSend: g, onDelete: d, onEdit: c, onPin: r, onUnpin: x, onSendLoc: N, badgeAsk: E, onBadgeAsk: u }) {
  let I = e.members, [p, k] = j(""), [w, v] = j(null), [M, m] = j(!1), [l, A] = j(null), [z, C] = j(""), [f, B] = j(!1), [D, y] = j(null), L = s ? n.find(($) => $.id === s.id) : null, S = s ? { ...s, ...L ? { text: L.text, kind: L.kind, lat: L.lat, lng: L.lng } : {} } : null, W = ($) => {
    let nt = document.getElementById("msg-" + $);
    nt && (nt.scrollIntoView({ block: "center", behavior: "smooth" }), y($), setTimeout(() => y(null), 1600));
  }, G = ($) => {
    A($.id), C($.text), v(null);
  }, R = ($) => {
    let nt = z.trim();
    nt && (nt !== $.text && c($, nt), A(null));
  }, h = J(null), H = J(!0), lt = n.length;
  K(() => {
    let $ = n[lt - 1], nt = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (H.current || nt || $ && $.by === a) && h.current && h.current.scrollIntoView({ block: "end", behavior: H.current ? "auto" : "smooth" }), H.current = !1;
  }, [lt]);
  let Z = () => {
    let $ = p.trim();
    $ && (g($), k(""));
  }, de = async () => {
    m(!0), await N(), m(!1);
  }, me = "", _t = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    lt === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ t("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    S && /* @__PURE__ */ o("div", { className: "jt-notice" + (f ? " open" : ""), children: [
      /* @__PURE__ */ o("button", { type: "button", className: "jt-notice-head", onClick: () => B(!f), "aria-expanded": f, children: [
        /* @__PURE__ */ t(fn, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-text", children: S.kind === "loc" ? `${S.by}의 위치` : S.text }),
        /* @__PURE__ */ t(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      f && /* @__PURE__ */ o("div", { className: "jt-notice-body", children: [
        S.kind === "loc" ? /* @__PURE__ */ o("p", { children: [
          S.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ t("a", { href: Rt({ lat: S.lat, lng: S.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ t("p", { className: "jt-msg-text", children: ln(S.text) }),
        /* @__PURE__ */ o("span", { className: "jt-notice-meta", children: [
          S.by,
          "의 메시지, ",
          S.pinnedBy,
          "이(가) 공지로 등록",
          L ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-notice-act", children: [
          L && /* @__PURE__ */ t("button", { type: "button", className: "jt-like", onClick: () => W(S.id), children: "메시지로 이동" }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                x(), B(!1);
              },
              children: [
                /* @__PURE__ */ t(_a, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    E && /* @__PURE__ */ o("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ t("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: u, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: n.map(($) => {
      let nt = Zi($.at), qt = nt !== me, ut = $.by === a, Zt = !qt && _t && _t.by === $.by && $.at - _t.at < 5 * 6e4;
      return me = nt, _t = $, /* @__PURE__ */ o(mo.Fragment, { children: [
        qt && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": nt, children: /* @__PURE__ */ t("span", { children: nt }) }),
        /* @__PURE__ */ o(
          "li",
          {
            id: "msg-" + $.id,
            className: "jt-msg" + (ut ? " mine" : "") + (Zt ? " cont" : "") + (D === $.id ? " flash" : ""),
