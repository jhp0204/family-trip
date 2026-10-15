// src/main.jsx
import { useState as Et, useEffect as gr } from "react";
import { createRoot as fr } from "react-dom/client";

// src/app.jsx
import Mn, { useState as z, useEffect as W, useMemo as Jt, useCallback as An, useRef as Y } from "react";
import {
  Plus as Sn,
  X as Vt,
  Heart as Re,
  Trash2 as In,
  MapPin as kt,
  Settings as Fn,
  CalendarDays as Dn,
  Wallet as Pn,
  Check as $a,
  ExternalLink as zt,
  Map as $n,
  MessageSquare as Rn,
  Image as _n,
  Link2 as Ln,
  Send as Ra,
  Pencil as _a,
  ChevronLeft as Bn,
  ChevronRight as Tn,
  ChevronDown as On,
  ChevronUp as Un,
  Users as Kn,
  Crosshair as Wn,
  HelpCircle as Hn,
  MessagesSquare as Yn,
  Utensils as Jn,
  TrainFront as qn,
  BedDouble as Gn,
  Ticket as Xn,
  ShoppingBag as Vn,
  MoreHorizontal as Zn,
  Sun as Qn,
  CloudSun as to,
  Cloud as xa,
  CloudFog as eo,
  CloudDrizzle as ao,
  CloudRain as no,
  CloudSnow as oo,
  CloudLightning as ro,
  Umbrella as io,
  SmilePlus as so,
  LocateFixed as lo,
  Star as co,
  Navigation as Nt
} from "lucide-react";

