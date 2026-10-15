"li",
          {
            id: "msg-" + $.id,
            className: "jt-msg" + (ot ? " mine" : "") + (yt ? " cont" : "") + (u === $.id ? " flash" : ""),
            children: [
              !ot && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !yt && /* @__PURE__ */ t(lt, { name: $.by, members: b, size: 30 }) }),
              /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
                !ot && !yt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: $.by }),
                /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
                  h === $.id ? /* @__PURE__ */ o("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: j,
                        onChange: (tt) => R(tt.target.value),
                        onKeyDown: (tt) => {
                          tt.key === "Enter" && !tt.shiftKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), _($)), tt.key === "Escape" && S(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ o("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => S(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => _($), disabled: !j.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + ($.kind === "loc" ? " loc" : "") + (s && s.id === $.id ? " pinned" : ""),
                      onClick: () => E(d === $.id ? null : $.id),
                      "aria-label": ot ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": d === $.id,
                      children: $.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(zt, { size: 16 }),
                        ot ? "내 위치를 보냈어요" : `${$.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: Pa($.text) })
                    }
                  ),
                  /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let tt = b.filter((Ht) => Ht !== $.by && (i[Ht] || 0) < $.at);
                      return tt.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${tt.join(", ")}`, "aria-label": `${tt.length}명 안 읽음`, children: tt.length }) : null;
                    })(),
                    /* @__PURE__ */ o("time", { className: "jt-msg-time", children: [
                      $.editedAt ? "수정됨 " : "",
                      Go($.at)
                    ] })
                  ] })
                ] }),
                $.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mt({ lat: $.lat, lng: $.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Ut, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !ot && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Za($), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Et, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                d === $.id && h !== $.id && /* @__PURE__ */ o("div", { className: "jt-msg-menu", children: [
                  s && s.id === $.id ? /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        w(), E(null);
                      },
                      children: [
                        /* @__PURE__ */ t(va, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        m($), E(null), P(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(Hn, { size: 14 }),
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
                        v($), E(null);
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
    /* @__PURE__ */ t("div", { ref: z }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: fe, disabled: C, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(zt, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: I,
          onChange: ($) => r($.target.value),
          onKeyDown: ($) => {
            $.key === "Enter" && !$.shiftKey && !$.nativeEvent.isComposing && ($.preventDefault(), Wt());
          },
          placeholder: C ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: Wt, disabled: !I.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(_a, { size: 18 }) })
    ] })
  ] });
}
var $t = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], Qo = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", ti = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), ei = 7e3;
function ai() {
  let [e, a] = N(0), [n, i] = N({}), s = J(n);
  if (s.current = n, K(() => {
    let f = setInterval(() => {
      a((m) => {
        let w = m;
        for (let l = 0; l < $t.length && (w = (w + 1) % $t.length, !!s.current[w]); l++)
          ;
        return w;
      });
    }, ei);
    return () => clearInterval(f);
  }, []), $t.every((f, m) => n[m])) return null;
  let v = $t[e];
  return /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      $t.map((f, m) => /* @__PURE__ */ t(
        "img",
        {
          src: Qo(f.f),
          alt: "",
          className: m === e ? "on" : "",
          style: { objectPosition: f.pos },
          loading: m === 0 ? "eager" : "lazy",
          onError: () => i((w) => ({ ...w, [m]: !0 }))
        },
        f.f
      )),
      /* @__PURE__ */ t("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ t("div", { className: "jt-hero-dots", "aria-hidden": "true", children: $t.map((f, m) => /* @__PURE__ */ t("i", { className: m === e ? "on" : "" }, f.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: ti(v.f), target: "_blank", rel: "noopener noreferrer", children: [
        v.t,
        ", 사진 ",
        v.by,
        " (",
        v.lic,
        ")"
      ] })
    ] })
  ] });
}
function He() {
  let [e, a] = N(!1), [n, i] = N(null), [s, y] = N([]), [v, f] = N([]), [m, w] = N([]), [l, M] = N(null), [x, b] = N("plan"), [I, r] = N(0), [d, E] = N(!1), [C, k] = N(!1), h = J(null), S = J(!1), [j, R] = N(null), [p, P] = N(""), u = J(!1), [g, T] = N(null), [F, X] = N(!1), [H, _] = N({}), [z, W] = N(!1), [It, Wt] = N(null), [fe, vt] = N("");
  K(() => {
    (async () => {
      try {
        let c = await window.storage.get("hdr", !1);
        c && c.value === "min" && X(!0);
      } catch {
      }
      try {
        let c = await window.storage.get("locshare", !1);
        c && c.value === "on" && W(!0), (!c || !c.value) && $(!0);
      } catch {
        $(!0);
      }
    })();
  }, []);
  let [Ft, $] = N(!1), [Q, gt] = N([]), [ot, yt] = N(null), [tt, Ht] = N(0), [Je, Xe] = N({}), [qe, Ge] = N(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  K(() => {
    (async () => {
      try {
        let c = await window.storage.get("chatread", !1);
        c && c.value && Ht(Number(c.value) || 0);
      } catch {
      }
    })();
  }, []);
  let Ve = async (c) => {
    let A = { id: Dt(), by: l, at: Date.now(), ...c }, D = Ie(A);
    gt((U) => [...U, { ...A, key: D, pending: !0 }]), await dt(D, A) || (gt((U) => U.filter((L) => L.id !== A.id)), ft("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, en = async (c, A) => {
    let D = { id: c.id, by: c.by, at: c.at, kind: c.kind, text: A, editedAt: Date.now() };
    gt((U) => U.map((L) => L.id === c.id ? { ...L, text: A, editedAt: D.editedAt } : L)), await dt(c.key || Ie(c), D) || ft("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, an = async (c) => {
    let A = { id: c.id, by: c.by, kind: c.kind || "text", text: c.text || "", lat: c.lat, lng: c.lng, pinnedBy: l, pinnedAt: Date.now() };
    yt(A);
    let D = await dt(q.notice, A);
    ft(D ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, Ze = async () => {
    yt(null);
    try {
      await window.storage.delete(q.notice, !0);
    } catch {
    }
    ft("공지를 해제했어요.");
  }, nn = async (c) => {
    ot && ot.id === c.id && Ze(), gt((A) => A.filter((D) => D.id !== c.id));
    try {
      await window.storage.delete(c.key || Ie(c), !0);
    } catch {
    }
  }, on = async () => {
    let c = It;
    if (c || (c = await new Promise((A) => {
      if (!navigator.geolocation) return A(null);
      navigator.geolocation.getCurrentPosition(
        (D) => A({ lat: D.coords.latitude, lng: D.coords.longitude }),
        () => A(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !c) {
      ft("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await Ve({ kind: "loc", lat: c.lat, lng: c.lng, text: "" });
  }, ie = Q.reduce((c, A) => A.by !== l && A.at > c ? A.at : c, 0), Yt = Q.reduce((c, A) => A.at > c ? A.at : c, 0), wt = Q.filter((c) => c.by !== l && c.at > tt).length, [Qe, sn] = N(() => document.visibilityState === "visible");
  K(() => {
    let c = () => sn(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", c), () => document.removeEventListener("visibilitychange", c);
  }, []), K(() => {
    if (!(x !== "chat" || !Qe || !l || !Yt)) {
      if (ie > tt) {
        Ht(ie);
        try {
          window.storage.set("chatread", String(ie), !1);
        } catch {
        }
      }
      (Je[l] || 0) < Yt && (Xe((c) => ({ ...c, [l]: Yt })), dt(Ae + encodeURIComponent(l), { at: Yt }));
    }
  }, [x, Qe, Yt, ie, l]), K(() => {
    if ("setAppBadge" in navigator)
      try {
        wt > 0 ? navigator.setAppBadge(wt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [wt, qe]);
  let rn = async () => {
    try {
      let c = await Notification.requestPermission();
      Ge(c), ft(c === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      Ge("denied");
    }
  }, [se, ft] = N("");
  K(() => {
    if (!se) return;
    let c = setTimeout(() => ft(""), 2600);
    return () => clearTimeout(c);
  }, [se]);
  let re = (c, A) => {
    W(c), $(!1), c || vt(""), A || ft(c ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", c ? "on" : "off", !1);
    } catch {
    }
  }, ta = () => re(!z);
  K(() => {
    if (!z || !l || !n) return;
    let c = Se + encodeURIComponent(l), A = null, D = null, O = 0, U = (rt) => {
      D = rt, O = Date.now(), Wt(rt), dt(c, { ...rt, at: Date.now(), online: !0 });
    }, L = () => {
      if (A == null) {
        if (!navigator.geolocation) {
          vt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        A = navigator.geolocation.watchPosition(
          (rt) => {
            let he = { lat: rt.coords.latitude, lng: rt.coords.longitude, acc: Math.round(rt.coords.accuracy) };
            vt(""), !D || ue(D, he) > 25 || Date.now() - O > 6e4 ? U(he) : Wt(he);
          },
          (rt) => vt(
            rt.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, B = (rt) => {
      A != null && navigator.geolocation.clearWatch(A), A = null, rt && dt(c, { online: !1, at: Date.now() });
    }, Y = () => document.visibilityState === "visible" ? L() : B(!0), et = () => B(!0), xe = setInterval(() => {
      document.visibilityState === "visible" && D && U(D);
    }, 6e4);
    return document.visibilityState === "visible" && L(), document.addEventListener("visibilitychange", Y), window.addEventListener("pagehide", et), () => {
      clearInterval(xe), document.removeEventListener("visibilitychange", Y), window.removeEventListener("pagehide", et), B(!0);
    };
  }, [z, l, !!n]);
  let ln = () => {
    let c = !F;
    X(c);
    try {
      window.storage.set("hdr", c ? "min" : "max", !1);
    } catch {
    }
  };
  K(() => {
    let c = !0, A = async () => {
      let O = await xo();
      if (c)
        if (O) {
          let U = { ...O, at: Date.now() };
          T(U), dt(q.fx, U);
        } else {
          let U = await xt(q.fx, null);
          c && U && U.rate > 0 && T({ ...U, cached: !0 });
        }
    };
    A();
    let D = setInterval(A, 3 * 36e5);
    return () => {
      c = !1, clearInterval(D);
    };
  }, []);
  let le = An(async () => {
    let [c, A, D, O, U] = await Promise.all([
      xt(q.settings, null),
      xt(q.plan, []),
      xt(q.wish, []),
      xt(q.spend, []),
      xt(q.notice, null)
    ]);
    yt(U && U.id ? U : null), i(c), y(A), f(D), w(O);
    try {
      let L = {};
      (await Ee(Se)).forEach(([B, Y]) => L[decodeURIComponent(B.slice(Se.length))] = Y), _(L);
    } catch {
    }
    try {
      let L = (await Ee(Qa)).map(([B, Y]) => ({ ...Y, key: B }));
      L.sort((B, Y) => B.at - Y.at), gt((B) => {
        let Y = B.filter((et) => et.pending && !L.some((xe) => xe.id === et.id));
        return [...L, ...Y];
      });
    } catch {
    }
    try {
      let L = {};
      (await Ee(Ae)).forEach(([B, Y]) => L[decodeURIComponent(B.slice(Ae.length))] = Y.at || 0), Xe((B) => {
        let Y = { ...L };
        return Object.keys(B).forEach((et) => Y[et] = Math.max(Y[et] || 0, B[et] || 0)), Y;
      });
    } catch {
    }
    a(!0);
  }, []);
  K(() => {
    (async () => {
      try {
        let D = await window.storage.get("me", !1);
        D && D.value && M(D.value);
      } catch {
      }
      await le();
    })();
    let c = window.storage.onChange ? window.storage.onChange(le) : null, A = setInterval(le, c ? 6e4 : 1e4);
    return () => {
      clearInterval(A), c && c();
    };
  }, [le]), K(() => {
    if (!n || u.current) return;
    u.current = !0;
    let c = Math.round((Nt(mt(/* @__PURE__ */ new Date())) - Nt(n.start)) / 864e5);
    c >= 0 && c < n.days && r(c);
  }, [n]);
  let it = async (c, A, D, O) => {
    let U = await xt(c, A), L = O(U);
    D(L);
    let B = await dt(c, L);
    return B || P("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), B;
  }, cn = async (c) => {
    M(c), k(!1);
    try {
      await window.storage.set("me", c, !1);
    } catch {
    }
  }, pn = async (c) => {
    i(c), E(!1), await dt(q.settings, c) || P("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), l && !c.members.includes(l) && M(null);
  }, st = () => R(null);
  h.current = () => {
    j ? R(null) : C ? k(!1) : d && E(!1);
  };
  let be = !!j || C || d && !!n;
  K(() => {
    be && !S.current ? (history.pushState({ jtOverlay: !0 }, ""), S.current = !0) : !be && S.current && (S.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [be]), K(() => {
    let c = () => {
      S.current && (S.current = !1, h.current && h.current());
    };
    return window.addEventListener("popstate", c), () => window.removeEventListener("popstate", c);
  }, []);
  let ea = (c, A) => ({
    add: (D, O) => it(
      c,
      [],
      A,
      (U) => U.map(
        (L) => L.id === D ? { ...L, comments: [...L.comments || [], { id: Dt(), by: l, text: O, createdAt: Date.now() }] } : L
      )
    ),
    del: (D, O) => it(
      c,
      [],
      A,
      (U) => U.map((L) => L.id === D ? { ...L, comments: (L.comments || []).filter((B) => B.id !== O) } : L)
    )
  }), aa = (c, A) => (D, O) => it(c, [], A, (U) => U.map((L) => L.id === D ? ho(L, O, l) : L)), dn = aa(q.plan, y), mn = aa(q.wish, f), na = ea(q.plan, y), oa = ea(q.wish, f), un = (c, A, D) => it(
    q.plan,
    [],
    y,
    (O) => A ? O.map((U) => U.id === A ? { ...U, ...c } : U) : [...O, { id: Dt(), day: D, by: l, ...c }]
  ), gn = (c) => it(q.plan, [], y, (A) => A.filter((D) => D.id !== c)), ia = (c) => it(q.wish, [], f, (A) => [...A, { id: Dt(), by: l, likes: [l], createdAt: Date.now(), ...c }]), fn = (c) => it(
    q.wish,
    [],
    f,
    (A) => A.map(
      (D) => D.id === c ? { ...D, likes: D.likes.includes(l) ? D.likes.filter((O) => O !== l) : [...D.likes, l] } : D
    )
  ), sa = (c) => it(q.wish, [], f, (A) => A.filter((D) => D.id !== c)), bn = (c, A) => it(q.wish, [], f, (D) => D.map((O) => O.id === c ? { ...O, ...A, editedAt: Date.now() } : O)), xn = async (c, A) => {
    await it(q.plan, [], y, (D) => [
      ...D,
      {
        id: Dt(),
        day: A,
        by: l,
        time: "",
        title: c.name,
        wishId: c.id,
        place: c.area || "",
        link: c.link || "",
        memo: c.memo || "",
        comments: c.comments || [],
        reactions: c.reactions || {},
        ...jt(c) ? { lat: c.lat, lng: c.lng } : {}
      }
    ]), r(A);
  }, hn = (c, A) => it(
    q.spend,
    [],
    w,
    (D) => A ? D.map((O) => O.id === A ? { ...O, ...c, editedAt: Date.now(), editedBy: l } : O) : [...D, { id: Dt(), by: l, createdAt: Date.now(), ...c }]
  ), jn = (c) => it(q.spend, [], w, (A) => A.filter((D) => D.id !== c)), Jt;
  if (!e)
    Jt = /* @__PURE__ */ t("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || d)
    Jt = /* @__PURE__ */ t(jo, { initial: n, onSave: pn, onCancel: n ? () => E(!1) : null });
  else if (!l || !n.members.includes(l) || C) {
    let c = l && n.members.includes(l);
    Jt = /* @__PURE__ */ t(
      yo,
      {
        members: n.members,
        onPick: cn,
        current: c ? l : null,
        onBack: c ? () => k(!1) : null
      }
    );
  } else {
    let c = ut(n.start, 0), A = ut(n.start, n.days - 1), D = Math.round((Nt(n.start) - Nt(mt(/* @__PURE__ */ new Date()))) / 864e5), O = Math.round((Nt(mt(/* @__PURE__ */ new Date())) - Nt(n.start)) / 864e5), U = O >= 0 && O < n.days ? O : I, L = g ? { ...n, rate: g.rate, fx: g } : n;
    Jt = /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (F ? " mini" : x === "plan" ? " tall" : ""), children: [
        !F && /* @__PURE__ */ t(ai, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => k(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(lt, { name: l, members: n.members, size: 24 }),
            l
          ] }),
          F && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
            n.title,
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
                className: "jt-icon light jt-locbtn" + (z ? " on" : ""),
                onClick: ta,
                "aria-pressed": z,
                "aria-label": z ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: z ? "위치 공유 켜짐" : "위치 공유 꺼짐",
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
                onClick: ln,
                "aria-label": F ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !F,
                children: F ? /* @__PURE__ */ t(Bt, { size: 20 }) : /* @__PURE__ */ t(Ta, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => E(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t(Dn, { size: 20 }) })
          ] })
        ] }),
        !F && /* @__PURE__ */ o(ct, { children: [
          /* @__PURE__ */ t("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              c.getMonth() + 1,
              "월 ",
              c.getDate(),
              "일 – ",
              A.getMonth() + 1,
              "월 ",
              A.getDate(),
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
      p && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        p,
        /* @__PURE__ */ t("button", { onClick: () => P(""), "aria-label": "닫기", children: /* @__PURE__ */ t(_e, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        x === "plan" && /* @__PURE__ */ t(
          So,
          {
            settings: L,
            schedule: s,
            day: I,
            setDay: r,
            onEdit: (B) => R({ type: "plan", item: B, day: B.day }),
            onAddAt: (B, Y) => R({ type: "plan", day: B, preset: { time: Y, end: Pt(Math.min(Ct(Y) + 60, 23 * 60 + 59)) } }),
            me: l,
            onComment: na.add,
            onDelComment: na.del,
            onReact: dn
          }
        ),
        x === "wish" && /* @__PURE__ */ t(
          Uo,
          {
            settings: L,
            plan: s,
            wish: v,
            me: l,
            onEdit: (B) => R({ type: "wish", item: B }),
            onSave: ia,
            onLike: fn,
            onPlan: (B) => R({ type: "toPlan", wish: B }),
            onDelete: sa,
            onComment: oa.add,
            onDelComment: oa.del,
            onReact: mn
          }
        ),
        x === "spend" && /* @__PURE__ */ t(
          Ho,
          {
            settings: L,
            spend: m,
            me: l,
            onEdit: (B) => R({ type: "spend", item: B })
          }
        ),
        x === "chat" && /* @__PURE__ */ t(
          Zo,
          {
            settings: L,
            me: l,
            msgs: Q,
            reads: Je,
            notice: ot,
            onEdit: en,
            onPin: an,
            onUnpin: Ze,
            badgeAsk: qe === "default",
            onBadgeAsk: rn,
            onSend: (B) => Ve({ kind: "text", text: B }),
            onDelete: nn,
            onSendLoc: on
          }
        ),
        x === "family" && /* @__PURE__ */ t(
          qo,
          {
            settings: L,
            me: l,
            locs: H,
            shareOn: z,
            onToggle: ta,
            myPos: It,
            geoErr: fe
          }
        )
      ] }),
      (() => {
        let B = {
          plan: [`${I + 1}일차 일정 추가`, () => R({ type: "plan", day: I })],
          wish: ["가고 싶은 곳 추가", () => R({ type: "wish" })],
          spend: ["경비 추가", () => R({ type: "spend" })]
        }[x];
        return B ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: B[1], children: [
          /* @__PURE__ */ t(In, { size: 20, strokeWidth: 2.6 }),
          B[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", $n],
        ["wish", "가고 싶은 곳", Te],
        ["spend", "경비", Pn],
        ["family", "위치 공유", Ln],
        ["chat", "채팅", Kn]
      ].map(([B, Y, et]) => /* @__PURE__ */ o("button", { className: x === B ? "on" : "", onClick: () => b(B), "aria-current": x === B, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(et, { size: 21 }),
          B === "chat" && wt > 0 && x !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${wt}개`, children: wt > 99 ? "99+" : wt })
        ] }),
        Y
      ] }, B)) }),
      j?.type === "plan" && /* @__PURE__ */ t(Rt, { title: j.item ? "일정 수정" : `${j.day + 1}일차 일정 추가`, onClose: st, children: /* @__PURE__ */ t(
        wo,
        {
          initial: j.item,
          preset: j.preset,
          gkey: n.gmapsKey,
          dayItems: s.filter((B) => B.day === j.day && B.id !== j.item?.id),
          onSave: (B) => {
            un(B, j.item?.id, j.day), st();
          },
          onDelete: () => {
            gn(j.item.id), st();
          }
        }
      ) }),
      j?.type === "wish" && /* @__PURE__ */ t(Rt, { title: j.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: st, children: /* @__PURE__ */ t(
        ko,
        {
          initial: j.item,
          onSave: (B) => {
            j.item ? bn(j.item.id, B) : ia(B), st();
          },
          onDelete: () => {
            sa(j.item.id), st();
          }
        }
      ) }),
      j?.type === "spend" && /* @__PURE__ */ t(Rt, { title: j.item ? "경비 수정" : "경비 기록", onClose: st, children: /* @__PURE__ */ t(
        No,
        {
          settings: L,
          me: l,
          defaultDay: U,
          initial: j.item,
          onSave: (B) => {
            hn(B, j.item?.id), st();
          },
          onDelete: () => {
            jn(j.item.id), st();
          }
        }
      ) }),
      Ft && !j && /* @__PURE__ */ t(Rt, { title: "가족과 위치를 공유할까요?", onClose: () => re(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
        /* @__PURE__ */ o("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ t("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ t("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ t("button", { className: "jt-primary", onClick: () => re(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: () => re(!1, !0), children: "나중에 할게요" })
      ] }) }),
      se && /* @__PURE__ */ t("div", { className: "jt-toast", role: "status", children: se }),
      j?.type === "toPlan" && /* @__PURE__ */ t(Rt, { title: `"${j.wish.name}" 몇째 날에 갈까요?`, onClose: st, children: /* @__PURE__ */ t("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (B, Y) => {
        let et = ut(n.start, Y);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": V[Y % V.length] },
            onClick: () => {
              xn(j.wish, Y), st(), b("plan");
            },
            children: [
              /* @__PURE__ */ t("span", { className: "jt-day-dot", children: Y + 1 }),
              Y + 1,
              "일차 ",
              ae(et),
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
    /* @__PURE__ */ t("style", { children: Ye }),
    Jt
  ] });
}
var Ye = `
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
