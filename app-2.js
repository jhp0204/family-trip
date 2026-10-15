] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Oa.map((A) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (u === A ? " on" : ""), onClick: () => M(A), children: A }, A)) })
    ] }),
    /* @__PURE__ */ e(nt, { label: "날짜", children: /* @__PURE__ */ e("select", { value: N, onChange: (A) => y(Number(A.target.value)), children: Array.from({ length: m }, (A, r) => {
      let L = mt(g, r);
      return /* @__PURE__ */ o("option", { value: r, children: [
        r + 1,
        "일차 ",
        Vt(L),
        " (",
        Rt(L),
        ")"
      ] }, r);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !P,
        onClick: () => l({ title: v.trim(), amount: k, payer: j, cat: u, day: N, split: d }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ e(jt, { onConfirm: x, label: "이 경비 삭제" })
  ] });
}
function Ro({ initial: t, onSave: a, onDelete: n }) {
  let [i, l] = w(t?.text || ""), [x, b] = w(t?.urls || []), [m, g] = w(""), [h, v] = w(() => (t?.photos || []).map((d) => ({ id: d }))), [z, p] = w(!1), [C, j] = w(""), c = q(null), u = () => {
    if (!m.trim()) return;
    let d = ka(m);
    if (!d) {
      j("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    x.includes(d) || b([...x, d]), g(""), j("");
  }, M = async (d) => {
    let S = Array.from(d || []).filter((P) => P.type.startsWith("image/"));
    if (!S.length) return;
    let k = Wt - h.length;
    if (k <= 0) {
      j(`사진은 글 하나에 ${Wt}장까지 올릴 수 있어요.`);
      return;
    }
    p(!0), j("사진 준비 중");
    let E = [], s = 0;
    for (let P of S.slice(0, k))
      try {
        E.push({ id: pt(), data: await ko(P) });
      } catch {
        s++;
      }
    v((P) => [...P, ...E]), p(!1), s ? j(`${s}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : S.length > k ? j(`${Wt}장까지만 넣었어요.`) : j(""), c.current && (c.current.value = "");
  }, N = async () => {
    let d = x;
    if (m.trim()) {
      let k = ka(m);
      if (!k) {
        j("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      d.includes(k) || (d = [...d, k]);
    }
    p(!0), j(h.some((k) => k.data) ? "사진 올리는 중" : ""), await a({ text: i.trim(), urls: d, photos: h }) || (p(!1), j("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, y = !z && (i.trim() || x.length || m.trim() || h.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: i,
        onChange: (d) => l(d.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    h.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: h.map((d) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(zo, { id: d.id, data: d.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => v(h.filter((S) => S.id !== d.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(te, { size: 14 })
        }
      )
    ] }, d.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: c,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (d) => M(d.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => c.current && c.current.click(),
        disabled: z || h.length >= Wt,
        children: [
          /* @__PURE__ */ e(Un, { size: 17 }),
          "사진 추가 (",
          h.length,
          "/",
          Wt,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      x.map((d) => /* @__PURE__ */ e(Mo, { url: d, onRemove: () => b(x.filter((S) => S !== d)) }, d)),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: m,
            onChange: (d) => g(d.target.value),
            onKeyDown: (d) => d.key === "Enter" && u(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: u, children: "추가" })
      ] })
    ] }),
    C && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: C }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !y, onClick: N, children: z ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(jt, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
var lt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Ga = 16;
function $e(t) {
  return t === 0 ? { Icon: ao, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: no, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: ya, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: oo, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: io, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: ro, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: so, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: lo, label: "뇌우", tone: "#7B5FC4" } : { Icon: ya, label: "흐림", tone: "#66718A" };
}
var Ft = (t) => t == null ? "–" : Math.round(t) + "°", Sa = /* @__PURE__ */ new Map();
async function Ia(t) {
  let a = Sa.get(t);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(t);
  if (!n.ok) throw new Error("weather " + n.status);
  let i = await n.json();
  return Sa.set(t, { at: Date.now(), d: i }), i;
}
var Fa = (t, a) => {
  let n = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + a}-${n}`;
};
function $o(t, a) {
  let [n, i] = w({ status: "loading" });
  return W(() => {
    let l = !0, x = async () => {
      try {
        let m = `latitude=${lt.lat}&longitude=${lt.lng}&timezone=Asia%2FTokyo`, g = await Ia(
          `https://api.open-meteo.com/v1/forecast?${m}&forecast_days=${Ga}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), h = {};
        g.daily.time.forEach((c, u) => {
          h[c] = {
            code: g.daily.weather_code[u],
            max: g.daily.temperature_2m_max[u],
            min: g.daily.temperature_2m_min[u],
            pop: g.daily.precipitation_probability_max[u],
            sum: g.daily.precipitation_sum[u]
          };
        });
        let v = {};
        g.hourly.time.forEach((c, u) => {
          v[c.slice(0, 13)] = {
            t: g.hourly.temperature_2m[u],
            pop: g.hourly.precipitation_probability[u],
            code: g.hourly.weather_code[u]
          };
        });
        let z = dt(/* @__PURE__ */ new Date()), C = Array.from({ length: a }, (c, u) => dt(mt(t, u))).filter((c) => !h[c] && c > z), j = {};
        if (C.length) {
          let c = await Promise.all(
            [1, 2, 3].map(
              (M) => Ia(
                `https://archive-api.open-meteo.com/v1/archive?${m}&start_date=${Fa(C[0], -M)}&end_date=${Fa(C[C.length - 1], -M)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), u = {};
          c.filter(Boolean).forEach(
            (M) => M.daily.time.forEach((N, y) => {
              let d = M.daily.temperature_2m_max[y];
              if (d == null) return;
              let S = N.slice(5), k = u[S] || (u[S] = { max: 0, min: 0, wet: 0, n: 0 });
              k.max += d, k.min += M.daily.temperature_2m_min[y], k.wet += (M.daily.precipitation_sum[y] || 0) >= 1 ? 1 : 0, k.n++;
            })
          ), C.forEach((M) => {
            let N = u[M.slice(5) === "02-29" ? "02-28" : M.slice(5)];
            N && N.n && (j[M] = { max: N.max / N.n, min: N.min / N.n, wet: N.wet, n: N.n });
          });
        }
        l && i({ status: "ok", daily: h, hourly: v, climate: j, at: /* @__PURE__ */ new Date() });
      } catch {
        l && i((g) => g.status === "ok" ? g : { status: "error" });
      }
    };
    x();
    let b = setInterval(x, 30 * 6e4);
    return () => {
      l = !1, clearInterval(b);
    };
  }, [t, a]), n;
}
function _o({ date: t, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      lt.name,
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
  let i = a.daily[t];
  if (i) {
    let { Icon: x, label: b, tone: m } = $e(i.code), g = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, h = ["09", "12", "15", "18", "21"].map((v) => ({ h: v, v: a.hourly[`${t}T${v}`] })).filter((v) => v.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(x, { size: 40, color: m, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: b }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: Ft(i.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: Ft(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(po, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      g && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      h.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: h.map(({ h: v, v: z }) => {
        let p = $e(z.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            v,
            "시"
          ] }),
          /* @__PURE__ */ e(p.Icon, { size: 18, color: p.tone, "aria-label": p.label }),
          /* @__PURE__ */ e("b", { children: Ft(z.t) }),
          /* @__PURE__ */ e("em", { children: z.pop == null ? "" : z.pop + "%" })
        ] }, v);
      }) })
    ] });
  }
  let l = a.climate[t];
  return l ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Ga,
      "일 전부터 나와요. 최근 ",
      l.n,
      "년 같은 날 ",
      lt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: Ft(l.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: Ft(l.min) }),
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
function Lo({ v: t }) {
  if (!t) return null;
  let { Icon: a, label: n, tone: i } = $e(t.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ e(a, { size: 14, color: i, "aria-hidden": "true" }),
    Ft(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var ce = 56;
function Bo({ items: t, isToday: a, onEdit: n, members: i, onAddAt: l }) {
  let [x, b] = w(null), [m, g] = w(() => {
    let d = /* @__PURE__ */ new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  W(() => {
    if (!a) return;
    let d = setInterval(() => {
      let S = /* @__PURE__ */ new Date();
      g(S.getHours() * 60 + S.getMinutes());
    }, 6e4);
    return () => clearInterval(d);
  }, [a]);
  let h = t.filter((d) => d.time).map((d) => ({ ...d, ...Qt(d) })).sort((d, S) => d.s - S.s || d.e - S.e), v = [], z = [], p = -1;
  h.forEach((d) => {
    z.length && d.s >= p && (v.push(z), z = [], p = -1), z.push(d), p = Math.max(p, d.e);
  }), z.length && v.push(z);
  let C = [];
  v.forEach((d) => {
    let S = [];
    d.forEach((k) => {
      let E = S.findIndex((s) => s <= k.s);
      E === -1 ? (E = S.length, S.push(k.e)) : S[E] = k.e, C.push({ ...k, col: E, cl: d });
    }), d.ncol = S.length;
  });
  let j = h.length ? Math.min(8, Math.floor(h[0].s / 60)) : 8, c = h.length ? Math.max(21, Math.ceil(Math.max(...h.map((d) => d.e)) / 60)) : 21, u = (d) => {
    let S = d.currentTarget.getBoundingClientRect(), k = j * 60 + (d.clientY - S.top) / ce * 60;
    return Math.max(j * 60, Math.min(Math.floor(k / 30) * 30, c * 60 - 30, 23 * 60 + 30));
  }, M = Array.from({ length: c - j + 1 }, (d, S) => j + S), N = (d) => (d - j * 60) / 60 * ce, y = t.length - h.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (c - j) * ce + 14 }, children: [
      M.map((d) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: N(d * 60) }, children: /* @__PURE__ */ o("span", { children: [
        ot(d % 24),
        ":00"
      ] }) }, d)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (d) => {
            d.target.closest(".jt-tt-block") || !l || l(It(u(d)));
          },
          onPointerMove: (d) => {
            if (d.pointerType !== "mouse" || d.target.closest(".jt-tt-block")) return b(null);
            b(u(d));
          },
          onPointerLeave: () => b(null),
          children: [
            x != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: N(x) + 1, height: ce / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              It(x),
              " 일정 추가"
            ] }),
            C.map((d) => {
              let S = d.cl.ncol, k = Math.max(24, N(d.e) - N(d.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (k < 44 ? " short" : "") + (S > 1 ? " clash" : ""),
                  style: {
                    top: N(d.s) + 1,
                    height: k,
                    left: `calc(${d.col / S * 100}% + 2px)`,
                    width: `calc(${100 / S}% - 4px)`
                  },
                  onClick: () => n(d),
                  "aria-label": `${d.time} ${d.title} 고치기`,
                  children: [
                    /* @__PURE__ */ e("strong", { children: d.title }),
                    /* @__PURE__ */ o("span", { children: [
                      It(d.s),
                      "~",
                      It(d.e % (24 * 60)),
                      d.place ? `, ${d.place}` : ""
                    ] })
                  ]
                },
                d.id
              );
            })
          ]
        }
      ),
      a && m >= j * 60 && m <= c * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: N(m) }, "aria-label": `지금 ${It(m)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      y > 0 ? ` 시간을 정하지 않은 일정 ${y}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function To({ settings: t, schedule: a, day: n, setDay: i, onEdit: l, onAddAt: x, me: b, onComment: m, onDelComment: g, onReact: h }) {
  let [v, z, p] = Ha(), [C, j] = w(null), { start: c, days: u, members: M } = t, N = V[n % V.length], y = a.filter((s) => s.day === n).sort((s, P) => (s.time || "99:99").localeCompare(P.time || "99:99")), d = xo(y), S = dt(mt(c, n)), k = S === dt(/* @__PURE__ */ new Date()), E = $o(c, u);
  return /* @__PURE__ */ o("section", { style: { "--lc": N }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: u }, (s, P) => {
      let A = mt(c, P), r = P === n;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": r,
          className: "jt-day" + (r ? " active" : ""),
          style: { "--lc": V[P % V.length] },
          onClick: () => i(P),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: P + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: Vt(A) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: Rt(A) })
          ]
        },
        P
      );
    }) }),
    /* @__PURE__ */ e(_o, { date: S, w: E }),
    y.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ e(Ya, { ids: y.map((s) => s.id), open: v, setAll: p }),
      /* @__PURE__ */ e("ol", { className: "jt-line", children: y.map((s, P) => {
        let A = s.time ? Qt(s) : null, r = y[P + 1], L = r && me(r);
        return /* @__PURE__ */ o("li", { className: "jt-row", children: [
          /* @__PURE__ */ e("div", { className: "jt-time", children: s.time || "미정" }),
          /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
          /* @__PURE__ */ o("div", { className: "jt-card" + (v[s.id] ? " open" : ""), children: [
            /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => z(s.id), "aria-expanded": !!v[s.id], children: [
              /* @__PURE__ */ e("span", { className: "jt-card-title", children: s.title }),
              /* @__PURE__ */ e(Xt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            v[s.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
              s.time && E.status === "ok" && /* @__PURE__ */ e("div", { className: "jt-fold-wx", children: /* @__PURE__ */ e(Lo, { v: E.hourly[`${S}T${s.time.slice(0, 2)}`] }) }),
              A && s.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                s.time,
                "~",
                s.end,
                ", ",
                Ua(A.e - A.s)
              ] }),
              d.has(s.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              s.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(Nt, { size: 13 }),
                s.place
              ] }),
              s.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: s.memo }),
              (s.place || s.link || xt(s)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: $t(s),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (B) => B.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Et, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              L && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-next",
                  href: jo(s, r),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (B) => B.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Ct, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ e("b", { children: r.title }),
                      "까지 길 찾기",
                      me(s) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(st, { name: s.by, members: M, size: 16 }),
                  s.by
                ] }),
                /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => l(s), children: [
                  /* @__PURE__ */ e(Te, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ e(He, { item: s, me: b, onReact: (B) => h(s.id, B) }),
                /* @__PURE__ */ e(
                  Ja,
                  {
                    count: (s.comments || []).length,
                    open: C === s.id,
                    onClick: () => j(C === s.id ? null : s.id)
                  }
                )
              ] }),
              C === s.id && /* @__PURE__ */ e(
                Ye,
                {
                  comments: s.comments || [],
                  me: b,
                  members: M,
                  onAdd: (B) => m(s.id, B),
                  onDelete: (B) => g(s.id, B)
                }
              )
            ] })
          ] })
        ] }, s.id);
      }) })
    ] }),
    /* @__PURE__ */ e(Bo, { items: y, isToday: k, onEdit: l, members: M, onAddAt: (s) => x && x(n, s) })
  ] });
}
function Oo({ view: t, setView: a, pins: n, temp: i, selectedId: l, onTap: x, onPinTap: b }) {
  let m = q(null), [g, h] = w({ w: 0, h: 0 }), v = q(/* @__PURE__ */ new Map()), z = q({ moved: !1, startDist: 0 }), p = q(0), [C, j] = w({ ok: 0, bad: 0 });
  W(() => {
    let r = m.current;
    if (!r) return;
    let L = () => h({ w: r.clientWidth, h: r.clientHeight });
    L();
    let B = new ResizeObserver(L);
    return B.observe(r), () => B.disconnect();
  }, []);
  let c = t.z, u = Ae(t.lat, t.lng, c), M = u.x - g.w / 2, N = u.y - g.h / 2, y = 2 ** c, d = [];
  if (g.w) {
    let r = Math.floor(M / bt), L = Math.floor((M + g.w) / bt), B = Math.max(0, Math.floor(N / bt)), Y = Math.min(y - 1, Math.floor((N + g.h) / bt));
    for (let K = r; K <= L; K++)
      for (let $ = B; $ <= Y; $++) {
        let F = (K % y + y) % y;
        d.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${c}/${F}/${$}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => j((J) => J.ok ? J : { ...J, ok: 1 }),
              onError: () => j((J) => J.bad ? J : { ...J, bad: 1 }),
              style: { left: Math.round(K * bt - M), top: Math.round($ * bt - N) }
            },
            `${c}/${K}/${$}`
          )
        );
      }
  }
  let S = (r) => {
    if (!r.target.closest("[data-pin],.jt-zoom,.jt-attr") && (m.current.setPointerCapture(r.pointerId), v.current.set(r.pointerId, { x: r.clientX, y: r.clientY }), v.current.size === 1 && (z.current = { moved: !1, startDist: 0 }), v.current.size === 2)) {
      let [L, B] = [...v.current.values()];
      z.current.startDist = Math.hypot(L.x - B.x, L.y - B.y), z.current.moved = !0;
    }
  }, k = (r) => {
    let L = v.current.get(r.pointerId);
    if (!L) return;
    let B = r.clientX - L.x, Y = r.clientY - L.y;
    if (v.current.size === 1) {
      if (!z.current.moved && Math.hypot(B, Y) < 4) return;
      z.current.moved = !0, v.current.set(r.pointerId, { x: r.clientX, y: r.clientY }), a((K) => {
        let $ = Ae(K.lat, K.lng, K.z), F = Ca($.x - B, $.y - Y, K.z);
        return { ...K, lat: Math.max(-80, Math.min(80, F.lat)), lng: F.lng };
      });
    } else
      v.current.set(r.pointerId, { x: r.clientX, y: r.clientY });
  }, E = (r) => {
    let L = v.current.get(r.pointerId);
    if (!L) return;
    let B = v.current.size === 1;
    if (v.current.delete(r.pointerId), z.current.startDist && v.current.size === 1) {
      let [Y] = [...v.current.values()], K = Math.hypot(L.x - Y.x, L.y - Y.y) / z.current.startDist;
      K > 1.35 ? a(($) => ({ ...$, z: Ht($.z + (K > 2.6 ? 2 : 1)) })) : K < 0.7 && a(($) => ({ ...$, z: Ht($.z - (K < 0.38 ? 2 : 1)) })), z.current.startDist = 0;
    }
    if (B && !z.current.moved && r.type === "pointerup") {
      let Y = m.current.getBoundingClientRect(), K = Ca(M + (r.clientX - Y.left), N + (r.clientY - Y.top), c);
      x(K.lat, K.lng);
    }
  }, s = (r) => {
    let L = Date.now();
    L - p.current < 250 || (p.current = L, a((B) => ({ ...B, z: Ht(B.z + (r.deltaY < 0 ? 1 : -1)) })));
  }, P = (r, L) => {
    let B = Ae(r, L, c);
    return { left: B.x - M, top: B.y - N };
  }, A = (r) => r.left > -40 && r.left < g.w + 40 && r.top > -50 && r.top < g.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: m,
      onPointerDown: S,
      onPointerMove: k,
      onPointerUp: E,
      onPointerCancel: E,
      onWheel: s,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        d,
        C.bad > 0 && C.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        g.w > 0 && n.map((r) => {
          let L = P(r.lat, r.lng);
          return A(L) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (r.id === l ? " sel" : ""),
              style: { left: L.left, top: L.top, "--pc": r.color },
              onClick: () => b(r.id),
              "aria-label": r.label,
              children: /* @__PURE__ */ e("i", {})
            },
            r.id
          ) : null;
        }),
        g.w > 0 && i && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: P(i.lat, i.lng).left, top: P(i.lat, i.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((r) => ({ ...r, z: Ht(r.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((r) => ({ ...r, z: Ht(r.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Da = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Uo = "https://tiles.openfreemap.org/styles/liberty", Yt = null;
function Ko() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Yt || (Yt = new Promise((t, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = Da + "maplibre-gl.css", document.head.appendChild(n);
    let i = document.createElement("script");
    i.src = Da + "maplibre-gl.js", i.onload = () => window.maplibregl ? t(window.maplibregl) : a(new Error("maplibre")), i.onerror = () => {
      Yt = null, a(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), Yt);
}
var Wo = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Ho(t) {
  (t.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        t.setLayoutProperty(a.id, "text-field", Wo);
      } catch {
      }
  });
}
var Yo = (t) => String(t).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), _e = (t, a, n) => {
  let i = a ? 34 : 28, l = a ? 44 : 36, x = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${t}" font-family="sans-serif">${Yo(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${l}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/>${x}</svg>`;
};
function Xa(t) {
  let { view: a, setView: n, pins: i, temp: l, selectedId: x, onTap: b, onPinTap: m } = t, g = q(null), h = q(null), v = q(null), z = q([]), p = q(null), C = q({});
  C.current = { onTap: b, onPinTap: m, setView: n };
  let [j, c] = w("loading");
  return W(() => {
    let u = !0;
    return Ko().then((M) => {
      if (!u || !g.current) return;
      v.current = M;
      let N = new M.Map({
        container: g.current,
        style: Uo,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      N.touchZoomRotate.disableRotation(), N.addControl(new M.NavigationControl({ showCompass: !1 }), "top-right"), N.on("load", () => {
        Ho(N), u && c("ok");
      }), N.on("click", (y) => {
        y.originalEvent && y.originalEvent.target.closest && y.originalEvent.target.closest(".jt-mlpin") || C.current.onTap(y.lngLat.lat, y.lngLat.lng);
      }), N.on("moveend", () => {
        let y = N.getCenter();
        C.current.setView({ lat: y.lat, lng: y.lng, z: N.getZoom() + 1 });
      }), h.current = N, setTimeout(() => u && !N.loaded() && c((y) => y === "loading" ? "slow" : y), 6e3), setTimeout(() => {
        u && h.current === N && !N.loaded() && (N.remove(), h.current = null, c("fail"));
      }, 15e3);
    }).catch(() => u && c("fail")), () => {
      u = !1, h.current && h.current.remove(), h.current = null;
    };
  }, []), W(() => {
    let u = h.current;
    if (!u) return;
    let M = u.getCenter();
    (Math.abs(M.lat - a.lat) > 1e-6 || Math.abs(M.lng - a.lng) > 1e-6 || Math.abs(u.getZoom() + 1 - a.z) > 0.01) && u.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), W(() => {
    let u = h.current, M = v.current;
    !u || !M || (z.current.forEach((N) => N.remove()), z.current = i.map((N) => {
      let y = document.createElement("button");
      return y.type = "button", y.className = "jt-mlpin" + (N.id === x ? " sel" : ""), y.setAttribute("aria-label", N.label), y.innerHTML = _e(N.color, N.id === x, N.text), y.addEventListener("click", (d) => {
        d.stopPropagation(), C.current.onPinTap(N.id);
      }), new M.Marker({ element: y, anchor: "bottom" }).setLngLat([N.lng, N.lat]).addTo(u);
    }));
  }, [i, x, j]), W(() => {
    let u = h.current, M = v.current;
    if (p.current && p.current.remove(), p.current = null, !u || !M || !l) return;
    let N = document.createElement("div");
    N.className = "jt-mlpin temp", N.innerHTML = _e("#14213D", !0), p.current = new M.Marker({ element: N, anchor: "bottom" }).setLngLat([l.lng, l.lat]).addTo(u);
  }, [l, j]), j === "fail" ? /* @__PURE__ */ e(Oo, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: g, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (j === "loading" || j === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: j === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Jt = null, Dt = "", zt = !1, Le = /* @__PURE__ */ new Set();
function Je(t) {
  return zt ? Promise.reject(new Error("auth")) : Jt && Dt === t ? Jt : Dt && Dt !== t ? Promise.reject(new Error("reload")) : (Dt = t, Jt = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      zt = !0, Le.forEach((l) => l()), n(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      Jt = null, Dt = "", n(new Error("load"));
    }, document.head.appendChild(i);
  }), Jt);
}
var Jo = (t) => !!t && !zt && Dt === t && !!(window.google && window.google.maps);
function qo(t) {
  let { view: a, setView: n, pins: i, temp: l, selectedId: x, onTap: b, onPinTap: m, onPoi: g, gkey: h } = t, v = q(null), z = q(null), p = q(null), C = q([]), j = q(null), c = q({});
  c.current = { onTap: b, onPinTap: m, onPoi: g, setView: n };
  let [u, M] = w(zt ? "fail" : "loading");
  W(() => {
    let y = !0, d = () => y && M("fail");
    return Le.add(d), Je(h).then(async (S) => {
      let { Map: k } = await S.importLibrary("maps"), { Marker: E } = await S.importLibrary("marker"), { Size: s, Point: P } = await S.importLibrary("core");
      if (!y || !v.current) return;
      p.current = { Marker: E, Size: s, Point: P };
      let A = new k(v.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      A.addListener("click", async (r) => {
        if (r.placeId) {
          r.stop();
          try {
            let { Place: L } = await S.importLibrary("places"), B = new L({ id: r.placeId });
            await B.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), c.current.onPoi({
              name: B.displayName || "",
              lat: B.location.lat(),
              lng: B.location.lng(),
              area: B.formattedAddress || "",
              link: B.googleMapsURI || "",
              placeId: r.placeId
            });
            return;
          } catch {
          }
        }
        c.current.onTap(r.latLng.lat(), r.latLng.lng());
      }), A.addListener("idle", () => {
        let r = A.getCenter();
        c.current.setView({ lat: r.lat(), lng: r.lng(), z: A.getZoom() });
      }), z.current = A, M("ok");
    }).catch(() => y && M("fail")), () => {
      y = !1, Le.delete(d);
    };
  }, [h]), W(() => {
    let y = z.current;
    if (!y) return;
    let d = y.getCenter();
    (Math.abs(d.lat() - a.lat) > 1e-6 || Math.abs(d.lng() - a.lng) > 1e-6) && y.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== y.getZoom() && y.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let N = (y, d, S) => {
    let k = p.current, E = d ? 34 : 28, s = d ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(_e(y, d, S).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new k.Size(E, s),
      anchor: new k.Point(E / 2, s)
    };
  };
  return W(() => {
    let y = z.current, d = p.current;
    !y || !d || (C.current.forEach((S) => S.setMap(null)), C.current = i.map((S) => {
      let k = new d.Marker({ position: { lat: S.lat, lng: S.lng }, map: y, title: S.label, icon: N(S.color, S.id === x, S.text), zIndex: S.id === x ? 10 : 1 });
      return k.addListener("click", () => c.current.onPinTap(S.id)), k;
    }));
  }, [i, x, u]), W(() => {
    let y = z.current, d = p.current;
    j.current && j.current.setMap(null), j.current = null, !(!y || !d || !l) && (j.current = new d.Marker({ position: { lat: l.lat, lng: l.lng }, map: y, icon: N("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [l, u]), u === "fail" ? /* @__PURE__ */ e(Xa, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: v, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    u === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Va(t) {
  return t.gkey && !zt ? /* @__PURE__ */ e(qo, { ...t }) : /* @__PURE__ */ e(Xa, { ...t });
}
var Pa = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Go = [500, 1e3, 2e3], Ie = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function ge(t, a) {
  let n = (b) => b * Math.PI / 180, i = n(a.lat - t.lat), l = n(a.lng - t.lng), x = Math.sin(i / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(l / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(x));
}
var Za = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Xo(t, a, n, i) {
  let l = await Je(t), { Place: x, SearchNearbyRankPreference: b } = await l.importLibrary("places"), { places: m } = await x.searchNearby({
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
    rankPreference: b.POPULARITY,
    language: "ko"
  }), g = [];
  for (let h of m || []) {
    let v;
    try {
      v = h.regularOpeningHours ? await h.isOpen() : void 0;
    } catch {
      v = void 0;
    }
    g.push({
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
  return g;
}
async function Vo(t, a, n) {
  let i = `[out:json][timeout:20];nwr(around:${n},${t.lat},${t.lng})${a.osm}["name"];out center 40;`, l = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!l.ok) throw new Error("osm");
  return ((await l.json()).elements || []).map((b) => {
    let m = b.tags || {}, g = m["name:ko"] || m["name:en"] || "";
    return {
      id: "osm" + b.type + b.id,
      name: g || m.name,
      sub: g && m.name && m.name !== g ? m.name : "",
      lat: b.lat != null ? b.lat : b.center && b.center.lat,
      lng: b.lon != null ? b.lon : b.center && b.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((b) => b.lat && b.name);
}
async function Zo(t, a, n) {
  let i = n || { lat: lt.lat, lng: lt.lng };
  if (a && !zt)
    try {
      let b = await Je(a), { Place: m } = await b.importLibrary("places"), { places: g } = await m.searchText({
        textQuery: t,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      if (g && g.length)
        return g.map((h) => ({
          name: h.displayName,
          area: h.formattedAddress || "",
          lat: h.location.lat(),
          lng: h.location.lng(),
          link: h.googleMapsURI || "",
          placeId: h.id
        }));
    } catch {
    }
  let l = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(t)
  );
  if (!l.ok) throw new Error("search");
  return (await l.json()).map((b) => {
    let m = String(b.display_name || "").split(",").map((g) => g.trim());
