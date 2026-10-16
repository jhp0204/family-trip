function settleMix(spend, members, rate) {
  if (!spend.some((e) => e.cur === "KRW" || e.rate)) return { ...settle(spend, members), unit: "JPY" };
  let conv = spend.map((e) => ({
    ...e,
    amount: e.cur === "KRW" ? Number(e.orig) || 0 : (Number(e.amount) || 0) * (e.rate || rate) / 100
  }));
  return { ...settle(conv, members), unit: "KRW" };
}
var wonExact = (v) => "₩" + (Math.round(v / 100) * 100).toLocaleString("ko-KR"), fmtU = (v, unit) => unit === "KRW" ? wonExact(v) : yw(v), netLabelU = (v, unit) => v > 0.5 ? `받을 돈 ${fmtU(v, unit)}` : v < -0.5 ? `보낼 돈 ${fmtU(-v, unit)}` : "주고받을 돈 없음", sumParts = (items) => {
  let j = items.filter((e) => e.cur !== "KRW").reduce((a, e) => a + (Number(e.amount) || 0), 0), k = items.filter((e) => e.cur === "KRW").reduce((a, e) => a + (Number(e.orig) || 0), 0);
  return [j ? yen(j) : "", k ? "₩" + k.toLocaleString("ko-KR") : ""].filter(Boolean).join(" + ") || yen(0);
};
function Moves({ moves, rate, me, unit = "JPY" }) {
  return moves.length ? /* @__PURE__ */ jsx("ul", { className: "jt-moves2", children: moves.map((m, i) => /* @__PURE__ */ jsxs("li", { className: m.from === me || m.to === me ? "mine" : "", children: [
    /* @__PURE__ */ jsxs("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ jsx("b", { children: m.from }),
      /* @__PURE__ */ jsx(ChevronRight, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ jsx("b", { children: m.to })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ jsx("strong", { children: unit === "KRW" ? wonExact(m.v) : yen(m.v) }),
      unit !== "KRW" && /* @__PURE__ */ jsx("em", { children: won(m.v, rate) })
    ] })
  ] }, i)) }) : /* @__PURE__ */ jsx("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function SpendRow({ e, members, rate, onEdit }) {
  let { Icon, color } = look(e.cat);
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-spend", onClick: () => onEdit(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ jsx("span", { className: "jt-spend-icon", style: { "--cc": color }, children: /* @__PURE__ */ jsx(Icon, { size: 18 }) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ jsx("div", { className: "jt-spend-name", children: e.title }),
      /* @__PURE__ */ jsxs("div", { className: "jt-meta", children: [
        isFund(e) ? /* @__PURE__ */ jsxs(Fragment, { children: [
          e.payer === FUND ? "" : `${e.payer}이(가) 냄, `,
          /* @__PURE__ */ jsx("span", { className: "jt-fundtag", children: "공금" }),
          " 처리"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          e.payer,
          "이(가) 냄, ",
          (e.split || []).length === members.length ? "모두" : (e.split || []).join(", "),
          " 나눔"
        ] }),
        e.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "jt-spend-amt", children: e.cur === "KRW" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("strong", { children: [
        "₩",
        (Number(e.orig) || 0).toLocaleString("ko-KR")
      ] }),
      /* @__PURE__ */ jsxs("span", { children: [
        "(",
        yen(Number(e.amount) || 0),
        ")"
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("strong", { children: yen(Number(e.amount) || 0) }),
      /* @__PURE__ */ jsxs("span", { children: [
        "(",
        won(Number(e.amount) || 0, e.rate || rate),
        ")"
      ] }),
      e.rate ? /* @__PURE__ */ jsxs("span", { className: "jt-ratetag", children: [
        "환율 ",
        e.rate
      ] }) : null
    ] }) }),
    /* @__PURE__ */ jsx("span", { className: "jt-spend-edit", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Pencil, { size: 14 }) })
  ] }) });
}
var netClass = (v) => v > 0.5 ? "plus" : v < -0.5 ? "minus" : "";
function SpendDays({ days, start, members, rate, onEdit, filter, empty }) {
  let shown = days.map((g) => ({ ...g, items: filter ? g.items.filter(filter) : g.items })).filter((g) => g.items.length);
  return shown.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "jt-hint jt-listhint", children: "항목을 누르면 고치거나 지울 수 있어요." }),
    shown.map((g) => {
      let d = addDays(start, g.day);
      return /* @__PURE__ */ jsxs("div", { className: "jt-group", children: [
        /* @__PURE__ */ jsxs("h4", { style: { "--lc": LINE[g.day % LINE.length] }, children: [
          /* @__PURE__ */ jsxs("span", { className: "jt-daychip", children: [
            g.day + 1,
            "일차"
          ] }),
          md(d),
          " (",
          wk(d),
          ")"
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "jt-spend-list", children: g.items.map((e) => /* @__PURE__ */ jsx(SpendRow, { e, members, rate, onEdit }, e.id)) })
      ] }, g.day);
    })
  ] }) : /* @__PURE__ */ jsx("p", { className: "jt-hint jt-listhint", children: empty });
}
function SpendTab({ settings, spend, me, onEdit, view: pView, setView: pSetView }) {
  let { members, rate, start } = settings, [own, setOwn] = useState("me"), view = pView || own, setView = pSetView || setOwn, total = spend.reduce((s, e) => s + (Number(e.amount) || 0), 0), result = useMemo(() => settleMix(spend, members, rate), [spend, members, rate]), U = result.unit, fundItems = spend.filter(isFund), myFund = fundItems.filter((e) => e.payer === me), fundBy = [...members, FUND].map((m) => [m, fundItems.filter((e) => e.payer === m)]).filter(([, items]) => items.length), F = (v) => fmtU(v, U), totalJ = spend.filter((e) => e.cur !== "KRW").reduce((a, e) => a + (Number(e.amount) || 0), 0), totalJW = spend.filter((e) => e.cur !== "KRW").reduce((a, e) => a + (Number(e.amount) || 0) * (e.rate || rate) / 100, 0), totalK = spend.filter((e) => e.cur === "KRW").reduce((a, e) => a + (Number(e.orig) || 0), 0), byCat = useMemo(() => {
    let t = {};
    return spend.forEach((e) => t[e.cat] = (t[e.cat] || 0) + (Number(e.amount) || 0)), SPEND_CATS.filter((c) => t[c]).map((c) => ({ c, v: t[c] }));
  }, [spend]), days = useMemo(() => {
    let g = {};
    return spend.forEach((e) => (g[e.day] = g[e.day] || []).push(e)), Object.keys(g).map(Number).sort((a, b) => a - b).map((d) => ({
      day: d,
      sum: g[d].reduce((s, e) => s + (Number(e.amount) || 0), 0),
      items: [...g[d]].sort((a, b) => b.createdAt - a.createdAt),
      res: settleMix(g[d], members, rate),
      parts: sumParts(g[d])
    }));
  }, [spend, members]), mine = result.net[me] || 0, myMoves = result.moves.filter((m) => m.from === me || m.to === me);
  return spend.length === 0 ? /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-total", children: [
      /* @__PURE__ */ jsx("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ jsx("strong", { children: yen(0) }),
      /* @__PURE__ */ jsx("span", { className: "jt-fx", children: fxNote(settings) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "jt-empty", children: [
      /* @__PURE__ */ jsx("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ jsx("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-total", children: [
      /* @__PURE__ */ jsx("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ jsx("strong", { children: U === "KRW" ? wonExact(totalK + totalJW) : yen(total) }),
      /* @__PURE__ */ jsxs("em", { children: [
        U === "KRW" ? `엔화 ${yen(totalJ)}(${wonExact(totalJW)}) + 원화 ₩${totalK.toLocaleString("ko-KR")}` : `약 ${won(total, rate)}`,
        ", 그중 ",
        me,
        "가 쓴 돈 ",
        F(result.share[me] || 0)
      ] }),
      spend.some(isFund) && /* @__PURE__ */ jsxs("span", { className: "jt-fundsum", children: [
        "그중 ",
        /* @__PURE__ */ jsx("span", { className: "jt-fundtag", children: "공금" }),
        " 처리 ",
        sumParts(spend.filter(isFund)),
        " (정산 제외)"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "jt-fx", children: fxNote(settings) }),
      /* @__PURE__ */ jsx("div", { className: "jt-catbar", "aria-hidden": "true", children: byCat.map(({ c, v }) => /* @__PURE__ */ jsx("i", { style: { flexGrow: v, background: look(c).color } }, c)) }),
      /* @__PURE__ */ jsx("ul", { className: "jt-catlegend", children: byCat.map(({ c, v }) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("span", { className: "jt-dot", style: { background: look(c).color } }),
        c,
        " ",
        /* @__PURE__ */ jsxs("b", { children: [
          Math.round(v / total * 100),
          "%"
        ] })
      ] }, c)) })
    ] }),
    result.skipped.length > 0 && /* @__PURE__ */ jsxs("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ jsxs("strong", { children: [
        "정산에서 빠진 경비가 ",
        result.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ jsx("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ jsx("ul", { children: result.skipped.map((e) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => onEdit(e), children: [
        /* @__PURE__ */ jsxs("span", { children: [
          e.title,
          " ",
          /* @__PURE__ */ jsxs("em", { children: [
            "(",
            e.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ jsx("b", { children: yen(Number(e.amount) || 0) })
      ] }) }, e.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([id, label]) => /* @__PURE__ */ jsx("button", { role: "tab", "aria-selected": view === id, className: view === id ? "on" : "", onClick: () => setView(id), children: label }, id)) }),
    view === "me" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-mybal " + (netClass(mine) || "even"), children: [
        /* @__PURE__ */ jsxs("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ jsx(Avatar, { name: me, members, size: 32 }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "여행 전체 기준, ",
              me,
              "는"
            ] }),
            /* @__PURE__ */ jsx("strong", { children: mine > 0.5 ? `${F(mine)} 받으면 돼요` : mine < -0.5 ? `${F(-mine)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        myMoves.length > 0 && /* @__PURE__ */ jsx("ul", { className: "jt-moves", children: myMoves.map((m, i) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: m.from === me ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("b", { children: m.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("b", { children: m.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ jsxs("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ jsx("strong", { children: U === "KRW" ? wonExact(m.v) : yen(m.v) }),
            U !== "KRW" && /* @__PURE__ */ jsx("em", { children: won(m.v, rate) })
          ] })
        ] }, i)) }),
        U === "KRW" && /* @__PURE__ */ jsx("p", { className: "jt-krw-note", children: "원화로 결제한 경비는 입력한 원화 그대로, 환율을 직접 입력한 경비는 그 환율로, 나머지 엔화 경비만 오늘 환율로 바꿔서 원화로 정산해요." }),
        /* @__PURE__ */ jsxs("div", { className: "jt-calc", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ jsx("b", { children: F(result.paid[me] || 0) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "내가 쓴 돈" }),
            /* @__PURE__ */ jsxs("b", { children: [
              "− ",
              F(result.share[me] || 0)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sum", children: [
            /* @__PURE__ */ jsx("span", { children: mine > 0.5 ? "더 결제했으니 받을 돈" : mine < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ jsx("b", { className: netClass(mine), children: mine > 0.5 ? F(mine) : mine < -0.5 ? F(-mine) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ jsx("ul", { className: "jt-daynet", children: days.map((g) => {
        let d = addDays(start, g.day), v = g.res.net[me] || 0;
        return /* @__PURE__ */ jsxs("li", { style: { "--lc": LINE[g.day % LINE.length] }, children: [
          /* @__PURE__ */ jsx("span", { className: "jt-pip" }),
          /* @__PURE__ */ jsxs("span", { className: "jt-daynet-label", children: [
            g.day + 1,
            "일차 ",
            md(d),
            " (",
            wk(d),
            ")"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            fmtU(g.res.paid[me] || 0, g.res.unit),
            ", 내가 쓴 돈 ",
            fmtU(g.res.share[me] || 0, g.res.unit)
          ] }),
          /* @__PURE__ */ jsx("b", { className: "jt-net " + netClass(v), children: netLabelU(v, g.res.unit) })
        ] }, g.day);
      }) }),
      myFund.length > 0 && /* @__PURE__ */ jsxs("div", { className: "jt-fundbox", children: [
        /* @__PURE__ */ jsxs("strong", { children: [
          "공금에서 받을 돈 ",
          /* @__PURE__ */ jsx("span", { children: sumParts(myFund) })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "내가 결제했지만 공금으로 처리한 경비 ",
          myFund.length,
          "건이에요. 가족 정산과 따로, 공금에서 돌려받으면 돼요."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "나와 관련된 경비" }),
      /* @__PURE__ */ jsx(
        SpendDays,
        {
          days,
          start,
          members,
          rate,
          onEdit,
          filter: (e) => e.payer === me || (e.split || []).includes(me),
          empty: "나와 관련된 경비가 아직 없어요."
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    view === "day" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      days.map((g) => {
        let d = addDays(start, g.day);
        return /* @__PURE__ */ jsxs("div", { className: "jt-daycard", style: { "--lc": LINE[g.day % LINE.length] }, children: [
          /* @__PURE__ */ jsxs("h4", { children: [
            /* @__PURE__ */ jsxs("span", { className: "jt-daychip", children: [
              g.day + 1,
              "일차"
            ] }),
            md(d),
            " (",
            wk(d),
            ")",
            /* @__PURE__ */ jsx("span", { className: "jt-group-sum", children: g.parts })
          ] }),
          /* @__PURE__ */ jsx(Moves, { moves: g.res.moves, rate, me, unit: g.res.unit }),
          /* @__PURE__ */ jsx("ul", { className: "jt-spend-list", children: g.items.map((e) => /* @__PURE__ */ jsx(SpendRow, { e, members, rate, onEdit }, e.id)) })
        ] }, g.day);
      })
    ] }),
    view === "all" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ jsx("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ jsx(Moves, { moves: result.moves, rate, me, unit: U }),
        /* @__PURE__ */ jsx("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "전체 경비" }),
      /* @__PURE__ */ jsx(SpendDays, { days, start, members, rate, onEdit, empty: "기록된 경비가 없어요." }),
      fundBy.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "공금에서 돌려받을 돈" }),
        /* @__PURE__ */ jsx("ul", { className: "jt-people card", children: fundBy.map(([m, items]) => /* @__PURE__ */ jsxs("li", { children: [
          m === FUND ? /* @__PURE__ */ jsx("span", { className: "jt-fundtag", children: "?" }) : /* @__PURE__ */ jsx(Avatar, { name: m, members, size: 28 }),
          /* @__PURE__ */ jsxs("div", { className: "jt-person-main", children: [
            /* @__PURE__ */ jsx("strong", { children: m === FUND ? "결제한 사람 미지정" : m }),
            /* @__PURE__ */ jsxs("span", { children: [
              "공금 처리 경비 ",
              items.length,
              "건"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "jt-net plus", children: sumParts(items) })
        ] }, m)) })
      ] }),
      /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ jsx("ul", { className: "jt-people card", children: members.map((m) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx(Avatar, { name: m, members, size: 28 }),
        /* @__PURE__ */ jsxs("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ jsx("strong", { children: m }),
          /* @__PURE__ */ jsxs("span", { children: [
            "결제 ",
            F(result.paid[m]),
            ", 쓴 돈 ",
            F(result.share[m])
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "jt-net " + netClass(result.net[m]), children: netLabelU(result.net[m], U) })
      ] }, m)) })
    ] })
  ] });
}
function Photo({ id, data, className, onClick, alt = "사진" }) {
  let [src, setSrc] = useState(data || photoCache.get(id) || null), [fail, setFail] = useState(!1);
  useEffect(() => {
    if (data) {
      setSrc(data);
      return;
    }
    if (photoCache.has(id)) {
      setSrc(photoCache.get(id));
      return;
    }
    let alive = !0;
    return setFail(!1), loadPhoto(id).then((d) => {
      alive && (d ? setSrc(d) : setFail(!0));
    }), () => {
      alive = !1;
    };
  }, [id, data]);
  let inner = src ? /* @__PURE__ */ jsx("img", { src, alt, draggable: !1 }) : /* @__PURE__ */ jsx("span", { className: "jt-photo-wait", children: fail ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return onClick ? /* @__PURE__ */ jsx("button", { type: "button", className: "jt-photo " + (className || ""), onClick, "aria-label": "사진 크게 보기", children: inner }) : /* @__PURE__ */ jsx("span", { className: "jt-photo " + (className || ""), children: inner });
}
function Lightbox({ photos, index, onClose }) {
  let [i, setI] = useState(index), n = photos.length;
  return useEffect(() => {
    let h = (e) => {
      e.key === "Escape" && onClose(), e.key === "ArrowRight" && setI((x) => (x + 1) % n), e.key === "ArrowLeft" && setI((x) => (x - 1 + n) % n);
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [n, onClose]), /* @__PURE__ */ jsxs("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: onClose, children: [
    /* @__PURE__ */ jsx("button", { className: "jt-lb-close", onClick: onClose, "aria-label": "닫기", children: /* @__PURE__ */ jsx(X, { size: 24 }) }),
    /* @__PURE__ */ jsx("div", { className: "jt-lb-stage", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(Photo, { id: photos[i], className: "contain" }) }),
    n > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (e) => {
            e.stopPropagation(), setI((i - 1 + n) % n);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: 26 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (e) => {
            e.stopPropagation(), setI((i + 1) % n);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: 26 })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "jt-lb-count", children: [
        i + 1,
        " / ",
        n
      ] })
    ] })
  ] });
}
function RichText({ text }) {
  let parts = text.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ jsx("p", { className: "jt-post-text", children: parts.map(
    (p, i) => i % 2 ? /* @__PURE__ */ jsx("a", { href: p, target: "_blank", rel: "noopener noreferrer", children: p }, i) : p
  ) });
}
function LinkCard({ url, onRemove }) {
  let body = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ jsx(Link2, { size: 16 }) }),
    /* @__PURE__ */ jsxs("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ jsx("strong", { children: host(url) }),
      /* @__PURE__ */ jsx("span", { children: url })
    ] })
  ] });
  return onRemove ? /* @__PURE__ */ jsxs("div", { className: "jt-linkcard", children: [
    body,
    /* @__PURE__ */ jsx("button", { type: "button", className: "jt-icon sm", onClick: onRemove, "aria-label": "링크 빼기", children: /* @__PURE__ */ jsx(X, { size: 16 }) })
  ] }) : /* @__PURE__ */ jsxs("a", { className: "jt-linkcard", href: url, target: "_blank", rel: "noopener noreferrer", children: [
    body,
    /* @__PURE__ */ jsx(ExternalLink, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function PostForm({ initial, onSave, onDelete }) {
  let [text, setText] = useState(initial?.text || ""), [urls, setUrls] = useState(initial?.urls || []), [url, setUrl] = useState(""), [photos, setPhotos] = useState(() => (initial?.photos || []).map((id) => ({ id }))), [busy, setBusy] = useState(!1), [msg, setMsg] = useState(""), fileRef = useRef(null), addUrl = () => {
    if (!url.trim()) return;
    let u = normUrl(url);
    if (!u) {
      setMsg("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    urls.includes(u) || setUrls([...urls, u]), setUrl(""), setMsg("");
  }, pickFiles = async (fileList) => {
    let files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    let room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      setMsg(`사진은 글 하나에 ${MAX_PHOTOS}장까지 올릴 수 있어요.`);
      return;
    }
    setBusy(!0), setMsg("사진 준비 중");
    let added = [], failed = 0;
    for (let f of files.slice(0, room))
      try {
        added.push({ id: uid(), data: await compressImage(f) });
      } catch {
        failed++;
      }
    setPhotos((p) => [...p, ...added]), setBusy(!1), failed ? setMsg(`${failed}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : files.length > room ? setMsg(`${MAX_PHOTOS}장까지만 넣었어요.`) : setMsg(""), fileRef.current && (fileRef.current.value = "");
  }, submit = async () => {
    let list = urls;
    if (url.trim()) {
      let u = normUrl(url);
      if (!u) {
        setMsg("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      list.includes(u) || (list = [...list, u]);
    }
    setBusy(!0), setMsg(photos.some((p) => p.data) ? "사진 올리는 중" : ""), await onSave({ text: text.trim(), urls: list, photos }) || (setBusy(!1), setMsg("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, ok = !busy && (text.trim() || urls.length || url.trim() || photos.length);
  return /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
    /* @__PURE__ */ jsx(
      "textarea",
      {
        rows: 4,
        value: text,
        onChange: (e) => setText(e.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    photos.length > 0 && /* @__PURE__ */ jsx("div", { className: "jt-thumbs", children: photos.map((p) => /* @__PURE__ */ jsxs("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ jsx(Photo, { id: p.id, data: p.data }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => setPhotos(photos.filter((x) => x.id !== p.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ jsx(X, { size: 14 })
        }
      )
    ] }, p.id)) }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (e) => pickFiles(e.target.files)
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => fileRef.current && fileRef.current.click(),
        disabled: busy || photos.length >= MAX_PHOTOS,
        children: [
          /* @__PURE__ */ jsx(ImageIcon, { size: 17 }),
          "사진 추가 (",
          photos.length,
          "/",
          MAX_PHOTOS,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsx("span", { children: "링크 (선택)" }),
      urls.map((u) => /* @__PURE__ */ jsx(LinkCard, { url: u, onRemove: () => setUrls(urls.filter((x) => x !== u)) }, u)),
      /* @__PURE__ */ jsxs("div", { className: "jt-inline", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && addUrl(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary", onClick: addUrl, children: "추가" })
      ] })
    ] }),
    msg && /* @__PURE__ */ jsx("p", { className: "jt-hint jt-formmsg", role: "status", children: msg }),
    /* @__PURE__ */ jsx("button", { className: "jt-primary", disabled: !ok, onClick: submit, children: busy ? "잠시만요" : initial ? "수정 저장" : "올리기" }),
    initial && /* @__PURE__ */ jsx(DeleteButton, { onConfirm: onDelete, label: "이 글 삭제" })
  ] });
}
function PostCard({ post, me, members, onEdit, onLike, onComment, onDelComment, onOpenPhoto }) {
  let [open, setOpen] = useState(!1), photos = post.photos || [], urls = post.urls || [], comments = post.comments || [], shown = photos.slice(0, 4);
  return /* @__PURE__ */ jsxs("li", { className: "jt-post", children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ jsx(Avatar, { name: post.by, members, size: 34 }),
      /* @__PURE__ */ jsxs("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ jsx("strong", { children: post.by }),
        /* @__PURE__ */ jsxs("span", { children: [
          ago(post.createdAt),
          post.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      post.by === me && /* @__PURE__ */ jsx("button", { className: "jt-icon sm", onClick: () => onEdit(post), "aria-label": "내 글 고치기", children: /* @__PURE__ */ jsx(Pencil, { size: 17 }) })
    ] }),
    post.text && /* @__PURE__ */ jsx(RichText, { text: post.text }),
    photos.length > 0 && /* @__PURE__ */ jsx("div", { className: "jt-gallery n" + Math.min(photos.length, 4), children: shown.map((id, i) => /* @__PURE__ */ jsxs("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ jsx(Photo, { id, onClick: () => onOpenPhoto(photos, i) }),
      i === 3 && photos.length > 4 && /* @__PURE__ */ jsxs("span", { className: "jt-more", children: [
        "+",
        photos.length - 4
      ] })
    ] }, id)) }),
    urls.length > 0 && /* @__PURE__ */ jsx("div", { className: "jt-links", children: urls.map((u) => /* @__PURE__ */ jsx(LinkCard, { url: u }, u)) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ jsx(Reactions, { item: post, me, members, onReact: (e) => onLike(post.id, e) }),
      /* @__PURE__ */ jsx(CommentButton, { count: comments.length, open, onClick: () => setOpen(!open) })
    ] }),
    open && /* @__PURE__ */ jsx(
      CommentBox,
      {
        comments,
        me,
        members,
        onAdd: (t) => onComment(post.id, t),
        onDelete: (cid) => onDelComment(post.id, cid)
      }
    )
  ] });
}
function BoardTab({ settings, board, me, ...rest }) {
  let [lb, setLb] = useState(null), list = [...board].sort((a, b) => b.createdAt - a.createdAt);
  return /* @__PURE__ */ jsxs("section", { children: [
    list.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "jt-empty", children: [
      /* @__PURE__ */ jsx("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ jsx("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ jsx("ul", { className: "jt-posts", children: list.map((p) => /* @__PURE__ */ jsx(
      PostCard,
      {
        post: p,
        me,
        members: settings.members,
        onOpenPhoto: (photos, index) => setLb({ photos, index }),
        ...rest
      },
      p.id
    )) }),
    lb && /* @__PURE__ */ jsx(Lightbox, { photos: lb.photos, index: lb.index, onClose: () => setLb(null) })
  ] });
}
var LOC_PREFIX = "trip:loc:", LIVE_MS = 3 * 6e4, memberColor = (members, m) => LINE[(Math.max(0, members.indexOf(m)) * 2 + 3) % LINE.length], isLive = (l) => !!l && l.online && typeof l.lat == "number" && Date.now() - l.at < LIVE_MS, dirUrl = (l) => `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}&travelmode=walking`;
function FamilyTab({ settings, me, locs, shareOn, onToggle, myPos, geoErr }) {
  let [help, setHelp] = useState(!1), [, setTick] = useState(0);
  useEffect(() => {
    let t = setInterval(() => setTick((x) => x + 1), 3e4);
    return () => clearInterval(t);
  }, []);
  let members = settings.members, rows = members.map((m) => ({ m, l: locs[m], live: isLive(locs[m]) })), livePins = rows.filter((r) => r.live).map((r) => ({ id: r.m, lat: r.l.lat, lng: r.l.lng, color: memberColor(members, r.m), label: r.m, text: r.m[0] })), pinKey = livePins.map((x) => `${x.id}:${x.lat.toFixed(5)}:${x.lng.toFixed(5)}`).join("|"), pins = useMemo(() => livePins, [pinKey]), [sel, setSel] = useState(null), [view, setView] = useState(() => {
    let p0 = livePins[0] || myPos;
    return p0 ? { lat: p0.lat, lng: p0.lng, z: 14 } : { lat: WEATHER_SPOT.lat, lng: WEATHER_SPOT.lng, z: 12 };
  }), fitAll = () => {
    if (!livePins.length) return;
    let lat = livePins.reduce((a, x) => a + x.lat, 0) / livePins.length, lng = livePins.reduce((a, x) => a + x.lng, 0) / livePins.length, far = Math.max(...livePins.map((x) => distM({ lat, lng }, x)));
    setView({ lat, lng, z: far < 300 ? 16 : far < 1e3 ? 15 : far < 3e3 ? 13 : far < 1e4 ? 12 : 10 }), setSel(null);
  }, fitted = useRef(!1);
  useEffect(() => {
    !fitted.current && livePins.length && (fitted.current = !0, fitAll());
  }, [pinKey]);
  let liveCount = rows.filter((r) => r.live).length;
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-share" + (shareOn ? " on" : ""), children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ jsx("strong", { children: shareOn ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ jsx("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-helpbtn", onClick: () => setHelp(!0), children: [
          /* @__PURE__ */ jsx(HelpCircle, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", role: "switch", "aria-checked": shareOn, "aria-label": "내 위치 공유", className: "jt-switch", onClick: onToggle, children: /* @__PURE__ */ jsx("i", {}) })
    ] }),
    shareOn && geoErr && /* @__PURE__ */ jsx("p", { className: "jt-warn-inline jt-share-err", children: geoErr }),
    /* @__PURE__ */ jsx(
      TripMap,
      {
        gkey: settings.gmapsKey,
        view,
        setView,
        pins,
        temp: null,
        selectedId: sel,
        onTap: () => setSel(null),
        onPinTap: (id) => setSel(id),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ jsx("b", { children: liveCount }),
        "/",
        members.length,
        "명"
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-secondary sm", onClick: fitAll, disabled: !liveCount, children: [
        /* @__PURE__ */ jsx(Crosshair, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "jt-fam-list", children: rows.map(({ m, l, live }) => {
      let meRow = m === me, dist = live && myPos && !meRow ? distM(myPos, l) : null;
      return /* @__PURE__ */ jsxs("li", { className: "jt-fam" + (live ? " live" : "") + (sel === m ? " sel" : ""), children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !live,
            onClick: () => {
              setSel(m), setView({ lat: l.lat, lng: l.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ jsxs("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ jsx(Avatar, { name: m, members, size: 34 }),
                live && /* @__PURE__ */ jsx("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ jsxs("strong", { children: [
                  m,
                  meRow ? " (나)" : ""
                ] }),
                /* @__PURE__ */ jsx("span", { children: live ? `위치 공유 중, ${ago(l.at)}${dist != null ? `, 나와 ${distText(dist)}` : ""}` : l && l.at ? `앱 꺼짐, 마지막 접속 ${ago(l.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        live && !meRow && /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: dirUrl(l), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(Navigation, { size: 13 }),
          "길 찾기"
        ] })
      ] }, m);
    }) }),
    help && /* @__PURE__ */ jsxs(Sheet, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => setHelp(!1), children: [
      /* @__PURE__ */ jsxs("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ jsx("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ jsx("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ jsx("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "공유 설정" }),
          /* @__PURE__ */ jsx("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-primary", onClick: () => setHelp(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
