}, [n]), w = le(() => {
    let d = {};
    return n.forEach((l) => (d[l.day] = d[l.day] || []).push(l)), Object.keys(d).map(Number).sort((l, S) => l - S).map((l) => ({
      day: l,
      sum: d[l].reduce((S, E) => S + (Number(E.amount) || 0), 0),
      items: [...d[l]].sort((S, E) => E.createdAt - S.createdAt),
      res: Xn(d[l], u)
    }));
  }, [n, u]), y = g.net[o] || 0, C = g.moves.filter((d) => d.from === o || d.to === o);
  return n.length === 0 ? /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: Pt(0) }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: Ce(e) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ t("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: Pt(I) }),
      /* @__PURE__ */ a("em", { children: [
        "약 ",
        Yt(I, p),
        ", 그중 ",
        o,
        "가 쓴 돈 ",
        it(g.share[o] || 0)
      ] }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: Ce(e) }),
      /* @__PURE__ */ t("div", { className: "jt-catbar", "aria-hidden": "true", children: A.map(({ c: d, v: l }) => /* @__PURE__ */ t("i", { style: { flexGrow: l, background: Qe(d).color } }, d)) }),
      /* @__PURE__ */ t("ul", { className: "jt-catlegend", children: A.map(({ c: d, v: l }) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("span", { className: "jt-dot", style: { background: Qe(d).color } }),
        d,
        " ",
        /* @__PURE__ */ a("b", { children: [
          Math.round(l / I * 100),
          "%"
        ] })
      ] }, d)) })
    ] }),
    g.skipped.length > 0 && /* @__PURE__ */ a("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ a("strong", { children: [
        "정산에서 빠진 경비가 ",
        g.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ t("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ t("ul", { children: g.skipped.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => i(d), children: [
        /* @__PURE__ */ a("span", { children: [
          d.title,
          " ",
          /* @__PURE__ */ a("em", { children: [
            "(",
            d.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ t("b", { children: Pt(Number(d.amount) || 0) })
      ] }) }, d.id)) })
    ] }),
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([d, l]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": z === d, className: z === d ? "on" : "", onClick: () => c(d), children: l }, d)) }),
    z === "me" && /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ a("div", { className: "jt-mybal " + (we(y) || "even"), children: [
        /* @__PURE__ */ a("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ t(pt, { name: o, members: u, size: 32 }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a("span", { children: [
              "여행 전체 기준, ",
              o,
              "는"
            ] }),
            /* @__PURE__ */ t("strong", { children: y > 0.5 ? `${it(y)} 받으면 돼요` : y < -0.5 ? `${it(-y)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        C.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-moves", children: C.map((d, l) => /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ t("span", { children: d.from === o ? /* @__PURE__ */ a(st, { children: [
            /* @__PURE__ */ t("b", { children: d.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ a(st, { children: [
            /* @__PURE__ */ t("b", { children: d.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ t("strong", { children: Pt(d.v) }),
            /* @__PURE__ */ t("em", { children: Yt(d.v, p) })
          ] })
        ] }, l)) }),
        /* @__PURE__ */ a("div", { className: "jt-calc", children: [
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ t("b", { children: it(g.paid[o] || 0) })
          ] }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 쓴 돈" }),
            /* @__PURE__ */ a("b", { children: [
              "− ",
              it(g.share[o] || 0)
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "sum", children: [
            /* @__PURE__ */ t("span", { children: y > 0.5 ? "더 결제했으니 받을 돈" : y < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ t("b", { className: we(y), children: y > 0.5 ? it(y) : y < -0.5 ? it(-y) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ t("ul", { className: "jt-daynet", children: w.map((d) => {
        let l = ft(r, d.day), S = d.res.net[o] || 0;
        return /* @__PURE__ */ a("li", { style: { "--lc": V[d.day % V.length] }, children: [
          /* @__PURE__ */ t("span", { className: "jt-pip" }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-label", children: [
            d.day + 1,
            "일차 ",
            Rt(l),
            " (",
            St(l),
            ")"
          ] }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            it(d.res.paid[o] || 0),
            ", 내가 쓴 돈 ",
            it(d.res.share[o] || 0)
          ] }),
          /* @__PURE__ */ t("b", { className: "jt-net " + we(S), children: sa(S) })
        ] }, d.day);
      }) }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "나와 관련된 경비" }),
      /* @__PURE__ */ t(
        ra,
        {
          days: w,
          start: r,
          members: u,
          rate: p,
          onEdit: i,
          filter: (d) => d.payer === o || (d.split || []).includes(o),
          empty: "나와 관련된 경비가 아직 없어요."
        }
      ),
      /* @__PURE__ */ t("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    z === "day" && /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      w.map((d) => {
        let l = ft(r, d.day);
        return /* @__PURE__ */ a("div", { className: "jt-daycard", style: { "--lc": V[d.day % V.length] }, children: [
          /* @__PURE__ */ a("h4", { children: [
            /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
              d.day + 1,
              "일차"
            ] }),
            Rt(l),
            " (",
            St(l),
            ")",
            /* @__PURE__ */ t("span", { className: "jt-group-sum", children: it(d.sum) })
          ] }),
          /* @__PURE__ */ t(ia, { moves: d.res.moves, rate: p, me: o }),
          /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: d.items.map((S) => /* @__PURE__ */ t(Aa, { e: S, members: u, rate: p, onEdit: i }, S.id)) })
        ] }, d.day);
      })
    ] }),
    z === "all" && /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ a("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ t("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ t(ia, { moves: g.moves, rate: p, me: o }),
        /* @__PURE__ */ t("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "전체 경비" }),
      /* @__PURE__ */ t(ra, { days: w, start: r, members: u, rate: p, onEdit: i, empty: "기록된 경비가 없어요." }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ t("ul", { className: "jt-people card", children: u.map((d) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t(pt, { name: d, members: u, size: 28 }),
        /* @__PURE__ */ a("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ t("strong", { children: d }),
          /* @__PURE__ */ a("span", { children: [
            "결제 ",
            it(g.paid[d]),
            ", 쓴 돈 ",
            it(g.share[d])
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "jt-net " + we(g.net[d]), children: sa(g.net[d]) })
      ] }, d)) })
    ] })
  ] });
}
function mn({ id: e, data: n, className: o, onClick: i, alt: s = "사진" }) {
  let [m, u] = j(n || zt.get(e) || null), [p, r] = j(!1);
  K(() => {
    if (n) {
      u(n);
      return;
    }
    if (zt.has(e)) {
      u(zt.get(e));
      return;
    }
    let k = !0;
    return r(!1), ni(e).then((z) => {
      k && (z ? u(z) : r(!0));
    }), () => {
      k = !1;
    };
  }, [e, n]);
  let x = m ? /* @__PURE__ */ t("img", { src: m, alt: s, draggable: !1 }) : /* @__PURE__ */ t("span", { className: "jt-photo-wait", children: p ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return i ? /* @__PURE__ */ t("button", { type: "button", className: "jt-photo " + (o || ""), onClick: i, "aria-label": "사진 크게 보기", children: x }) : /* @__PURE__ */ t("span", { className: "jt-photo " + (o || ""), children: x });
}
function Wi({ photos: e, index: n, onClose: o }) {
  let [i, s] = j(n), m = e.length;
  return K(() => {
    let u = (p) => {
      p.key === "Escape" && o(), p.key === "ArrowRight" && s((r) => (r + 1) % m), p.key === "ArrowLeft" && s((r) => (r - 1 + m) % m);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [m, o]), /* @__PURE__ */ a("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: o, children: [
    /* @__PURE__ */ t("button", { className: "jt-lb-close", onClick: o, "aria-label": "닫기", children: /* @__PURE__ */ t(Gt, { size: 24 }) }),
    /* @__PURE__ */ t("div", { className: "jt-lb-stage", onClick: (u) => u.stopPropagation(), children: /* @__PURE__ */ t(mn, { id: e[i], className: "contain" }) }),
    m > 1 && /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (u) => {
            u.stopPropagation(), s((i - 1 + m) % m);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ t(da, { size: 26 })
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (u) => {
            u.stopPropagation(), s((i + 1) % m);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ t(ma, { size: 26 })
        }
      ),
      /* @__PURE__ */ a("div", { className: "jt-lb-count", children: [
        i + 1,
        " / ",
        m
      ] })
    ] })
  ] });
}
function Hi({ text: e }) {
  let n = e.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ t("p", { className: "jt-post-text", children: n.map(
    (o, i) => i % 2 ? /* @__PURE__ */ t("a", { href: o, target: "_blank", rel: "noopener noreferrer", children: o }, i) : o
  ) });
}
function Sa({ url: e, onRemove: n }) {
  let o = /* @__PURE__ */ a(st, { children: [
    /* @__PURE__ */ t("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ t(ko, { size: 16 }) }),
    /* @__PURE__ */ a("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ t("strong", { children: qo(e) }),
      /* @__PURE__ */ t("span", { children: e })
    ] })
  ] });
  return n ? /* @__PURE__ */ a("div", { className: "jt-linkcard", children: [
    o,
    /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm", onClick: n, "aria-label": "링크 빼기", children: /* @__PURE__ */ t(Gt, { size: 16 }) })
  ] }) : /* @__PURE__ */ a("a", { className: "jt-linkcard", href: e, target: "_blank", rel: "noopener noreferrer", children: [
    o,
    /* @__PURE__ */ t(Bt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function Yi({ initial: e, onSave: n, onDelete: o }) {
  let [i, s] = j(e?.text || ""), [m, u] = j(e?.urls || []), [p, r] = j(""), [x, k] = j(() => (e?.photos || []).map((l) => ({ id: l }))), [z, c] = j(!1), [I, g] = j(""), A = J(null), w = () => {
    if (!p.trim()) return;
    let l = Wn(p);
    if (!l) {
      g("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    m.includes(l) || u([...m, l]), r(""), g("");
  }, y = async (l) => {
    let S = Array.from(l || []).filter((B) => B.type.startsWith("image/"));
    if (!S.length) return;
    let E = ae - x.length;
    if (E <= 0) {
      g(`사진은 글 하나에 ${ae}장까지 올릴 수 있어요.`);
      return;
    }
    c(!0), g("사진 준비 중");
    let N = [], f = 0;
    for (let B of S.slice(0, E))
      try {
        N.push({ id: yt(), data: await oi(B) });
      } catch {
        f++;
      }
    k((B) => [...B, ...N]), c(!1), f ? g(`${f}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : S.length > E ? g(`${ae}장까지만 넣었어요.`) : g(""), A.current && (A.current.value = "");
  }, C = async () => {
    let l = m;
    if (p.trim()) {
      let E = Wn(p);
      if (!E) {
        g("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      l.includes(E) || (l = [...l, E]);
    }
    c(!0), g(x.some((E) => E.data) ? "사진 올리는 중" : ""), await n({ text: i.trim(), urls: l, photos: x }) || (c(!1), g("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, d = !z && (i.trim() || m.length || p.trim() || x.length);
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
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
    x.length > 0 && /* @__PURE__ */ t("div", { className: "jt-thumbs", children: x.map((l) => /* @__PURE__ */ a("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ t(mn, { id: l.id, data: l.data }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => k(x.filter((S) => S.id !== l.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ t(Gt, { size: 14 })
        }
      )
    ] }, l.id)) }),
    /* @__PURE__ */ t(
      "input",
      {
        ref: A,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (l) => y(l.target.files)
      }
    ),
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => A.current && A.current.click(),
        disabled: z || x.length >= ae,
        children: [
          /* @__PURE__ */ t(wo, { size: 17 }),
          "사진 추가 (",
          x.length,
          "/",
          ae,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "링크 (선택)" }),
      m.map((l) => /* @__PURE__ */ t(Sa, { url: l, onRemove: () => u(m.filter((S) => S !== l)) }, l)),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: p,
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
    /* @__PURE__ */ t("button", { className: "jt-primary", disabled: !d, onClick: C, children: z ? "잠시만요" : e ? "수정 저장" : "올리기" }),
    e && /* @__PURE__ */ t(It, { onConfirm: o, label: "이 글 삭제" })
  ] });
}
function Ji({ post: e, me: n, members: o, onEdit: i, onLike: s, onComment: m, onDelComment: u, onOpenPhoto: p }) {
  let [r, x] = j(!1), k = e.photos || [], z = e.urls || [], c = e.comments || [], I = k.slice(0, 4);
  return /* @__PURE__ */ a("li", { className: "jt-post", children: [
    /* @__PURE__ */ a("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ t(pt, { name: e.by, members: o, size: 34 }),
      /* @__PURE__ */ a("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ t("strong", { children: e.by }),
        /* @__PURE__ */ a("span", { children: [
          ke(e.createdAt),
          e.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      e.by === n && /* @__PURE__ */ t("button", { className: "jt-icon sm", onClick: () => i(e), "aria-label": "내 글 고치기", children: /* @__PURE__ */ t(Xt, { size: 17 }) })
    ] }),
    e.text && /* @__PURE__ */ t(Hi, { text: e.text }),
    k.length > 0 && /* @__PURE__ */ t("div", { className: "jt-gallery n" + Math.min(k.length, 4), children: I.map((g, A) => /* @__PURE__ */ a("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ t(mn, { id: g, onClick: () => p(k, A) }),
      A === 3 && k.length > 4 && /* @__PURE__ */ a("span", { className: "jt-more", children: [
        "+",
        k.length - 4
      ] })
    ] }, g)) }),
    z.length > 0 && /* @__PURE__ */ t("div", { className: "jt-links", children: z.map((g) => /* @__PURE__ */ t(Sa, { url: g }, g)) }),
    /* @__PURE__ */ a("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ t(Ee, { item: e, me: n, members: o, onReact: (g) => s(e.id, g) }),
      /* @__PURE__ */ t(cn, { count: c.length, open: r, onClick: () => x(!r) })
    ] }),
    r && /* @__PURE__ */ t(
      Ae,
      {
        comments: c,
        me: n,
        members: o,
        onAdd: (g) => m(e.id, g),
        onDelete: (g) => u(e.id, g)
      }
    )
  ] });
}
function Gi({ settings: e, board: n, me: o, ...i }) {
  let [s, m] = j(null), u = [...n].sort((p, r) => r.createdAt - p.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    u.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ t("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ t("ul", { className: "jt-posts", children: u.map((p) => /* @__PURE__ */ t(
      Ji,
      {
        post: p,
        me: o,
        members: e.members,
        onOpenPhoto: (r, x) => m({ photos: r, index: x }),
        ...i
      },
      p.id
    )) }),
    s && /* @__PURE__ */ t(Wi, { photos: s.photos, index: s.index, onClose: () => m(null) })
  ] });
}
var qe = "trip:loc:", Xi = 3 * 6e4, qi = (e, n) => V[(Math.max(0, e.indexOf(n)) * 2 + 3) % V.length], Vi = (e) => !!e && e.online && typeof e.lat == "number" && Date.now() - e.at < Xi, Ma = (e) => `https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`;
function Zi({ settings: e, me: n, locs: o, shareOn: i, onToggle: s, myPos: m, geoErr: u }) {
  let [p, r] = j(!1), [, x] = j(0);
  K(() => {
    let E = setInterval(() => x((N) => N + 1), 3e4);
    return () => clearInterval(E);
  }, []);
  let k = e.members, z = k.map((E) => ({ m: E, l: o[E], live: Vi(o[E]) })), c = z.filter((E) => E.live).map((E) => ({ id: E.m, lat: E.l.lat, lng: E.l.lng, color: qi(k, E.m), label: E.m, text: E.m[0] })), I = c.map((E) => `${E.id}:${E.lat.toFixed(5)}:${E.lng.toFixed(5)}`).join("|"), g = le(() => c, [I]), [A, w] = j(null), [y, C] = j(() => {
    let E = c[0] || m;
    return E ? { lat: E.lat, lng: E.lng, z: 14 } : { lat: xt.lat, lng: xt.lng, z: 12 };
  }), d = () => {
    if (!c.length) return;
    let E = c.reduce((B, F) => B + F.lat, 0) / c.length, N = c.reduce((B, F) => B + F.lng, 0) / c.length, f = Math.max(...c.map((B) => Jt({ lat: E, lng: N }, B)));
    C({ lat: E, lng: N, z: f < 300 ? 16 : f < 1e3 ? 15 : f < 3e3 ? 13 : f < 1e4 ? 12 : 10 }), w(null);
  }, l = J(!1);
  K(() => {
    !l.current && c.length && (l.current = !0, d());
  }, [I]);
  let S = z.filter((E) => E.live).length;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ a("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ t("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ t("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ a("button", { type: "button", className: "jt-helpbtn", onClick: () => r(!0), children: [
          /* @__PURE__ */ t(zo, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ t("i", {}) })
    ] }),
    i && u && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-share-err", children: u }),
    /* @__PURE__ */ t(
      Ca,
      {
        gkey: e.gmapsKey,
        view: y,
        setView: C,
        pins: g,
        temp: null,
        selectedId: A,
        onTap: () => w(null),
        onPinTap: (E) => w(E),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ a("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ a("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ t("b", { children: S }),
        "/",
        k.length,
        "명"
      ] }),
      /* @__PURE__ */ a("button", { type: "button", className: "jt-secondary sm", onClick: d, disabled: !S, children: [
        /* @__PURE__ */ t(Co, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "jt-fam-list", children: z.map(({ m: E, l: N, live: f }) => {
      let B = E === n, F = f && m && !B ? Jt(m, N) : null;
      return /* @__PURE__ */ a("li", { className: "jt-fam" + (f ? " live" : "") + (A === E ? " sel" : ""), children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !f,
            onClick: () => {
              w(E), C({ lat: N.lat, lng: N.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ a("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ t(pt, { name: E, members: k, size: 34 }),
                f && /* @__PURE__ */ t("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ a("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ a("strong", { children: [
                  E,
                  B ? " (나)" : ""
                ] }),
                /* @__PURE__ */ t("span", { children: f ? `위치 공유 중, ${ke(N.at)}${F != null ? `, 나와 ${za(F)}` : ""}` : N && N.at ? `앱 꺼짐, 마지막 접속 ${ke(N.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        f && !B && /* @__PURE__ */ a("a", { className: "jt-maplink", href: Ma(N), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(At, { size: 13 }),
          "길 찾기"
        ] })
      ] }, E);
    }) }),
    p && /* @__PURE__ */ a(Nt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => r(!1), children: [
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
      /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: () => r(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ t("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var Ia = "trip:chat:", Ve = "trip:read:", Ze = (e) => Ia + e.at.toString(36).padStart(10, "0") + "-" + e.id, Qi = (e) => {
  let n = new Date(e);
  return `${ot(n.getHours())}:${ot(n.getMinutes())}`;
}, ts = (e) => {
  let n = new Date(e);
  return `${n.getMonth() + 1}월 ${n.getDate()}일 (${St(n)})`;
};
function la(e) {
  return e.split(/(https?:\/\/[^\s]+)/g).map(
    (n, o) => o % 2 ? /* @__PURE__ */ t("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, o) : n
  );
}
function es({ settings: e, me: n, msgs: o, reads: i, notice: s, onSend: m, onDelete: u, onEdit: p, onPin: r, onUnpin: x, onSendLoc: k, badgeAsk: z, onBadgeAsk: c }) {
  let I = e.members, [g, A] = j(""), [w, y] = j(null), [C, d] = j(!1), [l, S] = j(null), [E, N] = j(""), [f, B] = j(!1), [F, v] = j(null), _ = s ? o.find(($) => $.id === s.id) : null, M = s ? { ...s, ..._ ? { text: _.text, kind: _.kind, lat: _.lat, lng: _.lng } : {} } : null, W = ($) => {
    let at = document.getElementById("msg-" + $);
    at && (at.scrollIntoView({ block: "center", behavior: "smooth" }), v($), setTimeout(() => v(null), 1600));
  }, G = ($) => {
    S($.id), N($.text), y(null);
  }, R = ($) => {
    let at = E.trim();
    at && (at !== $.text && p($, at), S(null));
  }, h = J(null), H = J(!0), lt = o.length;
  K(() => {
    let $ = o[lt - 1], at = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (H.current || at || $ && $.by === n) && h.current && h.current.scrollIntoView({ block: "end", behavior: H.current ? "auto" : "smooth" }), H.current = !1;
  }, [lt]);
  let Z = () => {
    let $ = g.trim();
    $ && (m($), A(""));
  }, de = async () => {
    d(!0), await k(), d(!1);
  }, me = "", Lt = null;
  return /* @__PURE__ */ a("section", { className: "jt-chat", children: [
    lt === 0 && /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ t("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    M && /* @__PURE__ */ a("div", { className: "jt-notice" + (f ? " open" : ""), children: [
      /* @__PURE__ */ a("button", { type: "button", className: "jt-notice-head", onClick: () => B(!f), "aria-expanded": f, children: [
        /* @__PURE__ */ t(fa, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-text", children: M.kind === "loc" ? `${M.by}의 위치` : M.text }),
        /* @__PURE__ */ t(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      f && /* @__PURE__ */ a("div", { className: "jt-notice-body", children: [
        M.kind === "loc" ? /* @__PURE__ */ a("p", { children: [
          M.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ t("a", { href: Tt({ lat: M.lat, lng: M.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ t("p", { className: "jt-msg-text", children: la(M.text) }),
        /* @__PURE__ */ a("span", { className: "jt-notice-meta", children: [
          M.by,
          "의 메시지, ",
          M.pinnedBy,
          "이(가) 공지로 등록",
          _ ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-notice-act", children: [
          _ && /* @__PURE__ */ t("button", { type: "button", className: "jt-like", onClick: () => W(M.id), children: "메시지로 이동" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                x(), B(!1);
              },
              children: [
                /* @__PURE__ */ t(On, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    z && /* @__PURE__ */ a("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ t("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: c, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: o.map(($) => {
