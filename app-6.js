return Q.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${Q.join(", ")}`, "aria-label": `${Q.length}명 안 읽음`, children: Q.length }) : null;
                    })(),
                    /* @__PURE__ */ o("time", { className: "jt-msg-time", children: [
                      R.editedAt ? "수정됨 " : "",
                      Ki(R.at)
                    ] })
                  ] })
                ] }),
                R.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t({ lat: R.lat, lng: R.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Rt, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !dt && /* @__PURE__ */ o("a", { className: "jt-maplink", href: En(R), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Ct, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                C === R.id && s !== R.id && /* @__PURE__ */ o("div", { className: "jt-msg-menu", children: [
                  r && r.id === R.id ? /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        x(), v(null);
                      },
                      children: [
                        /* @__PURE__ */ t(La, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        l(R), v(null), T(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(Eo, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  dt && R.kind !== "loc" && /* @__PURE__ */ o("button", { type: "button", className: "jt-like", onClick: () => Y(R), children: [
                    /* @__PURE__ */ t(Xt, { size: 14 }),
                    "수정"
                  ] }),
                  dt && /* @__PURE__ */ t(
                    Et,
                    {
                      onConfirm: () => {
                        u(R), v(null);
                      },
                      label: "삭제"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] }, R.id);
    }) }),
    /* @__PURE__ */ t("div", { ref: I }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: de, disabled: M, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(It, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: h,
          onChange: (R) => z(R.target.value),
          onKeyDown: (R) => {
            R.key === "Enter" && !R.shiftKey && !R.nativeEvent.isComposing && (R.preventDefault(), pt());
          },
          placeholder: M ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: pt, disabled: !h.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(sn, { size: 18 }) })
    ] })
  ] });
}
var Ot = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Kinkaku-ji in November 2016 -02.jpg", t: "교토 금각사", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 50%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Torii path with lantern at Fushimi Inari Taisha Shrine, Kyoto, Japan.jpg", t: "교토 후시미 이나리 신사", by: "Basile Morin", lic: "CC BY-SA", pos: "50% 45%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], Yi = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", Ji = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), Xi = 7e3;
function Vi() {
  let [e, a] = y(0), [n, i] = y({}), r = J(n);
  if (r.current = n, W(() => {
    let p = setInterval(() => {
      a((l) => {
        let x = l;
        for (let w = 0; w < Ot.length && (x = (x + 1) % Ot.length, !!r.current[x]); w++)
          ;
        return x;
      });
    }, Xi);
    return () => clearInterval(p);
  }, []), Ot.every((p, l) => n[l])) return null;
  let u = Ot[e];
  return /* @__PURE__ */ o(rt, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      Ot.map((p, l) => /* @__PURE__ */ t(
        "img",
        {
          src: Yi(p.f),
          alt: "",
          className: l === e ? "on" : "",
          style: { objectPosition: p.pos },
          loading: l === 0 ? "eager" : "lazy",
          onError: () => i((x) => ({ ...x, [l]: !0 }))
        },
        p.f
      )),
      /* @__PURE__ */ t("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ t("div", { className: "jt-hero-dots", "aria-hidden": "true", children: Ot.map((p, l) => /* @__PURE__ */ t("i", { className: l === e ? "on" : "" }, p.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: Ji(u.f), target: "_blank", rel: "noopener noreferrer", children: [
        u.t,
        ", 사진 ",
        u.by,
        " (",
        u.lic,
        ")"
      ] })
    ] })
  ] });
}
function da() {
  let [e, a] = y(!1), [n, i] = y(null), [r, g] = y([]), [u, p] = y([]), [l, x] = y([]), [w, N] = y([]), [d, A] = y(null), [h, z] = y("plan"), [C, v] = y({ wish: "list", spend: "me" }), M = J(!1), [c, s] = y(0), [E, k] = y(!1), [S, m] = y(!1), [T, D] = y(!1);
  W(() => {
    let b = setTimeout(() => D(!0), 8e3);
    return () => clearTimeout(b);
  }, []);
  let j = J(null), L = J(!1), [f, U] = y(null), [Y, $] = y(""), I = J(!1), [X, Bt] = y(null), [pt, de] = y(!1), [me, Lt] = y({}), [R, tt] = y(!1), [Gt, dt] = y(null), [qt, Q] = y("");
  W(() => {
    (async () => {
      try {
        let b = await window.storage.get("hdr", !1);
        b && b.value === "min" && de(!0);
      } catch {
      }
      try {
        let b = await window.storage.get("locshare", !1);
        b && b.value === "on" && tt(!0), (!b || !b.value) && Me(!0);
      } catch {
        Me(!0);
      }
    })();
  }, []);
  let [ue, Me] = y(!1), [fe, Zt] = y([]), [Se, Fe] = y(null), [ua, fa] = y(0), [ga, ba] = y({}), [ha, xa] = y(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  W(() => {
    (async () => {
      try {
        let b = await window.storage.get("chatread", !1);
        b && b.value && fa(Number(b.value) || 0);
      } catch {
      }
    })();
  }, []);
  let ja = async (b) => {
    let F = { id: xt(), by: d, at: Date.now(), ...b }, P = Ze(F);
    Zt((O) => [...O, { ...F, key: P, pending: !0 }]), await gt(P, F) || (Zt((O) => O.filter((H) => H.id !== F.id)), jt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, Sn = async (b, F) => {
    let P = { id: b.id, by: b.by, at: b.at, kind: b.kind, text: F, editedAt: Date.now() };
    Zt((O) => O.map((H) => H.id === b.id ? { ...H, text: F, editedAt: P.editedAt } : H)), await gt(b.key || Ze(b), P) || jt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, Fn = async (b) => {
    let F = { id: b.id, by: b.by, kind: b.kind || "text", text: b.text || "", lat: b.lat, lng: b.lng, pinnedBy: d, pinnedAt: Date.now() };
    Fe(F);
    let P = await gt(G.notice, F);
    jt(P ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, ya = async () => {
    Fe(null);
    try {
      await window.storage.delete(G.notice, !0);
    } catch {
    }
    jt("공지를 해제했어요.");
  }, Dn = async (b) => {
    Se && Se.id === b.id && ya(), Zt((F) => F.filter((P) => P.id !== b.id));
    try {
      await window.storage.delete(b.key || Ze(b), !0);
    } catch {
    }
  }, In = async () => {
    let b = Gt;
    if (b || (b = await new Promise((F) => {
      if (!navigator.geolocation) return F(null);
      navigator.geolocation.getCurrentPosition(
        (P) => F({ lat: P.coords.latitude, lng: P.coords.longitude }),
        () => F(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !b) {
      jt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await ja({ kind: "loc", lat: b.lat, lng: b.lng, text: "" });
  }, ge = fe.reduce((b, F) => F.by !== d && F.at > b ? F.at : b, 0), Qt = fe.reduce((b, F) => F.at > b ? F.at : b, 0), At = fe.filter((b) => b.by !== d && b.at > ua).length, [va, Pn] = y(() => document.visibilityState === "visible");
  W(() => {
    let b = () => Pn(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", b), () => document.removeEventListener("visibilitychange", b);
  }, []), W(() => {
    if (!(h !== "chat" || !va || !d || !Qt)) {
      if (ge > ua) {
        fa(ge);
        try {
          window.storage.set("chatread", String(ge), !1);
        } catch {
        }
      }
      (ga[d] || 0) < Qt && (ba((b) => ({ ...b, [d]: Qt })), gt(qe + encodeURIComponent(d), { at: Qt }));
    }
  }, [h, va, Qt, ge, d]), W(() => {
    if ("setAppBadge" in navigator)
      try {
        At > 0 ? navigator.setAppBadge(At).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [At, ha]);
  let $n = async () => {
    try {
      let b = await Notification.requestPermission();
      xa(b), jt(b === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      xa("denied");
    }
  }, [be, jt] = y("");
  W(() => {
    if (!be) return;
    let b = setTimeout(() => jt(""), 2600);
    return () => clearTimeout(b);
  }, [be]);
  let he = (b, F) => {
    tt(b), Me(!1), b || Q(""), F || jt(b ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", b ? "on" : "off", !1);
    } catch {
    }
  }, wa = () => he(!R);
  W(() => {
    if (!R || !d || !n) return;
    let b = Ge + encodeURIComponent(d), F = null, P = null, _ = 0, O = (it) => {
      P = it, _ = Date.now(), dt(it), gt(b, { ...it, at: Date.now(), online: !0 });
    }, H = () => {
      if (F == null) {
        if (!navigator.geolocation) {
          Q("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        F = navigator.geolocation.watchPosition(
          (it) => {
            let $e = { lat: it.coords.latitude, lng: it.coords.longitude, acc: Math.round(it.coords.accuracy) };
            Q(""), !P || pe(P, $e) > 25 || Date.now() - _ > 6e4 ? O($e) : dt($e);
          },
          (it) => Q(
            it.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, B = (it) => {
      F != null && navigator.geolocation.clearWatch(F), F = null, it && gt(b, { online: !1, at: Date.now() });
    }, K = () => document.visibilityState === "visible" ? H() : B(!0), V = () => B(!0), ft = setInterval(() => {
      document.visibilityState === "visible" && P && O(P);
    }, 6e4);
    return document.visibilityState === "visible" && H(), document.addEventListener("visibilitychange", K), window.addEventListener("pagehide", V), () => {
      clearInterval(ft), document.removeEventListener("visibilitychange", K), window.removeEventListener("pagehide", V), B(!0);
    };
  }, [R, d, !!n]), W(() => {
    if (M.current)
      try {
        window.storage.set("ui", JSON.stringify({ tab: h, ...C }), !1);
      } catch {
      }
  }, [h, C]);
  let Rn = () => {
    let b = !pt;
    de(b);
    try {
      window.storage.set("hdr", b ? "min" : "max", !1);
    } catch {
    }
  };
  W(() => {
    let b = !0, F = async () => {
      let _ = await ai();
      if (b)
        if (_) {
          let O = { ..._, at: Date.now() };
          Bt(O), gt(G.fx, O);
        } else {
          let O = await bt(G.fx, null);
          b && O && O.rate > 0 && Bt({ ...O, cached: !0 });
        }
    };
    F();
    let P = setInterval(F, 3 * 36e5);
    return () => {
      b = !1, clearInterval(P);
    };
  }, []);
  let xe = co(async () => {
    let [b, F, P, _, O, H] = await Promise.all([
      bt(G.settings, null),
      bt(G.plan, []),
      bt(G.wish, []),
      bt(G.spend, []),
      bt(G.notice, null),
      bt(G.board, [])
    ]);
    N(H), Fe(O && O.id ? O : null), i(b), g(F), p(P), x(_);
    try {
      let B = {};
      (await Xe(Ge)).forEach(([K, V]) => B[decodeURIComponent(K.slice(Ge.length))] = V), Lt(B);
    } catch {
    }
    try {
      let B = (await Xe(An)).map(([K, V]) => ({ ...V, key: K }));
      B.sort((K, V) => K.at - V.at), Zt((K) => {
        let V = K.filter((ft) => ft.pending && !B.some((it) => it.id === ft.id));
        return [...B, ...V];
      });
    } catch {
    }
    try {
      let B = {};
      (await Xe(qe)).forEach(([K, V]) => B[decodeURIComponent(K.slice(qe.length))] = V.at || 0), ba((K) => {
        let V = { ...B };
        return Object.keys(K).forEach((ft) => V[ft] = Math.max(V[ft] || 0, K[ft] || 0)), V;
      });
    } catch {
    }
    a(!0);
  }, []);
  W(() => {
    (async () => {
      try {
        let P = await window.storage.get("me", !1);
        P && P.value && A(P.value);
      } catch {
      }
      try {
        let P = await window.storage.get("ui", !1), _ = P && P.value ? JSON.parse(P.value) : null;
        _ && (["board", "plan", "wish", "spend", "family", "chat"].includes(_.tab) && z(_.tab), v((O) => ({
          wish: ["list", "map", "near"].includes(_.wish) ? _.wish : O.wish,
          spend: ["me", "day", "all"].includes(_.spend) ? _.spend : O.spend
        })));
      } catch {
      }
      M.current = !0, await xe();
    })();
    let b = window.storage.onChange ? window.storage.onChange(xe) : null, F = setInterval(xe, b ? 6e4 : 1e4);
    return () => {
      clearInterval(F), b && b();
    };
  }, [xe]), W(() => {
    if (!n || I.current) return;
    I.current = !0;
    let b = Math.round((Mt(ct(/* @__PURE__ */ new Date())) - Mt(n.start)) / 864e5);
    b >= 0 && b < n.days && s(b);
  }, [n]);
  let et = async (b, F, P, _) => {
    let O = await bt(b, F), H = _(O);
    P(H);
    let B = await gt(b, H);
    return B || $("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), B;
  }, Tn = async (b) => {
    A(b), m(!1);
    try {
      await window.storage.set("me", b, !1);
    } catch {
    }
  }, Bn = async (b) => {
    i(b), k(!1), await gt(G.settings, b) || $("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), d && !b.members.includes(d) && A(null);
  }, ot = () => U(null);
  j.current = () => {
    f ? U(null) : S ? m(!1) : E && k(!1);
  };
  let De = !!f || S || E && !!n;
  W(() => {
    De && !L.current ? (history.pushState({ jtOverlay: !0 }, ""), L.current = !0) : !De && L.current && (L.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [De]), W(() => {
    let b = () => {
      L.current && (L.current = !1, j.current && j.current());
    };
    return window.addEventListener("popstate", b), () => window.removeEventListener("popstate", b);
  }, []);
  let ka = (b, F) => ({
    add: (P, _) => et(
      b,
      [],
      F,
      (O) => O.map(
        (H) => H.id === P ? { ...H, comments: [...H.comments || [], { id: xt(), by: d, text: _, createdAt: Date.now() }] } : H
      )
    ),
    del: (P, _) => et(
      b,
      [],
      F,
      (O) => O.map((H) => H.id === P ? { ...H, comments: (H.comments || []).filter((B) => B.id !== _) } : H)
    )
  }), Ie = (b, F) => (P, _) => et(b, [], F, (O) => O.map((H) => H.id === P ? ni(H, _, d) : H)), Ln = Ie(G.plan, g), _n = Ie(G.wish, p), On = Ie(G.board, N), Na = ka(G.plan, g), Ca = ka(G.wish, p), Un = (b, F, P) => et(
    G.plan,
    [],
    g,
    (_) => F ? _.map((O) => O.id === F ? { ...O, ...b } : O) : [..._, { id: xt(), day: P, by: d, ...b }]
  ), Kn = (b) => et(G.plan, [], g, (F) => F.filter((P) => P.id !== b)), za = (b) => et(G.wish, [], p, (F) => [...F, { id: xt(), by: d, likes: [d], createdAt: Date.now(), ...b }]), Wn = (b) => et(
    G.wish,
    [],
    p,
    (F) => F.map(
      (P) => P.id === b ? { ...P, likes: P.likes.includes(d) ? P.likes.filter((_) => _ !== d) : [...P.likes, d] } : P
    )
  ), Ea = (b) => et(G.wish, [], p, (F) => F.filter((P) => P.id !== b)), Hn = (b, F) => et(G.wish, [], p, (P) => P.map((_) => _.id === b ? { ..._, ...F, editedAt: Date.now() } : _)), Yn = async (b, F) => {
    await et(G.plan, [], g, (P) => [
      ...P,
      {
        id: xt(),
        day: F,
        by: d,
        time: "",
        title: b.name,
        wishId: b.id,
        place: b.area || "",
        link: b.link || "",
        memo: b.memo || "",
        comments: b.comments || [],
        reactions: b.reactions || {},
        ...ut(b) ? { lat: b.lat, lng: b.lng } : {}
      }
    ]), s(F);
  }, Jn = (b, F) => et(
    G.spend,
    [],
    x,
    (P) => F ? P.map((_) => _.id === F ? { ..._, ...b, editedAt: Date.now(), editedBy: d } : _) : [...P, { id: xt(), by: d, createdAt: Date.now(), ...b }]
  ), Xn = (b) => et(G.spend, [], x, (F) => F.filter((P) => P.id !== b)), Vn = async ({ text: b, urls: F, photos: P }, _) => {
    for (let K of P.filter((V) => V.data)) {
      if (!await gt(oa(K.id), K.data)) return !1;
      Nt.set(K.id, K.data);
    }
    let O = P.map((K) => K.id), H = [], B = await et(G.board, [], N, (K) => _ ? K.map((V) => V.id !== _ ? V : (H = (V.photos || []).filter((ft) => !O.includes(ft)), { ...V, text: b, urls: F, photos: O, editedAt: Date.now() })) : [{ id: xt(), by: d, createdAt: Date.now(), text: b, urls: F, photos: O, likes: [], comments: [] }, ...K]);
    return B && H.forEach(Ha), B;
  }, Gn = async (b) => {
    let F = [];
    await et(G.board, [], N, (_) => (F = _.find((O) => O.id === b)?.photos || [], _.filter((O) => O.id !== b))) && F.forEach(Ha);
  }, qn = (b, F) => et(
    G.board,
    [],
    N,
    (P) => P.map(
      (_) => _.id === b ? { ..._, comments: [..._.comments || [], { id: xt(), by: d, text: F, createdAt: Date.now() }] } : _
    )
  ), Zn = (b, F) => et(
    G.board,
    [],
    N,
    (P) => P.map((_) => _.id === b ? { ..._, comments: (_.comments || []).filter((O) => O.id !== F) } : _)
  ), te, Pe = e && !n && window.storage && window.storage.isSynced && !window.storage.isSynced();
  if (!e || Pe)
    te = /* @__PURE__ */ o("div", { className: "jt-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ o("div", { className: "jt-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {})
      ] }),
      Pe ? "여행 정보 받는 중" : "앱 준비 중",
      Pe && T && /* @__PURE__ */ t("p", { className: "jt-loading-sub", children: "인터넷 연결이 느린 것 같아요. 연결되면 자동으로 열려요." })
    ] });
  else if (!n || E)
    te = /* @__PURE__ */ t(ri, { initial: n, onSave: Bn, onCancel: n ? () => k(!1) : null });
  else if (!d || !n.members.includes(d) || S) {
    let b = d && n.members.includes(d);
    te = /* @__PURE__ */ t(
      pi,
      {
        members: n.members,
        onPick: Tn,
        current: b ? d : null,
        onBack: b ? () => m(!1) : null
      }
    );
  } else {
    let b = mt(n.start, 0), F = mt(n.start, n.days - 1), P = Math.round((Mt(n.start) - Mt(ct(/* @__PURE__ */ new Date()))) / 864e5), _ = Math.round((Mt(ct(/* @__PURE__ */ new Date())) - Mt(n.start)) / 864e5), O = _ >= 0 && _ < n.days ? _ : c, H = X ? { ...n, rate: X.rate, fx: X } : n;
    un = H.rate, te = /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (pt ? " mini" : h === "plan" ? " tall" : ""), children: [
        !pt && /* @__PURE__ */ t(Vi, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => m(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(lt, { name: d, members: n.members, size: 24 }),
            d
          ] }),
          pt && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
            /* @__PURE__ */ t("span", { className: "jt-mini-name", children: n.title }),
            P > 0 && /* @__PURE__ */ o("em", { children: [
              "D-",
              P
            ] }),
            P === 0 && /* @__PURE__ */ t("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ o(
              "button",
              {
                className: "jt-icon light jt-locbtn" + (R ? " on" : ""),
                onClick: wa,
                "aria-pressed": R,
                "aria-label": R ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: R ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ t(It, { size: 19 }),
                  /* @__PURE__ */ t("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                className: "jt-icon light",
                onClick: Rn,
                "aria-label": pt ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !pt,
                children: pt ? /* @__PURE__ */ t(kt, { size: 20 }) : /* @__PURE__ */ t(pn, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => k(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t(uo, { size: 20 }) })
          ] })
        ] }),
        !pt && /* @__PURE__ */ o(rt, { children: [
          /* @__PURE__ */ t("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              b.getMonth() + 1,
              "월 ",
              b.getDate(),
              "일 – ",
              F.getMonth() + 1,
              "월 ",
              F.getDate(),
              "일"
            ] }),
            P > 0 && /* @__PURE__ */ o("span", { className: "jt-dday", children: [
              "출발까지 ",
              P,
              "일"
            ] }),
            P === 0 && /* @__PURE__ */ t("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      Y && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        Y,
        /* @__PURE__ */ t("button", { onClick: () => $(""), "aria-label": "닫기", children: /* @__PURE__ */ t(Jt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        h === "board" && /* @__PURE__ */ t(
          Bi,
          {
            settings: H,
            board: w,
            me: d,
            onEdit: (B) => U({ type: "post", item: B }),
            onLike: On,
            onComment: qn,
            onDelComment: Zn
          }
        ),
        h === "plan" && /* @__PURE__ */ t(
          xi,
          {
            settings: H,
            schedule: r,
            day: c,
            setDay: s,
            onEdit: (B) => U({ type: "plan", item: B, day: B.day }),
            onAddAt: (B, K) => U({ type: "plan", day: B, preset: { time: K, end: Ut(Math.min(Dt(K) + 60, 23 * 60 + 59)) } }),
            me: d,
            onComment: Na.add,
            onDelComment: Na.del,
            onReact: Ln
          }
        ),
        h === "wish" && /* @__PURE__ */ t(
          Fi,
          {
            settings: H,
            view: C.wish,
            setView: (B) => v((K) => ({ ...K, wish: B })),
            plan: r,
            wish: u,
            me: d,
            onEdit: (B) => U({ type: "wish", item: B }),
            onSave: za,
            onLike: Wn,
            onPlan: (B) => U({ type: "toPlan", wish: B }),
            onDelete: Ea,
            onComment: Ca.add,
            onDelComment: Ca.del,
            onReact: _n
          }
        ),
        h === "spend" && /* @__PURE__ */ t(
          Ii,
          {
            settings: H,
            spend: l,
            me: d,
            view: C.spend,
            setView: (B) => v((K) => ({ ...K, spend: B })),
            onEdit: (B) => U({ type: "spend", item: B })
          }
        ),
        h === "chat" && /* @__PURE__ */ t(
          Hi,
          {
            settings: H,
            me: d,
            msgs: fe,
            reads: ga,
            notice: Se,
            onEdit: Sn,
            onPin: Fn,
            onUnpin: ya,
            badgeAsk: ha === "default",
            onBadgeAsk: $n,
            onSend: (B) => ja({ kind: "text", text: B }),
            onDelete: Dn,
            onSendLoc: In
          }
        ),
        h === "family" && /* @__PURE__ */ t(
          Ui,
          {
            settings: H,
            me: d,
            locs: me,
            shareOn: R,
            onToggle: wa,
            myPos: Gt,
            geoErr: qt
          }
        )
      ] }),
      (() => {
        let B = {
          board: ["글쓰기", () => U({ type: "post" })],
          plan: [`${c + 1}일차 일정 추가`, () => U({ type: "plan", day: c })],
          wish: ["가고 싶은 곳 추가", () => U({ type: "wish" })],
          spend: ["경비 추가", () => U({ type: "spend" })]
        }[h];
        return B ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: B[1], children: [
          /* @__PURE__ */ t(po, { size: 20, strokeWidth: 2.6 }),
          B[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["board", "공지", dn],
        ["plan", "일정", fo],
        ["wish", "가고 싶은 곳", na],
        ["spend", "경비", go],
        ["family", "위치 공유", yo],
        ["chat", "채팅", ko]
      ].map(([B, K, V]) => /* @__PURE__ */ o("button", { className: h === B ? "on" : "", onClick: () => z(B), "aria-current": h === B, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(V, { size: 21 }),
          B === "chat" && At > 0 && h !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${At}개`, children: At > 99 ? "99+" : At })
        ] }),
        K
      ] }, B)) }),
      f?.type === "plan" && /* @__PURE__ */ t(St, { title: f.item ? "일정 수정" : `${f.day + 1}일차 일정 추가`, onClose: ot, children: /* @__PURE__ */ t(
        di,
        {
          initial: f.item,
          preset: f.preset,
          gkey: n.gmapsKey,
          dayItems: r.filter((B) => B.day === f.day && B.id !== f.item?.id),
          onSave: (B) => {
            Un(B, f.item?.id, f.day), ot();
          },
          onDelete: () => {
            Kn(f.item.id), ot();
          }
        }
      ) }),
      f?.type === "wish" && /* @__PURE__ */ t(St, { title: f.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: ot, children: /* @__PURE__ */ t(
        mi,
        {
          initial: f.item,
          onSave: (B) => {
            f.item ? Hn(f.item.id, B) : za(B), ot();
          },
          onDelete: () => {
            Ea(f.item.id), ot();
          }
        }
      ) }),
      f?.type === "spend" && /* @__PURE__ */ t(St, { title: f.item ? "경비 수정" : "경비 기록", onClose: ot, children: /* @__PURE__ */ t(
        ui,
        {
          settings: H,
          me: d,
          defaultDay: O,
          initial: f.item,
          onSave: (B) => {
            Jn(B, f.item?.id), ot();
          },
          onDelete: () => {
            Xn(f.item.id), ot();
          }
        }
      ) }),
      f?.type === "post" && /* @__PURE__ */ t(St, { title: f.item ? "글 수정" : "새 글", onClose: ot, children: /* @__PURE__ */ t(
        Ri,
        {
          initial: f.item,
          onSave: async (B) => {
            let K = await Vn(B, f.item?.id);
            return K && ot(), K;
          },
          onDelete: () => {
            Gn(f.item.id), ot();
