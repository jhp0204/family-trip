/* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: g, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ e("ol", { className: "jt-msgs", children: n.map((E) => {
      let s = ci(E.at), P = s !== S, A = E.by === a, r = !P && k && k.by === E.by && E.at - k.at < 5 * 6e4;
      return S = s, k = E, /* @__PURE__ */ o(Dn.Fragment, { children: [
        P && /* @__PURE__ */ e("li", { className: "jt-daysep", "aria-label": s, children: /* @__PURE__ */ e("span", { children: s }) }),
        /* @__PURE__ */ o("li", { className: "jt-msg" + (A ? " mine" : "") + (r ? " cont" : ""), children: [
          !A && /* @__PURE__ */ e("span", { className: "jt-msg-av", children: !r && /* @__PURE__ */ e(st, { name: E.by, members: h, size: 30 }) }),
          /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
            !A && !r && /* @__PURE__ */ e("span", { className: "jt-msg-name", children: E.by }),
            /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "jt-bubble" + (E.kind === "loc" ? " loc" : ""),
                  onClick: () => A && C(p === E.id ? null : E.id),
                  "aria-label": A ? "내 메시지, 누르면 삭제 메뉴" : void 0,
                  children: E.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                    /* @__PURE__ */ e(Nt, { size: 16 }),
                    A ? "내 위치를 보냈어요" : `${E.by}의 현재 위치`
                  ] }) : /* @__PURE__ */ e("span", { className: "jt-msg-text", children: di(E.text) })
                }
              ),
              /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                (() => {
                  let L = h.filter((B) => B !== E.by && (i[B] || 0) < E.at);
                  return L.length > 0 ? /* @__PURE__ */ e("b", { className: "jt-unread", title: `안 읽음: ${L.join(", ")}`, "aria-label": `${L.length}명 안 읽음`, children: L.length }) : null;
                })(),
                /* @__PURE__ */ e("time", { className: "jt-msg-time", children: pi(E.at) })
              ] })
            ] }),
            E.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
              /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t({ lat: E.lat, lng: E.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(Et, { size: 13 }),
                "지도에서 보기"
              ] }),
              !A && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Qa(E), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(Ct, { size: 13 }),
                "길 찾기"
              ] })
            ] }),
            A && p === E.id && /* @__PURE__ */ e("div", { className: "jt-msg-del", children: /* @__PURE__ */ e(
              jt,
              {
                onConfirm: () => {
                  x(E), C(null);
                },
                label: "메시지 삭제"
              }
            ) })
          ] })
        ] })
      ] }, E.id);
    }) }),
    /* @__PURE__ */ e("div", { ref: u }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ e("button", { type: "button", className: "jt-chat-loc", onClick: d, disabled: j, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ e(Nt, { size: 20 }) }),
      /* @__PURE__ */ e(
        "textarea",
        {
          rows: 1,
          value: v,
          onChange: (E) => z(E.target.value),
          onKeyDown: (E) => {
            E.key === "Enter" && !E.shiftKey && !E.nativeEvent.isComposing && (E.preventDefault(), y());
          },
          placeholder: j ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: y, disabled: !v.trim(), "aria-label": "보내기", children: /* @__PURE__ */ e(Ba, { size: 18 }) })
    ] })
  ] });
}
var St = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], ui = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", gi = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), fi = 7e3;
function bi() {
  let [t, a] = w(0), [n, i] = w({}), l = q(n);
  if (l.current = n, W(() => {
    let m = setInterval(() => {
      a((g) => {
        let h = g;
        for (let v = 0; v < St.length && (h = (h + 1) % St.length, !!l.current[h]); v++)
          ;
        return h;
      });
    }, fi);
    return () => clearInterval(m);
  }, []), St.every((m, g) => n[g])) return null;
  let b = St[t];
  return /* @__PURE__ */ o(rt, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      St.map((m, g) => /* @__PURE__ */ e(
        "img",
        {
          src: ui(m.f),
          alt: "",
          className: g === t ? "on" : "",
          style: { objectPosition: m.pos },
          loading: g === 0 ? "eager" : "lazy",
          onError: () => i((h) => ({ ...h, [g]: !0 }))
        },
        m.f
      )),
      /* @__PURE__ */ e("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: St.map((m, g) => /* @__PURE__ */ e("i", { className: g === t ? "on" : "" }, m.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: gi(b.f), target: "_blank", rel: "noopener noreferrer", children: [
        b.t,
        ", 사진 ",
        b.by,
        " (",
        b.lic,
        ")"
      ] })
    ] })
  ] });
}
function qe() {
  let [t, a] = w(!1), [n, i] = w(null), [l, x] = w([]), [b, m] = w([]), [g, h] = w([]), [v, z] = w([]), [p, C] = w(null), [j, c] = w("plan"), [u, M] = w(0), [N, y] = w(!1), [d, S] = w(!1), k = q(null), E = q(!1), [s, P] = w(null), [A, r] = w(""), L = q(!1), [B, Y] = w(null), [K, $] = w(!1), [F, J] = w({}), [tt, et] = w(!1), [Lt, ee] = w(null), [an, ae] = w("");
  W(() => {
    (async () => {
      try {
        let f = await window.storage.get("hdr", !1);
        f && f.value === "min" && $(!0);
      } catch {
      }
      try {
        let f = await window.storage.get("locshare", !1);
        f && f.value === "on" && et(!0), (!f || !f.value) && fe(!0);
      } catch {
        fe(!0);
      }
    })();
  }, []);
  let [nn, fe] = w(!1), [ne, oe] = w([]), [Xe, Ve] = w(0), [Ze, Qe] = w({}), [ta, ea] = w(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  W(() => {
    (async () => {
      try {
        let f = await window.storage.get("chatread", !1);
        f && f.value && Ve(Number(f.value) || 0);
      } catch {
      }
    })();
  }, []);
  let aa = async (f) => {
    let I = { id: pt(), by: p, at: Date.now(), ...f }, D = _a(I);
    oe((O) => [...O, { ...I, key: D, pending: !0 }]), await ft(D, I) || (oe((O) => O.filter((T) => T.id !== I.id)), Tt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, on = async (f) => {
    oe((I) => I.filter((D) => D.id !== f.id));
    try {
      await window.storage.delete(f.key || _a(f), !0);
    } catch {
    }
  }, rn = async () => {
    let f = Lt;
    if (f || (f = await new Promise((I) => {
      if (!navigator.geolocation) return I(null);
      navigator.geolocation.getCurrentPosition(
        (D) => I({ lat: D.coords.latitude, lng: D.coords.longitude }),
        () => I(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !f) {
      Tt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await aa({ kind: "loc", lat: f.lat, lng: f.lng, text: "" });
  }, ie = ne.reduce((f, I) => I.by !== p && I.at > f ? I.at : f, 0), Bt = ne.reduce((f, I) => I.at > f ? I.at : f, 0), vt = ne.filter((f) => f.by !== p && f.at > Xe).length, [na, sn] = w(() => document.visibilityState === "visible");
  W(() => {
    let f = () => sn(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", f), () => document.removeEventListener("visibilitychange", f);
  }, []), W(() => {
    if (!(j !== "chat" || !na || !p || !Bt)) {
      if (ie > Xe) {
        Ve(ie);
        try {
          window.storage.set("chatread", String(ie), !1);
        } catch {
        }
      }
      (Ze[p] || 0) < Bt && (Qe((f) => ({ ...f, [p]: Bt })), ft(De + encodeURIComponent(p), { at: Bt }));
    }
  }, [j, na, Bt, ie, p]), W(() => {
    if ("setAppBadge" in navigator)
      try {
        vt > 0 ? navigator.setAppBadge(vt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [vt, ta]);
  let ln = async () => {
    try {
      let f = await Notification.requestPermission();
      ea(f), Tt(f === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      ea("denied");
    }
  }, [re, Tt] = w("");
  W(() => {
    if (!re) return;
    let f = setTimeout(() => Tt(""), 2600);
    return () => clearTimeout(f);
  }, [re]);
  let se = (f, I) => {
    et(f), fe(!1), f || ae(""), I || Tt(f ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", f ? "on" : "off", !1);
    } catch {
    }
  }, oa = () => se(!tt);
  W(() => {
    if (!tt || !p || !n) return;
    let f = Fe + encodeURIComponent(p), I = null, D = null, _ = 0, O = (it) => {
      D = it, _ = Date.now(), ee(it), ft(f, { ...it, at: Date.now(), online: !0 });
    }, T = () => {
      if (I == null) {
        if (!navigator.geolocation) {
          ae("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        I = navigator.geolocation.watchPosition(
          (it) => {
            let xe = { lat: it.coords.latitude, lng: it.coords.longitude, acc: Math.round(it.coords.accuracy) };
            ae(""), !D || ge(D, xe) > 25 || Date.now() - _ > 6e4 ? O(xe) : ee(xe);
          },
          (it) => ae(
            it.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, R = (it) => {
      I != null && navigator.geolocation.clearWatch(I), I = null, it && ft(f, { online: !1, at: Date.now() });
    }, U = () => document.visibilityState === "visible" ? T() : R(!0), G = () => R(!0), Ut = setInterval(() => {
      document.visibilityState === "visible" && D && O(D);
    }, 6e4);
    return document.visibilityState === "visible" && T(), document.addEventListener("visibilitychange", U), window.addEventListener("pagehide", G), () => {
      clearInterval(Ut), document.removeEventListener("visibilitychange", U), window.removeEventListener("pagehide", G), R(!0);
    };
  }, [tt, p, !!n]);
  let pn = () => {
    let f = !K;
    $(f);
    try {
      window.storage.set("hdr", f ? "min" : "max", !1);
    } catch {
    }
  };
  W(() => {
    let f = !0, I = async () => {
      let _ = await Co();
      if (f)
        if (_) {
          let O = { ..._, at: Date.now() };
          Y(O), ft(H.fx, O);
        } else {
          let O = await ct(H.fx, null);
          f && O && O.rate > 0 && Y({ ...O, cached: !0 });
        }
    };
    I();
    let D = setInterval(I, 3 * 36e5);
    return () => {
      f = !1, clearInterval(D);
    };
  }, []);
  let le = Pn(async () => {
    let [f, I, D, _, O] = await Promise.all([
      ct(H.settings, null),
      ct(H.plan, []),
      ct(H.wish, []),
      ct(H.spend, []),
      ct(H.board, [])
    ]);
    i(f), x(I), m(D), h(_), z(O);
    try {
      let T = {};
      (await Se(Fe)).forEach(([R, U]) => T[decodeURIComponent(R.slice(Fe.length))] = U), J(T);
    } catch {
    }
    try {
      let T = (await Se(tn)).map(([R, U]) => ({ ...U, key: R }));
      T.sort((R, U) => R.at - U.at), oe((R) => {
        let U = R.filter((G) => G.pending && !T.some((Ut) => Ut.id === G.id));
        return [...T, ...U];
      });
    } catch {
    }
    try {
      let T = {};
      (await Se(De)).forEach(([R, U]) => T[decodeURIComponent(R.slice(De.length))] = U.at || 0), Qe((R) => {
        let U = { ...T };
        return Object.keys(R).forEach((G) => U[G] = Math.max(U[G] || 0, R[G] || 0)), U;
      });
    } catch {
    }
    a(!0);
  }, []);
  W(() => {
    (async () => {
      try {
        let D = await window.storage.get("me", !1);
        D && D.value && C(D.value);
      } catch {
      }
      await le();
    })();
    let f = window.storage.onChange ? window.storage.onChange(le) : null, I = setInterval(le, f ? 6e4 : 1e4);
    return () => {
      clearInterval(I), f && f();
    };
  }, [le]), W(() => {
    if (!n || L.current) return;
    L.current = !0;
    let f = Math.round((yt(dt(/* @__PURE__ */ new Date())) - yt(n.start)) / 864e5);
    f >= 0 && f < n.days && M(f);
  }, [n]);
  let Q = async (f, I, D, _) => {
    let O = await ct(f, I), T = _(O);
    D(T);
    let R = await ft(f, T);
    return R || r("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), R;
  }, cn = async (f) => {
    C(f), S(!1);
    try {
      await window.storage.set("me", f, !1);
    } catch {
    }
  }, dn = async (f) => {
    i(f), y(!1), await ft(H.settings, f) || r("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), p && !f.members.includes(p) && C(null);
  }, at = () => P(null);
  k.current = () => {
    s ? P(null) : d ? S(!1) : N && y(!1);
  };
  let be = !!s || d || N && !!n;
  W(() => {
    be && !E.current ? (history.pushState({ jtOverlay: !0 }, ""), E.current = !0) : !be && E.current && (E.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [be]), W(() => {
    let f = () => {
      E.current && (E.current = !1, k.current && k.current());
    };
    return window.addEventListener("popstate", f), () => window.removeEventListener("popstate", f);
  }, []);
  let ia = (f, I) => ({
    add: (D, _) => Q(
      f,
      [],
      I,
      (O) => O.map(
        (T) => T.id === D ? { ...T, comments: [...T.comments || [], { id: pt(), by: p, text: _, createdAt: Date.now() }] } : T
      )
    ),
    del: (D, _) => Q(
      f,
      [],
      I,
      (O) => O.map((T) => T.id === D ? { ...T, comments: (T.comments || []).filter((R) => R.id !== _) } : T)
    )
  }), he = (f, I, D = !1) => (_, O) => Q(f, [], I, (T) => T.map((R) => R.id === _ ? Eo(R, O, p, D) : R)), mn = he(H.plan, x), un = he(H.wish, m), wi = he(H.board, z, !0), ra = ia(H.plan, x), sa = ia(H.wish, m), gn = (f, I, D) => Q(
    H.plan,
    [],
    x,
    (_) => I ? _.map((O) => O.id === I ? { ...O, ...f } : O) : [..._, { id: pt(), day: D, by: p, ...f }]
  ), fn = (f) => Q(H.plan, [], x, (I) => I.filter((D) => D.id !== f)), la = (f) => Q(H.wish, [], m, (I) => [...I, { id: pt(), by: p, likes: [p], createdAt: Date.now(), ...f }]), bn = (f) => Q(
    H.wish,
    [],
    m,
    (I) => I.map(
      (D) => D.id === f ? { ...D, likes: D.likes.includes(p) ? D.likes.filter((_) => _ !== p) : [...D.likes, p] } : D
    )
  ), pa = (f) => Q(H.wish, [], m, (I) => I.filter((D) => D.id !== f)), hn = (f, I) => Q(H.wish, [], m, (D) => D.map((_) => _.id === f ? { ..._, ...I, editedAt: Date.now() } : _)), xn = async (f, I) => {
    await Q(H.plan, [], x, (D) => [
      ...D,
      {
        id: pt(),
        day: I,
        by: p,
        time: "",
        title: f.name,
        wishId: f.id,
        place: f.area || "",
        link: f.link || "",
        memo: f.memo || "",
        comments: f.comments || [],
        reactions: f.reactions || {},
        ...xt(f) ? { lat: f.lat, lng: f.lng } : {}
      }
    ]), await Q(H.wish, [], m, (D) => D.map((_) => _.id === f.id ? { ..._, planned: I } : _)), M(I);
  }, jn = (f, I) => Q(
    H.spend,
    [],
    h,
    (D) => I ? D.map((_) => _.id === I ? { ..._, ...f, editedAt: Date.now(), editedBy: p } : _) : [...D, { id: pt(), by: p, createdAt: Date.now(), ...f }]
  ), vn = (f) => Q(H.spend, [], h, (I) => I.filter((D) => D.id !== f)), yn = async ({ text: f, urls: I, photos: D }, _) => {
    for (let U of D.filter((G) => G.data)) {
      if (!await ft(Oe(U.id), U.data)) return !1;
      ht.set(U.id, U.data);
    }
    let O = D.map((U) => U.id), T = [], R = await Q(H.board, [], z, (U) => _ ? U.map((G) => G.id !== _ ? G : (T = (G.photos || []).filter((Ut) => !O.includes(Ut)), { ...G, text: f, urls: I, photos: O, editedAt: Date.now() })) : [{ id: pt(), by: p, createdAt: Date.now(), text: f, urls: I, photos: O, likes: [], comments: [] }, ...U]);
    return R && T.forEach(za), R;
  }, wn = async (f) => {
    let I = [];
    await Q(H.board, [], z, (_) => (I = _.find((O) => O.id === f)?.photos || [], _.filter((O) => O.id !== f))) && I.forEach(za);
  }, ki = (f) => Q(
    H.board,
    [],
    z,
    (I) => I.map((D) => {
      if (D.id !== f) return D;
      let _ = D.likes || [];
      return { ...D, likes: _.includes(p) ? _.filter((O) => O !== p) : [..._, p] };
    })
  ), Ni = (f, I) => Q(
    H.board,
    [],
    z,
    (D) => D.map(
      (_) => _.id === f ? { ..._, comments: [..._.comments || [], { id: pt(), by: p, text: I, createdAt: Date.now() }] } : _
    )
  ), Ci = (f, I) => Q(
    H.board,
    [],
    z,
    (D) => D.map((_) => _.id === f ? { ..._, comments: (_.comments || []).filter((O) => O.id !== I) } : _)
  ), Ot;
  if (!t)
    Ot = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || N)
    Ot = /* @__PURE__ */ e(Ao, { initial: n, onSave: dn, onCancel: n ? () => y(!1) : null });
  else if (!p || !n.members.includes(p) || d) {
    let f = p && n.members.includes(p);
    Ot = /* @__PURE__ */ e(
      Io,
      {
        members: n.members,
        onPick: cn,
        current: f ? p : null,
        onBack: f ? () => S(!1) : null
      }
    );
  } else {
    let f = mt(n.start, 0), I = mt(n.start, n.days - 1), D = Math.round((yt(n.start) - yt(dt(/* @__PURE__ */ new Date()))) / 864e5), _ = Math.round((yt(dt(/* @__PURE__ */ new Date())) - yt(n.start)) / 864e5), O = _ >= 0 && _ < n.days ? _ : u, T = B ? { ...n, rate: B.rate, fx: B } : n;
    Ot = /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (K ? " mini" : j === "plan" ? " tall" : ""), children: [
        !K && /* @__PURE__ */ e(bi, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => S(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(st, { name: p, members: n.members, size: 24 }),
            p
          ] }),
          K && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
            n.title,
            D > 0 && /* @__PURE__ */ o("em", { children: [
              "D-",
              D
            ] }),
            D === 0 && /* @__PURE__ */ e("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ o(
              "button",
              {
                className: "jt-icon light jt-locbtn" + (tt ? " on" : ""),
                onClick: oa,
                "aria-pressed": tt,
                "aria-label": tt ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: tt ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ e(Nt, { size: 19 }),
                  /* @__PURE__ */ e("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: "jt-icon light",
                onClick: pn,
                "aria-label": K ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !K,
                children: K ? /* @__PURE__ */ e(Xt, { size: 20 }) : /* @__PURE__ */ e(Ta, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => y(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(_n, { size: 20 }) })
          ] })
        ] }),
        !K && /* @__PURE__ */ o(rt, { children: [
          /* @__PURE__ */ e("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              f.getMonth() + 1,
              "월 ",
              f.getDate(),
              "일 – ",
              I.getMonth() + 1,
              "월 ",
              I.getDate(),
              "일"
            ] }),
            D > 0 && /* @__PURE__ */ o("span", { className: "jt-dday", children: [
              "출발까지 ",
              D,
              "일"
            ] }),
            D === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      A && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        A,
        /* @__PURE__ */ e("button", { onClick: () => r(""), "aria-label": "닫기", children: /* @__PURE__ */ e(te, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        j === "plan" && /* @__PURE__ */ e(
          To,
          {
            settings: T,
            schedule: l,
            day: u,
            setDay: M,
            onAdd: () => P({ type: "plan", day: u }),
            onEdit: (R) => P({ type: "plan", item: R, day: R.day }),
            onAddAt: (R, U) => P({ type: "plan", day: R, preset: { time: U, end: It(Math.min(kt(U) + 60, 23 * 60 + 59)) } }),
            me: p,
            onComment: ra.add,
            onDelComment: ra.del,
            onReact: mn
          }
        ),
        j === "wish" && /* @__PURE__ */ e(
          ei,
          {
            settings: T,
            plan: l,
            wish: b,
            me: p,
            onAdd: () => P({ type: "wish" }),
            onEdit: (R) => P({ type: "wish", item: R }),
            onSave: la,
            onLike: bn,
            onPlan: (R) => P({ type: "toPlan", wish: R }),
            onDelete: pa,
            onComment: sa.add,
            onDelComment: sa.del,
            onReact: un
          }
        ),
        j === "spend" && /* @__PURE__ */ e(
          oi,
          {
            settings: T,
            spend: g,
            me: p,
            onEdit: (R) => P({ type: "spend", item: R })
          }
        ),
        j === "chat" && /* @__PURE__ */ e(
          mi,
          {
            settings: T,
            me: p,
            msgs: ne,
            reads: Ze,
            badgeAsk: ta === "default",
            onBadgeAsk: ln,
            onSend: (R) => aa({ kind: "text", text: R }),
            onDelete: on,
            onSendLoc: rn
          }
        ),
        j === "family" && /* @__PURE__ */ e(
          li,
          {
            settings: T,
            me: p,
            locs: F,
            shareOn: tt,
            onToggle: oa,
            myPos: Lt,
            geoErr: an
          }
        )
      ] }),
      (() => {
        let R = {
          plan: [`${u + 1}일차 일정 추가`, () => P({ type: "plan", day: u })],
          wish: ["가고 싶은 곳 추가", () => P({ type: "wish" })],
          spend: ["경비 추가", () => P({ type: "spend" })]
        }[j];
        return R ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: R[1], children: [
          /* @__PURE__ */ e(Rn, { size: 20, strokeWidth: 2.6 }),
          R[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", Ln],
        ["wish", "가고 싶은 곳", Be],
        ["spend", "경비", Bn],
        ["family", "위치 공유", Yn],
        ["chat", "채팅", Gn]
      ].map(([R, U, G]) => /* @__PURE__ */ o("button", { className: j === R ? "on" : "", onClick: () => c(R), "aria-current": j === R, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ e(G, { size: 21 }),
          R === "chat" && vt > 0 && j !== "chat" && /* @__PURE__ */ e("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${vt}개`, children: vt > 99 ? "99+" : vt })
        ] }),
        U
      ] }, R)) }),
      s?.type === "plan" && /* @__PURE__ */ e(wt, { title: s.item ? "일정 수정" : `${s.day + 1}일차 일정 추가`, onClose: at, children: /* @__PURE__ */ e(
        Fo,
        {
          initial: s.item,
          preset: s.preset,
          gkey: n.gmapsKey,
          dayItems: l.filter((R) => R.day === s.day && R.id !== s.item?.id),
          onSave: (R) => {
            gn(R, s.item?.id, s.day), at();
          },
          onDelete: () => {
            fn(s.item.id), at();
          }
        }
      ) }),
      s?.type === "wish" && /* @__PURE__ */ e(wt, { title: s.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: at, children: /* @__PURE__ */ e(
        Do,
        {
          initial: s.item,
          onSave: (R) => {
            s.item ? hn(s.item.id, R) : la(R), at();
          },
          onDelete: () => {
            pa(s.item.id), at();
          }
        }
      ) }),
      s?.type === "spend" && /* @__PURE__ */ e(wt, { title: s.item ? "경비 수정" : "경비 기록", onClose: at, children: /* @__PURE__ */ e(
        Po,
        {
          settings: T,
          me: p,
          defaultDay: O,
          initial: s.item,
          onSave: (R) => {
            jn(R, s.item?.id), at();
          },
          onDelete: () => {
            vn(s.item.id), at();
          }
        }
      ) }),
      s?.type === "post" && /* @__PURE__ */ e(wt, { title: s.item ? "글 수정" : "새 글", onClose: at, children: /* @__PURE__ */ e(
        Ro,
        {
          initial: s.item,
          onSave: async (R) => {
            let U = await yn(R, s.item?.id);
            return U && at(), U;
          },
          onDelete: () => {
            wn(s.item.id), at();
          }
        }
      ) }),
      nn && !s && /* @__PURE__ */ e(wt, { title: "가족과 위치를 공유할까요?", onClose: () => se(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
        /* @__PURE__ */ o("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ e("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ e("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ e("button", { className: "jt-primary", onClick: () => se(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: () => se(!1, !0), children: "나중에 할게요" })
      ] }) }),
      re && /* @__PURE__ */ e("div", { className: "jt-toast", role: "status", children: re }),
      s?.type === "toPlan" && /* @__PURE__ */ e(wt, { title: `"${s.wish.name}" 몇째 날에 갈까요?`, onClose: at, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (R, U) => {
        let G = mt(n.start, U);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": V[U % V.length] },
            onClick: () => {
              xn(s.wish, U), at(), c("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: U + 1 }),
              U + 1,
              "일차 ",
              Vt(G),
              " (",
              Rt(G),
              ")"
            ]
          },
          U
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: Ge }),
    Ot
  ] });
}
var Ge = `
.jt{--paper:#F2F4F7;--ink:#14213D;--muted:#66718A;--rule:#DCE1EA;--card:#fff;--blue:#0C86AE;
  font-family:"Pretendard","Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif;
  background:var(--paper);color:var(--ink);min-height:100vh;max-width:520px;margin:0 auto;
  display:flex;flex-direction:column;position:relative;font-size:15px;line-height:1.45;
  -webkit-text-size-adjust:100%}
.jt *{box-sizing:border-box}
:where(.jt) button{font:inherit;color:inherit;cursor:pointer}
.jt button:focus-visible,.jt input:focus-visible,.jt select:focus-visible,.jt textarea:focus-visible,.jt [role=button]:focus-visible,.jt a:focus-visible{outline:3px solid var(--blue);outline-offset:2px}
.jt h1,.jt h3,.jt h4,.jt p,.jt ul,.jt ol{margin:0;padding:0}
.jt ul,.jt ol{list-style:none}

.jt-loading{padding:80px 20px;text-align:center;color:var(--muted)}

/* header */
.jt-head{background:var(--ink);color:#fff;padding:14px 20px 20px}
.jt-head-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.jt-head h1{font-size:26px;font-weight:800;letter-spacing:-.02em;line-height:1.2}
.jt-head-sub{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:6px;color:#C4CCDD;font-size:14px}
.jt-dday{background:#fff;color:var(--ink);font-weight:700;font-size:13px;padding:2px 10px;border-radius:999px}
.jt-me{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:0;color:#fff;
  padding:4px 12px 4px 4px;border-radius:999px;font-weight:600}
.jt-avatar{display:inline-grid;place-items:center;border-radius:50%;color:#fff;font-weight:800;flex:0 0 auto}
.jt-icon{background:none;border:0;padding:8px;border-radius:50%;display:grid;place-items:center;color:var(--ink)}
.jt-icon.sm{padding:6px;color:var(--muted)}
.jt-icon.light{color:#fff}

.jt-error{margin:12px 16px 0;background:#FDECEC;color:#9B1C1C;border-radius:10px;padding:10px 12px;display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:14px}
.jt-error button{background:none;border:0;padding:2px;color:inherit}

.jt-main{flex:1;padding:16px 16px 96px}

/* bottom nav */
.jt-nav{position:sticky;bottom:0;display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-top:1px solid var(--rule);padding-bottom:env(safe-area-inset-bottom);z-index:10}
.jt-nav button{background:none;border:0;padding:10px 2px 9px;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:12px;font-weight:600;color:var(--muted);white-space:nowrap}
.jt-nav button.on{color:var(--ink);box-shadow:inset 0 3px 0 var(--ink)}

/* day selector */
.jt-days{display:flex;gap:4px;overflow-x:auto;padding:2px 2px 14px;margin:0 -4px;scrollbar-width:none}
.jt-days::-webkit-scrollbar{display:none}
.jt-day{flex:0 0 auto;width:58px;background:none;border:0;padding:4px 0;display:flex;flex-direction:column;align-items:center;gap:1px}
.jt-day-dot{width:38px;height:38px;border-radius:50%;background:var(--lc);color:#fff;font-weight:800;font-size:17px;display:grid;place-items:center;opacity:.4;transition:opacity .15s,box-shadow .15s}
.jt-day.active .jt-day-dot{opacity:1;box-shadow:0 0 0 3px var(--paper),0 0 0 5px var(--lc)}
.jt-day-date{font-size:13px;font-weight:700;margin-top:5px}
.jt-day-wk{font-size:12px;color:var(--muted)}

/* train-line timeline */
.jt-line{margin-top:4px}
.jt-row{display:grid;grid-template-columns:46px 26px 1fr;column-gap:4px;padding-bottom:10px}
.jt-time{font-size:13px;font-weight:700;color:var(--muted);text-align:right;padding-top:11px;font-variant-numeric:tabular-nums}
.jt-rail{position:relative}
.jt-rail::before{content:"";position:absolute;left:50%;top:0;bottom:-10px;width:5px;margin-left:-2.5px;background:var(--lc)}
.jt-row:first-child .jt-rail::before{top:22px}
.jt-row:last-child .jt-rail::before{bottom:auto;height:22px}
.jt-row:only-child .jt-rail::before{display:none}
.jt-node{position:absolute;left:50%;top:14px;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#fff;border:5px solid var(--lc)}
.jt-card{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:10px 12px;cursor:pointer}
.jt-card:active{background:#F8F9FB}
.jt-card-title{font-weight:700;font-size:16px}
.jt-meta{display:flex;align-items:center;gap:4px;color:var(--muted);font-size:13px;margin-top:2px}
.jt-memo{font-size:14px;margin-top:6px;white-space:pre-wrap;color:#33405C}
.jt-by{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);margin-top:8px}
.jt-by.grow{margin:0;margin-left:auto}

.jt-empty{text-align:center;color:var(--muted);padding:36px 12px 24px}
.jt-empty p:first-child{font-weight:700;color:var(--ink);margin-bottom:4px}

.jt-add{width:100%;margin-top:14px;background:#fff;border:2px dashed #B4BDCF;color:var(--ink);padding:13px;border-radius:12px;font-weight:700;display:flex;gap:6px;justify-content:center;align-items:center}
.jt-add:active{background:#EDF0F5}

/* chips / buttons / forms */
.jt-chips{display:flex;flex-wrap:wrap;gap:8px}
.jt-filter{margin-bottom:12px}
.jt-chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid var(--rule);border-radius:999px;padding:6px 14px;font-weight:600;font-size:14px;color:var(--muted)}
.jt-chip.on{background:var(--ink);border-color:var(--ink);color:#fff}
.jt-chip button{background:none;border:0;padding:0;display:grid;color:inherit}
.jt-primary{background:var(--ink);color:#fff;border:0;border-radius:12px;padding:14px;font-weight:700;font-size:16px;width:100%}
.jt-primary:disabled{opacity:.35;cursor:not-allowed}
.jt-secondary{background:#fff;border:1.5px solid var(--ink);border-radius:10px;padding:8px 14px;font-weight:700;white-space:nowrap}
.jt-secondary:disabled{opacity:.4;cursor:not-allowed}
.jt-secondary.sm{padding:5px 11px;font-size:13px;border-radius:999px}
.jt-ghost{background:none;border:0;padding:10px;color:var(--muted);font-weight:600}
.jt-del{background:none;border:0;color:var(--muted);display:inline-flex;align-items:center;gap:4px;padding:6px;font-size:13px;border-radius:8px}
.jt-del.armed{background:#FDECEC;color:#B42318;font-weight:700}

.jt-form{display:flex;flex-direction:column;gap:14px}
.jt-field{display:flex;flex-direction:column;gap:6px}
.jt-field>span{font-size:13px;font-weight:700;color:#33405C}
.jt input,.jt select,.jt textarea{font:inherit;font-size:16px;color:var(--ink);background:#fff;border:1.5px solid var(--rule);border-radius:10px;padding:11px 12px;width:100%}
.jt textarea{resize:vertical}
.jt-inline{display:flex;gap:8px;margin-top:4px}
.jt-hint{font-size:13px;color:var(--muted);margin-top:-6px}
.jt-note{font-size:12px;color:var(--muted);text-align:center}
.jt-stepper{display:flex;align-items:center;gap:16px}
.jt-stepper button{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--ink);background:#fff;font-size:22px;font-weight:700;line-height:1}
.jt-stepper strong{font-size:18px;min-width:44px;text-align:center}

.jt-setup{padding:28px 20px 40px}
.jt-setup h1{font-size:26px;font-weight:800;letter-spacing:-.02em;margin-bottom:20px}
.jt-who-list{display:flex;flex-direction:column;gap:10px}
.jt-who-btn{display:flex;align-items:center;gap:14px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:12px 16px;font-size:18px;font-weight:700;text-align:left}
.jt-who-btn:active{background:#EDF0F5}

/* bottom sheet */
.jt-scrim{position:fixed;inset:0;background:rgba(20,33,61,.5);display:flex;align-items:flex-end;justify-content:center;z-index:50}
.jt-sheet{background:var(--paper);width:100%;max-width:520px;max-height:90vh;overflow:auto;border-radius:18px 18px 0 0;padding:8px 20px 28px;animation:jt-up .22s ease-out}
@keyframes jt-up{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}
.jt-sheet-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.jt-sheet-head h3{font-size:18px;font-weight:800}
.jt-daypick{display:flex;flex-direction:column;gap:8px}
.jt-daypick button{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:10px 14px;font-weight:700;text-align:left}
.jt-daypick .jt-day-dot{opacity:1;width:32px;height:32px;font-size:15px}

/* wishlist */
.jt-list{display:flex;flex-direction:column;gap:10px}
.jt-wish{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:12px}
.jt-wish-top{display:flex;align-items:center;gap:8px}
.jt-wish-top strong{font-size:16px}
.jt-tag{color:#fff;font-size:12px;font-weight:700;padding:2px 9px;border-radius:6px}
.jt-wish-bottom{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.jt-like{display:inline-flex;align-items:center;gap:5px;background:#fff;border:1.5px solid var(--rule);color:var(--muted);border-radius:999px;padding:4px 11px;font-weight:700}
.jt-like.on{color:#D9262E;border-color:#D9262E;background:#FEF3F3}
.jt-like.open{color:var(--ink);border-color:var(--ink)}
.jt-planned{font-size:13px;font-weight:700}

/* spending */
.jt-total{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:16px;display:flex;flex-direction:column;margin-bottom:12px}
.jt-total span{font-size:13px;color:var(--muted);font-weight:600}
.jt-total strong{font-size:34px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.jt-total em{font-style:normal;color:var(--muted)}
.jt-seg{display:grid;grid-template-columns:1fr 1fr;background:#E3E7EE;border-radius:10px;padding:3px;margin-bottom:14px}
.jt-seg button{background:none;border:0;padding:8px;border-radius:8px;font-weight:700;color:var(--muted)}
.jt-seg button.on{background:#fff;color:var(--ink)}
.jt-listhint{margin:-4px 0 12px}
.jt-group{margin-bottom:16px}
.jt-group h4{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;margin-bottom:8px}
.jt-pip{width:12px;height:12px;border-radius:50%;background:var(--lc)}
.jt-spend{width:100%;text-align:left;background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px}
.jt-spend:active{background:#F8F9FB}
.jt-spend-main{min-width:0;flex:1}
.jt-spend-title{font-weight:700;display:flex;align-items:center;gap:8px;min-width:0}
.jt-spend-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jt-cat{font-size:12px;background:#E3E7EE;color:#33405C;padding:1px 8px;border-radius:6px;font-weight:700;flex:0 0 auto}
.jt-spend-amt{display:flex;flex-direction:column;align-items:flex-end;text-align:right;flex:0 0 auto}
.jt-spend-amt strong{font-variant-numeric:tabular-nums}
.jt-spend-amt span{font-size:12px;color:var(--muted)}
.jt-spend-edit{color:#A0A9BC;flex:0 0 auto}
.jt-settle h4{font-size:15px;font-weight:800;margin:4px 0 10px}
.jt-moves{display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
.jt-moves li{background:#fff;border:1px solid var(--rule);border-left:5px solid var(--ink);border-radius:10px;padding:12px;display:grid;grid-template-columns:1fr auto;align-items:baseline;column-gap:10px}
.jt-moves li strong{font-size:18px;font-variant-numeric:tabular-nums}
.jt-moves li em{grid-column:2;font-style:normal;font-size:12px;color:var(--muted);text-align:right}
.jt-person{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:12px}
.jt-person-main{display:flex;flex-direction:column;flex:1;min-width:0}
.jt-person-main span{font-size:12px;color:var(--muted)}
.jt-net{font-weight:700;font-size:14px;color:var(--muted);text-align:right}
.jt-net.plus{color:#0A7D58}
.jt-net.minus{color:#B42318}

/* board */
.jt-composer{width:100%;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--rule);border-radius:12px;padding:10px 14px 10px 10px;text-align:left;color:var(--muted);margin-bottom:14px}
.jt-composer span{flex:1;font-weight:600}
.jt-composer:active{background:#F8F9FB}
.jt-posts{display:flex;flex-direction:column;gap:12px}
.jt-post{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:12px 14px}
.jt-post-head{display:flex;align-items:center;gap:10px}
.jt-post-who{display:flex;flex-direction:column;flex:1;min-width:0;line-height:1.25}
