).catch(() => null)
            )
          ), C = {};
          y.filter(Boolean).forEach(
            (d) => d.daily.time.forEach((l, S) => {
              let E = d.daily.temperature_2m_max[S];
              if (E == null) return;
              let N = l.slice(5), f = C[N] || (C[N] = { max: 0, min: 0, wet: 0, n: 0 });
              f.max += E, f.min += d.daily.temperature_2m_min[S], f.wet += (d.daily.precipitation_sum[S] || 0) >= 1 ? 1 : 0, f.n++;
            })
          ), g.forEach((d) => {
            let l = C[d.slice(5) === "02-29" ? "02-28" : d.slice(5)];
            l && l.n && (A[d] = { max: l.max / l.n, min: l.min / l.n, wet: l.wet, n: l.n });
          });
        }
        let w = /* @__PURE__ */ new Date();
        s && i({ status: "ok", daily: c, hourly: I, climate: A, at: w, stale: !1 });
        try {
          window.storage.set("wx", JSON.stringify({ daily: c, hourly: I, climate: A, at: w.getTime() }), !1);
        } catch {
        }
      } catch {
        s && i((r) => r.status === "ok" ? { ...r, stale: !0 } : { status: "error" });
      }
    };
    (async () => {
      try {
        let p = await window.storage.get("wx", !1), r = p && p.value ? JSON.parse(p.value) : null;
        s && r && r.daily && i(
          (x) => x.status === "ok" && !x.stale ? x : { status: "ok", daily: r.daily, hourly: r.hourly || {}, climate: r.climate || {}, at: new Date(r.at), stale: !0 }
        );
      } catch {
      }
    })(), m();
    let u = setInterval(m, 30 * 6e4);
    return () => {
      s = !1, clearInterval(u);
    };
  }, [e, n]), o;
}
function Ci({ date: e, w: n }) {
  let o = /* @__PURE__ */ a("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ a("span", { children: [
      xt.name,
      " 날씨"
    ] }),
    n.status === "ok" && (n.daily[e] || n.climate[e]) && /* @__PURE__ */ t("em", { className: n.stale ? "jt-wx-stale" : "", children: n.stale ? `${Rt(n.at)} ${ot(n.at.getHours())}:${ot(n.at.getMinutes())} 기준, 마지막으로 받은 날씨` : `${ot(n.at.getHours())}:${ot(n.at.getMinutes())} 업데이트` })
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
    let { Icon: m, label: u, tone: p } = tn(i.code), r = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, x = ["09", "12", "15", "18", "21"].map((k) => ({ h: k, v: n.hourly[`${e}T${k}`] })).filter((k) => k.v);
    return /* @__PURE__ */ a("div", { className: "jt-wx", children: [
      o,
      /* @__PURE__ */ a("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(m, { size: 40, color: p, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ a("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: u }),
          /* @__PURE__ */ a("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: Wt(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: Wt(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(Ho, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      r && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      x.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: x.map(({ h: k, v: z }) => {
        let c = tn(z.code);
        return /* @__PURE__ */ a("li", { children: [
          /* @__PURE__ */ a("span", { children: [
            k,
            "시"
          ] }),
          /* @__PURE__ */ t(c.Icon, { size: 18, color: c.tone, "aria-label": c.label }),
          /* @__PURE__ */ t("b", { children: Wt(z.t) }),
          /* @__PURE__ */ t("em", { children: z.pop == null ? "" : z.pop + "%" })
        ] }, k);
      }) })
    ] });
  }
  let s = n.climate[e];
  return s ? /* @__PURE__ */ a("div", { className: "jt-wx", children: [
    o,
    /* @__PURE__ */ a("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      ka,
      "일 전부터 나와요. 최근 ",
      s.n,
      "년 같은 날 ",
      xt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ t("b", { children: Wt(s.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ t("b", { children: Wt(s.min) }),
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
function zi({ v: e }) {
  if (!e) return null;
  let { Icon: n, label: o, tone: i } = tn(e.code);
  return /* @__PURE__ */ a("span", { className: "jt-wxchip", title: o, children: [
    /* @__PURE__ */ t(n, { size: 14, color: i, "aria-hidden": "true" }),
    Wt(e.t),
    e.pop != null && e.pop >= 30 && /* @__PURE__ */ a("em", { children: [
      "비 ",
      e.pop,
      "%"
    ] })
  ] });
}
var ve = 56;
function Ei({ items: e, isToday: n, onEdit: o, members: i, onAddAt: s }) {
  let [m, u] = j(null), [p, r] = j(() => {
    let l = /* @__PURE__ */ new Date();
    return l.getHours() * 60 + l.getMinutes();
  });
  K(() => {
    if (!n) return;
    let l = setInterval(() => {
      let S = /* @__PURE__ */ new Date();
      r(S.getHours() * 60 + S.getMinutes());
    }, 6e4);
    return () => clearInterval(l);
  }, [n]);
  let x = e.filter((l) => l.time).map((l) => ({ ...l, ...pe(l) })).sort((l, S) => l.s - S.s || l.e - S.e), k = [], z = [], c = -1;
  x.forEach((l) => {
    z.length && l.s >= c && (k.push(z), z = [], c = -1), z.push(l), c = Math.max(c, l.e);
  }), z.length && k.push(z);
  let I = [];
  k.forEach((l) => {
    let S = [];
    l.forEach((E) => {
      let N = S.findIndex((f) => f <= E.s);
      N === -1 ? (N = S.length, S.push(E.e)) : S[N] = E.e, I.push({ ...E, col: N, cl: l });
    }), l.ncol = S.length;
  });
  let g = x.length ? Math.min(8, Math.floor(x[0].s / 60)) : 8, A = x.length ? Math.max(21, Math.ceil(Math.max(...x.map((l) => l.e)) / 60)) : 21, w = (l) => {
    let S = l.currentTarget.getBoundingClientRect(), E = g * 60 + (l.clientY - S.top) / ve * 60;
    return Math.max(g * 60, Math.min(Math.floor(E / 30) * 30, A * 60 - 30, 23 * 60 + 30));
  }, y = Array.from({ length: A - g + 1 }, (l, S) => g + S), C = (l) => (l - g * 60) / 60 * ve, d = e.length - x.length;
  return /* @__PURE__ */ a("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ a("div", { className: "jt-tt", style: { height: (A - g) * ve + 14 }, children: [
      y.map((l) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: C(l * 60) }, children: /* @__PURE__ */ a("span", { children: [
        ot(l % 24),
        ":00"
      ] }) }, l)),
      /* @__PURE__ */ a(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (l) => {
            l.target.closest(".jt-tt-block") || !s || s(Kt(w(l)));
          },
          onPointerMove: (l) => {
            if (l.pointerType !== "mouse" || l.target.closest(".jt-tt-block")) return u(null);
            u(w(l));
          },
          onPointerLeave: () => u(null),
          children: [
            m != null && /* @__PURE__ */ a("div", { className: "jt-tt-ghost", style: { top: C(m) + 1, height: ve / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Kt(m),
              " 일정 추가"
            ] }),
            I.map((l) => {
              let S = l.cl.ncol, E = Math.max(24, C(l.e) - C(l.s) - 3);
              return /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (E < 44 ? " short" : "") + (S > 1 ? " clash" : ""),
                  style: {
                    top: C(l.s) + 1,
                    height: E,
                    left: `calc(${l.col / S * 100}% + 2px)`,
                    width: `calc(${100 / S}% - 4px)`
                  },
                  onClick: () => o(l),
                  "aria-label": `${l.time} ${l.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: l.title }),
                    /* @__PURE__ */ a("span", { children: [
                      Kt(l.s),
                      "~",
                      Kt(l.e % (24 * 60)),
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
      n && p >= g * 60 && p <= A * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: C(p) }, "aria-label": `지금 ${Kt(p)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ a("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      d > 0 ? ` 시간을 정하지 않은 일정 ${d}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function Ai({ settings: e, schedule: n, day: o, setDay: i, onEdit: s, onAddAt: m, me: u, onComment: p, onDelComment: r, onReact: x }) {
  let [k, z, c] = ya(), [I, g] = j(null), { start: A, days: w, members: y } = e, C = V[o % V.length], d = n.filter((f) => f.day === o).sort((f, B) => (f.time || "99:99").localeCompare(B.time || "99:99")), l = Qo(d), S = dt(ft(A, o)), E = S === dt(/* @__PURE__ */ new Date()), N = Ni(A, w);
  return /* @__PURE__ */ a("section", { style: { "--lc": C }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: w }, (f, B) => {
      let F = ft(A, B), v = B === o, _ = n.filter((W) => W.day === B).length, M = dt(F) === dt(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ a(
        "button",
        {
          role: "tab",
          "aria-selected": v,
          "aria-label": `DAY ${B + 1}, ${F.getMonth() + 1}월 ${F.getDate()}일 ${St(F)}요일, 일정 ${_}개`,
          className: "jt-day" + (v ? " active" : ""),
          style: { "--lc": V[B % V.length] },
          onClick: () => i(B),
          children: [
            /* @__PURE__ */ a("span", { className: "jt-day-no", children: [
              "DAY ",
              B + 1
            ] }),
            M && /* @__PURE__ */ t("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ a("span", { className: "jt-day-date", children: [
              Rt(F),
              " ",
              /* @__PURE__ */ t("em", { children: St(F) })
            ] }),
            /* @__PURE__ */ t("span", { className: "jt-day-count", children: _ ? `일정 ${_}개` : "일정 없음" })
          ]
        },
        B
      );
    }) }),
    /* @__PURE__ */ t(Ci, { date: S, w: N }),
    d.length === 0 ? /* @__PURE__ */ a("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ t(va, { ids: d.map((f) => f.id), open: k, setAll: c }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: d.map((f, B) => {
        let F = f.time ? pe(f) : null, v = d[B + 1], _ = v && Ne(v);
        return /* @__PURE__ */ a("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: f.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ a("div", { className: "jt-card" + (k[f.id] ? " open" : ""), children: [
            /* @__PURE__ */ a("button", { type: "button", className: "jt-fold-head", onClick: () => z(f.id), "aria-expanded": !!k[f.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: f.title }),
              /* @__PURE__ */ t(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            k[f.id] && /* @__PURE__ */ a("div", { className: "jt-fold-body", children: [
              f.time && N.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(zi, { v: N.hourly[`${S}T${f.time.slice(0, 2)}`] }) }),
              F && f.end && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                f.time,
                "~",
                f.end,
                ", ",
                ba(F.e - F.s)
              ] }),
              l.has(f.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              f.place && /* @__PURE__ */ a("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(Et, { size: 13 }),
                f.place
              ] }),
              f.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: f.memo }),
              (f.place || f.link || nt(f)) && /* @__PURE__ */ a("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ a("a", { className: "jt-maplink", href: Tt(f), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ t(Bt, { size: 14 }),
                  "구글맵"
                ] }),
                (f.place || nt(f)) && /* @__PURE__ */ a(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: ze(nt(f) ? f : { name: f.place, placeId: f.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ t(At, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              _ && /* @__PURE__ */ a(
                "a",
                {
                  className: "jt-next",
                  href: ti(f, v),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (M) => M.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(At, { size: 14 }),
                    /* @__PURE__ */ a("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: v.title }),
                      "까지 길 찾기",
                      Ne(f) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ a("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ a("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(pt, { name: f.by, members: y, size: 16 }),
                  f.by
                ] }),
                /* @__PURE__ */ a("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(f), children: [
                  /* @__PURE__ */ t(Xt, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Ee, { item: f, me: u, members: y, onReact: (M) => x(f.id, M) }),
                /* @__PURE__ */ t(
                  cn,
                  {
                    count: (f.comments || []).length,
                    open: I === f.id,
                    onClick: () => g(I === f.id ? null : f.id)
                  }
                )
              ] }),
              I === f.id && /* @__PURE__ */ t(
                Ae,
                {
                  comments: f.comments || [],
                  me: u,
                  members: y,
                  onAdd: (M) => p(f.id, M),
                  onDelete: (M) => r(f.id, M)
                }
              )
            ] })
          ] })
        ] }, f.id);
      }) })
    ] }),
    /* @__PURE__ */ t(Ei, { items: d, isToday: E, onEdit: s, members: y, onAddAt: (f) => m && m(o, f) })
  ] });
}
function Si({ view: e, setView: n, pins: o, temp: i, selectedId: s, onTap: m, onPinTap: u }) {
  let p = J(null), [r, x] = j({ w: 0, h: 0 }), k = J(/* @__PURE__ */ new Map()), z = J({ moved: !1, startDist: 0 }), c = J(0), [I, g] = j({ ok: 0, bad: 0 });
  K(() => {
    let v = p.current;
    if (!v) return;
    let _ = () => x({ w: v.clientWidth, h: v.clientHeight });
    _();
    let M = new ResizeObserver(_);
    return M.observe(v), () => M.disconnect();
  }, []);
  let A = e.z, w = Je(e.lat, e.lng, A), y = w.x - r.w / 2, C = w.y - r.h / 2, d = 2 ** A, l = [];
  if (r.w) {
    let v = Math.floor(y / kt), _ = Math.floor((y + r.w) / kt), M = Math.max(0, Math.floor(C / kt)), W = Math.min(d - 1, Math.floor((C + r.h) / kt));
    for (let G = v; G <= _; G++)
      for (let R = M; R <= W; R++) {
        let h = (G % d + d) % d;
        l.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${A}/${h}/${R}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => g((H) => H.ok ? H : { ...H, ok: 1 }),
              onError: () => g((H) => H.bad ? H : { ...H, bad: 1 }),
              style: { left: Math.round(G * kt - y), top: Math.round(R * kt - C) }
            },
            `${A}/${G}/${R}`
          )
        );
      }
  }
  let S = (v) => {
    if (!v.target.closest("[data-pin],.jt-zoom,.jt-attr") && (p.current.setPointerCapture(v.pointerId), k.current.set(v.pointerId, { x: v.clientX, y: v.clientY }), k.current.size === 1 && (z.current = { moved: !1, startDist: 0 }), k.current.size === 2)) {
      let [_, M] = [...k.current.values()];
      z.current.startDist = Math.hypot(_.x - M.x, _.y - M.y), z.current.moved = !0;
    }
  }, E = (v) => {
    let _ = k.current.get(v.pointerId);
    if (!_) return;
    let M = v.clientX - _.x, W = v.clientY - _.y;
    if (k.current.size === 1) {
      if (!z.current.moved && Math.hypot(M, W) < 4) return;
      z.current.moved = !0, k.current.set(v.pointerId, { x: v.clientX, y: v.clientY }), n((G) => {
        let R = Je(G.lat, G.lng, G.z), h = Yn(R.x - M, R.y - W, G.z);
        return { ...G, lat: Math.max(-80, Math.min(80, h.lat)), lng: h.lng };
      });
    } else
      k.current.set(v.pointerId, { x: v.clientX, y: v.clientY });
  }, N = (v) => {
    let _ = k.current.get(v.pointerId);
    if (!_) return;
    let M = k.current.size === 1;
    if (k.current.delete(v.pointerId), z.current.startDist && k.current.size === 1) {
      let [W] = [...k.current.values()], G = Math.hypot(_.x - W.x, _.y - W.y) / z.current.startDist;
      G > 1.35 ? n((R) => ({ ...R, z: oe(R.z + (G > 2.6 ? 2 : 1)) })) : G < 0.7 && n((R) => ({ ...R, z: oe(R.z - (G < 0.38 ? 2 : 1)) })), z.current.startDist = 0;
    }
    if (M && !z.current.moved && v.type === "pointerup") {
      let W = p.current.getBoundingClientRect(), G = Yn(y + (v.clientX - W.left), C + (v.clientY - W.top), A);
      m(G.lat, G.lng);
    }
  }, f = (v) => {
    let _ = Date.now();
    _ - c.current < 250 || (c.current = _, n((M) => ({ ...M, z: oe(M.z + (v.deltaY < 0 ? 1 : -1)) })));
  }, B = (v, _) => {
    let M = Je(v, _, A);
    return { left: M.x - y, top: M.y - C };
  }, F = (v) => v.left > -40 && v.left < r.w + 40 && v.top > -50 && v.top < r.h + 40;
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-map",
      ref: p,
      onPointerDown: S,
      onPointerMove: E,
      onPointerUp: N,
      onPointerCancel: N,
      onWheel: f,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        l,
        I.bad > 0 && I.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        r.w > 0 && o.map((v) => {
          let _ = B(v.lat, v.lng);
          return F(_) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (v.id === s ? " sel" : ""),
              style: { left: _.left, top: _.top, "--pc": v.color },
              onClick: () => u(v.id),
              "aria-label": v.label,
              children: /* @__PURE__ */ t("i", {})
            },
            v.id
          ) : null;
        }),
        r.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: B(i.lat, i.lng).left, top: B(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ a("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((v) => ({ ...v, z: oe(v.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => n((v) => ({ ...v, z: oe(v.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var aa = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Mi = "https://tiles.openfreemap.org/styles/liberty", ie = null;
function Ii() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : ie || (ie = new Promise((e, n) => {
    let o = document.createElement("link");
    o.rel = "stylesheet", o.href = aa + "maplibre-gl.css", document.head.appendChild(o);
    let i = document.createElement("script");
    i.src = aa + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : n(new Error("maplibre")), i.onerror = () => {
      ie = null, n(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), ie);
}
var Di = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Fi(e) {
  (e.getStyle().layers || []).forEach((n) => {
    let o = n.layout && n.layout["text-field"];
    if (n.type === "symbol" && o && JSON.stringify(o).includes("name"))
      try {
        e.setLayoutProperty(n.id, "text-field", Di);
      } catch {
      }
  });
}
var Pi = (e) => String(e).replace(/[&<>"]/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[n]), en = (e, n, o) => {
  let i = n ? 34 : 28, s = n ? 44 : 36, m = o ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${Pi(o)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${m}</svg>`;
};
function Na(e) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: m, onTap: u, onPinTap: p } = e, r = J(null), x = J(null), k = J(null), z = J([]), c = J(null), I = J({});
  I.current = { onTap: u, onPinTap: p, setView: o };
  let [g, A] = j("loading");
  return K(() => {
    let w = !0;
    return Ii().then((y) => {
      if (!w || !r.current) return;
      k.current = y;
      let C = new y.Map({
        container: r.current,
        style: Mi,
        center: [n.lng, n.lat],
        zoom: n.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      C.touchZoomRotate.disableRotation(), C.addControl(new y.NavigationControl({ showCompass: !1 }), "top-right"), C.on("load", () => {
        Fi(C), w && A("ok");
      }), C.on("click", (d) => {
        d.originalEvent && d.originalEvent.target.closest && d.originalEvent.target.closest(".jt-mlpin") || I.current.onTap(d.lngLat.lat, d.lngLat.lng);
      }), C.on("moveend", () => {
        let d = C.getCenter();
        I.current.setView({ lat: d.lat, lng: d.lng, z: C.getZoom() + 1 });
      }), x.current = C, setTimeout(() => w && !C.loaded() && A((d) => d === "loading" ? "slow" : d), 6e3), setTimeout(() => {
        w && x.current === C && !C.loaded() && (C.remove(), x.current = null, A("fail"));
      }, 15e3);
    }).catch(() => w && A("fail")), () => {
      w = !1, x.current && x.current.remove(), x.current = null;
    };
  }, []), K(() => {
    let w = x.current;
    if (!w) return;
    let y = w.getCenter();
    (Math.abs(y.lat - n.lat) > 1e-6 || Math.abs(y.lng - n.lng) > 1e-6 || Math.abs(w.getZoom() + 1 - n.z) > 0.01) && w.flyTo({ center: [n.lng, n.lat], zoom: n.z - 1, duration: 600 });
  }, [n.lat, n.lng, n.z]), K(() => {
    let w = x.current, y = k.current;
    !w || !y || (z.current.forEach((C) => C.remove()), z.current = i.map((C) => {
      let d = document.createElement("button");
      return d.type = "button", d.className = "jt-mlpin" + (C.id === m ? " sel" : ""), d.setAttribute("aria-label", C.label), d.innerHTML = en(C.color, C.id === m, C.text), d.addEventListener("click", (l) => {
        l.stopPropagation(), I.current.onPinTap(C.id);
      }), new y.Marker({ element: d, anchor: "bottom" }).setLngLat([C.lng, C.lat]).addTo(w);
    }));
  }, [i, m, g]), K(() => {
    let w = x.current, y = k.current;
    if (c.current && c.current.remove(), c.current = null, !w || !y || !s) return;
    let C = document.createElement("div");
    C.className = "jt-mlpin temp", C.innerHTML = en("#14213D", !0), c.current = new y.Marker({ element: C, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(w);
  }, [s, g]), g === "fail" ? /* @__PURE__ */ t(Si, { ...e }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: r, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (g === "loading" || g === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: g === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var se = null, re = "", Mt = !1, nn = /* @__PURE__ */ new Set();
function pn(e) {
  return Mt ? Promise.reject(new Error("auth")) : se && re === e ? se : re && re !== e ? Promise.reject(new Error("reload")) : (re = e, se = new Promise((n, o) => {
    window.__jtGmReady = () => n(window.google.maps), window.gm_authFailure = () => {
      Mt = !0, nn.forEach((s) => s()), o(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      se = null, re = "", o(new Error("load"));
    }, document.head.appendChild(i);
  }), se);
}
function $i(e) {
  let { view: n, setView: o, pins: i, temp: s, selectedId: m, onTap: u, onPinTap: p, onPoi: r, gkey: x } = e, k = J(null), z = J(null), c = J(null), I = J([]), g = J(null), A = J({});
  A.current = { onTap: u, onPinTap: p, onPoi: r, setView: o };
  let [w, y] = j(Mt ? "fail" : "loading");
  K(() => {
    let d = !0, l = () => d && y("fail");
    return nn.add(l), pn(x).then(async (S) => {
      let { Map: E } = await S.importLibrary("maps"), { Marker: N } = await S.importLibrary("marker"), { Size: f, Point: B } = await S.importLibrary("core");
      if (!d || !k.current) return;
      c.current = { Marker: N, Size: f, Point: B };
      let F = new E(k.current, {
        center: { lat: n.lat, lng: n.lng },
        zoom: Math.round(n.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      F.addListener("click", async (v) => {
        if (v.placeId) {
          v.stop();
          try {
            let { Place: _ } = await S.importLibrary("places"), M = new _({ id: v.placeId });
            await M.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), A.current.onPoi({
              name: M.displayName || "",
              lat: M.location.lat(),
              lng: M.location.lng(),
              area: M.formattedAddress || "",
              link: M.googleMapsURI || "",
              placeId: v.placeId
            });
            return;
          } catch {
          }
        }
        A.current.onTap(v.latLng.lat(), v.latLng.lng());
      }), F.addListener("idle", () => {
        let v = F.getCenter();
        A.current.setView({ lat: v.lat(), lng: v.lng(), z: F.getZoom() });
      }), z.current = F, y("ok");
    }).catch(() => d && y("fail")), () => {
      d = !1, nn.delete(l);
    };
  }, [x]), K(() => {
    let d = z.current;
    if (!d) return;
    let l = d.getCenter();
    (Math.abs(l.lat() - n.lat) > 1e-6 || Math.abs(l.lng() - n.lng) > 1e-6) && d.panTo({ lat: n.lat, lng: n.lng }), Math.round(n.z) !== d.getZoom() && d.setZoom(Math.round(n.z));
  }, [n.lat, n.lng, n.z]);
  let C = (d, l, S) => {
    let E = c.current, N = l ? 34 : 28, f = l ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(en(d, l, S).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new E.Size(N, f),
      anchor: new E.Point(N / 2, f)
    };
  };
  return K(() => {
    let d = z.current, l = c.current;
    !d || !l || (I.current.forEach((S) => S.setMap(null)), I.current = i.map((S) => {
      let E = new l.Marker({ position: { lat: S.lat, lng: S.lng }, map: d, title: S.label, icon: C(S.color, S.id === m, S.text), zIndex: S.id === m ? 10 : 1 });
      return E.addListener("click", () => A.current.onPinTap(S.id)), E;
    }));
  }, [i, m, w]), K(() => {
    let d = z.current, l = c.current;
    g.current && g.current.setMap(null), g.current = null, !(!d || !l || !s) && (g.current = new l.Marker({ position: { lat: s.lat, lng: s.lng }, map: d, icon: C("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, w]), w === "fail" ? /* @__PURE__ */ t(Na, { ...e }) : /* @__PURE__ */ a("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: k, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    w === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Ca(e) {
  return e.gkey && !Mt ? /* @__PURE__ */ t($i, { ...e }) : /* @__PURE__ */ t(Na, { ...e });
}
var oa = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
