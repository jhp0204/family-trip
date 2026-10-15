}, i = async () => {
    l(!0), await b(), l(!1);
  }, x = "", k = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    m === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ e("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    p && /* @__PURE__ */ o("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ e("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: d, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ e("ol", { className: "jt-msgs", children: n.map((S) => {
      let C = tr(S.at), R = C !== x, w = S.by === a, M = !R && k && k.by === S.by && S.at - k.at < 5 * 6e4;
      return x = C, k = S, /* @__PURE__ */ o(wn.Fragment, { children: [
        R && /* @__PURE__ */ e("li", { className: "jt-daysep", "aria-label": C, children: /* @__PURE__ */ e("span", { children: C }) }),
        /* @__PURE__ */ o("li", { className: "jt-msg" + (w ? " mine" : "") + (M ? " cont" : ""), children: [
          !w && /* @__PURE__ */ e("span", { className: "jt-msg-av", children: !M && /* @__PURE__ */ e(rt, { name: S.by, members: h, size: 30 }) }),
          /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
            !w && !M && /* @__PURE__ */ e("span", { className: "jt-msg-name", children: S.by }),
            /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "jt-bubble" + (S.kind === "loc" ? " loc" : ""),
                  onClick: () => w && A(c === S.id ? null : S.id),
                  "aria-label": w ? "내 메시지, 누르면 삭제 메뉴" : void 0,
                  children: S.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                    /* @__PURE__ */ e(Nt, { size: 16 }),
                    w ? "내 위치를 보냈어요" : `${S.by}의 현재 위치`
                  ] }) : /* @__PURE__ */ e("span", { className: "jt-msg-text", children: er(S.text) })
                }
              ),
              /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                (() => {
                  let _ = h.filter((O) => O !== S.by && (r[O] || 0) < S.at);
                  return _.length > 0 ? /* @__PURE__ */ e("b", { className: "jt-unread", title: `안 읽음: ${_.join(", ")}`, "aria-label": `${_.length}명 안 읽음`, children: _.length }) : null;
                })(),
                /* @__PURE__ */ e("time", { className: "jt-msg-time", children: Qo(S.at) })
              ] })
            ] }),
            S.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
              /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt({ lat: S.lat, lng: S.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(Et, { size: 13 }),
                "지도에서 보기"
              ] }),
              !w && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Wa(S), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(Ct, { size: 13 }),
                "길 찾기"
              ] })
            ] }),
            w && c === S.id && /* @__PURE__ */ e("div", { className: "jt-msg-del", children: /* @__PURE__ */ e(
              xt,
              {
                onConfirm: () => {
                  j(S), A(null);
                },
                label: "메시지 삭제"
              }
            ) })
          ] })
        ] })
      ] }, S.id);
    }) }),
    /* @__PURE__ */ e("div", { ref: u }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ e("button", { type: "button", className: "jt-chat-loc", onClick: i, disabled: g, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ e(Nt, { size: 20 }) }),
      /* @__PURE__ */ e(
        "textarea",
        {
          rows: 1,
          value: v,
          onChange: (S) => E(S.target.value),
          onKeyDown: (S) => {
            S.key === "Enter" && !S.shiftKey && !S.nativeEvent.isComposing && (S.preventDefault(), N());
          },
          placeholder: g ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: N, disabled: !v.trim(), "aria-label": "보내기", children: /* @__PURE__ */ e(Da, { size: 18 }) })
    ] })
  ] });
}
var St = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], nr = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", or = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), rr = 7e3;
function ir() {
  let [t, a] = z(0), [n, r] = z({}), s = Y(n);
  if (s.current = n, W(() => {
    let p = setInterval(() => {
      a((d) => {
        let h = d;
        for (let v = 0; v < St.length && (h = (h + 1) % St.length, !!s.current[h]); v++)
          ;
        return h;
      });
    }, rr);
    return () => clearInterval(p);
  }, []), St.every((p, d) => n[d])) return null;
  let b = St[t];
  return /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      St.map((p, d) => /* @__PURE__ */ e(
        "img",
        {
          src: nr(p.f),
          alt: "",
          className: d === t ? "on" : "",
          style: { objectPosition: p.pos },
          loading: d === 0 ? "eager" : "lazy",
          onError: () => r((h) => ({ ...h, [d]: !0 }))
        },
        p.f
      )),
      /* @__PURE__ */ e("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: St.map((p, d) => /* @__PURE__ */ e("i", { className: d === t ? "on" : "" }, p.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: or(b.f), target: "_blank", rel: "noopener noreferrer", children: [
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
function Ue() {
  let [t, a] = z(!1), [n, r] = z(null), [s, j] = z([]), [b, p] = z([]), [d, h] = z([]), [v, E] = z([]), [c, A] = z(null), [g, l] = z("plan"), [u, I] = z(0), [m, N] = z(!1), [i, x] = z(null), [k, S] = z(""), C = Y(!1), [R, w] = z(null), [M, _] = z(!1), [O, X] = z({}), [U, y] = z(!1), [K, G] = z(null), [nt, jt] = z("");
  W(() => {
    (async () => {
      try {
        let f = await window.storage.get("hdr", !1);
        f && f.value === "min" && _(!0);
      } catch {
      }
      try {
        let f = await window.storage.get("locshare", !1);
        f && f.value === "on" && y(!0), (!f || !f.value) && de(!0);
      } catch {
        de(!0);
      }
    })();
  }, []);
  let [pe, de] = z(!1), [Zt, Qt] = z([]), [We, He] = z(0), [Ye, Je] = z({}), [qe, Ge] = z(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  W(() => {
    (async () => {
      try {
        let f = await window.storage.get("chatread", !1);
        f && f.value && He(Number(f.value) || 0);
      } catch {
      }
    })();
  }, []);
  let Xe = async (f) => {
    let F = { id: st(), by: c, at: Date.now(), ...f }, D = Ia(F);
    Qt((T) => [...T, { ...F, key: D, pending: !0 }]), await gt(D, F) || (Qt((T) => T.filter((L) => L.id !== F.id)), Tt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, Ja = async (f) => {
    Qt((F) => F.filter((D) => D.id !== f.id));
    try {
      await window.storage.delete(f.key || Ia(f), !0);
    } catch {
    }
  }, qa = async () => {
    let f = K;
    if (f || (f = await new Promise((F) => {
      if (!navigator.geolocation) return F(null);
      navigator.geolocation.getCurrentPosition(
        (D) => F({ lat: D.coords.latitude, lng: D.coords.longitude }),
        () => F(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !f) {
      Tt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await Xe({ kind: "loc", lat: f.lat, lng: f.lng, text: "" });
  }, te = Zt.reduce((f, F) => F.by !== c && F.at > f ? F.at : f, 0), Lt = Zt.reduce((f, F) => F.at > f ? F.at : f, 0), vt = Zt.filter((f) => f.by !== c && f.at > We).length, [Ve, Ga] = z(() => document.visibilityState === "visible");
  W(() => {
    let f = () => Ga(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", f), () => document.removeEventListener("visibilitychange", f);
  }, []), W(() => {
    if (!(g !== "chat" || !Ve || !c || !Lt)) {
      if (te > We) {
        He(te);
        try {
          window.storage.set("chatread", String(te), !1);
        } catch {
        }
      }
      (Ye[c] || 0) < Lt && (Je((f) => ({ ...f, [c]: Lt })), gt(Me + encodeURIComponent(c), { at: Lt }));
    }
  }, [g, Ve, Lt, te, c]), W(() => {
    if ("setAppBadge" in navigator)
      try {
        vt > 0 ? navigator.setAppBadge(vt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [vt, qe]);
  let Xa = async () => {
    try {
      let f = await Notification.requestPermission();
      Ge(f), Tt(f === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      Ge("denied");
    }
  }, [ee, Tt] = z("");
  W(() => {
    if (!ee) return;
    let f = setTimeout(() => Tt(""), 2600);
    return () => clearTimeout(f);
  }, [ee]);
  let ae = (f, F) => {
    y(f), de(!1), f || jt(""), F || Tt(f ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", f ? "on" : "off", !1);
    } catch {
    }
  }, Ze = () => ae(!U);
  W(() => {
    if (!U || !c || !n) return;
    let f = Ee + encodeURIComponent(c), F = null, D = null, $ = 0, T = (ot) => {
      D = ot, $ = Date.now(), G(ot), gt(f, { ...ot, at: Date.now(), online: !0 });
    }, L = () => {
      if (F == null) {
        if (!navigator.geolocation) {
          jt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        F = navigator.geolocation.watchPosition(
          (ot) => {
            let ue = { lat: ot.coords.latitude, lng: ot.coords.longitude, acc: Math.round(ot.coords.accuracy) };
            jt(""), !D || ce(D, ue) > 25 || Date.now() - $ > 6e4 ? T(ue) : G(ue);
          },
          (ot) => jt(
            ot.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, P = (ot) => {
      F != null && navigator.geolocation.clearWatch(F), F = null, ot && gt(f, { online: !1, at: Date.now() });
    }, B = () => document.visibilityState === "visible" ? L() : P(!0), J = () => P(!0), Ot = setInterval(() => {
      document.visibilityState === "visible" && D && T(D);
    }, 6e4);
    return document.visibilityState === "visible" && L(), document.addEventListener("visibilitychange", B), window.addEventListener("pagehide", J), () => {
      clearInterval(Ot), document.removeEventListener("visibilitychange", B), window.removeEventListener("pagehide", J), P(!0);
    };
  }, [U, c, !!n]);
  let Va = () => {
    let f = !M;
    _(f);
    try {
      window.storage.set("hdr", f ? "min" : "max", !1);
    } catch {
    }
  };
  W(() => {
    let f = !0, F = async () => {
      let $ = await fo();
      if (f)
        if ($) {
          let T = { ...$, at: Date.now() };
          w(T), gt(H.fx, T);
        } else {
          let T = await lt(H.fx, null);
          f && T && T.rate > 0 && w({ ...T, cached: !0 });
        }
    };
    F();
    let D = setInterval(F, 3 * 36e5);
    return () => {
      f = !1, clearInterval(D);
    };
  }, []);
  let ne = kn(async () => {
    let [f, F, D, $, T] = await Promise.all([
      lt(H.settings, null),
      lt(H.plan, []),
      lt(H.wish, []),
      lt(H.spend, []),
      lt(H.board, [])
    ]);
    r(f), j(F), p(D), h($), E(T);
    try {
      let L = {};
      (await Ce(Ee)).forEach(([P, B]) => L[decodeURIComponent(P.slice(Ee.length))] = B), X(L);
    } catch {
    }
    try {
      let L = (await Ce(Ha)).map(([P, B]) => ({ ...B, key: P }));
      L.sort((P, B) => P.at - B.at), Qt((P) => {
        let B = P.filter((J) => J.pending && !L.some((Ot) => Ot.id === J.id));
        return [...L, ...B];
      });
    } catch {
    }
    try {
      let L = {};
      (await Ce(Me)).forEach(([P, B]) => L[decodeURIComponent(P.slice(Me.length))] = B.at || 0), Je((P) => {
        let B = { ...L };
        return Object.keys(P).forEach((J) => B[J] = Math.max(B[J] || 0, P[J] || 0)), B;
      });
    } catch {
    }
    a(!0);
  }, []);
  W(() => {
    (async () => {
      try {
        let D = await window.storage.get("me", !1);
        D && D.value && A(D.value);
      } catch {
      }
      await ne();
    })();
    let f = window.storage.onChange ? window.storage.onChange(ne) : null, F = setInterval(ne, f ? 6e4 : 1e4);
    return () => {
      clearInterval(F), f && f();
    };
  }, [ne]), W(() => {
    if (!n || C.current) return;
    C.current = !0;
    let f = Math.round((yt(pt(/* @__PURE__ */ new Date())) - yt(n.start)) / 864e5);
    f >= 0 && f < n.days && I(f);
  }, [n]);
  let Z = async (f, F, D, $) => {
    let T = await lt(f, F), L = $(T);
    D(L);
    let P = await gt(f, L);
    return P || S("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), P;
  }, Za = async (f) => {
    A(f);
    try {
      await window.storage.set("me", f, !1);
    } catch {
    }
  }, Qa = async (f) => {
    r(f), N(!1), await gt(H.settings, f) || S("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), c && !f.members.includes(c) && A(null);
  }, tt = () => x(null), Qe = (f, F) => ({
    add: (D, $) => Z(
      f,
      [],
      F,
      (T) => T.map(
        (L) => L.id === D ? { ...L, comments: [...L.comments || [], { id: st(), by: c, text: $, createdAt: Date.now() }] } : L
      )
    ),
    del: (D, $) => Z(
      f,
      [],
      F,
      (T) => T.map((L) => L.id === D ? { ...L, comments: (L.comments || []).filter((P) => P.id !== $) } : L)
    )
  }), me = (f, F, D = !1) => ($, T) => Z(f, [], F, (L) => L.map((P) => P.id === $ ? ho(P, T, c, D) : P)), tn = me(H.plan, j), en = me(H.wish, p), mr = me(H.board, E, !0), ta = Qe(H.plan, j), ea = Qe(H.wish, p), an = (f, F, D) => Z(
    H.plan,
    [],
    j,
    ($) => F ? $.map((T) => T.id === F ? { ...T, ...f } : T) : [...$, { id: st(), day: D, by: c, ...f }]
  ), nn = (f) => Z(H.plan, [], j, (F) => F.filter((D) => D.id !== f)), aa = (f) => Z(H.wish, [], p, (F) => [...F, { id: st(), by: c, likes: [c], createdAt: Date.now(), ...f }]), on = (f) => Z(
    H.wish,
    [],
    p,
    (F) => F.map(
      (D) => D.id === f ? { ...D, likes: D.likes.includes(c) ? D.likes.filter(($) => $ !== c) : [...D.likes, c] } : D
    )
  ), na = (f) => Z(H.wish, [], p, (F) => F.filter((D) => D.id !== f)), rn = (f, F) => Z(H.wish, [], p, (D) => D.map(($) => $.id === f ? { ...$, ...F, editedAt: Date.now() } : $)), sn = async (f, F) => {
    await Z(H.plan, [], j, (D) => [
      ...D,
      {
        id: st(),
        day: F,
        by: c,
        time: "",
        title: f.name,
        place: f.area || "",
        link: f.link || "",
        memo: f.memo || "",
        comments: f.comments || [],
        reactions: f.reactions || {},
        ...ht(f) ? { lat: f.lat, lng: f.lng } : {}
      }
    ]), await Z(H.wish, [], p, (D) => D.map(($) => $.id === f.id ? { ...$, planned: F } : $)), I(F);
  }, ln = (f, F) => Z(
    H.spend,
    [],
    h,
    (D) => F ? D.map(($) => $.id === F ? { ...$, ...f, editedAt: Date.now(), editedBy: c } : $) : [...D, { id: st(), by: c, createdAt: Date.now(), ...f }]
  ), cn = (f) => Z(H.spend, [], h, (F) => F.filter((D) => D.id !== f)), pn = async ({ text: f, urls: F, photos: D }, $) => {
    for (let B of D.filter((J) => J.data)) {
      if (!await gt($e(B.id), B.data)) return !1;
      bt.set(B.id, B.data);
    }
    let T = D.map((B) => B.id), L = [], P = await Z(H.board, [], E, (B) => $ ? B.map((J) => J.id !== $ ? J : (L = (J.photos || []).filter((Ot) => !T.includes(Ot)), { ...J, text: f, urls: F, photos: T, editedAt: Date.now() })) : [{ id: st(), by: c, createdAt: Date.now(), text: f, urls: F, photos: T, likes: [], comments: [] }, ...B]);
    return P && L.forEach(va), P;
  }, dn = async (f) => {
    let F = [];
    await Z(H.board, [], E, ($) => (F = $.find((T) => T.id === f)?.photos || [], $.filter((T) => T.id !== f))) && F.forEach(va);
  }, ur = (f) => Z(
    H.board,
    [],
    E,
    (F) => F.map((D) => {
      if (D.id !== f) return D;
      let $ = D.likes || [];
      return { ...D, likes: $.includes(c) ? $.filter((T) => T !== c) : [...$, c] };
    })
  ), gr = (f, F) => Z(
    H.board,
    [],
    E,
    (D) => D.map(
      ($) => $.id === f ? { ...$, comments: [...$.comments || [], { id: st(), by: c, text: F, createdAt: Date.now() }] } : $
    )
  ), fr = (f, F) => Z(
    H.board,
    [],
    E,
    (D) => D.map(($) => $.id === f ? { ...$, comments: ($.comments || []).filter((T) => T.id !== F) } : $)
  ), Bt;
  if (!t)
    Bt = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || m)
    Bt = /* @__PURE__ */ e(jo, { initial: n, onSave: Qa, onCancel: n ? () => N(!1) : null });
  else if (!c || !n.members.includes(c))
    Bt = /* @__PURE__ */ e(yo, { members: n.members, onPick: Za });
  else {
    let f = dt(n.start, 0), F = dt(n.start, n.days - 1), D = Math.round((yt(n.start) - yt(pt(/* @__PURE__ */ new Date()))) / 864e5), $ = Math.round((yt(pt(/* @__PURE__ */ new Date())) - yt(n.start)) / 864e5), T = $ >= 0 && $ < n.days ? $ : u, L = R ? { ...n, rate: R.rate, fx: R } : n;
    Bt = /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (M ? " mini" : g === "plan" ? " tall" : ""), children: [
        !M && /* @__PURE__ */ e(ir, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => A(null), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(rt, { name: c, members: n.members, size: 24 }),
            c
          ] }),
          M && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
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
                className: "jt-icon light jt-locbtn" + (U ? " on" : ""),
                onClick: Ze,
                "aria-pressed": U,
                "aria-label": U ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: U ? "위치 공유 켜짐" : "위치 공유 꺼짐",
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
                onClick: Va,
                "aria-label": M ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !M,
                children: M ? /* @__PURE__ */ e(Pn, { size: 20 }) : /* @__PURE__ */ e($n, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => N(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(zn, { size: 20 }) })
          ] })
        ] }),
        !M && /* @__PURE__ */ o(ct, { children: [
          /* @__PURE__ */ e("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              f.getMonth() + 1,
              "월 ",
              f.getDate(),
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
        g === "plan" && /* @__PURE__ */ e(
          So,
          {
            settings: L,
            schedule: s,
            day: u,
            setDay: I,
            onAdd: () => x({ type: "plan", day: u }),
            onEdit: (P) => x({ type: "plan", item: P, day: P.day }),
            onAddAt: (P, B) => x({ type: "plan", day: P, preset: { time: B, end: It(Math.min(kt(B) + 60, 23 * 60 + 59)) } }),
            me: c,
            onComment: ta.add,
            onDelComment: ta.del,
            onReact: tn
          }
        ),
        g === "wish" && /* @__PURE__ */ e(
          Ho,
          {
            settings: L,
            wish: b,
            me: c,
            onAdd: () => x({ type: "wish" }),
            onEdit: (P) => x({ type: "wish", item: P }),
            onSave: aa,
            onLike: on,
            onPlan: (P) => x({ type: "toPlan", wish: P }),
            onDelete: na,
            onComment: ea.add,
            onDelComment: ea.del,
            onReact: en
          }
        ),
        g === "spend" && /* @__PURE__ */ e(
          qo,
          {
            settings: L,
            spend: d,
            me: c,
            onEdit: (P) => x({ type: "spend", item: P })
          }
        ),
        g === "chat" && /* @__PURE__ */ e(
          ar,
          {
            settings: L,
            me: c,
            msgs: Zt,
            reads: Ye,
            badgeAsk: qe === "default",
            onBadgeAsk: Xa,
            onSend: (P) => Xe({ kind: "text", text: P }),
            onDelete: Ja,
            onSendLoc: qa
          }
        ),
        g === "family" && /* @__PURE__ */ e(
          Zo,
          {
            settings: L,
            me: c,
            locs: O,
            shareOn: U,
            onToggle: Ze,
            myPos: K,
            geoErr: nt
          }
        )
      ] }),
      (() => {
        let P = {
          plan: [`${u + 1}일차 일정 추가`, () => x({ type: "plan", day: u })],
          wish: ["가고 싶은 곳 추가", () => x({ type: "wish" })],
          spend: ["경비 추가", () => x({ type: "spend" })]
        }[g];
        return P ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: P[1], children: [
          /* @__PURE__ */ e(Nn, { size: 20, strokeWidth: 2.6 }),
          P[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", En],
        ["wish", "가고 싶은 곳", Pe],
        ["spend", "경비", Mn],
        ["family", "위치 공유", Rn],
        ["chat", "채팅", Tn]
      ].map(([P, B, J]) => /* @__PURE__ */ o("button", { className: g === P ? "on" : "", onClick: () => l(P), "aria-current": g === P, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ e(J, { size: 21 }),
          P === "chat" && vt > 0 && g !== "chat" && /* @__PURE__ */ e("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${vt}개`, children: vt > 99 ? "99+" : vt })
        ] }),
        B
      ] }, P)) }),
      i?.type === "plan" && /* @__PURE__ */ e(wt, { title: i.item ? "일정 수정" : `${i.day + 1}일차 일정 추가`, onClose: tt, children: /* @__PURE__ */ e(
        wo,
        {
          initial: i.item,
          preset: i.preset,
          gkey: n.gmapsKey,
          dayItems: s.filter((P) => P.day === i.day && P.id !== i.item?.id),
          onSave: (P) => {
            an(P, i.item?.id, i.day), tt();
          },
          onDelete: () => {
            nn(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "wish" && /* @__PURE__ */ e(wt, { title: i.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: tt, children: /* @__PURE__ */ e(
        ko,
        {
          initial: i.item,
          onSave: (P) => {
            i.item ? rn(i.item.id, P) : aa(P), tt();
          },
          onDelete: () => {
            na(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "spend" && /* @__PURE__ */ e(wt, { title: i.item ? "경비 수정" : "경비 기록", onClose: tt, children: /* @__PURE__ */ e(
        No,
        {
          settings: L,
          me: c,
          defaultDay: T,
          initial: i.item,
          onSave: (P) => {
            ln(P, i.item?.id), tt();
          },
          onDelete: () => {
            cn(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "post" && /* @__PURE__ */ e(wt, { title: i.item ? "글 수정" : "새 글", onClose: tt, children: /* @__PURE__ */ e(
        Co,
        {
          initial: i.item,
          onSave: async (P) => {
            let B = await pn(P, i.item?.id);
            return B && tt(), B;
          },
          onDelete: () => {
            dn(i.item.id), tt();
          }
        }
      ) }),
      pe && !i && /* @__PURE__ */ e(wt, { title: "가족과 위치를 공유할까요?", onClose: () => ae(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
        /* @__PURE__ */ o("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ e("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ e("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ e("button", { className: "jt-primary", onClick: () => ae(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: () => ae(!1, !0), children: "나중에 할게요" })
      ] }) }),
      ee && /* @__PURE__ */ e("div", { className: "jt-toast", role: "status", children: ee }),
      i?.type === "toPlan" && /* @__PURE__ */ e(wt, { title: `"${i.wish.name}" 몇째 날에 갈까요?`, onClose: tt, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (P, B) => {
        let J = dt(n.start, B);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": Q[B % Q.length] },
            onClick: () => {
              sn(i.wish, B), tt(), l("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: B + 1 }),
              B + 1,
              "일차 ",
              qt(J),
              " (",
              $t(J),
              ")"
            ]
          },
          B
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: Ke }),
    Bt
  ] });
}
var Ke = `
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
