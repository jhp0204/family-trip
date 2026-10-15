},
            `${p}/${D}/${O}`
          )
        );
      }
  }
  let I = (v) => {
    if (!v.target.closest("[data-pin],.jt-zoom,.jt-attr") && (c.current.setPointerCapture(v.pointerId), d.current.set(v.pointerId, { x: v.clientX, y: v.clientY }), d.current.size === 1 && (g.current = { moved: !1, startDist: 0 }), d.current.size === 2)) {
      let [S, _] = [...d.current.values()];
      g.current.startDist = Math.hypot(S.x - _.x, S.y - _.y), g.current.moved = !0;
    }
  }, E = (v) => {
    let S = d.current.get(v.pointerId);
    if (!S) return;
    let _ = v.clientX - S.x, H = v.clientY - S.y;
    if (d.current.size === 1) {
      if (!g.current.moved && Math.hypot(_, H) < 4) return;
      g.current.moved = !0, d.current.set(v.pointerId, { x: v.clientX, y: v.clientY }), n((D) => {
        let O = qt(D.lat, D.lng, D.z), dt = ye(O.x - _, O.y - H, D.z);
        return { ...D, lat: Math.max(-80, Math.min(80, dt.lat)), lng: dt.lng };
      });
    } else
      d.current.set(v.pointerId, { x: v.clientX, y: v.clientY });
  }, K = (v) => {
    let S = d.current.get(v.pointerId);
    if (!S) return;
    let _ = d.current.size === 1;
    if (d.current.delete(v.pointerId), g.current.startDist && d.current.size === 1) {
      let [H] = [...d.current.values()], D = Math.hypot(S.x - H.x, S.y - H.y) / g.current.startDist;
      D > 1.35 ? n((O) => ({ ...O, z: kt(O.z + (D > 2.6 ? 2 : 1)) })) : D < 0.7 && n((O) => ({ ...O, z: kt(O.z - (D < 0.38 ? 2 : 1)) })), g.current.startDist = 0;
    }
    if (_ && !g.current.moved && v.type === "pointerup") {
      let H = c.current.getBoundingClientRect(), D = ye(m + (v.clientX - H.left), k + (v.clientY - H.top), p);
      u(D.lat, D.lng);
    }
  }, J = (v) => {
    let S = Date.now();
    S - s.current < 250 || (s.current = S, n((_) => ({ ..._, z: kt(_.z + (v.deltaY < 0 ? 1 : -1)) })));
  }, L = (v, S) => {
    let _ = qt(v, S, p);
    return { left: _.x - m, top: _.y - k };
  }, j = (v) => v.left > -40 && v.left < f.w + 40 && v.top > -50 && v.top < f.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: c,
      onPointerDown: I,
      onPointerMove: E,
      onPointerUp: K,
      onPointerCancel: K,
      onWheel: J,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        h,
        w.bad > 0 && w.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        f.w > 0 && a.map((v) => {
          let S = L(v.lat, v.lng);
          return j(S) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (v.id === l ? " sel" : ""),
              style: { left: S.left, top: S.top, "--pc": v.color },
              onClick: () => x(v.id),
              "aria-label": v.label,
              children: /* @__PURE__ */ e("i", {})
            },
            v.id
          ) : null;
        }),
        f.w > 0 && r && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: L(r.lat, r.lng).left, top: L(r.lat, r.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => n((v) => ({ ...v, z: kt(v.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => n((v) => ({ ...v, z: kt(v.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
function sn({ settings: t, wish: n, me: a, onSave: r, onLike: l, onPlan: u, onDelete: x }) {
  let c = n.filter(_t), [f, y] = N(
    () => c.length ? {
      lat: c.reduce((j, v) => j + v.lat, 0) / c.length,
      lng: c.reduce((j, v) => j + v.lng, 0) / c.length,
      z: c.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [d, g] = N(null), [s, w] = N(null), [b, p] = N(""), [i, m] = N([]), [k, F] = N(!1), [h, I] = N(""), E = n.find((j) => j.id === s), K = async () => {
    let j = b.trim();
    if (j) {
      F(!0), I(""), m([]);
      try {
        let v = await fetch(
          "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ko&countrycodes=jp&q=" + encodeURIComponent(j)
        );
        if (!v.ok) throw new Error("search failed");
        let S = await v.json();
        S.length || I("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), m(
          S.map((_) => {
            let H = String(_.display_name || "").split(",").map((D) => D.trim());
            return {
              lat: Number(_.lat),
              lng: Number(_.lon),
              name: _.name || H[0] || j,
              area: H.slice(1, 3).join(" ")
            };
          })
        );
      } catch {
        I("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      F(!1);
    }
  }, J = (j) => {
    y({ lat: j.lat, lng: j.lng, z: 16 }), w(null), g({ lat: j.lat, lng: j.lng, name: j.name, cat: "맛집", area: j.area }), m([]);
  }, L = E && E.likes.includes(a);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: b,
          onChange: (j) => p(j.target.value),
          onKeyDown: (j) => j.key === "Enter" && K(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: K, disabled: k, children: k ? "검색 중" : "검색" })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "jt-hint jt-mapmsg", children: h }),
    i.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results", children: i.map((j, v) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => J(j), children: [
      /* @__PURE__ */ e("strong", { children: j.name }),
      /* @__PURE__ */ e("span", { children: j.area })
    ] }) }, v)) }),
    /* @__PURE__ */ e(
      rn,
      {
        view: f,
        setView: y,
        pins: c.map((j) => ({
          id: j.id,
          lat: j.lat,
          lng: j.lng,
          color: gt[j.cat] || gt.기타,
          label: j.name
        })),
        temp: d,
        selectedId: s,
        onTap: (j, v) => {
          w(null), g({ lat: Number(j.toFixed(6)), lng: Number(v.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (j) => {
          g(null), w(j);
        }
      }
    ),
    !d && !E && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      c.length,
      "개예요."
    ] }),
    d && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ e("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: d.name,
          onChange: (j) => g({ ...d, name: j.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: te.map((j) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-chip" + (d.cat === j ? " on" : ""),
          onClick: () => g({ ...d, cat: j }),
          children: j
        },
        j
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !d.name.trim(),
            onClick: () => {
              r({
                name: d.name.trim(),
                cat: d.cat,
                area: d.area || "",
                link: "",
                memo: "",
                lat: d.lat,
                lng: d.lng
              }), g(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: () => g(null), children: "취소" })
      ] })
    ] }),
    E && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: gt[E.cat] || gt.기타 }, children: E.cat }),
        /* @__PURE__ */ e("strong", { children: E.name })
      ] }),
      E.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ e(Zt, { size: 13 }),
        E.area
      ] }),
      E.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: E.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-like" + (L ? " on" : ""),
            onClick: () => l(E.id),
            "aria-pressed": L,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ e($t, { size: 16, fill: L ? "currentColor" : "none" }),
              E.likes.length
            ]
          }
        ),
        E.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: U[E.planned % U.length] }, children: [
          E.planned + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => u(E), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ e(V, { name: E.by, members: t.members, size: 16 }),
          E.by
        ] }),
        /* @__PURE__ */ e(
          ht,
          {
            onConfirm: () => {
              x(E.id), w(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "jt-maprow", children: /* @__PURE__ */ o("a", { className: "jt-maplink", href: ee(E), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Pt, { size: 14 }),
        "구글맵에서 열기"
      ] }) })
    ] })
  ] });
}
function ln(t) {
  let [n, a] = N("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-seg", role: "tablist", children: [
      /* @__PURE__ */ e("button", { role: "tab", "aria-selected": n === "list", className: n === "list" ? "on" : "", onClick: () => a("list"), children: "목록" }),
      /* @__PURE__ */ e("button", { role: "tab", "aria-selected": n === "map", className: n === "map" ? "on" : "", onClick: () => a("map"), children: "지도" })
    ] }),
    n === "list" ? /* @__PURE__ */ e(pn, { ...t }) : /* @__PURE__ */ e(sn, { ...t })
  ] });
}
function pn({ settings: t, wish: n, me: a, onAdd: r, onLike: l, onPlan: u, onDelete: x }) {
  let [c, f] = N("전체"), [y, d] = N(null), g = n.filter((s) => c === "전체" || s.cat === c).sort((s, w) => w.likes.length - s.likes.length || w.createdAt - s.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ e("div", { className: "jt-chips jt-filter", children: ["전체", ...te].map((s) => /* @__PURE__ */ e("button", { className: "jt-chip" + (c === s ? " on" : ""), onClick: () => f(s), children: s }, s)) }),
    g.length === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ e("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-list", children: g.map((s) => {
      let w = s.likes.includes(a);
      return /* @__PURE__ */ o("li", { className: "jt-wish", children: [
        /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
          /* @__PURE__ */ e("span", { className: "jt-tag", style: { background: gt[s.cat] || gt.기타 }, children: s.cat }),
          /* @__PURE__ */ e("strong", { children: s.name })
        ] }),
        s.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
          /* @__PURE__ */ e(Zt, { size: 13 }),
          s.area
        ] }),
        s.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: s.memo }),
        /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: ee(s), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e(Pt, { size: 14 }),
            "구글맵에서 열기"
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-maplink",
              onClick: () => d(y === s.id ? null : s.id),
              "aria-expanded": y === s.id,
              children: [
                /* @__PURE__ */ e(ua, { size: 14 }),
                y === s.id ? "지도 닫기" : "지도 미리보기"
              ]
            }
          )
        ] }),
        y === s.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
          /* @__PURE__ */ e(
            "iframe",
            {
              title: `${s.name} 지도`,
              src: Ba(s),
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              allowFullScreen: !0
            }
          ),
          /* @__PURE__ */ e("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
          /* @__PURE__ */ o(
            "button",
            {
              className: "jt-like" + (w ? " on" : ""),
              onClick: () => l(s.id),
              "aria-pressed": w,
              "aria-label": "가고 싶어요",
              children: [
                /* @__PURE__ */ e($t, { size: 16, fill: w ? "currentColor" : "none" }),
                s.likes.length
              ]
            }
          ),
          s.planned != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: U[s.planned % U.length] }, children: [
            s.planned + 1,
            "일차 일정에 있어요"
          ] }) : /* @__PURE__ */ e("button", { className: "jt-secondary sm", onClick: () => u(s), children: "일정에 넣기" }),
          /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
            /* @__PURE__ */ e(V, { name: s.by, members: t.members, size: 16 }),
            s.by
          ] }),
          /* @__PURE__ */ e(ht, { onConfirm: () => x(s.id), label: "" })
        ] })
      ] }, s.id);
    }) })
  ] });
}
function Se({ moves: t, rate: n, me: a }) {
  return t.length ? /* @__PURE__ */ e("ul", { className: "jt-moves2", children: t.map((r, l) => /* @__PURE__ */ o("li", { className: r.from === a || r.to === a ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ e("b", { children: r.from }),
      /* @__PURE__ */ e(De, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ e("b", { children: r.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ e("strong", { children: B(r.v) }),
      /* @__PURE__ */ e("em", { children: Et(r.v, n) })
    ] })
  ] }, l)) }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function cn({ e: t, members: n, rate: a, onEdit: r }) {
  let { Icon: l, color: u } = Gt(t.cat);
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => r(t), "aria-label": `${t.title} 고치기`, children: [
    /* @__PURE__ */ e("span", { className: "jt-spend-icon", style: { "--cc": u }, children: /* @__PURE__ */ e(l, { size: 18 }) }),
    /* @__PURE__ */ o("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ e("div", { className: "jt-spend-name", children: t.title }),
      /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        t.payer,
        "이(가) 냄, ",
        (t.split || []).length === n.length ? "모두" : (t.split || []).join(", "),
        " 나눔",
        t.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-spend-amt", children: [
      /* @__PURE__ */ e("strong", { children: B(Number(t.amount) || 0) }),
      /* @__PURE__ */ e("span", { children: Et(Number(t.amount) || 0, a) })
    ] })
  ] }) });
}
var Me = (t) => t > 0.5 ? `받을 돈 ${B(t)}` : t < -0.5 ? `보낼 돈 ${B(-t)}` : "주고받을 돈 없음", At = (t) => t > 0.5 ? "plus" : t < -0.5 ? "minus" : "";
function dn({ settings: t, spend: n, me: a, onEdit: r }) {
  let { members: l, rate: u, start: x } = t, [c, f] = N("me"), y = n.reduce((p, i) => p + (Number(i.amount) || 0), 0), d = Jt(() => Ne(n, l), [n, l]), g = Jt(() => {
    let p = {};
    return n.forEach((i) => p[i.cat] = (p[i.cat] || 0) + (Number(i.amount) || 0)), Ie.filter((i) => p[i]).map((i) => ({ c: i, v: p[i] }));
  }, [n]), s = Jt(() => {
    let p = {};
    return n.forEach((i) => (p[i.day] = p[i.day] || []).push(i)), Object.keys(p).map(Number).sort((i, m) => i - m).map((i) => ({
      day: i,
      sum: p[i].reduce((m, k) => m + (Number(k.amount) || 0), 0),
      items: [...p[i]].sort((m, k) => k.createdAt - m.createdAt),
      res: Ne(p[i], l)
    }));
  }, [n, l]), w = d.net[a] || 0, b = d.moves.filter((p) => p.from === a || p.to === a);
  return n.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: B(0) }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Dt(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ e("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ e("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ e("strong", { children: B(y) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Et(y, u),
        ", 그중 ",
        a,
        "가 쓴 돈 ",
        B(d.share[a] || 0)
      ] }),
      /* @__PURE__ */ e("span", { className: "jt-fx", children: Dt(t) }),
      /* @__PURE__ */ e("div", { className: "jt-catbar", "aria-hidden": "true", children: g.map(({ c: p, v: i }) => /* @__PURE__ */ e("i", { style: { flexGrow: i, background: Gt(p).color } }, p)) }),
      /* @__PURE__ */ e("ul", { className: "jt-catlegend", children: g.map(({ c: p, v: i }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("span", { className: "jt-dot", style: { background: Gt(p).color } }),
        p,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(i / y * 100),
          "%"
        ] })
      ] }, p)) })
    ] }),
    d.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        d.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ e("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ e("ul", { children: d.skipped.map((p) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => r(p), children: [
        /* @__PURE__ */ o("span", { children: [
          p.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            p.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ e("b", { children: B(Number(p.amount) || 0) })
      ] }) }, p.id)) })
    ] }),
    /* @__PURE__ */ e("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([p, i]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": c === p, className: c === p ? "on" : "", onClick: () => f(p), children: i }, p)) }),
    c === "me" && /* @__PURE__ */ o(it, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (At(w) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ e(V, { name: a, members: l, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              a,
              "는"
            ] }),
            /* @__PURE__ */ e("strong", { children: w > 0.5 ? `${B(w)} 받으면 돼요` : w < -0.5 ? `${B(-w)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        b.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-moves", children: b.map((p, i) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("span", { children: p.from === a ? /* @__PURE__ */ o(it, { children: [
            /* @__PURE__ */ e("b", { children: p.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(it, { children: [
            /* @__PURE__ */ e("b", { children: p.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ e("strong", { children: B(p.v) }),
            /* @__PURE__ */ e("em", { children: Et(p.v, u) })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ e("b", { children: B(d.paid[a] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              B(d.share[a] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ e("span", { children: w > 0.5 ? "더 결제했으니 받을 돈" : w < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ e("b", { className: At(w), children: w > 0.5 ? B(w) : w < -0.5 ? B(-w) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ e("ul", { className: "jt-daynet", children: s.map((p) => {
        let i = et(x, p.day), m = p.res.net[a] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": U[p.day % U.length] }, children: [
          /* @__PURE__ */ e("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            p.day + 1,
            "일차 ",
            zt(i),
            " (",
            Ct(i),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            B(p.res.paid[a] || 0),
            ", 내가 쓴 돈 ",
            B(p.res.share[a] || 0)
          ] }),
          /* @__PURE__ */ e("b", { className: "jt-net " + At(m), children: Me(m) })
        ] }, p.day);
      }) }),
      /* @__PURE__ */ e("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    c === "day" && /* @__PURE__ */ o(it, { children: [
      /* @__PURE__ */ e("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      s.map((p) => {
        let i = et(x, p.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": U[p.day % U.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot sm", children: p.day + 1 }),
            zt(i),
            " (",
            Ct(i),
            ")",
            /* @__PURE__ */ e("span", { className: "jt-group-sum", children: B(p.sum) })
          ] }),
          /* @__PURE__ */ e(Se, { moves: p.res.moves, rate: u, me: a }),
          /* @__PURE__ */ e("ul", { className: "jt-spend-list", children: p.items.map((m) => /* @__PURE__ */ e(cn, { e: m, members: l, rate: u, onEdit: r }, m.id)) })
        ] }, p.day);
      })
    ] }),
    c === "all" && /* @__PURE__ */ o(it, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ e("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ e(Se, { moves: d.moves, rate: u, me: a }),
        /* @__PURE__ */ e("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ e("ul", { className: "jt-people card", children: l.map((p) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e(V, { name: p, members: l, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ e("strong", { children: p }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            B(d.paid[p]),
            ", 쓴 돈 ",
            B(d.share[p])
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "jt-net " + At(d.net[p]), children: Me(d.net[p]) })
      ] }, p)) })
    ] })
  ] });
}
function mn({ post: t, me: n, members: a, onEdit: r, onLike: l, onComment: u, onDelComment: x, onOpenPhoto: c }) {
