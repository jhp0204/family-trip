let y = c[0] || x;
    return y ? { lat: y.lat, lng: y.lng, z: 14 } : { lat: st.lat, lng: st.lng, z: 12 };
  }), w = () => {
    if (!c.length) return;
    let y = c.reduce((R, S) => R + S.lat, 0) / c.length, D = c.reduce((R, S) => R + S.lng, 0) / c.length, E = Math.max(...c.map((R) => ee({ lat: y, lng: D }, R)));
    m({ lat: y, lng: D, z: E < 300 ? 16 : E < 1e3 ? 15 : E < 3e3 ? 13 : E < 1e4 ? 12 : 10 }), u(null);
  }, i = J(!1);
  H(() => {
    !i.current && c.length && (i.current = !0, w());
  }, [z]);
  let b = k.filter((y) => y.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (r ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ e("strong", { children: r ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ e("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => d(!0), children: [
          /* @__PURE__ */ e(mn, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", role: "switch", "aria-checked": r, "aria-label": "내 위치 공유", className: "jt-switch", onClick: l, children: /* @__PURE__ */ e("i", {}) })
    ] }),
    r && g && /* @__PURE__ */ e("p", { className: "jt-warn-inline jt-share-err", children: g }),
    /* @__PURE__ */ e(
      wa,
      {
        gkey: t.gmapsKey,
        view: A,
        setView: m,
        pins: f,
        temp: null,
        selectedId: s,
        onTap: () => u(null),
        onPinTap: (y) => u(y),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ e("b", { children: b }),
        "/",
        v.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: w, disabled: !b, children: [
        /* @__PURE__ */ e(dn, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ e("ul", { className: "jt-fam-list", children: k.map(({ m: y, l: D, live: E }) => {
      let R = y === a, S = E && x && !R ? ee(x, D) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (E ? " live" : "") + (s === y ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !E,
            onClick: () => {
              u(y), m({ lat: D.lat, lng: D.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ e(it, { name: y, members: v, size: 34 }),
                E && /* @__PURE__ */ e("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  y,
                  R ? " (나)" : ""
                ] }),
                /* @__PURE__ */ e("span", { children: E ? `위치 공유 중, ${ve(D.at)}${S != null ? `, 나와 ${ka(S)}` : ""}` : D && D.at ? `앱 꺼짐, 마지막 접속 ${ve(D.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        E && !R && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Co(D), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e(ga, { size: 13 }),
          "길 찾기"
        ] })
      ] }, y);
    }) }),
    p && /* @__PURE__ */ o(jt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => d(!1), children: [
      /* @__PURE__ */ o("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ e("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ e("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ e("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ e("b", { children: "공유 설정" }),
          /* @__PURE__ */ e("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: () => d(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ e("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var zt = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], Eo = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", Mo = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), So = 7e3;
function Ao() {
  let [t, a] = N(0), [n, r] = N({}), l = J(n);
  if (l.current = n, H(() => {
    let p = setInterval(() => {
      a((d) => {
        let h = d;
        for (let v = 0; v < zt.length && (h = (h + 1) % zt.length, !!l.current[h]); v++)
          ;
        return h;
      });
    }, So);
    return () => clearInterval(p);
  }, []), zt.every((p, d) => n[d])) return null;
  let g = zt[t];
  return /* @__PURE__ */ o(pt, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      zt.map((p, d) => /* @__PURE__ */ e(
        "img",
        {
          src: Eo(p.f),
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
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: zt.map((p, d) => /* @__PURE__ */ e("i", { className: d === t ? "on" : "" }, p.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: Mo(g.f), target: "_blank", rel: "noopener noreferrer", children: [
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
function Ae() {
  let [t, a] = N(!1), [n, r] = N(null), [l, x] = N([]), [g, p] = N([]), [d, h] = N([]), [v, k] = N([]), [c, z] = N(null), [f, s] = N("plan"), [u, A] = N(0), [m, w] = N(!1), [i, b] = N(null), [y, D] = N(""), E = J(!1), [R, S] = N(null), [M, _] = N(!1), [B, q] = N({}), [L, j] = N(!1), [O, G] = N(null), [nt, bt] = N("");
  H(() => {
    (async () => {
      try {
        let C = await window.storage.get("hdr", !1);
        C && C.value === "min" && _(!0);
      } catch {
      }
      try {
        let C = await window.storage.get("locshare", !1);
        C && C.value === "on" && j(!0), (!C || !C.value) && ne(!0);
      } catch {
        ne(!0);
      }
    })();
  }, []);
  let [ae, ne] = N(!1), [Gt, Fe] = N("");
  H(() => {
    if (!Gt) return;
    let C = setTimeout(() => Fe(""), 2600);
    return () => clearTimeout(C);
  }, [Gt]);
  let qt = (C, F) => {
    j(C), ne(!1), C || bt(""), F || Fe(C ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", C ? "on" : "off", !1);
    } catch {
    }
  }, De = () => qt(!L);
  H(() => {
    if (!L || !c || !n) return;
    let C = xe + encodeURIComponent(c), F = null, I = null, P = 0, T = (et) => {
      I = et, P = Date.now(), G(et), Ct(C, { ...et, at: Date.now(), online: !0 });
    }, U = () => {
      if (F == null) {
        if (!navigator.geolocation) {
          bt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        F = navigator.geolocation.watchPosition(
          (et) => {
            let re = { lat: et.coords.latitude, lng: et.coords.longitude, acc: Math.round(et.coords.accuracy) };
            bt(""), !I || ee(I, re) > 25 || Date.now() - P > 6e4 ? T(re) : G(re);
          },
          (et) => bt(
            et.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, $ = (et) => {
      F != null && navigator.geolocation.clearWatch(F), F = null, et && Ct(C, { online: !1, at: Date.now() });
    }, K = () => document.visibilityState === "visible" ? U() : $(!0), Z = () => $(!0), rt = setInterval(() => {
      document.visibilityState === "visible" && I && T(I);
    }, 6e4);
    return document.visibilityState === "visible" && U(), document.addEventListener("visibilitychange", K), window.addEventListener("pagehide", Z), () => {
      clearInterval(rt), document.removeEventListener("visibilitychange", K), window.removeEventListener("pagehide", Z), $(!0);
    };
  }, [L, c, !!n]);
  let Ca = () => {
    let C = !M;
    _(C);
    try {
      window.storage.set("hdr", C ? "min" : "max", !1);
    } catch {
    }
  };
  H(() => {
    let C = !0, F = async () => {
      let P = await On();
      if (C)
        if (P) {
          let T = { ...P, at: Date.now() };
          S(T), Ct(W.fx, T);
        } else {
          let T = await lt(W.fx, null);
          C && T && T.rate > 0 && S({ ...T, cached: !0 });
        }
    };
    F();
    let I = setInterval(F, 3 * 36e5);
    return () => {
      C = !1, clearInterval(I);
    };
  }, []);
  let Xt = qa(async () => {
    let [C, F, I, P, T] = await Promise.all([
      lt(W.settings, null),
      lt(W.plan, []),
      lt(W.wish, []),
      lt(W.spend, []),
      lt(W.board, [])
    ]);
    r(C), x(F), p(I), h(P), k(T);
    try {
      let U = await window.storage.list(xe, !0), $ = (U && U.keys || []).map((rt) => typeof rt == "string" ? rt : rt.key).filter(Boolean), K = await Promise.all($.map((rt) => lt(rt, null))), Z = {};
      $.forEach((rt, et) => {
        K[et] && (Z[decodeURIComponent(rt.slice(xe.length))] = K[et]);
      }), q(Z);
    } catch {
    }
    a(!0);
  }, []);
  H(() => {
    (async () => {
      try {
        let I = await window.storage.get("me", !1);
        I && I.value && z(I.value);
      } catch {
      }
      await Xt();
    })();
    let C = window.storage.onChange ? window.storage.onChange(Xt) : null, F = setInterval(Xt, C ? 6e4 : 1e4);
    return () => {
      clearInterval(F), C && C();
    };
  }, [Xt]), H(() => {
    if (!n || E.current) return;
    E.current = !0;
    let C = Math.round((xt(ct(/* @__PURE__ */ new Date())) - xt(n.start)) / 864e5);
    C >= 0 && C < n.days && A(C);
  }, [n]);
  let V = async (C, F, I, P) => {
    let T = await lt(C, F), U = P(T);
    I(U);
    let $ = await Ct(C, U);
    return $ || D("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), $;
  }, za = async (C) => {
    z(C);
    try {
      await window.storage.set("me", C, !1);
    } catch {
    }
  }, Ea = async (C) => {
    r(C), w(!1), await Ct(W.settings, C) || D("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), c && !C.members.includes(c) && z(null);
  }, tt = () => b(null), Pe = (C, F) => ({
    add: (I, P) => V(
      C,
      [],
      F,
      (T) => T.map(
        (U) => U.id === I ? { ...U, comments: [...U.comments || [], { id: gt(), by: c, text: P, createdAt: Date.now() }] } : U
      )
    ),
    del: (I, P) => V(
      C,
      [],
      F,
      (T) => T.map((U) => U.id === I ? { ...U, comments: (U.comments || []).filter(($) => $.id !== P) } : U)
    )
  }), oe = (C, F, I = !1) => (P, T) => V(C, [], F, (U) => U.map(($) => $.id === P ? Kn($, T, c, I) : $)), Ma = oe(W.plan, x), Sa = oe(W.wish, p), Ro = oe(W.board, k, !0), $e = Pe(W.plan, x), Re = Pe(W.wish, p), Aa = (C, F, I) => V(
    W.plan,
    [],
    x,
    (P) => F ? P.map((T) => T.id === F ? { ...T, ...C } : T) : [...P, { id: gt(), day: I, by: c, ...C }]
  ), Ia = (C) => V(W.plan, [], x, (F) => F.filter((I) => I.id !== C)), _e = (C) => V(W.wish, [], p, (F) => [...F, { id: gt(), by: c, likes: [c], createdAt: Date.now(), ...C }]), Fa = (C) => V(
    W.wish,
    [],
    p,
    (F) => F.map(
      (I) => I.id === C ? { ...I, likes: I.likes.includes(c) ? I.likes.filter((P) => P !== c) : [...I.likes, c] } : I
    )
  ), Te = (C) => V(W.wish, [], p, (F) => F.filter((I) => I.id !== C)), Da = (C, F) => V(W.wish, [], p, (I) => I.map((P) => P.id === C ? { ...P, ...F, editedAt: Date.now() } : P)), Pa = async (C, F) => {
    await V(W.plan, [], x, (I) => [
      ...I,
      {
        id: gt(),
        day: F,
        by: c,
        time: "",
        title: C.name,
        place: C.area || "",
        link: C.link || "",
        memo: C.memo || "",
        comments: C.comments || [],
        reactions: C.reactions || {},
        ...Ft(C) ? { lat: C.lat, lng: C.lng } : {}
      }
    ]), await V(W.wish, [], p, (I) => I.map((P) => P.id === C.id ? { ...P, planned: F } : P)), A(F);
  }, $a = (C, F) => V(
    W.spend,
    [],
    h,
    (I) => F ? I.map((P) => P.id === F ? { ...P, ...C, editedAt: Date.now(), editedBy: c } : P) : [...I, { id: gt(), by: c, createdAt: Date.now(), ...C }]
  ), Ra = (C) => V(W.spend, [], h, (F) => F.filter((I) => I.id !== C)), _a = async ({ text: C, urls: F, photos: I }, P) => {
    for (let K of I.filter((Z) => Z.data)) {
      if (!await Ct(Ce(K.id), K.data)) return !1;
      ht.set(K.id, K.data);
    }
    let T = I.map((K) => K.id), U = [], $ = await V(W.board, [], k, (K) => P ? K.map((Z) => Z.id !== P ? Z : (U = (Z.photos || []).filter((rt) => !T.includes(rt)), { ...Z, text: C, urls: F, photos: T, editedAt: Date.now() })) : [{ id: gt(), by: c, createdAt: Date.now(), text: C, urls: F, photos: T, likes: [], comments: [] }, ...K]);
    return $ && U.forEach(ea), $;
  }, Ta = async (C) => {
    let F = [];
    await V(W.board, [], k, (P) => (F = P.find((T) => T.id === C)?.photos || [], P.filter((T) => T.id !== C))) && F.forEach(ea);
  }, _o = (C) => V(
    W.board,
    [],
    k,
    (F) => F.map((I) => {
      if (I.id !== C) return I;
      let P = I.likes || [];
      return { ...I, likes: P.includes(c) ? P.filter((T) => T !== c) : [...P, c] };
    })
  ), To = (C, F) => V(
    W.board,
    [],
    k,
    (I) => I.map(
      (P) => P.id === C ? { ...P, comments: [...P.comments || [], { id: gt(), by: c, text: F, createdAt: Date.now() }] } : P
    )
  ), Lo = (C, F) => V(
    W.board,
    [],
    k,
    (I) => I.map((P) => P.id === C ? { ...P, comments: (P.comments || []).filter((T) => T.id !== F) } : P)
  ), Pt;
  if (!t)
    Pt = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || m)
    Pt = /* @__PURE__ */ e(Hn, { initial: n, onSave: Ea, onCancel: n ? () => w(!1) : null });
  else if (!c || !n.members.includes(c))
    Pt = /* @__PURE__ */ e(Jn, { members: n.members, onPick: za });
  else {
    let C = dt(n.start, 0), F = dt(n.start, n.days - 1), I = Math.round((xt(n.start) - xt(ct(/* @__PURE__ */ new Date()))) / 864e5), P = Math.round((xt(ct(/* @__PURE__ */ new Date())) - xt(n.start)) / 864e5), T = P >= 0 && P < n.days ? P : u, U = R ? { ...n, rate: R.rate, fx: R } : n;
    Pt = /* @__PURE__ */ o(pt, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (M ? " mini" : f === "plan" ? " tall" : ""), children: [
        !M && /* @__PURE__ */ e(Ao, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => z(null), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(it, { name: c, members: n.members, size: 24 }),
            c
          ] }),
          M && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
            n.title,
            I > 0 && /* @__PURE__ */ o("em", { children: [
              "D-",
              I
            ] }),
            I === 0 && /* @__PURE__ */ e("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ o(
              "button",
              {
                className: "jt-icon light jt-locbtn" + (L ? " on" : ""),
                onClick: De,
                "aria-pressed": L,
                "aria-label": L ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: L ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ e(Yt, { size: 19 }),
                  /* @__PURE__ */ e("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: "jt-icon light",
                onClick: Ca,
                "aria-label": M ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !M,
                children: M ? /* @__PURE__ */ e(ln, { size: 20 }) : /* @__PURE__ */ e(pn, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => w(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(Za, { size: 20 }) })
          ] })
        ] }),
        !M && /* @__PURE__ */ o(pt, { children: [
          /* @__PURE__ */ e("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              C.getMonth() + 1,
              "월 ",
              C.getDate(),
              "일 – ",
              F.getMonth() + 1,
              "월 ",
              F.getDate(),
              "일"
            ] }),
            I > 0 && /* @__PURE__ */ o("span", { className: "jt-dday", children: [
              "출발까지 ",
              I,
              "일"
            ] }),
            I === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      y && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        y,
        /* @__PURE__ */ e("button", { onClick: () => D(""), "aria-label": "닫기", children: /* @__PURE__ */ e(Ht, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        f === "plan" && /* @__PURE__ */ e(
          ao,
          {
            settings: U,
            schedule: l,
            day: u,
            setDay: A,
            onAdd: () => b({ type: "plan", day: u }),
            onEdit: ($) => b({ type: "plan", item: $, day: $.day }),
            onAddAt: ($, K) => b({ type: "plan", day: $, preset: { time: K, end: Et(Math.min(vt(K) + 60, 23 * 60 + 59)) } }),
            me: c,
            onComment: $e.add,
            onDelComment: $e.del,
            onReact: Ma
          }
        ),
        f === "wish" && /* @__PURE__ */ e(
          xo,
          {
            settings: U,
            wish: g,
            me: c,
            onAdd: () => b({ type: "wish" }),
            onEdit: ($) => b({ type: "wish", item: $ }),
            onSave: _e,
            onLike: Fa,
            onPlan: ($) => b({ type: "toPlan", wish: $ }),
            onDelete: Te,
            onComment: Re.add,
            onDelComment: Re.del,
            onReact: Sa
          }
        ),
        f === "spend" && /* @__PURE__ */ e(
          yo,
          {
            settings: U,
            spend: d,
            me: c,
            onEdit: ($) => b({ type: "spend", item: $ })
          }
        ),
        f === "family" && /* @__PURE__ */ e(
          zo,
          {
            settings: U,
            me: c,
            locs: B,
            shareOn: L,
            onToggle: De,
            myPos: O,
            geoErr: nt
          }
        )
      ] }),
      (() => {
        let $ = {
          plan: [`${u + 1}일차 일정 추가`, () => b({ type: "plan", day: u })],
          wish: ["가고 싶은 곳 추가", () => b({ type: "wish" })],
          spend: ["경비 추가", () => b({ type: "spend" })]
        }[f];
        return $ ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: $[1], children: [
          /* @__PURE__ */ e(Xa, { size: 20, strokeWidth: 2.6 }),
          $[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", Qa],
        ["wish", "가고 싶은 곳", Ne],
        ["spend", "경비", tn],
        ["family", "위치 공유", cn]
      ].map(([$, K, Z]) => /* @__PURE__ */ o("button", { className: f === $ ? "on" : "", onClick: () => s($), "aria-current": f === $, children: [
        /* @__PURE__ */ e("span", { className: "jt-nav-ic", children: /* @__PURE__ */ e(Z, { size: 21 }) }),
        K
      ] }, $)) }),
      i?.type === "plan" && /* @__PURE__ */ e(jt, { title: i.item ? "일정 수정" : `${i.day + 1}일차 일정 추가`, onClose: tt, children: /* @__PURE__ */ e(
        Gn,
        {
          initial: i.item,
          preset: i.preset,
          gkey: n.gmapsKey,
          dayItems: l.filter(($) => $.day === i.day && $.id !== i.item?.id),
          onSave: ($) => {
            Aa($, i.item?.id, i.day), tt();
          },
          onDelete: () => {
            Ia(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "wish" && /* @__PURE__ */ e(jt, { title: i.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: tt, children: /* @__PURE__ */ e(
        qn,
        {
          initial: i.item,
          onSave: ($) => {
            i.item ? Da(i.item.id, $) : _e($), tt();
          },
          onDelete: () => {
            Te(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "spend" && /* @__PURE__ */ e(jt, { title: i.item ? "경비 수정" : "경비 기록", onClose: tt, children: /* @__PURE__ */ e(
        Xn,
        {
          settings: U,
          me: c,
          defaultDay: T,
          initial: i.item,
          onSave: ($) => {
            $a($, i.item?.id), tt();
          },
          onDelete: () => {
            Ra(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "post" && /* @__PURE__ */ e(jt, { title: i.item ? "글 수정" : "새 글", onClose: tt, children: /* @__PURE__ */ e(
        Vn,
        {
          initial: i.item,
          onSave: async ($) => {
            let K = await _a($, i.item?.id);
            return K && tt(), K;
          },
          onDelete: () => {
            Ta(i.item.id), tt();
          }
        }
      ) }),
      ae && !i && /* @__PURE__ */ e(jt, { title: "가족과 위치를 공유할까요?", onClose: () => qt(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
        /* @__PURE__ */ o("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ e("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ e("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ e("button", { className: "jt-primary", onClick: () => qt(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: () => qt(!1, !0), children: "나중에 할게요" })
      ] }) }),
      Gt && /* @__PURE__ */ e("div", { className: "jt-toast", role: "status", children: Gt }),
      i?.type === "toPlan" && /* @__PURE__ */ e(jt, { title: `"${i.wish.name}" 몇째 날에 갈까요?`, onClose: tt, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: n.days }, ($, K) => {
        let Z = dt(n.start, K);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": Q[K % Q.length] },
            onClick: () => {
              Pa(i.wish, K), tt(), s("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: K + 1 }),
              K + 1,
              "일차 ",
              Ot(Z),
              " (",
              Ut(Z),
              ")"
            ]
          },
          K
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: Ie }),
    Pt
  ] });
}
var Ie = `
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
.jt-moves li strong{font-size:18px;font-variant-numeric:tabular-nums}
