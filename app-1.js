// src/main.jsx
import { useState as kt, useEffect as Io } from "react";
import { createRoot as Fo } from "react-dom/client";

// src/app.jsx
import { useState as N, useEffect as H, useMemo as Bt, useCallback as qa, useRef as J } from "react";
import {
  Plus as Xa,
  X as Ht,
  Heart as Ne,
  Trash2 as Va,
  MapPin as Yt,
  Settings as Za,
  CalendarDays as Qa,
  Wallet as tn,
  Check as ma,
  ExternalLink as It,
  Map as en,
  MessageSquare as an,
  Image as nn,
  Link2 as on,
  Send as rn,
  Pencil as ua,
  ChevronLeft as Ho,
  ChevronRight as sn,
  ChevronDown as ln,
  ChevronUp as pn,
  Users as cn,
  Crosshair as dn,
  HelpCircle as mn,
  Utensils as un,
  TrainFront as gn,
  BedDouble as fn,
  Ticket as hn,
  ShoppingBag as bn,
  MoreHorizontal as xn,
  Sun as jn,
  CloudSun as vn,
  Cloud as Xe,
  CloudFog as yn,
  CloudDrizzle as wn,
  CloudRain as kn,
  CloudSnow as Nn,
  CloudLightning as Cn,
  Umbrella as zn,
  SmilePlus as En,
  LocateFixed as Mn,
  Star as Sn,
  Navigation as ga
} from "lucide-react";

