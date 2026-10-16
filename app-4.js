})(), () => {
      m = !1;
    };
  }, [p, i, g, e.gmapsKey]);
  let S = (m) => c[m.id] || a.some((T) => m.placeId && T.placeId === m.placeId || T.name === m.name && ut(T) && Math.abs(T.lat - m.lat) < 5e-4);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-near-head", children: [
      /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ t(Ko, { size: 15 }),
        p ? p.here ? "내 위치 기준" : "오사카 시내 기준" : "위치 확인 중",
        ", 반경 ",
        Ve(g)
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: k, children: "위치 다시 찾기" })
    ] }),
    x && /* @__PURE__ */ t("p", { className: "jt-hint jt-near-msg", children: x }),
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: tn.map((m) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (i.id === m.id ? " on" : ""), onClick: () => r(m), children: m.label }, m.id)) }),
    /* @__PURE__ */ t("div", { className: "jt-seg three jt-radius", role: "tablist", "aria-label": "찾는 범위", children: zi.map((m) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": g === m, className: g === m ? "on" : "", onClick: () => u(m), children: Ve(m) }, m)) }),
    A && /* @__PURE__ */ o("p", { className: "jt-hint jt-near-msg", children: [
      "주변 ",
      i.label,
      " 찾는 중"
    ] }),
    !A && z && /* @__PURE__ */ t("div", { className: "jt-empty", children: /* @__PURE__ */ t("p", { children: z }) }),
    !A && N.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-near-list", children: N.map((m) => {
      let T = S(m);
      return /* @__PURE__ */ o("li", { className: "jt-near", children: [
        /* @__PURE__ */ o("div", { className: "jt-near-main", children: [
          /* @__PURE__ */ t("strong", { children: m.name }),
          m.sub && /* @__PURE__ */ t("span", { className: "jt-near-sub", children: m.sub }),
          /* @__PURE__ */ o("div", { className: "jt-near-meta", children: [
            m.rating != null && /* @__PURE__ */ o("span", { className: "jt-star", children: [
              /* @__PURE__ */ t(Wo, { size: 13, fill: "currentColor" }),
              m.rating.toFixed(1),
              m.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                m.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ t("span", { children: m.type }),
            m.open === !0 && /* @__PURE__ */ t("span", { className: "jt-open", children: "영업 중" }),
            m.open === !1 && /* @__PURE__ */ t("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ t(Ct, { size: 12 }),
            kn(m.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          T ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ t(rn, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: m.name,
                  cat: i.wish,
                  area: m.addr || m.sub || "",
                  link: m.url || "",
                  memo: m.rating != null ? `구글 평점 ${m.rating.toFixed(1)}${m.count ? ` (${m.count}명)` : ""}` : "",
                  lat: m.lat,
                  lng: m.lng,
                  ...m.placeId ? { placeId: m.placeId } : {}
                }), s({ ...c, [m.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: m.url || $t({ lat: m.lat, lng: m.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Rt, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: ze(m), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Ct, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, m.id);
    }) }),
    v && N.length > 0 && /* @__PURE__ */ t("p", { className: "jt-near-src", children: v === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Si({ settings: e, wish: a, plan: n, me: i, onSave: r, onEdit: g, onLike: u, onPlan: p, onDelete: l, onComment: x, onDelComment: w, onReact: N }) {
  let d = a.filter(ut), [A, h] = y(
    () => d.length ? {
      lat: d.reduce((I, X) => I + X.lat, 0) / d.length,
      lng: d.reduce((I, X) => I + X.lng, 0) / d.length,
      z: d.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [z, C] = y(null), [v, M] = y(null), [c, s] = y(""), [E, k] = y([]), [S, m] = y(!1), [T, D] = y(""), j = a.find((I) => I.id === v), L = d.map((I) => `${I.id}:${I.lat}:${I.lng}:${I.cat}`).join("|"), f = se(
    () => d.map((I) => ({
      id: I.id,
      lat: I.lat,
      lng: I.lng,
      color: Wt[I.cat] || Wt.기타,
      label: I.name
    })),
    [L]
  ), U = async () => {
    let I = c.trim();
    if (I) {
      m(!0), D(""), k([]);
      try {
        let X = await Nn(I, e.gmapsKey, { lat: A.lat, lng: A.lng });
        X.length || D("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), k(X);
      } catch {
        D("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      m(!1);
    }
  }, Y = (I) => {
    h({ lat: I.lat, lng: I.lng, z: 16 }), M(null), C({ lat: I.lat, lng: I.lng, name: I.name, cat: "맛집", area: I.area, link: I.link || "", placeId: I.placeId }), k([]);
  }, $ = j && j.likes.includes(i);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: c,
          onChange: (I) => s(I.target.value),
          onKeyDown: (I) => I.key === "Enter" && U(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: U, disabled: S, children: S ? "검색 중" : "검색" })
    ] }),
    T && /* @__PURE__ */ t("p", { className: "jt-hint jt-mapmsg", children: T }),
    E.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results", children: E.map((I, X) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => Y(I), children: [
      /* @__PURE__ */ t("strong", { children: I.name }),
      /* @__PURE__ */ t("span", { children: I.area })
    ] }) }, X)) }),
    /* @__PURE__ */ t(
      wn,
      {
        gkey: e.gmapsKey,
        onPoi: (I) => {
          M(null), C({ ...I, cat: "맛집" });
        },
        view: A,
        setView: h,
        pins: f,
        temp: z,
        selectedId: v,
        onTap: (I, X) => {
          M(null), C({ lat: Number(I.toFixed(6)), lng: Number(X.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (I) => {
          C(null), M(I);
        }
      }
    ),
    !z && !j && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      d.length,
      "개예요."
    ] }),
    z && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ t("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ t(
        "input",
        {
          value: z.name,
          onChange: (I) => C({ ...z, name: I.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: ia.map((I) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-chip" + (z.cat === I ? " on" : ""),
          onClick: () => C({ ...z, cat: I }),
          children: I
        },
        I
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !z.name.trim(),
            onClick: () => {
              r({
                name: z.name.trim(),
                cat: z.cat,
                area: z.area || "",
                link: z.link || "",
                memo: "",
                lat: z.lat,
                lng: z.lng,
                ...z.placeId ? { placeId: z.placeId } : {}
              }), C(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: () => C(null), children: "취소" })
      ] })
    ] }),
    j && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Wt[j.cat] || Wt.기타 }, children: j.cat }),
        /* @__PURE__ */ t("strong", { children: j.name }),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => g(j), "aria-label": `${j.name} 수정`, children: /* @__PURE__ */ t(Xt, { size: 16 }) })
      ] }),
      j.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ t(It, { size: 13 }),
        j.area
      ] }),
      j.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: j.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          sa,
          {
            className: "jt-like" + ($ ? " on" : ""),
            onTap: () => u(j.id),
            names: j.likes,
            members: e.members,
            title: "가고 싶어요",
            "aria-pressed": $,
            "aria-label": `가고 싶어요 ${j.likes.length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t(na, { size: 16, fill: $ ? "currentColor" : "none" }),
              "가고 싶어요 ",
              j.likes.length
            ]
          }
        ),
        /* @__PURE__ */ t(Ee, { item: j, me: i, members: e.members, onReact: (I) => N(j.id, I) }),
        le(j, n) != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: q[le(j, n) % q.length] }, children: [
          le(j, n) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => p(j), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ t(lt, { name: j.by, members: e.members, size: 16 }),
          j.by
        ] }),
        /* @__PURE__ */ t(
          Et,
          {
            onConfirm: () => {
              l(j.id), M(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t(j), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Rt, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ o("a", { className: "jt-maplink route", href: ze(j), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Ct, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ t(
        Ae,
        {
          comments: j.comments || [],
          me: i,
          members: e.members,
          onAdd: (I) => x(j.id, I),
          onDelete: (I) => w(j.id, I)
        }
      )
    ] })
  ] });
}
function Fi(e) {
  let [a, n] = y("list"), i = e.view || a, r = e.setView || n;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([g, u]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": i === g, className: i === g ? "on" : "", onClick: () => r(g), children: u }, g)) }),
    i === "list" && /* @__PURE__ */ t(Di, { ...e }),
    i === "map" && /* @__PURE__ */ t(Si, { ...e }),
    i === "near" && /* @__PURE__ */ t(Mi, { ...e })
  ] });
}
function Di({ settings: e, wish: a, plan: n, me: i, onEdit: r, onLike: g, onPlan: u, onDelete: p, onComment: l, onDelComment: x, onReact: w }) {
  let [N, d] = y(null), [A, h, z] = hn(), C = oi(), [v, M] = y("전체"), [c, s] = y("all"), [E, k] = y("all"), S = (f) => le(f, n) != null, m = a.filter((f) => (v === "전체" || f.cat === v) && (E === "all" || f.by === E)), T = { all: m.length, in: m.filter(S).length, out: m.filter((f) => !S(f)).length }, [D, j] = y(null), L = m.filter((f) => c === "all" || (c === "in" ? S(f) : !S(f))).sort((f, U) => U.likes.length - f.likes.length || U.createdAt - f.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: ["전체", ...ia].map((f) => /* @__PURE__ */ t("button", { className: "jt-chip" + (v === f ? " on" : ""), onClick: () => M(f), children: f }, f)) }),
    /* @__PURE__ */ o("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ o("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ o("select", { value: c, onChange: (f) => s(f.target.value), children: [
          /* @__PURE__ */ o("option", { value: "all", children: [
            "전체 (",
            T.all,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "in", children: [
            "일정 반영 (",
            T.in,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "out", children: [
            "미반영 (",
            T.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ t(kt, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ o("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "작성자" }),
        /* @__PURE__ */ o("select", { value: E, onChange: (f) => k(f.target.value), children: [
          /* @__PURE__ */ t("option", { value: "all", children: "작성자 전체" }),
          e.members.map((f) => /* @__PURE__ */ o("option", { value: f, children: [
            f,
            " (",
            a.filter((U) => U.by === f).length,
            ")"
          ] }, f))
        ] }),
        /* @__PURE__ */ t(kt, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ t(xn, { ids: L.map((f) => f.id), open: A, setAll: z })
    ] }),
    L.length === 0 && /* @__PURE__ */ t("div", { className: "jt-empty", children: a.length === 0 ? /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ t("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ t("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ t("p", { children: E !== "all" ? `${E}이(가) 올린 곳 중 조건에 맞는 곳이 없어요.` : c === "in" ? "일정에 반영된 곳이 없어요." : c === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    /* @__PURE__ */ t("ul", { className: "jt-list", children: L.map((f) => {
      let U = f.likes.includes(i), Y = le(f, n);
      return /* @__PURE__ */ o("li", { className: "jt-wish" + (A[f.id] ? " open" : ""), children: [
        /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => h(f.id), "aria-expanded": !!A[f.id], children: [
          /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Wt[f.cat] || Wt.기타 }, children: f.cat }),
          /* @__PURE__ */ t("strong", { className: "jt-fold-name", children: f.name }),
          C && ut(f) && (() => {
            let $ = pe(C, f);
            return /* @__PURE__ */ t("span", { className: "jt-dist " + ii($), "aria-label": `지금 위치에서 ${Va($)}`, children: Va($) });
          })(),
          Y != null && /* @__PURE__ */ o("span", { className: "jt-daybadge", style: { background: q[Y % q.length] }, children: [
            Y + 1,
            "일차"
          ] }),
          /* @__PURE__ */ t(kt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        A[f.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ t("div", { className: "jt-fold-tools", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => r(f), children: [
            /* @__PURE__ */ t(Xt, { size: 14 }),
            "수정"
          ] }) }),
          f.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
            /* @__PURE__ */ t(It, { size: 13 }),
            f.area
          ] }),
          f.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: f.memo }),
          /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t(f), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Rt, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ o("a", { className: "jt-maplink route", href: ze(f), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Ct, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => j(D === f.id ? null : f.id),
                "aria-expanded": D === f.id,
                children: [
                  /* @__PURE__ */ t(bo, { size: 14 }),
                  D === f.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          D === f.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
            /* @__PURE__ */ t(
              "iframe",
              {
                title: `${f.name} 지도`,
                src: qo(f),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ t("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ o(
              sa,
              {
                className: "jt-like" + (U ? " on" : ""),
                onTap: () => g(f.id),
                names: f.likes,
                members: e.members,
                title: "가고 싶어요",
                "aria-pressed": U,
                "aria-label": `가고 싶어요 ${f.likes.length}명, 길게 누르면 누른 사람 보기`,
                children: [
                  /* @__PURE__ */ t(na, { size: 16, fill: U ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  f.likes.length
                ]
              }
            ),
            /* @__PURE__ */ t(Ee, { item: f, me: i, members: e.members, onReact: ($) => w(f.id, $) }),
            Y != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: q[Y % q.length] }, children: [
              Y + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ t("button", { className: "jt-secondary sm", onClick: () => u(f), children: "일정에 넣기" }),
            /* @__PURE__ */ t(
              la,
              {
                count: (f.comments || []).length,
                open: N === f.id,
                onClick: () => d(N === f.id ? null : f.id)
              }
            ),
            /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ t(lt, { name: f.by, members: e.members, size: 16 }),
              f.by
            ] }),
            /* @__PURE__ */ t(Et, { onConfirm: () => p(f.id), label: "" })
          ] }),
          N === f.id && /* @__PURE__ */ t(
            Ae,
            {
              comments: f.comments || [],
              me: i,
              members: e.members,
              onAdd: ($) => l(f.id, $),
              onDelete: ($) => x(f.id, $)
            }
          )
        ] })
      ] }, f.id);
    }) })
  ] });
}
function en({ moves: e, rate: a, me: n }) {
  return e.length ? /* @__PURE__ */ t("ul", { className: "jt-moves2", children: e.map((i, r) => /* @__PURE__ */ o("li", { className: i.from === n || i.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ t("b", { children: i.from }),
      /* @__PURE__ */ t(cn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ t("b", { children: i.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ t("strong", { children: Ft(i.v) }),
      /* @__PURE__ */ t("em", { children: Ht(i.v, a) })
    ] })
  ] }, r)) }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Cn({ e, members: a, rate: n, onEdit: i }) {
  let { Icon: r, color: g } = Qe(e.cat);
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => i(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ t("span", { className: "jt-spend-icon", style: { "--cc": g }, children: /* @__PURE__ */ t(r, { size: 18 }) }),
    /* @__PURE__ */ o("div", { className: "jt-spend-main", children: [
      /* @__PURE__ */ t("div", { className: "jt-spend-name", children: e.title }),
      /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        e.payer,
        "이(가) 냄, ",
        (e.split || []).length === a.length ? "모두" : (e.split || []).join(", "),
        " 나눔",
        e.editedAt ? ", 수정됨" : ""
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-spend-amt", children: [
      /* @__PURE__ */ t("strong", { children: Ft(Number(e.amount) || 0) }),
      /* @__PURE__ */ o("span", { children: [
        "(",
        Ht(Number(e.amount) || 0, n),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ t("span", { className: "jt-spend-edit", "aria-hidden": "true", children: /* @__PURE__ */ t(Xt, { size: 14 }) })
  ] }) });
}
var an = (e) => e > 0.5 ? `받을 돈 ${nt(e)}` : e < -0.5 ? `보낼 돈 ${nt(-e)}` : "주고받을 돈 없음", we = (e) => e > 0.5 ? "plus" : e < -0.5 ? "minus" : "";
function nn({ days: e, start: a, members: n, rate: i, onEdit: r, filter: g, empty: u }) {
  let p = e.map((l) => ({ ...l, items: g ? l.items.filter(g) : l.items })).filter((l) => l.items.length);
  return p.length ? /* @__PURE__ */ o(rt, { children: [
    /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "항목을 누르면 고치거나 지울 수 있어요." }),
    p.map((l) => {
      let x = mt(a, l.day);
      return /* @__PURE__ */ o("div", { className: "jt-group", children: [
        /* @__PURE__ */ o("h4", { style: { "--lc": q[l.day % q.length] }, children: [
          /* @__PURE__ */ o("span", { className: "jt-daychip", children: [
            l.day + 1,
            "일차"
          ] }),
          Pt(x),
          " (",
          zt(x),
          ")"
        ] }),
        /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: l.items.map((w) => /* @__PURE__ */ t(Cn, { e: w, members: n, rate: i, onEdit: r }, w.id)) })
      ] }, l.day);
    })
  ] }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: u });
}
function Ii({ settings: e, spend: a, me: n, onEdit: i, view: r, setView: g }) {
  let { members: u, rate: p, start: l } = e, [x, w] = y("me"), N = r || x, d = g || w, A = a.reduce((c, s) => c + (Number(s.amount) || 0), 0), h = se(() => Ja(a, u), [a, u]), z = se(() => {
    let c = {};
    return a.forEach((s) => c[s.cat] = (c[s.cat] || 0) + (Number(s.amount) || 0)), mn.filter((s) => c[s]).map((s) => ({ c: s, v: c[s] }));
  }, [a]), C = se(() => {
    let c = {};
    return a.forEach((s) => (c[s.day] = c[s.day] || []).push(s)), Object.keys(c).map(Number).sort((s, E) => s - E).map((s) => ({
      day: s,
      sum: c[s].reduce((E, k) => E + (Number(k.amount) || 0), 0),
      items: [...c[s]].sort((E, k) => k.createdAt - E.createdAt),
      res: Ja(c[s], u)
    }));
  }, [a, u]), v = h.net[n] || 0, M = h.moves.filter((c) => c.from === n || c.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: Ft(0) }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: Ce(e) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ t("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: Ft(A) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        Ht(A, p),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        nt(h.share[n] || 0)
      ] }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: Ce(e) }),
      /* @__PURE__ */ t("div", { className: "jt-catbar", "aria-hidden": "true", children: z.map(({ c, v: s }) => /* @__PURE__ */ t("i", { style: { flexGrow: s, background: Qe(c).color } }, c)) }),
      /* @__PURE__ */ t("ul", { className: "jt-catlegend", children: z.map(({ c, v: s }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("span", { className: "jt-dot", style: { background: Qe(c).color } }),
        c,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(s / A * 100),
          "%"
        ] })
      ] }, c)) })
    ] }),
    h.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        h.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ t("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ t("ul", { children: h.skipped.map((c) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => i(c), children: [
        /* @__PURE__ */ o("span", { children: [
          c.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            c.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ t("b", { children: Ft(Number(c.amount) || 0) })
      ] }) }, c.id)) })
    ] }),
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([c, s]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": N === c, className: N === c ? "on" : "", onClick: () => d(c), children: s }, c)) }),
    N === "me" && /* @__PURE__ */ o(rt, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (we(v) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ t(lt, { name: n, members: u, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ t("strong", { children: v > 0.5 ? `${nt(v)} 받으면 돼요` : v < -0.5 ? `${nt(-v)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        M.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-moves", children: M.map((c, s) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("span", { children: c.from === n ? /* @__PURE__ */ o(rt, { children: [
            /* @__PURE__ */ t("b", { children: c.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(rt, { children: [
            /* @__PURE__ */ t("b", { children: c.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ t("strong", { children: Ft(c.v) }),
            /* @__PURE__ */ t("em", { children: Ht(c.v, p) })
