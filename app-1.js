// src/main.jsx
import { useState as _t, useEffect as ss } from "react";
import { createRoot as rs } from "react-dom/client";

// src/app.jsx
import uo, { useState as j, useEffect as K, useMemo as le, useCallback as fo, useRef as J } from "react";
import {
  Plus as go,
  X as Gt,
  Heart as an,
  Trash2 as ho,
  MapPin as Et,
  Settings as bo,
  CalendarDays as xo,
  Wallet as jo,
  Check as ca,
  ExternalLink as Bt,
  Map as yo,
  MessageSquare as vo,
  Image as wo,
  Link2 as ko,
  Send as pa,
  Pencil as Xt,
  ChevronLeft as da,
  ChevronRight as ma,
  ChevronDown as Ct,
  ChevronUp as ua,
  Users as No,
  Crosshair as Co,
  HelpCircle as zo,
  MessagesSquare as Eo,
  Megaphone as fa,
  Lock as Ao,
  WifiOff as So,
  Wifi as Mo,
  Pin as Io,
  PinOff as On,
  Utensils as Do,
  TrainFront as Fo,
  BedDouble as Po,
  Ticket as $o,
  ShoppingBag as Ro,
  MoreHorizontal as To,
  Sun as Bo,
  CloudSun as _o,
  Cloud as Un,
  CloudFog as Lo,
  CloudDrizzle as Oo,
  CloudRain as Uo,
  CloudSnow as Ko,
  CloudLightning as Wo,
  Umbrella as Ho,
  SmilePlus as Yo,
  LocateFixed as Jo,
  Star as Go,
  Navigation as At
} from "lucide-react";