// src/store.js
import { initializeApp as La } from "firebase/app";
import {
  initializeFirestore as Le,
  persistentLocalCache as Ba,
  persistentMultipleTabManager as Oa,
  collection as Ua,
  doc as pe,
  onSnapshot as Ka,
  setDoc as Ue,
  getDoc as Wa,
  deleteDoc as Ha
} from "firebase/firestore";
var $t = "fjt:", ut = { config: null, code: null }, ue = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), Ya = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function ge(t) {
  try {
    let a = String(t || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, r = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!r) return null;
    let l = Ya(r);
    return l && l.c && l.t ? l : null;
  } catch {
    return null;
  }
}
function Ke() {
  let t = ge(location.hash);
  if (t)
    return localStorage.setItem($t + "conn", JSON.stringify(t)), t;
  try {
    let a = JSON.parse(localStorage.getItem($t + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + ue(a)), a;
  } catch {
  }
  return null;
}
function We(t, a) {
  let n = { c: t, t: a };
  return localStorage.setItem($t + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + ue(n)), n;
}
var He = () => location.origin + location.pathname + "#j=" + ue({ c: ut.config, t: ut.code });
function Ye() {
  localStorage.removeItem($t + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var Je = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => t[n % t.length]).join("");
};
function Ge(t) {
  let a = String(t || "");
  try {
    let r = JSON.parse(a);
    if (r.apiKey && r.projectId && r.appId) return r;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((r) => {
    let l = a.match(new RegExp(r + `\\s*[:=]\\s*["']([^"']+)["']`));
    l && (n[r] = l[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var Nt = null, mt = /* @__PURE__ */ new Map(), ce = /* @__PURE__ */ new Set(), de = Promise.resolve(), ie = null, Be = null, Ja = () => {
  clearTimeout(Be), Be = setTimeout(() => ce.forEach((t) => t()), 250);
}, me = (t) => t.startsWith("trip:photo:"), se = (t) => me(t) ? pe(Nt, "trips", ut.code, "photos", t.slice(11)) : pe(Nt, "trips", ut.code, "data", t), le = (t) => $t + ut.code + ":" + t, Oe = (t) => Promise.race([t.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function fe(t, a) {
  ie && ie(), mt.clear(), ut.config = t, ut.code = a;
  let n = La(t, "fjt-" + Date.now());
  try {
    Nt = Le(n, { localCache: Ba({ tabManager: Oa() }) });
  } catch {
    Nt = Le(n, {});
  }
  let r;
  de = new Promise((x) => r = x), setTimeout(() => r(), 6e3);
  let l = !0;
  ie = Ka(
    Ua(Nt, "trips", a, "data"),
    (x) => {
      x.docChanges().forEach((g) => {
        g.type === "removed" ? mt.delete(g.doc.id) : mt.set(g.doc.id, g.doc.data().v);
      }), r(), l || Ja(), l = !1;
    },
    () => r()
  ), window.storage = Ga;
}
async function qe() {
  let t = pe(Nt, "trips", ut.code, "data", "_ping");
  await Promise.race([
    Ue(t, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var Ga = {
  async get(t, a) {
    if (!a) {
      let n = localStorage.getItem(le(t));
      if (n == null) throw new Error("not found");
      return { key: t, value: n, shared: !1 };
    }
    if (me(t)) {
      let n = await Wa(se(t));
      if (!n.exists()) throw new Error("not found");
      return { key: t, value: n.data().v, shared: !0 };
    }
    if (await de, !mt.has(t)) throw new Error("not found");
    return { key: t, value: mt.get(t), shared: !0 };
  },
  async set(t, a, n) {
    return n ? (me(t) || mt.set(t, a), await Oe(Ue(se(t), { v: a, t: Date.now() })), { key: t, value: a, shared: !0 }) : (localStorage.setItem(le(t), a), { key: t, value: a, shared: !1 });
  },
  async delete(t, a) {
    return a ? (mt.delete(t), await Oe(Ha(se(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(le(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", a) {
    return a ? (await de, { keys: [...mt.keys()].filter((n) => n.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return ce.add(t), () => ce.delete(t);
  }
};

// src/app.jsx
import { Fragment as pt, jsx as e, jsxs as o } from "react/jsx-runtime";
var W = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, Ce = (t) => "trip:photo:" + t, Q = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], An = ["일", "월", "화", "수", "목", "금", "토"], ze = ["맛집", "관광", "쇼핑", "기타"], fa = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], At = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Rt = 6, Ve = {
  식비: { Icon: un, color: "#D9262E" },
  교통: { Icon: gn, color: "#0C86AE" },
  숙소: { Icon: fn, color: "#7B5FC4" },
  체험: { Icon: hn, color: "#E8800A" },
  쇼핑: { Icon: bn, color: "#0A9B6E" },
  기타: { Icon: xn, color: "#66718A" }
}, je = (t) => Ve[t] || Ve.기타, gt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ct = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), xt = (t) => {
  let [a, n, r] = t.split("-").map(Number);
  return new Date(a, n - 1, r);
}, dt = (t, a) => {
  let n = xt(t);
  return n.setDate(n.getDate() + a), n;
}, Ot = (t) => `${t.getMonth() + 1}/${t.getDate()}`, Ut = (t) => An[t.getDay()], Y = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Kt = (t, a) => "₩" + (Math.round(t * a / 100 / 10) * 10).toLocaleString("ko-KR"), ot = (t) => String(t).padStart(2, "0"), ve = (t) => {
  let a = (Date.now() - t) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(t);
  return `${n.getMonth() + 1}/${n.getDate()} ${ot(n.getHours())}:${ot(n.getMinutes())}`;
}, Ze = (t) => {
  let a = (t || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, In = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, vt = (t) => {
  let [a, n] = String(t).split(":").map(Number);
  return a * 60 + (n || 0);
}, Et = (t) => `${ot(Math.floor(t / 60) % 24)}:${ot(t % 60)}`, Wt = (t) => {
  let a = vt(t.time), n = t.end ? vt(t.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, ha = (t) => {
  let a = Math.floor(t / 60), n = t % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function Fn(t) {
  let a = t || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${ot(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let r = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${ot(Number(n[2]))}:${ot(r)}`;
}
var Dn = Array.from({ length: 24 }, (t, a) => ot(a));
function Qe({ value: t, onChange: a, disabled: n, label: r }) {
  let [l, x] = t ? t.split(":") : ["", ""], g = Array.from({ length: 12 }, (p, d) => ot(d * 5));
  return x && !g.includes(x) && (g = [...g, x].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 시",
        value: l,
        disabled: n,
        onChange: (p) => a(p.target.value ? `${p.target.value}:${x || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          Dn.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 분",
        value: x,
        disabled: n || !l,
        onChange: (p) => a(`${l}:${p.target.value}`),
        children: [
          !l && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          g.map((p) => /* @__PURE__ */ e("option", { value: p, children: p }, p))
        ]
      }
    )
  ] });
}
var Pn = (t) => {
  let a = t.filter((r) => r.time).map((r) => ({ id: r.id, ...Wt(r) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (r) => a.forEach((l) => {
      r.id !== l.id && r.s < l.e && l.s < r.e && n.add(r.id);
    })
  ), n;
}, $n = (...t) => [...t, "일본"].filter(Boolean).join(" "), Ft = (t) => typeof t.lat == "number" && typeof t.lng == "number", ba = (t) => Ft(t) ? `${t.lat},${t.lng}` : $n(t.name || t.title, t.area || t.place), Jt = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ba(t)), Rn = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(ba(t)), ft = 256, he = (t, a, n) => {
  let r = ft * 2 ** n, l = t * Math.PI / 180;
  return {
    x: (a + 180) / 360 * r,
    y: (1 - Math.log(Math.tan(l) + 1 / Math.cos(l)) / Math.PI) / 2 * r
  };
}, ta = (t, a, n) => {
  let r = ft * 2 ** n, l = Math.PI - 2 * Math.PI * a / r;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(l)), lng: t / r * 360 - 180 };
}, _t = (t) => Math.max(3, Math.min(18, t));
async function lt(t, a) {
  try {
    let n = await window.storage.get(t, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function Ct(t, a) {
  try {
    return !!await window.storage.set(t, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var ht = /* @__PURE__ */ new Map(), Vt = /* @__PURE__ */ new Map();
function _n(t) {
  if (ht.has(t)) return Promise.resolve(ht.get(t));
  if (Vt.has(t)) return Vt.get(t);
  let a = lt(Ce(t), null).then((n) => (Vt.delete(t), n && ht.set(t, n), n));
  return Vt.set(t, a), a;
}
async function ea(t) {
  ht.delete(t);
  try {
    await window.storage.delete(Ce(t), !0);
  } catch {
  }
}
var Tn = (t) => new Promise((a, n) => {
  let r = URL.createObjectURL(t), l = new Image();
  l.onload = () => {
    URL.revokeObjectURL(r), a(l);
  }, l.onerror = () => {
    URL.revokeObjectURL(r), n(new Error("bad image"));
  }, l.src = r;
});
async function Ln(t) {
  let a = await Tn(t), n = 1280, r = 0.7, l = "";
  for (let x = 0; x < 5; x++) {
    let g = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), p = document.createElement("canvas");
    p.width = Math.max(1, Math.round(a.naturalWidth * g)), p.height = Math.max(1, Math.round(a.naturalHeight * g));
    let d = p.getContext("2d");
    if (d.fillStyle = "#fff", d.fillRect(0, 0, p.width, p.height), d.drawImage(a, 0, 0, p.width, p.height), l = p.toDataURL("image/jpeg", r), l.length < 6e5) break;
    n = Math.round(n * 0.8), r = Math.max(0.4, r - 0.08);
  }
  return l;
}
var Bn = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: ct(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function On() {
  for (let [t, a] of Bn)
    try {
      let n = await fetch(t);
      if (!n.ok) continue;
      let r = a(await n.json());
      if (r.rate > 0) return r;
    } catch {
    }
  return null;
}
var aa = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), te = (t) => t.fx ? `100엔 = ₩${aa(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${aa(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function na(t, a) {
  let n = () => Object.fromEntries(a.map((c) => [c, 0])), r = n(), l = n(), x = [];
  t.forEach((c) => {
    let z = Number(c.amount) || 0, f = (c.split || []).filter((s) => a.includes(s));
    if (!(z <= 0)) {
      if (!f.length || !a.includes(c.payer)) {
        x.push(c);
        return;
      }
      r[c.payer] += z, f.forEach((s) => l[s] += z / f.length);
    }
  });
  let g = Object.fromEntries(a.map((c) => [c, r[c] - l[c]])), p = a.filter((c) => g[c] > 0.5).map((c) => ({ m: c, v: g[c] })).sort((c, z) => z.v - c.v), d = a.filter((c) => g[c] < -0.5).map((c) => ({ m: c, v: -g[c] })).sort((c, z) => z.v - c.v), h = [], v = 0, k = 0;
  for (; v < d.length && k < p.length; ) {
    let c = Math.min(d[v].v, p[k].v);
    c >= 1 && h.push({ from: d[v].m, to: p[k].m, v: Math.round(c) }), d[v].v -= c, p[k].v -= c, d[v].v < 0.5 && v++, p[k].v < 0.5 && k++;
  }
  return { paid: r, share: l, net: g, moves: h, skipped: x };
}
function it({ name: t, members: a, size: n = 28 }) {
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
function at({ label: t, children: a }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    a
  ] });
}
function jt({ title: t, onClose: a, children: n }) {
  return H(() => {
    let r = (l) => l.key === "Escape" && a();
    return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
  }, [a]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (r) => r.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ e(Ht, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function wt({ onConfirm: t, label: a = "삭제" }) {
  let [n, r] = N(!1);
  return H(() => {
    if (!n) return;
    let l = setTimeout(() => r(!1), 3e3);
    return () => clearTimeout(l);
  }, [n]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (l) => {
        l.stopPropagation(), n ? t() : r(!0);
      },
      children: [
        /* @__PURE__ */ e(Va, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
function Un({ id: t, data: a, className: n, onClick: r, alt: l = "사진" }) {
  let [x, g] = N(a || ht.get(t) || null), [p, d] = N(!1);
  H(() => {
    if (a) {
      g(a);
      return;
    }
    if (ht.has(t)) {
      g(ht.get(t));
      return;
    }
    let v = !0;
    return d(!1), _n(t).then((k) => {
      v && (k ? g(k) : d(!0));
    }), () => {
      v = !1;
    };
  }, [t, a]);
  let h = x ? /* @__PURE__ */ e("img", { src: x, alt: l, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: p ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return r ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (n || ""), onClick: r, "aria-label": "사진 크게 보기", children: h }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (n || ""), children: h });
}
var oa = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function xa(t) {
  let a = {};
  if (Object.entries(t.reactions || {}).forEach(([n, r]) => a[n] = [...r]), t.boardLikes && (t.likes || []).length) {
    let n = new Set(Object.values(a).flat()), r = t.likes.filter((l) => !n.has(l));
    r.length && (a["❤️"] = [...a["❤️"] || [], ...r]);
  }
  return a;
}
function Kn(t, a, n, r) {
  let l = xa({ ...t, boardLikes: r }), x = (l[a] || []).includes(n), g = {};
  Object.entries(l).forEach(([d, h]) => {
    let v = h.filter((k) => k !== n);
    v.length && (g[d] = v);
  }), x || (g[a] = [...g[a] || [], n]);
  let p = { ...t, reactions: g };
  return r && (p.likes = []), p;
}
function Ee({ item: t, me: a, onReact: n, boardLikes: r = !1 }) {
  let [l, x] = N(!1), [g, p] = N("up right"), d = J(null), h = xa({ ...t, boardLikes: r }), v = () => {
    if (!l && d.current) {
      let f = d.current.getBoundingClientRect(), u = d.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", A = f.top < 190 ? "down" : "up";
      p(A + " " + u);
    }
    x(!l);
  }, k = oa.filter(([f]) => (h[f] || []).length), c = Object.keys(h).find((f) => h[f].includes(a));
  H(() => {
    if (!l) return;
    let f = (s) => d.current && !d.current.contains(s.target) && x(!1);
    return document.addEventListener("pointerdown", f), () => document.removeEventListener("pointerdown", f);
  }, [l]);
  let z = (f) => {
    n(f), x(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: d,
      onClick: (f) => f.stopPropagation(),
      onKeyDown: (f) => f.stopPropagation(),
      children: [
        k.map(([f, s]) => /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (c === f ? " on" : ""),
            onClick: () => z(f),
            "aria-pressed": c === f,
            "aria-label": `${s} ${h[f].length}명: ${h[f].join(", ")}`,
            title: h[f].join(", "),
            children: [
              /* @__PURE__ */ e("span", { className: "jt-emoji", children: f }),
              h[f].length
            ]
          },
          f
        )),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (l ? " open" : ""),
            onClick: v,
            "aria-expanded": l,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(En, { size: 16 })
          }
        ),
        l && /* @__PURE__ */ o("div", { className: "jt-rpop " + g, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: oa.map(([f, s]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (c === f ? " on" : ""),
              onClick: () => z(f),
              "aria-label": s,
              title: s,
              children: f
            },
            f
          )) }),
          k.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: k.map(([f]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: f }),
            h[f].join(", ")
          ] }, f)) })
        ] })
      ]
    }
  );
}
function ja({ count: t, open: a, onClick: n }) {
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
        /* @__PURE__ */ e(an, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Me({ comments: t = [], me: a, members: n, onAdd: r, onDelete: l }) {
  let [x, g] = N(""), p = () => {
    let d = x.trim();
    d && (r(d), g(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (d) => d.stopPropagation(), onKeyDown: (d) => d.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((d) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(it, { name: d.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("strong", { children: d.by }),
          /* @__PURE__ */ e("span", { children: ve(d.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: d.text })
      ] }),
      d.by === a && /* @__PURE__ */ e(wt, { onConfirm: () => l(d.id), label: "" })
    ] }, d.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: x,
          onChange: (d) => g(d.target.value),
          onKeyDown: (d) => d.key === "Enter" && !d.nativeEvent.isComposing && p(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: p, disabled: !x.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(rn, { size: 18 }) })
    ] })
  ] });
}
function Wn({ url: t, onRemove: a }) {
  let n = /* @__PURE__ */ o(pt, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(on, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: In(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return a ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(Ht, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ e(It, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function Hn({ initial: t, onSave: a, onCancel: n }) {
  let [r, l] = N(t?.title || "가족 일본여행"), [x, g] = N(t?.start || ct(new Date(Date.now() + 30 * 864e5))), [p, d] = N(t?.days || 4), [h, v] = N(t?.members || []), [k, c] = N(t?.rate || 900), [z, f] = N(t?.gmapsKey || ""), [s, u] = N(""), A = () => {
    let w = s.trim();
    !w || h.includes(w) || (v([...h, w]), u(""));
  }, m = r.trim() && x && h.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(at, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (w) => l(w.target.value) }) }),
      /* @__PURE__ */ e(at, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: x, onChange: (w) => g(w.target.value) }) }),
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
        /* @__PURE__ */ e("div", { className: "jt-chips", children: h.map((w) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(it, { name: w, members: h, size: 20 }),
          w,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => v(h.filter((i) => i !== w)), "aria-label": `${w} 빼기`, children: /* @__PURE__ */ e(Ht, { size: 14 }) })
        ] }, w)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: s,
              onChange: (w) => u(w.target.value),
              onKeyDown: (w) => w.key === "Enter" && A(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: A, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(at, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: k, onChange: (w) => c(Number(w.target.value) || 0) }) }),
      /* @__PURE__ */ e(at, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ e(
        "input",
        {
          value: z,
          onChange: (w) => f(w.target.value.trim()),
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
          onClick: () => a({ title: r.trim(), start: x, days: p, members: h, rate: k || 900, gmapsKey: z }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(Yn, {})
    ] })
  ] });
}
function Yn() {
  let [t, a] = N(""), n = He();
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && Ye();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Jn({ members: t, onPick: a }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((n) => /* @__PURE__ */ o("button", { className: "jt-who-btn", onClick: () => a(n), children: [
      /* @__PURE__ */ e(it, { name: n, members: t, size: 40 }),
      n
    ] }, n)) })
  ] });
}
function Gn({ initial: t, preset: a, gkey: n, dayItems: r = [], onSave: l, onDelete: x }) {
  let [g, p] = N(t?.time || a?.time || ""), [d, h] = N(t?.end || a?.end || ""), [v, k] = N(t?.link || ""), [c, z] = N(t && Ft(t) ? { lat: t.lat, lng: t.lng, placeId: t.placeId } : null), [f, s] = N([]), [u, A] = N(!1), [m, w] = N(""), [i, b] = N(t?.title || ""), [y, D] = N(t?.place || ""), [E, R] = N(t?.memo || ""), [S, M] = N(!1), _ = (j) => {
    if (b(j), !g || S) {
      let O = Fn(j);
      O ? (p(O), M(!0)) : S && (p(""), M(!1));
    }
  }, B = async () => {
    let j = (y || i).trim();
    if (!j) {
      w("장소 이름을 먼저 적어 주세요.");
      return;
    }
    A(!0), w(""), s([]);
    try {
      let O = await fo(j, n);
      s(O), O.length || w("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      w("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    A(!1);
  }, q = g && d && vt(d) <= vt(g), L = g ? r.filter((j) => {
    if (!j.time) return !1;
    let O = Wt({ time: g, end: q ? "" : d }), G = Wt(j);
    return O.s < G.e && G.s < O.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(at, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: i, onChange: (j) => _(j.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    S && g && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      g,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          Qe,
          {
            label: "시작",
            value: g,
            onChange: (j) => {
              p(j), M(!1), j || h("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(Qe, { label: "끝", value: d, onChange: h, disabled: !g })
      ] })
    ] }),
    g && !d && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    q && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    g && d && !q && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      ha(vt(d) - vt(g)),
      " 동안"
    ] }),
    L.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      L.map((j) => `'${j.title}'(${j.time}${j.end ? `~${j.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ e(
          "input",
          {
            value: y,
            onChange: (j) => D(j.target.value),
            onKeyDown: (j) => j.key === "Enter" && !j.nativeEvent.isComposing && B(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: B, disabled: u, children: u ? "찾는 중" : "검색" })
      ] })
    ] }),
    m && /* @__PURE__ */ e("p", { className: "jt-hint", children: m }),
    f.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-results jt-form-results", children: f.map((j, O) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          D(j.name), z({ lat: j.lat, lng: j.lng, placeId: j.placeId }), j.link && k(j.link), s([]), w("");
        },
        children: [
          /* @__PURE__ */ e("strong", { children: j.name }),
          /* @__PURE__ */ e("span", { children: j.area })
        ]
      }
    ) }, O)) }),
    c && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ e(Yt, { size: 14 }),
      /* @__PURE__ */ e("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: Jt({ title: i, place: y, link: v, ...c }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ e(It, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-ghost sm", onClick: () => z(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ e(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e("input", { type: "url", value: v, onChange: (j) => k(j.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ e(at, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: E, onChange: (j) => R(j.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim() || q,
        onClick: () => l({
          time: g,
          end: g ? d : "",
          title: i.trim(),
          place: y.trim(),
          memo: E.trim(),
          link: v.trim(),
          lat: c ? c.lat : void 0,
          lng: c ? c.lng : void 0,
          placeId: c && c.placeId ? c.placeId : void 0
        }),
        children: t ? "수정 저장" : "일정 추가"
      }
    ),
    t && /* @__PURE__ */ e(wt, { onConfirm: x, label: "이 일정 삭제" })
  ] });
}
function qn({ initial: t, onSave: a, onDelete: n }) {
  let [r, l] = N(t?.name || ""), [x, g] = N(t?.cat || "맛집"), [p, d] = N(t?.area || ""), [h, v] = N(t?.link || ""), [k, c] = N(t?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(at, { label: "이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (z) => l(z.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ e("span", { children: "종류" }),
      /* @__PURE__ */ e("div", { className: "jt-chips", children: ze.map((z) => /* @__PURE__ */ e("button", { type: "button", className: "jt-chip" + (x === z ? " on" : ""), onClick: () => g(z), children: z }, z)) })
    ] }),
    /* @__PURE__ */ e(at, { label: "동네 (선택)", children: /* @__PURE__ */ e("input", { value: p, onChange: (z) => d(z.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ e(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ e(
      "input",
      {
        type: "url",
        value: h,
        onChange: (z) => v(z.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ e("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ e(at, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: k, onChange: (z) => c(z.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !r.trim(),
        onClick: () => a({ name: r.trim(), cat: x, area: p.trim(), link: h.trim(), memo: k.trim() }),
        children: t ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    t && /* @__PURE__ */ e(wt, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function Xn({ settings: t, me: a, defaultDay: n, initial: r, onSave: l, onDelete: x }) {
  let { members: g, days: p, start: d, rate: h } = t, [v, k] = N(r?.title || ""), [c, z] = N(r ? String(Number(r.amount) || "") : ""), [f, s] = N(r && g.includes(r.payer) ? r.payer : a), [u, A] = N(r?.cat || "식비"), [m, w] = N(r ? Math.min(r.day, p - 1) : n), [i, b] = N(r ? (r.split || []).filter((S) => g.includes(S)) : g), y = Number(c) || 0, D = r ? [r.payer, ...r.split || []].filter((S, M, _) => S && !g.includes(S) && _.indexOf(S) === M) : [], E = (S) => b(i.includes(S) ? i.filter((M) => M !== S) : [...i, S]), R = v.trim() && y > 0 && i.length > 0;
