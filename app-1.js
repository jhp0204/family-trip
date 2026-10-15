// src/main.jsx
import { useState as Mt, useEffect as sr } from "react";
import { createRoot as lr } from "react-dom/client";

// src/app.jsx
import wn, { useState as z, useEffect as W, useMemo as Jt, useCallback as kn, useRef as Y } from "react";
import {
  Plus as Nn,
  X as Vt,
  Heart as Pe,
  Trash2 as Cn,
  MapPin as Nt,
  Settings as zn,
  CalendarDays as En,
  Wallet as Mn,
  Check as Fa,
  ExternalLink as Et,
  Map as An,
  MessageSquare as Sn,
  Image as In,
  Link2 as Fn,
  Send as Da,
  Pencil as Pa,
  ChevronLeft as yr,
  ChevronRight as Dn,
  ChevronDown as Pn,
  ChevronUp as $n,
  Users as Rn,
  Crosshair as _n,
  HelpCircle as Ln,
  MessagesSquare as Tn,
  Utensils as Bn,
  TrainFront as On,
  BedDouble as Un,
  Ticket as Kn,
  ShoppingBag as Wn,
  MoreHorizontal as Hn,
  Sun as Yn,
  CloudSun as Jn,
  Cloud as fa,
  CloudFog as qn,
  CloudDrizzle as Gn,
  CloudRain as Xn,
  CloudSnow as Vn,
  CloudLightning as Zn,
  Umbrella as Qn,
  SmilePlus as to,
  LocateFixed as eo,
  Star as ao,
  Navigation as Ct
} from "lucide-react";

