function GeoFix({ targets, gkey, onApply, onClose }) {
  let [rows, setRows] = useState([]), [done, setDone] = useState(!1), [pick, setPick] = useState({}), stop = useRef(!1);
  useEffect(() => {
    let alive = !0;
    return (async () => {
      let gap = gkey && !gmAuthFailed ? 250 : 1100;
      for (let w of targets) {
        if (!alive || stop.current) break;
        let r = await findPlaceFor(w, gkey, gap);
        if (!alive) return;
        setRows((x) => [...x, { w, ...r }]), r.status === "ok" && setPick((x) => ({ ...x, [w.id]: !0 })), await new Promise((ok) => setTimeout(ok, gap));
      }
      alive && setDone(!0);
    })(), () => {
      alive = !1;
    };
  }, []);
  let found = rows.filter((x) => x.status === "ok"), missed = rows.filter((x) => x.status !== "ok"), chosen = found.filter((x) => pick[x.w.id]), gErr = (rows.find((x) => x.gErr) || {}).gErr || "", usedOsm = rows.some((x) => x.engine === "osm");
  return /* @__PURE__ */ jsx(Sheet, { title: "위치 없는 장소 한 번에 찾기", onClose, children: /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
    done ? /* @__PURE__ */ jsxs("p", { className: "jt-hint jt-geo-sum", children: [
      targets.length,
      "곳 중 ",
      /* @__PURE__ */ jsxs("b", { children: [
        found.length,
        "곳"
      ] }),
      "을 찾았어요. 확실하지 않은 ",
      missed.length,
      "곳은 비워 뒀어요."
    ] }) : /* @__PURE__ */ jsxs("div", { className: "jt-geo-run", children: [
      /* @__PURE__ */ jsx("div", { className: "jt-geo-bar", children: /* @__PURE__ */ jsx("i", { style: { width: `${rows.length / targets.length * 100}%` } }) }),
      /* @__PURE__ */ jsxs("span", { children: [
        rows.length,
        "/",
        targets.length,
        "곳 찾는 중"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "jt-ghost sm",
          onClick: () => {
            stop.current = !0, setDone(!0);
          },
          children: "여기까지만 찾기"
        }
      )
    ] }),
    rows.length > 0 && (gErr || !gkey && usedOsm) && /* @__PURE__ */ jsxs("div", { className: "jt-warn-inline jt-geo-why", children: [
      gErr ? /* @__PURE__ */ jsx("b", { children: "구글 장소 검색을 쓰지 못해서 무료 검색(OpenStreetMap)으로 찾았어요." }) : /* @__PURE__ */ jsx("b", { children: "구글 지도 키가 없어 무료 검색(OpenStreetMap)으로 찾았어요." }),
      /* @__PURE__ */ jsx("span", { children: gErr ? G_REASON(gErr) : "무료 검색은 한국어 이름을 잘 못 찾아요. 설정에 구글 지도 키를 넣으면 훨씬 잘 찾아요." })
    ] }),
    found.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "찾았어요 (체크한 곳만 저장돼요)" }),
      /* @__PURE__ */ jsx("ul", { className: "jt-geo-list", children: found.map(({ w, r }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: !!pick[w.id],
            onChange: (e) => setPick((x) => ({ ...x, [w.id]: e.target.checked }))
          }
        ),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("strong", { children: w.name }),
          /* @__PURE__ */ jsxs("em", { children: [
            r.name,
            r.area ? `, ${r.area}` : ""
          ] })
        ] })
      ] }) }, w.id)) })
    ] }),
    missed.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h4", { className: "jt-subhead", children: "비워 둔 곳" }),
      /* @__PURE__ */ jsx("ul", { className: "jt-geo-list miss", children: missed.map(({ w, status, engine }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: w.name }),
        /* @__PURE__ */ jsxs("em", { children: [
          GEO_REASON[status],
          engine ? engine === "google" ? " (구글 검색)" : " (무료 검색)" : ""
        ] })
      ] }) }, w.id)) }),
      /* @__PURE__ */ jsx("p", { className: "jt-hint", children: '비워 둔 곳은 수정 화면의 "위치 검색"으로 직접 고를 수 있어요.' })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "jt-primary",
        disabled: !done || !chosen.length,
        onClick: () => {
          let upd = {};
          chosen.forEach(({ w, r }) => {
            upd[w.id] = {
              lat: r.lat,
              lng: r.lng,
              ...r.placeId ? { placeId: r.placeId } : {},
              // 구글 검색 링크(share.google 등)는 구글맵 링크로 바꿔 줌
              ...r.link && (!w.link || isSearchLink(w.link)) ? { link: r.link } : {},
              ...!w.area && r.area ? { area: r.area.split(" ").slice(0, 3).join(" ") } : {}
            };
          }), onApply(upd);
        },
        children: done ? `선택한 ${chosen.length}곳에 위치 저장` : "찾는 중"
      }
    )
  ] }) });
}
function plannedDay(w, plan) {
  let p = (plan || []).find((x) => x.wishId === w.id) || (plan || []).find((x) => !x.wishId && x.title === w.name);
  return p ? p.day : null;
}
function useFold() {
  let [open, setOpen] = useState({});
  return [open, (id) => setOpen((o) => ({ ...o, [id]: !o[id] })), (ids, v) => setOpen(v ? Object.fromEntries(ids.map((id) => [id, !0])) : {})];
}
function FoldAll({ ids, open, setAll }) {
  if (ids.length < 2) return null;
  let allOpen = ids.every((id) => open[id]);
  return /* @__PURE__ */ jsx("div", { className: "jt-foldall", children: /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-ghost sm", onClick: () => setAll(ids, !allOpen), children: [
    allOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 15 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 15 }),
    allOpen ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function CommentButton({ count, open, onClick }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (open ? " open" : ""),
      onClick: (e) => {
        e.stopPropagation(), onClick();
      },
      "aria-expanded": open,
      children: [
        /* @__PURE__ */ jsx(MessageSquare, { size: 15 }),
        "댓글 ",
        count || 0
      ]
    }
  );
}
function CommentBox({ comments = [], me, members, onAdd, onDelete }) {
  let [text, setText] = useState(""), send = () => {
    let t = text.trim();
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
  let [geoOpen, setGeoOpen] = useState(!1), noPos = wish.filter((w) => !hasPos(w)), [title, setTitle] = useState(initial?.title || "가족 일본여행"), [start, setStart] = useState(initial?.start || iso(new Date(Date.now() + 30 * 864e5))), [days, setDays] = useState(initial?.days || 4), [members, setMembers] = useState(initial?.members || []), [rate, setRate] = useState(initial?.rate || 900), [gmapsKey, setGmapsKey] = useState(initial?.gmapsKey || ""), [pgroups, setPgroups] = useState(initial?.pgroups || []), [pick, setPick] = useState([]), [keyMode, setKeyMode] = useState("locked"), keyRef = useRef(null), maskKey = (k) => k ? k.length > 10 ? k.slice(0, 4) + "••••••••" + k.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [name, setName] = useState(""), add = () => {
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
      /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
        /* @__PURE__ */ jsx("span", { children: "개인 경비 함께 쓰기 (선택)" }),
        pgroups.filter((g) => g.every((m) => members.includes(m))).length > 0 && /* @__PURE__ */ jsx("div", { className: "jt-chips", children: pgroups.filter((g) => g.every((m) => members.includes(m))).map((g) => /* @__PURE__ */ jsxs("span", { className: "jt-chip on", children: [
          g.join(" + "),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setPgroups(pgroups.filter((x) => x !== g)), "aria-label": `${g.join(", ")} 묶음 풀기`, children: /* @__PURE__ */ jsx(X, { size: 14 }) })
        ] }, g.join("+"))) }),
        /* @__PURE__ */ jsxs("div", { className: "jt-chips", children: [
          members.filter((m) => !pgroups.some((g) => g.includes(m))).map((m) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "jt-chip" + (pick.includes(m) ? " on" : ""),
              onClick: () => setPick(pick.includes(m) ? pick.filter((x) => x !== m) : [...pick, m]),
              children: [
                pick.includes(m) && /* @__PURE__ */ jsx(Check, { size: 14 }),
                m
              ]
            },
            m
          )),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              disabled: pick.length < 2,
              onClick: () => {
                setPgroups([...pgroups, pick]), setPick([]);
              },
              children: "묶기"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "jt-hint", children: "두 명 이상 골라 묶으면 개인 경비를 한 장부로 같이 써요(예: 커플). 묶음 안의 사람끼리만 보여요." })
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
          onClick: () => onSave({ title: title.trim(), start, days, members, rate: rate || 900, gmapsKey, pgroups: pgroups.filter((g) => g.filter((m) => members.includes(m)).length > 1) }),
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
