// src/main.jsx
import { useState as Bt, useEffect as ps } from "react";
import { createRoot as ds } from "react-dom/client";

// src/app.jsx
import ho, { useState as y, useEffect as U, useMemo as re, useCallback as bo, useRef as G } from "react";
import {
  Plus as xo,
  X as Jt,
  Heart as on,
  Trash2 as jo,
  MapPin as Et,
  Settings as yo,
  CalendarDays as vo,
  Wallet as wo,
  Check as ma,
  ExternalLink as Tt,
  Map as ko,
  MessageSquare as No,
  Image as Co,
  Link2 as zo,
  Send as ua,
  Pencil as Gt,
  ChevronLeft as ga,
  ChevronRight as fa,
  ChevronDown as Ct,
  ChevronUp as ha,
  Users as Eo,
  Crosshair as Ao,
  HelpCircle as So,
  MessagesSquare as Mo,
  Megaphone as ba,
  Lock as Io,
  WifiOff as Fo,
  Wifi as Do,
  Pin as Po,
  PinOff as Wn,
  Utensils as Ro,
  TrainFront as $o,
  BedDouble as To,
  Ticket as Bo,
  ShoppingBag as Lo,
  MoreHorizontal as _o,
  Sun as Oo,
  CloudSun as Ko,
  Cloud as Un,
  CloudFog as Wo,
  CloudDrizzle as Uo,
  CloudRain as Ho,
  CloudSnow as Yo,
  CloudLightning as Jo,
  Umbrella as Go,
  SmilePlus as Xo,
  LocateFixed as qo,
  Star as Vo,
  Navigation as At
} from "lucide-react";

