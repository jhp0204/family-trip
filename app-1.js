// src/main.jsx
import { useState as useState2, useEffect as useEffect2 } from "react";
import { createRoot } from "react-dom/client";

// src/app.jsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Plus,
  X,
  Heart,
  Trash2,
  MapPin,
  Settings,
  CalendarDays,
  Wallet,
  Check,
  ExternalLink,
  Map as MapIcon,
  MessageSquare,
  Image as ImageIcon,
  Link2,
  Send,
  Pencil,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Users,
  Crosshair,
  HelpCircle,
  MessagesSquare,
  Megaphone,
  Lock,
  WifiOff,
  Dices,
  Receipt,
  Wifi,
  Pin,
  PinOff,
  Utensils,
  TrainFront,
  BedDouble,
  Ticket,
  ShoppingBag,
  MoreHorizontal,
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Umbrella,
  SmilePlus,
  LocateFixed,
  Star,
  Navigation
} from "lucide-react";

// src/store.js
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  deleteDoc
} from "firebase/firestore";
var LS = "fjt:", conn = { config: null, code: null }, enc = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), dec = (s) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))));
function parseInvite(text) {
  try {
    let raw = String(text || "").trim(), hash = raw.includes("#") ? raw.slice(raw.indexOf("#") + 1) : raw, j = new URLSearchParams(hash).get("j") || (hash.startsWith("j=") ? hash.slice(2) : "");
    if (!j) return null;
    let o = dec(j);
    return o && o.c && o.t ? o : null;
  } catch {
    return null;
  }
}
function readSaved() {
  let fromLink = parseInvite(location.hash);
  if (fromLink)
    return localStorage.setItem(LS + "conn", JSON.stringify(fromLink)), fromLink;
  try {
    let o = JSON.parse(localStorage.getItem(LS + "conn"));
    if (o && o.c && o.t)
      return history.replaceState(null, "", "#j=" + enc(o)), o;
  } catch {
  }
  return null;
}
function rememberConn(c, t) {
  let o = { c, t };
  return localStorage.setItem(LS + "conn", JSON.stringify(o)), history.replaceState(null, "", "#j=" + enc(o)), o;
}
var inviteUrl = () => location.origin + location.pathname + "#j=" + enc({ c: conn.config, t: conn.code });
function disconnect() {
  localStorage.removeItem(LS + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var newCode = () => {
  let a = "abcdefghjkmnpqrstuvwxyz23456789", r = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(r, (x) => a[x % a.length]).join("");
};
function parseConfig(text) {
  let t = String(text || "");
  try {
    let j = JSON.parse(t);
    if (j.apiKey && j.projectId && j.appId) return j;
  } catch {
  }
  let f = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((k) => {
    let m = t.match(new RegExp(k + `\\s*[:=]\\s*["']([^"']+)["']`));
    m && (f[k] = m[1]);
  }), f.apiKey && f.projectId && f.appId ? f : null;
}
var db = null, cache = /* @__PURE__ */ new Map(), listeners = /* @__PURE__ */ new Set(), readyP = Promise.resolve(), unsub = null, synced = !1, timer = null, emit = () => {
  clearTimeout(timer), timer = setTimeout(() => listeners.forEach((cb) => cb()), 250);
}, isPhoto = (k) => k.startsWith("trip:photo:"), ref = (k) => isPhoto(k) ? doc(db, "trips", conn.code, "photos", k.slice(11)) : doc(db, "trips", conn.code, "data", k), meKey = (k) => LS + conn.code + ":" + k, queued = (p) => Promise.race([p.then(() => !0), new Promise((r) => setTimeout(() => r(!0), 4e3))]);
function connect(config, code) {
  unsub && unsub(), cache.clear(), conn.config = config, conn.code = code;
  let app = initializeApp(config, "fjt-" + Date.now());
  try {
    db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
  } catch {
    db = initializeFirestore(app, {});
  }
  let resolve;
  synced = !1, readyP = new Promise((r) => resolve = r), setTimeout(() => resolve(), 8e3);
  let first = !0;
  unsub = onSnapshot(
    collection(db, "trips", code, "data"),
    { includeMetadataChanges: !0 },
    (snap) => {
      let changes = snap.docChanges();
      changes.forEach((ch) => {
        ch.type === "removed" ? cache.delete(ch.doc.id) : cache.set(ch.doc.id, ch.doc.data().v);
      });
      let fromServer = !snap.metadata.fromCache;
      (fromServer || snap.size > 0) && resolve(), fromServer && !synced ? (synced = !0, emit()) : !first && changes.length && emit(), first = !1;
    },
    () => {
      resolve(), emit();
    }
  ), window.storage = api;
}
async function ping() {
  let r = doc(db, "trips", conn.code, "data", "_ping");
  await Promise.race([
    setDoc(r, { v: "ok", t: Date.now() }),
    new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 9e3))
  ]);
}
var api = {
  async get(key, shared) {
    if (!shared) {
      let v = localStorage.getItem(meKey(key));
      if (v == null) throw new Error("not found");
      return { key, value: v, shared: !1 };
    }
    if (isPhoto(key)) {
      let d = await getDoc(ref(key));
      if (!d.exists()) throw new Error("not found");
      return { key, value: d.data().v, shared: !0 };
    }
    if (await readyP, !cache.has(key)) throw new Error("not found");
    return { key, value: cache.get(key), shared: !0 };
  },
  async set(key, value, shared) {
    return shared ? (isPhoto(key) || cache.set(key, value), await queued(setDoc(ref(key), { v: value, t: Date.now() })), { key, value, shared: !0 }) : (localStorage.setItem(meKey(key), value), { key, value, shared: !1 });
  },
  async delete(key, shared) {
    return shared ? (cache.delete(key), await queued(deleteDoc(ref(key))), { key, deleted: !0, shared: !0 }) : (localStorage.removeItem(meKey(key)), { key, deleted: !0, shared: !1 });
  },
  async list(prefix = "", shared) {
    return shared ? (await readyP, { keys: [...cache.keys()].filter((k) => k.startsWith(prefix)), prefix, shared: !0 }) : { keys: [], prefix, shared: !1 };
  },
  // 서버와 한 번이라도 맞춰졌는지 (처음 연 기기에서 빈 화면을 "여행 없음"으로 착각하지 않게)
  isSynced() {
    return synced;
  },
  onChange(cb) {
    return listeners.add(cb), () => listeners.delete(cb);
  }
};

