);
          N.daily.time.forEach((A, w) => {
            c[A] = {
              code: N.daily.weather_code[w],
              max: N.daily.temperature_2m_max[w],
              min: N.daily.temperature_2m_min[w],
              pop: N.daily.precipitation_probability_max[w],
              sum: N.daily.precipitation_sum[w]
            };
          }), N.hourly.time.forEach((A, w) => {
            F[A.slice(0, 13)] = {
              t: N.hourly.temperature_2m[w],
              pop: N.hourly.precipitation_probability[w],
              code: N.hourly.weather_code[w]
            };
          });
        }
        let f = k.filter((N) => !c[N] && N > r), S = {};
        if (f.length) {
          let N = await Promise.all(
            [1, 2, 3].map(
              (w) => ra(
                `https://archive-api.open-meteo.com/v1/archive?${l}&start_date=${la(f[0], -w)}&end_date=${la(f[f.length - 1], -w)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), A = {};
          N.filter(Boolean).forEach(
            (w) => w.daily.time.forEach((x, M) => {
              let z = w.daily.temperature_2m_max[M];
              if (z == null) return;
              let C = x.slice(5), p = A[C] || (A[C] = { max: 0, min: 0, wet: 0, n: 0 });
              p.max += z, p.min += w.daily.temperature_2m_min[M], p.wet += (w.daily.precipitation_sum[M] || 0) >= 1 ? 1 : 0, p.n++;
            })
          ), f.forEach((w) => {
            let x = A[w.slice(5) === "02-29" ? "02-28" : w.slice(5)];
            x && x.n && (S[w] = { max: x.max / x.n, min: x.min / x.n, wet: x.wet, n: x.n });
          });
        }
        let v = /* @__PURE__ */ new Date();
        s && i({ status: "ok", daily: c, hourly: F, climate: S, at: v, stale: !1 });
        try {
          window.storage.set("wx", JSON.stringify({ daily: c, hourly: F, climate: S, at: v.getTime() }), !1);
        } catch {
        }
      } catch {
        s && i((r) => r.status === "ok" ? { ...r, stale: !0 } : { status: "error" });
      }
    };
    (async () => {
      try {
        let l = await window.storage.get("wx", !1), r = l && l.value ? JSON.parse(l.value) : null;
        s && r && r.daily && i(
          (h) => h.status === "ok" && !h.stale ? h : { status: "ok", daily: r.daily, hourly: r.hourly || {}, climate: r.climate || {}, at: new Date(r.at), stale: !0 }
        );
      } catch {
      }
    })(), d();
    let m = setInterval(d, 30 * 6e4);
    return () => {
      s = !1, clearInterval(m);
    };
  }, [t, n]), o;
}
function Ii({ date: t, w: n }) {
  let o = /* @__PURE__ */ a("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ a("span", { children: [
      xt.name,
      " 날씨"
    ] }),
    n.status === "ok" && (n.daily[t] || n.climate[t]) && /* @__PURE__ */ e("em", { className: n.stale ? "jt-wx-stale" : "", children: n.stale ? `${Rt(n.at)} ${it(n.at.getHours())}:${it(n.at.getMinutes())} 기준, 마지막으로 받은 날씨` : `${it(n.at.getHours())}:${it(n.at.getMinutes())} 업데이트` })
  ] });
  if (n.status === "loading")
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (n.status === "error")
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let i = n.daily[t];
  if (i) {
    let { Icon: d, label: m, tone: l } = sn(i.code), r = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, h = ["09", "12", "15", "18", "21"].map((k) => ({ h: k, v: n.hourly[`${t}T${k}`] })).filter((k) => k.v);
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ a("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(d, { size: 40, color: l, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ a("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: m }),
          /* @__PURE__ */ a("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: Wt(i.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: Wt(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(Vo, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      r && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      h.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: h.map(({ h: k, v: E }) => {
        let c = sn(E.code);
        return /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ a("span", { children: [
            k,
            "시"
          ] }),
          /* @__PURE__ */ e(c.Icon, { size: 18, color: c.tone, "aria-label": c.label }),
          /* @__PURE__ */ e("b", { children: Wt(E.t) }),
          /* @__PURE__ */ e("em", { children: E.pop == null ? "" : E.pop + "%" })
        ] }, k);
      }) })
    ] });
  }
  let s = n.climate[t];
  return s ? /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ a("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Sa,
      "일 전부터 나와요. 최근 ",
      s.n,
      "년 같은 날 ",
      xt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: Wt(s.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: Wt(s.min) }),
      "였고, ",
      s.n,
      "번 중 ",
      s.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function Fi({ v: t }) {
  if (!t) return null;
  let { Icon: n, label: o, tone: i } = sn(t.code);
  return /* @__PURE__ */ a("span", { className: "jt-wxchip", title: o, children: [
    /* @__PURE__ */ e(n, { size: 14, color: i, "aria-hidden": "true" }),
    Wt(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ a("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var ke = 56;
function Di({ items: t, isToday: n, onEdit: o, members: i, onAddAt: s }) {
  let [d, m] = y(null), [l, r] = y(() => {
    let x = /* @__PURE__ */ new Date();
    return x.getHours() * 60 + x.getMinutes();
  });
  H(() => {
    if (!n) return;
    let x = setInterval(() => {
      let M = /* @__PURE__ */ new Date();
      r(M.getHours() * 60 + M.getMinutes());
    }, 6e4);
    return () => clearInterval(x);
  }, [n]);
  let h = t.filter((x) => x.time).map((x) => ({ ...x, ...ue(x) })).sort((x, M) => x.s - M.s || x.e - M.e), k = [], E = [], c = -1;
  h.forEach((x) => {
    E.length && x.s >= c && (k.push(E), E = [], c = -1), E.push(x), c = Math.max(c, x.e);
  }), E.length && k.push(E);
  let F = [];
  k.forEach((x) => {
    let M = [];
    x.forEach((z) => {
      let C = M.findIndex((p) => p <= z.s);
      C === -1 ? (C = M.length, M.push(z.e)) : M[C] = z.e, F.push({ ...z, col: C, cl: x });
    }), x.ncol = M.length;
  });
  let f = h.length ? Math.min(8, Math.floor(h[0].s / 60)) : 8, S = h.length ? Math.max(21, Math.ceil(Math.max(...h.map((x) => x.e)) / 60)) : 21, v = (x) => {
    let M = x.currentTarget.getBoundingClientRect(), z = f * 60 + (x.clientY - M.top) / ke * 60;
    return Math.max(f * 60, Math.min(Math.floor(z / 30) * 30, S * 60 - 30, 23 * 60 + 30));
  }, N = Array.from({ length: S - f + 1 }, (x, M) => f + M), A = (x) => (x - f * 60) / 60 * ke, w = t.length - h.length;
  return /* @__PURE__ */ a("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ a("div", { className: "jt-tt", style: { height: (S - f) * ke + 14 }, children: [
      N.map((x) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: A(x * 60) }, children: /* @__PURE__ */ a("span", { children: [
        it(x % 24),
        ":00"
      ] }) }, x)),
      /* @__PURE__ */ a(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (x) => {
            x.target.closest(".jt-tt-block") || !s || s(Kt(v(x)));
          },
          onPointerMove: (x) => {
            if (x.pointerType !== "mouse" || x.target.closest(".jt-tt-block")) return m(null);
            m(v(x));
          },
          onPointerLeave: () => m(null),
          children: [
            d != null && /* @__PURE__ */ a("div", { className: "jt-tt-ghost", style: { top: A(d) + 1, height: ke / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Kt(d),
              " 일정 추가"
            ] }),
            F.map((x) => {
              let M = x.cl.ncol, z = Math.max(24, A(x.e) - A(x.s) - 3);
              return /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (z < 44 ? " short" : "") + (M > 1 ? " clash" : ""),
                  style: {
                    top: A(x.s) + 1,
                    height: z,
                    left: `calc(${x.col / M * 100}% + 2px)`,
                    width: `calc(${100 / M}% - 4px)`
                  },
                  onClick: () => o(x),
                  "aria-label": `${x.time} ${x.title} 고치기`,
                  children: [
                    /* @__PURE__ */ e("strong", { children: x.title }),
                    /* @__PURE__ */ a("span", { children: [
                      Kt(x.s),
                      "~",
                      Kt(x.e % (24 * 60)),
                      x.place ? `, ${x.place}` : ""
                    ] })
                  ]
                },
                x.id
              );
            })
          ]
        }
      ),
      n && l >= f * 60 && l <= S * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: A(l) }, "aria-label": `지금 ${Kt(l)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ a("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      w > 0 ? ` 시간을 정하지 않은 일정 ${w}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function Pi({ settings: t, schedule: n, day: o, setDay: i, onEdit: s, onAddAt: d, me: m, onComment: l, onDelComment: r, onReact: h }) {
  let [k, E, c] = za(), [F, f] = y(null), { start: S, days: v, members: N } = t, A = Z[o % Z.length], w = n.filter((p) => p.day === o).sort((p, B) => (p.time || "99:99").localeCompare(B.time || "99:99")), x = ii(w), M = pt(mt(S, o)), z = M === pt(/* @__PURE__ */ new Date()), C = Mi(S, v);
  return /* @__PURE__ */ a("section", { style: { "--lc": A }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: v }, (p, B) => {
      let j = mt(S, B), u = B === o, $ = n.filter((U) => U.day === B).length, I = pt(j) === pt(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ a(
        "button",
        {
          role: "tab",
          "aria-selected": u,
          "aria-label": `DAY ${B + 1}, ${j.getMonth() + 1}월 ${j.getDate()}일 ${St(j)}요일, 일정 ${$}개`,
          className: "jt-day" + (u ? " active" : ""),
          style: { "--lc": Z[B % Z.length] },
          onClick: () => i(B),
          children: [
            /* @__PURE__ */ a("span", { className: "jt-day-no", children: [
              "DAY ",
              B + 1
            ] }),
            I && /* @__PURE__ */ e("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ a("span", { className: "jt-day-date", children: [
              Rt(j),
              " ",
              /* @__PURE__ */ e("em", { children: St(j) })
            ] }),
            /* @__PURE__ */ e("span", { className: "jt-day-count", children: $ ? `일정 ${$}개` : "일정 없음" })
          ]
        },
        B
      );
    }) }),
    /* @__PURE__ */ e(Ii, { date: M, w: C }),
    w.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ e(Ea, { ids: w.map((p) => p.id), open: k, setAll: c }),
      /* @__PURE__ */ e("ol", { className: "jt-line", children: w.map((p, B) => {
        let j = p.time ? ue(p) : null, u = w[B + 1], $ = u && Ee(u);
        return /* @__PURE__ */ a("li", { className: "jt-row", children: [
          /* @__PURE__ */ e("div", { className: "jt-time", children: p.time || "미정" }),
          /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
          /* @__PURE__ */ a("div", { className: "jt-card" + (k[p.id] ? " open" : ""), children: [
            /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => E(p.id), "aria-expanded": !!k[p.id], children: [
              /* @__PURE__ */ e("span", { className: "jt-card-title", children: p.title }),
              /* @__PURE__ */ e(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            k[p.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
              p.time && C.status === "ok" && /* @__PURE__ */ e("div", { className: "jt-fold-wx", children: /* @__PURE__ */ e(Fi, { v: C.hourly[`${M}T${p.time.slice(0, 2)}`] }) }),
              j && p.end && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                p.time,
                "~",
                p.end,
                ", ",
                ka(j.e - j.s)
              ] }),
              x.has(p.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              p.place && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(Et, { size: 13 }),
                p.place
              ] }),
              p.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: p.memo }),
              (p.place || p.link || at(p)) && /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t(p), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ e(Tt, { size: 14 }),
                  "구글맵"
                ] }),
                (p.place || at(p)) && /* @__PURE__ */ a(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: Me(at(p) ? p : { name: p.place, placeId: p.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ e(At, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              $ && /* @__PURE__ */ a(
                "a",
                {
                  className: "jt-next",
                  href: si(p, u),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (I) => I.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(At, { size: 14 }),
                    /* @__PURE__ */ a("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ e("b", { children: u.title }),
                      "까지 길 찾기",
                      Ee(p) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ a("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ a("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(rt, { name: p.by, members: N, size: 16 }),
                  p.by
                ] }),
                /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(p), children: [
                  /* @__PURE__ */ e(qt, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ e(Ie, { item: p, me: m, members: N, onReact: (I) => h(p.id, I) }),
                /* @__PURE__ */ e(
                  gn,
                  {
                    count: (p.comments || []).length,
                    open: F === p.id,
                    onClick: () => f(F === p.id ? null : p.id)
                  }
                )
              ] }),
              F === p.id && /* @__PURE__ */ e(
                Fe,
                {
                  comments: p.comments || [],
                  me: m,
                  members: N,
                  onAdd: (I) => l(p.id, I),
                  onDelete: (I) => r(p.id, I)
                }
              )
            ] })
          ] })
        ] }, p.id);
      }) })
    ] }),
    /* @__PURE__ */ e(Di, { items: w, isToday: z, onEdit: s, members: N, onAddAt: (p) => d && d(o, p) })
  ] });
}
function Ri({ view: t, setView: n, pins: o, temp: i, selectedId: s, onTap: d, onPinTap: m }) {
  let l = G(null), [r, h] = y({ w: 0, h: 0 }), k = G(/* @__PURE__ */ new Map()), E = G({ moved: !1, startDist: 0 }), c = G(0), [F, f] = y({ ok: 0, bad: 0 });
  H(() => {
    let u = l.current;
    if (!u) return;
    let $ = () => h({ w: u.clientWidth, h: u.clientHeight });
    $();
    let I = new ResizeObserver($);
    return I.observe(u), () => I.disconnect();
  }, []);
  let S = t.z, v = Ve(t.lat, t.lng, S), N = v.x - r.w / 2, A = v.y - r.h / 2, w = 2 ** S, x = [];
  if (r.w) {
    let u = Math.floor(N / kt), $ = Math.floor((N + r.w) / kt), I = Math.max(0, Math.floor(A / kt)), U = Math.min(w - 1, Math.floor((A + r.h) / kt));
    for (let T = u; T <= $; T++)
      for (let R = I; R <= U; R++) {
        let g = (T % w + w) % w;
        x.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${S}/${g}/${R}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => f((Y) => Y.ok ? Y : { ...Y, ok: 1 }),
              onError: () => f((Y) => Y.bad ? Y : { ...Y, bad: 1 }),
              style: { left: Math.round(T * kt - N), top: Math.round(R * kt - A) }
            },
            `${S}/${T}/${R}`
          )
        );
      }
  }
  let M = (u) => {
    if (!u.target.closest("[data-pin],.jt-zoom,.jt-attr") && (l.current.setPointerCapture(u.pointerId), k.current.set(u.pointerId, { x: u.clientX, y: u.clientY }), k.current.size === 1 && (E.current = { moved: !1, startDist: 0 }), k.current.size === 2)) {
      let [$, I] = [...k.current.values()];
      E.current.startDist = Math.hypot($.x - I.x, $.y - I.y), E.current.moved = !0;
    }
  }, z = (u) => {
    let $ = k.current.get(u.pointerId);
    if (!$) return;
    let I = u.clientX - $.x, U = u.clientY - $.y;
    if (k.current.size === 1) {
      if (!E.current.moved && Math.hypot(I, U) < 4) return;
      E.current.moved = !0, k.current.set(u.pointerId, { x: u.clientX, y: u.clientY }), n((T) => {
        let R = Ve(T.lat, T.lng, T.z), g = Zn(R.x - I, R.y - U, T.z);
        return { ...T, lat: Math.max(-80, Math.min(80, g.lat)), lng: g.lng };
      });
    } else
      k.current.set(u.pointerId, { x: u.clientX, y: u.clientY });
  }, C = (u) => {
    let $ = k.current.get(u.pointerId);
    if (!$) return;
    let I = k.current.size === 1;
    if (k.current.delete(u.pointerId), E.current.startDist && k.current.size === 1) {
      let [U] = [...k.current.values()], T = Math.hypot($.x - U.x, $.y - U.y) / E.current.startDist;
      T > 1.35 ? n((R) => ({ ...R, z: ie(R.z + (T > 2.6 ? 2 : 1)) })) : T < 0.7 && n((R) => ({ ...R, z: ie(R.z - (T < 0.38 ? 2 : 1)) })), E.current.startDist = 0;
    }
    if (I && !E.current.moved && u.type === "pointerup") {
      let U = l.current.getBoundingClientRect(), T = Zn(N + (u.clientX - U.left), A + (u.clientY - U.top), S);
      d(T.lat, T.lng);
    }
  }, p = (u) => {
    let $ = Date.now();
    $ - c.current < 250 || (c.current = $, n((I) => ({ ...I, z: ie(I.z + (u.deltaY < 0 ? 1 : -1)) })));
  }, B = (u, $) => {
    let I = Ve(u, $, S);
    return { left: I.x - N, top: I.y - A };
  }, j = (u) => u.left > -40 && u.left < r.w + 40 && u.top > -50 && u.top < r.h + 40;
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-map",
      ref: l,
      onPointerDown: M,
      onPointerMove: z,
      onPointerUp: C,
      onPointerCancel: C,
      onWheel: p,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        x,
        F.bad > 0 && F.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        r.w > 0 && o.map((u) => {
          let $ = B(u.lat, u.lng);
          return j($) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (u.id === s ? " sel" : ""),
              style: { left: $.left, top: $.top, "--pc": u.color },
              onClick: () => m(u.id),
              "aria-label": u.label,
              children: /* @__PURE__ */ e("i", {})
            },
            u.id
          ) : null;
        }),
        r.w > 0 && i && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: B(i.lat, i.lng).left, top: B(i.lat, i.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ a("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => n((u) => ({ ...u, z: ie(u.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => n((u) => ({ ...u, z: ie(u.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var ca = "https://unpkg.com/maplibre-gl@4.7.1/dist/", $i = "https://tiles.openfreemap.org/styles/liberty", se = null;
function Ti() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : se || (se = new Promise((t, n) => {
    let o = document.createElement("link");
    o.rel = "stylesheet", o.href = ca + "maplibre-gl.css", document.head.appendChild(o);
    let i = document.createElement("script");
    i.src = ca + "maplibre-gl.js", i.onload = () => window.maplibregl ? t(window.maplibregl) : n(new Error("maplibre")), i.onerror = () => {
      se = null, n(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), se);
}
var Bi = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Li(t) {
  (t.getStyle().layers || []).forEach((n) => {
    let o = n.layout && n.layout["text-field"];
    if (n.type === "symbol" && o && JSON.stringify(o).includes("name"))
      try {
        t.setLayoutProperty(n.id, "text-field", Bi);
      } catch {
      }
  });
}
var _i = (t) => String(t).replace(/[&<>"]/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[n]), rn = (t, n, o) => {
  let i = n ? 34 : 28, s = n ? 44 : 36, d = o ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${t}" font-family="sans-serif">${_i(o)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/>${d}</svg>`;
};
function Ma(t) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: d, onTap: m, onPinTap: l } = t, r = G(null), h = G(null), k = G(null), E = G([]), c = G(null), F = G({});
  F.current = { onTap: m, onPinTap: l, setView: o };
  let [f, S] = y("loading");
  return H(() => {
    let v = !0;
    return Ti().then((N) => {
      if (!v || !r.current) return;
      k.current = N;
      let A = new N.Map({
        container: r.current,
        style: $i,
        center: [n.lng, n.lat],
        zoom: n.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      A.touchZoomRotate.disableRotation(), A.addControl(new N.NavigationControl({ showCompass: !1 }), "top-right"), A.on("load", () => {
        Li(A), v && S("ok");
      }), A.on("click", (w) => {
        w.originalEvent && w.originalEvent.target.closest && w.originalEvent.target.closest(".jt-mlpin") || F.current.onTap(w.lngLat.lat, w.lngLat.lng);
      }), A.on("moveend", () => {
        let w = A.getCenter();
        F.current.setView({ lat: w.lat, lng: w.lng, z: A.getZoom() + 1 });
      }), h.current = A, setTimeout(() => v && !A.loaded() && S((w) => w === "loading" ? "slow" : w), 6e3), setTimeout(() => {
        v && h.current === A && !A.loaded() && (A.remove(), h.current = null, S("fail"));
      }, 15e3);
    }).catch(() => v && S("fail")), () => {
      v = !1, h.current && h.current.remove(), h.current = null;
    };
  }, []), H(() => {
    let v = h.current;
    if (!v) return;
    let N = v.getCenter();
    (Math.abs(N.lat - n.lat) > 1e-6 || Math.abs(N.lng - n.lng) > 1e-6 || Math.abs(v.getZoom() + 1 - n.z) > 0.01) && v.flyTo({ center: [n.lng, n.lat], zoom: n.z - 1, duration: 600 });
  }, [n.lat, n.lng, n.z]), H(() => {
    let v = h.current, N = k.current;
    !v || !N || (E.current.forEach((A) => A.remove()), E.current = i.map((A) => {
      let w = document.createElement("button");
      return w.type = "button", w.className = "jt-mlpin" + (A.id === d ? " sel" : ""), w.setAttribute("aria-label", A.label), w.innerHTML = rn(A.color, A.id === d, A.text), w.addEventListener("click", (x) => {
        x.stopPropagation(), F.current.onPinTap(A.id);
      }), new N.Marker({ element: w, anchor: "bottom" }).setLngLat([A.lng, A.lat]).addTo(v);
    }));
  }, [i, d, f]), H(() => {
    let v = h.current, N = k.current;
    if (c.current && c.current.remove(), c.current = null, !v || !N || !s) return;
    let A = document.createElement("div");
    A.className = "jt-mlpin temp", A.innerHTML = rn("#14213D", !0), c.current = new N.Marker({ element: A, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(v);
  }, [s, f]), f === "fail" ? /* @__PURE__ */ e(Ri, { ...t }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: r, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (f === "loading" || f === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: f === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var re = null, le = "", Mt = !1, ln = /* @__PURE__ */ new Set();
function hn(t) {
  return Mt ? Promise.reject(new Error("auth")) : re && le === t ? re : le && le !== t ? Promise.reject(new Error("reload")) : (le = t, re = new Promise((n, o) => {
    window.__jtGmReady = () => n(window.google.maps), window.gm_authFailure = () => {
      Mt = !0, ln.forEach((s) => s()), o(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      re = null, le = "", o(new Error("load"));
    }, document.head.appendChild(i);
  }), re);
}
function Oi(t) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: d, onTap: m, onPinTap: l, onPoi: r, gkey: h } = t, k = G(null), E = G(null), c = G(null), F = G([]), f = G(null), S = G({});
  S.current = { onTap: m, onPinTap: l, onPoi: r, setView: o };
  let [v, N] = y(Mt ? "fail" : "loading");
  H(() => {
    let w = !0, x = () => w && N("fail");
    return ln.add(x), hn(h).then(async (M) => {
      let { Map: z } = await M.importLibrary("maps"), { Marker: C } = await M.importLibrary("marker"), { Size: p, Point: B } = await M.importLibrary("core");
      if (!w || !k.current) return;
      c.current = { Marker: C, Size: p, Point: B };
      let j = new z(k.current, {
        center: { lat: n.lat, lng: n.lng },
        zoom: Math.round(n.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      j.addListener("click", async (u) => {
        if (u.placeId) {
          u.stop();
          try {
            let { Place: $ } = await M.importLibrary("places"), I = new $({ id: u.placeId });
            await I.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), S.current.onPoi({
              name: I.displayName || "",
              lat: I.location.lat(),
              lng: I.location.lng(),
              area: I.formattedAddress || "",
              link: I.googleMapsURI || "",
              placeId: u.placeId
            });
            return;
          } catch {
          }
        }
        S.current.onTap(u.latLng.lat(), u.latLng.lng());
      }), j.addListener("idle", () => {
        let u = j.getCenter();
        S.current.setView({ lat: u.lat(), lng: u.lng(), z: j.getZoom() });
      }), E.current = j, N("ok");
    }).catch(() => w && N("fail")), () => {
      w = !1, ln.delete(x);
    };
  }, [h]), H(() => {
    let w = E.current;
    if (!w) return;
    let x = w.getCenter();
    (Math.abs(x.lat() - n.lat) > 1e-6 || Math.abs(x.lng() - n.lng) > 1e-6) && w.panTo({ lat: n.lat, lng: n.lng }), Math.round(n.z) !== w.getZoom() && w.setZoom(Math.round(n.z));
  }, [n.lat, n.lng, n.z]);
  let A = (w, x, M) => {
    let z = c.current, C = x ? 34 : 28, p = x ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(rn(w, x, M).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new z.Size(C, p),
      anchor: new z.Point(C / 2, p)
    };
  };
  return H(() => {
    let w = E.current, x = c.current;
    !w || !x || (F.current.forEach((M) => M.setMap(null)), F.current = i.map((M) => {
      let z = new x.Marker({ position: { lat: M.lat, lng: M.lng }, map: w, title: M.label, icon: A(M.color, M.id === d, M.text), zIndex: M.id === d ? 10 : 1 });
      return z.addListener("click", () => S.current.onPinTap(M.id)), z;
    }));
  }, [i, d, v]), H(() => {
    let w = E.current, x = c.current;
    f.current && f.current.setMap(null), f.current = null, !(!w || !x || !s) && (f.current = new x.Marker({ position: { lat: s.lat, lng: s.lng }, map: w, icon: A("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, v]), v === "fail" ? /* @__PURE__ */ e(Ma, { ...t }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: k, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    v === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Ia(t) {
  return t.gkey && !Mt ? /* @__PURE__ */ e(Oi, { ...t }) : /* @__PURE__ */ e(Ma, { ...t });
}
var pa = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
