children: [
              !ut && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !Zt && /* @__PURE__ */ t(pt, { name: $.by, members: I, size: 30 }) }),
              /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
                !ut && !Zt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: $.by }),
                /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
                  l === $.id ? /* @__PURE__ */ o("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: z,
                        onChange: (tt) => C(tt.target.value),
                        onKeyDown: (tt) => {
                          tt.key === "Enter" && !tt.shiftKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), R($)), tt.key === "Escape" && A(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ o("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => A(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => R($), disabled: !z.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + ($.kind === "loc" ? " loc" : "") + (s && s.id === $.id ? " pinned" : ""),
                      onClick: () => v(w === $.id ? null : $.id),
                      "aria-label": ut ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": w === $.id,
                      children: $.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(Et, { size: 16 }),
                        ut ? "내 위치를 보냈어요" : `${$.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: ln($.text) })
                    }
                  ),
                  /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let tt = I.filter((ue) => ue !== $.by && (i[ue] || 0) < $.at);
                      return tt.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${tt.join(", ")}`, "aria-label": `${tt.length}명 안 읽음`, children: tt.length }) : null;
                    })(),
                    /* @__PURE__ */ o("time", { className: "jt-msg-time", children: [
                      $.editedAt ? "수정됨 " : "",
                      qi($.at)
                    ] })
                  ] })
                ] }),
                $.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt({ lat: $.lat, lng: $.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Bt, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !ut && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mn($), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(At, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                w === $.id && l !== $.id && /* @__PURE__ */ o("div", { className: "jt-msg-menu", children: [
                  s && s.id === $.id ? /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        x(), v(null);
                      },
                      children: [
                        /* @__PURE__ */ t(_a, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        r($), v(null), B(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(So, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  ut && $.kind !== "loc" && /* @__PURE__ */ o("button", { type: "button", className: "jt-like", onClick: () => G($), children: [
                    /* @__PURE__ */ t(Xt, { size: 14 }),
                    "수정"
                  ] }),
                  ut && /* @__PURE__ */ t(
                    St,
                    {
                      onConfirm: () => {
                        d($), v(null);
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
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: de, disabled: M, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(Et, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: p,
          onChange: ($) => k($.target.value),
          onKeyDown: ($) => {
            $.key === "Enter" && !$.shiftKey && !$.nativeEvent.isComposing && ($.preventDefault(), Z());
          },
          placeholder: M ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: Z, disabled: !p.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(pn, { size: 18 }) })
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
], ts = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", es = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), as = 7e3;
function ns() {
  let [e, a] = j(0), [n, i] = j({}), s = J(n);
  if (s.current = n, K(() => {
    let c = setInterval(() => {
      a((r) => {
        let x = r;
        for (let N = 0; N < Ut.length && (x = (x + 1) % Ut.length, !!s.current[x]); N++)
          ;
        return x;
      });
    }, as);
    return () => clearInterval(c);
  }, []), Ut.every((c, r) => n[r])) return null;
  let d = Ut[e];
  return /* @__PURE__ */ o(st, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      Ut.map((c, r) => /* @__PURE__ */ t(
        "img",
        {
          src: ts(c.f),
          alt: "",
          className: r === e ? "on" : "",
          style: { objectPosition: c.pos },
          loading: r === 0 ? "eager" : "lazy",
          onError: () => i((x) => ({ ...x, [r]: !0 }))
        },
        c.f
      )),
      /* @__PURE__ */ t("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ t("div", { className: "jt-hero-dots", "aria-hidden": "true", children: Ut.map((c, r) => /* @__PURE__ */ t("i", { className: r === e ? "on" : "" }, c.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: es(d.f), target: "_blank", rel: "noopener noreferrer", children: [
        d.t,
        ", 사진 ",
        d.by,
        " (",
        d.lic,
        ")"
      ] })
    ] })
  ] });
}
function ma() {
  let [e, a] = j(!1), [n, i] = j(null), [s, g] = j([]), [d, c] = j([]), [r, x] = j([]), [N, E] = j([]), [u, I] = j(null), [p, k] = j("plan"), [w, v] = j({ wish: "list", spend: "me" }), M = J(!1), [m, l] = j(0), [A, z] = j(!1), [C, f] = j(!1), [B, D] = j(!1);
  K(() => {
    let b = setTimeout(() => D(!0), 8e3);
    return () => clearTimeout(b);
  }, []);
  let y = J(null), L = J(!1), [S, W] = j(null), [G, R] = j(""), h = J(!1), [H, lt] = j(null), [Z, de] = j(!1), [me, _t] = j({}), [$, nt] = j(!1), [qt, ut] = j(null), [Zt, tt] = j("");
  K(() => {
    (async () => {
      try {
        let b = await window.storage.get("hdr", !1);
        b && b.value === "min" && de(!0);
      } catch {
      }
      try {
        let b = await window.storage.get("locshare", !1);
        b && b.value === "on" && nt(!0), (!b || !b.value) && Se(!0);
      } catch {
        Se(!0);
      }
    })();
  }, []);
  let [ue, Se] = j(!1), [fe, Qt] = j([]), [Ie, Fe] = j(null), [fa, ga] = j(0), [ha, ba] = j({}), [xa, ja] = j(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  K(() => {
    (async () => {
      try {
        let b = await window.storage.get("chatread", !1);
        b && b.value && ga(Number(b.value) || 0);
      } catch {
      }
    })();
  }, []);
  let ya = async (b) => {
    let F = { id: yt(), by: u, at: Date.now(), ...b }, P = Qe(F);
    Qt((O) => [...O, { ...F, key: P, pending: !0 }]), await ht(P, F) || (Qt((O) => O.filter((Y) => Y.id !== F.id)), jt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, Fn = async (b, F) => {
    let P = { id: b.id, by: b.by, at: b.at, kind: b.kind, text: F, editedAt: Date.now() };
    Qt((O) => O.map((Y) => Y.id === b.id ? { ...Y, text: F, editedAt: P.editedAt } : Y)), await ht(b.key || Qe(b), P) || jt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, Dn = async (b) => {
    let F = { id: b.id, by: b.by, kind: b.kind || "text", text: b.text || "", lat: b.lat, lng: b.lng, pinnedBy: u, pinnedAt: Date.now() };
    Fe(F);
    let P = await ht(X.notice, F);
    jt(P ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, va = async () => {
    Fe(null);
    try {
      await window.storage.delete(X.notice, !0);
    } catch {
    }
    jt("공지를 해제했어요.");
  }, Pn = async (b) => {
    Ie && Ie.id === b.id && va(), Qt((F) => F.filter((P) => P.id !== b.id));
    try {
      await window.storage.delete(b.key || Qe(b), !0);
    } catch {
    }
  }, $n = async () => {
    let b = qt;
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
    await ya({ kind: "loc", lat: b.lat, lng: b.lng, text: "" });
  }, ge = fe.reduce((b, F) => F.by !== u && F.at > b ? F.at : b, 0), te = fe.reduce((b, F) => F.at > b ? F.at : b, 0), It = fe.filter((b) => b.by !== u && b.at > fa).length, [wa, Rn] = j(() => document.visibilityState === "visible");
  K(() => {
    let b = () => Rn(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", b), () => document.removeEventListener("visibilitychange", b);
  }, []), K(() => {
    if (!(p !== "chat" || !wa || !u || !te)) {
      if (ge > fa) {
        ga(ge);
        try {
          window.storage.set("chatread", String(ge), !1);
        } catch {
        }
      }
      (ha[u] || 0) < te && (ba((b) => ({ ...b, [u]: te })), ht(Ze + encodeURIComponent(u), { at: te }));
    }
  }, [p, wa, te, ge, u]), K(() => {
    if ("setAppBadge" in navigator)
      try {
        It > 0 ? navigator.setAppBadge(It).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [It, xa]);
  let Tn = async () => {
    try {
      let b = await Notification.requestPermission();
      ja(b), jt(b === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      ja("denied");
    }
  }, [he, jt] = j("");
  K(() => {
    if (!he) return;
    let b = setTimeout(() => jt(""), 2600);
    return () => clearTimeout(b);
  }, [he]);
  let be = (b, F) => {
    nt(b), Se(!1), b || tt(""), F || jt(b ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", b ? "on" : "off", !1);
    } catch {
    }
  }, ka = () => be(!$);
  K(() => {
    if (!$ || !u || !n) return;
    let b = qe + encodeURIComponent(u), F = null, P = null, _ = 0, O = (ct) => {
      P = ct, _ = Date.now(), ut(ct), ht(b, { ...ct, at: Date.now(), online: !0 });
    }, Y = () => {
      if (F == null) {
        if (!navigator.geolocation) {
          tt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        F = navigator.geolocation.watchPosition(
          (ct) => {
            let Re = { lat: ct.coords.latitude, lng: ct.coords.longitude, acc: Math.round(ct.coords.accuracy) };
            tt(""), !P || Jt(P, Re) > 25 || Date.now() - _ > 6e4 ? O(Re) : ut(Re);
          },
          (ct) => tt(
            ct.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, T = (ct) => {
      F != null && navigator.geolocation.clearWatch(F), F = null, ct && ht(b, { online: !1, at: Date.now() });
    }, U = () => document.visibilityState === "visible" ? Y() : T(!0), V = () => T(!0), gt = setInterval(() => {
      document.visibilityState === "visible" && P && O(P);
    }, 6e4);
    return document.visibilityState === "visible" && Y(), document.addEventListener("visibilitychange", U), window.addEventListener("pagehide", V), () => {
      clearInterval(gt), document.removeEventListener("visibilitychange", U), window.removeEventListener("pagehide", V), T(!0);
    };
  }, [$, u, !!n]), K(() => {
    if (M.current)
      try {
        window.storage.set("ui", JSON.stringify({ tab: p, ...w }), !1);
      } catch {
      }
  }, [p, w]);
  let Bn = () => {
    let b = !Z;
    de(b);
    try {
      window.storage.set("hdr", b ? "min" : "max", !1);
    } catch {
    }
  };
  K(() => {
    let b = !0, F = async () => {
      let _ = await ii();
      if (b)
        if (_) {
          let O = { ..._, at: Date.now() };
          lt(O), ht(X.fx, O);
        } else {
          let O = await bt(X.fx, null);
          b && O && O.rate > 0 && lt({ ...O, cached: !0 });
        }
    };
    F();
    let P = setInterval(F, 3 * 36e5);
    return () => {
      b = !1, clearInterval(P);
    };
  }, []);
  let xe = uo(async () => {
    let [b, F, P, _, O, Y] = await Promise.all([
      bt(X.settings, null),
      bt(X.plan, []),
      bt(X.wish, []),
      bt(X.spend, []),
      bt(X.notice, null),
      bt(X.board, [])
    ]);
    E(Y), Fe(O && O.id ? O : null), i(b), g(F), c(P), x(_);
    try {
      let T = {};
      (await Xe(qe)).forEach(([U, V]) => T[decodeURIComponent(U.slice(qe.length))] = V), _t(T);
    } catch {
    }
    try {
      let T = (await Xe(Sn)).map(([U, V]) => ({ ...V, key: U }));
      T.sort((U, V) => U.at - V.at), Qt((U) => {
        let V = U.filter((gt) => gt.pending && !T.some((ct) => ct.id === gt.id));
        return [...T, ...V];
      });
    } catch {
    }
    try {
      let T = {};
      (await Xe(Ze)).forEach(([U, V]) => T[decodeURIComponent(U.slice(Ze.length))] = V.at || 0), ba((U) => {
        let V = { ...T };
        return Object.keys(U).forEach((gt) => V[gt] = Math.max(V[gt] || 0, U[gt] || 0)), V;
      });
    } catch {
    }
    a(!0);
  }, []);
  K(() => {
    (async () => {
      try {
        let P = await window.storage.get("me", !1);
        P && P.value && I(P.value);
      } catch {
      }
      try {
        let P = await window.storage.get("ui", !1), _ = P && P.value ? JSON.parse(P.value) : null;
        _ && (["board", "plan", "wish", "spend", "family", "chat"].includes(_.tab) && k(_.tab), v((O) => ({
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
  }, [xe]), K(() => {
    if (!n || h.current) return;
    h.current = !0;
    let b = Math.round((Ft(dt(/* @__PURE__ */ new Date())) - Ft(n.start)) / 864e5);
    b >= 0 && b < n.days && l(b);
  }, [n]);
  let et = async (b, F, P, _) => {
    let O = await bt(b, F), Y = _(O);
    P(Y);
    let T = await ht(b, Y);
    return T || R("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), T;
  }, Ln = async (b) => {
    I(b), f(!1);
    try {
      await window.storage.set("me", b, !1);
    } catch {
    }
  }, _n = async (b) => {
    i(b), z(!1), await ht(X.settings, b) || R("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), u && !b.members.includes(u) && I(null);
  }, rt = () => W(null);
  y.current = () => {
    S ? W(null) : C ? f(!1) : A && z(!1);
  };
  let De = !!S || C || A && !!n;
  K(() => {
    De && !L.current ? (history.pushState({ jtOverlay: !0 }, ""), L.current = !0) : !De && L.current && (L.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [De]), K(() => {
    let b = () => {
      L.current && (L.current = !1, y.current && y.current());
    };
    return window.addEventListener("popstate", b), () => window.removeEventListener("popstate", b);
  }, []);
  let Na = (b, F) => ({
    add: (P, _) => et(
      b,
      [],
      F,
      (O) => O.map(
        (Y) => Y.id === P ? { ...Y, comments: [...Y.comments || [], { id: yt(), by: u, text: _, createdAt: Date.now() }] } : Y
      )
    ),
    del: (P, _) => et(
      b,
      [],
      F,
      (O) => O.map((Y) => Y.id === P ? { ...Y, comments: (Y.comments || []).filter((T) => T.id !== _) } : Y)
    )
  }), Pe = (b, F) => (P, _) => et(b, [], F, (O) => O.map((Y) => Y.id === P ? si(Y, _, u) : Y)), On = Pe(X.plan, g), Un = Pe(X.wish, c), Kn = Pe(X.board, E), Ca = Na(X.plan, g), za = Na(X.wish, c), Wn = (b, F, P) => et(
    X.plan,
    [],
    g,
    (_) => F ? _.map((O) => O.id === F ? { ...O, ...b } : O) : [..._, { id: yt(), day: P, by: u, ...b }]
  ), Hn = (b) => et(X.plan, [], g, (F) => F.filter((P) => P.id !== b)), Ea = (b) => et(X.wish, [], c, (F) => [...F, { id: yt(), by: u, likes: [u], createdAt: Date.now(), ...b }]), Yn = (b) => et(
    X.wish,
    [],
    c,
    (F) => F.map(
      (P) => P.id === b ? { ...P, likes: P.likes.includes(u) ? P.likes.filter((_) => _ !== u) : [...P.likes, u] } : P
    )
  ), Aa = (b) => et(X.wish, [], c, (F) => F.filter((P) => P.id !== b)), Jn = async (b) => {
    let F = Object.keys(b).length;
    await et(X.wish, [], c, (_) => _.map((O) => b[O.id] ? { ...O, ...b[O.id] } : O)) && jt(`${F}곳에 위치를 연결했어요.`);
  }, Gn = (b, F) => et(X.wish, [], c, (P) => P.map((_) => _.id === b ? { ..._, ...F, editedAt: Date.now() } : _)), Xn = async (b, F) => {
    await et(X.plan, [], g, (P) => [
      ...P,
      {
        id: yt(),
        day: F,
        by: u,
        time: "",
        title: b.name,
        wishId: b.id,
        place: b.area || "",
        link: b.link || "",
        memo: b.memo || "",
        comments: b.comments || [],
        reactions: b.reactions || {},
        ...at(b) ? { lat: b.lat, lng: b.lng } : {}
      }
    ]), l(F);
  }, Vn = (b, F) => et(
    X.spend,
    [],
    x,
    (P) => F ? P.map((_) => _.id === F ? { ..._, ...b, editedAt: Date.now(), editedBy: u } : _) : [...P, { id: yt(), by: u, createdAt: Date.now(), ...b }]
  ), qn = (b) => et(X.spend, [], x, (F) => F.filter((P) => P.id !== b)), Zn = async ({ text: b, urls: F, photos: P }, _) => {
    for (let U of P.filter((V) => V.data)) {
      if (!await ht(ia(U.id), U.data)) return !1;
      zt.set(U.id, U.data);
    }
    let O = P.map((U) => U.id), Y = [], T = await et(X.board, [], E, (U) => _ ? U.map((V) => V.id !== _ ? V : (Y = (V.photos || []).filter((gt) => !O.includes(gt)), { ...V, text: b, urls: F, photos: O, editedAt: Date.now() })) : [{ id: yt(), by: u, createdAt: Date.now(), text: b, urls: F, photos: O, likes: [], comments: [] }, ...U]);
    return T && Y.forEach(Ya), T;
  }, Qn = async (b) => {
    let F = [];
    await et(X.board, [], E, (_) => (F = _.find((O) => O.id === b)?.photos || [], _.filter((O) => O.id !== b))) && F.forEach(Ya);
  }, to = (b, F) => et(
    X.board,
    [],
    E,
    (P) => P.map(
      (_) => _.id === b ? { ..._, comments: [..._.comments || [], { id: yt(), by: u, text: F, createdAt: Date.now() }] } : _
    )
  ), eo = (b, F) => et(
    X.board,
    [],
    E,
    (P) => P.map((_) => _.id === b ? { ..._, comments: (_.comments || []).filter((O) => O.id !== F) } : _)
  ), ee, $e = e && !n && window.storage && window.storage.isSynced && !window.storage.isSynced();
  if (!e || $e)
    ee = /* @__PURE__ */ o("div", { className: "jt-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ o("div", { className: "jt-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {})
      ] }),
      $e ? "여행 정보 받는 중" : "앱 준비 중",
      $e && B && /* @__PURE__ */ t("p", { className: "jt-loading-sub", children: "인터넷 연결이 느린 것 같아요. 연결되면 자동으로 열려요." })
    ] });
  else if (!n || A)
    ee = /* @__PURE__ */ t(fi, { initial: n, onSave: _n, onCancel: n ? () => z(!1) : null });
  else if (!u || !n.members.includes(u) || C) {
    let b = u && n.members.includes(u);
    ee = /* @__PURE__ */ t(
      xi,
      {
        members: n.members,
        onPick: Ln,
        current: b ? u : null,
        onBack: b ? () => f(!1) : null
      }
    );
  } else {
    let b = ft(n.start, 0), F = ft(n.start, n.days - 1), P = Math.round((Ft(n.start) - Ft(dt(/* @__PURE__ */ new Date()))) / 864e5), _ = Math.round((Ft(dt(/* @__PURE__ */ new Date())) - Ft(n.start)) / 864e5), O = _ >= 0 && _ < n.days ? _ : m, Y = H ? { ...n, rate: H.rate, fx: H } : n;
    hn = Y.rate, ee = /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (Z ? " mini" : p === "plan" ? " tall" : ""), children: [
        !Z && /* @__PURE__ */ t(ns, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => f(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(pt, { name: u, members: n.members, size: 24 }),
            u
          ] }),
          Z && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
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
                className: "jt-icon light jt-locbtn" + ($ ? " on" : ""),
                onClick: ka,
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
                onClick: Bn,
                "aria-label": Z ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !Z,
                children: Z ? /* @__PURE__ */ t(Ct, { size: 20 }) : /* @__PURE__ */ t(un, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => z(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t(ho, { size: 20 }) })
          ] })
        ] }),
        !Z && /* @__PURE__ */ o(st, { children: [
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
      G && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        G,
        /* @__PURE__ */ t("button", { onClick: () => R(""), "aria-label": "닫기", children: /* @__PURE__ */ t(Gt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        p === "board" && /* @__PURE__ */ t(
          Yi,
          {
            settings: Y,
            board: N,
            me: u,
            onEdit: (T) => W({ type: "post", item: T }),
            onLike: Kn,
            onComment: to,
            onDelComment: eo
          }
        ),
        p === "plan" && /* @__PURE__ */ t(
          zi,
          {
            settings: Y,
            schedule: s,
            day: m,
            setDay: l,
            onEdit: (T) => W({ type: "plan", item: T, day: T.day }),
            onAddAt: (T, U) => W({ type: "plan", day: T, preset: { time: U, end: Kt(Math.min(Pt(U) + 60, 23 * 60 + 59)) } }),
            me: u,
            onComment: Ca.add,
            onDelComment: Ca.del,
            onReact: On
          }
        ),
        p === "wish" && /* @__PURE__ */ t(
          Li,
          {
            settings: Y,
            onBatchPos: Jn,
            view: w.wish,
            setView: (T) => v((U) => ({ ...U, wish: T })),
            plan: s,
            wish: d,
            me: u,
            onEdit: (T) => W({ type: "wish", item: T }),
            onSave: Ea,
            onLike: Yn,
            onPlan: (T) => W({ type: "toPlan", wish: T }),
            onDelete: Aa,
            onComment: za.add,
            onDelComment: za.del,
            onReact: Un
          }
        ),
        p === "spend" && /* @__PURE__ */ t(
          Oi,
          {
            settings: Y,
            spend: r,
            me: u,
            view: w.spend,
            setView: (T) => v((U) => ({ ...U, spend: T })),
            onEdit: (T) => W({ type: "spend", item: T })
          }
        ),
        p === "chat" && /* @__PURE__ */ t(
          Qi,
          {
            settings: Y,
            me: u,
            msgs: fe,
            reads: ha,
            notice: Ie,
            onEdit: Fn,
            onPin: Dn,
            onUnpin: va,
            badgeAsk: xa === "default",
            onBadgeAsk: Tn,
            onSend: (T) => ya({ kind: "text", text: T }),
            onDelete: Pn,
            onSendLoc: $n
          }
        ),
        p === "family" && /* @__PURE__ */ t(
          Vi,
          {
            settings: Y,
            me: u,
            locs: me,
            shareOn: $,
            onToggle: ka,
            myPos: qt,
            geoErr: Zt
          }
        )
      ] }),
      (() => {
        let T = {
          board: ["글쓰기", () => W({ type: "post" })],
          plan: [`${m + 1}일차 일정 추가`, () => W({ type: "plan", day: m })],
          wish: ["가고 싶은 곳 추가", () => W({ type: "wish" })],
          spend: ["경비 추가", () => W({ type: "spend" })]
        }[p];
        return T ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: T[1], children: [
          /* @__PURE__ */ t(fo, { size: 20, strokeWidth: 2.6 }),
          T[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["board", "공지", fn],
        ["plan", "일정", bo],
        ["wish", "가고 싶은 곳", oa],
        ["spend", "경비", xo],
        ["family", "위치 공유", ko],
        ["chat", "채팅", zo]
      ].map(([T, U, V]) => /* @__PURE__ */ o("button", { className: p === T ? "on" : "", onClick: () => k(T), "aria-current": p === T, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(V, { size: 21 }),
          T === "chat" && It > 0 && p !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${It}개`, children: It > 99 ? "99+" : It })
        ] }),
        U
      ] }, T)) }),
      S?.type === "plan" && /* @__PURE__ */ t(Nt, { title: S.item ? "일정 수정" : `${S.day + 1}일차 일정 추가`, onClose: rt, children: /* @__PURE__ */ t(
        ji,
        {
          initial: S.item,
          preset: S.preset,
