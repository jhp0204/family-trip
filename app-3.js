sum: N.daily.precipitation_sum[C]
            };
          }), N.hourly.time.forEach((E, C) => {
            I[E.slice(0, 13)] = {
              t: N.hourly.temperature_2m[C],
              pop: N.hourly.precipitation_probability[C],
              code: N.hourly.weather_code[C]
            };
          });
        }
        let g = k.filter((N) => !d[N] && N > l), S = {};
        if (g.length) {
          let N = await Promise.all(
            [1, 2, 3].map(
              (C) => aa(
                `https://archive-api.open-meteo.com/v1/archive?${p}&start_date=${oa(g[0], -C)}&end_date=${oa(g[g.length - 1], -C)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), E = {};
          N.filter(Boolean).forEach(
            (C) => C.daily.time.forEach((b, M) => {
              let A = C.daily.temperature_2m_max[M];
              if (A == null) return;
              let c = b.slice(5), r = E[c] || (E[c] = { max: 0, min: 0, wet: 0, n: 0 });
              r.max += A, r.min += C.daily.temperature_2m_min[M], r.wet += (C.daily.precipitation_sum[M] || 0) >= 1 ? 1 : 0, r.n++;
            })
          ), g.forEach((C) => {
            let b = E[C.slice(5) === "02-29" ? "02-28" : C.slice(5)];
            b && b.n && (S[C] = { max: b.max / b.n, min: b.min / b.n, wet: b.wet, n: b.n });
          });
        }
        let j = /* @__PURE__ */ new Date();
        s && i({ status: "ok", daily: d, hourly: I, climate: S, at: j, stale: !1 });
        try {
          window.storage.set("wx", JSON.stringify({ daily: d, hourly: I, climate: S, at: j.getTime() }), !1);
        } catch {
        }
      } catch {
        s && i((l) => l.status === "ok" ? { ...l, stale: !0 } : { status: "error" });
      }
    };
    (async () => {
      try {
        let p = await window.storage.get("wx", !1), l = p && p.value ? JSON.parse(p.value) : null;
        s && l && l.daily && i(
          (h) => h.status === "ok" && !h.stale ? h : { status: "ok", daily: l.daily, hourly: l.hourly || {}, climate: l.climate || {}, at: new Date(l.at), stale: !0 }
        );
      } catch {
      }
    })(), m();
    let u = setInterval(m, 30 * 6e4);
    return () => {
      s = !1, clearInterval(u);
    };
  }, [t, n]), o;
}
function Ai({ date: t, w: n }) {
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
    let { Icon: m, label: u, tone: p } = en(i.code), l = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, h = ["09", "12", "15", "18", "21"].map((k) => ({ h: k, v: n.hourly[`${t}T${k}`] })).filter((k) => k.v);
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ a("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(m, { size: 40, color: p, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ a("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: u }),
          /* @__PURE__ */ a("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: Wt(i.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: Wt(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(Go, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      l && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      h.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: h.map(({ h: k, v: z }) => {
        let d = en(z.code);
        return /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ a("span", { children: [
            k,
            "시"
          ] }),
          /* @__PURE__ */ e(d.Icon, { size: 18, color: d.tone, "aria-label": d.label }),
          /* @__PURE__ */ e("b", { children: Wt(z.t) }),
          /* @__PURE__ */ e("em", { children: z.pop == null ? "" : z.pop + "%" })
        ] }, k);
      }) })
    ] });
  }
  let s = n.climate[t];
  return s ? /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ a("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      za,
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
function Si({ v: t }) {
  if (!t) return null;
  let { Icon: n, label: o, tone: i } = en(t.code);
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
var ve = 56;
function Mi({ items: t, isToday: n, onEdit: o, members: i, onAddAt: s }) {
  let [m, u] = y(null), [p, l] = y(() => {
    let b = /* @__PURE__ */ new Date();
    return b.getHours() * 60 + b.getMinutes();
  });
  U(() => {
    if (!n) return;
    let b = setInterval(() => {
      let M = /* @__PURE__ */ new Date();
      l(M.getHours() * 60 + M.getMinutes());
    }, 6e4);
    return () => clearInterval(b);
  }, [n]);
  let h = t.filter((b) => b.time).map((b) => ({ ...b, ...pe(b) })).sort((b, M) => b.s - M.s || b.e - M.e), k = [], z = [], d = -1;
  h.forEach((b) => {
    z.length && b.s >= d && (k.push(z), z = [], d = -1), z.push(b), d = Math.max(d, b.e);
  }), z.length && k.push(z);
  let I = [];
  k.forEach((b) => {
    let M = [];
    b.forEach((A) => {
      let c = M.findIndex((r) => r <= A.s);
      c === -1 ? (c = M.length, M.push(A.e)) : M[c] = A.e, I.push({ ...A, col: c, cl: b });
    }), b.ncol = M.length;
  });
  let g = h.length ? Math.min(8, Math.floor(h[0].s / 60)) : 8, S = h.length ? Math.max(21, Math.ceil(Math.max(...h.map((b) => b.e)) / 60)) : 21, j = (b) => {
    let M = b.currentTarget.getBoundingClientRect(), A = g * 60 + (b.clientY - M.top) / ve * 60;
    return Math.max(g * 60, Math.min(Math.floor(A / 30) * 30, S * 60 - 30, 23 * 60 + 30));
  }, N = Array.from({ length: S - g + 1 }, (b, M) => g + M), E = (b) => (b - g * 60) / 60 * ve, C = t.length - h.length;
  return /* @__PURE__ */ a("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ a("div", { className: "jt-tt", style: { height: (S - g) * ve + 14 }, children: [
      N.map((b) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: E(b * 60) }, children: /* @__PURE__ */ a("span", { children: [
        it(b % 24),
        ":00"
      ] }) }, b)),
      /* @__PURE__ */ a(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (b) => {
            b.target.closest(".jt-tt-block") || !s || s(Kt(j(b)));
          },
          onPointerMove: (b) => {
            if (b.pointerType !== "mouse" || b.target.closest(".jt-tt-block")) return u(null);
            u(j(b));
          },
          onPointerLeave: () => u(null),
          children: [
            m != null && /* @__PURE__ */ a("div", { className: "jt-tt-ghost", style: { top: E(m) + 1, height: ve / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Kt(m),
              " 일정 추가"
            ] }),
            I.map((b) => {
              let M = b.cl.ncol, A = Math.max(24, E(b.e) - E(b.s) - 3);
              return /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (A < 44 ? " short" : "") + (M > 1 ? " clash" : ""),
                  style: {
                    top: E(b.s) + 1,
                    height: A,
                    left: `calc(${b.col / M * 100}% + 2px)`,
                    width: `calc(${100 / M}% - 4px)`
                  },
                  onClick: () => o(b),
                  "aria-label": `${b.time} ${b.title} 고치기`,
                  children: [
                    /* @__PURE__ */ e("strong", { children: b.title }),
                    /* @__PURE__ */ a("span", { children: [
                      Kt(b.s),
                      "~",
                      Kt(b.e % (24 * 60)),
                      b.place ? `, ${b.place}` : ""
                    ] })
                  ]
                },
                b.id
              );
            })
          ]
        }
      ),
      n && p >= g * 60 && p <= S * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: E(p) }, "aria-label": `지금 ${Kt(p)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ a("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      C > 0 ? ` 시간을 정하지 않은 일정 ${C}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function Ii({ settings: t, schedule: n, day: o, setDay: i, onEdit: s, onAddAt: m, me: u, onComment: p, onDelComment: l, onReact: h }) {
  let [k, z, d] = ka(), [I, g] = y(null), { start: S, days: j, members: N } = t, E = V[o % V.length], C = n.filter((r) => r.day === o).sort((r, D) => (r.time || "99:99").localeCompare(D.time || "99:99")), b = ni(C), M = pt(ut(S, o)), A = M === pt(/* @__PURE__ */ new Date()), c = Ei(S, j);
  return /* @__PURE__ */ a("section", { style: { "--lc": E }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: j }, (r, D) => {
      let _ = ut(S, D), w = D === o, B = n.filter((O) => O.day === D).length, v = pt(_) === pt(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ a(
        "button",
        {
          role: "tab",
          "aria-selected": w,
          "aria-label": `DAY ${D + 1}, ${_.getMonth() + 1}월 ${_.getDate()}일 ${St(_)}요일, 일정 ${B}개`,
          className: "jt-day" + (w ? " active" : ""),
          style: { "--lc": V[D % V.length] },
          onClick: () => i(D),
          children: [
            /* @__PURE__ */ a("span", { className: "jt-day-no", children: [
              "DAY ",
              D + 1
            ] }),
            v && /* @__PURE__ */ e("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ a("span", { className: "jt-day-date", children: [
              Rt(_),
              " ",
              /* @__PURE__ */ e("em", { children: St(_) })
            ] }),
            /* @__PURE__ */ e("span", { className: "jt-day-count", children: B ? `일정 ${B}개` : "일정 없음" })
          ]
        },
        D
      );
    }) }),
    /* @__PURE__ */ e(Ai, { date: M, w: c }),
    C.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ e(Na, { ids: C.map((r) => r.id), open: k, setAll: d }),
      /* @__PURE__ */ e("ol", { className: "jt-line", children: C.map((r, D) => {
        let _ = r.time ? pe(r) : null, w = C[D + 1], B = w && Ne(w);
        return /* @__PURE__ */ a("li", { className: "jt-row", children: [
          /* @__PURE__ */ e("div", { className: "jt-time", children: r.time || "미정" }),
          /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
          /* @__PURE__ */ a("div", { className: "jt-card" + (k[r.id] ? " open" : ""), children: [
            /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => z(r.id), "aria-expanded": !!k[r.id], children: [
              /* @__PURE__ */ e("span", { className: "jt-card-title", children: r.title }),
              /* @__PURE__ */ e(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            k[r.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
              r.time && c.status === "ok" && /* @__PURE__ */ e("div", { className: "jt-fold-wx", children: /* @__PURE__ */ e(Si, { v: c.hourly[`${M}T${r.time.slice(0, 2)}`] }) }),
              _ && r.end && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                r.time,
                "~",
                r.end,
                ", ",
                ya(_.e - _.s)
              ] }),
              b.has(r.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              r.place && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(Et, { size: 13 }),
                r.place
              ] }),
              r.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: r.memo }),
              (r.place || r.link || at(r)) && /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t(r), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ e(Tt, { size: 14 }),
                  "구글맵"
                ] }),
                (r.place || at(r)) && /* @__PURE__ */ a(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: Ee(at(r) ? r : { name: r.place, placeId: r.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ e(At, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              B && /* @__PURE__ */ a(
                "a",
                {
                  className: "jt-next",
                  href: ai(r, w),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (v) => v.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(At, { size: 14 }),
                    /* @__PURE__ */ a("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ e("b", { children: w.title }),
                      "까지 길 찾기",
                      Ne(r) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ a("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ a("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(ct, { name: r.by, members: N, size: 16 }),
                  r.by
                ] }),
                /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(r), children: [
                  /* @__PURE__ */ e(Gt, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ e(Ae, { item: r, me: u, members: N, onReact: (v) => h(r.id, v) }),
                /* @__PURE__ */ e(
                  dn,
                  {
                    count: (r.comments || []).length,
                    open: I === r.id,
                    onClick: () => g(I === r.id ? null : r.id)
                  }
                )
              ] }),
              I === r.id && /* @__PURE__ */ e(
                Se,
                {
                  comments: r.comments || [],
                  me: u,
                  members: N,
                  onAdd: (v) => p(r.id, v),
                  onDelete: (v) => l(r.id, v)
                }
              )
            ] })
          ] })
        ] }, r.id);
      }) })
    ] }),
    /* @__PURE__ */ e(Mi, { items: C, isToday: A, onEdit: s, members: N, onAddAt: (r) => m && m(o, r) })
  ] });
}
function Fi({ view: t, setView: n, pins: o, temp: i, selectedId: s, onTap: m, onPinTap: u }) {
  let p = G(null), [l, h] = y({ w: 0, h: 0 }), k = G(/* @__PURE__ */ new Map()), z = G({ moved: !1, startDist: 0 }), d = G(0), [I, g] = y({ ok: 0, bad: 0 });
  U(() => {
    let w = p.current;
    if (!w) return;
    let B = () => h({ w: w.clientWidth, h: w.clientHeight });
    B();
    let v = new ResizeObserver(B);
    return v.observe(w), () => v.disconnect();
  }, []);
  let S = t.z, j = Ge(t.lat, t.lng, S), N = j.x - l.w / 2, E = j.y - l.h / 2, C = 2 ** S, b = [];
  if (l.w) {
    let w = Math.floor(N / kt), B = Math.floor((N + l.w) / kt), v = Math.max(0, Math.floor(E / kt)), O = Math.min(C - 1, Math.floor((E + l.h) / kt));
    for (let J = w; J <= B; J++)
      for (let $ = v; $ <= O; $++) {
        let f = (J % C + C) % C;
        b.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${S}/${f}/${$}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => g((H) => H.ok ? H : { ...H, ok: 1 }),
              onError: () => g((H) => H.bad ? H : { ...H, bad: 1 }),
              style: { left: Math.round(J * kt - N), top: Math.round($ * kt - E) }
            },
            `${S}/${J}/${$}`
          )
        );
      }
  }
  let M = (w) => {
    if (!w.target.closest("[data-pin],.jt-zoom,.jt-attr") && (p.current.setPointerCapture(w.pointerId), k.current.set(w.pointerId, { x: w.clientX, y: w.clientY }), k.current.size === 1 && (z.current = { moved: !1, startDist: 0 }), k.current.size === 2)) {
      let [B, v] = [...k.current.values()];
      z.current.startDist = Math.hypot(B.x - v.x, B.y - v.y), z.current.moved = !0;
    }
  }, A = (w) => {
    let B = k.current.get(w.pointerId);
    if (!B) return;
    let v = w.clientX - B.x, O = w.clientY - B.y;
    if (k.current.size === 1) {
      if (!z.current.moved && Math.hypot(v, O) < 4) return;
      z.current.moved = !0, k.current.set(w.pointerId, { x: w.clientX, y: w.clientY }), n((J) => {
        let $ = Ge(J.lat, J.lng, J.z), f = Gn($.x - v, $.y - O, J.z);
        return { ...J, lat: Math.max(-80, Math.min(80, f.lat)), lng: f.lng };
      });
    } else
      k.current.set(w.pointerId, { x: w.clientX, y: w.clientY });
  }, c = (w) => {
    let B = k.current.get(w.pointerId);
    if (!B) return;
    let v = k.current.size === 1;
    if (k.current.delete(w.pointerId), z.current.startDist && k.current.size === 1) {
      let [O] = [...k.current.values()], J = Math.hypot(B.x - O.x, B.y - O.y) / z.current.startDist;
      J > 1.35 ? n(($) => ({ ...$, z: ae($.z + (J > 2.6 ? 2 : 1)) })) : J < 0.7 && n(($) => ({ ...$, z: ae($.z - (J < 0.38 ? 2 : 1)) })), z.current.startDist = 0;
    }
    if (v && !z.current.moved && w.type === "pointerup") {
      let O = p.current.getBoundingClientRect(), J = Gn(N + (w.clientX - O.left), E + (w.clientY - O.top), S);
      m(J.lat, J.lng);
    }
  }, r = (w) => {
    let B = Date.now();
    B - d.current < 250 || (d.current = B, n((v) => ({ ...v, z: ae(v.z + (w.deltaY < 0 ? 1 : -1)) })));
  }, D = (w, B) => {
    let v = Ge(w, B, S);
    return { left: v.x - N, top: v.y - E };
  }, _ = (w) => w.left > -40 && w.left < l.w + 40 && w.top > -50 && w.top < l.h + 40;
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-map",
      ref: p,
      onPointerDown: M,
      onPointerMove: A,
      onPointerUp: c,
      onPointerCancel: c,
      onWheel: r,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        b,
        I.bad > 0 && I.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        l.w > 0 && o.map((w) => {
          let B = D(w.lat, w.lng);
          return _(B) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (w.id === s ? " sel" : ""),
              style: { left: B.left, top: B.top, "--pc": w.color },
              onClick: () => u(w.id),
              "aria-label": w.label,
              children: /* @__PURE__ */ e("i", {})
            },
            w.id
          ) : null;
        }),
        l.w > 0 && i && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: D(i.lat, i.lng).left, top: D(i.lat, i.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ a("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => n((w) => ({ ...w, z: ae(w.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => n((w) => ({ ...w, z: ae(w.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var ia = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Di = "https://tiles.openfreemap.org/styles/liberty", oe = null;
function Pi() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : oe || (oe = new Promise((t, n) => {
    let o = document.createElement("link");
    o.rel = "stylesheet", o.href = ia + "maplibre-gl.css", document.head.appendChild(o);
    let i = document.createElement("script");
    i.src = ia + "maplibre-gl.js", i.onload = () => window.maplibregl ? t(window.maplibregl) : n(new Error("maplibre")), i.onerror = () => {
      oe = null, n(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), oe);
}
var Ri = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function $i(t) {
  (t.getStyle().layers || []).forEach((n) => {
    let o = n.layout && n.layout["text-field"];
    if (n.type === "symbol" && o && JSON.stringify(o).includes("name"))
      try {
        t.setLayoutProperty(n.id, "text-field", Ri);
      } catch {
      }
  });
}
var Ti = (t) => String(t).replace(/[&<>"]/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[n]), nn = (t, n, o) => {
  let i = n ? 34 : 28, s = n ? 44 : 36, m = o ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${t}" font-family="sans-serif">${Ti(o)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/>${m}</svg>`;
};
function Ea(t) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: m, onTap: u, onPinTap: p } = t, l = G(null), h = G(null), k = G(null), z = G([]), d = G(null), I = G({});
  I.current = { onTap: u, onPinTap: p, setView: o };
  let [g, S] = y("loading");
  return U(() => {
    let j = !0;
    return Pi().then((N) => {
      if (!j || !l.current) return;
      k.current = N;
      let E = new N.Map({
        container: l.current,
        style: Di,
        center: [n.lng, n.lat],
        zoom: n.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      E.touchZoomRotate.disableRotation(), E.addControl(new N.NavigationControl({ showCompass: !1 }), "top-right"), E.on("load", () => {
        $i(E), j && S("ok");
      }), E.on("click", (C) => {
        C.originalEvent && C.originalEvent.target.closest && C.originalEvent.target.closest(".jt-mlpin") || I.current.onTap(C.lngLat.lat, C.lngLat.lng);
      }), E.on("moveend", () => {
        let C = E.getCenter();
        I.current.setView({ lat: C.lat, lng: C.lng, z: E.getZoom() + 1 });
      }), h.current = E, setTimeout(() => j && !E.loaded() && S((C) => C === "loading" ? "slow" : C), 6e3), setTimeout(() => {
        j && h.current === E && !E.loaded() && (E.remove(), h.current = null, S("fail"));
      }, 15e3);
    }).catch(() => j && S("fail")), () => {
      j = !1, h.current && h.current.remove(), h.current = null;
    };
  }, []), U(() => {
    let j = h.current;
    if (!j) return;
    let N = j.getCenter();
    (Math.abs(N.lat - n.lat) > 1e-6 || Math.abs(N.lng - n.lng) > 1e-6 || Math.abs(j.getZoom() + 1 - n.z) > 0.01) && j.flyTo({ center: [n.lng, n.lat], zoom: n.z - 1, duration: 600 });
  }, [n.lat, n.lng, n.z]), U(() => {
    let j = h.current, N = k.current;
    !j || !N || (z.current.forEach((E) => E.remove()), z.current = i.map((E) => {
      let C = document.createElement("button");
      return C.type = "button", C.className = "jt-mlpin" + (E.id === m ? " sel" : ""), C.setAttribute("aria-label", E.label), C.innerHTML = nn(E.color, E.id === m, E.text), C.addEventListener("click", (b) => {
        b.stopPropagation(), I.current.onPinTap(E.id);
      }), new N.Marker({ element: C, anchor: "bottom" }).setLngLat([E.lng, E.lat]).addTo(j);
    }));
  }, [i, m, g]), U(() => {
    let j = h.current, N = k.current;
    if (d.current && d.current.remove(), d.current = null, !j || !N || !s) return;
    let E = document.createElement("div");
    E.className = "jt-mlpin temp", E.innerHTML = nn("#14213D", !0), d.current = new N.Marker({ element: E, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(j);
  }, [s, g]), g === "fail" ? /* @__PURE__ */ e(Fi, { ...t }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: l, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (g === "loading" || g === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: g === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var ie = null, se = "", Mt = !1, an = /* @__PURE__ */ new Set();
function mn(t) {
  return Mt ? Promise.reject(new Error("auth")) : ie && se === t ? ie : se && se !== t ? Promise.reject(new Error("reload")) : (se = t, ie = new Promise((n, o) => {
    window.__jtGmReady = () => n(window.google.maps), window.gm_authFailure = () => {
      Mt = !0, an.forEach((s) => s()), o(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      ie = null, se = "", o(new Error("load"));
    }, document.head.appendChild(i);
  }), ie);
}
function Bi(t) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: m, onTap: u, onPinTap: p, onPoi: l, gkey: h } = t, k = G(null), z = G(null), d = G(null), I = G([]), g = G(null), S = G({});
  S.current = { onTap: u, onPinTap: p, onPoi: l, setView: o };
  let [j, N] = y(Mt ? "fail" : "loading");
  U(() => {
    let C = !0, b = () => C && N("fail");
    return an.add(b), mn(h).then(async (M) => {
      let { Map: A } = await M.importLibrary("maps"), { Marker: c } = await M.importLibrary("marker"), { Size: r, Point: D } = await M.importLibrary("core");
      if (!C || !k.current) return;
      d.current = { Marker: c, Size: r, Point: D };
      let _ = new A(k.current, {
        center: { lat: n.lat, lng: n.lng },
        zoom: Math.round(n.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      _.addListener("click", async (w) => {
        if (w.placeId) {
          w.stop();
          try {
            let { Place: B } = await M.importLibrary("places"), v = new B({ id: w.placeId });
            await v.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), S.current.onPoi({
              name: v.displayName || "",
              lat: v.location.lat(),
              lng: v.location.lng(),
              area: v.formattedAddress || "",
              link: v.googleMapsURI || "",
              placeId: w.placeId
            });
            return;
          } catch {
          }
        }
        S.current.onTap(w.latLng.lat(), w.latLng.lng());
      }), _.addListener("idle", () => {
        let w = _.getCenter();
        S.current.setView({ lat: w.lat(), lng: w.lng(), z: _.getZoom() });
      }), z.current = _, N("ok");
    }).catch(() => C && N("fail")), () => {
      C = !1, an.delete(b);
    };
  }, [h]), U(() => {
    let C = z.current;
    if (!C) return;
    let b = C.getCenter();
    (Math.abs(b.lat() - n.lat) > 1e-6 || Math.abs(b.lng() - n.lng) > 1e-6) && C.panTo({ lat: n.lat, lng: n.lng }), Math.round(n.z) !== C.getZoom() && C.setZoom(Math.round(n.z));
  }, [n.lat, n.lng, n.z]);
  let E = (C, b, M) => {
    let A = d.current, c = b ? 34 : 28, r = b ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(nn(C, b, M).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new A.Size(c, r),
      anchor: new A.Point(c / 2, r)
    };
  };
  return U(() => {
    let C = z.current, b = d.current;
    !C || !b || (I.current.forEach((M) => M.setMap(null)), I.current = i.map((M) => {
      let A = new b.Marker({ position: { lat: M.lat, lng: M.lng }, map: C, title: M.label, icon: E(M.color, M.id === m, M.text), zIndex: M.id === m ? 10 : 1 });
      return A.addListener("click", () => S.current.onPinTap(M.id)), A;
    }));
  }, [i, m, j]), U(() => {
    let C = z.current, b = d.current;
    g.current && g.current.setMap(null), g.current = null, !(!C || !b || !s) && (g.current = new b.Marker({ position: { lat: s.lat, lng: s.lng }, map: C, icon: E("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, j]), j === "fail" ? /* @__PURE__ */ e(Ea, { ...t }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: k, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    j === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Aa(t) {
  return t.gkey && !Mt ? /* @__PURE__ */ e(Bi, { ...t }) : /* @__PURE__ */ e(Ea, { ...t });
}
var sa = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
