s && r && r.daily && i(
          (x) => x.status === "ok" && !x.stale ? x : { status: "ok", daily: r.daily, hourly: r.hourly || {}, climate: r.climate || {}, at: new Date(r.at), stale: !0 }
        );
      } catch {
      }
    })(), g();
    let d = setInterval(g, 30 * 6e4);
    return () => {
      s = !1, clearInterval(d);
    };
  }, [e, a]), n;
}
function ki({ date: e, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      xt.name,
      " 날씨"
    ] }),
    a.status === "ok" && (a.daily[e] || a.climate[e]) && /* @__PURE__ */ t("em", { className: a.stale ? "jt-wx-stale" : "", children: a.stale ? `${$t(a.at)} ${ot(a.at.getHours())}:${ot(a.at.getMinutes())} 기준, 마지막으로 받은 날씨` : `${ot(a.at.getHours())}:${ot(a.at.getMinutes())} 업데이트` })
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
    let { Icon: g, label: d, tone: c } = ea(i.code), r = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, x = ["09", "12", "15", "18", "21"].map((N) => ({ h: N, v: a.hourly[`${e}T${N}`] })).filter((N) => N.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(g, { size: 40, color: c, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: d }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: Wt(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: Wt(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(Wo, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      r && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      x.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: x.map(({ h: N, v: E }) => {
        let u = ea(E.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            N,
            "시"
          ] }),
          /* @__PURE__ */ t(u.Icon, { size: 18, color: u.tone, "aria-label": u.label }),
          /* @__PURE__ */ t("b", { children: Wt(E.t) }),
          /* @__PURE__ */ t("em", { children: E.pop == null ? "" : E.pop + "%" })
        ] }, N);
      }) })
    ] });
  }
  let s = a.climate[e];
  return s ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      kn,
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
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function Ni({ v: e }) {
  if (!e) return null;
  let { Icon: a, label: n, tone: i } = ea(e.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ t(a, { size: 14, color: i, "aria-hidden": "true" }),
    Wt(e.t),
    e.pop != null && e.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      e.pop,
      "%"
    ] })
  ] });
}
var ve = 56;
function Ci({ items: e, isToday: a, onEdit: n, members: i, onAddAt: s }) {
  let [g, d] = j(null), [c, r] = j(() => {
    let l = /* @__PURE__ */ new Date();
    return l.getHours() * 60 + l.getMinutes();
  });
  K(() => {
    if (!a) return;
    let l = setInterval(() => {
      let A = /* @__PURE__ */ new Date();
      r(A.getHours() * 60 + A.getMinutes());
    }, 6e4);
    return () => clearInterval(l);
  }, [a]);
  let x = e.filter((l) => l.time).map((l) => ({ ...l, ...pe(l) })).sort((l, A) => l.s - A.s || l.e - A.e), N = [], E = [], u = -1;
  x.forEach((l) => {
    E.length && l.s >= u && (N.push(E), E = [], u = -1), E.push(l), u = Math.max(u, l.e);
  }), E.length && N.push(E);
  let I = [];
  N.forEach((l) => {
    let A = [];
    l.forEach((z) => {
      let C = A.findIndex((f) => f <= z.s);
      C === -1 ? (C = A.length, A.push(z.e)) : A[C] = z.e, I.push({ ...z, col: C, cl: l });
    }), l.ncol = A.length;
  });
  let p = x.length ? Math.min(8, Math.floor(x[0].s / 60)) : 8, k = x.length ? Math.max(21, Math.ceil(Math.max(...x.map((l) => l.e)) / 60)) : 21, w = (l) => {
    let A = l.currentTarget.getBoundingClientRect(), z = p * 60 + (l.clientY - A.top) / ve * 60;
    return Math.max(p * 60, Math.min(Math.floor(z / 30) * 30, k * 60 - 30, 23 * 60 + 30));
  }, v = Array.from({ length: k - p + 1 }, (l, A) => p + A), M = (l) => (l - p * 60) / 60 * ve, m = e.length - x.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (k - p) * ve + 14 }, children: [
      v.map((l) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: M(l * 60) }, children: /* @__PURE__ */ o("span", { children: [
        ot(l % 24),
        ":00"
      ] }) }, l)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (l) => {
            l.target.closest(".jt-tt-block") || !s || s(Kt(w(l)));
          },
          onPointerMove: (l) => {
            if (l.pointerType !== "mouse" || l.target.closest(".jt-tt-block")) return d(null);
            d(w(l));
          },
          onPointerLeave: () => d(null),
          children: [
            g != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: M(g) + 1, height: ve / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Kt(g),
              " 일정 추가"
            ] }),
            I.map((l) => {
              let A = l.cl.ncol, z = Math.max(24, M(l.e) - M(l.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (z < 44 ? " short" : "") + (A > 1 ? " clash" : ""),
                  style: {
                    top: M(l.s) + 1,
                    height: z,
                    left: `calc(${l.col / A * 100}% + 2px)`,
                    width: `calc(${100 / A}% - 4px)`
                  },
                  onClick: () => n(l),
                  "aria-label": `${l.time} ${l.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: l.title }),
                    /* @__PURE__ */ o("span", { children: [
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
      a && c >= p * 60 && c <= k * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: M(c) }, "aria-label": `지금 ${Kt(c)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      m > 0 ? ` 시간을 정하지 않은 일정 ${m}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function zi({ settings: e, schedule: a, day: n, setDay: i, onEdit: s, onAddAt: g, me: d, onComment: c, onDelComment: r, onReact: x }) {
  let [N, E, u] = yn(), [I, p] = j(null), { start: k, days: w, members: v } = e, M = q[n % q.length], m = a.filter((f) => f.day === n).sort((f, B) => (f.time || "99:99").localeCompare(B.time || "99:99")), l = Zo(m), A = dt(ft(k, n)), z = A === dt(/* @__PURE__ */ new Date()), C = wi(k, w);
  return /* @__PURE__ */ o("section", { style: { "--lc": M }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: w }, (f, B) => {
      let D = ft(k, B), y = B === n, L = a.filter((W) => W.day === B).length, S = dt(D) === dt(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": y,
          "aria-label": `DAY ${B + 1}, ${D.getMonth() + 1}월 ${D.getDate()}일 ${Mt(D)}요일, 일정 ${L}개`,
          className: "jt-day" + (y ? " active" : ""),
          style: { "--lc": q[B % q.length] },
          onClick: () => i(B),
          children: [
            /* @__PURE__ */ o("span", { className: "jt-day-no", children: [
              "DAY ",
              B + 1
            ] }),
            S && /* @__PURE__ */ t("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ o("span", { className: "jt-day-date", children: [
              $t(D),
              " ",
              /* @__PURE__ */ t("em", { children: Mt(D) })
            ] }),
            /* @__PURE__ */ t("span", { className: "jt-day-count", children: L ? `일정 ${L}개` : "일정 없음" })
          ]
        },
        B
      );
    }) }),
    /* @__PURE__ */ t(ki, { date: A, w: C }),
    m.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ t(vn, { ids: m.map((f) => f.id), open: N, setAll: u }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: m.map((f, B) => {
        let D = f.time ? pe(f) : null, y = m[B + 1], L = y && Ne(y);
        return /* @__PURE__ */ o("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: f.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ o("div", { className: "jt-card" + (N[f.id] ? " open" : ""), children: [
            /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => E(f.id), "aria-expanded": !!N[f.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: f.title }),
              /* @__PURE__ */ t(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            N[f.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
              f.time && C.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(Ni, { v: C.hourly[`${A}T${f.time.slice(0, 2)}`] }) }),
              D && f.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                f.time,
                "~",
                f.end,
                ", ",
                bn(D.e - D.s)
              ] }),
              l.has(f.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              f.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(Et, { size: 13 }),
                f.place
              ] }),
              f.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: f.memo }),
              (f.place || f.link || at(f)) && /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt(f), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ t(Bt, { size: 14 }),
                  "구글맵"
                ] }),
                (f.place || at(f)) && /* @__PURE__ */ o(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: ze(at(f) ? f : { name: f.place, placeId: f.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ t(At, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              L && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-next",
                  href: Qo(f, y),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (S) => S.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(At, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: y.title }),
                      "까지 길 찾기",
                      Ne(f) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(pt, { name: f.by, members: v, size: 16 }),
                  f.by
                ] }),
                /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(f), children: [
                  /* @__PURE__ */ t(Xt, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Ee, { item: f, me: d, members: v, onReact: (S) => x(f.id, S) }),
                /* @__PURE__ */ t(
                  ca,
                  {
                    count: (f.comments || []).length,
                    open: I === f.id,
                    onClick: () => p(I === f.id ? null : f.id)
                  }
                )
              ] }),
              I === f.id && /* @__PURE__ */ t(
                Ae,
                {
                  comments: f.comments || [],
                  me: d,
                  members: v,
                  onAdd: (S) => c(f.id, S),
                  onDelete: (S) => r(f.id, S)
                }
              )
            ] })
          ] })
        ] }, f.id);
      }) })
    ] }),
    /* @__PURE__ */ t(Ci, { items: m, isToday: z, onEdit: s, members: v, onAddAt: (f) => g && g(n, f) })
  ] });
}
function Ei({ view: e, setView: a, pins: n, temp: i, selectedId: s, onTap: g, onPinTap: d }) {
  let c = J(null), [r, x] = j({ w: 0, h: 0 }), N = J(/* @__PURE__ */ new Map()), E = J({ moved: !1, startDist: 0 }), u = J(0), [I, p] = j({ ok: 0, bad: 0 });
  K(() => {
    let y = c.current;
    if (!y) return;
    let L = () => x({ w: y.clientWidth, h: y.clientHeight });
    L();
    let S = new ResizeObserver(L);
    return S.observe(y), () => S.disconnect();
  }, []);
  let k = e.z, w = Ge(e.lat, e.lng, k), v = w.x - r.w / 2, M = w.y - r.h / 2, m = 2 ** k, l = [];
  if (r.w) {
    let y = Math.floor(v / kt), L = Math.floor((v + r.w) / kt), S = Math.max(0, Math.floor(M / kt)), W = Math.min(m - 1, Math.floor((M + r.h) / kt));
    for (let G = y; G <= L; G++)
      for (let R = S; R <= W; R++) {
        let h = (G % m + m) % m;
        l.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${k}/${h}/${R}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => p((H) => H.ok ? H : { ...H, ok: 1 }),
              onError: () => p((H) => H.bad ? H : { ...H, bad: 1 }),
              style: { left: Math.round(G * kt - v), top: Math.round(R * kt - M) }
            },
            `${k}/${G}/${R}`
          )
        );
      }
  }
  let A = (y) => {
    if (!y.target.closest("[data-pin],.jt-zoom,.jt-attr") && (c.current.setPointerCapture(y.pointerId), N.current.set(y.pointerId, { x: y.clientX, y: y.clientY }), N.current.size === 1 && (E.current = { moved: !1, startDist: 0 }), N.current.size === 2)) {
      let [L, S] = [...N.current.values()];
      E.current.startDist = Math.hypot(L.x - S.x, L.y - S.y), E.current.moved = !0;
    }
  }, z = (y) => {
    let L = N.current.get(y.pointerId);
    if (!L) return;
    let S = y.clientX - L.x, W = y.clientY - L.y;
    if (N.current.size === 1) {
      if (!E.current.moved && Math.hypot(S, W) < 4) return;
      E.current.moved = !0, N.current.set(y.pointerId, { x: y.clientX, y: y.clientY }), a((G) => {
        let R = Ge(G.lat, G.lng, G.z), h = Ha(R.x - S, R.y - W, G.z);
        return { ...G, lat: Math.max(-80, Math.min(80, h.lat)), lng: h.lng };
      });
    } else
      N.current.set(y.pointerId, { x: y.clientX, y: y.clientY });
  }, C = (y) => {
    let L = N.current.get(y.pointerId);
    if (!L) return;
    let S = N.current.size === 1;
    if (N.current.delete(y.pointerId), E.current.startDist && N.current.size === 1) {
      let [W] = [...N.current.values()], G = Math.hypot(L.x - W.x, L.y - W.y) / E.current.startDist;
      G > 1.35 ? a((R) => ({ ...R, z: oe(R.z + (G > 2.6 ? 2 : 1)) })) : G < 0.7 && a((R) => ({ ...R, z: oe(R.z - (G < 0.38 ? 2 : 1)) })), E.current.startDist = 0;
    }
    if (S && !E.current.moved && y.type === "pointerup") {
      let W = c.current.getBoundingClientRect(), G = Ha(v + (y.clientX - W.left), M + (y.clientY - W.top), k);
      g(G.lat, G.lng);
    }
  }, f = (y) => {
    let L = Date.now();
    L - u.current < 250 || (u.current = L, a((S) => ({ ...S, z: oe(S.z + (y.deltaY < 0 ? 1 : -1)) })));
  }, B = (y, L) => {
    let S = Ge(y, L, k);
    return { left: S.x - v, top: S.y - M };
  }, D = (y) => y.left > -40 && y.left < r.w + 40 && y.top > -50 && y.top < r.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: c,
      onPointerDown: A,
      onPointerMove: z,
      onPointerUp: C,
      onPointerCancel: C,
      onWheel: f,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        l,
        I.bad > 0 && I.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        r.w > 0 && n.map((y) => {
          let L = B(y.lat, y.lng);
          return D(L) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (y.id === s ? " sel" : ""),
              style: { left: L.left, top: L.top, "--pc": y.color },
              onClick: () => d(y.id),
              "aria-label": y.label,
              children: /* @__PURE__ */ t("i", {})
            },
            y.id
          ) : null;
        }),
        r.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: B(i.lat, i.lng).left, top: B(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((y) => ({ ...y, z: oe(y.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((y) => ({ ...y, z: oe(y.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var an = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Ai = "https://tiles.openfreemap.org/styles/liberty", ie = null;
function Mi() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : ie || (ie = new Promise((e, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = an + "maplibre-gl.css", document.head.appendChild(n);
    let i = document.createElement("script");
    i.src = an + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : a(new Error("maplibre")), i.onerror = () => {
      ie = null, a(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), ie);
}
var Si = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Ii(e) {
  (e.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        e.setLayoutProperty(a.id, "text-field", Si);
      } catch {
      }
  });
}
var Fi = (e) => String(e).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), aa = (e, a, n) => {
  let i = a ? 34 : 28, s = a ? 44 : 36, g = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${Fi(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${g}</svg>`;
};
function Nn(e) {
  let { view: a, setView: n, pins: i, temp: s, selectedId: g, onTap: d, onPinTap: c } = e, r = J(null), x = J(null), N = J(null), E = J([]), u = J(null), I = J({});
  I.current = { onTap: d, onPinTap: c, setView: n };
  let [p, k] = j("loading");
  return K(() => {
    let w = !0;
    return Mi().then((v) => {
      if (!w || !r.current) return;
      N.current = v;
      let M = new v.Map({
        container: r.current,
        style: Ai,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      M.touchZoomRotate.disableRotation(), M.addControl(new v.NavigationControl({ showCompass: !1 }), "top-right"), M.on("load", () => {
        Ii(M), w && k("ok");
      }), M.on("click", (m) => {
        m.originalEvent && m.originalEvent.target.closest && m.originalEvent.target.closest(".jt-mlpin") || I.current.onTap(m.lngLat.lat, m.lngLat.lng);
      }), M.on("moveend", () => {
        let m = M.getCenter();
        I.current.setView({ lat: m.lat, lng: m.lng, z: M.getZoom() + 1 });
      }), x.current = M, setTimeout(() => w && !M.loaded() && k((m) => m === "loading" ? "slow" : m), 6e3), setTimeout(() => {
        w && x.current === M && !M.loaded() && (M.remove(), x.current = null, k("fail"));
      }, 15e3);
    }).catch(() => w && k("fail")), () => {
      w = !1, x.current && x.current.remove(), x.current = null;
    };
  }, []), K(() => {
    let w = x.current;
    if (!w) return;
    let v = w.getCenter();
    (Math.abs(v.lat - a.lat) > 1e-6 || Math.abs(v.lng - a.lng) > 1e-6 || Math.abs(w.getZoom() + 1 - a.z) > 0.01) && w.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), K(() => {
    let w = x.current, v = N.current;
    !w || !v || (E.current.forEach((M) => M.remove()), E.current = i.map((M) => {
      let m = document.createElement("button");
      return m.type = "button", m.className = "jt-mlpin" + (M.id === g ? " sel" : ""), m.setAttribute("aria-label", M.label), m.innerHTML = aa(M.color, M.id === g, M.text), m.addEventListener("click", (l) => {
        l.stopPropagation(), I.current.onPinTap(M.id);
      }), new v.Marker({ element: m, anchor: "bottom" }).setLngLat([M.lng, M.lat]).addTo(w);
    }));
  }, [i, g, p]), K(() => {
    let w = x.current, v = N.current;
    if (u.current && u.current.remove(), u.current = null, !w || !v || !s) return;
    let M = document.createElement("div");
    M.className = "jt-mlpin temp", M.innerHTML = aa("#14213D", !0), u.current = new v.Marker({ element: M, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(w);
  }, [s, p]), p === "fail" ? /* @__PURE__ */ t(Ei, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: r, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (p === "loading" || p === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: p === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var se = null, re = "", Tt = !1, na = /* @__PURE__ */ new Set();
function pa(e) {
  return Tt ? Promise.reject(new Error("auth")) : se && re === e ? se : re && re !== e ? Promise.reject(new Error("reload")) : (re = e, se = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      Tt = !0, na.forEach((s) => s()), n(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      se = null, re = "", n(new Error("load"));
    }, document.head.appendChild(i);
  }), se);
}
function Di(e) {
  let { view: a, setView: n, pins: i, temp: s, selectedId: g, onTap: d, onPinTap: c, onPoi: r, gkey: x } = e, N = J(null), E = J(null), u = J(null), I = J([]), p = J(null), k = J({});
  k.current = { onTap: d, onPinTap: c, onPoi: r, setView: n };
  let [w, v] = j(Tt ? "fail" : "loading");
  K(() => {
    let m = !0, l = () => m && v("fail");
    return na.add(l), pa(x).then(async (A) => {
      let { Map: z } = await A.importLibrary("maps"), { Marker: C } = await A.importLibrary("marker"), { Size: f, Point: B } = await A.importLibrary("core");
      if (!m || !N.current) return;
      u.current = { Marker: C, Size: f, Point: B };
      let D = new z(N.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      D.addListener("click", async (y) => {
        if (y.placeId) {
          y.stop();
          try {
            let { Place: L } = await A.importLibrary("places"), S = new L({ id: y.placeId });
            await S.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), k.current.onPoi({
              name: S.displayName || "",
              lat: S.location.lat(),
              lng: S.location.lng(),
              area: S.formattedAddress || "",
              link: S.googleMapsURI || "",
              placeId: y.placeId
            });
            return;
          } catch {
          }
        }
        k.current.onTap(y.latLng.lat(), y.latLng.lng());
      }), D.addListener("idle", () => {
        let y = D.getCenter();
        k.current.setView({ lat: y.lat(), lng: y.lng(), z: D.getZoom() });
      }), E.current = D, v("ok");
    }).catch(() => m && v("fail")), () => {
      m = !1, na.delete(l);
    };
  }, [x]), K(() => {
    let m = E.current;
    if (!m) return;
    let l = m.getCenter();
    (Math.abs(l.lat() - a.lat) > 1e-6 || Math.abs(l.lng() - a.lng) > 1e-6) && m.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== m.getZoom() && m.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let M = (m, l, A) => {
    let z = u.current, C = l ? 34 : 28, f = l ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(aa(m, l, A).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new z.Size(C, f),
      anchor: new z.Point(C / 2, f)
    };
  };
  return K(() => {
    let m = E.current, l = u.current;
    !m || !l || (I.current.forEach((A) => A.setMap(null)), I.current = i.map((A) => {
      let z = new l.Marker({ position: { lat: A.lat, lng: A.lng }, map: m, title: A.label, icon: M(A.color, A.id === g, A.text), zIndex: A.id === g ? 10 : 1 });
      return z.addListener("click", () => k.current.onPinTap(A.id)), z;
    }));
  }, [i, g, w]), K(() => {
    let m = E.current, l = u.current;
    p.current && p.current.setMap(null), p.current = null, !(!m || !l || !s) && (p.current = new l.Marker({ position: { lat: s.lat, lng: s.lng }, map: m, icon: M("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, w]), w === "fail" ? /* @__PURE__ */ t(Nn, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: N, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    w === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Cn(e) {
  return e.gkey && !Tt ? /* @__PURE__ */ t(Di, { ...e }) : /* @__PURE__ */ t(Nn, { ...e });
}
var nn = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Pi = [500, 1e3, 2e3], Ve = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function Jt(e, a) {
  let n = (d) => d * Math.PI / 180, i = n(a.lat - e.lat), s = n(a.lng - e.lng), g = Math.sin(i / 2) ** 2 + Math.cos(n(e.lat)) * Math.cos(n(a.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(g));
}
var zn = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function $i(e, a, n, i) {
  let s = await pa(e), { Place: g, SearchNearbyRankPreference: d } = await s.importLibrary("places"), { places: c } = await g.searchNearby({
    fields: [
      "id",
      "displayName",
      "location",
      "formattedAddress",
      "rating",
