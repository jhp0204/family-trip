var CSS = `
.jt{--ink:#14213D;--muted:#66718A;--rule:#DCE1EA;--card:#fff;--blue:#0C86AE;font-family:"Pretendard","Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif;background:var(--paper);color:var(--ink);min-height:100vh;max-width:520px;margin:0 auto;display:flex;flex-direction:column;position:relative;font-size:15px;line-height:1.45;-webkit-text-size-adjust:100%;--paper:#F1F3F6;--soft:#E7EAF0}
.jt *{box-sizing:border-box}
:where(.jt) button{font:inherit;color:inherit;cursor:pointer}
.jt button:focus-visible,.jt input:focus-visible,.jt select:focus-visible,.jt textarea:focus-visible,.jt [role=button]:focus-visible,.jt a:focus-visible{outline:3px solid var(--blue);outline-offset:2px}
.jt h1,.jt h3,.jt h4,.jt p,.jt ul,.jt ol{margin:0;padding:0}
.jt ul,.jt ol{list-style:none}
.jt-loading{padding:96px 20px;text-align:center;color:var(--muted);font-size:15px;font-weight:600}
.jt-loading-sub{margin-top:10px;font-size:13px;font-weight:500}
.jt-dots{display:flex;justify-content:center;gap:9px;height:22px;align-items:flex-end;margin-bottom:14px}
.jt-dots i{width:10px;height:10px;border-radius:50%;animation:jt-dot 1.1s ease-in-out infinite}
.jt-dots i:nth-child(1){background:#E8800A}
.jt-dots i:nth-child(2){background:#D9262E;animation-delay:.15s}
.jt-dots i:nth-child(3){background:#0A9B6E;animation-delay:.3s}
@keyframes jt-dot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-10px);opacity:1}}
@keyframes jt-dotfade{0%,100%{opacity:.35}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){.jt-dots i{animation:jt-dotfade 1.4s ease-in-out infinite}}
.jt-head{background:var(--ink);color:#fff}
.jt-head-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.jt-head h1{font-size:26px;font-weight:800;letter-spacing:-.02em;line-height:1.2}
.jt-head-sub{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:6px;color:#C4CCDD;font-size:14px}
.jt-dday{background:#fff;color:var(--ink);font-weight:700;font-size:13px;padding:2px 10px;border-radius:999px}
.jt-me{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:0;color:#fff;padding:4px 12px 4px 4px;border-radius:999px;font-weight:600}
.jt-avatar{display:inline-grid;place-items:center;border-radius:50%;color:#fff;font-weight:800;flex:0 0 auto}
.jt-icon{background:none;border:0;padding:8px;border-radius:50%;display:grid;place-items:center;color:var(--ink)}
.jt-icon.sm{padding:6px;color:var(--muted)}
.jt-icon.light{color:#fff}
.jt-error{margin:12px 16px 0;background:#FDECEC;color:#9B1C1C;border-radius:10px;padding:10px 12px;display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:14px}
.jt-error button{background:none;border:0;padding:2px;color:inherit}
.jt-nav{position:sticky;bottom:0;display:grid;padding-bottom:env(safe-area-inset-bottom);z-index:10;grid-template-columns:repeat(5,1fr)}
.jt-nav button{background:none;border:0;display:flex;flex-direction:column;align-items:center;gap:3px;font-weight:600;color:var(--muted);white-space:nowrap}
.jt-days{display:flex;gap:8px;overflow-x:auto;padding:10px 2px 14px;margin:0 -2px;scrollbar-width:none;scroll-snap-type:x proximity}
.jt-days::-webkit-scrollbar{display:none}
.jt-day.active .jt-line{margin-top:4px}
.jt-row{display:grid;grid-template-columns:46px 26px 1fr;column-gap:4px;padding-bottom:8px}
.jt-time{font-size:13px;font-weight:700;color:var(--muted);text-align:right;font-variant-numeric:tabular-nums;padding-top:6px}
.jt-rail{position:relative}
.jt-rail::before{content:"";position:absolute;left:50%;top:0;bottom:-10px;width:5px;margin-left:-2.5px;background:var(--lc)}
.jt-row:only-child .jt-rail::before{display:none}
.jt-node{position:absolute;left:50%;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#fff;border:5px solid var(--lc);top:9px}
.jt-card{background:var(--card);border:1px solid var(--rule);cursor:pointer}
.jt-card:active{background:#F8F9FB}
.jt-card-title{font-weight:700;font-size:16px}
.jt-meta{display:flex;align-items:center;gap:4px;color:var(--muted);font-size:13px;margin-top:2px}
.jt-memo{font-size:14px;margin-top:6px;white-space:pre-wrap;color:#33405C}
.jt-by{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);margin-top:8px}
.jt-by.grow{margin:0;margin-left:auto}
.jt-empty{text-align:center;color:var(--muted)}
.jt-empty p:first-child{font-weight:700;color:var(--ink);margin-bottom:4px}
.jt-chips{display:flex;flex-wrap:wrap;gap:8px}
.jt-filter{margin-bottom:12px}
.jt-chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid var(--rule);border-radius:999px;padding:6px 14px;font-weight:600;font-size:14px;color:var(--muted)}
.jt-chip.on{background:var(--ink);border-color:var(--ink);color:#fff}
.jt-chip button{background:none;border:0;padding:0;display:grid;color:inherit}
.jt-primary{background:var(--ink);color:#fff;border:0;border-radius:12px;padding:14px;font-weight:700;font-size:16px;width:100%}
.jt-primary:disabled{opacity:.35;cursor:not-allowed}
.jt-secondary{background:#fff;border:1.5px solid var(--ink);border-radius:10px;padding:8px 14px;font-weight:700;white-space:nowrap}
.jt-secondary:disabled{opacity:.4;cursor:not-allowed}
.jt-secondary.sm{padding:5px 11px;font-size:13px;border-radius:999px}
.jt-ghost{background:none;border:0;padding:10px;color:var(--muted);font-weight:600}
.jt-del{background:none;border:0;color:var(--muted);display:inline-flex;align-items:center;gap:4px;padding:6px;font-size:13px;border-radius:8px}
.jt-del.armed{background:#FDECEC;color:#B42318;font-weight:700}
.jt-form{display:flex;flex-direction:column;gap:14px}
.jt-field{display:flex;flex-direction:column;gap:6px}
.jt-field>span{font-size:13px;font-weight:700;color:#33405C}
.jt input,.jt select,.jt textarea{font:inherit;font-size:16px;color:var(--ink);background:#fff;border:1.5px solid var(--rule);border-radius:10px;padding:11px 12px;width:100%}
.jt textarea{resize:vertical}
.jt-inline{display:flex;gap:8px;margin-top:4px}
.jt-hint{font-size:13px;color:var(--muted);margin-top:-6px}
.jt-note{font-size:12px;color:var(--muted);text-align:center}
.jt-stepper{display:flex;align-items:center;gap:16px}
.jt-stepper button{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--ink);background:#fff;font-size:22px;font-weight:700;line-height:1}
.jt-stepper strong{font-size:18px;min-width:44px;text-align:center}
.jt-setup{padding:28px 20px 40px}
.jt-setup h1{font-size:26px;font-weight:800;letter-spacing:-.02em;margin-bottom:20px}
.jt-who-list{display:flex;flex-direction:column;gap:10px}
.jt-who-btn{display:flex;align-items:center;gap:14px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:12px 16px;font-size:18px;font-weight:700;text-align:left;position:relative}
.jt-who-btn:active{background:#EDF0F5}
.jt-scrim{position:fixed;inset:0;background:rgba(20,33,61,.5);display:flex;align-items:flex-end;justify-content:center;z-index:50}
.jt-sheet{background:var(--paper);width:100%;max-width:520px;max-height:90vh;overflow:auto;border-radius:18px 18px 0 0;padding:8px 20px 28px;animation:jt-up .22s ease-out}
@keyframes jt-up{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}
.jt-sheet-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.jt-sheet-head h3{font-size:18px;font-weight:800}
.jt-daypick{display:flex;flex-direction:column;gap:8px}
.jt-daypick button{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid var(--rule);border-radius:12px;padding:10px 14px;font-weight:700;text-align:left}
.jt-list{display:flex;flex-direction:column;gap:10px}
.jt-wish{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px}
.jt-wish-top{display:flex;align-items:center;gap:8px}
.jt-wish-top strong{font-size:16px}
.jt-tag{color:#fff;font-size:12px;font-weight:700;padding:2px 9px;border-radius:6px}
.jt-wish-bottom{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.jt-like{display:inline-flex;align-items:center;gap:5px;background:#fff;border:1.5px solid var(--rule);color:var(--muted);border-radius:999px;padding:4px 11px;font-weight:700}
.jt-like.on{color:#D9262E;border-color:#D9262E;background:#FEF3F3}
.jt-like.open{color:var(--ink);border-color:var(--ink)}
.jt-planned{font-size:13px;font-weight:700}
.jt-total{background:#fff;border:1px solid var(--rule);border-radius:12px;display:flex;flex-direction:column;margin-bottom:12px;padding:18px 18px 16px}
.jt-total span{font-size:13px;color:var(--muted);font-weight:600}
.jt-total em{font-style:normal;color:var(--muted)}
.jt-seg{display:grid;grid-template-columns:1fr 1fr;background:#E3E7EE;border-radius:10px;padding:3px;margin-bottom:14px}
.jt-seg button{background:none;border:0;padding:8px;border-radius:8px;font-weight:700;color:var(--muted)}
.jt-seg button.on{background:#fff;color:var(--ink)}
.jt-pip{width:12px;height:12px;border-radius:50%;background:var(--lc)}
.jt-spend{width:100%;text-align:left;background:#fff;border:1px solid var(--rule);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px}
.jt-spend:active{background:#F8F9FB}
.jt-spend-main{min-width:0;flex:1}
.jt-spend-amt{display:flex;flex-direction:column;align-items:flex-end;text-align:right;flex:0 0 auto}
.jt-spend-amt strong{font-variant-numeric:tabular-nums}
.jt-spend-amt span{font-size:12px;color:var(--muted)}
.jt-moves{display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
.jt-moves li{background:#fff;border:1px solid var(--rule);border-left:5px solid var(--ink);border-radius:10px;padding:12px;display:grid;grid-template-columns:1fr auto;align-items:baseline;column-gap:10px}
.jt-moves li strong{font-size:18px;font-variant-numeric:tabular-nums}
.jt-moves li em{grid-column:2;font-style:normal;font-size:12px;color:var(--muted);text-align:right}
.jt-person-main{display:flex;flex-direction:column;flex:1;min-width:0}
.jt-person-main span{font-size:12px;color:var(--muted)}
.jt-net{font-weight:700;color:var(--muted);text-align:right;font-size:13px;line-height:1.3;white-space:nowrap;font-variant-numeric:tabular-nums}
.jt-net.plus{color:#0A7D58}
.jt-net.minus{color:#B42318}
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
.jt-formmsg{margin:0}
.jt-maprow{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.jt-maplink{display:inline-flex;align-items:center;gap:5px;background:#EAF4F8;color:#0A6A8B;border:0;border-radius:8px;padding:6px 11px;font-size:13px;font-weight:700;text-decoration:none}
.jt-maplink.inline{margin-top:8px}
.jt-embed{margin-top:10px}
.jt-embed iframe{width:100%;height:220px;border:0;border-radius:10px;background:#E3E7EE}
.jt-embed p{font-size:12px;color:var(--muted);margin-top:4px}
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
@media (prefers-reduced-motion:reduce){.jt-sheet{animation:none}
}
.jt-main{flex:1;padding:16px 16px 150px}
.jt-head{padding:12px 20px 22px;border-radius:0 0 22px 22px}
.jt-card,.jt-wish,.jt-total,.jt-mappanel,.jt-results,.jt-who-btn,.jt-daypick button{border-color:transparent;border-radius:16px}
.jt-empty{background:#fff;border-radius:16px;padding:32px 20px;margin-top:4px}
.jt-nav{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-top:1px solid rgba(20,33,61,.06)}
.jt-nav button.on{box-shadow:none;color:var(--ink);font-weight:800}
.jt-nav-ic{height:30px;border-radius:999px;display:grid;place-items:center;transition:background .15s}
.jt-nav button.on .jt-nav-ic{background:var(--ink);color:#fff}
.jt-fab{position:fixed;z-index:20;bottom:calc(78px + env(safe-area-inset-bottom));right:max(16px,calc(50% - 244px));display:inline-flex;align-items:center;gap:6px;background:var(--ink);color:#fff !important;border:0;border-radius:999px;padding:14px 20px 14px 16px;font-weight:800;font-size:15px;box-shadow:0 6px 18px rgba(20,33,61,.28)}
.jt-fab:active{transform:scale(.97)}
.jt-total strong{font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;font-size:36px;margin-top:2px}
.jt-catbar{display:flex;gap:3px;height:10px;margin-top:14px;border-radius:999px;overflow:hidden}
.jt-catbar i{display:block;min-width:4px}
.jt-catlegend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-size:13px;color:var(--muted)}
.jt-catlegend li{display:inline-flex;align-items:center;gap:5px}
.jt-catlegend b{color:var(--ink);font-variant-numeric:tabular-nums}
.jt-dot{width:8px;height:8px;border-radius:50%}
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
.jt-people{display:flex;flex-direction:column;margin-top:8px}
.jt-people li{display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid var(--soft)}
.jt-listhint{margin:0 0 10px 2px}
.jt-group-sum{margin-left:auto;color:var(--muted);font-weight:700;font-variant-numeric:tabular-nums}
.jt-spend-list{background:#fff;border-radius:16px;overflow:hidden}
.jt-spend-list li+li .jt-spend{border-top:1px solid var(--soft)}
.jt-spend-list .jt-spend{border:0;border-radius:0;background:none;padding:12px 14px;gap:12px}
.jt-spend-list .jt-spend:active{background:#F6F7F9}
.jt-spend-icon{width:38px;height:38px;border-radius:12px;flex:0 0 auto;display:grid;place-items:center;color:var(--cc);background:color-mix(in srgb,var(--cc) 13%,#fff)}
.jt-spend-name{font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jt-warn{background:#FFF4E5;border-radius:16px;padding:14px 16px;margin-bottom:14px;color:#6B3A00}
.jt-warn strong{font-size:15px}
.jt-warn p{font-size:13px;margin-top:4px}
.jt-warn ul{margin-top:10px;display:flex;flex-direction:column;gap:6px}
.jt-warn button{width:100%;display:flex;justify-content:space-between;gap:10px;background:#fff;border:0;border-radius:10px;padding:9px 12px;text-align:left;font-weight:700}
.jt-warn em{font-style:normal;font-weight:500;color:var(--muted)}
.jt-warn-inline{background:#FFF4E5;color:#6B3A00;border-radius:10px;padding:10px 12px;font-size:13px}
.jt-explain{font-size:12.5px;color:var(--muted);background:var(--paper);border-radius:10px;padding:10px 12px;margin-top:8px}
@media (prefers-reduced-motion:reduce){.jt-nav-ic{transition:none}}
.jt-seg.three{grid-template-columns:repeat(3,1fr)}
.jt-seg.three button{font-size:14px;padding:9px 4px}
.jt-subhead{font-size:14px;font-weight:800;margin:4px 2px 8px}
.jt-calc{margin-top:12px;background:var(--paper);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:4px;font-size:14px}
.jt-calc span{color:var(--muted)}
.jt-calc b{font-variant-numeric:tabular-nums}
.jt-calc .sum{border-top:1px solid var(--soft);padding-top:6px;margin-top:2px}
.jt-calc .sum span{color:var(--ink);font-weight:700}
.jt-calc b.plus{color:#0A7D58}
.jt-calc b.minus{color:#B42318}
.jt-daynet{background:#fff;border-radius:16px;overflow:hidden}
.jt-daynet li{display:grid;grid-template-columns:12px 1fr auto;column-gap:10px;align-items:center;padding:11px 14px}
.jt-daynet li+li{border-top:1px solid var(--soft)}
.jt-daynet .jt-pip{grid-row:span 2}
.jt-daynet-label{font-weight:700;font-size:14px}
.jt-daynet-sub{grid-column:2;font-size:12px;color:var(--muted)}
.jt-daynet .jt-net{grid-column:3;grid-row:1/span 2}
.jt-daycard{background:#fff;border-radius:16px;padding:12px 0 0;margin-bottom:14px;overflow:hidden}
.jt-daycard h4{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:800;padding:0 14px 8px}
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
.jt-calc div{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
.jt-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.jt input:disabled{background:#F1F3F6;color:var(--muted)}
.jt-clash{display:inline-block;margin-top:6px;font-size:12px;font-weight:700;color:#9A4A00;background:#FFF4E5;border-radius:6px;padding:2px 8px}
.jt-tt-wrap{margin-top:22px}
.jt-tt{position:relative;background:#fff;border-radius:16px;padding:0;margin-top:2px}
.jt-tt-hour{position:absolute;left:0;right:0;height:0;border-top:1px solid var(--soft);margin-top:7px}
.jt-tt-hour span{position:absolute;left:10px;top:-8px;font-size:11px;font-weight:700;color:var(--muted);background:#fff;padding-right:4px;font-variant-numeric:tabular-nums}
.jt-tt-block{position:absolute;border:0;border-radius:8px;text-align:left;padding:5px 8px;overflow:hidden;background:color-mix(in srgb,var(--lc) 14%,#fff);box-shadow:inset 4px 0 0 var(--lc);display:flex;flex-direction:column;gap:1px}
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
.jt-wxchip{flex:0 0 auto;display:inline-flex;align-items:center;gap:3px;font-size:12px;font-weight:700;background:var(--paper);border-radius:999px;padding:2px 8px;font-variant-numeric:tabular-nums;white-space:nowrap}
.jt-wxchip em{font-style:normal;color:#0A6A8B;margin-left:2px}
.jt-total .jt-fx{display:block;margin-top:4px;font-size:12px;color:var(--muted);font-weight:500}
.jt-fxhint b{color:var(--ink);font-size:15px}
.jt-mlwrap{position:relative}
.jt-ml{height:min(58vh,460px);min-height:320px;border-radius:12px;overflow:hidden;background:#DDE2EA}
.jt-mlmsg{position:absolute;left:12px;right:60px;top:12px;background:rgba(255,255,255,.95);border-radius:10px;padding:8px 10px;font-size:13px;font-weight:600;color:#33405C;pointer-events:none}
.jt-mlpin{background:none;border:0;padding:0;cursor:pointer;line-height:0;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
.jt-mlpin.temp{pointer-events:none}
.jt .maplibregl-ctrl-group button{width:38px;height:38px}
.jt-card-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;flex-wrap:wrap}
.jt-card-foot .jt-by{margin-top:0}
.jt-cbtn{padding:3px 10px;font-size:13px}
.jt-card .jt-comments,.jt-wish .jt-comments{margin-top:10px;cursor:auto}
.jt-mappanel .jt-comments{margin-top:2px}
.jt:has(.jt-comments input:focus) .jt-fab{display:none}
.jt-react{position:relative;display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px}
.jt-rchip{display:inline-flex;align-items:center;gap:3px;background:#fff;border:1.5px solid var(--rule);border-radius:999px;padding:2px 9px;font-size:13px;font-weight:700;color:#33405C;font-variant-numeric:tabular-nums;line-height:1.4}
.jt-rchip.on{border-color:var(--ink);background:#EEF1F6;color:var(--ink)}
.jt-rchip.add{color:var(--muted);padding:3px 8px}
.jt-rchip.add.open{border-color:var(--ink);color:var(--ink)}
.jt-emoji{font-size:15px;line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.jt-rpop{position:absolute;z-index:30;background:#fff;border-radius:16px;box-shadow:0 6px 24px rgba(20,33,61,.22);padding:6px;min-width:226px;animation:jt-pop .14s ease-out}
.jt-rpop.up{bottom:calc(100% + 6px)}
.jt-rpop.down{top:calc(100% + 6px)}
.jt-rpop.right{right:0}
.jt-rpop.left{left:0}
@keyframes jt-pop{from{transform:translateY(4px) scale(.96);opacity:0}to{transform:none;opacity:1}}
.jt-rpop-row{display:flex;gap:2px}
.jt-rpick{width:42px;height:42px;border:0;border-radius:12px;background:none;font-size:25px;line-height:1;display:grid;place-items:center;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.jt-rpick:active{transform:scale(1.15)}
.jt-rpick.on{background:#EEF1F6}
.jt-rwho{border-top:1px solid var(--soft);margin-top:6px;padding:6px 6px 2px;display:flex;flex-direction:column;gap:3px;font-size:12px;color:#33405C}
.jt-rwho li{display:flex;align-items:center;gap:6px}
.jt-card-foot .jt-react{margin-left:auto}
@media (prefers-reduced-motion:reduce){.jt-rpop{animation:none}}
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
