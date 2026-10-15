/* @__PURE__ */ e("div", { className: "jt-chips", children: f.map((S) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (i.includes(S) ? " on" : ""), onClick: () => E(S), children: [
        i.includes(S) && /* @__PURE__ */ e(wa, { size: 14 }),
        S
      ] }, S)) }),
      w > 0 && i.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        J(w / i.length)
      ] }),
      i.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Ca.map((S) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (u === S ? " on" : ""), onClick: () => A(S), children: S }, S)) })
    ] }),
    /* @__PURE__ */ e(et, { label: "날짜", children: /* @__PURE__ */ e("select", { value: m, onChange: (S) => k(Number(S.target.value)), children: Array.from({ length: p }, (S, M) => {
      let _ = dt(d, M);
      return /* @__PURE__ */ o("option", { value: M, children: [
        M + 1,
        "일차 ",
        Ht(_),
        " (",
        Dt(_),
        ")"
      ] }, M);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !R,
        onClick: () => s({ title: v.trim(), amount: w, payer: g, cat: u, day: m, split: i }),
        children: r ? "수정 저장" : "경비 기록하기"
      }
    ),
    r && /* @__PURE__ */ e(ht, { onConfirm: j, label: "이 경비 삭제" })
  ] });
}
function uo({ initial: t, onSave: a, onDelete: n }) {
  let [r, s] = C(t?.text || ""), [j, f] = C(t?.urls || []), [p, d] = C(""), [b, v] = C(() => (t?.photos || []).map((i) => ({ id: i }))), [N, c] = C(!1), [z, g] = C(""), l = Y(null), u = () => {
    if (!p.trim()) return;
    let i = ia(p);
    if (!i) {
      g("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    j.includes(i) || f([...j, i]), d(""), g("");
  }, A = async (i) => {
    let h = Array.from(i || []).filter((R) => R.type.startsWith("image/"));
    if (!h.length) return;
    let w = Bt - b.length;
    if (w <= 0) {
      g(`사진은 글 하나에 ${Bt}장까지 올릴 수 있어요.`);
      return;
    }
    c(!0), g("사진 준비 중");
    let F = [], E = 0;
    for (let R of h.slice(0, w))
      try {
        F.push({ id: st(), data: await to(R) });
      } catch {
        E++;
      }
    v((R) => [...R, ...F]), c(!1), E ? g(`${E}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : h.length > w ? g(`${Bt}장까지만 넣었어요.`) : g(""), l.current && (l.current.value = "");
  }, m = async () => {
    let i = j;
    if (p.trim()) {
      let w = ia(p);
      if (!w) {
        g("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      i.includes(w) || (i = [...i, w]);
    }
    c(!0), g(b.some((w) => w.data) ? "사진 올리는 중" : ""), await a({ text: r.trim(), urls: i, photos: b }) || (c(!1), g("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, k = !N && (r.trim() || j.length || p.trim() || b.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: r,
        onChange: (i) => s(i.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    b.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: b.map((i) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(no, { id: i.id, data: i.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => v(b.filter((h) => h.id !== i.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(Gt, { size: 14 })
        }
      )
    ] }, i.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: l,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (i) => A(i.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => l.current && l.current.click(),
        disabled: N || b.length >= Bt,
        children: [
          /* @__PURE__ */ e(jn, { size: 17 }),
          "사진 추가 (",
          b.length,
          "/",
          Bt,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      j.map((i) => /* @__PURE__ */ e(ro, { url: i, onRemove: () => f(j.filter((h) => h !== i)) }, i)),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: p,
            onChange: (i) => d(i.target.value),
            onKeyDown: (i) => i.key === "Enter" && u(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: u, children: "추가" })
      ] })
    ] }),
    z && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: z }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !k, onClick: m, children: N ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(ht, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
var it = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Aa = 16;
function ze(t) {
  return t === 0 ? { Icon: Pn, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: $n, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: oa, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: Rn, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: _n, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: Ln, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: Tn, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: Bn, label: "뇌우", tone: "#7B5FC4" } : { Icon: oa, label: "흐림", tone: "#66718A" };
}
var St = (t) => t == null ? "–" : Math.round(t) + "°", ga = /* @__PURE__ */ new Map();
async function fa(t) {
  let a = ga.get(t);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(t);
  if (!n.ok) throw new Error("weather " + n.status);
  let r = await n.json();
  return ga.set(t, { at: Date.now(), d: r }), r;
}
var ha = (t, a) => {
  let n = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + a}-${n}`;
};
function go(t, a) {
  let [n, r] = C({ status: "loading" });
  return W(() => {
    let s = !0, j = async () => {
      try {
        let p = `latitude=${it.lat}&longitude=${it.lng}&timezone=Asia%2FTokyo`, d = await fa(
          `https://api.open-meteo.com/v1/forecast?${p}&forecast_days=${Aa}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), b = {};
        d.daily.time.forEach((l, u) => {
          b[l] = {
            code: d.daily.weather_code[u],
            max: d.daily.temperature_2m_max[u],
            min: d.daily.temperature_2m_min[u],
            pop: d.daily.precipitation_probability_max[u],
            sum: d.daily.precipitation_sum[u]
          };
        });
        let v = {};
        d.hourly.time.forEach((l, u) => {
          v[l.slice(0, 13)] = {
            t: d.hourly.temperature_2m[u],
            pop: d.hourly.precipitation_probability[u],
            code: d.hourly.weather_code[u]
          };
        });
        let N = pt(/* @__PURE__ */ new Date()), z = Array.from({ length: a }, (l, u) => pt(dt(t, u))).filter((l) => !b[l] && l > N), g = {};
        if (z.length) {
          let l = await Promise.all(
            [1, 2, 3].map(
              (A) => fa(
                `https://archive-api.open-meteo.com/v1/archive?${p}&start_date=${ha(z[0], -A)}&end_date=${ha(z[z.length - 1], -A)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), u = {};
          l.filter(Boolean).forEach(
            (A) => A.daily.time.forEach((m, k) => {
              let i = A.daily.temperature_2m_max[k];
              if (i == null) return;
              let h = m.slice(5), w = u[h] || (u[h] = { max: 0, min: 0, wet: 0, n: 0 });
              w.max += i, w.min += A.daily.temperature_2m_min[k], w.wet += (A.daily.precipitation_sum[k] || 0) >= 1 ? 1 : 0, w.n++;
            })
          ), z.forEach((A) => {
            let m = u[A.slice(5) === "02-29" ? "02-28" : A.slice(5)];
            m && m.n && (g[A] = { max: m.max / m.n, min: m.min / m.n, wet: m.wet, n: m.n });
          });
        }
        s && r({ status: "ok", daily: b, hourly: v, climate: g, at: /* @__PURE__ */ new Date() });
      } catch {
        s && r((d) => d.status === "ok" ? d : { status: "error" });
      }
    };
    j();
    let f = setInterval(j, 30 * 6e4);
    return () => {
      s = !1, clearInterval(f);
    };
  }, [t, a]), n;
}
function fo({ date: t, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      it.name,
      " 날씨"
    ] }),
    a.status === "ok" && a.daily[t] && /* @__PURE__ */ e("em", { children: `${at(a.at.getHours())}:${at(a.at.getMinutes())} 업데이트` })
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
  let r = a.daily[t];
  if (r) {
    let { Icon: j, label: f, tone: p } = ze(r.code), d = (r.pop || 0) >= 50 || (r.sum || 0) >= 1, b = ["09", "12", "15", "18", "21"].map((v) => ({ h: v, v: a.hourly[`${t}T${v}`] })).filter((v) => v.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(j, { size: 40, color: p, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: f }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: St(r.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: St(r.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(On, { size: 15, "aria-hidden": "true" }),
          r.pop == null ? "–" : r.pop + "%"
        ] })
      ] }),
      d && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      b.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: b.map(({ h: v, v: N }) => {
        let c = ze(N.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            v,
            "시"
          ] }),
          /* @__PURE__ */ e(c.Icon, { size: 18, color: c.tone, "aria-label": c.label }),
          /* @__PURE__ */ e("b", { children: St(N.t) }),
          /* @__PURE__ */ e("em", { children: N.pop == null ? "" : N.pop + "%" })
        ] }, v);
      }) })
    ] });
  }
  let s = a.climate[t];
  return s ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Aa,
      "일 전부터 나와요. 최근 ",
      s.n,
      "년 같은 날 ",
      it.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: St(s.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: St(s.min) }),
      "였고, ",
      s.n,
      "번 중 ",
      s.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function ho({ v: t }) {
  if (!t) return null;
  let { Icon: a, label: n, tone: r } = ze(t.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ e(a, { size: 14, color: r, "aria-hidden": "true" }),
    St(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var ae = 56;
function bo({ items: t, isToday: a, onEdit: n, members: r, onAddAt: s }) {
  let [j, f] = C(null), [p, d] = C(() => {
    let i = /* @__PURE__ */ new Date();
    return i.getHours() * 60 + i.getMinutes();
  });
  W(() => {
    if (!a) return;
    let i = setInterval(() => {
      let h = /* @__PURE__ */ new Date();
      d(h.getHours() * 60 + h.getMinutes());
    }, 6e4);
    return () => clearInterval(i);
  }, [a]);
  let b = t.filter((i) => i.time).map((i) => ({ ...i, ...Jt(i) })).sort((i, h) => i.s - h.s || i.e - h.e), v = [], N = [], c = -1;
  b.forEach((i) => {
    N.length && i.s >= c && (v.push(N), N = [], c = -1), N.push(i), c = Math.max(c, i.e);
  }), N.length && v.push(N);
  let z = [];
  v.forEach((i) => {
    let h = [];
    i.forEach((w) => {
      let F = h.findIndex((E) => E <= w.s);
      F === -1 ? (F = h.length, h.push(w.e)) : h[F] = w.e, z.push({ ...w, col: F, cl: i });
    }), i.ncol = h.length;
  });
  let g = b.length ? Math.min(8, Math.floor(b[0].s / 60)) : 8, l = b.length ? Math.max(21, Math.ceil(Math.max(...b.map((i) => i.e)) / 60)) : 21, u = (i) => {
    let h = i.currentTarget.getBoundingClientRect(), w = g * 60 + (i.clientY - h.top) / ae * 60;
    return Math.max(g * 60, Math.min(Math.floor(w / 30) * 30, l * 60 - 30, 23 * 60 + 30));
  }, A = Array.from({ length: l - g + 1 }, (i, h) => g + h), m = (i) => (i - g * 60) / 60 * ae, k = t.length - b.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (l - g) * ae + 14 }, children: [
      A.map((i) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: m(i * 60) }, children: /* @__PURE__ */ o("span", { children: [
        at(i % 24),
        ":00"
      ] }) }, i)),
      /* @__PURE__ */ o(
        "div",
        {
          className: "jt-tt-lane",
          onClick: (i) => {
            i.target.closest(".jt-tt-block") || !s || s(Mt(u(i)));
          },
          onPointerMove: (i) => {
            if (i.pointerType !== "mouse" || i.target.closest(".jt-tt-block")) return f(null);
            f(u(i));
          },
          onPointerLeave: () => f(null),
          children: [
            j != null && /* @__PURE__ */ o("div", { className: "jt-tt-ghost", style: { top: m(j) + 1, height: ae / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              Mt(j),
              " 일정 추가"
            ] }),
            z.map((i) => {
              let h = i.cl.ncol, w = Math.max(24, m(i.e) - m(i.s) - 3);
              return /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (w < 44 ? " short" : "") + (h > 1 ? " clash" : ""),
                  style: {
                    top: m(i.s) + 1,
                    height: w,
                    left: `calc(${i.col / h * 100}% + 2px)`,
                    width: `calc(${100 / h}% - 4px)`
                  },
                  onClick: () => n(i),
                  "aria-label": `${i.time} ${i.title} 고치기`,
                  children: [
                    /* @__PURE__ */ e("strong", { children: i.title }),
                    /* @__PURE__ */ o("span", { children: [
                      Mt(i.s),
                      "~",
                      Mt(i.e % (24 * 60)),
                      i.place ? `, ${i.place}` : ""
                    ] })
                  ]
                },
                i.id
              );
            })
          ]
        }
      ),
      a && p >= g * 60 && p <= l * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: m(p) }, "aria-label": `지금 ${Mt(p)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에 일정을 바로 추가할 수 있어요.",
      k > 0 ? ` 시간을 정하지 않은 일정 ${k}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
