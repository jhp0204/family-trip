// src/main.jsx
import { useState as Mt, useEffect as hi } from "react";
import { createRoot as xi } from "react-dom/client";

// src/app.jsx
import Dn, { useState as w, useEffect as W, useMemo as qt, useCallback as Pn, useRef as q } from "react";
import {
  Plus as Rn,
  X as te,
  Heart as Be,
  Trash2 as $n,
  MapPin as Nt,
  Settings as _n,
  CalendarDays as Ln,
  Wallet as Bn,
  Check as La,
  ExternalLink as Et,
  Map as Tn,
  MessageSquare as On,
  Image as Un,
  Link2 as Kn,
  Send as Ba,
  Pencil as Te,
  ChevronLeft as Wn,
  ChevronRight as Hn,
  ChevronDown as Xt,
  ChevronUp as Ta,
  Users as Yn,
  Crosshair as Jn,
  HelpCircle as qn,
  MessagesSquare as Gn,
  Utensils as Xn,
  TrainFront as Vn,
  BedDouble as Zn,
  Ticket as Qn,
  ShoppingBag as to,
  MoreHorizontal as eo,
  Sun as ao,
  CloudSun as no,
  Cloud as ya,
  CloudFog as oo,
  CloudDrizzle as io,
  CloudRain as ro,
  CloudSnow as so,
  CloudLightning as lo,
  Umbrella as po,
  SmilePlus as co,
  LocateFixed as mo,
  Star as uo,
  Navigation as Ct
} from "lucide-react";

