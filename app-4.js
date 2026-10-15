return `${at(a.getHours())}:${at(a.getMinutes())}`;
}, Uo = (t) => {
  let a = new Date(t);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${Dt(a)})`;
};
function Ko(t) {
  return t.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ e("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function Wo({ settings: t, me: a, msgs: n, onSend: r, onDelete: s, onSendLoc: j }) {
  let f = t.members, [p, d] = C(""), [b, v] = C(null), [N, c] = C(!1), z = Y(null), g = Y(!0), l = n.length;
  W(() => {
    let i = n[l - 1], h = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (g.current || h || i && i.by === a) && z.current && z.current.scrollIntoView({ block: "end", behavior: g.current ? "auto" : "smooth" }), g.current = !1;
  }, [l]);
  let u = () => {
    let i = p.trim();
    i && (r(i), d(""));
  }, A = async () => {
    c(!0), await j(), c(!1);
  }, m = "", k = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    l === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ e("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ e("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    /* @__PURE__ */ e("ol", { className: "jt-msgs", children: n.map((i) => {
      let h = Uo(i.at), w = h !== m, F = i.by === a, E = !w && k && k.by === i.by && i.at - k.at < 5 * 6e4;
      return m = h, k = i, /* @__PURE__ */ o(pn.Fragment, { children: [
        w && /* @__PURE__ */ e("li", { className: "jt-daysep", "aria-label": h, children: /* @__PURE__ */ e("span", { children: h }) }),
        /* @__PURE__ */ o("li", { className: "jt-msg" + (F ? " mine" : "") + (E ? " cont" : ""), children: [
          !F && /* @__PURE__ */ e("span", { className: "jt-msg-av", children: !E && /* @__PURE__ */ e(rt, { name: i.by, members: f, size: 30 }) }),
          /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
            !F && !E && /* @__PURE__ */ e("span", { className: "jt-msg-name", children: i.by }),
            /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "jt-bubble" + (i.kind === "loc" ? " loc" : ""),
                  onClick: () => F && v(b === i.id ? null : i.id),
                  "aria-label": F ? "내 메시지, 누르면 삭제 메뉴" : void 0,
                  children: i.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                    /* @__PURE__ */ e(wt, { size: 16 }),
                    F ? "내 위치를 보냈어요" : `${i.by}의 현재 위치`
                  ] }) : /* @__PURE__ */ e("span", { className: "jt-msg-text", children: Ko(i.text) })
                }
              ),
              /* @__PURE__ */ e("time", { className: "jt-msg-time", children: Oo(i.at) })
            ] }),
            i.kind === "loc" && /* @__PURE__ */ o("div", { className: "jt-loclinks", children: [
              /* @__PURE__ */ o("a", { className: "jt-maplink", href: Pt({ lat: i.lat, lng: i.lng }), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(Nt, { size: 13 }),
                "지도에서 보기"
              ] }),
              !F && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Pa(i), target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ e(Ae, { size: 13 }),
                "길 찾기"
              ] })
            ] }),
            F && b === i.id && /* @__PURE__ */ e("div", { className: "jt-msg-del", children: /* @__PURE__ */ e(
              ht,
              {
                onConfirm: () => {
                  s(i), v(null);
                },
                label: "메시지 삭제"
              }
            ) })
          ] })
        ] })
      ] }, i.id);
    }) }),
    /* @__PURE__ */ e("div", { ref: z }),
    /* @__PURE__ */ o("div", { className: "jt-chatbar", children: [
      /* @__PURE__ */ e("button", { type: "button", className: "jt-chat-loc", onClick: A, disabled: N, "aria-label": "내 위치 보내기", title: "내 위치 보내기", children: /* @__PURE__ */ e(wt, { size: 20 }) }),
      /* @__PURE__ */ e(
        "textarea",
        {
          rows: 1,
          value: p,
          onChange: (i) => d(i.target.value),
          onKeyDown: (i) => {
            i.key === "Enter" && !i.shiftKey && !i.nativeEvent.isComposing && (i.preventDefault(), u());
          },
          placeholder: N ? "위치 찾는 중" : "메시지 보내기",
          "aria-label": "메시지 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: u, disabled: !p.trim(), "aria-label": "보내기", children: /* @__PURE__ */ e(ka, { size: 18 }) })
    ] })
  ] });
}
var Et = [
  { f: "Osaka Castle 02bs3200.jpg", t: "오사카성", by: "663highland", lic: "CC BY-SA 3.0", pos: "50% 45%" },
  { f: "Dotonbori, Osaka, at night, November 2016.jpg", t: "도톤보리 야경", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 40%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -01.jpg", t: "우메다 스카이 빌딩", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 35%" },
  { f: "Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg", t: "오사카성 해자와 시내", by: "Martin Falbisoner", lic: "CC BY-SA 4.0", pos: "50% 55%" },
  { f: "Umeda Sky Building, Osaka, November 2016 -02.jpg", t: "공중정원 에스컬레이터", by: "Wikimedia Commons", lic: "CC BY-SA", pos: "50% 50%" }
], Ho = (t) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(t) + "?width=1280", Yo = (t) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(t.replace(/ /g, "_")), Jo = 7e3;
function Go() {
  let [t, a] = C(0), [n, r] = C({}), s = Y(n);
  if (s.current = n, W(() => {
    let p = setInterval(() => {
      a((d) => {
        let b = d;
        for (let v = 0; v < Et.length && (b = (b + 1) % Et.length, !!s.current[b]); v++)
          ;
        return b;
      });
    }, Jo);
    return () => clearInterval(p);
  }, []), Et.every((p, d) => n[d])) return null;
  let f = Et[t];
  return /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ o("div", { className: "jt-hero", "aria-hidden": "true", children: [
      Et.map((p, d) => /* @__PURE__ */ e(
        "img",
        {
          src: Ho(p.f),
          alt: "",
          className: d === t ? "on" : "",
          style: { objectPosition: p.pos },
          loading: d === 0 ? "eager" : "lazy",
          onError: () => r((b) => ({ ...b, [d]: !0 }))
        },
        p.f
      )),
      /* @__PURE__ */ e("div", { className: "jt-hero-shade" })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-hero-foot", children: [
      /* @__PURE__ */ e("div", { className: "jt-hero-dots", "aria-hidden": "true", children: Et.map((p, d) => /* @__PURE__ */ e("i", { className: d === t ? "on" : "" }, p.f)) }),
      /* @__PURE__ */ o("a", { className: "jt-hero-cap", href: Yo(f.f), target: "_blank", rel: "noopener noreferrer", children: [
        f.t,
        ", 사진 ",
        f.by,
        " (",
        f.lic,
        ")"
      ] })
    ] })
  ] });
}
function Re() {
  let [t, a] = C(!1), [n, r] = C(null), [s, j] = C([]), [f, p] = C([]), [d, b] = C([]), [v, N] = C([]), [c, z] = C(null), [g, l] = C("plan"), [u, A] = C(0), [m, k] = C(!1), [i, h] = C(null), [w, F] = C(""), E = Y(!1), [R, S] = C(null), [M, _] = C(!1), [K, q] = C({}), [B, y] = C(!1), [U, G] = C(null), [nt, bt] = C("");
  W(() => {
    (async () => {
      try {
        let x = await window.storage.get("hdr", !1);
        x && x.value === "min" && _(!0);
      } catch {
      }
      try {
        let x = await window.storage.get("locshare", !1);
        x && x.value === "on" && y(!0), (!x || !x.value) && se(!0);
      } catch {
        se(!0);
      }
    })();
  }, []);
  let [ie, se] = C(!1), [le, qt] = C([]), [Le, Te] = C(0);
  W(() => {
    (async () => {
      try {
        let x = await window.storage.get("chatread", !1);
        x && x.value && Te(Number(x.value) || 0);
      } catch {
      }
    })();
  }, []);
  let Be = async (x) => {
    let I = { id: st(), by: c, at: Date.now(), ...x }, D = ya(I);
    qt((L) => [...L, { ...I, key: D, pending: !0 }]), await xt(D, I) || (qt((L) => L.filter((T) => T.id !== I.id)), Zt("메시지를 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요."));
  }, _a = async (x) => {
    qt((I) => I.filter((D) => D.id !== x.id));
    try {
      await window.storage.delete(x.key || ya(x), !0);
    } catch {
    }
  }, La = async () => {
    let x = U;
    if (x || (x = await new Promise((I) => {
      if (!navigator.geolocation) return I(null);
      navigator.geolocation.getCurrentPosition(
        (D) => I({ lat: D.coords.latitude, lng: D.coords.longitude }),
        () => I(null),
        { enableHighAccuracy: !0, timeout: 15e3, maximumAge: 6e4 }
      );
    })), !x) {
      Zt("위치를 찾지 못했어요. 휴대폰 설정에서 위치 권한을 허용해 주세요.");
      return;
    }
    await Be({ kind: "loc", lat: x.lat, lng: x.lng, text: "" });
  }, Rt = le.reduce((x, I) => I.by !== c && I.at > x ? I.at : x, 0), Xt = le.filter((x) => x.by !== c && x.at > Le).length;
  W(() => {
    if (!(g !== "chat" || !Rt || Rt <= Le)) {
      Te(Rt);
      try {
        window.storage.set("chatread", String(Rt), !1);
      } catch {
      }
    }
  }, [g, Rt]);
  let [Vt, Zt] = C("");
  W(() => {
    if (!Vt) return;
    let x = setTimeout(() => Zt(""), 2600);
    return () => clearTimeout(x);
  }, [Vt]);
  let Qt = (x, I) => {
    y(x), se(!1), x || bt(""), I || Zt(x ? "위치 공유를 켰어요. 앱이 열려 있는 동안만 공유돼요." : "위치 공유를 껐어요. 가족 지도에서 내 위치가 사라져요.");
    try {
      window.storage.set("locshare", x ? "on" : "off", !1);
    } catch {
    }
  }, Oe = () => Qt(!B);
  W(() => {
    if (!B || !c || !n) return;
    let x = ke + encodeURIComponent(c), I = null, D = null, $ = 0, L = (ot) => {
      D = ot, $ = Date.now(), G(ot), xt(x, { ...ot, at: Date.now(), online: !0 });
    }, T = () => {
      if (I == null) {
        if (!navigator.geolocation) {
          bt("이 기기에서는 위치를 쓸 수 없어요.");
          return;
        }
        I = navigator.geolocation.watchPosition(
          (ot) => {
            let pe = { lat: ot.coords.latitude, lng: ot.coords.longitude, acc: Math.round(ot.coords.accuracy) };
            bt(""), !D || re(D, pe) > 25 || Date.now() - $ > 6e4 ? L(pe) : G(pe);
          },
          (ot) => bt(
            ot.code === 1 ? "위치 권한이 꺼져 있어요. 휴대폰 설정에서 이 앱(또는 브라우저)의 위치 권한을 허용해 주세요." : "위치를 찾지 못했어요. 잠시 후 다시 시도할게요."
          ),
          { enableHighAccuracy: !0, maximumAge: 3e4, timeout: 2e4 }
        );
      }
    }, P = (ot) => {
      I != null && navigator.geolocation.clearWatch(I), I = null, ot && xt(x, { online: !1, at: Date.now() });
    }, O = () => document.visibilityState === "visible" ? T() : P(!0), Z = () => P(!0), Lt = setInterval(() => {
      document.visibilityState === "visible" && D && L(D);
    }, 6e4);
    return document.visibilityState === "visible" && T(), document.addEventListener("visibilitychange", O), window.addEventListener("pagehide", Z), () => {
      clearInterval(Lt), document.removeEventListener("visibilitychange", O), window.removeEventListener("pagehide", Z), P(!0);
    };
  }, [B, c, !!n]);
  let Ta = () => {
    let x = !M;
    _(x);
    try {
      window.storage.set("hdr", x ? "min" : "max", !1);
    } catch {
    }
  };
  W(() => {
    let x = !0, I = async () => {
      let $ = await ao();
      if (x)
        if ($) {
          let L = { ...$, at: Date.now() };
          S(L), xt(H.fx, L);
        } else {
          let L = await lt(H.fx, null);
          x && L && L.rate > 0 && S({ ...L, cached: !0 });
        }
    };
    I();
    let D = setInterval(I, 3 * 36e5);
    return () => {
      x = !1, clearInterval(D);
    };
  }, []);
  let te = dn(async () => {
    let [x, I, D, $, L] = await Promise.all([
      lt(H.settings, null),
      lt(H.plan, []),
      lt(H.wish, []),
      lt(H.spend, []),
      lt(H.board, [])
    ]);
    r(x), j(I), p(D), b($), N(L);
    try {
      let T = {};
      (await ca(ke)).forEach(([P, O]) => T[decodeURIComponent(P.slice(ke.length))] = O), q(T);
    } catch {
    }
    try {
      let T = (await ca($a)).map(([P, O]) => ({ ...O, key: P }));
      T.sort((P, O) => P.at - O.at), qt((P) => {
        let O = P.filter((Z) => Z.pending && !T.some((Lt) => Lt.id === Z.id));
        return [...T, ...O];
      });
    } catch {
    }
    a(!0);
  }, []);
  W(() => {
    (async () => {
      try {
        let D = await window.storage.get("me", !1);
        D && D.value && z(D.value);
      } catch {
      }
      await te();
    })();
    let x = window.storage.onChange ? window.storage.onChange(te) : null, I = setInterval(te, x ? 6e4 : 1e4);
    return () => {
      clearInterval(I), x && x();
    };
  }, [te]), W(() => {
    if (!n || E.current) return;
    E.current = !0;
    let x = Math.round((jt(pt(/* @__PURE__ */ new Date())) - jt(n.start)) / 864e5);
    x >= 0 && x < n.days && A(x);
  }, [n]);
  let V = async (x, I, D, $) => {
    let L = await lt(x, I), T = $(L);
    D(T);
    let P = await xt(x, T);
    return P || F("저장하지 못했어요. 잠시 후 다시 시도해 주세요."), P;
  }, Ba = async (x) => {
    z(x);
    try {
      await window.storage.set("me", x, !1);
    } catch {
    }
  }, Oa = async (x) => {
    r(x), k(!1), await xt(H.settings, x) || F("설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요."), c && !x.members.includes(c) && z(null);
  }, tt = () => h(null), Ue = (x, I) => ({
    add: (D, $) => V(
      x,
      [],
      I,
      (L) => L.map(
        (T) => T.id === D ? { ...T, comments: [...T.comments || [], { id: st(), by: c, text: $, createdAt: Date.now() }] } : T
      )
    ),
    del: (D, $) => V(
      x,
      [],
      I,
      (L) => L.map((T) => T.id === D ? { ...T, comments: (T.comments || []).filter((P) => P.id !== $) } : T)
    )
  }), ce = (x, I, D = !1) => ($, L) => V(x, [], I, (T) => T.map((P) => P.id === $ ? oo(P, L, c, D) : P)), Ua = ce(H.plan, j), Ka = ce(H.wish, p), tr = ce(H.board, N, !0), Ke = Ue(H.plan, j), We = Ue(H.wish, p), Wa = (x, I, D) => V(
    H.plan,
    [],
    j,
    ($) => I ? $.map((L) => L.id === I ? { ...L, ...x } : L) : [...$, { id: st(), day: D, by: c, ...x }]
  ), Ha = (x) => V(H.plan, [], j, (I) => I.filter((D) => D.id !== x)), He = (x) => V(H.wish, [], p, (I) => [...I, { id: st(), by: c, likes: [c], createdAt: Date.now(), ...x }]), Ya = (x) => V(
    H.wish,
    [],
    p,
    (I) => I.map(
      (D) => D.id === x ? { ...D, likes: D.likes.includes(c) ? D.likes.filter(($) => $ !== c) : [...D.likes, c] } : D
    )
  ), Ye = (x) => V(H.wish, [], p, (I) => I.filter((D) => D.id !== x)), Ja = (x, I) => V(H.wish, [], p, (D) => D.map(($) => $.id === x ? { ...$, ...I, editedAt: Date.now() } : $)), Ga = async (x, I) => {
    await V(H.plan, [], j, (D) => [
      ...D,
      {
        id: st(),
        day: I,
        by: c,
        time: "",
        title: x.name,
        place: x.area || "",
        link: x.link || "",
        memo: x.memo || "",
        comments: x.comments || [],
        reactions: x.reactions || {},
        ...Ft(x) ? { lat: x.lat, lng: x.lng } : {}
      }
    ]), await V(H.wish, [], p, (D) => D.map(($) => $.id === x.id ? { ...$, planned: I } : $)), A(I);
  }, qa = (x, I) => V(
    H.spend,
    [],
    b,
    (D) => I ? D.map(($) => $.id === I ? { ...$, ...x, editedAt: Date.now(), editedBy: c } : $) : [...D, { id: st(), by: c, createdAt: Date.now(), ...x }]
  ), Xa = (x) => V(H.spend, [], b, (I) => I.filter((D) => D.id !== x)), Va = async ({ text: x, urls: I, photos: D }, $) => {
    for (let O of D.filter((Z) => Z.data)) {
      if (!await xt(Ie(O.id), O.data)) return !1;
      ft.set(O.id, O.data);
    }
    let L = D.map((O) => O.id), T = [], P = await V(H.board, [], N, (O) => $ ? O.map((Z) => Z.id !== $ ? Z : (T = (Z.photos || []).filter((Lt) => !L.includes(Lt)), { ...Z, text: x, urls: I, photos: L, editedAt: Date.now() })) : [{ id: st(), by: c, createdAt: Date.now(), text: x, urls: I, photos: L, likes: [], comments: [] }, ...O]);
    return P && T.forEach(pa), P;
  }, Za = async (x) => {
    let I = [];
    await V(H.board, [], N, ($) => (I = $.find((L) => L.id === x)?.photos || [], $.filter((L) => L.id !== x))) && I.forEach(pa);
  }, er = (x) => V(
    H.board,
    [],
    N,
    (I) => I.map((D) => {
      if (D.id !== x) return D;
      let $ = D.likes || [];
      return { ...D, likes: $.includes(c) ? $.filter((L) => L !== c) : [...$, c] };
    })
  ), ar = (x, I) => V(
    H.board,
    [],
    N,
    (D) => D.map(
      ($) => $.id === x ? { ...$, comments: [...$.comments || [], { id: st(), by: c, text: I, createdAt: Date.now() }] } : $
    )
  ), nr = (x, I) => V(
    H.board,
    [],
    N,
    (D) => D.map(($) => $.id === x ? { ...$, comments: ($.comments || []).filter((L) => L.id !== I) } : $)
  ), _t;
  if (!t)
    _t = /* @__PURE__ */ e("div", { className: "jt-loading", children: "불러오는 중" });
  else if (!n || m)
    _t = /* @__PURE__ */ e(io, { initial: n, onSave: Oa, onCancel: n ? () => k(!1) : null });
  else if (!c || !n.members.includes(c))
    _t = /* @__PURE__ */ e(lo, { members: n.members, onPick: Ba });
  else {
    let x = dt(n.start, 0), I = dt(n.start, n.days - 1), D = Math.round((jt(n.start) - jt(pt(/* @__PURE__ */ new Date()))) / 864e5), $ = Math.round((jt(pt(/* @__PURE__ */ new Date())) - jt(n.start)) / 864e5), L = $ >= 0 && $ < n.days ? $ : u, T = R ? { ...n, rate: R.rate, fx: R } : n;
    _t = /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("header", { className: "jt-head hero" + (M ? " mini" : g === "plan" ? " tall" : ""), children: [
        !M && /* @__PURE__ */ e(Go, {}),
        /* @__PURE__ */ o("div", { className: "jt-head-top", children: [
          /* @__PURE__ */ o("button", { className: "jt-me", onClick: () => z(null), "aria-label": "사용자 바꾸기", children: [
            /* @__PURE__ */ e(rt, { name: c, members: n.members, size: 24 }),
            c
          ] }),
          M && /* @__PURE__ */ o("strong", { className: "jt-mini-title", children: [
            n.title,
            D > 0 && /* @__PURE__ */ o("em", { children: [
              "D-",
              D
            ] }),
            D === 0 && /* @__PURE__ */ e("em", { children: "오늘 출발" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-head-btns", children: [
            /* @__PURE__ */ o(
              "button",
              {
                className: "jt-icon light jt-locbtn" + (B ? " on" : ""),
                onClick: Oe,
                "aria-pressed": B,
                "aria-label": B ? "위치 공유 끄기 (지금 켜짐)" : "위치 공유 켜기 (지금 꺼짐)",
                title: B ? "위치 공유 켜짐" : "위치 공유 꺼짐",
                children: [
                  /* @__PURE__ */ e(wt, { size: 19 }),
                  /* @__PURE__ */ e("i", { "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: "jt-icon light",
                onClick: Ta,
                "aria-label": M ? "상단 크게 보기" : "상단 줄이기",
                "aria-expanded": !M,
                children: M ? /* @__PURE__ */ e(wn, { size: 20 }) : /* @__PURE__ */ e(kn, { size: 20 })
              }
            ),
            /* @__PURE__ */ e("button", { className: "jt-icon light", onClick: () => k(!0), "aria-label": "여행 설정", children: /* @__PURE__ */ e(gn, { size: 20 }) })
          ] })
        ] }),
        !M && /* @__PURE__ */ o(ct, { children: [
          /* @__PURE__ */ e("h1", { children: n.title }),
          /* @__PURE__ */ o("div", { className: "jt-head-sub", children: [
            /* @__PURE__ */ o("span", { children: [
              x.getMonth() + 1,
              "월 ",
              x.getDate(),
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
            D === 0 && /* @__PURE__ */ e("span", { className: "jt-dday", children: "오늘 출발!" })
          ] })
        ] })
      ] }),
      w && /* @__PURE__ */ o("div", { className: "jt-error", role: "alert", children: [
        w,
        /* @__PURE__ */ e("button", { onClick: () => F(""), "aria-label": "닫기", children: /* @__PURE__ */ e(Gt, { size: 16 }) })
      ] }),
      /* @__PURE__ */ o("main", { className: "jt-main", children: [
        g === "plan" && /* @__PURE__ */ e(
          xo,
          {
            settings: T,
            schedule: s,
            day: u,
            setDay: A,
            onAdd: () => h({ type: "plan", day: u }),
            onEdit: (P) => h({ type: "plan", item: P, day: P.day }),
            onAddAt: (P, O) => h({ type: "plan", day: P, preset: { time: O, end: Mt(Math.min(yt(O) + 60, 23 * 60 + 59)) } }),
            me: c,
            onComment: Ke.add,
            onDelComment: Ke.del,
            onReact: Ua
          }
        ),
        g === "wish" && /* @__PURE__ */ e(
          Fo,
          {
            settings: T,
            wish: f,
            me: c,
            onAdd: () => h({ type: "wish" }),
            onEdit: (P) => h({ type: "wish", item: P }),
            onSave: He,
            onLike: Ya,
            onPlan: (P) => h({ type: "toPlan", wish: P }),
            onDelete: Ye,
            onComment: We.add,
            onDelComment: We.del,
            onReact: Ka
          }
        ),
        g === "spend" && /* @__PURE__ */ e(
          Ro,
          {
            settings: T,
            spend: d,
            me: c,
            onEdit: (P) => h({ type: "spend", item: P })
          }
        ),
        g === "chat" && /* @__PURE__ */ e(
          Wo,
          {
            settings: T,
            me: c,
            msgs: le,
            onSend: (P) => Be({ kind: "text", text: P }),
            onDelete: _a,
            onSendLoc: La
          }
        ),
        g === "family" && /* @__PURE__ */ e(
          Bo,
          {
            settings: T,
            me: c,
            locs: K,
            shareOn: B,
            onToggle: Oe,
            myPos: U,
            geoErr: nt
          }
        )
      ] }),
      (() => {
        let P = {
          plan: [`${u + 1}일차 일정 추가`, () => h({ type: "plan", day: u })],
          wish: ["가고 싶은 곳 추가", () => h({ type: "wish" })],
          spend: ["경비 추가", () => h({ type: "spend" })]
        }[g];
        return P ? /* @__PURE__ */ o("button", { className: "jt-fab", onClick: P[1], children: [
          /* @__PURE__ */ e(mn, { size: 20, strokeWidth: 2.6 }),
          P[0]
        ] }) : null;
      })(),
      /* @__PURE__ */ e("nav", { className: "jt-nav", "aria-label": "메뉴", children: [
        ["plan", "일정", fn],
        ["wish", "가고 싶은 곳", Se],
        ["spend", "경비", hn],
        ["family", "위치 공유", Nn],
        ["chat", "채팅", En]
      ].map(([P, O, Z]) => /* @__PURE__ */ o("button", { className: g === P ? "on" : "", onClick: () => l(P), "aria-current": g === P, children: [
        /* @__PURE__ */ o("span", { className: "jt-nav-ic", children: [
          /* @__PURE__ */ e(Z, { size: 21 }),
          P === "chat" && Xt > 0 && g !== "chat" && /* @__PURE__ */ e("b", { className: "jt-badge", "aria-label": `안 읽은 메시지 ${Xt}개`, children: Xt > 99 ? "99+" : Xt })
        ] }),
        O
      ] }, P)) }),
      i?.type === "plan" && /* @__PURE__ */ e(vt, { title: i.item ? "일정 수정" : `${i.day + 1}일차 일정 추가`, onClose: tt, children: /* @__PURE__ */ e(
        co,
        {
          initial: i.item,
          preset: i.preset,
          gkey: n.gmapsKey,
          dayItems: s.filter((P) => P.day === i.day && P.id !== i.item?.id),
          onSave: (P) => {
            Wa(P, i.item?.id, i.day), tt();
          },
          onDelete: () => {
            Ha(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "wish" && /* @__PURE__ */ e(vt, { title: i.item ? "가고 싶은 곳 수정" : "가고 싶은 곳 추가", onClose: tt, children: /* @__PURE__ */ e(
        po,
        {
          initial: i.item,
          onSave: (P) => {
            i.item ? Ja(i.item.id, P) : He(P), tt();
          },
          onDelete: () => {
            Ye(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "spend" && /* @__PURE__ */ e(vt, { title: i.item ? "경비 수정" : "경비 기록", onClose: tt, children: /* @__PURE__ */ e(
        mo,
        {
          settings: T,
          me: c,
          defaultDay: L,
          initial: i.item,
          onSave: (P) => {
            qa(P, i.item?.id), tt();
          },
          onDelete: () => {
            Xa(i.item.id), tt();
          }
        }
      ) }),
      i?.type === "post" && /* @__PURE__ */ e(vt, { title: i.item ? "글 수정" : "새 글", onClose: tt, children: /* @__PURE__ */ e(
        uo,
        {
          initial: i.item,
          onSave: async (P) => {
            let O = await Va(P, i.item?.id);
            return O && tt(), O;
          },
          onDelete: () => {
            Za(i.item.id), tt();
          }
        }
      ) }),
      ie && !i && /* @__PURE__ */ e(vt, { title: "가족과 위치를 공유할까요?", onClose: () => Qt(!1, !0), children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
        /* @__PURE__ */ o("p", { className: "jt-ask", children: [
          "켜 두면 ",
          /* @__PURE__ */ e("b", { children: "앱이 열려 있는 동안만" }),
          " 내 위치가 가족 지도에 보여요. 앱을 닫거나 화면이 꺼지면 바로 사라져요."
        ] }),
        /* @__PURE__ */ e("p", { className: "jt-hint jt-ask-hint", children: '언제든 위쪽 위치 버튼이나 "위치 공유" 탭에서 켜고 끌 수 있어요.' }),
        /* @__PURE__ */ e("button", { className: "jt-primary", onClick: () => Qt(!0), children: "위치 공유 켜기" }),
        /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: () => Qt(!1, !0), children: "나중에 할게요" })
      ] }) }),
      Vt && /* @__PURE__ */ e("div", { className: "jt-toast", role: "status", children: Vt }),
      i?.type === "toPlan" && /* @__PURE__ */ e(vt, { title: `"${i.wish.name}" 몇째 날에 갈까요?`, onClose: tt, children: /* @__PURE__ */ e("div", { className: "jt-daypick", children: Array.from({ length: n.days }, (P, O) => {
        let Z = dt(n.start, O);
        return /* @__PURE__ */ o(
          "button",
          {
            style: { "--lc": Q[O % Q.length] },
            onClick: () => {
              Ga(i.wish, O), tt(), l("plan");
            },
            children: [
              /* @__PURE__ */ e("span", { className: "jt-day-dot", children: O + 1 }),
              O + 1,
              "일차 ",
              Ht(Z),
              " (",
              Dt(Z),
              ")"
            ]
          },
          O
        );
      }) }) })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "jt", children: [
    /* @__PURE__ */ e("style", { children: _e }),
    _t
  ] });
}
var _e = `
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
.jt-moves li em{grid-column:2;font-style:normal;font-size:12px;color:var(--muted);text-align:right}
