var CHAT_PREFIX = "trip:chat:", READ_PREFIX = "trip:read:", chatKey = (m) => CHAT_PREFIX + m.at.toString(36).padStart(10, "0") + "-" + m.id, hm = (t) => {
  let d = new Date(t);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}, dayLabel = (t) => {
  let d = new Date(t);
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${wk(d)})`;
};
function linkify(text) {
  return text.split(/(https?:\/\/[^\s]+)/g).map(
    (p, i) => i % 2 ? /* @__PURE__ */ jsx("a", { href: p, target: "_blank", rel: "noopener noreferrer", children: p }, i) : p
  );
}
function ChatTab({ settings, me, msgs, reads, notice, onSend, onDelete, onEdit, onPin, onUnpin, onSendLoc, badgeAsk, onBadgeAsk }) {
  let members = settings.members, [text, setText] = useState(""), [sel, setSel] = useState(null), [locBusy, setLocBusy] = useState(!1), [editId, setEditId] = useState(null), [editText, setEditText] = useState(""), [noticeOpen, setNoticeOpen] = useState(!1), [flash, setFlash] = useState(null), live = notice ? msgs.find((x) => x.id === notice.id) : null, nv = notice ? { ...notice, ...live ? { text: live.text, kind: live.kind, lat: live.lat, lng: live.lng } : {} } : null, goTo = (id) => {
    let el = document.getElementById("msg-" + id);
    el && (el.scrollIntoView({ block: "center", behavior: "smooth" }), setFlash(id), setTimeout(() => setFlash(null), 1600));
  }, startEdit = (m) => {
    setEditId(m.id), setEditText(m.text), setSel(null);
  }, saveEdit = (m) => {
    let t = editText.trim();
    t && (t !== m.text && onEdit(m, t), setEditId(null));
  }, endRef = useRef(null), first = useRef(!0), count = msgs.length;
  useEffect(() => {
    let last = msgs[count - 1], near = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (first.current || near || last && last.by === me) && endRef.current && endRef.current.scrollIntoView({ block: "end", behavior: first.current ? "auto" : "smooth" }), first.current = !1;
  }, [count]);
  let send = () => {
    let t = text.trim();
    t && (onSend(t), setText(""));
  }, sendLoc = async () => {
    setLocBusy(!0), await onSendLoc(), setLocBusy(!1);
  }, prevDay = "", prev = null;
  return /* @__PURE__ */ jsxs("section", { className: "jt-chat", children: [
    count === 0 && /* @__PURE__ */ jsxs("div", { className: "jt-empty", children: [
      /* @__PURE__ */ jsx("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ jsx("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    nv && /* @__PURE__ */ jsxs("div", { className: "jt-notice" + (noticeOpen ? " open" : ""), children: [
      /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-notice-head", onClick: () => setNoticeOpen(!noticeOpen), "aria-expanded": noticeOpen, children: [
        /* @__PURE__ */ jsx(Megaphone, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ jsx("span", { className: "jt-notice-text", children: nv.kind === "loc" ? `${nv.by}의 위치` : nv.text }),
        /* @__PURE__ */ jsx(ChevronDown, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      noticeOpen && /* @__PURE__ */ jsxs("div", { className: "jt-notice-body", children: [
        nv.kind === "loc" ? /* @__PURE__ */ jsxs("p", { children: [
          nv.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ jsx("a", { href: mapUrl({ lat: nv.lat, lng: nv.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ jsx("p", { className: "jt-msg-text", children: linkify(nv.text) }),
        /* @__PURE__ */ jsxs("span", { className: "jt-notice-meta", children: [
          nv.by,
          "의 메시지, ",
          nv.pinnedBy,
          "이(가) 공지로 등록",
          live ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "jt-notice-act", children: [
          live && /* @__PURE__ */ jsx("button", { type: "button", className: "jt-like", onClick: () => goTo(nv.id), children: "메시지로 이동" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                onUnpin(), setNoticeOpen(!1);
              },
              children: [
                /* @__PURE__ */ jsx(PinOff, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    badgeAsk && /* @__PURE__ */ jsxs("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ jsx("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary sm", onClick: onBadgeAsk, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "jt-msgs", children: msgs.map((m) => {
      let dl = dayLabel(m.at), showDay = dl !== prevDay, mine = m.by === me, cont = !showDay && prev && prev.by === m.by && m.at - prev.at < 5 * 6e4;
      return prevDay = dl, prev = m, /* @__PURE__ */ jsxs(React.Fragment, { children: [
        showDay && /* @__PURE__ */ jsx("li", { className: "jt-daysep", "aria-label": dl, children: /* @__PURE__ */ jsx("span", { children: dl }) }),
        /* @__PURE__ */ jsxs(
          "li",
          {
            id: "msg-" + m.id,
            className: "jt-msg" + (mine ? " mine" : "") + (cont ? " cont" : "") + (flash === m.id ? " flash" : ""),
            children: [
              !mine && /* @__PURE__ */ jsx("span", { className: "jt-msg-av", children: !cont && /* @__PURE__ */ jsx(Avatar, { name: m.by, members, size: 30 }) }),
              /* @__PURE__ */ jsxs("div", { className: "jt-msg-col", children: [
                !mine && !cont && /* @__PURE__ */ jsx("span", { className: "jt-msg-name", children: m.by }),
                /* @__PURE__ */ jsxs("div", { className: "jt-msg-row", children: [
                  editId === m.id ? /* @__PURE__ */ jsxs("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        rows: 2,
                        value: editText,
                        onChange: (e) => setEditText(e.target.value),
                        onKeyDown: (e) => {
                          e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && (e.preventDefault(), saveEdit(m)), e.key === "Escape" && setEditId(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-ghost sm", onClick: () => setEditId(null), children: "취소" }),
                      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary sm", onClick: () => saveEdit(m), disabled: !editText.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + (m.kind === "loc" ? " loc" : "") + (notice && notice.id === m.id ? " pinned" : ""),
                      onClick: () => setSel(sel === m.id ? null : m.id),
                      "aria-label": mine ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": sel === m.id,
                      children: m.kind === "loc" ? /* @__PURE__ */ jsxs("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ jsx(MapPin, { size: 16 }),
                        mine ? "내 위치를 보냈어요" : `${m.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ jsx("span", { className: "jt-msg-text", children: linkify(m.text) })
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let left = members.filter((x) => x !== m.by && (reads[x] || 0) < m.at);
                      return left.length > 0 ? /* @__PURE__ */ jsx("b", { className: "jt-unread", title: `안 읽음: ${left.join(", ")}`, "aria-label": `${left.length}명 안 읽음`, children: left.length }) : null;
                    })(),
                    /* @__PURE__ */ jsxs("time", { className: "jt-msg-time", children: [
                      m.editedAt ? "수정됨 " : "",
                      hm(m.at)
                    ] })
                  ] })
                ] }),
                m.kind === "loc" && /* @__PURE__ */ jsxs("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: mapUrl({ lat: m.lat, lng: m.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ jsx(ExternalLink, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !mine && /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: dirUrl(m), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ jsx(Navigation, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                sel === m.id && editId !== m.id && /* @__PURE__ */ jsxs("div", { className: "jt-msg-menu", children: [
                  notice && notice.id === m.id ? /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        onUnpin(), setSel(null);
                      },
                      children: [
                        /* @__PURE__ */ jsx(PinOff, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        onPin(m), setSel(null), setNoticeOpen(!1);
                      },
                      children: [
                        /* @__PURE__ */ jsx(Pin, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  mine && m.kind !== "loc" && /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-like", onClick: () => startEdit(m), children: [
                    /* @__PURE__ */ jsx(Pencil, { size: 14 }),
                    "수정"
                  ] }),
                  mine && /* @__PURE__ */ jsx(
                    DeleteButton,
                    {
                      onConfirm: () => {
                        onDelete(m), setSel(null);
                      },
                      label: "삭제"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] }, m.id);
    }) }),
    /* @__PURE__ */ jsx("div", { ref: endRef }),
    /* @__PURE__ */ jsxs("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-chat-loc", onClick: sendLoc, disabled: locBusy, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ jsx(MapPin, { size: 20 }) }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          rows: 1,
          value: text,
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => {
            e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && (e.preventDefault(), send());
          },
          placeholder: locBusy ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-send", onClick: send, disabled: !text.trim(), "aria-label": "보내기", children: /* @__PURE__ */ jsx(Send, { size: 18 }) })
    ] })
  ] });
}
function Wheel({ members, onClose }) {
  let [people, setPeople] = useState(members), [name, setName] = useState(""), [rot, setRot] = useState(0), [spinning, setSpinning] = useState(!1), [winner, setWinner] = useState(null), n = people.length, slice = n ? 360 / n : 360, reduce = typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches, add = () => {
    let t = name.trim();
    !t || people.includes(t) || (setPeople([...people, t]), setName(""), setWinner(null));
  }, spin = () => {
    if (n < 2 || spinning) return;
    let pick = Math.floor(Math.random() * n), target = 360 - (pick * slice + slice / 2), base = rot - rot % 360;
    setWinner(null), setSpinning(!0), setRot(base + 360 * (reduce ? 1 : 6) + target), setTimeout(() => {
      setSpinning(!1), setWinner(people[pick]), navigator.vibrate && navigator.vibrate([30, 40, 30]);
    }, reduce ? 600 : 4200);
  }, R = 140, pt = (deg2, r = R) => {
    let a = (deg2 - 90) * Math.PI / 180;
    return [R + r * Math.cos(a), R + r * Math.sin(a)];
  };
  return /* @__PURE__ */ jsx(Sheet, { title: "랜덤 돌림판", onClose, children: /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-wheel-wrap", children: [
      /* @__PURE__ */ jsx("span", { className: "jt-wheel-pin", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "jt-wheel",
          viewBox: `0 0 ${R * 2} ${R * 2}`,
          style: { transform: `rotate(${rot}deg)`, transitionDuration: spinning ? reduce ? "0.6s" : "4.2s" : "0s" },
          role: "img",
          "aria-label": `참가자 ${n}명의 돌림판`,
          children: [
            n === 0 && /* @__PURE__ */ jsx("circle", { cx: R, cy: R, r: R, fill: "#E3E7EE" }),
            n === 1 && /* @__PURE__ */ jsx("circle", { cx: R, cy: R, r: R, fill: LINE[0] }),
            n > 1 && people.map((m, i) => {
              let [x1, y1] = pt(i * slice), [x2, y2] = pt((i + 1) * slice), big = slice > 180 ? 1 : 0;
              return /* @__PURE__ */ jsx("path", { d: `M${R},${R} L${x1},${y1} A${R},${R} 0 ${big} 1 ${x2},${y2} Z`, fill: LINE[i % LINE.length], stroke: "#fff", strokeWidth: "2" }, m);
            }),
            people.map((m, i) => {
              let mid = n > 1 ? i * slice + slice / 2 : 0, [tx, ty] = n > 1 ? pt(mid, R * 0.62) : [R, R];
              return /* @__PURE__ */ jsx(
                "text",
                {
                  x: tx,
                  y: ty,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  transform: n > 1 ? `rotate(${mid} ${tx} ${ty})` : void 0,
                  className: "jt-wheel-label",
                  children: m.length > 6 ? m.slice(0, 6) + "…" : m
                },
                "t" + m
              );
            }),
            /* @__PURE__ */ jsx("circle", { cx: R, cy: R, r: "16", fill: "#fff" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "jt-wheel-result", role: "status", "aria-live": "polite", children: spinning ? "돌아가는 중…" : winner ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("span", { children: "당첨" }),
      /* @__PURE__ */ jsx("strong", { children: winner })
    ] }) : n < 2 ? "두 명 이상 있어야 돌릴 수 있어요" : "가운데 버튼을 눌러 돌려 보세요" }),
    /* @__PURE__ */ jsxs("div", { className: "jt-inline", children: [
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-primary", onClick: spin, disabled: n < 2 || spinning, children: winner ? "다시 돌리기" : "돌리기" }),
      winner && !spinning && n > 2 && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "jt-secondary",
          onClick: () => {
            setPeople(people.filter((x) => x !== winner)), setWinner(null);
          },
          children: "당첨자 빼기"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "jt-field", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "참가자 ",
        n,
        "명"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "jt-chips", children: people.map((m) => /* @__PURE__ */ jsxs("span", { className: "jt-chip on", children: [
        m,
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: spinning,
            onClick: () => {
              setPeople(people.filter((x) => x !== m)), setWinner(null);
            },
            "aria-label": `${m} 빼기`,
            children: /* @__PURE__ */ jsx(X, { size: 14 })
          }
        )
      ] }, m)) }),
      /* @__PURE__ */ jsxs("div", { className: "jt-inline", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && !e.nativeEvent.isComposing && add(),
            placeholder: "참가자 추가 (예: 삼촌)",
            "aria-label": "참가자 이름",
            disabled: spinning
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "button", className: "jt-secondary", onClick: add, disabled: spinning, children: "추가" })
      ] }),
      people.length !== members.length || people.some((m) => !members.includes(m)) ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "jt-ghost sm jt-wheel-reset",
          onClick: () => {
            setPeople(members), setWinner(null);
          },
          disabled: spinning,
          children: "가족 전원으로 되돌리기"
        }
      ) : null
    ] })
  ] }) });
}
var HERO = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Kinkaku-ji in November 2016 -02.jpg", t: "교토 금각사", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 50%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Torii path with lantern at Fushimi Inari Taisha Shrine, Kyoto, Japan.jpg", t: "교토 후시미 이나리 신사", by: "Basile Morin", lic: "CC BY-SA", pos: "50% 45%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], heroSrc = (f) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(f) + "?width=1280", heroPage = (f) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(f.replace(/ /g, "_")), HERO_MS = 7e3;
function HeroSlides() {
  let [i, setI] = useState(0), [bad, setBad] = useState({}), badRef = useRef(bad);
  if (badRef.current = bad, useEffect(() => {
    let t = setInterval(() => {
      setI((x) => {
        let n = x;
        for (let k = 0; k < HERO.length && (n = (n + 1) % HERO.length, !!badRef.current[n]); k++)
          ;
        return n;
      });
    }, HERO_MS);
    return () => clearInterval(t);
  }, []), HERO.every((_, k) => bad[k])) return null;
  let cur = HERO[i];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-hero", "aria-hidden": "true", children: [
      HERO.map((h, k) => /* @__PURE__ */ jsx(
        "img",
        {
          src: heroSrc(h.f),
          alt: "",
          className: k === i ? "on" : "",
          style: { objectPosition: h.pos },
          loading: k === 0 ? "eager" : "lazy",
          onError: () => setBad((b) => ({ ...b, [k]: !0 }))
        },
        h.f
      )),
      /* @__PURE__ */ jsx("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ jsx("div", { className: "jt-hero-dots", "aria-hidden": "true", children: HERO.map((h, k) => /* @__PURE__ */ jsx("i", { className: k === i ? "on" : "" }, h.f)) }),
      /* @__PURE__ */ jsxs("a", { className: "jt-hero-cap", href: heroPage(cur.f), target: "_blank", rel: "noopener noreferrer", children: [
        cur.t,
        ", 사진 ",
        cur.by,
        " (",
        cur.lic,
        ")"
      ] })
    ] })
  ] });
}
function App() {
  let [loaded, setLoaded] = useState(!1), [settings, setSettings] = useState(null), [plan, setPlan] = useState([]), [wish, setWish] = useState([]), [spend, setSpend] = useState([]), [board, setBoard] = useState([]), [me, setMe] = useState(null), [tab, setTab] = useState("plan"), [ui, setUi] = useState({ wish: "list", spend: "me" }), uiReady = useRef(!1), [day, setDay] = useState(0), [editSettings, setEditSettings] = useState(!1), [switching, setSwitching] = useState(!1), [wheelOpen, setWheelOpen] = useState(!1), [slowSync, setSlowSync] = useState(!1);
  useEffect(() => {
    let t = setTimeout(() => setSlowSync(!0), 8e3);
    return () => clearTimeout(t);
  }, []);
  let closersRef = useRef(null), historyPushed = useRef(!1), [sheet, setSheet] = useState(null), [error, setError] = useState(""), inited = useRef(!1), [fx, setFx] = useState(null), [mini, setMini] = useState(!1), [locs, setLocs] = useState({}), [shareOn, setShareOn] = useState(!1), [myPos, setMyPos] = useState(null), [geoErr, setGeoErr] = useState("");
  useEffect(() => {
    (async () => {
      try {
        let r = await window.storage.get("hdr", !1);
        r && r.value === "min" && setMini(!0);
      } catch {
      }
      try {
        let r = await window.storage.get("locshare", !1);
        r && r.value === "on" && setShareOn(!0), (!r || !r.value) && setAskShare(!0);
      } catch {
        setAskShare(!0);
      }
    })();
  }, []);
  let [askShare, setAskShare] = useState(!1), [chat, setChat] = useState([]), [notice, setNotice] = useState(null), [chatRead, setChatRead] = useState(0), [reads, setReads] = useState({}), [badgePerm, setBadgePerm] = useState(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  useEffect(() => {
    (async () => {
      try {
        let r = await window.storage.get("chatread", !1);
        r && r.value && setChatRead(Number(r.value) || 0);
      } catch {
      }
    })();
  }, []);
  let sendChat = async (msg) => {
    let m = { id: uid(), by: me, at: Date.now(), ...msg }, key = chatKey(m);
    setChat((c) => [...c, { ...m, key, pending: !0 }]), await save(key, m) || (setChat((c) => c.filter((x) => x.id !== m.id)), setToast("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, editChat = async (m, text) => {
    let next = { id: m.id, by: m.by, at: m.at, kind: m.kind, text, editedAt: Date.now() };
    setChat((c) => c.map((x) => x.id === m.id ? { ...x, text, editedAt: next.editedAt } : x)), await save(m.key || chatKey(m), next) || setToast("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, pinChat = async (m) => {
    let n = { id: m.id, by: m.by, kind: m.kind || "text", text: m.text || "", lat: m.lat, lng: m.lng, pinnedBy: me, pinnedAt: Date.now() };
    setNotice(n);
    let ok = await save(KEYS.notice, n);
    setToast(ok ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, unpinChat = async () => {
    setNotice(null);
    try {
      await window.storage.delete(KEYS.notice, !0);
    } catch {
    }
    setToast("공지를 해제했어요.");
  }, delChat = async (m) => {
    notice && notice.id === m.id && unpinChat(), setChat((c) => c.filter((x) => x.id !== m.id));
    try {
      await window.storage.delete(m.key || chatKey(m), !0);
    } catch {
    }
  }, sendMyLoc = async () => {
    let pos = myPos;
    if (pos || (pos = await new Promise((res) => {
      if (!navigator.geolocation) return res(null);
      navigator.geolocation.getCurrentPosition(
        (p) => res({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => res(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !pos) {
      setToast("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await sendChat({ kind: "loc", lat: pos.lat, lng: pos.lng, text: "" });
  }, lastOther = chat.reduce((mx, m) => m.by !== me && m.at > mx ? m.at : mx, 0), lastAny = chat.reduce((mx, m) => m.at > mx ? m.at : mx, 0), unread = chat.filter((m) => m.by !== me && m.at > chatRead).length, [visible, setVisible] = useState(() => document.visibilityState === "visible");
  useEffect(() => {
    let h = () => setVisible(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", h), () => document.removeEventListener("visibilitychange", h);
  }, []), useEffect(() => {
    if (!(tab !== "chat" || !visible || !me || !lastAny)) {
      if (lastOther > chatRead) {
        setChatRead(lastOther);
        try {
          window.storage.set("chatread", String(lastOther), !1);
        } catch {
        }
      }
      (reads[me] || 0) < lastAny && (setReads((r) => ({ ...r, [me]: lastAny })), save(READ_PREFIX + encodeURIComponent(me), { at: lastAny }));
    }
  }, [tab, visible, lastAny, lastOther, me]), useEffect(() => {
    if ("setAppBadge" in navigator)
      try {
        unread > 0 ? navigator.setAppBadge(unread).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [unread, badgePerm]);
