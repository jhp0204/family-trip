/* @__PURE__ */ t(No, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ t("span", { className: "jt-keylock-val", children: M(A) }),
          z === "locked" && /* @__PURE__ */ t(li, { onDone: () => C("warn"), className: "sm", children: "길게 눌러 변경" })
        ] }),
        z === "warn" && /* @__PURE__ */ o("div", { className: "jt-keywarn", role: "alert", children: [
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
            /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => C("locked"), children: "취소" }),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  C("edit"), setTimeout(() => v.current && v.current.focus(), 50);
                },
                children: "확인했어요, 변경할게요"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: z === "edit" ? "고친 뒤 아래 '설정 저장'을 눌러야 적용돼요." : "실수로 바뀌지 않도록 잠겨 있어요. 한 명만 넣으면 가족 모두에게 적용돼요." }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-primary",
          disabled: !k,
          onClick: () => a({ title: i.trim(), start: g, days: p, members: x, rate: N || 900, gmapsKey: A }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(si, {})
    ] })
  ] });
}
function si() {
  let [e, a] = y(""), n = Pa();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: n });
          return;
        } catch (r) {
          if (r && r.name === "AbortError") return;
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && $a();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function jn({ onBack: e, label: a = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-back", onClick: e, "aria-label": a, children: [
    /* @__PURE__ */ t(ln, { size: 22 }),
    a
  ] }) });
}
function li({ ms: e = 1e3, onDone: a, children: n, className: i = "" }) {
  let [r, g] = y(!1), u = J(null), p = (x) => {
    x.preventDefault(), g(!0), clearTimeout(u.current), u.current = setTimeout(() => {
      g(!1), navigator.vibrate && navigator.vibrate(20), a();
    }, e);
  }, l = () => {
    clearTimeout(u.current), g(!1);
  };
  return W(() => () => clearTimeout(u.current), []), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-presshold " + i + (r ? " pressing" : ""),
      style: { "--hold": e + "ms" },
      onPointerDown: p,
      onPointerUp: l,
      onPointerLeave: l,
      onPointerCancel: l,
      onContextMenu: (x) => x.preventDefault(),
      onKeyDown: (x) => (x.key === "Enter" || x.key === " ") && !x.repeat && p(x),
      onKeyUp: l,
      children: [
        /* @__PURE__ */ t("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-presshold-label", children: n })
      ]
    }
  );
}
function ci() {
  let [e, a] = y(() => typeof navigator > "u" ? !0 : navigator.onLine !== !1), [n, i] = y(!1), [r, g] = y(!1);
  return W(() => {
    let u, p = () => {
      a(!0), g(!1), i(!0), clearTimeout(u), u = setTimeout(() => i(!1), 3e3);
    }, l = () => {
      a(!1), i(!1);
    };
    return window.addEventListener("online", p), window.addEventListener("offline", l), () => {
      window.removeEventListener("online", p), window.removeEventListener("offline", l), clearTimeout(u);
    };
  }, []), e && !n ? null : e ? /* @__PURE__ */ o("div", { className: "jt-netbar on", role: "status", children: [
    /* @__PURE__ */ t(zo, { size: 15, "aria-hidden": "true" }),
    "다시 연결됐어요. 저장해 둔 내용을 올리고 있어요."
  ] }) : /* @__PURE__ */ o("div", { className: "jt-netbar", role: "alert", children: [
    /* @__PURE__ */ o("button", { type: "button", className: "jt-netbar-head", onClick: () => g(!r), "aria-expanded": r, children: [
      /* @__PURE__ */ t(Co, { size: 15, "aria-hidden": "true" }),
      /* @__PURE__ */ t("span", { children: "오프라인 상태예요. 입력한 내용은 연결되면 자동으로 올라가요." }),
      /* @__PURE__ */ t(kt, { size: 16, className: "jt-fold-ic", "aria-hidden": "true" })
    ] }),
    r && /* @__PURE__ */ o("div", { className: "jt-netbar-body", children: [
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
function pi({ members: e, onPick: a, current: n, onBack: i }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(jn, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((r) => /* @__PURE__ */ o("button", { className: "jt-who-btn" + (r === n ? " on" : ""), onClick: () => a(r), children: [
      /* @__PURE__ */ t(lt, { name: r, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: r }),
      r === n && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, r)) })
  ] });
}
function di({ initial: e, preset: a, gkey: n, dayItems: i = [], onSave: r, onDelete: g }) {
  let [u, p] = y(e?.time || a?.time || ""), [l, x] = y(e?.end || a?.end || ""), [w, N] = y(e?.link || ""), [d, A] = y(e && ut(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [h, z] = y([]), [C, v] = y(!1), [M, c] = y(""), [s, E] = y(e?.title || ""), [k, S] = y(e?.place || ""), [m, T] = y(e?.memo || ""), [D, j] = y(!1), L = ($) => {
    if (E($), !u || D) {
      let I = Jo($);
      I ? (p(I), j(!0)) : D && (p(""), j(!1));
    }
  }, f = async () => {
    let $ = (k || s).trim();
    if (!$) {
      c("장소 이름을 먼저 적어 주세요.");
      return;
    }
    v(!0), c(""), z([]);
    try {
      let I = await Nn($, n);
      z(I), I.length || c("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      c("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    v(!1);
  }, U = u && l && Dt(l) <= Dt(u), Y = u ? i.filter(($) => {
    if (!$.time) return !1;
    let I = ce({ time: u, end: U ? "" : l }), X = ce($);
    return I.s < X.e && X.s < I.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(st, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: s, onChange: ($) => L($.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    D && u && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      u,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          Ka,
          {
            label: "시작",
            value: u,
            onChange: ($) => {
              p($), j(!1), $ || x("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(Ka, { label: "끝", value: l, onChange: x, disabled: !u })
      ] })
    ] }),
    u && !l && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    U && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    u && l && !U && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      fn(Dt(l) - Dt(u)),
      " 동안"
    ] }),
    Y.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      Y.map(($) => `'${$.title}'(${$.time}${$.end ? `~${$.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: k,
            onChange: ($) => S($.target.value),
            onKeyDown: ($) => $.key === "Enter" && !$.nativeEvent.isComposing && f(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: f, disabled: C, children: C ? "찾는 중" : "검색" })
      ] })
    ] }),
    M && /* @__PURE__ */ t("p", { className: "jt-hint", children: M }),
    h.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: h.map(($, I) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          S($.name), A({ lat: $.lat, lng: $.lng, placeId: $.placeId }), $.link && N($.link), z([]), c("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: $.name }),
          /* @__PURE__ */ t("span", { children: $.area })
        ]
      }
    ) }, I)) }),
    d && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(It, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t({ title: s, place: k, link: w, ...d }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Rt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => A(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(st, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: w, onChange: ($) => N($.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(st, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: m, onChange: ($) => T($.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !s.trim() || U,
        onClick: () => r({
          time: u,
          end: u ? l : "",
          title: s.trim(),
          place: k.trim(),
          memo: m.trim(),
          link: w.trim(),
          lat: d ? d.lat : void 0,
          lng: d ? d.lng : void 0,
          placeId: d && d.placeId ? d.placeId : void 0
        }),
        children: e ? "수정 저장" : "일정 추가"
      }
    ),
    e && /* @__PURE__ */ t(Et, { onConfirm: g, label: "이 일정 삭제" })
  ] });
}
function mi({ initial: e, onSave: a, onDelete: n }) {
  let [i, r] = y(e?.name || ""), [g, u] = y(e?.cat || "맛집"), [p, l] = y(e?.area || ""), [x, w] = y(e?.link || ""), [N, d] = y(e?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(st, { label: "이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (A) => r(A.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: ia.map((A) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (g === A ? " on" : ""), onClick: () => u(A), children: A }, A)) })
    ] }),
    /* @__PURE__ */ t(st, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: p, onChange: (A) => l(A.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(st, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: x,
        onChange: (A) => w(A.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(st, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: N, onChange: (A) => d(A.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim(),
        onClick: () => a({ name: i.trim(), cat: g, area: p.trim(), link: x.trim(), memo: N.trim() }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(Et, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function ui({ settings: e, me: a, defaultDay: n, initial: i, onSave: r, onDelete: g }) {
  let { members: u, days: p, start: l, rate: x } = e, [w, N] = y(i?.title || ""), [d, A] = y(i ? String(Number(i.amount) || "") : ""), [h, z] = y(i && u.includes(i.payer) ? i.payer : a), [C, v] = y(i?.cat || "식비"), [M, c] = y(i ? Math.min(i.day, p - 1) : n), [s, E] = y(i ? (i.split || []).filter((D) => u.includes(D)) : u), k = Number(d) || 0, S = i ? [i.payer, ...i.split || []].filter((D, j, L) => D && !u.includes(D) && L.indexOf(D) === j) : [], m = (D) => E(s.includes(D) ? s.filter((j) => j !== D) : [...s, D]), T = w.trim() && k > 0 && s.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(st, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: w, onChange: (D) => N(D.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(st, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: d, onChange: (D) => A(D.target.value), placeholder: "0" }) }),
    k > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ t("b", { children: Ht(k, x) }),
      /* @__PURE__ */ t("br", {}),
      Ce(e)
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint", children: Ce(e) }),
    S.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      S.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: u.map((D) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (h === D ? " on" : ""), onClick: () => z(D), children: D }, D)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: u.map((D) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (s.includes(D) ? " on" : ""), onClick: () => m(D), children: [
        s.includes(D) && /* @__PURE__ */ t(rn, { size: 14 }),
        D
      ] }, D)) }),
      k > 0 && s.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        nt(k / s.length)
      ] }),
      s.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: mn.map((D) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (C === D ? " on" : ""), onClick: () => v(D), children: D }, D)) })
    ] }),
    /* @__PURE__ */ t(st, { label: "날짜", children: /* @__PURE__ */ t("select", { value: M, onChange: (D) => c(Number(D.target.value)), children: Array.from({ length: p }, (D, j) => {
      let L = mt(l, j);
      return /* @__PURE__ */ o("option", { value: j, children: [
        j + 1,
        "일차 ",
        Pt(L),
        " (",
        zt(L),
        ")"
      ] }, j);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !T,
        onClick: () => r({ title: w.trim(), amount: k, payer: h, cat: C, day: M, split: s }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(Et, { onConfirm: g, label: "이 경비 삭제" })
  ] });
}
var ht = { name: "오사카", lat: 34.6937, lng: 135.5023 }, yn = 16;
function ta(e) {
  return e === 0 ? { Icon: Po, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: $o, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: _a, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: Ro, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: To, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: Bo, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: Lo, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: _o, label: "뇌우", tone: "#7B5FC4" } : { Icon: _a, label: "흐림", tone: "#66718A" };
}
var Kt = (e) => e == null ? "–" : Math.round(e) + "°", Ga = /* @__PURE__ */ new Map();
async function qa(e) {
  let a = Ga.get(e);
  if (a && Date.now() - a.at < 30 * 6e4) return a.d;
  let n = await fetch(e);
  if (!n.ok) throw new Error("weather " + n.status);
  let i = await n.json();
  return Ga.set(e, { at: Date.now(), d: i }), i;
}
var Za = (e, a) => {
  let n = e.slice(5) === "02-29" ? "02-28" : e.slice(5);
  return `${Number(e.slice(0, 4)) + a}-${n}`;
};
function fi(e, a) {
  let [n, i] = y({ status: "loading" });
  return W(() => {
    let r = !0, g = async () => {
      try {
        let p = `latitude=${ht.lat}&longitude=${ht.lng}&timezone=Asia%2FTokyo`, l = ct(/* @__PURE__ */ new Date()), x = ct(mt(l, yn - 1)), w = Array.from({ length: a }, (v, M) => ct(mt(e, M))), N = w.filter((v) => v >= l && v <= x), d = {}, A = {};
        if (N.length) {
          let v = await qa(
            `https://api.open-meteo.com/v1/forecast?${p}&start_date=${N[0]}&end_date=${N[N.length - 1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
          );
          v.daily.time.forEach((M, c) => {
            d[M] = {
              code: v.daily.weather_code[c],
              max: v.daily.temperature_2m_max[c],
              min: v.daily.temperature_2m_min[c],
              pop: v.daily.precipitation_probability_max[c],
              sum: v.daily.precipitation_sum[c]
            };
          }), v.hourly.time.forEach((M, c) => {
            A[M.slice(0, 13)] = {
              t: v.hourly.temperature_2m[c],
              pop: v.hourly.precipitation_probability[c],
              code: v.hourly.weather_code[c]
            };
          });
        }
        let h = w.filter((v) => !d[v] && v > l), z = {};
        if (h.length) {
          let v = await Promise.all(
            [1, 2, 3].map(
              (c) => qa(
                `https://archive-api.open-meteo.com/v1/archive?${p}&start_date=${Za(h[0], -c)}&end_date=${Za(h[h.length - 1], -c)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
              ).catch(() => null)
            )
          ), M = {};
          v.filter(Boolean).forEach(
            (c) => c.daily.time.forEach((s, E) => {
              let k = c.daily.temperature_2m_max[E];
              if (k == null) return;
              let S = s.slice(5), m = M[S] || (M[S] = { max: 0, min: 0, wet: 0, n: 0 });
              m.max += k, m.min += c.daily.temperature_2m_min[E], m.wet += (c.daily.precipitation_sum[E] || 0) >= 1 ? 1 : 0, m.n++;
            })
          ), h.forEach((c) => {
            let s = M[c.slice(5) === "02-29" ? "02-28" : c.slice(5)];
            s && s.n && (z[c] = { max: s.max / s.n, min: s.min / s.n, wet: s.wet, n: s.n });
          });
        }
        let C = /* @__PURE__ */ new Date();
        r && i({ status: "ok", daily: d, hourly: A, climate: z, at: C, stale: !1 });
        try {
          window.storage.set("wx", JSON.stringify({ daily: d, hourly: A, climate: z, at: C.getTime() }), !1);
        } catch {
        }
      } catch {
        r && i((l) => l.status === "ok" ? { ...l, stale: !0 } : { status: "error" });
      }
    };
    (async () => {
      try {
        let p = await window.storage.get("wx", !1), l = p && p.value ? JSON.parse(p.value) : null;
        r && l && l.daily && i(
          (x) => x.status === "ok" && !x.stale ? x : { status: "ok", daily: l.daily, hourly: l.hourly || {}, climate: l.climate || {}, at: new Date(l.at), stale: !0 }
        );
      } catch {
      }
    })(), g();
    let u = setInterval(g, 30 * 6e4);
    return () => {
      r = !1, clearInterval(u);
    };
  }, [e, a]), n;
}
function gi({ date: e, w: a }) {
  let n = /* @__PURE__ */ o("div", { className: "jt-wx-head", children: [
    /* @__PURE__ */ o("span", { children: [
      ht.name,
      " 날씨"
    ] }),
    a.status === "ok" && (a.daily[e] || a.climate[e]) && /* @__PURE__ */ t("em", { className: a.stale ? "jt-wx-stale" : "", children: a.stale ? `${Pt(a.at)} ${at(a.at.getHours())}:${at(a.at.getMinutes())} 기준, 마지막으로 받은 날씨` : `${at(a.at.getHours())}:${at(a.at.getMinutes())} 업데이트` })
  ] });
  if (a.status === "loading")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오는 중" })
    ] });
  if (a.status === "error")
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "날씨를 불러오지 못했어요. 인터넷에 연결되면 다시 보여요." })
    ] });
  let i = a.daily[e];
  if (i) {
    let { Icon: g, label: u, tone: p } = ta(i.code), l = (i.pop || 0) >= 50 || (i.sum || 0) >= 1, x = ["09", "12", "15", "18", "21"].map((w) => ({ h: w, v: a.hourly[`${e}T${w}`] })).filter((w) => w.v);
    return /* @__PURE__ */ o("div", { className: "jt-wx", children: [
      n,
      /* @__PURE__ */ o("div", { className: "jt-wx-main", children: [
        /* @__PURE__ */ t(g, { size: 40, color: p, strokeWidth: 1.8, "aria-hidden": "true" }),
        /* @__PURE__ */ o("div", { className: "jt-wx-temp", children: [
          /* @__PURE__ */ t("strong", { children: u }),
          /* @__PURE__ */ o("span", { children: [
            "최고 ",
            /* @__PURE__ */ t("b", { children: Kt(i.max) }),
            " 최저 ",
            /* @__PURE__ */ t("b", { children: Kt(i.min) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "jt-wx-rain", children: [
          /* @__PURE__ */ t(Oo, { size: 15, "aria-hidden": "true" }),
          i.pop == null ? "–" : i.pop + "%"
        ] })
      ] }),
      l && /* @__PURE__ */ t("p", { className: "jt-wx-tip", children: "비 소식이 있어요. 우산을 챙기세요." }),
      x.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-wx-hours", children: x.map(({ h: w, v: N }) => {
        let d = ta(N.code);
        return /* @__PURE__ */ o("li", { children: [
          /* @__PURE__ */ o("span", { children: [
            w,
            "시"
          ] }),
          /* @__PURE__ */ t(d.Icon, { size: 18, color: d.tone, "aria-label": d.label }),
          /* @__PURE__ */ t("b", { children: Kt(N.t) }),
          /* @__PURE__ */ t("em", { children: N.pop == null ? "" : N.pop + "%" })
        ] }, w);
      }) })
    ] });
  }
  let r = a.climate[e];
  return r ? /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ o("p", { className: "jt-wx-msg", children: [
      "예보는 ",
      yn,
      "일 전부터 나와요. 최근 ",
      r.n,
      "년 같은 날 ",
      ht.name,
      "는 평균 최고 ",
      /* @__PURE__ */ t("b", { children: Kt(r.max) }),
      ", 최저",
      " ",
      /* @__PURE__ */ t("b", { children: Kt(r.min) }),
      "였고, ",
      r.n,
      "번 중 ",
      r.wet,
      "번 비가 왔어요."
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "jt-wx", children: [
    n,
    /* @__PURE__ */ t("p", { className: "jt-wx-msg", children: "지난 날짜라 예보가 없어요." })
  ] });
}
function bi({ v: e }) {
  if (!e) return null;
  let { Icon: a, label: n, tone: i } = ta(e.code);
  return /* @__PURE__ */ o("span", { className: "jt-wxchip", title: n, children: [
    /* @__PURE__ */ t(a, { size: 14, color: i, "aria-hidden": "true" }),
    Kt(e.t),
    e.pop != null && e.pop >= 30 && /* @__PURE__ */ o("em", { children: [
      "비 ",
      e.pop,
      "%"
    ] })
  ] });
}
var ve = 56;
function hi({ items: e, isToday: a, onEdit: n, members: i, onAddAt: r }) {
  let [g, u] = y(null), [p, l] = y(() => {
    let s = /* @__PURE__ */ new Date();
    return s.getHours() * 60 + s.getMinutes();
  });
  W(() => {
    if (!a) return;
    let s = setInterval(() => {
      let E = /* @__PURE__ */ new Date();
      l(E.getHours() * 60 + E.getMinutes());
    }, 6e4);
    return () => clearInterval(s);
  }, [a]);
  let x = e.filter((s) => s.time).map((s) => ({ ...s, ...ce(s) })).sort((s, E) => s.s - E.s || s.e - E.e), w = [], N = [], d = -1;
  x.forEach((s) => {
    N.length && s.s >= d && (w.push(N), N = [], d = -1), N.push(s), d = Math.max(d, s.e);
  }), N.length && w.push(N);
  let A = [];
  w.forEach((s) => {
    let E = [];
    s.forEach((k) => {
      let S = E.findIndex((m) => m <= k.s);
      S === -1 ? (S = E.length, E.push(k.e)) : E[S] = k.e, A.push({ ...k, col: S, cl: s });
    }), s.ncol = E.length;
  });
  let h = x.length ? Math.min(8, Math.floor(x[0].s / 60)) : 8, z = x.length ? Math.max(21, Math.ceil(Math.max(...x.map((s) => s.e)) / 60)) : 21, C = (s) => {
    let E = s.currentTarget.getBoundingClientRect(), k = h * 60 + (s.clientY - E.top) / ve * 60;
    return Math.max(h * 60, Math.min(Math.floor(k / 30) * 30, z * 60 - 30, 23 * 60 + 30));
