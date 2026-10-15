] }),
    /* @__PURE__ */ t(nt, { label: "날짜", children: /* @__PURE__ */ t("select", { value: E, onChange: (m) => k(Number(m.target.value)), children: Array.from({ length: b }, (m, g) => {
      let T = ut(u, g);
      return /* @__PURE__ */ o("option", { value: g, children: [
        g + 1,
        "일차 ",
        ne(T),
        " (",
        Lt(T),
        ")"
      ] }, g);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !$,
        onClick: () => r({ title: l.trim(), amount: j, payer: C, cat: c, day: E, split: h }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(St, { onConfirm: v, label: "이 경비 삭제" })
  ] });
}
var pt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, qn = 16;
function Pe(e) {
  return e === 0 ? { Icon: Qa, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: to, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: kn, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: eo, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: no, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: ao, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: oo, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: io, label: "뇌우", tone: "#7B5FC4" } : { Icon: kn, label: "흐림", tone: "#66718A" };
}
var _t = (e) => e == null ? "–" : Math.round(e) + "°", An = /* @__PURE__ */ new Map();
async function In(e) {
  let n = An.get(e);
  if (n && Date.now() - n.at < 30 * 6e4) return n.d;
  let a = await fetch(e);
  if (!a.ok) throw new Error("weather " + a.status);
  let i = await a.json();
  return An.set(e, { at: Date.now(), d: i }), i;
}
var Fn = (e, n) => {
  let a = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + n}-${a}`;
};
function zo(e, n) {
  let [a, i] = w({ status: "loading" });
  return U(() => {
    let r = !0, v = async () => {
      try {
        let b = `latitude=${pt.lat}&longitude=${pt.lng}&timezone=Asia%2FTokyo`, u = await In(
          `https://api.open-meteo.com/v1/forecast?${b}&forecast_days=${qn}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), y = {};
        u.daily.time.forEach((s, c) => {
          y[s] = {
            code: u.daily.weather_code[c],
            max: u.daily.temperature_2m_max[c],
            min: u.daily.temperature_2m_min[c],
            pop: u.daily.precipitation_probability_max[c],
            sum: u.daily.precipitation_sum[c]
          };
        });
        let l = {};
        u.hourly.time.forEach((s, c) => {
          l[s.slice(0, 13)] = {
            t: u.hourly.temperature_2m[c],
            pop: u.hourly.precipitation_probability[c],
            code: u.hourly.weather_code[c]
          };
        });
        let M = mt(/* @__PURE__ */ new Date()), z = Array.from({ length: n }, (s, c) => mt(ut(e, c))).filter((s) => !y[s] && s > M), C = {};
        if (z.length) {
          let s = await Promise.all(
            [1, 2, 3].map(
              (N) => In(
                `https://archive-api.open-meteo.com/v1/archive?${b}&start_date=${Fn(z[0], -N)}&end_date=${Fn(z[z.length - 1], -N)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), c = {};
          s.filter(Boolean).forEach(
            (N) => N.daily.time.forEach((E, k) => {
              let h = N.daily.temperature_2m_max[k];
              if (h == null) return;
              let A = E.slice(5), j = c[A] || (c[A] = { max: 0, min: 0, wet: 0, n: 0 });
              j.max += h, j.min += N.daily.temperature_2m_min[k], j.wet += (N.daily.precipitation_sum[k] || 0) >= 1 ? 1 : 0, j.n++;
            })
          ), z.forEach((N) => {
            let E = c[N.slice(5) === "02-29" ? "02-28" : N.slice(5)];
            E && E.n && (C[N] = { max: E.max / E.n, min: E.min / E.n, wet: E.wet, n: E.n });
          });
        }
        r && i({ status: "ok", daily: y, hourly: l, climate: C, at: /* @__PURE__ */ new Date() });
      } catch {
        r && i((u) => u.status === "ok" ? u : { status: "error" });
      }
    };
    v();
    let x = setInterval(v, 30 * 6e4);
    return () => {
      r = !1, clearInterval(x);
    };
  }, [e, n]), a;
}
function Eo({ date: e, w: n }) {
  let a = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      pt.name,
      " 날씨"
    ] }),
    n.status === "ok" && n.daily[e] && /* @__PURE__ */ t("em", { children: `${at(n.at.getHours())}:${at(n.at.getMinutes())} 업데이트` })
  ] });
  if (n.status === "loading")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      a,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (n.status === "error")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      a,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let i = n.daily[e];
  if (i) {
    let { Icon: v, label: x, tone: b } = Pe(i.code), u = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, y = ["09", "12", "15", "18", "21"].map((l) => ({ h: l, v: n.hourly[`${e}T${l}`] })).filter((l) => l.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      a,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(v, { size: 40, color: b, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: x }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: _t(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: _t(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(ro, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      u && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      y.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: y.map(({ h: l, v: M }) => {
        let f = Pe(M.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            l,
            "시"
          ] }),
          /* @__PURE__ */ t(f.Icon, { size: 18, color: f.tone, "aria-label": f.label }),
          /* @__PURE__ */ t("b", { children: _t(M.t) }),
          /* @__PURE__ */ t("em", { children: M.pop == null ? "" : M.pop + "%" })
        ] }, l);
      }) })
    ] });
  }
  let r = n.climate[e];
  return r ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    a,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      qn,
      "일 전부터 나와요. 최근 ",
      r.n,
      "년 같은 날 ",
      pt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ t("b", { children: _t(r.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ t("b", { children: _t(r.min) }),
      "였고, ",
      r.n,
      "번 중 ",
      r.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    a,
    /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function Mo({ v: e }) {
  if (!e) return null;
  let { Icon: n, label: a, tone: i } = Pe(e.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: a, children: [
    /* @__PURE__ */ t(n, { size: 14, color: i, "aria-hidden": "true" }),
    _t(e.t),
    e.pop != null && e.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      e.pop,
      "%"
    ] })
  ] });
}
var ce = 56;
function So({ items: e, isToday: n, onEdit: a, members: i, onAddAt: r }) {
  let [v, x] = w(null), [b, u] = w(() => {
    let h = /* @__PURE__ */ new Date();
    return h.getHours() * 60 + h.getMinutes();
  });
  U(() => {
    if (!n) return;
    let h = setInterval(() => {
      let A = /* @__PURE__ */ new Date();
      u(A.getHours() * 60 + A.getMinutes());
    }, 6e4);
    return () => clearInterval(h);
  }, [n]);
  let y = e.filter((h) => h.time).map((h) => ({ ...h, ...oe(h) })).sort((h, A) => h.s - A.s || h.e - A.e), l = [], M = [], f = -1;
  y.forEach((h) => {
    M.length && h.s >= f && (l.push(M), M = [], f = -1), M.push(h), f = Math.max(f, h.e);
  }), M.length && l.push(M);
  let z = [];
  l.forEach((h) => {
    let A = [];
    h.forEach((j) => {
      let R = A.findIndex((d) => d <= j.s);
      R === -1 ? (R = A.length, A.push(j.e)) : A[R] = j.e, z.push({ ...j, col: R, cl: h });
    }), h.ncol = A.length;
  });
  let C = y.length ? Math.min(8, Math.floor(y[0].s / 60)) : 8, s = y.length ? Math.max(21, Math.ceil(Math.max(...y.map((h) => h.e)) / 60)) : 21, c = (h) => {
    let A = h.currentTarget.getBoundingClientRect(), j = C * 60 + (h.clientY - A.top) / ce * 60;
    return Math.max(C * 60, Math.min(Math.floor(j / 30) * 30, s * 60 - 30, 23 * 60 + 30));
  }, N = Array.from({ length: s - C + 1 }, (h, A) => C + A), E = (h) => (h - C * 60) / 60 * ce, k = e.length - y.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (s - C) * ce + 14 }, children: [
      N.map((h) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: E(h * 60) }, children: /* @__PURE__ */ o("span", { children: [
        at(h % 24),
        ":00"
      ] }) }, h)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (h) => {
            h.target.closest(".jt-tt-block") || !r || r($t(c(h)));
          },
          onPointerMove: (h) => {
            if (h.pointerType !== "mouse" || h.target.closest(".jt-tt-block")) return x(null);
            x(c(h));
          },
          onPointerLeave: () => x(null),
          children: [
            v != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: E(v) + 1, height: ce / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              $t(v),
              " 일정 추가"
            ] }),
            z.map((h) => {
              let A = h.cl.ncol, j = Math.max(24, E(h.e) - E(h.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (j < 44 ? " short" : "") + (A > 1 ? " clash" : ""),
                  style: {
                    top: E(h.s) + 1,
                    height: j,
                    left: `calc(${h.col / A * 100}% + 2px)`,
                    width: `calc(${100 / A}% - 4px)`
                  },
                  onClick: () => a(h),
                  "aria-label": `${h.time} ${h.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: h.title }),
                    /* @__PURE__ */ o("span", { children: [
                      $t(h.s),
                      "~",
                      $t(h.e % (24 * 60)),
                      h.place ? `, ${h.place}` : ""
                    ] })
                  ]
                },
                h.id
              );
            })
          ]
        }
      ),
      n && b >= C * 60 && b <= s * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: E(b) }, "aria-label": `지금 ${$t(b)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      k > 0 ? ` 시간을 정하지 않은 일정 ${k}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function Ao({ settings: e, schedule: n, day: a, setDay: i, onEdit: r, onAddAt: v, me: x, onComment: b, onDelComment: u, onReact: y }) {
  let [l, M, f] = Hn(), [z, C] = w(null), { start: s, days: c, members: N } = e, E = V[a % V.length], k = n.filter((d) => d.day === a).sort((d, $) => (d.time || "99:99").localeCompare($.time || "99:99")), h = go(k), A = mt(ut(s, a)), j = A === mt(/* @__PURE__ */ new Date()), R = zo(s, c);
  return /* @__PURE__ */ o("section", { style: { "--lc": E }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: c }, (d, $) => {
      let m = ut(s, $), g = $ === a;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": g,
          className: "jt-day" + (g ? " active" : ""),
          style: { "--lc": V[$ % V.length] },
          onClick: () => i($),
          children: [
            /* @__PURE__ */ t("span", { className: "jt-day-dot", children: $ + 1 }),
            /* @__PURE__ */ t("span", { className: "jt-day-date", children: ne(m) }),
            /* @__PURE__ */ t("span", { className: "jt-day-wk", children: Lt(m) })
          ]
        },
        $
      );
    }) }),
    /* @__PURE__ */ t(Eo, { date: A, w: R }),
    k.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ t(Yn, { ids: k.map((d) => d.id), open: l, setAll: f }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: k.map((d, $) => {
        let m = d.time ? oe(d) : null, g = k[$ + 1], T = g && de(g);
        return /* @__PURE__ */ o("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: d.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ o("div", { className: "jt-card" + (l[d.id] ? " open" : ""), children: [
            /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => M(d.id), "aria-expanded": !!l[d.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: d.title }),
              /* @__PURE__ */ t(Bt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            l[d.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
              d.time && R.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(Mo, { v: R.hourly[`${A}T${d.time.slice(0, 2)}`] }) }),
              m && d.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                d.time,
                "~",
                d.end,
                ", ",
                Un(m.e - m.s)
              ] }),
              h.has(d.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              d.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(zt, { size: 13 }),
                d.place
              ] }),
              d.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: d.memo }),
              (d.place || d.link || jt(d)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: Mt(d),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (F) => F.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(Ut, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              T && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-next",
                  href: fo(d, g),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (F) => F.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(Et, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: g.title }),
                      "까지 길 찾기",
                      de(d) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(rt, { name: d.by, members: N, size: 16 }),
                  d.by
                ] }),
                /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => r(d), children: [
                  /* @__PURE__ */ t(ge, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Ke, { item: d, me: x, members: N, onReact: (F) => y(d.id, F) }),
                /* @__PURE__ */ t(
                  Jn,
                  {
                    count: (d.comments || []).length,
                    open: z === d.id,
                    onClick: () => C(z === d.id ? null : d.id)
                  }
                )
              ] }),
              z === d.id && /* @__PURE__ */ t(
                We,
                {
                  comments: d.comments || [],
                  me: x,
                  members: N,
                  onAdd: (F) => b(d.id, F),
                  onDelete: (F) => u(d.id, F)
                }
              )
            ] })
          ] })
        ] }, d.id);
      }) })
    ] }),
    /* @__PURE__ */ t(So, { items: k, isToday: j, onEdit: r, members: N, onAddAt: (d) => v && v(a, d) })
  ] });
}
function Io({ view: e, setView: n, pins: a, temp: i, selectedId: r, onTap: v, onPinTap: x }) {
  let b = J(null), [u, y] = w({ w: 0, h: 0 }), l = J(/* @__PURE__ */ new Map()), M = J({ moved: !1, startDist: 0 }), f = J(0), [z, C] = w({ ok: 0, bad: 0 });
  U(() => {
    let g = b.current;
    if (!g) return;
    let T = () => y({ w: g.clientWidth, h: g.clientHeight });
    T();
    let F = new ResizeObserver(T);
    return F.observe(g), () => F.disconnect();
  }, []);
  let s = e.z, c = ze(e.lat, e.lng, s), N = c.x - u.w / 2, E = c.y - u.h / 2, k = 2 ** s, h = [];
  if (u.w) {
    let g = Math.floor(N / ht), T = Math.floor((N + u.w) / ht), F = Math.max(0, Math.floor(E / ht)), X = Math.min(k - 1, Math.floor((E + u.h) / ht));
    for (let H = g; H <= T; H++)
      for (let _ = F; _ <= X; _++) {
        let S = (H % k + k) % k;
        h.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${s}/${S}/${_}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => C((W) => W.ok ? W : { ...W, ok: 1 }),
              onError: () => C((W) => W.bad ? W : { ...W, bad: 1 }),
              style: { left: Math.round(H * ht - N), top: Math.round(_ * ht - E) }
            },
            `${s}/${H}/${_}`
          )
        );
      }
  }
  let A = (g) => {
    if (!g.target.closest("[data-pin],.jt-zoom,.jt-attr") && (b.current.setPointerCapture(g.pointerId), l.current.set(g.pointerId, { x: g.clientX, y: g.clientY }), l.current.size === 1 && (M.current = { moved: !1, startDist: 0 }), l.current.size === 2)) {
      let [T, F] = [...l.current.values()];
      M.current.startDist = Math.hypot(T.x - F.x, T.y - F.y), M.current.moved = !0;
    }
  }, j = (g) => {
    let T = l.current.get(g.pointerId);
    if (!T) return;
    let F = g.clientX - T.x, X = g.clientY - T.y;
    if (l.current.size === 1) {
      if (!M.current.moved && Math.hypot(F, X) < 4) return;
      M.current.moved = !0, l.current.set(g.pointerId, { x: g.clientX, y: g.clientY }), n((H) => {
        let _ = ze(H.lat, H.lng, H.z), S = zn(_.x - F, _.y - X, H.z);
        return { ...H, lat: Math.max(-80, Math.min(80, S.lat)), lng: S.lng };
      });
    } else
      l.current.set(g.pointerId, { x: g.clientX, y: g.clientY });
  }, R = (g) => {
    let T = l.current.get(g.pointerId);
    if (!T) return;
    let F = l.current.size === 1;
    if (l.current.delete(g.pointerId), M.current.startDist && l.current.size === 1) {
      let [X] = [...l.current.values()], H = Math.hypot(T.x - X.x, T.y - X.y) / M.current.startDist;
      H > 1.35 ? n((_) => ({ ..._, z: Gt(_.z + (H > 2.6 ? 2 : 1)) })) : H < 0.7 && n((_) => ({ ..._, z: Gt(_.z - (H < 0.38 ? 2 : 1)) })), M.current.startDist = 0;
    }
    if (F && !M.current.moved && g.type === "pointerup") {
      let X = b.current.getBoundingClientRect(), H = zn(N + (g.clientX - X.left), E + (g.clientY - X.top), s);
      v(H.lat, H.lng);
    }
  }, d = (g) => {
    let T = Date.now();
    T - f.current < 250 || (f.current = T, n((F) => ({ ...F, z: Gt(F.z + (g.deltaY < 0 ? 1 : -1)) })));
  }, $ = (g, T) => {
    let F = ze(g, T, s);
    return { left: F.x - N, top: F.y - E };
  }, m = (g) => g.left > -40 && g.left < u.w + 40 && g.top > -50 && g.top < u.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: b,
      onPointerDown: A,
      onPointerMove: j,
      onPointerUp: R,
      onPointerCancel: R,
      onWheel: d,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        h,
        z.bad > 0 && z.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        u.w > 0 && a.map((g) => {
          let T = $(g.lat, g.lng);
          return m(T) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (g.id === r ? " sel" : ""),
              style: { left: T.left, top: T.top, "--pc": g.color },
              onClick: () => x(g.id),
              "aria-label": g.label,
              children: /* @__PURE__ */ t("i", {})
            },
            g.id
          ) : null;
        }),
        u.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: $(i.lat, i.lng).left, top: $(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((g) => ({ ...g, z: Gt(g.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((g) => ({ ...g, z: Gt(g.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Dn = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Fo = "https://tiles.openfreemap.org/styles/liberty", Vt = null;
function Do() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Vt || (Vt = new Promise((e, n) => {
    let a = document.createElement("link");
    a.rel = "stylesheet", a.href = Dn + "maplibre-gl.css", document.head.appendChild(a);
    let i = document.createElement("script");
    i.src = Dn + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : n(new Error("maplibre")), i.onerror = () => {
      Vt = null, n(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), Vt);
}
var Po = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function $o(e) {
  (e.getStyle().layers || []).forEach((n) => {
    let a = n.layout && n.layout["text-field"];
    if (n.type === "symbol" && a && JSON.stringify(a).includes("name"))
      try {
        e.setLayoutProperty(n.id, "text-field", Po);
      } catch {
      }
  });
}
var Ro = (e) => String(e).replace(/[&<>"]/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[n]), $e = (e, n, a) => {
  let i = n ? 34 : 28, r = n ? 44 : 36, v = a ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${Ro(a)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${r}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${v}</svg>`;
};
function Gn(e) {
  let { view: n, setView: a, pins: i, temp: r, selectedId: v, onTap: x, onPinTap: b } = e, u = J(null), y = J(null), l = J(null), M = J([]), f = J(null), z = J({});
  z.current = { onTap: x, onPinTap: b, setView: a };
  let [C, s] = w("loading");
  return U(() => {
    let c = !0;
    return Do().then((N) => {
      if (!c || !u.current) return;
      l.current = N;
      let E = new N.Map({
        container: u.current,
        style: Fo,
        center: [n.lng, n.lat],
        zoom: n.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      E.touchZoomRotate.disableRotation(), E.addControl(new N.NavigationControl({ showCompass: !1 }), "top-right"), E.on("load", () => {
        $o(E), c && s("ok");
      }), E.on("click", (k) => {
        k.originalEvent && k.originalEvent.target.closest && k.originalEvent.target.closest(".jt-mlpin") || z.current.onTap(k.lngLat.lat, k.lngLat.lng);
      }), E.on("moveend", () => {
        let k = E.getCenter();
        z.current.setView({ lat: k.lat, lng: k.lng, z: E.getZoom() + 1 });
      }), y.current = E, setTimeout(() => c && !E.loaded() && s((k) => k === "loading" ? "slow" : k), 6e3), setTimeout(() => {
        c && y.current === E && !E.loaded() && (E.remove(), y.current = null, s("fail"));
      }, 15e3);
    }).catch(() => c && s("fail")), () => {
      c = !1, y.current && y.current.remove(), y.current = null;
    };
  }, []), U(() => {
    let c = y.current;
    if (!c) return;
    let N = c.getCenter();
    (Math.abs(N.lat - n.lat) > 1e-6 || Math.abs(N.lng - n.lng) > 1e-6 || Math.abs(c.getZoom() + 1 - n.z) > 0.01) && c.flyTo({ center: [n.lng, n.lat], zoom: n.z - 1, duration: 600 });
  }, [n.lat, n.lng, n.z]), U(() => {
    let c = y.current, N = l.current;
    !c || !N || (M.current.forEach((E) => E.remove()), M.current = i.map((E) => {
      let k = document.createElement("button");
      return k.type = "button", k.className = "jt-mlpin" + (E.id === v ? " sel" : ""), k.setAttribute("aria-label", E.label), k.innerHTML = $e(E.color, E.id === v, E.text), k.addEventListener("click", (h) => {
        h.stopPropagation(), z.current.onPinTap(E.id);
      }), new N.Marker({ element: k, anchor: "bottom" }).setLngLat([E.lng, E.lat]).addTo(c);
    }));
  }, [i, v, C]), U(() => {
    let c = y.current, N = l.current;
    if (f.current && f.current.remove(), f.current = null, !c || !N || !r) return;
    let E = document.createElement("div");
    E.className = "jt-mlpin temp", E.innerHTML = $e("#14213D", !0), f.current = new N.Marker({ element: E, anchor: "bottom" }).setLngLat([r.lng, r.lat]).addTo(c);
  }, [r, C]), C === "fail" ? /* @__PURE__ */ t(Io, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: u, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (C === "loading" || C === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: C === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Zt = null, Qt = "", Ot = !1, Re = /* @__PURE__ */ new Set();
function He(e) {
  return Ot ? Promise.reject(new Error("auth")) : Zt && Qt === e ? Zt : Qt && Qt !== e ? Promise.reject(new Error("reload")) : (Qt = e, Zt = new Promise((n, a) => {
    window.__jtGmReady = () => n(window.google.maps), window.gm_authFailure = () => {
      Ot = !0, Re.forEach((r) => r()), a(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      Zt = null, Qt = "", a(new Error("load"));
    }, document.head.appendChild(i);
  }), Zt);
}
function _o(e) {
  let { view: n, setView: a, pins: i, temp: r, selectedId: v, onTap: x, onPinTap: b, onPoi: u, gkey: y } = e, l = J(null), M = J(null), f = J(null), z = J([]), C = J(null), s = J({});
  s.current = { onTap: x, onPinTap: b, onPoi: u, setView: a };
  let [c, N] = w(Ot ? "fail" : "loading");
  U(() => {
    let k = !0, h = () => k && N("fail");
    return Re.add(h), He(y).then(async (A) => {
      let { Map: j } = await A.importLibrary("maps"), { Marker: R } = await A.importLibrary("marker"), { Size: d, Point: $ } = await A.importLibrary("core");
      if (!k || !l.current) return;
      f.current = { Marker: R, Size: d, Point: $ };
      let m = new j(l.current, {
        center: { lat: n.lat, lng: n.lng },
        zoom: Math.round(n.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      m.addListener("click", async (g) => {
        if (g.placeId) {
          g.stop();
          try {
            let { Place: T } = await A.importLibrary("places"), F = new T({ id: g.placeId });
            await F.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), s.current.onPoi({
              name: F.displayName || "",
              lat: F.location.lat(),
              lng: F.location.lng(),
              area: F.formattedAddress || "",
              link: F.googleMapsURI || "",
              placeId: g.placeId
            });
            return;
          } catch {
          }
        }
        s.current.onTap(g.latLng.lat(), g.latLng.lng());
      }), m.addListener("idle", () => {
        let g = m.getCenter();
        s.current.setView({ lat: g.lat(), lng: g.lng(), z: m.getZoom() });
      }), M.current = m, N("ok");
    }).catch(() => k && N("fail")), () => {
      k = !1, Re.delete(h);
    };
  }, [y]), U(() => {
    let k = M.current;
    if (!k) return;
    let h = k.getCenter();
    (Math.abs(h.lat() - n.lat) > 1e-6 || Math.abs(h.lng() - n.lng) > 1e-6) && k.panTo({ lat: n.lat, lng: n.lng }), Math.round(n.z) !== k.getZoom() && k.setZoom(Math.round(n.z));
  }, [n.lat, n.lng, n.z]);
  let E = (k, h, A) => {
    let j = f.current, R = h ? 34 : 28, d = h ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent($e(k, h, A).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new j.Size(R, d),
      anchor: new j.Point(R / 2, d)
    };
  };
  return U(() => {
    let k = M.current, h = f.current;
    !k || !h || (z.current.forEach((A) => A.setMap(null)), z.current = i.map((A) => {
      let j = new h.Marker({ position: { lat: A.lat, lng: A.lng }, map: k, title: A.label, icon: E(A.color, A.id === v, A.text), zIndex: A.id === v ? 10 : 1 });
      return j.addListener("click", () => s.current.onPinTap(A.id)), j;
    }));
  }, [i, v, c]), U(() => {
    let k = M.current, h = f.current;
    C.current && C.current.setMap(null), C.current = null, !(!k || !h || !r) && (C.current = new h.Marker({ position: { lat: r.lat, lng: r.lng }, map: k, icon: E("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [r, c]), c === "fail" ? /* @__PURE__ */ t(Gn, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: l, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    c === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Vn(e) {
  return e.gkey && !Ot ? /* @__PURE__ */ t(_o, { ...e }) : /* @__PURE__ */ t(Gn, { ...e });
}
var Pn = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], To = [500, 1e3, 2e3], Me = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function ue(e, n) {
  let a = (x) => x * Math.PI / 180, i = a(n.lat - e.lat), r = a(n.lng - e.lng), v = Math.sin(i / 2) ** 2 + Math.cos(a(e.lat)) * Math.cos(a(n.lat)) * Math.sin(r / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(v));
}
var Zn = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function Bo(e, n, a, i) {
  let r = await He(e), { Place: v, SearchNearbyRankPreference: x } = await r.importLibrary("places"), { places: b } = await v.searchNearby({
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
    locationRestriction: { center: n, radius: i },
    includedTypes: a.g,
    maxResultCount: 15,
    rankPreference: x.POPULARITY,
    language: "ko"
  }), u = [];
  for (let y of b || []) {
    let l;
    try {
      l = y.regularOpeningHours ? await y.isOpen() : void 0;
    } catch {
      l = void 0;
    }
    u.push({
      id: y.id,
      placeId: y.id,
      name: y.displayName,
      lat: y.location.lat(),
      lng: y.location.lng(),
      type: y.primaryTypeDisplayName || a.label,
      rating: y.rating,
      count: y.userRatingCount,
      addr: y.formattedAddress || "",
      url: y.googleMapsURI || "",
      open: l
    });
  }
  return u;
}
async function Lo(e, n, a) {
  let i = `[out:json][timeout:20];nwr(around:${a},${e.lat},${e.lng})${n.osm}["name"];out center 40;`, r = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!r.ok) throw new Error("osm");
  return ((await r.json()).elements || []).map((x) => {
    let b = x.tags || {}, u = b["name:ko"] || b["name:en"] || "";
    return {
      id: "osm" + x.type + x.id,
      name: u || b.name,
      sub: u && b.name && b.name !== u ? b.name : "",
      lat: x.lat != null ? x.lat : x.center && x.center.lat,
      lng: x.lon != null ? x.lon : x.center && x.center.lon,
      type: n.label,
      addr: ""
    };
  }).filter((x) => x.lat && x.name);
}
async function Qn(e, n, a) {
  let i = a || { lat: pt.lat, lng: pt.lng };
  if (n && !Ot)
    try {
      let x = await He(n), { Place: b } = await x.importLibrary("places"), { places: u } = await b.searchText({
        textQuery: e,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      if (u && u.length)
        return u.map((y) => ({
          name: y.displayName,
          area: y.formattedAddress || "",
          lat: y.location.lat(),
          lng: y.location.lng(),
          link: y.googleMapsURI || "",
          placeId: y.id
        }));
    } catch {
    }
  let r = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(e)
  );
  if (!r.ok) throw new Error("search");
  return (await r.json()).map((x) => {
    let b = String(x.display_name || "").split(",").map((u) => u.trim());
    return { name: x.name || b[0] || e, area: b.slice(1, 3).join(" "), lat: Number(x.lat), lng: Number(x.lon), link: "" };
  });
}
function Oo({ settings: e, wish: n, onSave: a }) {
  let [i, r] = w(Pn[0]), [v, x] = w(1e3), [b, u] = w(null), [y, l] = w(""), [M, f] = w([]), [z, C] = w(!1), [s, c] = w(""), [N, E] = w(""), [k, h] = w({}), A = () => {
    u({ lat: pt.lat, lng: pt.lng, here: !1, at: Date.now() }), l("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, j = () => {
    if (l("현재 위치를 찾는 중"), !navigator.geolocation) return A();
    navigator.geolocation.getCurrentPosition(
      (d) => {
        u({ lat: d.coords.latitude, lng: d.coords.longitude, here: !0, at: Date.now() }), l("");
      },
      A,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  U(() => {
    j();
  }, []), U(() => {
    if (!b) return;
    let d = !0;
    return (async () => {
      C(!0), c("");
      let $ = null, m = "";
      if (e.gmapsKey && !Ot)
        try {
          $ = await Bo(e.gmapsKey, { lat: b.lat, lng: b.lng }, i, v), m = "google";
        } catch {
          $ = null;
        }
      if (!$)
        try {
          $ = await Lo(b, i, v), m = "osm";
        } catch {
          d && (f([]), c("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), C(!1));
          return;
        }
      $.forEach((g) => g.dist = ue(b, g)), m === "osm" && $.sort((g, T) => g.dist - T.dist), d && (f($.slice(0, 20)), E(m), C(!1), $.length || c(`반경 ${Me(v)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      d = !1;
    };
  }, [b, i, v, e.gmapsKey]);
  let R = (d) => k[d.id] || n.some(($) => d.placeId && $.placeId === d.placeId || $.name === d.name && jt($) && Math.abs($.lat - d.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ t(lo, { size: 15 }),
        b ? b.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Me(v)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: j, children: "위치 다시 찾기" })
    ] }),
    y && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: y }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: Pn.map((d) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === d.id ? " on" : ""), onClick: () => r(d), children: d.label }, d.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: To.map((d) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": v === d, className: v === d ? "on" : "", onClick: () => x(d), children: Me(d) }, d)) }),
    z && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
