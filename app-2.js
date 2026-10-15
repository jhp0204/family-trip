"1인당 ",
        q(k / i.length)
      ] }),
      i.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: $a.map((w) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (u === w ? " on" : ""), onClick: () => I(w), children: w }, w)) })
    ] }),
    /* @__PURE__ */ e(et, { label: "날짜", children: /* @__PURE__ */ e("select", { value: m, onChange: (w) => N(Number(w.target.value)), children: Array.from({ length: p }, (w, M) => {
      let _ = dt(d, M);
      return /* @__PURE__ */ o("option", { value: M, children: [
        M + 1,
        "일차 ",
        qt(_),
        " (",
        $t(_),
        ")"
      ] }, M);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !R,
        onClick: () => s({ title: v.trim(), amount: k, payer: g, cat: u, day: m, split: i }),
        children: r ? "수정 저장" : "경비 기록하기"
      }
    ),
    r && /* @__PURE__ */ e(xt, { onConfirm: j, label: "이 경비 삭제" })
  ] });
}
function Co({ initial: t, onSave: a, onDelete: n }) {
  let [r, s] = z(t?.text || ""), [j, b] = z(t?.urls || []), [p, d] = z(""), [h, v] = z(() => (t?.photos || []).map((i) => ({ id: i }))), [E, c] = z(!1), [A, g] = z(""), l = Y(null), u = () => {
    if (!p.trim()) return;
    let i = ha(p);
    if (!i) {
      g("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    j.includes(i) || b([...j, i]), d(""), g("");
  }, I = async (i) => {
    let x = Array.from(i || []).filter((R) => R.type.startsWith("image/"));
    if (!x.length) return;
    let k = Kt - h.length;
    if (k <= 0) {
      g(`사진은 글 하나에 ${Kt}장까지 올릴 수 있어요.`);
      return;
    }
    c(!0), g("사진 준비 중");
    let S = [], C = 0;
    for (let R of x.slice(0, k))
      try {
        S.push({ id: st(), data: await uo(R) });
      } catch {
        C++;
      }
    v((R) => [...R, ...S]), c(!1), C ? g(`${C}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : x.length > k ? g(`${Kt}장까지만 넣었어요.`) : g(""), l.current && (l.current.value = "");
  }, m = async () => {
    let i = j;
    if (p.trim()) {
      let k = ha(p);
      if (!k) {
        g("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      i.includes(k) || (i = [...i, k]);
    }
    c(!0), g(h.some((k) => k.data) ? "사진 올리는 중" : ""), await a({ text: r.trim(), urls: i, photos: h }) || (c(!1), g("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, N = !E && (r.trim() || j.length || p.trim() || h.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: r,
        onChange: (i) => s(i.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    h.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: h.map((i) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(bo, { id: i.id, data: i.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => v(h.filter((x) => x.id !== i.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(Vt, { size: 14 })
        }
      )
    ] }, i.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: l,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (i) => I(i.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => l.current && l.current.click(),
        disabled: E || h.length >= Kt,
        children: [
          /* @__PURE__ */ e(In, { size: 17 }),
          "사진 추가 (",
          h.length,
          "/",
          Kt,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      j.map((i) => /* @__PURE__ */ e(xo, { url: i, onRemove: () => b(j.filter((x) => x !== i)) }, i)),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: p,
            onChange: (i) => d(i.target.value),
            onKeyDown: (i) => i.key === "Enter" && u(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: u, children: "추가" })
      ] })
    ] }),
    A && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: A }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !N, onClick: m, children: E ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(xt, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
var it = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Ba = 16;
function Ie(t) {
  return t === 0 ? { Icon: Yn, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: Jn, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: fa, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: qn, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: Gn, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: Xn, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: Vn, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: Zn, label: "뇌우", tone: "#7B5FC4" } : { Icon: fa, label: "흐림", tone: "#66718A" };
}
var Ft = (t) => t == null ? "–" : Math.round(t) + "°", Na = /* @__PURE__ */ new Map();
async function Ca(t) {
  let a = Na.get(t);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(t);
  if (!n.ok) throw new Error("weather " + n.status);
  let r = await n.json();
  return Na.set(t, { at: Date.now(), d: r }), r;
}
var za = (t, a) => {
  let n = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + a}-${n}`;
};
function zo(t, a) {
  let [n, r] = z({ status: "loading" });
  return W(() => {
    let s = !0, j = async () => {
      try {
        let p = `latitude=${it.lat}&longitude=${it.lng}&timezone=Asia%2FTokyo`, d = await Ca(
          `https://api.open-meteo.com/v1/forecast?${p}&forecast_days=${Ba}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), h = {};
        d.daily.time.forEach((l, u) => {
          h[l] = {
            code: d.daily.weather_code[u],
            max: d.daily.temperature_2m_max[u],
            min: d.daily.temperature_2m_min[u],
            pop: d.daily.precipitation_probability_max[u],
            sum: d.daily.precipitation_sum[u]
          };
        });
        let v = {};
        d.hourly.time.forEach((l, u) => {
          v[l.slice(0, 13)] = {
            t: d.hourly.temperature_2m[u],
            pop: d.hourly.precipitation_probability[u],
            code: d.hourly.weather_code[u]
          };
        });
        let E = pt(/* @__PURE__ */ new Date()), A = Array.from({ length: a }, (l, u) => pt(dt(t, u))).filter((l) => !h[l] && l > E), g = {};
        if (A.length) {
          let l = await Promise.all(
            [1, 2, 3].map(
              (I) => Ca(
                `https://archive-api.open-meteo.com/v1/archive?${p}&start_date=${za(A[0], -I)}&end_date=${za(A[A.length - 1], -I)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), u = {};
          l.filter(Boolean).forEach(
            (I) => I.daily.time.forEach((m, N) => {
              let i = I.daily.temperature_2m_max[N];
              if (i == null) return;
              let x = m.slice(5), k = u[x] || (u[x] = { max: 0, min: 0, wet: 0, n: 0 });
              k.max += i, k.min += I.daily.temperature_2m_min[N], k.wet += (I.daily.precipitation_sum[N] || 0) >= 1 ? 1 : 0, k.n++;
            })
          ), A.forEach((I) => {
            let m = u[I.slice(5) === "02-29" ? "02-28" : I.slice(5)];
            m && m.n && (g[I] = { max: m.max / m.n, min: m.min / m.n, wet: m.wet, n: m.n });
          });
        }
        s && r({ status: "ok", daily: h, hourly: v, climate: g, at: /* @__PURE__ */ new Date() });
      } catch {
        s && r((d) => d.status === "ok" ? d : { status: "error" });
      }
    };
    j();
    let b = setInterval(j, 30 * 6e4);
    return () => {
      s = !1, clearInterval(b);
    };
  }, [t, a]), n;
}
function Eo({ date: t, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      it.name,
      " 날씨"
    ] }),
    a.status === "ok" && a.daily[t] && /* @__PURE__ */ e("em", { children: `${at(a.at.getHours())}:${at(a.at.getMinutes())} 업데이트` })
  ] });
  if (a.status === "loading")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (a.status === "error")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let r = a.daily[t];
  if (r) {
    let { Icon: j, label: b, tone: p } = Ie(r.code), d = (r.pop || 0) >= 50 || (r.sum || 0) >= 1, h = ["09", "12", "15", "18", "21"].map((v) => ({ h: v, v: a.hourly[`${t}T${v}`] })).filter((v) => v.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(j, { size: 40, color: p, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: b }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: Ft(r.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: Ft(r.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(Qn, { size: 15, "aria-hidden": "true" }),
          r.pop == null ? "–" : r.pop + "%"
        ] })
      ] }),
      d && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      h.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: h.map(({ h: v, v: E }) => {
        let c = Ie(E.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            v,
            "시"
          ] }),
          /* @__PURE__ */ e(c.Icon, { size: 18, color: c.tone, "aria-label": c.label }),
          /* @__PURE__ */ e("b", { children: Ft(E.t) }),
          /* @__PURE__ */ e("em", { children: E.pop == null ? "" : E.pop + "%" })
        ] }, v);
      }) })
    ] });
  }
  let s = a.climate[t];
  return s ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Ba,
      "일 전부터 나와요. 최근 ",
      s.n,
      "년 같은 날 ",
      it.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: Ft(s.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: Ft(s.min) }),
      "였고, ",
      s.n,
      "번 중 ",
      s.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function Mo({ v: t }) {
  if (!t) return null;
  let { Icon: a, label: n, tone: r } = Ie(t.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ e(a, { size: 14, color: r, "aria-hidden": "true" }),
    Ft(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var re = 56;
function Ao({ items: t, isToday: a, onEdit: n, members: r, onAddAt: s }) {
  let [j, b] = z(null), [p, d] = z(() => {
    let i = /* @__PURE__ */ new Date();
    return i.getHours() * 60 + i.getMinutes();
  });
  W(() => {
    if (!a) return;
    let i = setInterval(() => {
      let x = /* @__PURE__ */ new Date();
      d(x.getHours() * 60 + x.getMinutes());
    }, 6e4);
    return () => clearInterval(i);
  }, [a]);
  let h = t.filter((i) => i.time).map((i) => ({ ...i, ...Xt(i) })).sort((i, x) => i.s - x.s || i.e - x.e), v = [], E = [], c = -1;
  h.forEach((i) => {
    E.length && i.s >= c && (v.push(E), E = [], c = -1), E.push(i), c = Math.max(c, i.e);
  }), E.length && v.push(E);
  let A = [];
  v.forEach((i) => {
    let x = [];
    i.forEach((k) => {
      let S = x.findIndex((C) => C <= k.s);
      S === -1 ? (S = x.length, x.push(k.e)) : x[S] = k.e, A.push({ ...k, col: S, cl: i });
    }), i.ncol = x.length;
  });
  let g = h.length ? Math.min(8, Math.floor(h[0].s / 60)) : 8, l = h.length ? Math.max(21, Math.ceil(Math.max(...h.map((i) => i.e)) / 60)) : 21, u = (i) => {
    let x = i.currentTarget.getBoundingClientRect(), k = g * 60 + (i.clientY - x.top) / re * 60;
    return Math.max(g * 60, Math.min(Math.floor(k / 30) * 30, l * 60 - 30, 23 * 60 + 30));
  }, I = Array.from({ length: l - g + 1 }, (i, x) => g + x), m = (i) => (i - g * 60) / 60 * re, N = t.length - h.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (l - g) * re + 14 }, children: [
      I.map((i) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: m(i * 60) }, children: /* @__PURE__ */ o("span", { children: [
        at(i % 24),
        ":00"
      ] }) }, i)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (i) => {
            i.target.closest(".jt-tt-block") || !s || s(It(u(i)));
          },
          onPointerMove: (i) => {
            if (i.pointerType !== "mouse" || i.target.closest(".jt-tt-block")) return b(null);
            b(u(i));
          },
          onPointerLeave: () => b(null),
          children: [
            j != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: m(j) + 1, height: re / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              It(j),
              " 일정 추가"
            ] }),
            A.map((i) => {
              let x = i.cl.ncol, k = Math.max(24, m(i.e) - m(i.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (k < 44 ? " short" : "") + (x > 1 ? " clash" : ""),
                  style: {
                    top: m(i.s) + 1,
                    height: k,
                    left: `calc(${i.col / x * 100}% + 2px)`,
                    width: `calc(${100 / x}% - 4px)`
                  },
                  onClick: () => n(i),
                  "aria-label": `${i.time} ${i.title} 고치기`,
                  children: [
                    /* @__PURE__ */ e("strong", { children: i.title }),
                    /* @__PURE__ */ o("span", { children: [
                      It(i.s),
                      "~",
                      It(i.e % (24 * 60)),
                      i.place ? `, ${i.place}` : ""
                    ] })
                  ]
                },
                i.id
              );
            })
          ]
        }
      ),
      a && p >= g * 60 && p <= l * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: m(p) }, "aria-label": `지금 ${It(p)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      N > 0 ? ` 시간을 정하지 않은 일정 ${N}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function So({ settings: t, schedule: a, day: n, setDay: r, onEdit: s, onAddAt: j, me: b, onComment: p, onDelComment: d, onReact: h }) {
  let [v, E] = z(null), { start: c, days: A, members: g } = t, l = Q[n % Q.length], u = a.filter((x) => x.day === n).sort((x, k) => (x.time || "99:99").localeCompare(k.time || "99:99")), I = so(u), m = pt(dt(c, n)), N = m === pt(/* @__PURE__ */ new Date()), i = zo(c, A);
  return /* @__PURE__ */ o("section", { style: { "--lc": l }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: A }, (x, k) => {
      let S = dt(c, k), C = k === n;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": C,
          className: "jt-day" + (C ? " active" : ""),
          style: { "--lc": Q[k % Q.length] },
          onClick: () => r(k),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: k + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: qt(S) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: $t(S) })
          ]
        },
        k
      );
    }) }),
    /* @__PURE__ */ e(Eo, { date: m, w: i }),
    u.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ e("ol", { className: "jt-line", children: u.map((x, k) => {
      let S = x.time ? Xt(x) : null, C = u[k + 1], R = C && se(C);
      return /* @__PURE__ */ o("li", { className: "jt-row", children: [
        /* @__PURE__ */ e("div", { className: "jt-time", children: x.time || "미정" }),
        /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
        /* @__PURE__ */ o(
          "div",
          {
            className: "jt-card",
            role: "button",
            tabIndex: 0,
            onClick: () => s(x),
            onKeyDown: (w) => w.key === "Enter" && s(x),
            children: [
              /* @__PURE__ */ o("div", { className: "jt-card-top", children: [
                /* @__PURE__ */ e("div", { className: "jt-card-title", children: x.title }),
                x.time && i.status === "ok" && /* @__PURE__ */ e(Mo, { v: i.hourly[`${m}T${x.time.slice(0, 2)}`] })
              ] }),
              S && x.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                x.time,
                "~",
                x.end,
                ", ",
                Ra(S.e - S.s)
              ] }),
              I.has(x.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              x.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(Nt, { size: 13 }),
                x.place
              ] }),
              x.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: x.memo }),
              (x.place || x.link || ht(x)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: Rt(x),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (w) => w.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Et, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              R && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-next",
                  href: lo(x, C),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (w) => w.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Ct, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ e("b", { children: C.title }),
                      "까지 길 찾기",
                      se(x) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(rt, { name: x.by, members: g, size: 16 }),
                  x.by
                ] }),
                /* @__PURE__ */ e(Te, { item: x, me: b, onReact: (w) => h(x.id, w) }),
                /* @__PURE__ */ e(
                  Ta,
                  {
                    count: (x.comments || []).length,
                    open: v === x.id,
                    onClick: () => E(v === x.id ? null : x.id)
                  }
                )
              ] }),
              v === x.id && /* @__PURE__ */ e(
                Be,
                {
                  comments: x.comments || [],
                  me: b,
                  members: g,
                  onAdd: (w) => p(x.id, w),
                  onDelete: (w) => d(x.id, w)
                }
              )
            ]
          }
        )
      ] }, x.id);
    }) }),
    /* @__PURE__ */ e(Ao, { items: u, isToday: N, onEdit: s, members: g, onAddAt: (x) => j && j(n, x) })
  ] });
}
function Io({ view: t, setView: a, pins: n, temp: r, selectedId: s, onTap: j, onPinTap: b }) {
  let p = Y(null), [d, h] = z({ w: 0, h: 0 }), v = Y(/* @__PURE__ */ new Map()), E = Y({ moved: !1, startDist: 0 }), c = Y(0), [A, g] = z({ ok: 0, bad: 0 });
  W(() => {
    let M = p.current;
    if (!M) return;
    let _ = () => h({ w: M.clientWidth, h: M.clientHeight });
    _();
    let O = new ResizeObserver(_);
    return O.observe(M), () => O.disconnect();
  }, []);
  let l = t.z, u = Ne(t.lat, t.lng, l), I = u.x - d.w / 2, m = u.y - d.h / 2, N = 2 ** l, i = [];
  if (d.w) {
    let M = Math.floor(I / ft), _ = Math.floor((I + d.w) / ft), O = Math.max(0, Math.floor(m / ft)), X = Math.min(N - 1, Math.floor((m + d.h) / ft));
    for (let U = M; U <= _; U++)
      for (let y = O; y <= X; y++) {
        let K = (U % N + N) % N;
        i.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${l}/${K}/${y}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => g((G) => G.ok ? G : { ...G, ok: 1 }),
              onError: () => g((G) => G.bad ? G : { ...G, bad: 1 }),
              style: { left: Math.round(U * ft - I), top: Math.round(y * ft - m) }
            },
            `${l}/${U}/${y}`
          )
        );
      }
  }
  let x = (M) => {
    if (!M.target.closest("[data-pin],.jt-zoom,.jt-attr") && (p.current.setPointerCapture(M.pointerId), v.current.set(M.pointerId, { x: M.clientX, y: M.clientY }), v.current.size === 1 && (E.current = { moved: !1, startDist: 0 }), v.current.size === 2)) {
      let [_, O] = [...v.current.values()];
      E.current.startDist = Math.hypot(_.x - O.x, _.y - O.y), E.current.moved = !0;
    }
  }, k = (M) => {
    let _ = v.current.get(M.pointerId);
    if (!_) return;
    let O = M.clientX - _.x, X = M.clientY - _.y;
    if (v.current.size === 1) {
      if (!E.current.moved && Math.hypot(O, X) < 4) return;
      E.current.moved = !0, v.current.set(M.pointerId, { x: M.clientX, y: M.clientY }), a((U) => {
        let y = Ne(U.lat, U.lng, U.z), K = ja(y.x - O, y.y - X, U.z);
        return { ...U, lat: Math.max(-80, Math.min(80, K.lat)), lng: K.lng };
      });
    } else
      v.current.set(M.pointerId, { x: M.clientX, y: M.clientY });
  }, S = (M) => {
    let _ = v.current.get(M.pointerId);
    if (!_) return;
    let O = v.current.size === 1;
    if (v.current.delete(M.pointerId), E.current.startDist && v.current.size === 1) {
      let [X] = [...v.current.values()], U = Math.hypot(_.x - X.x, _.y - X.y) / E.current.startDist;
      U > 1.35 ? a((y) => ({ ...y, z: Wt(y.z + (U > 2.6 ? 2 : 1)) })) : U < 0.7 && a((y) => ({ ...y, z: Wt(y.z - (U < 0.38 ? 2 : 1)) })), E.current.startDist = 0;
    }
    if (O && !E.current.moved && M.type === "pointerup") {
      let X = p.current.getBoundingClientRect(), U = ja(I + (M.clientX - X.left), m + (M.clientY - X.top), l);
      j(U.lat, U.lng);
    }
  }, C = (M) => {
    let _ = Date.now();
    _ - c.current < 250 || (c.current = _, a((O) => ({ ...O, z: Wt(O.z + (M.deltaY < 0 ? 1 : -1)) })));
  }, R = (M, _) => {
    let O = Ne(M, _, l);
    return { left: O.x - I, top: O.y - m };
  }, w = (M) => M.left > -40 && M.left < d.w + 40 && M.top > -50 && M.top < d.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: p,
      onPointerDown: x,
      onPointerMove: k,
      onPointerUp: S,
      onPointerCancel: S,
      onWheel: C,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        i,
        A.bad > 0 && A.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        d.w > 0 && n.map((M) => {
          let _ = R(M.lat, M.lng);
          return w(_) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (M.id === s ? " sel" : ""),
              style: { left: _.left, top: _.top, "--pc": M.color },
              onClick: () => b(M.id),
              "aria-label": M.label,
              children: /* @__PURE__ */ e("i", {})
            },
            M.id
          ) : null;
        }),
        d.w > 0 && r && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: R(r.lat, r.lng).left, top: R(r.lat, r.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((M) => ({ ...M, z: Wt(M.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((M) => ({ ...M, z: Wt(M.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Ea = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Fo = "https://tiles.openfreemap.org/styles/liberty", Ht = null;
function Do() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Ht || (Ht = new Promise((t, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = Ea + "maplibre-gl.css", document.head.appendChild(n);
    let r = document.createElement("script");
    r.src = Ea + "maplibre-gl.js", r.onload = () => window.maplibregl ? t(window.maplibregl) : a(new Error("maplibre")), r.onerror = () => {
      Ht = null, a(new Error("maplibre"));
    }, document.head.appendChild(r);
  }), Ht);
}
var Po = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function $o(t) {
  (t.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        t.setLayoutProperty(a.id, "text-field", Po);
      } catch {
      }
  });
}
var Ro = (t) => String(t).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), Fe = (t, a, n) => {
  let r = a ? 34 : 28, s = a ? 44 : 36, j = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${t}" font-family="sans-serif">${Ro(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${r}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/>${j}</svg>`;
};
function Oa(t) {
  let { view: a, setView: n, pins: r, temp: s, selectedId: j, onTap: b, onPinTap: p } = t, d = Y(null), h = Y(null), v = Y(null), E = Y([]), c = Y(null), A = Y({});
  A.current = { onTap: b, onPinTap: p, setView: n };
  let [g, l] = z("loading");
  return W(() => {
    let u = !0;
    return Do().then((I) => {
      if (!u || !d.current) return;
      v.current = I;
      let m = new I.Map({
        container: d.current,
        style: Fo,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      m.touchZoomRotate.disableRotation(), m.addControl(new I.NavigationControl({ showCompass: !1 }), "top-right"), m.on("load", () => {
        $o(m), u && l("ok");
      }), m.on("click", (N) => {
        N.originalEvent && N.originalEvent.target.closest && N.originalEvent.target.closest(".jt-mlpin") || A.current.onTap(N.lngLat.lat, N.lngLat.lng);
      }), m.on("moveend", () => {
        let N = m.getCenter();
        A.current.setView({ lat: N.lat, lng: N.lng, z: m.getZoom() + 1 });
      }), h.current = m, setTimeout(() => u && !m.loaded() && l((N) => N === "loading" ? "slow" : N), 6e3), setTimeout(() => {
        u && h.current === m && !m.loaded() && (m.remove(), h.current = null, l("fail"));
      }, 15e3);
    }).catch(() => u && l("fail")), () => {
      u = !1, h.current && h.current.remove(), h.current = null;
    };
  }, []), W(() => {
    let u = h.current;
    if (!u) return;
    let I = u.getCenter();
    (Math.abs(I.lat - a.lat) > 1e-6 || Math.abs(I.lng - a.lng) > 1e-6 || Math.abs(u.getZoom() + 1 - a.z) > 0.01) && u.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), W(() => {
    let u = h.current, I = v.current;
    !u || !I || (E.current.forEach((m) => m.remove()), E.current = r.map((m) => {
      let N = document.createElement("button");
      return N.type = "button", N.className = "jt-mlpin" + (m.id === j ? " sel" : ""), N.setAttribute("aria-label", m.label), N.innerHTML = Fe(m.color, m.id === j, m.text), N.addEventListener("click", (i) => {
        i.stopPropagation(), A.current.onPinTap(m.id);
      }), new I.Marker({ element: N, anchor: "bottom" }).setLngLat([m.lng, m.lat]).addTo(u);
    }));
  }, [r, j, g]), W(() => {
    let u = h.current, I = v.current;
    if (c.current && c.current.remove(), c.current = null, !u || !I || !s) return;
    let m = document.createElement("div");
    m.className = "jt-mlpin temp", m.innerHTML = Fe("#14213D", !0), c.current = new I.Marker({ element: m, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(u);
  }, [s, g]), g === "fail" ? /* @__PURE__ */ e(Io, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: d, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (g === "loading" || g === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: g === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Yt = null, Dt = "", zt = !1, De = /* @__PURE__ */ new Set();
function Oe(t) {
  return zt ? Promise.reject(new Error("auth")) : Yt && Dt === t ? Yt : Dt && Dt !== t ? Promise.reject(new Error("reload")) : (Dt = t, Yt = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      zt = !0, De.forEach((s) => s()), n(new Error("auth"));
    };
    let r = document.createElement("script");
    r.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", r.async = !0, r.onerror = () => {
      Yt = null, Dt = "", n(new Error("load"));
    }, document.head.appendChild(r);
  }), Yt);
}
var _o = (t) => !!t && !zt && Dt === t && !!(window.google && window.google.maps);
function Lo(t) {
  let { view: a, setView: n, pins: r, temp: s, selectedId: j, onTap: b, onPinTap: p, onPoi: d, gkey: h } = t, v = Y(null), E = Y(null), c = Y(null), A = Y([]), g = Y(null), l = Y({});
  l.current = { onTap: b, onPinTap: p, onPoi: d, setView: n };
  let [u, I] = z(zt ? "fail" : "loading");
  W(() => {
    let N = !0, i = () => N && I("fail");
    return De.add(i), Oe(h).then(async (x) => {
      let { Map: k } = await x.importLibrary("maps"), { Marker: S } = await x.importLibrary("marker"), { Size: C, Point: R } = await x.importLibrary("core");
      if (!N || !v.current) return;
      c.current = { Marker: S, Size: C, Point: R };
      let w = new k(v.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      w.addListener("click", async (M) => {
        if (M.placeId) {
          M.stop();
          try {
            let { Place: _ } = await x.importLibrary("places"), O = new _({ id: M.placeId });
            await O.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), l.current.onPoi({
              name: O.displayName || "",
              lat: O.location.lat(),
              lng: O.location.lng(),
              area: O.formattedAddress || "",
              link: O.googleMapsURI || "",
              placeId: M.placeId
            });
            return;
          } catch {
          }
        }
        l.current.onTap(M.latLng.lat(), M.latLng.lng());
      }), w.addListener("idle", () => {
        let M = w.getCenter();
        l.current.setView({ lat: M.lat(), lng: M.lng(), z: w.getZoom() });
      }), E.current = w, I("ok");
    }).catch(() => N && I("fail")), () => {
      N = !1, De.delete(i);
    };
  }, [h]), W(() => {
    let N = E.current;
    if (!N) return;
    let i = N.getCenter();
    (Math.abs(i.lat() - a.lat) > 1e-6 || Math.abs(i.lng() - a.lng) > 1e-6) && N.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== N.getZoom() && N.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let m = (N, i, x) => {
    let k = c.current, S = i ? 34 : 28, C = i ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(Fe(N, i, x).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new k.Size(S, C),
      anchor: new k.Point(S / 2, C)
    };
  };
  return W(() => {
    let N = E.current, i = c.current;
    !N || !i || (A.current.forEach((x) => x.setMap(null)), A.current = r.map((x) => {
      let k = new i.Marker({ position: { lat: x.lat, lng: x.lng }, map: N, title: x.label, icon: m(x.color, x.id === j, x.text), zIndex: x.id === j ? 10 : 1 });
      return k.addListener("click", () => l.current.onPinTap(x.id)), k;
    }));
  }, [r, j, u]), W(() => {
    let N = E.current, i = c.current;
    g.current && g.current.setMap(null), g.current = null, !(!N || !i || !s) && (g.current = new i.Marker({ position: { lat: s.lat, lng: s.lng }, map: N, icon: m("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, u]), u === "fail" ? /* @__PURE__ */ e(Oa, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: v, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    u === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Ua(t) {
  return t.gkey && !zt ? /* @__PURE__ */ e(Lo, { ...t }) : /* @__PURE__ */ e(Oa, { ...t });
}
var Ma = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], To = [500, 1e3, 2e3], ze = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function ce(t, a) {
  let n = (b) => b * Math.PI / 180, r = n(a.lat - t.lat), s = n(a.lng - t.lng), j = Math.sin(r / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(j));
}
var Ka = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Bo(t, a, n, r) {
  let s = await Oe(t), { Place: j, SearchNearbyRankPreference: b } = await s.importLibrary("places"), { places: p } = await j.searchNearby({
    fields: [
      "id",
      "displayName",
      "location",
      "formattedAddress",
      "rating",
      "userRatingCount",
      "primaryTypeDisplayName",
      "googleMapsURI",
      "regularOpeningHours",
      "utcOffsetMinutes"
    ],
    locationRestriction: { center: a, radius: r },
    includedTypes: n.g,
    maxResultCount: 15,
    rankPreference: b.POPULARITY,
    language: "ko"
  }), d = [];
  for (let h of p || []) {
    let v;
    try {
      v = h.regularOpeningHours ? await h.isOpen() : void 0;
    } catch {
      v = void 0;
    }
    d.push({
      id: h.id,
      placeId: h.id,
      name: h.displayName,
      lat: h.location.lat(),
      lng: h.location.lng(),
      type: h.primaryTypeDisplayName || n.label,
      rating: h.rating,
      count: h.userRatingCount,
      addr: h.formattedAddress || "",
      url: h.googleMapsURI || "",
      open: v
    });
  }
  return d;
}
async function Oo(t, a, n) {
  let r = `[out:json][timeout:20];nwr(around:${n},${t.lat},${t.lng})${a.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(r));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((b) => {
    let p = b.tags || {}, d = p["name:ko"] || p["name:en"] || "";
    return {
      id: "osm" + b.type + b.id,
      name: d || p.name,
      sub: d && p.name && p.name !== d ? p.name : "",
      lat: b.lat != null ? b.lat : b.center && b.center.lat,
      lng: b.lon != null ? b.lon : b.center && b.center.lon,
