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
  let [loaded, setLoaded] = useState(!1), [settings, setSettings] = useState(null), [plan, setPlan] = useState([]), [wish, setWish] = useState([]), [spend, setSpend] = useState([]), [board, setBoard] = useState([]), [ledgers, setLedgers] = useState({}), [me, setMe] = useState(null), [tab, setTab] = useState("plan"), [ui, setUi] = useState({ wish: "list", spend: "me" }), uiReady = useRef(!1), [day, setDay] = useState(0), [editSettings, setEditSettings] = useState(!1), [switching, setSwitching] = useState(!1), [wheelOpen, setWheelOpen] = useState(!1), [slowSync, setSlowSync] = useState(!1);
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
  let askBadge = async () => {
    try {
      let r = await Notification.requestPermission();
      setBadgePerm(r), setToast(r === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      setBadgePerm("denied");
    }
  }, [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    let t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  let setShare = (next, quiet) => {
    setShareOn(next), setAskShare(!1), next || setGeoErr(""), quiet || setToast(next ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", next ? "on" : "off", !1);
    } catch {
    }
  }, toggleShare = () => setShare(!shareOn);
  useEffect(() => {
    if (!shareOn || !me || !settings) return;
    let key = LOC_PREFIX + encodeURIComponent(me), watchId = null, last = null, lastSent = 0, send = (pos) => {
      last = pos, lastSent = Date.now(), setMyPos(pos), save(key, { ...pos, at: Date.now(), online: !0 });
    }, start = () => {
      if (watchId == null) {
        if (!navigator.geolocation) {
          setGeoErr("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        watchId = navigator.geolocation.watchPosition(
          (p) => {
            let pos = { lat: p.coords.latitude, lng: p.coords.longitude, acc: Math.round(p.coords.accuracy) };
            setGeoErr(""), !last || distM(last, pos) > 25 || Date.now() - lastSent > 6e4 ? send(pos) : setMyPos(pos);
          },
          (err) => setGeoErr(
            err.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, stop = (mark) => {
      watchId != null && navigator.geolocation.clearWatch(watchId), watchId = null, mark && save(key, { online: !1, at: Date.now() });
    }, onVis = () => document.visibilityState === "visible" ? start() : stop(!0), onHide = () => stop(!0), beat = setInterval(() => {
      document.visibilityState === "visible" && last && send(last);
    }, 6e4);
    return document.visibilityState === "visible" && start(), document.addEventListener("visibilitychange", onVis), window.addEventListener("pagehide", onHide), () => {
      clearInterval(beat), document.removeEventListener("visibilitychange", onVis), window.removeEventListener("pagehide", onHide), stop(!0);
    };
  }, [shareOn, me, !!settings]), useEffect(() => {
    if (uiReady.current)
      try {
        window.storage.set("ui", JSON.stringify({ tab, ...ui }), !1);
      } catch {
      }
  }, [tab, ui]);
  let toggleMini = () => {
    let next = !mini;
    setMini(next);
    try {
      window.storage.set("hdr", next ? "min" : "max", !1);
    } catch {
    }
  };
  useEffect(() => {
    let alive = !0, run = async () => {
      let v = await fetchFx();
      if (alive)
        if (v) {
          let val = { ...v, at: Date.now() };
          setFx(val), save(KEYS.fx, val);
        } else {
          let c = await load(KEYS.fx, null);
          alive && c && c.rate > 0 && setFx({ ...c, cached: !0 });
        }
    };
    run();
    let t = setInterval(run, 3 * 36e5);
    return () => {
      alive = !1, clearInterval(t);
    };
  }, []);
  let refresh = useCallback(async () => {
    let [s, p, w, e, nt, bd] = await Promise.all([
      load(KEYS.settings, null),
      load(KEYS.plan, []),
      load(KEYS.wish, []),
      load(KEYS.spend, []),
      load(KEYS.notice, null),
      load(KEYS.board, [])
    ]);
    setBoard(bd), setNotice(nt && nt.id ? nt : null), setSettings(s), setPlan(p), setWish(w), setSpend(e);
    try {
      let nl = {};
      (await loadPrefix(LEDGER_PREFIX)).forEach(([k, v]) => nl[decodeURIComponent(k.slice(LEDGER_PREFIX.length))] = v), setLedgers(nl);
    } catch {
    }
    try {
      let next = {};
      (await loadPrefix(LOC_PREFIX)).forEach(([k, v]) => next[decodeURIComponent(k.slice(LOC_PREFIX.length))] = v), setLocs(next);
    } catch {
    }
    try {
      let list = (await loadPrefix(CHAT_PREFIX)).map(([k, v]) => ({ ...v, key: k }));
      list.sort((a, b) => a.at - b.at), setChat((cur) => {
        let pending = cur.filter((m) => m.pending && !list.some((x) => x.id === m.id));
        return [...list, ...pending];
      });
    } catch {
    }
    try {
      let next = {};
      (await loadPrefix(READ_PREFIX)).forEach(([k, v]) => next[decodeURIComponent(k.slice(READ_PREFIX.length))] = v.at || 0), setReads((cur) => {
        let merged = { ...next };
        return Object.keys(cur).forEach((k) => merged[k] = Math.max(merged[k] || 0, cur[k] || 0)), merged;
      });
    } catch {
    }
    setLoaded(!0);
  }, []);
  useEffect(() => {
    (async () => {
      try {
        let r = await window.storage.get("me", !1);
        r && r.value && setMe(r.value);
      } catch {
      }
      try {
        let r = await window.storage.get("ui", !1), u = r && r.value ? JSON.parse(r.value) : null;
        u && (["board", "plan", "wish", "spend", "family", "chat"].includes(u.tab) && setTab(u.tab), setUi((cur) => ({
          wish: ["list", "map", "near"].includes(u.wish) ? u.wish : cur.wish,
          spend: ["personal", "me", "day", "all"].includes(u.spend) ? u.spend : cur.spend
        })));
      } catch {
      }
      uiReady.current = !0, await refresh();
    })();
    let off = window.storage.onChange ? window.storage.onChange(refresh) : null, t = setInterval(refresh, off ? 6e4 : 1e4);
    return () => {
      clearInterval(t), off && off();
    };
  }, [refresh]), useEffect(() => {
    if (!settings || inited.current) return;
    inited.current = !0;
    let diff = Math.round((parse(iso(/* @__PURE__ */ new Date())) - parse(settings.start)) / 864e5);
    diff >= 0 && diff < settings.days && setDay(diff);
  }, [settings]);
  let mutate = async (key, fallback, setter, fn) => {
    let cur = await load(key, fallback), next = fn(cur);
    setter(next);
    let ok = await save(key, next);
    return ok || setError("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), ok;
  }, pickMe = async (name) => {
    setMe(name), setSwitching(!1);
    try {
      await window.storage.set("me", name, !1);
    } catch {
    }
  }, saveSettings = async (s) => {
    setSettings(s), setEditSettings(!1), await save(KEYS.settings, s) || setError("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), me && !s.members.includes(me) && setMe(null);
  }, close = () => setSheet(null);
  closersRef.current = () => {
    wheelOpen ? setWheelOpen(!1) : sheet ? setSheet(null) : switching ? setSwitching(!1) : editSettings && setEditSettings(!1);
  };
  let overlayOpen = !!sheet || wheelOpen || switching || editSettings && !!settings;
  useEffect(() => {
    overlayOpen && !historyPushed.current ? (history.pushState({ jtOverlay: !0 }, ""), historyPushed.current = !0) : !overlayOpen && historyPushed.current && (historyPushed.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [overlayOpen]), useEffect(() => {
    let onPop = () => {
      historyPushed.current && (historyPushed.current = !1, closersRef.current && closersRef.current());
    };
    return window.addEventListener("popstate", onPop), () => window.removeEventListener("popstate", onPop);
  }, []);
  let commentOps = (key, setter) => ({
    add: (id, text) => mutate(
      key,
      [],
      setter,
      (list) => list.map(
        (x) => x.id === id ? { ...x, comments: [...x.comments || [], { id: uid(), by: me, text, createdAt: Date.now() }] } : x
      )
    ),
    del: (id, cid) => mutate(
      key,
      [],
      setter,
      (list) => list.map((x) => x.id === id ? { ...x, comments: (x.comments || []).filter((c) => c.id !== cid) } : x)
    )
  }), reactOp = (key, setter) => (id, emoji) => mutate(key, [], setter, (list) => list.map((x) => x.id === id ? toggleReaction(x, emoji, me) : x)), reactPlan = reactOp(KEYS.plan, setPlan), reactWish = reactOp(KEYS.wish, setWish), reactPost = reactOp(KEYS.board, setBoard), planCm = commentOps(KEYS.plan, setPlan), wishCm = commentOps(KEYS.wish, setWish), savePlan = (vals, id, d) => mutate(
    KEYS.plan,
    [],
    setPlan,
    (list) => id ? list.map((i) => i.id === id ? { ...i, ...vals } : i) : [...list, { id: uid(), day: d, by: me, ...vals }]
  ), delPlan = (id) => mutate(KEYS.plan, [], setPlan, (list) => list.filter((i) => i.id !== id)), addWish = (vals) => mutate(KEYS.wish, [], setWish, (list) => [...list, { id: uid(), by: me, likes: [me], createdAt: Date.now(), ...vals }]), likeWish = (id) => mutate(
    KEYS.wish,
    [],
    setWish,
    (list) => list.map(
      (w) => w.id === id ? { ...w, likes: w.likes.includes(me) ? w.likes.filter((x) => x !== me) : [...w.likes, me] } : w
    )
  ), delWish = (id) => mutate(KEYS.wish, [], setWish, (list) => list.filter((w) => w.id !== id)), batchPos = async (upd) => {
    let n = Object.keys(upd).length;
    await mutate(KEYS.wish, [], setWish, (list) => list.map((w) => upd[w.id] ? { ...w, ...upd[w.id] } : w)) && setToast(`${n}곳에 위치를 연결했어요.`);
  }, updateWish = (id, vals) => mutate(KEYS.wish, [], setWish, (list) => list.map((w) => w.id === id ? { ...w, ...vals, editedAt: Date.now() } : w)), planWish = async (w, d) => {
    await mutate(KEYS.plan, [], setPlan, (list) => [
      ...list,
      {
        id: uid(),
        day: d,
        by: me,
        time: "",
        title: w.name,
        wishId: w.id,
        place: w.area || "",
        link: w.link || "",
        memo: w.memo || "",
        comments: w.comments || [],
        reactions: w.reactions || {},
        ...hasPos(w) ? { lat: w.lat, lng: w.lng } : {}
      }
    ]), setDay(d);
  }, withPhotos = async (vals, prev) => {
    let list = vals.photos || [];
    for (let ph of list.filter((x) => x.data))
      await save(photoKey(ph.id), ph.data) || setToast("영수증 사진을 저장하지 못했어요. 인터넷 연결을 확인해 주세요.");
    let ids = list.map((x) => x.id);
    return (prev || []).filter((x) => !ids.includes(x)).forEach(deletePhoto), { ...vals, photos: ids.length ? ids : void 0 };
  }, saveSpend = async (rawVals, id) => {
    let vals = await withPhotos(rawVals, id ? (spend.find((e) => e.id === id) || {}).photos : []);
    return saveSpendRaw(vals, id);
  }, saveSpendRaw = (vals, id) => mutate(
    KEYS.spend,
    [],
    setSpend,
    (list) => id ? list.map((e) => e.id === id ? { ...e, ...vals, editedAt: Date.now(), editedBy: me } : e) : [...list, { id: uid(), by: me, createdAt: Date.now(), ...vals }]
  ), mutateLedger = async (fn) => {
    let key = LEDGER_PREFIX + encodeURIComponent(me), cur = await load(key, { cash: { jpy: 0 }, items: [] }), next = fn({ cash: cur.cash || { jpy: 0 }, items: cur.items || [] });
    setLedgers((m) => ({ ...m, [me]: next })), await save(key, next) || setToast("개인 경비를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
  }, savePItem = async (rawVals, id) => {
    let prevItem = id ? (ledgers[me] && ledgers[me].items || []).find((x) => x.id === id) : null, vals = await withPhotos(rawVals, prevItem ? prevItem.photos : []);
    return savePItemRaw(vals, id);
  }, savePItemRaw = (vals, id) => mutateLedger((l) => ({
    ...l,
    items: id ? l.items.map((x) => x.id === id ? { ...x, ...vals, editedAt: Date.now() } : x) : [...l.items, { id: uid(), createdAt: Date.now(), ...vals }]
  })), delPItem = (id) => {
    let it = (ledgers[me] && ledgers[me].items || []).find((x) => x.id === id);
    return it && it.photos && it.photos.forEach(deletePhoto), mutateLedger((l) => ({ ...l, items: l.items.filter((x) => x.id !== id) }));
  }, setCash = (jpy) => mutateLedger((l) => ({ ...l, cash: { ...l.cash, jpy } })), delSpend = (id) => {
    let it = spend.find((e) => e.id === id);
    return it && it.photos && it.photos.forEach(deletePhoto), mutate(KEYS.spend, [], setSpend, (list) => list.filter((e) => e.id !== id));
  }, savePost = async ({ text, urls, photos }, id) => {
    for (let p of photos.filter((x) => x.data)) {
      if (!await save(photoKey(p.id), p.data)) return !1;
      photoCache.set(p.id, p.data);
    }
    let ids = photos.map((p) => p.id), removed = [], ok = await mutate(KEYS.board, [], setBoard, (list) => id ? list.map((x) => x.id !== id ? x : (removed = (x.photos || []).filter((pid) => !ids.includes(pid)), { ...x, text, urls, photos: ids, editedAt: Date.now() })) : [{ id: uid(), by: me, createdAt: Date.now(), text, urls, photos: ids, likes: [], comments: [] }, ...list]);
    return ok && removed.forEach(deletePhoto), ok;
  }, delPost = async (id) => {
    let gone = [];
    await mutate(KEYS.board, [], setBoard, (list) => (gone = list.find((x) => x.id === id)?.photos || [], list.filter((x) => x.id !== id))) && gone.forEach(deletePhoto);
  }, addComment = (id, text) => mutate(
    KEYS.board,
    [],
    setBoard,
    (list) => list.map(
      (p) => p.id === id ? { ...p, comments: [...p.comments || [], { id: uid(), by: me, text, createdAt: Date.now() }] } : p
    )
  ), delComment = (id, cid) => mutate(
    KEYS.board,
    [],
    setBoard,
    (list) => list.map((p) => p.id === id ? { ...p, comments: (p.comments || []).filter((c) => c.id !== cid) } : p)
  ), content, waitingSync = loaded && !settings && window.storage && window.storage.isSynced && !window.storage.isSynced();
  if (!loaded || waitingSync)
    content = /* @__PURE__ */ jsxs("div", { className: "jt-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsxs("div", { className: "jt-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {})
      ] }),
      waitingSync ? "여행 정보 받는 중" : "앱 준비 중",
      waitingSync && slowSync && /* @__PURE__ */ jsx("p", { className: "jt-loading-sub", children: "인터넷 연결이 느린 것 같아요. 연결되면 자동으로 열려요." })
    ] });
  else if (!settings || editSettings)
    content = /* @__PURE__ */ jsx(
      SettingsForm,
      {
        initial: settings,
        onSave: saveSettings,
        onCancel: settings ? () => setEditSettings(!1) : null,
        wish,
        onBatchPos: batchPos
      }
    );
  else if (!me || !settings.members.includes(me) || switching) {
    let valid = me && settings.members.includes(me);
    content = /* @__PURE__ */ jsx(
      WhoAreYou,
      {
        members: settings.members,
        onPick: pickMe,
        current: valid ? me : null,
        onBack: valid ? () => setSwitching(!1) : null
      }
    );
  } else {
    let first = addDays(settings.start, 0), last = addDays(settings.start, settings.days - 1), dday = Math.round((parse(settings.start) - parse(iso(/* @__PURE__ */ new Date()))) / 864e5), todayIdx = Math.round((parse(iso(/* @__PURE__ */ new Date())) - parse(settings.start)) / 864e5), defaultDay = todayIdx >= 0 && todayIdx < settings.days ? todayIdx : day, S = fx ? { ...settings, rate: fx.rate, fx } : settings;
    RATE_NOW = S.rate, content = /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("header", { className: "jt-head hero" + (mini ? " mini" : tab === "plan" ? " tall" : ""), children: [
        !mini && /* @__PURE__ */ jsx(HeroSlides, {}),
        /* @__PURE__ */ jsxs("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ jsxs("button", { className: "jt-me", onClick: () => setSwitching(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ jsx(Avatar, { name: me, members: settings.members, size: 24 }),
            me
          ] }),
          mini && /* @__PURE__ */ jsxs("strong", { className: "jt-mini-title", children: [
            /* @__PURE__ */ jsx("span", { className: "jt-mini-name", children: settings.title }),
            dday > 0 && /* @__PURE__ */ jsxs("em", { children: [
              "D-",
              dday
            ] }),
            dday === 0 && /* @__PURE__ */ jsx("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ jsx("button", { className: "jt-icon light", onClick: () => setWheelOpen(!0), "aria-label": "랜덤 돌림판", title: "랜덤 돌림판", children: /* @__PURE__ */ jsx(Dices, { size: 19 }) }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "jt-icon light jt-locbtn" + (shareOn ? " on" : ""),
                onClick: toggleShare,
                "aria-pressed": shareOn,
                "aria-label": shareOn ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: shareOn ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ jsx(MapPin, { size: 19 }),
                  /* @__PURE__ */ jsx("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "jt-icon light",
                onClick: toggleMini,
                "aria-label": mini ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !mini,
                children: mini ? /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) : /* @__PURE__ */ jsx(ChevronUp, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsx("button", { className: "jt-icon light", onClick: () => setEditSettings(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ jsx(Settings, { size: 20 }) })
          ] })
        ] }),
        !mini && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h1", { children: settings.title }),
          /* @__PURE__ */ jsxs("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              first.getMonth() + 1,
              "월 ",
              first.getDate(),
              "일 – ",
              last.getMonth() + 1,
              "월 ",
              last.getDate(),
              "일"
            ] }),
            dday > 0 && /* @__PURE__ */ jsxs("span", { className: "jt-dday", children: [
              "출발까지 ",
              dday,
              "일"
            ] }),
            dday === 0 && /* @__PURE__ */ jsx("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "jt-error", role: "alert", children: [
        error,
        /* @__PURE__ */ jsx("button", { onClick: () => setError(""), "aria-label": "닫기", children: /* @__PURE__ */ jsx(X, { size: 16 }) })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "jt-main", children: [
        tab === "board" && /* @__PURE__ */ jsx(
          BoardTab,
          {
            settings: S,
            board,
            me,
            onEdit: (item) => setSheet({ type: "post", item }),
            onLike: reactPost,
            onComment: addComment,
            onDelComment: delComment
          }
        ),
        tab === "plan" && /* @__PURE__ */ jsx(
          PlanTab,
          {
            settings: S,
            schedule: plan,
            day,
            setDay,
            onEdit: (item) => setSheet({ type: "plan", item, day: item.day }),
            onAddAt: (d, t, e) => setSheet({ type: "plan", day: d, preset: { time: t, end: e || fmtMin(Math.min(toMin(t) + 60, 23 * 60 + 59)) } }),
            me,
            onComment: planCm.add,
            onDelComment: planCm.del,
            onReact: reactPlan
          }
        ),
        tab === "wish" && /* @__PURE__ */ jsx(
          WishTab,
          {
            settings: S,
            onBatchPos: batchPos,
            view: ui.wish,
            setView: (v) => setUi((u) => ({ ...u, wish: v })),
            plan,
            wish,
            me,
            onEdit: (item) => setSheet({ type: "wish", item }),
            onSave: addWish,
            onLike: likeWish,
            onPlan: (w) => setSheet({ type: "toPlan", wish: w }),
            onDelete: delWish,
            onComment: wishCm.add,
            onDelComment: wishCm.del,
            onReact: reactWish
          }
        ),
        tab === "spend" && /* @__PURE__ */ jsx(
          SpendTab,
          {
            settings: S,
            spend,
            me,
            view: ui.spend,
            ledger: ledgers[me],
            onEditPersonal: (item) => setSheet({ type: "pspend", item }),
            onCash: setCash,
            setView: (v) => setUi((u) => ({ ...u, spend: v })),
            onEdit: (item) => setSheet({ type: "spend", item })
          }
        ),
        tab === "chat" && /* @__PURE__ */ jsx(
          ChatTab,
          {
            settings: S,
            me,
            msgs: chat,
            reads,
            notice,
            onEdit: editChat,
            onPin: pinChat,
            onUnpin: unpinChat,
            badgeAsk: badgePerm === "default",
            onBadgeAsk: askBadge,
            onSend: (t) => sendChat({ kind: "text", text: t }),
            onDelete: delChat,
            onSendLoc: sendMyLoc
          }
        ),
        tab === "family" && /* @__PURE__ */ jsx(
          FamilyTab,
          {
            settings: S,
            me,
            locs,
            shareOn,
            onToggle: toggleShare,
            myPos,
            geoErr
          }
        )
      ] }),
      (() => {
        let fab = {
          board: ["글쓰기", () => setSheet({ type: "post" })],
          plan: [`${day + 1}일차 일정 추가`, () => setSheet({ type: "plan", day })],
          wish: ["가고 싶은 곳 추가", () => setSheet({ type: "wish" })],
          spend: ui.spend === "personal" ? ["개인 경비 추가", () => setSheet({ type: "pspend" })] : ["공통 경비 추가", () => setSheet({ type: "spend" })]
        }[tab];
        return fab ? /* @__PURE__ */ jsxs("button", { className: "jt-fab", onClick: fab[1], children: [
          /* @__PURE__ */ jsx(Plus, { size: 20, strokeWidth: 2.6 }),
          fab[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ jsx("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["board", "공지", Megaphone],
        ["plan", "일정", CalendarDays],
        ["wish", "가고 싶은 곳", Heart],
        ["spend", "경비&정산", Wallet],
        ["family", "위치 공유", Users],
        ["chat", "채팅", MessagesSquare]
      ].map(([id, label, Icon]) => /* @__PURE__ */ jsxs("button", { className: tab === id ? "on" : "", onClick: () => setTab(id), "aria-current": tab === id, children: [
        /* @__PURE__ */ jsxs("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ jsx(Icon, { size: 21 }),
          id === "chat" && unread > 0 && tab !== "chat" && /* @__PURE__ */ jsx("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${unread}개`, children: unread > 99 ? "99+" : unread })
        ] }),
        label
      ] }, id)) }),
      sheet?.type === "plan" && /* @__PURE__ */ jsx(Sheet, { title: sheet.item ? "일정 수정" : `${sheet.day + 1}일차 일정 추가`, onClose: close, children: /* @__PURE__ */ jsx(
        PlanForm,
        {
          initial: sheet.item,
          preset: sheet.preset,
          gkey: settings.gmapsKey,
          dayItems: plan.filter((i) => i.day === sheet.day && i.id !== sheet.item?.id),
          onSave: (v) => {
            savePlan(v, sheet.item?.id, sheet.day), close();
          },
          onDelete: () => {
            delPlan(sheet.item.id), close();
          }
        }
      ) }),
      sheet?.type === "wish" && /* @__PURE__ */ jsx(Sheet, { title: sheet.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: close, children: /* @__PURE__ */ jsx(
        WishForm,
        {
          initial: sheet.item,
          gkey: settings.gmapsKey,
          onSave: (v) => {
            sheet.item ? updateWish(sheet.item.id, v) : addWish(v), close();
          },
          onDelete: () => {
            delWish(sheet.item.id), close();
          }
        }
      ) }),
      sheet?.type === "spend" && /* @__PURE__ */ jsx(Sheet, { title: sheet.item ? "공통 경비 수정" : "공통 경비 추가", onClose: close, children: /* @__PURE__ */ jsx(
        SpendForm,
        {
          settings: S,
          me,
          defaultDay,
          initial: sheet.item,
          onSave: (v) => {
            saveSpend(v, sheet.item?.id), close();
          },
          onDelete: () => {
            delSpend(sheet.item.id), close();
          }
        }
      ) }),
      sheet?.type === "pspend" && /* @__PURE__ */ jsx(Sheet, { title: sheet.item ? "개인 경비 수정" : "개인 경비 추가", onClose: close, children: /* @__PURE__ */ jsx(
        SpendForm,
        {
          settings: S,
          me,
          defaultDay,
          initial: sheet.item,
          personal: !0,
          onSave: (v) => {
            savePItem(v, sheet.item?.id), close();
          },
          onDelete: () => {
            delPItem(sheet.item.id), close();
          }
        }
      ) }),
      sheet?.type === "post" && /* @__PURE__ */ jsx(Sheet, { title: sheet.item ? "글 수정" : "새 글", onClose: close, children: /* @__PURE__ */ jsx(
        PostForm,
        {
          initial: sheet.item,
          onSave: async (v) => {
            let ok = await savePost(v, sheet.item?.id);
            return ok && close(), ok;
          },
          onDelete: () => {
            delPost(sheet.item.id), close();
          }
        }
      ) }),
      wheelOpen && /* @__PURE__ */ jsx(Wheel, { members: settings.members, onClose: () => setWheelOpen(!1) }),
      askShare && !sheet && /* @__PURE__ */ jsx(Sheet, { title: "가족과 위치를 공유할까요?", onClose: () => setShare(!1, !0), children: /* @__PURE__ */ jsxs("div", { className: "jt-form", children: [
        /* @__PURE__ */ jsxs("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ jsx("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ jsx("button", { className: "jt-primary", onClick: () => setShare(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ jsx("button", { className: "jt-ghost", onClick: () => setShare(!1, !0), children: "나중에 할게요" })
      ] }) }),
      toast && /* @__PURE__ */ jsx("div", { className: "jt-toast", role: "status", children: toast }),
      sheet?.type === "toPlan" && /* @__PURE__ */ jsx(Sheet, { title: `"${sheet.wish.name}" 몇째 날에 갈까요?`, onClose: close, children: /* @__PURE__ */ jsx("div", { className: "jt-daypick", children: Array.from({ length: settings.days }, (_, i) => {
        let d = addDays(settings.start, i);
        return /* @__PURE__ */ jsxs(
          "button",
          {
            style: { "--lc": LINE[i % LINE.length] },
            onClick: () => {
              planWish(sheet.wish, i), close(), setTab("plan");
            },
            children: [
              /* @__PURE__ */ jsxs("span", { className: "jt-daychip", children: [
                i + 1,
                "일차"
              ] }),
              md(d),
              " (",
              wk(d),
              ")"
            ]
          },
          i
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "jt", children: [
    /* @__PURE__ */ jsx("style", { children: CSS }),
    /* @__PURE__ */ jsx(OfflineBar, {}),
    content
  ] });
}
