}
var _t = (e) => e == null ? "–" : Math.round(e) + "°", Ma = /* @__PURE__ */ new Map();
async function Sa(e) {
  let a = Ma.get(e);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(e);
  if (!n.ok) throw new Error("weather " + n.status);
  let i = await n.json();
  return Ma.set(e, { at: Date.now(), d: i }), i;
}
var Aa = (e, a) => {
  let n = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + a}-${n}`;
};
function Co(e, a) {
  let [n, i] = N({ status: "loading" });
  return K(() => {
    let s = !0, y = async () => {
      try {
        let f = `latitude=${pt.lat}&longitude=${pt.lng}&timezone=Asia%2FTokyo`, m = await Sa(
          `https://api.open-meteo.com/v1/forecast?${f}&forecast_days=${Ja}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), w = {};
        m.daily.time.forEach((r, d) => {
          w[r] = {
            code: m.daily.weather_code[d],
            max: m.daily.temperature_2m_max[d],
            min: m.daily.temperature_2m_min[d],
            pop: m.daily.precipitation_probability_max[d],
            sum: m.daily.precipitation_sum[d]
          };
        });
        let l = {};
        m.hourly.time.forEach((r, d) => {
          l[r.slice(0, 13)] = {
            t: m.hourly.temperature_2m[d],
            pop: m.hourly.precipitation_probability[d],
            code: m.hourly.weather_code[d]
          };
        });
        let M = mt(/* @__PURE__ */ new Date()), b = Array.from({ length: a }, (r, d) => mt(ut(e, d))).filter((r) => !w[r] && r > M), I = {};
        if (b.length) {
          let r = await Promise.all(
            [1, 2, 3].map(
              (E) => Sa(
                `https://archive-api.open-meteo.com/v1/archive?${f}&start_date=${Aa(b[0], -E)}&end_date=${Aa(b[b.length - 1], -E)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), d = {};
          r.filter(Boolean).forEach(
            (E) => E.daily.time.forEach((C, k) => {
              let h = E.daily.temperature_2m_max[k];
              if (h == null) return;
              let S = C.slice(5), j = d[S] || (d[S] = { max: 0, min: 0, wet: 0, n: 0 });
              j.max += h, j.min += E.daily.temperature_2m_min[k], j.wet += (E.daily.precipitation_sum[k] || 0) >= 1 ? 1 : 0, j.n++;
            })
          ), b.forEach((E) => {
            let C = d[E.slice(5) === "02-29" ? "02-28" : E.slice(5)];
            C && C.n && (I[E] = { max: C.max / C.n, min: C.min / C.n, wet: C.wet, n: C.n });
          });
        }
        s && i({ status: "ok", daily: w, hourly: l, climate: I, at: /* @__PURE__ */ new Date() });
      } catch {
        s && i((m) => m.status === "ok" ? m : { status: "error" });
      }
    };
    y();
    let v = setInterval(y, 30 * 6e4);
    return () => {
      s = !1, clearInterval(v);
    };
  }, [e, a]), n;
}
function zo({ date: e, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      pt.name,
      " 날씨"
    ] }),
    a.status === "ok" && a.daily[e] && /* @__PURE__ */ t("em", { children: `${nt(a.at.getHours())}:${nt(a.at.getMinutes())} 업데이트` })
  ] });
  if (a.status === "loading")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (a.status === "error")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let i = a.daily[e];
  if (i) {
    let { Icon: y, label: v, tone: f } = $e(i.code), m = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, w = ["09", "12", "15", "18", "21"].map((l) => ({ h: l, v: a.hourly[`${e}T${l}`] })).filter((l) => l.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(y, { size: 40, color: f, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: v }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: _t(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: _t(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(io, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      m && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      w.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: w.map(({ h: l, v: M }) => {
        let x = $e(M.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            l,
            "시"
          ] }),
          /* @__PURE__ */ t(x.Icon, { size: 18, color: x.tone, "aria-label": x.label }),
          /* @__PURE__ */ t("b", { children: _t(M.t) }),
          /* @__PURE__ */ t("em", { children: M.pop == null ? "" : M.pop + "%" })
        ] }, l);
      }) })
    ] });
  }
  let s = a.climate[e];
  return s ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Ja,
      "일 전부터 나와요. 최근 ",
      s.n,
      "년 같은 날 ",
      pt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ t("b", { children: _t(s.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ t("b", { children: _t(s.min) }),
      "였고, ",
      s.n,
      "번 중 ",
      s.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function Eo({ v: e }) {
  if (!e) return null;
  let { Icon: a, label: n, tone: i } = $e(e.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ t(a, { size: 14, color: i, "aria-hidden": "true" }),
    _t(e.t),
    e.pop != null && e.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      e.pop,
      "%"
    ] })
  ] });
}
var ce = 56;
function Mo({ items: e, isToday: a, onEdit: n, members: i, onAddAt: s }) {
  let [y, v] = N(null), [f, m] = N(() => {
    let h = /* @__PURE__ */ new Date();
    return h.getHours() * 60 + h.getMinutes();
  });
  K(() => {
    if (!a) return;
    let h = setInterval(() => {
      let S = /* @__PURE__ */ new Date();
      m(S.getHours() * 60 + S.getMinutes());
    }, 6e4);
    return () => clearInterval(h);
  }, [a]);
  let w = e.filter((h) => h.time).map((h) => ({ ...h, ...oe(h) })).sort((h, S) => h.s - S.s || h.e - S.e), l = [], M = [], x = -1;
  w.forEach((h) => {
    M.length && h.s >= x && (l.push(M), M = [], x = -1), M.push(h), x = Math.max(x, h.e);
  }), M.length && l.push(M);
  let b = [];
  l.forEach((h) => {
    let S = [];
    h.forEach((j) => {
      let R = S.findIndex((p) => p <= j.s);
      R === -1 ? (R = S.length, S.push(j.e)) : S[R] = j.e, b.push({ ...j, col: R, cl: h });
    }), h.ncol = S.length;
  });
  let I = w.length ? Math.min(8, Math.floor(w[0].s / 60)) : 8, r = w.length ? Math.max(21, Math.ceil(Math.max(...w.map((h) => h.e)) / 60)) : 21, d = (h) => {
    let S = h.currentTarget.getBoundingClientRect(), j = I * 60 + (h.clientY - S.top) / ce * 60;
    return Math.max(I * 60, Math.min(Math.floor(j / 30) * 30, r * 60 - 30, 23 * 60 + 30));
  }, E = Array.from({ length: r - I + 1 }, (h, S) => I + S), C = (h) => (h - I * 60) / 60 * ce, k = e.length - w.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (r - I) * ce + 14 }, children: [
      E.map((h) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: C(h * 60) }, children: /* @__PURE__ */ o("span", { children: [
        nt(h % 24),
        ":00"
      ] }) }, h)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (h) => {
            h.target.closest(".jt-tt-block") || !s || s(Pt(d(h)));
          },
          onPointerMove: (h) => {
            if (h.pointerType !== "mouse" || h.target.closest(".jt-tt-block")) return v(null);
            v(d(h));
          },
          onPointerLeave: () => v(null),
          children: [
            y != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: C(y) + 1, height: ce / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Pt(y),
              " 일정 추가"
            ] }),
            b.map((h) => {
              let S = h.cl.ncol, j = Math.max(24, C(h.e) - C(h.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (j < 44 ? " short" : "") + (S > 1 ? " clash" : ""),
                  style: {
                    top: C(h.s) + 1,
                    height: j,
                    left: `calc(${h.col / S * 100}% + 2px)`,
                    width: `calc(${100 / S}% - 4px)`
                  },
                  onClick: () => n(h),
                  "aria-label": `${h.time} ${h.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: h.title }),
                    /* @__PURE__ */ o("span", { children: [
                      Pt(h.s),
                      "~",
                      Pt(h.e % (24 * 60)),
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
      a && f >= I * 60 && f <= r * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: C(f) }, "aria-label": `지금 ${Pt(f)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      k > 0 ? ` 시간을 정하지 않은 일정 ${k}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function So({ settings: e, schedule: a, day: n, setDay: i, onEdit: s, onAddAt: y, me: v, onComment: f, onDelComment: m, onReact: w }) {
  let [l, M, x] = Ka(), [b, I] = N(null), { start: r, days: d, members: E } = e, C = V[n % V.length], k = a.filter((p) => p.day === n).sort((p, P) => (p.time || "99:99").localeCompare(P.time || "99:99")), h = uo(k), S = mt(ut(r, n)), j = S === mt(/* @__PURE__ */ new Date()), R = Co(r, d);
  return /* @__PURE__ */ o("section", { style: { "--lc": C }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: d }, (p, P) => {
      let u = ut(r, P), g = P === n;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": g,
          className: "jt-day" + (g ? " active" : ""),
          style: { "--lc": V[P % V.length] },
          onClick: () => i(P),
          children: [
            /* @__PURE__ */ t("span", { className: "jt-day-dot", children: P + 1 }),
            /* @__PURE__ */ t("span", { className: "jt-day-date", children: ae(u) }),
            /* @__PURE__ */ t("span", { className: "jt-day-wk", children: Lt(u) })
          ]
        },
        P
      );
    }) }),
    /* @__PURE__ */ t(zo, { date: S, w: R }),
    k.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ t(Wa, { ids: k.map((p) => p.id), open: l, setAll: x }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: k.map((p, P) => {
        let u = p.time ? oe(p) : null, g = k[P + 1], T = g && de(g);
        return /* @__PURE__ */ o("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: p.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ o("div", { className: "jt-card" + (l[p.id] ? " open" : ""), children: [
            /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => M(p.id), "aria-expanded": !!l[p.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: p.title }),
              /* @__PURE__ */ t(Bt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            l[p.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
              p.time && R.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(Eo, { v: R.hourly[`${S}T${p.time.slice(0, 2)}`] }) }),
              u && p.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                p.time,
                "~",
                p.end,
                ", ",
                La(u.e - u.s)
              ] }),
              h.has(p.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              p.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(zt, { size: 13 }),
                p.place
              ] }),
              p.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: p.memo }),
              (p.place || p.link || jt(p)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: Mt(p),
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
                  href: go(p, g),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (F) => F.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(Et, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: g.title }),
                      "까지 길 찾기",
                      de(p) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(lt, { name: p.by, members: E, size: 16 }),
                  p.by
                ] }),
                /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(p), children: [
                  /* @__PURE__ */ t(ge, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Ue, { item: p, me: v, onReact: (F) => w(p.id, F) }),
                /* @__PURE__ */ t(
                  Ha,
                  {
                    count: (p.comments || []).length,
                    open: b === p.id,
                    onClick: () => I(b === p.id ? null : p.id)
                  }
                )
              ] }),
              b === p.id && /* @__PURE__ */ t(
                Ke,
                {
                  comments: p.comments || [],
                  me: v,
                  members: E,
                  onAdd: (F) => f(p.id, F),
                  onDelete: (F) => m(p.id, F)
                }
              )
            ] })
          ] })
        ] }, p.id);
      }) })
    ] }),
    /* @__PURE__ */ t(Mo, { items: k, isToday: j, onEdit: s, members: E, onAddAt: (p) => y && y(n, p) })
  ] });
}
function Ao({ view: e, setView: a, pins: n, temp: i, selectedId: s, onTap: y, onPinTap: v }) {
  let f = J(null), [m, w] = N({ w: 0, h: 0 }), l = J(/* @__PURE__ */ new Map()), M = J({ moved: !1, startDist: 0 }), x = J(0), [b, I] = N({ ok: 0, bad: 0 });
  K(() => {
    let g = f.current;
    if (!g) return;
    let T = () => w({ w: g.clientWidth, h: g.clientHeight });
    T();
    let F = new ResizeObserver(T);
    return F.observe(g), () => F.disconnect();
  }, []);
  let r = e.z, d = ze(e.lat, e.lng, r), E = d.x - m.w / 2, C = d.y - m.h / 2, k = 2 ** r, h = [];
  if (m.w) {
    let g = Math.floor(E / ht), T = Math.floor((E + m.w) / ht), F = Math.max(0, Math.floor(C / ht)), X = Math.min(k - 1, Math.floor((C + m.h) / ht));
    for (let H = g; H <= T; H++)
      for (let _ = F; _ <= X; _++) {
        let z = (H % k + k) % k;
        h.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${r}/${z}/${_}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => I((W) => W.ok ? W : { ...W, ok: 1 }),
              onError: () => I((W) => W.bad ? W : { ...W, bad: 1 }),
              style: { left: Math.round(H * ht - E), top: Math.round(_ * ht - C) }
            },
            `${r}/${H}/${_}`
          )
        );
      }
  }
  let S = (g) => {
    if (!g.target.closest("[data-pin],.jt-zoom,.jt-attr") && (f.current.setPointerCapture(g.pointerId), l.current.set(g.pointerId, { x: g.clientX, y: g.clientY }), l.current.size === 1 && (M.current = { moved: !1, startDist: 0 }), l.current.size === 2)) {
      let [T, F] = [...l.current.values()];
      M.current.startDist = Math.hypot(T.x - F.x, T.y - F.y), M.current.moved = !0;
    }
  }, j = (g) => {
    let T = l.current.get(g.pointerId);
    if (!T) return;
    let F = g.clientX - T.x, X = g.clientY - T.y;
    if (l.current.size === 1) {
      if (!M.current.moved && Math.hypot(F, X) < 4) return;
      M.current.moved = !0, l.current.set(g.pointerId, { x: g.clientX, y: g.clientY }), a((H) => {
        let _ = ze(H.lat, H.lng, H.z), z = Na(_.x - F, _.y - X, H.z);
        return { ...H, lat: Math.max(-80, Math.min(80, z.lat)), lng: z.lng };
      });
    } else
      l.current.set(g.pointerId, { x: g.clientX, y: g.clientY });
  }, R = (g) => {
    let T = l.current.get(g.pointerId);
    if (!T) return;
    let F = l.current.size === 1;
    if (l.current.delete(g.pointerId), M.current.startDist && l.current.size === 1) {
      let [X] = [...l.current.values()], H = Math.hypot(T.x - X.x, T.y - X.y) / M.current.startDist;
      H > 1.35 ? a((_) => ({ ..._, z: Gt(_.z + (H > 2.6 ? 2 : 1)) })) : H < 0.7 && a((_) => ({ ..._, z: Gt(_.z - (H < 0.38 ? 2 : 1)) })), M.current.startDist = 0;
    }
    if (F && !M.current.moved && g.type === "pointerup") {
      let X = f.current.getBoundingClientRect(), H = Na(E + (g.clientX - X.left), C + (g.clientY - X.top), r);
      y(H.lat, H.lng);
    }
  }, p = (g) => {
    let T = Date.now();
    T - x.current < 250 || (x.current = T, a((F) => ({ ...F, z: Gt(F.z + (g.deltaY < 0 ? 1 : -1)) })));
  }, P = (g, T) => {
    let F = ze(g, T, r);
    return { left: F.x - E, top: F.y - C };
  }, u = (g) => g.left > -40 && g.left < m.w + 40 && g.top > -50 && g.top < m.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: f,
      onPointerDown: S,
      onPointerMove: j,
      onPointerUp: R,
      onPointerCancel: R,
      onWheel: p,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        h,
        b.bad > 0 && b.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        m.w > 0 && n.map((g) => {
          let T = P(g.lat, g.lng);
          return u(T) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (g.id === s ? " sel" : ""),
              style: { left: T.left, top: T.top, "--pc": g.color },
              onClick: () => v(g.id),
              "aria-label": g.label,
              children: /* @__PURE__ */ t("i", {})
            },
            g.id
          ) : null;
        }),
        m.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: P(i.lat, i.lng).left, top: P(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((g) => ({ ...g, z: Gt(g.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((g) => ({ ...g, z: Gt(g.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Ia = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Io = "https://tiles.openfreemap.org/styles/liberty", Vt = null;
function Fo() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Vt || (Vt = new Promise((e, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = Ia + "maplibre-gl.css", document.head.appendChild(n);
    let i = document.createElement("script");
    i.src = Ia + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : a(new Error("maplibre")), i.onerror = () => {
      Vt = null, a(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), Vt);
}
var Do = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function $o(e) {
  (e.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        e.setLayoutProperty(a.id, "text-field", Do);
      } catch {
      }
  });
}
var Po = (e) => String(e).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), Pe = (e, a, n) => {
  let i = a ? 34 : 28, s = a ? 44 : 36, y = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${Po(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${y}</svg>`;
};
function Xa(e) {
  let { view: a, setView: n, pins: i, temp: s, selectedId: y, onTap: v, onPinTap: f } = e, m = J(null), w = J(null), l = J(null), M = J([]), x = J(null), b = J({});
  b.current = { onTap: v, onPinTap: f, setView: n };
  let [I, r] = N("loading");
  return K(() => {
    let d = !0;
    return Fo().then((E) => {
      if (!d || !m.current) return;
      l.current = E;
      let C = new E.Map({
        container: m.current,
        style: Io,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      C.touchZoomRotate.disableRotation(), C.addControl(new E.NavigationControl({ showCompass: !1 }), "top-right"), C.on("load", () => {
        $o(C), d && r("ok");
      }), C.on("click", (k) => {
        k.originalEvent && k.originalEvent.target.closest && k.originalEvent.target.closest(".jt-mlpin") || b.current.onTap(k.lngLat.lat, k.lngLat.lng);
      }), C.on("moveend", () => {
        let k = C.getCenter();
        b.current.setView({ lat: k.lat, lng: k.lng, z: C.getZoom() + 1 });
      }), w.current = C, setTimeout(() => d && !C.loaded() && r((k) => k === "loading" ? "slow" : k), 6e3), setTimeout(() => {
        d && w.current === C && !C.loaded() && (C.remove(), w.current = null, r("fail"));
      }, 15e3);
    }).catch(() => d && r("fail")), () => {
      d = !1, w.current && w.current.remove(), w.current = null;
    };
  }, []), K(() => {
    let d = w.current;
    if (!d) return;
    let E = d.getCenter();
    (Math.abs(E.lat - a.lat) > 1e-6 || Math.abs(E.lng - a.lng) > 1e-6 || Math.abs(d.getZoom() + 1 - a.z) > 0.01) && d.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), K(() => {
    let d = w.current, E = l.current;
    !d || !E || (M.current.forEach((C) => C.remove()), M.current = i.map((C) => {
      let k = document.createElement("button");
      return k.type = "button", k.className = "jt-mlpin" + (C.id === y ? " sel" : ""), k.setAttribute("aria-label", C.label), k.innerHTML = Pe(C.color, C.id === y, C.text), k.addEventListener("click", (h) => {
        h.stopPropagation(), b.current.onPinTap(C.id);
      }), new E.Marker({ element: k, anchor: "bottom" }).setLngLat([C.lng, C.lat]).addTo(d);
    }));
  }, [i, y, I]), K(() => {
    let d = w.current, E = l.current;
    if (x.current && x.current.remove(), x.current = null, !d || !E || !s) return;
    let C = document.createElement("div");
    C.className = "jt-mlpin temp", C.innerHTML = Pe("#14213D", !0), x.current = new E.Marker({ element: C, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(d);
  }, [s, I]), I === "fail" ? /* @__PURE__ */ t(Ao, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: m, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (I === "loading" || I === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: I === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Zt = null, Qt = "", Ot = !1, Re = /* @__PURE__ */ new Set();
function We(e) {
  return Ot ? Promise.reject(new Error("auth")) : Zt && Qt === e ? Zt : Qt && Qt !== e ? Promise.reject(new Error("reload")) : (Qt = e, Zt = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      Ot = !0, Re.forEach((s) => s()), n(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      Zt = null, Qt = "", n(new Error("load"));
    }, document.head.appendChild(i);
  }), Zt);
}
function Ro(e) {
  let { view: a, setView: n, pins: i, temp: s, selectedId: y, onTap: v, onPinTap: f, onPoi: m, gkey: w } = e, l = J(null), M = J(null), x = J(null), b = J([]), I = J(null), r = J({});
  r.current = { onTap: v, onPinTap: f, onPoi: m, setView: n };
  let [d, E] = N(Ot ? "fail" : "loading");
  K(() => {
    let k = !0, h = () => k && E("fail");
    return Re.add(h), We(w).then(async (S) => {
      let { Map: j } = await S.importLibrary("maps"), { Marker: R } = await S.importLibrary("marker"), { Size: p, Point: P } = await S.importLibrary("core");
      if (!k || !l.current) return;
      x.current = { Marker: R, Size: p, Point: P };
      let u = new j(l.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      u.addListener("click", async (g) => {
        if (g.placeId) {
          g.stop();
          try {
            let { Place: T } = await S.importLibrary("places"), F = new T({ id: g.placeId });
            await F.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), r.current.onPoi({
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
        r.current.onTap(g.latLng.lat(), g.latLng.lng());
      }), u.addListener("idle", () => {
        let g = u.getCenter();
        r.current.setView({ lat: g.lat(), lng: g.lng(), z: u.getZoom() });
      }), M.current = u, E("ok");
    }).catch(() => k && E("fail")), () => {
      k = !1, Re.delete(h);
    };
  }, [w]), K(() => {
    let k = M.current;
    if (!k) return;
    let h = k.getCenter();
    (Math.abs(h.lat() - a.lat) > 1e-6 || Math.abs(h.lng() - a.lng) > 1e-6) && k.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== k.getZoom() && k.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let C = (k, h, S) => {
    let j = x.current, R = h ? 34 : 28, p = h ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(Pe(k, h, S).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new j.Size(R, p),
      anchor: new j.Point(R / 2, p)
    };
  };
  return K(() => {
    let k = M.current, h = x.current;
    !k || !h || (b.current.forEach((S) => S.setMap(null)), b.current = i.map((S) => {
      let j = new h.Marker({ position: { lat: S.lat, lng: S.lng }, map: k, title: S.label, icon: C(S.color, S.id === y, S.text), zIndex: S.id === y ? 10 : 1 });
      return j.addListener("click", () => r.current.onPinTap(S.id)), j;
    }));
  }, [i, y, d]), K(() => {
    let k = M.current, h = x.current;
    I.current && I.current.setMap(null), I.current = null, !(!k || !h || !s) && (I.current = new h.Marker({ position: { lat: s.lat, lng: s.lng }, map: k, icon: C("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, d]), d === "fail" ? /* @__PURE__ */ t(Xa, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: l, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    d === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function qa(e) {
  return e.gkey && !Ot ? /* @__PURE__ */ t(Ro, { ...e }) : /* @__PURE__ */ t(Xa, { ...e });
}
var Fa = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], _o = [500, 1e3, 2e3], Me = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function ue(e, a) {
  let n = (v) => v * Math.PI / 180, i = n(a.lat - e.lat), s = n(a.lng - e.lng), y = Math.sin(i / 2) ** 2 + Math.cos(n(e.lat)) * Math.cos(n(a.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(y));
}
var Ga = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function To(e, a, n, i) {
  let s = await We(e), { Place: y, SearchNearbyRankPreference: v } = await s.importLibrary("places"), { places: f } = await y.searchNearby({
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
    locationRestriction: { center: a, radius: i },
    includedTypes: n.g,
    maxResultCount: 15,
    rankPreference: v.POPULARITY,
    language: "ko"
  }), m = [];
  for (let w of f || []) {
    let l;
    try {
      l = w.regularOpeningHours ? await w.isOpen() : void 0;
    } catch {
      l = void 0;
    }
    m.push({
      id: w.id,
      placeId: w.id,
      name: w.displayName,
      lat: w.location.lat(),
      lng: w.location.lng(),
      type: w.primaryTypeDisplayName || n.label,
      rating: w.rating,
      count: w.userRatingCount,
      addr: w.formattedAddress || "",
      url: w.googleMapsURI || "",
      open: l
    });
  }
  return m;
}
async function Bo(e, a, n) {
  let i = `[out:json][timeout:20];nwr(around:${n},${e.lat},${e.lng})${a.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((v) => {
    let f = v.tags || {}, m = f["name:ko"] || f["name:en"] || "";
    return {
      id: "osm" + v.type + v.id,
      name: m || f.name,
      sub: m && f.name && f.name !== m ? f.name : "",
      lat: v.lat != null ? v.lat : v.center && v.center.lat,
      lng: v.lon != null ? v.lon : v.center && v.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((v) => v.lat && v.name);
}
async function Va(e, a, n) {
  let i = n || { lat: pt.lat, lng: pt.lng };
  if (a && !Ot)
    try {
      let v = await We(a), { Place: f } = await v.importLibrary("places"), { places: m } = await f.searchText({
        textQuery: e,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      if (m && m.length)
        return m.map((w) => ({
          name: w.displayName,
          area: w.formattedAddress || "",
          lat: w.location.lat(),
          lng: w.location.lng(),
          link: w.googleMapsURI || "",
          placeId: w.id
        }));
    } catch {
    }
  let s = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(e)
  );
  if (!s.ok) throw new Error("search");
  return (await s.json()).map((v) => {
    let f = String(v.display_name || "").split(",").map((m) => m.trim());
    return { name: v.name || f[0] || e, area: f.slice(1, 3).join(" "), lat: Number(v.lat), lng: Number(v.lon), link: "" };
  });
}
function Lo({ settings: e, wish: a, onSave: n }) {
  let [i, s] = N(Fa[0]), [y, v] = N(1e3), [f, m] = N(null), [w, l] = N(""), [M, x] = N([]), [b, I] = N(!1), [r, d] = N(""), [E, C] = N(""), [k, h] = N({}), S = () => {
    m({ lat: pt.lat, lng: pt.lng, here: !1, at: Date.now() }), l("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, j = () => {
    if (l("현재 위치를 찾는 중"), !navigator.geolocation) return S();
    navigator.geolocation.getCurrentPosition(
      (p) => {
        m({ lat: p.coords.latitude, lng: p.coords.longitude, here: !0, at: Date.now() }), l("");
      },
      S,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  K(() => {
    j();
  }, []), K(() => {
    if (!f) return;
    let p = !0;
    return (async () => {
      I(!0), d("");
      let P = null, u = "";
      if (e.gmapsKey && !Ot)
        try {
          P = await To(e.gmapsKey, { lat: f.lat, lng: f.lng }, i, y), u = "google";
        } catch {
          P = null;
        }
      if (!P)
        try {
          P = await Bo(f, i, y), u = "osm";
        } catch {
          p && (x([]), d("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), I(!1));
          return;
        }
      P.forEach((g) => g.dist = ue(f, g)), u === "osm" && P.sort((g, T) => g.dist - T.dist), p && (x(P.slice(0, 20)), C(u), I(!1), P.length || d(`반경 ${Me(y)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      p = !1;
    };
  }, [f, i, y, e.gmapsKey]);
  let R = (p) => k[p.id] || a.some((P) => p.placeId && P.placeId === p.placeId || P.name === p.name && jt(P) && Math.abs(P.lat - p.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ t(ro, { size: 15 }),
        f ? f.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Me(y)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: j, children: "위치 다시 찾기" })
    ] }),
    w && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: w }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: Fa.map((p) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === p.id ? " on" : ""), onClick: () => s(p), children: p.label }, p.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: _o.map((p) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": y === p, className: y === p ? "on" : "", onClick: () => v(p), children: Me(p) }, p)) }),
    b && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !b && r && /* @__PURE__ */ t("div", { className: "jt-empty", children: /* @__PURE__ */ t("p", { children: r }) }),
    !b && M.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-near-list", children: M.map((p) => {
      let P = R(p);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ t("strong", { children: p.name }),
          p.sub && /* @__PURE__ */ t("span", { className: "jt-near-sub", children: p.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            p.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ t(lo, { size: 13, fill: "currentColor" }),
              p.rating.toFixed(1),