// src/app.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var KEYS = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice", board: "trip:board" }, photoKey = (id) => "trip:photo:" + id, MAX_PHOTOS = 6, LINE = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], WEEK = ["일", "월", "화", "수", "목", "금", "토"], WISH_CATS = ["맛집", "관광", "쇼핑", "기타"], FUND = "__fund__", isFund = (e) => !!e && (e.fund === !0 || e.payer === FUND), SPEND_CATS = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], WISH_TONE = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, SPEND_LOOK = {
  식비: { Icon: Utensils, color: "#D9262E" },
  교통: { Icon: TrainFront, color: "#0C86AE" },
  숙소: { Icon: BedDouble, color: "#7B5FC4" },
  체험: { Icon: Ticket, color: "#E8800A" },
  쇼핑: { Icon: ShoppingBag, color: "#0A9B6E" },
  기타: { Icon: MoreHorizontal, color: "#66718A" }
}, look = (c) => SPEND_LOOK[c] || SPEND_LOOK.기타, uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), parse = (s) => {
  let [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}, addDays = (s, n) => {
  let d = parse(s);
  return d.setDate(d.getDate() + n), d;
}, md = (d) => `${d.getMonth() + 1}/${d.getDate()}`, wk = (d) => WEEK[d.getDay()], yen = (n) => "¥" + Math.round(n).toLocaleString("ko-KR"), won = (n, rate) => "₩" + (Math.round(n * rate / 100 / 100) * 100).toLocaleString("ko-KR"), RATE_NOW = 900, yw = (n) => `${yen(n)}(${won(n, RATE_NOW)})`, pad = (n) => String(n).padStart(2, "0"), ago = (t) => {
  let s = (Date.now() - t) / 1e3;
  if (s < 60) return "방금";
  if (s < 3600) return `${Math.floor(s / 60)}분 전`;
  if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
  let d = new Date(t);
  return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}, normUrl = (s) => {
  let t = (s || "").trim();
  if (!t) return "";
  /^https?:\/\//i.test(t) || (t = "https://" + t);
  try {
    let u = new URL(t);
    return u.hostname.includes(".") ? u.href : "";
  } catch {
    return "";
  }
}, host = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u;
  }
}, toMin = (t) => {
  let [h, m] = String(t).split(":").map(Number);
  return h * 60 + (m || 0);
}, fmtMin = (m) => `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`, span = (i) => {
  let s = toMin(i.time), e = i.end ? toMin(i.end) : s + 60;
  return e <= s && (e = s + 60), { s, e: Math.min(e, 24 * 60) };
}, durText = (min) => {
  let h = Math.floor(min / 60), m = min % 60;
  return [h ? `${h}시간` : "", m ? `${m}분` : ""].filter(Boolean).join(" ");
};
function findTime(text) {
  let t = text || "", m = t.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (m) return `${pad(Number(m[2]))}:${m[3]}`;
  if (m = t.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !m) return "";
  let min = m[3] === "반" ? 30 : m[4] ? Number(m[4]) : 0;
  return `${pad(Number(m[2]))}:${pad(min)}`;
}
var HOURS = Array.from({ length: 24 }, (_, i) => pad(i));
function TimeSelect({ value, onChange, disabled, label }) {
  let [h, m] = value ? value.split(":") : ["", ""], mins = Array.from({ length: 12 }, (_, i) => pad(i * 5));
  return m && !mins.includes(m) && (mins = [...mins, m].sort()), /* @__PURE__ */ jsxs("div", { className: "jt-tsel" + (disabled ? " off" : ""), children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        "aria-label": label + " 시",
        value: h,
        disabled,
        onChange: (e) => onChange(e.target.value ? `${e.target.value}:${m || "00"}` : ""),
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "--" }),
          HOURS.map((x) => /* @__PURE__ */ jsx("option", { value: x, children: x }, x))
        ]
      }
    ),
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        "aria-label": label + " 분",
        value: m,
        disabled: disabled || !h,
        onChange: (e) => onChange(`${h}:${e.target.value}`),
        children: [
          !h && /* @__PURE__ */ jsx("option", { value: "", children: "--" }),
          mins.map((x) => /* @__PURE__ */ jsx("option", { value: x, children: x }, x))
        ]
      }
    )
  ] });
}
var overlapIds = (items) => {
  let timed = items.filter((i) => i.time).map((i) => ({ id: i.id, ...span(i) })), out = /* @__PURE__ */ new Set();
  return timed.forEach(
    (a) => timed.forEach((b) => {
      a.id !== b.id && a.s < b.e && b.s < a.e && out.add(a.id);
    })
  ), out;
}, placeOf = (i) => hasPos(i) ? `${i.lat},${i.lng}` : i.place ? mapQuery(i.place) : "", routeUrl = (from, to) => {
  let o = from ? placeOf(from) : "", d = placeOf(to);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(d) + (o ? "&origin=" + encodeURIComponent(o) : "");
}, hereRouteUrl = (w) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(hasPos(w) ? `${w.lat},${w.lng}` : mapQuery(w.name || w.title, w.area || w.place)) + (w.placeId ? "&destination_place_id=" + encodeURIComponent(w.placeId) : ""), mapQuery = (...parts) => [...parts, "일본"].filter(Boolean).join(" "), hasPos = (item) => typeof item.lat == "number" && typeof item.lng == "number", mapTarget = (item) => hasPos(item) ? `${item.lat},${item.lng}` : mapQuery(item.name || item.title, item.area || item.place), mapUrl = (item) => /^https?:\/\//.test(item.link || "") ? item.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapTarget(item)), embedUrl = (item) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(mapTarget(item)), TILE = 256, worldPx = (lat, lng, z) => {
  let s = TILE * 2 ** z, r = lat * Math.PI / 180;
  return {
    x: (lng + 180) / 360 * s,
    y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * s
  };
}, fromWorld = (x, y, z) => {
  let s = TILE * 2 ** z, n = Math.PI - 2 * Math.PI * y / s;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(n)), lng: x / s * 360 - 180 };
}, clampZ = (z) => Math.max(3, Math.min(18, z));
async function loadPrefix(prefix) {
  let l = await window.storage.list(prefix, !0), ks = (l && l.keys || []).map((k) => typeof k == "string" ? k : k.key).filter(Boolean), vals = await Promise.all(ks.map((k) => load(k, null)));
  return ks.map((k, i) => [k, vals[i]]).filter(([, v]) => v);
}
async function load(key, fallback) {
  try {
    let r = await window.storage.get(key, !0);
    return r && r.value ? JSON.parse(r.value) : fallback;
  } catch {
    return fallback;
  }
}
async function save(key, val) {
  try {
    return !!await window.storage.set(key, JSON.stringify(val), !0);
  } catch {
    return !1;
  }
}
var photoCache = /* @__PURE__ */ new Map(), photoPending = /* @__PURE__ */ new Map();
function loadPhoto(id) {
  if (photoCache.has(id)) return Promise.resolve(photoCache.get(id));
  if (photoPending.has(id)) return photoPending.get(id);
  let p = load(photoKey(id), null).then((d) => (photoPending.delete(id), d && photoCache.set(id, d), d));
  return photoPending.set(id, p), p;
}
async function deletePhoto(id) {
  photoCache.delete(id);
  try {
    await window.storage.delete(photoKey(id), !0);
  } catch {
  }
}
var readImage = (file) => new Promise((res, rej) => {
  let url = URL.createObjectURL(file), img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url), res(img);
  }, img.onerror = () => {
    URL.revokeObjectURL(url), rej(new Error("bad image"));
  }, img.src = url;
});
async function compressImage(file) {
  let img = await readImage(file), max = 1280, q = 0.7, out = "";
  for (let i = 0; i < 5; i++) {
    let s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight)), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.naturalWidth * s)), c.height = Math.max(1, Math.round(img.naturalHeight * s));
    let ctx = c.getContext("2d");
    if (ctx.fillStyle = "#fff", ctx.fillRect(0, 0, c.width, c.height), ctx.drawImage(img, 0, 0, c.width, c.height), out = c.toDataURL("image/jpeg", q), out.length < 6e5) break;
    max = Math.round(max * 0.8), q = Math.max(0.4, q - 0.08);
  }
  return out;
}
var FX_SOURCES = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (d) => ({ rate: d.rates.KRW * 100, date: d.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (d) => ({ rate: d.rates.KRW * 100, date: d.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (d) => ({ rate: d.rates.KRW * 100, date: iso(new Date(d.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function fetchFx() {
  for (let [url, pick] of FX_SOURCES)
    try {
      let r = await fetch(url);
      if (!r.ok) continue;
      let v = pick(await r.json());
      if (v.rate > 0) return v;
    } catch {
    }
  return null;
}
var rateText = (r) => r.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), fxNote = (st) => st.fx ? `100엔 = ₩${rateText(st.rate)} (${st.fx.source}, ${st.fx.date.slice(5).replace("-", "/")}${st.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${rateText(st.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
async function compressReceipt(file) {
  let img = await readImage(file), max = 1400, q = 0.6, out = "";
  for (let i = 0; i < 6; i++) {
    let sc = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight)), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.naturalWidth * sc)), c.height = Math.max(1, Math.round(img.naturalHeight * sc));
    let ctx = c.getContext("2d");
    if (ctx.fillStyle = "#fff", ctx.fillRect(0, 0, c.width, c.height), ctx.drawImage(img, 0, 0, c.width, c.height), out = c.toDataURL("image/jpeg", q), out.length < 3e5) break;
    max = Math.round(max * 0.85), q = Math.max(0.35, q - 0.07);
  }
  return out;
}
var RECEIPT_MAX = 3;
function settle(spend, members) {
  let zero = () => Object.fromEntries(members.map((m) => [m, 0])), paid = zero(), share = zero(), skipped = [];
  spend.forEach((e) => {
    let amt = Number(e.amount) || 0, parts = (e.split || []).filter((m) => members.includes(m));
    if (!(amt <= 0 || isFund(e))) {
      if (!parts.length || !members.includes(e.payer)) {
        skipped.push(e);
        return;
      }
      paid[e.payer] += amt, parts.forEach((m) => share[m] += amt / parts.length);
    }
  });
  let net = Object.fromEntries(members.map((m) => [m, paid[m] - share[m]])), cred = members.filter((m) => net[m] > 0.5).map((m) => ({ m, v: net[m] })).sort((a, b) => b.v - a.v), debt = members.filter((m) => net[m] < -0.5).map((m) => ({ m, v: -net[m] })).sort((a, b) => b.v - a.v), moves = [], i = 0, j = 0;
  for (; i < debt.length && j < cred.length; ) {
    let x = Math.min(debt[i].v, cred[j].v);
    x >= 1 && moves.push({ from: debt[i].m, to: cred[j].m, v: Math.round(x) }), debt[i].v -= x, cred[j].v -= x, debt[i].v < 0.5 && i++, cred[j].v < 0.5 && j++;
  }
  return { paid, share, net, moves, skipped };
}
function Avatar({ name, members, size = 28 }) {
  let idx = Math.max(0, members.indexOf(name));
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "jt-avatar",
      style: { width: size, height: size, background: LINE[(idx * 2 + 3) % LINE.length], fontSize: size * 0.46 },
      "aria-hidden": "true",
      children: name ? name[0] : "?"
    }
  );
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxs("label", { className: "jt-field", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    children
  ] });
}
function Sheet({ title, onClose, children }) {
  return useEffect(() => {
    let h = (e) => e.key === "Escape" && onClose();
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [onClose]), /* @__PURE__ */ jsx("div", { className: "jt-scrim", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "jt-sheet", role: "dialog", "aria-label": title, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxs("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ jsx("h3", { children: title }),
      /* @__PURE__ */ jsx("button", { className: "jt-icon", onClick: onClose, "aria-label": "닫기", children: /* @__PURE__ */ jsx(X, { size: 20 }) })
    ] }),
    children
  ] }) });
}
function DeleteButton({ onConfirm, label = "삭제" }) {
  let [armed, setArmed] = useState(!1);
  return useEffect(() => {
    if (!armed) return;
    let t = setTimeout(() => setArmed(!1), 3e3);
    return () => clearTimeout(t);
  }, [armed]), /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "jt-del" + (armed ? " armed" : ""),
      onClick: (e) => {
        e.stopPropagation(), armed ? onConfirm() : setArmed(!0);
      },
      children: [
        /* @__PURE__ */ jsx(Trash2, { size: 15 }),
        armed ? "한 번 더 누르면 삭제돼요" : label
      ]
    }
  );
}
var EMOJIS = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function reactionsOf(x) {
  let r = {};
  return Object.entries(x.reactions || {}).forEach(([e, a]) => r[e] = [...a]), r;
}
function toggleReaction(x, emoji, me) {
  let cur = reactionsOf(x), had = (cur[emoji] || []).includes(me), r = {};
  return Object.entries(cur).forEach(([e, a]) => {
    let left = a.filter((n) => n !== me);
    left.length && (r[e] = left);
  }), had || (r[emoji] = [...r[emoji] || [], me]), { ...x, reactions: r };
}
function HoldButton({ className, onTap, names = [], title, members = [], children, ...rest }) {
  let [open, setOpen] = useState(!1), [place, setPlace] = useState("up left"), wrap = useRef(null), timer2 = useRef(null), longed = useRef(!1);
  useEffect(() => {
    if (!open) return;
    let h = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(!1);
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [open]), useEffect(() => () => clearTimeout(timer2.current), []);
  let show = () => {
    if (wrap.current) {
      let b = wrap.current.getBoundingClientRect();
      setPlace((b.top < 200 ? "down" : "up") + " " + (b.left > window.innerWidth - 210 ? "right" : "left"));
    }
    setOpen(!0), navigator.vibrate && navigator.vibrate(15);
  }, start = () => {
    longed.current = !1, clearTimeout(timer2.current), timer2.current = setTimeout(() => {
      longed.current = !0, show();
    }, 450);
  }, cancel = () => clearTimeout(timer2.current);
  return /* @__PURE__ */ jsxs("span", { className: "jt-hold", ref: wrap, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: className + " jt-holdbtn",
        ...rest,
        title: names.length ? names.join(", ") : void 0,
        onPointerDown: start,
        onPointerUp: cancel,
        onPointerLeave: cancel,
        onPointerCancel: cancel,
        onContextMenu: (e) => {
          e.preventDefault(), cancel(), longed.current = !0, show();
        },
        onClick: (e) => {
          if (e.stopPropagation(), longed.current) {
            longed.current = !1;
            return;
          }
          onTap(e);
        },
        children
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "jt-whopop " + place, role: "dialog", "aria-label": title, children: [
      /* @__PURE__ */ jsxs("strong", { children: [
        title,
        " ",
        names.length,
        "명"
      ] }),
      names.length ? /* @__PURE__ */ jsx("ul", { children: names.map((n) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx(Avatar, { name: n, members: members.length ? members : names, size: 22 }),
        n
      ] }, n)) }) : /* @__PURE__ */ jsx("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Reactions({ item, me, onReact, members = [] }) {
  let [open, setOpen] = useState(!1), [place, setPlace] = useState("up right"), wrap = useRef(null), r = reactionsOf(item), toggle = () => {
    if (!open && wrap.current) {
      let b = wrap.current.getBoundingClientRect(), side = wrap.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", vert = b.top < 190 ? "down" : "up";
      setPlace(vert + " " + side);
    }
    setOpen(!open);
  }, shown = EMOJIS.filter(([e]) => (r[e] || []).length), mine = Object.keys(r).find((e) => r[e].includes(me));
  useEffect(() => {
    if (!open) return;
    let h = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(!1);
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [open]);
  let pick = (e) => {
    onReact(e), setOpen(!1);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "jt-react",
      ref: wrap,
      onClick: (e) => e.stopPropagation(),
      onKeyDown: (e) => e.stopPropagation(),
      children: [
        shown.map(([e, label]) => /* @__PURE__ */ jsxs(
          HoldButton,
          {
            className: "jt-rchip" + (mine === e ? " on" : ""),
            onTap: () => pick(e),
            names: r[e],
            members,
            title: `${e} ${label}`,
            "aria-pressed": mine === e,
            "aria-label": `${label} ${r[e].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "jt-emoji", children: e }),
              r[e].length
            ]
          },
          e
        )),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (open ? " open" : ""),
            onClick: toggle,
            "aria-expanded": open,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ jsx(SmilePlus, { size: 16 })
          }
        ),
        open && /* @__PURE__ */ jsxs("div", { className: "jt-rpop " + place, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ jsx("div", { className: "jt-rpop-row", children: EMOJIS.map(([e, label]) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (mine === e ? " on" : ""),
              onClick: () => pick(e),
              "aria-label": label,
              title: label,
              children: e
            },
            e
          )) }),
          shown.length > 0 && /* @__PURE__ */ jsx("ul", { className: "jt-rwho", children: shown.map(([e]) => /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "jt-emoji", children: e }),
            r[e].join(", ")
          ] }, e)) })
        ] })
      ]
    }
  );
}
function useHere() {
  let [pos, setPos] = useState(null), [err, setErr] = useState("");
  return useEffect(() => {
    if (!navigator.geolocation) {
      setErr("fail");
      return;
    }
    let alive = !0, get = () => navigator.geolocation.getCurrentPosition(
      (p) => {
        alive && (setPos({ lat: p.coords.latitude, lng: p.coords.longitude }), setErr(""));
      },
      (e) => alive && setErr(e && e.code === 1 ? "denied" : "fail"),
      { enableHighAccuracy: !1, timeout: 15e3, maximumAge: 6e4 }
    );
    get();
    let t = setInterval(() => document.visibilityState === "visible" && get(), 6e4);
    return () => {
      alive = !1, clearInterval(t);
    };
  }, []), [pos, err];
}
var distShort = (m) => m < 1e3 ? `${Math.round(m / 10) * 10}m` : m < 1e4 ? `${(m / 1e3).toFixed(1)}km` : `${Math.round(m / 1e3)}km`, distTone = (m) => m < 1e3 ? "near" : m < 5e3 ? "mid" : "far", normName = (t) => String(t || "").toLowerCase().replace(/[\s·・,.\-()（）'"!?&/]/g, "").replace(/(본점|지점|점|店)$/, "");
function nameScore(a, b) {
  if (a = normName(a), b = normName(b), !a || !b) return 0;
  if (a.includes(b) || b.includes(a)) return 1;
  let grams = (t) => {
    let m = /* @__PURE__ */ new Map();
    for (let i = 0; i < t.length - 1; i++) m.set(t.slice(i, i + 2), (m.get(t.slice(i, i + 2)) || 0) + 1);
    return m;
  }, A = grams(a), B = grams(b), inter = 0;
  A.forEach((v, k) => B.has(k) && (inter += Math.min(v, B.get(k))));
  let tot = a.length - 1 + (b.length - 1);
  return tot > 0 ? 2 * inter / tot : 0;
}
var inJapan = (r) => r.lat > 24 && r.lat < 46 && r.lng > 122 && r.lng < 154, isSearchLink = (u) => /^https?:\/\/(share\.google|g\.co\/kgs|(www\.)?google\.[a-z.]+\/search)/i.test(String(u || ""));
async function findPlaceFor(w, gkey, gap) {
  let queries = [[w.name, w.area].filter(Boolean).join(" "), w.name].filter((q, i, a) => q && a.indexOf(q) === i), best = { status: "none" }, engine = "", gErr = "";
  for (let qi = 0; qi < queries.length; qi++) {
    qi && await new Promise((ok) => setTimeout(ok, gap));
    let d;
    try {
      d = await placeSearchDetailed(queries[qi], gkey);
    } catch {
      best = best.status === "none" ? { status: "error" } : best;
      continue;
    }
    if (engine = d.engine, d.gErr && (gErr = d.gErr), !d.list.length) continue;
    let cands = d.list.filter(inJapan).map((r) => ({ r, score: Math.max(nameScore(w.name, r.name), nameScore(w.name, `${r.name} ${r.area}`)) })).filter((c) => c.score >= 0.5).sort((a2, b2) => b2.score - a2.score);
    if (!cands.length) {
      best = { status: "diff" };
      continue;
    }
    let [a, b] = cands;
    if (!w.area && b && b.score >= a.score - 0.1 && distM(a.r, b.r) > 1500) {
      best = { status: "multi" };
      continue;
    }
    return { status: "ok", r: a.r, engine, gErr };
  }
  return { ...best, engine, gErr };
}
var G_REASON = (e) => /auth/i.test(e) ? "구글이 API 키를 거부했어요. 구글 클라우드에서 키의 웹사이트 제한(https://jhp0204.github.io/*)을 확인해 주세요." : /load/i.test(e) ? "구글 지도 기능을 불러오지 못했어요. 회사 등 네트워크에서 차단됐을 수 있어요. 휴대폰 데이터로 다시 해 보세요." : /PERMISSION|not authorized|API_KEY|forbidden|denied|403/i.test(e) ? "Places API (New)가 꺼져 있거나 키에 허용되지 않았어요. 구글 클라우드에서 API 사용 설정과 키의 API 제한을 확인해 주세요." : /RESOURCE_EXHAUSTED|quota|429/i.test(e) ? "오늘 구글 장소 검색 한도에 도달했어요. 내일 다시 해 보세요." : `구글 장소 검색이 실패했어요 (${e.slice(0, 80)})`, GEO_REASON = {
  none: "검색 결과가 없어요",
  diff: "이름이 확실히 맞는 곳이 없어요",
  multi: "지점이 여러 곳이에요. 동네를 적으면 찾을 수 있어요",
  error: "검색을 못 했어요 (인터넷 연결 확인)"
};