// src/store.js
import { initializeApp as xn } from "firebase/app";
import {
  initializeFirestore as sa,
  persistentLocalCache as jn,
  persistentMultipleTabManager as vn,
  collection as yn,
  doc as je,
  onSnapshot as wn,
  setDoc as pa,
  getDoc as kn,
  deleteDoc as Nn
} from "firebase/firestore";
var Ut = "fjt:", ut = { config: null, code: null }, ke = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), Cn = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function Ne(t) {
  try {
    let a = String(t || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, r = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!r) return null;
    let i = Cn(r);
    return i && i.c && i.t ? i : null;
  } catch {
    return null;
  }
}
function da() {
  let t = Ne(location.hash);
  if (t)
    return localStorage.setItem(Ut + "conn", JSON.stringify(t)), t;
  try {
    let a = JSON.parse(localStorage.getItem(Ut + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + ke(a)), a;
  } catch {
  }
  return null;
}
function ma(t, a) {
  let n = { c: t, t: a };
  return localStorage.setItem(Ut + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + ke(n)), n;
}
var ua = () => location.origin + location.pathname + "#j=" + ke({ c: ut.config, t: ut.code });
function ga() {
  localStorage.removeItem(Ut + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var fa = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => t[n % t.length]).join("");
};
function ba(t) {
  let a = String(t || "");
  try {
    let r = JSON.parse(a);
    if (r.apiKey && r.projectId && r.appId) return r;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((r) => {
    let i = a.match(new RegExp(r + `\\s*[:=]\\s*["']([^"']+)["']`));
    i && (n[r] = i[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var Mt = null, mt = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set(), ye = Promise.resolve(), be = null, la = null, zn = () => {
  clearTimeout(la), la = setTimeout(() => ve.forEach((t) => t()), 250);
}, we = (t) => t.startsWith("trip:photo:"), he = (t) => we(t) ? je(Mt, "trips", ut.code, "photos", t.slice(11)) : je(Mt, "trips", ut.code, "data", t), xe = (t) => Ut + ut.code + ":" + t, ca = (t) => Promise.race([t.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function Ce(t, a) {
  be && be(), mt.clear(), ut.config = t, ut.code = a;
  let n = xn(t, "fjt-" + Date.now());
  try {
    Mt = sa(n, { localCache: jn({ tabManager: vn() }) });
  } catch {
    Mt = sa(n, {});
  }
  let r;
  ye = new Promise((j) => r = j), setTimeout(() => r(), 6e3);
  let i = !0;
  be = wn(
    yn(Mt, "trips", a, "data"),
    (j) => {
      j.docChanges().forEach((h) => {
        h.type === "removed" ? mt.delete(h.doc.id) : mt.set(h.doc.id, h.doc.data().v);
      }), r(), i || zn(), i = !1;
    },
    () => r()
  ), window.storage = En;
}
async function ha() {
  let t = je(Mt, "trips", ut.code, "data", "_ping");
  await Promise.race([
    pa(t, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var En = {
  async get(t, a) {
    if (!a) {
      let n = localStorage.getItem(xe(t));
      if (n == null) throw new Error("not found");
      return { key: t, value: n, shared: !1 };
    }
    if (we(t)) {
      let n = await kn(he(t));
      if (!n.exists()) throw new Error("not found");
      return { key: t, value: n.data().v, shared: !0 };
    }
    if (await ye, !mt.has(t)) throw new Error("not found");
    return { key: t, value: mt.get(t), shared: !0 };
  },
  async set(t, a, n) {
    return n ? (we(t) || mt.set(t, a), await ca(pa(he(t), { v: a, t: Date.now() })), { key: t, value: a, shared: !0 }) : (localStorage.setItem(xe(t), a), { key: t, value: a, shared: !1 });
  },
  async delete(t, a) {
    return a ? (mt.delete(t), await ca(Nn(he(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(xe(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", a) {
    return a ? (await ye, { keys: [...mt.keys()].filter((n) => n.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return ve.add(t), () => ve.delete(t);
  }
};

// src/app.jsx
import { Fragment as ct, jsx as e, jsxs as o } from "react/jsx-runtime";
var H = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, _e = (t) => "trip:photo:" + t, tt = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], po = ["일", "월", "화", "수", "목", "금", "토"], Le = ["맛집", "관광", "쇼핑", "기타"], La = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Dt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Kt = 6, ja = {
  식비: { Icon: Jn, color: "#D9262E" },
  교통: { Icon: qn, color: "#0C86AE" },
  숙소: { Icon: Gn, color: "#7B5FC4" },
  체험: { Icon: Xn, color: "#E8800A" },
  쇼핑: { Icon: Vn, color: "#0A9B6E" },
  기타: { Icon: Zn, color: "#66718A" }
}, Ie = (t) => ja[t] || ja.기타, st = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), pt = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), vt = (t) => {
  let [a, n, r] = t.split("-").map(Number);
  return new Date(a, n - 1, r);
}, dt = (t, a) => {
  let n = vt(t);
  return n.setDate(n.getDate() + a), n;
}, qt = (t) => `${t.getMonth() + 1}/${t.getDate()}`, Pt = (t) => po[t.getDay()], q = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Gt = (t, a) => "₩" + (Math.round(t * a / 100 / 10) * 10).toLocaleString("ko-KR"), nt = (t) => String(t).padStart(2, "0"), Fe = (t) => {
  let a = (Date.now() - t) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(t);
  return `${n.getMonth() + 1}/${n.getDate()} ${nt(n.getHours())}:${nt(n.getMinutes())}`;
}, va = (t) => {
  let a = (t || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, mo = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, wt = (t) => {
  let [a, n] = String(t).split(":").map(Number);
  return a * 60 + (n || 0);
}, St = (t) => `${nt(Math.floor(t / 60) % 24)}:${nt(t % 60)}`, Xt = (t) => {
  let a = wt(t.time), n = t.end ? wt(t.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, Ba = (t) => {
  let a = Math.floor(t / 60), n = t % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function uo(t) {
  let a = t || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${nt(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let r = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${nt(Number(n[2]))}:${nt(r)}`;
}
var go = Array.from({ length: 24 }, (t, a) => nt(a));
function ya({ value: t, onChange: a, disabled: n, label: r }) {
  let [i, j] = t ? t.split(":") : ["", ""], h = Array.from({ length: 12 }, (p, m) => nt(m * 5));
  return j && !h.includes(j) && (h = [...h, j].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 시",
        value: i,
        disabled: n,
        onChange: (p) => a(p.target.value ? `${p.target.value}:${j || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          go.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 분",
        value: j,
        disabled: n || !i,
        onChange: (p) => a(`${i}:${p.target.value}`),
        children: [
          !i && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          h.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    )
  ] });
}
var fo = (t) => {
  let a = t.filter((r) => r.time).map((r) => ({ id: r.id, ...Xt(r) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (r) => a.forEach((i) => {
      r.id !== i.id && r.s < i.e && i.s < r.e && n.add(r.id);
    })
  ), n;
}, ce = (t) => ht(t) ? `${t.lat},${t.lng}` : t.place ? Te(t.place) : "", bo = (t, a) => {
  let n = t ? ce(t) : "", r = ce(a);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(r) + (n ? "&origin=" + encodeURIComponent(n) : "");
}, Be = (t) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(ht(t) ? `${t.lat},${t.lng}` : Te(t.name || t.title, t.area || t.place)) + (t.placeId ? "&destination_place_id=" + encodeURIComponent(t.placeId) : ""), Te = (...t) => [...t, "일본"].filter(Boolean).join(" "), ht = (t) => typeof t.lat == "number" && typeof t.lng == "number", Ta = (t) => ht(t) ? `${t.lat},${t.lng}` : Te(t.name || t.title, t.area || t.place), $t = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Ta(t)), ho = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Ta(t)), ft = 256, ze = (t, a, n) => {
  let r = ft * 2 ** n, i = t * Math.PI / 180;
  return {
    x: (a + 180) / 360 * r,
    y: (1 - Math.log(Math.tan(i) + 1 / Math.cos(i)) / Math.PI) / 2 * r
  };
}, wa = (t, a, n) => {
  let r = ft * 2 ** n, i = Math.PI - 2 * Math.PI * a / r;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(i)), lng: t / r * 360 - 180 };
}, Wt = (t) => Math.max(3, Math.min(18, t));
async function Ee(t) {
  let a = await window.storage.list(t, !0), n = (a && a.keys || []).map((i) => typeof i == "string" ? i : i.key).filter(Boolean), r = await Promise.all(n.map((i) => lt(i, null)));
  return n.map((i, j) => [i, r[j]]).filter(([, i]) => i);
}
async function lt(t, a) {
  try {
    let n = await window.storage.get(t, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function gt(t, a) {
  try {
    return !!await window.storage.set(t, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var bt = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map();
function xo(t) {
  if (bt.has(t)) return Promise.resolve(bt.get(t));
  if (ie.has(t)) return ie.get(t);
  let a = lt(_e(t), null).then((n) => (ie.delete(t), n && bt.set(t, n), n));
  return ie.set(t, a), a;
}
async function ka(t) {
  bt.delete(t);
  try {
    await window.storage.delete(_e(t), !0);
  } catch {
  }
}
var jo = (t) => new Promise((a, n) => {
  let r = URL.createObjectURL(t), i = new Image();
  i.onload = () => {
    URL.revokeObjectURL(r), a(i);
  }, i.onerror = () => {
    URL.revokeObjectURL(r), n(new Error("bad image"));
  }, i.src = r;
});
async function vo(t) {
  let a = await jo(t), n = 1280, r = 0.7, i = "";
  for (let j = 0; j < 5; j++) {
    let h = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), p = document.createElement("canvas");
    p.width = Math.max(1, Math.round(a.naturalWidth * h)), p.height = Math.max(1, Math.round(a.naturalHeight * h));
    let m = p.getContext("2d");
    if (m.fillStyle = "#fff", m.fillRect(0, 0, p.width, p.height), m.drawImage(a, 0, 0, p.width, p.height), i = p.toDataURL("image/jpeg", r), i.length < 6e5) break;
    n = Math.round(n * 0.8), r = Math.max(0.4, r - 0.08);
  }
  return i;
}
var yo = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: pt(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function wo() {
  for (let [t, a] of yo)
    try {
      let n = await fetch(t);
      if (!n.ok) continue;
      let r = a(await n.json());
      if (r.rate > 0) return r;
    } catch {
    }
  return null;
}
var Na = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), pe = (t) => t.fx ? `100엔 = ₩${Na(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${Na(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Ca(t, a) {
  let n = () => Object.fromEntries(a.map((s) => [s, 0])), r = n(), i = n(), j = [];
  t.forEach((s) => {
    let M = Number(s.amount) || 0, b = (s.split || []).filter((l) => a.includes(l));
    if (!(M <= 0)) {
      if (!b.length || !a.includes(s.payer)) {
        j.push(s);
        return;
      }
      r[s.payer] += M, b.forEach((l) => i[l] += M / b.length);
    }
  });
  let h = Object.fromEntries(a.map((s) => [s, r[s] - i[s]])), p = a.filter((s) => h[s] > 0.5).map((s) => ({ m: s, v: h[s] })).sort((s, M) => M.v - s.v), m = a.filter((s) => h[s] < -0.5).map((s) => ({ m: s, v: -h[s] })).sort((s, M) => M.v - s.v), x = [], y = 0, E = 0;
  for (; y < m.length && E < p.length; ) {
    let s = Math.min(m[y].v, p[E].v);
    s >= 1 && x.push({ from: m[y].m, to: p[E].m, v: Math.round(s) }), m[y].v -= s, p[E].v -= s, m[y].v < 0.5 && y++, p[E].v < 0.5 && E++;
  }
  return { paid: r, share: i, net: h, moves: x, skipped: j };
}
function rt({ name: t, members: a, size: n = 28 }) {
  let r = Math.max(0, a.indexOf(t));
  return /* @__PURE__ */ e(
    "span",
    {
      className: "jt-avatar",
      style: { width: n, height: n, background: tt[(r * 2 + 3) % tt.length], fontSize: n * 0.46 },
      "aria-hidden": "true",
      children: t ? t[0] : "?"
    }
  );
}
function at({ label: t, children: a }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    a
  ] });
}
function yt({ title: t, onClose: a, children: n }) {
  return W(() => {
    let r = (i) => i.key === "Escape" && a();
    return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
  }, [a]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (r) => r.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ e(Vt, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function xt({ onConfirm: t, label: a = "삭제" }) {
  let [n, r] = z(!1);
  return W(() => {
    if (!n) return;
    let i = setTimeout(() => r(!1), 3e3);
    return () => clearTimeout(i);
  }, [n]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (i) => {
        i.stopPropagation(), n ? t() : r(!0);
      },
      children: [
        /* @__PURE__ */ e(In, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
function ko({ id: t, data: a, className: n, onClick: r, alt: i = "사진" }) {
  let [j, h] = z(a || bt.get(t) || null), [p, m] = z(!1);
  W(() => {
    if (a) {
      h(a);
      return;
    }
    if (bt.has(t)) {
      h(bt.get(t));
      return;
    }
    let y = !0;
    return m(!1), xo(t).then((E) => {
      y && (E ? h(E) : m(!0));
    }), () => {
      y = !1;
    };
  }, [t, a]);
  let x = j ? /* @__PURE__ */ e("img", { src: j, alt: i, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: p ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return r ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (n || ""), onClick: r, "aria-label": "사진 크게 보기", children: x }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (n || ""), children: x });
}
var za = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Oa(t) {
  let a = {};
  if (Object.entries(t.reactions || {}).forEach(([n, r]) => a[n] = [...r]), t.boardLikes && (t.likes || []).length) {
    let n = new Set(Object.values(a).flat()), r = t.likes.filter((i) => !n.has(i));
    r.length && (a["❤️"] = [...a["❤️"] || [], ...r]);
  }
  return a;
}
function No(t, a, n, r) {
  let i = Oa({ ...t, boardLikes: r }), j = (i[a] || []).includes(n), h = {};
  Object.entries(i).forEach(([m, x]) => {
    let y = x.filter((E) => E !== n);
    y.length && (h[m] = y);
  }), j || (h[a] = [...h[a] || [], n]);
  let p = { ...t, reactions: h };
  return r && (p.likes = []), p;
}
function Oe({ item: t, me: a, onReact: n, boardLikes: r = !1 }) {
  let [i, j] = z(!1), [h, p] = z("up right"), m = Y(null), x = Oa({ ...t, boardLikes: r }), y = () => {
    if (!i && m.current) {
      let b = m.current.getBoundingClientRect(), u = m.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", I = b.top < 190 ? "down" : "up";
      p(I + " " + u);
    }
    j(!i);
  }, E = za.filter(([b]) => (x[b] || []).length), s = Object.keys(x).find((b) => x[b].includes(a));
  W(() => {
    if (!i) return;
    let b = (l) => m.current && !m.current.contains(l.target) && j(!1);
    return document.addEventListener("pointerdown", b), () => document.removeEventListener("pointerdown", b);
  }, [i]);
  let M = (b) => {
    n(b), j(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: m,
      onClick: (b) => b.stopPropagation(),
      onKeyDown: (b) => b.stopPropagation(),
      children: [
        E.map(([b, l]) => /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (s === b ? " on" : ""),
            onClick: () => M(b),
            "aria-pressed": s === b,
            "aria-label": `${l} ${x[b].length}명: ${x[b].join(", ")}`,
            title: x[b].join(", "),
            children: [
              /* @__PURE__ */ e("span", { className: "jt-emoji", children: b }),
              x[b].length
            ]
          },
          b
        )),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (i ? " open" : ""),
            onClick: y,
            "aria-expanded": i,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(so, { size: 16 })
          }
        ),
        i && /* @__PURE__ */ o("div", { className: "jt-rpop " + h, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: za.map(([b, l]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (s === b ? " on" : ""),
              onClick: () => M(b),
              "aria-label": l,
              title: l,
              children: b
            },
            b
          )) }),
          E.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: E.map(([b]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: b }),
            x[b].join(", ")
          ] }, b)) })
        ] })
      ]
    }
  );
}
function Ua({ count: t, open: a, onClick: n }) {
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
        /* @__PURE__ */ e(Rn, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Ue({ comments: t = [], me: a, members: n, onAdd: r, onDelete: i }) {
  let [j, h] = z(""), p = () => {
    let m = j.trim();
    m && (r(m), h(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (m) => m.stopPropagation(), onKeyDown: (m) => m.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((m) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(rt, { name: m.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("strong", { children: m.by }),
          /* @__PURE__ */ e("span", { children: Fe(m.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: m.text })
      ] }),
      m.by === a && /* @__PURE__ */ e(xt, { onConfirm: () => i(m.id), label: "" })
    ] }, m.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: j,
          onChange: (m) => h(m.target.value),
          onKeyDown: (m) => m.key === "Enter" && !m.nativeEvent.isComposing && p(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: p, disabled: !j.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(Ra, { size: 18 }) })
    ] })
  ] });
}
function Co({ url: t, onRemove: a }) {
  let n = /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(Ln, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: mo(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return a ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(Vt, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ e(zt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function zo({ initial: t, onSave: a, onCancel: n }) {
  let [r, i] = z(t?.title || "가족 일본여행"), [j, h] = z(t?.start || pt(new Date(Date.now() + 30 * 864e5))), [p, m] = z(t?.days || 4), [x, y] = z(t?.members || []), [E, s] = z(t?.rate || 900), [M, b] = z(t?.gmapsKey || ""), [l, u] = z(""), I = () => {
    let C = l.trim();
    !C || x.includes(C) || (y([...x, C]), u(""));
  }, d = r.trim() && j && x.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    n && /* @__PURE__ */ e(Ka, { onBack: n }),
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(at, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (C) => i(C.target.value) }) }),
      /* @__PURE__ */ e(at, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: j, onChange: (C) => h(C.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => m(Math.max(1, p - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            p,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => m(Math.min(30, p + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: x.map((C) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(rt, { name: C, members: x, size: 20 }),
          C,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => y(x.filter((c) => c !== C)), "aria-label": `${C} 빼기`, children: /* @__PURE__ */ e(Vt, { size: 14 }) })
        ] }, C)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: l,
              onChange: (C) => u(C.target.value),
              onKeyDown: (C) => C.key === "Enter" && I(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: I, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(at, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: E, onChange: (C) => s(Number(C.target.value) || 0) }) }),
      /* @__PURE__ */ e(at, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ e(
        "input",
        {
          value: M,
          onChange: (C) => b(C.target.value.trim()),
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
          disabled: !d,
          onClick: () => a({ title: r.trim(), start: j, days: p, members: x, rate: E || 900, gmapsKey: M }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(Eo, {})
    ] })
  ] });
}
function Eo() {
  let [t, a] = z(""), n = ua();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ e("strong", { children: "가족 초대" }),
    /* @__PURE__ */ e("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: n });
          return;
        } catch (i) {
          if (i && i.name === "AbortError") return;
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && ga();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Ka({ onBack: t, label: a = "돌아가기" }) {
  return /* @__PURE__ */ e("div", { className: "jt-backbar", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-back", onClick: t, "aria-label": a, children: [
    /* @__PURE__ */ e(Bn, { size: 22 }),
    a
  ] }) });
}
function Mo({ members: t, onPick: a, current: n, onBack: r }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    r && /* @__PURE__ */ e(Ka, { onBack: r }),
    /* @__PURE__ */ e("h1", { children: r ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((i) => /* @__PURE__ */ o("button", { className: "jt-who-btn" + (i === n ? " on" : ""), onClick: () => a(i), children: [
      /* @__PURE__ */ e(rt, { name: i, members: t, size: 40 }),
      /* @__PURE__ */ e("span", { className: "jt-who-name", children: i }),
      i === n && /* @__PURE__ */ e("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, i)) })
  ] });
}
function Ao({ initial: t, preset: a, gkey: n, dayItems: r = [], onSave: i, onDelete: j }) {
  let [h, p] = z(t?.time || a?.time || ""), [m, x] = z(t?.end || a?.end || ""), [y, E] = z(t?.link || ""), [s, M] = z(t && ht(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [b, l] = z([]), [u, I] = z(!1), [d, C] = z(""), [c, v] = z(t?.title || ""), [N, A] = z(t?.place || ""), [f, $] = z(t?.memo || ""), [k, S] = z(!1), _ = (w) => {
    if (v(w), !h || k) {
      let K = uo(w);
      K ? (p(K), S(!0)) : k && (p(""), S(!1));
    }
  }, O = async () => {
    let w = (N || c).trim();
    if (!w) {
      C("장소 이름을 먼저 적어 주세요.");
      return;
    }
    I(!0), C(""), l([]);
    try {
      let K = await Go(w, n);
      l(K), K.length || C("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      C("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    I(!1);
  }, G = h && m && wt(m) <= wt(h), U = h ? r.filter((w) => {
    if (!w.time) return !1;
    let K = Xt({ time: h, end: G ? "" : m }), V = Xt(w);
    return K.s < V.e && V.s < K.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(at, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: c, onChange: (w) => _(w.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    k && h && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      h,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          ya,
          {
            label: "시작",
            value: h,
            onChange: (w) => {
              p(w), S(!1), w || x("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(ya, { label: "끝", value: m, onChange: x, disabled: !h })
      ] })
    ] }),
    h && !m && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    G && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    h && m && !G && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      Ba(wt(m) - wt(h)),
      " 동안"
    ] }),
    U.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      U.map((w) => `'${w.title}'(${w.time}${w.end ? `~${w.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: N,
            onChange: (w) => A(w.target.value),
            onKeyDown: (w) => w.key === "Enter" && !w.nativeEvent.isComposing && O(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: O, disabled: u, children: u ? "찾는 중" : "검색" })
      ] })
    ] }),
    d && /* @__PURE__ */ e("p", { className: "jt-hint", children: d }),
    b.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: b.map((w, K) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          A(w.name), M({ lat: w.lat, lng: w.lng, placeId: w.placeId }), w.link && E(w.link), l([]), C("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: w.name }),
          /* @__PURE__ */ e("span", { children: w.area })
        ]
      }
    ) }, K)) }),
    s && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(kt, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t({ title: c, place: N, link: y, ...s }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(zt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => M(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ e(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e("input", { type: "url", value: y, onChange: (w) => E(w.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ e(at, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: f, onChange: (w) => $(w.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !c.trim() || G,
        onClick: () => i({
          time: h,
          end: h ? m : "",
          title: c.trim(),
          place: N.trim(),
          memo: f.trim(),
          link: y.trim(),
          lat: s ? s.lat : void 0,
          lng: s ? s.lng : void 0,
          placeId: s && s.placeId ? s.placeId : void 0
        }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(xt, { onConfirm: j, label: "이 일정 삭제" })
  ] });
}
function So({ initial: t, onSave: a, onDelete: n }) {
  let [r, i] = z(t?.name || ""), [j, h] = z(t?.cat || "맛집"), [p, m] = z(t?.area || ""), [x, y] = z(t?.link || ""), [E, s] = z(t?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(at, { label: "이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (M) => i(M.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Le.map((M) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (j === M ? " on" : ""), onClick: () => h(M), children: M }, M)) })
    ] }),
    /* @__PURE__ */ e(at, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: p, onChange: (M) => m(M.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: x,
        onChange: (M) => y(M.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(at, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: E, onChange: (M) => s(M.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !r.trim(),
        onClick: () => a({ name: r.trim(), cat: j, area: p.trim(), link: x.trim(), memo: E.trim() }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(xt, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function Io({ settings: t, me: a, defaultDay: n, initial: r, onSave: i, onDelete: j }) {
  let { members: h, days: p, start: m, rate: x } = t, [y, E] = z(r?.title || ""), [s, M] = z(r ? String(Number(r.amount) || "") : ""), [b, l] = z(r && h.includes(r.payer) ? r.payer : a), [u, I] = z(r?.cat || "식비"), [d, C] = z(r ? Math.min(r.day, p - 1) : n), [c, v] = z(r ? (r.split || []).filter((k) => h.includes(k)) : h), N = Number(s) || 0, A = r ? [r.payer, ...r.split || []].filter((k, S, _) => k && !h.includes(k) && _.indexOf(k) === S) : [], f = (k) => v(c.includes(k) ? c.filter((S) => S !== k) : [...c, k]), $ = y.trim() && N > 0 && c.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(at, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: y, onChange: (k) => E(k.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(at, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: s, onChange: (k) => M(k.target.value), placeholder: "0" }) }),
    N > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: Gt(N, x) }),
      /* @__PURE__ */ e("br", {}),
      pe(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: pe(t) }),
    A.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      A.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: h.map((k) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (b === k ? " on" : ""), onClick: () => l(k), children: k }, k)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: h.map((k) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (c.includes(k) ? " on" : ""), onClick: () => f(k), children: [
