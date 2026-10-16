l.day + 1,
            "일차"
          ] }),
          Rt(h),
          " (",
          St(h),
          ")"
        ] }),
        /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: l.items.map((k) => /* @__PURE__ */ e(Ia, { e: k, members: o, rate: i, onEdit: s }, k.id)) })
      ] }, l.day);
    })
  ] }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: u });
}
function Ji({ settings: t, spend: n, me: o, onEdit: i, view: s, setView: m }) {
  let { members: u, rate: p, start: l } = t, [h, k] = y("me"), z = s || h, d = m || k, I = n.reduce((c, r) => c + (Number(r.amount) || 0), 0), g = re(() => ra(n, u, p), [n, u, p]), S = g.unit, j = (c) => ce(c, S), N = n.filter((c) => c.cur !== "KRW").reduce((c, r) => c + (Number(r.amount) || 0), 0), E = n.filter((c) => c.cur === "KRW").reduce((c, r) => c + (Number(r.orig) || 0), 0), C = re(() => {
    let c = {};
    return n.forEach((r) => c[r.cat] = (c[r.cat] || 0) + (Number(r.amount) || 0)), xa.filter((r) => c[r]).map((r) => ({ c: r, v: c[r] }));
  }, [n]), b = re(() => {
    let c = {};
    return n.forEach((r) => (c[r.day] = c[r.day] || []).push(r)), Object.keys(c).map(Number).sort((r, D) => r - D).map((r) => ({
      day: r,
      sum: c[r].reduce((D, _) => D + (Number(_.amount) || 0), 0),
      items: [...c[r]].sort((D, _) => _.createdAt - D.createdAt),
      res: ra(c[r], u, p),
      parts: Yi(c[r])
    }));
  }, [n, u]), M = g.net[o] || 0, A = g.moves.filter((c) => c.from === o || c.to === o);
  return n.length === 0 ? /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: dt(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Ce(t) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: S === "KRW" ? ze(E + N * p / 100) : dt(I) }),
      /* @__PURE__ */ a("em", { children: [
        S === "KRW" ? `엔화 ${ln(N)} + 원화 ₩${E.toLocaleString("ko-KR")}` : `약 ${Ht(I, p)}`,
        ", 그중 ",
        o,
        "가 쓴 돈 ",
        j(g.share[o] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Ce(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: C.map(({ c, v: r }) => /* @__PURE__ */ e("i", { style: { flexGrow: r, background: tn(c).color } }, c)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: C.map(({ c, v: r }) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: tn(c).color } }),
        c,
        " ",
        /* @__PURE__ */ a("b", { children: [
          Math.round(r / I * 100),
          "%"
        ] })
      ] }, c)) })
    ] }),
    g.skipped.length > 0 && /* @__PURE__ */ a("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ a("strong", { children: [
        "정산에서 빠진 경비가 ",
        g.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: g.skipped.map((c) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => i(c), children: [
        /* @__PURE__ */ a("span", { children: [
          c.title,
          " ",
          /* @__PURE__ */ a("em", { children: [
            "(",
            c.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: dt(Number(c.amount) || 0) })
      ] }) }, c.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([c, r]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": z === c, className: z === c ? "on" : "", onClick: () => d(c), children: r }, c)) }),
    z === "me" && /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ a("div", { className: "jt-mybal " + (we(M) || "even"), children: [
        /* @__PURE__ */ a("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(ct, { name: o, members: u, size: 32 }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a("span", { children: [
              "여행 전체 기준, ",
              o,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: M > 0.5 ? `${j(M)} 받으면 돼요` : M < -0.5 ? `${j(-M)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        A.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: A.map((c, r) => /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ e("span", { children: c.from === o ? /* @__PURE__ */ a(Q, { children: [
            /* @__PURE__ */ e("b", { children: c.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ a(Q, { children: [
            /* @__PURE__ */ e("b", { children: c.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: S === "KRW" ? ze(c.v) : dt(c.v) }),
            S !== "KRW" && /* @__PURE__ */ e("em", { children: Ht(c.v, p) })
          ] })
        ] }, r)) }),
        S === "KRW" && /* @__PURE__ */ e("p", { className: "jt-krw-note", children: "원화로 결제한 경비는 입력한 원화 그대로, 엔화 경비만 오늘 환율로 바꿔서 원화로 정산해요." }),
        /* @__PURE__ */ a("div", { className: "jt-calc", children: [
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: j(g.paid[o] || 0) })
          ] }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈" }),
            /* @__PURE__ */ a("b", { children: [
              "− ",
              j(g.share[o] || 0)
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: M > 0.5 ? "더 결제했으니 받을 돈" : M < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: we(M), children: M > 0.5 ? j(M) : M < -0.5 ? j(-M) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: b.map((c) => {
        let r = ut(l, c.day), D = c.res.net[o] || 0;
        return /* @__PURE__ */ a("li", { style: { "--lc": V[c.day % V.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-label", children: [
            c.day + 1,
            "일차 ",
            Rt(r),
            " (",
            St(r),
            ")"
          ] }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            ce(c.res.paid[o] || 0, c.res.unit),
            ", 내가 쓴 돈 ",
            ce(c.res.share[o] || 0, c.res.unit)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + we(D), children: la(D, c.res.unit) })
        ] }, c.day);
      }) }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "나와 관련된 경비" }),
      /* @__PURE__ */ e(
        pa,
        {
          days: b,
          start: l,
          members: u,
          rate: p,
          onEdit: i,
          filter: (c) => c.payer === o || (c.split || []).includes(o),
          empty: "나와 관련된 경비가 아직 없어요."
        }
      ),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    z === "day" && /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      b.map((c) => {
        let r = ut(l, c.day);
        return /* @__PURE__ */ a("div", { className: "jt-daycard", style: { "--lc": V[c.day % V.length] }, children: [
          /* @__PURE__ */ a("h4", { children: [
            /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
              c.day + 1,
              "일차"
            ] }),
            Rt(r),
            " (",
            St(r),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: c.parts })
          ] }),
          /* @__PURE__ */ e(ca, { moves: c.res.moves, rate: p, me: o, unit: c.res.unit }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: c.items.map((D) => /* @__PURE__ */ e(Ia, { e: D, members: u, rate: p, onEdit: i }, D.id)) })
        ] }, c.day);
      })
    ] }),
    z === "all" && /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ a("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(ca, { moves: g.moves, rate: p, me: o, unit: S }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "전체 경비" }),
      /* @__PURE__ */ e(pa, { days: b, start: l, members: u, rate: p, onEdit: i, empty: "기록된 경비가 없어요." }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: u.map((c) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ e(ct, { name: c, members: u, size: 28 }),
        /* @__PURE__ */ a("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: c }),
          /* @__PURE__ */ a("span", { children: [
            "결제 ",
            j(g.paid[c]),
            ", 쓴 돈 ",
            j(g.share[c])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + we(g.net[c]), children: la(g.net[c], S) })
      ] }, c)) })
    ] })
  ] });
}
function gn({ id: t, data: n, className: o, onClick: i, alt: s = "사진" }) {
  let [m, u] = y(n || zt.get(t) || null), [p, l] = y(!1);
  U(() => {
    if (n) {
      u(n);
      return;
    }
    if (zt.has(t)) {
      u(zt.get(t));
      return;
    }
    let k = !0;
    return l(!1), ii(t).then((z) => {
      k && (z ? u(z) : l(!0));
    }), () => {
      k = !1;
    };
  }, [t, n]);
  let h = m ? /* @__PURE__ */ e("img", { src: m, alt: s, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: p ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return i ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (o || ""), onClick: i, "aria-label": "사진 크게 보기", children: h }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (o || ""), children: h });
}
function Gi({ photos: t, index: n, onClose: o }) {
  let [i, s] = y(n), m = t.length;
  return U(() => {
    let u = (p) => {
      p.key === "Escape" && o(), p.key === "ArrowRight" && s((l) => (l + 1) % m), p.key === "ArrowLeft" && s((l) => (l - 1 + m) % m);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [m, o]), /* @__PURE__ */ a("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: o, children: [
    /* @__PURE__ */ e("button", { className: "jt-lb-close", onClick: o, "aria-label": "닫기", children: /* @__PURE__ */ e(Jt, { size: 24 }) }),
    /* @__PURE__ */ e("div", { className: "jt-lb-stage", onClick: (u) => u.stopPropagation(), children: /* @__PURE__ */ e(gn, { id: t[i], className: "contain" }) }),
    m > 1 && /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (u) => {
            u.stopPropagation(), s((i - 1 + m) % m);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ e(ga, { size: 26 })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (u) => {
            u.stopPropagation(), s((i + 1) % m);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ e(fa, { size: 26 })
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
function Xi({ text: t }) {
  let n = t.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ e("p", { className: "jt-post-text", children: n.map(
    (o, i) => i % 2 ? /* @__PURE__ */ e("a", { href: o, target: "_blank", rel: "noopener noreferrer", children: o }, i) : o
  ) });
}
function Fa({ url: t, onRemove: n }) {
  let o = /* @__PURE__ */ a(Q, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(zo, { size: 16 }) }),
    /* @__PURE__ */ a("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: Qo(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return n ? /* @__PURE__ */ a("div", { className: "jt-linkcard", children: [
    o,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: n, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(Jt, { size: 16 }) })
  ] }) : /* @__PURE__ */ a("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    o,
    /* @__PURE__ */ e(Tt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function qi({ initial: t, onSave: n, onDelete: o }) {
  let [i, s] = y(t?.text || ""), [m, u] = y(t?.urls || []), [p, l] = y(""), [h, k] = y(() => (t?.photos || []).map((b) => ({ id: b }))), [z, d] = y(!1), [I, g] = y(""), S = G(null), j = () => {
    if (!p.trim()) return;
    let b = Yn(p);
    if (!b) {
      g("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    m.includes(b) || u([...m, b]), l(""), g("");
  }, N = async (b) => {
    let M = Array.from(b || []).filter((D) => D.type.startsWith("image/"));
    if (!M.length) return;
    let A = ne - h.length;
    if (A <= 0) {
      g(`사진은 글 하나에 ${ne}장까지 올릴 수 있어요.`);
      return;
    }
    d(!0), g("사진 준비 중");
    let c = [], r = 0;
    for (let D of M.slice(0, A))
      try {
        c.push({ id: yt(), data: await ri(D) });
      } catch {
        r++;
      }
    k((D) => [...D, ...c]), d(!1), r ? g(`${r}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : M.length > A ? g(`${ne}장까지만 넣었어요.`) : g(""), S.current && (S.current.value = "");
  }, E = async () => {
    let b = m;
    if (p.trim()) {
      let A = Yn(p);
      if (!A) {
        g("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      b.includes(A) || (b = [...b, A]);
    }
    d(!0), g(h.some((A) => A.data) ? "사진 올리는 중" : ""), await n({ text: i.trim(), urls: b, photos: h }) || (d(!1), g("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, C = !z && (i.trim() || m.length || p.trim() || h.length);
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: i,
        onChange: (b) => s(b.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    h.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: h.map((b) => /* @__PURE__ */ a("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(gn, { id: b.id, data: b.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => k(h.filter((M) => M.id !== b.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(Jt, { size: 14 })
        }
      )
    ] }, b.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: S,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (b) => N(b.target.files)
      }
    ),
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => S.current && S.current.click(),
        disabled: z || h.length >= ne,
        children: [
          /* @__PURE__ */ e(Co, { size: 17 }),
          "사진 추가 (",
          h.length,
          "/",
          ne,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      m.map((b) => /* @__PURE__ */ e(Fa, { url: b, onRemove: () => u(m.filter((M) => M !== b)) }, b)),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: p,
            onChange: (b) => l(b.target.value),
            onKeyDown: (b) => b.key === "Enter" && j(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: j, children: "추가" })
      ] })
    ] }),
    I && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: I }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !C, onClick: E, children: z ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(It, { onConfirm: o, label: "이 글 삭제" })
  ] });
}
function Vi({ post: t, me: n, members: o, onEdit: i, onLike: s, onComment: m, onDelComment: u, onOpenPhoto: p }) {
  let [l, h] = y(!1), k = t.photos || [], z = t.urls || [], d = t.comments || [], I = k.slice(0, 4);
  return /* @__PURE__ */ a("li", { className: "jt-post", children: [
    /* @__PURE__ */ a("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ e(ct, { name: t.by, members: o, size: 34 }),
      /* @__PURE__ */ a("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ e("strong", { children: t.by }),
        /* @__PURE__ */ a("span", { children: [
          ke(t.createdAt),
          t.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      t.by === n && /* @__PURE__ */ e("button", { className: "jt-icon sm", onClick: () => i(t), "aria-label": "내 글 고치기", children: /* @__PURE__ */ e(Gt, { size: 17 }) })
    ] }),
    t.text && /* @__PURE__ */ e(Xi, { text: t.text }),
    k.length > 0 && /* @__PURE__ */ e("div", { className: "jt-gallery n" + Math.min(k.length, 4), children: I.map((g, S) => /* @__PURE__ */ a("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ e(gn, { id: g, onClick: () => p(k, S) }),
      S === 3 && k.length > 4 && /* @__PURE__ */ a("span", { className: "jt-more", children: [
        "+",
        k.length - 4
      ] })
    ] }, g)) }),
    z.length > 0 && /* @__PURE__ */ e("div", { className: "jt-links", children: z.map((g) => /* @__PURE__ */ e(Fa, { url: g }, g)) }),
    /* @__PURE__ */ a("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ e(Ae, { item: t, me: n, members: o, onReact: (g) => s(t.id, g) }),
      /* @__PURE__ */ e(dn, { count: d.length, open: l, onClick: () => h(!l) })
    ] }),
    l && /* @__PURE__ */ e(
      Se,
      {
        comments: d,
        me: n,
        members: o,
        onAdd: (g) => m(t.id, g),
        onDelete: (g) => u(t.id, g)
      }
    )
  ] });
}
function Zi({ settings: t, board: n, me: o, ...i }) {
  let [s, m] = y(null), u = [...n].sort((p, l) => l.createdAt - p.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    u.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ e("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ e("ul", { className: "jt-posts", children: u.map((p) => /* @__PURE__ */ e(
      Vi,
      {
        post: p,
        me: o,
        members: t.members,
        onOpenPhoto: (l, h) => m({ photos: l, index: h }),
        ...i
      },
      p.id
    )) }),
    s && /* @__PURE__ */ e(Gi, { photos: s.photos, index: s.index, onClose: () => m(null) })
  ] });
}
var Ve = "trip:loc:", Qi = 3 * 6e4, ts = (t, n) => V[(Math.max(0, t.indexOf(n)) * 2 + 3) % V.length], es = (t) => !!t && t.online && typeof t.lat == "number" && Date.now() - t.at < Qi, Da = (t) => `https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`;
function ns({ settings: t, me: n, locs: o, shareOn: i, onToggle: s, myPos: m, geoErr: u }) {
  let [p, l] = y(!1), [, h] = y(0);
  U(() => {
    let A = setInterval(() => h((c) => c + 1), 3e4);
    return () => clearInterval(A);
  }, []);
  let k = t.members, z = k.map((A) => ({ m: A, l: o[A], live: es(o[A]) })), d = z.filter((A) => A.live).map((A) => ({ id: A.m, lat: A.l.lat, lng: A.l.lng, color: ts(k, A.m), label: A.m, text: A.m[0] })), I = d.map((A) => `${A.id}:${A.lat.toFixed(5)}:${A.lng.toFixed(5)}`).join("|"), g = re(() => d, [I]), [S, j] = y(null), [N, E] = y(() => {
    let A = d[0] || m;
    return A ? { lat: A.lat, lng: A.lng, z: 14 } : { lat: xt.lat, lng: xt.lng, z: 12 };
  }), C = () => {
    if (!d.length) return;
    let A = d.reduce((D, _) => D + _.lat, 0) / d.length, c = d.reduce((D, _) => D + _.lng, 0) / d.length, r = Math.max(...d.map((D) => Yt({ lat: A, lng: c }, D)));
    E({ lat: A, lng: c, z: r < 300 ? 16 : r < 1e3 ? 15 : r < 3e3 ? 13 : r < 1e4 ? 12 : 10 }), j(null);
  }, b = G(!1);
  U(() => {
    !b.current && d.length && (b.current = !0, C());
  }, [I]);
  let M = z.filter((A) => A.live).length;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ a("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ e("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ e("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ a("button", { type: "button", className: "jt-helpbtn", onClick: () => l(!0), children: [
          /* @__PURE__ */ e(So, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ e("i", {}) })
    ] }),
    i && u && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-share-err", children: u }),
    /* @__PURE__ */ e(
      Aa,
      {
        gkey: t.gmapsKey,
        view: N,
        setView: E,
        pins: g,
        temp: null,
        selectedId: S,
        onTap: () => j(null),
        onPinTap: (A) => j(A),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ a("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ a("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ e("b", { children: M }),
        "/",
        k.length,
        "명"
      ] }),
      /* @__PURE__ */ a("button", { type: "button", className: "jt-secondary sm", onClick: C, disabled: !M, children: [
        /* @__PURE__ */ e(Ao, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-fam-list", children: z.map(({ m: A, l: c, live: r }) => {
      let D = A === n, _ = r && m && !D ? Yt(m, c) : null;
      return /* @__PURE__ */ a("li", { className: "jt-fam" + (r ? " live" : "") + (S === A ? " sel" : ""), children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !r,
            onClick: () => {
              j(A), E({ lat: c.lat, lng: c.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ a("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ e(ct, { name: A, members: k, size: 34 }),
                r && /* @__PURE__ */ e("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ a("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ a("strong", { children: [
                  A,
                  D ? " (나)" : ""
                ] }),
                /* @__PURE__ */ e("span", { children: r ? `위치 공유 중, ${ke(c.at)}${_ != null ? `, 나와 ${Sa(_)}` : ""}` : c && c.at ? `앱 꺼짐, 마지막 접속 ${ke(c.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        r && !D && /* @__PURE__ */ a("a", { className: "jt-maplink", href: Da(c), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(At, { size: 13 }),
          "길 찾기"
        ] })
      ] }, A);
    }) }),
    p && /* @__PURE__ */ a(Nt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => l(!1), children: [
      /* @__PURE__ */ a("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ e("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ e("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ e("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ e("b", { children: "공유 설정" }),
          /* @__PURE__ */ e("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: () => l(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ e("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var Pa = "trip:chat:", Ze = "trip:read:", Qe = (t) => Pa + t.at.toString(36).padStart(10, "0") + "-" + t.id, as = (t) => {
  let n = new Date(t);
  return `${it(n.getHours())}:${it(n.getMinutes())}`;
}, os = (t) => {
  let n = new Date(t);
  return `${n.getMonth() + 1}월 ${n.getDate()}일 (${St(n)})`;
};
function da(t) {
  return t.split(/(https?:\/\/[^\s]+)/g).map(
    (n, o) => o % 2 ? /* @__PURE__ */ e("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, o) : n
  );
}
function is({ settings: t, me: n, msgs: o, reads: i, notice: s, onSend: m, onDelete: u, onEdit: p, onPin: l, onUnpin: h, onSendLoc: k, badgeAsk: z, onBadgeAsk: d }) {
  let I = t.members, [g, S] = y(""), [j, N] = y(null), [E, C] = y(!1), [b, M] = y(null), [A, c] = y(""), [r, D] = y(!1), [_, w] = y(null), B = s ? o.find((R) => R.id === s.id) : null, v = s ? { ...s, ...B ? { text: B.text, kind: B.kind, lat: B.lat, lng: B.lng } : {} } : null, O = (R) => {
    let ot = document.getElementById("msg-" + R);
    ot && (ot.scrollIntoView({ block: "center", behavior: "smooth" }), w(R), setTimeout(() => w(null), 1600));
  }, J = (R) => {
    M(R.id), c(R.text), N(null);
  }, $ = (R) => {
    let ot = A.trim();
    ot && (ot !== R.text && p(R, ot), M(null));
  }, f = G(null), H = G(!0), rt = o.length;
  U(() => {
    let R = o[rt - 1], ot = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (H.current || ot || R && R.by === n) && f.current && f.current.scrollIntoView({ block: "end", behavior: H.current ? "auto" : "smooth" }), H.current = !1;
  }, [rt]);
  let Z = () => {
    let R = g.trim();
    R && (m(R), S(""));
  }, de = async () => {
    C(!0), await k(), C(!1);
  }, me = "", Lt = null;
  return /* @__PURE__ */ a("section", { className: "jt-chat", children: [
    rt === 0 && /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ e("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    v && /* @__PURE__ */ a("div", { className: "jt-notice" + (r ? " open" : ""), children: [
      /* @__PURE__ */ a("button", { type: "button", className: "jt-notice-head", onClick: () => D(!r), "aria-expanded": r, children: [
        /* @__PURE__ */ e(ba, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ e("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ e("span", { className: "jt-notice-text", children: v.kind === "loc" ? `${v.by}의 위치` : v.text }),
        /* @__PURE__ */ e(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      r && /* @__PURE__ */ a("div", { className: "jt-notice-body", children: [
        v.kind === "loc" ? /* @__PURE__ */ a("p", { children: [
          v.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ e("a", { href: $t({ lat: v.lat, lng: v.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ e("p", { className: "jt-msg-text", children: da(v.text) }),
        /* @__PURE__ */ a("span", { className: "jt-notice-meta", children: [
          v.by,
          "의 메시지, ",
          v.pinnedBy,
          "이(가) 공지로 등록",
          B ? "" : " (원래 메시지는 지워졌어요)"
