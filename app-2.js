t && (onAdd(t), setText(""));
  };
  return /* @__PURE__ */ jsxs("div", { className: "jt-comments", onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), children: [
    comments.length === 0 && /* @__PURE__ */ jsx("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ jsx("ul", { children: comments.map((c) => /* @__PURE__ */ jsxs("li", { className: "jt-comment", children: [
      /* @__PURE__ */ jsx(Avatar, { name: c.by, members, size: 24 }),
      /* @__PURE__ */ jsxs("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: c.by }),
          /* @__PURE__ */ jsx("span", { children: ago(c.createdAt) })
        ] }),
        /* @__PURE__ */ jsx("p", { children: c.text })
      ] }),
      c.by === me && /* @__PURE__ */ jsx(DeleteButton, { onConfirm: () => onDelete(c.id), label: "" })
    ] }, c.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: text,
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && !e.nativeEvent.isComposing && send(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-send", onClick: send, disabled: !text.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ jsx(Send, { size: 18 }) })
    ] })
  ] });
}
function SettingsForm({ initial, onSave, onCancel, wish = [], onBatchPos }) {
  let [geoOpen, setGeoOpen] = useState(!1), noPos = wish.filter((w) => !hasPos(w)), [title, setTitle] = useState(initial?.title || "가족 일본여행"), [start, setStart] = useState(initial?.start || iso(new Date(Date.now() + 30 * 864e5))), [days, setDays] = useState(initial?.days || 4), [members, setMembers] = useState(initial?.members || []), [rate, setRate] = useState(initial?.rate || 900), [gmapsKey, setGmapsKey] = useState(initial?.gmapsKey || ""), [keyMode, setKeyMode] = useState("locked"), keyRef = useRef(null), maskKey = (k) => k ? k.length > 10 ? k.slice(0, 4) + "••••••••" + k.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [name, setName] = useState(""), add = () => {
    let n = name.trim();
    !n || members.includes(n) || (setMembers([...members, n]), setName(""));
  }, ok = title.trim() && start && members.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: "jt-setup", children: [
    onCancel && /* @__PURE__ */ jsx(BackBar, { onBack: onCancel }),
    /* @__PURE__ */ jsx("h1", { children: initial ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
      /* @__PURE__ */ jsx(Field, { label: "여행 이름", children: /* @__PURE__ */ jsx("input", { value: title, onChange: (e) => setTitle(e.target.value) }) }),
      /* @__PURE__ */ jsx(Field, { label: "출발일", children: /* @__PURE__ */ jsx("input", { type: "date", value: start, onChange: (e) => setStart(e.target.value) }) }),
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "여행 일수" }),
        /* @__PURE__ */ jsxs("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setDays(Math.max(1, days - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ jsxs("strong", { children: [
            days,
            "일"
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setDays(Math.min(30, days + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ jsx("div", { className: "jt-chips", children: members.map((m) => /* @__PURE__ */ jsxs("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ jsx(Avatar, { name: m, members, size: 20 }),
          m,
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMembers(members.filter((x) => x !== m)), "aria-label": `${m} 빼기`, children: /* @__PURE__ */ jsx(X, { size: 14 }) })
        ] }, m)) }),
        /* @__PURE__ */ jsxs("div", { className: "jt-inline", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              value: name,
              onChange: (e) => setName(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && add(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary", onClick: add, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ jsx("input", { type: "number", inputMode: "numeric", value: rate, onChange: (e) => setRate(Number(e.target.value) || 0) }) }),
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "구글 지도 API 키 (선택)" }),
        keyMode === "edit" ? /* @__PURE__ */ jsx(
          "input",
          {
            ref: keyRef,
            value: gmapsKey,
            onChange: (e) => setGmapsKey(e.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "jt-keylock", children: [
          /* @__PURE__ */ jsx(Lock, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "jt-keylock-val", children: maskKey(gmapsKey) }),
          keyMode === "locked" && /* @__PURE__ */ jsx(PressHold, { onDone: () => setKeyMode("warn"), className: "sm", children: "길게 눌러 변경" })
        ] }),
        keyMode === "warn" && /* @__PURE__ */ jsxs("div", { className: "jt-keywarn", role: "alert", children: [
          /* @__PURE__ */ jsx("strong", { children: "API 키를 바꾸기 전에 확인해 주세요" }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "바꾼 키는 저장하면 ",
              /* @__PURE__ */ jsx("b", { children: "가족 모두의 앱" }),
              "에 바로 적용돼요."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "키가 틀리거나 사용 제한에 걸리면 지도, 장소 검색, 내 주변이 기본 지도로 바뀌어요." }),
            /* @__PURE__ */ jsx("li", { children: "새 키는 구글 클라우드에서 사이트 제한과 하루 사용 한도를 꼭 걸어 주세요. 한도를 걸지 않으면 요금이 나올 수 있어요." }),
            /* @__PURE__ */ jsx("li", { children: "키를 지우면 무료 기본 지도로 돌아가요." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "jt-keywarn-act", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "jt-ghost sm", onClick: () => setKeyMode("locked"), children: "취소" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  setKeyMode("edit"), setTimeout(() => keyRef.current && keyRef.current.focus(), 50);
                },
                children: "확인했어요, 변경할게요"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "jt-hint", children: keyMode === "edit" ? "고친 뒤 아래 '설정 저장'을 눌러야 적용돼요." : "실수로 바뀌지 않도록 잠겨 있어요. 한 명만 넣으면 가족 모두에게 적용돼요." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "jt-primary",
          disabled: !ok,
          onClick: () => onSave({ title: title.trim(), start, days, members, rate: rate || 900, gmapsKey }),
          children: initial ? "설정 저장" : "여행 시작하기"
        }
      ),
      onCancel && /* @__PURE__ */ jsx("button", { className: "jt-ghost", onClick: onCancel, children: "취소" }),
      initial && onBatchPos && /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "가고 싶은 곳 위치" }),
        /* @__PURE__ */ jsxs("div", { className: "jt-geo-cta", children: [
          /* @__PURE__ */ jsx("span", { children: noPos.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "위치 없는 장소 ",
            /* @__PURE__ */ jsxs("b", { children: [
              noPos.length,
              "곳"
            ] })
          ] }) : "모든 장소에 위치가 있어요" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary sm", disabled: !noPos.length, onClick: () => setGeoOpen(!0), children: "한 번에 찾기" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "jt-hint", children: "이름과 동네로 지도 위치를 찾아 거리 표시와 지도 핀에 쓸 수 있게 해요. 확실하지 않은 곳은 비워 둬요." })
      ] }),
      geoOpen && /* @__PURE__ */ jsx(
        GeoFix,
        {
          targets: noPos,
          gkey: gmapsKey,
          onClose: () => setGeoOpen(!1),
          onApply: (upd) => {
            onBatchPos(upd), setGeoOpen(!1);
          }
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ jsx(InviteBox, {})
    ] })
  ] });
}
function InviteBox() {
  let [msg, setMsg] = useState(""), url = inviteUrl();
  return /* @__PURE__ */ jsxs("div", { className: "jt-invite", children: [
    /* @__PURE__ */ jsx("strong", { children: "가족 초대" }),
    /* @__PURE__ */ jsx("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ jsx("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url });
          return;
        } catch (e) {
          if (e && e.name === "AbortError") return;
        }
      try {
        await navigator.clipboard.writeText(url), setMsg("링크를 복사했어요. 가족 채팅방에 붙여넣어 주세요.");
      } catch {
        setMsg("자동 복사가 안 돼요. 아래 '주소 보기'를 열어 길게 눌러 복사해 주세요.");
      }
    }, children: "초대 링크 보내기" }),
    msg && /* @__PURE__ */ jsx("p", { className: "jt-hint jt-formmsg", children: msg }),
    /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsx("summary", { children: "주소 보기" }),
      /* @__PURE__ */ jsx("code", { children: url })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && disconnect();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function BackBar({ onBack, label = "돌아가기" }) {
  return /* @__PURE__ */ jsx("div", { className: "jt-backbar", children: /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-back", onClick: onBack, "aria-label": label, children: [
    /* @__PURE__ */ jsx(ChevronLeft, { size: 22 }),
    label
  ] }) });
}
function PressHold({ ms = 1e3, onDone, children, className = "" }) {
  let [pressing, setPressing] = useState(!1), t = useRef(null), start = (e) => {
    e.preventDefault(), setPressing(!0), clearTimeout(t.current), t.current = setTimeout(() => {
      setPressing(!1), navigator.vibrate && navigator.vibrate(20), onDone();
    }, ms);
  }, stop = () => {
    clearTimeout(t.current), setPressing(!1);
  };
  return useEffect(() => () => clearTimeout(t.current), []), /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "jt-presshold " + className + (pressing ? " pressing" : ""),
      style: { "--hold": ms + "ms" },
      onPointerDown: start,
      onPointerUp: stop,
      onPointerLeave: stop,
      onPointerCancel: stop,
      onContextMenu: (e) => e.preventDefault(),
      onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && !e.repeat && start(e),
      onKeyUp: stop,
      children: [
        /* @__PURE__ */ jsx("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "jt-presshold-label", children })
      ]
    }
  );
}
function OfflineBar() {
  let [online, setOnline] = useState(() => typeof navigator > "u" ? !0 : navigator.onLine !== !1), [back, setBack] = useState(!1), [open, setOpen] = useState(!1);
  return useEffect(() => {
    let t, on = () => {
      setOnline(!0), setOpen(!1), setBack(!0), clearTimeout(t), t = setTimeout(() => setBack(!1), 3e3);
    }, off = () => {
      setOnline(!1), setBack(!1);
    };
    return window.addEventListener("online", on), window.addEventListener("offline", off), () => {
      window.removeEventListener("online", on), window.removeEventListener("offline", off), clearTimeout(t);
    };
  }, []), online && !back ? null : online ? /* @__PURE__ */ jsxs("div", { className: "jt-netbar on", role: "status", children: [
    /* @__PURE__ */ jsx(Wifi, { size: 15, "aria-hidden": "true" }),
    "다시 연결됐어요. 저장해 둔 내용을 올리고 있어요."
  ] }) : /* @__PURE__ */ jsxs("div", { className: "jt-netbar", role: "alert", children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-netbar-head", onClick: () => setOpen(!open), "aria-expanded": open, children: [
      /* @__PURE__ */ jsx(WifiOff, { size: 15, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { children: "오프라인 상태예요. 입력한 내용은 연결되면 자동으로 올라가요." }),
      /* @__PURE__ */ jsx(ChevronDown, { size: 16, className: "jt-fold-ic", "aria-hidden": "true" })
    ] }),
    open && /* @__PURE__ */ jsxs("div", { className: "jt-netbar-body", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("b", { children: "계속 쓸 수 있어요" }),
        " 일정, 가고 싶은 곳, 경비 보기와 입력, 정산, 채팅 쓰기, 길 찾기 버튼, 마지막으로 받은 날씨"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("b", { children: "연결되면 돼요" }),
        " 새 날씨 예보, 지도 화면, 장소 검색, 내 주변, 가족 위치 갱신, 새 채팅 받기"
      ] })
    ] })
  ] });
}
function WhoAreYou({ members, onPick, current, onBack }) {
  return /* @__PURE__ */ jsxs("div", { className: "jt-setup", children: [
    onBack && /* @__PURE__ */ jsx(BackBar, { onBack }),
    /* @__PURE__ */ jsx("h1", { children: onBack ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ jsx("div", { className: "jt-who-list", children: members.map((m) => /* @__PURE__ */ jsxs("button", { className: "jt-who-btn" + (m === current ? " on" : ""), onClick: () => onPick(m), children: [
      /* @__PURE__ */ jsx(Avatar, { name: m, members, size: 40 }),
      /* @__PURE__ */ jsx("span", { className: "jt-who-name", children: m }),
      m === current && /* @__PURE__ */ jsx("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, m)) })
  ] });
}
function PlanForm({ initial, preset, gkey, dayItems = [], onSave, onDelete }) {
  let [time, setTime] = useState(initial?.time || preset?.time || ""), [end, setEnd] = useState(initial?.end || preset?.end || ""), [link, setLink] = useState(initial?.link || ""), [pos, setPos] = useState(initial && hasPos(initial) ? { lat: initial.lat, lng: initial.lng, placeId: initial.placeId } : null), [results, setResults] = useState([]), [busy, setBusy] = useState(!1), [smsg, setSmsg] = useState(""), [title, setTitle] = useState(initial?.title || ""), [place, setPlace] = useState(initial?.place || ""), [memo, setMemo] = useState(initial?.memo || ""), [auto, setAuto] = useState(!1), onTitle = (v) => {
    if (setTitle(v), !time || auto) {
      let f = findTime(v);
      f ? (setTime(f), setAuto(!0)) : auto && (setTime(""), setAuto(!1));
    }
  }, searchPlace = async () => {
    let q = (place || title).trim();
    if (!q) {
      setSmsg("장소 이름을 먼저 적어 주세요.");
      return;
    }
    setBusy(!0), setSmsg(""), setResults([]);
    try {
      let res = await placeSearch(q, gkey);
      setResults(res), res.length || setSmsg("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      setSmsg("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    setBusy(!1);
  }, badEnd = time && end && toMin(end) <= toMin(time), clashes = time ? dayItems.filter((o) => {
    if (!o.time) return !1;
    let a = span({ time, end: badEnd ? "" : end }), b = span(o);
    return a.s < b.e && b.s < a.e;
  }) : [];
  return /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
    /* @__PURE__ */ jsx(Field, { label: "무엇을 하나요", children: /* @__PURE__ */ jsx("input", { value: title, onChange: (e) => onTitle(e.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    auto && time && /* @__PURE__ */ jsxs("p", { className: "jt-hint", children: [
      "제목에서 ",
      time,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "jt-two", children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ jsx(
          TimeSelect,
          {
            label: "시작",
            value: time,
            onChange: (v) => {
              setTime(v), setAuto(!1), v || setEnd("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ jsx(TimeSelect, { label: "끝", value: end, onChange: setEnd, disabled: !time })
      ] })
    ] }),
    time && !end && /* @__PURE__ */ jsx("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    badEnd && /* @__PURE__ */ jsx("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    time && end && !badEnd && /* @__PURE__ */ jsxs("p", { className: "jt-hint", children: [
      durText(toMin(end) - toMin(time)),
      " 동안"
    ] }),
    clashes.length > 0 && /* @__PURE__ */ jsxs("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      clashes.map((c) => `'${c.title}'(${c.time}${c.end ? `~${c.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsx("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ jsxs("div", { className: "jt-inline", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: place,
            onChange: (e) => setPlace(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && !e.nativeEvent.isComposing && searchPlace(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary", onClick: searchPlace, disabled: busy, children: busy ? "찾는 중" : "검색" })
      ] })
    ] }),
    smsg && /* @__PURE__ */ jsx("p", { className: "jt-hint", children: smsg }),
    results.length > 0 && /* @__PURE__ */ jsx("ul", { className: "jt-results jt-form-results", children: results.map((r, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          setPlace(r.name), setPos({ lat: r.lat, lng: r.lng, placeId: r.placeId }), r.link && setLink(r.link), setResults([]), setSmsg("");
        },
        children: [
          /* @__PURE__ */ jsx("strong", { children: r.name }),
          /* @__PURE__ */ jsx("span", { children: r.area })
        ]
      }
    ) }, i)) }),
    pos && /* @__PURE__ */ jsxs("div", { className: "jt-picked", children: [
      /* @__PURE__ */ jsx(MapPin, { size: 14 }),
      /* @__PURE__ */ jsx("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: mapUrl({ title, place, link, ...pos }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx(ExternalLink, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-ghost sm", onClick: () => setPos(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ jsx("input", { type: "url", value: link, onChange: (e) => setLink(e.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ jsx("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ jsx(Field, { label: "메모 (선택)", children: /* @__PURE__ */ jsx("textarea", { rows: 2, value: memo, onChange: (e) => setMemo(e.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "jt-primary",
        disabled: !title.trim() || badEnd,
        onClick: () => onSave({
          time,
          end: time ? end : "",
          title: title.trim(),
          place: place.trim(),
          memo: memo.trim(),
          link: link.trim(),
          lat: pos ? pos.lat : void 0,
          lng: pos ? pos.lng : void 0,
          placeId: pos && pos.placeId ? pos.placeId : void 0
        }),
        children: initial ? "수정 저장" : "일정 추가"
      }
    ),
    initial && /* @__PURE__ */ jsx(DeleteButton, { onConfirm: onDelete, label: "이 일정 삭제" })
  ] });
}
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
function SpendForm({ settings, me, defaultDay, initial, onSave, onDelete }) {
  let { members, days, start } = settings, [ownRate, setOwnRate] = useState(!!initial?.rate), [rateText2, setRateText] = useState(initial?.rate ? String(initial.rate) : String(Math.round(settings.rate * 100) / 100)), customRate = Number(rateText2), rateOk = !ownRate || customRate >= 300 && customRate <= 3e3, rate = ownRate && rateOk ? customRate : settings.rate, [title, setTitle] = useState(initial?.title || ""), [cur, setCur] = useState(initial?.cur === "KRW" ? "KRW" : "JPY"), [amount, setAmount] = useState(
    initial ? String((initial.cur === "KRW" ? Number(initial.orig) : Number(initial.amount)) || "") : ""
  ), [payer, setPayer] = useState(initial && members.includes(initial.payer) ? initial.payer : me), [cat, setCat] = useState(initial?.cat || "식비"), [day, setDay] = useState(initial ? Math.min(initial.day, days - 1) : defaultDay), [split, setSplit] = useState(initial ? (initial.split || []).filter((m) => members.includes(m)) : []), [fund, setFund] = useState(!!initial && isFund(initial)), typed = Number(amount) || 0, amt = cur === "KRW" ? Math.round(typed * 100 / rate) : typed, lost = initial ? [initial.payer, ...initial.split || []].filter((m, i, a) => m && m !== FUND && !members.includes(m) && a.indexOf(m) === i) : [], toggle = (m) => setSplit(split.includes(m) ? split.filter((x) => x !== m) : [...split, m]), ok = title.trim() && amt > 0 && (fund || split.length > 0) && rateOk;
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
          split: fund ? [] : split,
          fund: fund || void 0,
          cur,
          orig: cur === "KRW" ? typed : void 0,
          rate: ownRate && rateOk ? customRate : void 0
        }),
        children: initial ? "수정 저장" : "경비 기록하기"
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
