// src/main.jsx
import { useState as Ct, useEffect as qo } from "react";
import { createRoot as Xo } from "react-dom/client";

// src/app.jsx
import pn, { useState as C, useEffect as W, useMemo as Wt, useCallback as dn, useRef as Y } from "react";
import {
  Plus as mn,
  X as Gt,
  Heart as Se,
  Trash2 as un,
  MapPin as wt,
  Settings as gn,
  CalendarDays as fn,
  Wallet as hn,
  Check as wa,
  ExternalLink as Nt,
  Map as bn,
  MessageSquare as xn,
  Image as jn,
  Link2 as vn,
  Send as ka,
  Pencil as Na,
  ChevronLeft as cr,
  ChevronRight as yn,
  ChevronDown as wn,
  ChevronUp as kn,
  Users as Nn,
  Crosshair as Cn,
  HelpCircle as zn,
  MessagesSquare as En,
  Utensils as Mn,
  TrainFront as Sn,
  BedDouble as An,
  Ticket as In,
  ShoppingBag as Dn,
  MoreHorizontal as Fn,
  Sun as Pn,
  CloudSun as $n,
  Cloud as oa,
  CloudFog as Rn,
  CloudDrizzle as _n,
  CloudRain as Ln,
  CloudSnow as Tn,
  CloudLightning as Bn,
  Umbrella as On,
  SmilePlus as Un,
  LocateFixed as Kn,
  Star as Wn,
  Navigation as Ae
} from "lucide-react";

