c.includes(k) && /* @__PURE__ */ e($a, { size: 14 }),
        k
      ] }, k)) }),
      N > 0 && c.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        q(N / c.length)
      ] }),
      c.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: La.map((k) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (u === k ? " on" : ""), onClick: () => I(k), children: k }, k)) })
    ] }),
    /* @__PURE__ */ e(at, { label: "날짜", children: /* @__PURE__ */ e("select", { value: d, onChange: (k) => C(Number(k.target.value)), children: Array.from({ length: p }, (k, S) => {
      let _ = dt(m, S);
      return /* @__PURE__ */ o("option", { value: S, children: [
        S + 1,
        "일차 ",
        qt(_),
        " (",
        Pt(_),
        ")"
      ] }, S);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !$,
        onClick: () => i({ title: y.trim(), amount: N, payer: b, cat: u, day: d, split: c }),
        children: r ? "수정 저장" : "경비 기록하기"
      }
    ),
    r && /* @__PURE__ */ e(xt, { onConfirm: j, label: "이 경비 삭제" })
  ] });
}
function Fo({ initial: t, onSave: a, onDelete: n }) {
  let [r, i] = z(t?.text || ""), [j, h] = z(t?.urls || []), [p, m] = z(""), [x, y] = z(() => (t?.photos || []).map((c) => ({ id: c }))), [E, s] = z(!1), [M, b] = z(""), l = Y(null), u = () => {
    if (!p.trim()) return;
    let c = va(p);
    if (!c) {
      b("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    j.includes(c) || h([...j, c]), m(""), b("");
  }, I = async (c) => {
    let v = Array.from(c || []).filter(($) => $.type.startsWith("image/"));
    if (!v.length) return;
    let N = Kt - x.length;
    if (N <= 0) {
      b(`사진은 글 하나에 ${Kt}장까지 올릴 수 있어요.`);
      return;
    }
    s(!0), b("사진 준비 중");
    let A = [], f = 0;
    for (let $ of v.slice(0, N))
      try {
        A.push({ id: st(), data: await vo($) });
      } catch {
        f++;
      }
    y(($) => [...$, ...A]), s(!1), f ? b(`${f}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : v.length > N ? b(`${Kt}장까지만 넣었어요.`) : b(""), l.current && (l.current.value = "");
  }, d = async () => {
    let c = j;
    if (p.trim()) {
      let N = va(p);
      if (!N) {
        b("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      c.includes(N) || (c = [...c, N]);
    }
    s(!0), b(x.some((N) => N.data) ? "사진 올리는 중" : ""), await a({ text: r.trim(), urls: c, photos: x }) || (s(!1), b("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, C = !E && (r.trim() || j.length || p.trim() || x.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: r,
        onChange: (c) => i(c.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    x.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: x.map((c) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(ko, { id: c.id, data: c.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => y(x.filter((v) => v.id !== c.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(Vt, { size: 14 })
        }
      )
    ] }, c.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: l,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (c) => I(c.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => l.current && l.current.click(),
        disabled: E || x.length >= Kt,
        children: [
          /* @__PURE__ */ e(_n, { size: 17 }),
          "사진 추가 (",
          x.length,
          "/",
          Kt,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      j.map((c) => /* @__PURE__ */ e(Co, { url: c, onRemove: () => h(j.filter((v) => v !== c)) }, c)),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: p,
            onChange: (c) => m(c.target.value),
            onKeyDown: (c) => c.key === "Enter" && u(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: u, children: "추가" })
      ] })
    ] }),
    M && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: M }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !C, onClick: d, children: E ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(xt, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
var it = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Wa = 16;
function De(t) {
  return t === 0 ? { Icon: Qn, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: to, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: xa, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: eo, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: ao, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: no, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: oo, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: ro, label: "뇌우", tone: "#7B5FC4" } : { Icon: xa, label: "흐림", tone: "#66718A" };
}
var It = (t) => t == null ? "–" : Math.round(t) + "°", Ea = /* @__PURE__ */ new Map();
async function Ma(t) {
  let a = Ea.get(t);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(t);
  if (!n.ok) throw new Error("weather " + n.status);
  let r = await n.json();
  return Ea.set(t, { at: Date.now(), d: r }), r;
}
var Aa = (t, a) => {
  let n = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + a}-${n}`;
};
function Do(t, a) {
  let [n, r] = z({ status: "loading" });
  return W(() => {
    let i = !0, j = async () => {
      try {
        let p = `latitude=${it.lat}&longitude=${it.lng}&timezone=Asia%2FTokyo`, m = await Ma(
          `https://api.open-meteo.com/v1/forecast?${p}&forecast_days=${Wa}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), x = {};
        m.daily.time.forEach((l, u) => {
          x[l] = {
            code: m.daily.weather_code[u],
            max: m.daily.temperature_2m_max[u],
            min: m.daily.temperature_2m_min[u],
            pop: m.daily.precipitation_probability_max[u],
            sum: m.daily.precipitation_sum[u]
          };
        });
        let y = {};
        m.hourly.time.forEach((l, u) => {
          y[l.slice(0, 13)] = {
            t: m.hourly.temperature_2m[u],
            pop: m.hourly.precipitation_probability[u],
            code: m.hourly.weather_code[u]
          };
        });
        let E = pt(/* @__PURE__ */ new Date()), M = Array.from({ length: a }, (l, u) => pt(dt(t, u))).filter((l) => !x[l] && l > E), b = {};
        if (M.length) {
          let l = await Promise.all(
            [1, 2, 3].map(
              (I) => Ma(
                `https://archive-api.open-meteo.com/v1/archive?${p}&start_date=${Aa(M[0], -I)}&end_date=${Aa(M[M.length - 1], -I)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), u = {};
          l.filter(Boolean).forEach(
            (I) => I.daily.time.forEach((d, C) => {
              let c = I.daily.temperature_2m_max[C];
              if (c == null) return;
              let v = d.slice(5), N = u[v] || (u[v] = { max: 0, min: 0, wet: 0, n: 0 });
              N.max += c, N.min += I.daily.temperature_2m_min[C], N.wet += (I.daily.precipitation_sum[C] || 0) >= 1 ? 1 : 0, N.n++;
            })
          ), M.forEach((I) => {
            let d = u[I.slice(5) === "02-29" ? "02-28" : I.slice(5)];
            d && d.n && (b[I] = { max: d.max / d.n, min: d.min / d.n, wet: d.wet, n: d.n });
          });
        }
        i && r({ status: "ok", daily: x, hourly: y, climate: b, at: /* @__PURE__ */ new Date() });
      } catch {
        i && r((m) => m.status === "ok" ? m : { status: "error" });
      }
    };
    j();
    let h = setInterval(j, 30 * 6e4);
    return () => {
      i = !1, clearInterval(h);
    };
  }, [t, a]), n;
}
function Po({ date: t, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      it.name,
      " 날씨"
    ] }),
    a.status === "ok" && a.daily[t] && /* @__PURE__ */ e("em", { children: `${nt(a.at.getHours())}:${nt(a.at.getMinutes())} 업데이트` })
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
    let { Icon: j, label: h, tone: p } = De(r.code), m = (r.pop || 0) >= 50 || (r.sum || 0) >= 1, x = ["09", "12", "15", "18", "21"].map((y) => ({ h: y, v: a.hourly[`${t}T${y}`] })).filter((y) => y.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(j, { size: 40, color: p, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: h }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: It(r.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: It(r.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(io, { size: 15, "aria-hidden": "true" }),
          r.pop == null ? "–" : r.pop + "%"
        ] })
      ] }),
      m && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      x.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: x.map(({ h: y, v: E }) => {
        let s = De(E.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            y,
            "시"
          ] }),
          /* @__PURE__ */ e(s.Icon, { size: 18, color: s.tone, "aria-label": s.label }),
          /* @__PURE__ */ e("b", { children: It(E.t) }),
          /* @__PURE__ */ e("em", { children: E.pop == null ? "" : E.pop + "%" })
        ] }, y);
      }) })
    ] });
  }
  let i = a.climate[t];
  return i ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Wa,
      "일 전부터 나와요. 최근 ",
      i.n,
      "년 같은 날 ",
      it.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: It(i.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: It(i.min) }),
      "였고, ",
      i.n,
      "번 중 ",
      i.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function $o({ v: t }) {
  if (!t) return null;
  let { Icon: a, label: n, tone: r } = De(t.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ e(a, { size: 14, color: r, "aria-hidden": "true" }),
    It(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var se = 56;
function Ro({ items: t, isToday: a, onEdit: n, members: r, onAddAt: i }) {
  let [j, h] = z(null), [p, m] = z(() => {
    let c = /* @__PURE__ */ new Date();
    return c.getHours() * 60 + c.getMinutes();
  });
  W(() => {
    if (!a) return;
    let c = setInterval(() => {
      let v = /* @__PURE__ */ new Date();
      m(v.getHours() * 60 + v.getMinutes());
    }, 6e4);
    return () => clearInterval(c);
  }, [a]);
  let x = t.filter((c) => c.time).map((c) => ({ ...c, ...Xt(c) })).sort((c, v) => c.s - v.s || c.e - v.e), y = [], E = [], s = -1;
  x.forEach((c) => {
    E.length && c.s >= s && (y.push(E), E = [], s = -1), E.push(c), s = Math.max(s, c.e);
  }), E.length && y.push(E);
  let M = [];
  y.forEach((c) => {
    let v = [];
    c.forEach((N) => {
      let A = v.findIndex((f) => f <= N.s);
      A === -1 ? (A = v.length, v.push(N.e)) : v[A] = N.e, M.push({ ...N, col: A, cl: c });
    }), c.ncol = v.length;
  });
  let b = x.length ? Math.min(8, Math.floor(x[0].s / 60)) : 8, l = x.length ? Math.max(21, Math.ceil(Math.max(...x.map((c) => c.e)) / 60)) : 21, u = (c) => {
    let v = c.currentTarget.getBoundingClientRect(), N = b * 60 + (c.clientY - v.top) / se * 60;
    return Math.max(b * 60, Math.min(Math.floor(N / 30) * 30, l * 60 - 30, 23 * 60 + 30));
  }, I = Array.from({ length: l - b + 1 }, (c, v) => b + v), d = (c) => (c - b * 60) / 60 * se, C = t.length - x.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (l - b) * se + 14 }, children: [
      I.map((c) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: d(c * 60) }, children: /* @__PURE__ */ o("span", { children: [
        nt(c % 24),
        ":00"
      ] }) }, c)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (c) => {
            c.target.closest(".jt-tt-block") || !i || i(St(u(c)));
          },
          onPointerMove: (c) => {
            if (c.pointerType !== "mouse" || c.target.closest(".jt-tt-block")) return h(null);
            h(u(c));
          },
          onPointerLeave: () => h(null),
          children: [
            j != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: d(j) + 1, height: se / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              St(j),
              " 일정 추가"
            ] }),
            M.map((c) => {
              let v = c.cl.ncol, N = Math.max(24, d(c.e) - d(c.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (N < 44 ? " short" : "") + (v > 1 ? " clash" : ""),
                  style: {
                    top: d(c.s) + 1,
                    height: N,
                    left: `calc(${c.col / v * 100}% + 2px)`,
                    width: `calc(${100 / v}% - 4px)`
                  },
                  onClick: () => n(c),
                  "aria-label": `${c.time} ${c.title} 고치기`,
                  children: [
                    /* @__PURE__ */ e("strong", { children: c.title }),
                    /* @__PURE__ */ o("span", { children: [
                      St(c.s),
                      "~",
                      St(c.e % (24 * 60)),
                      c.place ? `, ${c.place}` : ""
                    ] })
                  ]
                },
                c.id
              );
            })
          ]
        }
      ),
      a && p >= b * 60 && p <= l * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: d(p) }, "aria-label": `지금 ${St(p)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      C > 0 ? ` 시간을 정하지 않은 일정 ${C}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function _o({ settings: t, schedule: a, day: n, setDay: r, onEdit: i, onAddAt: j, me: h, onComment: p, onDelComment: m, onReact: x }) {
  let [y, E] = z(null), { start: s, days: M, members: b } = t, l = tt[n % tt.length], u = a.filter((v) => v.day === n).sort((v, N) => (v.time || "99:99").localeCompare(N.time || "99:99")), I = fo(u), d = pt(dt(s, n)), C = d === pt(/* @__PURE__ */ new Date()), c = Do(s, M);
  return /* @__PURE__ */ o("section", { style: { "--lc": l }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: M }, (v, N) => {
      let A = dt(s, N), f = N === n;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": f,
          className: "jt-day" + (f ? " active" : ""),
          style: { "--lc": tt[N % tt.length] },
          onClick: () => r(N),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: N + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: qt(A) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: Pt(A) })
          ]
        },
        N
      );
    }) }),
    /* @__PURE__ */ e(Po, { date: d, w: c }),
    u.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ e("ol", { className: "jt-line", children: u.map((v, N) => {
      let A = v.time ? Xt(v) : null, f = u[N + 1], $ = f && ce(f);
      return /* @__PURE__ */ o("li", { className: "jt-row", children: [
        /* @__PURE__ */ e("div", { className: "jt-time", children: v.time || "미정" }),
        /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
        /* @__PURE__ */ o(
          "div",
          {
            className: "jt-card",
            role: "button",
            tabIndex: 0,
            onClick: () => i(v),
            onKeyDown: (k) => k.key === "Enter" && i(v),
            children: [
              /* @__PURE__ */ o("div", { className: "jt-card-top", children: [
                /* @__PURE__ */ e("div", { className: "jt-card-title", children: v.title }),
                v.time && c.status === "ok" && /* @__PURE__ */ e($o, { v: c.hourly[`${d}T${v.time.slice(0, 2)}`] })
              ] }),
              A && v.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                v.time,
                "~",
                v.end,
                ", ",
                Ba(A.e - A.s)
              ] }),
              I.has(v.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              v.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(kt, { size: 13 }),
                v.place
              ] }),
              v.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: v.memo }),
              (v.place || v.link || ht(v)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: $t(v),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (k) => k.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(zt, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              $ && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-next",
                  href: bo(v, f),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (k) => k.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Nt, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ e("b", { children: f.title }),
                      "까지 길 찾기",
                      ce(v) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(rt, { name: v.by, members: b, size: 16 }),
                  v.by
                ] }),
                /* @__PURE__ */ e(Oe, { item: v, me: h, onReact: (k) => x(v.id, k) }),
                /* @__PURE__ */ e(
                  Ua,
                  {
                    count: (v.comments || []).length,
                    open: y === v.id,
                    onClick: () => E(y === v.id ? null : v.id)
                  }
                )
              ] }),
              y === v.id && /* @__PURE__ */ e(
                Ue,
                {
                  comments: v.comments || [],
                  me: h,
                  members: b,
                  onAdd: (k) => p(v.id, k),
                  onDelete: (k) => m(v.id, k)
                }
              )
            ]
          }
        )
      ] }, v.id);
    }) }),
    /* @__PURE__ */ e(Ro, { items: u, isToday: C, onEdit: i, members: b, onAddAt: (v) => j && j(n, v) })
  ] });
}
function Lo({ view: t, setView: a, pins: n, temp: r, selectedId: i, onTap: j, onPinTap: h }) {
  let p = Y(null), [m, x] = z({ w: 0, h: 0 }), y = Y(/* @__PURE__ */ new Map()), E = Y({ moved: !1, startDist: 0 }), s = Y(0), [M, b] = z({ ok: 0, bad: 0 });
  W(() => {
    let S = p.current;
    if (!S) return;
    let _ = () => x({ w: S.clientWidth, h: S.clientHeight });
    _();
    let O = new ResizeObserver(_);
    return O.observe(S), () => O.disconnect();
  }, []);
  let l = t.z, u = ze(t.lat, t.lng, l), I = u.x - m.w / 2, d = u.y - m.h / 2, C = 2 ** l, c = [];
  if (m.w) {
    let S = Math.floor(I / ft), _ = Math.floor((I + m.w) / ft), O = Math.max(0, Math.floor(d / ft)), G = Math.min(C - 1, Math.floor((d + m.h) / ft));
    for (let U = S; U <= _; U++)
      for (let w = O; w <= G; w++) {
        let K = (U % C + C) % C;
        c.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${l}/${K}/${w}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => b((V) => V.ok ? V : { ...V, ok: 1 }),
              onError: () => b((V) => V.bad ? V : { ...V, bad: 1 }),
              style: { left: Math.round(U * ft - I), top: Math.round(w * ft - d) }
            },
            `${l}/${U}/${w}`
          )
        );
      }
  }
  let v = (S) => {
    if (!S.target.closest("[data-pin],.jt-zoom,.jt-attr") && (p.current.setPointerCapture(S.pointerId), y.current.set(S.pointerId, { x: S.clientX, y: S.clientY }), y.current.size === 1 && (E.current = { moved: !1, startDist: 0 }), y.current.size === 2)) {
      let [_, O] = [...y.current.values()];
      E.current.startDist = Math.hypot(_.x - O.x, _.y - O.y), E.current.moved = !0;
    }
  }, N = (S) => {
    let _ = y.current.get(S.pointerId);
    if (!_) return;
    let O = S.clientX - _.x, G = S.clientY - _.y;
    if (y.current.size === 1) {
      if (!E.current.moved && Math.hypot(O, G) < 4) return;
      E.current.moved = !0, y.current.set(S.pointerId, { x: S.clientX, y: S.clientY }), a((U) => {
        let w = ze(U.lat, U.lng, U.z), K = wa(w.x - O, w.y - G, U.z);
        return { ...U, lat: Math.max(-80, Math.min(80, K.lat)), lng: K.lng };
      });
    } else
      y.current.set(S.pointerId, { x: S.clientX, y: S.clientY });
  }, A = (S) => {
    let _ = y.current.get(S.pointerId);
    if (!_) return;
    let O = y.current.size === 1;
    if (y.current.delete(S.pointerId), E.current.startDist && y.current.size === 1) {
      let [G] = [...y.current.values()], U = Math.hypot(_.x - G.x, _.y - G.y) / E.current.startDist;
      U > 1.35 ? a((w) => ({ ...w, z: Wt(w.z + (U > 2.6 ? 2 : 1)) })) : U < 0.7 && a((w) => ({ ...w, z: Wt(w.z - (U < 0.38 ? 2 : 1)) })), E.current.startDist = 0;
    }
    if (O && !E.current.moved && S.type === "pointerup") {
      let G = p.current.getBoundingClientRect(), U = wa(I + (S.clientX - G.left), d + (S.clientY - G.top), l);
      j(U.lat, U.lng);
    }
  }, f = (S) => {
    let _ = Date.now();
    _ - s.current < 250 || (s.current = _, a((O) => ({ ...O, z: Wt(O.z + (S.deltaY < 0 ? 1 : -1)) })));
  }, $ = (S, _) => {
    let O = ze(S, _, l);
    return { left: O.x - I, top: O.y - d };
  }, k = (S) => S.left > -40 && S.left < m.w + 40 && S.top > -50 && S.top < m.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: p,
      onPointerDown: v,
      onPointerMove: N,
      onPointerUp: A,
      onPointerCancel: A,
      onWheel: f,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        c,
        M.bad > 0 && M.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        m.w > 0 && n.map((S) => {
          let _ = $(S.lat, S.lng);
          return k(_) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (S.id === i ? " sel" : ""),
              style: { left: _.left, top: _.top, "--pc": S.color },
              onClick: () => h(S.id),
              "aria-label": S.label,
              children: /* @__PURE__ */ e("i", {})
            },
            S.id
          ) : null;
        }),
        m.w > 0 && r && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: $(r.lat, r.lng).left, top: $(r.lat, r.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((S) => ({ ...S, z: Wt(S.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((S) => ({ ...S, z: Wt(S.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Sa = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Bo = "https://tiles.openfreemap.org/styles/liberty", Ht = null;
function To() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Ht || (Ht = new Promise((t, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = Sa + "maplibre-gl.css", document.head.appendChild(n);
    let r = document.createElement("script");
    r.src = Sa + "maplibre-gl.js", r.onload = () => window.maplibregl ? t(window.maplibregl) : a(new Error("maplibre")), r.onerror = () => {
      Ht = null, a(new Error("maplibre"));
    }, document.head.appendChild(r);
  }), Ht);
}
var Oo = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Uo(t) {
  (t.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        t.setLayoutProperty(a.id, "text-field", Oo);
      } catch {
      }
  });
}
var Ko = (t) => String(t).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), Pe = (t, a, n) => {
  let r = a ? 34 : 28, i = a ? 44 : 36, j = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${t}" font-family="sans-serif">${Ko(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${r}" height="${i}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/>${j}</svg>`;
};
function Ha(t) {
  let { view: a, setView: n, pins: r, temp: i, selectedId: j, onTap: h, onPinTap: p } = t, m = Y(null), x = Y(null), y = Y(null), E = Y([]), s = Y(null), M = Y({});
  M.current = { onTap: h, onPinTap: p, setView: n };
  let [b, l] = z("loading");
  return W(() => {
    let u = !0;
    return To().then((I) => {
      if (!u || !m.current) return;
      y.current = I;
      let d = new I.Map({
        container: m.current,
        style: Bo,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      d.touchZoomRotate.disableRotation(), d.addControl(new I.NavigationControl({ showCompass: !1 }), "top-right"), d.on("load", () => {
        Uo(d), u && l("ok");
      }), d.on("click", (C) => {
        C.originalEvent && C.originalEvent.target.closest && C.originalEvent.target.closest(".jt-mlpin") || M.current.onTap(C.lngLat.lat, C.lngLat.lng);
      }), d.on("moveend", () => {
        let C = d.getCenter();
        M.current.setView({ lat: C.lat, lng: C.lng, z: d.getZoom() + 1 });
      }), x.current = d, setTimeout(() => u && !d.loaded() && l((C) => C === "loading" ? "slow" : C), 6e3), setTimeout(() => {
        u && x.current === d && !d.loaded() && (d.remove(), x.current = null, l("fail"));
      }, 15e3);
    }).catch(() => u && l("fail")), () => {
      u = !1, x.current && x.current.remove(), x.current = null;
    };
  }, []), W(() => {
    let u = x.current;
    if (!u) return;
    let I = u.getCenter();
    (Math.abs(I.lat - a.lat) > 1e-6 || Math.abs(I.lng - a.lng) > 1e-6 || Math.abs(u.getZoom() + 1 - a.z) > 0.01) && u.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), W(() => {
    let u = x.current, I = y.current;
    !u || !I || (E.current.forEach((d) => d.remove()), E.current = r.map((d) => {
      let C = document.createElement("button");
      return C.type = "button", C.className = "jt-mlpin" + (d.id === j ? " sel" : ""), C.setAttribute("aria-label", d.label), C.innerHTML = Pe(d.color, d.id === j, d.text), C.addEventListener("click", (c) => {
        c.stopPropagation(), M.current.onPinTap(d.id);
      }), new I.Marker({ element: C, anchor: "bottom" }).setLngLat([d.lng, d.lat]).addTo(u);
    }));
  }, [r, j, b]), W(() => {
    let u = x.current, I = y.current;
    if (s.current && s.current.remove(), s.current = null, !u || !I || !i) return;
    let d = document.createElement("div");
    d.className = "jt-mlpin temp", d.innerHTML = Pe("#14213D", !0), s.current = new I.Marker({ element: d, anchor: "bottom" }).setLngLat([i.lng, i.lat]).addTo(u);
  }, [i, b]), b === "fail" ? /* @__PURE__ */ e(Lo, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: m, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (b === "loading" || b === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: b === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Yt = null, Ft = "", Ct = !1, $e = /* @__PURE__ */ new Set();
function Ke(t) {
  return Ct ? Promise.reject(new Error("auth")) : Yt && Ft === t ? Yt : Ft && Ft !== t ? Promise.reject(new Error("reload")) : (Ft = t, Yt = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      Ct = !0, $e.forEach((i) => i()), n(new Error("auth"));
    };
    let r = document.createElement("script");
    r.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", r.async = !0, r.onerror = () => {
      Yt = null, Ft = "", n(new Error("load"));
    }, document.head.appendChild(r);
  }), Yt);
}
var Wo = (t) => !!t && !Ct && Ft === t && !!(window.google && window.google.maps);
function Ho(t) {
  let { view: a, setView: n, pins: r, temp: i, selectedId: j, onTap: h, onPinTap: p, onPoi: m, gkey: x } = t, y = Y(null), E = Y(null), s = Y(null), M = Y([]), b = Y(null), l = Y({});
  l.current = { onTap: h, onPinTap: p, onPoi: m, setView: n };
  let [u, I] = z(Ct ? "fail" : "loading");
  W(() => {
    let C = !0, c = () => C && I("fail");
    return $e.add(c), Ke(x).then(async (v) => {
      let { Map: N } = await v.importLibrary("maps"), { Marker: A } = await v.importLibrary("marker"), { Size: f, Point: $ } = await v.importLibrary("core");
      if (!C || !y.current) return;
      s.current = { Marker: A, Size: f, Point: $ };
      let k = new N(y.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      k.addListener("click", async (S) => {
        if (S.placeId) {
          S.stop();
          try {
            let { Place: _ } = await v.importLibrary("places"), O = new _({ id: S.placeId });
            await O.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), l.current.onPoi({
              name: O.displayName || "",
              lat: O.location.lat(),
              lng: O.location.lng(),
              area: O.formattedAddress || "",
              link: O.googleMapsURI || "",
              placeId: S.placeId
            });
            return;
          } catch {
          }
        }
        l.current.onTap(S.latLng.lat(), S.latLng.lng());
      }), k.addListener("idle", () => {
        let S = k.getCenter();
        l.current.setView({ lat: S.lat(), lng: S.lng(), z: k.getZoom() });
      }), E.current = k, I("ok");
    }).catch(() => C && I("fail")), () => {
      C = !1, $e.delete(c);
    };
  }, [x]), W(() => {
    let C = E.current;
    if (!C) return;
    let c = C.getCenter();
    (Math.abs(c.lat() - a.lat) > 1e-6 || Math.abs(c.lng() - a.lng) > 1e-6) && C.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== C.getZoom() && C.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let d = (C, c, v) => {
    let N = s.current, A = c ? 34 : 28, f = c ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(Pe(C, c, v).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new N.Size(A, f),
      anchor: new N.Point(A / 2, f)
    };
  };
  return W(() => {
    let C = E.current, c = s.current;
    !C || !c || (M.current.forEach((v) => v.setMap(null)), M.current = r.map((v) => {
      let N = new c.Marker({ position: { lat: v.lat, lng: v.lng }, map: C, title: v.label, icon: d(v.color, v.id === j, v.text), zIndex: v.id === j ? 10 : 1 });
      return N.addListener("click", () => l.current.onPinTap(v.id)), N;
    }));
  }, [r, j, u]), W(() => {
    let C = E.current, c = s.current;
    b.current && b.current.setMap(null), b.current = null, !(!C || !c || !i) && (b.current = new c.Marker({ position: { lat: i.lat, lng: i.lng }, map: C, icon: d("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [i, u]), u === "fail" ? /* @__PURE__ */ e(Ha, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: y, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    u === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Ya(t) {
  return t.gkey && !Ct ? /* @__PURE__ */ e(Ho, { ...t }) : /* @__PURE__ */ e(Ha, { ...t });
}
var Ia = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Yo = [500, 1e3, 2e3], Me = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function de(t, a) {
  let n = (h) => h * Math.PI / 180, r = n(a.lat - t.lat), i = n(a.lng - t.lng), j = Math.sin(r / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(i / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(j));
}
var Ja = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Jo(t, a, n, r) {
  let i = await Ke(t), { Place: j, SearchNearbyRankPreference: h } = await i.importLibrary("places"), { places: p } = await j.searchNearby({
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
    rankPreference: h.POPULARITY,
    language: "ko"
  }), m = [];
  for (let x of p || []) {
    let y;
    try {
      y = x.regularOpeningHours ? await x.isOpen() : void 0;
    } catch {
      y = void 0;
    }
    m.push({
      id: x.id,
      placeId: x.id,
      name: x.displayName,
      lat: x.location.lat(),
      lng: x.location.lng(),
      type: x.primaryTypeDisplayName || n.label,
      rating: x.rating,
      count: x.userRatingCount,
      addr: x.formattedAddress || "",
      url: x.googleMapsURI || "",
      open: y
    });
  }
  return m;
}
async function qo(t, a, n) {
  let r = `[out:json][timeout:20];nwr(around:${n},${t.lat},${t.lng})${a.osm}["name"];out center 40;`, i = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(r));
  if (!i.ok) throw new Error("osm");
  return ((await i.json()).elements || []).map((h) => {
    let p = h.tags || {}, m = p["name:ko"] || p["name:en"] || "";
    return {
      id: "osm" + h.type + h.id,
      name: m || p.name,
      sub: m && p.name && p.name !== m ? p.name : "",
      lat: h.lat != null ? h.lat : h.center && h.center.lat,
      lng: h.lon != null ? h.lon : h.center && h.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((h) => h.lat && h.name);
}
async function Go(t, a, n) {
  let r = n || { lat: it.lat, lng: it.lng };
