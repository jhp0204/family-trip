i ? /* @__PURE__ */ t(ua, { size: 15 }) : /* @__PURE__ */ t(Ct, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function cn({ count: e, open: n, onClick: o }) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (n ? " open" : ""),
      onClick: (i) => {
        i.stopPropagation(), o();
      },
      "aria-expanded": n,
      children: [
        /* @__PURE__ */ t(vo, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function Ae({ comments: e = [], me: n, members: o, onAdd: i, onDelete: s }) {
  let [m, u] = j(""), p = () => {
    let r = m.trim();
    r && (i(r), u(""));
  };
  return /* @__PURE__ */ a("div", { className: "jt-comments", onClick: (r) => r.stopPropagation(), onKeyDown: (r) => r.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((r) => /* @__PURE__ */ a("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(pt, { name: r.by, members: o, size: 24 }),
      /* @__PURE__ */ a("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("strong", { children: r.by }),
          /* @__PURE__ */ t("span", { children: ke(r.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: r.text })
      ] }),
      r.by === n && /* @__PURE__ */ t(It, { onConfirm: () => s(r.id), label: "" })
    ] }, r.id)) }),
    /* @__PURE__ */ a("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: m,
          onChange: (r) => u(r.target.value),
          onKeyDown: (r) => r.key === "Enter" && !r.nativeEvent.isComposing && p(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: p, disabled: !m.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(pa, { size: 18 }) })
    ] })
  ] });
}
function hi({ initial: e, onSave: n, onCancel: o }) {
  let [i, s] = j(e?.title || "가족 일본여행"), [m, u] = j(e?.start || dt(new Date(Date.now() + 30 * 864e5))), [p, r] = j(e?.days || 4), [x, k] = j(e?.members || []), [z, c] = j(e?.rate || 900), [I, g] = j(e?.gmapsKey || ""), [A, w] = j("locked"), y = J(null), C = (N) => N ? N.length > 10 ? N.slice(0, 4) + "••••••••" + N.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [d, l] = j(""), S = () => {
    let N = d.trim();
    !N || x.includes(N) || (k([...x, N]), l(""));
  }, E = i.trim() && m && x.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    o && /* @__PURE__ */ t(wa, { onBack: o }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ a("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(mt, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (N) => s(N.target.value) }) }),
      /* @__PURE__ */ t(mt, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: m, onChange: (N) => u(N.target.value) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "여행 일수" }),
        /* @__PURE__ */ a("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => r(Math.max(1, p - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ a("strong", { children: [
            p,
            "일"
          ] }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => r(Math.min(30, p + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((N) => /* @__PURE__ */ a("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ t(pt, { name: N, members: x, size: 20 }),
          N,
          /* @__PURE__ */ t("button", { type: "button", onClick: () => k(x.filter((f) => f !== N)), "aria-label": `${N} 빼기`, children: /* @__PURE__ */ t(Gt, { size: 14 }) })
        ] }, N)) }),
        /* @__PURE__ */ a("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: d,
              onChange: (N) => l(N.target.value),
              onKeyDown: (N) => N.key === "Enter" && S(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: S, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(mt, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: z, onChange: (N) => c(Number(N.target.value) || 0) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "구글 지도 API 키 (선택)" }),
        A === "edit" ? /* @__PURE__ */ t(
          "input",
          {
            ref: y,
            value: I,
            onChange: (N) => g(N.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ a("div", { className: "jt-keylock", children: [
          /* @__PURE__ */ t(Ao, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ t("span", { className: "jt-keylock-val", children: C(I) }),
          A === "locked" && /* @__PURE__ */ t(xi, { onDone: () => w("warn"), className: "sm", children: "길게 눌러 변경" })
        ] }),
        A === "warn" && /* @__PURE__ */ a("div", { className: "jt-keywarn", role: "alert", children: [
          /* @__PURE__ */ t("strong", { children: "API 키를 바꾸기 전에 확인해 주세요" }),
          /* @__PURE__ */ a("ul", { children: [
            /* @__PURE__ */ a("li", { children: [
              "바꾼 키는 저장하면 ",
              /* @__PURE__ */ t("b", { children: "가족 모두의 앱" }),
              "에 바로 적용돼요."
            ] }),
            /* @__PURE__ */ t("li", { children: "키가 틀리거나 사용 제한에 걸리면 지도, 장소 검색, 내 주변이 기본 지도로 바뀌어요." }),
            /* @__PURE__ */ t("li", { children: "새 키는 구글 클라우드에서 사이트 제한과 하루 사용 한도를 꼭 걸어 주세요. 한도를 걸지 않으면 요금이 나올 수 있어요." }),
            /* @__PURE__ */ t("li", { children: "키를 지우면 무료 기본 지도로 돌아가요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-keywarn-act", children: [
            /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => w("locked"), children: "취소" }),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  w("edit"), setTimeout(() => y.current && y.current.focus(), 50);
                },
                children: "확인했어요, 변경할게요"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: A === "edit" ? "고친 뒤 아래 '설정 저장'을 눌러야 적용돼요." : "실수로 바뀌지 않도록 잠겨 있어요. 한 명만 넣으면 가족 모두에게 적용돼요." }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-primary",
          disabled: !E,
          onClick: () => n({ title: i.trim(), start: m, days: p, members: x, rate: z || 900, gmapsKey: I }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      o && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: o, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(bi, {})
    ] })
  ] });
}
function bi() {
  let [e, n] = j(""), o = Rn();
  return /* @__PURE__ */ a("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: o });
          return;
        } catch (s) {
          if (s && s.name === "AbortError") return;
        }
      try {
        await navigator.clipboard.writeText(o), n("링크를 복사했어요. 가족 채팅방에 붙여넣어 주세요.");
      } catch {
        n("자동 복사가 안 돼요. 아래 '주소 보기'를 열어 길게 눌러 복사해 주세요.");
      }
    }, children: "초대 링크 보내기" }),
    e && /* @__PURE__ */ t("p", { className: "jt-hint jt-formmsg", children: e }),
    /* @__PURE__ */ a("details", { children: [
      /* @__PURE__ */ t("summary", { children: "주소 보기" }),
      /* @__PURE__ */ t("code", { children: o })
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && Tn();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function wa({ onBack: e, label: n = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-back", onClick: e, "aria-label": n, children: [
    /* @__PURE__ */ t(da, { size: 22 }),
    n
  ] }) });
}
function xi({ ms: e = 1e3, onDone: n, children: o, className: i = "" }) {
  let [s, m] = j(!1), u = J(null), p = (x) => {
    x.preventDefault(), m(!0), clearTimeout(u.current), u.current = setTimeout(() => {
      m(!1), navigator.vibrate && navigator.vibrate(20), n();
    }, e);
  }, r = () => {
    clearTimeout(u.current), m(!1);
  };
  return K(() => () => clearTimeout(u.current), []), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-presshold " + i + (s ? " pressing" : ""),
      style: { "--hold": e + "ms" },
      onPointerDown: p,
      onPointerUp: r,
      onPointerLeave: r,
      onPointerCancel: r,
      onContextMenu: (x) => x.preventDefault(),
      onKeyDown: (x) => (x.key === "Enter" || x.key === " ") && !x.repeat && p(x),
      onKeyUp: r,
      children: [
        /* @__PURE__ */ t("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-presshold-label", children: o })
      ]
    }
  );
}
function ji() {
  let [e, n] = j(() => typeof navigator > "u" ? !0 : navigator.onLine !== !1), [o, i] = j(!1), [s, m] = j(!1);
  return K(() => {
    let u, p = () => {
      n(!0), m(!1), i(!0), clearTimeout(u), u = setTimeout(() => i(!1), 3e3);
    }, r = () => {
      n(!1), i(!1);
    };
    return window.addEventListener("online", p), window.addEventListener("offline", r), () => {
      window.removeEventListener("online", p), window.removeEventListener("offline", r), clearTimeout(u);
    };
  }, []), e && !o ? null : e ? /* @__PURE__ */ a("div", { className: "jt-netbar on", role: "status", children: [
    /* @__PURE__ */ t(Mo, { size: 15, "aria-hidden": "true" }),
    "다시 연결됐어요. 저장해 둔 내용을 올리고 있어요."
  ] }) : /* @__PURE__ */ a("div", { className: "jt-netbar", role: "alert", children: [
    /* @__PURE__ */ a("button", { type: "button", className: "jt-netbar-head", onClick: () => m(!s), "aria-expanded": s, children: [
      /* @__PURE__ */ t(So, { size: 15, "aria-hidden": "true" }),
      /* @__PURE__ */ t("span", { children: "오프라인 상태예요. 입력한 내용은 연결되면 자동으로 올라가요." }),
      /* @__PURE__ */ t(Ct, { size: 16, className: "jt-fold-ic", "aria-hidden": "true" })
    ] }),
    s && /* @__PURE__ */ a("div", { className: "jt-netbar-body", children: [
      /* @__PURE__ */ a("p", { children: [
        /* @__PURE__ */ t("b", { children: "계속 쓸 수 있어요" }),
        " 일정, 가고 싶은 곳, 경비 보기와 입력, 정산, 채팅 쓰기, 길 찾기 버튼, 마지막으로 받은 날씨"
      ] }),
      /* @__PURE__ */ a("p", { children: [
        /* @__PURE__ */ t("b", { children: "연결되면 돼요" }),
        " 새 날씨 예보, 지도 화면, 장소 검색, 내 주변, 가족 위치 갱신, 새 채팅 받기"
      ] })
    ] })
  ] });
}
function yi({ members: e, onPick: n, current: o, onBack: i }) {
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(wa, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((s) => /* @__PURE__ */ a("button", { className: "jt-who-btn" + (s === o ? " on" : ""), onClick: () => n(s), children: [
      /* @__PURE__ */ t(pt, { name: s, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: s }),
      s === o && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, s)) })
  ] });
}
function vi({ initial: e, preset: n, gkey: o, dayItems: i = [], onSave: s, onDelete: m }) {
  let [u, p] = j(e?.time || n?.time || ""), [r, x] = j(e?.end || n?.end || ""), [k, z] = j(e?.link || ""), [c, I] = j(e && nt(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [g, A] = j([]), [w, y] = j(!1), [C, d] = j(""), [l, S] = j(e?.title || ""), [E, N] = j(e?.place || ""), [f, B] = j(e?.memo || ""), [F, v] = j(!1), _ = (R) => {
    if (S(R), !u || F) {
      let h = Vo(R);
      h ? (p(h), v(!0)) : F && (p(""), v(!1));
    }
  }, M = async () => {
    let R = (E || l).trim();
    if (!R) {
      d("장소 이름을 먼저 적어 주세요.");
      return;
    }
    y(!0), d(""), A([]);
    try {
      let h = await dn(R, o);
      A(h), h.length || d("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      d("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    y(!1);
  }, W = u && r && $t(r) <= $t(u), G = u ? i.filter((R) => {
    if (!R.time) return !1;
    let h = pe({ time: u, end: W ? "" : r }), H = pe(R);
    return h.s < H.e && H.s < h.e;
  }) : [];
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(mt, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: l, onChange: (R) => _(R.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    F && u && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      "제목에서 ",
      u,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-two", children: [
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          Hn,
          {
            label: "시작",
            value: u,
            onChange: (R) => {
              p(R), v(!1), R || x("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(Hn, { label: "끝", value: r, onChange: x, disabled: !u })
      ] })
    ] }),
    u && !r && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    W && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    u && r && !W && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      ba($t(r) - $t(u)),
      " 동안"
    ] }),
    G.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      G.map((R) => `'${R.title}'(${R.time}${R.end ? `~${R.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: E,
            onChange: (R) => N(R.target.value),
            onKeyDown: (R) => R.key === "Enter" && !R.nativeEvent.isComposing && M(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: M, disabled: w, children: w ? "찾는 중" : "검색" })
      ] })
    ] }),
    C && /* @__PURE__ */ t("p", { className: "jt-hint", children: C }),
    g.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: g.map((R, h) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          N(R.name), I({ lat: R.lat, lng: R.lng, placeId: R.placeId }), R.link && z(R.link), A([]), d("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: R.name }),
          /* @__PURE__ */ t("span", { children: R.area })
        ]
      }
    ) }, h)) }),
    c && /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(Et, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ a("a", { className: "jt-maplink", href: Tt({ title: l, place: E, link: k, ...c }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Bt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => I(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(mt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: k, onChange: (R) => z(R.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(mt, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: f, onChange: (R) => B(R.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !l.trim() || W,
        onClick: () => s({
          time: u,
          end: u ? r : "",
          title: l.trim(),
          place: E.trim(),
          memo: f.trim(),
          link: k.trim(),
          lat: c ? c.lat : void 0,
          lng: c ? c.lng : void 0,
          placeId: c && c.placeId ? c.placeId : void 0
        }),
        children: e ? "수정 저장" : "일정 추가"
      }
    ),
    e && /* @__PURE__ */ t(It, { onConfirm: m, label: "이 일정 삭제" })
  ] });
}
function wi({ initial: e, gkey: n, onSave: o, onDelete: i }) {
  let [s, m] = j(e?.name || ""), [u, p] = j(e?.cat || "맛집"), [r, x] = j(e?.area || ""), [k, z] = j(e?.link || ""), [c, I] = j(e?.memo || ""), [g, A] = j(e && nt(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [w, y] = j([]), [C, d] = j(!1), [l, S] = j(""), E = async () => {
    let N = [s, r].filter((f) => f && f.trim()).join(" ").trim();
    if (!N) {
      S("이름을 먼저 적어 주세요.");
      return;
    }
    d(!0), S(""), y([]);
    try {
      let f = await dn(N, n);
      y(f), f.length || S("검색 결과가 없어요. 이름을 조금 바꾸거나 영어, 일본어로 적어 보세요.");
    } catch {
      S("검색을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.");
    }
    d(!1);
  };
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "이름" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: s,
            onChange: (N) => m(N.target.value),
            onKeyDown: (N) => N.key === "Enter" && !N.nativeEvent.isComposing && E(),
            placeholder: "예: 이치란 도톤보리",
            "aria-label": "이름"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: E, disabled: C, children: C ? "찾는 중" : "위치 검색" })
      ] })
    ] }),
    l && /* @__PURE__ */ t("p", { className: "jt-hint", children: l }),
    w.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: w.map((N, f) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          A({ lat: N.lat, lng: N.lng, placeId: N.placeId }), s.trim() || m(N.name), !r.trim() && N.area && x(N.area.split(" ").slice(0, 3).join(" ")), !k.trim() && N.link && z(N.link), y([]), S("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: N.name }),
          /* @__PURE__ */ t("span", { children: N.area })
        ]
      }
    ) }, f)) }),
    g ? /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(Et, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요. 거리 표시와 지도에 나와요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => A(null), children: "연결 해제" })
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nopos", children: '지도 위치가 없어요. "위치 검색"으로 장소를 고르면 거리와 지도 핀이 표시돼요.' }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: sn.map((N) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (u === N ? " on" : ""), onClick: () => p(N), children: N }, N)) })
    ] }),
    /* @__PURE__ */ t(mt, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: r, onChange: (N) => x(N.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(mt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: k,
        onChange: (N) => z(N.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(mt, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: c, onChange: (N) => I(N.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !s.trim(),
        onClick: () => o({
          name: s.trim(),
          cat: u,
          area: r.trim(),
          link: k.trim(),
          memo: c.trim(),
          lat: g ? g.lat : void 0,
          lng: g ? g.lng : void 0,
          placeId: g && g.placeId ? g.placeId : void 0
        }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(It, { onConfirm: i, label: "이 장소 삭제" })
  ] });
}
function ki({ settings: e, me: n, defaultDay: o, initial: i, onSave: s, onDelete: m }) {
  let { members: u, days: p, start: r, rate: x } = e, [k, z] = j(i?.title || ""), [c, I] = j(i ? String(Number(i.amount) || "") : ""), [g, A] = j(i && u.includes(i.payer) ? i.payer : n), [w, y] = j(i?.cat || "식비"), [C, d] = j(i ? Math.min(i.day, p - 1) : o), [l, S] = j(i ? (i.split || []).filter((F) => u.includes(F)) : u), E = Number(c) || 0, N = i ? [i.payer, ...i.split || []].filter((F, v, _) => F && !u.includes(F) && _.indexOf(F) === v) : [], f = (F) => S(l.includes(F) ? l.filter((v) => v !== F) : [...l, F]), B = k.trim() && E > 0 && l.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(mt, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: k, onChange: (F) => z(F.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(mt, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: c, onChange: (F) => I(F.target.value), placeholder: "0" }) }),
    E > 0 ? /* @__PURE__ */ a("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ t("b", { children: Yt(E, x) }),
      /* @__PURE__ */ t("br", {}),
      Ce(e)
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint", children: Ce(e) }),
    N.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      N.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: u.map((F) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (g === F ? " on" : ""), onClick: () => A(F), children: F }, F)) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: u.map((F) => /* @__PURE__ */ a("button", { type: "button", className: "jt-chip" + (l.includes(F) ? " on" : ""), onClick: () => f(F), children: [
        l.includes(F) && /* @__PURE__ */ t(ca, { size: 14 }),
        F
      ] }, F)) }),
      E > 0 && l.length > 0 && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
        "1인당 ",
        it(E / l.length)
      ] }),
      l.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: ga.map((F) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (w === F ? " on" : ""), onClick: () => y(F), children: F }, F)) })
    ] }),
    /* @__PURE__ */ t(mt, { label: "날짜", children: /* @__PURE__ */ t("select", { value: C, onChange: (F) => d(Number(F.target.value)), children: Array.from({ length: p }, (F, v) => {
      let _ = ft(r, v);
      return /* @__PURE__ */ a("option", { value: v, children: [
        v + 1,
        "일차 ",
        Rt(_),
        " (",
        St(_),
        ")"
      ] }, v);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !B,
        onClick: () => s({ title: k.trim(), amount: E, payer: g, cat: w, day: C, split: l }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(It, { onConfirm: m, label: "이 경비 삭제" })
  ] });
}
var xt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, ka = 16;
function tn(e) {
  return e === 0 ? { Icon: Bo, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: _o, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: Un, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: Lo, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: Oo, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: Uo, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: Ko, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: Wo, label: "뇌우", tone: "#7B5FC4" } : { Icon: Un, label: "흐림", tone: "#66718A" };
}
var Wt = (e) => e == null ? "–" : Math.round(e) + "°", ta = /* @__PURE__ */ new Map();
async function ea(e) {
  let n = ta.get(e);
  if (n && Date.now() - n.at < 30 * 6e4) return n.d;
  let o = await fetch(e);
  if (!o.ok) throw new Error("weather " + o.status);
  let i = await o.json();
  return ta.set(e, { at: Date.now(), d: i }), i;
}
var na = (e, n) => {
  let o = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + n}-${o}`;
};
function Ni(e, n) {
  let [o, i] = j({ status: "loading" });
  return K(() => {
    let s = !0, m = async () => {
      try {
        let p = `latitude=${xt.lat}&longitude=${xt.lng}&timezone=Asia%2FTokyo`, r = dt(/* @__PURE__ */ new Date()), x = dt(ft(r, ka - 1)), k = Array.from({ length: n }, (y, C) => dt(ft(e, C))), z = k.filter((y) => y >= r && y <= x), c = {}, I = {};
        if (z.length) {
          let y = await ea(
            `https://api.open-meteo.com/v1/forecast?${p}&start_date=${z[0]}&end_date=${z[z.length - 1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
          );
          y.daily.time.forEach((C, d) => {
            c[C] = {
              code: y.daily.weather_code[d],
              max: y.daily.temperature_2m_max[d],
              min: y.daily.temperature_2m_min[d],
              pop: y.daily.precipitation_probability_max[d],
              sum: y.daily.precipitation_sum[d]
            };
          }), y.hourly.time.forEach((C, d) => {
            I[C.slice(0, 13)] = {
              t: y.hourly.temperature_2m[d],
              pop: y.hourly.precipitation_probability[d],
              code: y.hourly.weather_code[d]
            };
          });
        }
        let g = k.filter((y) => !c[y] && y > r), A = {};
        if (g.length) {
          let y = await Promise.all(
            [1, 2, 3].map(
              (d) => ea(
                `https://archive-api.open-meteo.com/v1/archive?${p}&start_date=${na(g[0], -d)}&end_date=${na(g[g.length - 1], -d)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
