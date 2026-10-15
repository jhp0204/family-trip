return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(at, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: v, onChange: (S) => k(S.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(at, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: c, onChange: (S) => z(S.target.value), placeholder: "0" }) }),
    y > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: Kt(y, h) }),
      /* @__PURE__ */ e("br", {}),
      te(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: te(t) }),
    D.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      D.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: g.map((S) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (f === S ? " on" : ""), onClick: () => s(S), children: S }, S)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: g.map((S) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (i.includes(S) ? " on" : ""), onClick: () => E(S), children: [
        i.includes(S) && /* @__PURE__ */ e(ma, { size: 14 }),
        S
      ] }, S)) }),
      y > 0 && i.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        Y(y / i.length)
      ] }),
      i.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: fa.map((S) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (u === S ? " on" : ""), onClick: () => A(S), children: S }, S)) })
    ] }),
    /* @__PURE__ */ e(at, { label: "날짜", children: /* @__PURE__ */ e("select", { value: m, onChange: (S) => w(Number(S.target.value)), children: Array.from({ length: p }, (S, M) => {
      let _ = dt(d, M);
      return /* @__PURE__ */ o("option", { value: M, children: [
        M + 1,
        "일차 ",
        Ot(_),
        " (",
        Ut(_),
        ")"
      ] }, M);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !R,
        onClick: () => l({ title: v.trim(), amount: y, payer: f, cat: u, day: m, split: i }),
        children: r ? "수정 저장" : "경비 기록하기"
      }
    ),
    r && /* @__PURE__ */ e(wt, { onConfirm: x, label: "이 경비 삭제" })
  ] });
}
function Vn({ initial: t, onSave: a, onDelete: n }) {
  let [r, l] = N(t?.text || ""), [x, g] = N(t?.urls || []), [p, d] = N(""), [h, v] = N(() => (t?.photos || []).map((i) => ({ id: i }))), [k, c] = N(!1), [z, f] = N(""), s = J(null), u = () => {
    if (!p.trim()) return;
    let i = Ze(p);
    if (!i) {
      f("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    x.includes(i) || g([...x, i]), d(""), f("");
  }, A = async (i) => {
    let b = Array.from(i || []).filter((R) => R.type.startsWith("image/"));
    if (!b.length) return;
    let y = Rt - h.length;
    if (y <= 0) {
      f(`사진은 글 하나에 ${Rt}장까지 올릴 수 있어요.`);
      return;
    }
    c(!0), f("사진 준비 중");
    let D = [], E = 0;
    for (let R of b.slice(0, y))
      try {
        D.push({ id: gt(), data: await Ln(R) });
      } catch {
        E++;
      }
    v((R) => [...R, ...D]), c(!1), E ? f(`${E}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : b.length > y ? f(`${Rt}장까지만 넣었어요.`) : f(""), s.current && (s.current.value = "");
  }, m = async () => {
    let i = x;
    if (p.trim()) {
      let y = Ze(p);
      if (!y) {
        f("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      i.includes(y) || (i = [...i, y]);
    }
    c(!0), f(h.some((y) => y.data) ? "사진 올리는 중" : ""), await a({ text: r.trim(), urls: i, photos: h }) || (c(!1), f("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, w = !k && (r.trim() || x.length || p.trim() || h.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: r,
        onChange: (i) => l(i.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    h.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: h.map((i) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(Un, { id: i.id, data: i.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => v(h.filter((b) => b.id !== i.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(Ht, { size: 14 })
        }
      )
    ] }, i.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: s,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (i) => A(i.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => s.current && s.current.click(),
        disabled: k || h.length >= Rt,
        children: [
          /* @__PURE__ */ e(nn, { size: 17 }),
          "사진 추가 (",
          h.length,
          "/",
          Rt,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      x.map((i) => /* @__PURE__ */ e(Wn, { url: i, onRemove: () => g(x.filter((b) => b !== i)) }, i)),
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
    z && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: z }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !w, onClick: m, children: k ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(wt, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
var st = { name: "오사카", lat: 34.6937, lng: 135.5023 }, va = 16;
function ye(t) {
  return t === 0 ? { Icon: jn, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: vn, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: Xe, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: yn, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: wn, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: kn, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: Nn, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: Cn, label: "뇌우", tone: "#7B5FC4" } : { Icon: Xe, label: "흐림", tone: "#66718A" };
}
var Mt = (t) => t == null ? "–" : Math.round(t) + "°", ra = /* @__PURE__ */ new Map();
async function ia(t) {
  let a = ra.get(t);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(t);
  if (!n.ok) throw new Error("weather " + n.status);
  let r = await n.json();
  return ra.set(t, { at: Date.now(), d: r }), r;
}
var sa = (t, a) => {
  let n = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + a}-${n}`;
};
function Zn(t, a) {
  let [n, r] = N({ status: "loading" });
  return H(() => {
    let l = !0, x = async () => {
      try {
        let p = `latitude=${st.lat}&longitude=${st.lng}&timezone=Asia%2FTokyo`, d = await ia(
          `https://api.open-meteo.com/v1/forecast?${p}&forecast_days=${va}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), h = {};
        d.daily.time.forEach((s, u) => {
          h[s] = {
            code: d.daily.weather_code[u],
            max: d.daily.temperature_2m_max[u],
            min: d.daily.temperature_2m_min[u],
            pop: d.daily.precipitation_probability_max[u],
            sum: d.daily.precipitation_sum[u]
          };
        });
        let v = {};
        d.hourly.time.forEach((s, u) => {
          v[s.slice(0, 13)] = {
            t: d.hourly.temperature_2m[u],
            pop: d.hourly.precipitation_probability[u],
            code: d.hourly.weather_code[u]
          };
        });
        let k = ct(/* @__PURE__ */ new Date()), z = Array.from({ length: a }, (s, u) => ct(dt(t, u))).filter((s) => !h[s] && s > k), f = {};
        if (z.length) {
          let s = await Promise.all(
            [1, 2, 3].map(
              (A) => ia(
                `https://archive-api.open-meteo.com/v1/archive?${p}&start_date=${sa(z[0], -A)}&end_date=${sa(z[z.length - 1], -A)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), u = {};
          s.filter(Boolean).forEach(
            (A) => A.daily.time.forEach((m, w) => {
              let i = A.daily.temperature_2m_max[w];
              if (i == null) return;
              let b = m.slice(5), y = u[b] || (u[b] = { max: 0, min: 0, wet: 0, n: 0 });
              y.max += i, y.min += A.daily.temperature_2m_min[w], y.wet += (A.daily.precipitation_sum[w] || 0) >= 1 ? 1 : 0, y.n++;
            })
          ), z.forEach((A) => {
            let m = u[A.slice(5) === "02-29" ? "02-28" : A.slice(5)];
            m && m.n && (f[A] = { max: m.max / m.n, min: m.min / m.n, wet: m.wet, n: m.n });
          });
        }
        l && r({ status: "ok", daily: h, hourly: v, climate: f, at: /* @__PURE__ */ new Date() });
      } catch {
        l && r((d) => d.status === "ok" ? d : { status: "error" });
      }
    };
    x();
    let g = setInterval(x, 30 * 6e4);
    return () => {
      l = !1, clearInterval(g);
    };
  }, [t, a]), n;
}
function Qn({ date: t, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      st.name,
      " 날씨"
    ] }),
    a.status === "ok" && a.daily[t] && /* @__PURE__ */ e("em", { children: `${ot(a.at.getHours())}:${ot(a.at.getMinutes())} 업데이트` })
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
    let { Icon: x, label: g, tone: p } = ye(r.code), d = (r.pop || 0) >= 50 || (r.sum || 0) >= 1, h = ["09", "12", "15", "18", "21"].map((v) => ({ h: v, v: a.hourly[`${t}T${v}`] })).filter((v) => v.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(x, { size: 40, color: p, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: g }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: Mt(r.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: Mt(r.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(zn, { size: 15, "aria-hidden": "true" }),
          r.pop == null ? "–" : r.pop + "%"
        ] })
      ] }),
      d && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      h.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: h.map(({ h: v, v: k }) => {
        let c = ye(k.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            v,
            "시"
          ] }),
          /* @__PURE__ */ e(c.Icon, { size: 18, color: c.tone, "aria-label": c.label }),
          /* @__PURE__ */ e("b", { children: Mt(k.t) }),
          /* @__PURE__ */ e("em", { children: k.pop == null ? "" : k.pop + "%" })
        ] }, v);
      }) })
    ] });
  }
  let l = a.climate[t];
  return l ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      va,
      "일 전부터 나와요. 최근 ",
      l.n,
      "년 같은 날 ",
      st.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: Mt(l.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: Mt(l.min) }),
      "였고, ",
      l.n,
      "번 중 ",
      l.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function to({ v: t }) {
  if (!t) return null;
  let { Icon: a, label: n, tone: r } = ye(t.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ e(a, { size: 14, color: r, "aria-hidden": "true" }),
    Mt(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var Zt = 56;
function eo({ items: t, isToday: a, onEdit: n, members: r, onAddAt: l }) {
  let [x, g] = N(null), [p, d] = N(() => {
    let i = /* @__PURE__ */ new Date();
    return i.getHours() * 60 + i.getMinutes();
  });
  H(() => {
    if (!a) return;
    let i = setInterval(() => {
      let b = /* @__PURE__ */ new Date();
      d(b.getHours() * 60 + b.getMinutes());
    }, 6e4);
    return () => clearInterval(i);
  }, [a]);
  let h = t.filter((i) => i.time).map((i) => ({ ...i, ...Wt(i) })).sort((i, b) => i.s - b.s || i.e - b.e), v = [], k = [], c = -1;
  h.forEach((i) => {
    k.length && i.s >= c && (v.push(k), k = [], c = -1), k.push(i), c = Math.max(c, i.e);
  }), k.length && v.push(k);
  let z = [];
  v.forEach((i) => {
    let b = [];
    i.forEach((y) => {
      let D = b.findIndex((E) => E <= y.s);
      D === -1 ? (D = b.length, b.push(y.e)) : b[D] = y.e, z.push({ ...y, col: D, cl: i });
    }), i.ncol = b.length;
  });
  let f = h.length ? Math.min(8, Math.floor(h[0].s / 60)) : 8, s = h.length ? Math.max(21, Math.ceil(Math.max(...h.map((i) => i.e)) / 60)) : 21, u = (i) => {
    let b = i.currentTarget.getBoundingClientRect(), y = f * 60 + (i.clientY - b.top) / Zt * 60;
    return Math.max(f * 60, Math.min(Math.floor(y / 30) * 30, s * 60 - 30, 23 * 60 + 30));
  }, A = Array.from({ length: s - f + 1 }, (i, b) => f + b), m = (i) => (i - f * 60) / 60 * Zt, w = t.length - h.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (s - f) * Zt + 14 }, children: [
      A.map((i) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: m(i * 60) }, children: /* @__PURE__ */ o("span", { children: [
        ot(i % 24),
        ":00"
      ] }) }, i)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (i) => {
            i.target.closest(".jt-tt-block") || !l || l(Et(u(i)));
          },
          onPointerMove: (i) => {
            if (i.pointerType !== "mouse" || i.target.closest(".jt-tt-block")) return g(null);
            g(u(i));
          },
          onPointerLeave: () => g(null),
          children: [
            x != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: m(x) + 1, height: Zt / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Et(x),
              " 일정 추가"
            ] }),
            z.map((i) => {
              let b = i.cl.ncol, y = Math.max(24, m(i.e) - m(i.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (y < 44 ? " short" : "") + (b > 1 ? " clash" : ""),
                  style: {
                    top: m(i.s) + 1,
                    height: y,
                    left: `calc(${i.col / b * 100}% + 2px)`,
                    width: `calc(${100 / b}% - 4px)`
                  },
                  onClick: () => n(i),
                  "aria-label": `${i.time} ${i.title} 고치기`,
                  children: [
                    /* @__PURE__ */ e("strong", { children: i.title }),
                    /* @__PURE__ */ o("span", { children: [
                      Et(i.s),
                      "~",
                      Et(i.e % (24 * 60)),
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
      a && p >= f * 60 && p <= s * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: m(p) }, "aria-label": `지금 ${Et(p)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      w > 0 ? ` 시간을 정하지 않은 일정 ${w}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function ao({ settings: t, schedule: a, day: n, setDay: r, onEdit: l, onAddAt: x, me: g, onComment: p, onDelComment: d, onReact: h }) {
  let [v, k] = N(null), { start: c, days: z, members: f } = t, s = Q[n % Q.length], u = a.filter((b) => b.day === n).sort((b, y) => (b.time || "99:99").localeCompare(y.time || "99:99")), A = Pn(u), m = ct(dt(c, n)), w = m === ct(/* @__PURE__ */ new Date()), i = Zn(c, z);
  return /* @__PURE__ */ o("section", { style: { "--lc": s }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: z }, (b, y) => {
      let D = dt(c, y), E = y === n;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": E,
          className: "jt-day" + (E ? " active" : ""),
          style: { "--lc": Q[y % Q.length] },
          onClick: () => r(y),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: y + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: Ot(D) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: Ut(D) })
          ]
        },
        y
      );
    }) }),
    /* @__PURE__ */ e(Qn, { date: m, w: i }),
    u.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ e("ol", { className: "jt-line", children: u.map((b) => {
      let y = b.time ? Wt(b) : null;
      return /* @__PURE__ */ o("li", { className: "jt-row", children: [
        /* @__PURE__ */ e("div", { className: "jt-time", children: b.time || "미정" }),
        /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
        /* @__PURE__ */ o(
          "div",
          {
            className: "jt-card",
            role: "button",
            tabIndex: 0,
            onClick: () => l(b),
            onKeyDown: (D) => D.key === "Enter" && l(b),
            children: [
              /* @__PURE__ */ o("div", { className: "jt-card-top", children: [
                /* @__PURE__ */ e("div", { className: "jt-card-title", children: b.title }),
                b.time && i.status === "ok" && /* @__PURE__ */ e(to, { v: i.hourly[`${m}T${b.time.slice(0, 2)}`] })
              ] }),
              y && b.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                b.time,
                "~",
                b.end,
                ", ",
                ha(y.e - y.s)
              ] }),
              A.has(b.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              b.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(Yt, { size: 13 }),
                b.place
              ] }),
              b.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: b.memo }),
              (b.place || b.link || Ft(b)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: Jt(b),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (D) => D.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(It, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(it, { name: b.by, members: f, size: 16 }),
                  b.by
                ] }),
                /* @__PURE__ */ e(Ee, { item: b, me: g, onReact: (D) => h(b.id, D) }),
                /* @__PURE__ */ e(
                  ja,
                  {
                    count: (b.comments || []).length,
                    open: v === b.id,
                    onClick: () => k(v === b.id ? null : b.id)
                  }
                )
              ] }),
              v === b.id && /* @__PURE__ */ e(
                Me,
                {
                  comments: b.comments || [],
                  me: g,
                  members: f,
                  onAdd: (D) => p(b.id, D),
                  onDelete: (D) => d(b.id, D)
                }
              )
            ]
          }
        )
      ] }, b.id);
    }) }),
    /* @__PURE__ */ e(eo, { items: u, isToday: w, onEdit: l, members: f, onAddAt: (b) => x && x(n, b) })
  ] });
}
function no({ view: t, setView: a, pins: n, temp: r, selectedId: l, onTap: x, onPinTap: g }) {
  let p = J(null), [d, h] = N({ w: 0, h: 0 }), v = J(/* @__PURE__ */ new Map()), k = J({ moved: !1, startDist: 0 }), c = J(0), [z, f] = N({ ok: 0, bad: 0 });
  H(() => {
    let M = p.current;
    if (!M) return;
    let _ = () => h({ w: M.clientWidth, h: M.clientHeight });
    _();
    let B = new ResizeObserver(_);
    return B.observe(M), () => B.disconnect();
  }, []);
  let s = t.z, u = he(t.lat, t.lng, s), A = u.x - d.w / 2, m = u.y - d.h / 2, w = 2 ** s, i = [];
  if (d.w) {
    let M = Math.floor(A / ft), _ = Math.floor((A + d.w) / ft), B = Math.max(0, Math.floor(m / ft)), q = Math.min(w - 1, Math.floor((m + d.h) / ft));
    for (let L = M; L <= _; L++)
      for (let j = B; j <= q; j++) {
        let O = (L % w + w) % w;
        i.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${s}/${O}/${j}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => f((G) => G.ok ? G : { ...G, ok: 1 }),
              onError: () => f((G) => G.bad ? G : { ...G, bad: 1 }),
              style: { left: Math.round(L * ft - A), top: Math.round(j * ft - m) }
            },
            `${s}/${L}/${j}`
          )
        );
      }
  }
  let b = (M) => {
    if (!M.target.closest("[data-pin],.jt-zoom,.jt-attr") && (p.current.setPointerCapture(M.pointerId), v.current.set(M.pointerId, { x: M.clientX, y: M.clientY }), v.current.size === 1 && (k.current = { moved: !1, startDist: 0 }), v.current.size === 2)) {
      let [_, B] = [...v.current.values()];
      k.current.startDist = Math.hypot(_.x - B.x, _.y - B.y), k.current.moved = !0;
    }
  }, y = (M) => {
    let _ = v.current.get(M.pointerId);
    if (!_) return;
    let B = M.clientX - _.x, q = M.clientY - _.y;
    if (v.current.size === 1) {
      if (!k.current.moved && Math.hypot(B, q) < 4) return;
      k.current.moved = !0, v.current.set(M.pointerId, { x: M.clientX, y: M.clientY }), a((L) => {
        let j = he(L.lat, L.lng, L.z), O = ta(j.x - B, j.y - q, L.z);
        return { ...L, lat: Math.max(-80, Math.min(80, O.lat)), lng: O.lng };
      });
    } else
      v.current.set(M.pointerId, { x: M.clientX, y: M.clientY });
  }, D = (M) => {
    let _ = v.current.get(M.pointerId);
    if (!_) return;
    let B = v.current.size === 1;
    if (v.current.delete(M.pointerId), k.current.startDist && v.current.size === 1) {
      let [q] = [...v.current.values()], L = Math.hypot(_.x - q.x, _.y - q.y) / k.current.startDist;
      L > 1.35 ? a((j) => ({ ...j, z: _t(j.z + (L > 2.6 ? 2 : 1)) })) : L < 0.7 && a((j) => ({ ...j, z: _t(j.z - (L < 0.38 ? 2 : 1)) })), k.current.startDist = 0;
    }
    if (B && !k.current.moved && M.type === "pointerup") {
      let q = p.current.getBoundingClientRect(), L = ta(A + (M.clientX - q.left), m + (M.clientY - q.top), s);
      x(L.lat, L.lng);
    }
  }, E = (M) => {
    let _ = Date.now();
    _ - c.current < 250 || (c.current = _, a((B) => ({ ...B, z: _t(B.z + (M.deltaY < 0 ? 1 : -1)) })));
  }, R = (M, _) => {
    let B = he(M, _, s);
    return { left: B.x - A, top: B.y - m };
  }, S = (M) => M.left > -40 && M.left < d.w + 40 && M.top > -50 && M.top < d.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: p,
      onPointerDown: b,
      onPointerMove: y,
      onPointerUp: D,
      onPointerCancel: D,
      onWheel: E,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        i,
        z.bad > 0 && z.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        d.w > 0 && n.map((M) => {
          let _ = R(M.lat, M.lng);
          return S(_) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (M.id === l ? " sel" : ""),
              style: { left: _.left, top: _.top, "--pc": M.color },
              onClick: () => g(M.id),
              "aria-label": M.label,
              children: /* @__PURE__ */ e("i", {})
            },
            M.id
          ) : null;
        }),
        d.w > 0 && r && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: R(r.lat, r.lng).left, top: R(r.lat, r.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((M) => ({ ...M, z: _t(M.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((M) => ({ ...M, z: _t(M.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var la = "https://unpkg.com/maplibre-gl@4.7.1/dist/", oo = "https://tiles.openfreemap.org/styles/liberty", Tt = null;
function ro() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Tt || (Tt = new Promise((t, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = la + "maplibre-gl.css", document.head.appendChild(n);
    let r = document.createElement("script");
    r.src = la + "maplibre-gl.js", r.onload = () => window.maplibregl ? t(window.maplibregl) : a(new Error("maplibre")), r.onerror = () => {
      Tt = null, a(new Error("maplibre"));
    }, document.head.appendChild(r);
  }), Tt);
}
var io = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function so(t) {
  (t.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        t.setLayoutProperty(a.id, "text-field", io);
      } catch {
      }
  });
}
var lo = (t) => String(t).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), we = (t, a, n) => {
  let r = a ? 34 : 28, l = a ? 44 : 36, x = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${t}" font-family="sans-serif">${lo(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${r}" height="${l}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/>${x}</svg>`;
};
function ya(t) {
  let { view: a, setView: n, pins: r, temp: l, selectedId: x, onTap: g, onPinTap: p } = t, d = J(null), h = J(null), v = J(null), k = J([]), c = J(null), z = J({});
  z.current = { onTap: g, onPinTap: p, setView: n };
  let [f, s] = N("loading");
  return H(() => {
    let u = !0;
    return ro().then((A) => {
      if (!u || !d.current) return;
      v.current = A;
      let m = new A.Map({
        container: d.current,
        style: oo,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      m.touchZoomRotate.disableRotation(), m.addControl(new A.NavigationControl({ showCompass: !1 }), "top-right"), m.on("load", () => {
        so(m), u && s("ok");
      }), m.on("click", (w) => {
        w.originalEvent && w.originalEvent.target.closest && w.originalEvent.target.closest(".jt-mlpin") || z.current.onTap(w.lngLat.lat, w.lngLat.lng);
      }), m.on("moveend", () => {
        let w = m.getCenter();
        z.current.setView({ lat: w.lat, lng: w.lng, z: m.getZoom() + 1 });
      }), h.current = m, setTimeout(() => u && !m.loaded() && s((w) => w === "loading" ? "slow" : w), 6e3), setTimeout(() => {
        u && h.current === m && !m.loaded() && (m.remove(), h.current = null, s("fail"));
      }, 15e3);
    }).catch(() => u && s("fail")), () => {
      u = !1, h.current && h.current.remove(), h.current = null;
    };
  }, []), H(() => {
    let u = h.current;
    if (!u) return;
    let A = u.getCenter();
    (Math.abs(A.lat - a.lat) > 1e-6 || Math.abs(A.lng - a.lng) > 1e-6 || Math.abs(u.getZoom() + 1 - a.z) > 0.01) && u.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), H(() => {
    let u = h.current, A = v.current;
    !u || !A || (k.current.forEach((m) => m.remove()), k.current = r.map((m) => {
      let w = document.createElement("button");
      return w.type = "button", w.className = "jt-mlpin" + (m.id === x ? " sel" : ""), w.setAttribute("aria-label", m.label), w.innerHTML = we(m.color, m.id === x, m.text), w.addEventListener("click", (i) => {
        i.stopPropagation(), z.current.onPinTap(m.id);
      }), new A.Marker({ element: w, anchor: "bottom" }).setLngLat([m.lng, m.lat]).addTo(u);
    }));
  }, [r, x, f]), H(() => {
    let u = h.current, A = v.current;
    if (c.current && c.current.remove(), c.current = null, !u || !A || !l) return;
    let m = document.createElement("div");
    m.className = "jt-mlpin temp", m.innerHTML = we("#14213D", !0), c.current = new A.Marker({ element: m, anchor: "bottom" }).setLngLat([l.lng, l.lat]).addTo(u);
  }, [l, f]), f === "fail" ? /* @__PURE__ */ e(no, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: d, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (f === "loading" || f === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: f === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Lt = null, St = "", yt = !1, ke = /* @__PURE__ */ new Set();
function Se(t) {
  return yt ? Promise.reject(new Error("auth")) : Lt && St === t ? Lt : St && St !== t ? Promise.reject(new Error("reload")) : (St = t, Lt = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      yt = !0, ke.forEach((l) => l()), n(new Error("auth"));
    };
    let r = document.createElement("script");
    r.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", r.async = !0, r.onerror = () => {
      Lt = null, St = "", n(new Error("load"));
    }, document.head.appendChild(r);
  }), Lt);
}
var po = (t) => !!t && !yt && St === t && !!(window.google && window.google.maps);
function co(t) {
  let { view: a, setView: n, pins: r, temp: l, selectedId: x, onTap: g, onPinTap: p, onPoi: d, gkey: h } = t, v = J(null), k = J(null), c = J(null), z = J([]), f = J(null), s = J({});
  s.current = { onTap: g, onPinTap: p, onPoi: d, setView: n };
  let [u, A] = N(yt ? "fail" : "loading");
  H(() => {
    let w = !0, i = () => w && A("fail");
    return ke.add(i), Se(h).then(async (b) => {
      let { Map: y } = await b.importLibrary("maps"), { Marker: D } = await b.importLibrary("marker"), { Size: E, Point: R } = await b.importLibrary("core");
      if (!w || !v.current) return;
      c.current = { Marker: D, Size: E, Point: R };
      let S = new y(v.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      S.addListener("click", async (M) => {
        if (M.placeId) {
          M.stop();
          try {
            let { Place: _ } = await b.importLibrary("places"), B = new _({ id: M.placeId });
            await B.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), s.current.onPoi({
              name: B.displayName || "",
              lat: B.location.lat(),
              lng: B.location.lng(),
              area: B.formattedAddress || "",
              link: B.googleMapsURI || "",
              placeId: M.placeId
            });
            return;
          } catch {
          }
        }
        s.current.onTap(M.latLng.lat(), M.latLng.lng());
      }), S.addListener("idle", () => {
        let M = S.getCenter();
        s.current.setView({ lat: M.lat(), lng: M.lng(), z: S.getZoom() });
      }), k.current = S, A("ok");
    }).catch(() => w && A("fail")), () => {
      w = !1, ke.delete(i);
    };
  }, [h]), H(() => {
    let w = k.current;
    if (!w) return;
    let i = w.getCenter();
    (Math.abs(i.lat() - a.lat) > 1e-6 || Math.abs(i.lng() - a.lng) > 1e-6) && w.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== w.getZoom() && w.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let m = (w, i, b) => {
    let y = c.current, D = i ? 34 : 28, E = i ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(we(w, i, b).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
