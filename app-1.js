// src/main.jsx
import { useState as Bt, useEffect as us } from "react";
import { createRoot as ms } from "react-dom/client";

// src/app.jsx
import jo, { useState as y, useEffect as H, useMemo as ce, useCallback as yo, useRef as G } from "react";
import {
  Plus as vo,
  X as Xt,
  Heart as cn,
  Trash2 as wo,
  MapPin as Et,
  Settings as ko,
  CalendarDays as No,
  Wallet as Co,
  Check as an,
  ExternalLink as Tt,
  Map as zo,
  MessageSquare as Eo,
  Image as Ao,
  Link2 as So,
  Send as ha,
  Pencil as qt,
  ChevronLeft as ba,
  ChevronRight as xa,
  ChevronDown as Ct,
  ChevronUp as ja,
  Users as Mo,
  Crosshair as Io,
  HelpCircle as Fo,
  MessagesSquare as Do,
  Megaphone as ya,
  Lock as Po,
  WifiOff as Ro,
  Wifi as $o,
  Pin as To,
  PinOff as Jn,
  Utensils as Bo,
  TrainFront as Lo,
  BedDouble as _o,
  Ticket as Oo,
  ShoppingBag as Ko,
  MoreHorizontal as Wo,
  Sun as Uo,
  CloudSun as Ho,
  Cloud as Gn,
  CloudFog as Yo,
  CloudDrizzle as Jo,
  CloudRain as Go,
  CloudSnow as Xo,
  CloudLightning as qo,
  Umbrella as Vo,
  SmilePlus as Zo,
  LocateFixed as Qo,
  Star as ti,
  Navigation as At
} from "lucide-react";