// src/store.js
import { initializeApp as ao } from "firebase/app";
import {
  initializeFirestore as Mn,
  persistentLocalCache as oo,
  persistentMultipleTabManager as io,
  collection as so,
  doc as Le,
  onSnapshot as ro,
  setDoc as Fn,
  getDoc as lo,
  deleteDoc as co
} from "firebase/firestore";
var ne = "fjt:", wt = { config: null, code: null }, We = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), po = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function He(e) {
  try {
    let n = String(e || "").trim(), o = n.includes("#") ? n.slice(n.indexOf("#") + 1) : n, i = new URLSearchParams(o).get("j") || (o.startsWith("j=") ? o.slice(2) : "");
    if (!i) return null;
    let s = po(i);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function Pn() {
  let e = He(location.hash);
  if (e)
    return localStorage.setItem(ne + "conn", JSON.stringify(e)), e;
  try {
    let n = JSON.parse(localStorage.getItem(ne + "conn"));
    if (n && n.c && n.t)
      return history.replaceState(null, "", "#j=" + We(n)), n;
  } catch {
  }
  return null;
}
function $n(e, n) {
  let o = { c: e, t: n };
  return localStorage.setItem(ne + "conn", JSON.stringify(o)), history.replaceState(null, "", "#j=" + We(o)), o;
}
var Rn = () => location.origin + location.pathname + "#j=" + We({ c: wt.config, t: wt.code });
function Tn() {
  localStorage.removeItem(ne + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var Bn = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", n = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(n, (o) => e[o % e.length]).join("");
};
function _n(e) {
  let n = String(e || "");
  try {
    let i = JSON.parse(n);
    if (i.apiKey && i.projectId && i.appId) return i;
  } catch {
  }
  let o = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((i) => {
    let s = n.match(new RegExp(i + `\\s*[:=]\\s*["']([^"']+)["']`));
    s && (o[i] = s[1]);
  }), o.apiKey && o.projectId && o.appId ? o : null;
}
var Ot = null, vt = /* @__PURE__ */ new Map(), Oe = /* @__PURE__ */ new Set(), Ue = Promise.resolve(), Re = null, je = !1, In = null, Te = () => {
  clearTimeout(In), In = setTimeout(() => Oe.forEach((e) => e()), 250);
}, Ke = (e) => e.startsWith("trip:photo:"), Be = (e) => Ke(e) ? Le(Ot, "trips", wt.code, "photos", e.slice(11)) : Le(Ot, "trips", wt.code, "data", e), _e = (e) => ne + wt.code + ":" + e, Dn = (e) => Promise.race([e.then(() => !0), new Promise((n) => setTimeout(() => n(!0), 4e3))]);
function Ye(e, n) {
  Re && Re(), vt.clear(), wt.config = e, wt.code = n;
  let o = ao(e, "fjt-" + Date.now());
  try {
    Ot = Mn(o, { localCache: oo({ tabManager: io() }) });
  } catch {
    Ot = Mn(o, {});
  }
  let i;
  je = !1, Ue = new Promise((m) => i = m), setTimeout(() => i(), 8e3);
  let s = !0;
  Re = ro(
    so(Ot, "trips", n, "data"),
    { includeMetadataChanges: !0 },
    (m) => {
      let u = m.docChanges();
      u.forEach((r) => {
        r.type === "removed" ? vt.delete(r.doc.id) : vt.set(r.doc.id, r.doc.data().v);
      });
      let p = !m.metadata.fromCache;
      (p || m.size > 0) && i(), p && !je ? (je = !0, Te()) : !s && u.length && Te(), s = !1;
    },
    () => {
      i(), Te();
    }
  ), window.storage = mo;
}
async function Ln() {
  let e = Le(Ot, "trips", wt.code, "data", "_ping");
  await Promise.race([
    Fn(e, { v: "ok", t: Date.now() }),
    new Promise((n, o) => setTimeout(() => o(new Error("timeout")), 9e3))
  ]);
}
var mo = {
  async get(e, n) {
    if (!n) {
      let o = localStorage.getItem(_e(e));
      if (o == null) throw new Error("not found");
      return { key: e, value: o, shared: !1 };
    }
    if (Ke(e)) {
      let o = await lo(Be(e));
      if (!o.exists()) throw new Error("not found");
      return { key: e, value: o.data().v, shared: !0 };
    }
    if (await Ue, !vt.has(e)) throw new Error("not found");
    return { key: e, value: vt.get(e), shared: !0 };
  },
  async set(e, n, o) {
    return o ? (Ke(e) || vt.set(e, n), await Dn(Fn(Be(e), { v: n, t: Date.now() })), { key: e, value: n, shared: !0 }) : (localStorage.setItem(_e(e), n), { key: e, value: n, shared: !1 });
  },
  async delete(e, n) {
    return n ? (vt.delete(e), await Dn(co(Be(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(_e(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", n) {
    return n ? (await Ue, { keys: [...vt.keys()].filter((o) => o.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
  },
  // 서버와 한 번이라도 맞춰졌는지 (처음 연 기기에서 빈 화면을 "여행 없음"으로 착각하지 않게)
  isSynced() {
    return je;
  },
  onChange(e) {
    return Oe.add(e), () => Oe.delete(e);
  }
};

// src/app.jsx
import { Fragment as st, jsx as t, jsxs as a } from "react/jsx-runtime";
var X = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice", board: "trip:board" }, on = (e) => "trip:photo:" + e, ae = 6, V = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], Xo = ["일", "월", "화", "수", "목", "금", "토"], sn = ["맛집", "관광", "쇼핑", "기타"], ga = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Ht = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Kn = {
  식비: { Icon: Do, color: "#D9262E" },
  교통: { Icon: Fo, color: "#0C86AE" },
  숙소: { Icon: Po, color: "#7B5FC4" },
  체험: { Icon: $o, color: "#E8800A" },
  쇼핑: { Icon: Ro, color: "#0A9B6E" },
  기타: { Icon: To, color: "#66718A" }
}, Qe = (e) => Kn[e] || Kn.기타, yt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), dt = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Ft = (e) => {
  let [n, o, i] = e.split("-").map(Number);
  return new Date(n, o - 1, i);
}, ft = (e, n) => {
  let o = Ft(e);
  return o.setDate(o.getDate() + n), o;
}, Rt = (e) => `${e.getMonth() + 1}/${e.getDate()}`, St = (e) => Xo[e.getDay()], Pt = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), Yt = (e, n) => "₩" + (Math.round(e * n / 100 / 100) * 100).toLocaleString("ko-KR"), ha = 900, it = (e) => `${Pt(e)}(${Yt(e, ha)})`, ot = (e) => String(e).padStart(2, "0"), ke = (e) => {
  let n = (Date.now() - e) / 1e3;
  if (n < 60) return "방금";
  if (n < 3600) return `${Math.floor(n / 60)}분 전`;
  if (n < 86400) return `${Math.floor(n / 3600)}시간 전`;
  let o = new Date(e);
  return `${o.getMonth() + 1}/${o.getDate()} ${ot(o.getHours())}:${ot(o.getMinutes())}`;
}, Wn = (e) => {
  let n = (e || "").trim();
  if (!n) return "";
  /^https?:\/\//i.test(n) || (n = "https://" + n);
  try {
    let o = new URL(n);
    return o.hostname.includes(".") ? o.href : "";
  } catch {
    return "";
  }
}, qo = (e) => {
  try {
    return new URL(e).hostname.replace(/^www\./, "");
  } catch {
    return e;
  }
}, $t = (e) => {
  let [n, o] = String(e).split(":").map(Number);
  return n * 60 + (o || 0);
}, Kt = (e) => `${ot(Math.floor(e / 60) % 24)}:${ot(e % 60)}`, pe = (e) => {
  let n = $t(e.time), o = e.end ? $t(e.end) : n + 60;
  return o <= n && (o = n + 60), { s: n, e: Math.min(o, 24 * 60) };
}, ba = (e) => {
  let n = Math.floor(e / 60), o = e % 60;
  return [n ? `${n}시간` : "", o ? `${o}분` : ""].filter(Boolean).join(" ");
};
function Vo(e) {
  let n = e || "", o = n.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (o) return `${ot(Number(o[2]))}:${o[3]}`;
  if (o = n.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !o) return "";
  let i = o[3] === "반" ? 30 : o[4] ? Number(o[4]) : 0;
  return `${ot(Number(o[2]))}:${ot(i)}`;
}
var Zo = Array.from({ length: 24 }, (e, n) => ot(n));
function Hn({ value: e, onChange: n, disabled: o, label: i }) {
  let [s, m] = e ? e.split(":") : ["", ""], u = Array.from({ length: 12 }, (p, r) => ot(r * 5));
  return m && !u.includes(m) && (u = [...u, m].sort()), /* @__PURE__ */ a("div", { className: "jt-tsel" + (o ? " off" : ""), children: [
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 시",
        value: s,
        disabled: o,
        onChange: (p) => n(p.target.value ? `${p.target.value}:${m || "00"}` : ""),
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "--" }),
          Zo.map((p) => /* @__PURE__ */ t("option", { value: p, children: p }, p))
        ]
      }
    ),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 분",
        value: m,
        disabled: o || !s,
        onChange: (p) => n(`${s}:${p.target.value}`),
        children: [
          !s && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          u.map((p) => /* @__PURE__ */ t("option", { value: p, children: p }, p))
        ]
      }
    )
  ] });
}
var Qo = (e) => {
  let n = e.filter((i) => i.time).map((i) => ({ id: i.id, ...pe(i) })), o = /* @__PURE__ */ new Set();
  return n.forEach(
    (i) => n.forEach((s) => {
      i.id !== s.id && i.s < s.e && s.s < i.e && o.add(i.id);
    })
  ), o;
}, Ne = (e) => nt(e) ? `${e.lat},${e.lng}` : e.place ? rn(e.place) : "", ti = (e, n) => {
  let o = e ? Ne(e) : "", i = Ne(n);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (o ? "&origin=" + encodeURIComponent(o) : "");
}, ze = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(nt(e) ? `${e.lat},${e.lng}` : rn(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), rn = (...e) => [...e, "일본"].filter(Boolean).join(" "), nt = (e) => typeof e.lat == "number" && typeof e.lng == "number", xa = (e) => nt(e) ? `${e.lat},${e.lng}` : rn(e.name || e.title, e.area || e.place), Tt = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(xa(e)), ei = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(xa(e)), kt = 256, Je = (e, n, o) => {
  let i = kt * 2 ** o, s = e * Math.PI / 180;
  return {
    x: (n + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * i
  };
}, Yn = (e, n, o) => {
  let i = kt * 2 ** o, s = Math.PI - 2 * Math.PI * n / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: e / i * 360 - 180 };
}, oe = (e) => Math.max(3, Math.min(18, e));
async function Ge(e) {
  let n = await window.storage.list(e, !0), o = (n && n.keys || []).map((s) => typeof s == "string" ? s : s.key).filter(Boolean), i = await Promise.all(o.map((s) => bt(s, null)));
  return o.map((s, m) => [s, i[m]]).filter(([, s]) => s);
}
async function bt(e, n) {
  try {
    let o = await window.storage.get(e, !0);
    return o && o.value ? JSON.parse(o.value) : n;
  } catch {
    return n;
  }
}
async function ht(e, n) {
  try {
    return !!await window.storage.set(e, JSON.stringify(n), !0);
  } catch {
    return !1;
  }
}
var zt = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Map();
function ni(e) {
  if (zt.has(e)) return Promise.resolve(zt.get(e));
  if (ye.has(e)) return ye.get(e);
  let n = bt(on(e), null).then((o) => (ye.delete(e), o && zt.set(e, o), o));
  return ye.set(e, n), n;
}
async function Jn(e) {
  zt.delete(e);
  try {
    await window.storage.delete(on(e), !0);
  } catch {
  }
}
var ai = (e) => new Promise((n, o) => {
  let i = URL.createObjectURL(e), s = new Image();
  s.onload = () => {
    URL.revokeObjectURL(i), n(s);
  }, s.onerror = () => {
    URL.revokeObjectURL(i), o(new Error("bad image"));
  }, s.src = i;
});
async function oi(e) {
  let n = await ai(e), o = 1280, i = 0.7, s = "";
  for (let m = 0; m < 5; m++) {
    let u = Math.min(1, o / Math.max(n.naturalWidth, n.naturalHeight)), p = document.createElement("canvas");
    p.width = Math.max(1, Math.round(n.naturalWidth * u)), p.height = Math.max(1, Math.round(n.naturalHeight * u));
    let r = p.getContext("2d");
    if (r.fillStyle = "#fff", r.fillRect(0, 0, p.width, p.height), r.drawImage(n, 0, 0, p.width, p.height), s = p.toDataURL("image/jpeg", i), s.length < 6e5) break;
    o = Math.round(o * 0.8), i = Math.max(0.4, i - 0.08);
  }
  return s;
}
var ii = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: dt(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function si() {
  for (let [e, n] of ii)
    try {
      let o = await fetch(e);
      if (!o.ok) continue;
      let i = n(await o.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var Gn = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Ce = (e) => e.fx ? `100엔 = ₩${Gn(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${Gn(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Xn(e, n) {
  let o = () => Object.fromEntries(n.map((c) => [c, 0])), i = o(), s = o(), m = [];
  e.forEach((c) => {
    let I = Number(c.amount) || 0, g = (c.split || []).filter((A) => n.includes(A));
    if (!(I <= 0)) {
      if (!g.length || !n.includes(c.payer)) {
        m.push(c);
        return;
      }
      i[c.payer] += I, g.forEach((A) => s[A] += I / g.length);
    }
  });
  let u = Object.fromEntries(n.map((c) => [c, i[c] - s[c]])), p = n.filter((c) => u[c] > 0.5).map((c) => ({ m: c, v: u[c] })).sort((c, I) => I.v - c.v), r = n.filter((c) => u[c] < -0.5).map((c) => ({ m: c, v: -u[c] })).sort((c, I) => I.v - c.v), x = [], k = 0, z = 0;
  for (; k < r.length && z < p.length; ) {
    let c = Math.min(r[k].v, p[z].v);
    c >= 1 && x.push({ from: r[k].m, to: p[z].m, v: Math.round(c) }), r[k].v -= c, p[z].v -= c, r[k].v < 0.5 && k++, p[z].v < 0.5 && z++;
  }
  return { paid: i, share: s, net: u, moves: x, skipped: m };
}
function pt({ name: e, members: n, size: o = 28 }) {
  let i = Math.max(0, n.indexOf(e));
  return /* @__PURE__ */ t(
    "span",
    {
      className: "jt-avatar",
      style: { width: o, height: o, background: V[(i * 2 + 3) % V.length], fontSize: o * 0.46 },
      "aria-hidden": "true",
      children: e ? e[0] : "?"
    }
  );
}
function mt({ label: e, children: n }) {
  return /* @__PURE__ */ a("label", { className: "jt-field", children: [
    /* @__PURE__ */ t("span", { children: e }),
    n
  ] });
}
function Nt({ title: e, onClose: n, children: o }) {
  return K(() => {
    let i = (s) => s.key === "Escape" && n();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: n, children: /* @__PURE__ */ a("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ a("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ t(Gt, { size: 20 }) })
    ] }),
    o
  ] }) });
}
function It({ onConfirm: e, label: n = "삭제" }) {
  let [o, i] = j(!1);
  return K(() => {
    if (!o) return;
    let s = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(s);
  }, [o]), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-del" + (o ? " armed" : ""),
      onClick: (s) => {
        s.stopPropagation(), o ? e() : i(!0);
      },
      children: [
        /* @__PURE__ */ t(ho, { size: 15 }),
        o ? "한 번 더 누르면 삭제돼요" : n
      ]
    }
  );
}
var qn = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function ja(e) {
  let n = {};
  return Object.entries(e.reactions || {}).forEach(([o, i]) => n[o] = [...i]), n;
}
function ri(e, n, o) {
  let i = ja(e), s = (i[n] || []).includes(o), m = {};
  return Object.entries(i).forEach(([u, p]) => {
    let r = p.filter((x) => x !== o);
    r.length && (m[u] = r);
  }), s || (m[n] = [...m[n] || [], o]), { ...e, reactions: m };
}
function ln({ className: e, onTap: n, names: o = [], title: i, members: s = [], children: m, ...u }) {
  let [p, r] = j(!1), [x, k] = j("up left"), z = J(null), c = J(null), I = J(!1);
  K(() => {
    if (!p) return;
    let y = (C) => z.current && !z.current.contains(C.target) && r(!1);
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [p]), K(() => () => clearTimeout(c.current), []);
  let g = () => {
    if (z.current) {
      let y = z.current.getBoundingClientRect();
      k((y.top < 200 ? "down" : "up") + " " + (y.left > window.innerWidth - 210 ? "right" : "left"));
    }
    r(!0), navigator.vibrate && navigator.vibrate(15);
  }, A = () => {
    I.current = !1, clearTimeout(c.current), c.current = setTimeout(() => {
      I.current = !0, g();
    }, 450);
  }, w = () => clearTimeout(c.current);
  return /* @__PURE__ */ a("span", { className: "jt-hold", ref: z, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: e + " jt-holdbtn",
        ...u,
        title: o.length ? o.join(", ") : void 0,
        onPointerDown: A,
        onPointerUp: w,
        onPointerLeave: w,
        onPointerCancel: w,
        onContextMenu: (y) => {
          y.preventDefault(), w(), I.current = !0, g();
        },
        onClick: (y) => {
          if (y.stopPropagation(), I.current) {
            I.current = !1;
            return;
          }
          n(y);
        },
        children: m
      }
    ),
    p && /* @__PURE__ */ a("div", { className: "jt-whopop " + x, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ a("strong", { children: [
        i,
        " ",
        o.length,
        "명"
      ] }),
      o.length ? /* @__PURE__ */ t("ul", { children: o.map((y) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t(pt, { name: y, members: s.length ? s : o, size: 22 }),
        y
      ] }, y)) }) : /* @__PURE__ */ t("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ee({ item: e, me: n, onReact: o, members: i = [] }) {
  let [s, m] = j(!1), [u, p] = j("up right"), r = J(null), x = ja(e), k = () => {
    if (!s && r.current) {
      let g = r.current.getBoundingClientRect(), w = r.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", y = g.top < 190 ? "down" : "up";
      p(y + " " + w);
    }
    m(!s);
  }, z = qn.filter(([g]) => (x[g] || []).length), c = Object.keys(x).find((g) => x[g].includes(n));
  K(() => {
    if (!s) return;
    let g = (A) => r.current && !r.current.contains(A.target) && m(!1);
    return document.addEventListener("pointerdown", g), () => document.removeEventListener("pointerdown", g);
  }, [s]);
  let I = (g) => {
    o(g), m(!1);
  };
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-react",
      ref: r,
      onClick: (g) => g.stopPropagation(),
      onKeyDown: (g) => g.stopPropagation(),
      children: [
        z.map(([g, A]) => /* @__PURE__ */ a(
          ln,
          {
            className: "jt-rchip" + (c === g ? " on" : ""),
            onTap: () => I(g),
            names: x[g],
            members: i,
            title: `${g} ${A}`,
            "aria-pressed": c === g,
            "aria-label": `${A} ${x[g].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t("span", { className: "jt-emoji", children: g }),
              x[g].length
            ]
          },
          g
        )),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (s ? " open" : ""),
            onClick: k,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(Yo, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ a("div", { className: "jt-rpop " + u, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: qn.map(([g, A]) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (c === g ? " on" : ""),
              onClick: () => I(g),
              "aria-label": A,
              title: A,
              children: g
            },
            g
          )) }),
          z.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-rwho", children: z.map(([g]) => /* @__PURE__ */ a("li", { children: [
            /* @__PURE__ */ t("span", { className: "jt-emoji", children: g }),
            x[g].join(", ")
          ] }, g)) })
        ] })
      ]
    }
  );
}
function li() {
  let [e, n] = j(null), [o, i] = j("");
  return K(() => {
    if (!navigator.geolocation) {
      i("fail");
      return;
    }
    let s = !0, m = () => navigator.geolocation.getCurrentPosition(
      (p) => {
        s && (n({ lat: p.coords.latitude, lng: p.coords.longitude }), i(""));
      },
      (p) => s && i(p && p.code === 1 ? "denied" : "fail"),
      { enableHighAccuracy: !1, timeout: 15e3, maximumAge: 6e4 }
    );
    m();
    let u = setInterval(() => document.visibilityState === "visible" && m(), 6e4);
    return () => {
      s = !1, clearInterval(u);
    };
  }, []), [e, o];
}
var Vn = (e) => e < 1e3 ? `${Math.round(e / 10) * 10}m` : e < 1e4 ? `${(e / 1e3).toFixed(1)}km` : `${Math.round(e / 1e3)}km`, ci = (e) => e < 1e3 ? "near" : e < 5e3 ? "mid" : "far", Zn = (e) => String(e || "").toLowerCase().replace(/[\s·・,.\-()（）'"!?&/]/g, "").replace(/(본점|지점|점|店)$/, "");
function Qn(e, n) {
  if (e = Zn(e), n = Zn(n), !e || !n) return 0;
  if (e.includes(n) || n.includes(e)) return 1;
  let o = (p) => {
    let r = /* @__PURE__ */ new Map();
    for (let x = 0; x < p.length - 1; x++) r.set(p.slice(x, x + 2), (r.get(p.slice(x, x + 2)) || 0) + 1);
    return r;
  }, i = o(e), s = o(n), m = 0;
  i.forEach((p, r) => s.has(r) && (m += Math.min(p, s.get(r))));
  let u = e.length - 1 + (n.length - 1);
  return u > 0 ? 2 * m / u : 0;
}
var pi = (e) => e.lat > 24 && e.lat < 46 && e.lng > 122 && e.lng < 154, di = (e) => /^https?:\/\/(share\.google|g\.co\/kgs|(www\.)?google\.[a-z.]+\/search)/i.test(String(e || ""));
async function mi(e, n, o) {
  let i = [[e.name, e.area].filter(Boolean).join(" "), e.name].filter((p, r, x) => p && x.indexOf(p) === r), s = { status: "none" }, m = "", u = "";
  for (let p = 0; p < i.length; p++) {
    p && await new Promise((c) => setTimeout(c, o));
    let r;
    try {
      r = await Ea(i[p], n);
    } catch {
      s = s.status === "none" ? { status: "error" } : s;
      continue;
    }
    if (m = r.engine, r.gErr && (u = r.gErr), !r.list.length) continue;
    let x = r.list.filter(pi).map((c) => ({ r: c, score: Math.max(Qn(e.name, c.name), Qn(e.name, `${c.name} ${c.area}`)) })).filter((c) => c.score >= 0.5).sort((c, I) => I.score - c.score);
    if (!x.length) {
      s = { status: "diff" };
      continue;
    }
    let [k, z] = x;
    if (!e.area && z && z.score >= k.score - 0.1 && Jt(k.r, z.r) > 1500) {
      s = { status: "multi" };
      continue;
    }
    return { status: "ok", r: k.r, engine: m, gErr: u };
  }
  return { ...s, engine: m, gErr: u };
}
var ui = (e) => /auth/i.test(e) ? "구글이 API 키를 거부했어요. 구글 클라우드에서 키의 웹사이트 제한(https://jhp0204.github.io/*)을 확인해 주세요." : /load/i.test(e) ? "구글 지도 기능을 불러오지 못했어요. 회사 등 네트워크에서 차단됐을 수 있어요. 휴대폰 데이터로 다시 해 보세요." : /PERMISSION|not authorized|API_KEY|forbidden|denied|403/i.test(e) ? "Places API (New)가 꺼져 있거나 키에 허용되지 않았어요. 구글 클라우드에서 API 사용 설정과 키의 API 제한을 확인해 주세요." : /RESOURCE_EXHAUSTED|quota|429/i.test(e) ? "오늘 구글 장소 검색 한도에 도달했어요. 내일 다시 해 보세요." : `구글 장소 검색이 실패했어요 (${e.slice(0, 80)})`, fi = {
  none: "검색 결과가 없어요",
  diff: "이름이 확실히 맞는 곳이 없어요",
  multi: "지점이 여러 곳이에요. 동네를 적으면 찾을 수 있어요",
  error: "검색을 못 했어요 (인터넷 연결 확인)"
};
function gi({ targets: e, gkey: n, onApply: o, onClose: i }) {
  let [s, m] = j([]), [u, p] = j(!1), [r, x] = j({}), k = J(!1);
  K(() => {
    let w = !0;
    return (async () => {
      let y = n && !Mt ? 250 : 1100;
      for (let C of e) {
        if (!w || k.current) break;
        let d = await mi(C, n, y);
        if (!w) return;
        m((l) => [...l, { w: C, ...d }]), d.status === "ok" && x((l) => ({ ...l, [C.id]: !0 })), await new Promise((l) => setTimeout(l, y));
      }
      w && p(!0);
    })(), () => {
      w = !1;
    };
  }, []);
  let z = s.filter((w) => w.status === "ok"), c = s.filter((w) => w.status !== "ok"), I = z.filter((w) => r[w.w.id]), g = (s.find((w) => w.gErr) || {}).gErr || "", A = s.some((w) => w.engine === "osm");
  return /* @__PURE__ */ t(Nt, { title: "위치 없는 장소 한 번에 찾기", onClose: i, children: /* @__PURE__ */ a("div", { className: "jt-form", children: [
    u ? /* @__PURE__ */ a("p", { className: "jt-hint jt-geo-sum", children: [
      e.length,
      "곳 중 ",
      /* @__PURE__ */ a("b", { children: [
        z.length,
        "곳"
      ] }),
      "을 찾았어요. 확실하지 않은 ",
      c.length,
      "곳은 비워 뒀어요."
    ] }) : /* @__PURE__ */ a("div", { className: "jt-geo-run", children: [
      /* @__PURE__ */ t("div", { className: "jt-geo-bar", children: /* @__PURE__ */ t("i", { style: { width: `${s.length / e.length * 100}%` } }) }),
      /* @__PURE__ */ a("span", { children: [
        s.length,
        "/",
        e.length,
        "곳 찾는 중"
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "jt-ghost sm",
          onClick: () => {
            k.current = !0, p(!0);
          },
          children: "여기까지만 찾기"
        }
      )
    ] }),
    s.length > 0 && (g || !n && A) && /* @__PURE__ */ a("div", { className: "jt-warn-inline jt-geo-why", children: [
      g ? /* @__PURE__ */ t("b", { children: "구글 장소 검색을 쓰지 못해서 무료 검색(OpenStreetMap)으로 찾았어요." }) : /* @__PURE__ */ t("b", { children: "구글 지도 키가 없어 무료 검색(OpenStreetMap)으로 찾았어요." }),
      /* @__PURE__ */ t("span", { children: g ? ui(g) : "무료 검색은 한국어 이름을 잘 못 찾아요. 설정에 구글 지도 키를 넣으면 훨씬 잘 찾아요." })
    ] }),
    z.length > 0 && /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "찾았어요 (체크한 곳만 저장돼요)" }),
      /* @__PURE__ */ t("ul", { className: "jt-geo-list", children: z.map(({ w, r: y }) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("label", { children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            checked: !!r[w.id],
            onChange: (C) => x((d) => ({ ...d, [w.id]: C.target.checked }))
          }
        ),
        /* @__PURE__ */ a("span", { children: [
          /* @__PURE__ */ t("strong", { children: w.name }),
          /* @__PURE__ */ a("em", { children: [
            y.name,
            y.area ? `, ${y.area}` : ""
          ] })
        ] })
      ] }) }, w.id)) })
    ] }),
    c.length > 0 && /* @__PURE__ */ a(st, { children: [
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "비워 둔 곳" }),
      /* @__PURE__ */ t("ul", { className: "jt-geo-list miss", children: c.map(({ w, status: y, engine: C }) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ t("strong", { children: w.name }),
        /* @__PURE__ */ a("em", { children: [
          fi[y],
          C ? C === "google" ? " (구글 검색)" : " (무료 검색)" : ""
        ] })
      ] }) }, w.id)) }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: '비워 둔 곳은 수정 화면의 "위치 검색"으로 직접 고를 수 있어요.' })
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !u || !I.length,
        onClick: () => {
          let w = {};
          I.forEach(({ w: y, r: C }) => {
            w[y.id] = {
              lat: C.lat,
              lng: C.lng,
              ...C.placeId ? { placeId: C.placeId } : {},
              // 구글 검색 링크(share.google 등)는 구글맵 링크로 바꿔 줌
              ...C.link && (!y.link || di(y.link)) ? { link: C.link } : {},
              ...!y.area && C.area ? { area: C.area.split(" ").slice(0, 3).join(" ") } : {}
            };
          }), o(w);
        },
        children: u ? `선택한 ${I.length}곳에 위치 저장` : "찾는 중"
      }
    )
  ] }) });
}
function ce(e, n) {
  let o = (n || []).find((i) => i.wishId === e.id) || (n || []).find((i) => !i.wishId && i.title === e.name);
  return o ? o.day : null;
}
function ya() {
  let [e, n] = j({});
  return [e, (s) => n((m) => ({ ...m, [s]: !m[s] })), (s, m) => n(m ? Object.fromEntries(s.map((u) => [u, !0])) : {})];
}
function va({ ids: e, open: n, setAll: o }) {
  if (e.length < 2) return null;
  let i = e.every((s) => n[s]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-ghost sm", onClick: () => o(e, !i), children: [
