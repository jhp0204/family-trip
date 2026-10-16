/* 채팅 수정, 공지 */
.jt-notice{position:sticky;top:calc(8px + env(safe-area-inset-top));z-index:12;background:#FFF8E6;border:1px solid #F2D58A;border-radius:14px;margin:0 0 12px;box-shadow:0 4px 14px rgba(20,33,61,.08)}
.jt-notice-head{display:flex;align-items:center;gap:8px;width:100%;background:none;border:0;padding:10px 12px;text-align:left}
.jt-notice-ic{color:#B7791F;flex:0 0 auto}
.jt-notice-label{flex:0 0 auto;font-size:12px;font-weight:800;color:#fff;background:#C98A00;border-radius:6px;padding:1px 7px}
.jt-notice-text{flex:1;min-width:0;font-size:14px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jt-notice.open .jt-notice-text{visibility:hidden}
.jt-notice.open>.jt-notice-head .jt-fold-ic{transform:rotate(180deg)}
.jt-notice-body{padding:0 14px 12px;display:flex;flex-direction:column;gap:6px;max-height:50vh;overflow:auto}
.jt-notice-body p{font-size:15px;line-height:1.55;color:var(--ink)}
.jt-notice-body a{color:#0A6A8B}
.jt-notice-meta{font-size:12px;color:var(--muted)}
.jt-notice-act{display:flex;gap:6px;flex-wrap:wrap;margin-top:2px}
.jt-notice-act .jt-like,.jt-msg-menu .jt-like{padding:3px 10px;font-size:13px;background:#fff}
.jt-msg-menu{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:5px}
.jt-msg.mine .jt-msg-menu{justify-content:flex-end}
.jt-bubble{cursor:pointer}
.jt-bubble.pinned{box-shadow:0 0 0 2px #F2C14E}
.jt-msg.flash .jt-bubble{animation:jt-flash 1.5s ease-out}
@keyframes jt-flash{0%,40%{box-shadow:0 0 0 4px #F2C14E}100%{box-shadow:none}}
.jt-msg-editbox{display:flex;flex-direction:column;gap:6px;min-width:220px;max-width:100%}
.jt .jt-msg-editbox textarea{font-size:15px;border-radius:12px;padding:8px 10px;resize:vertical}
.jt-msg-editact{display:flex;justify-content:flex-end;gap:6px}
@media (prefers-reduced-motion:reduce){.jt-msg.flash .jt-bubble{animation:none;box-shadow:0 0 0 3px #F2C14E}}
/* 길게 눌러 누른 사람 보기 */
.jt-hold{position:relative;display:inline-flex}
.jt-holdbtn{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}
.jt-whopop{position:absolute;z-index:35;min-width:150px;max-width:220px;background:#fff;border-radius:14px;box-shadow:0 6px 24px rgba(20,33,61,.22);padding:10px 12px;animation:jt-pop .14s ease-out}
.jt-whopop.up{bottom:calc(100% + 6px)}.jt-whopop.down{top:calc(100% + 6px)}.jt-whopop.left{left:0}.jt-whopop.right{right:0}
.jt-whopop strong{display:block;font-size:13px;margin-bottom:6px;white-space:nowrap}
.jt-whopop ul{display:flex;flex-direction:column;gap:6px}
.jt-whopop li{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600}
.jt-whopop p{font-size:13px;color:var(--muted)}
@media (prefers-reduced-motion:reduce){.jt-whopop{animation:none}}
/* 날짜 선택: DAY 카드 */
.jt-day{position:relative;flex:1 0 80px;min-width:80px;scroll-snap-align:start;display:flex;flex-direction:column;align-items:flex-start;gap:1px;padding:9px 10px 10px;border:0;border-radius:14px;background:#fff;text-align:left;box-shadow:inset 0 3px 0 var(--lc);transition:background .15s,box-shadow .15s,transform .15s}
.jt-day-no{display:flex;align-items:center;gap:5px;white-space:nowrap;font-size:12px;font-weight:800;letter-spacing:.04em;color:var(--lc)}
.jt-day-today{position:absolute;top:-8px;right:8px;box-shadow:0 0 0 2px var(--paper);font-style:normal;letter-spacing:0;font-size:10.5px;font-weight:800;background:var(--lc);color:#fff;border-radius:999px;padding:0 6px;line-height:16px}
.jt-day-date{font-size:16px;white-space:nowrap;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums;line-height:1.25}
.jt-day-date em{font-style:normal;font-size:13px;font-weight:700;color:var(--muted)}
.jt-day-count{font-size:11.5px;color:var(--muted);font-weight:600;white-space:nowrap}
.jt-day.active{background:var(--lc);box-shadow:0 6px 14px color-mix(in srgb,var(--lc) 35%,transparent);transform:translateY(-1px)}
.jt-day.active .jt-day-no,.jt-day.active .jt-day-date,.jt-day.active .jt-day-date em{color:#fff}
.jt-day.active .jt-day-count{color:rgba(255,255,255,.85)}
.jt-day.active .jt-day-today{background:#fff;color:var(--lc)}
.jt-daychip{flex:0 0 auto;display:inline-flex;align-items:center;background:var(--lc);color:#fff;font-size:12px;font-weight:800;letter-spacing:.03em;border-radius:999px;padding:2px 9px;line-height:18px}
@media (prefers-reduced-motion:reduce){.jt-day{transition:none}.jt-day.active{transform:none}}
/* API 키 잠금 */
.jt-keylock{display:flex;align-items:center;gap:8px;background:#F1F3F6;border:1.5px dashed var(--rule);border-radius:10px;padding:8px 8px 8px 12px;color:var(--muted)}
.jt-keylock-val{flex:1;min-width:0;font-size:14px;font-weight:600;color:#33405C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
.jt-presshold{position:relative;overflow:hidden;flex:0 0 auto;border:1.5px solid var(--ink);background:#fff;border-radius:999px;padding:6px 12px;font-size:13px;font-weight:700;color:var(--ink);-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:none}
.jt-presshold-fill{position:absolute;inset:0;background:color-mix(in srgb,#D9262E 22%,#fff);transform:scaleX(0);transform-origin:left}
.jt-presshold.pressing .jt-presshold-fill{transform:scaleX(1);transition:transform var(--hold) linear}
.jt-presshold-label{position:relative}
.jt-keywarn{background:#FFF4E5;border:1px solid #F2C894;border-radius:12px;padding:12px 14px;color:#6B3A00;display:flex;flex-direction:column;gap:8px}
.jt-keywarn strong{font-size:14.5px}
.jt-keywarn ul{display:flex;flex-direction:column;gap:5px;padding-left:16px;list-style:disc}
.jt-keywarn li{font-size:13px;line-height:1.5}
.jt-keywarn-act{display:flex;justify-content:flex-end;gap:6px}
/* 오프라인 표시 */
.jt-netbar{position:sticky;top:0;z-index:45;background:#3A2A00;color:#FFE7A8;font-size:13px;font-weight:600;padding-top:env(safe-area-inset-top)}
.jt-netbar.on{display:flex;align-items:center;justify-content:center;gap:6px;background:#0A7D58;color:#fff;padding:8px 12px}
.jt-netbar-head{display:flex;align-items:center;gap:8px;width:100%;background:none;border:0;color:inherit;padding:8px 14px;text-align:left;font-weight:600}
.jt-netbar-head span{flex:1}
.jt-netbar[role=alert] .jt-fold-ic{color:#FFE7A8}
.jt-netbar-head[aria-expanded=true] .jt-fold-ic{transform:rotate(180deg)}
.jt-netbar-body{padding:0 14px 10px 37px;display:flex;flex-direction:column;gap:4px;font-weight:500;line-height:1.5}
.jt-netbar-body b{display:block;color:#fff;font-weight:800}
.jt-wx-head em.jt-wx-stale{color:#B7791F;font-weight:600}
/* 공지 게시판 */
.jt-posts{display:flex;flex-direction:column;gap:12px}
.jt-post{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:12px 14px}
.jt-post-head{display:flex;align-items:center;gap:10px}
.jt-post-who{display:flex;flex-direction:column;flex:1;min-width:0;line-height:1.25}
.jt-post-who span{font-size:12px;color:var(--muted)}
.jt-post-text{margin-top:10px;white-space:pre-wrap;word-break:break-word;font-size:15px;line-height:1.55}
.jt-post-text a{color:#0A6A8B;word-break:break-all}
.jt-gallery{display:grid;gap:4px;margin-top:10px;border-radius:10px;overflow:hidden}
.jt-gallery.n1{grid-template-columns:1fr}
.jt-gallery.n2{grid-template-columns:1fr 1fr}
.jt-gallery.n3{grid-template-columns:1fr 1fr}
.jt-gallery.n3 .jt-gallery-cell:first-child{grid-column:1/-1}
.jt-gallery.n4{grid-template-columns:1fr 1fr}
.jt-gallery-cell{position:relative;aspect-ratio:1/1;background:#E3E7EE}
.jt-gallery.n1 .jt-gallery-cell{aspect-ratio:auto;max-height:420px}
.jt-gallery.n3 .jt-gallery-cell:first-child{aspect-ratio:16/10}
.jt-more{position:absolute;inset:0;background:rgba(20,33,61,.55);color:#fff;font-size:24px;font-weight:800;display:grid;place-items:center;pointer-events:none}
.jt-photo{display:block;width:100%;height:100%;padding:0;border:0;background:#E3E7EE;overflow:hidden}
.jt-photo img{display:block;width:100%;height:100%;object-fit:cover}
.jt-gallery.n1 .jt-photo img{height:auto;max-height:420px;object-fit:cover}
.jt-photo-wait{display:grid;place-items:center;width:100%;height:100%;min-height:120px;font-size:12px;color:var(--muted);padding:8px;text-align:center}
.jt-photo.contain{background:none}
.jt-photo.contain img{object-fit:contain;max-height:84vh;height:auto;width:auto;max-width:100%;margin:0 auto}
.jt-links{display:flex;flex-direction:column;gap:6px;margin-top:10px}
.jt-linkcard{display:flex;align-items:center;gap:10px;border:1px solid var(--rule);border-radius:10px;padding:9px 10px;background:#F8F9FB;color:var(--ink);text-decoration:none;min-width:0}
.jt-linkcard-icon{width:32px;height:32px;border-radius:8px;background:#EAF4F8;color:#0A6A8B;display:grid;place-items:center;flex:0 0 auto}
.jt-linkcard-text{display:flex;flex-direction:column;min-width:0;flex:1;line-height:1.3}
.jt-linkcard-text strong{font-size:14px}
.jt-linkcard-text span{font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jt-linkcard-go{color:var(--muted);flex:0 0 auto}
.jt-post-foot{display:flex;gap:8px;margin-top:12px}
.jt-thumbs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.jt-thumb{position:relative;aspect-ratio:1/1;border-radius:8px;overflow:hidden}
.jt-thumb .jt-photo-wait{min-height:0}
.jt-thumb-x{position:absolute;top:4px;right:4px;width:24px;height:24px;border-radius:50%;border:0;background:rgba(20,33,61,.75);color:#fff !important;display:grid;place-items:center;padding:0}
.jt-photo-add{display:flex;align-items:center;justify-content:center;gap:6px;padding:11px}
.jt-lightbox{position:fixed;inset:0;background:rgba(10,16,30,.94);z-index:80;display:flex;align-items:center;justify-content:center;padding:48px 12px}
.jt-lb-stage{max-width:100%;max-height:100%;display:flex;align-items:center;justify-content:center}
.jt-lb-close{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.12);border:0;color:#fff !important;width:42px;height:42px;border-radius:50%;display:grid;place-items:center}
.jt-lb-nav{position:absolute;top:50%;margin-top:-22px;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff !important;display:grid;place-items:center}
.jt-lb-nav.prev{left:8px}
.jt-lb-nav.next{right:8px}
.jt-lb-count{position:absolute;bottom:16px;left:0;right:0;text-align:center;color:#fff;font-weight:700;font-size:14px;font-variant-numeric:tabular-nums}
.jt-card,.jt-wish,.jt-post,.jt-total,.jt-mappanel,.jt-results,.jt-who-btn,.jt-daypick button{border-color:transparent;border-radius:16px}
.jt-post{padding:14px 16px}
.jt-gallery{border-radius:12px}
.jt-post-foot{flex-wrap:wrap;align-items:center}
/* 경비 목록 수정 표시, 거리 표시, 작성자 선택, 6칸 메뉴 */
.jt-spend-edit{flex:0 0 auto;color:#A0A9BC;display:grid;place-items:center}
.jt-dist{flex:0 0 auto;font-size:12px;font-weight:800;font-variant-numeric:tabular-nums}
.jt-dist.near{color:#D9262E}
.jt-dist.mid{color:#C99400}
.jt-dist.far{color:var(--ink)}
.jt-listbar{flex-wrap:wrap;row-gap:6px}
.jt-nav{grid-template-columns:repeat(6,1fr)}
.jt-nav button{font-size:10.5px;letter-spacing:-.04em}
.jt-nav-ic{width:40px}
.jt-group{margin-bottom:14px}
.jt-group h4{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;margin:0 2px 8px}
/* 엔화(원화) 표기로 길어진 금액 정리 */
.jt-mybal-top strong{font-size:17px;line-height:1.35}
.jt-calc b{white-space:nowrap}
.jt-daynet li{grid-template-columns:12px 1fr}
.jt-daynet .jt-pip{grid-row:span 3}
.jt-daynet .jt-net{grid-column:2;grid-row:auto;text-align:left;font-size:13px;margin-top:2px}
.jt-people li{align-items:flex-start}
.jt-people .jt-net{white-space:normal;text-align:right;max-width:46%;font-size:12.5px}
.jt-total em{line-height:1.45}
.jt-listbar .jt-foldall{margin-left:auto}
.jt-dist.none{color:#A0A9BC;font-weight:600}
.jt-nopos{margin-top:-6px}
.jt-here-err{margin:0 0 10px}
.jt-nopos-tip{margin:-4px 2px 10px}
/* 위치 일괄 찾기 */
.jt-geo-cta{display:flex;align-items:center;justify-content:space-between;gap:8px;background:#fff;border-radius:12px;padding:8px 10px 8px 14px;margin:-2px 0 10px;font-size:13px;color:#33405C}
.jt-geo-run{display:flex;flex-direction:column;gap:6px;font-size:13px;color:#33405C}
.jt-geo-bar{height:8px;background:var(--soft);border-radius:999px;overflow:hidden}
.jt-geo-bar i{display:block;height:100%;background:#0A9B6E;transition:width .3s}
.jt-geo-run .jt-ghost{align-self:flex-start}
.jt-geo-sum{margin:0}
.jt-geo-list{display:flex;flex-direction:column;background:#fff;border-radius:12px;overflow:hidden}
.jt-geo-list li+li{border-top:1px solid var(--soft)}
.jt-geo-list label,.jt-geo-list li>span{display:flex;align-items:flex-start;gap:10px;padding:9px 12px}
.jt .jt-geo-list input[type=checkbox]{width:18px;height:18px;margin:2px 0 0;flex:0 0 auto;accent-color:#0A9B6E}
.jt-geo-list label>span,.jt-geo-list li>span{display:flex;flex-direction:column;min-width:0}
.jt-geo-list strong{font-size:14px}
.jt-geo-list em{font-style:normal;font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis}
.jt-geo-list.miss em{color:#9A4A00}
.jt-geo-why{display:flex;flex-direction:column;gap:3px}
.jt-geo-why b{font-size:13.5px}
/* 경비 통화 선택 */
.jt-amt{display:flex;gap:8px;align-items:stretch}
.jt-cur{display:flex;flex:0 0 auto;background:#E3E7EE;border-radius:10px;padding:3px}
.jt-cur button{border:0;background:none;border-radius:8px;padding:0 10px;font-size:13.5px;font-weight:700;color:var(--muted);white-space:nowrap}
.jt-cur button.on{background:#fff;color:var(--ink);box-shadow:0 1px 2px rgba(20,33,61,.12)}
.jt-amt input{flex:1;min-width:0}
.jt-krw-note{margin-top:10px;font-size:12.5px;line-height:1.5;color:#0A6A8B;background:#EAF4F8;border-radius:10px;padding:8px 10px}
/* 공금 */
.jt-fundchip{border-style:dashed}
.jt-fundchip.on{background:#0A7D58;border-color:#0A7D58;border-style:solid}
.jt-fundhint{margin-top:0}
.jt-fundtag{display:inline-block;font-size:11px;font-weight:800;color:#0A7D58;background:#E6F4EE;border-radius:5px;padding:0 6px;margin-right:2px}
.jt-fundsum{display:block;margin-top:4px;font-size:13px;color:var(--muted)}
.jt-split-label{display:flex;align-items:center;justify-content:space-between}
.jt-split-label .jt-ghost{font-size:12.5px;padding:2px 4px}
.jt-fundbox{background:#E6F4EE;border-radius:14px;padding:12px 14px;margin:-8px 0 18px}
.jt-fundbox strong{display:flex;justify-content:space-between;gap:8px;font-size:14.5px;color:#0A5C41}
.jt-fundbox strong span{font-variant-numeric:tabular-nums}
.jt-fundbox p{font-size:12.5px;color:#33405C;margin-top:4px}
/* 환율 직접 입력 */
.jt-ownrate{display:flex;flex-direction:column;gap:6px;margin-top:-4px}
.jt-check{display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600;color:#33405C}
.jt .jt-check input{width:18px;height:18px;margin:0;accent-color:var(--ink)}
.jt-ownrate-row{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:#33405C}
.jt .jt-ownrate-row input{width:120px;flex:0 0 auto;text-align:right;font-variant-numeric:tabular-nums}
.jt-ratetag{font-size:10.5px;font-weight:700;color:#0A6A8B;background:#EAF4F8;border-radius:5px;padding:0 5px;margin-top:2px}
/* 돌림판 */
.jt-wheel-wrap{position:relative;width:min(280px,78vw);margin:4px auto 0;aspect-ratio:1/1}
.jt-wheel{width:100%;height:100%;display:block;border-radius:50%;box-shadow:0 6px 20px rgba(20,33,61,.18);transition-property:transform;transition-timing-function:cubic-bezier(.12,.72,.16,1)}
.jt-wheel-pin{position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-top:24px solid var(--ink);z-index:2;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))}
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
