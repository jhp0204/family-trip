] })
    ] }),
    s && !f && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    c && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    s && f && !c && /* @__PURE__ */ r("p", { className: "jt-hint", children: [
      Qe(ht(f) - ht(s)),
      " 동안"
    ] }),
    k.length > 0 && /* @__PURE__ */ r("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      k.map((x) => `'${x.title}'(${x.time}${x.end ? `~${x.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ e(V, { label: "장소 (선택)", children: /* @__PURE__ */ e("input", { value: h, onChange: (x) => v(x.target.value), placeholder: "예: 아사쿠사" }) }),
    /* @__PURE__ */ e(V, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: b, onChange: (x) => w(x.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !m.trim() || c,
        onClick: () => n({ time: s, end: s ? f : "", title: m.trim(), place: h.trim(), memo: b.trim() }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(yt, { onConfirm: o, label: "이 일정 삭제" })
  ] });
}
function Cn({ onSave: t }) {
  let [a, n] = C(""), [o, s] = C("맛집"), [g, f] = C(""), [d, m] = C(""), [j, h] = C("");
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(V, { label: "이름", children: /* @__PURE__ */ e("input", { value: a, onChange: (v) => n(v.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: me.map((v) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (o === v ? " on" : ""), onClick: () => s(v), children: v }, v)) })
    ] }),
    /* @__PURE__ */ e(V, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: g, onChange: (v) => f(v.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(V, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: d,
        onChange: (v) => m(v.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(V, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: j, onChange: (v) => h(v.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !a.trim(),
        onClick: () => t({ name: a.trim(), cat: o, area: g.trim(), link: d.trim(), memo: j.trim() }),
        children: "위시리스트에 추가"
      }
    )
  ] });
}
function zn({ settings: t, me: a, defaultDay: n, initial: o, onSave: s, onDelete: g }) {
  let { members: f, days: d, start: m, rate: j } = t, [h, v] = C(o?.title || ""), [b, w] = C(o ? String(Number(o.amount) || "") : ""), [u, p] = C(o && f.includes(o.payer) ? o.payer : a), [i, c] = C(o?.cat || "식비"), [k, x] = C(o ? Math.min(o.day, d - 1) : n), [l, M] = C(o ? (o.split || []).filter((D) => f.includes(D)) : f), I = Number(b) || 0, O = o ? [o.payer, ...o.split || []].filter((D, N, A) => D && !f.includes(D) && A.indexOf(D) === N) : [], z = (D) => M(l.includes(D) ? l.filter((N) => N !== D) : [...l, D]), S = h.trim() && I > 0 && l.length > 0;
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(V, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: h, onChange: (D) => v(D.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(V, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: b, onChange: (D) => w(D.target.value), placeholder: "0" }) }),
    I > 0 ? /* @__PURE__ */ r("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: It(I, j) }),
      /* @__PURE__ */ e("br", {}),
      Ot(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: Ot(t) }),
    O.length > 0 && /* @__PURE__ */ r("p", { className: "jt-warn-inline", children: [
      O.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: f.map((D) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (u === D ? " on" : ""), onClick: () => p(D), children: D }, D)) })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: f.map((D) => /* @__PURE__ */ r("button", { type: "button", className: "jt-chip" + (l.includes(D) ? " on" : ""), onClick: () => z(D), children: [
        l.includes(D) && /* @__PURE__ */ e(Ge, { size: 14 }),
        D
      ] }, D)) }),
      I > 0 && l.length > 0 && /* @__PURE__ */ r("p", { className: "jt-hint", children: [
        "1인당 ",
        H(I / l.length)
      ] }),
      l.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Ze.map((D) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (i === D ? " on" : ""), onClick: () => c(D), children: D }, D)) })
    ] }),
    /* @__PURE__ */ e(V, { label: "날짜", children: /* @__PURE__ */ e("select", { value: k, onChange: (D) => x(Number(D.target.value)), children: Array.from({ length: d }, (D, N) => {
      let A = nt(m, N);
      return /* @__PURE__ */ r("option", { value: N, children: [
        N + 1,
        "일차 ",
        At(A),
        " (",
        Ft(A),
        ")"
      ] }, N);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !S,
        onClick: () => s({ title: h.trim(), amount: I, payer: u, cat: i, day: k, split: l }),
        children: o ? "수정 저장" : "경비 기록하기"
      }
    ),
    o && /* @__PURE__ */ e(yt, { onConfirm: g, label: "이 경비 삭제" })
  ] });
}
function En({ initial: t, onSave: a, onDelete: n }) {
  let [o, s] = C(t?.text || ""), [g, f] = C(t?.urls || []), [d, m] = C(""), [j, h] = C(() => (t?.photos || []).map((l) => ({ id: l }))), [v, b] = C(!1), [w, u] = C(""), p = J(null), i = () => {
    if (!d.trim()) return;
    let l = De(d);
    if (!l) {
      u("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    g.includes(l) || f([...g, l]), m(""), u("");
  }, c = async (l) => {
    let M = Array.from(l || []).filter((S) => S.type.startsWith("image/"));
    if (!M.length) return;
    let I = Ct - j.length;
    if (I <= 0) {
      u(`사진은 글 하나에 ${Ct}장까지 올릴 수 있어요.`);
      return;
    }
    b(!0), u("사진 준비 중");
    let O = [], z = 0;
    for (let S of M.slice(0, I))
      try {
        O.push({ id: it(), data: await fn(S) });
      } catch {
        z++;
      }
    h((S) => [...S, ...O]), b(!1), z ? u(`${z}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : M.length > I ? u(`${Ct}장까지만 넣었어요.`) : u(""), p.current && (p.current.value = "");
  }, k = async () => {
    let l = g;
    if (d.trim()) {
      let I = De(d);
      if (!I) {
        u("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      l.includes(I) || (l = [...l, I]);
    }
    b(!0), u(j.some((I) => I.data) ? "사진 올리는 중" : ""), await a({ text: o.trim(), urls: l, photos: j }) || (b(!1), u("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, x = !v && (o.trim() || g.length || d.trim() || j.length);
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        rows: 4,
        value: o,
        onChange: (l) => s(l.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    j.length > 0 && /* @__PURE__ */ e("div", { className: "jt-thumbs", children: j.map((l) => /* @__PURE__ */ r("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ e(ue, { id: l.id, data: l.data }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => h(j.filter((M) => M.id !== l.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ e(vt, { size: 14 })
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
        onChange: (l) => c(l.target.files)
      }
    ),
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => p.current && p.current.click(),
        disabled: v || j.length >= Ct,
        children: [
          /* @__PURE__ */ e(Ra, { size: 17 }),
          "사진 추가 (",
          j.length,
          "/",
          Ct,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ r("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "링크 (선택)" }),
      g.map((l) => /* @__PURE__ */ e(aa, { url: l, onRemove: () => f(g.filter((M) => M !== l)) }, l)),
      /* @__PURE__ */ r("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: d,
            onChange: (l) => m(l.target.value),
            onKeyDown: (l) => l.key === "Enter" && i(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: i, children: "추가" })
      ] })
    ] }),
    w && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", role: "status", children: w }),
    /* @__PURE__ */ e("button", { className: "jt-primary", disabled: !x, onClick: k, children: v ? "잠시만요" : t ? "수정 저장" : "올리기" }),
    t && /* @__PURE__ */ e(yt, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
var xt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, na = 16;
function ie(t) {
  return t === 0 ? { Icon: Ja, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: Ga, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: Fe, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: qa, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: Xa, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: Za, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: Va, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: Qa, label: "뇌우", tone: "#7B5FC4" } : { Icon: Fe, label: "흐림", tone: "#66718A" };
}
var gt = (t) => t == null ? "–" : Math.round(t) + "°", Be = /* @__PURE__ */ new Map();
async function Oe(t) {
  let a = Be.get(t);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(t);
  if (!n.ok) throw new Error("weather " + n.status);
  let o = await n.json();
  return Be.set(t, { at: Date.now(), d: o }), o;
}
var Ue = (t, a) => {
  let n = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + a}-${n}`;
};
function Mn(t, a) {
  let [n, o] = C({ status: "loading" });
  return Y(() => {
    let s = !0, g = async () => {
      try {
        let d = `latitude=${xt.lat}&longitude=${xt.lng}&timezone=Asia%2FTokyo`, m = await Oe(
          `https://api.open-meteo.com/v1/forecast?${d}&forecast_days=${na}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
        ), j = {};
        m.daily.time.forEach((p, i) => {
          j[p] = {
            code: m.daily.weather_code[i],
            max: m.daily.temperature_2m_max[i],
            min: m.daily.temperature_2m_min[i],
            pop: m.daily.precipitation_probability_max[i],
            sum: m.daily.precipitation_sum[i]
          };
        });
        let h = {};
        m.hourly.time.forEach((p, i) => {
          h[p.slice(0, 13)] = {
            t: m.hourly.temperature_2m[i],
            pop: m.hourly.precipitation_probability[i],
            code: m.hourly.weather_code[i]
          };
        });
        let v = at(/* @__PURE__ */ new Date()), w = Array.from({ length: a }, (p, i) => at(nt(t, i))).filter((p) => !j[p] && p > v), u = {};
        if (w.length) {
          let p = await Promise.all(
            [1, 2, 3].map(
              (c) => Oe(
                `https://archive-api.open-meteo.com/v1/archive?${d}&start_date=${Ue(w[0], -c)}&end_date=${Ue(w[w.length - 1], -c)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), i = {};
          p.filter(Boolean).forEach(
            (c) => c.daily.time.forEach((k, x) => {
              let l = c.daily.temperature_2m_max[x];
              if (l == null) return;
              let M = k.slice(5), I = i[M] || (i[M] = { max: 0, min: 0, wet: 0, n: 0 });
              I.max += l, I.min += c.daily.temperature_2m_min[x], I.wet += (c.daily.precipitation_sum[x] || 0) >= 1 ? 1 : 0, I.n++;
            })
          ), w.forEach((c) => {
            let k = i[c.slice(5) === "02-29" ? "02-28" : c.slice(5)];
            k && k.n && (u[c] = { max: k.max / k.n, min: k.min / k.n, wet: k.wet, n: k.n });
          });
        }
        s && o({ status: "ok", daily: j, hourly: h, climate: u, at: /* @__PURE__ */ new Date() });
      } catch {
        s && o((m) => m.status === "ok" ? m : { status: "error" });
      }
    };
    g();
    let f = setInterval(g, 30 * 6e4);
    return () => {
      s = !1, clearInterval(f);
    };
  }, [t, a]), n;
}
function Sn({ date: t, w: a }) {
  let n = /* @__PURE__ */ r("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ r("span", { children: [
      xt.name,
      " 날씨"
    ] }),
    a.status === "ok" && a.daily[t] && /* @__PURE__ */ e("em", { children: `${tt(a.at.getHours())}:${tt(a.at.getMinutes())} 업데이트` })
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
    let { Icon: g, label: f, tone: d } = ie(o.code), m = (o.pop || 0) >= 50 || (o.sum || 0) >= 1, j = ["09", "12", "15", "18", "21"].map((h) => ({ h, v: a.hourly[`${t}T${h}`] })).filter((h) => h.v);
    return /* @__PURE__ */ r("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ r("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ e(g, { size: 40, color: d, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ r("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ e("strong", { children: f }),
          /* @__PURE__ */ r("span", { children: [
            "최고 ",
            /* @__PURE__ */ e("b", { children: gt(o.max) }),
            " 최저 ",
            /* @__PURE__ */ e("b", { children: gt(o.min) })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ e(tn, { size: 15, "aria-hidden": "true" }),
          o.pop == null ? "–" : o.pop + "%"
        ] })
      ] }),
      m && /* @__PURE__ */ e("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      j.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-wx-hours", children: j.map(({ h, v }) => {
        let b = ie(v.code);
        return /* @__PURE__ */ r("li", { children: [
          /* @__PURE__ */ r("span", { children: [
            h,
            "시"
          ] }),
          /* @__PURE__ */ e(b.Icon, { size: 18, color: b.tone, "aria-label": b.label }),
          /* @__PURE__ */ e("b", { children: gt(v.t) }),
          /* @__PURE__ */ e("em", { children: v.pop == null ? "" : v.pop + "%" })
        ] }, h);
      }) })
    ] });
  }
  let s = a.climate[t];
  return s ? /* @__PURE__ */ r("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ r("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      na,
      "일 전부터 나와요. 최근 ",
      s.n,
      "년 같은 날 ",
      xt.name,
      "는 평균 최고 ",
      /* @__PURE__ */ e("b", { children: gt(s.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ e("b", { children: gt(s.min) }),
      "였고, ",
      s.n,
      "번 중 ",
      s.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ r("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ e("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function An({ v: t }) {
  if (!t) return null;
  let { Icon: a, label: n, tone: o } = ie(t.code);
  return /* @__PURE__ */ r("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ e(a, { size: 14, color: o, "aria-hidden": "true" }),
    gt(t.t),
    t.pop != null && t.pop >= 30 && /* @__PURE__ */ r("em", { children: [
      "비 ",
      t.pop,
      "%"
    ] })
  ] });
}
var Ke = 56;
function Fn({ items: t, isToday: a, onEdit: n, members: o }) {
  let [s, g] = C(() => {
    let i = /* @__PURE__ */ new Date();
    return i.getHours() * 60 + i.getMinutes();
  });
  Y(() => {
    if (!a) return;
    let i = setInterval(() => {
      let c = /* @__PURE__ */ new Date();
      g(c.getHours() * 60 + c.getMinutes());
    }, 6e4);
    return () => clearInterval(i);
  }, [a]);
  let f = t.filter((i) => i.time).map((i) => ({ ...i, ...Dt(i) })).sort((i, c) => i.s - c.s || i.e - c.e);
  if (!f.length) return null;
  let d = [], m = [], j = -1;
  f.forEach((i) => {
    m.length && i.s >= j && (d.push(m), m = [], j = -1), m.push(i), j = Math.max(j, i.e);
  }), m.length && d.push(m);
  let h = [];
  d.forEach((i) => {
    let c = [];
    i.forEach((k) => {
      let x = c.findIndex((l) => l <= k.s);
      x === -1 ? (x = c.length, c.push(k.e)) : c[x] = k.e, h.push({ ...k, col: x, cl: i });
    }), i.ncol = c.length;
  });
  let v = Math.min(8, Math.floor(f[0].s / 60)), b = Math.max(21, Math.ceil(Math.max(...f.map((i) => i.e)) / 60)), w = Array.from({ length: b - v + 1 }, (i, c) => v + c), u = (i) => (i - v * 60) / 60 * Ke, p = t.length - f.length;
  return /* @__PURE__ */ r("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ r("div", { className: "jt-tt", style: { height: (b - v) * Ke + 14 }, children: [
      w.map((i) => /* @__PURE__ */ e("div", { className: "jt-tt-hour", style: { top: u(i * 60) }, children: /* @__PURE__ */ r("span", { children: [
        tt(i % 24),
        ":00"
      ] }) }, i)),
      /* @__PURE__ */ e("div", { className: "jt-tt-lane", children: h.map((i) => {
        let c = i.cl.ncol, k = Math.max(24, u(i.e) - u(i.s) - 3);
        return /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "jt-tt-block" + (k < 44 ? " short" : "") + (c > 1 ? " clash" : ""),
            style: {
              top: u(i.s) + 1,
              height: k,
              left: `calc(${i.col / c * 100}% + 2px)`,
              width: `calc(${100 / c}% - 4px)`
            },
            onClick: () => n(i),
            "aria-label": `${i.time} ${i.title} 고치기`,
            children: [
              /* @__PURE__ */ e("strong", { children: i.title }),
              /* @__PURE__ */ r("span", { children: [
                ae(i.s),
                "~",
                ae(i.e % (24 * 60)),
                i.place ? `, ${i.place}` : ""
              ] })
            ]
          },
          i.id
        );
      }) }),
      a && s >= v * 60 && s <= b * 60 && /* @__PURE__ */ e("div", { className: "jt-tt-now", style: { top: u(s) }, "aria-label": `지금 ${ae(s)}`, children: /* @__PURE__ */ e("span", { children: "지금" }) })
    ] }),
    p > 0 && /* @__PURE__ */ r("p", { className: "jt-hint jt-tt-note", children: [
      "시간을 정하지 않은 일정 ",
      p,
      "개는 위 목록에만 보여요."
    ] })
  ] });
}
function In({ settings: t, schedule: a, day: n, setDay: o, onEdit: s, me: g, onComment: f, onDelComment: d, onReact: m }) {
  let [j, h] = C(null), { start: v, days: b, members: w } = t, u = X[n % X.length], p = a.filter((l) => l.day === n).sort((l, M) => (l.time || "99:99").localeCompare(M.time || "99:99")), i = cn(p), c = at(nt(v, n)), k = c === at(/* @__PURE__ */ new Date()), x = Mn(v, b);
  return /* @__PURE__ */ r("section", { style: { "--lc": u }, children: [
    /* @__PURE__ */ e("div", { className: "jt-days", role: "tablist", "aria-label": "날짜 선택", children: Array.from({ length: b }, (l, M) => {
      let I = nt(v, M), O = M === n;
      return /* @__PURE__ */ r(
        "button",
        {
          role: "tab",
          "aria-selected": O,
          className: "jt-day" + (O ? " active" : ""),
          style: { "--lc": X[M % X.length] },
          onClick: () => o(M),
          children: [
            /* @__PURE__ */ e("span", { className: "jt-day-dot", children: M + 1 }),
            /* @__PURE__ */ e("span", { className: "jt-day-date", children: At(I) }),
            /* @__PURE__ */ e("span", { className: "jt-day-wk", children: Ft(I) })
          ]
        },
        M
      );
    }) }),
    /* @__PURE__ */ e(Sn, { date: c, w: x }),
    p.length === 0 ? /* @__PURE__ */ r("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "이 날은 아직 비어 있어요." }),
      /* @__PURE__ */ e("p", { children: '위시리스트에서 일정으로 넣거나 직접 추가해 보세요. 제목에 "10:00"이나 "15시"처럼 시간을 쓰면 시간표에 자동으로 들어가요.' })
    ] }) : /* @__PURE__ */ e("ol", { className: "jt-line", children: p.map((l) => {
      let M = l.time ? Dt(l) : null;
      return /* @__PURE__ */ r("li", { className: "jt-row", children: [
        /* @__PURE__ */ e("div", { className: "jt-time", children: l.time || "미정" }),
        /* @__PURE__ */ e("div", { className: "jt-rail", children: /* @__PURE__ */ e("span", { className: "jt-node" }) }),
        /* @__PURE__ */ r(
          "div",
          {
            className: "jt-card",
            role: "button",
            tabIndex: 0,
            onClick: () => s(l),
            onKeyDown: (I) => I.key === "Enter" && s(l),
            children: [
              /* @__PURE__ */ r("div", { className: "jt-card-top", children: [
                /* @__PURE__ */ e("div", { className: "jt-card-title", children: l.title }),
                l.time && x.status === "ok" && /* @__PURE__ */ e(An, { v: x.hourly[`${c}T${l.time.slice(0, 2)}`] })
              ] }),
              M && l.end && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
                l.time,
                "~",
                l.end,
                ", ",
                Qe(M.e - M.s)
              ] }),
              i.has(l.id) && /* @__PURE__ */ e("div", { className: "jt-clash", children: "다른 일정과 시간이 겹쳐요" }),
              l.place && /* @__PURE__ */ r("div", { className: "jt-meta", children: [
                /* @__PURE__ */ e(ce, { size: 13 }),
                l.place
              ] }),
              l.memo && /* @__PURE__ */ e("div", { className: "jt-memo", children: l.memo }),
              (l.place || l.link || $t(l)) && /* @__PURE__ */ r(
                "a",
                {
                  className: "jt-maplink inline",
                  href: Ut(l),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (I) => I.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(Pt, { size: 14 }),
                    "구글맵"
                  ]
                }
              ),
              /* @__PURE__ */ r("div", { className: "jt-card-foot", children: [
                /* @__PURE__ */ r("div", { className: "jt-by", children: [
                  /* @__PURE__ */ e(et, { name: l.by, members: w, size: 16 }),
                  l.by
                ] }),
                /* @__PURE__ */ e(Kt, { item: l, me: g, onReact: (I) => m(l.id, I) }),
                /* @__PURE__ */ e(
                  ge,
                  {
                    count: (l.comments || []).length,
                    open: j === l.id,
                    onClick: () => h(j === l.id ? null : l.id)
                  }
                )
              ] }),
              j === l.id && /* @__PURE__ */ e(
                Wt,
                {
                  comments: l.comments || [],
                  me: g,
                  members: w,
                  onAdd: (I) => f(l.id, I),
                  onDelete: (I) => d(l.id, I)
                }
              )
            ]
          }
        )
      ] }, l.id);
    }) }),
    /* @__PURE__ */ e(Fn, { items: p, isToday: k, onEdit: s, members: w })
  ] });
}
function Dn({ view: t, setView: a, pins: n, temp: o, selectedId: s, onTap: g, onPinTap: f }) {
  let d = J(null), [m, j] = C({ w: 0, h: 0 }), h = J(/* @__PURE__ */ new Map()), v = J({ moved: !1, startDist: 0 }), b = J(0), [w, u] = C({ ok: 0, bad: 0 });
  Y(() => {
    let N = d.current;
    if (!N) return;
    let A = () => j({ w: N.clientWidth, h: N.clientHeight });
    A();
    let T = new ResizeObserver(A);
    return T.observe(N), () => T.disconnect();
  }, []);
  let p = t.z, i = ne(t.lat, t.lng, p), c = i.x - m.w / 2, k = i.y - m.h / 2, x = 2 ** p, l = [];
  if (m.w) {
    let N = Math.floor(c / lt), A = Math.floor((c + m.w) / lt), T = Math.max(0, Math.floor(k / lt)), q = Math.min(x - 1, Math.floor((k + m.h) / lt));
    for (let y = N; y <= A; y++)
      for (let L = T; L <= q; L++) {
        let Z = (y % x + x) % x;
        l.push(
          /* @__PURE__ */ e(
            "img",
            {
              src: `https://tile.openstreetmap.org/${p}/${Z}/${L}.png`,
              alt: "",
              draggable: !1,
              onLoad: () => u((K) => K.ok ? K : { ...K, ok: 1 }),
              onError: () => u((K) => K.bad ? K : { ...K, bad: 1 }),
              style: { left: Math.round(y * lt - c), top: Math.round(L * lt - k) }
            },
            `${p}/${y}/${L}`
          )
        );
      }
  }
  let M = (N) => {
    if (!N.target.closest("[data-pin],.jt-zoom,.jt-attr") && (d.current.setPointerCapture(N.pointerId), h.current.set(N.pointerId, { x: N.clientX, y: N.clientY }), h.current.size === 1 && (v.current = { moved: !1, startDist: 0 }), h.current.size === 2)) {
      let [A, T] = [...h.current.values()];
      v.current.startDist = Math.hypot(A.x - T.x, A.y - T.y), v.current.moved = !0;
    }
  }, I = (N) => {
    let A = h.current.get(N.pointerId);
    if (!A) return;
    let T = N.clientX - A.x, q = N.clientY - A.y;
    if (h.current.size === 1) {
      if (!v.current.moved && Math.hypot(T, q) < 4) return;
      v.current.moved = !0, h.current.set(N.pointerId, { x: N.clientX, y: N.clientY }), a((y) => {
        let L = ne(y.lat, y.lng, y.z), Z = $e(L.x - T, L.y - q, y.z);
        return { ...y, lat: Math.max(-80, Math.min(80, Z.lat)), lng: Z.lng };
      });
    } else
      h.current.set(N.pointerId, { x: N.clientX, y: N.clientY });
  }, O = (N) => {
    let A = h.current.get(N.pointerId);
    if (!A) return;
    let T = h.current.size === 1;
    if (h.current.delete(N.pointerId), v.current.startDist && h.current.size === 1) {
      let [q] = [...h.current.values()], y = Math.hypot(A.x - q.x, A.y - q.y) / v.current.startDist;
      y > 1.35 ? a((L) => ({ ...L, z: zt(L.z + (y > 2.6 ? 2 : 1)) })) : y < 0.7 && a((L) => ({ ...L, z: zt(L.z - (y < 0.38 ? 2 : 1)) })), v.current.startDist = 0;
    }
    if (T && !v.current.moved && N.type === "pointerup") {
      let q = d.current.getBoundingClientRect(), y = $e(c + (N.clientX - q.left), k + (N.clientY - q.top), p);
      g(y.lat, y.lng);
    }
  }, z = (N) => {
    let A = Date.now();
    A - b.current < 250 || (b.current = A, a((T) => ({ ...T, z: zt(T.z + (N.deltaY < 0 ? 1 : -1)) })));
  }, S = (N, A) => {
    let T = ne(N, A, p);
    return { left: T.x - c, top: T.y - k };
  }, D = (N) => N.left > -40 && N.left < m.w + 40 && N.top > -50 && N.top < m.h + 40;
  return /* @__PURE__ */ r(
    "div",
    {
      className: "jt-map",
      ref: d,
      onPointerDown: M,
      onPointerMove: I,
      onPointerUp: O,
      onPointerCancel: O,
      onWheel: z,
      role: "application",
      "aria-label": "지도. 눌러서 핀을 꽂을 수 있어요",
      children: [
        l,
        w.bad > 0 && w.ok === 0 && /* @__PURE__ */ e("div", { className: "jt-mapfail", role: "status", children: "지도 이미지를 불러오지 못했어요. 이 화면에서는 외부 지도 이미지가 막혀 있을 수 있어요." }),
        m.w > 0 && n.map((N) => {
          let A = S(N.lat, N.lng);
          return D(A) ? /* @__PURE__ */ e(
            "button",
            {
              "data-pin": "1",
              type: "button",
              className: "jt-pin" + (N.id === s ? " sel" : ""),
              style: { left: A.left, top: A.top, "--pc": N.color },
              onClick: () => f(N.id),
              "aria-label": N.label,
              children: /* @__PURE__ */ e("i", {})
            },
            N.id
          ) : null;
        }),
        m.w > 0 && o && /* @__PURE__ */ e("span", { className: "jt-pin temp", style: { left: S(o.lat, o.lng).left, top: S(o.lat, o.lng).top }, children: /* @__PURE__ */ e("i", {}) }),
        /* @__PURE__ */ r("div", { className: "jt-zoom", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((N) => ({ ...N, z: zt(N.z + 1) })), "aria-label": "확대", children: "+" }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => a((N) => ({ ...N, z: zt(N.z - 1) })), "aria-label": "축소", children: "−" })
        ] }),
        /* @__PURE__ */ e("a", { className: "jt-attr", href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "© OpenStreetMap" })
      ]
    }
  );
}
var We = "https://unpkg.com/maplibre-gl@4.7.1/dist/", Pn = "https://tiles.openfreemap.org/styles/liberty", Mt = null;
function $n() {
  return window.maplibregl ? Promise.resolve(window.maplibregl) : Mt || (Mt = new Promise((t, a) => {
    let n = document.createElement("link");
    n.rel = "stylesheet", n.href = We + "maplibre-gl.css", document.head.appendChild(n);
    let o = document.createElement("script");
    o.src = We + "maplibre-gl.js", o.onload = () => window.maplibregl ? t(window.maplibregl) : a(new Error("maplibre")), o.onerror = () => {
      Mt = null, a(new Error("maplibre"));
    }, document.head.appendChild(o);
  }), Mt);
}
var Rn = ["coalesce", ["get", "name:ko"], ["get", "name:en"], ["get", "name"]];
function _n(t) {
  (t.getStyle().layers || []).forEach((a) => {
    let n = a.layout && a.layout["text-field"];
    if (a.type === "symbol" && n && JSON.stringify(n).includes("name"))
      try {
        t.setLayoutProperty(a.id, "text-field", Rn);
      } catch {
      }
  });
}
var se = (t, a) => `<svg width="${a ? 34 : 28}" height="${a ? 44 : 36}" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0z" fill="${t}" stroke="#fff" stroke-width="1.5"/><circle cx="14" cy="14" r="5.5" fill="#fff"/></svg>`;
