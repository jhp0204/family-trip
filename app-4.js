] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: a.map((P) => {
      let Q = Zo(P.at), gt = Q !== vt, ot = P.by === n, yt = !gt && Ft && Ft.by === P.by && P.at - Ft.at < 5 * 6e4;
      return vt = Q, Ft = P, /* @__PURE__ */ o(Aa.Fragment, { children: [
        gt && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": Q, children: /* @__PURE__ */ t("span", { children: Q }) }),
        /* @__PURE__ */ o(
          "li",
          {
            id: "msg-" + P.id,
            className: "jt-msg" + (ot ? " mine" : "") + (yt ? " cont" : "") + (m === P.id ? " flash" : ""),
            children: [
              !ot && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !yt && /* @__PURE__ */ t(rt, { name: P.by, members: z, size: 30 }) }),
              /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
                !ot && !yt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: P.by }),
                /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
                  h === P.id ? /* @__PURE__ */ o("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: j,
                        onChange: (tt) => R(tt.target.value),
                        onKeyDown: (tt) => {
                          tt.key === "Enter" && !tt.shiftKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), _(P)), tt.key === "Escape" && A(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ o("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => A(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => _(P), disabled: !j.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + (P.kind === "loc" ? " loc" : "") + (r && r.id === P.id ? " pinned" : ""),
                      onClick: () => N(c === P.id ? null : P.id),
                      "aria-label": ot ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": c === P.id,
                      children: P.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(zt, { size: 16 }),
                        ot ? "내 위치를 보냈어요" : `${P.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: _n(P.text) })
                    }
                  ),
                  /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let tt = z.filter((Ht) => Ht !== P.by && (i[Ht] || 0) < P.at);
                      return tt.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${tt.join(", ")}`, "aria-label": `${tt.length}명 안 읽음`, children: tt.length }) : null;
                    })(),
                    /* @__PURE__ */ o("time", { className: "jt-msg-time", children: [
                      P.editedAt ? "수정됨 " : "",
                      Vo(P.at)
                    ] })
                  ] })
                ] }),
                P.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mt({ lat: P.lat, lng: P.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Ut, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !ot && /* @__PURE__ */ o("a", { className: "jt-maplink", href: ta(P), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Et, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                c === P.id && h !== P.id && /* @__PURE__ */ o("div", { className: "jt-msg-menu", children: [
                  r && r.id === P.id ? /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        y(), N(null);
                      },
                      children: [
                        /* @__PURE__ */ t(wn, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        u(P), N(null), $(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(Ya, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  ot && P.kind !== "loc" && /* @__PURE__ */ o("button", { type: "button", className: "jt-like", onClick: () => H(P), children: [
                    /* @__PURE__ */ t(ge, { size: 14 }),
                    "수정"
                  ] }),
                  ot && /* @__PURE__ */ t(
                    St,
                    {
                      onConfirm: () => {
                        x(P), N(null);
                      },
                      label: "삭제"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] }, P.id);
    }) }),
    /* @__PURE__ */ t("div", { ref: S }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: fe, disabled: E, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(zt, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: C,
          onChange: (P) => s(P.target.value),
          onKeyDown: (P) => {
            P.key === "Enter" && !P.shiftKey && !P.nativeEvent.isComposing && (P.preventDefault(), Wt());
          },
          placeholder: E ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: Wt, disabled: !C.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(Bn, { size: 18 }) })
    ] })
  ] });
}
var Pt = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], ti = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", ei = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), ni = 7e3;
function ai() {
  let [e, n] = w(0), [a, i] = w({}), r = J(a);
  if (r.current = a, U(() => {
    let b = setInterval(() => {
      n((u) => {
        let y = u;
        for (let l = 0; l < Pt.length && (y = (y + 1) % Pt.length, !!r.current[y]); l++)
          ;
        return y;
      });
    }, ni);
    return () => clearInterval(b);
  }, []), Pt.every((b, u) => a[u])) return null;
  let x = Pt[e];
  return /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      Pt.map((b, u) => /* @__PURE__ */ t(
        "img",
        {
          src: ti(b.f),
          alt: "",
          className: u === e ? "on" : "",
          style: { objectPosition: b.pos },
          loading: u === 0 ? "eager" : "lazy",
          onError: () => i((y) => ({ ...y, [u]: !0 }))
        },
        b.f
      )),
      /* @__PURE__ */ t("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ t("div", { className: "jt-hero-dots", "aria-hidden": "true", children: Pt.map((b, u) => /* @__PURE__ */ t("i", { className: u === e ? "on" : "" }, b.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: ei(x.f), target: "_blank", rel: "noopener noreferrer", children: [
        x.t,
        ", 사진 ",
        x.by,
        " (",
        x.lic,
        ")"
      ] })
    ] })
  ] });
}
function Ye() {
  let [e, n] = w(!1), [a, i] = w(null), [r, v] = w([]), [x, b] = w([]), [u, y] = w([]), [l, M] = w(null), [f, z] = w("plan"), [C, s] = w(0), [c, N] = w(!1), [E, k] = w(!1), h = J(null), A = J(!1), [j, R] = w(null), [d, $] = w(""), m = J(!1), [g, T] = w(null), [F, X] = w(!1), [H, _] = w({}), [S, W] = w(!1), [It, Wt] = w(null), [fe, vt] = w("");
  U(() => {
    (async () => {
      try {
        let p = await window.storage.get("hdr", !1);
        p && p.value === "min" && X(!0);
      } catch {
      }
      try {
        let p = await window.storage.get("locshare", !1);
        p && p.value === "on" && W(!0), (!p || !p.value) && P(!0);
      } catch {
        P(!0);
      }
    })();
  }, []);
  let [Ft, P] = w(!1), [Q, gt] = w([]), [ot, yt] = w(null), [tt, Ht] = w(0), [Xe, qe] = w({}), [Ge, Ve] = w(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  U(() => {
    (async () => {
      try {
        let p = await window.storage.get("chatread", !1);
        p && p.value && Ht(Number(p.value) || 0);
      } catch {
      }
    })();
  }, []);
  let Ze = async (p) => {
    let I = { id: Dt(), by: l, at: Date.now(), ...p }, D = Ie(I);
    gt((K) => [...K, { ...I, key: D, pending: !0 }]), await dt(D, I) || (gt((K) => K.filter((L) => L.id !== I.id)), ft("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, aa = async (p, I) => {
    let D = { id: p.id, by: p.by, at: p.at, kind: p.kind, text: I, editedAt: Date.now() };
    gt((K) => K.map((L) => L.id === p.id ? { ...L, text: I, editedAt: D.editedAt } : L)), await dt(p.key || Ie(p), D) || ft("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, oa = async (p) => {
    let I = { id: p.id, by: p.by, kind: p.kind || "text", text: p.text || "", lat: p.lat, lng: p.lng, pinnedBy: l, pinnedAt: Date.now() };
    yt(I);
    let D = await dt(q.notice, I);
    ft(D ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, Qe = async () => {
    yt(null);
    try {
      await window.storage.delete(q.notice, !0);
    } catch {
    }
    ft("공지를 해제했어요.");
  }, ia = async (p) => {
    ot && ot.id === p.id && Qe(), gt((I) => I.filter((D) => D.id !== p.id));
    try {
      await window.storage.delete(p.key || Ie(p), !0);
    } catch {
    }
  }, ra = async () => {
    let p = It;
    if (p || (p = await new Promise((I) => {
      if (!navigator.geolocation) return I(null);
      navigator.geolocation.getCurrentPosition(
        (D) => I({ lat: D.coords.latitude, lng: D.coords.longitude }),
        () => I(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !p) {
      ft("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await Ze({ kind: "loc", lat: p.lat, lng: p.lng, text: "" });
  }, ie = Q.reduce((p, I) => I.by !== l && I.at > p ? I.at : p, 0), Yt = Q.reduce((p, I) => I.at > p ? I.at : p, 0), wt = Q.filter((p) => p.by !== l && p.at > tt).length, [tn, sa] = w(() => document.visibilityState === "visible");
  U(() => {
    let p = () => sa(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", p), () => document.removeEventListener("visibilitychange", p);
  }, []), U(() => {
    if (!(f !== "chat" || !tn || !l || !Yt)) {
      if (ie > tt) {
        Ht(ie);
        try {
          window.storage.set("chatread", String(ie), !1);
        } catch {
        }
      }
      (Xe[l] || 0) < Yt && (qe((p) => ({ ...p, [l]: Yt })), dt(Ae + encodeURIComponent(l), { at: Yt }));
    }
  }, [f, tn, Yt, ie, l]), U(() => {
    if ("setAppBadge" in navigator)
      try {
        wt > 0 ? navigator.setAppBadge(wt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [wt, Ge]);
  let la = async () => {
    try {
      let p = await Notification.requestPermission();
      Ve(p), ft(p === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      Ve("denied");
    }
  }, [re, ft] = w("");
  U(() => {
    if (!re) return;
    let p = setTimeout(() => ft(""), 2600);
    return () => clearTimeout(p);
  }, [re]);
  let se = (p, I) => {
    W(p), P(!1), p || vt(""), I || ft(p ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", p ? "on" : "off", !1);
    } catch {
    }
  }, en = () => se(!S);
  U(() => {
    if (!S || !l || !a) return;
    let p = Se + encodeURIComponent(l), I = null, D = null, O = 0, K = (lt) => {
      D = lt, O = Date.now(), Wt(lt), dt(p, { ...lt, at: Date.now(), online: !0 });
    }, L = () => {
      if (I == null) {
        if (!navigator.geolocation) {
          vt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        I = navigator.geolocation.watchPosition(
          (lt) => {
            let he = { lat: lt.coords.latitude, lng: lt.coords.longitude, acc: Math.round(lt.coords.accuracy) };
            vt(""), !D || ue(D, he) > 25 || Date.now() - O > 6e4 ? K(he) : Wt(he);
          },
          (lt) => vt(
            lt.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, B = (lt) => {
      I != null && navigator.geolocation.clearWatch(I), I = null, lt && dt(p, { online: !1, at: Date.now() });
    }, Y = () => document.visibilityState === "visible" ? L() : B(!0), et = () => B(!0), xe = setInterval(() => {
      document.visibilityState === "visible" && D && K(D);
    }, 6e4);
    return document.visibilityState === "visible" && L(), document.addEventListener("visibilitychange", Y), window.addEventListener("pagehide", et), () => {
      clearInterval(xe), document.removeEventListener("visibilitychange", Y), window.removeEventListener("pagehide", et), B(!0);
    };
  }, [S, l, !!a]);
  let ca = () => {
    let p = !F;
    X(p);
    try {
      window.storage.set("hdr", p ? "min" : "max", !1);
    } catch {
    }
  };
  U(() => {
    let p = !0, I = async () => {
      let O = await ho();
      if (p)
        if (O) {
          let K = { ...O, at: Date.now() };
          T(K), dt(q.fx, K);
        } else {
          let K = await xt(q.fx, null);
          p && K && K.rate > 0 && T({ ...K, cached: !0 });
        }
    };
    I();
    let D = setInterval(I, 3 * 36e5);
    return () => {
      p = !1, clearInterval(D);
    };
  }, []);
  let le = Ia(async () => {
    let [p, I, D, O, K] = await Promise.all([
      xt(q.settings, null),
      xt(q.plan, []),
      xt(q.wish, []),
      xt(q.spend, []),
      xt(q.notice, null)
    ]);
    yt(K && K.id ? K : null), i(p), v(I), b(D), y(O);
    try {
      let L = {};
      (await Ee(Se)).forEach(([B, Y]) => L[decodeURIComponent(B.slice(Se.length))] = Y), _(L);
    } catch {
    }
    try {
      let L = (await Ee(ea)).map(([B, Y]) => ({ ...Y, key: B }));
      L.sort((B, Y) => B.at - Y.at), gt((B) => {
        let Y = B.filter((et) => et.pending && !L.some((xe) => xe.id === et.id));
        return [...L, ...Y];
      });
    } catch {
    }
    try {
      let L = {};
      (await Ee(Ae)).forEach(([B, Y]) => L[decodeURIComponent(B.slice(Ae.length))] = Y.at || 0), qe((B) => {
        let Y = { ...L };
        return Object.keys(B).forEach((et) => Y[et] = Math.max(Y[et] || 0, B[et] || 0)), Y;
      });
    } catch {
    }
    n(!0);
  }, []);
  U(() => {
    (async () => {
      try {
        let D = await window.storage.get("me", !1);
        D && D.value && M(D.value);
      } catch {
      }
      await le();
    })();
    let p = window.storage.onChange ? window.storage.onChange(le) : null, I = setInterval(le, p ? 6e4 : 1e4);
    return () => {
      clearInterval(I), p && p();
    };
  }, [le]), U(() => {
    if (!a || m.current) return;
    m.current = !0;
    let p = Math.round((Nt(mt(/* @__PURE__ */ new Date())) - Nt(a.start)) / 864e5);
    p >= 0 && p < a.days && s(p);
  }, [a]);
  let it = async (p, I, D, O) => {
    let K = await xt(p, I), L = O(K);
    D(L);
    let B = await dt(p, L);
    return B || $("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), B;
  }, pa = async (p) => {
    M(p), k(!1);
    try {
      await window.storage.set("me", p, !1);
    } catch {
    }
  }, da = async (p) => {
    i(p), N(!1), await dt(q.settings, p) || $("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), l && !p.members.includes(l) && M(null);
  }, st = () => R(null);
  h.current = () => {
    j ? R(null) : E ? k(!1) : c && N(!1);
  };
  let be = !!j || E || c && !!a;
  U(() => {
    be && !A.current ? (history.pushState({ jtOverlay: !0 }, ""), A.current = !0) : !be && A.current && (A.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [be]), U(() => {
    let p = () => {
      A.current && (A.current = !1, h.current && h.current());
    };
    return window.addEventListener("popstate", p), () => window.removeEventListener("popstate", p);
  }, []);
  let nn = (p, I) => ({
    add: (D, O) => it(
      p,
      [],
      I,
      (K) => K.map(
        (L) => L.id === D ? { ...L, comments: [...L.comments || [], { id: Dt(), by: l, text: O, createdAt: Date.now() }] } : L
      )
    ),
    del: (D, O) => it(
      p,
      [],
      I,
      (K) => K.map((L) => L.id === D ? { ...L, comments: (L.comments || []).filter((B) => B.id !== O) } : L)
    )
  }), an = (p, I) => (D, O) => it(p, [], I, (K) => K.map((L) => L.id === D ? jo(L, O, l) : L)), ma = an(q.plan, v), ua = an(q.wish, b), on = nn(q.plan, v), rn = nn(q.wish, b), ga = (p, I, D) => it(
    q.plan,
    [],
    v,
    (O) => I ? O.map((K) => K.id === I ? { ...K, ...p } : K) : [...O, { id: Dt(), day: D, by: l, ...p }]
  ), fa = (p) => it(q.plan, [], v, (I) => I.filter((D) => D.id !== p)), sn = (p) => it(q.wish, [], b, (I) => [...I, { id: Dt(), by: l, likes: [l], createdAt: Date.now(), ...p }]), ba = (p) => it(
    q.wish,
    [],
    b,
    (I) => I.map(
      (D) => D.id === p ? { ...D, likes: D.likes.includes(l) ? D.likes.filter((O) => O !== l) : [...D.likes, l] } : D
    )
  ), ln = (p) => it(q.wish, [], b, (I) => I.filter((D) => D.id !== p)), xa = (p, I) => it(q.wish, [], b, (D) => D.map((O) => O.id === p ? { ...O, ...I, editedAt: Date.now() } : O)), ha = async (p, I) => {
    await it(q.plan, [], v, (D) => [
      ...D,
      {
        id: Dt(),
        day: I,
        by: l,
        time: "",
        title: p.name,
        wishId: p.id,
        place: p.area || "",
        link: p.link || "",
        memo: p.memo || "",
        comments: p.comments || [],
        reactions: p.reactions || {},
        ...jt(p) ? { lat: p.lat, lng: p.lng } : {}
      }
    ]), s(I);
  }, ja = (p, I) => it(
    q.spend,
    [],
    y,
    (D) => I ? D.map((O) => O.id === I ? { ...O, ...p, editedAt: Date.now(), editedBy: l } : O) : [...D, { id: Dt(), by: l, createdAt: Date.now(), ...p }]
  ), va = (p) => it(q.spend, [], y, (I) => I.filter((D) => D.id !== p)), Jt;
  if (!e)
    Jt = /* @__PURE__ */ t("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!a || c)
    Jt = /* @__PURE__ */ t(vo, { initial: a, onSave: da, onCancel: a ? () => N(!1) : null });
  else if (!l || !a.members.includes(l) || E) {
    let p = l && a.members.includes(l);
    Jt = /* @__PURE__ */ t(
      wo,
      {
        members: a.members,
        onPick: pa,
        current: p ? l : null,
        onBack: p ? () => k(!1) : null
      }
    );
  } else {
    let p = ut(a.start, 0), I = ut(a.start, a.days - 1), D = Math.round((Nt(a.start) - Nt(mt(/* @__PURE__ */ new Date()))) / 864e5), O = Math.round((Nt(mt(/* @__PURE__ */ new Date())) - Nt(a.start)) / 864e5), K = O >= 0 && O < a.days ? O : C, L = g ? { ...a, rate: g.rate, fx: g } : a;
    Jt = /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (F ? " mini" : f === "plan" ? " tall" : ""), children: [
        !F && /* @__PURE__ */ t(ai, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => k(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(rt, { name: l, members: a.members, size: 24 }),
            l
          ] }),
          F && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
            a.title,
            D > 0 && /* @__PURE__ */ o("em", { children: [
              "D-",
              D
            ] }),
            D === 0 && /* @__PURE__ */ t("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ o(
              "button",
              {
                className: "jt-icon light jt-locbtn" + (S ? " on" : ""),
                onClick: en,
                "aria-pressed": S,
                "aria-label": S ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: S ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ t(zt, { size: 19 }),
                  /* @__PURE__ */ t("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                className: "jt-icon light",
                onClick: ca,
                "aria-label": F ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !F,
                children: F ? /* @__PURE__ */ t(Bt, { size: 20 }) : /* @__PURE__ */ t(Ln, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => N(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t(Pa, { size: 20 }) })
          ] })
        ] }),
        !F && /* @__PURE__ */ o(ct, { children: [
          /* @__PURE__ */ t("h1", { children: a.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              p.getMonth() + 1,
              "월 ",
              p.getDate(),
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
            D === 0 && /* @__PURE__ */ t("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      d && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        d,
        /* @__PURE__ */ t("button", { onClick: () => $(""), "aria-label": "닫기", children: /* @__PURE__ */ t(_e, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        f === "plan" && /* @__PURE__ */ t(
          Ao,
          {
            settings: L,
            schedule: r,
            day: C,
            setDay: s,
            onEdit: (B) => R({ type: "plan", item: B, day: B.day }),
            onAddAt: (B, Y) => R({ type: "plan", day: B, preset: { time: Y, end: $t(Math.min(Ct(Y) + 60, 23 * 60 + 59)) } }),
            me: l,
            onComment: on.add,
            onDelComment: on.del,
            onReact: ma
          }
        ),
        f === "wish" && /* @__PURE__ */ t(
          Ko,
          {
            settings: L,
            plan: r,
            wish: x,
            me: l,
            onEdit: (B) => R({ type: "wish", item: B }),
            onSave: sn,
            onLike: ba,
            onPlan: (B) => R({ type: "toPlan", wish: B }),
            onDelete: ln,
            onComment: rn.add,
            onDelComment: rn.del,
            onReact: ua
          }
        ),
        f === "spend" && /* @__PURE__ */ t(
          Yo,
          {
            settings: L,
            spend: u,
            me: l,
            onEdit: (B) => R({ type: "spend", item: B })
          }
        ),
        f === "chat" && /* @__PURE__ */ t(
          Qo,
          {
            settings: L,
            me: l,
            msgs: Q,
            reads: Xe,
            notice: ot,
            onEdit: aa,
            onPin: oa,
            onUnpin: Qe,
            badgeAsk: Ge === "default",
            onBadgeAsk: la,
            onSend: (B) => Ze({ kind: "text", text: B }),
            onDelete: ia,
            onSendLoc: ra
          }
        ),
        f === "family" && /* @__PURE__ */ t(
          Go,
          {
            settings: L,
            me: l,
            locs: H,
            shareOn: S,
            onToggle: en,
            myPos: It,
            geoErr: fe
          }
        )
      ] }),
      (() => {
        let B = {
          plan: [`${C + 1}일차 일정 추가`, () => R({ type: "plan", day: C })],
          wish: ["가고 싶은 곳 추가", () => R({ type: "wish" })],
          spend: ["경비 추가", () => R({ type: "spend" })]
        }[f];
        return B ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: B[1], children: [
          /* @__PURE__ */ t(Fa, { size: 20, strokeWidth: 2.6 }),
          B[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", $a],
        ["wish", "가고 싶은 곳", Te],
        ["spend", "경비", Ra],
        ["family", "위치 공유", Oa],
        ["chat", "채팅", Wa]
      ].map(([B, Y, et]) => /* @__PURE__ */ o("button", { className: f === B ? "on" : "", onClick: () => z(B), "aria-current": f === B, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(et, { size: 21 }),
          B === "chat" && wt > 0 && f !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${wt}개`, children: wt > 99 ? "99+" : wt })
        ] }),
        Y
      ] }, B)) }),
      j?.type === "plan" && /* @__PURE__ */ t(Rt, { title: j.item ? "일정 수정" : `${j.day + 1}일차 일정 추가`, onClose: st, children: /* @__PURE__ */ t(
        ko,
        {
          initial: j.item,
          preset: j.preset,
          gkey: a.gmapsKey,
          dayItems: r.filter((B) => B.day === j.day && B.id !== j.item?.id),
          onSave: (B) => {
            ga(B, j.item?.id, j.day), st();
          },
          onDelete: () => {
            fa(j.item.id), st();
          }
        }
      ) }),
      j?.type === "wish" && /* @__PURE__ */ t(Rt, { title: j.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: st, children: /* @__PURE__ */ t(
        No,
        {
          initial: j.item,
          onSave: (B) => {
            j.item ? xa(j.item.id, B) : sn(B), st();
          },
          onDelete: () => {
            ln(j.item.id), st();
          }
        }
      ) }),
      j?.type === "spend" && /* @__PURE__ */ t(Rt, { title: j.item ? "경비 수정" : "경비 기록", onClose: st, children: /* @__PURE__ */ t(
        Co,
        {
          settings: L,
          me: l,
          defaultDay: K,
          initial: j.item,
          onSave: (B) => {
            ja(B, j.item?.id), st();
          },
          onDelete: () => {
            va(j.item.id), st();
          }
        }
      ) }),
      Ft && !j && /* @__PURE__ */ t(Rt, { title: "가족과 위치를 공유할까요?", onClose: () => se(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
        /* @__PURE__ */ o("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ t("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ t("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ t("button", { className: "jt-primary", onClick: () => se(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: () => se(!1, !0), children: "나중에 할게요" })
      ] }) }),
      re && /* @__PURE__ */ t("div", { className: "jt-toast", role: "status", children: re }),
      j?.type === "toPlan" && /* @__PURE__ */ t(Rt, { title: `"${j.wish.name}" 몇째 날에 갈까요?`, onClose: st, children: /* @__PURE__ */ t("div", { className: "jt-daypick", children: Array.from({ length: a.days }, (B, Y) => {
        let et = ut(a.start, Y);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": V[Y % V.length] },
            onClick: () => {
              ha(j.wish, Y), st(), z("plan");
            },
            children: [
              /* @__PURE__ */ t("span", { className: "jt-day-dot", children: Y + 1 }),
              Y + 1,
              "일차 ",
              ne(et),
              " (",
              Lt(et),
              ")"
            ]
          },
          Y
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "jt", children: [
    /* @__PURE__ */ t("style", { children: Je }),
    Jt
  ] });
}
var Je = `
.jt{--ink:#14213D;--muted:#66718A;--rule:#DCE1EA;--card:#fff;--blue:#0C86AE;font-family:"Pretendard","Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif;background:var(--paper);color:var(--ink);min-height:100vh;max-width:520px;margin:0 auto;display:flex;flex-direction:column;position:relative;font-size:15px;line-height:1.45;-webkit-text-size-adjust:100%;--paper:#F1F3F6;--soft:#E7EAF0}
.jt *{box-sizing:border-box}
:where(.jt) button{font:inherit;color:inherit;cursor:pointer}
.jt button:focus-visible,.jt input:focus-visible,.jt select:focus-visible,.jt textarea:focus-visible,.jt [role=button]:focus-visible,.jt a:focus-visible{outline:3px solid var(--blue);outline-offset:2px}
.jt h1,.jt h3,.jt h4,.jt p,.jt ul,.jt ol{margin:0;padding:0}
.jt ul,.jt ol{list-style:none}
.jt-loading{padding:80px 20px;text-align:center;color:var(--muted)}
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
.jt-days{display:flex;gap:4px;overflow-x:auto;padding:2px 2px 14px;margin:0 -4px;scrollbar-width:none}
.jt-days::-webkit-scrollbar{display:none}
.jt-day{flex:0 0 auto;width:58px;background:none;border:0;padding:4px 0;display:flex;flex-direction:column;align-items:center;gap:1px}
.jt-day-dot{width:38px;height:38px;border-radius:50%;background:var(--lc);color:#fff;font-weight:800;font-size:17px;display:grid;place-items:center;opacity:.4;transition:opacity .15s,box-shadow .15s}
.jt-day.active .jt-day-dot{opacity:1;box-shadow:0 0 0 3px var(--paper),0 0 0 5px var(--lc)}
.jt-day-date{font-size:13px;font-weight:700;margin-top:5px}
.jt-day-wk{font-size:12px;color:var(--muted)}
.jt-line{margin-top:4px}
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
.jt-daypick .jt-day-dot{opacity:1;width:32px;height:32px;font-size:15px}
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
