function WishForm({ initial, gkey, onSave, onDelete }) {
  let [name, setName] = useState(initial?.name || ""), [cat, setCat] = useState(initial?.cat || "맛집"), [area, setArea] = useState(initial?.area || ""), [link, setLink] = useState(initial?.link || ""), [memo, setMemo] = useState(initial?.memo || ""), [pos, setPos] = useState(initial && hasPos(initial) ? { lat: initial.lat, lng: initial.lng, placeId: initial.placeId } : null), [results, setResults] = useState([]), [busy, setBusy] = useState(!1), [smsg, setSmsg] = useState(""), searchPlace = async () => {
    let q = [name, area].filter((x) => x && x.trim()).join(" ").trim();
    if (!q) {
      setSmsg("이름을 먼저 적어 주세요.");
      return;
    }
    setBusy(!0), setSmsg(""), setResults([]);
    try {
      let res = await placeSearch(q, gkey);
      setResults(res), res.length || setSmsg("검색 결과가 없어요. 이름을 조금 바꾸거나 영어, 일본어로 적어 보세요.");
    } catch {
      setSmsg("검색을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.");
    }
    setBusy(!1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsx("span", { children: "이름" }),
      /* @__PURE__ */ jsxs("div", { className: "jt-inline", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && !e.nativeEvent.isComposing && searchPlace(),
            placeholder: "예: 이치란 도톤보리",
            "aria-label": "이름"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary", onClick: searchPlace, disabled: busy, children: busy ? "찾는 중" : "위치 검색" })
      ] })
    ] }),
    smsg && /* @__PURE__ */ jsx("p", { className: "jt-hint", children: smsg }),
    results.length > 0 && /* @__PURE__ */ jsx("ul", { className: "jt-results jt-form-results", children: results.map((r, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          setPos({ lat: r.lat, lng: r.lng, placeId: r.placeId }), name.trim() || setName(r.name), !area.trim() && r.area && setArea(r.area.split(" ").slice(0, 3).join(" ")), !link.trim() && r.link && setLink(r.link), setResults([]), setSmsg("");
        },
        children: [
          /* @__PURE__ */ jsx("strong", { children: r.name }),
          /* @__PURE__ */ jsx("span", { children: r.area })
        ]
      }
    ) }, i)) }),
    pos ? /* @__PURE__ */ jsxs("div", { className: "jt-picked", children: [
      /* @__PURE__ */ jsx(MapPin, { size: 14 }),
      /* @__PURE__ */ jsx("span", { children: "지도 위치가 연결됐어요. 거리 표시와 지도에 나와요." }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-ghost sm", onClick: () => setPos(null), children: "연결 해제" })
    ] }) : /* @__PURE__ */ jsx("p", { className: "jt-hint jt-nopos", children: '지도 위치가 없어요. "위치 검색"으로 장소를 고르면 거리와 지도 핀이 표시돼요.' }),
    /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsx("span", { children: "종류" }),
      /* @__PURE__ */ jsx("div", { className: "jt-chips", children: WISH_CATS.map((c) => /* @__PURE__ */ jsx("button", { type: "button", className: "jt-chip" + (cat === c ? " on" : ""), onClick: () => setCat(c), children: c }, c)) })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "동네 (선택)", children: /* @__PURE__ */ jsx("input", { value: area, onChange: (e) => setArea(e.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ jsx(Field, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "url",
        value: link,
        onChange: (e) => setLink(e.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ jsx(Field, { label: "메모 (선택)", children: /* @__PURE__ */ jsx("textarea", { rows: 2, value: memo, onChange: (e) => setMemo(e.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "jt-primary",
        disabled: !name.trim(),
        onClick: () => onSave({
          name: name.trim(),
          cat,
          area: area.trim(),
          link: link.trim(),
          memo: memo.trim(),
          lat: pos ? pos.lat : void 0,
          lng: pos ? pos.lng : void 0,
          placeId: pos && pos.placeId ? pos.placeId : void 0
        }),
        children: initial ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    initial && /* @__PURE__ */ jsx(DeleteButton, { onConfirm: onDelete, label: "이 장소 삭제" })
  ] });
}
function SpendForm({ settings, me, defaultDay, initial, onSave, onDelete, personal = !1 }) {
  let [method, setMethod] = useState(initial?.method || "cash"), { members, days, start } = settings, [ownRate, setOwnRate] = useState(!!initial?.rate), [rateText2, setRateText] = useState(initial?.rate ? String(initial.rate) : String(Math.round(settings.rate * 100) / 100)), customRate = Number(rateText2), rateOk = !ownRate || customRate >= 300 && customRate <= 3e3, rate = ownRate && rateOk ? customRate : settings.rate, [title, setTitle] = useState(initial?.title || ""), [cur, setCur] = useState(initial?.cur === "KRW" ? "KRW" : "JPY"), [amount, setAmount] = useState(
    initial ? String((initial.cur === "KRW" ? Number(initial.orig) : Number(initial.amount)) || "") : ""
  ), [payer, setPayer] = useState(initial && members.includes(initial.payer) ? initial.payer : me), [cat, setCat] = useState(initial?.cat || "식비"), [day, setDay] = useState(initial ? Math.min(initial.day, days - 1) : defaultDay), [split, setSplit] = useState(initial ? (initial.split || []).filter((m) => members.includes(m)) : []), [fund, setFund] = useState(!!initial && isFund(initial)), typed = Number(amount) || 0, amt = cur === "KRW" ? Math.round(typed * 100 / rate) : typed, lost = initial ? [initial.payer, ...initial.split || []].filter((m, i, a) => m && m !== FUND && !members.includes(m) && a.indexOf(m) === i) : [], toggle = (m) => setSplit(split.includes(m) ? split.filter((x) => x !== m) : [...split, m]), ok = title.trim() && amt > 0 && (personal || fund || split.length > 0) && rateOk;
  return /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
    /* @__PURE__ */ jsx(Field, { label: "어디에 썼나요", children: /* @__PURE__ */ jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsx("span", { children: "금액" }),
      /* @__PURE__ */ jsxs("div", { className: "jt-amt", children: [
        /* @__PURE__ */ jsx("div", { className: "jt-cur", role: "radiogroup", "aria-label": "통화", children: [
          ["JPY", "¥ 엔화"],
          ["KRW", "₩ 원화"]
        ].map(([c, label]) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": cur === c,
            className: cur === c ? "on" : "",
            onClick: () => {
              c !== cur && (typed > 0 && setAmount(String(Math.round(c === "KRW" ? typed * rate / 100 : typed * 100 / rate))), setCur(c));
            },
            children: label
          },
          c
        )) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            placeholder: cur === "KRW" ? "원화 금액" : "엔화 금액",
            "aria-label": cur === "KRW" ? "원화 금액" : "엔화 금액"
          }
        )
      ] })
    ] }),
    typed > 0 ? /* @__PURE__ */ jsxs("p", { className: "jt-hint jt-fxhint", children: [
      cur === "KRW" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "약 ",
        /* @__PURE__ */ jsx("b", { children: yen(amt) }),
        "로 정산돼요 (₩",
        typed.toLocaleString("ko-KR"),
        " 입력)"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "약 ",
        /* @__PURE__ */ jsx("b", { children: won(amt, rate) })
      ] }),
      /* @__PURE__ */ jsx("br", {}),
      ownRate && rateOk ? `100엔 = ₩${rateText2} (직접 입력)` : fxNote(settings)
    ] }) : /* @__PURE__ */ jsx("p", { className: "jt-hint", children: fxNote(settings) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-ownrate", children: [
      /* @__PURE__ */ jsxs("label", { className: "jt-check", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: ownRate, onChange: (e) => setOwnRate(e.target.checked) }),
        "환율 직접 입력 (환전소에서 바꾼 환율 등)"
      ] }),
      ownRate && /* @__PURE__ */ jsxs("div", { className: "jt-ownrate-row", children: [
        /* @__PURE__ */ jsx("span", { children: "100엔 =" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            inputMode: "decimal",
            value: rateText2,
            onChange: (e) => setRateText(e.target.value),
            "aria-label": "직접 입력한 환율 (100엔당 원)"
          }
        ),
        /* @__PURE__ */ jsx("span", { children: "원" })
      ] }),
      ownRate && !rateOk && /* @__PURE__ */ jsx("p", { className: "jt-warn-inline", children: "환율을 확인해 주세요. 100엔당 원화 금액이에요 (예: 910)." }),
      ownRate && rateOk && /* @__PURE__ */ jsx("p", { className: "jt-hint", children: "이 경비는 정산할 때도 이 환율로 계산돼요." })
    ] }),
    lost.length > 0 && /* @__PURE__ */ jsxs("p", { className: "jt-warn-inline", children: [
      lost.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    personal ? /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsx("span", { children: "어떻게 냈나요" }),
      /* @__PURE__ */ jsx("div", { className: "jt-chips", children: [
        ["cash", "현금"],
        ["card", "카드"]
      ].map(([k, label]) => /* @__PURE__ */ jsx("button", { type: "button", className: "jt-chip" + (method === k ? " on" : ""), onClick: () => setMethod(k), children: label }, k)) }),
      /* @__PURE__ */ jsx("p", { className: "jt-hint", children: '현금으로 낸 엔화는 "남은 현금"에서 빠져요.' })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "누가 냈나요" }),
        /* @__PURE__ */ jsx("div", { className: "jt-chips", children: members.map((m) => /* @__PURE__ */ jsx("button", { type: "button", className: "jt-chip" + (payer === m ? " on" : ""), onClick: () => setPayer(m), children: m }, m)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsxs("span", { className: "jt-split-label", children: [
          "누구와 나누나요",
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "jt-ghost sm",
              onClick: () => {
                setFund(!1), setSplit(split.length === members.length ? [] : members);
              },
              children: split.length === members.length ? "모두 해제" : "모두 선택"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "jt-chips", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "jt-chip jt-fundchip" + (fund ? " on" : ""),
              onClick: () => {
                setFund(!fund), setSplit([]);
              },
              children: [
                fund && /* @__PURE__ */ jsx(Check, { size: 14 }),
                "공금"
              ]
            }
          ),
          members.map((m) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "jt-chip" + (split.includes(m) ? " on" : ""),
              onClick: () => {
                setFund(!1), toggle(m);
              },
              children: [
                split.includes(m) && /* @__PURE__ */ jsx(Check, { size: 14 }),
                m
              ]
            },
            m
          ))
        ] }),
        !fund && amt > 0 && split.length > 0 && /* @__PURE__ */ jsxs("p", { className: "jt-hint", children: [
          "1인당 ",
          cur === "KRW" ? `₩${(Math.round(typed / split.length / 100) * 100).toLocaleString("ko-KR")}(${yen(amt / split.length)})` : yw(amt / split.length)
        ] }),
        fund && /* @__PURE__ */ jsxs("p", { className: "jt-hint jt-fundhint", children: [
          "가족끼리 나누지 않고 공금에서 돌려받을 경비예요. 정산에서 빠지고, ",
          payer,
          '의 "공금에서 받을 돈"에 더해져요.'
        ] }),
        !fund && split.length === 0 && /* @__PURE__ */ jsx("p", { className: "jt-hint", children: "나눌 사람이나 공금을 골라 주세요." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsx("span", { children: "종류" }),
      /* @__PURE__ */ jsx("div", { className: "jt-chips", children: SPEND_CATS.map((c) => /* @__PURE__ */ jsx("button", { type: "button", className: "jt-chip" + (cat === c ? " on" : ""), onClick: () => setCat(c), children: c }, c)) })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "날짜", children: /* @__PURE__ */ jsx("select", { value: day, onChange: (e) => setDay(Number(e.target.value)), children: Array.from({ length: days }, (_, i) => {
      let d = addDays(start, i);
      return /* @__PURE__ */ jsxs("option", { value: i, children: [
        i + 1,
        "일차 ",
        md(d),
        " (",
        wk(d),
        ")"
      ] }, i);
    }) }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "jt-primary",
        disabled: !ok,
        onClick: () => onSave({
          title: title.trim(),
          amount: amt,
          payer,
          cat,
          day,
          split: personal ? [] : fund ? [] : split,
          fund: personal ? void 0 : fund || void 0,
          ...personal ? { personal: !0, method } : {},
          cur,
          orig: cur === "KRW" ? typed : void 0,
          rate: ownRate && rateOk ? customRate : void 0
        }),
        children: initial ? "수정 저장" : personal ? "개인 경비 기록하기" : "공통 경비 기록하기"
      }
    ),
    initial && /* @__PURE__ */ jsx(DeleteButton, { onConfirm: onDelete, label: "이 경비 삭제" })
  ] });
}
var WEATHER_SPOT = { name: "오사카", lat: 34.6937, lng: 135.5023 }, FORECAST_DAYS = 16;
function sky(code) {
  return code === 0 ? { Icon: Sun, label: "맑음", tone: "#E8800A" } : code === 1 || code === 2 ? { Icon: CloudSun, label: code === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : code === 3 ? { Icon: Cloud, label: "흐림", tone: "#66718A" } : code === 45 || code === 48 ? { Icon: CloudFog, label: "안개", tone: "#66718A" } : code >= 51 && code <= 57 ? { Icon: CloudDrizzle, label: "이슬비", tone: "#0C86AE" } : code >= 61 && code <= 67 || code >= 80 && code <= 82 ? { Icon: CloudRain, label: code >= 80 ? "소나기" : "비", tone: "#0C86AE" } : code >= 71 && code <= 77 || code === 85 || code === 86 ? { Icon: CloudSnow, label: "눈", tone: "#7B5FC4" } : code >= 95 ? { Icon: CloudLightning, label: "뇌우", tone: "#7B5FC4" } : { Icon: Cloud, label: "흐림", tone: "#66718A" };
}
var deg = (n) => n == null ? "–" : Math.round(n) + "°", wCache = /* @__PURE__ */ new Map();
async function getJSON(url) {
  let hit = wCache.get(url);
  if (hit && Date.now() - hit.at < 30 * 6e4) return hit.d;
  let r = await fetch(url);
  if (!r.ok) throw new Error("weather " + r.status);
  let d = await r.json();
  return wCache.set(url, { at: Date.now(), d }), d;
}
var shiftYear = (d, y) => {
  let md2 = d.slice(5) === "02-29" ? "02-28" : d.slice(5);
  return `${Number(d.slice(0, 4)) + y}-${md2}`;
};
function useWeather(start, days) {
  let [w, setW] = useState({ status: "loading" });
  return useEffect(() => {
    let alive = !0, run = async () => {
      try {
        let base = `latitude=${WEATHER_SPOT.lat}&longitude=${WEATHER_SPOT.lng}&timezone=Asia%2FTokyo`, today = iso(/* @__PURE__ */ new Date()), lastFc = iso(addDays(today, FORECAST_DAYS - 1)), trip = Array.from({ length: days }, (_, i) => iso(addDays(start, i))), fcDays = trip.filter((d) => d >= today && d <= lastFc), daily = {}, hourly = {};
        if (fcDays.length) {
          let f = await getJSON(
            `https://api.open-meteo.com/v1/forecast?${base}&start_date=${fcDays[0]}&end_date=${fcDays[fcDays.length - 1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
          );
          f.daily.time.forEach((t2, i) => {
            daily[t2] = {
              code: f.daily.weather_code[i],
              max: f.daily.temperature_2m_max[i],
              min: f.daily.temperature_2m_min[i],
              pop: f.daily.precipitation_probability_max[i],
              sum: f.daily.precipitation_sum[i]
            };
          }), f.hourly.time.forEach((t2, i) => {
            hourly[t2.slice(0, 13)] = {
              t: f.hourly.temperature_2m[i],
              pop: f.hourly.precipitation_probability[i],
              code: f.hourly.weather_code[i]
            };
          });
        }
        let need = trip.filter((d) => !daily[d] && d > today), climate = {};
        if (need.length) {
          let res = await Promise.all(
            [1, 2, 3].map(
              (y) => getJSON(
                `https://archive-api.open-meteo.com/v1/archive?${base}&start_date=${shiftYear(need[0], -y)}&end_date=${shiftYear(need[need.length - 1], -y)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), acc = {};
          res.filter(Boolean).forEach(
            (r) => r.daily.time.forEach((t2, i) => {
              let mx = r.daily.temperature_2m_max[i];
              if (mx == null) return;
              let k = t2.slice(5), a = acc[k] || (acc[k] = { max: 0, min: 0, wet: 0, n: 0 });
              a.max += mx, a.min += r.daily.temperature_2m_min[i], a.wet += (r.daily.precipitation_sum[i] || 0) >= 1 ? 1 : 0, a.n++;
            })
          ), need.forEach((d) => {
            let a = acc[d.slice(5) === "02-29" ? "02-28" : d.slice(5)];
            a && a.n && (climate[d] = { max: a.max / a.n, min: a.min / a.n, wet: a.wet, n: a.n });
          });
        }
        let at = /* @__PURE__ */ new Date();
        alive && setW({ status: "ok", daily, hourly, climate, at, stale: !1 });
        try {
          window.storage.set("wx", JSON.stringify({ daily, hourly, climate, at: at.getTime() }), !1);
        } catch {
        }
      } catch {
        alive && setW((prev) => prev.status === "ok" ? { ...prev, stale: !0 } : { status: "error" });
      }
    };
    (async () => {
      try {
        let r = await window.storage.get("wx", !1), c = r && r.value ? JSON.parse(r.value) : null;
        alive && c && c.daily && setW(
          (prev) => prev.status === "ok" && !prev.stale ? prev : { status: "ok", daily: c.daily, hourly: c.hourly || {}, climate: c.climate || {}, at: new Date(c.at), stale: !0 }
        );
      } catch {
      }
    })(), run();
    let t = setInterval(run, 30 * 6e4);
    return () => {
      alive = !1, clearInterval(t);
    };
  }, [start, days]), w;
}
function WeatherCard({ date, w }) {
  let head = /* @__PURE__ */ jsxs("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ jsxs("span", { children: [
      WEATHER_SPOT.name,
      " 날씨"
    ] }),
    w.status === "ok" && (w.daily[date] || w.climate[date]) && /* @__PURE__ */ jsx("em", { className: w.stale ? "jt-wx-stale" : "", children: w.stale ? `${md(w.at)} ${pad(w.at.getHours())}:${pad(w.at.getMinutes())} 기준, 마지막으로 받은 날씨` : `${pad(w.at.getHours())}:${pad(w.at.getMinutes())} 업데이트` })
  ] });
  if (w.status === "loading")
    return /* @__PURE__ */ jsxs("div", { className: "jt-wx", children: [
      head,
      /* @__PURE__ */ jsx("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (w.status === "error")
    return /* @__PURE__ */ jsxs("div", { className: "jt-wx", children: [
      head,
      /* @__PURE__ */ jsx("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let d = w.daily[date];
  if (d) {
    let { Icon, label, tone } = sky(d.code), rainy = (d.pop || 0) >= 50 || (d.sum || 0) >= 1, hours = ["09", "12", "15", "18", "21"].map((h) => ({ h, v: w.hourly[`${date}T${h}`] })).filter((x) => x.v);
    return /* @__PURE__ */ jsxs("div", { className: "jt-wx", children: [
      head,
      /* @__PURE__ */ jsxs("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ jsx(Icon, { size: 40, color: tone, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ jsx("strong", { children: label }),
          /* @__PURE__ */ jsxs("span", { children: [
            "최고 ",
            /* @__PURE__ */ jsx("b", { children: deg(d.max) }),
            " 최저 ",
            /* @__PURE__ */ jsx("b", { children: deg(d.min) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ jsx(Umbrella, { size: 15, "aria-hidden": "true" }),
          d.pop == null ? "–" : d.pop + "%"
        ] })
      ] }),
      rainy && /* @__PURE__ */ jsx("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      hours.length > 0 && /* @__PURE__ */ jsx("ul", { className: "jt-wx-hours", children: hours.map(({ h, v }) => {
        let S = sky(v.code);
        return /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("span", { children: [
            h,
            "시"
          ] }),
          /* @__PURE__ */ jsx(S.Icon, { size: 18, color: S.tone, "aria-label": S.label }),
          /* @__PURE__ */ jsx("b", { children: deg(v.t) }),
          /* @__PURE__ */ jsx("em", { children: v.pop == null ? "" : v.pop + "%" })
        ] }, h);
      }) })
    ] });
  }
  let c = w.climate[date];
  return c ? /* @__PURE__ */ jsxs("div", { className: "jt-wx", children: [
    head,
    /* @__PURE__ */ jsxs("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      FORECAST_DAYS,
      "일 전부터 나와요. 최근 ",
      c.n,
      "년 같은 날 ",
      WEATHER_SPOT.name,
      "는 평균 최고 ",
      /* @__PURE__ */ jsx("b", { children: deg(c.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ jsx("b", { children: deg(c.min) }),
      "였고, ",
      c.n,
      "번 중 ",
      c.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "jt-wx", children: [
    head,
    /* @__PURE__ */ jsx("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function HourChip({ v }) {
  if (!v) return null;
  let { Icon, label, tone } = sky(v.code);
  return /* @__PURE__ */ jsxs("span", { className: "jt-wxchip", title: label, children: [
    /* @__PURE__ */ jsx(Icon, { size: 14, color: tone, "aria-hidden": "true" }),
    deg(v.t),
    v.pop != null && v.pop >= 30 && /* @__PURE__ */ jsxs("em", { children: [
      "비 ",
      v.pop,
      "%"
    ] })
  ] });
}
var HOUR = 56;
function Timetable({ items, isToday, onEdit, members, onAddAt }) {
  let [ghost, setGhost] = useState(null), [drag, setDrag] = useState(null), laneRef = useRef(null), dragRef = useRef({ on: !1, timer: null, x: 0, y: 0, used: !1 }), [now, setNow] = useState(() => {
    let d = /* @__PURE__ */ new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  useEffect(() => {
    if (!isToday) return;
    let t = setInterval(() => {
      let d = /* @__PURE__ */ new Date();
      setNow(d.getHours() * 60 + d.getMinutes());
    }, 6e4);
    return () => clearInterval(t);
  }, [isToday]);
  let VIS_MIN = 28, timed = items.filter((i) => i.time).map((i) => {
    let sp = span(i);
    return { ...i, ...sp, ve: Math.max(sp.e, sp.s + VIS_MIN) };
  }).sort((a, b) => a.s - b.s || a.e - b.e), realClash = overlapIds(items), clusters = [], cur = [], curEnd = -1;
  timed.forEach((it) => {
    cur.length && it.s >= curEnd && (clusters.push(cur), cur = [], curEnd = -1), cur.push(it), curEnd = Math.max(curEnd, it.ve);
  }), cur.length && clusters.push(cur);
  let placed = [];
  clusters.forEach((cl) => {
    let cols = [];
    cl.forEach((it) => {
      let c = cols.findIndex((e) => e <= it.s);
      c === -1 ? (c = cols.length, cols.push(it.ve)) : cols[c] = it.ve, placed.push({ ...it, col: c, cl });
    }), cl.ncol = cols.length;
  });
  let h0 = timed.length ? Math.min(8, Math.floor(timed[0].s / 60)) : 8, h1 = timed.length ? Math.max(21, Math.ceil(Math.max(...timed.map((i) => i.e)) / 60)) : 21, slotAt = (e, step = 30) => {
    let r = (laneRef.current || e.currentTarget).getBoundingClientRect(), m = h0 * 60 + (e.clientY - r.top) / HOUR * 60;
    return Math.max(h0 * 60, Math.min(Math.floor(m / step) * step, h1 * 60 - step, 24 * 60 - step));
  }, range = drag ? [Math.min(drag.a, drag.b), Math.max(drag.a, drag.b) + 15] : null;
  useEffect(() => {
    let el = laneRef.current;
    if (!el) return;
    let stop = (e) => dragRef.current.on && e.cancelable && e.preventDefault();
    return el.addEventListener("touchmove", stop, { passive: !1 }), () => el.removeEventListener("touchmove", stop);
  }, [items.length]);
  let startDrag = (e) => {
    let d = dragRef.current;
    d.on = !0, d.used = !0;
    try {
      laneRef.current.setPointerCapture(e.pointerId);
    } catch {
    }
    let m = slotAt(e, 15);
    d.a = m, d.b = m, setDrag({ a: m, b: m }), setGhost(null), navigator.vibrate && navigator.vibrate(15);
  }, onDown = (e) => {
    if (!onAddAt || e.target.closest(".jt-tt-block") || e.button > 0) return;
    let d = dragRef.current;
    if (d.used = !1, d.x = e.clientX, d.y = e.clientY, clearTimeout(d.timer), e.pointerType === "mouse") startDrag(e);
    else {
      let ev = { clientX: e.clientX, clientY: e.clientY, pointerId: e.pointerId };
      d.timer = setTimeout(() => startDrag(ev), 300);
    }
  }, onMove = (e) => {
    let d = dragRef.current;
    if (d.on) {
      let m = slotAt(e, 15);
      d.b = m, setDrag((x) => x && { ...x, b: m });
      return;
    }
    if (d.timer && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8 && (clearTimeout(d.timer), d.timer = null), e.pointerType !== "mouse" || e.target.closest(".jt-tt-block")) return setGhost(null);
    setGhost(slotAt(e));
  }, onUp = () => {
    let d = dragRef.current;
    if (clearTimeout(d.timer), d.timer = null, !d.on) return;
    d.on = !1;
    let r = [Math.min(d.a, d.b), Math.max(d.a, d.b) + 15];
    setDrag(null), r && r[1] - r[0] > 15 ? onAddAt(fmtMin(r[0]), fmtMin(Math.min(r[1], 24 * 60 - 1))) : d.used = !1;
  }, hours = Array.from({ length: h1 - h0 + 1 }, (_, i) => h0 + i), y = (m) => (m - h0 * 60) / 60 * HOUR, untimed = items.length - timed.length;
  return /* @__PURE__ */ jsxs("div", { className: "jt-tt-wrap", children: [
    /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "시간표" }),
    /* @__PURE__ */ jsxs("div", { className: "jt-tt", style: { height: (h1 - h0) * HOUR + 14 }, children: [
      hours.map((h) => /* @__PURE__ */ jsx("div", { className: "jt-tt-hour", style: { top: y(h * 60) }, children: /* @__PURE__ */ jsxs("span", { children: [
        pad(h % 24),
        ":00"
      ] }) }, h)),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: laneRef,
          className: "jt-tt-lane" + (drag ? " dragging" : ""),
          onClick: (e) => {
            if (!(e.target.closest(".jt-tt-block") || !onAddAt)) {
              if (dragRef.current.used) {
                dragRef.current.used = !1;
                return;
              }
              onAddAt(fmtMin(slotAt(e)));
            }
          },
          onPointerDown: onDown,
          onPointerMove: onMove,
          onPointerUp: onUp,
          onPointerCancel: onUp,
          onPointerLeave: () => !dragRef.current.on && setGhost(null),
          onContextMenu: (e) => e.preventDefault(),
          children: [
            range && /* @__PURE__ */ jsxs("div", { className: "jt-tt-sel", style: { top: y(range[0]) + 1, height: Math.max(12, y(range[1]) - y(range[0]) - 2) }, "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxs("b", { children: [
                fmtMin(range[0]),
                "~",
                fmtMin(Math.min(range[1], 24 * 60 - 1))
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                durText(range[1] - range[0]),
                " 일정 추가"
              ] })
            ] }),
            ghost != null && /* @__PURE__ */ jsxs("div", { className: "jt-tt-ghost", style: { top: y(ghost) + 1, height: HOUR / 2 - 2 }, "aria-hidden": "true", children: [
              "+ ",
              fmtMin(ghost),
              " 일정 추가"
            ] }),
            placed.map((it) => {
              let n = it.cl.ncol, height = Math.max(24, y(it.e) - y(it.s) - 3), clash = realClash.has(it.id);
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: "jt-tt-block" + (height < 44 ? " short" : "") + (clash ? " clash" : ""),
                  style: {
                    top: y(it.s) + 1,
                    height,
                    left: `calc(${it.col / n * 100}% + 2px)`,
                    width: `calc(${100 / n}% - 4px)`
                  },
                  onClick: () => onEdit(it),
                  "aria-label": `${it.time} ${it.title} 고치기`,
                  children: [
                    /* @__PURE__ */ jsx("strong", { children: it.title }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      fmtMin(it.s),
                      "~",
                      fmtMin(it.e % (24 * 60)),
                      it.place ? `, ${it.place}` : ""
                    ] })
                  ]
                },
                it.id
              );
            })
          ]
        }
      ),
      isToday && now >= h0 * 60 && now <= h1 * 60 && /* @__PURE__ */ jsx("div", { className: "jt-tt-now", style: { top: y(now) }, "aria-label": `지금 ${fmtMin(now)}`, children: /* @__PURE__ */ jsx("span", { children: "지금" }) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "jt-hint jt-tt-note", children: [
      "시간표의 빈 곳을 누르면 그 시간(30분 단위)에, 누른 채로 위아래로 끌면 시작부터 끝까지(15분 단위) 정해서 일정을 추가할 수 있어요. 휴대폰은 0.3초 꾹 누른 뒤 끌어 주세요.",
      untimed > 0 ? ` 시간을 정하지 않은 일정 ${untimed}개는 위 목록에만 보여요.` : ""
    ] })
  ] });
}
