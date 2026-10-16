/* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: g,
          onChange: (r) => d(r.target.value),
          onKeyDown: (r) => r.key === "Enter" && !r.nativeEvent.isComposing && c(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: c, disabled: !g.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(pn, { size: 18 }) })
    ] })
  ] });
}
function fi({ initial: e, onSave: a, onCancel: n }) {
  let [i, s] = j(e?.title || "가족 일본여행"), [g, d] = j(e?.start || dt(new Date(Date.now() + 30 * 864e5))), [c, r] = j(e?.days || 4), [x, N] = j(e?.members || []), [E, u] = j(e?.rate || 900), [I, p] = j(e?.gmapsKey || ""), [k, w] = j("locked"), v = J(null), M = (C) => C ? C.length > 10 ? C.slice(0, 4) + "••••••••" + C.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [m, l] = j(""), A = () => {
    let C = m.trim();
    !C || x.includes(C) || (N([...x, C]), l(""));
  }, z = i.trim() && g && x.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    n && /* @__PURE__ */ t(wn, { onBack: n }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(mt, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (C) => s(C.target.value) }) }),
      /* @__PURE__ */ t(mt, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: g, onChange: (C) => d(C.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => r(Math.max(1, c - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            c,
            "일"
          ] }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => r(Math.min(30, c + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((C) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ t(pt, { name: C, members: x, size: 20 }),
          C,
          /* @__PURE__ */ t("button", { type: "button", onClick: () => N(x.filter((f) => f !== C)), "aria-label": `${C} 빼기`, children: /* @__PURE__ */ t(Gt, { size: 14 }) })
        ] }, C)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: m,
              onChange: (C) => l(C.target.value),
              onKeyDown: (C) => C.key === "Enter" && A(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: A, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(mt, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: E, onChange: (C) => u(Number(C.target.value) || 0) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "구글 지도 API 키 (선택)" }),
        k === "edit" ? /* @__PURE__ */ t(
          "input",
          {
            ref: v,
            value: I,
            onChange: (C) => p(C.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ o("div", { className: "jt-keylock", children: [
          /* @__PURE__ */ t(Eo, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ t("span", { className: "jt-keylock-val", children: M(I) }),
          k === "locked" && /* @__PURE__ */ t(hi, { onDone: () => w("warn"), className: "sm", children: "길게 눌러 변경" })
        ] }),
        k === "warn" && /* @__PURE__ */ o("div", { className: "jt-keywarn", role: "alert", children: [
          /* @__PURE__ */ t("strong", { children: "API 키를 바꾸기 전에 확인해 주세요" }),
          /* @__PURE__ */ o("ul", { children: [
            /* @__PURE__ */ o("li", { children: [
              "바꾼 키는 저장하면 ",
              /* @__PURE__ */ t("b", { children: "가족 모두의 앱" }),
              "에 바로 적용돼요."
            ] }),
            /* @__PURE__ */ t("li", { children: "키가 틀리거나 사용 제한에 걸리면 지도, 장소 검색, 내 주변이 기본 지도로 바뀌어요." }),
            /* @__PURE__ */ t("li", { children: "새 키는 구글 클라우드에서 사이트 제한과 하루 사용 한도를 꼭 걸어 주세요. 한도를 걸지 않으면 요금이 나올 수 있어요." }),
            /* @__PURE__ */ t("li", { children: "키를 지우면 무료 기본 지도로 돌아가요." })
          ] }),
          /* @__PURE__ */ o("div", { className: "jt-keywarn-act", children: [
            /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => w("locked"), children: "취소" }),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  w("edit"), setTimeout(() => v.current && v.current.focus(), 50);
                },
                children: "확인했어요, 변경할게요"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: k === "edit" ? "고친 뒤 아래 '설정 저장'을 눌러야 적용돼요." : "실수로 바뀌지 않도록 잠겨 있어요. 한 명만 넣으면 가족 모두에게 적용돼요." }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-primary",
          disabled: !z,
          onClick: () => a({ title: i.trim(), start: g, days: c, members: x, rate: E || 900, gmapsKey: I }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(gi, {})
    ] })
  ] });
}
function gi() {
  let [e, a] = j(""), n = $a();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: n });
          return;
        } catch (s) {
          if (s && s.name === "AbortError") return;
        }
      try {
        await navigator.clipboard.writeText(n), a("링크를 복사했어요. 가족 채팅방에 붙여넣어 주세요.");
      } catch {
        a("자동 복사가 안 돼요. 아래 '주소 보기'를 열어 길게 눌러 복사해 주세요.");
      }
    }, children: "초대 링크 보내기" }),
    e && /* @__PURE__ */ t("p", { className: "jt-hint jt-formmsg", children: e }),
    /* @__PURE__ */ o("details", { children: [
      /* @__PURE__ */ t("summary", { children: "주소 보기" }),
      /* @__PURE__ */ t("code", { children: n })
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && Ra();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function wn({ onBack: e, label: a = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-back", onClick: e, "aria-label": a, children: [
    /* @__PURE__ */ t(dn, { size: 22 }),
    a
  ] }) });
}
function hi({ ms: e = 1e3, onDone: a, children: n, className: i = "" }) {
  let [s, g] = j(!1), d = J(null), c = (x) => {
    x.preventDefault(), g(!0), clearTimeout(d.current), d.current = setTimeout(() => {
      g(!1), navigator.vibrate && navigator.vibrate(20), a();
    }, e);
  }, r = () => {
    clearTimeout(d.current), g(!1);
  };
  return K(() => () => clearTimeout(d.current), []), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-presshold " + i + (s ? " pressing" : ""),
      style: { "--hold": e + "ms" },
      onPointerDown: c,
      onPointerUp: r,
      onPointerLeave: r,
      onPointerCancel: r,
      onContextMenu: (x) => x.preventDefault(),
      onKeyDown: (x) => (x.key === "Enter" || x.key === " ") && !x.repeat && c(x),
      onKeyUp: r,
      children: [
        /* @__PURE__ */ t("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-presshold-label", children: n })
      ]
    }
  );
}
function bi() {
  let [e, a] = j(() => typeof navigator > "u" ? !0 : navigator.onLine !== !1), [n, i] = j(!1), [s, g] = j(!1);
  return K(() => {
    let d, c = () => {
      a(!0), g(!1), i(!0), clearTimeout(d), d = setTimeout(() => i(!1), 3e3);
    }, r = () => {
      a(!1), i(!1);
    };
    return window.addEventListener("online", c), window.addEventListener("offline", r), () => {
      window.removeEventListener("online", c), window.removeEventListener("offline", r), clearTimeout(d);
    };
  }, []), e && !n ? null : e ? /* @__PURE__ */ o("div", { className: "jt-netbar on", role: "status", children: [
    /* @__PURE__ */ t(Mo, { size: 15, "aria-hidden": "true" }),
    "다시 연결됐어요. 저장해 둔 내용을 올리고 있어요."
  ] }) : /* @__PURE__ */ o("div", { className: "jt-netbar", role: "alert", children: [
    /* @__PURE__ */ o("button", { type: "button", className: "jt-netbar-head", onClick: () => g(!s), "aria-expanded": s, children: [
      /* @__PURE__ */ t(Ao, { size: 15, "aria-hidden": "true" }),
      /* @__PURE__ */ t("span", { children: "오프라인 상태예요. 입력한 내용은 연결되면 자동으로 올라가요." }),
      /* @__PURE__ */ t(Ct, { size: 16, className: "jt-fold-ic", "aria-hidden": "true" })
    ] }),
    s && /* @__PURE__ */ o("div", { className: "jt-netbar-body", children: [
      /* @__PURE__ */ o("p", { children: [
        /* @__PURE__ */ t("b", { children: "계속 쓸 수 있어요" }),
        " 일정, 가고 싶은 곳, 경비 보기와 입력, 정산, 채팅 쓰기, 길 찾기 버튼, 마지막으로 받은 날씨"
      ] }),
      /* @__PURE__ */ o("p", { children: [
        /* @__PURE__ */ t("b", { children: "연결되면 돼요" }),
        " 새 날씨 예보, 지도 화면, 장소 검색, 내 주변, 가족 위치 갱신, 새 채팅 받기"
      ] })
    ] })
  ] });
}
function xi({ members: e, onPick: a, current: n, onBack: i }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(wn, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((s) => /* @__PURE__ */ o("button", { className: "jt-who-btn" + (s === n ? " on" : ""), onClick: () => a(s), children: [
      /* @__PURE__ */ t(pt, { name: s, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: s }),
      s === n && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, s)) })
  ] });
}
function ji({ initial: e, preset: a, gkey: n, dayItems: i = [], onSave: s, onDelete: g }) {
  let [d, c] = j(e?.time || a?.time || ""), [r, x] = j(e?.end || a?.end || ""), [N, E] = j(e?.link || ""), [u, I] = j(e && at(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [p, k] = j([]), [w, v] = j(!1), [M, m] = j(""), [l, A] = j(e?.title || ""), [z, C] = j(e?.place || ""), [f, B] = j(e?.memo || ""), [D, y] = j(!1), L = (R) => {
    if (A(R), !d || D) {
      let h = Vo(R);
      h ? (c(h), y(!0)) : D && (c(""), y(!1));
    }
  }, S = async () => {
    let R = (z || l).trim();
    if (!R) {
      m("장소 이름을 먼저 적어 주세요.");
      return;
    }
    v(!0), m(""), k([]);
    try {
      let h = await Me(R, n);
      k(h), h.length || m("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      m("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    v(!1);
  }, W = d && r && Pt(r) <= Pt(d), G = d ? i.filter((R) => {
    if (!R.time) return !1;
    let h = pe({ time: d, end: W ? "" : r }), H = pe(R);
    return h.s < H.e && H.s < h.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(mt, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: l, onChange: (R) => L(R.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    D && d && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      d,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          Wa,
          {
            label: "시작",
            value: d,
            onChange: (R) => {
              c(R), y(!1), R || x("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(Wa, { label: "끝", value: r, onChange: x, disabled: !d })
      ] })
    ] }),
    d && !r && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    W && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    d && r && !W && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      bn(Pt(r) - Pt(d)),
      " 동안"
    ] }),
    G.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      G.map((R) => `'${R.title}'(${R.time}${R.end ? `~${R.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: z,
            onChange: (R) => C(R.target.value),
            onKeyDown: (R) => R.key === "Enter" && !R.nativeEvent.isComposing && S(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: S, disabled: w, children: w ? "찾는 중" : "검색" })
      ] })
    ] }),
    M && /* @__PURE__ */ t("p", { className: "jt-hint", children: M }),
    p.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: p.map((R, h) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          C(R.name), I({ lat: R.lat, lng: R.lng, placeId: R.placeId }), R.link && E(R.link), k([]), m("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: R.name }),
          /* @__PURE__ */ t("span", { children: R.area })
        ]
      }
    ) }, h)) }),
    u && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(Et, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt({ title: l, place: z, link: N, ...u }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Bt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => I(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(mt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: N, onChange: (R) => E(R.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(mt, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: f, onChange: (R) => B(R.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !l.trim() || W,
        onClick: () => s({
          time: d,
          end: d ? r : "",
          title: l.trim(),
          place: z.trim(),
          memo: f.trim(),
          link: N.trim(),
          lat: u ? u.lat : void 0,
          lng: u ? u.lng : void 0,
          placeId: u && u.placeId ? u.placeId : void 0
        }),
        children: e ? "수정 저장" : "일정 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: g, label: "이 일정 삭제" })
  ] });
}
function yi({ initial: e, gkey: a, onSave: n, onDelete: i }) {
  let [s, g] = j(e?.name || ""), [d, c] = j(e?.cat || "맛집"), [r, x] = j(e?.area || ""), [N, E] = j(e?.link || ""), [u, I] = j(e?.memo || ""), [p, k] = j(e && at(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [w, v] = j([]), [M, m] = j(!1), [l, A] = j(""), z = async () => {
    let C = [s, r].filter((f) => f && f.trim()).join(" ").trim();
    if (!C) {
      A("이름을 먼저 적어 주세요.");
      return;
    }
    m(!0), A(""), v([]);
    try {
      let f = await Me(C, a);
      v(f), f.length || A("검색 결과가 없어요. 이름을 조금 바꾸거나 영어, 일본어로 적어 보세요.");
    } catch {
      A("검색을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.");
    }
    m(!1);
  };
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "이름" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: s,
            onChange: (C) => g(C.target.value),
            onKeyDown: (C) => C.key === "Enter" && !C.nativeEvent.isComposing && z(),
            placeholder: "예: 이치란 도톤보리",
            "aria-label": "이름"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: z, disabled: M, children: M ? "찾는 중" : "위치 검색" })
      ] })
    ] }),
    l && /* @__PURE__ */ t("p", { className: "jt-hint", children: l }),
    w.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: w.map((C, f) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          k({ lat: C.lat, lng: C.lng, placeId: C.placeId }), s.trim() || g(C.name), !r.trim() && C.area && x(C.area.split(" ").slice(0, 3).join(" ")), !N.trim() && C.link && E(C.link), v([]), A("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: C.name }),
          /* @__PURE__ */ t("span", { children: C.area })
        ]
      }
    ) }, f)) }),
    p ? /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(Et, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요. 거리 표시와 지도에 나와요." }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => k(null), children: "연결 해제" })
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint jt-nopos", children: '지도 위치가 없어요. "위치 검색"으로 장소를 고르면 거리와 지도 핀이 표시돼요.' }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: sa.map((C) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (d === C ? " on" : ""), onClick: () => c(C), children: C }, C)) })
    ] }),
    /* @__PURE__ */ t(mt, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: r, onChange: (C) => x(C.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(mt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: N,
        onChange: (C) => E(C.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(mt, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: u, onChange: (C) => I(C.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !s.trim(),
        onClick: () => n({
          name: s.trim(),
          cat: d,
          area: r.trim(),
          link: N.trim(),
          memo: u.trim(),
          lat: p ? p.lat : void 0,
          lng: p ? p.lng : void 0,
          placeId: p && p.placeId ? p.placeId : void 0
        }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: i, label: "이 장소 삭제" })
  ] });
}
function vi({ settings: e, me: a, defaultDay: n, initial: i, onSave: s, onDelete: g }) {
  let { members: d, days: c, start: r, rate: x } = e, [N, E] = j(i?.title || ""), [u, I] = j(i ? String(Number(i.amount) || "") : ""), [p, k] = j(i && d.includes(i.payer) ? i.payer : a), [w, v] = j(i?.cat || "식비"), [M, m] = j(i ? Math.min(i.day, c - 1) : n), [l, A] = j(i ? (i.split || []).filter((D) => d.includes(D)) : d), z = Number(u) || 0, C = i ? [i.payer, ...i.split || []].filter((D, y, L) => D && !d.includes(D) && L.indexOf(D) === y) : [], f = (D) => A(l.includes(D) ? l.filter((y) => y !== D) : [...l, D]), B = N.trim() && z > 0 && l.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(mt, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: N, onChange: (D) => E(D.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(mt, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: u, onChange: (D) => I(D.target.value), placeholder: "0" }) }),
    z > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ t("b", { children: Yt(z, x) }),
      /* @__PURE__ */ t("br", {}),
      Ce(e)
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint", children: Ce(e) }),
    C.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      C.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: d.map((D) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (p === D ? " on" : ""), onClick: () => k(D), children: D }, D)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: d.map((D) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (l.includes(D) ? " on" : ""), onClick: () => f(D), children: [
        l.includes(D) && /* @__PURE__ */ t(cn, { size: 14 }),
        D
      ] }, D)) }),
      z > 0 && l.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        it(z / l.length)
      ] }),
      l.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: gn.map((D) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (w === D ? " on" : ""), onClick: () => v(D), children: D }, D)) })
    ] }),
    /* @__PURE__ */ t(mt, { label: "날짜", children: /* @__PURE__ */ t("select", { value: M, onChange: (D) => m(Number(D.target.value)), children: Array.from({ length: c }, (D, y) => {
      let L = ft(r, y);
      return /* @__PURE__ */ o("option", { value: y, children: [
        y + 1,
        "일차 ",
        $t(L),
        " (",
        Mt(L),
        ")"
      ] }, y);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !B,
        onClick: () => s({ title: N.trim(), amount: z, payer: p, cat: w, day: M, split: l }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(St, { onConfirm: g, label: "이 경비 삭제" })
  ] });
}
var xt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, kn = 16;
function ea(e) {
  return e === 0 ? { Icon: To, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: Bo, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: Oa, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: Lo, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: _o, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: Oo, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: Uo, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: Ko, label: "뇌우", tone: "#7B5FC4" } : { Icon: Oa, label: "흐림", tone: "#66718A" };
}
var Wt = (e) => e == null ? "–" : Math.round(e) + "°", Qa = /* @__PURE__ */ new Map();
async function tn(e) {
  let a = Qa.get(e);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(e);
  if (!n.ok) throw new Error("weather " + n.status);
  let i = await n.json();
  return Qa.set(e, { at: Date.now(), d: i }), i;
}
var en = (e, a) => {
  let n = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + a}-${n}`;
};
function wi(e, a) {
  let [n, i] = j({ status: "loading" });
  return K(() => {
    let s = !0, g = async () => {
      try {
        let c = `latitude=${xt.lat}&longitude=${xt.lng}&timezone=Asia%2FTokyo`, r = dt(/* @__PURE__ */ new Date()), x = dt(ft(r, kn - 1)), N = Array.from({ length: a }, (v, M) => dt(ft(e, M))), E = N.filter((v) => v >= r && v <= x), u = {}, I = {};
        if (E.length) {
          let v = await tn(
            `https://api.open-meteo.com/v1/forecast?${c}&start_date=${E[0]}&end_date=${E[E.length - 1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
          );
          v.daily.time.forEach((M, m) => {
            u[M] = {
              code: v.daily.weather_code[m],
              max: v.daily.temperature_2m_max[m],
              min: v.daily.temperature_2m_min[m],
              pop: v.daily.precipitation_probability_max[m],
              sum: v.daily.precipitation_sum[m]
            };
          }), v.hourly.time.forEach((M, m) => {
            I[M.slice(0, 13)] = {
              t: v.hourly.temperature_2m[m],
              pop: v.hourly.precipitation_probability[m],
              code: v.hourly.weather_code[m]
            };
          });
        }
        let p = N.filter((v) => !u[v] && v > r), k = {};
        if (p.length) {
          let v = await Promise.all(
            [1, 2, 3].map(
              (m) => tn(
                `https://archive-api.open-meteo.com/v1/archive?${c}&start_date=${en(p[0], -m)}&end_date=${en(p[p.length - 1], -m)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), M = {};
          v.filter(Boolean).forEach(
            (m) => m.daily.time.forEach((l, A) => {
              let z = m.daily.temperature_2m_max[A];
              if (z == null) return;
              let C = l.slice(5), f = M[C] || (M[C] = { max: 0, min: 0, wet: 0, n: 0 });
              f.max += z, f.min += m.daily.temperature_2m_min[A], f.wet += (m.daily.precipitation_sum[A] || 0) >= 1 ? 1 : 0, f.n++;
            })
          ), p.forEach((m) => {
            let l = M[m.slice(5) === "02-29" ? "02-28" : m.slice(5)];
            l && l.n && (k[m] = { max: l.max / l.n, min: l.min / l.n, wet: l.wet, n: l.n });
          });
        }
        let w = /* @__PURE__ */ new Date();
        s && i({ status: "ok", daily: u, hourly: I, climate: k, at: w, stale: !1 });
        try {
          window.storage.set("wx", JSON.stringify({ daily: u, hourly: I, climate: k, at: w.getTime() }), !1);
        } catch {
        }
      } catch {
        s && i((r) => r.status === "ok" ? { ...r, stale: !0 } : { status: "error" });
      }
    };
    (async () => {
      try {
        let c = await window.storage.get("wx", !1), r = c && c.value ? JSON.parse(c.value) : null;