// src/store.js
import { initializeApp as mn } from "firebase/app";
import {
  initializeFirestore as oa,
  persistentLocalCache as un,
  persistentMultipleTabManager as gn,
  collection as fn,
  doc as he,
  onSnapshot as bn,
  setDoc as sa,
  getDoc as hn,
  deleteDoc as xn
} from "firebase/firestore";
var Ut = "fjt:", ut = { config: null, code: null }, ye = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), jn = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function we(t) {
  try {
    let a = String(t || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, r = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!r) return null;
    let s = jn(r);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function la() {
  let t = we(location.hash);
  if (t)
    return localStorage.setItem(Ut + "conn", JSON.stringify(t)), t;
  try {
    let a = JSON.parse(localStorage.getItem(Ut + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + ye(a)), a;
  } catch {
  }
  return null;
}
function ca(t, a) {
  let n = { c: t, t: a };
  return localStorage.setItem(Ut + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + ye(n)), n;
}
var pa = () => location.origin + location.pathname + "#j=" + ye({ c: ut.config, t: ut.code });
function da() {
  localStorage.removeItem(Ut + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var ma = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => t[n % t.length]).join("");
};
function ua(t) {
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
var At = null, mt = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Set(), je = Promise.resolve(), ge = null, ra = null, vn = () => {
  clearTimeout(ra), ra = setTimeout(() => xe.forEach((t) => t()), 250);
}, ve = (t) => t.startsWith("trip:photo:"), fe = (t) => ve(t) ? he(At, "trips", ut.code, "photos", t.slice(11)) : he(At, "trips", ut.code, "data", t), be = (t) => Ut + ut.code + ":" + t, ia = (t) => Promise.race([t.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function ke(t, a) {
  ge && ge(), mt.clear(), ut.config = t, ut.code = a;
  let n = mn(t, "fjt-" + Date.now());
  try {
    At = oa(n, { localCache: un({ tabManager: gn() }) });
  } catch {
    At = oa(n, {});
  }
  let r;
  je = new Promise((j) => r = j), setTimeout(() => r(), 6e3);
  let s = !0;
  ge = bn(
    fn(At, "trips", a, "data"),
    (j) => {
      j.docChanges().forEach((b) => {
        b.type === "removed" ? mt.delete(b.doc.id) : mt.set(b.doc.id, b.doc.data().v);
      }), r(), s || vn(), s = !1;
    },
    () => r()
  ), window.storage = yn;
}
async function ga() {
  let t = he(At, "trips", ut.code, "data", "_ping");
  await Promise.race([
    sa(t, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var yn = {
  async get(t, a) {
    if (!a) {
      let n = localStorage.getItem(be(t));
      if (n == null) throw new Error("not found");
      return { key: t, value: n, shared: !1 };
    }
    if (ve(t)) {
      let n = await hn(fe(t));
      if (!n.exists()) throw new Error("not found");
      return { key: t, value: n.data().v, shared: !0 };
    }
    if (await je, !mt.has(t)) throw new Error("not found");
    return { key: t, value: mt.get(t), shared: !0 };
  },
  async set(t, a, n) {
    return n ? (ve(t) || mt.set(t, a), await ia(sa(fe(t), { v: a, t: Date.now() })), { key: t, value: a, shared: !0 }) : (localStorage.setItem(be(t), a), { key: t, value: a, shared: !1 });
  },
  async delete(t, a) {
    return a ? (mt.delete(t), await ia(xn(fe(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(be(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", a) {
    return a ? (await je, { keys: [...mt.keys()].filter((n) => n.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return xe.add(t), () => xe.delete(t);
  }
};

// src/app.jsx
import { Fragment as ct, jsx as e, jsxs as o } from "react/jsx-runtime";
var H = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, $e = (t) => "trip:photo:" + t, Q = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], no = ["일", "월", "화", "수", "목", "금", "토"], Re = ["맛집", "관광", "쇼핑", "기타"], $a = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Pt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Kt = 6, ba = {
  식비: { Icon: Bn, color: "#D9262E" },
  교통: { Icon: On, color: "#0C86AE" },
  숙소: { Icon: Un, color: "#7B5FC4" },
  체험: { Icon: Kn, color: "#E8800A" },
  쇼핑: { Icon: Wn, color: "#0A9B6E" },
  기타: { Icon: Hn, color: "#66718A" }
}, Ae = (t) => ba[t] || ba.기타, st = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), pt = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), yt = (t) => {
  let [a, n, r] = t.split("-").map(Number);
  return new Date(a, n - 1, r);
}, dt = (t, a) => {
  let n = yt(t);
  return n.setDate(n.getDate() + a), n;
}, qt = (t) => `${t.getMonth() + 1}/${t.getDate()}`, $t = (t) => no[t.getDay()], q = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Gt = (t, a) => "₩" + (Math.round(t * a / 100 / 10) * 10).toLocaleString("ko-KR"), at = (t) => String(t).padStart(2, "0"), Se = (t) => {
  let a = (Date.now() - t) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(t);
  return `${n.getMonth() + 1}/${n.getDate()} ${at(n.getHours())}:${at(n.getMinutes())}`;
}, ha = (t) => {
  let a = (t || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, oo = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, kt = (t) => {
  let [a, n] = String(t).split(":").map(Number);
  return a * 60 + (n || 0);
}, It = (t) => `${at(Math.floor(t / 60) % 24)}:${at(t % 60)}`, Xt = (t) => {
  let a = kt(t.time), n = t.end ? kt(t.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, Ra = (t) => {
  let a = Math.floor(t / 60), n = t % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function ro(t) {
  let a = t || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${at(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let r = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${at(Number(n[2]))}:${at(r)}`;
}
var io = Array.from({ length: 24 }, (t, a) => at(a));
function xa({ value: t, onChange: a, disabled: n, label: r }) {
  let [s, j] = t ? t.split(":") : ["", ""], b = Array.from({ length: 12 }, (p, d) => at(d * 5));
  return j && !b.includes(j) && (b = [...b, j].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 시",
        value: s,
        disabled: n,
        onChange: (p) => a(p.target.value ? `${p.target.value}:${j || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          io.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
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
          b.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    )
  ] });
}
var so = (t) => {
  let a = t.filter((r) => r.time).map((r) => ({ id: r.id, ...Xt(r) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (r) => a.forEach((s) => {
      r.id !== s.id && r.s < s.e && s.s < r.e && n.add(r.id);
    })
  ), n;
}, se = (t) => ht(t) ? `${t.lat},${t.lng}` : t.place ? Le(t.place) : "", lo = (t, a) => {
  let n = t ? se(t) : "", r = se(a);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(r) + (n ? "&origin=" + encodeURIComponent(n) : "");
}, _e = (t) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(ht(t) ? `${t.lat},${t.lng}` : Le(t.name || t.title, t.area || t.place)) + (t.placeId ? "&destination_place_id=" + encodeURIComponent(t.placeId) : ""), Le = (...t) => [...t, "일본"].filter(Boolean).join(" "), ht = (t) => typeof t.lat == "number" && typeof t.lng == "number", _a = (t) => ht(t) ? `${t.lat},${t.lng}` : Le(t.name || t.title, t.area || t.place), Rt = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(_a(t)), co = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(_a(t)), ft = 256, Ne = (t, a, n) => {
  let r = ft * 2 ** n, s = t * Math.PI / 180;
  return {
    x: (a + 180) / 360 * r,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * r
  };
}, ja = (t, a, n) => {
  let r = ft * 2 ** n, s = Math.PI - 2 * Math.PI * a / r;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: t / r * 360 - 180 };
}, Wt = (t) => Math.max(3, Math.min(18, t));
async function Ce(t) {
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
async function gt(t, a) {
  try {
    return !!await window.storage.set(t, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var bt = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Map();
function po(t) {
  if (bt.has(t)) return Promise.resolve(bt.get(t));
  if (oe.has(t)) return oe.get(t);
  let a = lt($e(t), null).then((n) => (oe.delete(t), n && bt.set(t, n), n));
  return oe.set(t, a), a;
}
async function va(t) {
  bt.delete(t);
  try {
    await window.storage.delete($e(t), !0);
  } catch {
  }
}
var mo = (t) => new Promise((a, n) => {
  let r = URL.createObjectURL(t), s = new Image();
  s.onload = () => {
    URL.revokeObjectURL(r), a(s);
  }, s.onerror = () => {
    URL.revokeObjectURL(r), n(new Error("bad image"));
  }, s.src = r;
});
async function uo(t) {
  let a = await mo(t), n = 1280, r = 0.7, s = "";
  for (let j = 0; j < 5; j++) {
    let b = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), p = document.createElement("canvas");
    p.width = Math.max(1, Math.round(a.naturalWidth * b)), p.height = Math.max(1, Math.round(a.naturalHeight * b));
    let d = p.getContext("2d");
    if (d.fillStyle = "#fff", d.fillRect(0, 0, p.width, p.height), d.drawImage(a, 0, 0, p.width, p.height), s = p.toDataURL("image/jpeg", r), s.length < 6e5) break;
    n = Math.round(n * 0.8), r = Math.max(0.4, r - 0.08);
  }
  return s;
}
var go = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: pt(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function fo() {
  for (let [t, a] of go)
    try {
      let n = await fetch(t);
      if (!n.ok) continue;
      let r = a(await n.json());
      if (r.rate > 0) return r;
    } catch {
    }
  return null;
}
var ya = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), le = (t) => t.fx ? `100엔 = ₩${ya(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${ya(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function wa(t, a) {
  let n = () => Object.fromEntries(a.map((c) => [c, 0])), r = n(), s = n(), j = [];
  t.forEach((c) => {
    let A = Number(c.amount) || 0, g = (c.split || []).filter((l) => a.includes(l));
    if (!(A <= 0)) {
      if (!g.length || !a.includes(c.payer)) {
        j.push(c);
        return;
      }
      r[c.payer] += A, g.forEach((l) => s[l] += A / g.length);
    }
  });
  let b = Object.fromEntries(a.map((c) => [c, r[c] - s[c]])), p = a.filter((c) => b[c] > 0.5).map((c) => ({ m: c, v: b[c] })).sort((c, A) => A.v - c.v), d = a.filter((c) => b[c] < -0.5).map((c) => ({ m: c, v: -b[c] })).sort((c, A) => A.v - c.v), h = [], v = 0, E = 0;
  for (; v < d.length && E < p.length; ) {
    let c = Math.min(d[v].v, p[E].v);
    c >= 1 && h.push({ from: d[v].m, to: p[E].m, v: Math.round(c) }), d[v].v -= c, p[E].v -= c, d[v].v < 0.5 && v++, p[E].v < 0.5 && E++;
  }
  return { paid: r, share: s, net: b, moves: h, skipped: j };
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
function wt({ title: t, onClose: a, children: n }) {
  return W(() => {
    let r = (s) => s.key === "Escape" && a();
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
        /* @__PURE__ */ e(Cn, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
function bo({ id: t, data: a, className: n, onClick: r, alt: s = "사진" }) {
  let [j, b] = z(a || bt.get(t) || null), [p, d] = z(!1);
  W(() => {
    if (a) {
      b(a);
      return;
    }
    if (bt.has(t)) {
      b(bt.get(t));
      return;
    }
    let v = !0;
    return d(!1), po(t).then((E) => {
      v && (E ? b(E) : d(!0));
    }), () => {
      v = !1;
    };
  }, [t, a]);
  let h = j ? /* @__PURE__ */ e("img", { src: j, alt: s, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: p ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return r ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (n || ""), onClick: r, "aria-label": "사진 크게 보기", children: h }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (n || ""), children: h });
}
var ka = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function La(t) {
  let a = {};
  if (Object.entries(t.reactions || {}).forEach(([n, r]) => a[n] = [...r]), t.boardLikes && (t.likes || []).length) {
    let n = new Set(Object.values(a).flat()), r = t.likes.filter((s) => !n.has(s));
    r.length && (a["❤️"] = [...a["❤️"] || [], ...r]);
  }
  return a;
}
function ho(t, a, n, r) {
  let s = La({ ...t, boardLikes: r }), j = (s[a] || []).includes(n), b = {};
  Object.entries(s).forEach(([d, h]) => {
    let v = h.filter((E) => E !== n);
    v.length && (b[d] = v);
  }), j || (b[a] = [...b[a] || [], n]);
  let p = { ...t, reactions: b };
  return r && (p.likes = []), p;
}
function Te({ item: t, me: a, onReact: n, boardLikes: r = !1 }) {
  let [s, j] = z(!1), [b, p] = z("up right"), d = Y(null), h = La({ ...t, boardLikes: r }), v = () => {
    if (!s && d.current) {
      let g = d.current.getBoundingClientRect(), u = d.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", I = g.top < 190 ? "down" : "up";
      p(I + " " + u);
    }
    j(!s);
  }, E = ka.filter(([g]) => (h[g] || []).length), c = Object.keys(h).find((g) => h[g].includes(a));
  W(() => {
    if (!s) return;
    let g = (l) => d.current && !d.current.contains(l.target) && j(!1);
    return document.addEventListener("pointerdown", g), () => document.removeEventListener("pointerdown", g);
  }, [s]);
  let A = (g) => {
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
        E.map(([g, l]) => /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (c === g ? " on" : ""),
            onClick: () => A(g),
            "aria-pressed": c === g,
            "aria-label": `${l} ${h[g].length}명: ${h[g].join(", ")}`,
            title: h[g].join(", "),
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
            onClick: v,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(to, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ o("div", { className: "jt-rpop " + b, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: ka.map(([g, l]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (c === g ? " on" : ""),
              onClick: () => A(g),
              "aria-label": l,
              title: l,
              children: g
            },
            g
          )) }),
          E.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: E.map(([g]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: g }),
            h[g].join(", ")
          ] }, g)) })
        ] })
      ]
    }
  );
}
function Ta({ count: t, open: a, onClick: n }) {
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
        /* @__PURE__ */ e(Sn, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Be({ comments: t = [], me: a, members: n, onAdd: r, onDelete: s }) {
  let [j, b] = z(""), p = () => {
    let d = j.trim();
    d && (r(d), b(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (d) => d.stopPropagation(), onKeyDown: (d) => d.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((d) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(rt, { name: d.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("strong", { children: d.by }),
          /* @__PURE__ */ e("span", { children: Se(d.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: d.text })
      ] }),
      d.by === a && /* @__PURE__ */ e(xt, { onConfirm: () => s(d.id), label: "" })
    ] }, d.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: j,
          onChange: (d) => b(d.target.value),
          onKeyDown: (d) => d.key === "Enter" && !d.nativeEvent.isComposing && p(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: p, disabled: !j.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(Da, { size: 18 }) })
    ] })
  ] });
}
function xo({ url: t, onRemove: a }) {
  let n = /* @__PURE__ */ o(ct, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(Fn, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: oo(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return a ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(Vt, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ e(Et, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function jo({ initial: t, onSave: a, onCancel: n }) {
  let [r, s] = z(t?.title || "가족 일본여행"), [j, b] = z(t?.start || pt(new Date(Date.now() + 30 * 864e5))), [p, d] = z(t?.days || 4), [h, v] = z(t?.members || []), [E, c] = z(t?.rate || 900), [A, g] = z(t?.gmapsKey || ""), [l, u] = z(""), I = () => {
    let N = l.trim();
    !N || h.includes(N) || (v([...h, N]), u(""));
  }, m = r.trim() && j && h.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(et, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (N) => s(N.target.value) }) }),
      /* @__PURE__ */ e(et, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: j, onChange: (N) => b(N.target.value) }) }),
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
        /* @__PURE__ */ e("div", { className: "jt-chips", children: h.map((N) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(rt, { name: N, members: h, size: 20 }),
          N,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => v(h.filter((i) => i !== N)), "aria-label": `${N} 빼기`, children: /* @__PURE__ */ e(Vt, { size: 14 }) })
        ] }, N)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: l,
              onChange: (N) => u(N.target.value),
              onKeyDown: (N) => N.key === "Enter" && I(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: I, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(et, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: E, onChange: (N) => c(Number(N.target.value) || 0) }) }),
      /* @__PURE__ */ e(et, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ e(
        "input",
        {
          value: A,
          onChange: (N) => g(N.target.value.trim()),
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
          onClick: () => a({ title: r.trim(), start: j, days: p, members: h, rate: E || 900, gmapsKey: A }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(vo, {})
    ] })
  ] });
}
function vo() {
  let [t, a] = z(""), n = pa();
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && da();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function yo({ members: t, onPick: a }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((n) => /* @__PURE__ */ o("button", { className: "jt-who-btn", onClick: () => a(n), children: [
      /* @__PURE__ */ e(rt, { name: n, members: t, size: 40 }),
      n
    ] }, n)) })
  ] });
}
function wo({ initial: t, preset: a, gkey: n, dayItems: r = [], onSave: s, onDelete: j }) {
  let [b, p] = z(t?.time || a?.time || ""), [d, h] = z(t?.end || a?.end || ""), [v, E] = z(t?.link || ""), [c, A] = z(t && ht(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [g, l] = z([]), [u, I] = z(!1), [m, N] = z(""), [i, x] = z(t?.title || ""), [k, S] = z(t?.place || ""), [C, R] = z(t?.memo || ""), [w, M] = z(!1), _ = (y) => {
    if (x(y), !b || w) {
      let K = ro(y);
      K ? (p(K), M(!0)) : w && (p(""), M(!1));
    }
  }, O = async () => {
    let y = (k || i).trim();
    if (!y) {
      N("장소 이름을 먼저 적어 주세요.");
      return;
    }
    I(!0), N(""), l([]);
    try {
      let K = await Uo(y, n);
      l(K), K.length || N("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      N("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    I(!1);
  }, X = b && d && kt(d) <= kt(b), U = b ? r.filter((y) => {
    if (!y.time) return !1;
    let K = Xt({ time: b, end: X ? "" : d }), G = Xt(y);
    return K.s < G.e && G.s < K.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(et, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: i, onChange: (y) => _(y.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    w && b && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      b,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          xa,
          {
            label: "시작",
            value: b,
            onChange: (y) => {
              p(y), M(!1), y || h("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(xa, { label: "끝", value: d, onChange: h, disabled: !b })
      ] })
    ] }),
    b && !d && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    X && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    b && d && !X && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      Ra(kt(d) - kt(b)),
      " 동안"
    ] }),
    U.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      U.map((y) => `'${y.title}'(${y.time}${y.end ? `~${y.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: k,
            onChange: (y) => S(y.target.value),
            onKeyDown: (y) => y.key === "Enter" && !y.nativeEvent.isComposing && O(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: O, disabled: u, children: u ? "찾는 중" : "검색" })
      ] })
    ] }),
    m && /* @__PURE__ */ e("p", { className: "jt-hint", children: m }),
    g.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: g.map((y, K) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          S(y.name), A({ lat: y.lat, lng: y.lng, placeId: y.placeId }), y.link && E(y.link), l([]), N("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: y.name }),
          /* @__PURE__ */ e("span", { children: y.area })
        ]
      }
    ) }, K)) }),
    c && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(Nt, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: Rt({ title: i, place: k, link: v, ...c }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(Et, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => A(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ e(et, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e("input", { type: "url", value: v, onChange: (y) => E(y.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ e(et, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: C, onChange: (y) => R(y.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim() || X,
        onClick: () => s({
          time: b,
          end: b ? d : "",
          title: i.trim(),
          place: k.trim(),
          memo: C.trim(),
          link: v.trim(),
          lat: c ? c.lat : void 0,
          lng: c ? c.lng : void 0,
          placeId: c && c.placeId ? c.placeId : void 0
        }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(xt, { onConfirm: j, label: "이 일정 삭제" })
  ] });
}
function ko({ initial: t, onSave: a, onDelete: n }) {
  let [r, s] = z(t?.name || ""), [j, b] = z(t?.cat || "맛집"), [p, d] = z(t?.area || ""), [h, v] = z(t?.link || ""), [E, c] = z(t?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(et, { label: "이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (A) => s(A.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: Re.map((A) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (j === A ? " on" : ""), onClick: () => b(A), children: A }, A)) })
    ] }),
    /* @__PURE__ */ e(et, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: p, onChange: (A) => d(A.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(et, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: h,
        onChange: (A) => v(A.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(et, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: E, onChange: (A) => c(A.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !r.trim(),
        onClick: () => a({ name: r.trim(), cat: j, area: p.trim(), link: h.trim(), memo: E.trim() }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(xt, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function No({ settings: t, me: a, defaultDay: n, initial: r, onSave: s, onDelete: j }) {
  let { members: b, days: p, start: d, rate: h } = t, [v, E] = z(r?.title || ""), [c, A] = z(r ? String(Number(r.amount) || "") : ""), [g, l] = z(r && b.includes(r.payer) ? r.payer : a), [u, I] = z(r?.cat || "식비"), [m, N] = z(r ? Math.min(r.day, p - 1) : n), [i, x] = z(r ? (r.split || []).filter((w) => b.includes(w)) : b), k = Number(c) || 0, S = r ? [r.payer, ...r.split || []].filter((w, M, _) => w && !b.includes(w) && _.indexOf(w) === M) : [], C = (w) => x(i.includes(w) ? i.filter((M) => M !== w) : [...i, w]), R = v.trim() && k > 0 && i.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(et, { label: "어디에 썼나요", children: /* @__PURE__ */ e("input", { value: v, onChange: (w) => E(w.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ e(et, { label: "금액 (엔)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: c, onChange: (w) => A(w.target.value), placeholder: "0" }) }),
    k > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ e("b", { children: Gt(k, h) }),
      /* @__PURE__ */ e("br", {}),
      le(t)
    ] }) : /* @__PURE__ */ e("p", { className: "jt-hint", children: le(t) }),
    S.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      S.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: b.map((w) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (g === w ? " on" : ""), onClick: () => l(w), children: w }, w)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: b.map((w) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (i.includes(w) ? " on" : ""), onClick: () => C(w), children: [
        i.includes(w) && /* @__PURE__ */ e(Fa, { size: 14 }),
        w
      ] }, w)) }),
      k > 0 && i.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
