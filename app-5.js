}
function Xi({ settings: t, spend: n, me: o, onEdit: i, view: s, setView: d }) {
  let { members: m, rate: l, start: r } = t, [h, k] = y("me"), E = s || h, c = d || k, F = n.reduce((j, u) => j + (Number(u.amount) || 0), 0), f = ce(() => da(n, m, l), [n, m, l]), S = f.unit, v = n.filter(Yt), N = v.filter((j) => j.payer === o), A = [...m, Ht].map((j) => [j, v.filter((u) => u.payer === j)]).filter(([, j]) => j.length), w = (j) => de(j, S), x = n.filter((j) => j.cur !== "KRW").reduce((j, u) => j + (Number(u.amount) || 0), 0), M = n.filter((j) => j.cur === "KRW").reduce((j, u) => j + (Number(u.orig) || 0), 0), z = ce(() => {
    let j = {};
    return n.forEach((u) => j[u.cat] = (j[u.cat] || 0) + (Number(u.amount) || 0)), va.filter((u) => j[u]).map((u) => ({ c: u, v: j[u] }));
  }, [n]), C = ce(() => {
    let j = {};
    return n.forEach((u) => (j[u.day] = j[u.day] || []).push(u)), Object.keys(j).map(Number).sort((u, $) => u - $).map((u) => ({
      day: u,
      sum: j[u].reduce(($, I) => $ + (Number(I.amount) || 0), 0),
      items: [...j[u]].sort(($, I) => I.createdAt - $.createdAt),
      res: da(j[u], m, l),
      parts: Ne(j[u])
    }));
  }, [n, m]), p = f.net[o] || 0, B = f.moves.filter((j) => j.from === o || j.to === o);
  return n.length === 0 ? /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: dt(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Ae(t) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: S === "KRW" ? Se(M + x * l / 100) : dt(F) }),
      /* @__PURE__ */ a("em", { children: [
        S === "KRW" ? `엔화 ${un(x)} + 원화 ₩${M.toLocaleString("ko-KR")}` : `약 ${Jt(F, l)}`,
        ", 그중 ",
        o,
        "가 쓴 돈 ",
        w(f.share[o] || 0)
      ] }),
      n.some(Yt) && /* @__PURE__ */ a("span", { className: "jt-fundsum", children: [
        "그중 ",
        /* @__PURE__ */ e("span", { className: "jt-fundtag", children: "공금" }),
        " 처리 ",
        Ne(n.filter(Yt)),
        " (정산 제외)"
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Ae(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: z.map(({ c: j, v: u }) => /* @__PURE__ */ e("i", { style: { flexGrow: u, background: on(j).color } }, j)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: z.map(({ c: j, v: u }) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: on(j).color } }),
        j,
        " ",
        /* @__PURE__ */ a("b", { children: [
          Math.round(u / F * 100),
          "%"
        ] })
      ] }, j)) })
    ] }),
    f.skipped.length > 0 && /* @__PURE__ */ a("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ a("strong", { children: [
        "정산에서 빠진 경비가 ",
        f.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: f.skipped.map((j) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => i(j), children: [
        /* @__PURE__ */ a("span", { children: [
          j.title,
          " ",
          /* @__PURE__ */ a("em", { children: [
            "(",
            j.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: dt(Number(j.amount) || 0) })
      ] }) }, j.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([j, u]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": E === j, className: E === j ? "on" : "", onClick: () => c(j), children: u }, j)) }),
    E === "me" && /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ a("div", { className: "jt-mybal " + (Ce(p) || "even"), children: [
        /* @__PURE__ */ a("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(rt, { name: o, members: m, size: 32 }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a("span", { children: [
              "여행 전체 기준, ",
              o,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: p > 0.5 ? `${w(p)} 받으면 돼요` : p < -0.5 ? `${w(-p)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        B.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: B.map((j, u) => /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ e("span", { children: j.from === o ? /* @__PURE__ */ a(V, { children: [
            /* @__PURE__ */ e("b", { children: j.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ a(V, { children: [
            /* @__PURE__ */ e("b", { children: j.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ a("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: S === "KRW" ? Se(j.v) : dt(j.v) }),
            S !== "KRW" && /* @__PURE__ */ e("em", { children: Jt(j.v, l) })
          ] })
        ] }, u)) }),
        S === "KRW" && /* @__PURE__ */ e("p", { className: "jt-krw-note", children: "원화로 결제한 경비는 입력한 원화 그대로, 엔화 경비만 오늘 환율로 바꿔서 원화로 정산해요." }),
        /* @__PURE__ */ a("div", { className: "jt-calc", children: [
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: w(f.paid[o] || 0) })
          ] }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈" }),
            /* @__PURE__ */ a("b", { children: [
              "− ",
              w(f.share[o] || 0)
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: p > 0.5 ? "더 결제했으니 받을 돈" : p < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: Ce(p), children: p > 0.5 ? w(p) : p < -0.5 ? w(-p) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: C.map((j) => {
        let u = mt(r, j.day), $ = j.res.net[o] || 0;
        return /* @__PURE__ */ a("li", { style: { "--lc": Z[j.day % Z.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-label", children: [
            j.day + 1,
            "일차 ",
            Rt(u),
            " (",
            St(u),
            ")"
          ] }),
          /* @__PURE__ */ a("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            de(j.res.paid[o] || 0, j.res.unit),
            ", 내가 쓴 돈 ",
            de(j.res.share[o] || 0, j.res.unit)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + Ce($), children: ua($, j.res.unit) })
        ] }, j.day);
      }) }),
      N.length > 0 && /* @__PURE__ */ a("div", { className: "jt-fundbox", children: [
        /* @__PURE__ */ a("strong", { children: [
          "공금에서 받을 돈 ",
          /* @__PURE__ */ e("span", { children: Ne(N) })
        ] }),
        /* @__PURE__ */ a("p", { children: [
          "내가 결제했지만 공금으로 처리한 경비 ",
          N.length,
          "건이에요. 가족 정산과 따로, 공금에서 돌려받으면 돼요."
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "나와 관련된 경비" }),
      /* @__PURE__ */ e(
        fa,
        {
          days: C,
          start: r,
          members: m,
          rate: l,
          onEdit: i,
          filter: (j) => j.payer === o || (j.split || []).includes(o),
          empty: "나와 관련된 경비가 아직 없어요."
        }
      ),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    E === "day" && /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      C.map((j) => {
        let u = mt(r, j.day);
        return /* @__PURE__ */ a("div", { className: "jt-daycard", style: { "--lc": Z[j.day % Z.length] }, children: [
          /* @__PURE__ */ a("h4", { children: [
            /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
              j.day + 1,
              "일차"
            ] }),
            Rt(u),
            " (",
            St(u),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: j.parts })
          ] }),
          /* @__PURE__ */ e(ma, { moves: j.res.moves, rate: l, me: o, unit: j.res.unit }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: j.items.map(($) => /* @__PURE__ */ e(Pa, { e: $, members: m, rate: l, onEdit: i }, $.id)) })
        ] }, j.day);
      })
    ] }),
    E === "all" && /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ a("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(ma, { moves: f.moves, rate: l, me: o, unit: S }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "전체 경비" }),
      /* @__PURE__ */ e(fa, { days: C, start: r, members: m, rate: l, onEdit: i, empty: "기록된 경비가 없어요." }),
      A.length > 0 && /* @__PURE__ */ a(V, { children: [
        /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "공금에서 돌려받을 돈" }),
        /* @__PURE__ */ e("ul", { className: "jt-people card", children: A.map(([j, u]) => /* @__PURE__ */ a("li", { children: [
          j === Ht ? /* @__PURE__ */ e("span", { className: "jt-fundtag", children: "?" }) : /* @__PURE__ */ e(rt, { name: j, members: m, size: 28 }),
          /* @__PURE__ */ a("div", { className: "jt-person-main", children: [
            /* @__PURE__ */ e("strong", { children: j === Ht ? "결제한 사람 미지정" : j }),
            /* @__PURE__ */ a("span", { children: [
              "공금 처리 경비 ",
              u.length,
              "건"
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "jt-net plus", children: Ne(u) })
        ] }, j)) })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: m.map((j) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ e(rt, { name: j, members: m, size: 28 }),
        /* @__PURE__ */ a("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: j }),
          /* @__PURE__ */ a("span", { children: [
            "결제 ",
            w(f.paid[j]),
            ", 쓴 돈 ",
            w(f.share[j])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + Ce(f.net[j]), children: ua(f.net[j], S) })
      ] }, j)) })
    ] })
  ] });
}
function xn({ id: t, data: n, className: o, onClick: i, alt: s = "사진" }) {
  let [d, m] = y(n || zt.get(t) || null), [l, r] = y(!1);
  H(() => {
    if (n) {
      m(n);
      return;
    }
    if (zt.has(t)) {
      m(zt.get(t));
      return;
    }
    let k = !0;
    return r(!1), li(t).then((E) => {
      k && (E ? m(E) : r(!0));
    }), () => {
      k = !1;
    };
  }, [t, n]);
  let h = d ? /* @__PURE__ */ e("img", { src: d, alt: s, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: l ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return i ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (o || ""), onClick: i, "aria-label": "사진 크게 보기", children: h }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (o || ""), children: h });
}
function qi({ photos: t, index: n, onClose: o }) {
  let [i, s] = y(n), d = t.length;
  return H(() => {
    let m = (l) => {
      l.key === "Escape" && o(), l.key === "ArrowRight" && s((r) => (r + 1) % d), l.key === "ArrowLeft" && s((r) => (r - 1 + d) % d);
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [d, o]), /* @__PURE__ */ a("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: o, children: [
    /* @__PURE__ */ e("button", { className: "jt-lb-close", onClick: o, "aria-label": "닫기", children: /* @__PURE__ */ e(Xt, { size: 24 }) }),
    /* @__PURE__ */ e("div", { className: "jt-lb-stage", onClick: (m) => m.stopPropagation(), children: /* @__PURE__ */ e(xn, { id: t[i], className: "contain" }) }),
    d > 1 && /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (m) => {
            m.stopPropagation(), s((i - 1 + d) % d);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ e(ba, { size: 26 })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (m) => {
            m.stopPropagation(), s((i + 1) % d);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ e(xa, { size: 26 })
        }
      ),
      /* @__PURE__ */ a("div", { className: "jt-lb-count", children: [
        i + 1,
        " / ",
        d
      ] })
    ] })
  ] });
}
function Vi({ text: t }) {
  let n = t.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ e("p", { className: "jt-post-text", children: n.map(
    (o, i) => i % 2 ? /* @__PURE__ */ e("a", { href: o, target: "_blank", rel: "noopener noreferrer", children: o }, i) : o
  ) });
}
function Ra({ url: t, onRemove: n }) {
  let o = /* @__PURE__ */ a(V, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(So, { size: 16 }) }),
    /* @__PURE__ */ a("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: ni(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return n ? /* @__PURE__ */ a("div", { className: "jt-linkcard", children: [
    o,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: n, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(Xt, { size: 16 }) })
  ] }) : /* @__PURE__ */ a("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    o,
    /* @__PURE__ */ e(Tt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function Zi({ initial: t, onSave: n, onDelete: o }) {
  let [i, s] = y(t?.text || ""), [d, m] = y(t?.urls || []), [l, r] = y(""), [h, k] = y(() => (t?.photos || []).map((x) => ({ id: x }))), [E, c] = y(!1), [F, f] = y(""), S = G(null), v = () => {
    if (!l.trim()) return;
    let x = qn(l);
    if (!x) {
      f("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    d.includes(x) || m([...d, x]), r(""), f("");
  }, N = async (x) => {
    let M = Array.from(x || []).filter((B) => B.type.startsWith("image/"));
    if (!M.length) return;
    let z = oe - h.length;
    if (z <= 0) {
      f(`사진은 글 하나에 ${oe}장까지 올릴 수 있어요.`);
      return;
    }
    c(!0), f("사진 준비 중");
    let C = [], p = 0;
    for (let B of M.slice(0, z))
      try {
        C.push({ id: yt(), data: await pi(B) });
      } catch {
        p++;
      }
    k((B) => [...B, ...C]), c(!1), p ? f(`${p}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : M.length > z ? f(`${oe}장까지만 넣었어요.`) : f(""), S.current && (S.current.value = "");
  }, A = async () => {
    let x = d;
    if (l.trim()) {
      let z = qn(l);
      if (!z) {
        f("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      x.includes(z) || (x = [...x, z]);
    }
    c(!0), f(h.some((z) => z.data) ? "사진 올리는 중" : ""), await n({ text: i.trim(), urls: x, photos: h }) || (c(!1), f("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, w = !E && (i.trim() || d.length || l.trim() || h.length);
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: i,
        onChange: (x) => s(x.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    h.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: h.map((x) => /* @__PURE__ */ a("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(xn, { id: x.id, data: x.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => k(h.filter((M) => M.id !== x.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(Xt, { size: 14 })
        }
      )
    ] }, x.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: S,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (x) => N(x.target.files)
      }
    ),
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => S.current && S.current.click(),
        disabled: E || h.length >= oe,
        children: [
          /* @__PURE__ */ e(Ao, { size: 17 }),
          "사진 추가 (",
          h.length,
          "/",
          oe,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      d.map((x) => /* @__PURE__ */ e(Ra, { url: x, onRemove: () => m(d.filter((M) => M !== x)) }, x)),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: l,
            onChange: (x) => r(x.target.value),
            onKeyDown: (x) => x.key === "Enter" && v(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: v, children: "추가" })
      ] })
    ] }),
    F && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: F }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !w, onClick: A, children: E ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(It, { onConfirm: o, label: "이 글 삭제" })
  ] });
}
function Qi({ post: t, me: n, members: o, onEdit: i, onLike: s, onComment: d, onDelComment: m, onOpenPhoto: l }) {
  let [r, h] = y(!1), k = t.photos || [], E = t.urls || [], c = t.comments || [], F = k.slice(0, 4);
  return /* @__PURE__ */ a("li", { className: "jt-post", children: [
    /* @__PURE__ */ a("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ e(rt, { name: t.by, members: o, size: 34 }),
      /* @__PURE__ */ a("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ e("strong", { children: t.by }),
        /* @__PURE__ */ a("span", { children: [
          ze(t.createdAt),
          t.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      t.by === n && /* @__PURE__ */ e("button", { className: "jt-icon sm", onClick: () => i(t), "aria-label": "내 글 고치기", children: /* @__PURE__ */ e(qt, { size: 17 }) })
    ] }),
    t.text && /* @__PURE__ */ e(Vi, { text: t.text }),
    k.length > 0 && /* @__PURE__ */ e("div", { className: "jt-gallery n" + Math.min(k.length, 4), children: F.map((f, S) => /* @__PURE__ */ a("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ e(xn, { id: f, onClick: () => l(k, S) }),
      S === 3 && k.length > 4 && /* @__PURE__ */ a("span", { className: "jt-more", children: [
        "+",
        k.length - 4
      ] })
    ] }, f)) }),
    E.length > 0 && /* @__PURE__ */ e("div", { className: "jt-links", children: E.map((f) => /* @__PURE__ */ e(Ra, { url: f }, f)) }),
    /* @__PURE__ */ a("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ e(Ie, { item: t, me: n, members: o, onReact: (f) => s(t.id, f) }),
      /* @__PURE__ */ e(gn, { count: c.length, open: r, onClick: () => h(!r) })
    ] }),
    r && /* @__PURE__ */ e(
      Fe,
      {
        comments: c,
        me: n,
        members: o,
        onAdd: (f) => d(t.id, f),
        onDelete: (f) => m(t.id, f)
      }
    )
  ] });
}
function ts({ settings: t, board: n, me: o, ...i }) {
  let [s, d] = y(null), m = [...n].sort((l, r) => r.createdAt - l.createdAt);
  return /* @__PURE__ */ a("section", { children: [
    m.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ e("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ e("ul", { className: "jt-posts", children: m.map((l) => /* @__PURE__ */ e(
      Qi,
      {
        post: l,
        me: o,
        members: t.members,
        onOpenPhoto: (r, h) => d({ photos: r, index: h }),
        ...i
      },
      l.id
    )) }),
    s && /* @__PURE__ */ e(qi, { photos: s.photos, index: s.index, onClose: () => d(null) })
  ] });
}
var tn = "trip:loc:", es = 3 * 6e4, ns = (t, n) => Z[(Math.max(0, t.indexOf(n)) * 2 + 3) % Z.length], as = (t) => !!t && t.online && typeof t.lat == "number" && Date.now() - t.at < es, $a = (t) => `https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`;
function os({ settings: t, me: n, locs: o, shareOn: i, onToggle: s, myPos: d, geoErr: m }) {
  let [l, r] = y(!1), [, h] = y(0);
  H(() => {
    let z = setInterval(() => h((C) => C + 1), 3e4);
    return () => clearInterval(z);
  }, []);
  let k = t.members, E = k.map((z) => ({ m: z, l: o[z], live: as(o[z]) })), c = E.filter((z) => z.live).map((z) => ({ id: z.m, lat: z.l.lat, lng: z.l.lng, color: ns(k, z.m), label: z.m, text: z.m[0] })), F = c.map((z) => `${z.id}:${z.lat.toFixed(5)}:${z.lng.toFixed(5)}`).join("|"), f = ce(() => c, [F]), [S, v] = y(null), [N, A] = y(() => {
    let z = c[0] || d;
    return z ? { lat: z.lat, lng: z.lng, z: 14 } : { lat: xt.lat, lng: xt.lng, z: 12 };
  }), w = () => {
    if (!c.length) return;
    let z = c.reduce((B, j) => B + j.lat, 0) / c.length, C = c.reduce((B, j) => B + j.lng, 0) / c.length, p = Math.max(...c.map((B) => Gt({ lat: z, lng: C }, B)));
    A({ lat: z, lng: C, z: p < 300 ? 16 : p < 1e3 ? 15 : p < 3e3 ? 13 : p < 1e4 ? 12 : 10 }), v(null);
  }, x = G(!1);
  H(() => {
    !x.current && c.length && (x.current = !0, w());
  }, [F]);
  let M = E.filter((z) => z.live).length;
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ a("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ e("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ e("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ a("button", { type: "button", className: "jt-helpbtn", onClick: () => r(!0), children: [
          /* @__PURE__ */ e(Fo, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ e("i", {}) })
    ] }),
    i && m && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-share-err", children: m }),
    /* @__PURE__ */ e(
      Ia,
      {
        gkey: t.gmapsKey,
        view: N,
        setView: A,
        pins: f,
        temp: null,
        selectedId: S,
        onTap: () => v(null),
        onPinTap: (z) => v(z),
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
      /* @__PURE__ */ a("button", { type: "button", className: "jt-secondary sm", onClick: w, disabled: !M, children: [
        /* @__PURE__ */ e(Io, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-fam-list", children: E.map(({ m: z, l: C, live: p }) => {
      let B = z === n, j = p && d && !B ? Gt(d, C) : null;
      return /* @__PURE__ */ a("li", { className: "jt-fam" + (p ? " live" : "") + (S === z ? " sel" : ""), children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !p,
            onClick: () => {
              v(z), A({ lat: C.lat, lng: C.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ a("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ e(rt, { name: z, members: k, size: 34 }),
                p && /* @__PURE__ */ e("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ a("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ a("strong", { children: [
                  z,
                  B ? " (나)" : ""
                ] }),
                /* @__PURE__ */ e("span", { children: p ? `위치 공유 중, ${ze(C.at)}${j != null ? `, 나와 ${Fa(j)}` : ""}` : C && C.at ? `앱 꺼짐, 마지막 접속 ${ze(C.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        p && !B && /* @__PURE__ */ a("a", { className: "jt-maplink", href: $a(C), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(At, { size: 13 }),
          "길 찾기"
        ] })
      ] }, z);
    }) }),
    l && /* @__PURE__ */ a(Nt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => r(!1), children: [
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
      /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: () => r(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ e("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var Ta = "trip:chat:", en = "trip:read:", nn = (t) => Ta + t.at.toString(36).padStart(10, "0") + "-" + t.id, is = (t) => {
  let n = new Date(t);
  return `${it(n.getHours())}:${it(n.getMinutes())}`;
}, ss = (t) => {
  let n = new Date(t);
  return `${n.getMonth() + 1}월 ${n.getDate()}일 (${St(n)})`;
};
function ga(t) {
  return t.split(/(https?:\/\/[^\s]+)/g).map(
    (n, o) => o % 2 ? /* @__PURE__ */ e("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, o) : n
  );
}
function rs({ settings: t, me: n, msgs: o, reads: i, notice: s, onSend: d, onDelete: m, onEdit: l, onPin: r, onUnpin: h, onSendLoc: k, badgeAsk: E, onBadgeAsk: c }) {
  let F = t.members, [f, S] = y(""), [v, N] = y(null), [A, w] = y(!1), [x, M] = y(null), [z, C] = y(""), [p, B] = y(!1), [j, u] = y(null), $ = s ? o.find((L) => L.id === s.id) : null, I = s ? { ...s, ...$ ? { text: $.text, kind: $.kind, lat: $.lat, lng: $.lng } : {} } : null, U = (L) => {
    let ot = document.getElementById("msg-" + L);
    ot && (ot.scrollIntoView({ block: "center", behavior: "smooth" }), u(L), setTimeout(() => u(null), 1600));
  }, T = (L) => {
    M(L.id), C(L.text), N(null);
  }, R = (L) => {
    let ot = z.trim();
    ot && (ot !== L.text && l(L, ot), M(null));
  }, g = G(null), Y = G(!0), lt = o.length;
  H(() => {
    let L = o[lt - 1], ot = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (Y.current || ot || L && L.by === n) && g.current && g.current.scrollIntoView({ block: "end", behavior: Y.current ? "auto" : "smooth" }), Y.current = !1;
  }, [lt]);
  let Q = () => {
    let L = f.trim();
    L && (d(L), S(""));
  }, me = async () => {
    w(!0), await k(), w(!1);
  }, fe = "", Lt = null;
  return /* @__PURE__ */ a("section", { className: "jt-chat", children: [
    lt === 0 && /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ e("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    I && /* @__PURE__ */ a("div", { className: "jt-notice" + (p ? " open" : ""), children: [
      /* @__PURE__ */ a("button", { type: "button", className: "jt-notice-head", onClick: () => B(!p), "aria-expanded": p, children: [
        /* @__PURE__ */ e(ya, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ e("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ e("span", { className: "jt-notice-text", children: I.kind === "loc" ? `${I.by}의 위치` : I.text }),
