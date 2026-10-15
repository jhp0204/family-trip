/* @__PURE__ */ o(
          "li",
          {
            id: "msg-" + $.id,
            className: "jt-msg" + (ot ? " mine" : "") + (wt ? " cont" : "") + (m === $.id ? " flash" : ""),
            children: [
              !ot && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !wt && /* @__PURE__ */ t(rt, { name: $.by, members: z, size: 30 }) }),
              /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
                !ot && !wt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: $.by }),
                /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
                  h === $.id ? /* @__PURE__ */ o("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: j,
                        onChange: (tt) => _(tt.target.value),
                        onKeyDown: (tt) => {
                          tt.key === "Enter" && !tt.shiftKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), T($)), tt.key === "Escape" && S(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ o("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => S(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => T($), disabled: !j.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + ($.kind === "loc" ? " loc" : "") + (r && r.id === $.id ? " pinned" : ""),
                      onClick: () => N(p === $.id ? null : $.id),
                      "aria-label": ot ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": p === $.id,
                      children: $.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(Et, { size: 16 }),
                        ot ? "내 위치를 보냈어요" : `${$.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: Ra($.text) })
                    }
                  ),
                  /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let tt = z.filter((Ht) => Ht !== $.by && (i[Ht] || 0) < $.at);
                      return tt.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${tt.join(", ")}`, "aria-label": `${tt.length}명 안 읽음`, children: tt.length }) : null;
                    })(),
                    /* @__PURE__ */ o("time", { className: "jt-msg-time", children: [
                      $.editedAt ? "수정됨 " : "",
                      Vo($.at)
                    ] })
                  ] })
                ] }),
                $.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ o("a", { className: "jt-maplink", href: At({ lat: $.lat, lng: $.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Ut, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !ot && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Qa($), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(vt, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                p === $.id && h !== $.id && /* @__PURE__ */ o("div", { className: "jt-msg-menu", children: [
                  r && r.id === $.id ? /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        y(), N(null);
                      },
                      children: [
                        /* @__PURE__ */ t(ya, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        u($), N(null), P(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(Yn, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  ot && $.kind !== "loc" && /* @__PURE__ */ o("button", { type: "button", className: "jt-like", onClick: () => H($), children: [
                    /* @__PURE__ */ t(ge, { size: 14 }),
                    "수정"
                  ] }),
                  ot && /* @__PURE__ */ t(
                    St,
                    {
                      onConfirm: () => {
                        x($), N(null);
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
    /* @__PURE__ */ t("div", { ref: A }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: be, disabled: E, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(Et, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: C,
          onChange: ($) => s($.target.value),
          onKeyDown: ($) => {
            $.key === "Enter" && !$.shiftKey && !$.nativeEvent.isComposing && ($.preventDefault(), Wt());
          },
          placeholder: E ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: Wt, disabled: !C.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(Ta, { size: 18 }) })
    ] })
  ] });
}
var Pt = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], ti = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", ei = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), ai = 7e3;
function ni() {
  let [e, a] = w(0), [n, i] = w({}), r = J(n);
  if (r.current = n, U(() => {
    let b = setInterval(() => {
      a((u) => {
        let y = u;
        for (let c = 0; c < Pt.length && (y = (y + 1) % Pt.length, !!r.current[y]); c++)
          ;
        return y;
      });
    }, ai);
    return () => clearInterval(b);
  }, []), Pt.every((b, u) => n[u])) return null;
  let x = Pt[e];
  return /* @__PURE__ */ o(pt, { children: [
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
  let [e, a] = w(!1), [n, i] = w(null), [r, v] = w([]), [x, b] = w([]), [u, y] = w([]), [c, M] = w(null), [f, z] = w("plan"), [C, s] = w(0), [p, N] = w(!1), [E, k] = w(!1), h = J(null), S = J(!1), [j, _] = w(null), [l, P] = w(""), m = J(!1), [g, R] = w(null), [F, X] = w(!1), [H, T] = w({}), [A, W] = w(!1), [Ft, Wt] = w(null), [be, yt] = w("");
  U(() => {
    (async () => {
      try {
        let d = await window.storage.get("hdr", !1);
        d && d.value === "min" && X(!0);
      } catch {
      }
      try {
        let d = await window.storage.get("locshare", !1);
        d && d.value === "on" && W(!0), (!d || !d.value) && $(!0);
      } catch {
        $(!0);
      }
    })();
  }, []);
  let [Dt, $] = w(!1), [Q, ft] = w([]), [ot, wt] = w(null), [tt, Ht] = w(0), [Xe, qe] = w({}), [Ge, Ve] = w(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  U(() => {
    (async () => {
      try {
        let d = await window.storage.get("chatread", !1);
        d && d.value && Ht(Number(d.value) || 0);
      } catch {
      }
    })();
  }, []);
  let Ze = async (d) => {
    let I = { id: $t(), by: c, at: Date.now(), ...d }, D = Fe(I);
    ft((K) => [...K, { ...I, key: D, pending: !0 }]), await ut(D, I) || (ft((K) => K.filter((L) => L.id !== I.id)), bt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, an = async (d, I) => {
    let D = { id: d.id, by: d.by, at: d.at, kind: d.kind, text: I, editedAt: Date.now() };
    ft((K) => K.map((L) => L.id === d.id ? { ...L, text: I, editedAt: D.editedAt } : L)), await ut(d.key || Fe(d), D) || bt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, nn = async (d) => {
    let I = { id: d.id, by: d.by, kind: d.kind || "text", text: d.text || "", lat: d.lat, lng: d.lng, pinnedBy: c, pinnedAt: Date.now() };
    wt(I);
    let D = await ut(q.notice, I);
    bt(D ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, Qe = async () => {
    wt(null);
    try {
      await window.storage.delete(q.notice, !0);
    } catch {
    }
    bt("공지를 해제했어요.");
  }, on = async (d) => {
    ot && ot.id === d.id && Qe(), ft((I) => I.filter((D) => D.id !== d.id));
    try {
      await window.storage.delete(d.key || Fe(d), !0);
    } catch {
    }
  }, rn = async () => {
    let d = Ft;
    if (d || (d = await new Promise((I) => {
      if (!navigator.geolocation) return I(null);
      navigator.geolocation.getCurrentPosition(
        (D) => I({ lat: D.coords.latitude, lng: D.coords.longitude }),
        () => I(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !d) {
      bt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await Ze({ kind: "loc", lat: d.lat, lng: d.lng, text: "" });
  }, ie = Q.reduce((d, I) => I.by !== c && I.at > d ? I.at : d, 0), Yt = Q.reduce((d, I) => I.at > d ? I.at : d, 0), kt = Q.filter((d) => d.by !== c && d.at > tt).length, [ta, sn] = w(() => document.visibilityState === "visible");
  U(() => {
    let d = () => sn(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", d), () => document.removeEventListener("visibilitychange", d);
  }, []), U(() => {
    if (!(f !== "chat" || !ta || !c || !Yt)) {
      if (ie > tt) {
        Ht(ie);
        try {
          window.storage.set("chatread", String(ie), !1);
        } catch {
        }
      }
      (Xe[c] || 0) < Yt && (qe((d) => ({ ...d, [c]: Yt })), ut(Ie + encodeURIComponent(c), { at: Yt }));
    }
  }, [f, ta, Yt, ie, c]), U(() => {
    if ("setAppBadge" in navigator)
      try {
        kt > 0 ? navigator.setAppBadge(kt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [kt, Ge]);
  let ln = async () => {
    try {
      let d = await Notification.requestPermission();
      Ve(d), bt(d === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      Ve("denied");
    }
  }, [re, bt] = w("");
  U(() => {
    if (!re) return;
    let d = setTimeout(() => bt(""), 2600);
    return () => clearTimeout(d);
  }, [re]);
  let se = (d, I) => {
    W(d), $(!1), d || yt(""), I || bt(d ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", d ? "on" : "off", !1);
    } catch {
    }
  }, ea = () => se(!A);
  U(() => {
    if (!A || !c || !n) return;
    let d = Se + encodeURIComponent(c), I = null, D = null, O = 0, K = (lt) => {
      D = lt, O = Date.now(), Wt(lt), ut(d, { ...lt, at: Date.now(), online: !0 });
    }, L = () => {
      if (I == null) {
        if (!navigator.geolocation) {
          yt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        I = navigator.geolocation.watchPosition(
          (lt) => {
            let je = { lat: lt.coords.latitude, lng: lt.coords.longitude, acc: Math.round(lt.coords.accuracy) };
            yt(""), !D || ue(D, je) > 25 || Date.now() - O > 6e4 ? K(je) : Wt(je);
          },
          (lt) => yt(
            lt.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, B = (lt) => {
      I != null && navigator.geolocation.clearWatch(I), I = null, lt && ut(d, { online: !1, at: Date.now() });
    }, Y = () => document.visibilityState === "visible" ? L() : B(!0), et = () => B(!0), he = setInterval(() => {
      document.visibilityState === "visible" && D && K(D);
    }, 6e4);
    return document.visibilityState === "visible" && L(), document.addEventListener("visibilitychange", Y), window.addEventListener("pagehide", et), () => {
      clearInterval(he), document.removeEventListener("visibilitychange", Y), window.removeEventListener("pagehide", et), B(!0);
    };
  }, [A, c, !!n]);
  let cn = () => {
    let d = !F;
    X(d);
    try {
      window.storage.set("hdr", d ? "min" : "max", !1);
    } catch {
    }
  };
  U(() => {
    let d = !0, I = async () => {
      let O = await ho();
      if (d)
        if (O) {
          let K = { ...O, at: Date.now() };
          R(K), ut(q.fx, K);
        } else {
          let K = await ht(q.fx, null);
          d && K && K.rate > 0 && R({ ...K, cached: !0 });
        }
    };
    I();
    let D = setInterval(I, 3 * 36e5);
    return () => {
      d = !1, clearInterval(D);
    };
  }, []);
  let le = In(async () => {
    let [d, I, D, O, K] = await Promise.all([
      ht(q.settings, null),
      ht(q.plan, []),
      ht(q.wish, []),
      ht(q.spend, []),
      ht(q.notice, null)
    ]);
    wt(K && K.id ? K : null), i(d), v(I), b(D), y(O);
    try {
      let L = {};
      (await Me(Se)).forEach(([B, Y]) => L[decodeURIComponent(B.slice(Se.length))] = Y), T(L);
    } catch {
    }
    try {
      let L = (await Me(tn)).map(([B, Y]) => ({ ...Y, key: B }));
      L.sort((B, Y) => B.at - Y.at), ft((B) => {
        let Y = B.filter((et) => et.pending && !L.some((he) => he.id === et.id));
        return [...L, ...Y];
      });
    } catch {
    }
    try {
      let L = {};
      (await Me(Ie)).forEach(([B, Y]) => L[decodeURIComponent(B.slice(Ie.length))] = Y.at || 0), qe((B) => {
        let Y = { ...L };
        return Object.keys(B).forEach((et) => Y[et] = Math.max(Y[et] || 0, B[et] || 0)), Y;
      });
    } catch {
    }
    a(!0);
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
    let d = window.storage.onChange ? window.storage.onChange(le) : null, I = setInterval(le, d ? 6e4 : 1e4);
    return () => {
      clearInterval(I), d && d();
    };
  }, [le]), U(() => {
    if (!n || m.current) return;
    m.current = !0;
    let d = Math.round((Ct(ct(/* @__PURE__ */ new Date())) - Ct(n.start)) / 864e5);
    d >= 0 && d < n.days && s(d);
  }, [n]);
  let it = async (d, I, D, O) => {
    let K = await ht(d, I), L = O(K);
    D(L);
    let B = await ut(d, L);
    return B || P("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), B;
  }, pn = async (d) => {
    M(d), k(!1);
    try {
      await window.storage.set("me", d, !1);
    } catch {
    }
  }, dn = async (d) => {
    i(d), N(!1), await ut(q.settings, d) || P("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), c && !d.members.includes(c) && M(null);
  }, st = () => _(null);
  h.current = () => {
    j ? _(null) : E ? k(!1) : p && N(!1);
  };
  let xe = !!j || E || p && !!n;
  U(() => {
    xe && !S.current ? (history.pushState({ jtOverlay: !0 }, ""), S.current = !0) : !xe && S.current && (S.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [xe]), U(() => {
    let d = () => {
      S.current && (S.current = !1, h.current && h.current());
    };
    return window.addEventListener("popstate", d), () => window.removeEventListener("popstate", d);
  }, []);
  let aa = (d, I) => ({
    add: (D, O) => it(
      d,
      [],
      I,
      (K) => K.map(
        (L) => L.id === D ? { ...L, comments: [...L.comments || [], { id: $t(), by: c, text: O, createdAt: Date.now() }] } : L
      )
    ),
    del: (D, O) => it(
      d,
      [],
      I,
      (K) => K.map((L) => L.id === D ? { ...L, comments: (L.comments || []).filter((B) => B.id !== O) } : L)
    )
  }), na = (d, I) => (D, O) => it(d, [], I, (K) => K.map((L) => L.id === D ? jo(L, O, c) : L)), mn = na(q.plan, v), un = na(q.wish, b), oa = aa(q.plan, v), ia = aa(q.wish, b), gn = (d, I, D) => it(
    q.plan,
    [],
    v,
    (O) => I ? O.map((K) => K.id === I ? { ...K, ...d } : K) : [...O, { id: $t(), day: D, by: c, ...d }]
  ), fn = (d) => it(q.plan, [], v, (I) => I.filter((D) => D.id !== d)), ra = (d) => it(q.wish, [], b, (I) => [...I, { id: $t(), by: c, likes: [c], createdAt: Date.now(), ...d }]), bn = (d) => it(
    q.wish,
    [],
    b,
    (I) => I.map(
      (D) => D.id === d ? { ...D, likes: D.likes.includes(c) ? D.likes.filter((O) => O !== c) : [...D.likes, c] } : D
    )
  ), sa = (d) => it(q.wish, [], b, (I) => I.filter((D) => D.id !== d)), xn = (d, I) => it(q.wish, [], b, (D) => D.map((O) => O.id === d ? { ...O, ...I, editedAt: Date.now() } : O)), hn = async (d, I) => {
    await it(q.plan, [], v, (D) => [
      ...D,
      {
        id: $t(),
        day: I,
        by: c,
        time: "",
        title: d.name,
        wishId: d.id,
        place: d.area || "",
        link: d.link || "",
        memo: d.memo || "",
        comments: d.comments || [],
        reactions: d.reactions || {},
        ...dt(d) ? { lat: d.lat, lng: d.lng } : {}
      }
    ]), s(I);
  }, jn = (d, I) => it(
    q.spend,
    [],
    y,
    (D) => I ? D.map((O) => O.id === I ? { ...O, ...d, editedAt: Date.now(), editedBy: c } : O) : [...D, { id: $t(), by: c, createdAt: Date.now(), ...d }]
  ), vn = (d) => it(q.spend, [], y, (I) => I.filter((D) => D.id !== d)), Jt;
  if (!e)
    Jt = /* @__PURE__ */ t("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || p)
    Jt = /* @__PURE__ */ t(vo, { initial: n, onSave: dn, onCancel: n ? () => N(!1) : null });
  else if (!c || !n.members.includes(c) || E) {
    let d = c && n.members.includes(c);
    Jt = /* @__PURE__ */ t(
      wo,
      {
        members: n.members,
        onPick: pn,
        current: d ? c : null,
        onBack: d ? () => k(!1) : null
      }
    );
  } else {
    let d = gt(n.start, 0), I = gt(n.start, n.days - 1), D = Math.round((Ct(n.start) - Ct(ct(/* @__PURE__ */ new Date()))) / 864e5), O = Math.round((Ct(ct(/* @__PURE__ */ new Date())) - Ct(n.start)) / 864e5), K = O >= 0 && O < n.days ? O : C, L = g ? { ...n, rate: g.rate, fx: g } : n;
    Jt = /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (F ? " mini" : f === "plan" ? " tall" : ""), children: [
        !F && /* @__PURE__ */ t(ni, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => k(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(rt, { name: c, members: n.members, size: 24 }),
            c
          ] }),
          F && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
            /* @__PURE__ */ t("span", { className: "jt-mini-name", children: n.title }),
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
                className: "jt-icon light jt-locbtn" + (A ? " on" : ""),
                onClick: ea,
                "aria-pressed": A,
                "aria-label": A ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: A ? "위치 공유 켜짐" : "위치 공유 꺼짐",
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
                onClick: cn,
                "aria-label": F ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !F,
                children: F ? /* @__PURE__ */ t(Lt, { size: 20 }) : /* @__PURE__ */ t(Ba, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => N(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t($n, { size: 20 }) })
          ] })
        ] }),
        !F && /* @__PURE__ */ o(pt, { children: [
          /* @__PURE__ */ t("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              d.getMonth() + 1,
              "월 ",
              d.getDate(),
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
      l && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        l,
        /* @__PURE__ */ t("button", { onClick: () => P(""), "aria-label": "닫기", children: /* @__PURE__ */ t(Te, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        f === "plan" && /* @__PURE__ */ t(
          So,
          {
            settings: L,
            schedule: r,
            day: C,
            setDay: s,
            onEdit: (B) => _({ type: "plan", item: B, day: B.day }),
            onAddAt: (B, Y) => _({ type: "plan", day: B, preset: { time: Y, end: Rt(Math.min(zt(Y) + 60, 23 * 60 + 59)) } }),
            me: c,
            onComment: oa.add,
            onDelComment: oa.del,
            onReact: mn
          }
        ),
        f === "wish" && /* @__PURE__ */ t(
          Ko,
          {
            settings: L,
            plan: r,
            wish: x,
            me: c,
            onEdit: (B) => _({ type: "wish", item: B }),
            onSave: ra,
            onLike: bn,
            onPlan: (B) => _({ type: "toPlan", wish: B }),
            onDelete: sa,
            onComment: ia.add,
            onDelComment: ia.del,
            onReact: un
          }
        ),
        f === "spend" && /* @__PURE__ */ t(
          Yo,
          {
            settings: L,
            spend: u,
            me: c,
            onEdit: (B) => _({ type: "spend", item: B })
          }
        ),
        f === "chat" && /* @__PURE__ */ t(
          Qo,
          {
            settings: L,
            me: c,
            msgs: Q,
            reads: Xe,
            notice: ot,
            onEdit: an,
            onPin: nn,
            onUnpin: Qe,
            badgeAsk: Ge === "default",
            onBadgeAsk: ln,
            onSend: (B) => Ze({ kind: "text", text: B }),
            onDelete: on,
            onSendLoc: rn
          }
        ),
        f === "family" && /* @__PURE__ */ t(
          Go,
          {
            settings: L,
            me: c,
            locs: H,
            shareOn: A,
            onToggle: ea,
            myPos: Ft,
            geoErr: be
          }
        )
      ] }),
      (() => {
        let B = {
          plan: [`${C + 1}일차 일정 추가`, () => _({ type: "plan", day: C })],
          wish: ["가고 싶은 곳 추가", () => _({ type: "wish" })],
          spend: ["경비 추가", () => _({ type: "spend" })]
        }[f];
        return B ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: B[1], children: [
          /* @__PURE__ */ t(Fn, { size: 20, strokeWidth: 2.6 }),
          B[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", Pn],
        ["wish", "가고 싶은 곳", Be],
        ["spend", "경비", Rn],
        ["family", "위치 공유", On],
        ["chat", "채팅", Wn]
      ].map(([B, Y, et]) => /* @__PURE__ */ o("button", { className: f === B ? "on" : "", onClick: () => z(B), "aria-current": f === B, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(et, { size: 21 }),
          B === "chat" && kt > 0 && f !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${kt}개`, children: kt > 99 ? "99+" : kt })
        ] }),
        Y
      ] }, B)) }),
      j?.type === "plan" && /* @__PURE__ */ t(_t, { title: j.item ? "일정 수정" : `${j.day + 1}일차 일정 추가`, onClose: st, children: /* @__PURE__ */ t(
        ko,
        {
          initial: j.item,
          preset: j.preset,
          gkey: n.gmapsKey,
          dayItems: r.filter((B) => B.day === j.day && B.id !== j.item?.id),
          onSave: (B) => {
            gn(B, j.item?.id, j.day), st();
          },
          onDelete: () => {
            fn(j.item.id), st();
          }
        }
      ) }),
      j?.type === "wish" && /* @__PURE__ */ t(_t, { title: j.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: st, children: /* @__PURE__ */ t(
        No,
        {
          initial: j.item,
          onSave: (B) => {
            j.item ? xn(j.item.id, B) : ra(B), st();
          },
          onDelete: () => {
            sa(j.item.id), st();
          }
        }
      ) }),
      j?.type === "spend" && /* @__PURE__ */ t(_t, { title: j.item ? "경비 수정" : "경비 기록", onClose: st, children: /* @__PURE__ */ t(
        Co,
        {
          settings: L,
          me: c,
          defaultDay: K,
          initial: j.item,
          onSave: (B) => {
            jn(B, j.item?.id), st();
          },
          onDelete: () => {
            vn(j.item.id), st();
          }
        }
      ) }),
      Dt && !j && /* @__PURE__ */ t(_t, { title: "가족과 위치를 공유할까요?", onClose: () => se(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
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
      j?.type === "toPlan" && /* @__PURE__ */ t(_t, { title: `"${j.wish.name}" 몇째 날에 갈까요?`, onClose: st, children: /* @__PURE__ */ t("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (B, Y) => {
        let et = gt(n.start, Y);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": V[Y % V.length] },
            onClick: () => {
              hn(j.wish, Y), st(), z("plan");
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-daychip", children: [
                Y + 1,
                "일차"
              ] }),
              ae(et),
              " (",
              Mt(et),
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
