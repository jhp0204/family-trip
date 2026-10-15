return yt = Q, Dt = $, /* @__PURE__ */ a(Sa.Fragment, { children: [
        gt && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": Q, children: /* @__PURE__ */ t("span", { children: Q }) }),
        /* @__PURE__ */ a(
          "li",
          {
            id: "msg-" + $.id,
            className: "jt-msg" + (ot ? " mine" : "") + (wt ? " cont" : "") + (u === $.id ? " flash" : ""),
            children: [
              !ot && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !wt && /* @__PURE__ */ t(rt, { name: $.by, members: C, size: 30 }) }),
              /* @__PURE__ */ a("div", { className: "jt-msg-col", children: [
                !ot && !wt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: $.by }),
                /* @__PURE__ */ a("div", { className: "jt-msg-row", children: [
                  v === $.id ? /* @__PURE__ */ a("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: j,
                        onChange: (tt) => M(tt.target.value),
                        onKeyDown: (tt) => {
                          tt.key === "Enter" && !tt.shiftKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), _($)), tt.key === "Escape" && I(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ a("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => I(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => _($), disabled: !j.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + ($.kind === "loc" ? " loc" : "") + (r && r.id === $.id ? " pinned" : ""),
                      onClick: () => k(p === $.id ? null : $.id),
                      "aria-label": ot ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": p === $.id,
                      children: $.kind === "loc" ? /* @__PURE__ */ a("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(Et, { size: 16 }),
                        ot ? "내 위치를 보냈어요" : `${$.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: Tn($.text) })
                    }
                  ),
                  /* @__PURE__ */ a("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let tt = C.filter((Ht) => Ht !== $.by && (i[Ht] || 0) < $.at);
                      return tt.length > 0 ? /* @__PURE__ */ t("b", { className: "jt-unread", title: `안 읽음: ${tt.join(", ")}`, "aria-label": `${tt.length}명 안 읽음`, children: tt.length }) : null;
                    })(),
                    /* @__PURE__ */ a("time", { className: "jt-msg-time", children: [
                      $.editedAt ? "수정됨 " : "",
                      Qo($.at)
                    ] })
                  ] })
                ] }),
                $.kind === "loc" && /* @__PURE__ */ a("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ a("a", { className: "jt-maplink", href: At({ lat: $.lat, lng: $.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(Kt, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !ot && /* @__PURE__ */ a("a", { className: "jt-maplink", href: ta($), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ t(vt, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                p === $.id && v !== $.id && /* @__PURE__ */ a("div", { className: "jt-msg-menu", children: [
                  r && r.id === $.id ? /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        h(), k(null);
                      },
                      children: [
                        /* @__PURE__ */ t(wn, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        m($), k(null), R(!1);
                      },
                      children: [
                        /* @__PURE__ */ t(Ja, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  ot && $.kind !== "loc" && /* @__PURE__ */ a("button", { type: "button", className: "jt-like", onClick: () => Y($), children: [
                    /* @__PURE__ */ t(fe, { size: 14 }),
                    "수정"
                  ] }),
                  ot && /* @__PURE__ */ t(
                    St,
                    {
                      onConfirm: () => {
                        x($), k(null);
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
    /* @__PURE__ */ t("div", { ref: S }),
    /* @__PURE__ */ a("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "jt-chat-loc", onClick: be, disabled: z, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ t(Et, { size: 20 }) }),
      /* @__PURE__ */ t(
        "textarea",
        {
          rows: 1,
          value: N,
          onChange: ($) => s($.target.value),
          onKeyDown: ($) => {
            $.key === "Enter" && !$.shiftKey && !$.nativeEvent.isComposing && ($.preventDefault(), Wt());
          },
          placeholder: z ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: Wt, disabled: !N.trim(), "aria-label": "보내기", children: /* @__PURE__ */ t(Bn, { size: 18 }) })
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
], ni = (e) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(e) + "?width=1280", ai = (e) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(e.replace(/ /g, "_")), oi = 7e3;
function ii() {
  let [e, n] = w(0), [o, i] = w({}), r = H(o);
  if (r.current = o, O(() => {
    let g = setInterval(() => {
      n((m) => {
        let h = m;
        for (let c = 0; c < $t.length && (h = (h + 1) % $t.length, !!r.current[h]); c++)
          ;
        return h;
      });
    }, oi);
    return () => clearInterval(g);
  }, []), $t.every((g, m) => o[m])) return null;
  let x = $t[e];
  return /* @__PURE__ */ a(pt, { children: [
    /* @__PURE__ */ a("div", { className: "jt-hero", "aria-hidden": "true", children: [
      $t.map((g, m) => /* @__PURE__ */ t(
        "img",
        {
          src: ni(g.f),
          alt: "",
          className: m === e ? "on" : "",
          style: { objectPosition: g.pos },
          loading: m === 0 ? "eager" : "lazy",
          onError: () => i((h) => ({ ...h, [m]: !0 }))
        },
        g.f
      )),
      /* @__PURE__ */ t("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ t("div", { className: "jt-hero-dots", "aria-hidden": "true", children: $t.map((g, m) => /* @__PURE__ */ t("i", { className: m === e ? "on" : "" }, g.f)) }),
      /* @__PURE__ */ a("a", { className: "jt-hero-cap", href: ai(x.f), target: "_blank", rel: "noopener noreferrer", children: [
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
  let [e, n] = w(!1), [o, i] = w(null), [r, y] = w([]), [x, g] = w([]), [m, h] = w([]), [c, E] = w(null), [b, C] = w("plan"), [N, s] = w(0), [p, k] = w(!1), [z, A] = w(!1), v = H(null), I = H(!1), [j, M] = w(null), [l, R] = w(""), u = H(!1), [f, T] = w(null), [D, X] = w(!1), [Y, _] = w({}), [S, W] = w(!1), [Ft, Wt] = w(null), [be, yt] = w("");
  O(() => {
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
  let [Dt, $] = w(!1), [Q, gt] = w([]), [ot, wt] = w(null), [tt, Ht] = w(0), [Xe, qe] = w({}), [Ge, Ve] = w(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  O(() => {
    (async () => {
      try {
        let d = await window.storage.get("chatread", !1);
        d && d.value && Ht(Number(d.value) || 0);
      } catch {
      }
    })();
  }, []);
  let Ze = async (d) => {
    let F = { id: Pt(), by: c, at: Date.now(), ...d }, P = Fe(F);
    gt((U) => [...U, { ...F, key: P, pending: !0 }]), await ut(P, F) || (gt((U) => U.filter((L) => L.id !== F.id)), bt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, aa = async (d, F) => {
    let P = { id: d.id, by: d.by, at: d.at, kind: d.kind, text: F, editedAt: Date.now() };
    gt((U) => U.map((L) => L.id === d.id ? { ...L, text: F, editedAt: P.editedAt } : L)), await ut(d.key || Fe(d), P) || bt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, oa = async (d) => {
    let F = { id: d.id, by: d.by, kind: d.kind || "text", text: d.text || "", lat: d.lat, lng: d.lng, pinnedBy: c, pinnedAt: Date.now() };
    wt(F);
    let P = await ut(q.notice, F);
    bt(P ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, Qe = async () => {
    wt(null);
    try {
      await window.storage.delete(q.notice, !0);
    } catch {
    }
    bt("공지를 해제했어요.");
  }, ia = async (d) => {
    ot && ot.id === d.id && Qe(), gt((F) => F.filter((P) => P.id !== d.id));
    try {
      await window.storage.delete(d.key || Fe(d), !0);
    } catch {
    }
  }, ra = async () => {
    let d = Ft;
    if (d || (d = await new Promise((F) => {
      if (!navigator.geolocation) return F(null);
      navigator.geolocation.getCurrentPosition(
        (P) => F({ lat: P.coords.latitude, lng: P.coords.longitude }),
        () => F(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !d) {
      bt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await Ze({ kind: "loc", lat: d.lat, lng: d.lng, text: "" });
  }, ie = Q.reduce((d, F) => F.by !== c && F.at > d ? F.at : d, 0), Yt = Q.reduce((d, F) => F.at > d ? F.at : d, 0), kt = Q.filter((d) => d.by !== c && d.at > tt).length, [tn, sa] = w(() => document.visibilityState === "visible");
  O(() => {
    let d = () => sa(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", d), () => document.removeEventListener("visibilitychange", d);
  }, []), O(() => {
    if (!(b !== "chat" || !tn || !c || !Yt)) {
      if (ie > tt) {
        Ht(ie);
        try {
          window.storage.set("chatread", String(ie), !1);
        } catch {
        }
      }
      (Xe[c] || 0) < Yt && (qe((d) => ({ ...d, [c]: Yt })), ut(Ie + encodeURIComponent(c), { at: Yt }));
    }
  }, [b, tn, Yt, ie, c]), O(() => {
    if ("setAppBadge" in navigator)
      try {
        kt > 0 ? navigator.setAppBadge(kt).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [kt, Ge]);
  let la = async () => {
    try {
      let d = await Notification.requestPermission();
      Ve(d), bt(d === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      Ve("denied");
    }
  }, [re, bt] = w("");
  O(() => {
    if (!re) return;
    let d = setTimeout(() => bt(""), 2600);
    return () => clearTimeout(d);
  }, [re]);
  let se = (d, F) => {
    W(d), $(!1), d || yt(""), F || bt(d ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", d ? "on" : "off", !1);
    } catch {
    }
  }, en = () => se(!S);
  O(() => {
    if (!S || !c || !o) return;
    let d = Se + encodeURIComponent(c), F = null, P = null, K = 0, U = (lt) => {
      P = lt, K = Date.now(), Wt(lt), ut(d, { ...lt, at: Date.now(), online: !0 });
    }, L = () => {
      if (F == null) {
        if (!navigator.geolocation) {
          yt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        F = navigator.geolocation.watchPosition(
          (lt) => {
            let je = { lat: lt.coords.latitude, lng: lt.coords.longitude, acc: Math.round(lt.coords.accuracy) };
            yt(""), !P || ue(P, je) > 25 || Date.now() - K > 6e4 ? U(je) : Wt(je);
          },
          (lt) => yt(
            lt.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, B = (lt) => {
      F != null && navigator.geolocation.clearWatch(F), F = null, lt && ut(d, { online: !1, at: Date.now() });
    }, J = () => document.visibilityState === "visible" ? L() : B(!0), et = () => B(!0), he = setInterval(() => {
      document.visibilityState === "visible" && P && U(P);
    }, 6e4);
    return document.visibilityState === "visible" && L(), document.addEventListener("visibilitychange", J), window.addEventListener("pagehide", et), () => {
      clearInterval(he), document.removeEventListener("visibilitychange", J), window.removeEventListener("pagehide", et), B(!0);
    };
  }, [S, c, !!o]);
  let ca = () => {
    let d = !D;
    X(d);
    try {
      window.storage.set("hdr", d ? "min" : "max", !1);
    } catch {
    }
  };
  O(() => {
    let d = !0, F = async () => {
      let K = await jo();
      if (d)
        if (K) {
          let U = { ...K, at: Date.now() };
          T(U), ut(q.fx, U);
        } else {
          let U = await ht(q.fx, null);
          d && U && U.rate > 0 && T({ ...U, cached: !0 });
        }
    };
    F();
    let P = setInterval(F, 3 * 36e5);
    return () => {
      d = !1, clearInterval(P);
    };
  }, []);
  let le = Ia(async () => {
    let [d, F, P, K, U] = await Promise.all([
      ht(q.settings, null),
      ht(q.plan, []),
      ht(q.wish, []),
      ht(q.spend, []),
      ht(q.notice, null)
    ]);
    wt(U && U.id ? U : null), i(d), y(F), g(P), h(K);
    try {
      let L = {};
      (await Me(Se)).forEach(([B, J]) => L[decodeURIComponent(B.slice(Se.length))] = J), _(L);
    } catch {
    }
    try {
      let L = (await Me(ea)).map(([B, J]) => ({ ...J, key: B }));
      L.sort((B, J) => B.at - J.at), gt((B) => {
        let J = B.filter((et) => et.pending && !L.some((he) => he.id === et.id));
        return [...L, ...J];
      });
    } catch {
    }
    try {
      let L = {};
      (await Me(Ie)).forEach(([B, J]) => L[decodeURIComponent(B.slice(Ie.length))] = J.at || 0), qe((B) => {
        let J = { ...L };
        return Object.keys(B).forEach((et) => J[et] = Math.max(J[et] || 0, B[et] || 0)), J;
      });
    } catch {
    }
    n(!0);
  }, []);
  O(() => {
    (async () => {
      try {
        let P = await window.storage.get("me", !1);
        P && P.value && E(P.value);
      } catch {
      }
      await le();
    })();
    let d = window.storage.onChange ? window.storage.onChange(le) : null, F = setInterval(le, d ? 6e4 : 1e4);
    return () => {
      clearInterval(F), d && d();
    };
  }, [le]), O(() => {
    if (!o || u.current) return;
    u.current = !0;
    let d = Math.round((Ct(ct(/* @__PURE__ */ new Date())) - Ct(o.start)) / 864e5);
    d >= 0 && d < o.days && s(d);
  }, [o]);
  let it = async (d, F, P, K) => {
    let U = await ht(d, F), L = K(U);
    P(L);
    let B = await ut(d, L);
    return B || R("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), B;
  }, pa = async (d) => {
    E(d), A(!1);
    try {
      await window.storage.set("me", d, !1);
    } catch {
    }
  }, da = async (d) => {
    i(d), k(!1), await ut(q.settings, d) || R("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), c && !d.members.includes(c) && E(null);
  }, st = () => M(null);
  v.current = () => {
    j ? M(null) : z ? A(!1) : p && k(!1);
  };
  let xe = !!j || z || p && !!o;
  O(() => {
    xe && !I.current ? (history.pushState({ jtOverlay: !0 }, ""), I.current = !0) : !xe && I.current && (I.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [xe]), O(() => {
    let d = () => {
      I.current && (I.current = !1, v.current && v.current());
    };
    return window.addEventListener("popstate", d), () => window.removeEventListener("popstate", d);
  }, []);
  let nn = (d, F) => ({
    add: (P, K) => it(
      d,
      [],
      F,
      (U) => U.map(
        (L) => L.id === P ? { ...L, comments: [...L.comments || [], { id: Pt(), by: c, text: K, createdAt: Date.now() }] } : L
      )
    ),
    del: (P, K) => it(
      d,
      [],
      F,
      (U) => U.map((L) => L.id === P ? { ...L, comments: (L.comments || []).filter((B) => B.id !== K) } : L)
    )
  }), an = (d, F) => (P, K) => it(d, [], F, (U) => U.map((L) => L.id === P ? vo(L, K, c) : L)), ma = an(q.plan, y), ua = an(q.wish, g), on = nn(q.plan, y), rn = nn(q.wish, g), fa = (d, F, P) => it(
    q.plan,
    [],
    y,
    (K) => F ? K.map((U) => U.id === F ? { ...U, ...d } : U) : [...K, { id: Pt(), day: P, by: c, ...d }]
  ), ga = (d) => it(q.plan, [], y, (F) => F.filter((P) => P.id !== d)), sn = (d) => it(q.wish, [], g, (F) => [...F, { id: Pt(), by: c, likes: [c], createdAt: Date.now(), ...d }]), ba = (d) => it(
    q.wish,
    [],
    g,
    (F) => F.map(
      (P) => P.id === d ? { ...P, likes: P.likes.includes(c) ? P.likes.filter((K) => K !== c) : [...P.likes, c] } : P
    )
  ), ln = (d) => it(q.wish, [], g, (F) => F.filter((P) => P.id !== d)), xa = (d, F) => it(q.wish, [], g, (P) => P.map((K) => K.id === d ? { ...K, ...F, editedAt: Date.now() } : K)), ha = async (d, F) => {
    await it(q.plan, [], y, (P) => [
      ...P,
      {
        id: Pt(),
        day: F,
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
    ]), s(F);
  }, ja = (d, F) => it(
    q.spend,
    [],
    h,
    (P) => F ? P.map((K) => K.id === F ? { ...K, ...d, editedAt: Date.now(), editedBy: c } : K) : [...P, { id: Pt(), by: c, createdAt: Date.now(), ...d }]
  ), va = (d) => it(q.spend, [], h, (F) => F.filter((P) => P.id !== d)), Jt;
  if (!e)
    Jt = /* @__PURE__ */ t("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!o || p)
    Jt = /* @__PURE__ */ t(yo, { initial: o, onSave: da, onCancel: o ? () => k(!1) : null });
  else if (!c || !o.members.includes(c) || z) {
    let d = c && o.members.includes(c);
    Jt = /* @__PURE__ */ t(
      No,
      {
        members: o.members,
        onPick: pa,
        current: d ? c : null,
        onBack: d ? () => A(!1) : null
      }
    );
  } else {
    let d = ft(o.start, 0), F = ft(o.start, o.days - 1), P = Math.round((Ct(o.start) - Ct(ct(/* @__PURE__ */ new Date()))) / 864e5), K = Math.round((Ct(ct(/* @__PURE__ */ new Date())) - Ct(o.start)) / 864e5), U = K >= 0 && K < o.days ? K : N, L = f ? { ...o, rate: f.rate, fx: f } : o;
    Jt = /* @__PURE__ */ a(pt, { children: [
      /* @__PURE__ */ a("header", { className: "jt-head hero" + (D ? " mini" : b === "plan" ? " tall" : ""), children: [
        !D && /* @__PURE__ */ t(ii, {}),
        /* @__PURE__ */ a("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ a("button", { className: "jt-me", onClick: () => A(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ t(rt, { name: c, members: o.members, size: 24 }),
            c
          ] }),
          D && /* @__PURE__ */ a("strong", { className: "jt-mini-title", children: [
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
                className: "jt-icon light jt-locbtn" + (S ? " on" : ""),
                onClick: en,
                "aria-pressed": S,
                "aria-label": S ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: S ? "위치 공유 켜짐" : "위치 공유 꺼짐",
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
                onClick: ca,
                "aria-label": D ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !D,
                children: D ? /* @__PURE__ */ t(Lt, { size: 20 }) : /* @__PURE__ */ t(Ln, { size: 20 })
              }
            ),
            /* @__PURE__ */ t("button", { className: "jt-icon light", onClick: () => k(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ t(Pa, { size: 20 }) })
          ] })
        ] }),
        !D && /* @__PURE__ */ a(pt, { children: [
          /* @__PURE__ */ t("h1", { children: o.title }),
          /* @__PURE__ */ a("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ a("span", { children: [
              d.getMonth() + 1,
              "월 ",
              d.getDate(),
              "일 – ",
              F.getMonth() + 1,
              "월 ",
              F.getDate(),
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
      l && /* @__PURE__ */ a("div", { className: "jt-error", role: "alert", children: [
        l,
        /* @__PURE__ */ t("button", { onClick: () => R(""), "aria-label": "닫기", children: /* @__PURE__ */ t(_e, { size: 16 }) })
      ] }),
      /* @__PURE__ */ a("main", { className: "jt-main", children: [
        b === "plan" && /* @__PURE__ */ t(
          Fo,
          {
            settings: L,
            schedule: r,
            day: N,
            setDay: s,
            onEdit: (B) => M({ type: "plan", item: B, day: B.day }),
            onAddAt: (B, J) => M({ type: "plan", day: B, preset: { time: J, end: Rt(Math.min(zt(J) + 60, 23 * 60 + 59)) } }),
            me: c,
            onComment: on.add,
            onDelComment: on.del,
            onReact: ma
          }
        ),
        b === "wish" && /* @__PURE__ */ t(
          Ho,
          {
            settings: L,
            plan: r,
            wish: x,
            me: c,
            onEdit: (B) => M({ type: "wish", item: B }),
            onSave: sn,
            onLike: ba,
            onPlan: (B) => M({ type: "toPlan", wish: B }),
            onDelete: ln,
            onComment: rn.add,
            onDelComment: rn.del,
            onReact: ua
          }
        ),
        b === "spend" && /* @__PURE__ */ t(
          Xo,
          {
            settings: L,
            spend: m,
            me: c,
            onEdit: (B) => M({ type: "spend", item: B })
          }
        ),
        b === "chat" && /* @__PURE__ */ t(
          ei,
          {
            settings: L,
            me: c,
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
        b === "family" && /* @__PURE__ */ t(
          Zo,
          {
            settings: L,
            me: c,
            locs: Y,
            shareOn: S,
            onToggle: en,
            myPos: Ft,
            geoErr: be
          }
        )
      ] }),
      (() => {
        let B = {
          plan: [`${N + 1}일차 일정 추가`, () => M({ type: "plan", day: N })],
          wish: ["가고 싶은 곳 추가", () => M({ type: "wish" })],
          spend: ["경비 추가", () => M({ type: "spend" })]
        }[b];
        return B ? /* @__PURE__ */ a("button", { className: "jt-fab", onClick: B[1], children: [
          /* @__PURE__ */ t(Fa, { size: 20, strokeWidth: 2.6 }),
          B[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ t("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", $a],
        ["wish", "가고 싶은 곳", Be],
        ["spend", "경비", Ra],
        ["family", "위치 공유", Oa],
        ["chat", "채팅", Wa]
      ].map(([B, J, et]) => /* @__PURE__ */ a("button", { className: b === B ? "on" : "", onClick: () => C(B), "aria-current": b === B, children: [
        /* @__PURE__ */ a("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ t(et, { size: 21 }),
          B === "chat" && kt > 0 && b !== "chat" && /* @__PURE__ */ t("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${kt}개`, children: kt > 99 ? "99+" : kt })
        ] }),
        J
      ] }, B)) }),
      j?.type === "plan" && /* @__PURE__ */ t(Tt, { title: j.item ? "일정 수정" : `${j.day + 1}일차 일정 추가`, onClose: st, children: /* @__PURE__ */ t(
        Co,
        {
          initial: j.item,
          preset: j.preset,
          gkey: o.gmapsKey,
          dayItems: r.filter((B) => B.day === j.day && B.id !== j.item?.id),
          onSave: (B) => {
            fa(B, j.item?.id, j.day), st();
          },
          onDelete: () => {
            ga(j.item.id), st();
          }
        }
      ) }),
      j?.type === "wish" && /* @__PURE__ */ t(Tt, { title: j.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: st, children: /* @__PURE__ */ t(
        zo,
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
      j?.type === "spend" && /* @__PURE__ */ t(Tt, { title: j.item ? "경비 수정" : "경비 기록", onClose: st, children: /* @__PURE__ */ t(
        Eo,
        {
          settings: L,
          me: c,
          defaultDay: U,
          initial: j.item,
          onSave: (B) => {
            ja(B, j.item?.id), st();
          },
          onDelete: () => {
            va(j.item.id), st();
          }
        }
      ) }),
      Dt && !j && /* @__PURE__ */ t(Tt, { title: "가족과 위치를 공유할까요?", onClose: () => se(!1, !0), children: /* @__PURE__ */ a("div", { className: "jt-form", children: [
        /* @__PURE__ */ a("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ t("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ t("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ t("button", { className: "jt-primary", onClick: () => se(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: () => se(!1, !0), children: "나중에 할게요" })
      ] }) }),
      re && /* @__PURE__ */ t("div", { className: "jt-toast", role: "status", children: re }),
      j?.type === "toPlan" && /* @__PURE__ */ t(Tt, { title: `"${j.wish.name}" 몇째 날에 갈까요?`, onClose: st, children: /* @__PURE__ */ t("div", { className: "jt-daypick", children: Array.from({ length: o.days }, (B, J) => {
        let et = ft(o.start, J);
        return /* @__PURE__ */ a(
          "button",
          {
            style: { "--lc": V[J % V.length] },
            onClick: () => {
              ha(j.wish, J), st(), C("plan");
            },
            children: [
              /* @__PURE__ */ a("span", { className: "jt-daychip", children: [
                J + 1,
                "일차"
              ] }),
              ne(et),
              " (",
              Mt(et),
              ")"
            ]
          },
          J
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ a("div", { className: "jt", children: [
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
.jt-comment-body div{display:flex;gap:6px;align-items:baseline}
.jt-comment-body strong{font-size:13px}
.jt-comment-body span{font-size:11px;color:var(--muted)}
.jt-comment-body p{font-size:14px;white-space:pre-wrap;word-break:break-word}
.jt-comment .jt-del{padding:4px}
.jt-comment-input{margin-top:10px}
.jt-comment-input input{padding:9px 12px}
.jt-send{flex:0 0 auto;width:42px;border:0;border-radius:10px;background:var(--ink);color:#fff !important;display:grid;place-items:center}
