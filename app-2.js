return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(ot, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: b, onChange: (u) => z(u.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(ot, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: x, onChange: (u) => A(u.target.value), placeholder: "0" }) }),
    k > 0 ? /* @__PURE__ */ a("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ t("b", { children: ne(k, j) }),
      /* @__PURE__ */ t("br", {}),
      fe(e)
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint", children: fe(e) }),
    M.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      M.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: g.map((u) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (v === u ? " on" : ""), onClick: () => E(u), children: u }, u)) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: g.map((u) => /* @__PURE__ */ a("button", { type: "button", className: "jt-chip" + (l.includes(u) ? " on" : ""), onClick: () => p(u), children: [
        l.includes(u) && /* @__PURE__ */ t(Yn, { size: 14 }),
        u
      ] }, u)) }),
      k > 0 && l.length > 0 && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
        "1인당 ",
        q(k / l.length)
      ] }),
      l.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Xn.map((u) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (N === u ? " on" : ""), onClick: () => y(u), children: u }, u)) })
    ] }),
    /* @__PURE__ */ t(ot, { label: "날짜", children: /* @__PURE__ */ t("select", { value: C, onChange: (u) => r(Number(u.target.value)), children: Array.from({ length: f }, (u, c) => {
      let D = mt(d, c);
      return /* @__PURE__ */ a("option", { value: c, children: [
        c + 1,
        "일차 ",
        Lt(D),
        " (",
        St(D),
        ")"
      ] }, c);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !$,
        onClick: () => s({ title: b.trim(), amount: k, payer: v, cat: N, day: C, split: l }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(Ft, { onConfirm: h, label: "이 경비 삭제" })
  ] });
}
var ft = { name: "오사카", lat: 34.6937, lng: 135.5023 }, aa = 16;
function Oe(e) {
  return e === 0 ? { Icon: co, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: po, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: Fn, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: mo, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: uo, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: fo, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: go, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: bo, label: "뇌우", tone: "#7B5FC4" } : { Icon: Fn, label: "흐림", tone: "#66718A" };
}
var _t = (e) => e == null ? "–" : Math.round(e) + "°", _n = /* @__PURE__ */ new Map();
async function Bn(e) {
  let n = _n.get(e);
  if (n && Date.now() - n.at < 30 * 6e4) return n.d;
  let o = await fetch(e);
  if (!o.ok) throw new Error("weather " + o.status);
  let i = await o.json();
  return _n.set(e, { at: Date.now(), d: i }), i;
}
var Ln = (e, n) => {
  let o = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + n}-${o}`;
};
function _o(e, n) {
  let [o, i] = w({ status: "loading" });
  return K(() => {
    let s = !0, h = async () => {
      try {
        let f = `latitude=${ft.lat}&longitude=${ft.lng}&timezone=Asia%2FTokyo`, d = st(/* @__PURE__ */ new Date()), j = st(mt(d, aa - 1)), b = Array.from({ length: n }, (y, C) => st(mt(e, C))), z = b.filter((y) => y >= d && y <= j), x = {}, A = {};
        if (z.length) {
          let y = await Bn(
            `https://api.open-meteo.com/v1/forecast?${f}&start_date=${z[0]}&end_date=${z[z.length - 1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
          );
          y.daily.time.forEach((C, r) => {
            x[C] = {
              code: y.daily.weather_code[r],
              max: y.daily.temperature_2m_max[r],
              min: y.daily.temperature_2m_min[r],
              pop: y.daily.precipitation_probability_max[r],
              sum: y.daily.precipitation_sum[r]
            };
          }), y.hourly.time.forEach((C, r) => {
            A[C.slice(0, 13)] = {
              t: y.hourly.temperature_2m[r],
              pop: y.hourly.precipitation_probability[r],
              code: y.hourly.weather_code[r]
            };
          });
        }
        let v = b.filter((y) => !x[y] && y > d), E = {};
        if (v.length) {
          let y = await Promise.all(
            [1, 2, 3].map(
              (r) => Bn(
                `https://archive-api.open-meteo.com/v1/archive?${f}&start_date=${Ln(v[0], -r)}&end_date=${Ln(v[v.length - 1], -r)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), C = {};
          y.filter(Boolean).forEach(
            (r) => r.daily.time.forEach((l, S) => {
              let k = r.daily.temperature_2m_max[S];
              if (k == null) return;
              let M = l.slice(5), p = C[M] || (C[M] = { max: 0, min: 0, wet: 0, n: 0 });
              p.max += k, p.min += r.daily.temperature_2m_min[S], p.wet += (r.daily.precipitation_sum[S] || 0) >= 1 ? 1 : 0, p.n++;
            })
          ), v.forEach((r) => {
            let l = C[r.slice(5) === "02-29" ? "02-28" : r.slice(5)];
            l && l.n && (E[r] = { max: l.max / l.n, min: l.min / l.n, wet: l.wet, n: l.n });
          });
        }
        let N = /* @__PURE__ */ new Date();
        s && i({ status: "ok", daily: x, hourly: A, climate: E, at: N, stale: !1 });
        try {
          window.storage.set("wx", JSON.stringify({ daily: x, hourly: A, climate: E, at: N.getTime() }), !1);
        } catch {
        }
      } catch {
        s && i((d) => d.status === "ok" ? { ...d, stale: !0 } : { status: "error" });
      }
    };
    (async () => {
      try {
        let f = await window.storage.get("wx", !1), d = f && f.value ? JSON.parse(f.value) : null;
        s && d && d.daily && i(
          (j) => j.status === "ok" && !j.stale ? j : { status: "ok", daily: d.daily, hourly: d.hourly || {}, climate: d.climate || {}, at: new Date(d.at), stale: !0 }
        );
      } catch {
      }
    })(), h();
    let g = setInterval(h, 30 * 6e4);
    return () => {
      s = !1, clearInterval(g);
    };
  }, [e, n]), o;
}
function Bo({ date: e, w: n }) {
  let o = /* @__PURE__ */ a("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ a("span", { children: [
      ft.name,
      " 날씨"
    ] }),
    n.status === "ok" && (n.daily[e] || n.climate[e]) && /* @__PURE__ */ t("em", { className: n.stale ? "jt-wx-stale" : "", children: n.stale ? `${Lt(n.at)} ${et(n.at.getHours())}:${et(n.at.getMinutes())} 기준, 마지막으로 받은 날씨` : `${et(n.at.getHours())}:${et(n.at.getMinutes())} 업데이트` })
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
    let { Icon: h, label: g, tone: f } = Oe(i.code), d = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, j = ["09", "12", "15", "18", "21"].map((b) => ({ h: b, v: n.hourly[`${e}T${b}`] })).filter((b) => b.v);
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ a("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(h, { size: 40, color: f, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ a("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: g }),
          /* @__PURE__ */ a("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: _t(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: _t(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(xo, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      d && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      j.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: j.map(({ h: b, v: z }) => {
        let x = Oe(z.code);
        return /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ a("span", { children: [
            b,
            "시"
          ] }),
          /* @__PURE__ */ t(x.Icon, { size: 18, color: x.tone, "aria-label": x.label }),
          /* @__PURE__ */ t("b", { children: _t(z.t) }),
          /* @__PURE__ */ t("em", { children: z.pop == null ? "" : z.pop + "%" })
        ] }, b);
      }) })
    ] });
  }
  let s = n.climate[e];
  return s ? /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ a("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      aa,
      "일 전부터 나와요. 최근 ",
      s.n,
      "년 같은 날 ",
      ft.name,
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
  ] }) : /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function Lo({ v: e }) {
  if (!e) return null;
  let { Icon: n, label: o, tone: i } = Oe(e.code);
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
var de = 56;
function Oo({ items: e, isToday: n, onEdit: o, members: i, onAddAt: s }) {
  let [h, g] = w(null), [f, d] = w(() => {
    let l = /* @__PURE__ */ new Date();
    return l.getHours() * 60 + l.getMinutes();
  });
  K(() => {
    if (!n) return;
    let l = setInterval(() => {
      let S = /* @__PURE__ */ new Date();
      d(S.getHours() * 60 + S.getMinutes());
    }, 6e4);
    return () => clearInterval(l);
  }, [n]);
  let j = e.filter((l) => l.time).map((l) => ({ ...l, ...ae(l) })).sort((l, S) => l.s - S.s || l.e - S.e), b = [], z = [], x = -1;
  j.forEach((l) => {
    z.length && l.s >= x && (b.push(z), z = [], x = -1), z.push(l), x = Math.max(x, l.e);
  }), z.length && b.push(z);
  let A = [];
  b.forEach((l) => {
    let S = [];
    l.forEach((k) => {
      let M = S.findIndex((p) => p <= k.s);
      M === -1 ? (M = S.length, S.push(k.e)) : S[M] = k.e, A.push({ ...k, col: M, cl: l });
    }), l.ncol = S.length;
  });
  let v = j.length ? Math.min(8, Math.floor(j[0].s / 60)) : 8, E = j.length ? Math.max(21, Math.ceil(Math.max(...j.map((l) => l.e)) / 60)) : 21, N = (l) => {
    let S = l.currentTarget.getBoundingClientRect(), k = v * 60 + (l.clientY - S.top) / de * 60;
    return Math.max(v * 60, Math.min(Math.floor(k / 30) * 30, E * 60 - 30, 23 * 60 + 30));
  }, y = Array.from({ length: E - v + 1 }, (l, S) => v + S), C = (l) => (l - v * 60) / 60 * de, r = e.length - j.length;
  return /* @__PURE__ */ a("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ a("div", { className: "jt-tt", style: { height: (E - v) * de + 14 }, children: [
      y.map((l) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: C(l * 60) }, children: /* @__PURE__ */ a("span", { children: [
        et(l % 24),
        ":00"
      ] }) }, l)),
      /* @__PURE__ */ a(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (l) => {
            l.target.closest(".jt-tt-block") || !s || s(Tt(N(l)));
          },
          onPointerMove: (l) => {
            if (l.pointerType !== "mouse" || l.target.closest(".jt-tt-block")) return g(null);
            g(N(l));
          },
          onPointerLeave: () => g(null),
          children: [
            h != null && /* @__PURE__ */ a("div", { className: "jt-tt-ghost", style: { top: C(h) + 1, height: de / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Tt(h),
              " 일정 추가"
            ] }),
            A.map((l) => {
              let S = l.cl.ncol, k = Math.max(24, C(l.e) - C(l.s) - 3);
              return /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (k < 44 ? " short" : "") + (S > 1 ? " clash" : ""),
                  style: {
                    top: C(l.s) + 1,
                    height: k,
                    left: `calc(${l.col / S * 100}% + 2px)`,
                    width: `calc(${100 / S}% - 4px)`
                  },
                  onClick: () => o(l),
                  "aria-label": `${l.time} ${l.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: l.title }),
                    /* @__PURE__ */ a("span", { children: [
                      Tt(l.s),
                      "~",
                      Tt(l.e % (24 * 60)),
                      l.place ? `, ${l.place}` : ""
                    ] })
                  ]
                },
                l.id
              );
            })
          ]
        }
      ),
      n && f >= v * 60 && f <= E * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: C(f) }, "aria-label": `지금 ${Tt(f)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ a("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      r > 0 ? ` 시간을 정하지 않은 일정 ${r}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function Ko({ settings: e, schedule: n, day: o, setDay: i, onEdit: s, onAddAt: h, me: g, onComment: f, onDelComment: d, onReact: j }) {
  let [b, z, x] = Qn(), [A, v] = w(null), { start: E, days: N, members: y } = e, C = G[o % G.length], r = n.filter((p) => p.day === o).sort((p, $) => (p.time || "99:99").localeCompare($.time || "99:99")), l = No(r), S = st(mt(E, o)), k = S === st(/* @__PURE__ */ new Date()), M = _o(E, N);
  return /* @__PURE__ */ a("section", { style: { "--lc": C }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: N }, (p, $) => {
      let u = mt(E, $), c = $ === o, D = n.filter((V) => V.day === $).length, R = st(u) === st(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ a(
        "button",
        {
          role: "tab",
          "aria-selected": c,
          "aria-label": `DAY ${$ + 1}, ${u.getMonth() + 1}월 ${u.getDate()}일 ${St(u)}요일, 일정 ${D}개`,
          className: "jt-day" + (c ? " active" : ""),
          style: { "--lc": G[$ % G.length] },
          onClick: () => i($),
          children: [
            /* @__PURE__ */ a("span", { className: "jt-day-no", children: [
              "DAY ",
              $ + 1
            ] }),
            R && /* @__PURE__ */ t("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ a("span", { className: "jt-day-date", children: [
              Lt(u),
              " ",
              /* @__PURE__ */ t("em", { children: St(u) })
            ] }),
            /* @__PURE__ */ t("span", { className: "jt-day-count", children: D ? `일정 ${D}개` : "일정 없음" })
          ]
        },
        $
      );
    }) }),
    /* @__PURE__ */ t(Bo, { date: S, w: M }),
    r.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ a(dt, { children: [
      /* @__PURE__ */ t(ta, { ids: r.map((p) => p.id), open: b, setAll: x }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: r.map((p, $) => {
        let u = p.time ? ae(p) : null, c = r[$ + 1], D = c && ue(c);
        return /* @__PURE__ */ a("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: p.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ a("div", { className: "jt-card" + (b[p.id] ? " open" : ""), children: [
            /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => z(p.id), "aria-expanded": !!b[p.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: p.title }),
              /* @__PURE__ */ t(At, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            b[p.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
              p.time && M.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(Lo, { v: M.hourly[`${S}T${p.time.slice(0, 2)}`] }) }),
              u && p.end && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                p.time,
                "~",
                p.end,
                ", ",
                qn(u.e - u.s)
              ] }),
              l.has(p.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              p.place && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(Et, { size: 13 }),
                p.place
              ] }),
              p.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: p.memo }),
              (p.place || p.link || ut(p)) && /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ a("a", { className: "jt-maplink", href: Mt(p), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ t(Kt, { size: 14 }),
                  "구글맵"
                ] }),
                (p.place || ut(p)) && /* @__PURE__ */ a(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: xe(ut(p) ? p : { name: p.place, placeId: p.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ t(vt, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              D && /* @__PURE__ */ a(
                "a",
                {
                  className: "jt-next",
                  href: Co(p, c),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (R) => R.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(vt, { size: 14 }),
                    /* @__PURE__ */ a("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: c.title }),
                      "까지 길 찾기",
                      ue(p) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ a("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ a("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(rt, { name: p.by, members: y, size: 16 }),
                  p.by
                ] }),
                /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(p), children: [
                  /* @__PURE__ */ t(be, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Xe, { item: p, me: g, members: y, onReact: (R) => j(p.id, R) }),
                /* @__PURE__ */ t(
                  ea,
                  {
                    count: (p.comments || []).length,
                    open: A === p.id,
                    onClick: () => v(A === p.id ? null : p.id)
                  }
                )
              ] }),
              A === p.id && /* @__PURE__ */ t(
                qe,
                {
                  comments: p.comments || [],
                  me: g,
                  members: y,
                  onAdd: (R) => f(p.id, R),
                  onDelete: (R) => d(p.id, R)
                }
              )
            ] })
          ] })
        ] }, p.id);
      }) })
    ] }),
    /* @__PURE__ */ t(Oo, { items: r, isToday: k, onEdit: s, members: y, onAddAt: (p) => h && h(o, p) })
  ] });
}
function Uo({ view: e, setView: n, pins: o, temp: i, selectedId: s, onTap: h, onPinTap: g }) {
  let f = Y(null), [d, j] = w({ w: 0, h: 0 }), b = Y(/* @__PURE__ */ new Map()), z = Y({ moved: !1, startDist: 0 }), x = Y(0), [A, v] = w({ ok: 0, bad: 0 });
  K(() => {
    let c = f.current;
    if (!c) return;
    let D = () => j({ w: c.clientWidth, h: c.clientHeight });
    D();
    let R = new ResizeObserver(D);
    return R.observe(c), () => R.disconnect();
  }, []);
  let E = e.z, N = De(e.lat, e.lng, E), y = N.x - d.w / 2, C = N.y - d.h / 2, r = 2 ** E, l = [];
  if (d.w) {
    let c = Math.floor(y / jt), D = Math.floor((y + d.w) / jt), R = Math.max(0, Math.floor(C / jt)), V = Math.min(r - 1, Math.floor((C + d.h) / jt));
    for (let J = c; J <= D; J++)
      for (let _ = R; _ <= V; _++) {
        let F = (J % r + r) % r;
        l.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${E}/${F}/${_}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => v((W) => W.ok ? W : { ...W, ok: 1 }),
              onError: () => v((W) => W.bad ? W : { ...W, bad: 1 }),
              style: { left: Math.round(J * jt - y), top: Math.round(_ * jt - C) }
            },
            `${E}/${J}/${_}`
          )
        );
      }
  }
  let S = (c) => {
    if (!c.target.closest("[data-pin],.jt-zoom,.jt-attr") && (f.current.setPointerCapture(c.pointerId), b.current.set(c.pointerId, { x: c.clientX, y: c.clientY }), b.current.size === 1 && (z.current = { moved: !1, startDist: 0 }), b.current.size === 2)) {
      let [D, R] = [...b.current.values()];
      z.current.startDist = Math.hypot(D.x - R.x, D.y - R.y), z.current.moved = !0;
    }
  }, k = (c) => {
    let D = b.current.get(c.pointerId);
    if (!D) return;
    let R = c.clientX - D.x, V = c.clientY - D.y;
    if (b.current.size === 1) {
      if (!z.current.moved && Math.hypot(R, V) < 4) return;
      z.current.moved = !0, b.current.set(c.pointerId, { x: c.clientX, y: c.clientY }), n((J) => {
        let _ = De(J.lat, J.lng, J.z), F = Pn(_.x - R, _.y - V, J.z);
        return { ...J, lat: Math.max(-80, Math.min(80, F.lat)), lng: F.lng };
      });
    } else
      b.current.set(c.pointerId, { x: c.clientX, y: c.clientY });
  }, M = (c) => {
    let D = b.current.get(c.pointerId);
    if (!D) return;
    let R = b.current.size === 1;
    if (b.current.delete(c.pointerId), z.current.startDist && b.current.size === 1) {
      let [V] = [...b.current.values()], J = Math.hypot(D.x - V.x, D.y - V.y) / z.current.startDist;
      J > 1.35 ? n((_) => ({ ..._, z: qt(_.z + (J > 2.6 ? 2 : 1)) })) : J < 0.7 && n((_) => ({ ..._, z: qt(_.z - (J < 0.38 ? 2 : 1)) })), z.current.startDist = 0;
    }
    if (R && !z.current.moved && c.type === "pointerup") {
      let V = f.current.getBoundingClientRect(), J = Pn(y + (c.clientX - V.left), C + (c.clientY - V.top), E);
      h(J.lat, J.lng);
    }
  }, p = (c) => {
    let D = Date.now();
    D - x.current < 250 || (x.current = D, n((R) => ({ ...R, z: qt(R.z + (c.deltaY < 0 ? 1 : -1)) })));
  }, $ = (c, D) => {
    let R = De(c, D, E);
    return { left: R.x - y, top: R.y - C };
  }, u = (c) => c.left > -40 && c.left < d.w + 40 && c.top > -50 && c.top < d.h + 40;
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-map",
      ref: f,
      onPointerDown: S,
      onPointerMove: k,
      onPointerUp: M,
      onPointerCancel: M,
      onWheel: p,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        l,
        A.bad > 0 && A.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        d.w > 0 && o.map((c) => {
          let D = $(c.lat, c.lng);
          return u(D) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (c.id === s ? " sel" : ""),
              style: { left: D.left, top: D.top, "--pc": c.color },
              onClick: () => g(c.id),
              "aria-label": c.label,
              children: /* @__PURE__ */ t("i", {})
            },
            c.id
          ) : null;
        }),
        d.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: $(i.lat, i.lng).left, top: $(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ a("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((c) => ({ ...c, z: qt(c.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((c) => ({ ...c, z: qt(c.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var On = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Wo = "https://tiles.openfreemap.org/styles/liberty", Gt = null;
function Ho() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Gt || (Gt = new Promise((e, n) => {
    let o = document.createElement("link");
    o.rel = "stylesheet", o.href = On + "maplibre-gl.css", document.head.appendChild(o);
    let i = document.createElement("script");
    i.src = On + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : n(new Error("maplibre")), i.onerror = () => {
      Gt = null, n(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), Gt);
}
var Yo = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Jo(e) {
  (e.getStyle().layers || []).forEach((n) => {
    let o = n.layout && n.layout["text-field"];
    if (n.type === "symbol" && o && JSON.stringify(o).includes("name"))
      try {
        e.setLayoutProperty(n.id, "text-field", Yo);
      } catch {
      }
  });
}
var Vo = (e) => String(e).replace(/[&<>"]/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[n]), Ke = (e, n, o) => {
  let i = n ? 34 : 28, s = n ? 44 : 36, h = o ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${Vo(o)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${h}</svg>`;
};
function oa(e) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: h, onTap: g, onPinTap: f } = e, d = Y(null), j = Y(null), b = Y(null), z = Y([]), x = Y(null), A = Y({});
  A.current = { onTap: g, onPinTap: f, setView: o };
  let [v, E] = w("loading");
  return K(() => {
    let N = !0;
    return Ho().then((y) => {
      if (!N || !d.current) return;
      b.current = y;
      let C = new y.Map({
        container: d.current,
        style: Wo,
        center: [n.lng, n.lat],
        zoom: n.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      C.touchZoomRotate.disableRotation(), C.addControl(new y.NavigationControl({ showCompass: !1 }), "top-right"), C.on("load", () => {
        Jo(C), N && E("ok");
      }), C.on("click", (r) => {
        r.originalEvent && r.originalEvent.target.closest && r.originalEvent.target.closest(".jt-mlpin") || A.current.onTap(r.lngLat.lat, r.lngLat.lng);
      }), C.on("moveend", () => {
        let r = C.getCenter();
        A.current.setView({ lat: r.lat, lng: r.lng, z: C.getZoom() + 1 });
      }), j.current = C, setTimeout(() => N && !C.loaded() && E((r) => r === "loading" ? "slow" : r), 6e3), setTimeout(() => {
        N && j.current === C && !C.loaded() && (C.remove(), j.current = null, E("fail"));
      }, 15e3);
    }).catch(() => N && E("fail")), () => {
      N = !1, j.current && j.current.remove(), j.current = null;
    };
  }, []), K(() => {
    let N = j.current;
    if (!N) return;
    let y = N.getCenter();
    (Math.abs(y.lat - n.lat) > 1e-6 || Math.abs(y.lng - n.lng) > 1e-6 || Math.abs(N.getZoom() + 1 - n.z) > 0.01) && N.flyTo({ center: [n.lng, n.lat], zoom: n.z - 1, duration: 600 });
  }, [n.lat, n.lng, n.z]), K(() => {
    let N = j.current, y = b.current;
    !N || !y || (z.current.forEach((C) => C.remove()), z.current = i.map((C) => {
      let r = document.createElement("button");
      return r.type = "button", r.className = "jt-mlpin" + (C.id === h ? " sel" : ""), r.setAttribute("aria-label", C.label), r.innerHTML = Ke(C.color, C.id === h, C.text), r.addEventListener("click", (l) => {
        l.stopPropagation(), A.current.onPinTap(C.id);
      }), new y.Marker({ element: r, anchor: "bottom" }).setLngLat([C.lng, C.lat]).addTo(N);
    }));
  }, [i, h, v]), K(() => {
    let N = j.current, y = b.current;
    if (x.current && x.current.remove(), x.current = null, !N || !y || !s) return;
    let C = document.createElement("div");
    C.className = "jt-mlpin temp", C.innerHTML = Ke("#14213D", !0), x.current = new y.Marker({ element: C, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(N);
  }, [s, v]), v === "fail" ? /* @__PURE__ */ t(Uo, { ...e }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: d, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (v === "loading" || v === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: v === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Zt = null, Qt = "", Ot = !1, Ue = /* @__PURE__ */ new Set();
function Ge(e) {
  return Ot ? Promise.reject(new Error("auth")) : Zt && Qt === e ? Zt : Qt && Qt !== e ? Promise.reject(new Error("reload")) : (Qt = e, Zt = new Promise((n, o) => {
    window.__jtGmReady = () => n(window.google.maps), window.gm_authFailure = () => {
      Ot = !0, Ue.forEach((s) => s()), o(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      Zt = null, Qt = "", o(new Error("load"));
    }, document.head.appendChild(i);
  }), Zt);
}
function Xo(e) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: h, onTap: g, onPinTap: f, onPoi: d, gkey: j } = e, b = Y(null), z = Y(null), x = Y(null), A = Y([]), v = Y(null), E = Y({});
  E.current = { onTap: g, onPinTap: f, onPoi: d, setView: o };
  let [N, y] = w(Ot ? "fail" : "loading");
  K(() => {
    let r = !0, l = () => r && y("fail");
    return Ue.add(l), Ge(j).then(async (S) => {
      let { Map: k } = await S.importLibrary("maps"), { Marker: M } = await S.importLibrary("marker"), { Size: p, Point: $ } = await S.importLibrary("core");
      if (!r || !b.current) return;
      x.current = { Marker: M, Size: p, Point: $ };
      let u = new k(b.current, {
        center: { lat: n.lat, lng: n.lng },
        zoom: Math.round(n.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      u.addListener("click", async (c) => {
        if (c.placeId) {
          c.stop();
          try {
            let { Place: D } = await S.importLibrary("places"), R = new D({ id: c.placeId });
            await R.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), E.current.onPoi({
              name: R.displayName || "",
              lat: R.location.lat(),
              lng: R.location.lng(),
              area: R.formattedAddress || "",
              link: R.googleMapsURI || "",
              placeId: c.placeId
            });
            return;
          } catch {
          }
        }
        E.current.onTap(c.latLng.lat(), c.latLng.lng());
      }), u.addListener("idle", () => {
        let c = u.getCenter();
        E.current.setView({ lat: c.lat(), lng: c.lng(), z: u.getZoom() });
      }), z.current = u, y("ok");
    }).catch(() => r && y("fail")), () => {
      r = !1, Ue.delete(l);
    };
  }, [j]), K(() => {
    let r = z.current;
    if (!r) return;
    let l = r.getCenter();
    (Math.abs(l.lat() - n.lat) > 1e-6 || Math.abs(l.lng() - n.lng) > 1e-6) && r.panTo({ lat: n.lat, lng: n.lng }), Math.round(n.z) !== r.getZoom() && r.setZoom(Math.round(n.z));
  }, [n.lat, n.lng, n.z]);
  let C = (r, l, S) => {
    let k = x.current, M = l ? 34 : 28, p = l ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(Ke(r, l, S).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new k.Size(M, p),
      anchor: new k.Point(M / 2, p)
    };
  };
  return K(() => {
    let r = z.current, l = x.current;
    !r || !l || (A.current.forEach((S) => S.setMap(null)), A.current = i.map((S) => {
      let k = new l.Marker({ position: { lat: S.lat, lng: S.lng }, map: r, title: S.label, icon: C(S.color, S.id === h, S.text), zIndex: S.id === h ? 10 : 1 });
      return k.addListener("click", () => E.current.onPinTap(S.id)), k;
    }));
  }, [i, h, N]), K(() => {
    let r = z.current, l = x.current;
    v.current && v.current.setMap(null), v.current = null, !(!r || !l || !s) && (v.current = new l.Marker({ position: { lat: s.lat, lng: s.lng }, map: r, icon: C("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, N]), N === "fail" ? /* @__PURE__ */ t(oa, { ...e }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: b, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    N === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function ia(e) {
  return e.gkey && !Ot ? /* @__PURE__ */ t(Xo, { ...e }) : /* @__PURE__ */ t(oa, { ...e });
}
var Kn = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], qo = [500, 1e3, 2e3], $e = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function ge(e, n) {
  let o = (g) => g * Math.PI / 180, i = o(n.lat - e.lat), s = o(n.lng - e.lng), h = Math.sin(i / 2) ** 2 + Math.cos(o(e.lat)) * Math.cos(o(n.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(h));
}
var sa = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function Go(e, n, o, i) {
  let s = await Ge(e), { Place: h, SearchNearbyRankPreference: g } = await s.importLibrary("places"), { places: f } = await h.searchNearby({
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
    rankPreference: g.POPULARITY,
    language: "ko"
  }), d = [];
  for (let j of f || []) {
    let b;
    try {
      b = j.regularOpeningHours ? await j.isOpen() : void 0;
    } catch {
      b = void 0;
    }
    d.push({
      id: j.id,
      placeId: j.id,
      name: j.displayName,
      lat: j.location.lat(),
      lng: j.location.lng(),
      type: j.primaryTypeDisplayName || o.label,
      rating: j.rating,
      count: j.userRatingCount,
      addr: j.formattedAddress || "",
      url: j.googleMapsURI || "",
      open: b
    });
  }
  return d;
}
async function Zo(e, n, o) {
  let i = `[out:json][timeout:20];nwr(around:${o},${e.lat},${e.lng})${n.osm}["name"];out center 40;`, s = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!s.ok) throw new Error("osm");
  return ((await s.json()).elements || []).map((g) => {
    let f = g.tags || {}, d = f["name:ko"] || f["name:en"] || "";
    return {
      id: "osm" + g.type + g.id,
      name: d || f.name,
      sub: d && f.name && f.name !== d ? f.name : "",
      lat: g.lat != null ? g.lat : g.center && g.center.lat,
      lng: g.lon != null ? g.lon : g.center && g.center.lon,
      type: n.label,
      addr: ""
    };
  }).filter((g) => g.lat && g.name);
}
async function ra(e, n, o) {
  let i = o || { lat: ft.lat, lng: ft.lng };
  if (n && !Ot)
    try {
      let g = await Ge(n), { Place: f } = await g.importLibrary("places"), { places: d } = await f.searchText({
        textQuery: e,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      if (d && d.length)
        return d.map((j) => ({
          name: j.displayName,
          area: j.formattedAddress || "",
          lat: j.location.lat(),
          lng: j.location.lng(),
          link: j.googleMapsURI || "",
          placeId: j.id
        }));
    } catch {
    }
  let s = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(e)
  );
  if (!s.ok) throw new Error("search");
  return (await s.json()).map((g) => {
    let f = String(g.display_name || "").split(",").map((d) => d.trim());
    return { name: g.name || f[0] || e, area: f.slice(1, 3).join(" "), lat: Number(g.lat), lng: Number(g.lon), link: "" };
  });
}
function Qo({ settings: e, wish: n, onSave: o }) {
  let [i, s] = w(Kn[0]), [h, g] = w(1e3), [f, d] = w(null), [j, b] = w(""), [z, x] = w([]), [A, v] = w(!1), [E, N] = w(""), [y, C] = w(""), [r, l] = w({}), S = () => {
    d({ lat: ft.lat, lng: ft.lng, here: !1, at: Date.now() }), b("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, k = () => {
    if (b("현재 위치를 찾는 중"), !navigator.geolocation) return S();
    navigator.geolocation.getCurrentPosition(
      (p) => {
        d({ lat: p.coords.latitude, lng: p.coords.longitude, here: !0, at: Date.now() }), b("");
      },
      S,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  K(() => {
    k();
  }, []), K(() => {
    if (!f) return;
    let p = !0;
    return (async () => {
      v(!0), N("");
      let $ = null, u = "";
      if (e.gmapsKey && !Ot)
        try {
          $ = await Go(e.gmapsKey, { lat: f.lat, lng: f.lng }, i, h), u = "google";
        } catch {
          $ = null;
        }
      if (!$)
        try {
          $ = await Zo(f, i, h), u = "osm";
        } catch {
          p && (x([]), N("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), v(!1));
          return;
        }
      $.forEach((c) => c.dist = ge(f, c)), u === "osm" && $.sort((c, D) => c.dist - D.dist), p && (x($.slice(0, 20)), C(u), v(!1), $.length || N(`반경 ${$e(h)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
