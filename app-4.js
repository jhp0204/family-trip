/* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: m, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ e("ol", { className: "jt-msgs", children: n.map((A) => {
      let f = sr(A.at), $ = f !== v, k = A.by === a, S = !$ && N && N.by === A.by && A.at - N.at < 5 * 6e4;
      return v = f, N = A, /* @__PURE__ */ o(Mn.Fragment, { children: [
        $ && /* @__PURE__ */ e("li", { className: "jt-daysep", "aria-label": f, children: /* @__PURE__ */ e("span", { children: f }) }),
        /* @__PURE__ */ o("li", { className: "jt-msg" + (k ? " mine" : "") + (S ? " cont" : ""), children: [
          !k && /* @__PURE__ */ e("span", { className: "jt-msg-av", children: !S && /* @__PURE__ */ e(rt, { name: A.by, members: x, size: 30 }) }),
          /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
            !k && !S && /* @__PURE__ */ e("span", { className: "jt-msg-name", children: A.by }),
            /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "jt-bubble" + (A.kind === "loc" ? " loc" : ""),
                  onClick: () => k && M(s === A.id ? null : A.id),
                  "aria-label": k ? "내 메시지, 누르면 삭제 메뉴" : void 0,
                  children: A.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                    /* @__PURE__ */ e(kt, { size: 16 }),
                    k ? "내 위치를 보냈어요" : `${A.by}의 현재 위치`
                  ] }) : /* @__PURE__ */ e("span", { className: "jt-msg-text", children: lr(A.text) })
                }
              ),
              /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                (() => {
                  let _ = x.filter((O) => O !== A.by && (r[O] || 0) < A.at);
                  return _.length > 0 ? /* @__PURE__ */ e("b", { className: "jt-unread", title: `안 읽음: ${_.join(", ")}`, "aria-label": `${_.length}명 안 읽음`, children: _.length }) : null;
                })(),
                /* @__PURE__ */ e("time", { className: "jt-msg-time", children: ir(A.at) })
              ] })
            ] }),
            A.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
              /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t({ lat: A.lat, lng: A.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(zt, { size: 13 }),
                "지도에서 보기"
              ] }),
              !k && /* @__PURE__ */ o("a", { className: "jt-maplink", href: qa(A), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(Nt, { size: 13 }),
                "길 찾기"
              ] })
            ] }),
            k && s === A.id && /* @__PURE__ */ e("div", { className: "jt-msg-del", children: /* @__PURE__ */ e(
              xt,
              {
                onConfirm: () => {
                  j(A), M(null);
                },
                label: "메시지 삭제"
              }
            ) })
          ] })
        ] })
      ] }, A.id);
    }) }),
    /* @__PURE__ */ e("div", { ref: u }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ e("button", { type: "button", className: "jt-chat-loc", onClick: c, disabled: b, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ e(kt, { size: 20 }) }),
      /* @__PURE__ */ e(
        "textarea",
        {
          rows: 1,
          value: y,
          onChange: (A) => E(A.target.value),
          onKeyDown: (A) => {
            A.key === "Enter" && !A.shiftKey && !A.nativeEvent.isComposing && (A.preventDefault(), C());
          },
          placeholder: b ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: C, disabled: !y.trim(), "aria-label": "보내기", children: /* @__PURE__ */ e(Ra, { size: 18 }) })
    ] })
  ] });
}
var At = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], pr = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", dr = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), mr = 7e3;
function ur() {
  let [t, a] = z(0), [n, r] = z({}), i = Y(n);
  if (i.current = n, W(() => {
    let p = setInterval(() => {
      a((m) => {
        let x = m;
        for (let y = 0; y < At.length && (x = (x + 1) % At.length, !!i.current[x]); y++)
          ;
        return x;
      });
    }, mr);
    return () => clearInterval(p);
  }, []), At.every((p, m) => n[m])) return null;
  let h = At[t];
  return /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      At.map((p, m) => /* @__PURE__ */ e(
        "img",
        {
          src: pr(p.f),
          alt: "",
          className: m === t ? "on" : "",
          style: { objectPosition: p.pos },
          loading: m === 0 ? "eager" : "lazy",
          onError: () => r((x) => ({ ...x, [m]: !0 }))
        },
        p.f
      )),
      /* @__PURE__ */ e("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: At.map((p, m) => /* @__PURE__ */ e("i", { className: m === t ? "on" : "" }, p.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: dr(h.f), target: "_blank", rel: "noopener noreferrer", children: [
        h.t,
        ", 사진 ",
        h.by,
        " (",
        h.lic,
        ")"
      ] })
    ] })
  ] });
}
function We() {
  let [t, a] = z(!1), [n, r] = z(null), [i, j] = z([]), [h, p] = z([]), [m, x] = z([]), [y, E] = z([]), [s, M] = z(null), [b, l] = z("plan"), [u, I] = z(0), [d, C] = z(!1), [c, v] = z(!1), N = Y(null), A = Y(!1), [f, $] = z(null), [k, S] = z(""), _ = Y(!1), [O, G] = z(null), [U, w] = z(!1), [K, V] = z({}), [X, _t] = z(!1), [Zt, Ye] = z(null), [Va, Qt] = z("");
  W(() => {
    (async () => {
      try {
        let g = await window.storage.get("hdr", !1);
        g && g.value === "min" && w(!0);
      } catch {
      }
      try {
        let g = await window.storage.get("locshare", !1);
        g && g.value === "on" && _t(!0), (!g || !g.value) && me(!0);
      } catch {
        me(!0);
      }
    })();
  }, []);
  let [Za, me] = z(!1), [te, ee] = z([]), [Je, qe] = z(0), [Ge, Xe] = z({}), [Ve, Ze] = z(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  W(() => {
    (async () => {
      try {
        let g = await window.storage.get("chatread", !1);
        g && g.value && qe(Number(g.value) || 0);
      } catch {
      }
    })();
  }, []);
  let Qe = async (g) => {
    let F = { id: st(), by: s, at: Date.now(), ...g }, D = Pa(F);
    ee((B) => [...B, { ...F, key: D, pending: !0 }]), await gt(D, F) || (ee((B) => B.filter((L) => L.id !== F.id)), Bt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, Qa = async (g) => {
    ee((F) => F.filter((D) => D.id !== g.id));
    try {
      await window.storage.delete(g.key || Pa(g), !0);
    } catch {
    }
  }, tn = async () => {
    let g = Zt;
    if (g || (g = await new Promise((F) => {
      if (!navigator.geolocation) return F(null);
      navigator.geolocation.getCurrentPosition(
        (D) => F({ lat: D.coords.latitude, lng: D.coords.longitude }),
        () => F(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !g) {
      Bt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await Qe({ kind: "loc", lat: g.lat, lng: g.lng, text: "" });
  }, ae = te.reduce((g, F) => F.by !== s && F.at > g ? F.at : g, 0), Lt = te.reduce((g, F) => F.at > g ? F.at : g, 0), jt = te.filter((g) => g.by !== s && g.at > Je).length, [ta, en] = z(() => document.visibilityState === "visible");
  W(() => {
    let g = () => en(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", g), () => document.removeEventListener("visibilitychange", g);
  }, []), W(() => {
    if (!(b !== "chat" || !ta || !s || !Lt)) {
      if (ae > Je) {
        qe(ae);
        try {
          window.storage.set("chatread", String(ae), !1);
        } catch {
        }
      }
      (Ge[s] || 0) < Lt && (Xe((g) => ({ ...g, [s]: Lt })), gt(Se + encodeURIComponent(s), { at: Lt }));
    }
  }, [b, ta, Lt, ae, s]), W(() => {
    if ("setAppBadge" in navigator)
      try {
        jt > 0 ? navigator.setAppBadge(jt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [jt, Ve]);
  let an = async () => {
    try {
      let g = await Notification.requestPermission();
      Ze(g), Bt(g === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      Ze("denied");
    }
  }, [ne, Bt] = z("");
  W(() => {
    if (!ne) return;
    let g = setTimeout(() => Bt(""), 2600);
    return () => clearTimeout(g);
  }, [ne]);
  let oe = (g, F) => {
    _t(g), me(!1), g || Qt(""), F || Bt(g ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", g ? "on" : "off", !1);
    } catch {
    }
  }, ea = () => oe(!X);
  W(() => {
    if (!X || !s || !n) return;
    let g = Ae + encodeURIComponent(s), F = null, D = null, R = 0, B = (ot) => {
      D = ot, R = Date.now(), Ye(ot), gt(g, { ...ot, at: Date.now(), online: !0 });
    }, L = () => {
      if (F == null) {
        if (!navigator.geolocation) {
          Qt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        F = navigator.geolocation.watchPosition(
          (ot) => {
            let fe = { lat: ot.coords.latitude, lng: ot.coords.longitude, acc: Math.round(ot.coords.accuracy) };
            Qt(""), !D || de(D, fe) > 25 || Date.now() - R > 6e4 ? B(fe) : Ye(fe);
          },
          (ot) => Qt(
            ot.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, P = (ot) => {
      F != null && navigator.geolocation.clearWatch(F), F = null, ot && gt(g, { online: !1, at: Date.now() });
    }, T = () => document.visibilityState === "visible" ? L() : P(!0), J = () => P(!0), Ot = setInterval(() => {
      document.visibilityState === "visible" && D && B(D);
    }, 6e4);
    return document.visibilityState === "visible" && L(), document.addEventListener("visibilitychange", T), window.addEventListener("pagehide", J), () => {
      clearInterval(Ot), document.removeEventListener("visibilitychange", T), window.removeEventListener("pagehide", J), P(!0);
    };
  }, [X, s, !!n]);
  let nn = () => {
    let g = !U;
    w(g);
    try {
      window.storage.set("hdr", g ? "min" : "max", !1);
    } catch {
    }
  };
  W(() => {
    let g = !0, F = async () => {
      let R = await wo();
      if (g)
        if (R) {
          let B = { ...R, at: Date.now() };
          G(B), gt(H.fx, B);
        } else {
          let B = await lt(H.fx, null);
          g && B && B.rate > 0 && G({ ...B, cached: !0 });
        }
    };
    F();
    let D = setInterval(F, 3 * 36e5);
    return () => {
      g = !1, clearInterval(D);
    };
  }, []);
  let re = An(async () => {
    let [g, F, D, R, B] = await Promise.all([
      lt(H.settings, null),
      lt(H.plan, []),
      lt(H.wish, []),
      lt(H.spend, []),
      lt(H.board, [])
    ]);
    r(g), j(F), p(D), x(R), E(B);
    try {
      let L = {};
      (await Ee(Ae)).forEach(([P, T]) => L[decodeURIComponent(P.slice(Ae.length))] = T), V(L);
    } catch {
    }
    try {
      let L = (await Ee(Ga)).map(([P, T]) => ({ ...T, key: P }));
      L.sort((P, T) => P.at - T.at), ee((P) => {
        let T = P.filter((J) => J.pending && !L.some((Ot) => Ot.id === J.id));
        return [...L, ...T];
      });
    } catch {
    }
    try {
      let L = {};
      (await Ee(Se)).forEach(([P, T]) => L[decodeURIComponent(P.slice(Se.length))] = T.at || 0), Xe((P) => {
        let T = { ...L };
        return Object.keys(P).forEach((J) => T[J] = Math.max(T[J] || 0, P[J] || 0)), T;
      });
    } catch {
    }
    a(!0);
  }, []);
  W(() => {
    (async () => {
      try {
        let D = await window.storage.get("me", !1);
        D && D.value && M(D.value);
      } catch {
      }
      await re();
    })();
    let g = window.storage.onChange ? window.storage.onChange(re) : null, F = setInterval(re, g ? 6e4 : 1e4);
    return () => {
      clearInterval(F), g && g();
    };
  }, [re]), W(() => {
    if (!n || _.current) return;
    _.current = !0;
    let g = Math.round((vt(pt(/* @__PURE__ */ new Date())) - vt(n.start)) / 864e5);
    g >= 0 && g < n.days && I(g);
  }, [n]);
  let Q = async (g, F, D, R) => {
    let B = await lt(g, F), L = R(B);
    D(L);
    let P = await gt(g, L);
    return P || S("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), P;
  }, on = async (g) => {
    M(g), v(!1);
    try {
      await window.storage.set("me", g, !1);
    } catch {
    }
  }, rn = async (g) => {
    r(g), C(!1), await gt(H.settings, g) || S("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), s && !g.members.includes(s) && M(null);
  }, et = () => $(null);
  N.current = () => {
    f ? $(null) : c ? v(!1) : d && C(!1);
  };
  let ue = !!f || c || d && !!n;
  W(() => {
    ue && !A.current ? (history.pushState({ jtOverlay: !0 }, ""), A.current = !0) : !ue && A.current && (A.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [ue]), W(() => {
    let g = () => {
      A.current && (A.current = !1, N.current && N.current());
    };
    return window.addEventListener("popstate", g), () => window.removeEventListener("popstate", g);
  }, []);
  let aa = (g, F) => ({
    add: (D, R) => Q(
      g,
      [],
      F,
      (B) => B.map(
        (L) => L.id === D ? { ...L, comments: [...L.comments || [], { id: st(), by: s, text: R, createdAt: Date.now() }] } : L
      )
    ),
    del: (D, R) => Q(
      g,
      [],
      F,
      (B) => B.map((L) => L.id === D ? { ...L, comments: (L.comments || []).filter((P) => P.id !== R) } : L)
    )
  }), ge = (g, F, D = !1) => (R, B) => Q(g, [], F, (L) => L.map((P) => P.id === R ? No(P, B, s, D) : P)), sn = ge(H.plan, j), ln = ge(H.wish, p), jr = ge(H.board, E, !0), na = aa(H.plan, j), oa = aa(H.wish, p), cn = (g, F, D) => Q(
    H.plan,
    [],
    j,
    (R) => F ? R.map((B) => B.id === F ? { ...B, ...g } : B) : [...R, { id: st(), day: D, by: s, ...g }]
  ), pn = (g) => Q(H.plan, [], j, (F) => F.filter((D) => D.id !== g)), ra = (g) => Q(H.wish, [], p, (F) => [...F, { id: st(), by: s, likes: [s], createdAt: Date.now(), ...g }]), dn = (g) => Q(
    H.wish,
    [],
    p,
    (F) => F.map(
      (D) => D.id === g ? { ...D, likes: D.likes.includes(s) ? D.likes.filter((R) => R !== s) : [...D.likes, s] } : D
    )
  ), ia = (g) => Q(H.wish, [], p, (F) => F.filter((D) => D.id !== g)), mn = (g, F) => Q(H.wish, [], p, (D) => D.map((R) => R.id === g ? { ...R, ...F, editedAt: Date.now() } : R)), un = async (g, F) => {
    await Q(H.plan, [], j, (D) => [
      ...D,
      {
        id: st(),
        day: F,
        by: s,
        time: "",
        title: g.name,
        place: g.area || "",
        link: g.link || "",
        memo: g.memo || "",
        comments: g.comments || [],
        reactions: g.reactions || {},
        ...ht(g) ? { lat: g.lat, lng: g.lng } : {}
      }
    ]), await Q(H.wish, [], p, (D) => D.map((R) => R.id === g.id ? { ...R, planned: F } : R)), I(F);
  }, gn = (g, F) => Q(
    H.spend,
    [],
    x,
    (D) => F ? D.map((R) => R.id === F ? { ...R, ...g, editedAt: Date.now(), editedBy: s } : R) : [...D, { id: st(), by: s, createdAt: Date.now(), ...g }]
  ), fn = (g) => Q(H.spend, [], x, (F) => F.filter((D) => D.id !== g)), bn = async ({ text: g, urls: F, photos: D }, R) => {
    for (let T of D.filter((J) => J.data)) {
      if (!await gt(_e(T.id), T.data)) return !1;
      bt.set(T.id, T.data);
    }
    let B = D.map((T) => T.id), L = [], P = await Q(H.board, [], E, (T) => R ? T.map((J) => J.id !== R ? J : (L = (J.photos || []).filter((Ot) => !B.includes(Ot)), { ...J, text: g, urls: F, photos: B, editedAt: Date.now() })) : [{ id: st(), by: s, createdAt: Date.now(), text: g, urls: F, photos: B, likes: [], comments: [] }, ...T]);
    return P && L.forEach(ka), P;
  }, hn = async (g) => {
    let F = [];
    await Q(H.board, [], E, (R) => (F = R.find((B) => B.id === g)?.photos || [], R.filter((B) => B.id !== g))) && F.forEach(ka);
  }, vr = (g) => Q(
    H.board,
    [],
    E,
    (F) => F.map((D) => {
      if (D.id !== g) return D;
      let R = D.likes || [];
      return { ...D, likes: R.includes(s) ? R.filter((B) => B !== s) : [...R, s] };
    })
  ), yr = (g, F) => Q(
    H.board,
    [],
    E,
    (D) => D.map(
      (R) => R.id === g ? { ...R, comments: [...R.comments || [], { id: st(), by: s, text: F, createdAt: Date.now() }] } : R
    )
  ), wr = (g, F) => Q(
    H.board,
    [],
    E,
    (D) => D.map((R) => R.id === g ? { ...R, comments: (R.comments || []).filter((B) => B.id !== F) } : R)
  ), Tt;
  if (!t)
    Tt = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || d)
    Tt = /* @__PURE__ */ e(zo, { initial: n, onSave: rn, onCancel: n ? () => C(!1) : null });
  else if (!s || !n.members.includes(s) || c) {
    let g = s && n.members.includes(s);
    Tt = /* @__PURE__ */ e(
      Mo,
      {
        members: n.members,
        onPick: on,
        current: g ? s : null,
        onBack: g ? () => v(!1) : null
      }
    );
  } else {
    let g = dt(n.start, 0), F = dt(n.start, n.days - 1), D = Math.round((vt(n.start) - vt(pt(/* @__PURE__ */ new Date()))) / 864e5), R = Math.round((vt(pt(/* @__PURE__ */ new Date())) - vt(n.start)) / 864e5), B = R >= 0 && R < n.days ? R : u, L = O ? { ...n, rate: O.rate, fx: O } : n;
    Tt = /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (U ? " mini" : b === "plan" ? " tall" : ""), children: [
        !U && /* @__PURE__ */ e(ur, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => v(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(rt, { name: s, members: n.members, size: 24 }),
            s
          ] }),
          U && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
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
                className: "jt-icon light jt-locbtn" + (X ? " on" : ""),
                onClick: ea,
                "aria-pressed": X,
                "aria-label": X ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: X ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ e(kt, { size: 19 }),
                  /* @__PURE__ */ e("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: "jt-icon light",
                onClick: nn,
                "aria-label": U ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !U,
                children: U ? /* @__PURE__ */ e(On, { size: 20 }) : /* @__PURE__ */ e(Un, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => C(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(Fn, { size: 20 }) })
          ] })
        ] }),
        !U && /* @__PURE__ */ o(ct, { children: [
          /* @__PURE__ */ e("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              g.getMonth() + 1,
              "월 ",
              g.getDate(),
              "일 – ",
              F.getMonth() + 1,
              "월 ",
              F.getDate(),
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
      k && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        k,
        /* @__PURE__ */ e("button", { onClick: () => S(""), "aria-label": "닫기", children: /* @__PURE__ */ e(Vt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        b === "plan" && /* @__PURE__ */ e(
          _o,
          {
            settings: L,
            schedule: i,
            day: u,
            setDay: I,
            onAdd: () => $({ type: "plan", day: u }),
            onEdit: (P) => $({ type: "plan", item: P, day: P.day }),
            onAddAt: (P, T) => $({ type: "plan", day: P, preset: { time: T, end: St(Math.min(wt(T) + 60, 23 * 60 + 59)) } }),
            me: s,
            onComment: na.add,
            onDelComment: na.del,
            onReact: sn
          }
        ),
        b === "wish" && /* @__PURE__ */ e(
          Zo,
          {
            settings: L,
            wish: h,
            me: s,
            onAdd: () => $({ type: "wish" }),
            onEdit: (P) => $({ type: "wish", item: P }),
            onSave: ra,
            onLike: dn,
            onPlan: (P) => $({ type: "toPlan", wish: P }),
            onDelete: ia,
            onComment: oa.add,
            onDelComment: oa.del,
            onReact: ln
          }
        ),
        b === "spend" && /* @__PURE__ */ e(
          er,
          {
            settings: L,
            spend: m,
            me: s,
            onEdit: (P) => $({ type: "spend", item: P })
          }
        ),
        b === "chat" && /* @__PURE__ */ e(
          cr,
          {
            settings: L,
            me: s,
            msgs: te,
            reads: Ge,
            badgeAsk: Ve === "default",
            onBadgeAsk: an,
            onSend: (P) => Qe({ kind: "text", text: P }),
            onDelete: Qa,
            onSendLoc: tn
          }
        ),
        b === "family" && /* @__PURE__ */ e(
          rr,
          {
            settings: L,
            me: s,
            locs: K,
            shareOn: X,
            onToggle: ea,
            myPos: Zt,
            geoErr: Va
          }
        )
      ] }),
      (() => {
        let P = {
          plan: [`${u + 1}일차 일정 추가`, () => $({ type: "plan", day: u })],
          wish: ["가고 싶은 곳 추가", () => $({ type: "wish" })],
          spend: ["경비 추가", () => $({ type: "spend" })]
        }[b];
        return P ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: P[1], children: [
          /* @__PURE__ */ e(Sn, { size: 20, strokeWidth: 2.6 }),
          P[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", Dn],
        ["wish", "가고 싶은 곳", Re],
        ["spend", "경비", Pn],
        ["family", "위치 공유", Kn],
        ["chat", "채팅", Yn]
      ].map(([P, T, J]) => /* @__PURE__ */ o("button", { className: b === P ? "on" : "", onClick: () => l(P), "aria-current": b === P, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ e(J, { size: 21 }),
          P === "chat" && jt > 0 && b !== "chat" && /* @__PURE__ */ e("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${jt}개`, children: jt > 99 ? "99+" : jt })
        ] }),
        T
      ] }, P)) }),
      f?.type === "plan" && /* @__PURE__ */ e(yt, { title: f.item ? "일정 수정" : `${f.day + 1}일차 일정 추가`, onClose: et, children: /* @__PURE__ */ e(
        Ao,
        {
          initial: f.item,
          preset: f.preset,
          gkey: n.gmapsKey,
          dayItems: i.filter((P) => P.day === f.day && P.id !== f.item?.id),
          onSave: (P) => {
            cn(P, f.item?.id, f.day), et();
          },
          onDelete: () => {
            pn(f.item.id), et();
          }
        }
      ) }),
      f?.type === "wish" && /* @__PURE__ */ e(yt, { title: f.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: et, children: /* @__PURE__ */ e(
        So,
        {
          initial: f.item,
          onSave: (P) => {
            f.item ? mn(f.item.id, P) : ra(P), et();
          },
          onDelete: () => {
            ia(f.item.id), et();
          }
        }
      ) }),
      f?.type === "spend" && /* @__PURE__ */ e(yt, { title: f.item ? "경비 수정" : "경비 기록", onClose: et, children: /* @__PURE__ */ e(
        Io,
        {
          settings: L,
          me: s,
          defaultDay: B,
          initial: f.item,
          onSave: (P) => {
            gn(P, f.item?.id), et();
          },
          onDelete: () => {
            fn(f.item.id), et();
          }
        }
      ) }),
      f?.type === "post" && /* @__PURE__ */ e(yt, { title: f.item ? "글 수정" : "새 글", onClose: et, children: /* @__PURE__ */ e(
        Fo,
        {
          initial: f.item,
          onSave: async (P) => {
            let T = await bn(P, f.item?.id);
            return T && et(), T;
          },
          onDelete: () => {
            hn(f.item.id), et();
          }
        }
      ) }),
      Za && !f && /* @__PURE__ */ e(yt, { title: "가족과 위치를 공유할까요?", onClose: () => oe(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
        /* @__PURE__ */ o("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ e("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ e("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ e("button", { className: "jt-primary", onClick: () => oe(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: () => oe(!1, !0), children: "나중에 할게요" })
      ] }) }),
      ne && /* @__PURE__ */ e("div", { className: "jt-toast", role: "status", children: ne }),
      f?.type === "toPlan" && /* @__PURE__ */ e(yt, { title: `"${f.wish.name}" 몇째 날에 갈까요?`, onClose: et, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (P, T) => {
        let J = dt(n.start, T);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": tt[T % tt.length] },
            onClick: () => {
              un(f.wish, T), et(), l("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: T + 1 }),
              T + 1,
              "일차 ",
              qt(J),
              " (",
              Pt(J),
              ")"
            ]
          },
          T
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: He }),
    Tt
  ] });
}
var He = `
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
