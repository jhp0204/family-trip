] })
    ] }),
    l && !x && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    m && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    l && x && !m && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      $e(xt(x) - xt(l)),
      " 동안"
    ] }),
    k.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      k.map((F) => `'${F.title}'(${F.time}${F.end ? `~${F.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ e(Y, { label: "장소 (선택)", children: /* @__PURE__ */ e("input", { value: d, onChange: (F) => g(F.target.value), placeholder: "예: 아사쿠사" }) }),
    /* @__PURE__ */ e(Y, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: s, onChange: (F) => w(F.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !f.trim() || m,
        onClick: () => a({ time: l, end: l ? x : "", title: f.trim(), place: d.trim(), memo: s.trim() }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(ht, { onConfirm: r, label: "이 일정 삭제" })
  ] });
}
function Qa({ onSave: t }) {
  let [n, a] = N(""), [r, l] = N("맛집"), [u, x] = N(""), [c, f] = N(""), [y, d] = N("");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(Y, { label: "이름", children: /* @__PURE__ */ e("input", { value: n, onChange: (g) => a(g.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: te.map((g) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (r === g ? " on" : ""), onClick: () => l(g), children: g }, g)) })
    ] }),
    /* @__PURE__ */ e(Y, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: u, onChange: (g) => x(g.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(Y, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: c,
        onChange: (g) => f(g.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(Y, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: y, onChange: (g) => d(g.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !n.trim(),
        onClick: () => t({ name: n.trim(), cat: r, area: u.trim(), link: c.trim(), memo: y.trim() }),
        children: "위시리스트에 추가"
      }
    )
  ] });
}
function Za({ settings: t, me: n, defaultDay: a, initial: r, onSave: l, onDelete: u }) {
  let { members: x, days: c, start: f, rate: y } = t, [d, g] = N(r?.title || ""), [s, w] = N(r ? String(Number(r.amount) || "") : ""), [b, p] = N(r && x.includes(r.payer) ? r.payer : n), [i, m] = N(r?.cat || "식비"), [k, F] = N(r ? Math.min(r.day, c - 1) : a), [h, I] = N(r ? (r.split || []).filter((j) => x.includes(j)) : x), E = Number(s) || 0, K = r ? [r.payer, ...r.split || []].filter((j, v, S) => j && !x.includes(j) && S.indexOf(j) === v) : [], J = (j) => I(h.includes(j) ? h.filter((v) => v !== j) : [...h, j]), L = d.trim() && E > 0 && h.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(Y, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: d, onChange: (j) => g(j.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(Y, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: s, onChange: (j) => w(j.target.value), placeholder: "0" }) }),
    E > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: Et(E, y) }),
      /* @__PURE__ */ e("br", {}),
      Dt(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: Dt(t) }),
    K.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      K.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: x.map((j) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (b === j ? " on" : ""), onClick: () => p(j), children: j }, j)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: x.map((j) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (h.includes(j) ? " on" : ""), onClick: () => J(j), children: [
        h.includes(j) && /* @__PURE__ */ e(ma, { size: 14 }),
        j
      ] }, j)) }),
      E > 0 && h.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        B(E / h.length)
      ] }),
      h.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Ie.map((j) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (i === j ? " on" : ""), onClick: () => m(j), children: j }, j)) })
    ] }),
    /* @__PURE__ */ e(Y, { label: "날짜", children: /* @__PURE__ */ e("select", { value: k, onChange: (j) => F(Number(j.target.value)), children: Array.from({ length: c }, (j, v) => {
      let S = et(f, v);
      return /* @__PURE__ */ o("option", { value: v, children: [
        v + 1,
        "일차 ",
        zt(S),
        " (",
        Ct(S),
        ")"
      ] }, v);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !L,
        onClick: () => l({ title: d.trim(), amount: E, payer: b, cat: i, day: k, split: h }),
        children: r ? "수정 저장" : "경비 기록하기"
      }
    ),
    r && /* @__PURE__ */ e(ht, { onConfirm: u, label: "이 경비 삭제" })
  ] });
}
function Va({ initial: t, onSave: n, onDelete: a }) {
  let [r, l] = N(t?.text || ""), [u, x] = N(t?.urls || []), [c, f] = N(""), [y, d] = N(() => (t?.photos || []).map((h) => ({ id: h }))), [g, s] = N(!1), [w, b] = N(""), p = ft(null), i = () => {
    if (!c.trim()) return;
    let h = je(c);
    if (!h) {
      b("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    u.includes(h) || x([...u, h]), f(""), b("");
  }, m = async (h) => {
    let I = Array.from(h || []).filter((L) => L.type.startsWith("image/"));
    if (!I.length) return;
    let E = wt - y.length;
    if (E <= 0) {
      b(`사진은 글 하나에 ${wt}장까지 올릴 수 있어요.`);
      return;
    }
    s(!0), b("사진 준비 중");
    let K = [], J = 0;
    for (let L of I.slice(0, E))
      try {
        K.push({ id: lt(), data: await Oa(L) });
      } catch {
        J++;
      }
    d((L) => [...L, ...K]), s(!1), J ? b(`${J}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : I.length > E ? b(`${wt}장까지만 넣었어요.`) : b(""), p.current && (p.current.value = "");
  }, k = async () => {
    let h = u;
    if (c.trim()) {
      let E = je(c);
      if (!E) {
        b("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      h.includes(E) || (h = [...h, E]);
    }
    s(!0), b(y.some((E) => E.data) ? "사진 올리는 중" : ""), await n({ text: r.trim(), urls: h, photos: y }) || (s(!1), b("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, F = !g && (r.trim() || u.length || c.trim() || y.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: r,
        onChange: (h) => l(h.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    y.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: y.map((h) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(ae, { id: h.id, data: h.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => d(y.filter((I) => I.id !== h.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(bt, { size: 14 })
        }
      )
    ] }, h.id)) }),
    /* @__PURE__ */ e(
      "input",
      {
        ref: p,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (h) => m(h.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => p.current && p.current.click(),
        disabled: g || y.length >= wt,
        children: [
          /* @__PURE__ */ e(fa, { size: 17 }),
          "사진 추가 (",
          y.length,
          "/",
          wt,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      u.map((h) => /* @__PURE__ */ e(_e, { url: h, onRemove: () => x(u.filter((I) => I !== h)) }, h)),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: c,
            onChange: (h) => f(h.target.value),
            onKeyDown: (h) => h.key === "Enter" && i(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: i, children: "추가" })
      ] })
    ] }),
    w && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: w }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !F, onClick: k, children: g ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(ht, { onConfirm: a, label: "이 글 삭제" })
  ] });
}
var It = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Te = 16;
function Qt(t) {
  return t === 0 ? { Icon: za, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: Ca, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: xe, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: Ea, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: Fa, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: Sa, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: Ma, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: Aa, label: "뇌우", tone: "#7B5FC4" } : { Icon: xe, label: "흐림", tone: "#66718A" };
}
var ut = (t) => t == null ? "–" : Math.round(t) + "°", ze = /* @__PURE__ */ new Map();
async function Ce(t) {
  let n = ze.get(t);
  if (n && Date.now() - n.at < 30 * 6e4) return n.d;
  let a = await fetch(t);
  if (!a.ok) throw new Error("weather " + a.status);
  let r = await a.json();
  return ze.set(t, { at: Date.now(), d: r }), r;
}
var Ee = (t, n) => {
  let a = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + n}-${a}`;
};
function tn(t, n) {
  let [a, r] = N({ status: "loading" });
  return Z(() => {
    let l = !0, u = async () => {
      try {
        let c = `latitude=${It.lat}&longitude=${It.lng}&timezone=Asia%2FTokyo`, f = await Ce(
          `https://api.open-meteo.com/v1/forecast?${c}&forecast_days=${Te}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), y = {};
        f.daily.time.forEach((p, i) => {
          y[p] = {
            code: f.daily.weather_code[i],
            max: f.daily.temperature_2m_max[i],
            min: f.daily.temperature_2m_min[i],
            pop: f.daily.precipitation_probability_max[i],
            sum: f.daily.precipitation_sum[i]
          };
        });
        let d = {};
        f.hourly.time.forEach((p, i) => {
          d[p.slice(0, 13)] = {
            t: f.hourly.temperature_2m[i],
            pop: f.hourly.precipitation_probability[i],
            code: f.hourly.weather_code[i]
          };
        });
        let g = tt(/* @__PURE__ */ new Date()), w = Array.from({ length: n }, (p, i) => tt(et(t, i))).filter((p) => !y[p] && p > g), b = {};
        if (w.length) {
          let p = await Promise.all(
            [1, 2, 3].map(
              (m) => Ce(
                `https://archive-api.open-meteo.com/v1/archive?${c}&start_date=${Ee(w[0], -m)}&end_date=${Ee(w[w.length - 1], -m)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), i = {};
          p.filter(Boolean).forEach(
            (m) => m.daily.time.forEach((k, F) => {
              let h = m.daily.temperature_2m_max[F];
              if (h == null) return;
              let I = k.slice(5), E = i[I] || (i[I] = { max: 0, min: 0, wet: 0, n: 0 });
              E.max += h, E.min += m.daily.temperature_2m_min[F], E.wet += (m.daily.precipitation_sum[F] || 0) >= 1 ? 1 : 0, E.n++;
            })
          ), w.forEach((m) => {
            let k = i[m.slice(5) === "02-29" ? "02-28" : m.slice(5)];
            k && k.n && (b[m] = { max: k.max / k.n, min: k.min / k.n, wet: k.wet, n: k.n });
          });
        }
        l && r({ status: "ok", daily: y, hourly: d, climate: b, at: /* @__PURE__ */ new Date() });
      } catch {
        l && r((f) => f.status === "ok" ? f : { status: "error" });
      }
    };
    u();
    let x = setInterval(u, 30 * 6e4);
    return () => {
      l = !1, clearInterval(x);
    };
  }, [t, n]), a;
}
function en({ date: t, w: n }) {
  let a = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      It.name,
      " 날씨"
    ] }),
    n.status === "ok" && n.daily[t] && /* @__PURE__ */ e("em", { children: `${q(n.at.getHours())}:${q(n.at.getMinutes())} 업데이트` })
  ] });
  if (n.status === "loading")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      a,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (n.status === "error")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      a,
      /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let r = n.daily[t];
  if (r) {
    let { Icon: u, label: x, tone: c } = Qt(r.code), f = (r.pop || 0) >= 50 || (r.sum || 0) >= 1, y = ["09", "12", "15", "18", "21"].map((d) => ({ h: d, v: n.hourly[`${t}T${d}`] })).filter((d) => d.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      a,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(u, { size: 40, color: c, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: x }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: ut(r.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: ut(r.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(Da, { size: 15, "aria-hidden": "true" }),
          r.pop == null ? "–" : r.pop + "%"
        ] })
      ] }),
      f && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      y.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: y.map(({ h: d, v: g }) => {
        let s = Qt(g.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            d,
            "시"
          ] }),
          /* @__PURE__ */ e(s.Icon, { size: 18, color: s.tone, "aria-label": s.label }),
          /* @__PURE__ */ e("b", { children: ut(g.t) }),
          /* @__PURE__ */ e("em", { children: g.pop == null ? "" : g.pop + "%" })
        ] }, d);
      }) })
    ] });
  }
  let l = n.climate[t];
  return l ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    a,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      Te,
      "일 전부터 나와요. 최근 ",
      l.n,
      "년 같은 날 ",
      It.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: ut(l.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: ut(l.min) }),
      "였고, ",
      l.n,
      "번 중 ",
      l.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    a,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function an({ v: t }) {
  if (!t) return null;
  let { Icon: n, label: a, tone: r } = Qt(t.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: a, children: [
    /* @__PURE__ */ e(n, { size: 14, color: r, "aria-hidden": "true" }),
    ut(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var Fe = 56;
function nn({ items: t, isToday: n, onEdit: a, members: r }) {
  let [l, u] = N(() => {
    let i = /* @__PURE__ */ new Date();
    return i.getHours() * 60 + i.getMinutes();
  });
  Z(() => {
    if (!n) return;
    let i = setInterval(() => {
      let m = /* @__PURE__ */ new Date();
      u(m.getHours() * 60 + m.getMinutes());
    }, 6e4);
    return () => clearInterval(i);
  }, [n]);
  let x = t.filter((i) => i.time).map((i) => ({ ...i, ...Ft(i) })).sort((i, m) => i.s - m.s || i.e - m.e);
  if (!x.length) return null;
  let c = [], f = [], y = -1;
  x.forEach((i) => {
    f.length && i.s >= y && (c.push(f), f = [], y = -1), f.push(i), y = Math.max(y, i.e);
  }), f.length && c.push(f);
  let d = [];
  c.forEach((i) => {
    let m = [];
    i.forEach((k) => {
      let F = m.findIndex((h) => h <= k.s);
      F === -1 ? (F = m.length, m.push(k.e)) : m[F] = k.e, d.push({ ...k, col: F, cl: i });
    }), i.ncol = m.length;
  });
  let g = Math.min(8, Math.floor(x[0].s / 60)), s = Math.max(21, Math.ceil(Math.max(...x.map((i) => i.e)) / 60)), w = Array.from({ length: s - g + 1 }, (i, m) => g + m), b = (i) => (i - g * 60) / 60 * Fe, p = t.length - x.length;
  return /* @__PURE__ */ o("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ o("div", { className: "jt-tt", style: { height: (s - g) * Fe + 14 }, children: [
      w.map((i) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: b(i * 60) }, children: /* @__PURE__ */ o("span", { children: [
        q(i % 24),
        ":00"
      ] }) }, i)),
      /* @__PURE__ */ e("div", { className: "jt-tt-lane", children: d.map((i) => {
        let m = i.cl.ncol, k = Math.max(24, b(i.e) - b(i.s) - 3);
        return /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-tt-block" + (k < 44 ? " short" : "") + (m > 1 ? " clash" : ""),
            style: {
              top: b(i.s) + 1,
              height: k,
              left: `calc(${i.col / m * 100}% + 2px)`,
              width: `calc(${100 / m}% - 4px)`
            },
            onClick: () => a(i),
            "aria-label": `${i.time} ${i.title} 고치기`,
            children: [
              /* @__PURE__ */ e("strong", { children: i.title }),
              /* @__PURE__ */ o("span", { children: [
                Xt(i.s),
                "~",
                Xt(i.e % (24 * 60)),
                i.place ? `, ${i.place}` : ""
              ] })
            ]
          },
          i.id
        );
      }) }),
      n && l >= g * 60 && l <= s * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: b(l) }, "aria-label": `지금 ${Xt(l)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    p > 0 && /* @__PURE__ */ o("p", { className: "jt-hint jt-tt-note", children: [
      "시간을 정하지 않은 일정 ",
      p,
      "개는 위 목록에만 보여요."
    ] })
  ] });
}
function on({ settings: t, schedule: n, day: a, setDay: r, onEdit: l }) {
  let { start: u, days: x, members: c } = t, f = U[a % U.length], y = n.filter((b) => b.day === a).sort((b, p) => (b.time || "99:99").localeCompare(p.time || "99:99")), d = Ta(y), g = tt(et(u, a)), s = g === tt(/* @__PURE__ */ new Date()), w = tn(u, x);
  return /* @__PURE__ */ o("section", { style: { "--lc": f }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: x }, (b, p) => {
      let i = et(u, p), m = p === a;
      return /* @__PURE__ */ o(
        "button",
        {
          role: "tab",
          "aria-selected": m,
          className: "jt-day" + (m ? " active" : ""),
          style: { "--lc": U[p % U.length] },
          onClick: () => r(p),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: p + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: zt(i) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: Ct(i) })
          ]
        },
        p
      );
    }) }),
    /* @__PURE__ */ e(en, { date: g, w }),
    y.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ e("ol", { className: "jt-line", children: y.map((b) => {
      let p = b.time ? Ft(b) : null;
      return /* @__PURE__ */ o("li", { className: "jt-row", children: [
        /* @__PURE__ */ e("div", { className: "jt-time", children: b.time || "미정" }),
        /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
        /* @__PURE__ */ o(
          "div",
          {
            className: "jt-card",
            role: "button",
            tabIndex: 0,
            onClick: () => l(b),
            onKeyDown: (i) => i.key === "Enter" && l(b),
            children: [
              /* @__PURE__ */ o("div", { className: "jt-card-top", children: [
                /* @__PURE__ */ e("div", { className: "jt-card-title", children: b.title }),
                b.time && w.status === "ok" && /* @__PURE__ */ e(an, { v: w.hourly[`${g}T${b.time.slice(0, 2)}`] })
              ] }),
              p && b.end && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                b.time,
                "~",
                b.end,
                ", ",
                $e(p.e - p.s)
              ] }),
              d.has(b.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              b.place && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(Zt, { size: 13 }),
                b.place
              ] }),
              b.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: b.memo }),
              (b.place || b.link || _t(b)) && /* @__PURE__ */ o(
                "a",
                {
                  className: "jt-maplink inline",
                  href: ee(b),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (i) => i.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Pt, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "jt-by", children: [
                /* @__PURE__ */ e(V, { name: b.by, members: c, size: 16 }),
                b.by
              ] })
            ]
          }
        )
      ] }, b.id);
    }) }),
    /* @__PURE__ */ e(nn, { items: y, isToday: s, onEdit: l, members: c })
  ] });
}
function rn({ view: t, setView: n, pins: a, temp: r, selectedId: l, onTap: u, onPinTap: x }) {
  let c = ft(null), [f, y] = N({ w: 0, h: 0 }), d = ft(/* @__PURE__ */ new Map()), g = ft({ moved: !1, startDist: 0 }), s = ft(0), [w, b] = N({ ok: 0, bad: 0 });
  Z(() => {
    let v = c.current;
    if (!v) return;
    let S = () => y({ w: v.clientWidth, h: v.clientHeight });
    S();
    let _ = new ResizeObserver(S);
    return _.observe(v), () => _.disconnect();
  }, []);
  let p = t.z, i = qt(t.lat, t.lng, p), m = i.x - f.w / 2, k = i.y - f.h / 2, F = 2 ** p, h = [];
  if (f.w) {
    let v = Math.floor(m / rt), S = Math.floor((m + f.w) / rt), _ = Math.max(0, Math.floor(k / rt)), H = Math.min(F - 1, Math.floor((k + f.h) / rt));
    for (let D = v; D <= S; D++)
      for (let O = _; O <= H; O++) {
        let dt = (D % F + F) % F;
        h.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${p}/${dt}/${O}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => b((Q) => Q.ok ? Q : { ...Q, ok: 1 }),
              onError: () => b((Q) => Q.bad ? Q : { ...Q, bad: 1 }),
              style: { left: Math.round(D * rt - m), top: Math.round(O * rt - k) }
