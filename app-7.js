function PostCard({ post, me, members, onEdit, onLike, onComment, onDelComment, onOpenPhoto }) {
  let [open, setOpen] = useState(!1), photos = post.photos || [], urls = post.urls || [], comments = post.comments || [], shown = photos.slice(0, 4);
  return /* @__PURE__ */ jsxs("li", { className: "jt-post", children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ jsx(Avatar, { name: post.by, members, size: 34 }),
      /* @__PURE__ */ jsxs("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ jsx("strong", { children: post.by }),
        /* @__PURE__ */ jsxs("span", { children: [
          ago(post.createdAt),
          post.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      post.by === me && /* @__PURE__ */ jsx("button", { className: "jt-icon sm", onClick: () => onEdit(post), "aria-label": "내 글 고치기", children: /* @__PURE__ */ jsx(Pencil, { size: 17 }) })
    ] }),
    post.text && /* @__PURE__ */ jsx(RichText, { text: post.text }),
    photos.length > 0 && /* @__PURE__ */ jsx("div", { className: "jt-gallery n" + Math.min(photos.length, 4), children: shown.map((id, i) => /* @__PURE__ */ jsxs("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ jsx(Photo, { id, onClick: () => onOpenPhoto(photos, i) }),
      i === 3 && photos.length > 4 && /* @__PURE__ */ jsxs("span", { className: "jt-more", children: [
        "+",
        photos.length - 4
      ] })
    ] }, id)) }),
    urls.length > 0 && /* @__PURE__ */ jsx("div", { className: "jt-links", children: urls.map((u) => /* @__PURE__ */ jsx(LinkCard, { url: u }, u)) }),
    /* @__PURE__ */ jsxs("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ jsx(Reactions, { item: post, me, members, onReact: (e) => onLike(post.id, e) }),
      /* @__PURE__ */ jsx(CommentButton, { count: comments.length, open, onClick: () => setOpen(!open) })
    ] }),
    open && /* @__PURE__ */ jsx(
      CommentBox,
      {
        comments,
        me,
        members,
        onAdd: (t) => onComment(post.id, t),
        onDelete: (cid) => onDelComment(post.id, cid)
      }
    )
  ] });
}
function BoardTab({ settings, board, me, ...rest }) {
  let [lb, setLb] = useState(null), list = [...board].sort((a, b) => b.createdAt - a.createdAt);
  return /* @__PURE__ */ jsxs("section", { children: [
    list.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "jt-empty", children: [
      /* @__PURE__ */ jsx("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ jsx("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ jsx("ul", { className: "jt-posts", children: list.map((p) => /* @__PURE__ */ jsx(
      PostCard,
      {
        post: p,
        me,
        members: settings.members,
        onOpenPhoto: (photos, index) => setLb({ photos, index }),
        ...rest
      },
      p.id
    )) }),
    lb && /* @__PURE__ */ jsx(Lightbox, { photos: lb.photos, index: lb.index, onClose: () => setLb(null) })
  ] });
}
var LOC_PREFIX = "trip:loc:", LIVE_MS = 3 * 6e4, memberColor = (members, m) => LINE[(Math.max(0, members.indexOf(m)) * 2 + 3) % LINE.length], isLive = (l) => !!l && l.online && typeof l.lat == "number" && Date.now() - l.at < LIVE_MS, dirUrl = (l) => `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}&travelmode=walking`;
function FamilyTab({ settings, me, locs, shareOn, onToggle, myPos, geoErr }) {
  let [help, setHelp] = useState(!1), [, setTick] = useState(0);
  useEffect(() => {
    let t = setInterval(() => setTick((x) => x + 1), 3e4);
    return () => clearInterval(t);
  }, []);
  let members = settings.members, rows = members.map((m) => ({ m, l: locs[m], live: isLive(locs[m]) })), livePins = rows.filter((r) => r.live).map((r) => ({ id: r.m, lat: r.l.lat, lng: r.l.lng, color: memberColor(members, r.m), label: r.m, text: r.m[0] })), pinKey = livePins.map((x) => `${x.id}:${x.lat.toFixed(5)}:${x.lng.toFixed(5)}`).join("|"), pins = useMemo(() => livePins, [pinKey]), [sel, setSel] = useState(null), [view, setView] = useState(() => {
    let p0 = livePins[0] || myPos;
    return p0 ? { lat: p0.lat, lng: p0.lng, z: 14 } : { lat: WEATHER_SPOT.lat, lng: WEATHER_SPOT.lng, z: 12 };
  }), fitAll = () => {
    if (!livePins.length) return;
    let lat = livePins.reduce((a, x) => a + x.lat, 0) / livePins.length, lng = livePins.reduce((a, x) => a + x.lng, 0) / livePins.length, far = Math.max(...livePins.map((x) => distM({ lat, lng }, x)));
    setView({ lat, lng, z: far < 300 ? 16 : far < 1e3 ? 15 : far < 3e3 ? 13 : far < 1e4 ? 12 : 10 }), setSel(null);
  }, fitted = useRef(!1);
  useEffect(() => {
    !fitted.current && livePins.length && (fitted.current = !0, fitAll());
  }, [pinKey]);
  let liveCount = rows.filter((r) => r.live).length;
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-share" + (shareOn ? " on" : ""), children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ jsx("strong", { children: shareOn ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ jsx("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-helpbtn", onClick: () => setHelp(!0), children: [
          /* @__PURE__ */ jsx(HelpCircle, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", role: "switch", "aria-checked": shareOn, "aria-label": "내 위치 공유", className: "jt-switch", onClick: onToggle, children: /* @__PURE__ */ jsx("i", {}) })
    ] }),
    shareOn && geoErr && /* @__PURE__ */ jsx("p", { className: "jt-warn-inline jt-share-err", children: geoErr }),
    /* @__PURE__ */ jsx(
      TripMap,
      {
        gkey: settings.gmapsKey,
        view,
        setView,
        pins,
        temp: null,
        selectedId: sel,
        onTap: () => setSel(null),
        onPinTap: (id) => setSel(id),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ jsx("b", { children: liveCount }),
        "/",
        members.length,
        "명"
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", className: "jt-secondary sm", onClick: fitAll, disabled: !liveCount, children: [
        /* @__PURE__ */ jsx(Crosshair, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "jt-fam-list", children: rows.map(({ m, l, live }) => {
      let meRow = m === me, dist = live && myPos && !meRow ? distM(myPos, l) : null;
      return /* @__PURE__ */ jsxs("li", { className: "jt-fam" + (live ? " live" : "") + (sel === m ? " sel" : ""), children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !live,
            onClick: () => {
              setSel(m), setView({ lat: l.lat, lng: l.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ jsxs("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ jsx(Avatar, { name: m, members, size: 34 }),
                live && /* @__PURE__ */ jsx("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ jsxs("strong", { children: [
                  m,
                  meRow ? " (나)" : ""
                ] }),
                /* @__PURE__ */ jsx("span", { children: live ? `위치 공유 중, ${ago(l.at)}${dist != null ? `, 나와 ${distText(dist)}` : ""}` : l && l.at ? `앱 꺼짐, 마지막 접속 ${ago(l.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        live && !meRow && /* @__PURE__ */ jsxs("a", { className: "jt-maplink", href: dirUrl(l), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(Navigation, { size: 13 }),
          "길 찾기"
        ] })
      ] }, m);
    }) }),
    help && /* @__PURE__ */ jsxs(Sheet, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => setHelp(!1), children: [
      /* @__PURE__ */ jsxs("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ jsx("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ jsx("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ jsx("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("b", { children: "공유 설정" }),
          /* @__PURE__ */ jsx("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "jt-primary", onClick: () => setHelp(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
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