// src/store.js
import { initializeApp as co } from "firebase/app";
import {
  initializeFirestore as $n,
  persistentLocalCache as po,
  persistentMultipleTabManager as uo,
  collection as mo,
  doc as Ue,
  onSnapshot as fo,
  setDoc as Ln,
  getDoc as go,
  deleteDoc as ho
} from "firebase/firestore";
var ae = "fjt:", wt = { config: null, code: null }, Ge = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), bo = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function Xe(t) {
  try {
    let n = String(t || "").trim(), o = n.includes("#") ? n.slice(n.indexOf("#") + 1) : n, i = new URLSearchParams(o).get("j") || (o.startsWith("j=") ? o.slice(2) : "");
    if (!i) return null;
    let s = bo(i);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function _n() {
  let t = Xe(location.hash);
  if (t)
    return localStorage.setItem(ae + "conn", JSON.stringify(t)), t;
  try {
    let n = JSON.parse(localStorage.getItem(ae + "conn"));
    if (n && n.c && n.t)
      return history.replaceState(null, "", "#j=" + Ge(n)), n;
  } catch {
  }
  return null;
}
function On(t, n) {
  let o = { c: t, t: n };
  return localStorage.setItem(ae + "conn", JSON.stringify(o)), history.replaceState(null, "", "#j=" + Ge(o)), o;
}
var Kn = () => location.origin + location.pathname + "#j=" + Ge({ c: wt.config, t: wt.code });
function Wn() {
  localStorage.removeItem(ae + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var Un = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", n = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(n, (o) => t[o % t.length]).join("");
};
function Hn(t) {
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
var _t = null, vt = /* @__PURE__ */ new Map(), He = /* @__PURE__ */ new Set(), Ye = Promise.resolve(), _e = null, ve = !1, Tn = null, Oe = () => {
  clearTimeout(Tn), Tn = setTimeout(() => He.forEach((t) => t()), 250);
}, Je = (t) => t.startsWith("trip:photo:"), Ke = (t) => Je(t) ? Ue(_t, "trips", wt.code, "photos", t.slice(11)) : Ue(_t, "trips", wt.code, "data", t), We = (t) => ae + wt.code + ":" + t, Bn = (t) => Promise.race([t.then(() => !0), new Promise((n) => setTimeout(() => n(!0), 4e3))]);
function qe(t, n) {
  _e && _e(), vt.clear(), wt.config = t, wt.code = n;
  let o = co(t, "fjt-" + Date.now());
  try {
    _t = $n(o, { localCache: po({ tabManager: uo() }) });
  } catch {
    _t = $n(o, {});
  }
  let i;
  ve = !1, Ye = new Promise((d) => i = d), setTimeout(() => i(), 8e3);
  let s = !0;
  _e = fo(
    mo(_t, "trips", n, "data"),
    { includeMetadataChanges: !0 },
    (d) => {
      let m = d.docChanges();
      m.forEach((r) => {
        r.type === "removed" ? vt.delete(r.doc.id) : vt.set(r.doc.id, r.doc.data().v);
      });
      let l = !d.metadata.fromCache;
      (l || d.size > 0) && i(), l && !ve ? (ve = !0, Oe()) : !s && m.length && Oe(), s = !1;
    },
    () => {
      i(), Oe();
    }
  ), window.storage = xo;
}
async function Yn() {
  let t = Ue(_t, "trips", wt.code, "data", "_ping");
  await Promise.race([
    Ln(t, { v: "ok", t: Date.now() }),
    new Promise((n, o) => setTimeout(() => o(new Error("timeout")), 9e3))
  ]);
}
var xo = {
  async get(t, n) {
    if (!n) {
      let o = localStorage.getItem(We(t));
      if (o == null) throw new Error("not found");
      return { key: t, value: o, shared: !1 };
    }
    if (Je(t)) {
      let o = await go(Ke(t));
      if (!o.exists()) throw new Error("not found");
      return { key: t, value: o.data().v, shared: !0 };
    }
    if (await Ye, !vt.has(t)) throw new Error("not found");
    return { key: t, value: vt.get(t), shared: !0 };
  },
  async set(t, n, o) {
    return o ? (Je(t) || vt.set(t, n), await Bn(Ln(Ke(t), { v: n, t: Date.now() })), { key: t, value: n, shared: !0 }) : (localStorage.setItem(We(t), n), { key: t, value: n, shared: !1 });
  },
  async delete(t, n) {
    return n ? (vt.delete(t), await Bn(ho(Ke(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(We(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", n) {
    return n ? (await Ye, { keys: [...vt.keys()].filter((o) => o.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  // 서버와 한 번이라도 맞춰졌는지 (처음 연 기기에서 빈 화면을 "여행 없음"으로 착각하지 않게)
  isSynced() {
    return ve;
  },
  onChange(t) {
    return He.add(t), () => He.delete(t);
  }
};

// src/app.jsx
import { Fragment as V, jsx as e, jsxs as a } from "react/jsx-runtime";
var X = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice", board: "trip:board" }, pn = (t) => "trip:photo:" + t, oe = 6, Z = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], ei = ["일", "월", "화", "수", "목", "금", "토"], dn = ["맛집", "관광", "쇼핑", "기타"], Ht = "__fund__", Yt = (t) => !!t && (t.fund === !0 || t.payer === Ht), va = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Ut = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Xn = {
  식비: { Icon: Bo, color: "#D9262E" },
  교통: { Icon: Lo, color: "#0C86AE" },
  숙소: { Icon: _o, color: "#7B5FC4" },
  체험: { Icon: Oo, color: "#E8800A" },
  쇼핑: { Icon: Ko, color: "#0A9B6E" },
  기타: { Icon: Wo, color: "#66718A" }
}, on = (t) => Xn[t] || Xn.기타, yt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), pt = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Dt = (t) => {
  let [n, o, i] = t.split("-").map(Number);
  return new Date(n, o - 1, i);
}, mt = (t, n) => {
  let o = Dt(t);
  return o.setDate(o.getDate() + n), o;
}, Rt = (t) => `${t.getMonth() + 1}/${t.getDate()}`, St = (t) => ei[t.getDay()], dt = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Jt = (t, n) => "₩" + (Math.round(t * n / 100 / 100) * 100).toLocaleString("ko-KR"), wa = 900, un = (t) => `${dt(t)}(${Jt(t, wa)})`, it = (t) => String(t).padStart(2, "0"), ze = (t) => {
  let n = (Date.now() - t) / 1e3;
  if (n < 60) return "방금";
  if (n < 3600) return `${Math.floor(n / 60)}분 전`;
  if (n < 86400) return `${Math.floor(n / 3600)}시간 전`;
  let o = new Date(t);
  return `${o.getMonth() + 1}/${o.getDate()} ${it(o.getHours())}:${it(o.getMinutes())}`;
}, qn = (t) => {
  let n = (t || "").trim();
  if (!n) return "";
  /^https?:\/\//i.test(n) || (n = "https://" + n);
  try {
    let o = new URL(n);
    return o.hostname.includes(".") ? o.href : "";
  } catch {
    return "";
  }
}, ni = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, Pt = (t) => {
  let [n, o] = String(t).split(":").map(Number);
  return n * 60 + (o || 0);
}, Kt = (t) => `${it(Math.floor(t / 60) % 24)}:${it(t % 60)}`, ue = (t) => {
  let n = Pt(t.time), o = t.end ? Pt(t.end) : n + 60;
  return o <= n && (o = n + 60), { s: n, e: Math.min(o, 24 * 60) };
}, ka = (t) => {
  let n = Math.floor(t / 60), o = t % 60;
  return [n ? `${n}시간` : "", o ? `${o}분` : ""].filter(Boolean).join(" ");
};
function ai(t) {
  let n = t || "", o = n.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (o) return `${it(Number(o[2]))}:${o[3]}`;
  if (o = n.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !o) return "";
  let i = o[3] === "반" ? 30 : o[4] ? Number(o[4]) : 0;
  return `${it(Number(o[2]))}:${it(i)}`;
}
var oi = Array.from({ length: 24 }, (t, n) => it(n));
function Vn({ value: t, onChange: n, disabled: o, label: i }) {
  let [s, d] = t ? t.split(":") : ["", ""], m = Array.from({ length: 12 }, (l, r) => it(r * 5));
  return d && !m.includes(d) && (m = [...m, d].sort()), /* @__PURE__ */ a("div", { className: "jt-tsel" + (o ? " off" : ""), children: [
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 시",
        value: s,
        disabled: o,
        onChange: (l) => n(l.target.value ? `${l.target.value}:${d || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          oi.map((l) => /* @__PURE__ */ e("option", { value: l, children: l }, l))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 분",
        value: d,
        disabled: o || !s,
        onChange: (l) => n(`${s}:${l.target.value}`),
        children: [
          !s && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          m.map((l) => /* @__PURE__ */ e("option", { value: l, children: l }, l))
        ]
      }
    )
  ] });
}
var ii = (t) => {
  let n = t.filter((i) => i.time).map((i) => ({ id: i.id, ...ue(i) })), o = /* @__PURE__ */ new Set();
  return n.forEach(
    (i) => n.forEach((s) => {
      i.id !== s.id && i.s < s.e && s.s < i.e && o.add(i.id);
    })
  ), o;
}, Ee = (t) => at(t) ? `${t.lat},${t.lng}` : t.place ? mn(t.place) : "", si = (t, n) => {
  let o = t ? Ee(t) : "", i = Ee(n);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (o ? "&origin=" + encodeURIComponent(o) : "");
}, Me = (t) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(at(t) ? `${t.lat},${t.lng}` : mn(t.name || t.title, t.area || t.place)) + (t.placeId ? "&destination_place_id=" + encodeURIComponent(t.placeId) : ""), mn = (...t) => [...t, "일본"].filter(Boolean).join(" "), at = (t) => typeof t.lat == "number" && typeof t.lng == "number", Na = (t) => at(t) ? `${t.lat},${t.lng}` : mn(t.name || t.title, t.area || t.place), $t = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Na(t)), ri = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Na(t)), kt = 256, Ve = (t, n, o) => {
  let i = kt * 2 ** o, s = t * Math.PI / 180;
  return {
    x: (n + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * i
  };
}, Zn = (t, n, o) => {
  let i = kt * 2 ** o, s = Math.PI - 2 * Math.PI * n / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: t / i * 360 - 180 };
}, ie = (t) => Math.max(3, Math.min(18, t));
async function Ze(t) {
  let n = await window.storage.list(t, !0), o = (n && n.keys || []).map((s) => typeof s == "string" ? s : s.key).filter(Boolean), i = await Promise.all(o.map((s) => bt(s, null)));
  return o.map((s, d) => [s, i[d]]).filter(([, s]) => s);
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
var zt = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map();
function li(t) {
  if (zt.has(t)) return Promise.resolve(zt.get(t));
  if (we.has(t)) return we.get(t);
  let n = bt(pn(t), null).then((o) => (we.delete(t), o && zt.set(t, o), o));
  return we.set(t, n), n;
}
async function Qn(t) {
  zt.delete(t);
  try {
    await window.storage.delete(pn(t), !0);
  } catch {
  }
}
var ci = (t) => new Promise((n, o) => {
  let i = URL.createObjectURL(t), s = new Image();
  s.onload = () => {
    URL.revokeObjectURL(i), n(s);
  }, s.onerror = () => {
    URL.revokeObjectURL(i), o(new Error("bad image"));
  }, s.src = i;
});
async function pi(t) {
  let n = await ci(t), o = 1280, i = 0.7, s = "";
  for (let d = 0; d < 5; d++) {
    let m = Math.min(1, o / Math.max(n.naturalWidth, n.naturalHeight)), l = document.createElement("canvas");
    l.width = Math.max(1, Math.round(n.naturalWidth * m)), l.height = Math.max(1, Math.round(n.naturalHeight * m));
    let r = l.getContext("2d");
    if (r.fillStyle = "#fff", r.fillRect(0, 0, l.width, l.height), r.drawImage(n, 0, 0, l.width, l.height), s = l.toDataURL("image/jpeg", i), s.length < 6e5) break;
    o = Math.round(o * 0.8), i = Math.max(0.4, i - 0.08);
  }
  return s;
}
var di = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: pt(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function ui() {
  for (let [t, n] of di)
    try {
      let o = await fetch(t);
      if (!o.ok) continue;
      let i = n(await o.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var ta = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Ae = (t) => t.fx ? `100엔 = ₩${ta(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${ta(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function ea(t, n) {
  let o = () => Object.fromEntries(n.map((c) => [c, 0])), i = o(), s = o(), d = [];
  t.forEach((c) => {
    let F = Number(c.amount) || 0, f = (c.split || []).filter((S) => n.includes(S));
    if (!(F <= 0 || Yt(c))) {
      if (!f.length || !n.includes(c.payer)) {
        d.push(c);
        return;
      }
      i[c.payer] += F, f.forEach((S) => s[S] += F / f.length);
    }
  });
  let m = Object.fromEntries(n.map((c) => [c, i[c] - s[c]])), l = n.filter((c) => m[c] > 0.5).map((c) => ({ m: c, v: m[c] })).sort((c, F) => F.v - c.v), r = n.filter((c) => m[c] < -0.5).map((c) => ({ m: c, v: -m[c] })).sort((c, F) => F.v - c.v), h = [], k = 0, E = 0;
  for (; k < r.length && E < l.length; ) {
    let c = Math.min(r[k].v, l[E].v);
    c >= 1 && h.push({ from: r[k].m, to: l[E].m, v: Math.round(c) }), r[k].v -= c, l[E].v -= c, r[k].v < 0.5 && k++, l[E].v < 0.5 && E++;
  }
  return { paid: i, share: s, net: m, moves: h, skipped: d };
}
function rt({ name: t, members: n, size: o = 28 }) {
  let i = Math.max(0, n.indexOf(t));
  return /* @__PURE__ */ e(
    "span",
    {
      className: "jt-avatar",
      style: { width: o, height: o, background: Z[(i * 2 + 3) % Z.length], fontSize: o * 0.46 },
      "aria-hidden": "true",
      children: t ? t[0] : "?"
    }
  );
}
function ft({ label: t, children: n }) {
  return /* @__PURE__ */ a("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    n
  ] });
}
function Nt({ title: t, onClose: n, children: o }) {
  return H(() => {
    let i = (s) => s.key === "Escape" && n();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: n, children: /* @__PURE__ */ a("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ a("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ e(Xt, { size: 20 }) })
    ] }),
    o
  ] }) });
}
function It({ onConfirm: t, label: n = "삭제" }) {
  let [o, i] = y(!1);
  return H(() => {
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
        /* @__PURE__ */ e(wo, { size: 15 }),
        o ? "한 번 더 누르면 삭제돼요" : n
      ]
    }
  );
}
var na = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Ca(t) {
  let n = {};
  return Object.entries(t.reactions || {}).forEach(([o, i]) => n[o] = [...i]), n;
}
function mi(t, n, o) {
  let i = Ca(t), s = (i[n] || []).includes(o), d = {};
  return Object.entries(i).forEach(([m, l]) => {
    let r = l.filter((h) => h !== o);
    r.length && (d[m] = r);
  }), s || (d[n] = [...d[n] || [], o]), { ...t, reactions: d };
}
function fn({ className: t, onTap: n, names: o = [], title: i, members: s = [], children: d, ...m }) {
  let [l, r] = y(!1), [h, k] = y("up left"), E = G(null), c = G(null), F = G(!1);
  H(() => {
    if (!l) return;
    let N = (A) => E.current && !E.current.contains(A.target) && r(!1);
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [l]), H(() => () => clearTimeout(c.current), []);
  let f = () => {
    if (E.current) {
      let N = E.current.getBoundingClientRect();
      k((N.top < 200 ? "down" : "up") + " " + (N.left > window.innerWidth - 210 ? "right" : "left"));
    }
    r(!0), navigator.vibrate && navigator.vibrate(15);
  }, S = () => {
    F.current = !1, clearTimeout(c.current), c.current = setTimeout(() => {
      F.current = !0, f();
    }, 450);
  }, v = () => clearTimeout(c.current);
  return /* @__PURE__ */ a("span", { className: "jt-hold", ref: E, children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: t + " jt-holdbtn",
        ...m,
        title: o.length ? o.join(", ") : void 0,
        onPointerDown: S,
        onPointerUp: v,
        onPointerLeave: v,
        onPointerCancel: v,
        onContextMenu: (N) => {
          N.preventDefault(), v(), F.current = !0, f();
        },
        onClick: (N) => {
          if (N.stopPropagation(), F.current) {
            F.current = !1;
            return;
          }
          n(N);
        },
        children: d
      }
    ),
    l && /* @__PURE__ */ a("div", { className: "jt-whopop " + h, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ a("strong", { children: [
        i,
        " ",
        o.length,
        "명"
      ] }),
      o.length ? /* @__PURE__ */ e("ul", { children: o.map((N) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ e(rt, { name: N, members: s.length ? s : o, size: 22 }),
        N
      ] }, N)) }) : /* @__PURE__ */ e("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ie({ item: t, me: n, onReact: o, members: i = [] }) {
  let [s, d] = y(!1), [m, l] = y("up right"), r = G(null), h = Ca(t), k = () => {
    if (!s && r.current) {
      let f = r.current.getBoundingClientRect(), v = r.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", N = f.top < 190 ? "down" : "up";
      l(N + " " + v);
    }
    d(!s);
  }, E = na.filter(([f]) => (h[f] || []).length), c = Object.keys(h).find((f) => h[f].includes(n));
  H(() => {
    if (!s) return;
    let f = (S) => r.current && !r.current.contains(S.target) && d(!1);
    return document.addEventListener("pointerdown", f), () => document.removeEventListener("pointerdown", f);
  }, [s]);
  let F = (f) => {
    o(f), d(!1);
  };
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-react",
      ref: r,
      onClick: (f) => f.stopPropagation(),
      onKeyDown: (f) => f.stopPropagation(),
      children: [
        E.map(([f, S]) => /* @__PURE__ */ a(
          fn,
          {
            className: "jt-rchip" + (c === f ? " on" : ""),
            onTap: () => F(f),
            names: h[f],
            members: i,
            title: `${f} ${S}`,
            "aria-pressed": c === f,
            "aria-label": `${S} ${h[f].length}명, 길게 누르면 누른 사람 보기`,
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
            className: "jt-rchip add" + (s ? " open" : ""),
            onClick: k,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(Zo, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ a("div", { className: "jt-rpop " + m, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: na.map(([f, S]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (c === f ? " on" : ""),
              onClick: () => F(f),
              "aria-label": S,
              title: S,
              children: f
            },
            f
          )) }),
          E.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: E.map(([f]) => /* @__PURE__ */ a("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: f }),
            h[f].join(", ")
          ] }, f)) })
        ] })
      ]
    }
  );
}
function fi() {
  let [t, n] = y(null), [o, i] = y("");
  return H(() => {
    if (!navigator.geolocation) {
      i("fail");
      return;
    }
    let s = !0, d = () => navigator.geolocation.getCurrentPosition(
      (l) => {
        s && (n({ lat: l.coords.latitude, lng: l.coords.longitude }), i(""));
      },
      (l) => s && i(l && l.code === 1 ? "denied" : "fail"),
      { enableHighAccuracy: !1, timeout: 15e3, maximumAge: 6e4 }
    );
    d();
    let m = setInterval(() => document.visibilityState === "visible" && d(), 6e4);
    return () => {
      s = !1, clearInterval(m);
    };
  }, []), [t, o];
}
var aa = (t) => t < 1e3 ? `${Math.round(t / 10) * 10}m` : t < 1e4 ? `${(t / 1e3).toFixed(1)}km` : `${Math.round(t / 1e3)}km`, gi = (t) => t < 1e3 ? "near" : t < 5e3 ? "mid" : "far", oa = (t) => String(t || "").toLowerCase().replace(/[\s·・,.\-()（）'"!?&/]/g, "").replace(/(본점|지점|점|店)$/, "");
function ia(t, n) {
  if (t = oa(t), n = oa(n), !t || !n) return 0;
  if (t.includes(n) || n.includes(t)) return 1;
  let o = (l) => {
    let r = /* @__PURE__ */ new Map();
    for (let h = 0; h < l.length - 1; h++) r.set(l.slice(h, h + 2), (r.get(l.slice(h, h + 2)) || 0) + 1);
    return r;
  }, i = o(t), s = o(n), d = 0;
  i.forEach((l, r) => s.has(r) && (d += Math.min(l, s.get(r))));
  let m = t.length - 1 + (n.length - 1);
  return m > 0 ? 2 * d / m : 0;
}
var hi = (t) => t.lat > 24 && t.lat < 46 && t.lng > 122 && t.lng < 154, bi = (t) => /^https?:\/\/(share\.google|g\.co\/kgs|(www\.)?google\.[a-z.]+\/search)/i.test(String(t || ""));
async function xi(t, n, o) {
  let i = [[t.name, t.area].filter(Boolean).join(" "), t.name].filter((l, r, h) => l && h.indexOf(l) === r), s = { status: "none" }, d = "", m = "";
  for (let l = 0; l < i.length; l++) {
    l && await new Promise((c) => setTimeout(c, o));
    let r;
    try {
      r = await Da(i[l], n);
    } catch {
      s = s.status === "none" ? { status: "error" } : s;
      continue;
    }
    if (d = r.engine, r.gErr && (m = r.gErr), !r.list.length) continue;
    let h = r.list.filter(hi).map((c) => ({ r: c, score: Math.max(ia(t.name, c.name), ia(t.name, `${c.name} ${c.area}`)) })).filter((c) => c.score >= 0.5).sort((c, F) => F.score - c.score);
    if (!h.length) {
      s = { status: "diff" };
      continue;
    }
    let [k, E] = h;
    if (!t.area && E && E.score >= k.score - 0.1 && Gt(k.r, E.r) > 1500) {
      s = { status: "multi" };
      continue;
    }
    return { status: "ok", r: k.r, engine: d, gErr: m };
  }
  return { ...s, engine: d, gErr: m };
}
var ji = (t) => /auth/i.test(t) ? "구글이 API 키를 거부했어요. 구글 클라우드에서 키의 웹사이트 제한(https://jhp0204.github.io/*)을 확인해 주세요." : /load/i.test(t) ? "구글 지도 기능을 불러오지 못했어요. 회사 등 네트워크에서 차단됐을 수 있어요. 휴대폰 데이터로 다시 해 보세요." : /PERMISSION|not authorized|API_KEY|forbidden|denied|403/i.test(t) ? "Places API (New)가 꺼져 있거나 키에 허용되지 않았어요. 구글 클라우드에서 API 사용 설정과 키의 API 제한을 확인해 주세요." : /RESOURCE_EXHAUSTED|quota|429/i.test(t) ? "오늘 구글 장소 검색 한도에 도달했어요. 내일 다시 해 보세요." : `구글 장소 검색이 실패했어요 (${t.slice(0, 80)})`, yi = {
  none: "검색 결과가 없어요",
  diff: "이름이 확실히 맞는 곳이 없어요",
  multi: "지점이 여러 곳이에요. 동네를 적으면 찾을 수 있어요",
  error: "검색을 못 했어요 (인터넷 연결 확인)"
};
function vi({ targets: t, gkey: n, onApply: o, onClose: i }) {
  let [s, d] = y([]), [m, l] = y(!1), [r, h] = y({}), k = G(!1);
  H(() => {
    let v = !0;
    return (async () => {
      let N = n && !Mt ? 250 : 1100;
      for (let A of t) {
        if (!v || k.current) break;
        let w = await xi(A, n, N);
        if (!v) return;
        d((x) => [...x, { w: A, ...w }]), w.status === "ok" && h((x) => ({ ...x, [A.id]: !0 })), await new Promise((x) => setTimeout(x, N));
      }
      v && l(!0);
    })(), () => {
      v = !1;
    };
  }, []);
  let E = s.filter((v) => v.status === "ok"), c = s.filter((v) => v.status !== "ok"), F = E.filter((v) => r[v.w.id]), f = (s.find((v) => v.gErr) || {}).gErr || "", S = s.some((v) => v.engine === "osm");
  return /* @__PURE__ */ e(Nt, { title: "위치 없는 장소 한 번에 찾기", onClose: i, children: /* @__PURE__ */ a("div", { className: "jt-form", children: [
    m ? /* @__PURE__ */ a("p", { className: "jt-hint jt-geo-sum", children: [
      t.length,
      "곳 중 ",
      /* @__PURE__ */ a("b", { children: [
        E.length,
        "곳"
      ] }),
      "을 찾았어요. 확실하지 않은 ",
      c.length,
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
            k.current = !0, l(!0);
          },
          children: "여기까지만 찾기"
        }
      )
    ] }),
    s.length > 0 && (f || !n && S) && /* @__PURE__ */ a("div", { className: "jt-warn-inline jt-geo-why", children: [
      f ? /* @__PURE__ */ e("b", { children: "구글 장소 검색을 쓰지 못해서 무료 검색(OpenStreetMap)으로 찾았어요." }) : /* @__PURE__ */ e("b", { children: "구글 지도 키가 없어 무료 검색(OpenStreetMap)으로 찾았어요." }),
      /* @__PURE__ */ e("span", { children: f ? ji(f) : "무료 검색은 한국어 이름을 잘 못 찾아요. 설정에 구글 지도 키를 넣으면 훨씬 잘 찾아요." })
    ] }),
    E.length > 0 && /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "찾았어요 (체크한 곳만 저장돼요)" }),
      /* @__PURE__ */ e("ul", { className: "jt-geo-list", children: E.map(({ w: v, r: N }) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("label", { children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: !!r[v.id],
            onChange: (A) => h((w) => ({ ...w, [v.id]: A.target.checked }))
          }
        ),
        /* @__PURE__ */ a("span", { children: [
          /* @__PURE__ */ e("strong", { children: v.name }),
          /* @__PURE__ */ a("em", { children: [
            N.name,
            N.area ? `, ${N.area}` : ""
          ] })
        ] })
      ] }) }, v.id)) })
    ] }),
    c.length > 0 && /* @__PURE__ */ a(V, { children: [
      /* @__PURE__ */ e("h4", { className: "jt-subhead", children: "비워 둔 곳" }),
      /* @__PURE__ */ e("ul", { className: "jt-geo-list miss", children: c.map(({ w: v, status: N, engine: A }) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a("span", { children: [
        /* @__PURE__ */ e("strong", { children: v.name }),
        /* @__PURE__ */ a("em", { children: [
          yi[N],
          A ? A === "google" ? " (구글 검색)" : " (무료 검색)" : ""
        ] })
      ] }) }, v.id)) }),
      /* @__PURE__ */ e("p", { className: "jt-hint", children: '비워 둔 곳은 수정 화면의 "위치 검색"으로 직접 고를 수 있어요.' })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
        disabled: !m || !F.length,
        onClick: () => {
          let v = {};
          F.forEach(({ w: N, r: A }) => {
            v[N.id] = {
              lat: A.lat,
              lng: A.lng,
              ...A.placeId ? { placeId: A.placeId } : {},
              // 구글 검색 링크(share.google 등)는 구글맵 링크로 바꿔 줌
              ...A.link && (!N.link || bi(N.link)) ? { link: A.link } : {},
              ...!N.area && A.area ? { area: A.area.split(" ").slice(0, 3).join(" ") } : {}
            };
          }), o(v);
        },
        children: m ? `선택한 ${F.length}곳에 위치 저장` : "찾는 중"
      }
    )
  ] }) });
}
function pe(t, n) {
  let o = (n || []).find((i) => i.wishId === t.id) || (n || []).find((i) => !i.wishId && i.title === t.name);
  return o ? o.day : null;
}
function za() {
  let [t, n] = y({});
  return [t, (s) => n((d) => ({ ...d, [s]: !d[s] })), (s, d) => n(d ? Object.fromEntries(s.map((m) => [m, !0])) : {})];
}
function Ea({ ids: t, open: n, setAll: o }) {
  if (t.length < 2) return null;
  let i = t.every((s) => n[s]);
  return /* @__PURE__ */ e("div", { className: "jt-foldall", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-ghost sm", onClick: () => o(t, !i), children: [
    i ? /* @__PURE__ */ e(ja, { size: 15 }) : /* @__PURE__ */ e(Ct, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function gn({ count: t, open: n, onClick: o }) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (n ? " open" : ""),
      onClick: (i) => {
        i.stopPropagation(), o();
      },
      "aria-expanded": n,
      children: [
        /* @__PURE__ */ e(Eo, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Fe({ comments: t = [], me: n, members: o, onAdd: i, onDelete: s }) {
  let [d, m] = y(""), l = () => {
    let r = d.trim();
    r && (i(r), m(""));
  };
  return /* @__PURE__ */ a("div", { className: "jt-comments", onClick: (r) => r.stopPropagation(), onKeyDown: (r) => r.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
