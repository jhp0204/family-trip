] }, g);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !P,
        onClick: () => r({ title: c.trim(), amount: j, payer: C, cat: p, day: E, split: h }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(St, { onConfirm: v, label: "이 경비 삭제" })
  ] });
}
var mt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Xa = 16;
function Pe(e) {
  return e === 0 ? { Icon: Qn, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: to, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: wa, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: eo, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: ao, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: no, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: oo, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: io, label: "뇌우", tone: "#7B5FC4" } : { Icon: wa, label: "흐림", tone: "#66718A" };
}
var Tt = (e) => e == null ? "–" : Math.round(e) + "°", Aa = /* @__PURE__ */ new Map();
async function Sa(e) {
  let a = Aa.get(e);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(e);
  if (!n.ok) throw new Error("weather " + n.status);
  let i = await n.json();
  return Aa.set(e, { at: Date.now(), d: i }), i;
}
var Ia = (e, a) => {
  let n = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + a}-${n}`;
};
function zo(e, a) {
  let [n, i] = w({ status: "loading" });
  return U(() => {
    let r = !0, v = async () => {
      try {
        let b = `latitude=${mt.lat}&longitude=${mt.lng}&timezone=Asia%2FTokyo`, u = await Sa(
          `https://api.open-meteo.com/v1/forecast?${b}&forecast_days=${Xa}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), y = {};
        u.daily.time.forEach((s, p) => {
          y[s] = {
            code: u.daily.weather_code[p],
            max: u.daily.temperature_2m_max[p],
            min: u.daily.temperature_2m_min[p],
            pop: u.daily.precipitation_probability_max[p],
            sum: u.daily.precipitation_sum[p]
          };
        });
        let c = {};
        u.hourly.time.forEach((s, p) => {
          c[s.slice(0, 13)] = {
            t: u.hourly.temperature_2m[p],
            pop: u.hourly.precipitation_probability[p],
            code: u.hourly.weather_code[p]
          };
        });
        let M = ct(/* @__PURE__ */ new Date()), z = Array.from({ length: a }, (s, p) => ct(gt(e, p))).filter((s) => !y[s] && s > M), C = {};
        if (z.length) {
          let s = await Promise.all(
            [1, 2, 3].map(
              (N) => Sa(
                `https://archive-api.open-meteo.com/v1/archive?${b}&start_date=${Ia(z[0], -N)}&end_date=${Ia(z[z.length - 1], -N)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), p = {};
          s.filter(Boolean).forEach(
            (N) => N.daily.time.forEach((E, k) => {
              let h = N.daily.temperature_2m_max[k];
              if (h == null) return;
              let S = E.slice(5), j = p[S] || (p[S] = { max: 0, min: 0, wet: 0, n: 0 });
              j.max += h, j.min += N.daily.temperature_2m_min[k], j.wet += (N.daily.precipitation_sum[k] || 0) >= 1 ? 1 : 0, j.n++;
            })
          ), z.forEach((N) => {
            let E = p[N.slice(5) === "02-29" ? "02-28" : N.slice(5)];
            E && E.n && (C[N] = { max: E.max / E.n, min: E.min / E.n, wet: E.wet, n: E.n });
          });
        }
        r && i({ status: "ok", daily: y, hourly: c, climate: C, at: /* @__PURE__ */ new Date() });
      } catch {
        r && i((u) => u.status === "ok" ? u : { status: "error" });
      }
    };
    v();
    let x = setInterval(v, 30 * 6e4);
    return () => {
      r = !1, clearInterval(x);
    };
  }, [e, a]), n;
}
function Eo({ date: e, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      mt.name,
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
    let { Icon: v, label: x, tone: b } = Pe(i.code), u = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, y = ["09", "12", "15", "18", "21"].map((c) => ({ h: c, v: a.hourly[`${e}T${c}`] })).filter((c) => c.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(v, { size: 40, color: b, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: x }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: Tt(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: Tt(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(ro, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      u && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      y.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: y.map(({ h: c, v: M }) => {
        let f = Pe(M.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            c,
            "시"
          ] }),
          /* @__PURE__ */ t(f.Icon, { size: 18, color: f.tone, "aria-label": f.label }),
          /* @__PURE__ */ t("b", { children: Tt(M.t) }),
          /* @__PURE__ */ t("em", { children: M.pop == null ? "" : M.pop + "%" })
        ] }, c);
      }) })
    ] });
  }
  let r = a.climate[e];
  return r ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Xa,
      "일 전부터 나와요. 최근 ",
      r.n,
      "년 같은 날 ",
      mt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ t("b", { children: Tt(r.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ t("b", { children: Tt(r.min) }),
      "였고, ",
      r.n,
      "번 중 ",
      r.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function Mo({ v: e }) {
  if (!e) return null;
  let { Icon: a, label: n, tone: i } = Pe(e.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ t(a, { size: 14, color: i, "aria-hidden": "true" }),
    Tt(e.t),
    e.pop != null && e.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      e.pop,
      "%"
    ] })
  ] });
}
var ce = 56;
function Ao({ items: e, isToday: a, onEdit: n, members: i, onAddAt: r }) {
  let [v, x] = w(null), [b, u] = w(() => {
    let h = /* @__PURE__ */ new Date();
    return h.getHours() * 60 + h.getMinutes();
  });
  U(() => {
    if (!a) return;
    let h = setInterval(() => {
      let S = /* @__PURE__ */ new Date();
      u(S.getHours() * 60 + S.getMinutes());
    }, 6e4);
    return () => clearInterval(h);
  }, [a]);
  let y = e.filter((h) => h.time).map((h) => ({ ...h, ...oe(h) })).sort((h, S) => h.s - S.s || h.e - S.e), c = [], M = [], f = -1;
  y.forEach((h) => {
    M.length && h.s >= f && (c.push(M), M = [], f = -1), M.push(h), f = Math.max(f, h.e);
  }), M.length && c.push(M);
  let z = [];
  c.forEach((h) => {
    let S = [];
    h.forEach((j) => {
      let _ = S.findIndex((l) => l <= j.s);
      _ === -1 ? (_ = S.length, S.push(j.e)) : S[_] = j.e, z.push({ ...j, col: _, cl: h });
    }), h.ncol = S.length;
  });
  let C = y.length ? Math.min(8, Math.floor(y[0].s / 60)) : 8, s = y.length ? Math.max(21, Math.ceil(Math.max(...y.map((h) => h.e)) / 60)) : 21, p = (h) => {
    let S = h.currentTarget.getBoundingClientRect(), j = C * 60 + (h.clientY - S.top) / ce * 60;
    return Math.max(C * 60, Math.min(Math.floor(j / 30) * 30, s * 60 - 30, 23 * 60 + 30));
  }, N = Array.from({ length: s - C + 1 }, (h, S) => C + S), E = (h) => (h - C * 60) / 60 * ce, k = e.length - y.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (s - C) * ce + 14 }, children: [
      N.map((h) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: E(h * 60) }, children: /* @__PURE__ */ o("span", { children: [
        nt(h % 24),
        ":00"
      ] }) }, h)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (h) => {
            h.target.closest(".jt-tt-block") || !r || r(Rt(p(h)));
          },
          onPointerMove: (h) => {
            if (h.pointerType !== "mouse" || h.target.closest(".jt-tt-block")) return x(null);
            x(p(h));
          },
          onPointerLeave: () => x(null),
          children: [
            v != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: E(v) + 1, height: ce / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Rt(v),
              " 일정 추가"
            ] }),
            z.map((h) => {
              let S = h.cl.ncol, j = Math.max(24, E(h.e) - E(h.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (j < 44 ? " short" : "") + (S > 1 ? " clash" : ""),
                  style: {
                    top: E(h.s) + 1,
                    height: j,
                    left: `calc(${h.col / S * 100}% + 2px)`,
                    width: `calc(${100 / S}% - 4px)`
                  },
                  onClick: () => n(h),
                  "aria-label": `${h.time} ${h.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: h.title }),
                    /* @__PURE__ */ o("span", { children: [
                      Rt(h.s),
                      "~",
                      Rt(h.e % (24 * 60)),
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
      a && b >= C * 60 && b <= s * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: E(b) }, "aria-label": `지금 ${Rt(b)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      k > 0 ? ` 시간을 정하지 않은 일정 ${k}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function So({ settings: e, schedule: a, day: n, setDay: i, onEdit: r, onAddAt: v, me: x, onComment: b, onDelComment: u, onReact: y }) {
  let [c, M, f] = Wa(), [z, C] = w(null), { start: s, days: p, members: N } = e, E = V[n % V.length], k = a.filter((l) => l.day === n).sort((l, P) => (l.time || "99:99").localeCompare(P.time || "99:99")), h = go(k), S = ct(gt(s, n)), j = S === ct(/* @__PURE__ */ new Date()), _ = zo(s, p);
  return /* @__PURE__ */ o("section", { style: { "--lc": E }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: p }, (l, P) => {
      let m = gt(s, P), g = P === n, R = a.filter((X) => X.day === P).length, F = ct(m) === ct(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": g,
          "aria-label": `DAY ${P + 1}, ${m.getMonth() + 1}월 ${m.getDate()}일 ${Mt(m)}요일, 일정 ${R}개`,
          className: "jt-day" + (g ? " active" : ""),
          style: { "--lc": V[P % V.length] },
          onClick: () => i(P),
          children: [
            /* @__PURE__ */ o("span", { className: "jt-day-no", children: [
              "DAY ",
              P + 1
            ] }),
            F && /* @__PURE__ */ t("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ o("span", { className: "jt-day-date", children: [
              ae(m),
              " ",
              /* @__PURE__ */ t("em", { children: Mt(m) })
            ] }),
            /* @__PURE__ */ t("span", { className: "jt-day-count", children: R ? `일정 ${R}개` : "일정 없음" })
          ]
        },
        P
      );
    }) }),
    /* @__PURE__ */ t(Eo, { date: S, w: _ }),
    k.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ t(Ha, { ids: k.map((l) => l.id), open: c, setAll: f }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: k.map((l, P) => {
        let m = l.time ? oe(l) : null, g = k[P + 1], R = g && de(g);
        return /* @__PURE__ */ o("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: l.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ o("div", { className: "jt-card" + (c[l.id] ? " open" : ""), children: [
            /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => M(l.id), "aria-expanded": !!c[l.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: l.title }),
              /* @__PURE__ */ t(Lt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            c[l.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
              l.time && _.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(Mo, { v: _.hourly[`${S}T${l.time.slice(0, 2)}`] }) }),
              m && l.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                l.time,
                "~",
                l.end,
                ", ",
                Oa(m.e - m.s)
              ] }),
              h.has(l.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              l.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(Et, { size: 13 }),
                l.place
              ] }),
              l.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: l.memo }),
              (l.place || l.link || dt(l)) && /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ o("a", { className: "jt-maplink", href: At(l), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ t(Ut, { size: 14 }),
                  "구글맵"
                ] }),
                (l.place || dt(l)) && /* @__PURE__ */ o(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: fe(dt(l) ? l : { name: l.place, placeId: l.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ t(vt, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              R && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-next",
                  href: fo(l, g),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (F) => F.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(vt, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: g.title }),
                      "까지 길 찾기",
                      de(l) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(rt, { name: l.by, members: N, size: 16 }),
                  l.by
                ] }),
                /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => r(l), children: [
                  /* @__PURE__ */ t(ge, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Ke, { item: l, me: x, members: N, onReact: (F) => y(l.id, F) }),
                /* @__PURE__ */ t(
                  Ya,
                  {
                    count: (l.comments || []).length,
                    open: z === l.id,
                    onClick: () => C(z === l.id ? null : l.id)
                  }
                )
              ] }),
              z === l.id && /* @__PURE__ */ t(
                We,
                {
                  comments: l.comments || [],
                  me: x,
                  members: N,
                  onAdd: (F) => b(l.id, F),
                  onDelete: (F) => u(l.id, F)
                }
              )
            ] })
          ] })
        ] }, l.id);
      }) })
    ] }),
    /* @__PURE__ */ t(Ao, { items: k, isToday: j, onEdit: r, members: N, onAddAt: (l) => v && v(n, l) })
  ] });
}
function Io({ view: e, setView: a, pins: n, temp: i, selectedId: r, onTap: v, onPinTap: x }) {
  let b = J(null), [u, y] = w({ w: 0, h: 0 }), c = J(/* @__PURE__ */ new Map()), M = J({ moved: !1, startDist: 0 }), f = J(0), [z, C] = w({ ok: 0, bad: 0 });
  U(() => {
    let g = b.current;
    if (!g) return;
    let R = () => y({ w: g.clientWidth, h: g.clientHeight });
    R();
    let F = new ResizeObserver(R);
    return F.observe(g), () => F.disconnect();
  }, []);
  let s = e.z, p = Ee(e.lat, e.lng, s), N = p.x - u.w / 2, E = p.y - u.h / 2, k = 2 ** s, h = [];
  if (u.w) {
    let g = Math.floor(N / jt), R = Math.floor((N + u.w) / jt), F = Math.max(0, Math.floor(E / jt)), X = Math.min(k - 1, Math.floor((E + u.h) / jt));
    for (let H = g; H <= R; H++)
      for (let T = F; T <= X; T++) {
        let A = (H % k + k) % k;
        h.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${s}/${A}/${T}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => C((W) => W.ok ? W : { ...W, ok: 1 }),
              onError: () => C((W) => W.bad ? W : { ...W, bad: 1 }),
              style: { left: Math.round(H * jt - N), top: Math.round(T * jt - E) }
            },
            `${s}/${H}/${T}`
          )
        );
      }
  }
  let S = (g) => {
    if (!g.target.closest("[data-pin],.jt-zoom,.jt-attr") && (b.current.setPointerCapture(g.pointerId), c.current.set(g.pointerId, { x: g.clientX, y: g.clientY }), c.current.size === 1 && (M.current = { moved: !1, startDist: 0 }), c.current.size === 2)) {
      let [R, F] = [...c.current.values()];
      M.current.startDist = Math.hypot(R.x - F.x, R.y - F.y), M.current.moved = !0;
    }
  }, j = (g) => {
    let R = c.current.get(g.pointerId);
    if (!R) return;
    let F = g.clientX - R.x, X = g.clientY - R.y;
    if (c.current.size === 1) {
      if (!M.current.moved && Math.hypot(F, X) < 4) return;
      M.current.moved = !0, c.current.set(g.pointerId, { x: g.clientX, y: g.clientY }), a((H) => {
        let T = Ee(H.lat, H.lng, H.z), A = Ca(T.x - F, T.y - X, H.z);
        return { ...H, lat: Math.max(-80, Math.min(80, A.lat)), lng: A.lng };
      });
    } else
      c.current.set(g.pointerId, { x: g.clientX, y: g.clientY });
  }, _ = (g) => {
    let R = c.current.get(g.pointerId);
    if (!R) return;
    let F = c.current.size === 1;
    if (c.current.delete(g.pointerId), M.current.startDist && c.current.size === 1) {
      let [X] = [...c.current.values()], H = Math.hypot(R.x - X.x, R.y - X.y) / M.current.startDist;
      H > 1.35 ? a((T) => ({ ...T, z: Gt(T.z + (H > 2.6 ? 2 : 1)) })) : H < 0.7 && a((T) => ({ ...T, z: Gt(T.z - (H < 0.38 ? 2 : 1)) })), M.current.startDist = 0;
    }
    if (F && !M.current.moved && g.type === "pointerup") {
      let X = b.current.getBoundingClientRect(), H = Ca(N + (g.clientX - X.left), E + (g.clientY - X.top), s);
      v(H.lat, H.lng);
    }
  }, l = (g) => {
    let R = Date.now();
    R - f.current < 250 || (f.current = R, a((F) => ({ ...F, z: Gt(F.z + (g.deltaY < 0 ? 1 : -1)) })));
  }, P = (g, R) => {
    let F = Ee(g, R, s);
    return { left: F.x - N, top: F.y - E };
  }, m = (g) => g.left > -40 && g.left < u.w + 40 && g.top > -50 && g.top < u.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: b,
      onPointerDown: S,
      onPointerMove: j,
      onPointerUp: _,
      onPointerCancel: _,
      onWheel: l,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        h,
        z.bad > 0 && z.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        u.w > 0 && n.map((g) => {
          let R = P(g.lat, g.lng);
          return m(R) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (g.id === r ? " sel" : ""),
              style: { left: R.left, top: R.top, "--pc": g.color },
              onClick: () => x(g.id),
              "aria-label": g.label,
              children: /* @__PURE__ */ t("i", {})
            },
            g.id
          ) : null;
        }),
        u.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: P(i.lat, i.lng).left, top: P(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((g) => ({ ...g, z: Gt(g.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((g) => ({ ...g, z: Gt(g.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Fa = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Fo = "https://tiles.openfreemap.org/styles/liberty", Vt = null;
function Do() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Vt || (Vt = new Promise((e, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = Fa + "maplibre-gl.css", document.head.appendChild(n);
    let i = document.createElement("script");
    i.src = Fa + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : a(new Error("maplibre")), i.onerror = () => {
      Vt = null, a(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), Vt);
}
var $o = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Po(e) {
  (e.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        e.setLayoutProperty(a.id, "text-field", $o);
      } catch {
      }
  });
}
var Ro = (e) => String(e).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), Re = (e, a, n) => {
  let i = a ? 34 : 28, r = a ? 44 : 36, v = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${Ro(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${r}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${v}</svg>`;
};
function qa(e) {
  let { view: a, setView: n, pins: i, temp: r, selectedId: v, onTap: x, onPinTap: b } = e, u = J(null), y = J(null), c = J(null), M = J([]), f = J(null), z = J({});
  z.current = { onTap: x, onPinTap: b, setView: n };
  let [C, s] = w("loading");
  return U(() => {
    let p = !0;
    return Do().then((N) => {
      if (!p || !u.current) return;
      c.current = N;
      let E = new N.Map({
        container: u.current,
        style: Fo,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      E.touchZoomRotate.disableRotation(), E.addControl(new N.NavigationControl({ showCompass: !1 }), "top-right"), E.on("load", () => {
        Po(E), p && s("ok");
      }), E.on("click", (k) => {
        k.originalEvent && k.originalEvent.target.closest && k.originalEvent.target.closest(".jt-mlpin") || z.current.onTap(k.lngLat.lat, k.lngLat.lng);
      }), E.on("moveend", () => {
        let k = E.getCenter();
        z.current.setView({ lat: k.lat, lng: k.lng, z: E.getZoom() + 1 });
      }), y.current = E, setTimeout(() => p && !E.loaded() && s((k) => k === "loading" ? "slow" : k), 6e3), setTimeout(() => {
        p && y.current === E && !E.loaded() && (E.remove(), y.current = null, s("fail"));
      }, 15e3);
    }).catch(() => p && s("fail")), () => {
      p = !1, y.current && y.current.remove(), y.current = null;
    };
  }, []), U(() => {
    let p = y.current;
    if (!p) return;
    let N = p.getCenter();
    (Math.abs(N.lat - a.lat) > 1e-6 || Math.abs(N.lng - a.lng) > 1e-6 || Math.abs(p.getZoom() + 1 - a.z) > 0.01) && p.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), U(() => {
    let p = y.current, N = c.current;
    !p || !N || (M.current.forEach((E) => E.remove()), M.current = i.map((E) => {
      let k = document.createElement("button");
      return k.type = "button", k.className = "jt-mlpin" + (E.id === v ? " sel" : ""), k.setAttribute("aria-label", E.label), k.innerHTML = Re(E.color, E.id === v, E.text), k.addEventListener("click", (h) => {
        h.stopPropagation(), z.current.onPinTap(E.id);
      }), new N.Marker({ element: k, anchor: "bottom" }).setLngLat([E.lng, E.lat]).addTo(p);
    }));
  }, [i, v, C]), U(() => {
    let p = y.current, N = c.current;
    if (f.current && f.current.remove(), f.current = null, !p || !N || !r) return;
    let E = document.createElement("div");
    E.className = "jt-mlpin temp", E.innerHTML = Re("#14213D", !0), f.current = new N.Marker({ element: E, anchor: "bottom" }).setLngLat([r.lng, r.lat]).addTo(p);
  }, [r, C]), C === "fail" ? /* @__PURE__ */ t(Io, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: u, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (C === "loading" || C === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: C === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Zt = null, Qt = "", Ot = !1, _e = /* @__PURE__ */ new Set();
function He(e) {
  return Ot ? Promise.reject(new Error("auth")) : Zt && Qt === e ? Zt : Qt && Qt !== e ? Promise.reject(new Error("reload")) : (Qt = e, Zt = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      Ot = !0, _e.forEach((r) => r()), n(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      Zt = null, Qt = "", n(new Error("load"));
    }, document.head.appendChild(i);
  }), Zt);
}
function _o(e) {
  let { view: a, setView: n, pins: i, temp: r, selectedId: v, onTap: x, onPinTap: b, onPoi: u, gkey: y } = e, c = J(null), M = J(null), f = J(null), z = J([]), C = J(null), s = J({});
  s.current = { onTap: x, onPinTap: b, onPoi: u, setView: n };
  let [p, N] = w(Ot ? "fail" : "loading");
  U(() => {
    let k = !0, h = () => k && N("fail");
    return _e.add(h), He(y).then(async (S) => {
      let { Map: j } = await S.importLibrary("maps"), { Marker: _ } = await S.importLibrary("marker"), { Size: l, Point: P } = await S.importLibrary("core");
      if (!k || !c.current) return;
      f.current = { Marker: _, Size: l, Point: P };
      let m = new j(c.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      m.addListener("click", async (g) => {
        if (g.placeId) {
          g.stop();
          try {
            let { Place: R } = await S.importLibrary("places"), F = new R({ id: g.placeId });
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
      k = !1, _e.delete(h);
    };
  }, [y]), U(() => {
    let k = M.current;
    if (!k) return;
    let h = k.getCenter();
    (Math.abs(h.lat() - a.lat) > 1e-6 || Math.abs(h.lng() - a.lng) > 1e-6) && k.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== k.getZoom() && k.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let E = (k, h, S) => {
    let j = f.current, _ = h ? 34 : 28, l = h ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(Re(k, h, S).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new j.Size(_, l),
      anchor: new j.Point(_ / 2, l)
    };
  };
  return U(() => {
    let k = M.current, h = f.current;
    !k || !h || (z.current.forEach((S) => S.setMap(null)), z.current = i.map((S) => {
      let j = new h.Marker({ position: { lat: S.lat, lng: S.lng }, map: k, title: S.label, icon: E(S.color, S.id === v, S.text), zIndex: S.id === v ? 10 : 1 });
      return j.addListener("click", () => s.current.onPinTap(S.id)), j;
    }));
  }, [i, v, p]), U(() => {
    let k = M.current, h = f.current;
    C.current && C.current.setMap(null), C.current = null, !(!k || !h || !r) && (C.current = new h.Marker({ position: { lat: r.lat, lng: r.lng }, map: k, icon: E("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [r, p]), p === "fail" ? /* @__PURE__ */ t(qa, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: c, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    p === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Ga(e) {
  return e.gkey && !Ot ? /* @__PURE__ */ t(_o, { ...e }) : /* @__PURE__ */ t(qa, { ...e });
}
var Da = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], To = [500, 1e3, 2e3], Ae = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function ue(e, a) {
  let n = (x) => x * Math.PI / 180, i = n(a.lat - e.lat), r = n(a.lng - e.lng), v = Math.sin(i / 2) ** 2 + Math.cos(n(e.lat)) * Math.cos(n(a.lat)) * Math.sin(r / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(v));
}
var Va = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function Bo(e, a, n, i) {
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
    locationRestriction: { center: a, radius: i },
    includedTypes: n.g,
    maxResultCount: 15,
    rankPreference: x.POPULARITY,
    language: "ko"
  }), u = [];
  for (let y of b || []) {
    let c;
    try {
      c = y.regularOpeningHours ? await y.isOpen() : void 0;
    } catch {
      c = void 0;
    }
    u.push({
      id: y.id,
      placeId: y.id,
      name: y.displayName,
      lat: y.location.lat(),
      lng: y.location.lng(),
      type: y.primaryTypeDisplayName || n.label,
      rating: y.rating,
      count: y.userRatingCount,
      addr: y.formattedAddress || "",
      url: y.googleMapsURI || "",
      open: c
    });
  }
  return u;
}
async function Lo(e, a, n) {
  let i = `[out:json][timeout:20];nwr(around:${n},${e.lat},${e.lng})${a.osm}["name"];out center 40;`, r = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!r.ok) throw new Error("osm");
  return ((await r.json()).elements || []).map((x) => {
    let b = x.tags || {}, u = b["name:ko"] || b["name:en"] || "";
    return {
      id: "osm" + x.type + x.id,
      name: u || b.name,
      sub: u && b.name && b.name !== u ? b.name : "",
      lat: x.lat != null ? x.lat : x.center && x.center.lat,
      lng: x.lon != null ? x.lon : x.center && x.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((x) => x.lat && x.name);
}
async function Za(e, a, n) {
  let i = n || { lat: mt.lat, lng: mt.lng };
  if (a && !Ot)
    try {
      let x = await He(a), { Place: b } = await x.importLibrary("places"), { places: u } = await b.searchText({
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
function Oo({ settings: e, wish: a, onSave: n }) {
  let [i, r] = w(Da[0]), [v, x] = w(1e3), [b, u] = w(null), [y, c] = w(""), [M, f] = w([]), [z, C] = w(!1), [s, p] = w(""), [N, E] = w(""), [k, h] = w({}), S = () => {
    u({ lat: mt.lat, lng: mt.lng, here: !1, at: Date.now() }), c("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, j = () => {
    if (c("현재 위치를 찾는 중"), !navigator.geolocation) return S();
    navigator.geolocation.getCurrentPosition(
      (l) => {
        u({ lat: l.coords.latitude, lng: l.coords.longitude, here: !0, at: Date.now() }), c("");
      },
      S,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  U(() => {
    j();
  }, []), U(() => {
    if (!b) return;
    let l = !0;
    return (async () => {
      C(!0), p("");
      let P = null, m = "";
      if (e.gmapsKey && !Ot)
        try {
          P = await Bo(e.gmapsKey, { lat: b.lat, lng: b.lng }, i, v), m = "google";
        } catch {
          P = null;
        }
      if (!P)
        try {
          P = await Lo(b, i, v), m = "osm";
        } catch {
          l && (f([]), p("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), C(!1));
          return;
        }
      P.forEach((g) => g.dist = ue(b, g)), m === "osm" && P.sort((g, R) => g.dist - R.dist), l && (f(P.slice(0, 20)), E(m), C(!1), P.length || p(`반경 ${Ae(v)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      l = !1;
    };
  }, [b, i, v, e.gmapsKey]);
  let _ = (l) => k[l.id] || a.some((P) => l.placeId && P.placeId === l.placeId || P.name === l.name && dt(P) && Math.abs(P.lat - l.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ t(lo, { size: 15 }),
        b ? b.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Ae(v)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: j, children: "위치 다시 찾기" })
    ] }),
    y && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: y }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: Da.map((l) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === l.id ? " on" : ""), onClick: () => r(l), children: l.label }, l.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: To.map((l) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": v === l, className: v === l ? "on" : "", onClick: () => x(l), children: Ae(l) }, l)) }),
    z && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