// src/store.js
import { initializeApp as kn } from "firebase/app";
import {
  initializeFirestore as ca,
  persistentLocalCache as Nn,
  persistentMultipleTabManager as Cn,
  collection as zn,
  doc as we,
  onSnapshot as En,
  setDoc as ua,
  getDoc as Mn,
  deleteDoc as An
} from "firebase/firestore";
var Kt = "fjt:", gt = { config: null, code: null }, ze = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), Sn = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function Ee(t) {
  try {
    let a = String(t || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, i = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!i) return null;
    let l = Sn(i);
    return l && l.c && l.t ? l : null;
  } catch {
    return null;
  }
}
function ga() {
  let t = Ee(location.hash);
  if (t)
    return localStorage.setItem(Kt + "conn", JSON.stringify(t)), t;
  try {
    let a = JSON.parse(localStorage.getItem(Kt + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + ze(a)), a;
  } catch {
  }
  return null;
}
function fa(t, a) {
  let n = { c: t, t: a };
  return localStorage.setItem(Kt + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + ze(n)), n;
}
var ba = () => location.origin + location.pathname + "#j=" + ze({ c: gt.config, t: gt.code });
function ha() {
  localStorage.removeItem(Kt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var xa = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => t[n % t.length]).join("");
};
function ja(t) {
  let a = String(t || "");
  try {
    let i = JSON.parse(a);
    if (i.apiKey && i.projectId && i.appId) return i;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((i) => {
    let l = a.match(new RegExp(i + `\\s*[:=]\\s*["']([^"']+)["']`));
    l && (n[i] = l[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var At = null, ut = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Set(), Ne = Promise.resolve(), je = null, da = null, In = () => {
  clearTimeout(da), da = setTimeout(() => ke.forEach((t) => t()), 250);
}, Ce = (t) => t.startsWith("trip:photo:"), ve = (t) => Ce(t) ? we(At, "trips", gt.code, "photos", t.slice(11)) : we(At, "trips", gt.code, "data", t), ye = (t) => Kt + gt.code + ":" + t, ma = (t) => Promise.race([t.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function Me(t, a) {
  je && je(), ut.clear(), gt.config = t, gt.code = a;
  let n = kn(t, "fjt-" + Date.now());
  try {
    At = ca(n, { localCache: Nn({ tabManager: Cn() }) });
  } catch {
    At = ca(n, {});
  }
  let i;
  Ne = new Promise((x) => i = x), setTimeout(() => i(), 6e3);
  let l = !0;
  je = En(
    zn(At, "trips", a, "data"),
    (x) => {
      x.docChanges().forEach((b) => {
        b.type === "removed" ? ut.delete(b.doc.id) : ut.set(b.doc.id, b.doc.data().v);
      }), i(), l || In(), l = !1;
    },
    () => i()
  ), window.storage = Fn;
}
async function va() {
  let t = we(At, "trips", gt.code, "data", "_ping");
  await Promise.race([
    ua(t, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var Fn = {
  async get(t, a) {
    if (!a) {
      let n = localStorage.getItem(ye(t));
      if (n == null) throw new Error("not found");
      return { key: t, value: n, shared: !1 };
    }
    if (Ce(t)) {
      let n = await Mn(ve(t));
      if (!n.exists()) throw new Error("not found");
      return { key: t, value: n.data().v, shared: !0 };
    }
    if (await Ne, !ut.has(t)) throw new Error("not found");
    return { key: t, value: ut.get(t), shared: !0 };
  },
  async set(t, a, n) {
    return n ? (Ce(t) || ut.set(t, a), await ma(ua(ve(t), { v: a, t: Date.now() })), { key: t, value: a, shared: !0 }) : (localStorage.setItem(ye(t), a), { key: t, value: a, shared: !1 });
  },
  async delete(t, a) {
    return a ? (ut.delete(t), await ma(An(ve(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(ye(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", a) {
    return a ? (await Ne, { keys: [...ut.keys()].filter((n) => n.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return ke.add(t), () => ke.delete(t);
  }
};

// src/app.jsx
import { Fragment as rt, jsx as e, jsxs as o } from "react/jsx-runtime";
var H = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, Oe = (t) => "trip:photo:" + t, V = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], go = ["일", "월", "화", "수", "목", "금", "토"], Ue = ["맛집", "관광", "쇼핑", "기타"], Oa = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Pt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Wt = 6, wa = {
  식비: { Icon: Xn, color: "#D9262E" },
  교통: { Icon: Vn, color: "#0C86AE" },
  숙소: { Icon: Zn, color: "#7B5FC4" },
  체험: { Icon: Qn, color: "#E8800A" },
  쇼핑: { Icon: to, color: "#0A9B6E" },
  기타: { Icon: eo, color: "#66718A" }
}, Pe = (t) => wa[t] || wa.기타, pt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), dt = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), yt = (t) => {
  let [a, n, i] = t.split("-").map(Number);
  return new Date(a, n - 1, i);
}, mt = (t, a) => {
  let n = yt(t);
  return n.setDate(n.getDate() + a), n;
}, Vt = (t) => `${t.getMonth() + 1}/${t.getDate()}`, Rt = (t) => go[t.getDay()], X = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Zt = (t, a) => "₩" + (Math.round(t * a / 100 / 10) * 10).toLocaleString("ko-KR"), ot = (t) => String(t).padStart(2, "0"), Re = (t) => {
  let a = (Date.now() - t) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(t);
  return `${n.getMonth() + 1}/${n.getDate()} ${ot(n.getHours())}:${ot(n.getMinutes())}`;
}, ka = (t) => {
  let a = (t || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, fo = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, kt = (t) => {
  let [a, n] = String(t).split(":").map(Number);
  return a * 60 + (n || 0);
}, It = (t) => `${ot(Math.floor(t / 60) % 24)}:${ot(t % 60)}`, Qt = (t) => {
  let a = kt(t.time), n = t.end ? kt(t.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, Ua = (t) => {
  let a = Math.floor(t / 60), n = t % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function bo(t) {
  let a = t || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${ot(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let i = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${ot(Number(n[2]))}:${ot(i)}`;
}
var ho = Array.from({ length: 24 }, (t, a) => ot(a));
function Na({ value: t, onChange: a, disabled: n, label: i }) {
  let [l, x] = t ? t.split(":") : ["", ""], b = Array.from({ length: 12 }, (m, g) => ot(g * 5));
  return x && !b.includes(x) && (b = [...b, x].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 시",
        value: l,
        disabled: n,
        onChange: (m) => a(m.target.value ? `${m.target.value}:${x || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          ho.map((m) => /* @__PURE__ */ e("option", { value: m, children: m }, m))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 분",
        value: x,
        disabled: n || !l,
        onChange: (m) => a(`${l}:${m.target.value}`),
        children: [
          !l && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          b.map((m) => /* @__PURE__ */ e("option", { value: m, children: m }, m))
        ]
      }
    )
  ] });
}
var xo = (t) => {
  let a = t.filter((i) => i.time).map((i) => ({ id: i.id, ...Qt(i) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (i) => a.forEach((l) => {
      i.id !== l.id && i.s < l.e && l.s < i.e && n.add(i.id);
    })
  ), n;
}, me = (t) => xt(t) ? `${t.lat},${t.lng}` : t.place ? We(t.place) : "", jo = (t, a) => {
  let n = t ? me(t) : "", i = me(a);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (n ? "&origin=" + encodeURIComponent(n) : "");
}, Ke = (t) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(xt(t) ? `${t.lat},${t.lng}` : We(t.name || t.title, t.area || t.place)) + (t.placeId ? "&destination_place_id=" + encodeURIComponent(t.placeId) : ""), We = (...t) => [...t, "일본"].filter(Boolean).join(" "), xt = (t) => typeof t.lat == "number" && typeof t.lng == "number", Ka = (t) => xt(t) ? `${t.lat},${t.lng}` : We(t.name || t.title, t.area || t.place), $t = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Ka(t)), vo = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Ka(t)), bt = 256, Ae = (t, a, n) => {
  let i = bt * 2 ** n, l = t * Math.PI / 180;
  return {
    x: (a + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(l) + 1 / Math.cos(l)) / Math.PI) / 2 * i
  };
}, Ca = (t, a, n) => {
  let i = bt * 2 ** n, l = Math.PI - 2 * Math.PI * a / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(l)), lng: t / i * 360 - 180 };
}, Ht = (t) => Math.max(3, Math.min(18, t));
async function Se(t) {
  let a = await window.storage.list(t, !0), n = (a && a.keys || []).map((l) => typeof l == "string" ? l : l.key).filter(Boolean), i = await Promise.all(n.map((l) => ct(l, null)));
  return n.map((l, x) => [l, i[x]]).filter(([, l]) => l);
}
async function ct(t, a) {
  try {
    let n = await window.storage.get(t, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function ft(t, a) {
  try {
    return !!await window.storage.set(t, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var ht = /* @__PURE__ */ new Map(), pe = /* @__PURE__ */ new Map();
function yo(t) {
  if (ht.has(t)) return Promise.resolve(ht.get(t));
  if (pe.has(t)) return pe.get(t);
  let a = ct(Oe(t), null).then((n) => (pe.delete(t), n && ht.set(t, n), n));
  return pe.set(t, a), a;
}
async function za(t) {
  ht.delete(t);
  try {
    await window.storage.delete(Oe(t), !0);
  } catch {
  }
}
var wo = (t) => new Promise((a, n) => {
  let i = URL.createObjectURL(t), l = new Image();
  l.onload = () => {
    URL.revokeObjectURL(i), a(l);
  }, l.onerror = () => {
    URL.revokeObjectURL(i), n(new Error("bad image"));
  }, l.src = i;
});
async function ko(t) {
  let a = await wo(t), n = 1280, i = 0.7, l = "";
  for (let x = 0; x < 5; x++) {
    let b = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), m = document.createElement("canvas");
    m.width = Math.max(1, Math.round(a.naturalWidth * b)), m.height = Math.max(1, Math.round(a.naturalHeight * b));
    let g = m.getContext("2d");
    if (g.fillStyle = "#fff", g.fillRect(0, 0, m.width, m.height), g.drawImage(a, 0, 0, m.width, m.height), l = m.toDataURL("image/jpeg", i), l.length < 6e5) break;
    n = Math.round(n * 0.8), i = Math.max(0.4, i - 0.08);
  }
  return l;
}
var No = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: dt(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function Co() {
  for (let [t, a] of No)
    try {
      let n = await fetch(t);
      if (!n.ok) continue;
      let i = a(await n.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var Ea = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), ue = (t) => t.fx ? `100엔 = ₩${Ea(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${Ea(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Ma(t, a) {
  let n = () => Object.fromEntries(a.map((p) => [p, 0])), i = n(), l = n(), x = [];
  t.forEach((p) => {
    let C = Number(p.amount) || 0, j = (p.split || []).filter((c) => a.includes(c));
    if (!(C <= 0)) {
      if (!j.length || !a.includes(p.payer)) {
        x.push(p);
        return;
      }
      i[p.payer] += C, j.forEach((c) => l[c] += C / j.length);
    }
  });
  let b = Object.fromEntries(a.map((p) => [p, i[p] - l[p]])), m = a.filter((p) => b[p] > 0.5).map((p) => ({ m: p, v: b[p] })).sort((p, C) => C.v - p.v), g = a.filter((p) => b[p] < -0.5).map((p) => ({ m: p, v: -b[p] })).sort((p, C) => C.v - p.v), h = [], v = 0, z = 0;
  for (; v < g.length && z < m.length; ) {
    let p = Math.min(g[v].v, m[z].v);
    p >= 1 && h.push({ from: g[v].m, to: m[z].m, v: Math.round(p) }), g[v].v -= p, m[z].v -= p, g[v].v < 0.5 && v++, m[z].v < 0.5 && z++;
  }
  return { paid: i, share: l, net: b, moves: h, skipped: x };
}
function st({ name: t, members: a, size: n = 28 }) {
  let i = Math.max(0, a.indexOf(t));
  return /* @__PURE__ */ e(
    "span",
    {
      className: "jt-avatar",
      style: { width: n, height: n, background: V[(i * 2 + 3) % V.length], fontSize: n * 0.46 },
      "aria-hidden": "true",
      children: t ? t[0] : "?"
    }
  );
}
function nt({ label: t, children: a }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    a
  ] });
}
function wt({ title: t, onClose: a, children: n }) {
  return W(() => {
    let i = (l) => l.key === "Escape" && a();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ e(te, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function jt({ onConfirm: t, label: a = "삭제" }) {
  let [n, i] = w(!1);
  return W(() => {
    if (!n) return;
    let l = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(l);
  }, [n]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (l) => {
        l.stopPropagation(), n ? t() : i(!0);
      },
      children: [
        /* @__PURE__ */ e($n, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
function zo({ id: t, data: a, className: n, onClick: i, alt: l = "사진" }) {
  let [x, b] = w(a || ht.get(t) || null), [m, g] = w(!1);
  W(() => {
    if (a) {
      b(a);
      return;
    }
    if (ht.has(t)) {
      b(ht.get(t));
      return;
    }
    let v = !0;
    return g(!1), yo(t).then((z) => {
      v && (z ? b(z) : g(!0));
    }), () => {
      v = !1;
    };
  }, [t, a]);
  let h = x ? /* @__PURE__ */ e("img", { src: x, alt: l, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: m ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return i ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (n || ""), onClick: i, "aria-label": "사진 크게 보기", children: h }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (n || ""), children: h });
}
var Aa = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Wa(t) {
  let a = {};
  if (Object.entries(t.reactions || {}).forEach(([n, i]) => a[n] = [...i]), t.boardLikes && (t.likes || []).length) {
    let n = new Set(Object.values(a).flat()), i = t.likes.filter((l) => !n.has(l));
    i.length && (a["❤️"] = [...a["❤️"] || [], ...i]);
  }
  return a;
}
function Eo(t, a, n, i) {
  let l = Wa({ ...t, boardLikes: i }), x = (l[a] || []).includes(n), b = {};
  Object.entries(l).forEach(([g, h]) => {
    let v = h.filter((z) => z !== n);
    v.length && (b[g] = v);
  }), x || (b[a] = [...b[a] || [], n]);
  let m = { ...t, reactions: b };
  return i && (m.likes = []), m;
}
function He({ item: t, me: a, onReact: n, boardLikes: i = !1 }) {
  let [l, x] = w(!1), [b, m] = w("up right"), g = q(null), h = Wa({ ...t, boardLikes: i }), v = () => {
    if (!l && g.current) {
      let j = g.current.getBoundingClientRect(), u = g.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", M = j.top < 190 ? "down" : "up";
      m(M + " " + u);
    }
    x(!l);
  }, z = Aa.filter(([j]) => (h[j] || []).length), p = Object.keys(h).find((j) => h[j].includes(a));
  W(() => {
    if (!l) return;
    let j = (c) => g.current && !g.current.contains(c.target) && x(!1);
    return document.addEventListener("pointerdown", j), () => document.removeEventListener("pointerdown", j);
  }, [l]);
  let C = (j) => {
    n(j), x(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: g,
      onClick: (j) => j.stopPropagation(),
      onKeyDown: (j) => j.stopPropagation(),
      children: [
        z.map(([j, c]) => /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (p === j ? " on" : ""),
            onClick: () => C(j),
            "aria-pressed": p === j,
            "aria-label": `${c} ${h[j].length}명: ${h[j].join(", ")}`,
            title: h[j].join(", "),
            children: [
              /* @__PURE__ */ e("span", { className: "jt-emoji", children: j }),
              h[j].length
            ]
          },
          j
        )),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (l ? " open" : ""),
            onClick: v,
            "aria-expanded": l,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(co, { size: 16 })
          }
        ),
        l && /* @__PURE__ */ o("div", { className: "jt-rpop " + b, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: Aa.map(([j, c]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (p === j ? " on" : ""),
              onClick: () => C(j),
              "aria-label": c,
              title: c,
              children: j
            },
            j
          )) }),
          z.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: z.map(([j]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: j }),
            h[j].join(", ")
          ] }, j)) })
        ] })
      ]
    }
  );
}
function Gt(t, a) {
  let n = (a || []).find((i) => i.wishId === t.id) || (a || []).find((i) => !i.wishId && i.title === t.name);
  return n ? n.day : null;
}
function Ha() {
  let [t, a] = w({});
  return [t, (l) => a((x) => ({ ...x, [l]: !x[l] })), (l, x) => a(x ? Object.fromEntries(l.map((b) => [b, !0])) : {})];
}
function Ya({ ids: t, open: a, setAll: n }) {
  if (t.length < 2) return null;
  let i = t.every((l) => a[l]);
  return /* @__PURE__ */ e("div", { className: "jt-foldall", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-ghost sm", onClick: () => n(t, !i), children: [
    i ? /* @__PURE__ */ e(Ta, { size: 15 }) : /* @__PURE__ */ e(Xt, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function Ja({ count: t, open: a, onClick: n }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (a ? " open" : ""),
      onClick: (i) => {
        i.stopPropagation(), n();
      },
      "aria-expanded": a,
      children: [
        /* @__PURE__ */ e(On, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Ye({ comments: t = [], me: a, members: n, onAdd: i, onDelete: l }) {
  let [x, b] = w(""), m = () => {
    let g = x.trim();
    g && (i(g), b(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (g) => g.stopPropagation(), onKeyDown: (g) => g.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((g) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(st, { name: g.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("strong", { children: g.by }),
          /* @__PURE__ */ e("span", { children: Re(g.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: g.text })
      ] }),
      g.by === a && /* @__PURE__ */ e(jt, { onConfirm: () => l(g.id), label: "" })
    ] }, g.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: x,
          onChange: (g) => b(g.target.value),
          onKeyDown: (g) => g.key === "Enter" && !g.nativeEvent.isComposing && m(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: m, disabled: !x.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(Ba, { size: 18 }) })
    ] })
  ] });
}
function Mo({ url: t, onRemove: a }) {
  let n = /* @__PURE__ */ o(rt, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(Kn, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: fo(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return a ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(te, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ e(Et, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function Ao({ initial: t, onSave: a, onCancel: n }) {
  let [i, l] = w(t?.title || "가족 일본여행"), [x, b] = w(t?.start || dt(new Date(Date.now() + 30 * 864e5))), [m, g] = w(t?.days || 4), [h, v] = w(t?.members || []), [z, p] = w(t?.rate || 900), [C, j] = w(t?.gmapsKey || ""), [c, u] = w(""), M = () => {
    let y = c.trim();
    !y || h.includes(y) || (v([...h, y]), u(""));
  }, N = i.trim() && x && h.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    n && /* @__PURE__ */ e(qa, { onBack: n }),
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(nt, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: i, onChange: (y) => l(y.target.value) }) }),
      /* @__PURE__ */ e(nt, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: x, onChange: (y) => b(y.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => g(Math.max(1, m - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            m,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => g(Math.min(30, m + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: h.map((y) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(st, { name: y, members: h, size: 20 }),
          y,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => v(h.filter((d) => d !== y)), "aria-label": `${y} 빼기`, children: /* @__PURE__ */ e(te, { size: 14 }) })
        ] }, y)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: c,
              onChange: (y) => u(y.target.value),
              onKeyDown: (y) => y.key === "Enter" && M(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: M, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(nt, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: z, onChange: (y) => p(Number(y.target.value) || 0) }) }),
      /* @__PURE__ */ e(nt, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ e(
        "input",
        {
          value: C,
          onChange: (y) => j(y.target.value.trim()),
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
          disabled: !N,
          onClick: () => a({ title: i.trim(), start: x, days: m, members: h, rate: z || 900, gmapsKey: C }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(So, {})
    ] })
  ] });
}
function So() {
  let [t, a] = w(""), n = ba();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ e("strong", { children: "가족 초대" }),
    /* @__PURE__ */ e("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: n });
          return;
        } catch (l) {
          if (l && l.name === "AbortError") return;
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && ha();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function qa({ onBack: t, label: a = "돌아가기" }) {
  return /* @__PURE__ */ e("div", { className: "jt-backbar", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-back", onClick: t, "aria-label": a, children: [
    /* @__PURE__ */ e(Wn, { size: 22 }),
    a
  ] }) });
}
function Io({ members: t, onPick: a, current: n, onBack: i }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ e(qa, { onBack: i }),
    /* @__PURE__ */ e("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((l) => /* @__PURE__ */ o("button", { className: "jt-who-btn" + (l === n ? " on" : ""), onClick: () => a(l), children: [
      /* @__PURE__ */ e(st, { name: l, members: t, size: 40 }),
      /* @__PURE__ */ e("span", { className: "jt-who-name", children: l }),
      l === n && /* @__PURE__ */ e("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, l)) })
  ] });
}
function Fo({ initial: t, preset: a, gkey: n, dayItems: i = [], onSave: l, onDelete: x }) {
  let [b, m] = w(t?.time || a?.time || ""), [g, h] = w(t?.end || a?.end || ""), [v, z] = w(t?.link || ""), [p, C] = w(t && xt(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [j, c] = w([]), [u, M] = w(!1), [N, y] = w(""), [d, S] = w(t?.title || ""), [k, E] = w(t?.place || ""), [s, P] = w(t?.memo || ""), [A, r] = w(!1), L = ($) => {
    if (S($), !b || A) {
      let F = bo($);
      F ? (m(F), r(!0)) : A && (m(""), r(!1));
    }
  }, B = async () => {
    let $ = (k || d).trim();
    if (!$) {
      y("장소 이름을 먼저 적어 주세요.");
      return;
    }
    M(!0), y(""), c([]);
    try {
      let F = await Zo($, n);
      c(F), F.length || y("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      y("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    M(!1);
  }, Y = b && g && kt(g) <= kt(b), K = b ? i.filter(($) => {
    if (!$.time) return !1;
    let F = Qt({ time: b, end: Y ? "" : g }), J = Qt($);
    return F.s < J.e && J.s < F.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(nt, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: d, onChange: ($) => L($.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    A && b && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      b,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          Na,
          {
            label: "시작",
            value: b,
            onChange: ($) => {
              m($), r(!1), $ || h("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(Na, { label: "끝", value: g, onChange: h, disabled: !b })
      ] })
    ] }),
    b && !g && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    Y && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    b && g && !Y && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      Ua(kt(g) - kt(b)),
      " 동안"
    ] }),
    K.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      K.map(($) => `'${$.title}'(${$.time}${$.end ? `~${$.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: k,
            onChange: ($) => E($.target.value),
            onKeyDown: ($) => $.key === "Enter" && !$.nativeEvent.isComposing && B(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: B, disabled: u, children: u ? "찾는 중" : "검색" })
      ] })
    ] }),
    N && /* @__PURE__ */ e("p", { className: "jt-hint", children: N }),
    j.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: j.map(($, F) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          E($.name), C({ lat: $.lat, lng: $.lng, placeId: $.placeId }), $.link && z($.link), c([]), y("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: $.name }),
          /* @__PURE__ */ e("span", { children: $.area })
        ]
      }
    ) }, F)) }),
    p && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(Nt, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: $t({ title: d, place: k, link: v, ...p }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Et, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => C(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ e(nt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e("input", { type: "url", value: v, onChange: ($) => z($.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ e(nt, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: s, onChange: ($) => P($.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !d.trim() || Y,
        onClick: () => l({
          time: b,
          end: b ? g : "",
          title: d.trim(),
          place: k.trim(),
          memo: s.trim(),
          link: v.trim(),
          lat: p ? p.lat : void 0,
          lng: p ? p.lng : void 0,
          placeId: p && p.placeId ? p.placeId : void 0
        }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(jt, { onConfirm: x, label: "이 일정 삭제" })
  ] });
}
function Do({ initial: t, onSave: a, onDelete: n }) {
  let [i, l] = w(t?.name || ""), [x, b] = w(t?.cat || "맛집"), [m, g] = w(t?.area || ""), [h, v] = w(t?.link || ""), [z, p] = w(t?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(nt, { label: "이름", children: /* @__PURE__ */ e("input", { value: i, onChange: (C) => l(C.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Ue.map((C) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (x === C ? " on" : ""), onClick: () => b(C), children: C }, C)) })
    ] }),
    /* @__PURE__ */ e(nt, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: m, onChange: (C) => g(C.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(nt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: h,
        onChange: (C) => v(C.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(nt, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: z, onChange: (C) => p(C.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim(),
        onClick: () => a({ name: i.trim(), cat: x, area: m.trim(), link: h.trim(), memo: z.trim() }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(jt, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function Po({ settings: t, me: a, defaultDay: n, initial: i, onSave: l, onDelete: x }) {
  let { members: b, days: m, start: g, rate: h } = t, [v, z] = w(i?.title || ""), [p, C] = w(i ? String(Number(i.amount) || "") : ""), [j, c] = w(i && b.includes(i.payer) ? i.payer : a), [u, M] = w(i?.cat || "식비"), [N, y] = w(i ? Math.min(i.day, m - 1) : n), [d, S] = w(i ? (i.split || []).filter((A) => b.includes(A)) : b), k = Number(p) || 0, E = i ? [i.payer, ...i.split || []].filter((A, r, L) => A && !b.includes(A) && L.indexOf(A) === r) : [], s = (A) => S(d.includes(A) ? d.filter((r) => r !== A) : [...d, A]), P = v.trim() && k > 0 && d.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(nt, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: v, onChange: (A) => z(A.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(nt, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: p, onChange: (A) => C(A.target.value), placeholder: "0" }) }),
    k > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: Zt(k, h) }),
      /* @__PURE__ */ e("br", {}),
      ue(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: ue(t) }),
    E.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      E.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: b.map((A) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (j === A ? " on" : ""), onClick: () => c(A), children: A }, A)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: b.map((A) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (d.includes(A) ? " on" : ""), onClick: () => s(A), children: [
        d.includes(A) && /* @__PURE__ */ e(La, { size: 14 }),
        A
      ] }, A)) }),
      k > 0 && d.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        X(k / d.length)
      ] }),
      d.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
