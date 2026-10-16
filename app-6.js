function SpendRow({ e, members, rate, onEdit }) {
  let { Icon, color } = look(e.cat);
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-spend", onClick: () => onEdit(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ jsx("span", { className: "jt-spend-icon", style: { "--cc": color }, children: /* @__PURE__ */ jsx(Icon, { size: 18 }) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ jsx("div", { className: "jt-spend-name", children: e.title }),
      /* @__PURE__ */ jsxs("div", { className: "jt-meta", children: [
        e.personal ? /* @__PURE__ */ jsxs(Fragment, { children: [
          e.method === "card" ? "카드" : "현금",
          " 결제"
        ] }) : isFund(e) ? /* @__PURE__ */ jsxs(Fragment, { children: [
          e.payer === FUND ? "" : `${e.payer}이(가) 냄, `,
          /* @__PURE__ */ jsx("span", { className: "jt-fundtag", children: "공금" }),
          " 처리"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          e.payer,
          "이(가) 냄, ",
          (e.split || []).length === members.length ? "모두" : (e.split || []).join(", "),
          " 나눔"
        ] }),
        e.editedAt ? ", 수정됨" : "",
        e.photos && e.photos.length > 0 && /* @__PURE__ */ jsxs("span", { className: "jt-rcpt", "aria-label": `영수증 ${e.photos.length}장`, children: [
          /* @__PURE__ */ jsx(Receipt, { size: 12 }),
          e.photos.length
        ] })
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
var LEDGER_PREFIX = "trip:pexp:";
function PersonalView({ ledger, settings, me, commonShare, onEdit, onCash }) {
  let rate = settings.rate, items = ledger && ledger.items || [], cash = Number(ledger && ledger.cash && ledger.cash.jpy) || 0, [editCash, setEditCash] = useState(!1), [cashText, setCashText] = useState(cash ? String(cash) : ""), jp = items.filter((e) => e.cur !== "KRW"), usedJ = jp.reduce((a, e) => a + (Number(e.amount) || 0), 0), usedK = items.filter((e) => e.cur === "KRW").reduce((a, e) => a + (Number(e.orig) || 0), 0), cashUsed = jp.filter((e) => (e.method || "cash") === "cash").reduce((a, e) => a + (Number(e.amount) || 0), 0), cardJ = usedJ - cashUsed, left = cash - cashUsed, wonOf = (e) => e.cur === "KRW" ? Number(e.orig) || 0 : (Number(e.amount) || 0) * (e.rate || rate) / 100, usedW = items.reduce((a, e) => a + wonOf(e), 0), groups = useMemo(() => {
    let g = {};
    return items.forEach((e) => (g[e.day] = g[e.day] || []).push(e)), Object.keys(g).map(Number).sort((x, y) => x - y).map((d) => ({ day: d, items: [...g[d]].sort((x, y) => (y.createdAt || 0) - (x.createdAt || 0)) }));
  }, [items]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-total jt-pcard", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        me,
        "의 개인 경비 (나만 보여요)"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "jt-pgrid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("em", { children: "총 현금" }),
          /* @__PURE__ */ jsx("strong", { children: yen(cash) }),
          /* @__PURE__ */ jsxs("small", { children: [
            "(",
            won(cash, rate),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("em", { children: "사용 금액" }),
          /* @__PURE__ */ jsx("strong", { children: usedK ? wonExact(usedW) : yen(usedJ) }),
          /* @__PURE__ */ jsx("small", { children: usedK ? sumParts(items) : `(${won(usedJ, rate)})` })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: left < 0 ? "neg" : "", children: [
          /* @__PURE__ */ jsx("em", { children: "남은 현금" }),
          /* @__PURE__ */ jsx("strong", { children: yen(left) }),
          /* @__PURE__ */ jsxs("small", { children: [
            "(",
            won(left, rate),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "jt-pline", children: [
        "현금 ",
        yen(cashUsed),
        ", 카드 ",
        yen(cardJ),
        usedK ? `, 원화 결제 ₩${usedK.toLocaleString("ko-KR")}` : ""
      ] }),
      editCash ? /* @__PURE__ */ jsxs("div", { className: "jt-inline jt-cashedit", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            value: cashText,
            onChange: (e) => setCashText(e.target.value),
            placeholder: "환전한 엔화 현금",
            "aria-label": "총 현금 (엔화)",
            autoFocus: !0
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "jt-secondary",
            onClick: () => {
              onCash(Math.max(0, Math.round(Number(cashText) || 0))), setEditCash(!1);
            },
            children: "저장"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-ghost sm jt-cashbtn", onClick: () => setEditCash(!0), children: [
        /* @__PURE__ */ jsx(Pencil, { size: 13 }),
        "총 현금 ",
        cash ? "수정" : "입력",
        " (환전한 엔화)"
      ] }),
      commonShare && /* @__PURE__ */ jsxs("p", { className: "jt-pshare", children: [
        "공통 경비 중 내 몫은 ",
        commonShare,
        "예요. (나의 정산 참고)"
      ] })
    ] }),
    groups.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "jt-empty", children: [
      /* @__PURE__ */ jsx("p", { children: "아직 개인 경비가 없어요." }),
      /* @__PURE__ */ jsx("p", { children: '오른쪽 아래 "개인 경비 추가"로 나만 쓴 돈을 기록해 보세요. 가족 정산에는 들어가지 않아요.' })
    ] }) : /* @__PURE__ */ jsx(SpendDays, { days: groups, start: settings.start, members: settings.members, rate, onEdit, empty: "" })
  ] });
}
function SpendTab({ settings, spend, me, onEdit, view: pView, setView: pSetView, ledger, onEditPersonal, onCash }) {
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
  }, [spend, members]), mine = result.net[me] || 0, myMoves = result.moves.filter((m) => m.from === me || m.to === me), segBar = /* @__PURE__ */ jsx("div", { className: "jt-seg four", role: "tablist", "aria-label": "경비 보기", children: [
    ["personal", "개인 경비"],
    ["me", "나의 정산"],
    ["day", "요일별 정산"],
    ["all", "전체 정산"]
  ].map(([id, label]) => /* @__PURE__ */ jsx("button", { role: "tab", "aria-selected": view === id, className: view === id ? "on" : "", onClick: () => setView(id), children: label }, id)) });
  return view === "personal" ? /* @__PURE__ */ jsxs("section", { children: [
    segBar,
    /* @__PURE__ */ jsx(
      PersonalView,
      {
        ledger,
        settings,
        me,
        commonShare: spend.length && (result.share[me] || 0) > 0 ? F(result.share[me]) : "",
        onEdit: onEditPersonal,
        onCash
      }
    )
  ] }) : spend.length === 0 ? /* @__PURE__ */ jsxs("section", { children: [
    segBar,
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
    segBar,
    /* @__PURE__ */ jsxs("div", { className: "jt-total", children: [
      /* @__PURE__ */ jsx("span", { children: "공통 경비, 지금까지 쓴 돈" }),
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
