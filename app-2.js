A.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      A.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((u) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (N === u ? " on" : ""), onClick: () => s(u), children: u }, u)) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((u) => /* @__PURE__ */ a("button", { type: "button", className: "jt-chip" + (v.includes(u) ? " on" : ""), onClick: () => l(u), children: [
        v.includes(u) && /* @__PURE__ */ t(_n, { size: 14 }),
        u
      ] }, u)) }),
      j > 0 && v.length > 0 && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
        "1인당 ",
        G(j / v.length)
      ] }),
      v.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: On.map((u) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (p === u ? " on" : ""), onClick: () => k(u), children: u }, u)) })
    ] }),
    /* @__PURE__ */ t(at, { label: "날짜", children: /* @__PURE__ */ t("select", { value: z, onChange: (u) => M(Number(u.target.value)), children: Array.from({ length: g }, (u, f) => {
      let T = ft(m, f);
      return /* @__PURE__ */ a("option", { value: f, children: [
        f + 1,
        "일차 ",
        ne(T),
        " (",
        At(T),
        ")"
      ] }, f);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !R,
        onClick: () => r({ title: c.trim(), amount: j, payer: N, cat: p, day: z, split: v }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(St, { onConfirm: y, label: "이 경비 삭제" })
  ] });
}
var mt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, qn = 16;
function $e(e) {
  return e === 0 ? { Icon: to, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: eo, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: kn, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: no, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: ao, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: oo, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: io, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: ro, label: "뇌우", tone: "#7B5FC4" } : { Icon: kn, label: "흐림", tone: "#66718A" };
}
var _t = (e) => e == null ? "–" : Math.round(e) + "°", Sn = /* @__PURE__ */ new Map();
async function In(e) {
  let n = Sn.get(e);
  if (n && Date.now() - n.at < 30 * 6e4) return n.d;
  let o = await fetch(e);
  if (!o.ok) throw new Error("weather " + o.status);
  let i = await o.json();
  return Sn.set(e, { at: Date.now(), d: i }), i;
}
var Fn = (e, n) => {
  let o = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + n}-${o}`;
};
function Ao(e, n) {
  let [o, i] = w({ status: "loading" });
  return O(() => {
    let r = !0, y = async () => {
      try {
        let g = `latitude=${mt.lat}&longitude=${mt.lng}&timezone=Asia%2FTokyo`, m = await In(
          `https://api.open-meteo.com/v1/forecast?${g}&forecast_days=${qn}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), h = {};
        m.daily.time.forEach((s, p) => {
          h[s] = {
            code: m.daily.weather_code[p],
            max: m.daily.temperature_2m_max[p],
            min: m.daily.temperature_2m_min[p],
            pop: m.daily.precipitation_probability_max[p],
            sum: m.daily.precipitation_sum[p]
          };
        });
        let c = {};
        m.hourly.time.forEach((s, p) => {
          c[s.slice(0, 13)] = {
            t: m.hourly.temperature_2m[p],
            pop: m.hourly.precipitation_probability[p],
            code: m.hourly.weather_code[p]
          };
        });
        let E = ct(/* @__PURE__ */ new Date()), C = Array.from({ length: n }, (s, p) => ct(ft(e, p))).filter((s) => !h[s] && s > E), N = {};
        if (C.length) {
          let s = await Promise.all(
            [1, 2, 3].map(
              (k) => In(
                `https://archive-api.open-meteo.com/v1/archive?${g}&start_date=${Fn(C[0], -k)}&end_date=${Fn(C[C.length - 1], -k)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), p = {};
          s.filter(Boolean).forEach(
            (k) => k.daily.time.forEach((z, M) => {
              let v = k.daily.temperature_2m_max[M];
              if (v == null) return;
              let I = z.slice(5), j = p[I] || (p[I] = { max: 0, min: 0, wet: 0, n: 0 });
              j.max += v, j.min += k.daily.temperature_2m_min[M], j.wet += (k.daily.precipitation_sum[M] || 0) >= 1 ? 1 : 0, j.n++;
            })
          ), C.forEach((k) => {
            let z = p[k.slice(5) === "02-29" ? "02-28" : k.slice(5)];
            z && z.n && (N[k] = { max: z.max / z.n, min: z.min / z.n, wet: z.wet, n: z.n });
          });
        }
        r && i({ status: "ok", daily: h, hourly: c, climate: N, at: /* @__PURE__ */ new Date() });
      } catch {
        r && i((m) => m.status === "ok" ? m : { status: "error" });
      }
    };
    y();
    let x = setInterval(y, 30 * 6e4);
    return () => {
      r = !1, clearInterval(x);
    };
  }, [e, n]), o;
}
function Mo({ date: e, w: n }) {
  let o = /* @__PURE__ */ a("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ a("span", { children: [
      mt.name,
      " 날씨"
    ] }),
    n.status === "ok" && n.daily[e] && /* @__PURE__ */ t("em", { children: `${nt(n.at.getHours())}:${nt(n.at.getMinutes())} 업데이트` })
  ] });
  if (n.status === "loading")
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (n.status === "error")
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let i = n.daily[e];
  if (i) {
    let { Icon: y, label: x, tone: g } = $e(i.code), m = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, h = ["09", "12", "15", "18", "21"].map((c) => ({ h: c, v: n.hourly[`${e}T${c}`] })).filter((c) => c.v);
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ a("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(y, { size: 40, color: g, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ a("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: x }),
          /* @__PURE__ */ a("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: _t(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: _t(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(so, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      m && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      h.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: h.map(({ h: c, v: E }) => {
        let b = $e(E.code);
        return /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ a("span", { children: [
            c,
            "시"
          ] }),
          /* @__PURE__ */ t(b.Icon, { size: 18, color: b.tone, "aria-label": b.label }),
          /* @__PURE__ */ t("b", { children: _t(E.t) }),
          /* @__PURE__ */ t("em", { children: E.pop == null ? "" : E.pop + "%" })
        ] }, c);
      }) })
    ] });
  }
  let r = n.climate[e];
  return r ? /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ a("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      qn,
      "일 전부터 나와요. 최근 ",
      r.n,
      "년 같은 날 ",
      mt.name,
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
  ] }) : /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function So({ v: e }) {
  if (!e) return null;
  let { Icon: n, label: o, tone: i } = $e(e.code);
  return /* @__PURE__ */ a("span", { className: "jt-wxchip", title: o, children: [
    /* @__PURE__ */ t(n, { size: 14, color: i, "aria-hidden": "true" }),
    _t(e.t),
    e.pop != null && e.pop >= 30 && /* @__PURE__ */ a("em", { children: [
      "비 ",
      e.pop,
      "%"
    ] })
  ] });
}
var ce = 56;
function Io({ items: e, isToday: n, onEdit: o, members: i, onAddAt: r }) {
  let [y, x] = w(null), [g, m] = w(() => {
    let v = /* @__PURE__ */ new Date();
    return v.getHours() * 60 + v.getMinutes();
  });
  O(() => {
    if (!n) return;
    let v = setInterval(() => {
      let I = /* @__PURE__ */ new Date();
      m(I.getHours() * 60 + I.getMinutes());
    }, 6e4);
    return () => clearInterval(v);
  }, [n]);
  let h = e.filter((v) => v.time).map((v) => ({ ...v, ...oe(v) })).sort((v, I) => v.s - I.s || v.e - I.e), c = [], E = [], b = -1;
  h.forEach((v) => {
    E.length && v.s >= b && (c.push(E), E = [], b = -1), E.push(v), b = Math.max(b, v.e);
  }), E.length && c.push(E);
  let C = [];
  c.forEach((v) => {
    let I = [];
    v.forEach((j) => {
      let A = I.findIndex((l) => l <= j.s);
      A === -1 ? (A = I.length, I.push(j.e)) : I[A] = j.e, C.push({ ...j, col: A, cl: v });
    }), v.ncol = I.length;
  });
  let N = h.length ? Math.min(8, Math.floor(h[0].s / 60)) : 8, s = h.length ? Math.max(21, Math.ceil(Math.max(...h.map((v) => v.e)) / 60)) : 21, p = (v) => {
    let I = v.currentTarget.getBoundingClientRect(), j = N * 60 + (v.clientY - I.top) / ce * 60;
    return Math.max(N * 60, Math.min(Math.floor(j / 30) * 30, s * 60 - 30, 23 * 60 + 30));
  }, k = Array.from({ length: s - N + 1 }, (v, I) => N + I), z = (v) => (v - N * 60) / 60 * ce, M = e.length - h.length;
  return /* @__PURE__ */ a("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ a("div", { className: "jt-tt", style: { height: (s - N) * ce + 14 }, children: [
      k.map((v) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: z(v * 60) }, children: /* @__PURE__ */ a("span", { children: [
        nt(v % 24),
        ":00"
      ] }) }, v)),
      /* @__PURE__ */ a(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (v) => {
            v.target.closest(".jt-tt-block") || !r || r(Rt(p(v)));
          },
          onPointerMove: (v) => {
            if (v.pointerType !== "mouse" || v.target.closest(".jt-tt-block")) return x(null);
            x(p(v));
          },
          onPointerLeave: () => x(null),
          children: [
            y != null && /* @__PURE__ */ a("div", { className: "jt-tt-ghost", style: { top: z(y) + 1, height: ce / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Rt(y),
              " 일정 추가"
            ] }),
            C.map((v) => {
              let I = v.cl.ncol, j = Math.max(24, z(v.e) - z(v.s) - 3);
              return /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (j < 44 ? " short" : "") + (I > 1 ? " clash" : ""),
                  style: {
                    top: z(v.s) + 1,
                    height: j,
                    left: `calc(${v.col / I * 100}% + 2px)`,
                    width: `calc(${100 / I}% - 4px)`
                  },
                  onClick: () => o(v),
                  "aria-label": `${v.time} ${v.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: v.title }),
                    /* @__PURE__ */ a("span", { children: [
                      Rt(v.s),
                      "~",
                      Rt(v.e % (24 * 60)),
                      v.place ? `, ${v.place}` : ""
                    ] })
                  ]
                },
                v.id
              );
            })
          ]
        }
      ),
      n && g >= N * 60 && g <= s * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: z(g) }, "aria-label": `지금 ${Rt(g)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ a("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      M > 0 ? ` 시간을 정하지 않은 일정 ${M}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function Fo({ settings: e, schedule: n, day: o, setDay: i, onEdit: r, onAddAt: y, me: x, onComment: g, onDelComment: m, onReact: h }) {
  let [c, E, b] = Hn(), [C, N] = w(null), { start: s, days: p, members: k } = e, z = V[o % V.length], M = n.filter((l) => l.day === o).sort((l, R) => (l.time || "99:99").localeCompare(R.time || "99:99")), v = go(M), I = ct(ft(s, o)), j = I === ct(/* @__PURE__ */ new Date()), A = Ao(s, p);
  return /* @__PURE__ */ a("section", { style: { "--lc": z }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: p }, (l, R) => {
      let u = ft(s, R), f = R === o, T = n.filter((X) => X.day === R).length, D = ct(u) === ct(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ a(
        "button",
        {
          role: "tab",
          "aria-selected": f,
          "aria-label": `DAY ${R + 1}, ${u.getMonth() + 1}월 ${u.getDate()}일 ${At(u)}요일, 일정 ${T}개`,
          className: "jt-day" + (f ? " active" : ""),
          style: { "--lc": V[R % V.length] },
          onClick: () => i(R),
          children: [
            /* @__PURE__ */ a("span", { className: "jt-day-no", children: [
              "DAY ",
              R + 1
            ] }),
            D && /* @__PURE__ */ t("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ a("span", { className: "jt-day-date", children: [
              ne(u),
              " ",
              /* @__PURE__ */ t("em", { children: At(u) })
            ] }),
            /* @__PURE__ */ t("span", { className: "jt-day-count", children: T ? `일정 ${T}개` : "일정 없음" })
          ]
        },
        R
      );
    }) }),
    /* @__PURE__ */ t(Mo, { date: I, w: A }),
    M.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ a(pt, { children: [
      /* @__PURE__ */ t(Yn, { ids: M.map((l) => l.id), open: c, setAll: b }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: M.map((l, R) => {
        let u = l.time ? oe(l) : null, f = M[R + 1], T = f && de(f);
        return /* @__PURE__ */ a("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: l.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ a("div", { className: "jt-card" + (c[l.id] ? " open" : ""), children: [
            /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => E(l.id), "aria-expanded": !!c[l.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: l.title }),
              /* @__PURE__ */ t(Lt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            c[l.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
              l.time && A.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(So, { v: A.hourly[`${I}T${l.time.slice(0, 2)}`] }) }),
              u && l.end && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                l.time,
                "~",
                l.end,
                ", ",
                Kn(u.e - u.s)
              ] }),
              v.has(l.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              l.place && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(Et, { size: 13 }),
                l.place
              ] }),
              l.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: l.memo }),
              (l.place || l.link || dt(l)) && /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ a("a", { className: "jt-maplink", href: Mt(l), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ t(Kt, { size: 14 }),
                  "구글맵"
                ] }),
                (l.place || dt(l)) && /* @__PURE__ */ a(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: ge(dt(l) ? l : { name: l.place, placeId: l.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ t(vt, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              T && /* @__PURE__ */ a(
                "a",
                {
                  className: "jt-next",
                  href: bo(l, f),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (D) => D.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(vt, { size: 14 }),
                    /* @__PURE__ */ a("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: f.title }),
                      "까지 길 찾기",
                      de(l) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ a("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ a("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(rt, { name: l.by, members: k, size: 16 }),
                  l.by
                ] }),
                /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => r(l), children: [
                  /* @__PURE__ */ t(fe, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Ue, { item: l, me: x, members: k, onReact: (D) => h(l.id, D) }),
                /* @__PURE__ */ t(
                  Jn,
                  {
                    count: (l.comments || []).length,
                    open: C === l.id,
                    onClick: () => N(C === l.id ? null : l.id)
                  }
                )
              ] }),
              C === l.id && /* @__PURE__ */ t(
                We,
                {
                  comments: l.comments || [],
                  me: x,
                  members: k,
                  onAdd: (D) => g(l.id, D),
                  onDelete: (D) => m(l.id, D)
                }
              )
            ] })
          ] })
        ] }, l.id);
      }) })
    ] }),
    /* @__PURE__ */ t(Io, { items: M, isToday: j, onEdit: r, members: k, onAddAt: (l) => y && y(o, l) })
  ] });
}
function Do({ view: e, setView: n, pins: o, temp: i, selectedId: r, onTap: y, onPinTap: x }) {
  let g = H(null), [m, h] = w({ w: 0, h: 0 }), c = H(/* @__PURE__ */ new Map()), E = H({ moved: !1, startDist: 0 }), b = H(0), [C, N] = w({ ok: 0, bad: 0 });
  O(() => {
    let f = g.current;
    if (!f) return;
    let T = () => h({ w: f.clientWidth, h: f.clientHeight });
    T();
    let D = new ResizeObserver(T);
    return D.observe(f), () => D.disconnect();
  }, []);
  let s = e.z, p = Ee(e.lat, e.lng, s), k = p.x - m.w / 2, z = p.y - m.h / 2, M = 2 ** s, v = [];
  if (m.w) {
    let f = Math.floor(k / jt), T = Math.floor((k + m.w) / jt), D = Math.max(0, Math.floor(z / jt)), X = Math.min(M - 1, Math.floor((z + m.h) / jt));
    for (let Y = f; Y <= T; Y++)
      for (let _ = D; _ <= X; _++) {
        let S = (Y % M + M) % M;
        v.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${s}/${S}/${_}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => N((W) => W.ok ? W : { ...W, ok: 1 }),
              onError: () => N((W) => W.bad ? W : { ...W, bad: 1 }),
              style: { left: Math.round(Y * jt - k), top: Math.round(_ * jt - z) }
            },
            `${s}/${Y}/${_}`
          )
        );
      }
  }
  let I = (f) => {
    if (!f.target.closest("[data-pin],.jt-zoom,.jt-attr") && (g.current.setPointerCapture(f.pointerId), c.current.set(f.pointerId, { x: f.clientX, y: f.clientY }), c.current.size === 1 && (E.current = { moved: !1, startDist: 0 }), c.current.size === 2)) {
      let [T, D] = [...c.current.values()];
      E.current.startDist = Math.hypot(T.x - D.x, T.y - D.y), E.current.moved = !0;
    }
  }, j = (f) => {
    let T = c.current.get(f.pointerId);
    if (!T) return;
    let D = f.clientX - T.x, X = f.clientY - T.y;
    if (c.current.size === 1) {
      if (!E.current.moved && Math.hypot(D, X) < 4) return;
      E.current.moved = !0, c.current.set(f.pointerId, { x: f.clientX, y: f.clientY }), n((Y) => {
        let _ = Ee(Y.lat, Y.lng, Y.z), S = zn(_.x - D, _.y - X, Y.z);
        return { ...Y, lat: Math.max(-80, Math.min(80, S.lat)), lng: S.lng };
      });
    } else
      c.current.set(f.pointerId, { x: f.clientX, y: f.clientY });
  }, A = (f) => {
    let T = c.current.get(f.pointerId);
    if (!T) return;
    let D = c.current.size === 1;
    if (c.current.delete(f.pointerId), E.current.startDist && c.current.size === 1) {
      let [X] = [...c.current.values()], Y = Math.hypot(T.x - X.x, T.y - X.y) / E.current.startDist;
      Y > 1.35 ? n((_) => ({ ..._, z: Gt(_.z + (Y > 2.6 ? 2 : 1)) })) : Y < 0.7 && n((_) => ({ ..._, z: Gt(_.z - (Y < 0.38 ? 2 : 1)) })), E.current.startDist = 0;
    }
    if (D && !E.current.moved && f.type === "pointerup") {
      let X = g.current.getBoundingClientRect(), Y = zn(k + (f.clientX - X.left), z + (f.clientY - X.top), s);
      y(Y.lat, Y.lng);
    }
  }, l = (f) => {
    let T = Date.now();
    T - b.current < 250 || (b.current = T, n((D) => ({ ...D, z: Gt(D.z + (f.deltaY < 0 ? 1 : -1)) })));
  }, R = (f, T) => {
    let D = Ee(f, T, s);
    return { left: D.x - k, top: D.y - z };
  }, u = (f) => f.left > -40 && f.left < m.w + 40 && f.top > -50 && f.top < m.h + 40;
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-map",
      ref: g,
      onPointerDown: I,
      onPointerMove: j,
      onPointerUp: A,
      onPointerCancel: A,
      onWheel: l,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        v,
        C.bad > 0 && C.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        m.w > 0 && o.map((f) => {
          let T = R(f.lat, f.lng);
          return u(T) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (f.id === r ? " sel" : ""),
              style: { left: T.left, top: T.top, "--pc": f.color },
              onClick: () => x(f.id),
              "aria-label": f.label,
              children: /* @__PURE__ */ t("i", {})
            },
            f.id
          ) : null;
        }),
        m.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: R(i.lat, i.lng).left, top: R(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ a("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((f) => ({ ...f, z: Gt(f.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((f) => ({ ...f, z: Gt(f.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Dn = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Po = "https://tiles.openfreemap.org/styles/liberty", Vt = null;
function $o() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Vt || (Vt = new Promise((e, n) => {
    let o = document.createElement("link");
    o.rel = "stylesheet", o.href = Dn + "maplibre-gl.css", document.head.appendChild(o);
    let i = document.createElement("script");
    i.src = Dn + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : n(new Error("maplibre")), i.onerror = () => {
      Vt = null, n(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), Vt);
}
var Ro = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function To(e) {
  (e.getStyle().layers || []).forEach((n) => {
    let o = n.layout && n.layout["text-field"];
    if (n.type === "symbol" && o && JSON.stringify(o).includes("name"))
      try {
        e.setLayoutProperty(n.id, "text-field", Ro);
      } catch {
      }
  });
}
var _o = (e) => String(e).replace(/[&<>"]/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[n]), Re = (e, n, o) => {
  let i = n ? 34 : 28, r = n ? 44 : 36, y = o ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${_o(o)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${r}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${y}</svg>`;
};
function Gn(e) {
  let { view: n, setView: o, pins: i, temp: r, selectedId: y, onTap: x, onPinTap: g } = e, m = H(null), h = H(null), c = H(null), E = H([]), b = H(null), C = H({});
  C.current = { onTap: x, onPinTap: g, setView: o };
  let [N, s] = w("loading");
  return O(() => {
    let p = !0;
    return $o().then((k) => {
      if (!p || !m.current) return;
      c.current = k;
      let z = new k.Map({
        container: m.current,
        style: Po,
        center: [n.lng, n.lat],
        zoom: n.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      z.touchZoomRotate.disableRotation(), z.addControl(new k.NavigationControl({ showCompass: !1 }), "top-right"), z.on("load", () => {
        To(z), p && s("ok");
      }), z.on("click", (M) => {
        M.originalEvent && M.originalEvent.target.closest && M.originalEvent.target.closest(".jt-mlpin") || C.current.onTap(M.lngLat.lat, M.lngLat.lng);
      }), z.on("moveend", () => {
        let M = z.getCenter();
        C.current.setView({ lat: M.lat, lng: M.lng, z: z.getZoom() + 1 });
      }), h.current = z, setTimeout(() => p && !z.loaded() && s((M) => M === "loading" ? "slow" : M), 6e3), setTimeout(() => {
        p && h.current === z && !z.loaded() && (z.remove(), h.current = null, s("fail"));
      }, 15e3);
    }).catch(() => p && s("fail")), () => {
      p = !1, h.current && h.current.remove(), h.current = null;
    };
  }, []), O(() => {
    let p = h.current;
    if (!p) return;
    let k = p.getCenter();
    (Math.abs(k.lat - n.lat) > 1e-6 || Math.abs(k.lng - n.lng) > 1e-6 || Math.abs(p.getZoom() + 1 - n.z) > 0.01) && p.flyTo({ center: [n.lng, n.lat], zoom: n.z - 1, duration: 600 });
  }, [n.lat, n.lng, n.z]), O(() => {
    let p = h.current, k = c.current;
    !p || !k || (E.current.forEach((z) => z.remove()), E.current = i.map((z) => {
      let M = document.createElement("button");
      return M.type = "button", M.className = "jt-mlpin" + (z.id === y ? " sel" : ""), M.setAttribute("aria-label", z.label), M.innerHTML = Re(z.color, z.id === y, z.text), M.addEventListener("click", (v) => {
        v.stopPropagation(), C.current.onPinTap(z.id);
      }), new k.Marker({ element: M, anchor: "bottom" }).setLngLat([z.lng, z.lat]).addTo(p);
    }));
  }, [i, y, N]), O(() => {
    let p = h.current, k = c.current;
    if (b.current && b.current.remove(), b.current = null, !p || !k || !r) return;
    let z = document.createElement("div");
    z.className = "jt-mlpin temp", z.innerHTML = Re("#14213D", !0), b.current = new k.Marker({ element: z, anchor: "bottom" }).setLngLat([r.lng, r.lat]).addTo(p);
  }, [r, N]), N === "fail" ? /* @__PURE__ */ t(Do, { ...e }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: m, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (N === "loading" || N === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: N === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Zt = null, Qt = "", Ot = !1, Te = /* @__PURE__ */ new Set();
function He(e) {
  return Ot ? Promise.reject(new Error("auth")) : Zt && Qt === e ? Zt : Qt && Qt !== e ? Promise.reject(new Error("reload")) : (Qt = e, Zt = new Promise((n, o) => {
    window.__jtGmReady = () => n(window.google.maps), window.gm_authFailure = () => {
      Ot = !0, Te.forEach((r) => r()), o(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      Zt = null, Qt = "", o(new Error("load"));
    }, document.head.appendChild(i);
  }), Zt);
}
function Bo(e) {
  let { view: n, setView: o, pins: i, temp: r, selectedId: y, onTap: x, onPinTap: g, onPoi: m, gkey: h } = e, c = H(null), E = H(null), b = H(null), C = H([]), N = H(null), s = H({});
  s.current = { onTap: x, onPinTap: g, onPoi: m, setView: o };
  let [p, k] = w(Ot ? "fail" : "loading");
  O(() => {
    let M = !0, v = () => M && k("fail");
    return Te.add(v), He(h).then(async (I) => {
      let { Map: j } = await I.importLibrary("maps"), { Marker: A } = await I.importLibrary("marker"), { Size: l, Point: R } = await I.importLibrary("core");
      if (!M || !c.current) return;
      b.current = { Marker: A, Size: l, Point: R };
      let u = new j(c.current, {
        center: { lat: n.lat, lng: n.lng },
        zoom: Math.round(n.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      u.addListener("click", async (f) => {
        if (f.placeId) {
          f.stop();
          try {
            let { Place: T } = await I.importLibrary("places"), D = new T({ id: f.placeId });
            await D.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), s.current.onPoi({
              name: D.displayName || "",
              lat: D.location.lat(),
              lng: D.location.lng(),
              area: D.formattedAddress || "",
              link: D.googleMapsURI || "",
              placeId: f.placeId
            });
            return;
          } catch {
          }
        }
        s.current.onTap(f.latLng.lat(), f.latLng.lng());
      }), u.addListener("idle", () => {
        let f = u.getCenter();
        s.current.setView({ lat: f.lat(), lng: f.lng(), z: u.getZoom() });
      }), E.current = u, k("ok");
    }).catch(() => M && k("fail")), () => {
      M = !1, Te.delete(v);
    };
  }, [h]), O(() => {
    let M = E.current;
    if (!M) return;
    let v = M.getCenter();
    (Math.abs(v.lat() - n.lat) > 1e-6 || Math.abs(v.lng() - n.lng) > 1e-6) && M.panTo({ lat: n.lat, lng: n.lng }), Math.round(n.z) !== M.getZoom() && M.setZoom(Math.round(n.z));
  }, [n.lat, n.lng, n.z]);
  let z = (M, v, I) => {
    let j = b.current, A = v ? 34 : 28, l = v ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(Re(M, v, I).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new j.Size(A, l),
      anchor: new j.Point(A / 2, l)
    };
  };
  return O(() => {
    let M = E.current, v = b.current;
    !M || !v || (C.current.forEach((I) => I.setMap(null)), C.current = i.map((I) => {
      let j = new v.Marker({ position: { lat: I.lat, lng: I.lng }, map: M, title: I.label, icon: z(I.color, I.id === y, I.text), zIndex: I.id === y ? 10 : 1 });
      return j.addListener("click", () => s.current.onPinTap(I.id)), j;
    }));
  }, [i, y, p]), O(() => {
    let M = E.current, v = b.current;
    N.current && N.current.setMap(null), N.current = null, !(!M || !v || !r) && (N.current = new v.Marker({ position: { lat: r.lat, lng: r.lng }, map: M, icon: z("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [r, p]), p === "fail" ? /* @__PURE__ */ t(Gn, { ...e }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: c, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    p === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Vn(e) {
  return e.gkey && !Ot ? /* @__PURE__ */ t(Bo, { ...e }) : /* @__PURE__ */ t(Gn, { ...e });
}
var Pn = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Lo = [500, 1e3, 2e3], Me = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function ue(e, n) {
  let o = (x) => x * Math.PI / 180, i = o(n.lat - e.lat), r = o(n.lng - e.lng), y = Math.sin(i / 2) ** 2 + Math.cos(o(e.lat)) * Math.cos(o(n.lat)) * Math.sin(r / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(y));
}
var Zn = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function Oo(e, n, o, i) {
  let r = await He(e), { Place: y, SearchNearbyRankPreference: x } = await r.importLibrary("places"), { places: g } = await y.searchNearby({
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
    includedTypes: o.g,
    maxResultCount: 15,
    rankPreference: x.POPULARITY,
    language: "ko"
  }), m = [];
  for (let h of g || []) {
    let c;
    try {
      c = h.regularOpeningHours ? await h.isOpen() : void 0;
    } catch {
      c = void 0;
    }
    m.push({
      id: h.id,
      placeId: h.id,
      name: h.displayName,
      lat: h.location.lat(),
      lng: h.location.lng(),
      type: h.primaryTypeDisplayName || o.label,
      rating: h.rating,
      count: h.userRatingCount,
      addr: h.formattedAddress || "",
      url: h.googleMapsURI || "",
      open: c
    });
  }
  return m;
}
async function Ko(e, n, o) {
  let i = `[out:json][timeout:20];nwr(around:${o},${e.lat},${e.lng})${n.osm}["name"];out center 40;`, r = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!r.ok) throw new Error("osm");
  return ((await r.json()).elements || []).map((x) => {
    let g = x.tags || {}, m = g["name:ko"] || g["name:en"] || "";
    return {
      id: "osm" + x.type + x.id,
      name: m || g.name,
      sub: m && g.name && g.name !== m ? g.name : "",
      lat: x.lat != null ? x.lat : x.center && x.center.lat,
      lng: x.lon != null ? x.lon : x.center && x.center.lon,
      type: n.label,
      addr: ""
    };
  }).filter((x) => x.lat && x.name);
}
async function Qn(e, n, o) {
  let i = o || { lat: mt.lat, lng: mt.lng };
  if (n && !Ot)
    try {
      let x = await He(n), { Place: g } = await x.importLibrary("places"), { places: m } = await g.searchText({
        textQuery: e,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      if (m && m.length)
        return m.map((h) => ({
          name: h.displayName,
          area: h.formattedAddress || "",
          lat: h.location.lat(),
          lng: h.location.lng(),
          link: h.googleMapsURI || "",
          placeId: h.id
        }));
    } catch {
    }
  let r = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(e)
  );
  if (!r.ok) throw new Error("search");
  return (await r.json()).map((x) => {
    let g = String(x.display_name || "").split(",").map((m) => m.trim());
    return { name: x.name || g[0] || e, area: g.slice(1, 3).join(" "), lat: Number(x.lat), lng: Number(x.lon), link: "" };
  });
}
function Uo({ settings: e, wish: n, onSave: o }) {
  let [i, r] = w(Pn[0]), [y, x] = w(1e3), [g, m] = w(null), [h, c] = w(""), [E, b] = w([]), [C, N] = w(!1), [s, p] = w(""), [k, z] = w(""), [M, v] = w({}), I = () => {
    m({ lat: mt.lat, lng: mt.lng, here: !1, at: Date.now() }), c("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, j = () => {
    if (c("현재 위치를 찾는 중"), !navigator.geolocation) return I();
    navigator.geolocation.getCurrentPosition(
      (l) => {
        m({ lat: l.coords.latitude, lng: l.coords.longitude, here: !0, at: Date.now() }), c("");
      },
      I,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  O(() => {
    j();
  }, []), O(() => {
    if (!g) return;
    let l = !0;
    return (async () => {
      N(!0), p("");
      let R = null, u = "";
      if (e.gmapsKey && !Ot)
        try {
          R = await Oo(e.gmapsKey, { lat: g.lat, lng: g.lng }, i, y), u = "google";
        } catch {
          R = null;
        }
      if (!R)
        try {
          R = await Ko(g, i, y), u = "osm";
        } catch {
          l && (b([]), p("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), N(!1));
          return;
        }
      R.forEach((f) => f.dist = ue(g, f)), u === "osm" && R.sort((f, T) => f.dist - T.dist), l && (b(R.slice(0, 20)), z(u), N(!1), R.length || p(`반경 ${Me(y)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
    })(), () => {
      l = !1;
    };
  }, [g, i, y, e.gmapsKey]);
  let A = (l) => M[l.id] || n.some((R) => l.placeId && R.placeId === l.placeId || R.name === l.name && dt(R) && Math.abs(R.lat - l.lat) < 5e-4);
  return /* @__PURE__ */ a("section", { children: [
    /* @__PURE__ */ a("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ t(co, { size: 15 }),
        g ? g.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
