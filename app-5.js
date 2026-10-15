.jt-person{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:12px}
.jt-person-main{display:flex;flex-direction:column;flex:1;min-width:0}
.jt-person-main span{font-size:12px;color:var(--muted)}
.jt-net{font-weight:700;font-size:14px;color:var(--muted);text-align:right}
.jt-net.plus{color:#0A7D58}
.jt-net.minus{color:#B42318}

/* board */
.jt-composer{width:100%;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--rule);border-radius:12px;padding:10px 14px 10px 10px;text-align:left;color:var(--muted);margin-bottom:14px}
.jt-composer span{flex:1;font-weight:600}
.jt-composer:active{background:#F8F9FB}
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
.jt-comments{margin-top:12px;border-top:1px solid var(--rule);padding-top:10px}
.jt-comments ul{display:flex;flex-direction:column;gap:10px}
.jt-nocomment{margin:0 0 4px}
.jt-comment{display:flex;gap:8px;align-items:flex-start}
.jt-comment-body{flex:1;min-width:0;background:#F2F4F7;border-radius:10px;padding:6px 10px}
.jt-comment-body div{display:flex;gap:6px;align-items:baseline}
.jt-comment-body strong{font-size:13px}
.jt-comment-body span{font-size:11px;color:var(--muted)}
.jt-comment-body p{font-size:14px;white-space:pre-wrap;word-break:break-word}
.jt-comment .jt-del{padding:4px}
.jt-comment-input{margin-top:10px}
.jt-comment-input input{padding:9px 12px}
.jt-send{flex:0 0 auto;width:42px;border:0;border-radius:10px;background:var(--ink);color:#fff !important;display:grid;place-items:center}
.jt-send:disabled{opacity:.3;cursor:not-allowed}

/* post form */
.jt-thumbs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.jt-thumb{position:relative;aspect-ratio:1/1;border-radius:8px;overflow:hidden}
.jt-thumb .jt-photo-wait{min-height:0}
.jt-thumb-x{position:absolute;top:4px;right:4px;width:24px;height:24px;border-radius:50%;border:0;background:rgba(20,33,61,.75);color:#fff !important;display:grid;place-items:center;padding:0}
.jt-photo-add{display:flex;align-items:center;justify-content:center;gap:6px;padding:11px}
.jt-formmsg{margin:0}

/* lightbox */
.jt-lightbox{position:fixed;inset:0;background:rgba(10,16,30,.94);z-index:80;display:flex;align-items:center;justify-content:center;padding:48px 12px}
.jt-lb-stage{max-width:100%;max-height:100%;display:flex;align-items:center;justify-content:center}
.jt-lb-close{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.12);border:0;color:#fff !important;width:42px;height:42px;border-radius:50%;display:grid;place-items:center}
.jt-lb-nav{position:absolute;top:50%;margin-top:-22px;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff !important;display:grid;place-items:center}
.jt-lb-nav.prev{left:8px}
.jt-lb-nav.next{right:8px}
.jt-lb-count{position:absolute;bottom:16px;left:0;right:0;text-align:center;color:#fff;font-weight:700;font-size:14px;font-variant-numeric:tabular-nums}

/* maps */
.jt-maprow{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.jt-maplink{display:inline-flex;align-items:center;gap:5px;background:#EAF4F8;color:#0A6A8B;border:0;border-radius:8px;padding:6px 11px;font-size:13px;font-weight:700;text-decoration:none}
.jt-maplink.inline{margin-top:8px}
.jt-embed{margin-top:10px}
.jt-embed iframe{width:100%;height:220px;border:0;border-radius:10px;background:#E3E7EE}
.jt-embed p{font-size:12px;color:var(--muted);margin-top:4px}

/* in-app map */
.jt-mapsearch{margin-bottom:10px}
.jt-mapmsg{margin:8px 0 0}
.jt-results{background:#fff;border:1px solid var(--rule);border-radius:10px;margin-bottom:10px;overflow:hidden}
.jt-results li+li{border-top:1px solid var(--rule)}
.jt-results button{width:100%;background:none;border:0;text-align:left;padding:10px 12px;display:flex;flex-direction:column}
.jt-results button:active{background:#EDF0F5}
.jt-results span{font-size:12px;color:var(--muted)}
.jt-map{position:relative;overflow:hidden;border-radius:12px;border:1px solid var(--rule);background:#DDE2EA;touch-action:none;user-select:none;cursor:grab;height:min(58vh,460px);min-height:320px}
.jt-map img{position:absolute;width:256px;height:256px;max-width:none;pointer-events:none;user-select:none}
.jt-pin{position:absolute;width:26px;height:26px;margin:-33px 0 0 -13px;padding:0;border:0;background:var(--pc);border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 5px rgba(0,0,0,.35);z-index:2}
.jt-pin::after{content:"";position:absolute;inset:-8px}
.jt-pin i{position:absolute;inset:7px;background:#fff;border-radius:50%}
.jt-pin.sel{width:34px;height:34px;margin:-43px 0 0 -17px;z-index:3}
.jt-pin.sel i{inset:10px}
.jt-pin.temp{--pc:var(--ink);z-index:4;pointer-events:none}
.jt-zoom{position:absolute;right:10px;top:10px;display:flex;flex-direction:column;gap:6px;z-index:5}
.jt-zoom button{width:38px;height:38px;border-radius:10px;border:1px solid var(--rule);background:#fff;font-size:22px;font-weight:700;line-height:1;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.jt-mapfail{position:absolute;left:12px;right:60px;top:12px;background:#FFF4E5;color:#7A4100;border:1px solid #F2C894;border-radius:10px;padding:8px 10px;font-size:13px;font-weight:600;z-index:6;pointer-events:none}
.jt-attr{position:absolute;right:0;bottom:0;background:rgba(255,255,255,.85);font-size:10px;padding:1px 6px;color:#33405C;text-decoration:none;z-index:5}
.jt-mappanel{margin-top:12px;background:#fff;border:1px solid var(--rule);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px}
.jt-mappanel .jt-inline{margin-top:0}
.jt-mappanel .jt-primary{padding:11px;font-size:15px}
.jt-mappanel .jt-maprow{margin-top:0}

@media (prefers-reduced-motion:reduce){.jt-sheet{animation:none}.jt-day-dot{transition:none}}
/* ---------- 2차 디자인 수정 ---------- */
.jt{--paper:#F1F3F6;--soft:#E7EAF0}
.jt-main{padding:16px 16px 150px}
.jt-head{padding:12px 20px 22px;border-radius:0 0 22px 22px}
/* 테두리 대신 배경 대비로 구분 */
.jt-card,.jt-wish,.jt-post,.jt-total,.jt-mappanel,.jt-results,.jt-who-btn,.jt-daypick button{border-color:transparent;border-radius:16px}
.jt-card{border-radius:14px}
.jt-empty{background:#fff;border-radius:16px;padding:32px 20px;margin-top:4px}

/* 하단 메뉴: 반투명 + 활성 아이콘 알약 */
.jt-nav{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-top:1px solid rgba(20,33,61,.06)}
.jt-nav button{padding:8px 2px 8px;font-size:11.5px}
.jt-nav button.on{box-shadow:none;color:var(--ink);font-weight:800}
.jt-nav-ic{width:52px;height:30px;border-radius:999px;display:grid;place-items:center;transition:background .15s}
.jt-nav button.on .jt-nav-ic{background:var(--ink);color:#fff}

/* 플로팅 추가 버튼 */
.jt-fab{position:fixed;z-index:20;bottom:calc(78px + env(safe-area-inset-bottom));right:max(16px,calc(50% - 244px));
  display:inline-flex;align-items:center;gap:6px;background:var(--ink);color:#fff !important;border:0;border-radius:999px;
  padding:14px 20px 14px 16px;font-weight:800;font-size:15px;box-shadow:0 6px 18px rgba(20,33,61,.28)}
.jt-fab:active{transform:scale(.97)}

/* 경비: 요약 */
.jt-total{padding:18px 18px 16px}
.jt-total strong{font-size:36px;margin-top:2px}
.jt-catbar{display:flex;gap:3px;height:10px;margin-top:14px;border-radius:999px;overflow:hidden}
.jt-catbar i{display:block;min-width:4px}
.jt-catlegend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-size:13px;color:var(--muted)}
.jt-catlegend li{display:inline-flex;align-items:center;gap:5px}
.jt-catlegend b{color:var(--ink);font-variant-numeric:tabular-nums}
.jt-dot{width:8px;height:8px;border-radius:50%}

/* 경비: 내 정산 */
.jt-mybal{background:#fff;border-radius:16px;padding:14px 16px;margin-bottom:20px;border-left:6px solid var(--muted)}
.jt-mybal.plus{border-left-color:#0A9B6E}
.jt-mybal.minus{border-left-color:#D9262E}
.jt-mybal-top{display:flex;align-items:center;gap:12px}
.jt-mybal-top div{display:flex;flex-direction:column;line-height:1.3}
.jt-mybal-top span{font-size:13px;color:var(--muted);font-weight:600}
.jt-mybal-top strong{font-size:19px;font-weight:800;letter-spacing:-.01em}
.jt-mybal.plus .jt-mybal-top strong{color:#0A7D58}
.jt-mybal.minus .jt-mybal-top strong{color:#B42318}
.jt-mybal .jt-moves{margin:12px 0 0;gap:0}
.jt-mybal .jt-moves li{display:flex;justify-content:space-between;align-items:center;border:0;border-radius:0;background:none;padding:10px 0;border-top:1px solid var(--soft)}
.jt-moves-amt{display:flex;flex-direction:column;align-items:flex-end;line-height:1.25}
.jt-moves-amt strong{font-size:16px;font-variant-numeric:tabular-nums}
.jt-moves-amt em{font-style:normal;font-size:12px;color:var(--muted)}
.jt-more-btn{width:100%;margin-top:10px;background:var(--paper);border:0;border-radius:10px;padding:9px;font-weight:700;font-size:13px;color:#33405C;display:flex;justify-content:center;align-items:center;gap:4px}
.jt-more-btn svg{transition:transform .15s}
.jt-detail{margin-top:4px}
.jt-people{display:flex;flex-direction:column;margin-top:8px}
.jt-people li{display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid var(--soft)}
.jt-net{font-variant-numeric:tabular-nums}

/* 경비: 날짜별 목록 (한 묶음 카드) */
.jt-listhint{margin:0 0 10px 2px}
.jt-group h4{margin:0 2px 8px}
.jt-group-sum{margin-left:auto;color:var(--muted);font-weight:700;font-variant-numeric:tabular-nums}
.jt-spend-list{background:#fff;border-radius:16px;overflow:hidden}
.jt-spend-list li+li .jt-spend{border-top:1px solid var(--soft)}
.jt-spend-list .jt-spend{border:0;border-radius:0;background:none;padding:12px 14px;gap:12px}
.jt-spend-list .jt-spend:active{background:#F6F7F9}
.jt-spend-icon{width:38px;height:38px;border-radius:12px;flex:0 0 auto;display:grid;place-items:center;color:var(--cc);
  background:color-mix(in srgb,var(--cc) 13%,#fff)}
.jt-spend-name{font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

.jt-warn{background:#FFF4E5;border-radius:16px;padding:14px 16px;margin-bottom:14px;color:#6B3A00}
.jt-warn strong{font-size:15px}
.jt-warn p{font-size:13px;margin-top:4px}
.jt-warn ul{margin-top:10px;display:flex;flex-direction:column;gap:6px}
.jt-warn button{width:100%;display:flex;justify-content:space-between;gap:10px;background:#fff;border:0;border-radius:10px;padding:9px 12px;text-align:left;font-weight:700}
.jt-warn em{font-style:normal;font-weight:500;color:var(--muted)}
.jt-warn-inline{background:#FFF4E5;color:#6B3A00;border-radius:10px;padding:10px 12px;font-size:13px}
.jt-explain{font-size:12.5px;color:var(--muted);background:var(--paper);border-radius:10px;padding:10px 12px;margin-top:8px}

/* 게시판 */
.jt-post{padding:14px 16px}
.jt-gallery{border-radius:12px}

@media (prefers-reduced-motion:reduce){.jt-nav-ic,.jt-more-btn svg{transition:none}}
/* 경비 3분할 */
.jt-seg.three{grid-template-columns:repeat(3,1fr)}
.jt-seg.three button{font-size:14px;padding:9px 4px}
.jt-subhead{font-size:14px;font-weight:800;margin:4px 2px 8px}
.jt-calc{margin-top:12px;background:var(--paper);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:4px;font-size:14px}
.jt-calc div{display:flex;justify-content:space-between}
.jt-calc span{color:var(--muted)}
.jt-calc b{font-variant-numeric:tabular-nums}
.jt-calc .sum{border-top:1px solid var(--soft);padding-top:6px;margin-top:2px}
.jt-calc .sum span{color:var(--ink);font-weight:700}
.jt-calc b.plus{color:#0A7D58}.jt-calc b.minus{color:#B42318}
.jt-daynet{background:#fff;border-radius:16px;overflow:hidden}
.jt-daynet li{display:grid;grid-template-columns:12px 1fr auto;column-gap:10px;align-items:center;padding:11px 14px}
.jt-daynet li+li{border-top:1px solid var(--soft)}
.jt-daynet .jt-pip{grid-row:span 2}
.jt-daynet-label{font-weight:700;font-size:14px}
.jt-daynet-sub{grid-column:2;font-size:12px;color:var(--muted)}
.jt-daynet .jt-net{grid-column:3;grid-row:1/span 2}
.jt-daycard{background:#fff;border-radius:16px;padding:12px 0 0;margin-bottom:14px;overflow:hidden}
.jt-daycard h4{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:800;padding:0 14px 8px}
.jt-day-dot.sm{opacity:1;width:26px;height:26px;font-size:13px}
.jt-daycard .jt-moves2{margin:0 14px 10px}
.jt-daycard .jt-nomoves{margin:0 14px 10px}
.jt-daycard .jt-spend-list{border-radius:0;border-top:1px solid var(--soft)}
.jt-moves2{display:flex;flex-direction:column;gap:6px}
.jt-moves2 li{display:flex;justify-content:space-between;align-items:center;background:var(--paper);border-radius:10px;padding:8px 12px}
.jt-moves2 li.mine{box-shadow:inset 3px 0 0 var(--ink)}
.jt-moves-who{display:inline-flex;align-items:center;gap:4px}
.jt-moves-who svg{color:var(--muted)}
.jt-nomoves{margin:0}
.jt-allcard{background:#fff;border-radius:16px;padding:14px 16px;margin-bottom:18px}
.jt-allcard h4{font-size:15px;font-weight:800;margin-bottom:10px}
.jt-people.card{background:#fff;border-radius:16px;padding:0 14px;margin-top:0}
.jt-people.card li:first-child{border-top:0}
.jt-net{font-size:13px;line-height:1.3;white-space:nowrap}
.jt-calc div{gap:12px;align-items:baseline}
/* 일정 시간표 */
.jt-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.jt input:disabled{background:#F1F3F6;color:var(--muted)}
.jt-clash{display:inline-block;margin-top:6px;font-size:12px;font-weight:700;color:#9A4A00;background:#FFF4E5;border-radius:6px;padding:2px 8px}
.jt-tt-wrap{margin-top:22px}
.jt-tt{position:relative;background:#fff;border-radius:16px;padding:0;margin-top:2px}
.jt-tt-hour{position:absolute;left:0;right:0;height:0;border-top:1px solid var(--soft);margin-top:7px}
.jt-tt-hour span{position:absolute;left:10px;top:-8px;font-size:11px;font-weight:700;color:var(--muted);background:#fff;padding-right:4px;font-variant-numeric:tabular-nums}
.jt-tt-lane{position:absolute;left:56px;right:8px;top:7px;bottom:0}
.jt-tt-block{position:absolute;border:0;border-radius:8px;text-align:left;padding:5px 8px;overflow:hidden;
  background:color-mix(in srgb,var(--lc) 14%,#fff);box-shadow:inset 4px 0 0 var(--lc);display:flex;flex-direction:column;gap:1px}
.jt-tt-block strong{font-size:13px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jt-tt-block span{font-size:11px;color:#33405C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
.jt-tt-block.short{flex-direction:row;align-items:center;gap:6px;padding:2px 8px}
.jt-tt-block.short span{display:none}
.jt-tt-block.clash{box-shadow:inset 4px 0 0 var(--lc),0 0 0 1.5px #F2C894}
.jt-tt-block:active{filter:brightness(.97)}
.jt-tt-now{position:absolute;left:48px;right:0;height:0;border-top:2px solid #D9262E;margin-top:7px;z-index:3;pointer-events:none}
.jt-tt-now span{position:absolute;left:-44px;top:-9px;background:#D9262E;color:#fff;font-size:10px;font-weight:800;border-radius:999px;padding:1px 6px}
.jt-tt-note{margin:8px 2px 0}
.jt-tsel{display:flex;align-items:center;gap:4px;background:#fff;border:1.5px solid var(--rule);border-radius:10px;padding:0 6px}
.jt-tsel.off{background:#F1F3F6}
.jt .jt-tsel select{border:0;padding:11px 4px;flex:1;min-width:0;background:transparent;text-align:center;font-variant-numeric:tabular-nums;-webkit-appearance:none;appearance:none}
.jt-tsel span{font-weight:800;color:var(--muted)}
.jt-invite{background:#fff;border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:10px;margin-top:8px}
.jt-invite strong{font-size:16px}
.jt-invite p{font-size:13px;color:var(--muted)}
.jt-invite summary{font-size:13px;color:var(--muted);cursor:pointer}
.jt-invite code{display:block;margin-top:6px;font-size:11px;word-break:break-all;background:var(--paper);padding:8px;border-radius:8px;user-select:all}
/* 날씨 */
.jt-wx{background:#fff;border-radius:16px;padding:12px 14px;margin-bottom:14px}
.jt-wx-head{display:flex;justify-content:space-between;align-items:baseline;font-size:12px;font-weight:700;color:var(--muted)}
.jt-wx-head em{font-style:normal;font-weight:500}
.jt-wx-main{display:flex;align-items:center;gap:12px;margin-top:6px}
.jt-wx-temp{display:flex;flex-direction:column;flex:1;line-height:1.3}
.jt-wx-temp strong{font-size:17px;font-weight:800}
.jt-wx-temp span{font-size:13px;color:var(--muted)}
.jt-wx-temp b{color:var(--ink);font-size:15px;font-variant-numeric:tabular-nums}
.jt-wx-rain{display:inline-flex;align-items:center;gap:4px;font-weight:800;color:#0A6A8B;background:#EAF4F8;border-radius:999px;padding:4px 10px;font-size:14px;font-variant-numeric:tabular-nums}
.jt-wx-tip{margin-top:8px;font-size:13px;font-weight:700;color:#0A6A8B}
.jt-wx-hours{display:grid;grid-template-columns:repeat(5,1fr);margin-top:10px;border-top:1px solid var(--soft);padding-top:8px}
.jt-wx-hours li{display:flex;flex-direction:column;align-items:center;gap:2px;font-variant-numeric:tabular-nums}
.jt-wx-hours span{font-size:11px;color:var(--muted);font-weight:700}
.jt-wx-hours b{font-size:14px}
.jt-wx-hours em{font-style:normal;font-size:11px;color:#0A6A8B;min-height:14px}
.jt-wx-msg{font-size:13.5px;margin-top:6px;color:#33405C}
.jt-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
.jt-wxchip{flex:0 0 auto;display:inline-flex;align-items:center;gap:3px;font-size:12px;font-weight:700;background:var(--paper);border-radius:999px;padding:2px 8px;font-variant-numeric:tabular-nums;white-space:nowrap}
.jt-wxchip em{font-style:normal;color:#0A6A8B;margin-left:2px}
.jt-total .jt-fx{display:block;margin-top:4px;font-size:12px;color:var(--muted);font-weight:500}
.jt-fxhint b{color:var(--ink);font-size:15px}
/* 한글 지도 */
.jt-mlwrap{position:relative}
.jt-ml{height:min(58vh,460px);min-height:320px;border-radius:12px;overflow:hidden;background:#DDE2EA}
.jt-mlmsg{position:absolute;left:12px;right:60px;top:12px;background:rgba(255,255,255,.95);border-radius:10px;padding:8px 10px;font-size:13px;font-weight:600;color:#33405C;pointer-events:none}
.jt-mlpin{background:none;border:0;padding:0;cursor:pointer;line-height:0;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
.jt-mlpin.temp{pointer-events:none}
.jt .maplibregl-ctrl-group button{width:38px;height:38px}
/* 일정/가고 싶은 곳 댓글 */
.jt-card-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px}
.jt-card-foot .jt-by{margin-top:0}
.jt-cbtn{padding:3px 10px;font-size:13px}
.jt-card .jt-comments,.jt-wish .jt-comments{margin-top:10px;cursor:auto}
.jt-mappanel .jt-comments{margin-top:2px}
.jt:has(.jt-comments input:focus) .jt-fab{display:none}
/* 이모티콘 반응 */
.jt-react{position:relative;display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px}
.jt-rchip{display:inline-flex;align-items:center;gap:3px;background:#fff;border:1.5px solid var(--rule);border-radius:999px;padding:2px 9px;font-size:13px;font-weight:700;color:#33405C;font-variant-numeric:tabular-nums;line-height:1.4}
.jt-rchip.on{border-color:var(--ink);background:#EEF1F6;color:var(--ink)}
.jt-rchip.add{color:var(--muted);padding:3px 8px}
.jt-rchip.add.open{border-color:var(--ink);color:var(--ink)}
.jt-emoji{font-size:15px;line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.jt-rpop{position:absolute;z-index:30;background:#fff;border-radius:16px;box-shadow:0 6px 24px rgba(20,33,61,.22);padding:6px;min-width:226px;animation:jt-pop .14s ease-out}
.jt-rpop.up{bottom:calc(100% + 6px)}.jt-rpop.down{top:calc(100% + 6px)}.jt-rpop.right{right:0}.jt-rpop.left{left:0}
@keyframes jt-pop{from{transform:translateY(4px) scale(.96);opacity:0}to{transform:none;opacity:1}}
.jt-rpop-row{display:flex;gap:2px}
.jt-rpick{width:42px;height:42px;border:0;border-radius:12px;background:none;font-size:25px;line-height:1;display:grid;place-items:center;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.jt-rpick:active{transform:scale(1.15)}
.jt-rpick.on{background:#EEF1F6}
.jt-rwho{border-top:1px solid var(--soft);margin-top:6px;padding:6px 6px 2px;display:flex;flex-direction:column;gap:3px;font-size:12px;color:#33405C}
.jt-rwho li{display:flex;align-items:center;gap:6px}
.jt-card-foot{flex-wrap:wrap}
.jt-card-foot .jt-react{margin-left:auto}
.jt-post-foot{flex-wrap:wrap;align-items:center}
@media (prefers-reduced-motion:reduce){.jt-rpop{animation:none}}
/* 내 주변 */
.jt-near-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px}
.jt-near-head span{display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:700;color:#33405C}
.jt-near-msg{margin:-2px 2px 10px}
.jt-radius{margin-bottom:12px}
.jt-near-list{display:flex;flex-direction:column;background:#fff;border-radius:16px;overflow:hidden}
.jt-near{display:flex;gap:10px;padding:12px 14px;align-items:flex-start}
.jt-near+.jt-near{border-top:1px solid var(--soft)}
.jt-near-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.jt-near-main strong{font-size:15px;line-height:1.3}
.jt-near-sub{font-size:12px;color:var(--muted)}
.jt-near-meta{display:flex;flex-wrap:wrap;gap:4px 8px;font-size:12.5px;color:var(--muted);align-items:center}
.jt-star{display:inline-flex;align-items:center;gap:3px;color:#B7791F;font-weight:800}
.jt-star em{font-style:normal;font-weight:500;color:var(--muted)}
.jt-open{color:#0A7D58;font-weight:700}
.jt-closed{color:#B42318;font-weight:700}
.jt-near-dist{display:inline-flex;align-items:center;gap:4px;font-size:12px;color:#33405C;font-variant-numeric:tabular-nums}
.jt-near-act{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex:0 0 auto}
.jt-near-saved{display:inline-flex;align-items:center;gap:3px;font-size:12.5px;font-weight:700;color:#0A7D58;padding:5px 2px}
.jt-near-src{font-size:11px;color:var(--muted);margin:8px 2px 0;text-align:right}
/* 오사카 사진 헤더 */
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
@media (prefers-reduced-motion:reduce){.jt-hero img.on{animation:none}.jt-hero img{transition:opacity .6s}.jt-head.hero{transition:none}}
/* 상단 줄이기 */
.jt-head-btns{display:flex;gap:6px}
.jt-head.hero.mini{min-height:0;padding:10px 14px;border-radius:0 0 16px 16px}
.jt-head.hero.mini .jt-head-top{margin-bottom:0;gap:10px}
.jt-head.hero.mini .jt-me,.jt-head.hero.mini .jt-icon.light{background:rgba(255,255,255,.12)}
.jt-mini-title{flex:1;min-width:0;display:flex;align-items:center;gap:8px;font-size:16px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jt-mini-title em{font-style:normal;flex:0 0 auto;background:#fff;color:var(--ink);font-size:12px;font-weight:800;padding:1px 8px;border-radius:999px}
/* 가족 위치 */
.jt-nav{grid-template-columns:repeat(5,1fr)}
.jt-nav button{font-size:11px;letter-spacing:-.02em}
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
/* 일정 장소 검색, 시간표 추가 */
.jt-form-results{margin:-6px 0 0}
.jt-picked{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;background:#EEF6F1;border-radius:10px;padding:8px 10px;font-size:13px;font-weight:700;color:#0A7D58;margin-top:-6px}
.jt-picked span{flex:1;min-width:120px}
.jt-ghost.sm{padding:4px 6px;font-size:12px}
.jt-tt-lane{cursor:pointer}
.jt-tt-ghost{position:absolute;left:2px;right:2px;border:1.5px dashed var(--lc);border-radius:8px;background:color-mix(in srgb,var(--lc) 8%,#fff);font-size:12px;font-weight:700;color:var(--ink);display:flex;align-items:center;padding:0 8px;pointer-events:none}
/* 위치 공유 버튼, 알림 */
.jt-locbtn{position:relative}
.jt-locbtn i{position:absolute;right:5px;top:5px;width:9px;height:9px;border-radius:50%;background:#9AA3B5;border:2px solid rgba(20,33,61,.9)}
.jt-locbtn.on i{background:#2FD38A}
.jt-head.hero .jt-locbtn.on{background:rgba(10,155,110,.55)}
.jt-ask{font-size:15px;line-height:1.6;color:#33405C}
.jt-ask-hint{margin-top:-6px}
.jt-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(84px + env(safe-area-inset-bottom));z-index:40;background:var(--ink);color:#fff;font-size:13.5px;font-weight:600;padding:10px 16px;border-radius:12px;max-width:min(92vw,480px);box-shadow:0 6px 18px rgba(20,33,61,.3);animation:jt-up .2s ease-out}
/* 위치 공유 도움말 */
.jt-helpbtn{align-self:flex-start;display:inline-flex;align-items:center;gap:4px;margin-top:4px;background:var(--paper);border:0;border-radius:999px;padding:3px 10px;font-size:12.5px;font-weight:700;color:#33405C}
.jt-helplist{display:flex;flex-direction:column;gap:12px;margin-bottom:18px}
.jt-helplist li{background:#fff;border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:3px;border-left:4px solid #0A9B6E}
.jt-helplist b{font-size:15px}
.jt-helplist span{font-size:14px;line-height:1.55;color:#33405C}
/* 채팅 */
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
`;

// src/main.jsx
import { jsx as X, jsxs as $t } from "react/jsx-runtime";
var Ra = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{trip}/{document=**} {
      allow read, write: if trip.size() >= 12;
    }
  }
}`, Vo = (t) => {
  let a = t && (t.code || t.message) || "";
  return a.includes("permission") ? "Firebase 보안 규칙이 막고 있어요. 아래 규칙을 Firestore '규칙' 탭에 붙여넣고 '게시'를 눌러 주세요." : a.includes("timeout") ? "Firebase에 연결되지 않았어요. 인터넷 연결과 Firestore 데이터베이스를 만들었는지 확인해 주세요." : a.includes("api-key") || a.includes("invalid") ? "설정값이 맞지 않아요. Firebase 콘솔에서 firebaseConfig 부분을 다시 복사해 주세요." : "연결하지 못했어요. 설정값과 인터넷 연결을 확인해 주세요. (" + a + ")";
};
function Zo({ onDone: t }) {
  let [a, n] = Ct("join"), [r, s] = Ct(""), [j, f] = Ct(""), [p, d] = Ct(!1), [b, v] = Ct(""), [N, c] = Ct(!1), z = async (u, A) => {
    d(!0), v("");
    try {
      ve(u, A), await na(), Ze(u, A), t();
    } catch (m) {
      v(Vo(m)), d(!1);
    }
  }, g = () => {
    let u = aa(r);
    if (!u) {
      v("설정값을 찾지 못했어요. apiKey, projectId, appId가 들어 있는 firebaseConfig 부분 전체를 붙여넣어 주세요.");
      return;
    }
    z(u, ea());
  }, l = () => {
    let u = je(j);
    if (!u) {
      v("초대 링크가 아니에요. 가족에게 받은 주소 전체를 붙여넣어 주세요.");
      return;
    }
    z(u.c, u.t);
  };
  return /* @__PURE__ */ $t("div", { className: "jt", children: [
    /* @__PURE__ */ X("style", { children: _e }),
    /* @__PURE__ */ $t("div", { className: "jt-setup", children: [
      /* @__PURE__ */ X("h1", { children: "가족 여행 앱" }),
      /* @__PURE__ */ $t("div", { className: "jt-seg", role: "tablist", children: [
        /* @__PURE__ */ X("button", { role: "tab", "aria-selected": a === "join", className: a === "join" ? "on" : "", onClick: () => n("join"), children: "초대받았어요" }),
        /* @__PURE__ */ X("button", { role: "tab", "aria-selected": a === "new", className: a === "new" ? "on" : "", onClick: () => n("new"), children: "처음 만들어요" })
      ] }),
      a === "join" ? /* @__PURE__ */ $t("div", { className: "jt-form", children: [
        /* @__PURE__ */ X("p", { className: "jt-lead", children: "가족에게 받은 초대 링크를 누르면 바로 들어와요. 홈 화면 아이콘으로 열었는데 이 화면이 보이면, 초대 링크를 아래에 붙여넣어 주세요." }),
        /* @__PURE__ */ X("textarea", { rows: 3, value: j, onChange: (u) => f(u.target.value), placeholder: "https://…#j=…", "aria-label": "초대 링크" }),
        b && /* @__PURE__ */ X("p", { className: "jt-warn-inline", children: b }),
        /* @__PURE__ */ X("button", { className: "jt-primary", disabled: p || !j.trim(), onClick: l, children: p ? "연결 중" : "여행에 들어가기" })
      ] }) : /* @__PURE__ */ $t("div", { className: "jt-form", children: [
        /* @__PURE__ */ X("p", { className: "jt-lead", children: "가족 중 한 명만 한 번 하면 돼요. Firebase 프로젝트의 웹 앱 설정값(firebaseConfig)을 붙여넣어 주세요." }),
        /* @__PURE__ */ X(
          "textarea",
          {
            rows: 7,
            value: r,
            onChange: (u) => s(u.target.value),
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
        /* @__PURE__ */ $t("div", { className: "jt-field", children: [
          /* @__PURE__ */ X("span", { children: "Firestore 보안 규칙 (규칙 탭에 붙여넣기)" }),
          /* @__PURE__ */ X("pre", { className: "jt-rules", children: Ra }),
          /* @__PURE__ */ X(
            "button",
            {
              type: "button",
              className: "jt-secondary",
              onClick: async () => {
                try {
                  await navigator.clipboard.writeText(Ra), c(!0);
                } catch {
                  c(!1);
                }
              },
              children: N ? "규칙을 복사했어요" : "규칙 복사"
            }
          )
        ] }),
        b && /* @__PURE__ */ X("p", { className: "jt-warn-inline", children: b }),
        /* @__PURE__ */ X("button", { className: "jt-primary", disabled: p || !r.trim(), onClick: g, children: p ? "연결 확인 중" : "연결하고 여행 만들기" })
      ] })
    ] }),
    /* @__PURE__ */ X("style", { children: ".jt-lead{font-size:14px;color:#33405C}.jt-rules{margin:0;font-size:11.5px;line-height:1.5;background:#fff;border-radius:10px;padding:10px 12px;overflow-x:auto;white-space:pre}.jt .jt-setup .jt-seg{margin-bottom:16px}" })
  ] });
}
function Qo() {
  let [t, a] = Ct(() => {
    let n = Ve();
    if (!n) return !1;
    try {
      return ve(n.c, n.t), !0;
    } catch {
      return !1;
    }
  });
  return qo(() => {
    "serviceWorker" in navigator && location.protocol === "https:" && navigator.serviceWorker.register("./sw.js").catch(() => {
    });
  }, []), t ? /* @__PURE__ */ X(Re, {}) : /* @__PURE__ */ X(Zo, { onDone: () => a(!0) });
}
Xo(document.getElementById("root")).render(/* @__PURE__ */ X(Qo, {}));
