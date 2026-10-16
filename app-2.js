/* @__PURE__ */ e("ul", { children: t.map((r) => /* @__PURE__ */ a("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(rt, { name: r.by, members: o, size: 24 }),
      /* @__PURE__ */ a("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ e("strong", { children: r.by }),
          /* @__PURE__ */ e("span", { children: ze(r.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: r.text })
      ] }),
      r.by === n && /* @__PURE__ */ e(It, { onConfirm: () => s(r.id), label: "" })
    ] }, r.id)) }),
    /* @__PURE__ */ a("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: d,
          onChange: (r) => m(r.target.value),
          onKeyDown: (r) => r.key === "Enter" && !r.nativeEvent.isComposing && l(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: l, disabled: !d.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(ha, { size: 18 }) })
    ] })
  ] });
}
function wi({ initial: t, onSave: n, onCancel: o }) {
  let [i, s] = y(t?.title || "가족 일본여행"), [d, m] = y(t?.start || pt(new Date(Date.now() + 30 * 864e5))), [l, r] = y(t?.days || 4), [h, k] = y(t?.members || []), [E, c] = y(t?.rate || 900), [F, f] = y(t?.gmapsKey || ""), [S, v] = y("locked"), N = G(null), A = (C) => C ? C.length > 10 ? C.slice(0, 4) + "••••••••" + C.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [w, x] = y(""), M = () => {
    let C = w.trim();
    !C || h.includes(C) || (k([...h, C]), x(""));
  }, z = i.trim() && d && h.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    o && /* @__PURE__ */ e(Aa, { onBack: o }),
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ a("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(ft, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: i, onChange: (C) => s(C.target.value) }) }),
      /* @__PURE__ */ e(ft, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: d, onChange: (C) => m(C.target.value) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ a("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => r(Math.max(1, l - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ a("strong", { children: [
            l,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => r(Math.min(30, l + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: h.map((C) => /* @__PURE__ */ a("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(rt, { name: C, members: h, size: 20 }),
          C,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => k(h.filter((p) => p !== C)), "aria-label": `${C} 빼기`, children: /* @__PURE__ */ e(Xt, { size: 14 }) })
        ] }, C)) }),
        /* @__PURE__ */ a("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: w,
              onChange: (C) => x(C.target.value),
              onKeyDown: (C) => C.key === "Enter" && M(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: M, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(ft, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: E, onChange: (C) => c(Number(C.target.value) || 0) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "구글 지도 API 키 (선택)" }),
        S === "edit" ? /* @__PURE__ */ e(
          "input",
          {
            ref: N,
            value: F,
            onChange: (C) => f(C.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ a("div", { className: "jt-keylock", children: [
          /* @__PURE__ */ e(Po, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ e("span", { className: "jt-keylock-val", children: A(F) }),
          S === "locked" && /* @__PURE__ */ e(Ni, { onDone: () => v("warn"), className: "sm", children: "길게 눌러 변경" })
        ] }),
        S === "warn" && /* @__PURE__ */ a("div", { className: "jt-keywarn", role: "alert", children: [
          /* @__PURE__ */ e("strong", { children: "API 키를 바꾸기 전에 확인해 주세요" }),
          /* @__PURE__ */ a("ul", { children: [
            /* @__PURE__ */ a("li", { children: [
              "바꾼 키는 저장하면 ",
              /* @__PURE__ */ e("b", { children: "가족 모두의 앱" }),
              "에 바로 적용돼요."
            ] }),
            /* @__PURE__ */ e("li", { children: "키가 틀리거나 사용 제한에 걸리면 지도, 장소 검색, 내 주변이 기본 지도로 바뀌어요." }),
            /* @__PURE__ */ e("li", { children: "새 키는 구글 클라우드에서 사이트 제한과 하루 사용 한도를 꼭 걸어 주세요. 한도를 걸지 않으면 요금이 나올 수 있어요." }),
            /* @__PURE__ */ e("li", { children: "키를 지우면 무료 기본 지도로 돌아가요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-keywarn-act", children: [
            /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => v("locked"), children: "취소" }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  v("edit"), setTimeout(() => N.current && N.current.focus(), 50);
                },
                children: "확인했어요, 변경할게요"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("p", { className: "jt-hint", children: S === "edit" ? "고친 뒤 아래 '설정 저장'을 눌러야 적용돼요." : "실수로 바뀌지 않도록 잠겨 있어요. 한 명만 넣으면 가족 모두에게 적용돼요." }),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-primary",
          disabled: !z,
          onClick: () => n({ title: i.trim(), start: d, days: l, members: h, rate: E || 900, gmapsKey: F }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      o && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: o, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(ki, {})
    ] })
  ] });
}
function ki() {
  let [t, n] = y(""), o = Kn();
  return /* @__PURE__ */ a("div", { className: "jt-invite", children: [
    /* @__PURE__ */ e("strong", { children: "가족 초대" }),
    /* @__PURE__ */ e("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: async () => {
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
    t && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", children: t }),
    /* @__PURE__ */ a("details", { children: [
      /* @__PURE__ */ e("summary", { children: "주소 보기" }),
      /* @__PURE__ */ e("code", { children: o })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && Wn();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Aa({ onBack: t, label: n = "돌아가기" }) {
  return /* @__PURE__ */ e("div", { className: "jt-backbar", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-back", onClick: t, "aria-label": n, children: [
    /* @__PURE__ */ e(ba, { size: 22 }),
    n
  ] }) });
}
function Ni({ ms: t = 1e3, onDone: n, children: o, className: i = "" }) {
  let [s, d] = y(!1), m = G(null), l = (h) => {
    h.preventDefault(), d(!0), clearTimeout(m.current), m.current = setTimeout(() => {
      d(!1), navigator.vibrate && navigator.vibrate(20), n();
    }, t);
  }, r = () => {
    clearTimeout(m.current), d(!1);
  };
  return H(() => () => clearTimeout(m.current), []), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-presshold " + i + (s ? " pressing" : ""),
      style: { "--hold": t + "ms" },
      onPointerDown: l,
      onPointerUp: r,
      onPointerLeave: r,
      onPointerCancel: r,
      onContextMenu: (h) => h.preventDefault(),
      onKeyDown: (h) => (h.key === "Enter" || h.key === " ") && !h.repeat && l(h),
      onKeyUp: r,
      children: [
        /* @__PURE__ */ e("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ e("span", { className: "jt-presshold-label", children: o })
      ]
    }
  );
}
function Ci() {
  let [t, n] = y(() => typeof navigator > "u" ? !0 : navigator.onLine !== !1), [o, i] = y(!1), [s, d] = y(!1);
  return H(() => {
    let m, l = () => {
      n(!0), d(!1), i(!0), clearTimeout(m), m = setTimeout(() => i(!1), 3e3);
    }, r = () => {
      n(!1), i(!1);
    };
    return window.addEventListener("online", l), window.addEventListener("offline", r), () => {
      window.removeEventListener("online", l), window.removeEventListener("offline", r), clearTimeout(m);
    };
  }, []), t && !o ? null : t ? /* @__PURE__ */ a("div", { className: "jt-netbar on", role: "status", children: [
    /* @__PURE__ */ e($o, { size: 15, "aria-hidden": "true" }),
    "다시 연결됐어요. 저장해 둔 내용을 올리고 있어요."
  ] }) : /* @__PURE__ */ a("div", { className: "jt-netbar", role: "alert", children: [
    /* @__PURE__ */ a("button", { type: "button", className: "jt-netbar-head", onClick: () => d(!s), "aria-expanded": s, children: [
      /* @__PURE__ */ e(Ro, { size: 15, "aria-hidden": "true" }),
      /* @__PURE__ */ e("span", { children: "오프라인 상태예요. 입력한 내용은 연결되면 자동으로 올라가요." }),
      /* @__PURE__ */ e(Ct, { size: 16, className: "jt-fold-ic", "aria-hidden": "true" })
    ] }),
    s && /* @__PURE__ */ a("div", { className: "jt-netbar-body", children: [
      /* @__PURE__ */ a("p", { children: [
        /* @__PURE__ */ e("b", { children: "계속 쓸 수 있어요" }),
        " 일정, 가고 싶은 곳, 경비 보기와 입력, 정산, 채팅 쓰기, 길 찾기 버튼, 마지막으로 받은 날씨"
      ] }),
      /* @__PURE__ */ a("p", { children: [
        /* @__PURE__ */ e("b", { children: "연결되면 돼요" }),
        " 새 날씨 예보, 지도 화면, 장소 검색, 내 주변, 가족 위치 갱신, 새 채팅 받기"
      ] })
    ] })
  ] });
}
function zi({ members: t, onPick: n, current: o, onBack: i }) {
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ e(Aa, { onBack: i }),
    /* @__PURE__ */ e("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((s) => /* @__PURE__ */ a("button", { className: "jt-who-btn" + (s === o ? " on" : ""), onClick: () => n(s), children: [
      /* @__PURE__ */ e(rt, { name: s, members: t, size: 40 }),
      /* @__PURE__ */ e("span", { className: "jt-who-name", children: s }),
      s === o && /* @__PURE__ */ e("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, s)) })
  ] });
}
function Ei({ initial: t, preset: n, gkey: o, dayItems: i = [], onSave: s, onDelete: d }) {
  let [m, l] = y(t?.time || n?.time || ""), [r, h] = y(t?.end || n?.end || ""), [k, E] = y(t?.link || ""), [c, F] = y(t && at(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [f, S] = y([]), [v, N] = y(!1), [A, w] = y(""), [x, M] = y(t?.title || ""), [z, C] = y(t?.place || ""), [p, B] = y(t?.memo || ""), [j, u] = y(!1), $ = (R) => {
    if (M(R), !m || j) {
      let g = ai(R);
      g ? (l(g), u(!0)) : j && (l(""), u(!1));
    }
  }, I = async () => {
    let R = (z || x).trim();
    if (!R) {
      w("장소 이름을 먼저 적어 주세요.");
      return;
    }
    N(!0), w(""), S([]);
    try {
      let g = await bn(R, o);
      S(g), g.length || w("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      w("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    N(!1);
  }, U = m && r && Pt(r) <= Pt(m), T = m ? i.filter((R) => {
    if (!R.time) return !1;
    let g = ue({ time: m, end: U ? "" : r }), Y = ue(R);
    return g.s < Y.e && Y.s < g.e;
  }) : [];
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(ft, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: x, onChange: (R) => $(R.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    j && m && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      "제목에서 ",
      m,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-two", children: [
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          Vn,
          {
            label: "시작",
            value: m,
            onChange: (R) => {
              l(R), u(!1), R || h("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(Vn, { label: "끝", value: r, onChange: h, disabled: !m })
      ] })
    ] }),
    m && !r && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    U && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    m && r && !U && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      ka(Pt(r) - Pt(m)),
      " 동안"
    ] }),
    T.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      T.map((R) => `'${R.title}'(${R.time}${R.end ? `~${R.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: z,
            onChange: (R) => C(R.target.value),
            onKeyDown: (R) => R.key === "Enter" && !R.nativeEvent.isComposing && I(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: I, disabled: v, children: v ? "찾는 중" : "검색" })
      ] })
    ] }),
    A && /* @__PURE__ */ e("p", { className: "jt-hint", children: A }),
    f.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: f.map((R, g) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          C(R.name), F({ lat: R.lat, lng: R.lng, placeId: R.placeId }), R.link && E(R.link), S([]), w("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: R.name }),
          /* @__PURE__ */ e("span", { children: R.area })
        ]
      }
    ) }, g)) }),
    c && /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(Et, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t({ title: x, place: z, link: k, ...c }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Tt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => F(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ e(ft, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e("input", { type: "url", value: k, onChange: (R) => E(R.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ e(ft, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: p, onChange: (R) => B(R.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !x.trim() || U,
        onClick: () => s({
          time: m,
          end: m ? r : "",
          title: x.trim(),
          place: z.trim(),
          memo: p.trim(),
          link: k.trim(),
          lat: c ? c.lat : void 0,
          lng: c ? c.lng : void 0,
          placeId: c && c.placeId ? c.placeId : void 0
        }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(It, { onConfirm: d, label: "이 일정 삭제" })
  ] });
}
function Ai({ initial: t, gkey: n, onSave: o, onDelete: i }) {
  let [s, d] = y(t?.name || ""), [m, l] = y(t?.cat || "맛집"), [r, h] = y(t?.area || ""), [k, E] = y(t?.link || ""), [c, F] = y(t?.memo || ""), [f, S] = y(t && at(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [v, N] = y([]), [A, w] = y(!1), [x, M] = y(""), z = async () => {
    let C = [s, r].filter((p) => p && p.trim()).join(" ").trim();
    if (!C) {
      M("이름을 먼저 적어 주세요.");
      return;
    }
    w(!0), M(""), N([]);
    try {
      let p = await bn(C, n);
      N(p), p.length || M("검색 결과가 없어요. 이름을 조금 바꾸거나 영어, 일본어로 적어 보세요.");
    } catch {
      M("검색을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.");
    }
    w(!1);
  };
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "이름" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: s,
            onChange: (C) => d(C.target.value),
            onKeyDown: (C) => C.key === "Enter" && !C.nativeEvent.isComposing && z(),
            placeholder: "예: 이치란 도톤보리",
            "aria-label": "이름"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: z, disabled: A, children: A ? "찾는 중" : "위치 검색" })
      ] })
    ] }),
    x && /* @__PURE__ */ e("p", { className: "jt-hint", children: x }),
    v.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: v.map((C, p) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          S({ lat: C.lat, lng: C.lng, placeId: C.placeId }), s.trim() || d(C.name), !r.trim() && C.area && h(C.area.split(" ").slice(0, 3).join(" ")), !k.trim() && C.link && E(C.link), N([]), M("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: C.name }),
          /* @__PURE__ */ e("span", { children: C.area })
        ]
      }
    ) }, p)) }),
    f ? /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(Et, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요. 거리 표시와 지도에 나와요." }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => S(null), children: "연결 해제" })
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nopos", children: '지도 위치가 없어요. "위치 검색"으로 장소를 고르면 거리와 지도 핀이 표시돼요.' }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: dn.map((C) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (m === C ? " on" : ""), onClick: () => l(C), children: C }, C)) })
    ] }),
    /* @__PURE__ */ e(ft, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: r, onChange: (C) => h(C.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(ft, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: k,
        onChange: (C) => E(C.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(ft, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: c, onChange: (C) => F(C.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !s.trim(),
        onClick: () => o({
          name: s.trim(),
          cat: m,
          area: r.trim(),
          link: k.trim(),
          memo: c.trim(),
          lat: f ? f.lat : void 0,
          lng: f ? f.lng : void 0,
          placeId: f && f.placeId ? f.placeId : void 0
        }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(It, { onConfirm: i, label: "이 장소 삭제" })
  ] });
}
function Si({ settings: t, me: n, defaultDay: o, initial: i, onSave: s, onDelete: d }) {
  let { members: m, days: l, start: r, rate: h } = t, [k, E] = y(i?.title || ""), [c, F] = y(i?.cur === "KRW" ? "KRW" : "JPY"), [f, S] = y(
    i ? String((i.cur === "KRW" ? Number(i.orig) : Number(i.amount)) || "") : ""
  ), [v, N] = y(i && m.includes(i.payer) ? i.payer : n), [A, w] = y(i?.cat || "식비"), [x, M] = y(i ? Math.min(i.day, l - 1) : o), [z, C] = y(i ? (i.split || []).filter((T) => m.includes(T)) : []), [p, B] = y(!!i && Yt(i)), j = Number(f) || 0, u = c === "KRW" ? Math.round(j * 100 / h) : j, $ = i ? [i.payer, ...i.split || []].filter((T, R, g) => T && T !== Ht && !m.includes(T) && g.indexOf(T) === R) : [], I = (T) => C(z.includes(T) ? z.filter((R) => R !== T) : [...z, T]), U = k.trim() && u > 0 && (p || z.length > 0);
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(ft, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: k, onChange: (T) => E(T.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "금액" }),
      /* @__PURE__ */ a("div", { className: "jt-amt", children: [
        /* @__PURE__ */ e("div", { className: "jt-cur", role: "radiogroup", "aria-label": "통화", children: [
          ["JPY", "¥ 엔화"],
          ["KRW", "₩ 원화"]
        ].map(([T, R]) => /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": c === T,
            className: c === T ? "on" : "",
            onClick: () => {
              T !== c && (j > 0 && S(String(Math.round(T === "KRW" ? j * h / 100 : j * 100 / h))), F(T));
            },
            children: R
          },
          T
        )) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            value: f,
            onChange: (T) => S(T.target.value),
            placeholder: c === "KRW" ? "원화 금액" : "엔화 금액",
            "aria-label": c === "KRW" ? "원화 금액" : "엔화 금액"
          }
        )
      ] })
    ] }),
    j > 0 ? /* @__PURE__ */ a("p", { className: "jt-hint jt-fxhint", children: [
      c === "KRW" ? /* @__PURE__ */ a(V, { children: [
        "약 ",
        /* @__PURE__ */ e("b", { children: dt(u) }),
        "로 정산돼요 (₩",
        j.toLocaleString("ko-KR"),
        " 입력)"
      ] }) : /* @__PURE__ */ a(V, { children: [
        "약 ",
        /* @__PURE__ */ e("b", { children: Jt(u, h) })
      ] }),
      /* @__PURE__ */ e("br", {}),
      Ae(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: Ae(t) }),
    $.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      $.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: m.map((T) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (v === T ? " on" : ""), onClick: () => N(T), children: T }, T)) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ a("span", { className: "jt-split-label", children: [
        "누구와 나누나요",
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-ghost sm",
            onClick: () => {
              B(!1), C(z.length === m.length ? [] : m);
            },
            children: z.length === m.length ? "모두 해제" : "모두 선택"
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-chips", children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "jt-chip jt-fundchip" + (p ? " on" : ""),
            onClick: () => {
              B(!p), C([]);
            },
            children: [
              p && /* @__PURE__ */ e(an, { size: 14 }),
              "공금"
            ]
          }
        ),
        m.map((T) => /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "jt-chip" + (z.includes(T) ? " on" : ""),
            onClick: () => {
              B(!1), I(T);
            },
            children: [
              z.includes(T) && /* @__PURE__ */ e(an, { size: 14 }),
              T
            ]
          },
          T
        ))
      ] }),
      !p && u > 0 && z.length > 0 && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
        "1인당 ",
        c === "KRW" ? `₩${(Math.round(j / z.length / 100) * 100).toLocaleString("ko-KR")}(${dt(u / z.length)})` : un(u / z.length)
      ] }),
      p && /* @__PURE__ */ a("p", { className: "jt-hint jt-fundhint", children: [
        "가족끼리 나누지 않고 공금에서 돌려받을 경비예요. 정산에서 빠지고, ",
        v,
        '의 "공금에서 받을 돈"에 더해져요.'
      ] }),
      !p && z.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람이나 공금을 골라 주세요." })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: va.map((T) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (A === T ? " on" : ""), onClick: () => w(T), children: T }, T)) })
    ] }),
    /* @__PURE__ */ e(ft, { label: "날짜", children: /* @__PURE__ */ e("select", { value: x, onChange: (T) => M(Number(T.target.value)), children: Array.from({ length: l }, (T, R) => {
      let g = mt(r, R);
      return /* @__PURE__ */ a("option", { value: R, children: [
        R + 1,
        "일차 ",
        Rt(g),
        " (",
        St(g),
        ")"
      ] }, R);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !U,
        onClick: () => s({
          title: k.trim(),
          amount: u,
          payer: v,
          cat: A,
          day: x,
          split: p ? [] : z,
          fund: p || void 0,
          cur: c,
          orig: c === "KRW" ? j : void 0
        }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ e(It, { onConfirm: d, label: "이 경비 삭제" })
  ] });
}
var xt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Sa = 16;
function sn(t) {
  return t === 0 ? { Icon: Uo, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: Ho, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: Gn, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: Yo, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: Jo, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: Go, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: Xo, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: qo, label: "뇌우", tone: "#7B5FC4" } : { Icon: Gn, label: "흐림", tone: "#66718A" };
}
var Wt = (t) => t == null ? "–" : Math.round(t) + "°", sa = /* @__PURE__ */ new Map();
async function ra(t) {
  let n = sa.get(t);
  if (n && Date.now() - n.at < 30 * 6e4) return n.d;
  let o = await fetch(t);
  if (!o.ok) throw new Error("weather " + o.status);
  let i = await o.json();
  return sa.set(t, { at: Date.now(), d: i }), i;
}
var la = (t, n) => {
  let o = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + n}-${o}`;
};
function Mi(t, n) {
  let [o, i] = y({ status: "loading" });
  return H(() => {
    let s = !0, d = async () => {
      try {
        let l = `latitude=${xt.lat}&longitude=${xt.lng}&timezone=Asia%2FTokyo`, r = pt(/* @__PURE__ */ new Date()), h = pt(mt(r, Sa - 1)), k = Array.from({ length: n }, (N, A) => pt(mt(t, A))), E = k.filter((N) => N >= r && N <= h), c = {}, F = {};
        if (E.length) {
          let N = await ra(
            `https://api.open-meteo.com/v1/forecast?${l}&start_date=${E[0]}&end_date=${E[E.length - 1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
