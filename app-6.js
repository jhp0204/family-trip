let at = ts($.at), Vt = at !== me, ut = $.by === n, Zt = !Vt && Lt && Lt.by === $.by && $.at - Lt.at < 5 * 6e4;
      return me = at, Lt = $, /* @__PURE__ */ a(uo.Fragment, { children: [
        Vt && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": at, children: /* @__PURE__ */ t("span", { children: at }) }),
        /* @__PURE__ */ a(
          "li",
          {
            id: "msg-" + $.id,
            className: "jt-msg" + (ut ? " mine" : "") + (Zt ? " cont" : "") + (F === $.id ? " flash" : ""),
            children: [
              !ut && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !Zt && /* @__PURE__ */ t(pt, { name: $.by, members: I, size: 30 }) }),
              /* @__PURE__ */ a("div", { className: "jt-msg-col", children: [
                !ut && !Zt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: $.by }),
                /* @__PURE__ */ a("div", { className: "jt-msg-row", children: [
                  l === $.id ? /* @__PURE__ */ a("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: E,
                        onChange: (tt) => N(tt.target.value),
                        onKeyDown: (tt) => {
                          tt.key === "Enter" && !tt.shiftKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), R($)), tt.key === "Escape" && S(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ a("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => S(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => R($), disabled: !E.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + ($.kind === "loc" ? " loc" : "") + (s && s.id === $.id ? " pinned" : ""),
                      onClick: () => y(w === $.id ? null : $.id),
                      "aria-label": ut ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": w === $.id,
                      children: $.kind === "loc" ? /* @__PURE__ */ a("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(Et, { size: 16 }),
                        ut ? "내 위치를 보냈어요" : `${$.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: la($.text) })
                    }
                  ),
                  /* @__PURE__ */ a("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let tt = I.filter((ue) => ue !== $.by && (i[ue] || 0) < $.at);
                      return tt.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${tt.join(", ")}`, "aria-label": `${tt.length}명 안 읽음`, children: tt.length }) : null;
                    })(),
                    /* @__PURE__ */ a("time", { className: "jt-msg-time", children: [
                      $.editedAt ? "수정됨 " : "",
                      Qi($.at)
                    ] })
                  ] })
                ] }),
                $.kind === "loc" && /* @__PURE__ */ a("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ a("a", { className: "jt-maplink", href: Tt({ lat: $.lat, lng: $.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Bt, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !ut && /* @__PURE__ */ a("a", { className: "jt-maplink", href: Ma($), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(At, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                w === $.id && l !== $.id && /* @__PURE__ */ a("div", { className: "jt-msg-menu", children: [
                  s && s.id === $.id ? /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        x(), y(null);
                      },
                      children: [
                        /* @__PURE__ */ t(On, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        r($), y(null), B(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(Io, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  ut && $.kind !== "loc" && /* @__PURE__ */ a("button", { type: "button", className: "jt-like", onClick: () => G($), children: [
                    /* @__PURE__ */ t(Xt, { size: 14 }),
                    "수정"
                  ] }),
                  ut && /* @__PURE__ */ t(
                    It,
                    {
                      onConfirm: () => {
                        u($), y(null);
                      },
                      label: "삭제"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] }, $.id);
    }) }),
    /* @__PURE__ */ t("div", { ref: h }),
    /* @__PURE__ */ a("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: de, disabled: C, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(Et, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: g,
          onChange: ($) => A($.target.value),
          onKeyDown: ($) => {
            $.key === "Enter" && !$.shiftKey && !$.nativeEvent.isComposing && ($.preventDefault(), Z());
          },
          placeholder: C ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: Z, disabled: !g.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(pa, { size: 18 }) })
    ] })
  ] });
}
var Ut = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Kinkaku-ji in November 2016 -02.jpg", t: "교토 금각사", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 50%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Torii path with lantern at Fushimi Inari Taisha Shrine, Kyoto, Japan.jpg", t: "교토 후시미 이나리 신사", by: "Basile Morin", lic: "CC BY-SA", pos: "50% 45%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], ns = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", as = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), os = 7e3;
function is() {
  let [e, n] = j(0), [o, i] = j({}), s = J(o);
  if (s.current = o, K(() => {
    let p = setInterval(() => {
      n((r) => {
        let x = r;
        for (let k = 0; k < Ut.length && (x = (x + 1) % Ut.length, !!s.current[x]); k++)
          ;
        return x;
      });
    }, os);
    return () => clearInterval(p);
  }, []), Ut.every((p, r) => o[r])) return null;
  let u = Ut[e];
  return /* @__PURE__ */ a(st, { children: [
    /* @__PURE__ */ a("div", { className: "jt-hero", "aria-hidden": "true", children: [
      Ut.map((p, r) => /* @__PURE__ */ t(
        "img",
        {
          src: ns(p.f),
          alt: "",
          className: r === e ? "on" : "",
          style: { objectPosition: p.pos },
          loading: r === 0 ? "eager" : "lazy",
          onError: () => i((x) => ({ ...x, [r]: !0 }))
        },
        p.f
      )),
      /* @__PURE__ */ t("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ t("div", { className: "jt-hero-dots", "aria-hidden": "true", children: Ut.map((p, r) => /* @__PURE__ */ t("i", { className: r === e ? "on" : "" }, p.f)) }),
      /* @__PURE__ */ a("a", { className: "jt-hero-cap", href: as(u.f), target: "_blank", rel: "noopener noreferrer", children: [
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
function un() {
  let [e, n] = j(!1), [o, i] = j(null), [s, m] = j([]), [u, p] = j([]), [r, x] = j([]), [k, z] = j([]), [c, I] = j(null), [g, A] = j("plan"), [w, y] = j({ wish: "list", spend: "me" }), C = J(!1), [d, l] = j(0), [S, E] = j(!1), [N, f] = j(!1), [B, F] = j(!1);
  K(() => {
    let b = setTimeout(() => F(!0), 8e3);
    return () => clearTimeout(b);
  }, []);
  let v = J(null), _ = J(!1), [M, W] = j(null), [G, R] = j(""), h = J(!1), [H, lt] = j(null), [Z, de] = j(!1), [me, Lt] = j({}), [$, at] = j(!1), [Vt, ut] = j(null), [Zt, tt] = j("");
  K(() => {
    (async () => {
      try {
        let b = await window.storage.get("hdr", !1);
        b && b.value === "min" && de(!0);
      } catch {
      }
      try {
        let b = await window.storage.get("locshare", !1);
        b && b.value === "on" && at(!0), (!b || !b.value) && Se(!0);
      } catch {
        Se(!0);
      }
    })();
  }, []);
  let [ue, Se] = j(!1), [fe, Qt] = j([]), [Me, Ie] = j(null), [gn, hn] = j(0), [bn, xn] = j({}), [jn, yn] = j(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  K(() => {
    (async () => {
      try {
        let b = await window.storage.get("chatread", !1);
        b && b.value && hn(Number(b.value) || 0);
      } catch {
      }
    })();
  }, []);
  let vn = async (b) => {
    let D = { id: yt(), by: c, at: Date.now(), ...b }, P = Ze(D);
    Qt((O) => [...O, { ...D, key: P, pending: !0 }]), await ht(P, D) || (Qt((O) => O.filter((Y) => Y.id !== D.id)), jt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, Fa = async (b, D) => {
    let P = { id: b.id, by: b.by, at: b.at, kind: b.kind, text: D, editedAt: Date.now() };
    Qt((O) => O.map((Y) => Y.id === b.id ? { ...Y, text: D, editedAt: P.editedAt } : Y)), await ht(b.key || Ze(b), P) || jt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, Pa = async (b) => {
    let D = { id: b.id, by: b.by, kind: b.kind || "text", text: b.text || "", lat: b.lat, lng: b.lng, pinnedBy: c, pinnedAt: Date.now() };
    Ie(D);
    let P = await ht(X.notice, D);
    jt(P ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, wn = async () => {
    Ie(null);
    try {
      await window.storage.delete(X.notice, !0);
    } catch {
    }
    jt("공지를 해제했어요.");
  }, $a = async (b) => {
    Me && Me.id === b.id && wn(), Qt((D) => D.filter((P) => P.id !== b.id));
    try {
      await window.storage.delete(b.key || Ze(b), !0);
    } catch {
    }
  }, Ra = async () => {
    let b = Vt;
    if (b || (b = await new Promise((D) => {
      if (!navigator.geolocation) return D(null);
      navigator.geolocation.getCurrentPosition(
        (P) => D({ lat: P.coords.latitude, lng: P.coords.longitude }),
        () => D(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !b) {
      jt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await vn({ kind: "loc", lat: b.lat, lng: b.lng, text: "" });
  }, ge = fe.reduce((b, D) => D.by !== c && D.at > b ? D.at : b, 0), te = fe.reduce((b, D) => D.at > b ? D.at : b, 0), Dt = fe.filter((b) => b.by !== c && b.at > gn).length, [kn, Ta] = j(() => document.visibilityState === "visible");
  K(() => {
    let b = () => Ta(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", b), () => document.removeEventListener("visibilitychange", b);
  }, []), K(() => {
    if (!(g !== "chat" || !kn || !c || !te)) {
      if (ge > gn) {
        hn(ge);
        try {
          window.storage.set("chatread", String(ge), !1);
        } catch {
        }
      }
      (bn[c] || 0) < te && (xn((b) => ({ ...b, [c]: te })), ht(Ve + encodeURIComponent(c), { at: te }));
    }
  }, [g, kn, te, ge, c]), K(() => {
    if ("setAppBadge" in navigator)
      try {
        Dt > 0 ? navigator.setAppBadge(Dt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [Dt, jn]);
  let Ba = async () => {
    try {
      let b = await Notification.requestPermission();
      yn(b), jt(b === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      yn("denied");
    }
  }, [he, jt] = j("");
  K(() => {
    if (!he) return;
    let b = setTimeout(() => jt(""), 2600);
    return () => clearTimeout(b);
  }, [he]);
  let be = (b, D) => {
    at(b), Se(!1), b || tt(""), D || jt(b ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", b ? "on" : "off", !1);
    } catch {
    }
  }, Nn = () => be(!$);
  K(() => {
    if (!$ || !c || !o) return;
    let b = qe + encodeURIComponent(c), D = null, P = null, L = 0, O = (ct) => {
      P = ct, L = Date.now(), ut(ct), ht(b, { ...ct, at: Date.now(), online: !0 });
    }, Y = () => {
      if (D == null) {
        if (!navigator.geolocation) {
          tt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        D = navigator.geolocation.watchPosition(
          (ct) => {
            let $e = { lat: ct.coords.latitude, lng: ct.coords.longitude, acc: Math.round(ct.coords.accuracy) };
            tt(""), !P || Jt(P, $e) > 25 || Date.now() - L > 6e4 ? O($e) : ut($e);
          },
          (ct) => tt(
            ct.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, T = (ct) => {
      D != null && navigator.geolocation.clearWatch(D), D = null, ct && ht(b, { online: !1, at: Date.now() });
    }, U = () => document.visibilityState === "visible" ? Y() : T(!0), q = () => T(!0), gt = setInterval(() => {
      document.visibilityState === "visible" && P && O(P);
    }, 6e4);
    return document.visibilityState === "visible" && Y(), document.addEventListener("visibilitychange", U), window.addEventListener("pagehide", q), () => {
      clearInterval(gt), document.removeEventListener("visibilitychange", U), window.removeEventListener("pagehide", q), T(!0);
    };
  }, [$, c, !!o]), K(() => {
    if (C.current)
      try {
        window.storage.set("ui", JSON.stringify({ tab: g, ...w }), !1);
      } catch {
      }
  }, [g, w]);
  let _a = () => {
    let b = !Z;
    de(b);
    try {
      window.storage.set("hdr", b ? "min" : "max", !1);
    } catch {
    }
  };
  K(() => {
    let b = !0, D = async () => {
      let L = await si();
      if (b)
        if (L) {
          let O = { ...L, at: Date.now() };
          lt(O), ht(X.fx, O);
        } else {
          let O = await bt(X.fx, null);
          b && O && O.rate > 0 && lt({ ...O, cached: !0 });
        }
    };
    D();
    let P = setInterval(D, 3 * 36e5);
    return () => {
      b = !1, clearInterval(P);
    };
  }, []);
  let xe = fo(async () => {
    let [b, D, P, L, O, Y] = await Promise.all([
      bt(X.settings, null),
      bt(X.plan, []),
      bt(X.wish, []),
      bt(X.spend, []),
      bt(X.notice, null),
      bt(X.board, [])
    ]);
    z(Y), Ie(O && O.id ? O : null), i(b), m(D), p(P), x(L);
    try {
      let T = {};
      (await Ge(qe)).forEach(([U, q]) => T[decodeURIComponent(U.slice(qe.length))] = q), Lt(T);
    } catch {
    }
    try {
      let T = (await Ge(Ia)).map(([U, q]) => ({ ...q, key: U }));
      T.sort((U, q) => U.at - q.at), Qt((U) => {
        let q = U.filter((gt) => gt.pending && !T.some((ct) => ct.id === gt.id));
        return [...T, ...q];
      });
    } catch {
    }
    try {
      let T = {};
      (await Ge(Ve)).forEach(([U, q]) => T[decodeURIComponent(U.slice(Ve.length))] = q.at || 0), xn((U) => {
        let q = { ...T };
        return Object.keys(U).forEach((gt) => q[gt] = Math.max(q[gt] || 0, U[gt] || 0)), q;
      });
    } catch {
    }
    n(!0);
  }, []);
  K(() => {
    (async () => {
      try {
        let P = await window.storage.get("me", !1);
        P && P.value && I(P.value);
      } catch {
      }
      try {
        let P = await window.storage.get("ui", !1), L = P && P.value ? JSON.parse(P.value) : null;
        L && (["board", "plan", "wish", "spend", "family", "chat"].includes(L.tab) && A(L.tab), y((O) => ({
          wish: ["list", "map", "near"].includes(L.wish) ? L.wish : O.wish,
          spend: ["me", "day", "all"].includes(L.spend) ? L.spend : O.spend
        })));
      } catch {
      }
      C.current = !0, await xe();
    })();
    let b = window.storage.onChange ? window.storage.onChange(xe) : null, D = setInterval(xe, b ? 6e4 : 1e4);
    return () => {
      clearInterval(D), b && b();
    };
  }, [xe]), K(() => {
    if (!o || h.current) return;
    h.current = !0;
    let b = Math.round((Ft(dt(/* @__PURE__ */ new Date())) - Ft(o.start)) / 864e5);
    b >= 0 && b < o.days && l(b);
  }, [o]);
  let et = async (b, D, P, L) => {
    let O = await bt(b, D), Y = L(O);
    P(Y);
    let T = await ht(b, Y);
    return T || R("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), T;
  }, La = async (b) => {
    I(b), f(!1);
    try {
      await window.storage.set("me", b, !1);
    } catch {
    }
  }, Oa = async (b) => {
    i(b), E(!1), await ht(X.settings, b) || R("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), c && !b.members.includes(c) && I(null);
  }, rt = () => W(null);
  v.current = () => {
    M ? W(null) : N ? f(!1) : S && E(!1);
  };
  let De = !!M || N || S && !!o;
  K(() => {
    De && !_.current ? (history.pushState({ jtOverlay: !0 }, ""), _.current = !0) : !De && _.current && (_.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [De]), K(() => {
    let b = () => {
      _.current && (_.current = !1, v.current && v.current());
    };
    return window.addEventListener("popstate", b), () => window.removeEventListener("popstate", b);
  }, []);
  let Cn = (b, D) => ({
    add: (P, L) => et(
      b,
      [],
      D,
      (O) => O.map(
        (Y) => Y.id === P ? { ...Y, comments: [...Y.comments || [], { id: yt(), by: c, text: L, createdAt: Date.now() }] } : Y
      )
    ),
    del: (P, L) => et(
      b,
      [],
      D,
      (O) => O.map((Y) => Y.id === P ? { ...Y, comments: (Y.comments || []).filter((T) => T.id !== L) } : Y)
    )
  }), Fe = (b, D) => (P, L) => et(b, [], D, (O) => O.map((Y) => Y.id === P ? ri(Y, L, c) : Y)), Ua = Fe(X.plan, m), Ka = Fe(X.wish, p), Wa = Fe(X.board, z), zn = Cn(X.plan, m), En = Cn(X.wish, p), Ha = (b, D, P) => et(
    X.plan,
    [],
    m,
    (L) => D ? L.map((O) => O.id === D ? { ...O, ...b } : O) : [...L, { id: yt(), day: P, by: c, ...b }]
  ), Ya = (b) => et(X.plan, [], m, (D) => D.filter((P) => P.id !== b)), An = (b) => et(X.wish, [], p, (D) => [...D, { id: yt(), by: c, likes: [c], createdAt: Date.now(), ...b }]), Ja = (b) => et(
    X.wish,
    [],
    p,
    (D) => D.map(
      (P) => P.id === b ? { ...P, likes: P.likes.includes(c) ? P.likes.filter((L) => L !== c) : [...P.likes, c] } : P
    )
  ), Sn = (b) => et(X.wish, [], p, (D) => D.filter((P) => P.id !== b)), Ga = async (b) => {
    let D = Object.keys(b).length;
    await et(X.wish, [], p, (L) => L.map((O) => b[O.id] ? { ...O, ...b[O.id] } : O)) && jt(`${D}곳에 위치를 연결했어요.`);
  }, Xa = (b, D) => et(X.wish, [], p, (P) => P.map((L) => L.id === b ? { ...L, ...D, editedAt: Date.now() } : L)), qa = async (b, D) => {
    await et(X.plan, [], m, (P) => [
      ...P,
      {
        id: yt(),
        day: D,
        by: c,
        time: "",
        title: b.name,
        wishId: b.id,
        place: b.area || "",
        link: b.link || "",
        memo: b.memo || "",
        comments: b.comments || [],
        reactions: b.reactions || {},
        ...nt(b) ? { lat: b.lat, lng: b.lng } : {}
      }
    ]), l(D);
  }, Va = (b, D) => et(
    X.spend,
    [],
    x,
    (P) => D ? P.map((L) => L.id === D ? { ...L, ...b, editedAt: Date.now(), editedBy: c } : L) : [...P, { id: yt(), by: c, createdAt: Date.now(), ...b }]
  ), Za = (b) => et(X.spend, [], x, (D) => D.filter((P) => P.id !== b)), Qa = async ({ text: b, urls: D, photos: P }, L) => {
    for (let U of P.filter((q) => q.data)) {
      if (!await ht(on(U.id), U.data)) return !1;
      zt.set(U.id, U.data);
    }
    let O = P.map((U) => U.id), Y = [], T = await et(X.board, [], z, (U) => L ? U.map((q) => q.id !== L ? q : (Y = (q.photos || []).filter((gt) => !O.includes(gt)), { ...q, text: b, urls: D, photos: O, editedAt: Date.now() })) : [{ id: yt(), by: c, createdAt: Date.now(), text: b, urls: D, photos: O, likes: [], comments: [] }, ...U]);
    return T && Y.forEach(Jn), T;
  }, to = async (b) => {
    let D = [];
    await et(X.board, [], z, (L) => (D = L.find((O) => O.id === b)?.photos || [], L.filter((O) => O.id !== b))) && D.forEach(Jn);
  }, eo = (b, D) => et(
    X.board,
    [],
    z,
    (P) => P.map(
      (L) => L.id === b ? { ...L, comments: [...L.comments || [], { id: yt(), by: c, text: D, createdAt: Date.now() }] } : L
    )
  ), no = (b, D) => et(
    X.board,
    [],
    z,
    (P) => P.map((L) => L.id === b ? { ...L, comments: (L.comments || []).filter((O) => O.id !== D) } : L)
  ), ee, Pe = e && !o && window.storage && window.storage.isSynced && !window.storage.isSynced();
  if (!e || Pe)
    ee = /* @__PURE__ */ a("div", { className: "jt-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ a("div", { className: "jt-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {})
      ] }),
      Pe ? "여행 정보 받는 중" : "앱 준비 중",
      Pe && B && /* @__PURE__ */ t("p", { className: "jt-loading-sub", children: "인터넷 연결이 느린 것 같아요. 연결되면 자동으로 열려요." })
    ] });
  else if (!o || S)
    ee = /* @__PURE__ */ t(hi, { initial: o, onSave: Oa, onCancel: o ? () => E(!1) : null });
  else if (!c || !o.members.includes(c) || N) {
    let b = c && o.members.includes(c);
    ee = /* @__PURE__ */ t(
      yi,
      {
        members: o.members,
        onPick: La,
        current: b ? c : null,
        onBack: b ? () => f(!1) : null
      }
    );
  } else {
    let b = ft(o.start, 0), D = ft(o.start, o.days - 1), P = Math.round((Ft(o.start) - Ft(dt(/* @__PURE__ */ new Date()))) / 864e5), L = Math.round((Ft(dt(/* @__PURE__ */ new Date())) - Ft(o.start)) / 864e5), O = L >= 0 && L < o.days ? L : d, Y = H ? { ...o, rate: H.rate, fx: H } : o;
    ha = Y.rate, ee = /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ a("header", { className: "jt-head hero" + (Z ? " mini" : g === "plan" ? " tall" : ""), children: [
        !Z && /* @__PURE__ */ t(is, {}),
        /* @__PURE__ */ a("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ a("button", { className: "jt-me", onClick: () => f(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(pt, { name: c, members: o.members, size: 24 }),
            c
          ] }),
          Z && /* @__PURE__ */ a("strong", { className: "jt-mini-title", children: [
            /* @__PURE__ */ t("span", { className: "jt-mini-name", children: o.title }),
            P > 0 && /* @__PURE__ */ a("em", { children: [
              "D-",
              P
            ] }),
            P === 0 && /* @__PURE__ */ t("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ a(
              "button",
              {
                className: "jt-icon light jt-locbtn" + ($ ? " on" : ""),
                onClick: Nn,
                "aria-pressed": $,
                "aria-label": $ ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: $ ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ t(Et, { size: 19 }),
                  /* @__PURE__ */ t("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                className: "jt-icon light",
                onClick: _a,
                "aria-label": Z ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !Z,
                children: Z ? /* @__PURE__ */ t(Ct, { size: 20 }) : /* @__PURE__ */ t(ua, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => E(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t(bo, { size: 20 }) })
          ] })
        ] }),
        !Z && /* @__PURE__ */ a(st, { children: [
          /* @__PURE__ */ t("h1", { children: o.title }),
          /* @__PURE__ */ a("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ a("span", { children: [
              b.getMonth() + 1,
              "월 ",
              b.getDate(),
              "일 – ",
              D.getMonth() + 1,
              "월 ",
              D.getDate(),
              "일"
            ] }),
            P > 0 && /* @__PURE__ */ a("span", { className: "jt-dday", children: [
              "출발까지 ",
              P,
              "일"
            ] }),
            P === 0 && /* @__PURE__ */ t("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      G && /* @__PURE__ */ a("div", { className: "jt-error", role: "alert", children: [
        G,
        /* @__PURE__ */ t("button", { onClick: () => R(""), "aria-label": "닫기", children: /* @__PURE__ */ t(Gt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ a("main", { className: "jt-main", children: [
        g === "board" && /* @__PURE__ */ t(
          Gi,
          {
            settings: Y,
            board: k,
            me: c,
            onEdit: (T) => W({ type: "post", item: T }),
            onLike: Wa,
            onComment: eo,
            onDelComment: no
          }
        ),
        g === "plan" && /* @__PURE__ */ t(
          Ai,
          {
            settings: Y,
            schedule: s,
            day: d,
            setDay: l,
            onEdit: (T) => W({ type: "plan", item: T, day: T.day }),
            onAddAt: (T, U) => W({ type: "plan", day: T, preset: { time: U, end: Kt(Math.min($t(U) + 60, 23 * 60 + 59)) } }),
            me: c,
            onComment: zn.add,
            onDelComment: zn.del,
            onReact: Ua
          }
        ),
        g === "wish" && /* @__PURE__ */ t(
          Oi,
          {
            settings: Y,
            onBatchPos: Ga,
            view: w.wish,
            setView: (T) => y((U) => ({ ...U, wish: T })),
            plan: s,
            wish: u,
            me: c,
            onEdit: (T) => W({ type: "wish", item: T }),
            onSave: An,
            onLike: Ja,
            onPlan: (T) => W({ type: "toPlan", wish: T }),
            onDelete: Sn,
            onComment: En.add,
            onDelComment: En.del,
            onReact: Ka
          }
        ),
        g === "spend" && /* @__PURE__ */ t(
          Ki,
          {
            settings: Y,
            spend: r,
            me: c,
            view: w.spend,
            setView: (T) => y((U) => ({ ...U, spend: T })),
            onEdit: (T) => W({ type: "spend", item: T })
          }
        ),
        g === "chat" && /* @__PURE__ */ t(
          es,
          {
            settings: Y,
            me: c,
            msgs: fe,
            reads: bn,
            notice: Me,
            onEdit: Fa,
            onPin: Pa,
            onUnpin: wn,
            badgeAsk: jn === "default",
            onBadgeAsk: Ba,
            onSend: (T) => vn({ kind: "text", text: T }),
            onDelete: $a,
            onSendLoc: Ra
          }
        ),
        g === "family" && /* @__PURE__ */ t(
          Zi,
          {
            settings: Y,
            me: c,
            locs: me,
            shareOn: $,
            onToggle: Nn,
            myPos: Vt,
            geoErr: Zt
          }
        )
      ] }),
      (() => {
        let T = {
          board: ["글쓰기", () => W({ type: "post" })],
          plan: [`${d + 1}일차 일정 추가`, () => W({ type: "plan", day: d })],
          wish: ["가고 싶은 곳 추가", () => W({ type: "wish" })],
          spend: ["경비 추가", () => W({ type: "spend" })]
        }[g];
        return T ? /* @__PURE__ */ a("button", { className: "jt-fab", onClick: T[1], children: [
          /* @__PURE__ */ t(go, { size: 20, strokeWidth: 2.6 }),
          T[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["board", "공지", fa],
        ["plan", "일정", xo],
        ["wish", "가고 싶은 곳", an],
        ["spend", "경비", jo],
        ["family", "위치 공유", No],
        ["chat", "채팅", Eo]
      ].map(([T, U, q]) => /* @__PURE__ */ a("button", { className: g === T ? "on" : "", onClick: () => A(T), "aria-current": g === T, children: [
        /* @__PURE__ */ a("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(q, { size: 21 }),
          T === "chat" && Dt > 0 && g !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${Dt}개`, children: Dt > 99 ? "99+" : Dt })
        ] }),
        U
      ] }, T)) }),
