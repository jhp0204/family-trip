let [o, i] = N(t?.name || ""), [f, g] = N(t?.cat || "맛집"), [c, d] = N(t?.area || ""), [x, j] = N(t?.link || ""), [y, h] = N(t?.memo || "");
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(Q, { label: "이름", children: /* @__PURE__ */ e("input", { value: o, onChange: (w) => i(w.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: fe.map((w) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (f === w ? " on" : ""), onClick: () => g(w), children: w }, w)) })
    ] }),
    /* @__PURE__ */ e(Q, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: c, onChange: (w) => d(w.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(Q, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: x,
        onChange: (w) => j(w.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(Q, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: y, onChange: (w) => h(w.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !o.trim(),
        onClick: () => a({ name: o.trim(), cat: f, area: c.trim(), link: x.trim(), memo: y.trim() }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(ut, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function Dn({ settings: t, me: a, defaultDay: n, initial: o, onSave: i, onDelete: f }) {
  let { members: g, days: c, start: d, rate: x } = t, [j, y] = N(o?.title || ""), [h, w] = N(o ? String(Number(o.amount) || "") : ""), [m, p] = N(o && g.includes(o.payer) ? o.payer : a), [s, v] = N(o?.cat || "식비"), [u, b] = N(o ? Math.min(o.day, c - 1) : n), [l, M] = N(o ? (o.split || []).filter((z) => g.includes(z)) : g), F = Number(h) || 0, U = o ? [o.payer, ...o.split || []].filter((z, k, R) => z && !g.includes(z) && R.indexOf(z) === k) : [], S = (z) => M(l.includes(z) ? l.filter((k) => k !== z) : [...l, z]), _ = j.trim() && F > 0 && l.length > 0;
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(Q, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: j, onChange: (z) => y(z.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(Q, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: h, onChange: (z) => w(z.target.value), placeholder: "0" }) }),
    F > 0 ? /* @__PURE__ */ r("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: $t(F, x) }),
      /* @__PURE__ */ e("br", {}),
      Wt(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: Wt(t) }),
    U.length > 0 && /* @__PURE__ */ r("p", { className: "jt-warn-inline", children: [
      U.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: g.map((z) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (m === z ? " on" : ""), onClick: () => p(z), children: z }, z)) })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: g.map((z) => /* @__PURE__ */ r("button", { type: "button", className: "jt-chip" + (l.includes(z) ? " on" : ""), onClick: () => S(z), children: [
        l.includes(z) && /* @__PURE__ */ e(Ve, { size: 14 }),
        z
      ] }, z)) }),
      F > 0 && l.length > 0 && /* @__PURE__ */ r("p", { className: "jt-hint", children: [
        "1인당 ",
        J(F / l.length)
      ] }),
      l.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: ea.map((z) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (s === z ? " on" : ""), onClick: () => v(z), children: z }, z)) })
    ] }),
    /* @__PURE__ */ e(Q, { label: "날짜", children: /* @__PURE__ */ e("select", { value: u, onChange: (z) => b(Number(z.target.value)), children: Array.from({ length: c }, (z, k) => {
      let R = rt(d, k);
      return /* @__PURE__ */ r("option", { value: k, children: [
        k + 1,
        "일차 ",
        Dt(R),
        " (",
        Pt(R),
        ")"
      ] }, k);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !_,
        onClick: () => i({ title: j.trim(), amount: F, payer: m, cat: s, day: u, split: l }),
        children: o ? "수정 저장" : "경비 기록하기"
      }
    ),
    o && /* @__PURE__ */ e(ut, { onConfirm: f, label: "이 경비 삭제" })
  ] });
}
function Pn({ initial: t, onSave: a, onDelete: n }) {
  let [o, i] = N(t?.text || ""), [f, g] = N(t?.urls || []), [c, d] = N(""), [x, j] = N(() => (t?.photos || []).map((l) => ({ id: l }))), [y, h] = N(!1), [w, m] = N(""), p = G(null), s = () => {
    if (!c.trim()) return;
    let l = _e(c);
    if (!l) {
      m("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    f.includes(l) || g([...f, l]), d(""), m("");
  }, v = async (l) => {
    let M = Array.from(l || []).filter((_) => _.type.startsWith("image/"));
    if (!M.length) return;
    let F = Mt - x.length;
    if (F <= 0) {
      m(`사진은 글 하나에 ${Mt}장까지 올릴 수 있어요.`);
      return;
    }
    h(!0), m("사진 준비 중");
    let U = [], S = 0;
    for (let _ of M.slice(0, F))
      try {
        U.push({ id: lt(), data: await wn(_) });
      } catch {
        S++;
      }
    j((_) => [..._, ...U]), h(!1), S ? m(`${S}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : M.length > F ? m(`${Mt}장까지만 넣었어요.`) : m(""), p.current && (p.current.value = "");
  }, u = async () => {
    let l = f;
    if (c.trim()) {
      let F = _e(c);
      if (!F) {
        m("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      l.includes(F) || (l = [...l, F]);
    }
    h(!0), m(x.some((F) => F.data) ? "사진 올리는 중" : ""), await a({ text: o.trim(), urls: l, photos: x }) || (h(!1), m("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, b = !y && (o.trim() || f.length || c.trim() || x.length);
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: o,
        onChange: (l) => i(l.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    x.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: x.map((l) => /* @__PURE__ */ r("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(he, { id: l.id, data: l.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => j(x.filter((M) => M.id !== l.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(Nt, { size: 14 })
        }
      )
    ] }, l.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: p,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (l) => v(l.target.files)
      }
    ),
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => p.current && p.current.click(),
        disabled: y || x.length >= Mt,
        children: [
          /* @__PURE__ */ e(Ua, { size: 17 }),
          "사진 추가 (",
          x.length,
          "/",
          Mt,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      f.map((l) => /* @__PURE__ */ e(ia, { url: l, onRemove: () => g(f.filter((M) => M !== l)) }, l)),
      /* @__PURE__ */ r("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: c,
            onChange: (l) => d(l.target.value),
            onKeyDown: (l) => l.key === "Enter" && s(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: s, children: "추가" })
      ] })
    ] }),
    w && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: w }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !b, onClick: u, children: y ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(ut, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
var wt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, sa = 16;
function le(t) {
  return t === 0 ? { Icon: tn, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: en, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: $e, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: an, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: nn, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: on, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: rn, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: sn, label: "뇌우", tone: "#7B5FC4" } : { Icon: $e, label: "흐림", tone: "#66718A" };
}
var xt = (t) => t == null ? "–" : Math.round(t) + "°", Ke = /* @__PURE__ */ new Map();
async function He(t) {
  let a = Ke.get(t);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(t);
  if (!n.ok) throw new Error("weather " + n.status);
  let o = await n.json();
  return Ke.set(t, { at: Date.now(), d: o }), o;
}
var Ye = (t, a) => {
  let n = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + a}-${n}`;
};
function $n(t, a) {
  let [n, o] = N({ status: "loading" });
  return K(() => {
    let i = !0, f = async () => {
      try {
        let c = `latitude=${wt.lat}&longitude=${wt.lng}&timezone=Asia%2FTokyo`, d = await He(
          `https://api.open-meteo.com/v1/forecast?${c}&forecast_days=${sa}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), x = {};
        d.daily.time.forEach((p, s) => {
          x[p] = {
            code: d.daily.weather_code[s],
            max: d.daily.temperature_2m_max[s],
            min: d.daily.temperature_2m_min[s],
            pop: d.daily.precipitation_probability_max[s],
            sum: d.daily.precipitation_sum[s]
          };
        });
        let j = {};
        d.hourly.time.forEach((p, s) => {
          j[p.slice(0, 13)] = {
            t: d.hourly.temperature_2m[s],
            pop: d.hourly.precipitation_probability[s],
            code: d.hourly.weather_code[s]
          };
        });
        let y = ot(/* @__PURE__ */ new Date()), w = Array.from({ length: a }, (p, s) => ot(rt(t, s))).filter((p) => !x[p] && p > y), m = {};
        if (w.length) {
          let p = await Promise.all(
            [1, 2, 3].map(
              (v) => He(
                `https://archive-api.open-meteo.com/v1/archive?${c}&start_date=${Ye(w[0], -v)}&end_date=${Ye(w[w.length - 1], -v)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), s = {};
          p.filter(Boolean).forEach(
            (v) => v.daily.time.forEach((u, b) => {
              let l = v.daily.temperature_2m_max[b];
              if (l == null) return;
              let M = u.slice(5), F = s[M] || (s[M] = { max: 0, min: 0, wet: 0, n: 0 });
              F.max += l, F.min += v.daily.temperature_2m_min[b], F.wet += (v.daily.precipitation_sum[b] || 0) >= 1 ? 1 : 0, F.n++;
            })
          ), w.forEach((v) => {
            let u = s[v.slice(5) === "02-29" ? "02-28" : v.slice(5)];
            u && u.n && (m[v] = { max: u.max / u.n, min: u.min / u.n, wet: u.wet, n: u.n });
          });
        }
        i && o({ status: "ok", daily: x, hourly: j, climate: m, at: /* @__PURE__ */ new Date() });
      } catch {
        i && o((d) => d.status === "ok" ? d : { status: "error" });
      }
    };
    f();
    let g = setInterval(f, 30 * 6e4);
    return () => {
      i = !1, clearInterval(g);
    };
  }, [t, a]), n;
}
function Rn({ date: t, w: a }) {
  let n = /* @__PURE__ */ r("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ r("span", { children: [
      wt.name,
      " 날씨"
    ] }),
    a.status === "ok" && a.daily[t] && /* @__PURE__ */ e("em", { children: `${et(a.at.getHours())}:${et(a.at.getMinutes())} 업데이트` })
  ] });
  if (a.status === "loading")
    return /* @__PURE__ */ r("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (a.status === "error")
    return /* @__PURE__ */ r("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let o = a.daily[t];
  if (o) {
    let { Icon: f, label: g, tone: c } = le(o.code), d = (o.pop || 0) >= 50 || (o.sum || 0) >= 1, x = ["09", "12", "15", "18", "21"].map((j) => ({ h: j, v: a.hourly[`${t}T${j}`] })).filter((j) => j.v);
    return /* @__PURE__ */ r("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ r("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(f, { size: 40, color: c, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ r("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: g }),
          /* @__PURE__ */ r("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: xt(o.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: xt(o.min) })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(ln, { size: 15, "aria-hidden": "true" }),
          o.pop == null ? "–" : o.pop + "%"
        ] })
      ] }),
      d && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      x.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: x.map(({ h: j, v: y }) => {
        let h = le(y.code);
        return /* @__PURE__ */ r("li", { children: [
          /* @__PURE__ */ r("span", { children: [
            j,
            "시"
          ] }),
          /* @__PURE__ */ e(h.Icon, { size: 18, color: h.tone, "aria-label": h.label }),
          /* @__PURE__ */ e("b", { children: xt(y.t) }),
          /* @__PURE__ */ e("em", { children: y.pop == null ? "" : y.pop + "%" })
        ] }, j);
      }) })
    ] });
  }
  let i = a.climate[t];
  return i ? /* @__PURE__ */ r("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ r("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      sa,
      "일 전부터 나와요. 최근 ",
      i.n,
      "년 같은 날 ",
      wt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: xt(i.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: xt(i.min) }),
      "였고, ",
      i.n,
      "번 중 ",
      i.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ r("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function _n({ v: t }) {
  if (!t) return null;
  let { Icon: a, label: n, tone: o } = le(t.code);
  return /* @__PURE__ */ r("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ e(a, { size: 14, color: o, "aria-hidden": "true" }),
    xt(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ r("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var Je = 56;
function Ln({ items: t, isToday: a, onEdit: n, members: o }) {
  let [i, f] = N(() => {
    let s = /* @__PURE__ */ new Date();
    return s.getHours() * 60 + s.getMinutes();
  });
  K(() => {
    if (!a) return;
    let s = setInterval(() => {
      let v = /* @__PURE__ */ new Date();
      f(v.getHours() * 60 + v.getMinutes());
    }, 6e4);
    return () => clearInterval(s);
  }, [a]);
  let g = t.filter((s) => s.time).map((s) => ({ ...s, ...Rt(s) })).sort((s, v) => s.s - v.s || s.e - v.e);
  if (!g.length) return null;
  let c = [], d = [], x = -1;
  g.forEach((s) => {
    d.length && s.s >= x && (c.push(d), d = [], x = -1), d.push(s), x = Math.max(x, s.e);
  }), d.length && c.push(d);
  let j = [];
  c.forEach((s) => {
    let v = [];
    s.forEach((u) => {
      let b = v.findIndex((l) => l <= u.s);
      b === -1 ? (b = v.length, v.push(u.e)) : v[b] = u.e, j.push({ ...u, col: b, cl: s });
    }), s.ncol = v.length;
  });
  let y = Math.min(8, Math.floor(g[0].s / 60)), h = Math.max(21, Math.ceil(Math.max(...g.map((s) => s.e)) / 60)), w = Array.from({ length: h - y + 1 }, (s, v) => y + v), m = (s) => (s - y * 60) / 60 * Je, p = t.length - g.length;
  return /* @__PURE__ */ r("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ r("div", { className: "jt-tt", style: { height: (h - y) * Je + 14 }, children: [
      w.map((s) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: m(s * 60) }, children: /* @__PURE__ */ r("span", { children: [
        et(s % 24),
        ":00"
      ] }) }, s)),
      /* @__PURE__ */ e("div", { className: "jt-tt-lane", children: j.map((s) => {
        let v = s.cl.ncol, u = Math.max(24, m(s.e) - m(s.s) - 3);
        return /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "jt-tt-block" + (u < 44 ? " short" : "") + (v > 1 ? " clash" : ""),
            style: {
              top: m(s.s) + 1,
              height: u,
              left: `calc(${s.col / v * 100}% + 2px)`,
              width: `calc(${100 / v}% - 4px)`
            },
            onClick: () => n(s),
            "aria-label": `${s.time} ${s.title} 고치기`,
            children: [
              /* @__PURE__ */ e("strong", { children: s.title }),
              /* @__PURE__ */ r("span", { children: [
                oe(s.s),
                "~",
                oe(s.e % (24 * 60)),
                s.place ? `, ${s.place}` : ""
              ] })
            ]
          },
          s.id
        );
      }) }),
      a && i >= y * 60 && i <= h * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: m(i) }, "aria-label": `지금 ${oe(i)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    p > 0 && /* @__PURE__ */ r("p", { className: "jt-hint jt-tt-note", children: [
      "시간을 정하지 않은 일정 ",
      p,
      "개는 위 목록에만 보여요."
    ] })
  ] });
}
function Tn({ settings: t, schedule: a, day: n, setDay: o, onEdit: i, me: f, onComment: g, onDelComment: c, onReact: d }) {
  let [x, j] = N(null), { start: y, days: h, members: w } = t, m = Z[n % Z.length], p = a.filter((l) => l.day === n).sort((l, M) => (l.time || "99:99").localeCompare(M.time || "99:99")), s = bn(p), v = ot(rt(y, n)), u = v === ot(/* @__PURE__ */ new Date()), b = $n(y, h);
  return /* @__PURE__ */ r("section", { style: { "--lc": m }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: h }, (l, M) => {
      let F = rt(y, M), U = M === n;
      return /* @__PURE__ */ r(
        "button",
        {
          role: "tab",
          "aria-selected": U,
          className: "jt-day" + (U ? " active" : ""),
          style: { "--lc": Z[M % Z.length] },
          onClick: () => o(M),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: M + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: Dt(F) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: Pt(F) })
          ]
        },
        M
      );
    }) }),
    /* @__PURE__ */ e(Rn, { date: v, w: b }),
    p.length === 0 ? /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ e("ol", { className: "jt-line", children: p.map((l) => {
      let M = l.time ? Rt(l) : null;
      return /* @__PURE__ */ r("li", { className: "jt-row", children: [
        /* @__PURE__ */ e("div", { className: "jt-time", children: l.time || "미정" }),
        /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
        /* @__PURE__ */ r(
          "div",
          {
            className: "jt-card",
            role: "button",
            tabIndex: 0,
            onClick: () => i(l),
            onKeyDown: (F) => F.key === "Enter" && i(l),
            children: [
              /* @__PURE__ */ r("div", { className: "jt-card-top", children: [
                /* @__PURE__ */ e("div", { className: "jt-card-title", children: l.title }),
                l.time && b.status === "ok" && /* @__PURE__ */ e(_n, { v: b.hourly[`${v}T${l.time.slice(0, 2)}`] })
              ] }),
              M && l.end && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
                l.time,
                "~",
                l.end,
                ", ",
                na(M.e - M.s)
              ] }),
              s.has(l.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              l.place && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(me, { size: 13 }),
                l.place
              ] }),
              l.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: l.memo }),
              (l.place || l.link || Lt(l)) && /* @__PURE__ */ r(
                "a",
                {
                  className: "jt-maplink inline",
                  href: Kt(l),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (F) => F.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(_t, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              /* @__PURE__ */ r("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ r("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(nt, { name: l.by, members: w, size: 16 }),
                  l.by
                ] }),
                /* @__PURE__ */ e(Ht, { item: l, me: f, onReact: (F) => d(l.id, F) }),
                /* @__PURE__ */ e(
                  be,
                  {
                    count: (l.comments || []).length,
                    open: x === l.id,
                    onClick: () => j(x === l.id ? null : l.id)
                  }
                )
              ] }),
              x === l.id && /* @__PURE__ */ e(
                Yt,
                {
                  comments: l.comments || [],
                  me: f,
                  members: w,
                  onAdd: (F) => g(l.id, F),
                  onDelete: (F) => c(l.id, F)
                }
              )
            ]
          }
        )
      ] }, l.id);
    }) }),
    /* @__PURE__ */ e(Ln, { items: p, isToday: u, onEdit: i, members: w })
  ] });
}
function Bn({ view: t, setView: a, pins: n, temp: o, selectedId: i, onTap: f, onPinTap: g }) {
  let c = G(null), [d, x] = N({ w: 0, h: 0 }), j = G(/* @__PURE__ */ new Map()), y = G({ moved: !1, startDist: 0 }), h = G(0), [w, m] = N({ ok: 0, bad: 0 });
  K(() => {
    let k = c.current;
    if (!k) return;
    let R = () => x({ w: k.clientWidth, h: k.clientHeight });
    R();
    let T = new ResizeObserver(R);
    return T.observe(k), () => T.disconnect();
  }, []);
  let p = t.z, s = re(t.lat, t.lng, p), v = s.x - d.w / 2, u = s.y - d.h / 2, b = 2 ** p, l = [];
  if (d.w) {
    let k = Math.floor(v / ct), R = Math.floor((v + d.w) / ct), T = Math.max(0, Math.floor(u / ct)), X = Math.min(b - 1, Math.floor((u + d.h) / ct));
    for (let $ = k; $ <= R; $++)
      for (let E = T; E <= X; E++) {
        let H = ($ % b + b) % b;
        l.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${p}/${H}/${E}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => m((B) => B.ok ? B : { ...B, ok: 1 }),
              onError: () => m((B) => B.bad ? B : { ...B, bad: 1 }),
              style: { left: Math.round($ * ct - v), top: Math.round(E * ct - u) }
            },
            `${p}/${$}/${E}`
          )
        );
      }
  }
  let M = (k) => {
    if (!k.target.closest("[data-pin],.jt-zoom,.jt-attr") && (c.current.setPointerCapture(k.pointerId), j.current.set(k.pointerId, { x: k.clientX, y: k.clientY }), j.current.size === 1 && (y.current = { moved: !1, startDist: 0 }), j.current.size === 2)) {
      let [R, T] = [...j.current.values()];
      y.current.startDist = Math.hypot(R.x - T.x, R.y - T.y), y.current.moved = !0;
    }
  }, F = (k) => {
    let R = j.current.get(k.pointerId);
    if (!R) return;
    let T = k.clientX - R.x, X = k.clientY - R.y;
    if (j.current.size === 1) {
      if (!y.current.moved && Math.hypot(T, X) < 4) return;
      y.current.moved = !0, j.current.set(k.pointerId, { x: k.clientX, y: k.clientY }), a(($) => {
        let E = re($.lat, $.lng, $.z), H = Te(E.x - T, E.y - X, $.z);
        return { ...$, lat: Math.max(-80, Math.min(80, H.lat)), lng: H.lng };
      });
    } else
      j.current.set(k.pointerId, { x: k.clientX, y: k.clientY });
  }, U = (k) => {
    let R = j.current.get(k.pointerId);
    if (!R) return;
    let T = j.current.size === 1;
    if (j.current.delete(k.pointerId), y.current.startDist && j.current.size === 1) {
      let [X] = [...j.current.values()], $ = Math.hypot(R.x - X.x, R.y - X.y) / y.current.startDist;
      $ > 1.35 ? a((E) => ({ ...E, z: St(E.z + ($ > 2.6 ? 2 : 1)) })) : $ < 0.7 && a((E) => ({ ...E, z: St(E.z - ($ < 0.38 ? 2 : 1)) })), y.current.startDist = 0;
    }
    if (T && !y.current.moved && k.type === "pointerup") {
      let X = c.current.getBoundingClientRect(), $ = Te(v + (k.clientX - X.left), u + (k.clientY - X.top), p);
      f($.lat, $.lng);
    }
  }, S = (k) => {
    let R = Date.now();
    R - h.current < 250 || (h.current = R, a((T) => ({ ...T, z: St(T.z + (k.deltaY < 0 ? 1 : -1)) })));
  }, _ = (k, R) => {
    let T = re(k, R, p);
    return { left: T.x - v, top: T.y - u };
  }, z = (k) => k.left > -40 && k.left < d.w + 40 && k.top > -50 && k.top < d.h + 40;
  return /* @__PURE__ */ r(
    "div",
    {
      className: "jt-map",
      ref: c,
      onPointerDown: M,
      onPointerMove: F,
      onPointerUp: U,
      onPointerCancel: U,
      onWheel: S,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        l,
        w.bad > 0 && w.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        d.w > 0 && n.map((k) => {
          let R = _(k.lat, k.lng);
          return z(R) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (k.id === i ? " sel" : ""),
              style: { left: R.left, top: R.top, "--pc": k.color },
              onClick: () => g(k.id),
              "aria-label": k.label,
              children: /* @__PURE__ */ e("i", {})
            },
            k.id
          ) : null;
        }),
        d.w > 0 && o && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: _(o.lat, o.lng).left, top: _(o.lat, o.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ r("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((k) => ({ ...k, z: St(k.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((k) => ({ ...k, z: St(k.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var Ge = "https://unpkg.com/maplibre-gl@4.7.1/dist/", On = "https://tiles.openfreemap.org/styles/liberty", Ft = null;
function Un() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Ft || (Ft = new Promise((t, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = Ge + "maplibre-gl.css", document.head.appendChild(n);
    let o = document.createElement("script");
    o.src = Ge + "maplibre-gl.js", o.onload = () => window.maplibregl ? t(window.maplibregl) : a(new Error("maplibre")), o.onerror = () => {
      Ft = null, a(new Error("maplibre"));
    }, document.head.appendChild(o);
  }), Ft);
}
var Wn = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function Kn(t) {
  (t.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        t.setLayoutProperty(a.id, "text-field", Wn);
      } catch {
      }
  });
}
var pe = (t, a) => `<svg width="${a ? 34 : 28}" height="${a ? 44 : 36}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/><circle cx="14" cy="14" r="5.5" fill="#fff"/></svg>`;
function la(t) {
  let { view: a, setView: n, pins: o, temp: i, selectedId: f, onTap: g, onPinTap: c } = t, d = G(null), x = G(null), j = G(null), y = G([]), h = G(null), w = G({});
  w.current = { onTap: g, onPinTap: c, setView: n };
  let [m, p] = N("loading");
  return K(() => {
    let s = !0;
    return Un().then((v) => {
      if (!s || !d.current) return;
      j.current = v;
      let u = new v.Map({
        container: d.current,
        style: On,
        center: [a.lng, a.lat],
        zoom: a.z - 1,
        attributionControl: { compact: !0 },
        dragRotate: !1,
        pitchWithRotate: !1
      });
      u.touchZoomRotate.disableRotation(), u.addControl(new v.NavigationControl({ showCompass: !1 }), "top-right"), u.on("load", () => {
        Kn(u), s && p("ok");
      }), u.on("click", (b) => {
        b.originalEvent && b.originalEvent.target.closest && b.originalEvent.target.closest(".jt-mlpin") || w.current.onTap(b.lngLat.lat, b.lngLat.lng);
      }), u.on("moveend", () => {
        let b = u.getCenter();
        w.current.setView({ lat: b.lat, lng: b.lng, z: u.getZoom() + 1 });
      }), x.current = u, setTimeout(() => s && !u.loaded() && p((b) => b === "loading" ? "slow" : b), 6e3), setTimeout(() => {
        s && x.current === u && !u.loaded() && (u.remove(), x.current = null, p("fail"));
      }, 15e3);
    }).catch(() => s && p("fail")), () => {
      s = !1, x.current && x.current.remove(), x.current = null;
    };
  }, []), K(() => {
    let s = x.current;
    if (!s) return;
    let v = s.getCenter();
    (Math.abs(v.lat - a.lat) > 1e-6 || Math.abs(v.lng - a.lng) > 1e-6 || Math.abs(s.getZoom() + 1 - a.z) > 0.01) && s.flyTo({ center: [a.lng, a.lat], zoom: a.z - 1, duration: 600 });
  }, [a.lat, a.lng, a.z]), K(() => {
    let s = x.current, v = j.current;
    !s || !v || (y.current.forEach((u) => u.remove()), y.current = o.map((u) => {
      let b = document.createElement("button");
      return b.type = "button", b.className = "jt-mlpin" + (u.id === f ? " sel" : ""), b.setAttribute("aria-label", u.label), b.innerHTML = pe(u.color, u.id === f), b.addEventListener("click", (l) => {
        l.stopPropagation(), w.current.onPinTap(u.id);
      }), new v.Marker({ element: b, anchor: "bottom" }).setLngLat([u.lng, u.lat]).addTo(s);
    }));
  }, [o, f, m]), K(() => {
    let s = x.current, v = j.current;
    if (h.current && h.current.remove(), h.current = null, !s || !v || !i) return;
    let u = document.createElement("div");
