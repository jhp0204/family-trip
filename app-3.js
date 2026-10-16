}, v = Array.from({ length: z - h + 1 }, (s, E) => h + E), M = (s) => (s - h * 60) / 60 * ve, c = e.length - x.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (z - h) * ve + 14 }, children: [
      v.map((s) => /* @__PURE__ */ t("div", { className: "jt-tt-hour", style: { top: M(s * 60) }, children: /* @__PURE__ */ o("span", { children: [
        at(s % 24),
        ":00"
      ] }) }, s)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (s) => {
            s.target.closest(".jt-tt-block") || !r || r(Ut(C(s)));
          },
          onPointerMove: (s) => {
            if (s.pointerType !== "mouse" || s.target.closest(".jt-tt-block")) return u(null);
            u(C(s));
          },
          onPointerLeave: () => u(null),
          children: [
            g != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: M(g) + 1, height: ve / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Ut(g),
              " 일정 추가"
            ] }),
            A.map((s) => {
              let E = s.cl.ncol, k = Math.max(24, M(s.e) - M(s.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (k < 44 ? " short" : "") + (E > 1 ? " clash" : ""),
                  style: {
                    top: M(s.s) + 1,
                    height: k,
                    left: `calc(${s.col / E * 100}% + 2px)`,
                    width: `calc(${100 / E}% - 4px)`
                  },
                  onClick: () => n(s),
                  "aria-label": `${s.time} ${s.title} 고치기`,
                  children: [
                    /* @__PURE__ */ t("strong", { children: s.title }),
                    /* @__PURE__ */ o("span", { children: [
                      Ut(s.s),
                      "~",
                      Ut(s.e % (24 * 60)),
                      s.place ? `, ${s.place}` : ""
                    ] })
                  ]
                },
                s.id
              );
            })
          ]
        }
      ),
      a && p >= h * 60 && p <= z * 60 && /* @__PURE__ */ t("div", { className: "jt-tt-now", style: { top: M(p) }, "aria-label": `지금 ${Ut(p)}`, children: /* @__PURE__ */ t("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      c > 0 ? ` 시간을 정하지 않은 일정 ${c}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function xi({ settings: e, schedule: a, day: n, setDay: i, onEdit: r, onAddAt: g, me: u, onComment: p, onDelComment: l, onReact: x }) {
  let [w, N, d] = hn(), [A, h] = y(null), { start: z, days: C, members: v } = e, M = q[n % q.length], c = a.filter((m) => m.day === n).sort((m, T) => (m.time || "99:99").localeCompare(T.time || "99:99")), s = Vo(c), E = ct(mt(z, n)), k = E === ct(/* @__PURE__ */ new Date()), S = fi(z, C);
  return /* @__PURE__ */ o("section", { style: { "--lc": M }, children: [
    /* @__PURE__ */ t("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: C }, (m, T) => {
      let D = mt(z, T), j = T === n, L = a.filter((U) => U.day === T).length, f = ct(D) === ct(/* @__PURE__ */ new Date());
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": j,
          "aria-label": `DAY ${T + 1}, ${D.getMonth() + 1}월 ${D.getDate()}일 ${zt(D)}요일, 일정 ${L}개`,
          className: "jt-day" + (j ? " active" : ""),
          style: { "--lc": q[T % q.length] },
          onClick: () => i(T),
          children: [
            /* @__PURE__ */ o("span", { className: "jt-day-no", children: [
              "DAY ",
              T + 1
            ] }),
            f && /* @__PURE__ */ t("i", { className: "jt-day-today", children: "오늘" }),
            /* @__PURE__ */ o("span", { className: "jt-day-date", children: [
              Pt(D),
              " ",
              /* @__PURE__ */ t("em", { children: zt(D) })
            ] }),
            /* @__PURE__ */ t("span", { className: "jt-day-count", children: L ? `일정 ${L}개` : "일정 없음" })
          ]
        },
        T
      );
    }) }),
    /* @__PURE__ */ t(gi, { date: E, w: S }),
    c.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ t("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ t(xn, { ids: c.map((m) => m.id), open: w, setAll: d }),
      /* @__PURE__ */ t("ol", { className: "jt-line", children: c.map((m, T) => {
        let D = m.time ? ce(m) : null, j = c[T + 1], L = j && Ne(j);
        return /* @__PURE__ */ o("li", { className: "jt-row", children: [
          /* @__PURE__ */ t("div", { className: "jt-time", children: m.time || "미정" }),
          /* @__PURE__ */ t("div", { className: "jt-rail", children: /* @__PURE__ */ t("span", { className: "jt-node" }) }),
          /* @__PURE__ */ o("div", { className: "jt-card" + (w[m.id] ? " open" : ""), children: [
            /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => N(m.id), "aria-expanded": !!w[m.id], children: [
              /* @__PURE__ */ t("span", { className: "jt-card-title", children: m.title }),
              /* @__PURE__ */ t(kt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
            ] }),
            w[m.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
              m.time && S.status === "ok" && /* @__PURE__ */ t("div", { className: "jt-fold-wx", children: /* @__PURE__ */ t(bi, { v: S.hourly[`${E}T${m.time.slice(0, 2)}`] }) }),
              D && m.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                m.time,
                "~",
                m.end,
                ", ",
                fn(D.e - D.s)
              ] }),
              s.has(m.id) && /* @__PURE__ */ t("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              m.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ t(It, { size: 13 }),
                m.place
              ] }),
              m.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: m.memo }),
              (m.place || m.link || ut(m)) && /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
                /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t(m), target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ t(Rt, { size: 14 }),
                  "구글맵"
                ] }),
                (m.place || ut(m)) && /* @__PURE__ */ o(
                  "a",
                  {
                    className: "jt-maplink route",
                    href: ze(ut(m) ? m : { name: m.place, placeId: m.placeId }),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ t(Ct, { size: 14 }),
                      "여기서 길 찾기"
                    ]
                  }
                )
              ] }),
              L && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-next",
                  href: Go(m, j),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (f) => f.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(Ct, { size: 14 }),
                    /* @__PURE__ */ o("span", { children: [
                      "다음 일정 ",
                      /* @__PURE__ */ t("b", { children: j.title }),
                      "까지 길 찾기",
                      Ne(m) ? "" : " (현재 위치에서)"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ t(lt, { name: m.by, members: v, size: 16 }),
                  m.by
                ] }),
                /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => r(m), children: [
                  /* @__PURE__ */ t(Xt, { size: 14 }),
                  "수정"
                ] }),
                /* @__PURE__ */ t(Ee, { item: m, me: u, members: v, onReact: (f) => x(m.id, f) }),
                /* @__PURE__ */ t(
                  la,
                  {
                    count: (m.comments || []).length,
                    open: A === m.id,
                    onClick: () => h(A === m.id ? null : m.id)
                  }
                )
              ] }),
              A === m.id && /* @__PURE__ */ t(
                Ae,
                {
                  comments: m.comments || [],
                  me: u,
                  members: v,
                  onAdd: (f) => p(m.id, f),
                  onDelete: (f) => l(m.id, f)
                }
              )
            ] })
          ] })
        ] }, m.id);
      }) })
    ] }),
    /* @__PURE__ */ t(hi, { items: c, isToday: k, onEdit: r, members: v, onAddAt: (m) => g && g(n, m) })
  ] });
}
function ji({ view: e, setView: a, pins: n, temp: i, selectedId: r, onTap: g, onPinTap: u }) {
  let p = J(null), [l, x] = y({ w: 0, h: 0 }), w = J(/* @__PURE__ */ new Map()), N = J({ moved: !1, startDist: 0 }), d = J(0), [A, h] = y({ ok: 0, bad: 0 });
  W(() => {
    let j = p.current;
    if (!j) return;
    let L = () => x({ w: j.clientWidth, h: j.clientHeight });
    L();
    let f = new ResizeObserver(L);
    return f.observe(j), () => f.disconnect();
  }, []);
  let z = e.z, C = Je(e.lat, e.lng, z), v = C.x - l.w / 2, M = C.y - l.h / 2, c = 2 ** z, s = [];
  if (l.w) {
    let j = Math.floor(v / wt), L = Math.floor((v + l.w) / wt), f = Math.max(0, Math.floor(M / wt)), U = Math.min(c - 1, Math.floor((M + l.h) / wt));
    for (let Y = j; Y <= L; Y++)
      for (let $ = f; $ <= U; $++) {
        let I = (Y % c + c) % c;
        s.push(
          /* @__PURE__ */ t(
            "img",
            {
              src: `https://tile.openstreetmap.org/${z}/${I}/${$}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => h((X) => X.ok ? X : { ...X, ok: 1 }),
              onError: () => h((X) => X.bad ? X : { ...X, bad: 1 }),
              style: { left: Math.round(Y * wt - v), top: Math.round($ * wt - M) }
            },
            `${z}/${Y}/${$}`
          )
        );
      }
  }
  let E = (j) => {
    if (!j.target.closest("[data-pin],.jt-zoom,.jt-attr") && (p.current.setPointerCapture(j.pointerId), w.current.set(j.pointerId, { x: j.clientX, y: j.clientY }), w.current.size === 1 && (N.current = { moved: !1, startDist: 0 }), w.current.size === 2)) {
      let [L, f] = [...w.current.values()];
      N.current.startDist = Math.hypot(L.x - f.x, L.y - f.y), N.current.moved = !0;
    }
  }, k = (j) => {
    let L = w.current.get(j.pointerId);
    if (!L) return;
    let f = j.clientX - L.x, U = j.clientY - L.y;
    if (w.current.size === 1) {
      if (!N.current.moved && Math.hypot(f, U) < 4) return;
      N.current.moved = !0, w.current.set(j.pointerId, { x: j.clientX, y: j.clientY }), a((Y) => {
        let $ = Je(Y.lat, Y.lng, Y.z), I = Wa($.x - f, $.y - U, Y.z);
        return { ...Y, lat: Math.max(-80, Math.min(80, I.lat)), lng: I.lng };
      });
    } else
      w.current.set(j.pointerId, { x: j.clientX, y: j.clientY });
  }, S = (j) => {
    let L = w.current.get(j.pointerId);
    if (!L) return;
    let f = w.current.size === 1;
    if (w.current.delete(j.pointerId), N.current.startDist && w.current.size === 1) {
      let [U] = [...w.current.values()], Y = Math.hypot(L.x - U.x, L.y - U.y) / N.current.startDist;
      Y > 1.35 ? a(($) => ({ ...$, z: ne($.z + (Y > 2.6 ? 2 : 1)) })) : Y < 0.7 && a(($) => ({ ...$, z: ne($.z - (Y < 0.38 ? 2 : 1)) })), N.current.startDist = 0;
    }
    if (f && !N.current.moved && j.type === "pointerup") {
      let U = p.current.getBoundingClientRect(), Y = Wa(v + (j.clientX - U.left), M + (j.clientY - U.top), z);
      g(Y.lat, Y.lng);
    }
  }, m = (j) => {
    let L = Date.now();
    L - d.current < 250 || (d.current = L, a((f) => ({ ...f, z: ne(f.z + (j.deltaY < 0 ? 1 : -1)) })));
  }, T = (j, L) => {
    let f = Je(j, L, z);
    return { left: f.x - v, top: f.y - M };
  }, D = (j) => j.left > -40 && j.left < l.w + 40 && j.top > -50 && j.top < l.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: p,
      onPointerDown: E,
      onPointerMove: k,
      onPointerUp: S,
      onPointerCancel: S,
      onWheel: m,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        s,
        A.bad > 0 && A.ok === 0 && /* @__PURE__ */ t("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        l.w > 0 && n.map((j) => {
          let L = T(j.lat, j.lng);
          return D(L) ? /* @__PURE__ */ t(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (j.id === r ? " sel" : ""),
              style: { left: L.left, top: L.top, "--pc": j.color },
              onClick: () => u(j.id),
              "aria-label": j.label,
              children: /* @__PURE__ */ t("i", {})
            },
            j.id
          ) : null;
        }),
        l.w > 0 && i && /* @__PURE__ */ t("span", { className: "jt-pin temp", style: { left: T(i.lat, i.lng).left, top: T(i.lat, i.lng).top }, children: /* @__PURE__ */ t("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((j) => ({ ...j, z: ne(j.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => a((j) => ({ ...j, z: ne(j.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ t("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Qa = "https://unpkg.com/maplibre-gl@4.7.1/dist/", yi = "https://tiles.openfreemap.org/styles/liberty", oe = null;
function vi() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : oe || (oe = new Promise((e, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = Qa + "maplibre-gl.css", document.head.appendChild(n);
    let i = document.createElement("script");
    i.src = Qa + "maplibre-gl.js", i.onload = () => window.maplibregl ? e(window.maplibregl) : a(new Error("maplibre")), i.onerror = () => {
      oe = null, a(new Error("maplibre"));
    }, document.head.appendChild(i);
  }), oe);
}
var wi = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function ki(e) {
  (e.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        e.setLayoutProperty(a.id, "text-field", wi);
      } catch {
      }
  });
}
var Ni = (e) => String(e).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), ea = (e, a, n) => {
  let i = a ? 34 : 28, r = a ? 44 : 36, g = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${e}" font-family="sans-serif">${Ni(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${i}" height="${r}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${e}" stroke="#fff" stroke-width="1.5"/>${g}</svg>`;
};
function vn(e) {
  let { view: a, setView: n, pins: i, temp: r, selectedId: g, onTap: u, onPinTap: p } = e, l = J(null), x = J(null), w = J(null), N = J([]), d = J(null), A = J({});
  A.current = { onTap: u, onPinTap: p, setView: n };
  let [h, z] = y("loading");
  return W(() => {
    let C = !0;
    return vi().then((v) => {
      if (!C || !l.current) return;
      w.current = v;
      let M = new v.Map({
        container: l.current,
        style: yi,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      M.touchZoomRotate.disableRotation(), M.addControl(new v.NavigationControl({ showCompass: !1 }), "top-right"), M.on("load", () => {
        ki(M), C && z("ok");
      }), M.on("click", (c) => {
        c.originalEvent && c.originalEvent.target.closest && c.originalEvent.target.closest(".jt-mlpin") || A.current.onTap(c.lngLat.lat, c.lngLat.lng);
      }), M.on("moveend", () => {
        let c = M.getCenter();
        A.current.setView({ lat: c.lat, lng: c.lng, z: M.getZoom() + 1 });
      }), x.current = M, setTimeout(() => C && !M.loaded() && z((c) => c === "loading" ? "slow" : c), 6e3), setTimeout(() => {
        C && x.current === M && !M.loaded() && (M.remove(), x.current = null, z("fail"));
      }, 15e3);
    }).catch(() => C && z("fail")), () => {
      C = !1, x.current && x.current.remove(), x.current = null;
    };
  }, []), W(() => {
    let C = x.current;
    if (!C) return;
    let v = C.getCenter();
    (Math.abs(v.lat - a.lat) > 1e-6 || Math.abs(v.lng - a.lng) > 1e-6 || Math.abs(C.getZoom() + 1 - a.z) > 0.01) && C.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), W(() => {
    let C = x.current, v = w.current;
    !C || !v || (N.current.forEach((M) => M.remove()), N.current = i.map((M) => {
      let c = document.createElement("button");
      return c.type = "button", c.className = "jt-mlpin" + (M.id === g ? " sel" : ""), c.setAttribute("aria-label", M.label), c.innerHTML = ea(M.color, M.id === g, M.text), c.addEventListener("click", (s) => {
        s.stopPropagation(), A.current.onPinTap(M.id);
      }), new v.Marker({ element: c, anchor: "bottom" }).setLngLat([M.lng, M.lat]).addTo(C);
    }));
  }, [i, g, h]), W(() => {
    let C = x.current, v = w.current;
    if (d.current && d.current.remove(), d.current = null, !C || !v || !r) return;
    let M = document.createElement("div");
    M.className = "jt-mlpin temp", M.innerHTML = ea("#14213D", !0), d.current = new v.Marker({ element: M, anchor: "bottom" }).setLngLat([r.lng, r.lat]).addTo(C);
  }, [r, h]), h === "fail" ? /* @__PURE__ */ t(ji, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: l, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (h === "loading" || h === "slow") && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: h === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var ie = null, re = "", Yt = !1, aa = /* @__PURE__ */ new Set();
function ca(e) {
  return Yt ? Promise.reject(new Error("auth")) : ie && re === e ? ie : re && re !== e ? Promise.reject(new Error("reload")) : (re = e, ie = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      Yt = !0, aa.forEach((r) => r()), n(new Error("auth"));
    };
    let i = document.createElement("script");
    i.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(e) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", i.async = !0, i.onerror = () => {
      ie = null, re = "", n(new Error("load"));
    }, document.head.appendChild(i);
  }), ie);
}
function Ci(e) {
  let { view: a, setView: n, pins: i, temp: r, selectedId: g, onTap: u, onPinTap: p, onPoi: l, gkey: x } = e, w = J(null), N = J(null), d = J(null), A = J([]), h = J(null), z = J({});
  z.current = { onTap: u, onPinTap: p, onPoi: l, setView: n };
  let [C, v] = y(Yt ? "fail" : "loading");
  W(() => {
    let c = !0, s = () => c && v("fail");
    return aa.add(s), ca(x).then(async (E) => {
      let { Map: k } = await E.importLibrary("maps"), { Marker: S } = await E.importLibrary("marker"), { Size: m, Point: T } = await E.importLibrary("core");
      if (!c || !w.current) return;
      d.current = { Marker: S, Size: m, Point: T };
      let D = new k(w.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      D.addListener("click", async (j) => {
        if (j.placeId) {
          j.stop();
          try {
            let { Place: L } = await E.importLibrary("places"), f = new L({ id: j.placeId });
            await f.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), z.current.onPoi({
              name: f.displayName || "",
              lat: f.location.lat(),
              lng: f.location.lng(),
              area: f.formattedAddress || "",
              link: f.googleMapsURI || "",
              placeId: j.placeId
            });
            return;
          } catch {
          }
        }
        z.current.onTap(j.latLng.lat(), j.latLng.lng());
      }), D.addListener("idle", () => {
        let j = D.getCenter();
        z.current.setView({ lat: j.lat(), lng: j.lng(), z: D.getZoom() });
      }), N.current = D, v("ok");
    }).catch(() => c && v("fail")), () => {
      c = !1, aa.delete(s);
    };
  }, [x]), W(() => {
    let c = N.current;
    if (!c) return;
    let s = c.getCenter();
    (Math.abs(s.lat() - a.lat) > 1e-6 || Math.abs(s.lng() - a.lng) > 1e-6) && c.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== c.getZoom() && c.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let M = (c, s, E) => {
    let k = d.current, S = s ? 34 : 28, m = s ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(ea(c, s, E).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new k.Size(S, m),
      anchor: new k.Point(S / 2, m)
    };
  };
  return W(() => {
    let c = N.current, s = d.current;
    !c || !s || (A.current.forEach((E) => E.setMap(null)), A.current = i.map((E) => {
      let k = new s.Marker({ position: { lat: E.lat, lng: E.lng }, map: c, title: E.label, icon: M(E.color, E.id === g, E.text), zIndex: E.id === g ? 10 : 1 });
      return k.addListener("click", () => z.current.onPinTap(E.id)), k;
    }));
  }, [i, g, C]), W(() => {
    let c = N.current, s = d.current;
    h.current && h.current.setMap(null), h.current = null, !(!c || !s || !r) && (h.current = new s.Marker({ position: { lat: r.lat, lng: r.lng }, map: c, icon: M("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [r, C]), C === "fail" ? /* @__PURE__ */ t(vn, { ...e }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ t("div", { ref: w, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    C === "loading" && /* @__PURE__ */ t("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function wn(e) {
  return e.gkey && !Yt ? /* @__PURE__ */ t(Ci, { ...e }) : /* @__PURE__ */ t(vn, { ...e });
}
var tn = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], zi = [500, 1e3, 2e3], Ve = (e) => e >= 1e3 ? e / 1e3 + "km" : e + "m";
function pe(e, a) {
  let n = (u) => u * Math.PI / 180, i = n(a.lat - e.lat), r = n(a.lng - e.lng), g = Math.sin(i / 2) ** 2 + Math.cos(n(e.lat)) * Math.cos(n(a.lat)) * Math.sin(r / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(g));
}
var kn = (e) => (e < 1e3 ? `${Math.round(e / 10) * 10}m` : `${(e / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(e / 75))}분`;
async function Ei(e, a, n, i) {
  let r = await ca(e), { Place: g, SearchNearbyRankPreference: u } = await r.importLibrary("places"), { places: p } = await g.searchNearby({
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
    rankPreference: u.POPULARITY,
    language: "ko"
  }), l = [];
  for (let x of p || []) {
    let w;
    try {
      w = x.regularOpeningHours ? await x.isOpen() : void 0;
    } catch {
      w = void 0;
    }
    l.push({
      id: x.id,
      placeId: x.id,
      name: x.displayName,
      lat: x.location.lat(),
      lng: x.location.lng(),
      type: x.primaryTypeDisplayName || n.label,
      rating: x.rating,
      count: x.userRatingCount,
      addr: x.formattedAddress || "",
      url: x.googleMapsURI || "",
      open: w
    });
  }
  return l;
}
async function Ai(e, a, n) {
  let i = `[out:json][timeout:20];nwr(around:${n},${e.lat},${e.lng})${a.osm}["name"];out center 40;`, r = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(i));
  if (!r.ok) throw new Error("osm");
  return ((await r.json()).elements || []).map((u) => {
    let p = u.tags || {}, l = p["name:ko"] || p["name:en"] || "";
    return {
      id: "osm" + u.type + u.id,
      name: l || p.name,
      sub: l && p.name && p.name !== l ? p.name : "",
      lat: u.lat != null ? u.lat : u.center && u.center.lat,
      lng: u.lon != null ? u.lon : u.center && u.center.lon,
      type: a.label,
      addr: ""
    };
  }).filter((u) => u.lat && u.name);
}
async function Nn(e, a, n) {
  let i = n || { lat: ht.lat, lng: ht.lng };
  if (a && !Yt)
    try {
      let u = await ca(a), { Place: p } = await u.importLibrary("places"), { places: l } = await p.searchText({
        textQuery: e,
        fields: ["id", "displayName", "location", "formattedAddress", "googleMapsURI"],
        language: "ko",
        maxResultCount: 6,
        locationBias: i
      });
      if (l && l.length)
        return l.map((x) => ({
          name: x.displayName,
          area: x.formattedAddress || "",
          lat: x.location.lat(),
          lng: x.location.lng(),
          link: x.googleMapsURI || "",
          placeId: x.id
        }));
    } catch {
    }
  let r = await fetch(
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(e)
  );
  if (!r.ok) throw new Error("search");
  return (await r.json()).map((u) => {
    let p = String(u.display_name || "").split(",").map((l) => l.trim());
    return { name: u.name || p[0] || e, area: p.slice(1, 3).join(" "), lat: Number(u.lat), lng: Number(u.lon), link: "" };
  });
}
function Mi({ settings: e, wish: a, onSave: n }) {
  let [i, r] = y(tn[0]), [g, u] = y(1e3), [p, l] = y(null), [x, w] = y(""), [N, d] = y([]), [A, h] = y(!1), [z, C] = y(""), [v, M] = y(""), [c, s] = y({}), E = () => {
    l({ lat: ht.lat, lng: ht.lng, here: !1, at: Date.now() }), w("현재 위치를 쓸 수 없어서 오사카 시내 기준으로 보여 드려요. 휴대폰에서 위치 권한을 허용하면 내 위치 기준으로 바뀌어요.");
  }, k = () => {
    if (w("현재 위치를 찾는 중"), !navigator.geolocation) return E();
    navigator.geolocation.getCurrentPosition(
      (m) => {
        l({ lat: m.coords.latitude, lng: m.coords.longitude, here: !0, at: Date.now() }), w("");
      },
      E,
      { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
    );
  };
  W(() => {
    k();
  }, []), W(() => {
    if (!p) return;
    let m = !0;
    return (async () => {
      h(!0), C("");
      let T = null, D = "";
      if (e.gmapsKey && !Yt)
        try {
          T = await Ei(e.gmapsKey, { lat: p.lat, lng: p.lng }, i, g), D = "google";
        } catch {
          T = null;
        }
      if (!T)
        try {
          T = await Ai(p, i, g), D = "osm";
        } catch {
          m && (d([]), C("주변 장소를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요."), h(!1));
          return;
        }
      T.forEach((j) => j.dist = pe(p, j)), D === "osm" && T.sort((j, L) => j.dist - L.dist), m && (d(T.slice(0, 20)), M(D), h(!1), T.length || C(`반경 ${Ve(g)} 안에서 찾지 못했어요. 범위를 넓혀 보세요.`));
