.jt-wheel-label{fill:#fff;font-size:15px;font-weight:800;font-family:inherit;paint-order:stroke;stroke:rgba(0,0,0,.18);stroke-width:2px}
.jt-wheel-result{text-align:center;min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:14px;color:var(--muted)}
.jt-wheel-result span{font-size:12px;font-weight:800;color:#B7791F}
.jt-wheel-result strong{font-size:28px;font-weight:800;color:var(--ink);letter-spacing:-.02em}
.jt-wheel-reset{align-self:flex-start}
.jt-chip button:disabled{opacity:.4}
/* 시간표 끌어서 추가 */
.jt-tt-lane{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.jt-tt-lane.dragging{cursor:ns-resize}
.jt-tt-sel{position:absolute;left:2px;right:2px;z-index:4;border-radius:8px;background:color-mix(in srgb,var(--lc) 22%,#fff);border:2px solid var(--lc);display:flex;flex-direction:column;justify-content:center;padding:2px 10px;pointer-events:none;overflow:hidden}
.jt-tt-sel b{font-size:13px;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums}
.jt-tt-sel span{font-size:11.5px;color:#33405C}
/* 개인 경비 */
.jt-seg.four{grid-template-columns:repeat(4,1fr)}
.jt-seg.four button{font-size:12.5px;padding:9px 2px;white-space:nowrap;letter-spacing:-.03em}
.jt-pcard .jt-pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px}
.jt-pgrid div{display:flex;flex-direction:column;background:var(--paper);border-radius:12px;padding:9px 8px 8px;min-width:0}
.jt-pgrid em{font-style:normal;font-size:12px;color:var(--muted);font-weight:700}
.jt-pgrid strong{font-size:15px;margin-top:1px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.02em;overflow:hidden;text-overflow:ellipsis}
.jt-pgrid small{font-size:11.5px;color:var(--muted);font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis}
.jt-pgrid .neg strong{color:#B42318}
.jt-pline{font-size:12.5px;color:#33405C;margin-top:8px}
.jt-cashbtn{display:inline-flex;align-items:center;gap:4px;align-self:flex-start;margin-top:4px;padding:6px 2px;font-size:13px;color:#0A6A8B}
.jt-cashedit{margin-top:8px}
.jt-pshare{font-size:12.5px;color:var(--muted);margin-top:6px}
`;

// src/main.jsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{trip}/{document=**} {
      allow read, write: if trip.size() >= 12;
    }
  }
}`, reason = (e) => {
  let c = e && (e.code || e.message) || "";
  return c.includes("permission") ? "Firebase 보안 규칙이 막고 있어요. 아래 규칙을 Firestore '규칙' 탭에 붙여넣고 '게시'를 눌러 주세요." : c.includes("timeout") ? "Firebase에 연결되지 않았어요. 인터넷 연결과 Firestore 데이터베이스를 만들었는지 확인해 주세요." : c.includes("api-key") || c.includes("invalid") ? "설정값이 맞지 않아요. Firebase 콘솔에서 firebaseConfig 부분을 다시 복사해 주세요." : "연결하지 못했어요. 설정값과 인터넷 연결을 확인해 주세요. (" + c + ")";
};
function Connect({ onDone }) {
  let [mode, setMode] = useState2("join"), [cfg, setCfg] = useState2(""), [link, setLink] = useState2(""), [busy, setBusy] = useState2(!1), [msg, setMsg] = useState2(""), [copied, setCopied] = useState2(!1), start = async (config, code) => {
    setBusy(!0), setMsg("");
    try {
      connect(config, code), await ping(), rememberConn(config, code), onDone();
    } catch (e) {
      setMsg(reason(e)), setBusy(!1);
    }
  }, create = () => {
    let c = parseConfig(cfg);
    if (!c) {
      setMsg("설정값을 찾지 못했어요. apiKey, projectId, appId가 들어 있는 firebaseConfig 부분 전체를 붙여넣어 주세요.");
      return;
    }
    start(c, newCode());
  }, join = () => {
    let o = parseInvite(link);
    if (!o) {
      setMsg("초대 링크가 아니에요. 가족에게 받은 주소 전체를 붙여넣어 주세요.");
      return;
    }
    start(o.c, o.t);
  };
  return /* @__PURE__ */ jsxs2("div", { className: "jt", children: [
    /* @__PURE__ */ jsx2("style", { children: CSS }),
    /* @__PURE__ */ jsxs2("div", { className: "jt-setup", children: [
      /* @__PURE__ */ jsx2("h1", { children: "가족 여행 앱" }),
      /* @__PURE__ */ jsxs2("div", { className: "jt-seg", role: "tablist", children: [
        /* @__PURE__ */ jsx2("button", { role: "tab", "aria-selected": mode === "join", className: mode === "join" ? "on" : "", onClick: () => setMode("join"), children: "초대받았어요" }),
        /* @__PURE__ */ jsx2("button", { role: "tab", "aria-selected": mode === "new", className: mode === "new" ? "on" : "", onClick: () => setMode("new"), children: "처음 만들어요" })
      ] }),
      mode === "join" ? /* @__PURE__ */ jsxs2("div", { className: "jt-form", children: [
        /* @__PURE__ */ jsx2("p", { className: "jt-lead", children: "가족에게 받은 초대 링크를 누르면 바로 들어와요. 홈 화면 아이콘으로 열었는데 이 화면이 보이면, 초대 링크를 아래에 붙여넣어 주세요." }),
        /* @__PURE__ */ jsx2("textarea", { rows: 3, value: link, onChange: (e) => setLink(e.target.value), placeholder: "https://…#j=…", "aria-label": "초대 링크" }),
        msg && /* @__PURE__ */ jsx2("p", { className: "jt-warn-inline", children: msg }),
        /* @__PURE__ */ jsx2("button", { className: "jt-primary", disabled: busy || !link.trim(), onClick: join, children: busy ? "연결 중" : "여행에 들어가기" })
      ] }) : /* @__PURE__ */ jsxs2("div", { className: "jt-form", children: [
        /* @__PURE__ */ jsx2("p", { className: "jt-lead", children: "가족 중 한 명만 한 번 하면 돼요. Firebase 프로젝트의 웹 앱 설정값(firebaseConfig)을 붙여넣어 주세요." }),
        /* @__PURE__ */ jsx2(
          "textarea",
          {
            rows: 7,
            value: cfg,
            onChange: (e) => setCfg(e.target.value),
            placeholder: `const firebaseConfig = {
  apiKey: "…",
  authDomain: "…",
  projectId: "…",
  …
};`,
            "aria-label": "Firebase 설정값",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ jsxs2("div", { className: "jt-field", children: [
          /* @__PURE__ */ jsx2("span", { children: "Firestore 보안 규칙 (규칙 탭에 붙여넣기)" }),
          /* @__PURE__ */ jsx2("pre", { className: "jt-rules", children: RULES }),
          /* @__PURE__ */ jsx2(
            "button",
            {
              type: "button",
              className: "jt-secondary",
              onClick: async () => {
                try {
                  await navigator.clipboard.writeText(RULES), setCopied(!0);
                } catch {
                  setCopied(!1);
                }
              },
              children: copied ? "규칙을 복사했어요" : "규칙 복사"
            }
          )
        ] }),
        msg && /* @__PURE__ */ jsx2("p", { className: "jt-warn-inline", children: msg }),
        /* @__PURE__ */ jsx2("button", { className: "jt-primary", disabled: busy || !cfg.trim(), onClick: create, children: busy ? "연결 확인 중" : "연결하고 여행 만들기" })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("style", { children: ".jt-lead{font-size:14px;color:#33405C}.jt-rules{margin:0;font-size:11.5px;line-height:1.5;background:#fff;border-radius:10px;padding:10px 12px;overflow-x:auto;white-space:pre}.jt .jt-setup .jt-seg{margin-bottom:16px}" })
  ] });
}
function Root() {
  let [ready, setReady] = useState2(() => {
    let s = readSaved();
    if (!s) return !1;
    try {
      return connect(s.c, s.t), !0;
    } catch {
      return !1;
    }
  });
  return useEffect2(() => {
    "serviceWorker" in navigator && location.protocol === "https:" && navigator.serviceWorker.register("./sw.js").catch(() => {
    });
  }, []), ready ? /* @__PURE__ */ jsx2(App, {}) : /* @__PURE__ */ jsx2(Connect, { onDone: () => setReady(!0) });
}
createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx2(Root, {}));

/*jt-end*/