function xo({ settings: t, schedule: a, day: n, setDay: r, onEdit: s, onAddAt: j, me: f, onComment: p, onDelComment: d, onReact: b }) {
  let [v, N] = C(null), { start: c, days: z, members: g } = t, l = Q[n % Q.length], u = a.filter((h) => h.day === n).sort((h, w) => (h.time || "99:99").localeCompare(w.time || "99:99")), A = qn(u), m = pt(dt(c, n)), k = m === pt(/* @__PURE__ */ new Date()), i = go(c, z);
  return /* @__PURE__ */ o("section", { style: { "--lc": l }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: z }, (h, w) => {
      let F = dt(c, w), E = w === n;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": E,
          className: "jt-day" + (E ? " active" : ""),
          style: { "--lc": Q[w % Q.length] },
          onClick: () => r(w),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: w + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: Ht(F) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: Dt(F) })
          ]
        },
        w
      );
    }) }),
    /* @__PURE__ */ e(fo, { date: m, w: i }),
    u.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ e("ol", { className: "jt-line", children: u.map((h) => {
      let w = h.time ? Jt(h) : null;
      return /* @__PURE__ */ o("li", { className: "jt-row", children: [
        /* @__PURE__ */ e("div", { className: "jt-time", children: h.time || "미정" }),
        /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
        /* @__PURE__ */ o(
          "div",
          {
            className: "jt-card",
            role: "button",
            tabIndex: 0,
            onClick: () => s(h),
            onKeyDown: (F) => F.key === "Enter" && s(h),
            children: [
              /* @__PURE__ */ o("div", { className: "jt-card-top", children: [
                /* @__PURE__ */ e("div", { className: "jt-card-title", children: h.title }),
                h.time && i.status === "ok" && /* @__PURE__ */ e(ho, { v: i.hourly[`${m}T${h.time.slice(0, 2)}`] })
              ] }),
              w && h.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                h.time,
                "~",
                h.end,
                ", ",
                za(w.e - w.s)
              ] }),
              A.has(h.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              h.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(wt, { size: 13 }),
                h.place
              ] }),
              h.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: h.memo }),
              (h.place || h.link || Ft(h)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: Pt(h),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (F) => F.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Nt, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ o("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(rt, { name: h.by, members: g, size: 16 }),
                  h.by
                ] }),
                /* @__PURE__ */ e(Fe, { item: h, me: f, onReact: (F) => b(h.id, F) }),
                /* @__PURE__ */ e(
                  Sa,
                  {
                    count: (h.comments || []).length,
                    open: v === h.id,
                    onClick: () => N(v === h.id ? null : h.id)
                  }
                )
              ] }),
              v === h.id && /* @__PURE__ */ e(
                Pe,
                {
                  comments: h.comments || [],
                  me: f,
                  members: g,
                  onAdd: (F) => p(h.id, F),
                  onDelete: (F) => d(h.id, F)
                }
              )
            ]
          }
        )
      ] }, h.id);
    }) }),
    /* @__PURE__ */ e(bo, { items: u, isToday: k, onEdit: s, members: g, onAddAt: (h) => j && j(n, h) })
  ] });
}
function jo({ view: t, setView: a, pins: n, temp: r, selectedId: s, onTap: j, onPinTap: f }) {
  let p = Y(null), [d, b] = C({ w: 0, h: 0 }), v = Y(/* @__PURE__ */ new Map()), N = Y({ moved: !1, startDist: 0 }), c = Y(0), [z, g] = C({ ok: 0, bad: 0 });
  W(() => {
    let M = p.current;
    if (!M) return;
    let _ = () => b({ w: M.clientWidth, h: M.clientHeight });
    _();
    let K = new ResizeObserver(_);
    return K.observe(M), () => K.disconnect();
  }, []);
  let l = t.z, u = ye(t.lat, t.lng, l), A = u.x - d.w / 2, m = u.y - d.h / 2, k = 2 ** l, i = [];
  if (d.w) {
    let M = Math.floor(A / gt), _ = Math.floor((A + d.w) / gt), K = Math.max(0, Math.floor(m / gt)), q = Math.min(k - 1, Math.floor((m + d.h) / gt));
    for (let B = M; B <= _; B++)
      for (let y = K; y <= q; y++) {
        let U = (B % k + k) % k;
        i.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${l}/${U}/${y}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => g((G) => G.ok ? G : { ...G, ok: 1 }),
              onError: () => g((G) => G.bad ? G : { ...G, bad: 1 }),
              style: { left: Math.round(B * gt - A), top: Math.round(y * gt - m) }
            },
            `${l}/${B}/${y}`
          )
        );
      }
  }
  let h = (M) => {
    if (!M.target.closest("[data-pin],.jt-zoom,.jt-attr") && (p.current.setPointerCapture(M.pointerId), v.current.set(M.pointerId, { x: M.clientX, y: M.clientY }), v.current.size === 1 && (N.current = { moved: !1, startDist: 0 }), v.current.size === 2)) {
      let [_, K] = [...v.current.values()];
      N.current.startDist = Math.hypot(_.x - K.x, _.y - K.y), N.current.moved = !0;
    }
  }, w = (M) => {
    let _ = v.current.get(M.pointerId);
    if (!_) return;
    let K = M.clientX - _.x, q = M.clientY - _.y;
    if (v.current.size === 1) {
      if (!N.current.moved && Math.hypot(K, q) < 4) return;
      N.current.moved = !0, v.current.set(M.pointerId, { x: M.clientX, y: M.clientY }), a((B) => {
        let y = ye(B.lat, B.lng, B.z), U = la(y.x - K, y.y - q, B.z);
        return { ...B, lat: Math.max(-80, Math.min(80, U.lat)), lng: U.lng };
      });
    } else
      v.current.set(M.pointerId, { x: M.clientX, y: M.clientY });
  }, F = (M) => {
    let _ = v.current.get(M.pointerId);
    if (!_) return;
    let K = v.current.size === 1;
    if (v.current.delete(M.pointerId), N.current.startDist && v.current.size === 1) {
      let [q] = [...v.current.values()], B = Math.hypot(_.x - q.x, _.y - q.y) / N.current.startDist;
      B > 1.35 ? a((y) => ({ ...y, z: Ot(y.z + (B > 2.6 ? 2 : 1)) })) : B < 0.7 && a((y) => ({ ...y, z: Ot(y.z - (B < 0.38 ? 2 : 1)) })), N.current.startDist = 0;
    }
    if (K && !N.current.moved && M.type === "pointerup") {
      let q = p.current.getBoundingClientRect(), B = la(A + (M.clientX - q.left), m + (M.clientY - q.top), l);
      j(B.lat, B.lng);
    }
  }, E = (M) => {
    let _ = Date.now();
    _ - c.current < 250 || (c.current = _, a((K) => ({ ...K, z: Ot(K.z + (M.deltaY < 0 ? 1 : -1)) })));
  }, R = (M, _) => {
    let K = ye(M, _, l);
    return { left: K.x - A, top: K.y - m };
  }, S = (M) => M.left > -40 && M.left < d.w + 40 && M.top > -50 && M.top < d.h + 40;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-map",
      ref: p,
      onPointerDown: h,
      onPointerMove: w,
      onPointerUp: F,
      onPointerCancel: F,
      onWheel: E,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        i,
        z.bad > 0 && z.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        d.w > 0 && n.map((M) => {
          let _ = R(M.lat, M.lng);
          return S(_) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (M.id === s ? " sel" : ""),
              style: { left: _.left, top: _.top, "--pc": M.color },
              onClick: () => f(M.id),
              "aria-label": M.label,
              children: /* @__PURE__ */ e("i", {})
            },
            M.id
          ) : null;
        }),
        d.w > 0 && r && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: R(r.lat, r.lng).left, top: R(r.lat, r.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ o("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((M) => ({ ...M, z: Ot(M.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((M) => ({ ...M, z: Ot(M.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var ba = "https://unpkg.com/maplibre-gl@4.7.1/dist/", vo = "https://tiles.openfreemap.org/styles/liberty", Ut = null;
function yo() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Ut || (Ut = new Promise((t, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = ba + "maplibre-gl.css", document.head.appendChild(n);
    let r = document.createElement("script");
    r.src = ba + "maplibre-gl.js", r.onload = () => window.maplibregl ? t(window.maplibregl) : a(new Error("maplibre")), r.onerror = () => {
      Ut = null, a(new Error("maplibre"));
    }, document.head.appendChild(r);
  }), Ut);
}
var wo = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function ko(t) {
  (t.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        t.setLayoutProperty(a.id, "text-field", wo);
      } catch {
      }
  });
}
var No = (t) => String(t).replace(/[&<>"]/g, (a) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[a]), Ee = (t, a, n) => {
  let r = a ? 34 : 28, s = a ? 44 : 36, j = n ? `<circle cx="14" cy="14" r="9" fill="#fff"/><text x="14" y="18" font-size="11" font-weight="800" text-anchor="middle" fill="${t}" font-family="sans-serif">${No(n)}</text>` : '<circle cx="14" cy="14" r="5.5" fill="#fff"/>';
  return `<svg width="${r}" height="${s}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/>${j}</svg>`;
};
function Ia(t) {
  let { view: a, setView: n, pins: r, temp: s, selectedId: j, onTap: f, onPinTap: p } = t, d = Y(null), b = Y(null), v = Y(null), N = Y([]), c = Y(null), z = Y({});
  z.current = { onTap: f, onPinTap: p, setView: n };
  let [g, l] = C("loading");
  return W(() => {
    let u = !0;
    return yo().then((A) => {
      if (!u || !d.current) return;
      v.current = A;
      let m = new A.Map({
        container: d.current,
        style: vo,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      m.touchZoomRotate.disableRotation(), m.addControl(new A.NavigationControl({ showCompass: !1 }), "top-right"), m.on("load", () => {
        ko(m), u && l("ok");
      }), m.on("click", (k) => {
        k.originalEvent && k.originalEvent.target.closest && k.originalEvent.target.closest(".jt-mlpin") || z.current.onTap(k.lngLat.lat, k.lngLat.lng);
      }), m.on("moveend", () => {
        let k = m.getCenter();
        z.current.setView({ lat: k.lat, lng: k.lng, z: m.getZoom() + 1 });
      }), b.current = m, setTimeout(() => u && !m.loaded() && l((k) => k === "loading" ? "slow" : k), 6e3), setTimeout(() => {
        u && b.current === m && !m.loaded() && (m.remove(), b.current = null, l("fail"));
      }, 15e3);
    }).catch(() => u && l("fail")), () => {
      u = !1, b.current && b.current.remove(), b.current = null;
    };
  }, []), W(() => {
    let u = b.current;
    if (!u) return;
    let A = u.getCenter();
    (Math.abs(A.lat - a.lat) > 1e-6 || Math.abs(A.lng - a.lng) > 1e-6 || Math.abs(u.getZoom() + 1 - a.z) > 0.01) && u.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), W(() => {
    let u = b.current, A = v.current;
    !u || !A || (N.current.forEach((m) => m.remove()), N.current = r.map((m) => {
      let k = document.createElement("button");
      return k.type = "button", k.className = "jt-mlpin" + (m.id === j ? " sel" : ""), k.setAttribute("aria-label", m.label), k.innerHTML = Ee(m.color, m.id === j, m.text), k.addEventListener("click", (i) => {
        i.stopPropagation(), z.current.onPinTap(m.id);
      }), new A.Marker({ element: k, anchor: "bottom" }).setLngLat([m.lng, m.lat]).addTo(u);
    }));
  }, [r, j, g]), W(() => {
    let u = b.current, A = v.current;
    if (c.current && c.current.remove(), c.current = null, !u || !A || !s) return;
    let m = document.createElement("div");
    m.className = "jt-mlpin temp", m.innerHTML = Ee("#14213D", !0), c.current = new A.Marker({ element: m, anchor: "bottom" }).setLngLat([s.lng, s.lat]).addTo(u);
  }, [s, g]), g === "fail" ? /* @__PURE__ */ e(jo, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: d, className: "jt-ml", role: "application", "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요" }),
    (g === "loading" || g === "slow") && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: g === "slow" ? "지도가 느리게 열리고 있어요. 계속 안 열리면 기본 지도로 바꿔 보여 드려요." : "지도 불러오는 중" })
  ] });
}
var Kt = null, At = "", kt = !1, Me = /* @__PURE__ */ new Set();
function $e(t) {
  return kt ? Promise.reject(new Error("auth")) : Kt && At === t ? Kt : At && At !== t ? Promise.reject(new Error("reload")) : (At = t, Kt = new Promise((a, n) => {
    window.__jtGmReady = () => a(window.google.maps), window.gm_authFailure = () => {
      kt = !0, Me.forEach((s) => s()), n(new Error("auth"));
    };
    let r = document.createElement("script");
    r.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(t) + "&v=weekly&language=ko&region=KR&loading=async&callback=__jtGmReady", r.async = !0, r.onerror = () => {
      Kt = null, At = "", n(new Error("load"));
    }, document.head.appendChild(r);
  }), Kt);
}
var Co = (t) => !!t && !kt && At === t && !!(window.google && window.google.maps);
function zo(t) {
  let { view: a, setView: n, pins: r, temp: s, selectedId: j, onTap: f, onPinTap: p, onPoi: d, gkey: b } = t, v = Y(null), N = Y(null), c = Y(null), z = Y([]), g = Y(null), l = Y({});
  l.current = { onTap: f, onPinTap: p, onPoi: d, setView: n };
  let [u, A] = C(kt ? "fail" : "loading");
  W(() => {
    let k = !0, i = () => k && A("fail");
    return Me.add(i), $e(b).then(async (h) => {
      let { Map: w } = await h.importLibrary("maps"), { Marker: F } = await h.importLibrary("marker"), { Size: E, Point: R } = await h.importLibrary("core");
      if (!k || !v.current) return;
      c.current = { Marker: F, Size: E, Point: R };
      let S = new w(v.current, {
        center: { lat: a.lat, lng: a.lng },
        zoom: Math.round(a.z),
        disableDefaultUI: !0,
        zoomControl: !0,
        gestureHandling: "greedy",
        clickableIcons: !0
      });
      S.addListener("click", async (M) => {
        if (M.placeId) {
          M.stop();
          try {
            let { Place: _ } = await h.importLibrary("places"), K = new _({ id: M.placeId });
            await K.fetchFields({ fields: ["displayName", "location", "formattedAddress", "googleMapsURI"] }), l.current.onPoi({
              name: K.displayName || "",
              lat: K.location.lat(),
              lng: K.location.lng(),
              area: K.formattedAddress || "",
              link: K.googleMapsURI || "",
              placeId: M.placeId
            });
            return;
          } catch {
          }
        }
        l.current.onTap(M.latLng.lat(), M.latLng.lng());
      }), S.addListener("idle", () => {
        let M = S.getCenter();
        l.current.setView({ lat: M.lat(), lng: M.lng(), z: S.getZoom() });
      }), N.current = S, A("ok");
    }).catch(() => k && A("fail")), () => {
      k = !1, Me.delete(i);
    };
  }, [b]), W(() => {
    let k = N.current;
    if (!k) return;
    let i = k.getCenter();
    (Math.abs(i.lat() - a.lat) > 1e-6 || Math.abs(i.lng() - a.lng) > 1e-6) && k.panTo({ lat: a.lat, lng: a.lng }), Math.round(a.z) !== k.getZoom() && k.setZoom(Math.round(a.z));
  }, [a.lat, a.lng, a.z]);
  let m = (k, i, h) => {
    let w = c.current, F = i ? 34 : 28, E = i ? 44 : 36;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(Ee(k, i, h).replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
      scaledSize: new w.Size(F, E),
      anchor: new w.Point(F / 2, E)
    };
  };
  return W(() => {
    let k = N.current, i = c.current;
    !k || !i || (z.current.forEach((h) => h.setMap(null)), z.current = r.map((h) => {
      let w = new i.Marker({ position: { lat: h.lat, lng: h.lng }, map: k, title: h.label, icon: m(h.color, h.id === j, h.text), zIndex: h.id === j ? 10 : 1 });
      return w.addListener("click", () => l.current.onPinTap(h.id)), w;
    }));
  }, [r, j, u]), W(() => {
    let k = N.current, i = c.current;
    g.current && g.current.setMap(null), g.current = null, !(!k || !i || !s) && (g.current = new i.Marker({ position: { lat: s.lat, lng: s.lng }, map: k, icon: m("#14213D", !0), zIndex: 20, clickable: !1 }));
  }, [s, u]), u === "fail" ? /* @__PURE__ */ e(Ia, { ...t }) : /* @__PURE__ */ o("div", { className: "jt-mlwrap", children: [
    /* @__PURE__ */ e("div", { ref: v, className: "jt-ml", role: "application", "aria-label": "구글 지도. 가게나 명소를 누르면 저장할 수 있어요" }),
    u === "loading" && /* @__PURE__ */ e("div", { className: "jt-mlmsg", role: "status", children: "구글 지도 불러오는 중" })
  ] });
}
function Da(t) {
  return t.gkey && !kt ? /* @__PURE__ */ e(zo, { ...t }) : /* @__PURE__ */ e(Ia, { ...t });
}
var xa = [
  { id: "food", label: "맛집", wish: "맛집", g: ["restaurant"], osm: '["amenity"~"^(restaurant|fast_food)$"]' },
  { id: "cafe", label: "카페", wish: "맛집", g: ["cafe", "bakery"], osm: '["amenity"="cafe"]' },
  { id: "sight", label: "볼거리", wish: "관광", g: ["tourist_attraction", "museum", "park"], osm: '["tourism"~"^(attraction|museum|viewpoint|gallery)$"]' },
  { id: "shop", label: "쇼핑", wish: "쇼핑", g: ["shopping_mall", "department_store", "clothing_store"], osm: '["shop"~"^(mall|department_store|clothes)$"]' },
  { id: "conv", label: "편의점", wish: "기타", g: ["convenience_store"], osm: '["shop"="convenience"]' }
], Eo = [500, 1e3, 2e3], we = (t) => t >= 1e3 ? t / 1e3 + "km" : t + "m";
function re(t, a) {
  let n = (f) => f * Math.PI / 180, r = n(a.lat - t.lat), s = n(a.lng - t.lng), j = Math.sin(r / 2) ** 2 + Math.cos(n(t.lat)) * Math.cos(n(a.lat)) * Math.sin(s / 2) ** 2;
  return 2 * 6371e3 * Math.asin(Math.sqrt(j));
}
var Fa = (t) => (t < 1e3 ? `${Math.round(t / 10) * 10}m` : `${(t / 1e3).toFixed(1)}km`) + `, 걸어서 ${Math.max(1, Math.round(t / 75))}분`;
async function Mo(t, a, n, r) {
  let s = await $e(t), { Place: j, SearchNearbyRankPreference: f } = await s.importLibrary("places"), { places: p } = await j.searchNearby({
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
    locationRestriction: { center: a, radius: r },
    includedTypes: n.g,
    maxResultCount: 15,
    rankPreference: f.POPULARITY,
    language: "ko"
  }), d = [];
  for (let b of p || []) {
    let v;
    try {
      v = b.regularOpeningHours ? await b.isOpen() : void 0;
    } catch {
      v = void 0;
    }
    d.push({
      id: b.id,
      placeId: b.id,
      name: b.displayName,
      lat: b.location.lat(),
      lng: b.location.lng(),
      type: b.primaryTypeDisplayName || n.label,
      rating: b.rating,
      count: b.userRatingCount,
      addr: b.formattedAddress || "",
      url: b.googleMapsURI || "",