// src/store.js
import { initializeApp as Qa } from "firebase/app";
import {
  initializeFirestore as Je,
  persistentLocalCache as tn,
  persistentMultipleTabManager as en,
  collection as an,
  doc as ge,
  onSnapshot as nn,
  setDoc as Xe,
  getDoc as on,
  deleteDoc as rn
} from "firebase/firestore";
var Tt = "fjt:", ut = { config: null, code: null }, xe = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), sn = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function je(t) {
  try {
    let a = String(t || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, r = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!r) return null;
    let s = sn(r);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function Ve() {
  let t = je(location.hash);
  if (t)
    return localStorage.setItem(Tt + "conn", JSON.stringify(t)), t;
  try {
    let a = JSON.parse(localStorage.getItem(Tt + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + xe(a)), a;
  } catch {
  }
  return null;
}
function Ze(t, a) {
  let n = { c: t, t: a };
  return localStorage.setItem(Tt + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + xe(n)), n;
}
var Qe = () => location.origin + location.pathname + "#j=" + xe({ c: ut.config, t: ut.code });
function ta() {
  localStorage.removeItem(Tt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var ea = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => t[n % t.length]).join("");
};
function aa(t) {
  let a = String(t || "");
  try {
    let r = JSON.parse(a);
    if (r.apiKey && r.projectId && r.appId) return r;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((r) => {
    let s = a.match(new RegExp(r + `\\s*[:=]\\s*["']([^"']+)["']`));
    s && (n[r] = s[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var zt = null, mt = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Set(), he = Promise.resolve(), de = null, Ge = null, ln = () => {
  clearTimeout(Ge), Ge = setTimeout(() => fe.forEach((t) => t()), 250);
}, be = (t) => t.startsWith("trip:photo:"), me = (t) => be(t) ? ge(zt, "trips", ut.code, "photos", t.slice(11)) : ge(zt, "trips", ut.code, "data", t), ue = (t) => Tt + ut.code + ":" + t, qe = (t) => Promise.race([t.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function ve(t, a) {
  de && de(), mt.clear(), ut.config = t, ut.code = a;
  let n = Qa(t, "fjt-" + Date.now());
  try {
    zt = Je(n, { localCache: tn({ tabManager: en() }) });
  } catch {
    zt = Je(n, {});
  }
  let r;
  he = new Promise((j) => r = j), setTimeout(() => r(), 6e3);
  let s = !0;
  de = nn(
    an(zt, "trips", a, "data"),
    (j) => {
      j.docChanges().forEach((f) => {
        f.type === "removed" ? mt.delete(f.doc.id) : mt.set(f.doc.id, f.doc.data().v);
      }), r(), s || ln(), s = !1;
    },
    () => r()
  ), window.storage = cn;
}
async function na() {
  let t = ge(zt, "trips", ut.code, "data", "_ping");
  await Promise.race([
    Xe(t, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var cn = {
  async get(t, a) {
    if (!a) {
      let n = localStorage.getItem(ue(t));
      if (n == null) throw new Error("not found");
      return { key: t, value: n, shared: !1 };
    }
    if (be(t)) {
      let n = await on(me(t));
      if (!n.exists()) throw new Error("not found");
      return { key: t, value: n.data().v, shared: !0 };
    }
    if (await he, !mt.has(t)) throw new Error("not found");
    return { key: t, value: mt.get(t), shared: !0 };
  },
  async set(t, a, n) {
    return n ? (be(t) || mt.set(t, a), await qe(Xe(me(t), { v: a, t: Date.now() })), { key: t, value: a, shared: !0 }) : (localStorage.setItem(ue(t), a), { key: t, value: a, shared: !1 });
  },
  async delete(t, a) {
    return a ? (mt.delete(t), await qe(rn(me(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(ue(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", a) {
    return a ? (await he, { keys: [...mt.keys()].filter((n) => n.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return fe.add(t), () => fe.delete(t);
  }
};

// src/app.jsx
import { Fragment as ct, jsx as e, jsxs as o } from "react/jsx-runtime";
var H = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, Ie = (t) => "trip:photo:" + t, Q = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], Hn = ["일", "월", "화", "수", "목", "금", "토"], De = ["맛집", "관광", "쇼핑", "기타"], Ca = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], It = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Bt = 6, ra = {
  식비: { Icon: Mn, color: "#D9262E" },
  교통: { Icon: Sn, color: "#0C86AE" },
  숙소: { Icon: An, color: "#7B5FC4" },
  체험: { Icon: In, color: "#E8800A" },
  쇼핑: { Icon: Dn, color: "#0A9B6E" },
  기타: { Icon: Fn, color: "#66718A" }
}, Ne = (t) => ra[t] || ra.기타, st = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), pt = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), jt = (t) => {
  let [a, n, r] = t.split("-").map(Number);
  return new Date(a, n - 1, r);
}, dt = (t, a) => {
  let n = jt(t);
  return n.setDate(n.getDate() + a), n;
}, Ht = (t) => `${t.getMonth() + 1}/${t.getDate()}`, Dt = (t) => Hn[t.getDay()], J = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Yt = (t, a) => "₩" + (Math.round(t * a / 100 / 10) * 10).toLocaleString("ko-KR"), at = (t) => String(t).padStart(2, "0"), Ce = (t) => {
  let a = (Date.now() - t) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(t);
  return `${n.getMonth() + 1}/${n.getDate()} ${at(n.getHours())}:${at(n.getMinutes())}`;
}, ia = (t) => {
  let a = (t || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, Yn = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, yt = (t) => {
  let [a, n] = String(t).split(":").map(Number);
  return a * 60 + (n || 0);
}, Mt = (t) => `${at(Math.floor(t / 60) % 24)}:${at(t % 60)}`, Jt = (t) => {
  let a = yt(t.time), n = t.end ? yt(t.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, za = (t) => {
  let a = Math.floor(t / 60), n = t % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function Jn(t) {
  let a = t || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${at(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let r = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${at(Number(n[2]))}:${at(r)}`;
}
var Gn = Array.from({ length: 24 }, (t, a) => at(a));
function sa({ value: t, onChange: a, disabled: n, label: r }) {
  let [s, j] = t ? t.split(":") : ["", ""], f = Array.from({ length: 12 }, (p, d) => at(d * 5));
  return j && !f.includes(j) && (f = [...f, j].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 시",
        value: s,
        disabled: n,
        onChange: (p) => a(p.target.value ? `${p.target.value}:${j || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          Gn.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 분",
        value: j,
        disabled: n || !s,
        onChange: (p) => a(`${s}:${p.target.value}`),
        children: [
          !s && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          f.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    )
  ] });
}
var qn = (t) => {
  let a = t.filter((r) => r.time).map((r) => ({ id: r.id, ...Jt(r) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (r) => a.forEach((s) => {
      r.id !== s.id && r.s < s.e && s.s < r.e && n.add(r.id);
    })
  ), n;
}, Xn = (...t) => [...t, "일본"].filter(Boolean).join(" "), Ft = (t) => typeof t.lat == "number" && typeof t.lng == "number", Ea = (t) => Ft(t) ? `${t.lat},${t.lng}` : Xn(t.name || t.title, t.area || t.place), Pt = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Ea(t)), Vn = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Ea(t)), gt = 256, ye = (t, a, n) => {
  let r = gt * 2 ** n, s = t * Math.PI / 180;
  return {
    x: (a + 180) / 360 * r,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * r
  };
}, la = (t, a, n) => {
  let r = gt * 2 ** n, s = Math.PI - 2 * Math.PI * a / r;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: t / r * 360 - 180 };
}, Ot = (t) => Math.max(3, Math.min(18, t));
async function ca(t) {
  let a = await window.storage.list(t, !0), n = (a && a.keys || []).map((s) => typeof s == "string" ? s : s.key).filter(Boolean), r = await Promise.all(n.map((s) => lt(s, null)));
  return n.map((s, j) => [s, r[j]]).filter(([, s]) => s);
}
async function lt(t, a) {
  try {
    let n = await window.storage.get(t, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function xt(t, a) {
  try {
    return !!await window.storage.set(t, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var ft = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Map();
function Zn(t) {
  if (ft.has(t)) return Promise.resolve(ft.get(t));
  if (ee.has(t)) return ee.get(t);
  let a = lt(Ie(t), null).then((n) => (ee.delete(t), n && ft.set(t, n), n));
  return ee.set(t, a), a;
}
async function pa(t) {
  ft.delete(t);
  try {
    await window.storage.delete(Ie(t), !0);
  } catch {
  }
}
var Qn = (t) => new Promise((a, n) => {
  let r = URL.createObjectURL(t), s = new Image();
  s.onload = () => {
    URL.revokeObjectURL(r), a(s);
  }, s.onerror = () => {
    URL.revokeObjectURL(r), n(new Error("bad image"));
  }, s.src = r;
});
async function to(t) {
  let a = await Qn(t), n = 1280, r = 0.7, s = "";
  for (let j = 0; j < 5; j++) {
    let f = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), p = document.createElement("canvas");
    p.width = Math.max(1, Math.round(a.naturalWidth * f)), p.height = Math.max(1, Math.round(a.naturalHeight * f));
    let d = p.getContext("2d");
    if (d.fillStyle = "#fff", d.fillRect(0, 0, p.width, p.height), d.drawImage(a, 0, 0, p.width, p.height), s = p.toDataURL("image/jpeg", r), s.length < 6e5) break;
    n = Math.round(n * 0.8), r = Math.max(0.4, r - 0.08);
  }
  return s;
}
var eo = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: pt(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function ao() {
  for (let [t, a] of eo)
    try {
      let n = await fetch(t);
      if (!n.ok) continue;
      let r = a(await n.json());
      if (r.rate > 0) return r;
    } catch {
    }
  return null;
}
var da = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), oe = (t) => t.fx ? `100엔 = ₩${da(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${da(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function ma(t, a) {
  let n = () => Object.fromEntries(a.map((c) => [c, 0])), r = n(), s = n(), j = [];
  t.forEach((c) => {
    let z = Number(c.amount) || 0, g = (c.split || []).filter((l) => a.includes(l));
    if (!(z <= 0)) {
      if (!g.length || !a.includes(c.payer)) {
        j.push(c);
        return;
      }
      r[c.payer] += z, g.forEach((l) => s[l] += z / g.length);
    }
  });
  let f = Object.fromEntries(a.map((c) => [c, r[c] - s[c]])), p = a.filter((c) => f[c] > 0.5).map((c) => ({ m: c, v: f[c] })).sort((c, z) => z.v - c.v), d = a.filter((c) => f[c] < -0.5).map((c) => ({ m: c, v: -f[c] })).sort((c, z) => z.v - c.v), b = [], v = 0, N = 0;
  for (; v < d.length && N < p.length; ) {
    let c = Math.min(d[v].v, p[N].v);
    c >= 1 && b.push({ from: d[v].m, to: p[N].m, v: Math.round(c) }), d[v].v -= c, p[N].v -= c, d[v].v < 0.5 && v++, p[N].v < 0.5 && N++;
  }
  return { paid: r, share: s, net: f, moves: b, skipped: j };
}
function rt({ name: t, members: a, size: n = 28 }) {
  let r = Math.max(0, a.indexOf(t));
  return /* @__PURE__ */ e(
    "span",
    {
      className: "jt-avatar",
      style: { width: n, height: n, background: Q[(r * 2 + 3) % Q.length], fontSize: n * 0.46 },
      "aria-hidden": "true",
      children: t ? t[0] : "?"
    }
  );
}
function et({ label: t, children: a }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    a
  ] });
}
function vt({ title: t, onClose: a, children: n }) {
  return W(() => {
    let r = (s) => s.key === "Escape" && a();
    return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
  }, [a]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (r) => r.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ e(Gt, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function ht({ onConfirm: t, label: a = "삭제" }) {
  let [n, r] = C(!1);
  return W(() => {
    if (!n) return;
    let s = setTimeout(() => r(!1), 3e3);
    return () => clearTimeout(s);
  }, [n]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (s) => {
        s.stopPropagation(), n ? t() : r(!0);
      },
      children: [
        /* @__PURE__ */ e(un, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
function no({ id: t, data: a, className: n, onClick: r, alt: s = "사진" }) {
  let [j, f] = C(a || ft.get(t) || null), [p, d] = C(!1);
  W(() => {
    if (a) {
      f(a);
      return;
    }
    if (ft.has(t)) {
      f(ft.get(t));
      return;
    }
    let v = !0;
    return d(!1), Zn(t).then((N) => {
      v && (N ? f(N) : d(!0));
    }), () => {
      v = !1;
    };
  }, [t, a]);
  let b = j ? /* @__PURE__ */ e("img", { src: j, alt: s, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: p ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return r ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (n || ""), onClick: r, "aria-label": "사진 크게 보기", children: b }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (n || ""), children: b });
}
var ua = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Ma(t) {
  let a = {};
  if (Object.entries(t.reactions || {}).forEach(([n, r]) => a[n] = [...r]), t.boardLikes && (t.likes || []).length) {
    let n = new Set(Object.values(a).flat()), r = t.likes.filter((s) => !n.has(s));
    r.length && (a["❤️"] = [...a["❤️"] || [], ...r]);
  }
  return a;
}
function oo(t, a, n, r) {
  let s = Ma({ ...t, boardLikes: r }), j = (s[a] || []).includes(n), f = {};
  Object.entries(s).forEach(([d, b]) => {
    let v = b.filter((N) => N !== n);
    v.length && (f[d] = v);
  }), j || (f[a] = [...f[a] || [], n]);
  let p = { ...t, reactions: f };
  return r && (p.likes = []), p;
}
function Fe({ item: t, me: a, onReact: n, boardLikes: r = !1 }) {
  let [s, j] = C(!1), [f, p] = C("up right"), d = Y(null), b = Ma({ ...t, boardLikes: r }), v = () => {
    if (!s && d.current) {
      let g = d.current.getBoundingClientRect(), u = d.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", A = g.top < 190 ? "down" : "up";
      p(A + " " + u);
    }
    j(!s);
  }, N = ua.filter(([g]) => (b[g] || []).length), c = Object.keys(b).find((g) => b[g].includes(a));
  W(() => {
    if (!s) return;
    let g = (l) => d.current && !d.current.contains(l.target) && j(!1);
    return document.addEventListener("pointerdown", g), () => document.removeEventListener("pointerdown", g);
  }, [s]);
  let z = (g) => {
    n(g), j(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: d,
      onClick: (g) => g.stopPropagation(),
      onKeyDown: (g) => g.stopPropagation(),
      children: [
        N.map(([g, l]) => /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (c === g ? " on" : ""),
            onClick: () => z(g),
            "aria-pressed": c === g,
            "aria-label": `${l} ${b[g].length}명: ${b[g].join(", ")}`,
            title: b[g].join(", "),
            children: [
              /* @__PURE__ */ e("span", { className: "jt-emoji", children: g }),
              b[g].length
            ]
          },
          g
        )),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (s ? " open" : ""),
            onClick: v,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(Un, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ o("div", { className: "jt-rpop " + f, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: ua.map(([g, l]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (c === g ? " on" : ""),
              onClick: () => z(g),
              "aria-label": l,
              title: l,
              children: g
            },
            g
          )) }),
          N.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: N.map(([g]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: g }),
            b[g].join(", ")
          ] }, g)) })
        ] })
      ]
    }
  );
}
function Sa({ count: t, open: a, onClick: n }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (a ? " open" : ""),
      onClick: (r) => {
        r.stopPropagation(), n();
      },
      "aria-expanded": a,
      children: [
        /* @__PURE__ */ e(xn, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Pe({ comments: t = [], me: a, members: n, onAdd: r, onDelete: s }) {
  let [j, f] = C(""), p = () => {
    let d = j.trim();
    d && (r(d), f(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (d) => d.stopPropagation(), onKeyDown: (d) => d.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((d) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(rt, { name: d.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("strong", { children: d.by }),
          /* @__PURE__ */ e("span", { children: Ce(d.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: d.text })
      ] }),
      d.by === a && /* @__PURE__ */ e(ht, { onConfirm: () => s(d.id), label: "" })
    ] }, d.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: j,
          onChange: (d) => f(d.target.value),
          onKeyDown: (d) => d.key === "Enter" && !d.nativeEvent.isComposing && p(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: p, disabled: !j.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(ka, { size: 18 }) })
    ] })
  ] });
}
function ro({ url: t, onRemove: a }) {
  let n = /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(vn, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: Yn(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return a ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(Gt, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ e(Nt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function io({ initial: t, onSave: a, onCancel: n }) {
  let [r, s] = C(t?.title || "가족 일본여행"), [j, f] = C(t?.start || pt(new Date(Date.now() + 30 * 864e5))), [p, d] = C(t?.days || 4), [b, v] = C(t?.members || []), [N, c] = C(t?.rate || 900), [z, g] = C(t?.gmapsKey || ""), [l, u] = C(""), A = () => {
    let k = l.trim();
    !k || b.includes(k) || (v([...b, k]), u(""));
  }, m = r.trim() && j && b.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(et, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (k) => s(k.target.value) }) }),
      /* @__PURE__ */ e(et, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: j, onChange: (k) => f(k.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => d(Math.max(1, p - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            p,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => d(Math.min(30, p + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: b.map((k) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(rt, { name: k, members: b, size: 20 }),
          k,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => v(b.filter((i) => i !== k)), "aria-label": `${k} 빼기`, children: /* @__PURE__ */ e(Gt, { size: 14 }) })
        ] }, k)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: l,
              onChange: (k) => u(k.target.value),
              onKeyDown: (k) => k.key === "Enter" && A(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: A, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(et, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: N, onChange: (k) => c(Number(k.target.value) || 0) }) }),
      /* @__PURE__ */ e(et, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ e(
        "input",
        {
          value: z,
          onChange: (k) => g(k.target.value.trim()),
          placeholder: "AIza로 시작하는 키",
          autoComplete: "off",
          spellCheck: !1
        }
      ) }),
      /* @__PURE__ */ e("p", { className: "jt-hint", children: "한 명만 넣으면 가족 모두에게 적용돼요. 비워 두면 기본 지도를 써요." }),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-primary",
          disabled: !m,
          onClick: () => a({ title: r.trim(), start: j, days: p, members: b, rate: N || 900, gmapsKey: z }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(so, {})
    ] })
  ] });
}
function so() {
  let [t, a] = C(""), n = Qe();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ e("strong", { children: "가족 초대" }),
    /* @__PURE__ */ e("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: async () => {
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
    t && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", children: t }),
    /* @__PURE__ */ o("details", { children: [
      /* @__PURE__ */ e("summary", { children: "주소 보기" }),
      /* @__PURE__ */ e("code", { children: n })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && ta();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function lo({ members: t, onPick: a }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((n) => /* @__PURE__ */ o("button", { className: "jt-who-btn", onClick: () => a(n), children: [
      /* @__PURE__ */ e(rt, { name: n, members: t, size: 40 }),
      n
    ] }, n)) })
  ] });
}
function co({ initial: t, preset: a, gkey: n, dayItems: r = [], onSave: s, onDelete: j }) {
  let [f, p] = C(t?.time || a?.time || ""), [d, b] = C(t?.end || a?.end || ""), [v, N] = C(t?.link || ""), [c, z] = C(t && Ft(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [g, l] = C([]), [u, A] = C(!1), [m, k] = C(""), [i, h] = C(t?.title || ""), [w, F] = C(t?.place || ""), [E, R] = C(t?.memo || ""), [S, M] = C(!1), _ = (y) => {
    if (h(y), !f || S) {
      let U = Jn(y);
      U ? (p(U), M(!0)) : S && (p(""), M(!1));
    }
  }, K = async () => {
    let y = (w || i).trim();
    if (!y) {
      k("장소 이름을 먼저 적어 주세요.");
      return;
    }
    A(!0), k(""), l([]);
    try {
      let U = await Ao(y, n);
      l(U), U.length || k("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      k("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    A(!1);
  }, q = f && d && yt(d) <= yt(f), B = f ? r.filter((y) => {
    if (!y.time) return !1;
    let U = Jt({ time: f, end: q ? "" : d }), G = Jt(y);
    return U.s < G.e && G.s < U.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(et, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: i, onChange: (y) => _(y.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    S && f && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      f,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          sa,
          {
            label: "시작",
            value: f,
            onChange: (y) => {
              p(y), M(!1), y || b("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(sa, { label: "끝", value: d, onChange: b, disabled: !f })
      ] })
    ] }),
    f && !d && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    q && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    f && d && !q && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      za(yt(d) - yt(f)),
      " 동안"
    ] }),
    B.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      B.map((y) => `'${y.title}'(${y.time}${y.end ? `~${y.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: w,
            onChange: (y) => F(y.target.value),
            onKeyDown: (y) => y.key === "Enter" && !y.nativeEvent.isComposing && K(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: K, disabled: u, children: u ? "찾는 중" : "검색" })
      ] })
    ] }),
    m && /* @__PURE__ */ e("p", { className: "jt-hint", children: m }),
    g.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: g.map((y, U) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          F(y.name), z({ lat: y.lat, lng: y.lng, placeId: y.placeId }), y.link && N(y.link), l([]), k("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: y.name }),
          /* @__PURE__ */ e("span", { children: y.area })
        ]
      }
    ) }, U)) }),
    c && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(wt, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: Pt({ title: i, place: w, link: v, ...c }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Nt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => z(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ e(et, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e("input", { type: "url", value: v, onChange: (y) => N(y.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ e(et, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: E, onChange: (y) => R(y.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim() || q,
        onClick: () => s({
          time: f,
          end: f ? d : "",
          title: i.trim(),
          place: w.trim(),
          memo: E.trim(),
          link: v.trim(),
          lat: c ? c.lat : void 0,
          lng: c ? c.lng : void 0,
          placeId: c && c.placeId ? c.placeId : void 0
        }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(ht, { onConfirm: j, label: "이 일정 삭제" })
  ] });
}
function po({ initial: t, onSave: a, onDelete: n }) {
  let [r, s] = C(t?.name || ""), [j, f] = C(t?.cat || "맛집"), [p, d] = C(t?.area || ""), [b, v] = C(t?.link || ""), [N, c] = C(t?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(et, { label: "이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (z) => s(z.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: De.map((z) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (j === z ? " on" : ""), onClick: () => f(z), children: z }, z)) })
    ] }),
    /* @__PURE__ */ e(et, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: p, onChange: (z) => d(z.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(et, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: b,
        onChange: (z) => v(z.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(et, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: N, onChange: (z) => c(z.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !r.trim(),
        onClick: () => a({ name: r.trim(), cat: j, area: p.trim(), link: b.trim(), memo: N.trim() }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(ht, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function mo({ settings: t, me: a, defaultDay: n, initial: r, onSave: s, onDelete: j }) {
  let { members: f, days: p, start: d, rate: b } = t, [v, N] = C(r?.title || ""), [c, z] = C(r ? String(Number(r.amount) || "") : ""), [g, l] = C(r && f.includes(r.payer) ? r.payer : a), [u, A] = C(r?.cat || "식비"), [m, k] = C(r ? Math.min(r.day, p - 1) : n), [i, h] = C(r ? (r.split || []).filter((S) => f.includes(S)) : f), w = Number(c) || 0, F = r ? [r.payer, ...r.split || []].filter((S, M, _) => S && !f.includes(S) && _.indexOf(S) === M) : [], E = (S) => h(i.includes(S) ? i.filter((M) => M !== S) : [...i, S]), R = v.trim() && w > 0 && i.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(et, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: v, onChange: (S) => N(S.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(et, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: c, onChange: (S) => z(S.target.value), placeholder: "0" }) }),
    w > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: Yt(w, b) }),
      /* @__PURE__ */ e("br", {}),
      oe(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: oe(t) }),
    F.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      F.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: f.map((S) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (g === S ? " on" : ""), onClick: () => l(S), children: S }, S)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
