] }),
        /* @__PURE__ */ a("div", { className: "jt-notice-act", children: [
          B && /* @__PURE__ */ e("button", { type: "button", className: "jt-like", onClick: () => O(v.id), children: "메시지로 이동" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                h(), D(!1);
              },
              children: [
                /* @__PURE__ */ e(Wn, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    z && /* @__PURE__ */ a("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ e("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: d, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ e("ol", { className: "jt-msgs", children: o.map((R) => {
      let ot = os(R.at), qt = ot !== me, mt = R.by === n, Vt = !qt && Lt && Lt.by === R.by && R.at - Lt.at < 5 * 6e4;
      return me = ot, Lt = R, /* @__PURE__ */ a(ho.Fragment, { children: [
        qt && /* @__PURE__ */ e("li", { className: "jt-daysep", "aria-label": ot, children: /* @__PURE__ */ e("span", { children: ot }) }),
        /* @__PURE__ */ a(
          "li",
          {
            id: "msg-" + R.id,
            className: "jt-msg" + (mt ? " mine" : "") + (Vt ? " cont" : "") + (_ === R.id ? " flash" : ""),
            children: [
              !mt && /* @__PURE__ */ e("span", { className: "jt-msg-av", children: !Vt && /* @__PURE__ */ e(ct, { name: R.by, members: I, size: 30 }) }),
              /* @__PURE__ */ a("div", { className: "jt-msg-col", children: [
                !mt && !Vt && /* @__PURE__ */ e("span", { className: "jt-msg-name", children: R.by }),
                /* @__PURE__ */ a("div", { className: "jt-msg-row", children: [
                  b === R.id ? /* @__PURE__ */ a("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ e(
                      "textarea",
                      {
                        rows: 2,
                        value: A,
                        onChange: (et) => c(et.target.value),
                        onKeyDown: (et) => {
                          et.key === "Enter" && !et.shiftKey && !et.nativeEvent.isComposing && (et.preventDefault(), $(R)), et.key === "Escape" && M(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ a("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => M(null), children: "취소" }),
                      /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary sm", onClick: () => $(R), disabled: !A.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + (R.kind === "loc" ? " loc" : "") + (s && s.id === R.id ? " pinned" : ""),
                      onClick: () => N(j === R.id ? null : R.id),
                      "aria-label": mt ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": j === R.id,
                      children: R.kind === "loc" ? /* @__PURE__ */ a("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ e(Et, { size: 16 }),
                        mt ? "내 위치를 보냈어요" : `${R.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ e("span", { className: "jt-msg-text", children: da(R.text) })
                    }
                  ),
                  /* @__PURE__ */ a("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let et = I.filter((ue) => ue !== R.by && (i[ue] || 0) < R.at);
                      return et.length > 0 ? /* @__PURE__ */ e("b", { className: "jt-unread", title: `안 읽음: ${et.join(", ")}`, "aria-label": `${et.length}명 안 읽음`, children: et.length }) : null;
                    })(),
                    /* @__PURE__ */ a("time", { className: "jt-msg-time", children: [
                      R.editedAt ? "수정됨 " : "",
                      as(R.at)
                    ] })
                  ] })
                ] }),
                R.kind === "loc" && /* @__PURE__ */ a("div", { className: "jt-loclinks", children: [
                  /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t({ lat: R.lat, lng: R.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ e(Tt, { size: 13 }),
                    "지도에서 보기"
                  ] }),
                  !mt && /* @__PURE__ */ a("a", { className: "jt-maplink", href: Da(R), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ e(At, { size: 13 }),
                    "길 찾기"
                  ] })
                ] }),
                j === R.id && b !== R.id && /* @__PURE__ */ a("div", { className: "jt-msg-menu", children: [
                  s && s.id === R.id ? /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        h(), N(null);
                      },
                      children: [
                        /* @__PURE__ */ e(Wn, { size: 14 }),
                        "공지 해제"
                      ]
                    }
                  ) : /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      className: "jt-like",
                      onClick: () => {
                        l(R), N(null), D(!1);
                      },
                      children: [
                        /* @__PURE__ */ e(Po, { size: 14 }),
                        "공지로 등록"
                      ]
                    }
                  ),
                  mt && R.kind !== "loc" && /* @__PURE__ */ a("button", { type: "button", className: "jt-like", onClick: () => J(R), children: [
                    /* @__PURE__ */ e(Gt, { size: 14 }),
                    "수정"
                  ] }),
                  mt && /* @__PURE__ */ e(
                    It,
                    {
                      onConfirm: () => {
                        u(R), N(null);
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
    /* @__PURE__ */ e("div", { ref: f }),
    /* @__PURE__ */ a("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ e("button", { type: "button", className: "jt-chat-loc", onClick: de, disabled: E, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ e(Et, { size: 20 }) }),
      /* @__PURE__ */ e(
        "textarea",
        {
          rows: 1,
          value: g,
          onChange: (R) => S(R.target.value),
          onKeyDown: (R) => {
            R.key === "Enter" && !R.shiftKey && !R.nativeEvent.isComposing && (R.preventDefault(), Z());
          },
          placeholder: E ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: Z, disabled: !g.trim(), "aria-label": "보내기", children: /* @__PURE__ */ e(ua, { size: 18 }) })
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
], ss = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", rs = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), ls = 7e3;
function cs() {
  let [t, n] = y(0), [o, i] = y({}), s = G(o);
  if (s.current = o, U(() => {
    let p = setInterval(() => {
      n((l) => {
        let h = l;
        for (let k = 0; k < Ot.length && (h = (h + 1) % Ot.length, !!s.current[h]); k++)
          ;
        return h;
      });
    }, ls);
    return () => clearInterval(p);
  }, []), Ot.every((p, l) => o[l])) return null;
  let u = Ot[t];
  return /* @__PURE__ */ a(Q, { children: [
    /* @__PURE__ */ a("div", { className: "jt-hero", "aria-hidden": "true", children: [
      Ot.map((p, l) => /* @__PURE__ */ e(
        "img",
        {
          src: ss(p.f),
          alt: "",
          className: l === t ? "on" : "",
          style: { objectPosition: p.pos },
          loading: l === 0 ? "eager" : "lazy",
          onError: () => i((h) => ({ ...h, [l]: !0 }))
        },
        p.f
      )),
      /* @__PURE__ */ e("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: Ot.map((p, l) => /* @__PURE__ */ e("i", { className: l === t ? "on" : "" }, p.f)) }),
      /* @__PURE__ */ a("a", { className: "jt-hero-cap", href: rs(u.f), target: "_blank", rel: "noopener noreferrer", children: [
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
function fn() {
  let [t, n] = y(!1), [o, i] = y(null), [s, m] = y([]), [u, p] = y([]), [l, h] = y([]), [k, z] = y([]), [d, I] = y(null), [g, S] = y("plan"), [j, N] = y({ wish: "list", spend: "me" }), E = G(!1), [C, b] = y(0), [M, A] = y(!1), [c, r] = y(!1), [D, _] = y(!1);
  U(() => {
    let x = setTimeout(() => _(!0), 8e3);
    return () => clearTimeout(x);
  }, []);
  let w = G(null), B = G(!1), [v, O] = y(null), [J, $] = y(""), f = G(!1), [H, rt] = y(null), [Z, de] = y(!1), [me, Lt] = y({}), [R, ot] = y(!1), [qt, mt] = y(null), [Vt, et] = y("");
  U(() => {
    (async () => {
      try {
        let x = await window.storage.get("hdr", !1);
        x && x.value === "min" && de(!0);
      } catch {
      }
      try {
        let x = await window.storage.get("locshare", !1);
        x && x.value === "on" && ot(!0), (!x || !x.value) && Me(!0);
      } catch {
        Me(!0);
      }
    })();
  }, []);
  let [ue, Me] = y(!1), [ge, Zt] = y([]), [Ie, Fe] = y(null), [bn, xn] = y(0), [jn, yn] = y({}), [vn, wn] = y(
    () => typeof Notification < "u" && "setAppBadge" in navigator ? Notification.permission : "unsupported"
  );
  U(() => {
    (async () => {
      try {
        let x = await window.storage.get("chatread", !1);
        x && x.value && xn(Number(x.value) || 0);
      } catch {
      }
    })();
  }, []);
  let kn = async (x) => {
    let F = { id: yt(), by: d, at: Date.now(), ...x }, P = Qe(F);
    Zt((K) => [...K, { ...F, key: P, pending: !0 }]), await ht(P, F) || (Zt((K) => K.filter((Y) => Y.id !== F.id)), jt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, $a = async (x, F) => {
    let P = { id: x.id, by: x.by, at: x.at, kind: x.kind, text: F, editedAt: Date.now() };
    Zt((K) => K.map((Y) => Y.id === x.id ? { ...Y, text: F, editedAt: P.editedAt } : Y)), await ht(x.key || Qe(x), P) || jt("메시지를 고치지 못했어요. 인터넷 연결을 확인해 주세요.");
  }, Ta = async (x) => {
    let F = { id: x.id, by: x.by, kind: x.kind || "text", text: x.text || "", lat: x.lat, lng: x.lng, pinnedBy: d, pinnedAt: Date.now() };
    Fe(F);
    let P = await ht(X.notice, F);
    jt(P ? "공지로 등록했어요. 채팅 맨 위에 고정돼요." : "공지를 등록하지 못했어요.");
  }, Nn = async () => {
    Fe(null);
    try {
      await window.storage.delete(X.notice, !0);
    } catch {
    }
    jt("공지를 해제했어요.");
  }, Ba = async (x) => {
    Ie && Ie.id === x.id && Nn(), Zt((F) => F.filter((P) => P.id !== x.id));
    try {
      await window.storage.delete(x.key || Qe(x), !0);
    } catch {
    }
  }, La = async () => {
    let x = qt;
    if (x || (x = await new Promise((F) => {
      if (!navigator.geolocation) return F(null);
      navigator.geolocation.getCurrentPosition(
        (P) => F({ lat: P.coords.latitude, lng: P.coords.longitude }),
        () => F(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !x) {
      jt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await kn({ kind: "loc", lat: x.lat, lng: x.lng, text: "" });
  }, fe = ge.reduce((x, F) => F.by !== d && F.at > x ? F.at : x, 0), Qt = ge.reduce((x, F) => F.at > x ? F.at : x, 0), Ft = ge.filter((x) => x.by !== d && x.at > bn).length, [Cn, _a] = y(() => document.visibilityState === "visible");
  U(() => {
    let x = () => _a(document.visibilityState === "visible");
    return document.addEventListener("visibilitychange", x), () => document.removeEventListener("visibilitychange", x);
  }, []), U(() => {
    if (!(g !== "chat" || !Cn || !d || !Qt)) {
      if (fe > bn) {
        xn(fe);
        try {
          window.storage.set("chatread", String(fe), !1);
        } catch {
        }
      }
      (jn[d] || 0) < Qt && (yn((x) => ({ ...x, [d]: Qt })), ht(Ze + encodeURIComponent(d), { at: Qt }));
    }
  }, [g, Cn, Qt, fe, d]), U(() => {
    if ("setAppBadge" in navigator)
      try {
        Ft > 0 ? navigator.setAppBadge(Ft).catch(() => {
        }) : navigator.clearAppBadge().catch(() => {
        });
      } catch {
      }
  }, [Ft, vn]);
  let Oa = async () => {
    try {
      let x = await Notification.requestPermission();
      wn(x), jt(x === "granted" ? "앱 아이콘에 안 읽은 메시지 수가 표시돼요." : "허용하지 않아서 아이콘 숫자는 표시되지 않아요.");
    } catch {
      wn("denied");
    }
  }, [he, jt] = y("");
  U(() => {
    if (!he) return;
    let x = setTimeout(() => jt(""), 2600);
    return () => clearTimeout(x);
  }, [he]);
  let be = (x, F) => {
    ot(x), Me(!1), x || et(""), F || jt(x ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", x ? "on" : "off", !1);
    } catch {
    }
  }, zn = () => be(!R);
  U(() => {
    if (!R || !d || !o) return;
    let x = Ve + encodeURIComponent(d), F = null, P = null, L = 0, K = (lt) => {
      P = lt, L = Date.now(), mt(lt), ht(x, { ...lt, at: Date.now(), online: !0 });
    }, Y = () => {
      if (F == null) {
        if (!navigator.geolocation) {
          et("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        F = navigator.geolocation.watchPosition(
          (lt) => {
            let $e = { lat: lt.coords.latitude, lng: lt.coords.longitude, acc: Math.round(lt.coords.accuracy) };
            et(""), !P || Yt(P, $e) > 25 || Date.now() - L > 6e4 ? K($e) : mt($e);
          },
          (lt) => et(
            lt.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, T = (lt) => {
      F != null && navigator.geolocation.clearWatch(F), F = null, lt && ht(x, { online: !1, at: Date.now() });
    }, W = () => document.visibilityState === "visible" ? Y() : T(!0), q = () => T(!0), ft = setInterval(() => {
      document.visibilityState === "visible" && P && K(P);
    }, 6e4);
    return document.visibilityState === "visible" && Y(), document.addEventListener("visibilitychange", W), window.addEventListener("pagehide", q), () => {
      clearInterval(ft), document.removeEventListener("visibilitychange", W), window.removeEventListener("pagehide", q), T(!0);
    };
  }, [R, d, !!o]), U(() => {
    if (E.current)
      try {
        window.storage.set("ui", JSON.stringify({ tab: g, ...j }), !1);
      } catch {
      }
  }, [g, j]);
  let Ka = () => {
    let x = !Z;
    de(x);
    try {
      window.storage.set("hdr", x ? "min" : "max", !1);
    } catch {
    }
  };
  U(() => {
    let x = !0, F = async () => {
      let L = await ci();
      if (x)
        if (L) {
          let K = { ...L, at: Date.now() };
          rt(K), ht(X.fx, K);
        } else {
          let K = await bt(X.fx, null);
          x && K && K.rate > 0 && rt({ ...K, cached: !0 });
        }
    };
    F();
    let P = setInterval(F, 3 * 36e5);
    return () => {
      x = !1, clearInterval(P);
    };
  }, []);
  let xe = bo(async () => {
    let [x, F, P, L, K, Y] = await Promise.all([
      bt(X.settings, null),
      bt(X.plan, []),
      bt(X.wish, []),
      bt(X.spend, []),
      bt(X.notice, null),
      bt(X.board, [])
    ]);
    z(Y), Fe(K && K.id ? K : null), i(x), m(F), p(P), h(L);
    try {
      let T = {};
      (await Xe(Ve)).forEach(([W, q]) => T[decodeURIComponent(W.slice(Ve.length))] = q), Lt(T);
    } catch {
    }
    try {
      let T = (await Xe(Pa)).map(([W, q]) => ({ ...q, key: W }));
      T.sort((W, q) => W.at - q.at), Zt((W) => {
        let q = W.filter((ft) => ft.pending && !T.some((lt) => lt.id === ft.id));
        return [...T, ...q];
      });
    } catch {
    }
    try {
      let T = {};
      (await Xe(Ze)).forEach(([W, q]) => T[decodeURIComponent(W.slice(Ze.length))] = q.at || 0), yn((W) => {
        let q = { ...T };
        return Object.keys(W).forEach((ft) => q[ft] = Math.max(q[ft] || 0, W[ft] || 0)), q;
      });
    } catch {
    }
    n(!0);
  }, []);
  U(() => {
    (async () => {
      try {
        let P = await window.storage.get("me", !1);
        P && P.value && I(P.value);
      } catch {
      }
      try {
        let P = await window.storage.get("ui", !1), L = P && P.value ? JSON.parse(P.value) : null;
        L && (["board", "plan", "wish", "spend", "family", "chat"].includes(L.tab) && S(L.tab), N((K) => ({
          wish: ["list", "map", "near"].includes(L.wish) ? L.wish : K.wish,
          spend: ["me", "day", "all"].includes(L.spend) ? L.spend : K.spend
        })));
      } catch {
      }
      E.current = !0, await xe();
    })();
    let x = window.storage.onChange ? window.storage.onChange(xe) : null, F = setInterval(xe, x ? 6e4 : 1e4);
    return () => {
      clearInterval(F), x && x();
    };
  }, [xe]), U(() => {
    if (!o || f.current) return;
    f.current = !0;
    let x = Math.round((Dt(pt(/* @__PURE__ */ new Date())) - Dt(o.start)) / 864e5);
    x >= 0 && x < o.days && b(x);
  }, [o]);
  let nt = async (x, F, P, L) => {
    let K = await bt(x, F), Y = L(K);
    P(Y);
    let T = await ht(x, Y);
    return T || $("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), T;
  }, Wa = async (x) => {
    I(x), r(!1);
    try {
      await window.storage.set("me", x, !1);
    } catch {
    }
  }, Ua = async (x) => {
    i(x), A(!1), await ht(X.settings, x) || $("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), d && !x.members.includes(d) && I(null);
  }, st = () => O(null);
  w.current = () => {
    v ? O(null) : c ? r(!1) : M && A(!1);
  };
  let De = !!v || c || M && !!o;
  U(() => {
    De && !B.current ? (history.pushState({ jtOverlay: !0 }, ""), B.current = !0) : !De && B.current && (B.current = !1, history.state && history.state.jtOverlay && history.back());
  }, [De]), U(() => {
    let x = () => {
      B.current && (B.current = !1, w.current && w.current());
    };
    return window.addEventListener("popstate", x), () => window.removeEventListener("popstate", x);
  }, []);
  let En = (x, F) => ({
    add: (P, L) => nt(
      x,
      [],
      F,
      (K) => K.map(
        (Y) => Y.id === P ? { ...Y, comments: [...Y.comments || [], { id: yt(), by: d, text: L, createdAt: Date.now() }] } : Y
      )
    ),
    del: (P, L) => nt(
      x,
      [],
      F,
      (K) => K.map((Y) => Y.id === P ? { ...Y, comments: (Y.comments || []).filter((T) => T.id !== L) } : Y)
    )
  }), Pe = (x, F) => (P, L) => nt(x, [], F, (K) => K.map((Y) => Y.id === P ? pi(Y, L, d) : Y)), Ha = Pe(X.plan, m), Ya = Pe(X.wish, p), Ja = Pe(X.board, z), An = En(X.plan, m), Sn = En(X.wish, p), Ga = (x, F, P) => nt(
    X.plan,
    [],
    m,
    (L) => F ? L.map((K) => K.id === F ? { ...K, ...x } : K) : [...L, { id: yt(), day: P, by: d, ...x }]
  ), Xa = (x) => nt(X.plan, [], m, (F) => F.filter((P) => P.id !== x)), Mn = (x) => nt(X.wish, [], p, (F) => [...F, { id: yt(), by: d, likes: [d], createdAt: Date.now(), ...x }]), qa = (x) => nt(
    X.wish,
    [],
    p,
    (F) => F.map(
      (P) => P.id === x ? { ...P, likes: P.likes.includes(d) ? P.likes.filter((L) => L !== d) : [...P.likes, d] } : P
    )
  ), In = (x) => nt(X.wish, [], p, (F) => F.filter((P) => P.id !== x)), Va = async (x) => {
    let F = Object.keys(x).length;
    await nt(X.wish, [], p, (L) => L.map((K) => x[K.id] ? { ...K, ...x[K.id] } : K)) && jt(`${F}곳에 위치를 연결했어요.`);
  }, Za = (x, F) => nt(X.wish, [], p, (P) => P.map((L) => L.id === x ? { ...L, ...F, editedAt: Date.now() } : L)), Qa = async (x, F) => {
    await nt(X.plan, [], m, (P) => [
      ...P,
      {
        id: yt(),
        day: F,
        by: d,
        time: "",
        title: x.name,
        wishId: x.id,
        place: x.area || "",
        link: x.link || "",
        memo: x.memo || "",
        comments: x.comments || [],
        reactions: x.reactions || {},
        ...at(x) ? { lat: x.lat, lng: x.lng } : {}
      }
    ]), b(F);
  }, to = (x, F) => nt(
    X.spend,
    [],
    h,
    (P) => F ? P.map((L) => L.id === F ? { ...L, ...x, editedAt: Date.now(), editedBy: d } : L) : [...P, { id: yt(), by: d, createdAt: Date.now(), ...x }]
  ), eo = (x) => nt(X.spend, [], h, (F) => F.filter((P) => P.id !== x)), no = async ({ text: x, urls: F, photos: P }, L) => {
    for (let W of P.filter((q) => q.data)) {
      if (!await ht(sn(W.id), W.data)) return !1;
      zt.set(W.id, W.data);
    }
    let K = P.map((W) => W.id), Y = [], T = await nt(X.board, [], z, (W) => L ? W.map((q) => q.id !== L ? q : (Y = (q.photos || []).filter((ft) => !K.includes(ft)), { ...q, text: x, urls: F, photos: K, editedAt: Date.now() })) : [{ id: yt(), by: d, createdAt: Date.now(), text: x, urls: F, photos: K, likes: [], comments: [] }, ...W]);
    return T && Y.forEach(Xn), T;
  }, ao = async (x) => {
    let F = [];
    await nt(X.board, [], z, (L) => (F = L.find((K) => K.id === x)?.photos || [], L.filter((K) => K.id !== x))) && F.forEach(Xn);
  }, oo = (x, F) => nt(
    X.board,
    [],
    z,
    (P) => P.map(
      (L) => L.id === x ? { ...L, comments: [...L.comments || [], { id: yt(), by: d, text: F, createdAt: Date.now() }] } : L
    )
  ), io = (x, F) => nt(
    X.board,
    [],
    z,
    (P) => P.map((L) => L.id === x ? { ...L, comments: (L.comments || []).filter((K) => K.id !== F) } : L)
  ), te, Re = t && !o && window.storage && window.storage.isSynced && !window.storage.isSynced();
  if (!t || Re)
    te = /* @__PURE__ */ a("div", { className: "jt-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ a("div", { className: "jt-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {})
      ] }),
      Re ? "여행 정보 받는 중" : "앱 준비 중",
      Re && D && /* @__PURE__ */ e("p", { className: "jt-loading-sub", children: "인터넷 연결이 느린 것 같아요. 연결되면 자동으로 열려요." })
    ] });
  else if (!o || M)
    te = /* @__PURE__ */ e(ji, { initial: o, onSave: Ua, onCancel: o ? () => A(!1) : null });
  else if (!d || !o.members.includes(d) || c) {
    let x = d && o.members.includes(d);
    te = /* @__PURE__ */ e(
      ki,
      {
        members: o.members,
        onPick: Wa,
        current: x ? d : null,
        onBack: x ? () => r(!1) : null
      }
    );
  } else {
    let x = ut(o.start, 0), F = ut(o.start, o.days - 1), P = Math.round((Dt(o.start) - Dt(pt(/* @__PURE__ */ new Date()))) / 864e5), L = Math.round((Dt(pt(/* @__PURE__ */ new Date())) - Dt(o.start)) / 864e5), K = L >= 0 && L < o.days ? L : C, Y = H ? { ...o, rate: H.rate, fx: H } : o;
    ja = Y.rate, te = /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ a("header", { className: "jt-head hero" + (Z ? " mini" : g === "plan" ? " tall" : ""), children: [
        !Z && /* @__PURE__ */ e(cs, {}),
        /* @__PURE__ */ a("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ a("button", { className: "jt-me", onClick: () => r(!0), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(ct, { name: d, members: o.members, size: 24 }),
            d
          ] }),
          Z && /* @__PURE__ */ a("strong", { className: "jt-mini-title", children: [
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
                className: "jt-icon light jt-locbtn" + (R ? " on" : ""),
                onClick: zn,
                "aria-pressed": R,
                "aria-label": R ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: R ? "위치 공유 켜짐" : "위치 공유 꺼짐",
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
                onClick: Ka,
                "aria-label": Z ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !Z,
                children: Z ? /* @__PURE__ */ e(Ct, { size: 20 }) : /* @__PURE__ */ e(ha, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => A(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(yo, { size: 20 }) })
          ] })
        ] }),
        !Z && /* @__PURE__ */ a(Q, { children: [
          /* @__PURE__ */ e("h1", { children: o.title }),
          /* @__PURE__ */ a("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ a("span", { children: [
              x.getMonth() + 1,
              "월 ",
              x.getDate(),
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
            P === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      J && /* @__PURE__ */ a("div", { className: "jt-error", role: "alert", children: [
        J,
        /* @__PURE__ */ e("button", { onClick: () => $(""), "aria-label": "닫기", children: /* @__PURE__ */ e(Jt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ a("main", { className: "jt-main", children: [
        g === "board" && /* @__PURE__ */ e(
          Zi,
          {
            settings: Y,
            board: k,
            me: d,
            onEdit: (T) => O({ type: "post", item: T }),
            onLike: Ja,
            onComment: oo,
            onDelComment: io
          }
        ),
        g === "plan" && /* @__PURE__ */ e(
          Ii,
          {
            settings: Y,
            schedule: s,
            day: C,
            setDay: b,
            onEdit: (T) => O({ type: "plan", item: T, day: T.day }),
            onAddAt: (T, W) => O({ type: "plan", day: T, preset: { time: W, end: Kt(Math.min(Pt(W) + 60, 23 * 60 + 59)) } }),
            me: d,
            onComment: An.add,
            onDelComment: An.del,
            onReact: Ha
          }
        ),
        g === "wish" && /* @__PURE__ */ e(
          Ui,
          {
            settings: Y,
            onBatchPos: Va,
            view: j.wish,
            setView: (T) => N((W) => ({ ...W, wish: T })),
            plan: s,
            wish: u,
            me: d,
            onEdit: (T) => O({ type: "wish", item: T }),
            onSave: Mn,
            onLike: qa,
            onPlan: (T) => O({ type: "toPlan", wish: T }),
            onDelete: In,
            onComment: Sn.add,
            onDelComment: Sn.del,
            onReact: Ya
          }
        ),
        g === "spend" && /* @__PURE__ */ e(
          Ji,
          {
            settings: Y,
            spend: l,
            me: d,
            view: j.spend,
            setView: (T) => N((W) => ({ ...W, spend: T })),
            onEdit: (T) => O({ type: "spend", item: T })
          }
        ),
        g === "chat" && /* @__PURE__ */ e(
          is,
          {
            settings: Y,
            me: d,
            msgs: ge,
            reads: jn,
            notice: Ie,
            onEdit: $a,
            onPin: Ta,
            onUnpin: Nn,
            badgeAsk: vn === "default",
            onBadgeAsk: Oa,
            onSend: (T) => kn({ kind: "text", text: T }),
            onDelete: Ba,
            onSendLoc: La
          }
        ),
        g === "family" && /* @__PURE__ */ e(
          ns,
          {
            settings: Y,
            me: d,
            locs: me,
            shareOn: R,
            onToggle: zn,
            myPos: qt,
            geoErr: Vt
          }
        )
      ] }),
      (() => {
        let T = {
          board: ["글쓰기", () => O({ type: "post" })],
          plan: [`${C + 1}일차 일정 추가`, () => O({ type: "plan", day: C })],
          wish: ["가고 싶은 곳 추가", () => O({ type: "wish" })],
          spend: ["경비 추가", () => O({ type: "spend" })]
        }[g];
        return T ? /* @__PURE__ */ a("button", { className: "jt-fab", onClick: T[1], children: [
          /* @__PURE__ */ e(xo, { size: 20, strokeWidth: 2.6 }),
          T[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["board", "공지", ba],
        ["plan", "일정", vo],
        ["wish", "가고 싶은 곳", on],
        ["spend", "경비", wo],
