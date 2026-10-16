/* @__PURE__ */ e(Ct, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      p && /* @__PURE__ */ a("div", { className: "jt-notice-body", children: [
        I.kind === "loc" ? /* @__PURE__ */ a("p", { children: [
          I.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ e("a", { href: $t({ lat: I.lat, lng: I.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ e("p", { className: "jt-msg-text", children: ga(I.text) }),
        /* @__PURE__ */ a("span", { className: "jt-notice-meta", children: [
          I.by,
          "의 메시지, ",
          I.pinnedBy,
          "이(가) 공지로 등록",
          $ ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ a("div", { className: "jt-notice-act", children: [
          $ && /* @__PURE__ */ e("button", { type: "button", className: "jt-like", onClick: () => U(I.id), children: "메시지로 이동" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                h(), B(!1);
              },
              children: [
                /* @__PURE__ */ e(Jn, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    E && /* @__PURE__ */ a("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ e("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: c, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ e("ol", { className: "jt-msgs", children: o.map((L) => {
      let ot = ss(L.at), Zt = ot !== fe, ut = L.by === n, Qt = !Zt && Lt && Lt.by === L.by && L.at - Lt.at < 5 * 6e4;
      return fe = ot, Lt = L, /* @__PURE__ */ a(jo.Fragment, { children: [
        Zt && /* @__PURE__ */ e("li", { className: "jt-daysep", "aria-label": ot, children: /* @__PURE__ */ e("span", { children: ot }) }),
        /* @__PURE__ */ a(
          "li",
          {
            id: "msg-" + L.id,
            className: "jt-msg" + (ut ? " mine" : "") + (Qt ? " cont" : "") + (j === L.id ? " flash" : ""),
            children: [
              !ut && /* @__PURE__ */ e("span", { className: "jt-msg-av", children: !Qt && /* @__PURE__ */ e(rt, { name: L.by, members: F, size: 30 }) }),
              /* @__PURE__ */ a("div", { className: "jt-msg-col", children: [
                !ut && !Qt && /* @__PURE__ */ e("span", { className: "jt-msg-name", children: L.by }),
                /* @__PURE__ */ a("div", { className: "jt-msg-row", children: [
                  x === L.id ? /* @__PURE__ */ a("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ e(
                      "textarea",
                      {
                        rows: 2,
                        value: z,
                        onChange: (et) => C(et.target.value),
                        onKeyDown: (et) => {
                          et.key === "Enter" && !et.shiftKey && !et.nativeEvent.isComposing && (et.preventDefault(), R(L)), et.key === "Escape" && M(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ a("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => M(null), children: "취소" }),
                      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => R(L), disabled: !z.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + (L.kind === "loc" ? " loc" : "") + (s && s.id === L.id ? " pinned" : ""),
                      onClick: () => N(v === L.id ? null : L.id),
                      "aria-label": ut ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": v === L.id,
                      children: L.kind === "loc" ? /* @__PURE__ */ a("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ e(Et, { size: 16 }),
                        ut ? "내 위치를 보냈어요" : `${L.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ e("span", { className: "jt-msg-text", children: ga(L.text) })
                    }
                  ),
                  /* @__PURE__ */ a("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let et = F.filter((ge) => ge !== L.by && (i[ge] || 0) < L.at);
                      return et.length > 0 ? /* @__PURE__ */ e("b", { className: "jt-unread", title: `안 읽음: ${et.join(", ")}`, "aria-label": `${et.length}명 안 읽음`, children: et.length }) : null;
                    })(),
                    /* @__PURE__ */ a("time", { className: "jt-msg-time", children: [
                      L.editedAt ? "수정됨 " : "",
                      is(L.at)
                    ] })
                  ] })
                ] }),
                L.kind === "loc" && /* @__PURE__ */ a("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t({ lat: L.lat, lng: L.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ e(Tt, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !ut && /* @__PURE__ */ a("a", { className: "jt-maplink", href: $a(L), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ e(At, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                v === L.id && x !== L.id && /* @__PURE__ */ a("div", { className: "jt-msg-menu", children: [
                  s && s.id === L.id ? /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        h(), N(null);
                      },
                      children: [
                        /* @__PURE__ */ e(Jn, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        r(L), N(null), B(!1);
                      },
                      children: [
                        /* @__PURE__ */ e(To, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  ut && L.kind !== "loc" && /* @__PURE__ */ a("button", { type: "button", className: "jt-like", onClick: () => T(L), children: [
                    /* @__PURE__ */ e(qt, { size: 14 }),
                    "수정"
                  ] }),
                  ut && /* @__PURE__ */ e(
                    It,
                    {
                      onConfirm: () => {
                        m(L), N(null);
                      },
                      label: "삭제"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] }, L.id);
    }) }),
    /* @__PURE__ */ e("div", { ref: g }),
    /* @__PURE__ */ a("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ e("button", { type: "button", className: "jt-chat-loc", onClick: me, disabled: A, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ e(Et, { size: 20 }) }),
      /* @__PURE__ */ e(
        "textarea",
        {
          rows: 1,
          value: f,
          onChange: (L) => S(L.target.value),
          onKeyDown: (L) => {
            L.key === "Enter" && !L.shiftKey && !L.nativeEvent.isComposing && (L.preventDefault(), Q());
          },
          placeholder: A ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: Q, disabled: !f.trim(), "aria-label": "보내기", children: /* @__PURE__ */ e(ha, { size: 18 }) })
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
], ls = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", cs = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), ps = 7e3;
function ds() {
  let [t, n] = y(0), [o, i] = y({}), s = G(o);
  if (s.current = o, H(() => {
    let l = setInterval(() => {
      n((r) => {
        let h = r;
        for (let k = 0; k < Ot.length && (h = (h + 1) % Ot.length, !!s.current[h]); k++)
          ;
        return h;
      });
    }, ps);
    return () => clearInterval(l);
  }, []), Ot.every((l, r) => o[r])) return null;
  let m = Ot[t];
  return /* @__PURE__ */ a(V, { children: [
    /* @__PURE__ */ a("div", { className: "jt-hero", "aria-hidden": "true", children: [
      Ot.map((l, r) => /* @__PURE__ */ e(
        "img",
        {
          src: ls(l.f),
          alt: "",
          className: r === t ? "on" : "",
          style: { objectPosition: l.pos },
          loading: r === 0 ? "eager" : "lazy",
          onError: () => i((h) => ({ ...h, [r]: !0 }))
        },
        l.f
      )),
      /* @__PURE__ */ e("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: Ot.map((l, r) => /* @__PURE__ */ e("i", { className: r === t ? "on" : "" }, l.f)) }),
      /* @__PURE__ */ a("a", { className: "jt-hero-cap", href: cs(m.f), target: "_blank", rel: "noopener noreferrer", children: [
        m.t,
        ", 사진 ",
        m.by,
        " (",
        m.lic,
        ")"
      ] })
    ] })
  ] });
}
function jn() {
  let [t, n] = y(!1), [o, i] = y(null), [s, d] = y([]), [m, l] = y([]), [r, h] = y([]), [k, E] = y([]), [c, F] = y(null), [f, S] = y("plan"), [v, N] = y({ wish: "list", spend: "me" }), A = G(!1), [w, x] = y(0), [M, z] = y(!1), [C, p] = y(!1), [B, j] = y(!1);
  H(() => {
    let b = setTimeout(() => j(!0), 8e3);
    return () => clearTimeout(b);
  }, []);
  let u = G(null), $ = G(!1), [I, U] = y(null), [T, R] = y(""), g = G(!1), [Y, lt] = y(null), [Q, me] = y(!1), [fe, Lt] = y({}), [L, ot] = y(!1), [Zt, ut] = y(null), [Qt, et] = y("");
  H(() => {
    (async () => {
      try {
        let b = await window.storage.get("hdr", !1);
        b && b.value === "min" && me(!0);
      } catch {
      }
      try {
        let b = await window.storage.get("locshare", !1);
        b && b.value === "on" && ot(!0), (!b || !b.value) && De(!0);
      } catch {
        De(!0);
      }
    })();
  }, []);
  let [ge, De] = y(!1), [he, te] = y([]), [Pe, Re] = y(null), [vn, wn] = y(0), [kn, Nn] = y({}), [Cn, zn] = y(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  H(() => {
    (async () => {
      try {
        let b = await window.storage.get("chatread", !1);
        b && b.value && wn(Number(b.value) || 0);
      } catch {
      }
    })();
  }, []);
  let En = async (b) => {
    let D = { id: yt(), by: c, at: Date.now(), ...b }, P = nn(D);
    te((K) => [...K, { ...D, key: P, pending: !0 }]), await ht(P, D) || (te((K) => K.filter((J) => J.id !== D.id)), jt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, La = async (b, D) => {
    let P = { id: b.id, by: b.by, at: b.at, kind: b.kind, text: D, editedAt: Date.now() };
    te((K) => K.map((J) => J.id === b.id ? { ...J, text: D, editedAt: P.editedAt } : J)), await ht(b.key || nn(b), P) || jt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, _a = async (b) => {
    let D = { id: b.id, by: b.by, kind: b.kind || "text", text: b.text || "", lat: b.lat, lng: b.lng, pinnedBy: c, pinnedAt: Date.now() };
    Re(D);
    let P = await ht(X.notice, D);
    jt(P ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, An = async () => {
    Re(null);
    try {
      await window.storage.delete(X.notice, !0);
    } catch {
    }
    jt("공지를 해제했어요.");
  }, Oa = async (b) => {
    Pe && Pe.id === b.id && An(), te((D) => D.filter((P) => P.id !== b.id));
    try {
      await window.storage.delete(b.key || nn(b), !0);
    } catch {
    }
  }, Ka = async () => {
    let b = Zt;
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
    await En({ kind: "loc", lat: b.lat, lng: b.lng, text: "" });
  }, be = he.reduce((b, D) => D.by !== c && D.at > b ? D.at : b, 0), ee = he.reduce((b, D) => D.at > b ? D.at : b, 0), Ft = he.filter((b) => b.by !== c && b.at > vn).length, [Sn, Wa] = y(() => document.visibilityState === "visible");
  H(() => {
    let b = () => Wa(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", b), () => document.removeEventListener("visibilitychange", b);
  }, []), H(() => {
    if (!(f !== "chat" || !Sn || !c || !ee)) {
      if (be > vn) {
        wn(be);
        try {
          window.storage.set("chatread", String(be), !1);
        } catch {
        }
      }
      (kn[c] || 0) < ee && (Nn((b) => ({ ...b, [c]: ee })), ht(en + encodeURIComponent(c), { at: ee }));
    }
  }, [f, Sn, ee, be, c]), H(() => {
    if ("setAppBadge" in navigator)
      try {
        Ft > 0 ? navigator.setAppBadge(Ft).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [Ft, Cn]);
  let Ua = async () => {
    try {
      let b = await Notification.requestPermission();
      zn(b), jt(b === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      zn("denied");
    }
  }, [xe, jt] = y("");
  H(() => {
    if (!xe) return;
    let b = setTimeout(() => jt(""), 2600);
    return () => clearTimeout(b);
  }, [xe]);
  let je = (b, D) => {
    ot(b), De(!1), b || et(""), D || jt(b ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", b ? "on" : "off", !1);
    } catch {
    }
  }, Mn = () => je(!L);
  H(() => {
    if (!L || !c || !o) return;
    let b = tn + encodeURIComponent(c), D = null, P = null, O = 0, K = (ct) => {
      P = ct, O = Date.now(), ut(ct), ht(b, { ...ct, at: Date.now(), online: !0 });
    }, J = () => {
      if (D == null) {
        if (!navigator.geolocation) {
          et("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        D = navigator.geolocation.watchPosition(
          (ct) => {
            let Le = { lat: ct.coords.latitude, lng: ct.coords.longitude, acc: Math.round(ct.coords.accuracy) };
            et(""), !P || Gt(P, Le) > 25 || Date.now() - O > 6e4 ? K(Le) : ut(Le);
          },
          (ct) => et(
            ct.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, _ = (ct) => {
      D != null && navigator.geolocation.clearWatch(D), D = null, ct && ht(b, { online: !1, at: Date.now() });
    }, W = () => document.visibilityState === "visible" ? J() : _(!0), q = () => _(!0), gt = setInterval(() => {
      document.visibilityState === "visible" && P && K(P);
    }, 6e4);
    return document.visibilityState === "visible" && J(), document.addEventListener("visibilitychange", W), window.addEventListener("pagehide", q), () => {
      clearInterval(gt), document.removeEventListener("visibilitychange", W), window.removeEventListener("pagehide", q), _(!0);
    };
  }, [L, c, !!o]), H(() => {
    if (A.current)
      try {
        window.storage.set("ui", JSON.stringify({ tab: f, ...v }), !1);
      } catch {
      }
  }, [f, v]);
  let Ha = () => {
    let b = !Q;
    me(b);
    try {
      window.storage.set("hdr", b ? "min" : "max", !1);
    } catch {
    }
  };
  H(() => {
    let b = !0, D = async () => {
      let O = await ui();
      if (b)
        if (O) {
          let K = { ...O, at: Date.now() };
          lt(K), ht(X.fx, K);
        } else {
          let K = await bt(X.fx, null);
          b && K && K.rate > 0 && lt({ ...K, cached: !0 });
        }
    };
    D();
    let P = setInterval(D, 3 * 36e5);
    return () => {
      b = !1, clearInterval(P);
    };
  }, []);
  let ye = yo(async () => {
    let [b, D, P, O, K, J] = await Promise.all([
      bt(X.settings, null),
      bt(X.plan, []),
      bt(X.wish, []),
      bt(X.spend, []),
      bt(X.notice, null),
      bt(X.board, [])
    ]);
    E(J), Re(K && K.id ? K : null), i(b), d(D), l(P), h(O);
    try {
      let _ = {};
      (await Ze(tn)).forEach(([W, q]) => _[decodeURIComponent(W.slice(tn.length))] = q), Lt(_);
    } catch {
    }
    try {
      let _ = (await Ze(Ta)).map(([W, q]) => ({ ...q, key: W }));
      _.sort((W, q) => W.at - q.at), te((W) => {
        let q = W.filter((gt) => gt.pending && !_.some((ct) => ct.id === gt.id));
        return [..._, ...q];
      });
    } catch {
    }
    try {
      let _ = {};
      (await Ze(en)).forEach(([W, q]) => _[decodeURIComponent(W.slice(en.length))] = q.at || 0), Nn((W) => {
        let q = { ..._ };
        return Object.keys(W).forEach((gt) => q[gt] = Math.max(q[gt] || 0, W[gt] || 0)), q;
      });
    } catch {
    }
    n(!0);
  }, []);
  H(() => {
    (async () => {
      try {
        let P = await window.storage.get("me", !1);
        P && P.value && F(P.value);
      } catch {
      }
      try {
        let P = await window.storage.get("ui", !1), O = P && P.value ? JSON.parse(P.value) : null;
        O && (["board", "plan", "wish", "spend", "family", "chat"].includes(O.tab) && S(O.tab), N((K) => ({
          wish: ["list", "map", "near"].includes(O.wish) ? O.wish : K.wish,
          spend: ["me", "day", "all"].includes(O.spend) ? O.spend : K.spend
        })));
      } catch {
      }
      A.current = !0, await ye();
    })();
    let b = window.storage.onChange ? window.storage.onChange(ye) : null, D = setInterval(ye, b ? 6e4 : 1e4);
    return () => {
      clearInterval(D), b && b();
    };
  }, [ye]), H(() => {
    if (!o || g.current) return;
    g.current = !0;
    let b = Math.round((Dt(pt(/* @__PURE__ */ new Date())) - Dt(o.start)) / 864e5);
    b >= 0 && b < o.days && x(b);
  }, [o]);
  let nt = async (b, D, P, O) => {
    let K = await bt(b, D), J = O(K);
    P(J);
    let _ = await ht(b, J);
    return _ || R("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), _;
  }, Ya = async (b) => {
    F(b), p(!1);
    try {
      await window.storage.set("me", b, !1);
    } catch {
    }
  }, Ja = async (b) => {
    i(b), z(!1), await ht(X.settings, b) || R("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), c && !b.members.includes(c) && F(null);
  }, st = () => U(null);
  u.current = () => {
    I ? U(null) : C ? p(!1) : M && z(!1);
  };
  let $e = !!I || C || M && !!o;
  H(() => {
    $e && !$.current ? (history.pushState({ jtOverlay: !0 }, ""), $.current = !0) : !$e && $.current && ($.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [$e]), H(() => {
    let b = () => {
      $.current && ($.current = !1, u.current && u.current());
    };
    return window.addEventListener("popstate", b), () => window.removeEventListener("popstate", b);
  }, []);
  let In = (b, D) => ({
    add: (P, O) => nt(
      b,
      [],
      D,
      (K) => K.map(
        (J) => J.id === P ? { ...J, comments: [...J.comments || [], { id: yt(), by: c, text: O, createdAt: Date.now() }] } : J
      )
    ),
    del: (P, O) => nt(
      b,
      [],
      D,
      (K) => K.map((J) => J.id === P ? { ...J, comments: (J.comments || []).filter((_) => _.id !== O) } : J)
    )
  }), Te = (b, D) => (P, O) => nt(b, [], D, (K) => K.map((J) => J.id === P ? mi(J, O, c) : J)), Ga = Te(X.plan, d), Xa = Te(X.wish, l), qa = Te(X.board, E), Fn = In(X.plan, d), Dn = In(X.wish, l), Va = (b, D, P) => nt(
    X.plan,
    [],
    d,
    (O) => D ? O.map((K) => K.id === D ? { ...K, ...b } : K) : [...O, { id: yt(), day: P, by: c, ...b }]
  ), Za = (b) => nt(X.plan, [], d, (D) => D.filter((P) => P.id !== b)), Pn = (b) => nt(X.wish, [], l, (D) => [...D, { id: yt(), by: c, likes: [c], createdAt: Date.now(), ...b }]), Qa = (b) => nt(
    X.wish,
    [],
    l,
    (D) => D.map(
      (P) => P.id === b ? { ...P, likes: P.likes.includes(c) ? P.likes.filter((O) => O !== c) : [...P.likes, c] } : P
    )
  ), Rn = (b) => nt(X.wish, [], l, (D) => D.filter((P) => P.id !== b)), to = async (b) => {
    let D = Object.keys(b).length;
    await nt(X.wish, [], l, (O) => O.map((K) => b[K.id] ? { ...K, ...b[K.id] } : K)) && jt(`${D}곳에 위치를 연결했어요.`);
  }, eo = (b, D) => nt(X.wish, [], l, (P) => P.map((O) => O.id === b ? { ...O, ...D, editedAt: Date.now() } : O)), no = async (b, D) => {
    await nt(X.plan, [], d, (P) => [
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
        ...at(b) ? { lat: b.lat, lng: b.lng } : {}
      }
    ]), x(D);
  }, ao = (b, D) => nt(
    X.spend,
    [],
    h,
    (P) => D ? P.map((O) => O.id === D ? { ...O, ...b, editedAt: Date.now(), editedBy: c } : O) : [...P, { id: yt(), by: c, createdAt: Date.now(), ...b }]
  ), oo = (b) => nt(X.spend, [], h, (D) => D.filter((P) => P.id !== b)), io = async ({ text: b, urls: D, photos: P }, O) => {
    for (let W of P.filter((q) => q.data)) {
      if (!await ht(pn(W.id), W.data)) return !1;
      zt.set(W.id, W.data);
    }
    let K = P.map((W) => W.id), J = [], _ = await nt(X.board, [], E, (W) => O ? W.map((q) => q.id !== O ? q : (J = (q.photos || []).filter((gt) => !K.includes(gt)), { ...q, text: b, urls: D, photos: K, editedAt: Date.now() })) : [{ id: yt(), by: c, createdAt: Date.now(), text: b, urls: D, photos: K, likes: [], comments: [] }, ...W]);
    return _ && J.forEach(Qn), _;
  }, so = async (b) => {
    let D = [];
    await nt(X.board, [], E, (O) => (D = O.find((K) => K.id === b)?.photos || [], O.filter((K) => K.id !== b))) && D.forEach(Qn);
  }, ro = (b, D) => nt(
    X.board,
    [],
    E,
    (P) => P.map(
      (O) => O.id === b ? { ...O, comments: [...O.comments || [], { id: yt(), by: c, text: D, createdAt: Date.now() }] } : O
    )
  ), lo = (b, D) => nt(
    X.board,
    [],
    E,
    (P) => P.map((O) => O.id === b ? { ...O, comments: (O.comments || []).filter((K) => K.id !== D) } : O)
  ), ne, Be = t && !o && window.storage && window.storage.isSynced && !window.storage.isSynced();
  if (!t || Be)
    ne = /* @__PURE__ */ a("div", { className: "jt-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ a("div", { className: "jt-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {})
      ] }),
      Be ? "여행 정보 받는 중" : "앱 준비 중",
      Be && B && /* @__PURE__ */ e("p", { className: "jt-loading-sub", children: "인터넷 연결이 느린 것 같아요. 연결되면 자동으로 열려요." })
    ] });
  else if (!o || M)
    ne = /* @__PURE__ */ e(wi, { initial: o, onSave: Ja, onCancel: o ? () => z(!1) : null });
  else if (!c || !o.members.includes(c) || C) {
    let b = c && o.members.includes(c);
    ne = /* @__PURE__ */ e(
      zi,
      {
        members: o.members,
        onPick: Ya,
        current: b ? c : null,
        onBack: b ? () => p(!1) : null
      }
    );
  } else {
    let b = mt(o.start, 0), D = mt(o.start, o.days - 1), P = Math.round((Dt(o.start) - Dt(pt(/* @__PURE__ */ new Date()))) / 864e5), O = Math.round((Dt(pt(/* @__PURE__ */ new Date())) - Dt(o.start)) / 864e5), K = O >= 0 && O < o.days ? O : w, J = Y ? { ...o, rate: Y.rate, fx: Y } : o;
    wa = J.rate, ne = /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ a("header", { className: "jt-head hero" + (Q ? " mini" : f === "plan" ? " tall" : ""), children: [
        !Q && /* @__PURE__ */ e(ds, {}),
        /* @__PURE__ */ a("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ a("button", { className: "jt-me", onClick: () => p(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(rt, { name: c, members: o.members, size: 24 }),
            c
          ] }),
          Q && /* @__PURE__ */ a("strong", { className: "jt-mini-title", children: [
            /* @__PURE__ */ e("span", { className: "jt-mini-name", children: o.title }),
            P > 0 && /* @__PURE__ */ a("em", { children: [
              "D-",
              P
            ] }),
            P === 0 && /* @__PURE__ */ e("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ a(
              "button",
              {
                className: "jt-icon light jt-locbtn" + (L ? " on" : ""),
                onClick: Mn,
                "aria-pressed": L,
                "aria-label": L ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: L ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ e(Et, { size: 19 }),
                  /* @__PURE__ */ e("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: "jt-icon light",
                onClick: Ha,
                "aria-label": Q ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !Q,
                children: Q ? /* @__PURE__ */ e(Ct, { size: 20 }) : /* @__PURE__ */ e(ja, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => z(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(ko, { size: 20 }) })
          ] })
        ] }),
        !Q && /* @__PURE__ */ a(V, { children: [
          /* @__PURE__ */ e("h1", { children: o.title }),
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
            P === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      T && /* @__PURE__ */ a("div", { className: "jt-error", role: "alert", children: [
        T,
        /* @__PURE__ */ e("button", { onClick: () => R(""), "aria-label": "닫기", children: /* @__PURE__ */ e(Xt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ a("main", { className: "jt-main", children: [
        f === "board" && /* @__PURE__ */ e(
          ts,
          {
            settings: J,
            board: k,
            me: c,
            onEdit: (_) => U({ type: "post", item: _ }),
            onLike: qa,
            onComment: ro,
            onDelComment: lo
          }
        ),
        f === "plan" && /* @__PURE__ */ e(
          Pi,
          {
            settings: J,
            schedule: s,
            day: w,
            setDay: x,
            onEdit: (_) => U({ type: "plan", item: _, day: _.day }),
            onAddAt: (_, W) => U({ type: "plan", day: _, preset: { time: W, end: Kt(Math.min(Pt(W) + 60, 23 * 60 + 59)) } }),
            me: c,
            onComment: Fn.add,
            onDelComment: Fn.del,
            onReact: Ga
          }
        ),
        f === "wish" && /* @__PURE__ */ e(
          Ji,
          {
            settings: J,
            onBatchPos: to,
            view: v.wish,
            setView: (_) => N((W) => ({ ...W, wish: _ })),
            plan: s,
            wish: m,
            me: c,
            onEdit: (_) => U({ type: "wish", item: _ }),
            onSave: Pn,
            onLike: Qa,
            onPlan: (_) => U({ type: "toPlan", wish: _ }),
            onDelete: Rn,
            onComment: Dn.add,
            onDelComment: Dn.del,
            onReact: Xa
          }
        ),
        f === "spend" && /* @__PURE__ */ e(
          Xi,
          {
            settings: J,
            spend: r,
            me: c,
            view: v.spend,
            setView: (_) => N((W) => ({ ...W, spend: _ })),
            onEdit: (_) => U({ type: "spend", item: _ })
          }
        ),
        f === "chat" && /* @__PURE__ */ e(
          rs,
          {
            settings: J,
            me: c,
            msgs: he,
            reads: kn,
            notice: Pe,
            onEdit: La,
            onPin: _a,
            onUnpin: An,
            badgeAsk: Cn === "default",
            onBadgeAsk: Ua,
            onSend: (_) => En({ kind: "text", text: _ }),
            onDelete: Oa,
            onSendLoc: Ka
          }
        ),
        f === "family" && /* @__PURE__ */ e(
          os,
          {
            settings: J,
            me: c,
            locs: fe,
            shareOn: L,
            onToggle: Mn,
            myPos: Zt,
            geoErr: Qt
          }
        )
      ] }),
      (() => {
        let _ = {
          board: ["글쓰기", () => U({ type: "post" })],
          plan: [`${w + 1}일차 일정 추가`, () => U({ type: "plan", day: w })],
          wish: ["가고 싶은 곳 추가", () => U({ type: "wish" })],
          spend: ["경비 추가", () => U({ type: "spend" })]
        }[f];
        return _ ? /* @__PURE__ */ a("button", { className: "jt-fab", onClick: _[1], children: [
          /* @__PURE__ */ e(vo, { size: 20, strokeWidth: 2.6 }),
          _[0]
