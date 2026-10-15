l === T.id ? /* @__PURE__ */ a("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: k,
                        onChange: (tt) => M(tt.target.value),
                        onKeyDown: (tt) => {
                          tt.key === "Enter" && !tt.shiftKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), _(T)), tt.key === "Escape" && S(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ a("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => S(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => _(T), disabled: !k.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + (T.kind === "loc" ? " loc" : "") + (s && s.id === T.id ? " pinned" : ""),
                      onClick: () => y(N === T.id ? null : T.id),
                      "aria-label": at ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": N === T.id,
                      children: T.kind === "loc" ? /* @__PURE__ */ a("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(Et, { size: 16 }),
                        at ? "내 위치를 보냈어요" : `${T.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: Hn(T.text) })
                    }
                  ),
                  /* @__PURE__ */ a("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let tt = A.filter((wt) => wt !== T.by && (i[wt] || 0) < T.at);
                      return tt.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${tt.join(", ")}`, "aria-label": `${tt.length}명 안 읽음`, children: tt.length }) : null;
                    })(),
                    /* @__PURE__ */ a("time", { className: "jt-msg-time", children: [
                      T.editedAt ? "수정됨 " : "",
                      ci(T.at)
                    ] })
                  ] })
                ] }),
                T.kind === "loc" && /* @__PURE__ */ a("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ a("a", { className: "jt-maplink", href: Mt({ lat: T.lat, lng: T.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Kt, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !at && /* @__PURE__ */ a("a", { className: "jt-maplink", href: la(T), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(vt, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                N === T.id && l !== T.id && /* @__PURE__ */ a("div", { className: "jt-msg-menu", children: [
                  s && s.id === T.id ? /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        j(), y(null);
                      },
                      children: [
                        /* @__PURE__ */ t(Mn, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        d(T), y(null), $(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(no, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  at && T.kind !== "loc" && /* @__PURE__ */ a("button", { type: "button", className: "jt-like", onClick: () => J(T), children: [
                    /* @__PURE__ */ t(be, { size: 14 }),
                    "수정"
                  ] }),
                  at && /* @__PURE__ */ t(
                    Ft,
                    {
                      onConfirm: () => {
                        g(T), y(null);
                      },
                      label: "삭제"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] }, T.id);
    }) }),
    /* @__PURE__ */ t("div", { ref: F }),
    /* @__PURE__ */ a("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: he, disabled: C, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(Et, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: v,
          onChange: (T) => E(T.target.value),
          onKeyDown: (T) => {
            T.key === "Enter" && !T.shiftKey && !T.nativeEvent.isComposing && (T.preventDefault(), oe());
          },
          placeholder: C ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: oe, disabled: !v.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(Jn, { size: 18 }) })
    ] })
  ] });
}
var $t = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Kinkaku-ji in November 2016 -02.jpg", t: "교토 금각사", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 50%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Torii path with lantern at Fushimi Inari Taisha Shrine, Kyoto, Japan.jpg", t: "교토 후시미 이나리 신사", by: "Basile Morin", lic: "CC BY-SA", pos: "50% 45%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], mi = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", ui = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), fi = 7e3;
function gi() {
  let [e, n] = w(0), [o, i] = w({}), s = Y(o);
  if (s.current = o, K(() => {
    let f = setInterval(() => {
      n((d) => {
        let j = d;
        for (let b = 0; b < $t.length && (j = (j + 1) % $t.length, !!s.current[j]); b++)
          ;
        return j;
      });
    }, fi);
    return () => clearInterval(f);
  }, []), $t.every((f, d) => o[d])) return null;
  let g = $t[e];
  return /* @__PURE__ */ a(dt, { children: [
    /* @__PURE__ */ a("div", { className: "jt-hero", "aria-hidden": "true", children: [
      $t.map((f, d) => /* @__PURE__ */ t(
        "img",
        {
          src: mi(f.f),
          alt: "",
          className: d === e ? "on" : "",
          style: { objectPosition: f.pos },
          loading: d === 0 ? "eager" : "lazy",
          onError: () => i((j) => ({ ...j, [d]: !0 }))
        },
        f.f
      )),
      /* @__PURE__ */ t("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ t("div", { className: "jt-hero-dots", "aria-hidden": "true", children: $t.map((f, d) => /* @__PURE__ */ t("i", { className: d === e ? "on" : "" }, f.f)) }),
      /* @__PURE__ */ a("a", { className: "jt-hero-cap", href: ui(g.f), target: "_blank", rel: "noopener noreferrer", children: [
        g.t,
        ", 사진 ",
        g.by,
        " (",
        g.lic,
        ")"
      ] })
    ] })
  ] });
}
function Ze() {
  let [e, n] = w(!1), [o, i] = w(null), [s, h] = w([]), [g, f] = w([]), [d, j] = w([]), [b, z] = w(null), [x, A] = w("plan"), [v, E] = w({ wish: "list", spend: "me" }), N = Y(!1), [y, C] = w(0), [r, l] = w(!1), [S, k] = w(!1), [M, p] = w(!1);
  K(() => {
    let m = setTimeout(() => p(!0), 8e3);
    return () => clearTimeout(m);
  }, []);
  let $ = Y(null), u = Y(!1), [c, D] = w(null), [R, V] = w(""), J = Y(!1), [_, F] = w(null), [W, Dt] = w(!1), [oe, he] = w({}), [lt, yt] = w(!1), [T, Q] = w(null), [ie, at] = w("");
  K(() => {
    (async () => {
      try {
        let m = await window.storage.get("hdr", !1);
        m && m.value === "min" && Dt(!0);
      } catch {
      }
      try {
        let m = await window.storage.get("locshare", !1);
        m && m.value === "on" && yt(!0), (!m || !m.value) && tt(!0);
      } catch {
        tt(!0);
      }
    })();
  }, []);
  let [Wt, tt] = w(!1), [wt, Ht] = w([]), [je, ve] = w(null), [tn, en] = w(0), [nn, an] = w({}), [on, sn] = w(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  K(() => {
    (async () => {
      try {
        let m = await window.storage.get("chatread", !1);
        m && m.value && en(Number(m.value) || 0);
      } catch {
      }
    })();
  }, []);
  let rn = async (m) => {
    let I = { id: Pt(), by: b, at: Date.now(), ...m }, P = _e(I);
    Ht((U) => [...U, { ...I, key: P, pending: !0 }]), await gt(P, I) || (Ht((U) => U.filter((L) => L.id !== I.id)), bt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, da = async (m, I) => {
    let P = { id: m.id, by: m.by, at: m.at, kind: m.kind, text: I, editedAt: Date.now() };
    Ht((U) => U.map((L) => L.id === m.id ? { ...L, text: I, editedAt: P.editedAt } : L)), await gt(m.key || _e(m), P) || bt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, ma = async (m) => {
    let I = { id: m.id, by: m.by, kind: m.kind || "text", text: m.text || "", lat: m.lat, lng: m.lng, pinnedBy: b, pinnedAt: Date.now() };
    ve(I);
    let P = await gt(X.notice, I);
    bt(P ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, ln = async () => {
    ve(null);
    try {
      await window.storage.delete(X.notice, !0);
    } catch {
    }
    bt("공지를 해제했어요.");
  }, ua = async (m) => {
    je && je.id === m.id && ln(), Ht((I) => I.filter((P) => P.id !== m.id));
    try {
      await window.storage.delete(m.key || _e(m), !0);
    } catch {
    }
  }, fa = async () => {
    let m = T;
    if (m || (m = await new Promise((I) => {
      if (!navigator.geolocation) return I(null);
      navigator.geolocation.getCurrentPosition(
        (P) => I({ lat: P.coords.latitude, lng: P.coords.longitude }),
        () => I(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !m) {
      bt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await rn({ kind: "loc", lat: m.lat, lng: m.lng, text: "" });
  }, se = wt.reduce((m, I) => I.by !== b && I.at > m ? I.at : m, 0), Yt = wt.reduce((m, I) => I.at > m ? I.at : m, 0), kt = wt.filter((m) => m.by !== b && m.at > tn).length, [cn, ga] = w(() => document.visibilityState === "visible");
  K(() => {
    let m = () => ga(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", m), () => document.removeEventListener("visibilitychange", m);
  }, []), K(() => {
    if (!(x !== "chat" || !cn || !b || !Yt)) {
      if (se > tn) {
        en(se);
        try {
          window.storage.set("chatread", String(se), !1);
        } catch {
        }
      }
      (nn[b] || 0) < Yt && (an((m) => ({ ...m, [b]: Yt })), gt(Re + encodeURIComponent(b), { at: Yt }));
    }
  }, [x, cn, Yt, se, b]), K(() => {
    if ("setAppBadge" in navigator)
      try {
        kt > 0 ? navigator.setAppBadge(kt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [kt, on]);
  let ba = async () => {
    try {
      let m = await Notification.requestPermission();
      sn(m), bt(m === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      sn("denied");
    }
  }, [re, bt] = w("");
  K(() => {
    if (!re) return;
    let m = setTimeout(() => bt(""), 2600);
    return () => clearTimeout(m);
  }, [re]);
  let le = (m, I) => {
    yt(m), tt(!1), m || at(""), I || bt(m ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", m ? "on" : "off", !1);
    } catch {
    }
  }, pn = () => le(!lt);
  K(() => {
    if (!lt || !b || !o) return;
    let m = Te + encodeURIComponent(b), I = null, P = null, O = 0, U = (pt) => {
      P = pt, O = Date.now(), Q(pt), gt(m, { ...pt, at: Date.now(), online: !0 });
    }, L = () => {
      if (I == null) {
        if (!navigator.geolocation) {
          at("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        I = navigator.geolocation.watchPosition(
          (pt) => {
            let Ne = { lat: pt.coords.latitude, lng: pt.coords.longitude, acc: Math.round(pt.coords.accuracy) };
            at(""), !P || ge(P, Ne) > 25 || Date.now() - O > 6e4 ? U(Ne) : Q(Ne);
          },
          (pt) => at(
            pt.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, B = (pt) => {
      I != null && navigator.geolocation.clearWatch(I), I = null, pt && gt(m, { online: !1, at: Date.now() });
    }, H = () => document.visibilityState === "visible" ? L() : B(!0), nt = () => B(!0), ke = setInterval(() => {
      document.visibilityState === "visible" && P && U(P);
    }, 6e4);
    return document.visibilityState === "visible" && L(), document.addEventListener("visibilitychange", H), window.addEventListener("pagehide", nt), () => {
      clearInterval(ke), document.removeEventListener("visibilitychange", H), window.removeEventListener("pagehide", nt), B(!0);
    };
  }, [lt, b, !!o]), K(() => {
    if (N.current)
      try {
        window.storage.set("ui", JSON.stringify({ tab: x, ...v }), !1);
      } catch {
      }
  }, [x, v]);
  let xa = () => {
    let m = !W;
    Dt(m);
    try {
      window.storage.set("hdr", m ? "min" : "max", !1);
    } catch {
    }
  };
  K(() => {
    let m = !0, I = async () => {
      let O = await Ao();
      if (m)
        if (O) {
          let U = { ...O, at: Date.now() };
          F(U), gt(X.fx, U);
        } else {
          let U = await ht(X.fx, null);
          m && U && U.rate > 0 && F({ ...U, cached: !0 });
        }
    };
    I();
    let P = setInterval(I, 3 * 36e5);
    return () => {
      m = !1, clearInterval(P);
    };
  }, []);
  let ce = _a(async () => {
    let [m, I, P, O, U] = await Promise.all([
      ht(X.settings, null),
      ht(X.plan, []),
      ht(X.wish, []),
      ht(X.spend, []),
      ht(X.notice, null)
    ]);
    ve(U && U.id ? U : null), i(m), h(I), f(P), j(O);
    try {
      let L = {};
      (await Pe(Te)).forEach(([B, H]) => L[decodeURIComponent(B.slice(Te.length))] = H), he(L);
    } catch {
    }
    try {
      let L = (await Pe(ca)).map(([B, H]) => ({ ...H, key: B }));
      L.sort((B, H) => B.at - H.at), Ht((B) => {
        let H = B.filter((nt) => nt.pending && !L.some((ke) => ke.id === nt.id));
        return [...L, ...H];
      });
    } catch {
    }
    try {
      let L = {};
      (await Pe(Re)).forEach(([B, H]) => L[decodeURIComponent(B.slice(Re.length))] = H.at || 0), an((B) => {
        let H = { ...L };
        return Object.keys(B).forEach((nt) => H[nt] = Math.max(H[nt] || 0, B[nt] || 0)), H;
      });
    } catch {
    }
    n(!0);
  }, []);
  K(() => {
    (async () => {
      try {
        let P = await window.storage.get("me", !1);
        P && P.value && z(P.value);
      } catch {
      }
      try {
        let P = await window.storage.get("ui", !1), O = P && P.value ? JSON.parse(P.value) : null;
        O && (["plan", "wish", "spend", "family", "chat"].includes(O.tab) && A(O.tab), E((U) => ({
          wish: ["list", "map", "near"].includes(O.wish) ? O.wish : U.wish,
          spend: ["me", "day", "all"].includes(O.spend) ? O.spend : U.spend
        })));
      } catch {
      }
      N.current = !0, await ce();
    })();
    let m = window.storage.onChange ? window.storage.onChange(ce) : null, I = setInterval(ce, m ? 6e4 : 1e4);
    return () => {
      clearInterval(I), m && m();
    };
  }, [ce]), K(() => {
    if (!o || J.current) return;
    J.current = !0;
    let m = Math.round((Ct(st(/* @__PURE__ */ new Date())) - Ct(o.start)) / 864e5);
    m >= 0 && m < o.days && C(m);
  }, [o]);
  let it = async (m, I, P, O) => {
    let U = await ht(m, I), L = O(U);
    P(L);
    let B = await gt(m, L);
    return B || V("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), B;
  }, ha = async (m) => {
    z(m), k(!1);
    try {
      await window.storage.set("me", m, !1);
    } catch {
    }
  }, ja = async (m) => {
    i(m), l(!1), await gt(X.settings, m) || V("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), b && !m.members.includes(b) && z(null);
  }, ct = () => D(null);
  $.current = () => {
    c ? D(null) : S ? k(!1) : r && l(!1);
  };
  let ye = !!c || S || r && !!o;
  K(() => {
    ye && !u.current ? (history.pushState({ jtOverlay: !0 }, ""), u.current = !0) : !ye && u.current && (u.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [ye]), K(() => {
    let m = () => {
      u.current && (u.current = !1, $.current && $.current());
    };
    return window.addEventListener("popstate", m), () => window.removeEventListener("popstate", m);
  }, []);
  let dn = (m, I) => ({
    add: (P, O) => it(
      m,
      [],
      I,
      (U) => U.map(
        (L) => L.id === P ? { ...L, comments: [...L.comments || [], { id: Pt(), by: b, text: O, createdAt: Date.now() }] } : L
      )
    ),
    del: (P, O) => it(
      m,
      [],
      I,
      (U) => U.map((L) => L.id === P ? { ...L, comments: (L.comments || []).filter((B) => B.id !== O) } : L)
    )
  }), mn = (m, I) => (P, O) => it(m, [], I, (U) => U.map((L) => L.id === P ? So(L, O, b) : L)), va = mn(X.plan, h), ya = mn(X.wish, f), un = dn(X.plan, h), fn = dn(X.wish, f), wa = (m, I, P) => it(
    X.plan,
    [],
    h,
    (O) => I ? O.map((U) => U.id === I ? { ...U, ...m } : U) : [...O, { id: Pt(), day: P, by: b, ...m }]
  ), ka = (m) => it(X.plan, [], h, (I) => I.filter((P) => P.id !== m)), gn = (m) => it(X.wish, [], f, (I) => [...I, { id: Pt(), by: b, likes: [b], createdAt: Date.now(), ...m }]), Na = (m) => it(
    X.wish,
    [],
    f,
    (I) => I.map(
      (P) => P.id === m ? { ...P, likes: P.likes.includes(b) ? P.likes.filter((O) => O !== b) : [...P.likes, b] } : P
    )
  ), bn = (m) => it(X.wish, [], f, (I) => I.filter((P) => P.id !== m)), Ca = (m, I) => it(X.wish, [], f, (P) => P.map((O) => O.id === m ? { ...O, ...I, editedAt: Date.now() } : O)), za = async (m, I) => {
    await it(X.plan, [], h, (P) => [
      ...P,
      {
        id: Pt(),
        day: I,
        by: b,
        time: "",
        title: m.name,
        wishId: m.id,
        place: m.area || "",
        link: m.link || "",
        memo: m.memo || "",
        comments: m.comments || [],
        reactions: m.reactions || {},
        ...ut(m) ? { lat: m.lat, lng: m.lng } : {}
      }
    ]), C(I);
  }, Ea = (m, I) => it(
    X.spend,
    [],
    j,
    (P) => I ? P.map((O) => O.id === I ? { ...O, ...m, editedAt: Date.now(), editedBy: b } : O) : [...P, { id: Pt(), by: b, createdAt: Date.now(), ...m }]
  ), Aa = (m) => it(X.spend, [], j, (I) => I.filter((P) => P.id !== m)), Jt, we = e && !o && window.storage && window.storage.isSynced && !window.storage.isSynced();
  if (!e || we)
    Jt = /* @__PURE__ */ a("div", { className: "jt-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ a("div", { className: "jt-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {}),
        /* @__PURE__ */ t("i", {})
      ] }),
      we ? "여행 정보 받는 중" : "앱 준비 중",
      we && M && /* @__PURE__ */ t("p", { className: "jt-loading-sub", children: "인터넷 연결이 느린 것 같아요. 연결되면 자동으로 열려요." })
    ] });
  else if (!o || r)
    Jt = /* @__PURE__ */ t(Mo, { initial: o, onSave: ja, onCancel: o ? () => l(!1) : null });
  else if (!b || !o.members.includes(b) || S) {
    let m = b && o.members.includes(b);
    Jt = /* @__PURE__ */ t(
      Po,
      {
        members: o.members,
        onPick: ha,
        current: m ? b : null,
        onBack: m ? () => k(!1) : null
      }
    );
  } else {
    let m = mt(o.start, 0), I = mt(o.start, o.days - 1), P = Math.round((Ct(o.start) - Ct(st(/* @__PURE__ */ new Date()))) / 864e5), O = Math.round((Ct(st(/* @__PURE__ */ new Date())) - Ct(o.start)) / 864e5), U = O >= 0 && O < o.days ? O : y, L = _ ? { ...o, rate: _.rate, fx: _ } : o;
    Jt = /* @__PURE__ */ a(dt, { children: [
      /* @__PURE__ */ a("header", { className: "jt-head hero" + (W ? " mini" : x === "plan" ? " tall" : ""), children: [
        !W && /* @__PURE__ */ t(gi, {}),
        /* @__PURE__ */ a("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ a("button", { className: "jt-me", onClick: () => k(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(rt, { name: b, members: o.members, size: 24 }),
            b
          ] }),
          W && /* @__PURE__ */ a("strong", { className: "jt-mini-title", children: [
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
                className: "jt-icon light jt-locbtn" + (lt ? " on" : ""),
                onClick: pn,
                "aria-pressed": lt,
                "aria-label": lt ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: lt ? "위치 공유 켜짐" : "위치 공유 꺼짐",
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
                onClick: xa,
                "aria-label": W ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !W,
                children: W ? /* @__PURE__ */ t(At, { size: 20 }) : /* @__PURE__ */ t(Vn, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => l(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t(Oa, { size: 20 }) })
          ] })
        ] }),
        !W && /* @__PURE__ */ a(dt, { children: [
          /* @__PURE__ */ t("h1", { children: o.title }),
          /* @__PURE__ */ a("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ a("span", { children: [
              m.getMonth() + 1,
              "월 ",
              m.getDate(),
              "일 – ",
              I.getMonth() + 1,
              "월 ",
              I.getDate(),
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
      R && /* @__PURE__ */ a("div", { className: "jt-error", role: "alert", children: [
        R,
        /* @__PURE__ */ t("button", { onClick: () => V(""), "aria-label": "닫기", children: /* @__PURE__ */ t(We, { size: 16 }) })
      ] }),
      /* @__PURE__ */ a("main", { className: "jt-main", children: [
        x === "plan" && /* @__PURE__ */ t(
          Ko,
          {
            settings: L,
            schedule: s,
            day: y,
            setDay: C,
            onEdit: (B) => D({ type: "plan", item: B, day: B.day }),
            onAddAt: (B, H) => D({ type: "plan", day: B, preset: { time: H, end: Tt(Math.min(zt(H) + 60, 23 * 60 + 59)) } }),
            me: b,
            onComment: un.add,
            onDelComment: un.del,
            onReact: va
          }
        ),
        x === "wish" && /* @__PURE__ */ t(
          ei,
          {
            settings: L,
            view: v.wish,
            setView: (B) => E((H) => ({ ...H, wish: B })),
            plan: s,
            wish: g,
            me: b,
            onEdit: (B) => D({ type: "wish", item: B }),
            onSave: gn,
            onLike: Na,
            onPlan: (B) => D({ type: "toPlan", wish: B }),
            onDelete: bn,
            onComment: fn.add,
            onDelComment: fn.del,
            onReact: ya
          }
        ),
        x === "spend" && /* @__PURE__ */ t(
          oi,
          {
            settings: L,
            spend: d,
            me: b,
            view: v.spend,
            setView: (B) => E((H) => ({ ...H, spend: B })),
            onEdit: (B) => D({ type: "spend", item: B })
          }
        ),
        x === "chat" && /* @__PURE__ */ t(
          di,
          {
            settings: L,
            me: b,
            msgs: wt,
            reads: nn,
            notice: je,
            onEdit: da,
            onPin: ma,
            onUnpin: ln,
            badgeAsk: on === "default",
            onBadgeAsk: ba,
            onSend: (B) => rn({ kind: "text", text: B }),
            onDelete: ua,
            onSendLoc: fa
          }
        ),
        x === "family" && /* @__PURE__ */ t(
          li,
          {
            settings: L,
            me: b,
            locs: oe,
            shareOn: lt,
            onToggle: pn,
            myPos: T,
            geoErr: ie
          }
        )
      ] }),
      (() => {
        let B = {
          plan: [`${y + 1}일차 일정 추가`, () => D({ type: "plan", day: y })],
          wish: ["가고 싶은 곳 추가", () => D({ type: "wish" })],
          spend: ["경비 추가", () => D({ type: "spend" })]
        }[x];
        return B ? /* @__PURE__ */ a("button", { className: "jt-fab", onClick: B[1], children: [
          /* @__PURE__ */ t(Ba, { size: 20, strokeWidth: 2.6 }),
          B[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", Ka],
        ["wish", "가고 싶은 곳", He],
        ["spend", "경비", Ua],
        ["family", "위치 공유", Va],
        ["chat", "채팅", Ga]
      ].map(([B, H, nt]) => /* @__PURE__ */ a("button", { className: x === B ? "on" : "", onClick: () => A(B), "aria-current": x === B, children: [
        /* @__PURE__ */ a("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(nt, { size: 21 }),
          B === "chat" && kt > 0 && x !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${kt}개`, children: kt > 99 ? "99+" : kt })
        ] }),
        H
      ] }, B)) }),
      c?.type === "plan" && /* @__PURE__ */ t(Rt, { title: c.item ? "일정 수정" : `${c.day + 1}일차 일정 추가`, onClose: ct, children: /* @__PURE__ */ t(
        $o,
        {
          initial: c.item,
          preset: c.preset,
          gkey: o.gmapsKey,
          dayItems: s.filter((B) => B.day === c.day && B.id !== c.item?.id),
          onSave: (B) => {
            wa(B, c.item?.id, c.day), ct();
          },
          onDelete: () => {
            ka(c.item.id), ct();
          }
        }
      ) }),
      c?.type === "wish" && /* @__PURE__ */ t(Rt, { title: c.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: ct, children: /* @__PURE__ */ t(
        To,
        {
          initial: c.item,
          onSave: (B) => {
            c.item ? Ca(c.item.id, B) : gn(B), ct();
          },
          onDelete: () => {
            bn(c.item.id), ct();
          }
        }
      ) }),
      c?.type === "spend" && /* @__PURE__ */ t(Rt, { title: c.item ? "경비 수정" : "경비 기록", onClose: ct, children: /* @__PURE__ */ t(
        Ro,
        {
          settings: L,
          me: b,
          defaultDay: U,
          initial: c.item,
          onSave: (B) => {
            Ea(B, c.item?.id), ct();
          },
          onDelete: () => {
            Aa(c.item.id), ct();
          }
        }
      ) }),
      Wt && !c && /* @__PURE__ */ t(Rt, { title: "가족과 위치를 공유할까요?", onClose: () => le(!1, !0), children: /* @__PURE__ */ a("div", { className: "jt-form", children: [
        /* @__PURE__ */ a("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ t("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ t("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ t("button", { className: "jt-primary", onClick: () => le(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: () => le(!1, !0), children: "나중에 할게요" })
      ] }) }),
      re && /* @__PURE__ */ t("div", { className: "jt-toast", role: "status", children: re }),
      c?.type === "toPlan" && /* @__PURE__ */ t(Rt, { title: `"${c.wish.name}" 몇째 날에 갈까요?`, onClose: ct, children: /* @__PURE__ */ t("div", { className: "jt-daypick", children: Array.from({ length: o.days }, (B, H) => {
        let nt = mt(o.start, H);
        return /* @__PURE__ */ a(
          "button",
          {
            style: { "--lc": G[H % G.length] },
            onClick: () => {
              za(c.wish, H), ct(), A("plan");
            },
            children: [
              /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
                H + 1,
                "일차"
              ] }),
              Lt(nt),
              " (",
              St(nt),
              ")"
            ]
          },
          H
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ a("div", { className: "jt", children: [
    /* @__PURE__ */ t("style", { children: Qe }),
    /* @__PURE__ */ t(Do, {}),
    Jt
  ] });
}
var Qe = `
.jt{--ink:#14213D;--muted:#66718A;--rule:#DCE1EA;--card:#fff;--blue:#0C86AE;font-family:"Pretendard","Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif;background:var(--paper);color:var(--ink);min-height:100vh;max-width:520px;margin:0 auto;display:flex;flex-direction:column;position:relative;font-size:15px;line-height:1.45;-webkit-text-size-adjust:100%;--paper:#F1F3F6;--soft:#E7EAF0}
.jt *{box-sizing:border-box}
:where(.jt) button{font:inherit;color:inherit;cursor:pointer}
.jt button:focus-visible,.jt input:focus-visible,.jt select:focus-visible,.jt textarea:focus-visible,.jt [role=button]:focus-visible,.jt a:focus-visible{outline:3px solid var(--blue);outline-offset:2px}
.jt h1,.jt h3,.jt h4,.jt p,.jt ul,.jt ol{margin:0;padding:0}
.jt ul,.jt ol{list-style:none}
.jt-loading{padding:96px 20px;text-align:center;color:var(--muted);font-size:15px;font-weight:600}
.jt-loading-sub{margin-top:10px;font-size:13px;font-weight:500}
.jt-dots{display:flex;justify-content:center;gap:9px;height:22px;align-items:flex-end;margin-bottom:14px}
.jt-dots i{width:10px;height:10px;border-radius:50%;animation:jt-dot 1.1s ease-in-out infinite}
.jt-dots i:nth-child(1){background:#E8800A}
.jt-dots i:nth-child(2){background:#D9262E;animation-delay:.15s}
.jt-dots i:nth-child(3){background:#0A9B6E;animation-delay:.3s}
@keyframes jt-dot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-10px);opacity:1}}
@keyframes jt-dotfade{0%,100%{opacity:.35}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){.jt-dots i{animation:jt-dotfade 1.4s ease-in-out infinite}}
.jt-head{background:var(--ink);color:#fff}
.jt-head-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.jt-head h1{font-size:26px;font-weight:800;letter-spacing:-.02em;line-height:1.2}
.jt-head-sub{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:6px;color:#C4CCDD;font-size:14px}
.jt-dday{background:#fff;color:var(--ink);font-weight:700;font-size:13px;padding:2px 10px;border-radius:999px}
.jt-me{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:0;color:#fff;padding:4px 12px 4px 4px;border-radius:999px;font-weight:600}
.jt-avatar{display:inline-grid;place-items:center;border-radius:50%;color:#fff;font-weight:800;flex:0 0 auto}
.jt-icon{background:none;border:0;padding:8px;border-radius:50%;display:grid;place-items:center;color:var(--ink)}
.jt-icon.sm{padding:6px;color:var(--muted)}
.jt-icon.light{color:#fff}
.jt-error{margin:12px 16px 0;background:#FDECEC;color:#9B1C1C;border-radius:10px;padding:10px 12px;display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:14px}
.jt-error button{background:none;border:0;padding:2px;color:inherit}
.jt-nav{position:sticky;bottom:0;display:grid;padding-bottom:env(safe-area-inset-bottom);z-index:10;grid-template-columns:repeat(5,1fr)}
.jt-nav button{background:none;border:0;display:flex;flex-direction:column;align-items:center;gap:3px;font-weight:600;color:var(--muted);white-space:nowrap}
.jt-days{display:flex;gap:8px;overflow-x:auto;padding:10px 2px 14px;margin:0 -2px;scrollbar-width:none;scroll-snap-type:x proximity}
.jt-days::-webkit-scrollbar{display:none}
.jt-day.active .jt-line{margin-top:4px}
.jt-row{display:grid;grid-template-columns:46px 26px 1fr;column-gap:4px;padding-bottom:8px}
.jt-time{font-size:13px;font-weight:700;color:var(--muted);text-align:right;font-variant-numeric:tabular-nums;padding-top:6px}
.jt-rail{position:relative}
.jt-rail::before{content:"";position:absolute;left:50%;top:0;bottom:-10px;width:5px;margin-left:-2.5px;background:var(--lc)}
.jt-row:only-child .jt-rail::before{display:none}
.jt-node{position:absolute;left:50%;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#fff;border:5px solid var(--lc);top:9px}
.jt-card{background:var(--card);border:1px solid var(--rule);cursor:pointer}
.jt-card:active{background:#F8F9FB}
.jt-card-title{font-weight:700;font-size:16px}
.jt-meta{display:flex;align-items:center;gap:4px;color:var(--muted);font-size:13px;margin-top:2px}
.jt-memo{font-size:14px;margin-top:6px;white-space:pre-wrap;color:#33405C}
.jt-by{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);margin-top:8px}
.jt-by.grow{margin:0;margin-left:auto}
.jt-empty{text-align:center;color:var(--muted)}
.jt-empty p:first-child{font-weight:700;color:var(--ink);margin-bottom:4px}
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
.jt-who-btn{display:flex;align-items:center;gap:14px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:12px 16px;font-size:18px;font-weight:700;text-align:left;position:relative}
.jt-who-btn:active{background:#EDF0F5}
.jt-scrim{position:fixed;inset:0;background:rgba(20,33,61,.5);display:flex;align-items:flex-end;justify-content:center;z-index:50}
.jt-sheet{background:var(--paper);width:100%;max-width:520px;max-height:90vh;overflow:auto;border-radius:18px 18px 0 0;padding:8px 20px 28px;animation:jt-up .22s ease-out}
@keyframes jt-up{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}
.jt-sheet-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.jt-sheet-head h3{font-size:18px;font-weight:800}
.jt-daypick{display:flex;flex-direction:column;gap:8px}
.jt-daypick button{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:10px 14px;font-weight:700;text-align:left}
.jt-list{display:flex;flex-direction:column;gap:10px}
.jt-wish{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px}
.jt-wish-top{display:flex;align-items:center;gap:8px}
.jt-wish-top strong{font-size:16px}
.jt-tag{color:#fff;font-size:12px;font-weight:700;padding:2px 9px;border-radius:6px}
.jt-wish-bottom{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.jt-like{display:inline-flex;align-items:center;gap:5px;background:#fff;border:1.5px solid var(--rule);color:var(--muted);border-radius:999px;padding:4px 11px;font-weight:700}
.jt-like.on{color:#D9262E;border-color:#D9262E;background:#FEF3F3}
.jt-like.open{color:var(--ink);border-color:var(--ink)}
.jt-planned{font-size:13px;font-weight:700}
.jt-total{background:#fff;border:1px solid var(--rule);border-radius:12px;display:flex;flex-direction:column;margin-bottom:12px;padding:18px 18px 16px}
.jt-total span{font-size:13px;color:var(--muted);font-weight:600}
.jt-total em{font-style:normal;color:var(--muted)}
.jt-seg{display:grid;grid-template-columns:1fr 1fr;background:#E3E7EE;border-radius:10px;padding:3px;margin-bottom:14px}
.jt-seg button{background:none;border:0;padding:8px;border-radius:8px;font-weight:700;color:var(--muted)}
.jt-seg button.on{background:#fff;color:var(--ink)}
.jt-pip{width:12px;height:12px;border-radius:50%;background:var(--lc)}
.jt-spend{width:100%;text-align:left;background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px}
.jt-spend:active{background:#F8F9FB}
.jt-spend-main{min-width:0;flex:1}
.jt-spend-amt{display:flex;flex-direction:column;align-items:flex-end;text-align:right;flex:0 0 auto}
.jt-spend-amt strong{font-variant-numeric:tabular-nums}
.jt-spend-amt span{font-size:12px;color:var(--muted)}
.jt-moves{display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
.jt-moves li{background:#fff;border:1px solid var(--rule);border-left:5px solid var(--ink);border-radius:10px;padding:12px;display:grid;grid-template-columns:1fr auto;align-items:baseline;column-gap:10px}
.jt-moves li strong{font-size:18px;font-variant-numeric:tabular-nums}
.jt-moves li em{grid-column:2;font-style:normal;font-size:12px;color:var(--muted);text-align:right}
.jt-person-main{display:flex;flex-direction:column;flex:1;min-width:0}
.jt-person-main span{font-size:12px;color:var(--muted)}
.jt-net{font-weight:700;color:var(--muted);text-align:right;font-size:13px;line-height:1.3;white-space:nowrap;font-variant-numeric:tabular-nums}
.jt-net.plus{color:#0A7D58}
.jt-net.minus{color:#B42318}
.jt-comments{margin-top:12px;border-top:1px solid var(--rule);padding-top:10px}
.jt-comments ul{display:flex;flex-direction:column;gap:10px}
.jt-nocomment{margin:0 0 4px}
.jt-comment{display:flex;gap:8px;align-items:flex-start}
.jt-comment-body{flex:1;min-width:0;background:#F2F4F7;border-radius:10px;padding:6px 10px}
.jt-comment-body div{display:flex;gap:6px;align-items:baseline}
.jt-comment-body strong{font-size:13px}
.jt-comment-body span{font-size:11px;color:var(--muted)}
.jt-comment-body p{font-size:14px;white-space:pre-wrap;word-break:break-word}
