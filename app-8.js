.jt-near-dist{display:inline-flex;align-items:center;gap:4px;font-size:12px;color:#33405C;font-variant-numeric:tabular-nums}
.jt-near-act{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex:0 0 auto}
.jt-near-saved{display:inline-flex;align-items:center;gap:3px;font-size:12.5px;font-weight:700;color:#0A7D58;padding:5px 2px}
.jt-near-src{font-size:11px;color:var(--muted);margin:8px 2px 0;text-align:right}
.jt-head.hero{position:relative;overflow:hidden;isolation:isolate;min-height:150px;display:flex;flex-direction:column;transition:min-height .4s ease}
.jt-head.hero.tall{min-height:196px}
.jt-head.hero>.jt-head-top,.jt-head.hero>h1,.jt-head.hero>.jt-head-sub{position:relative;z-index:2}
.jt-head.hero>h1{margin-top:auto;text-shadow:0 2px 12px rgba(0,0,0,.45);font-size:24px}
.jt-head.hero .jt-head-sub{color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.5);padding-bottom:14px}
.jt-head.hero .jt-me{background:rgba(20,33,61,.45);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.jt-head.hero .jt-icon.light{background:rgba(20,33,61,.45)}
.jt-hero{position:absolute;inset:0;z-index:0;background:var(--ink)}
.jt-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.8s ease;transform:scale(1.02)}
.jt-hero img.on{opacity:1;animation:jt-kb 9s ease-out forwards}
@keyframes jt-kb{from{transform:scale(1.02)}to{transform:scale(1.12)}}
.jt-hero-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,33,61,.55) 0%,rgba(20,33,61,.08) 38%,rgba(20,33,61,.15) 55%,rgba(20,33,61,.82) 100%)}
.jt-hero-foot{position:absolute;left:20px;right:12px;bottom:6px;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:8px;pointer-events:none}
.jt-hero-dots{display:flex;gap:4px}
.jt-hero-dots i{display:block;width:14px;height:3px;border-radius:2px;background:rgba(255,255,255,.4);transition:width .4s,background .4s}
.jt-hero-dots i.on{width:22px;background:#fff}
.jt-hero-cap{pointer-events:auto;font-size:10px;color:rgba(255,255,255,.75);text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70%}
.jt-wish-top .jt-wish-edit{margin-left:auto}
@media (prefers-reduced-motion:reduce){.jt-hero img.on{animation:none}
.jt-hero img{transition:opacity .6s}
.jt-head.hero{transition:none}}
.jt-head-btns{display:flex;gap:6px}
.jt-head.hero.mini{min-height:0;padding:10px 14px;border-radius:0 0 16px 16px}
.jt-head.hero.mini .jt-head-top{margin-bottom:0;gap:10px}
.jt-head.hero.mini .jt-me,.jt-head.hero.mini .jt-icon.light{background:rgba(255,255,255,.12)}
.jt-mini-title{flex:1;min-width:0;display:flex;align-items:center;gap:8px;font-size:16px;font-weight:800;color:#fff;white-space:nowrap}
.jt-mini-name{min-width:0;overflow:hidden;text-overflow:ellipsis}
.jt-mini-title em{font-style:normal;flex:0 0 auto;background:#fff;color:var(--ink);font-size:12px;font-weight:800;padding:1px 8px;border-radius:999px}
.jt-nav button{padding:8px 2px 8px;font-size:11px;letter-spacing:-.02em}
.jt-nav-ic{width:46px;position:relative}
.jt-share{display:flex;align-items:center;gap:12px;background:#fff;border-radius:16px;padding:14px 16px;margin-bottom:12px;border-left:6px solid var(--rule)}
.jt-share.on{border-left-color:#0A9B6E}
.jt-share-text{flex:1;display:flex;flex-direction:column;gap:2px}
.jt-share-text strong{font-size:15px}
.jt-share-text span{font-size:12.5px;color:var(--muted)}
.jt-switch{flex:0 0 auto;width:52px;height:30px;border-radius:999px;border:0;background:#C9D0DC;position:relative;padding:0;transition:background .2s}
.jt-switch i{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:transform .2s}
.jt-switch[aria-checked=true]{background:#0A9B6E}
.jt-switch[aria-checked=true] i{transform:translateX(22px)}
.jt-share-err{margin:-4px 0 12px}
.jt-fam-bar{display:flex;justify-content:space-between;align-items:center;margin:10px 2px 10px;font-size:13px;color:#33405C}
.jt-fam-bar .jt-secondary{display:inline-flex;align-items:center;gap:4px}
.jt-fam-list{background:#fff;border-radius:16px;overflow:hidden}
.jt-fam{display:flex;align-items:center;gap:8px;padding:0 14px 0 0}
.jt-fam+.jt-fam{border-top:1px solid var(--soft)}
.jt-fam.sel{background:#F3F6FA}
.jt-fam-main{flex:1;min-width:0;display:flex;align-items:center;gap:12px;background:none;border:0;padding:12px 0 12px 14px;text-align:left}
.jt-fam-main:disabled{cursor:default}
.jt-fam:not(.live) .jt-fam-av{opacity:.45}
.jt-fam-av{position:relative;flex:0 0 auto}
.jt-live-dot{position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:#0A9B6E;border:2px solid #fff}
.jt-fam-txt{display:flex;flex-direction:column;min-width:0}
.jt-fam-txt strong{font-size:15px}
.jt-fam-txt span{font-size:12.5px;color:var(--muted)}
.jt-fam.live .jt-fam-txt span{color:#0A7D58}
.jt-fam-tip{margin:10px 2px 0}
@media (prefers-reduced-motion:reduce){.jt-switch,.jt-switch i{transition:none}}
.jt-form-results{margin:-6px 0 0}
.jt-picked{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;background:#EEF6F1;border-radius:10px;padding:8px 10px;font-size:13px;font-weight:700;color:#0A7D58;margin-top:-6px}
.jt-picked span{flex:1;min-width:120px}
.jt-ghost.sm{padding:4px 6px;font-size:12px}
.jt-tt-lane{position:absolute;left:56px;right:8px;top:7px;bottom:0;cursor:pointer}
.jt-tt-ghost{position:absolute;left:2px;right:2px;border:1.5px dashed var(--lc);border-radius:8px;background:color-mix(in srgb,var(--lc) 8%,#fff);font-size:12px;font-weight:700;color:var(--ink);display:flex;align-items:center;padding:0 8px;pointer-events:none}
.jt-locbtn{position:relative}
.jt-locbtn i{position:absolute;right:5px;top:5px;width:9px;height:9px;border-radius:50%;background:#9AA3B5;border:2px solid rgba(20,33,61,.9)}
.jt-locbtn.on i{background:#2FD38A}
.jt-head.hero .jt-locbtn.on{background:rgba(10,155,110,.55)}
.jt-ask{font-size:15px;line-height:1.6;color:#33405C}
.jt-ask-hint{margin-top:-6px}
.jt-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(84px + env(safe-area-inset-bottom));z-index:40;background:var(--ink);color:#fff;font-size:13.5px;font-weight:600;padding:10px 16px;border-radius:12px;max-width:min(92vw,480px);box-shadow:0 6px 18px rgba(20,33,61,.3);animation:jt-up .2s ease-out}
.jt-helpbtn{align-self:flex-start;display:inline-flex;align-items:center;gap:4px;margin-top:4px;background:var(--paper);border:0;border-radius:999px;padding:3px 10px;font-size:12.5px;font-weight:700;color:#33405C}
.jt-helplist{display:flex;flex-direction:column;gap:12px;margin-bottom:18px}
.jt-helplist li{background:#fff;border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:3px;border-left:4px solid #0A9B6E}
.jt-helplist b{font-size:15px}
.jt-helplist span{font-size:14px;line-height:1.55;color:#33405C}
.jt-badge{position:absolute;top:-4px;right:2px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:#D9262E;color:#fff;font-size:11px;font-weight:800;line-height:18px;text-align:center;box-shadow:0 0 0 2px #fff;font-style:normal}
.jt-chat{padding-bottom:70px}
.jt-msgs{display:flex;flex-direction:column;gap:4px}
.jt-daysep{display:flex;justify-content:center;margin:12px 0 6px}
.jt-daysep span{background:rgba(20,33,61,.08);color:#33405C;font-size:12px;font-weight:700;padding:3px 12px;border-radius:999px}
.jt-msg{display:flex;gap:8px;align-items:flex-start;margin-top:6px}
.jt-msg.cont{margin-top:0}
.jt-msg.mine{justify-content:flex-end}
.jt-msg-av{width:30px;flex:0 0 30px}
.jt-msg-col{display:flex;flex-direction:column;max-width:78%;min-width:0}
.jt-msg.mine .jt-msg-col{align-items:flex-end}
.jt-msg-name{font-size:12px;font-weight:700;color:#33405C;margin:0 0 3px 2px}
.jt-msg-row{display:flex;align-items:flex-end;gap:5px}
.jt-msg.mine .jt-msg-row{flex-direction:row-reverse}
.jt-bubble{border:0;text-align:left;background:#fff;color:var(--ink);border-radius:16px 16px 16px 4px;padding:8px 12px;font-size:15px;line-height:1.45;min-width:0;cursor:default}
.jt-msg.mine .jt-bubble{background:var(--ink);color:#fff;border-radius:16px 16px 4px 16px;cursor:pointer}
.jt-msg.cont .jt-bubble{border-radius:16px}
.jt-msg-text{white-space:pre-wrap;word-break:break-word}
.jt-msg-text a{color:inherit;text-decoration:underline;word-break:break-all}
.jt-msg-time{font-size:10.5px;color:var(--muted);flex:0 0 auto;font-variant-numeric:tabular-nums;padding-bottom:2px}
.jt-bubble.loc{background:#EEF6F1;color:#0A7D58}
.jt-msg.mine .jt-bubble.loc{background:#0A9B6E;color:#fff}
.jt-locmsg{display:inline-flex;align-items:center;gap:6px;font-weight:700}
.jt-loclinks{display:flex;gap:6px;margin-top:5px;flex-wrap:wrap}
.jt-msg-del{margin-top:4px}
.jt-chatbar{position:fixed;z-index:15;left:50%;transform:translateX(-50%);width:min(100%,520px);bottom:calc(62px + env(safe-area-inset-bottom));display:flex;align-items:flex-end;gap:8px;padding:8px 12px;background:rgba(241,243,246,.96);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-top:1px solid rgba(20,33,61,.06)}
.jt .jt-chatbar textarea{flex:1;resize:none;max-height:120px;min-height:42px;padding:10px 12px;border-radius:20px;font-size:15px;line-height:1.35}
.jt-chatbar .jt-send{height:42px;border-radius:50%;width:42px}
.jt-chat-loc{flex:0 0 auto;width:42px;height:42px;border-radius:50%;border:0;background:#fff;color:#0A7D58;display:grid;place-items:center;box-shadow:inset 0 0 0 1.5px var(--rule)}
.jt-chat-loc:disabled{opacity:.5}
.jt-next{display:flex;align-items:center;gap:6px;margin-top:10px;padding:8px 10px;border-radius:10px;background:#F1F5FB;color:#0A6A8B;font-size:13px;text-decoration:none;line-height:1.35}
.jt-next b{font-weight:800}
.jt-next span{min-width:0}
.jt-msg-meta{display:flex;flex-direction:column;align-items:flex-end;gap:1px;flex:0 0 auto}
.jt-msg:not(.mine) .jt-msg-meta{align-items:flex-start}
.jt-unread{font-size:11px;font-weight:800;color:#C98A00;line-height:1;font-style:normal}
.jt-badgeask{display:flex;align-items:center;gap:10px;background:#fff;border-radius:12px;padding:10px 12px;margin-bottom:10px;font-size:13px;color:#33405C}
.jt-badgeask span{flex:1}
.jt-maplink.route{background:#EEF6F1;color:#0A7D58}
.jt-backbar{margin:-12px 0 10px -8px}
.jt-back{display:inline-flex;align-items:center;gap:2px;background:none;border:0;padding:8px 10px 8px 4px;border-radius:10px;font-size:15px;font-weight:700;color:#33405C}
.jt-back:active{background:#E3E7EE}
.jt-who-btn.on{border-color:var(--ink)}
.jt-who-name{flex:1}
.jt-who-now{font-style:normal;font-size:12px;font-weight:700;color:#fff;background:var(--ink);border-radius:999px;padding:2px 10px}
.jt-foldall{display:flex;justify-content:flex-end;margin:-6px 0 6px}
.jt-foldall .jt-ghost{display:inline-flex;align-items:center;gap:3px;font-size:13px;color:#33405C}
.jt-fold-head{display:flex;align-items:center;gap:8px;width:100%;background:none;border:0;padding:0;text-align:left;min-height:28px}
.jt-fold-head .jt-card-title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jt-card.open .jt-fold-head .jt-card-title,.jt-wish.open .jt-fold-name{white-space:normal}
.jt-fold-name{flex:1;min-width:0;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jt-fold-ic{flex:0 0 auto;color:var(--muted);transition:transform .2s}
.open>.jt-fold-head .jt-fold-ic{transform:rotate(180deg)}
.jt-fold-body{margin-top:6px}
.jt-fold-wx{margin-bottom:4px}
.jt-fold-tools{display:flex;justify-content:flex-end;margin:-2px 0 4px}
.jt-editbtn{padding:3px 10px;font-size:13px}
.jt-card{border-radius:14px;padding:9px 12px}
.jt-row:first-child .jt-rail::before{top:17px}
.jt-row:last-child .jt-rail::before{bottom:auto;height:17px}
@media (prefers-reduced-motion:reduce){.jt-fold-ic{transition:none}}
.jt-daybadge{flex:0 0 auto;color:#fff;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:999px}
.jt-listbar{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:-2px 0 10px}
.jt-listbar .jt-foldall{margin:0}
.jt-pfsel{position:relative;display:inline-flex;align-items:center}
.jt .jt-pfsel select{-webkit-appearance:none;appearance:none;width:auto;font-size:14px;font-weight:700;padding:7px 32px 7px 12px;border-radius:999px;background:#fff;border:1.5px solid var(--rule)}
.jt-pfsel svg{position:absolute;right:11px;pointer-events:none;color:var(--muted)}
.jt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
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
`;

// src/main.jsx
import { jsx as Z, jsxs as Vt } from "react/jsx-runtime";
var Mn = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{trip}/{document=**} {
      allow read, write: if trip.size() >= 12;
    }
  }
}`, Zi = (e) => {
  let a = e && (e.code || e.message) || "";
  return a.includes("permission") ? "Firebase 보안 규칙이 막고 있어요. 아래 규칙을 Firestore '규칙' 탭에 붙여넣고 '게시'를 눌러 주세요." : a.includes("timeout") ? "Firebase에 연결되지 않았어요. 인터넷 연결과 Firestore 데이터베이스를 만들었는지 확인해 주세요." : a.includes("api-key") || a.includes("invalid") ? "설정값이 맞지 않아요. Firebase 콘솔에서 firebaseConfig 부분을 다시 복사해 주세요." : "연결하지 못했어요. 설정값과 인터넷 연결을 확인해 주세요. (" + a + ")";
};
function Qi({ onDone: e }) {
  let [a, n] = Tt("join"), [i, r] = Tt(""), [g, u] = Tt(""), [p, l] = Tt(!1), [x, w] = Tt(""), [N, d] = Tt(!1), A = async (C, v) => {
    l(!0), w("");
    try {
      Ye(C, v), await Ba(), Ia(C, v), e();
    } catch (M) {
      w(Zi(M)), l(!1);
    }
  }, h = () => {
    let C = Ta(i);
    if (!C) {
      w("설정값을 찾지 못했어요. apiKey, projectId, appId가 들어 있는 firebaseConfig 부분 전체를 붙여넣어 주세요.");
      return;
    }
    A(C, Ra());
  }, z = () => {
    let C = He(g);
    if (!C) {
      w("초대 링크가 아니에요. 가족에게 받은 주소 전체를 붙여넣어 주세요.");
      return;
    }
    A(C.c, C.t);
  };
  return /* @__PURE__ */ Vt("div", { className: "jt", children: [
    /* @__PURE__ */ Z("style", { children: ma }),
    /* @__PURE__ */ Vt("div", { className: "jt-setup", children: [
      /* @__PURE__ */ Z("h1", { children: "가족 여행 앱" }),
      /* @__PURE__ */ Vt("div", { className: "jt-seg", role: "tablist", children: [
        /* @__PURE__ */ Z("button", { role: "tab", "aria-selected": a === "join", className: a === "join" ? "on" : "", onClick: () => n("join"), children: "초대받았어요" }),
        /* @__PURE__ */ Z("button", { role: "tab", "aria-selected": a === "new", className: a === "new" ? "on" : "", onClick: () => n("new"), children: "처음 만들어요" })
      ] }),
      a === "join" ? /* @__PURE__ */ Vt("div", { className: "jt-form", children: [
        /* @__PURE__ */ Z("p", { className: "jt-lead", children: "가족에게 받은 초대 링크를 누르면 바로 들어와요. 홈 화면 아이콘으로 열었는데 이 화면이 보이면, 초대 링크를 아래에 붙여넣어 주세요." }),
        /* @__PURE__ */ Z("textarea", { rows: 3, value: g, onChange: (C) => u(C.target.value), placeholder: "https://…#j=…", "aria-label": "초대 링크" }),
        x && /* @__PURE__ */ Z("p", { className: "jt-warn-inline", children: x }),
        /* @__PURE__ */ Z("button", { className: "jt-primary", disabled: p || !g.trim(), onClick: z, children: p ? "연결 중" : "여행에 들어가기" })
      ] }) : /* @__PURE__ */ Vt("div", { className: "jt-form", children: [
        /* @__PURE__ */ Z("p", { className: "jt-lead", children: "가족 중 한 명만 한 번 하면 돼요. Firebase 프로젝트의 웹 앱 설정값(firebaseConfig)을 붙여넣어 주세요." }),
        /* @__PURE__ */ Z(
          "textarea",
          {
            rows: 7,
            value: i,
            onChange: (C) => r(C.target.value),
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
        /* @__PURE__ */ Vt("div", { className: "jt-field", children: [
          /* @__PURE__ */ Z("span", { children: "Firestore 보안 규칙 (규칙 탭에 붙여넣기)" }),
          /* @__PURE__ */ Z("pre", { className: "jt-rules", children: Mn }),
          /* @__PURE__ */ Z(
            "button",
            {
              type: "button",
              className: "jt-secondary",
              onClick: async () => {
                try {
                  await navigator.clipboard.writeText(Mn), d(!0);
                } catch {
                  d(!1);
                }
              },
              children: N ? "규칙을 복사했어요" : "규칙 복사"
            }
          )
        ] }),
        x && /* @__PURE__ */ Z("p", { className: "jt-warn-inline", children: x }),
        /* @__PURE__ */ Z("button", { className: "jt-primary", disabled: p || !i.trim(), onClick: h, children: p ? "연결 확인 중" : "연결하고 여행 만들기" })
      ] })
    ] }),
    /* @__PURE__ */ Z("style", { children: ".jt-lead{font-size:14px;color:#33405C}.jt-rules{margin:0;font-size:11.5px;line-height:1.5;background:#fff;border-radius:10px;padding:10px 12px;overflow-x:auto;white-space:pre}.jt .jt-setup .jt-seg{margin-bottom:16px}" })
  ] });
}
function tr() {
  let [e, a] = Tt(() => {
    let n = Da();
    if (!n) return !1;
    try {
      return Ye(n.c, n.t), !0;
    } catch {
      return !1;
    }
  });
  return Gi(() => {
    "serviceWorker" in navigator && location.protocol === "https:" && navigator.serviceWorker.register("./sw.js").catch(() => {
    });
  }, []), e ? /* @__PURE__ */ Z(da, {}) : /* @__PURE__ */ Z(Qi, { onDone: () => a(!0) });
}
qi(document.getElementById("root")).render(/* @__PURE__ */ Z(tr, {}));
