p.count ? /* @__PURE__ */ o("em", { children: [
                "(",
                p.count.toLocaleString("ko-KR"),
                ")"
              ] }) : null
            ] }),
            /* @__PURE__ */ t("span", { children: p.type }),
            p.open === !0 && /* @__PURE__ */ t("span", { className: "jt-open", children: "영업 중" }),
            p.open === !1 && /* @__PURE__ */ t("span", { className: "jt-closed", children: "영업 종료" })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-near-dist", children: [
            /* @__PURE__ */ t(Et, { size: 12 }),
            Ga(p.dist)
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-near-act", children: [
          P ? /* @__PURE__ */ o("span", { className: "jt-near-saved", children: [
            /* @__PURE__ */ t(Ra, { size: 14 }),
            "저장됨"
          ] }) : /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-secondary sm",
              onClick: () => {
                n({
                  name: p.name,
                  cat: i.wish,
                  area: p.addr || p.sub || "",
                  link: p.url || "",
                  memo: p.rating != null ? `구글 평점 ${p.rating.toFixed(1)}${p.count ? ` (${p.count}명)` : ""}` : "",
                  lat: p.lat,
                  lng: p.lng,
                  ...p.placeId ? { placeId: p.placeId } : {}
                }), h({ ...k, [p.id]: !0 });
              },
              children: "가고 싶은 곳에 저장"
            }
          ),
          /* @__PURE__ */ o("a", { className: "jt-maplink", href: p.url || Mt({ lat: p.lat, lng: p.lng }), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Ut, { size: 13 }),
            "구글맵"
          ] }),
          /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Le(p), target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ t(Et, { size: 13 }),
            "길 찾기"
          ] })
        ] })
      ] }, p.id);
    }) }),
    E && M.length > 0 && /* @__PURE__ */ t("p", { className: "jt-near-src", children: E === "google" ? "장소 정보: Google 지도" : "장소 정보: © OpenStreetMap 기여자" })
  ] });
}
function Oo({ settings: e, wish: a, plan: n, me: i, onSave: s, onEdit: y, onLike: v, onPlan: f, onDelete: m, onComment: w, onDelComment: l, onReact: M }) {
  let x = a.filter(jt), [b, I] = N(
    () => x.length ? {
      lat: x.reduce((z, W) => z + W.lat, 0) / x.length,
      lng: x.reduce((z, W) => z + W.lng, 0) / x.length,
      z: x.length > 1 ? 11 : 15
    } : { lat: 35.6762, lng: 139.6503, z: 11 }
  ), [r, d] = N(null), [E, C] = N(null), [k, h] = N(""), [S, j] = N([]), [R, p] = N(!1), [P, u] = N(""), g = a.find((z) => z.id === E), T = x.map((z) => `${z.id}:${z.lat}:${z.lng}:${z.cat}`).join("|"), F = te(
    () => x.map((z) => ({
      id: z.id,
      lat: z.lat,
      lng: z.lng,
      color: Tt[z.cat] || Tt.기타,
      label: z.name
    })),
    [T]
  ), X = async () => {
    let z = k.trim();
    if (z) {
      p(!0), u(""), j([]);
      try {
        let W = await Va(z, e.gmapsKey, { lat: b.lat, lng: b.lng });
        W.length || u("검색 결과가 없어요. 일본어나 영어로 다시 검색하거나 지도를 직접 눌러 보세요."), j(W);
      } catch {
        u("검색을 불러오지 못했어요. 지도를 직접 눌러 핀을 꽂아 주세요.");
      }
      p(!1);
    }
  }, H = (z) => {
    I({ lat: z.lat, lng: z.lng, z: 16 }), C(null), d({ lat: z.lat, lng: z.lng, name: z.name, cat: "맛집", area: z.area, link: z.link || "", placeId: z.placeId }), j([]);
  }, _ = g && g.likes.includes(i);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-inline jt-mapsearch", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: k,
          onChange: (z) => h(z.target.value),
          onKeyDown: (z) => z.key === "Enter" && X(),
          placeholder: "장소 검색 (예: 센소지, 이치란 시부야)",
          "aria-label": "장소 검색"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: X, disabled: R, children: R ? "검색 중" : "검색" })
    ] }),
    P && /* @__PURE__ */ t("p", { className: "jt-hint jt-mapmsg", children: P }),
    S.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results", children: S.map((z, W) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => H(z), children: [
      /* @__PURE__ */ t("strong", { children: z.name }),
      /* @__PURE__ */ t("span", { children: z.area })
    ] }) }, W)) }),
    /* @__PURE__ */ t(
      qa,
      {
        gkey: e.gmapsKey,
        onPoi: (z) => {
          C(null), d({ ...z, cat: "맛집" });
        },
        view: b,
        setView: I,
        pins: F,
        temp: r,
        selectedId: E,
        onTap: (z, W) => {
          C(null), d({ lat: Number(z.toFixed(6)), lng: Number(W.toFixed(6)), name: "", cat: "맛집", area: "" });
        },
        onPinTap: (z) => {
          d(null), C(z);
        }
      }
    ),
    !r && !g && /* @__PURE__ */ o("p", { className: "jt-hint jt-mapmsg", children: [
      "지도를 눌러 핀을 꽂으면 가고 싶은 곳으로 저장돼요. 지금까지 지도에 저장한 곳은 ",
      x.length,
      "개예요."
    ] }),
    r && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ t("strong", { children: "이 위치를 저장할까요?" }),
      /* @__PURE__ */ t(
        "input",
        {
          value: r.name,
          onChange: (z) => d({ ...r, name: z.target.value }),
          placeholder: "장소 이름 (예: 이치란 시부야점)",
          "aria-label": "장소 이름"
        }
      ),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Be.map((z) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-chip" + (r.cat === z ? " on" : ""),
          onClick: () => d({ ...r, cat: z }),
          children: z
        },
        z
      )) }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-primary",
            disabled: !r.name.trim(),
            onClick: () => {
              s({
                name: r.name.trim(),
                cat: r.cat,
                area: r.area || "",
                link: r.link || "",
                memo: "",
                lat: r.lat,
                lng: r.lng,
                ...r.placeId ? { placeId: r.placeId } : {}
              }), d(null);
            },
            children: "가고 싶은 곳에 저장"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: () => d(null), children: "취소" })
      ] })
    ] }),
    g && /* @__PURE__ */ o("div", { className: "jt-mappanel", children: [
      /* @__PURE__ */ o("div", { className: "jt-wish-top", children: [
        /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Tt[g.cat] || Tt.기타 }, children: g.cat }),
        /* @__PURE__ */ t("strong", { children: g.name }),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-icon sm jt-wish-edit", onClick: () => y(g), "aria-label": `${g.name} 수정`, children: /* @__PURE__ */ t(ge, { size: 16 }) })
      ] }),
      g.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
        /* @__PURE__ */ t(zt, { size: 13 }),
        g.area
      ] }),
      g.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: g.memo }),
      /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-like" + (_ ? " on" : ""),
            onClick: () => v(g.id),
            "aria-pressed": _,
            "aria-label": "가고 싶어요",
            children: [
              /* @__PURE__ */ t(Te, { size: 16, fill: _ ? "currentColor" : "none" }),
              "가고 싶어요 ",
              g.likes.length
            ]
          }
        ),
        /* @__PURE__ */ t(Ue, { item: g, me: i, onReact: (z) => M(g.id, z) }),
        ee(g, n) != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: V[ee(g, n) % V.length] }, children: [
          ee(g, n) + 1,
          "일차 일정에 있어요"
        ] }) : /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: () => f(g), children: "일정에 넣기" }),
        /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
          /* @__PURE__ */ t(lt, { name: g.by, members: e.members, size: 16 }),
          g.by
        ] }),
        /* @__PURE__ */ t(
          St,
          {
            onConfirm: () => {
              m(g.id), C(null);
            },
            label: ""
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
        /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mt(g), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Ut, { size: 14 }),
          "구글맵에서 열기"
        ] }),
        /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Le(g), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Et, { size: 14 }),
          "여기서 길 찾기"
        ] })
      ] }),
      /* @__PURE__ */ t(
        Ke,
        {
          comments: g.comments || [],
          me: i,
          members: e.members,
          onAdd: (z) => w(g.id, z),
          onDelete: (z) => l(g.id, z)
        }
      )
    ] })
  ] });
}
function Uo(e) {
  let [a, n] = N("list");
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", children: [
      ["list", "목록"],
      ["map", "지도"],
      ["near", "내 주변"]
    ].map(([i, s]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": a === i, className: a === i ? "on" : "", onClick: () => n(i), children: s }, i)) }),
    a === "list" && /* @__PURE__ */ t(Ko, { ...e }),
    a === "map" && /* @__PURE__ */ t(Oo, { ...e }),
    a === "near" && /* @__PURE__ */ t(Lo, { ...e })
  ] });
}
function Ko({ settings: e, wish: a, plan: n, me: i, onEdit: s, onLike: y, onPlan: v, onDelete: f, onComment: m, onDelComment: w, onReact: l }) {
  let [M, x] = N(null), [b, I, r] = Ka(), [d, E] = N("전체"), [C, k] = N("all"), h = (u) => ee(u, n) != null, S = a.filter((u) => d === "전체" || u.cat === d), j = { all: S.length, in: S.filter(h).length, out: S.filter((u) => !h(u)).length }, [R, p] = N(null), P = S.filter((u) => C === "all" || (C === "in" ? h(u) : !h(u))).sort((u, g) => g.likes.length - u.likes.length || g.createdAt - u.createdAt);
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ t("div", { className: "jt-chips jt-filter", children: ["전체", ...Be].map((u) => /* @__PURE__ */ t("button", { className: "jt-chip" + (d === u ? " on" : ""), onClick: () => E(u), children: u }, u)) }),
    /* @__PURE__ */ o("div", { className: "jt-listbar", children: [
      /* @__PURE__ */ o("label", { className: "jt-pfsel", children: [
        /* @__PURE__ */ t("span", { className: "jt-sr", children: "일정 반영 여부" }),
        /* @__PURE__ */ o("select", { value: C, onChange: (u) => k(u.target.value), children: [
          /* @__PURE__ */ o("option", { value: "all", children: [
            "전체 (",
            j.all,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "in", children: [
            "일정 반영 (",
            j.in,
            ")"
          ] }),
          /* @__PURE__ */ o("option", { value: "out", children: [
            "미반영 (",
            j.out,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ t(Bt, { size: 16, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ t(Wa, { ids: P.map((u) => u.id), open: b, setAll: r })
    ] }),
    P.length === 0 && /* @__PURE__ */ t("div", { className: "jt-empty", children: a.length === 0 ? /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ t("p", { children: "아직 가고 싶은 곳이 없어요." }),
      /* @__PURE__ */ t("p", { children: "먹고 싶은 것, 보고 싶은 곳을 하나씩 올려 보세요." })
    ] }) : /* @__PURE__ */ t("p", { children: C === "in" ? "일정에 반영된 곳이 없어요." : C === "out" ? "미반영된 곳이 없어요. 모두 일정에 넣었어요." : "이 종류에는 아직 장소가 없어요." }) }),
    /* @__PURE__ */ t("ul", { className: "jt-list", children: P.map((u) => {
      let g = u.likes.includes(i), T = ee(u, n);
      return /* @__PURE__ */ o("li", { className: "jt-wish" + (b[u.id] ? " open" : ""), children: [
        /* @__PURE__ */ o("button", { type: "button", className: "jt-fold-head", onClick: () => I(u.id), "aria-expanded": !!b[u.id], children: [
          /* @__PURE__ */ t("span", { className: "jt-tag", style: { background: Tt[u.cat] || Tt.기타 }, children: u.cat }),
          /* @__PURE__ */ t("strong", { className: "jt-fold-name", children: u.name }),
          T != null && /* @__PURE__ */ o("span", { className: "jt-daybadge", style: { background: V[T % V.length] }, children: [
            T + 1,
            "일차"
          ] }),
          /* @__PURE__ */ t(Bt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
        ] }),
        b[u.id] && /* @__PURE__ */ o("div", { className: "jt-fold-body", children: [
          /* @__PURE__ */ t("div", { className: "jt-fold-tools", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-like jt-editbtn", onClick: () => s(u), children: [
            /* @__PURE__ */ t(ge, { size: 14 }),
            "수정"
          ] }) }),
          u.area && /* @__PURE__ */ o("div", { className: "jt-meta", children: [
            /* @__PURE__ */ t(zt, { size: 13 }),
            u.area
          ] }),
          u.memo && /* @__PURE__ */ t("div", { className: "jt-memo", children: u.memo }),
          /* @__PURE__ */ o("div", { className: "jt-maprow", children: [
            /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mt(u), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Ut, { size: 14 }),
              "구글맵에서 열기"
            ] }),
            /* @__PURE__ */ o("a", { className: "jt-maplink route", href: Le(u), target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ t(Et, { size: 14 }),
              "여기서 길 찾기"
            ] }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: "jt-maplink",
                onClick: () => p(R === u.id ? null : u.id),
                "aria-expanded": R === u.id,
                children: [
                  /* @__PURE__ */ t(Rn, { size: 14 }),
                  R === u.id ? "지도 닫기" : "지도 미리보기"
                ]
              }
            )
          ] }),
          R === u.id && /* @__PURE__ */ o("div", { className: "jt-embed", children: [
            /* @__PURE__ */ t(
              "iframe",
              {
                title: `${u.name} 지도`,
                src: fo(u),
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                allowFullScreen: !0
              }
            ),
            /* @__PURE__ */ t("p", { children: "지도가 보이지 않으면 '구글맵에서 열기'를 눌러 주세요." })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-wish-bottom", children: [
            /* @__PURE__ */ o(
              "button",
              {
                className: "jt-like" + (g ? " on" : ""),
                onClick: () => y(u.id),
                "aria-pressed": g,
                "aria-label": "가고 싶어요",
                children: [
                  /* @__PURE__ */ t(Te, { size: 16, fill: g ? "currentColor" : "none" }),
                  "가고 싶어요 ",
                  u.likes.length
                ]
              }
            ),
            /* @__PURE__ */ t(Ue, { item: u, me: i, onReact: (F) => l(u.id, F) }),
            T != null ? /* @__PURE__ */ o("span", { className: "jt-planned", style: { color: V[T % V.length] }, children: [
              T + 1,
              "일차 일정에 있어요"
            ] }) : /* @__PURE__ */ t("button", { className: "jt-secondary sm", onClick: () => v(u), children: "일정에 넣기" }),
            /* @__PURE__ */ t(
              Ha,
              {
                count: (u.comments || []).length,
                open: M === u.id,
                onClick: () => x(M === u.id ? null : u.id)
              }
            ),
            /* @__PURE__ */ o("span", { className: "jt-by grow", children: [
              /* @__PURE__ */ t(lt, { name: u.by, members: e.members, size: 16 }),
              u.by
            ] }),
            /* @__PURE__ */ t(St, { onConfirm: () => f(u.id), label: "" })
          ] }),
          M === u.id && /* @__PURE__ */ t(
            Ke,
            {
              comments: u.comments || [],
              me: i,
              members: e.members,
              onAdd: (F) => m(u.id, F),
              onDelete: (F) => w(u.id, F)
            }
          )
        ] })
      ] }, u.id);
    }) })
  ] });
}
function Da({ moves: e, rate: a, me: n }) {
  return e.length ? /* @__PURE__ */ t("ul", { className: "jt-moves2", children: e.map((i, s) => /* @__PURE__ */ o("li", { className: i.from === n || i.to === n ? "mine" : "", children: [
    /* @__PURE__ */ o("span", { className: "jt-moves-who", children: [
      /* @__PURE__ */ t("b", { children: i.from }),
      /* @__PURE__ */ t(Bn, { size: 15, "aria-label": "에게" }),
      /* @__PURE__ */ t("b", { children: i.to })
    ] }),
    /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
      /* @__PURE__ */ t("strong", { children: G(i.v) }),
      /* @__PURE__ */ t("em", { children: ne(i.v, a) })
    ] })
  ] }, s)) }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nomoves", children: "주고받을 돈이 없어요." });
}
function Wo({ e, members: a, rate: n, onEdit: i }) {
  let { Icon: s, color: y } = Fe(e.cat);
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", className: "jt-spend", onClick: () => i(e), "aria-label": `${e.title} 고치기`, children: [
    /* @__PURE__ */ t("span", { className: "jt-spend-icon", style: { "--cc": y }, children: /* @__PURE__ */ t(s, { size: 18 }) }),
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
      /* @__PURE__ */ t("strong", { children: G(Number(e.amount) || 0) }),
      /* @__PURE__ */ t("span", { children: ne(Number(e.amount) || 0, n) })
    ] })
  ] }) });
}
var $a = (e) => e > 0.5 ? `받을 돈 ${G(e)}` : e < -0.5 ? `보낼 돈 ${G(-e)}` : "주고받을 돈 없음", pe = (e) => e > 0.5 ? "plus" : e < -0.5 ? "minus" : "";
function Ho({ settings: e, spend: a, me: n, onEdit: i }) {
  let { members: s, rate: y, start: v } = e, [f, m] = N("me"), w = a.reduce((r, d) => r + (Number(d.amount) || 0), 0), l = te(() => za(a, s), [a, s]), M = te(() => {
    let r = {};
    return a.forEach((d) => r[d.cat] = (r[d.cat] || 0) + (Number(d.amount) || 0)), Ba.filter((d) => r[d]).map((d) => ({ c: d, v: r[d] }));
  }, [a]), x = te(() => {
    let r = {};
    return a.forEach((d) => (r[d.day] = r[d.day] || []).push(d)), Object.keys(r).map(Number).sort((d, E) => d - E).map((d) => ({
      day: d,
      sum: r[d].reduce((E, C) => E + (Number(C.amount) || 0), 0),
      items: [...r[d]].sort((E, C) => C.createdAt - E.createdAt),
      res: za(r[d], s)
    }));
  }, [a, s]), b = l.net[n] || 0, I = l.moves.filter((r) => r.from === n || r.to === n);
  return a.length === 0 ? /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: G(0) }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: me(e) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 기록된 경비가 없어요." }),
      /* @__PURE__ */ t("p", { children: "쓸 때마다 한 줄씩 남기면 누가 누구에게 보낼지 자동으로 계산돼요." })
    ] })
  ] }) : /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-total", children: [
      /* @__PURE__ */ t("span", { children: "지금까지 쓴 돈" }),
      /* @__PURE__ */ t("strong", { children: G(w) }),
      /* @__PURE__ */ o("em", { children: [
        "약 ",
        ne(w, y),
        ", 그중 ",
        n,
        "가 쓴 돈 ",
        G(l.share[n] || 0)
      ] }),
      /* @__PURE__ */ t("span", { className: "jt-fx", children: me(e) }),
      /* @__PURE__ */ t("div", { className: "jt-catbar", "aria-hidden": "true", children: M.map(({ c: r, v: d }) => /* @__PURE__ */ t("i", { style: { flexGrow: d, background: Fe(r).color } }, r)) }),
      /* @__PURE__ */ t("ul", { className: "jt-catlegend", children: M.map(({ c: r, v: d }) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("span", { className: "jt-dot", style: { background: Fe(r).color } }),
        r,
        " ",
        /* @__PURE__ */ o("b", { children: [
          Math.round(d / w * 100),
          "%"
        ] })
      ] }, r)) })
    ] }),
    l.skipped.length > 0 && /* @__PURE__ */ o("div", { className: "jt-warn", role: "alert", children: [
      /* @__PURE__ */ o("strong", { children: [
        "정산에서 빠진 경비가 ",
        l.skipped.length,
        "건 있어요"
      ] }),
      /* @__PURE__ */ t("p", { children: "낸 사람이나 나눌 사람이 지금 가족 목록에 없어요. 이름을 바꾸거나 뺀 경우에 생겨요. 눌러서 사람을 다시 골라 주세요." }),
      /* @__PURE__ */ t("ul", { children: l.skipped.map((r) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("button", { type: "button", onClick: () => i(r), children: [
        /* @__PURE__ */ o("span", { children: [
          r.title,
          " ",
          /* @__PURE__ */ o("em", { children: [
            "(",
            r.payer,
            " 냄)"
          ] })
        ] }),
        /* @__PURE__ */ t("b", { children: G(Number(r.amount) || 0) })
      ] }) }, r.id)) })
    ] }),
    /* @__PURE__ */ t("div", { className: "jt-seg three", role: "tablist", "aria-label": "정산 보기", children: [
      ["me", "나의 정산"],
      ["day", "요일별 정산"],
      ["all", "전체 정산"]
    ].map(([r, d]) => /* @__PURE__ */ t("button", { role: "tab", "aria-selected": f === r, className: f === r ? "on" : "", onClick: () => m(r), children: d }, r)) }),
    f === "me" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-mybal " + (pe(b) || "even"), children: [
        /* @__PURE__ */ o("div", { className: "jt-mybal-top", children: [
          /* @__PURE__ */ t(lt, { name: n, members: s, size: 32 }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("span", { children: [
              "여행 전체 기준, ",
              n,
              "는"
            ] }),
            /* @__PURE__ */ t("strong", { children: b > 0.5 ? `${G(b)} 받으면 돼요` : b < -0.5 ? `${G(-b)} 보내면 돼요` : "주고받을 돈이 없어요" })
          ] })
        ] }),
        I.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-moves", children: I.map((r, d) => /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ t("span", { children: r.from === n ? /* @__PURE__ */ o(ct, { children: [
            /* @__PURE__ */ t("b", { children: r.to }),
            "에게 보내기"
          ] }) : /* @__PURE__ */ o(ct, { children: [
            /* @__PURE__ */ t("b", { children: r.from }),
            "에게 받기"
          ] }) }),
          /* @__PURE__ */ o("span", { className: "jt-moves-amt", children: [
            /* @__PURE__ */ t("strong", { children: G(r.v) }),
            /* @__PURE__ */ t("em", { children: ne(r.v, y) })
          ] })
        ] }, d)) }),
        /* @__PURE__ */ o("div", { className: "jt-calc", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 결제한 돈" }),
            /* @__PURE__ */ t("b", { children: G(l.paid[n] || 0) })
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("span", { children: "내가 쓴 돈 (나눠 계산한 내 부담)" }),
            /* @__PURE__ */ o("b", { children: [
              "− ",
              G(l.share[n] || 0)
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "sum", children: [
            /* @__PURE__ */ t("span", { children: b > 0.5 ? "더 결제했으니 받을 돈" : b < -0.5 ? "덜 결제했으니 보낼 돈" : "결과" }),
            /* @__PURE__ */ t("b", { className: pe(b), children: b > 0.5 ? G(b) : b < -0.5 ? G(-b) : "주고받을 돈 없음" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "날짜마다 나는" }),
      /* @__PURE__ */ t("ul", { className: "jt-daynet", children: x.map((r) => {
        let d = ut(v, r.day), E = r.res.net[n] || 0;
        return /* @__PURE__ */ o("li", { style: { "--lc": V[r.day % V.length] }, children: [
          /* @__PURE__ */ t("span", { className: "jt-pip" }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-label", children: [
            r.day + 1,
            "일차 ",
            ae(d),
            " (",
            Lt(d),
            ")"
          ] }),
          /* @__PURE__ */ o("span", { className: "jt-daynet-sub", children: [
            "결제 ",
            G(r.res.paid[n] || 0),
            ", 내가 쓴 돈 ",
            G(r.res.share[n] || 0)
          ] }),
          /* @__PURE__ */ t("b", { className: "jt-net " + pe(E), children: $a(E) })
        ] }, r.day);
      }) }),
      /* @__PURE__ */ t("p", { className: "jt-explain", children: "결제한 돈이 내가 쓴 돈보다 많으면 받을 돈, 적으면 보낼 돈이에요. 날짜별로 받을 돈과 보낼 돈을 서로 빼고 더하면 위의 결과와 같아요." })
    ] }),
    f === "day" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ t("p", { className: "jt-hint jt-listhint", children: "하루씩 따로 계산한 결과예요. 그날그날 정산하고 싶을 때 쓰세요. 항목을 누르면 고칠 수 있어요." }),
      x.map((r) => {
        let d = ut(v, r.day);
        return /* @__PURE__ */ o("div", { className: "jt-daycard", style: { "--lc": V[r.day % V.length] }, children: [
          /* @__PURE__ */ o("h4", { children: [
            /* @__PURE__ */ t("span", { className: "jt-day-dot sm", children: r.day + 1 }),
            ae(d),
            " (",
            Lt(d),
            ")",
            /* @__PURE__ */ t("span", { className: "jt-group-sum", children: G(r.sum) })
          ] }),
          /* @__PURE__ */ t(Da, { moves: r.res.moves, rate: y, me: n }),
          /* @__PURE__ */ t("ul", { className: "jt-spend-list", children: r.items.map((E) => /* @__PURE__ */ t(Wo, { e: E, members: s, rate: y, onEdit: i }, E.id)) })
        ] }, r.day);
      })
    ] }),
    f === "all" && /* @__PURE__ */ o(ct, { children: [
      /* @__PURE__ */ o("div", { className: "jt-allcard", children: [
        /* @__PURE__ */ t("h4", { children: "여행 전체를 합쳐서 보내면 될 돈" }),
        /* @__PURE__ */ t(Da, { moves: l.moves, rate: y, me: n }),
        /* @__PURE__ */ t("p", { className: "jt-explain", children: "모든 날의 경비를 합친 뒤 송금 횟수가 가장 적도록 묶었어요. 그래서 요일별 정산을 하나씩 더한 것보다 송금이 적어요. 각자 주고받는 총액은 같아요." })
      ] }),
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "사람별 계산" }),
      /* @__PURE__ */ t("ul", { className: "jt-people card", children: s.map((r) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(lt, { name: r, members: s, size: 28 }),
        /* @__PURE__ */ o("div", { className: "jt-person-main", children: [
          /* @__PURE__ */ t("strong", { children: r }),
          /* @__PURE__ */ o("span", { children: [
            "결제 ",
            G(l.paid[r]),
            ", 쓴 돈 ",
            G(l.share[r])
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "jt-net " + pe(l.net[r]), children: $a(l.net[r]) })
      ] }, r)) })
    ] })
  ] });
}
var Se = "trip:loc:", Yo = 3 * 6e4, Jo = (e, a) => V[(Math.max(0, e.indexOf(a)) * 2 + 3) % V.length], Xo = (e) => !!e && e.online && typeof e.lat == "number" && Date.now() - e.at < Yo, Za = (e) => `https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`;
function qo({ settings: e, me: a, locs: n, shareOn: i, onToggle: s, myPos: y, geoErr: v }) {
  let [f, m] = N(!1), [, w] = N(0);
  K(() => {
    let j = setInterval(() => w((R) => R + 1), 3e4);
    return () => clearInterval(j);
  }, []);
  let l = e.members, M = l.map((j) => ({ m: j, l: n[j], live: Xo(n[j]) })), x = M.filter((j) => j.live).map((j) => ({ id: j.m, lat: j.l.lat, lng: j.l.lng, color: Jo(l, j.m), label: j.m, text: j.m[0] })), b = x.map((j) => `${j.id}:${j.lat.toFixed(5)}:${j.lng.toFixed(5)}`).join("|"), I = te(() => x, [b]), [r, d] = N(null), [E, C] = N(() => {
    let j = x[0] || y;
    return j ? { lat: j.lat, lng: j.lng, z: 14 } : { lat: pt.lat, lng: pt.lng, z: 12 };
  }), k = () => {
    if (!x.length) return;
    let j = x.reduce((P, u) => P + u.lat, 0) / x.length, R = x.reduce((P, u) => P + u.lng, 0) / x.length, p = Math.max(...x.map((P) => ue({ lat: j, lng: R }, P)));
    C({ lat: j, lng: R, z: p < 300 ? 16 : p < 1e3 ? 15 : p < 3e3 ? 13 : p < 1e4 ? 12 : 10 }), d(null);
  }, h = J(!1);
  K(() => {
    !h.current && x.length && (h.current = !0, k());
  }, [b]);
  let S = M.filter((j) => j.live).length;
  return /* @__PURE__ */ o("section", { children: [
    /* @__PURE__ */ o("div", { className: "jt-share" + (i ? " on" : ""), children: [
      /* @__PURE__ */ o("div", { className: "jt-share-text", children: [
        /* @__PURE__ */ t("strong", { children: i ? "내 위치를 가족에게 공유하는 중" : "내 위치 공유가 꺼져 있어요" }),
        /* @__PURE__ */ t("span", { children: "앱이 열려 있는 동안만 공유돼요." }),
        /* @__PURE__ */ o("button", { type: "button", className: "jt-helpbtn", onClick: () => m(!0), children: [
          /* @__PURE__ */ t(Un, { size: 14 }),
          "도움말"
        ] })
      ] }),
      /* @__PURE__ */ t("button", { type: "button", role: "switch", "aria-checked": i, "aria-label": "내 위치 공유", className: "jt-switch", onClick: s, children: /* @__PURE__ */ t("i", {}) })
    ] }),
    i && v && /* @__PURE__ */ t("p", { className: "jt-warn-inline jt-share-err", children: v }),
    /* @__PURE__ */ t(
      qa,
      {
        gkey: e.gmapsKey,
        view: E,
        setView: C,
        pins: I,
        temp: null,
        selectedId: r,
        onTap: () => d(null),
        onPinTap: (j) => d(j),
        onPoi: () => {
        }
      }
    ),
    /* @__PURE__ */ o("div", { className: "jt-fam-bar", children: [
      /* @__PURE__ */ o("span", { children: [
        "지금 위치가 보이는 가족 ",
        /* @__PURE__ */ t("b", { children: S }),
        "/",
        l.length,
        "명"
      ] }),
      /* @__PURE__ */ o("button", { type: "button", className: "jt-secondary sm", onClick: k, disabled: !S, children: [
        /* @__PURE__ */ t(On, { size: 14 }),
        "모두 보기"
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "jt-fam-list", children: M.map(({ m: j, l: R, live: p }) => {
      let P = j === a, u = p && y && !P ? ue(y, R) : null;
      return /* @__PURE__ */ o("li", { className: "jt-fam" + (p ? " live" : "") + (r === j ? " sel" : ""), children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-fam-main",
            disabled: !p,
            onClick: () => {
              d(j), C({ lat: R.lat, lng: R.lng, z: 16 });
            },
            children: [
              /* @__PURE__ */ o("span", { className: "jt-fam-av", children: [
                /* @__PURE__ */ t(lt, { name: j, members: l, size: 34 }),
                p && /* @__PURE__ */ t("i", { className: "jt-live-dot" })
              ] }),
              /* @__PURE__ */ o("span", { className: "jt-fam-txt", children: [
                /* @__PURE__ */ o("strong", { children: [
                  j,
                  P ? " (나)" : ""
                ] }),
                /* @__PURE__ */ t("span", { children: p ? `위치 공유 중, ${De(R.at)}${u != null ? `, 나와 ${Ga(u)}` : ""}` : R && R.at ? `앱 꺼짐, 마지막 접속 ${De(R.at)}` : "아직 위치를 공유한 적이 없어요" })
              ] })
            ]
          }
        ),
        p && !P && /* @__PURE__ */ o("a", { className: "jt-maplink", href: Za(R), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ t(Et, { size: 13 }),
          "길 찾기"
        ] })
      ] }, j);
    }) }),
    f && /* @__PURE__ */ o(Rt, { title: '"앱이 켜진 동안에만"은 이렇게 동작해요', onClose: () => m(!1), children: [
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
      /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: () => m(!1), children: "확인" })
    ] }),
    /* @__PURE__ */ t("p", { className: "jt-hint jt-fam-tip", children: '가족이 흩어졌을 때 단톡방에 "앱 한 번 열어 줘"라고 하면, 여는 순간 위치가 모여요. 공유 켜기는 사람마다 각자 해야 해요.' })
  ] });
}
var Qa = "trip:chat:", Ae = "trip:read:", Ie = (e) => Qa + e.at.toString(36).padStart(10, "0") + "-" + e.id, Go = (e) => {
  let a = new Date(e);
  return `${nt(a.getHours())}:${nt(a.getMinutes())}`;
}, Vo = (e) => {
  let a = new Date(e);
  return `${a.getMonth() + 1}월 ${a.getDate()}일 (${Lt(a)})`;
};
function Pa(e) {
  return e.split(/(https?:\/\/[^\s]+)/g).map(
    (a, n) => n % 2 ? /* @__PURE__ */ t("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, n) : a
  );
}
function Zo({ settings: e, me: a, msgs: n, reads: i, notice: s, onSend: y, onDelete: v, onEdit: f, onPin: m, onUnpin: w, onSendLoc: l, badgeAsk: M, onBadgeAsk: x }) {
  let b = e.members, [I, r] = N(""), [d, E] = N(null), [C, k] = N(!1), [h, S] = N(null), [j, R] = N(""), [p, P] = N(!1), [u, g] = N(null), T = s ? n.find(($) => $.id === s.id) : null, F = s ? { ...s, ...T ? { text: T.text, kind: T.kind, lat: T.lat, lng: T.lng } : {} } : null, X = ($) => {
    let Q = document.getElementById("msg-" + $);
    Q && (Q.scrollIntoView({ block: "center", behavior: "smooth" }), g($), setTimeout(() => g(null), 1600));
  }, H = ($) => {
    S($.id), R($.text), E(null);
  }, _ = ($) => {
    let Q = j.trim();
    Q && (Q !== $.text && f($, Q), S(null));
  }, z = J(null), W = J(!0), It = n.length;
  K(() => {
    let $ = n[It - 1], Q = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
    (W.current || Q || $ && $.by === a) && z.current && z.current.scrollIntoView({ block: "end", behavior: W.current ? "auto" : "smooth" }), W.current = !1;
  }, [It]);
  let Wt = () => {
    let $ = I.trim();
    $ && (y($), r(""));
  }, fe = async () => {
    k(!0), await l(), k(!1);
  }, vt = "", Ft = null;
  return /* @__PURE__ */ o("section", { className: "jt-chat", children: [
    It === 0 && /* @__PURE__ */ o("div", { className: "jt-empty", children: [
      /* @__PURE__ */ t("p", { children: "아직 대화가 없어요." }),
      /* @__PURE__ */ t("p", { children: "가족에게 첫 메시지를 남겨 보세요. 아래 위치 버튼으로 내 위치도 보낼 수 있어요." })
    ] }),
    F && /* @__PURE__ */ o("div", { className: "jt-notice" + (p ? " open" : ""), children: [
      /* @__PURE__ */ o("button", { type: "button", className: "jt-notice-head", onClick: () => P(!p), "aria-expanded": p, children: [
        /* @__PURE__ */ t(Wn, { size: 17, className: "jt-notice-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-label", children: "공지" }),
        /* @__PURE__ */ t("span", { className: "jt-notice-text", children: F.kind === "loc" ? `${F.by}의 위치` : F.text }),
        /* @__PURE__ */ t(Bt, { size: 18, className: "jt-fold-ic", "aria-hidden": "true" })
      ] }),
      p && /* @__PURE__ */ o("div", { className: "jt-notice-body", children: [
        F.kind === "loc" ? /* @__PURE__ */ o("p", { children: [
          F.by,
          "이(가) 보낸 위치예요.",
          " ",
          /* @__PURE__ */ t("a", { href: Mt({ lat: F.lat, lng: F.lng }), target: "_blank", rel: "noopener noreferrer", children: "지도에서 보기" })
        ] }) : /* @__PURE__ */ t("p", { className: "jt-msg-text", children: Pa(F.text) }),
        /* @__PURE__ */ o("span", { className: "jt-notice-meta", children: [
          F.by,
          "의 메시지, ",
          F.pinnedBy,
          "이(가) 공지로 등록",
          T ? "" : " (원래 메시지는 지워졌어요)"
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-notice-act", children: [
          T && /* @__PURE__ */ t("button", { type: "button", className: "jt-like", onClick: () => X(F.id), children: "메시지로 이동" }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "jt-like",
              onClick: () => {
                w(), P(!1);
              },
              children: [
                /* @__PURE__ */ t(va, { size: 14 }),
                "공지 해제"
              ]
            }
          )
        ] })
      ] })
    ] }),
    M && /* @__PURE__ */ o("div", { className: "jt-badgeask", children: [
      /* @__PURE__ */ t("span", { children: "홈 화면 앱 아이콘에도 안 읽은 메시지 수를 표시할 수 있어요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary sm", onClick: x, children: "표시 허용" })
    ] }),
    /* @__PURE__ */ t("ol", { className: "jt-msgs", children: n.map(($) => {
      let Q = Vo($.at), gt = Q !== vt, ot = $.by === a, yt = !gt && Ft && Ft.by === $.by && $.at - Ft.at < 5 * 6e4;
      return vt = Q, Ft = $, /* @__PURE__ */ o(Sn.Fragment, { children: [
        gt && /* @__PURE__ */ t("li", { className: "jt-daysep", "aria-label": Q, children: /* @__PURE__ */ t("span", { children: Q }) }),
        /* @__PURE__ */ o(
