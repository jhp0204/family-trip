children: [
        /* @__PURE__ */ e(No, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Se({ comments: t = [], me: n, members: o, onAdd: i, onDelete: s }) {
  let [m, u] = y(""), p = () => {
    let l = m.trim();
    l && (i(l), u(""));
  };
  return /* @__PURE__ */ a("div", { className: "jt-comments", onClick: (l) => l.stopPropagation(), onKeyDown: (l) => l.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((l) => /* @__PURE__ */ a("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(ct, { name: l.by, members: o, size: 24 }),
      /* @__PURE__ */ a("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ e("strong", { children: l.by }),
          /* @__PURE__ */ e("span", { children: ke(l.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: l.text })
      ] }),
      l.by === n && /* @__PURE__ */ e(It, { onConfirm: () => s(l.id), label: "" })
    ] }, l.id)) }),
    /* @__PURE__ */ a("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: m,
          onChange: (l) => u(l.target.value),
          onKeyDown: (l) => l.key === "Enter" && !l.nativeEvent.isComposing && p(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: p, disabled: !m.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(ua, { size: 18 }) })
    ] })
  ] });
}
function ji({ initial: t, onSave: n, onCancel: o }) {
  let [i, s] = y(t?.title || "가족 일본여행"), [m, u] = y(t?.start || pt(new Date(Date.now() + 30 * 864e5))), [p, l] = y(t?.days || 4), [h, k] = y(t?.members || []), [z, d] = y(t?.rate || 900), [I, g] = y(t?.gmapsKey || ""), [S, j] = y("locked"), N = G(null), E = (c) => c ? c.length > 10 ? c.slice(0, 4) + "••••••••" + c.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [C, b] = y(""), M = () => {
    let c = C.trim();
    !c || h.includes(c) || (k([...h, c]), b(""));
  }, A = i.trim() && m && h.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    o && /* @__PURE__ */ e(Ca, { onBack: o }),
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ a("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(gt, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: i, onChange: (c) => s(c.target.value) }) }),
      /* @__PURE__ */ e(gt, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: m, onChange: (c) => u(c.target.value) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ a("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => l(Math.max(1, p - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ a("strong", { children: [
            p,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => l(Math.min(30, p + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: h.map((c) => /* @__PURE__ */ a("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(ct, { name: c, members: h, size: 20 }),
          c,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => k(h.filter((r) => r !== c)), "aria-label": `${c} 빼기`, children: /* @__PURE__ */ e(Jt, { size: 14 }) })
        ] }, c)) }),
        /* @__PURE__ */ a("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: C,
              onChange: (c) => b(c.target.value),
              onKeyDown: (c) => c.key === "Enter" && M(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: M, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(gt, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: z, onChange: (c) => d(Number(c.target.value) || 0) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "구글 지도 API 키 (선택)" }),
        S === "edit" ? /* @__PURE__ */ e(
          "input",
          {
            ref: N,
            value: I,
            onChange: (c) => g(c.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ a("div", { className: "jt-keylock", children: [
          /* @__PURE__ */ e(Io, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ e("span", { className: "jt-keylock-val", children: E(I) }),
          S === "locked" && /* @__PURE__ */ e(vi, { onDone: () => j("warn"), className: "sm", children: "길게 눌러 변경" })
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
            /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => j("locked"), children: "취소" }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  j("edit"), setTimeout(() => N.current && N.current.focus(), 50);
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
          disabled: !A,
          onClick: () => n({ title: i.trim(), start: m, days: p, members: h, rate: z || 900, gmapsKey: I }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      o && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: o, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(yi, {})
    ] })
  ] });
}
function yi() {
  let [t, n] = y(""), o = Bn();
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && Ln();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Ca({ onBack: t, label: n = "돌아가기" }) {
  return /* @__PURE__ */ e("div", { className: "jt-backbar", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-back", onClick: t, "aria-label": n, children: [
    /* @__PURE__ */ e(ga, { size: 22 }),
    n
  ] }) });
}
function vi({ ms: t = 1e3, onDone: n, children: o, className: i = "" }) {
  let [s, m] = y(!1), u = G(null), p = (h) => {
    h.preventDefault(), m(!0), clearTimeout(u.current), u.current = setTimeout(() => {
      m(!1), navigator.vibrate && navigator.vibrate(20), n();
    }, t);
  }, l = () => {
    clearTimeout(u.current), m(!1);
  };
  return U(() => () => clearTimeout(u.current), []), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-presshold " + i + (s ? " pressing" : ""),
      style: { "--hold": t + "ms" },
      onPointerDown: p,
      onPointerUp: l,
      onPointerLeave: l,
      onPointerCancel: l,
      onContextMenu: (h) => h.preventDefault(),
      onKeyDown: (h) => (h.key === "Enter" || h.key === " ") && !h.repeat && p(h),
      onKeyUp: l,
      children: [
        /* @__PURE__ */ e("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ e("span", { className: "jt-presshold-label", children: o })
      ]
    }
  );
}
function wi() {
  let [t, n] = y(() => typeof navigator > "u" ? !0 : navigator.onLine !== !1), [o, i] = y(!1), [s, m] = y(!1);
  return U(() => {
    let u, p = () => {
      n(!0), m(!1), i(!0), clearTimeout(u), u = setTimeout(() => i(!1), 3e3);
    }, l = () => {
      n(!1), i(!1);
    };
    return window.addEventListener("online", p), window.addEventListener("offline", l), () => {
      window.removeEventListener("online", p), window.removeEventListener("offline", l), clearTimeout(u);
    };
  }, []), t && !o ? null : t ? /* @__PURE__ */ a("div", { className: "jt-netbar on", role: "status", children: [
    /* @__PURE__ */ e(Do, { size: 15, "aria-hidden": "true" }),
    "다시 연결됐어요. 저장해 둔 내용을 올리고 있어요."
  ] }) : /* @__PURE__ */ a("div", { className: "jt-netbar", role: "alert", children: [
    /* @__PURE__ */ a("button", { type: "button", className: "jt-netbar-head", onClick: () => m(!s), "aria-expanded": s, children: [
      /* @__PURE__ */ e(Fo, { size: 15, "aria-hidden": "true" }),
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
function ki({ members: t, onPick: n, current: o, onBack: i }) {
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ e(Ca, { onBack: i }),
    /* @__PURE__ */ e("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((s) => /* @__PURE__ */ a("button", { className: "jt-who-btn" + (s === o ? " on" : ""), onClick: () => n(s), children: [
      /* @__PURE__ */ e(ct, { name: s, members: t, size: 40 }),
      /* @__PURE__ */ e("span", { className: "jt-who-name", children: s }),
      s === o && /* @__PURE__ */ e("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, s)) })
  ] });
}
function Ni({ initial: t, preset: n, gkey: o, dayItems: i = [], onSave: s, onDelete: m }) {
  let [u, p] = y(t?.time || n?.time || ""), [l, h] = y(t?.end || n?.end || ""), [k, z] = y(t?.link || ""), [d, I] = y(t && at(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [g, S] = y([]), [j, N] = y(!1), [E, C] = y(""), [b, M] = y(t?.title || ""), [A, c] = y(t?.place || ""), [r, D] = y(t?.memo || ""), [_, w] = y(!1), B = ($) => {
    if (M($), !u || _) {
      let f = ti($);
      f ? (p(f), w(!0)) : _ && (p(""), w(!1));
    }
  }, v = async () => {
    let $ = (A || b).trim();
    if (!$) {
      C("장소 이름을 먼저 적어 주세요.");
      return;
    }
    N(!0), C(""), S([]);
    try {
      let f = await un($, o);
      S(f), f.length || C("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      C("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    N(!1);
  }, O = u && l && Pt(l) <= Pt(u), J = u ? i.filter(($) => {
    if (!$.time) return !1;
    let f = pe({ time: u, end: O ? "" : l }), H = pe($);
    return f.s < H.e && H.s < f.e;
  }) : [];
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(gt, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: b, onChange: ($) => B($.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    _ && u && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      "제목에서 ",
      u,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-two", children: [
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          Jn,
          {
            label: "시작",
            value: u,
            onChange: ($) => {
              p($), w(!1), $ || h("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(Jn, { label: "끝", value: l, onChange: h, disabled: !u })
      ] })
    ] }),
    u && !l && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    O && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    u && l && !O && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      ya(Pt(l) - Pt(u)),
      " 동안"
    ] }),
    J.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      J.map(($) => `'${$.title}'(${$.time}${$.end ? `~${$.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: A,
            onChange: ($) => c($.target.value),
            onKeyDown: ($) => $.key === "Enter" && !$.nativeEvent.isComposing && v(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: v, disabled: j, children: j ? "찾는 중" : "검색" })
      ] })
    ] }),
    E && /* @__PURE__ */ e("p", { className: "jt-hint", children: E }),
    g.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: g.map(($, f) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          c($.name), I({ lat: $.lat, lng: $.lng, placeId: $.placeId }), $.link && z($.link), S([]), C("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: $.name }),
          /* @__PURE__ */ e("span", { children: $.area })
        ]
      }
    ) }, f)) }),
    d && /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(Et, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ a("a", { className: "jt-maplink", href: $t({ title: b, place: A, link: k, ...d }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Tt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => I(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ e(gt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e("input", { type: "url", value: k, onChange: ($) => z($.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ e(gt, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: r, onChange: ($) => D($.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !b.trim() || O,
        onClick: () => s({
          time: u,
          end: u ? l : "",
          title: b.trim(),
          place: A.trim(),
          memo: r.trim(),
          link: k.trim(),
          lat: d ? d.lat : void 0,
          lng: d ? d.lng : void 0,
          placeId: d && d.placeId ? d.placeId : void 0
        }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(It, { onConfirm: m, label: "이 일정 삭제" })
  ] });
}
function Ci({ initial: t, gkey: n, onSave: o, onDelete: i }) {
  let [s, m] = y(t?.name || ""), [u, p] = y(t?.cat || "맛집"), [l, h] = y(t?.area || ""), [k, z] = y(t?.link || ""), [d, I] = y(t?.memo || ""), [g, S] = y(t && at(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [j, N] = y([]), [E, C] = y(!1), [b, M] = y(""), A = async () => {
    let c = [s, l].filter((r) => r && r.trim()).join(" ").trim();
    if (!c) {
      M("이름을 먼저 적어 주세요.");
      return;
    }
    C(!0), M(""), N([]);
    try {
      let r = await un(c, n);
      N(r), r.length || M("검색 결과가 없어요. 이름을 조금 바꾸거나 영어, 일본어로 적어 보세요.");
    } catch {
      M("검색을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.");
    }
    C(!1);
  };
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "이름" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: s,
            onChange: (c) => m(c.target.value),
            onKeyDown: (c) => c.key === "Enter" && !c.nativeEvent.isComposing && A(),
            placeholder: "예: 이치란 도톤보리",
            "aria-label": "이름"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: A, disabled: E, children: E ? "찾는 중" : "위치 검색" })
      ] })
    ] }),
    b && /* @__PURE__ */ e("p", { className: "jt-hint", children: b }),
    j.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: j.map((c, r) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          S({ lat: c.lat, lng: c.lng, placeId: c.placeId }), s.trim() || m(c.name), !l.trim() && c.area && h(c.area.split(" ").slice(0, 3).join(" ")), !k.trim() && c.link && z(c.link), N([]), M("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: c.name }),
          /* @__PURE__ */ e("span", { children: c.area })
        ]
      }
    ) }, r)) }),
    g ? /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(Et, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요. 거리 표시와 지도에 나와요." }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => S(null), children: "연결 해제" })
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint jt-nopos", children: '지도 위치가 없어요. "위치 검색"으로 장소를 고르면 거리와 지도 핀이 표시돼요.' }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: rn.map((c) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (u === c ? " on" : ""), onClick: () => p(c), children: c }, c)) })
    ] }),
    /* @__PURE__ */ e(gt, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: l, onChange: (c) => h(c.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(gt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: k,
        onChange: (c) => z(c.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(gt, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: d, onChange: (c) => I(c.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !s.trim(),
        onClick: () => o({
          name: s.trim(),
          cat: u,
          area: l.trim(),
          link: k.trim(),
          memo: d.trim(),
          lat: g ? g.lat : void 0,
          lng: g ? g.lng : void 0,
          placeId: g && g.placeId ? g.placeId : void 0
        }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(It, { onConfirm: i, label: "이 장소 삭제" })
  ] });
}
function zi({ settings: t, me: n, defaultDay: o, initial: i, onSave: s, onDelete: m }) {
  let { members: u, days: p, start: l, rate: h } = t, [k, z] = y(i?.title || ""), [d, I] = y(i?.cur === "KRW" ? "KRW" : "JPY"), [g, S] = y(
    i ? String((i.cur === "KRW" ? Number(i.orig) : Number(i.amount)) || "") : ""
  ), [j, N] = y(i && u.includes(i.payer) ? i.payer : n), [E, C] = y(i?.cat || "식비"), [b, M] = y(i ? Math.min(i.day, p - 1) : o), [A, c] = y(i ? (i.split || []).filter((v) => u.includes(v)) : u), r = Number(g) || 0, D = d === "KRW" ? Math.round(r * 100 / h) : r, _ = i ? [i.payer, ...i.split || []].filter((v, O, J) => v && !u.includes(v) && J.indexOf(v) === O) : [], w = (v) => c(A.includes(v) ? A.filter((O) => O !== v) : [...A, v]), B = k.trim() && D > 0 && A.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(gt, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: k, onChange: (v) => z(v.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "금액" }),
      /* @__PURE__ */ a("div", { className: "jt-amt", children: [
        /* @__PURE__ */ e("div", { className: "jt-cur", role: "radiogroup", "aria-label": "통화", children: [
          ["JPY", "¥ 엔화"],
          ["KRW", "₩ 원화"]
        ].map(([v, O]) => /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": d === v,
            className: d === v ? "on" : "",
            onClick: () => {
              v !== d && (r > 0 && S(String(Math.round(v === "KRW" ? r * h / 100 : r * 100 / h))), I(v));
            },
            children: O
          },
          v
        )) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            value: g,
            onChange: (v) => S(v.target.value),
            placeholder: d === "KRW" ? "원화 금액" : "엔화 금액",
            "aria-label": d === "KRW" ? "원화 금액" : "엔화 금액"
          }
        )
      ] })
    ] }),
    r > 0 ? /* @__PURE__ */ a("p", { className: "jt-hint jt-fxhint", children: [
      d === "KRW" ? /* @__PURE__ */ a(Q, { children: [
        "약 ",
        /* @__PURE__ */ e("b", { children: dt(D) }),
        "로 정산돼요 (₩",
        r.toLocaleString("ko-KR"),
        " 입력)"
      ] }) : /* @__PURE__ */ a(Q, { children: [
        "약 ",
        /* @__PURE__ */ e("b", { children: Ht(D, h) })
      ] }),
      /* @__PURE__ */ e("br", {}),
      Ce(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: Ce(t) }),
    _.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      _.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: u.map((v) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (j === v ? " on" : ""), onClick: () => N(v), children: v }, v)) })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: u.map((v) => /* @__PURE__ */ a("button", { type: "button", className: "jt-chip" + (A.includes(v) ? " on" : ""), onClick: () => w(v), children: [
        A.includes(v) && /* @__PURE__ */ e(ma, { size: 14 }),
        v
      ] }, v)) }),
      D > 0 && A.length > 0 && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
        "1인당 ",
        d === "KRW" ? `₩${(Math.round(r / A.length / 100) * 100).toLocaleString("ko-KR")}(${dt(D / A.length)})` : ln(D / A.length)
      ] }),
      A.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: xa.map((v) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (E === v ? " on" : ""), onClick: () => C(v), children: v }, v)) })
    ] }),
    /* @__PURE__ */ e(gt, { label: "날짜", children: /* @__PURE__ */ e("select", { value: b, onChange: (v) => M(Number(v.target.value)), children: Array.from({ length: p }, (v, O) => {
      let J = ut(l, O);
      return /* @__PURE__ */ a("option", { value: O, children: [
        O + 1,
        "일차 ",
        Rt(J),
        " (",
        St(J),
        ")"
      ] }, O);
    }) }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !B,
        onClick: () => s({ title: k.trim(), amount: D, payer: j, cat: E, day: b, split: A, cur: d, orig: d === "KRW" ? r : void 0 }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ e(It, { onConfirm: m, label: "이 경비 삭제" })
  ] });
}
var xt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, za = 16;
function en(t) {
  return t === 0 ? { Icon: Oo, label: "맑음", tone: "#E8800A" } : t === 1 || t === 2 ? { Icon: Ko, label: t === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : t === 3 ? { Icon: Un, label: "흐림", tone: "#66718A" } : t === 45 || t === 48 ? { Icon: Wo, label: "안개", tone: "#66718A" } : t >= 51 && t <= 57 ? { Icon: Uo, label: "이슬비", tone: "#0C86AE" } : t >= 61 && t <= 67 || t >= 80 && t <= 82 ? { Icon: Ho, label: t >= 80 ? "소나기" : "비", tone: "#0C86AE" } : t >= 71 && t <= 77 || t === 85 || t === 86 ? { Icon: Yo, label: "눈", tone: "#7B5FC4" } : t >= 95 ? { Icon: Jo, label: "뇌우", tone: "#7B5FC4" } : { Icon: Un, label: "흐림", tone: "#66718A" };
}
var Wt = (t) => t == null ? "–" : Math.round(t) + "°", na = /* @__PURE__ */ new Map();
async function aa(t) {
  let n = na.get(t);
  if (n && Date.now() - n.at < 30 * 6e4) return n.d;
  let o = await fetch(t);
  if (!o.ok) throw new Error("weather " + o.status);
  let i = await o.json();
  return na.set(t, { at: Date.now(), d: i }), i;
}
var oa = (t, n) => {
  let o = t.slice(5) === "02-29" ? "02-28" : t.slice(5);
  return `${Number(t.slice(0, 4)) + n}-${o}`;
};
function Ei(t, n) {
  let [o, i] = y({ status: "loading" });
  return U(() => {
    let s = !0, m = async () => {
      try {
        let p = `latitude=${xt.lat}&longitude=${xt.lng}&timezone=Asia%2FTokyo`, l = pt(/* @__PURE__ */ new Date()), h = pt(ut(l, za - 1)), k = Array.from({ length: n }, (N, E) => pt(ut(t, E))), z = k.filter((N) => N >= l && N <= h), d = {}, I = {};
        if (z.length) {
          let N = await aa(
            `https://api.open-meteo.com/v1/forecast?${p}&start_date=${z[0]}&end_date=${z[z.length - 1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&hourly=temperature_2m,precipitation_probability,weather_code`
          );
          N.daily.time.forEach((E, C) => {
            d[E] = {
              code: N.daily.weather_code[C],
              max: N.daily.temperature_2m_max[C],
              min: N.daily.temperature_2m_min[C],
              pop: N.daily.precipitation_probability_max[C],
