] })
        ] }, s)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ t("b", { children: nt(h.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 쓴 돈" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              nt(h.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ t("span", { children: v > 0.5 ? "더 결제했으니 받을 돈" : v < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ t("b", { className: we(v), children: v > 0.5 ? nt(v) : v < -0.5 ? nt(-v) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ t("ul", { className: "jt-daynet", children: C.map((c) => {
        let s = mt(l, c.day), E = c.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": q[c.day % q.length] }, children: [
          /* @__PURE__ */ t("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            c.day + 1,
            "일차 ",
            Pt(s),
            " (",
            zt(s),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            nt(c.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            nt(c.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ t("b", { className: "jt-net " + we(E), children: an(E) })
        ] }, c.day);
      }) }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "나와 관련된 경비" }),
      /* @__PURE__ */ t(
        nn,
        {
          days: C,
          start: l,
          members: u,
          rate: p,
          onEdit: i,
          filter: (c) => c.payer === n || (c.split || []).includes(n),
          empty: "나와 관련된 경비가 아직 없어요."
        }
      ),
      /* @__PURE__ */ t("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    N === "day" && /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      C.map((c) => {
        let s = mt(l, c.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": q[c.day % q.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ o("span", { className: "jt-daychip", children: [
              c.day + 1,
              "일차"
            ] }),
            Pt(s),
            " (",
            zt(s),
            ")",
            /* @__PURE__ */ t("span", { className: "jt-group-sum", children: nt(c.sum) })
          ] }),
          /* @__PURE__ */ t(en, { moves: c.res.moves, rate: p, me: n }),
          /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: c.items.map((E) => /* @__PURE__ */ t(Cn, { e: E, members: u, rate: p, onEdit: i }, E.id)) })
        ] }, c.day);
      })
    ] }),
    N === "all" && /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ t("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ t(en, { moves: h.moves, rate: p, me: n }),
        /* @__PURE__ */ t("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "전체 경비" }),
      /* @__PURE__ */ t(nn, { days: C, start: l, members: u, rate: p, onEdit: i, empty: "기록된 경비가 없어요." }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ t("ul", { className: "jt-people card", children: u.map((c) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(lt, { name: c, members: u, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ t("strong", { children: c }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            nt(h.paid[c]),
            ", 쓴 돈 ",
            nt(h.share[c])
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "jt-net " + we(h.net[c]), children: an(h.net[c]) })
      ] }, c)) })
    ] })
  ] });
}
function pa({ id: e, data: a, className: n, onClick: i, alt: r = "사진" }) {
  let [g, u] = y(a || Nt.get(e) || null), [p, l] = y(!1);
  W(() => {
    if (a) {
      u(a);
      return;
    }
    if (Nt.has(e)) {
      u(Nt.get(e));
      return;
    }
    let w = !0;
    return l(!1), Zo(e).then((N) => {
      w && (N ? u(N) : l(!0));
    }), () => {
      w = !1;
    };
  }, [e, a]);
  let x = g ? /* @__PURE__ */ t("img", { src: g, alt: r, draggable: !1 }) : /* @__PURE__ */ t("span", { className: "jt-photo-wait", children: p ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return i ? /* @__PURE__ */ t("button", { type: "button", className: "jt-photo " + (n || ""), onClick: i, "aria-label": "사진 크게 보기", children: x }) : /* @__PURE__ */ t("span", { className: "jt-photo " + (n || ""), children: x });
}
function Pi({ photos: e, index: a, onClose: n }) {
  let [i, r] = y(a), g = e.length;
  return W(() => {
    let u = (p) => {
      p.key === "Escape" && n(), p.key === "ArrowRight" && r((l) => (l + 1) % g), p.key === "ArrowLeft" && r((l) => (l - 1 + g) % g);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [g, n]), /* @__PURE__ */ o("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: n, children: [
    /* @__PURE__ */ t("button", { className: "jt-lb-close", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ t(Jt, { size: 24 }) }),
    /* @__PURE__ */ t("div", { className: "jt-lb-stage", onClick: (u) => u.stopPropagation(), children: /* @__PURE__ */ t(pa, { id: e[i], className: "contain" }) }),
    g > 1 && /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (u) => {
            u.stopPropagation(), r((i - 1 + g) % g);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ t(ln, { size: 26 })
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (u) => {
            u.stopPropagation(), r((i + 1) % g);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ t(cn, { size: 26 })
        }
      ),
      /* @__PURE__ */ o("div", { className: "jt-lb-count", children: [
        i + 1,
        " / ",
        g
      ] })
    ] })
  ] });
}
function $i({ text: e }) {
  let a = e.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ t("p", { className: "jt-post-text", children: a.map(
    (n, i) => i % 2 ? /* @__PURE__ */ t("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, i) : n
  ) });
}
function zn({ url: e, onRemove: a }) {
  let n = /* @__PURE__ */ o(rt, { children: [
    /* @__PURE__ */ t("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ t(jo, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ t("strong", { children: Yo(e) }),
      /* @__PURE__ */ t("span", { children: e })
    ] })
  ] });
  return a ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ t(Jt, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: e, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ t(Rt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function Ri({ initial: e, onSave: a, onDelete: n }) {
  let [i, r] = y(e?.text || ""), [g, u] = y(e?.urls || []), [p, l] = y(""), [x, w] = y(() => (e?.photos || []).map((s) => ({ id: s }))), [N, d] = y(!1), [A, h] = y(""), z = J(null), C = () => {
    if (!p.trim()) return;
    let s = Ua(p);
    if (!s) {
      h("주소 형식이 맞지 않아요. 예: https://tabelog.com/...");
      return;
    }
    g.includes(s) || u([...g, s]), l(""), h("");
  }, v = async (s) => {
    let E = Array.from(s || []).filter((T) => T.type.startsWith("image/"));
    if (!E.length) return;
    let k = ae - x.length;
    if (k <= 0) {
      h(`사진은 글 하나에 ${ae}장까지 올릴 수 있어요.`);
      return;
    }
    d(!0), h("사진 준비 중");
    let S = [], m = 0;
    for (let T of E.slice(0, k))
      try {
        S.push({ id: xt(), data: await ti(T) });
      } catch {
        m++;
      }
    w((T) => [...T, ...S]), d(!1), m ? h(`${m}장은 열 수 없는 형식이라 빠졌어요. JPG나 PNG로 다시 골라 주세요.`) : E.length > k ? h(`${ae}장까지만 넣었어요.`) : h(""), z.current && (z.current.value = "");
  }, M = async () => {
    let s = g;
    if (p.trim()) {
      let k = Ua(p);
      if (!k) {
        h("주소 형식이 맞지 않아요. 고치거나 지운 뒤 올려 주세요.");
        return;
      }
      s.includes(k) || (s = [...s, k]);
    }
    d(!0), h(x.some((k) => k.data) ? "사진 올리는 중" : ""), await a({ text: i.trim(), urls: s, photos: x }) || (d(!1), h("올리지 못했어요. 사진 수를 줄이거나 잠시 후 다시 올려 주세요."));
  }, c = !N && (i.trim() || g.length || p.trim() || x.length);
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(
      "textarea",
      {
        rows: 4,
        value: i,
        onChange: (s) => r(s.target.value),
        placeholder: "오늘 있었던 일, 공유하고 싶은 정보를 남겨 주세요",
        "aria-label": "글 내용"
      }
    ),
    x.length > 0 && /* @__PURE__ */ t("div", { className: "jt-thumbs", children: x.map((s) => /* @__PURE__ */ o("div", { className: "jt-thumb", children: [
      /* @__PURE__ */ t(pa, { id: s.id, data: s.data }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-thumb-x",
          onClick: () => w(x.filter((E) => E.id !== s.id)),
          "aria-label": "사진 빼기",
          children: /* @__PURE__ */ t(Jt, { size: 14 })
        }
      )
    ] }, s.id)) }),
    /* @__PURE__ */ t(
      "input",
      {
        ref: z,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: (s) => v(s.target.files)
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "jt-secondary jt-photo-add",
        onClick: () => z.current && z.current.click(),
        disabled: N || x.length >= ae,
        children: [
          /* @__PURE__ */ t(xo, { size: 17 }),
          "사진 추가 (",
          x.length,
          "/",
          ae,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "링크 (선택)" }),
      g.map((s) => /* @__PURE__ */ t(zn, { url: s, onRemove: () => u(g.filter((E) => E !== s)) }, s)),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "url",
            inputMode: "url",
            value: p,
            onChange: (s) => l(s.target.value),
            onKeyDown: (s) => s.key === "Enter" && C(),
            placeholder: "https:// 주소 붙여넣기",
            "aria-label": "링크 주소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: C, children: "추가" })
      ] })
    ] }),
    A && /* @__PURE__ */ t("p", { className: "jt-hint jt-formmsg", role: "status", children: A }),
    /* @__PURE__ */ t("button", { className: "jt-primary", disabled: !c, onClick: M, children: N ? "잠시만요" : e ? "수정 저장" : "올리기" }),
    e && /* @__PURE__ */ t(Et, { onConfirm: n, label: "이 글 삭제" })
  ] });
}
function Ti({ post: e, me: a, members: n, onEdit: i, onLike: r, onComment: g, onDelComment: u, onOpenPhoto: p }) {
  let [l, x] = y(!1), w = e.photos || [], N = e.urls || [], d = e.comments || [], A = w.slice(0, 4);
  return /* @__PURE__ */ o("li", { className: "jt-post", children: [
    /* @__PURE__ */ o("div", { className: "jt-post-head", children: [
      /* @__PURE__ */ t(lt, { name: e.by, members: n, size: 34 }),
      /* @__PURE__ */ o("div", { className: "jt-post-who", children: [
        /* @__PURE__ */ t("strong", { children: e.by }),
        /* @__PURE__ */ o("span", { children: [
          ke(e.createdAt),
          e.editedAt ? ", 수정됨" : ""
        ] })
      ] }),
      e.by === a && /* @__PURE__ */ t("button", { className: "jt-icon sm", onClick: () => i(e), "aria-label": "내 글 고치기", children: /* @__PURE__ */ t(Xt, { size: 17 }) })
    ] }),
    e.text && /* @__PURE__ */ t($i, { text: e.text }),
    w.length > 0 && /* @__PURE__ */ t("div", { className: "jt-gallery n" + Math.min(w.length, 4), children: A.map((h, z) => /* @__PURE__ */ o("div", { className: "jt-gallery-cell", children: [
      /* @__PURE__ */ t(pa, { id: h, onClick: () => p(w, z) }),
      z === 3 && w.length > 4 && /* @__PURE__ */ o("span", { className: "jt-more", children: [
        "+",
        w.length - 4
      ] })
    ] }, h)) }),
    N.length > 0 && /* @__PURE__ */ t("div", { className: "jt-links", children: N.map((h) => /* @__PURE__ */ t(zn, { url: h }, h)) }),
    /* @__PURE__ */ o("div", { className: "jt-post-foot", children: [
      /* @__PURE__ */ t(Ee, { item: e, me: a, members: n, onReact: (h) => r(e.id, h) }),
      /* @__PURE__ */ t(la, { count: d.length, open: l, onClick: () => x(!l) })
    ] }),
    l && /* @__PURE__ */ t(
      Ae,
      {
        comments: d,
        me: a,
        members: n,
        onAdd: (h) => g(e.id, h),
        onDelete: (h) => u(e.id, h)
      }
    )
  ] });
}
function Bi({ settings: e, board: a, me: n, ...i }) {
  let [r, g] = y(null), u = [...a].sort((p, l) => l.createdAt - p.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    u.length === 0 ? /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 올라온 글이 없어요." }),
      /* @__PURE__ */ t("p", { children: "여행 사진, 맛집 링크, 전달할 말을 올려 보세요. 글과 사진은 가족 모두에게 보여요." })
    ] }) : /* @__PURE__ */ t("ul", { className: "jt-posts", children: u.map((p) => /* @__PURE__ */ t(
      Ti,
      {
        post: p,
        me: n,
        members: e.members,
        onOpenPhoto: (l, x) => g({ photos: l, index: x }),
        ...i
      },
      p.id
    )) }),
    r && /* @__PURE__ */ t(Pi, { photos: r.photos, index: r.index, onClose: () => g(null) })
  ] });
}
var Ge = "trip:loc:", Li = 3 * 6e4, _i = (e, a) => q[(Math.max(0, e.indexOf(a)) * 2 + 3) % q.length], Oi = (e) => !!e && e.online && typeof e.lat == "number" && Date.now() - e.at < Li, En = (e) => `https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`;
function Ui({ settings: e, me: a, locs: n, shareOn: i, onToggle: r, myPos: g, geoErr: u }) {
  let [p, l] = y(!1), [, x] = y(0);
  W(() => {
    let k = setInterval(() => x((S) => S + 1), 3e4);
    return () => clearInterval(k);
  }, []);
  let w = e.members, N = w.map((k) => ({ m: k, l: n[k], live: Oi(n[k]) })), d = N.filter((k) => k.live).map((k) => ({ id: k.m, lat: k.l.lat, lng: k.l.lng, color: _i(w, k.m), label: k.m, text: k.m[0] })), A = d.map((k) => `${k.id}:${k.lat.toFixed(5)}:${k.lng.toFixed(5)}`).join("|"), h = se(() => d, [A]), [z, C] = y(null), [v, M] = y(() => {
    let k = d[0] || g;
    return k ? { lat: k.lat, lng: k.lng, z: 14 } : { lat: ht.lat, lng: ht.lng, z: 12 };
  }), c = () => {
    if (!d.length) return;
    let k = d.reduce((T, D) => T + D.lat, 0) / d.length, S = d.reduce((T, D) => T + D.lng, 0) / d.length, m = Math.max(...d.map((T) => pe({ lat: k, lng: S }, T)));
    M({ lat: k, lng: S, z: m < 300 ? 16 : m < 1e3 ? 15 : m < 3e3 ? 13 : m < 1e4 ? 12 : 10 }), C(null);
  }, s = J(!1);
  W(() => {
    !s.current && d.length && (s.current = !0, c());
  }, [A]);
  let E = N.filter((k) => k.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ t("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ t("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => l(!0), children: [
          /* @__PURE__ */ t(wo, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: r, children: /* @__PURE__ */ t("i", {}) })
    ] }),
    i && u && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-share-err", children: u }),
    /* @__PURE__ */ t(
      wn,
      {
        gkey: e.gmapsKey,
        view: v,
        setView: M,
        pins: h,
        temp: null,
        selectedId: z,
        onTap: () => C(null),
        onPinTap: (k) => C(k),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ t("b", { children: E }),
        "/",
        w.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: c, disabled: !E, children: [
        /* @__PURE__ */ t(vo, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "jt-fam-list", children: N.map(({ m: k, l: S, live: m }) => {
      let T = k === a, D = m && g && !T ? pe(g, S) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (m ? " live" : "") + (z === k ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !m,
            onClick: () => {
              C(k), M({ lat: S.lat, lng: S.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ t(lt, { name: k, members: w, size: 34 }),
                m && /* @__PURE__ */ t("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  k,
                  T ? " (나)" : ""
                ] }),
                /* @__PURE__ */ t("span", { children: m ? `위치 공유 중, ${ke(S.at)}${D != null ? `, 나와 ${kn(D)}` : ""}` : S && S.at ? `앱 꺼짐, 마지막 접속 ${ke(S.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        m && !T && /* @__PURE__ */ o("a", { className: "jt-maplink", href: En(S), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Ct, { size: 13 }),
          "길 찾기"
        ] })
      ] }, k);
    }) }),
    p && /* @__PURE__ */ o(St, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => l(!1), children: [
      /* @__PURE__ */ o("ul", { className: "jt-helplist", children: [
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱을 보고 있을 때" }),
          /* @__PURE__ */ t("span", { children: "움직이면 바로, 가만히 있어도 1분마다 위치가 갱신돼요." })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱을 닫거나 화면이 꺼질 때" }),
          /* @__PURE__ */ t("span", { children: '그 즉시 내 위치 정보를 지우고 "마지막 접속 시간"만 남겨요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "앱이 갑자기 종료될 때" }),
          /* @__PURE__ */ t("span", { children: '위치를 못 지운 채로 꺼져도, 3분 동안 갱신이 없으면 자동으로 "앱 꺼짐"으로 바뀌어요.' })
        ] }),
        /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("b", { children: "공유 설정" }),
          /* @__PURE__ */ t("span", { children: "스위치를 끄면 바로 공유가 멈춰요. 이 설정은 기기마다 따로 저장돼서, 각자 켜야 해요." })
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: () => l(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ t("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var An = "trip:chat:", qe = "trip:read:", Ze = (e) => An + e.at.toString(36).padStart(10, "0") + "-" + e.id, Ki = (e) => {
  let a = new Date(e);
  return `${at(a.getHours())}:${at(a.getMinutes())}`;
}, Wi = (e) => {
  let a = new Date(e);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${zt(a)})`;
};
function on(e) {
  return e.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ t("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function Hi({ settings: e, me: a, msgs: n, reads: i, notice: r, onSend: g, onDelete: u, onEdit: p, onPin: l, onUnpin: x, onSendLoc: w, badgeAsk: N, onBadgeAsk: d }) {
  let A = e.members, [h, z] = y(""), [C, v] = y(null), [M, c] = y(!1), [s, E] = y(null), [k, S] = y(""), [m, T] = y(!1), [D, j] = y(null), L = r ? n.find((R) => R.id === r.id) : null, f = r ? { ...r, ...L ? { text: L.text, kind: L.kind, lat: L.lat, lng: L.lng } : {} } : null, U = (R) => {
    let tt = document.getElementById("msg-" + R);
    tt && (tt.scrollIntoView({ block: "center", behavior: "smooth" }), j(R), setTimeout(() => j(null), 1600));
  }, Y = (R) => {
    E(R.id), S(R.text), v(null);
  }, $ = (R) => {
    let tt = k.trim();
    tt && (tt !== R.text && p(R, tt), E(null));
  }, I = J(null), X = J(!0), Bt = n.length;
  W(() => {
    let R = n[Bt - 1], tt = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (X.current || tt || R && R.by === a) && I.current && I.current.scrollIntoView({ block: "end", behavior: X.current ? "auto" : "smooth" }), X.current = !1;
  }, [Bt]);
  let pt = () => {
    let R = h.trim();
    R && (g(R), z(""));
  }, de = async () => {
    c(!0), await w(), c(!1);
  }, me = "", Lt = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    Bt === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ t("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    f && /* @__PURE__ */ o("div", { className: "jt-notice" + (m ? " open" : ""), children: [
      /* @__PURE__ */ o("button", { type: "button", className: "jt-notice-head", onClick: () => T(!m), "aria-expanded": m, children: [
        /* @__PURE__ */ t(dn, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-text", children: f.kind === "loc" ? `${f.by}의 위치` : f.text }),
        /* @__PURE__ */ t(kt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      m && /* @__PURE__ */ o("div", { className: "jt-notice-body", children: [
        f.kind === "loc" ? /* @__PURE__ */ o("p", { children: [
          f.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ t("a", { href: $t({ lat: f.lat, lng: f.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ t("p", { className: "jt-msg-text", children: on(f.text) }),
        /* @__PURE__ */ o("span", { className: "jt-notice-meta", children: [
          f.by,
          "의 메시지, ",
          f.pinnedBy,
          "이(가) 공지로 등록",
          L ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-notice-act", children: [
          L && /* @__PURE__ */ t("button", { type: "button", className: "jt-like", onClick: () => U(f.id), children: "메시지로 이동" }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                x(), T(!1);
              },
              children: [
                /* @__PURE__ */ t(La, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    N && /* @__PURE__ */ o("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ t("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: d, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: n.map((R) => {
      let tt = Wi(R.at), Gt = tt !== me, dt = R.by === a, qt = !Gt && Lt && Lt.by === R.by && R.at - Lt.at < 5 * 6e4;
      return me = tt, Lt = R, /* @__PURE__ */ o(lo.Fragment, { children: [
        Gt && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": tt, children: /* @__PURE__ */ t("span", { children: tt }) }),
        /* @__PURE__ */ o(
          "li",
          {
            id: "msg-" + R.id,
            className: "jt-msg" + (dt ? " mine" : "") + (qt ? " cont" : "") + (D === R.id ? " flash" : ""),
            children: [
              !dt && /* @__PURE__ */ t("span", { className: "jt-msg-av", children: !qt && /* @__PURE__ */ t(lt, { name: R.by, members: A, size: 30 }) }),
              /* @__PURE__ */ o("div", { className: "jt-msg-col", children: [
                !dt && !qt && /* @__PURE__ */ t("span", { className: "jt-msg-name", children: R.by }),
                /* @__PURE__ */ o("div", { className: "jt-msg-row", children: [
                  s === R.id ? /* @__PURE__ */ o("div", { className: "jt-msg-editbox", children: [
                    /* @__PURE__ */ t(
                      "textarea",
                      {
                        rows: 2,
                        value: k,
                        onChange: (Q) => S(Q.target.value),
                        onKeyDown: (Q) => {
                          Q.key === "Enter" && !Q.shiftKey && !Q.nativeEvent.isComposing && (Q.preventDefault(), $(R)), Q.key === "Escape" && E(null);
                        },
                        "aria-label": "메시지 수정",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ o("div", { className: "jt-msg-editact", children: [
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => E(null), children: "취소" }),
                      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => $(R), disabled: !k.trim(), children: "저장" })
                    ] })
                  ] }) : /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "jt-bubble" + (R.kind === "loc" ? " loc" : "") + (r && r.id === R.id ? " pinned" : ""),
                      onClick: () => v(C === R.id ? null : R.id),
                      "aria-label": dt ? "내 메시지, 누르면 메뉴" : "누르면 공지 메뉴",
                      "aria-expanded": C === R.id,
                      children: R.kind === "loc" ? /* @__PURE__ */ o("span", { className: "jt-locmsg", children: [
                        /* @__PURE__ */ t(It, { size: 16 }),
                        dt ? "내 위치를 보냈어요" : `${R.by}의 현재 위치`
                      ] }) : /* @__PURE__ */ t("span", { className: "jt-msg-text", children: on(R.text) })
                    }
                  ),
                  /* @__PURE__ */ o("span", { className: "jt-msg-meta", children: [
                    (() => {
                      let Q = A.filter((ue) => ue !== R.by && (i[ue] || 0) < R.at);