// src/store.js
import { initializeApp as so } from "firebase/app";
import {
  initializeFirestore as Fn,
  persistentLocalCache as ro,
  persistentMultipleTabManager as lo,
  collection as co,
  doc as Oe,
  onSnapshot as po,
  setDoc as Rn,
  getDoc as mo,
  deleteDoc as uo
} from "firebase/firestore";
var ee = "fjt:", wt = { config: null, code: null }, He = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), go = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function Ye(t) {
  try {
    let n = String(t || "").trim(), o = n.includes("#") ? n.slice(n.indexOf("#") + 1) : n, i = new URLSearchParams(o).get("j") || (o.startsWith("j=") ? o.slice(2) : "");
    if (!i) return null;
    let s = go(i);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function $n() {
  let t = Ye(location.hash);
  if (t)
    return localStorage.setItem(ee + "conn", JSON.stringify(t)), t;
  try {
    let n = JSON.parse(localStorage.getItem(ee + "conn"));
    if (n && n.c && n.t)
      return history.replaceState(null, "", "#j=" + He(n)), n;
  } catch {
  }
  return null;
}
function Tn(t, n) {
  let o = { c: t, t: n };
  return localStorage.setItem(ee + "conn", JSON.stringify(o)), history.replaceState(null, "", "#j=" + He(o)), o;
}
var Bn = () => location.origin + location.pathname + "#j=" + He({ c: wt.config, t: wt.code });
function Ln() {
  localStorage.removeItem(ee + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var _n = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", n = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(n, (o) => t[o % t.length]).join("");
};
function On(t) {
  let n = String(t || "");
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
var _t = null, vt = /* @__PURE__ */ new Map(), Ke = /* @__PURE__ */ new Set(), We = Promise.resolve(), Te = null, je = !1, Dn = null, Be = () => {
  clearTimeout(Dn), Dn = setTimeout(() => Ke.forEach((t) => t()), 250);
}, Ue = (t) => t.startsWith("trip:photo:"), Le = (t) => Ue(t) ? Oe(_t, "trips", wt.code, "photos", t.slice(11)) : Oe(_t, "trips", wt.code, "data", t), _e = (t) => ee + wt.code + ":" + t, Pn = (t) => Promise.race([t.then(() => !0), new Promise((n) => setTimeout(() => n(!0), 4e3))]);
function Je(t, n) {
  Te && Te(), vt.clear(), wt.config = t, wt.code = n;
  let o = so(t, "fjt-" + Date.now());
  try {
    _t = Fn(o, { localCache: ro({ tabManager: lo() }) });
  } catch {
    _t = Fn(o, {});
  }
  let i;
  je = !1, We = new Promise((m) => i = m), setTimeout(() => i(), 8e3);
  let s = !0;
  Te = po(
    co(_t, "trips", n, "data"),
    { includeMetadataChanges: !0 },
    (m) => {
      let u = m.docChanges();
      u.forEach((l) => {
        l.type === "removed" ? vt.delete(l.doc.id) : vt.set(l.doc.id, l.doc.data().v);
      });
      let p = !m.metadata.fromCache;
      (p || m.size > 0) && i(), p && !je ? (je = !0, Be()) : !s && u.length && Be(), s = !1;
    },
    () => {
      i(), Be();
    }
  ), window.storage = fo;
}
async function Kn() {
  let t = Oe(_t, "trips", wt.code, "data", "_ping");
  await Promise.race([
    Rn(t, { v: "ok", t: Date.now() }),
    new Promise((n, o) => setTimeout(() => o(new Error("timeout")), 9e3))
  ]);
}
var fo = {
  async get(t, n) {
    if (!n) {
      let o = localStorage.getItem(_e(t));
      if (o == null) throw new Error("not found");
      return { key: t, value: o, shared: !1 };
    }
    if (Ue(t)) {
      let o = await mo(Le(t));
      if (!o.exists()) throw new Error("not found");
      return { key: t, value: o.data().v, shared: !0 };
    }
    if (await We, !vt.has(t)) throw new Error("not found");
    return { key: t, value: vt.get(t), shared: !0 };
  },
  async set(t, n, o) {
    return o ? (Ue(t) || vt.set(t, n), await Pn(Rn(Le(t), { v: n, t: Date.now() })), { key: t, value: n, shared: !0 }) : (localStorage.setItem(_e(t), n), { key: t, value: n, shared: !1 });
  },
  async delete(t, n) {
    return n ? (vt.delete(t), await Pn(uo(Le(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(_e(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", n) {
    return n ? (await We, { keys: [...vt.keys()].filter((o) => o.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  // 서버와 한 번이라도 맞춰졌는지 (처음 연 기기에서 빈 화면을 "여행 없음"으로 착각하지 않게)
  isSynced() {
    return je;
  },
  onChange(t) {
    return Ke.add(t), () => Ke.delete(t);
  }
};

// src/app.jsx
import { Fragment as Q, jsx as e, jsxs as a } from "react/jsx-runtime";
var X = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice", board: "trip:board" }, sn = (t) => "trip:photo:" + t, ne = 6, V = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], Zo = ["일", "월", "화", "수", "목", "금", "토"], rn = ["맛집", "관광", "쇼핑", "기타"], xa = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Ut = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Hn = {
  식비: { Icon: Ro, color: "#D9262E" },
  교통: { Icon: $o, color: "#0C86AE" },
  숙소: { Icon: To, color: "#7B5FC4" },
  체험: { Icon: Bo, color: "#E8800A" },
  쇼핑: { Icon: Lo, color: "#0A9B6E" },
  기타: { Icon: _o, color: "#66718A" }
}, tn = (t) => Hn[t] || Hn.기타, yt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), pt = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Dt = (t) => {
  let [n, o, i] = t.split("-").map(Number);
  return new Date(n, o - 1, i);
}, ut = (t, n) => {
  let o = Dt(t);
  return o.setDate(o.getDate() + n), o;
}, Rt = (t) => `${t.getMonth() + 1}/${t.getDate()}`, St = (t) => Zo[t.getDay()], dt = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Ht = (t, n) => "₩" + (Math.round(t * n / 100 / 100) * 100).toLocaleString("ko-KR"), ja = 900, ln = (t) => `${dt(t)}(${Ht(t, ja)})`, it = (t) => String(t).padStart(2, "0"), ke = (t) => {
  let n = (Date.now() - t) / 1e3;
  if (n < 60) return "방금";
  if (n < 3600) return `${Math.floor(n / 60)}분 전`;
  if (n < 86400) return `${Math.floor(n / 3600)}시간 전`;
  let o = new Date(t);
  return `${o.getMonth() + 1}/${o.getDate()} ${it(o.getHours())}:${it(o.getMinutes())}`;
}, Yn = (t) => {
  let n = (t || "").trim();
  if (!n) return "";
  /^https?:\/\//i.test(n) || (n = "https://" + n);
  try {
    let o = new URL(n);
    return o.hostname.includes(".") ? o.href : "";
  } catch {
    return "";
  }
}, Qo = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, Pt = (t) => {
  let [n, o] = String(t).split(":").map(Number);
  return n * 60 + (o || 0);
}, Kt = (t) => `${it(Math.floor(t / 60) % 24)}:${it(t % 60)}`, pe = (t) => {
  let n = Pt(t.time), o = t.end ? Pt(t.end) : n + 60;
  return o <= n && (o = n + 60), { s: n, e: Math.min(o, 24 * 60) };
}, ya = (t) => {
  let n = Math.floor(t / 60), o = t % 60;
  return [n ? `${n}시간` : "", o ? `${o}분` : ""].filter(Boolean).join(" ");
};
function ti(t) {
  let n = t || "", o = n.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (o) return `${it(Number(o[2]))}:${o[3]}`;
  if (o = n.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !o) return "";
  let i = o[3] === "반" ? 30 : o[4] ? Number(o[4]) : 0;
  return `${it(Number(o[2]))}:${it(i)}`;
}
var ei = Array.from({ length: 24 }, (t, n) => it(n));
function Jn({ value: t, onChange: n, disabled: o, label: i }) {
  let [s, m] = t ? t.split(":") : ["", ""], u = Array.from({ length: 12 }, (p, l) => it(l * 5));
  return m && !u.includes(m) && (u = [...u, m].sort()), /* @__PURE__ */ a("div", { className: "jt-tsel" + (o ? " off" : ""), children: [
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 시",
        value: s,
        disabled: o,
        onChange: (p) => n(p.target.value ? `${p.target.value}:${m || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          ei.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 분",
        value: m,
        disabled: o || !s,
        onChange: (p) => n(`${s}:${p.target.value}`),
        children: [
          !s && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          u.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    )
  ] });
}
var ni = (t) => {
  let n = t.filter((i) => i.time).map((i) => ({ id: i.id, ...pe(i) })), o = /* @__PURE__ */ new Set();
  return n.forEach(
    (i) => n.forEach((s) => {
      i.id !== s.id && i.s < s.e && s.s < i.e && o.add(i.id);
    })
  ), o;
}, Ne = (t) => at(t) ? `${t.lat},${t.lng}` : t.place ? cn(t.place) : "", ai = (t, n) => {
  let o = t ? Ne(t) : "", i = Ne(n);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (o ? "&origin=" + encodeURIComponent(o) : "");
}, Ee = (t) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(at(t) ? `${t.lat},${t.lng}` : cn(t.name || t.title, t.area || t.place)) + (t.placeId ? "&destination_place_id=" + encodeURIComponent(t.placeId) : ""), cn = (...t) => [...t, "일본"].filter(Boolean).join(" "), at = (t) => typeof t.lat == "number" && typeof t.lng == "number", va = (t) => at(t) ? `${t.lat},${t.lng}` : cn(t.name || t.title, t.area || t.place), $t = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(va(t)), oi = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(va(t)), kt = 256, Ge = (t, n, o) => {
  let i = kt * 2 ** o, s = t * Math.PI / 180;
  return {
    x: (n + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * i
  };
}, Gn = (t, n, o) => {
  let i = kt * 2 ** o, s = Math.PI - 2 * Math.PI * n / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: t / i * 360 - 180 };
}, ae = (t) => Math.max(3, Math.min(18, t));
async function Xe(t) {
  let n = await window.storage.list(t, !0), o = (n && n.keys || []).map((s) => typeof s == "string" ? s : s.key).filter(Boolean), i = await Promise.all(o.map((s) => bt(s, null)));
  return o.map((s, m) => [s, i[m]]).filter(([, s]) => s);
}
async function bt(t, n) {
  try {
    let o = await window.storage.get(t, !0);
    return o && o.value ? JSON.parse(o.value) : n;
  } catch {
    return n;
  }
}
async function ht(t, n) {
  try {
    return !!await window.storage.set(t, JSON.stringify(n), !0);
  } catch {
    return !1;
  }
}
var zt = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Map();
function ii(t) {
  if (zt.has(t)) return Promise.resolve(zt.get(t));
  if (ye.has(t)) return ye.get(t);
  let n = bt(sn(t), null).then((o) => (ye.delete(t), o && zt.set(t, o), o));
  return ye.set(t, n), n;
}
async function Xn(t) {
  zt.delete(t);
  try {
    await window.storage.delete(sn(t), !0);
  } catch {
  }
}
var si = (t) => new Promise((n, o) => {
  let i = URL.createObjectURL(t), s = new Image();
  s.onload = () => {
    URL.revokeObjectURL(i), n(s);
  }, s.onerror = () => {
    URL.revokeObjectURL(i), o(new Error("bad image"));
  }, s.src = i;
});
async function ri(t) {
  let n = await si(t), o = 1280, i = 0.7, s = "";
  for (let m = 0; m < 5; m++) {
    let u = Math.min(1, o / Math.max(n.naturalWidth, n.naturalHeight)), p = document.createElement("canvas");
    p.width = Math.max(1, Math.round(n.naturalWidth * u)), p.height = Math.max(1, Math.round(n.naturalHeight * u));
    let l = p.getContext("2d");
    if (l.fillStyle = "#fff", l.fillRect(0, 0, p.width, p.height), l.drawImage(n, 0, 0, p.width, p.height), s = p.toDataURL("image/jpeg", i), s.length < 6e5) break;
    o = Math.round(o * 0.8), i = Math.max(0.4, i - 0.08);
  }
  return s;
}
var li = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: pt(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function ci() {
  for (let [t, n] of li)
    try {
      let o = await fetch(t);
      if (!o.ok) continue;
      let i = n(await o.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var qn = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Ce = (t) => t.fx ? `100엔 = ₩${qn(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${qn(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Vn(t, n) {
  let o = () => Object.fromEntries(n.map((d) => [d, 0])), i = o(), s = o(), m = [];
  t.forEach((d) => {
    let I = Number(d.amount) || 0, g = (d.split || []).filter((S) => n.includes(S));
    if (!(I <= 0)) {
      if (!g.length || !n.includes(d.payer)) {
        m.push(d);
        return;
      }
      i[d.payer] += I, g.forEach((S) => s[S] += I / g.length);
    }
  });
  let u = Object.fromEntries(n.map((d) => [d, i[d] - s[d]])), p = n.filter((d) => u[d] > 0.5).map((d) => ({ m: d, v: u[d] })).sort((d, I) => I.v - d.v), l = n.filter((d) => u[d] < -0.5).map((d) => ({ m: d, v: -u[d] })).sort((d, I) => I.v - d.v), h = [], k = 0, z = 0;
  for (; k < l.length && z < p.length; ) {
    let d = Math.min(l[k].v, p[z].v);
    d >= 1 && h.push({ from: l[k].m, to: p[z].m, v: Math.round(d) }), l[k].v -= d, p[z].v -= d, l[k].v < 0.5 && k++, p[z].v < 0.5 && z++;
  }
  return { paid: i, share: s, net: u, moves: h, skipped: m };
}
function ct({ name: t, members: n, size: o = 28 }) {
  let i = Math.max(0, n.indexOf(t));
  return /* @__PURE__ */ e(
    "span",
    {
      className: "jt-avatar",
      style: { width: o, height: o, background: V[(i * 2 + 3) % V.length], fontSize: o * 0.46 },
      "aria-hidden": "true",
      children: t ? t[0] : "?"
    }
  );
}
function gt({ label: t, children: n }) {
  return /* @__PURE__ */ a("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    n
  ] });
}
function Nt({ title: t, onClose: n, children: o }) {
  return U(() => {
    let i = (s) => s.key === "Escape" && n();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: n, children: /* @__PURE__ */ a("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ a("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ e(Jt, { size: 20 }) })
    ] }),
    o
  ] }) });
}
function It({ onConfirm: t, label: n = "삭제" }) {
  let [o, i] = y(!1);
  return U(() => {
    if (!o) return;
    let s = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(s);
  }, [o]), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-del" + (o ? " armed" : ""),
      onClick: (s) => {
        s.stopPropagation(), o ? t() : i(!0);
      },
      children: [
        /* @__PURE__ */ e(jo, { size: 15 }),
        o ? "한 번 더 누르면 삭제돼요" : n
      ]
    }
  );
}
var Zn = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function wa(t) {
  let n = {};
  return Object.entries(t.reactions || {}).forEach(([o, i]) => n[o] = [...i]), n;
}
function pi(t, n, o) {
  let i = wa(t), s = (i[n] || []).includes(o), m = {};
  return Object.entries(i).forEach(([u, p]) => {
    let l = p.filter((h) => h !== o);
    l.length && (m[u] = l);
  }), s || (m[n] = [...m[n] || [], o]), { ...t, reactions: m };
}
function pn({ className: t, onTap: n, names: o = [], title: i, members: s = [], children: m, ...u }) {
  let [p, l] = y(!1), [h, k] = y("up left"), z = G(null), d = G(null), I = G(!1);
  U(() => {
    if (!p) return;
    let N = (E) => z.current && !z.current.contains(E.target) && l(!1);
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [p]), U(() => () => clearTimeout(d.current), []);
  let g = () => {
    if (z.current) {
      let N = z.current.getBoundingClientRect();
      k((N.top < 200 ? "down" : "up") + " " + (N.left > window.innerWidth - 210 ? "right" : "left"));
    }
    l(!0), navigator.vibrate && navigator.vibrate(15);
  }, S = () => {
    I.current = !1, clearTimeout(d.current), d.current = setTimeout(() => {
      I.current = !0, g();
    }, 450);
  }, j = () => clearTimeout(d.current);
  return /* @__PURE__ */ a("span", { className: "jt-hold", ref: z, children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: t + " jt-holdbtn",
        ...u,
        title: o.length ? o.join(", ") : void 0,
        onPointerDown: S,
        onPointerUp: j,
        onPointerLeave: j,
        onPointerCancel: j,
        onContextMenu: (N) => {
          N.preventDefault(), j(), I.current = !0, g();
        },
        onClick: (N) => {
          if (N.stopPropagation(), I.current) {
            I.current = !1;
            return;
          }
          n(N);
        },
        children: m
      }
    ),
    p && /* @__PURE__ */ a("div", { className: "jt-whopop " + h, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ a("strong", { children: [
        i,
        " ",
        o.length,
        "명"
      ] }),
      o.length ? /* @__PURE__ */ e("ul", { children: o.map((N) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ e(ct, { name: N, members: s.length ? s : o, size: 22 }),
        N
      ] }, N)) }) : /* @__PURE__ */ e("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ae({ item: t, me: n, onReact: o, members: i = [] }) {
  let [s, m] = y(!1), [u, p] = y("up right"), l = G(null), h = wa(t), k = () => {
    if (!s && l.current) {
      let g = l.current.getBoundingClientRect(), j = l.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", N = g.top < 190 ? "down" : "up";
      p(N + " " + j);
    }
    m(!s);
  }, z = Zn.filter(([g]) => (h[g] || []).length), d = Object.keys(h).find((g) => h[g].includes(n));
  U(() => {
    if (!s) return;
    let g = (S) => l.current && !l.current.contains(S.target) && m(!1);
    return document.addEventListener("pointerdown", g), () => document.removeEventListener("pointerdown", g);
  }, [s]);
  let I = (g) => {
    o(g), m(!1);
  };
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-react",
      ref: l,
      onClick: (g) => g.stopPropagation(),
      onKeyDown: (g) => g.stopPropagation(),
      children: [
        z.map(([g, S]) => /* @__PURE__ */ a(
          pn,
          {
            className: "jt-rchip" + (d === g ? " on" : ""),
            onTap: () => I(g),
            names: h[g],
            members: i,
            title: `${g} ${S}`,
            "aria-pressed": d === g,
            "aria-label": `${S} ${h[g].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ e("span", { className: "jt-emoji", children: g }),
              h[g].length
            ]
          },
          g
        )),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (s ? " open" : ""),
            onClick: k,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(Xo, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ a("div", { className: "jt-rpop " + u, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: Zn.map(([g, S]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (d === g ? " on" : ""),
              onClick: () => I(g),
              "aria-label": S,
              title: S,
              children: g
            },
            g
          )) }),
          z.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: z.map(([g]) => /* @__PURE__ */ a("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: g }),
            h[g].join(", ")
          ] }, g)) })
        ] })
      ]
    }
  );
}
function di() {
  let [t, n] = y(null), [o, i] = y("");
  return U(() => {
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
  }, []), [t, o];
}
var Qn = (t) => t < 1e3 ? `${Math.round(t / 10) * 10}m` : t < 1e4 ? `${(t / 1e3).toFixed(1)}km` : `${Math.round(t / 1e3)}km`, mi = (t) => t < 1e3 ? "near" : t < 5e3 ? "mid" : "far", ta = (t) => String(t || "").toLowerCase().replace(/[\s·・,.\-()（）'"!?&/]/g, "").replace(/(본점|지점|점|店)$/, "");
function ea(t, n) {
  if (t = ta(t), n = ta(n), !t || !n) return 0;
  if (t.includes(n) || n.includes(t)) return 1;
  let o = (p) => {
    let l = /* @__PURE__ */ new Map();
    for (let h = 0; h < p.length - 1; h++) l.set(p.slice(h, h + 2), (l.get(p.slice(h, h + 2)) || 0) + 1);
    return l;
  }, i = o(t), s = o(n), m = 0;
  i.forEach((p, l) => s.has(l) && (m += Math.min(p, s.get(l))));
  let u = t.length - 1 + (n.length - 1);
  return u > 0 ? 2 * m / u : 0;
}
var ui = (t) => t.lat > 24 && t.lat < 46 && t.lng > 122 && t.lng < 154, gi = (t) => /^https?:\/\/(share\.google|g\.co\/kgs|(www\.)?google\.[a-z.]+\/search)/i.test(String(t || ""));
async function fi(t, n, o) {
  let i = [[t.name, t.area].filter(Boolean).join(" "), t.name].filter((p, l, h) => p && h.indexOf(p) === l), s = { status: "none" }, m = "", u = "";
  for (let p = 0; p < i.length; p++) {
    p && await new Promise((d) => setTimeout(d, o));
    let l;
    try {
      l = await Ma(i[p], n);
    } catch {
      s = s.status === "none" ? { status: "error" } : s;
      continue;
    }
    if (m = l.engine, l.gErr && (u = l.gErr), !l.list.length) continue;
    let h = l.list.filter(ui).map((d) => ({ r: d, score: Math.max(ea(t.name, d.name), ea(t.name, `${d.name} ${d.area}`)) })).filter((d) => d.score >= 0.5).sort((d, I) => I.score - d.score);
    if (!h.length) {
      s = { status: "diff" };
      continue;
    }
    let [k, z] = h;
    if (!t.area && z && z.score >= k.score - 0.1 && Yt(k.r, z.r) > 1500) {
      s = { status: "multi" };
      continue;
    }
    return { status: "ok", r: k.r, engine: m, gErr: u };
  }
  return { ...s, engine: m, gErr: u };
}
var hi = (t) => /auth/i.test(t) ? "구글이 API 키를 거부했어요. 구글 클라우드에서 키의 웹사이트 제한(https://jhp0204.github.io/*)을 확인해 주세요." : /load/i.test(t) ? "구글 지도 기능을 불러오지 못했어요. 회사 등 네트워크에서 차단됐을 수 있어요. 휴대폰 데이터로 다시 해 보세요." : /PERMISSION|not authorized|API_KEY|forbidden|denied|403/i.test(t) ? "Places API (New)가 꺼져 있거나 키에 허용되지 않았어요. 구글 클라우드에서 API 사용 설정과 키의 API 제한을 확인해 주세요." : /RESOURCE_EXHAUSTED|quota|429/i.test(t) ? "오늘 구글 장소 검색 한도에 도달했어요. 내일 다시 해 보세요." : `구글 장소 검색이 실패했어요 (${t.slice(0, 80)})`, bi = {
  none: "검색 결과가 없어요",
  diff: "이름이 확실히 맞는 곳이 없어요",
  multi: "지점이 여러 곳이에요. 동네를 적으면 찾을 수 있어요",
  error: "검색을 못 했어요 (인터넷 연결 확인)"
};
function xi({ targets: t, gkey: n, onApply: o, onClose: i }) {
  let [s, m] = y([]), [u, p] = y(!1), [l, h] = y({}), k = G(!1);
  U(() => {
    let j = !0;
    return (async () => {
      let N = n && !Mt ? 250 : 1100;
      for (let E of t) {
        if (!j || k.current) break;
        let C = await fi(E, n, N);
        if (!j) return;
        m((b) => [...b, { w: E, ...C }]), C.status === "ok" && h((b) => ({ ...b, [E.id]: !0 })), await new Promise((b) => setTimeout(b, N));
      }
      j && p(!0);
    })(), () => {
      j = !1;
    };
  }, []);
  let z = s.filter((j) => j.status === "ok"), d = s.filter((j) => j.status !== "ok"), I = z.filter((j) => l[j.w.id]), g = (s.find((j) => j.gErr) || {}).gErr || "", S = s.some((j) => j.engine === "osm");
  return /* @__PURE__ */ e(Nt, { title: "위치 없는 장소 한 번에 찾기", onClose: i, children: /* @__PURE__ */ a("div", { className: "jt-form", children: [
    u ? /* @__PURE__ */ a("p", { className: "jt-hint jt-geo-sum", children: [
      t.length,
      "곳 중 ",
      /* @__PURE__ */ a("b", { children: [
        z.length,
        "곳"
      ] }),
      "을 찾았어요. 확실하지 않은 ",
      d.length,
      "곳은 비워 뒀어요."
    ] }) : /* @__PURE__ */ a("div", { className: "jt-geo-run", children: [
      /* @__PURE__ */ e("div", { className: "jt-geo-bar", children: /* @__PURE__ */ e("i", { style: { width: `${s.length / t.length * 100}%` } }) }),
      /* @__PURE__ */ a("span", { children: [
        s.length,
        "/",
        t.length,
        "곳 찾는 중"
      ] }),
      /* @__PURE__ */ e(
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
    s.length > 0 && (g || !n && S) && /* @__PURE__ */ a("div", { className: "jt-warn-inline jt-geo-why", children: [
      g ? /* @__PURE__ */ e("b", { children: "구글 장소 검색을 쓰지 못해서 무료 검색(OpenStreetMap)으로 찾았어요." }) : /* @__PURE__ */ e("b", { children: "구글 지도 키가 없어 무료 검색(OpenStreetMap)으로 찾았어요." }),
      /* @__PURE__ */ e("span", { children: g ? hi(g) : "무료 검색은 한국어 이름을 잘 못 찾아요. 설정에 구글 지도 키를 넣으면 훨씬 잘 찾아요." })
    ] }),
    z.length > 0 && /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "찾았어요 (체크한 곳만 저장돼요)" }),
      /* @__PURE__ */ e("ul", { className: "jt-geo-list", children: z.map(({ w: j, r: N }) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("label", { children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: !!l[j.id],
            onChange: (E) => h((C) => ({ ...C, [j.id]: E.target.checked }))
          }
        ),
        /* @__PURE__ */ a("span", { children: [
          /* @__PURE__ */ e("strong", { children: j.name }),
          /* @__PURE__ */ a("em", { children: [
            N.name,
            N.area ? `, ${N.area}` : ""
          ] })
        ] })
      ] }) }, j.id)) })
    ] }),
    d.length > 0 && /* @__PURE__ */ a(Q, { children: [
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "비워 둔 곳" }),
      /* @__PURE__ */ e("ul", { className: "jt-geo-list miss", children: d.map(({ w: j, status: N, engine: E }) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ e("strong", { children: j.name }),
        /* @__PURE__ */ a("em", { children: [
          bi[N],
          E ? E === "google" ? " (구글 검색)" : " (무료 검색)" : ""
        ] })
      ] }) }, j.id)) }),
      /* @__PURE__ */ e("p", { className: "jt-hint", children: '비워 둔 곳은 수정 화면의 "위치 검색"으로 직접 고를 수 있어요.' })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !u || !I.length,
        onClick: () => {
          let j = {};
          I.forEach(({ w: N, r: E }) => {
            j[N.id] = {
              lat: E.lat,
              lng: E.lng,
              ...E.placeId ? { placeId: E.placeId } : {},
              // 구글 검색 링크(share.google 등)는 구글맵 링크로 바꿔 줌
              ...E.link && (!N.link || gi(N.link)) ? { link: E.link } : {},
              ...!N.area && E.area ? { area: E.area.split(" ").slice(0, 3).join(" ") } : {}
            };
          }), o(j);
        },
        children: u ? `선택한 ${I.length}곳에 위치 저장` : "찾는 중"
      }
    )
  ] }) });
}
function le(t, n) {
  let o = (n || []).find((i) => i.wishId === t.id) || (n || []).find((i) => !i.wishId && i.title === t.name);
  return o ? o.day : null;
}
function ka() {
  let [t, n] = y({});
  return [t, (s) => n((m) => ({ ...m, [s]: !m[s] })), (s, m) => n(m ? Object.fromEntries(s.map((u) => [u, !0])) : {})];
}
function Na({ ids: t, open: n, setAll: o }) {
  if (t.length < 2) return null;
  let i = t.every((s) => n[s]);
  return /* @__PURE__ */ e("div", { className: "jt-foldall", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-ghost sm", onClick: () => o(t, !i), children: [
    i ? /* @__PURE__ */ e(ha, { size: 15 }) : /* @__PURE__ */ e(Ct, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function dn({ count: t, open: n, onClick: o }) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (n ? " open" : ""),
      onClick: (i) => {
        i.stopPropagation(), o();
      },
      "aria-expanded": n,
