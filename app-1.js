// src/main.jsx
import { useState as Tt, useEffect as Gi } from "react";
import { createRoot as qi } from "react-dom/client";

// src/app.jsx
import lo, { useState as y, useEffect as W, useMemo as se, useCallback as co, useRef as J } from "react";
import {
  Plus as po,
  X as Jt,
  Heart as na,
  Trash2 as mo,
  MapPin as It,
  Settings as uo,
  CalendarDays as fo,
  Wallet as go,
  Check as rn,
  ExternalLink as Rt,
  Map as bo,
  MessageSquare as ho,
  Image as xo,
  Link2 as jo,
  Send as sn,
  Pencil as Xt,
  ChevronLeft as ln,
  ChevronRight as cn,
  ChevronDown as kt,
  ChevronUp as pn,
  Users as yo,
  Crosshair as vo,
  HelpCircle as wo,
  MessagesSquare as ko,
  Megaphone as dn,
  Lock as No,
  WifiOff as Co,
  Wifi as zo,
  Pin as Eo,
  PinOff as La,
  Utensils as Ao,
  TrainFront as Mo,
  BedDouble as So,
  Ticket as Fo,
  ShoppingBag as Do,
  MoreHorizontal as Io,
  Sun as Po,
  CloudSun as $o,
  Cloud as _a,
  CloudFog as Ro,
  CloudDrizzle as To,
  CloudRain as Bo,
  CloudSnow as Lo,
  CloudLightning as _o,
  Umbrella as Oo,
  SmilePlus as Uo,
  LocateFixed as Ko,
  Star as Wo,
  Navigation as Ct
} from "lucide-react";

// src/store.js
import { initializeApp as Qn } from "firebase/app";
import {
  initializeFirestore as Aa,
  persistentLocalCache as to,
  persistentMultipleTabManager as eo,
  collection as ao,
  doc as _e,
  onSnapshot as no,
  setDoc as Fa,
  getDoc as oo,
  deleteDoc as io
} from "firebase/firestore";
var ee = "fjt:", vt = { config: null, code: null }, We = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), ro = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function He(e) {
  try {
    let a = String(e || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, i = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!i) return null;
    let r = ro(i);
    return r && r.c && r.t ? r : null;
  } catch {
    return null;
  }
}
function Da() {
  let e = He(location.hash);
  if (e)
    return localStorage.setItem(ee + "conn", JSON.stringify(e)), e;
  try {
    let a = JSON.parse(localStorage.getItem(ee + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + We(a)), a;
  } catch {
  }
  return null;
}
function Ia(e, a) {
  let n = { c: e, t: a };
  return localStorage.setItem(ee + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + We(n)), n;
}
var Pa = () => location.origin + location.pathname + "#j=" + We({ c: vt.config, t: vt.code });
function $a() {
  localStorage.removeItem(ee + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var Ra = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => e[n % e.length]).join("");
};
function Ta(e) {
  let a = String(e || "");
  try {
    let i = JSON.parse(a);
    if (i.apiKey && i.projectId && i.appId) return i;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((i) => {
    let r = a.match(new RegExp(i + `\\s*[:=]\\s*["']([^"']+)["']`));
    r && (n[i] = r[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var _t = null, yt = /* @__PURE__ */ new Map(), Oe = /* @__PURE__ */ new Set(), Ue = Promise.resolve(), Re = null, je = !1, Ma = null, Te = () => {
  clearTimeout(Ma), Ma = setTimeout(() => Oe.forEach((e) => e()), 250);
}, Ke = (e) => e.startsWith("trip:photo:"), Be = (e) => Ke(e) ? _e(_t, "trips", vt.code, "photos", e.slice(11)) : _e(_t, "trips", vt.code, "data", e), Le = (e) => ee + vt.code + ":" + e, Sa = (e) => Promise.race([e.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function Ye(e, a) {
  Re && Re(), yt.clear(), vt.config = e, vt.code = a;
  let n = Qn(e, "fjt-" + Date.now());
  try {
    _t = Aa(n, { localCache: to({ tabManager: eo() }) });
  } catch {
    _t = Aa(n, {});
  }
  let i;
  je = !1, Ue = new Promise((g) => i = g), setTimeout(() => i(), 8e3);
  let r = !0;
  Re = no(
    ao(_t, "trips", a, "data"),
    { includeMetadataChanges: !0 },
    (g) => {
      let u = g.docChanges();
      u.forEach((l) => {
        l.type === "removed" ? yt.delete(l.doc.id) : yt.set(l.doc.id, l.doc.data().v);
      });
      let p = !g.metadata.fromCache;
      (p || g.size > 0) && i(), p && !je ? (je = !0, Te()) : !r && u.length && Te(), r = !1;
    },
    () => {
      i(), Te();
    }
  ), window.storage = so;
}
async function Ba() {
  let e = _e(_t, "trips", vt.code, "data", "_ping");
  await Promise.race([
    Fa(e, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var so = {
  async get(e, a) {
    if (!a) {
      let n = localStorage.getItem(Le(e));
      if (n == null) throw new Error("not found");
      return { key: e, value: n, shared: !1 };
    }
    if (Ke(e)) {
      let n = await oo(Be(e));
      if (!n.exists()) throw new Error("not found");
      return { key: e, value: n.data().v, shared: !0 };
    }
    if (await Ue, !yt.has(e)) throw new Error("not found");
    return { key: e, value: yt.get(e), shared: !0 };
  },
  async set(e, a, n) {
    return n ? (Ke(e) || yt.set(e, a), await Sa(Fa(Be(e), { v: a, t: Date.now() })), { key: e, value: a, shared: !0 }) : (localStorage.setItem(Le(e), a), { key: e, value: a, shared: !1 });
  },
  async delete(e, a) {
    return a ? (yt.delete(e), await Sa(io(Be(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(Le(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", a) {
    return a ? (await Ue, { keys: [...yt.keys()].filter((n) => n.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
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
import { Fragment as rt, jsx as t, jsxs as o } from "react/jsx-runtime";
var G = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice", board: "trip:board" }, oa = (e) => "trip:photo:" + e, ae = 6, q = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], Ho = ["일", "월", "화", "수", "목", "금", "토"], ia = ["맛집", "관광", "쇼핑", "기타"], mn = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Wt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Oa = {
  식비: { Icon: Ao, color: "#D9262E" },
  교통: { Icon: Mo, color: "#0C86AE" },
  숙소: { Icon: So, color: "#7B5FC4" },
  체험: { Icon: Fo, color: "#E8800A" },
  쇼핑: { Icon: Do, color: "#0A9B6E" },
  기타: { Icon: Io, color: "#66718A" }
}, Qe = (e) => Oa[e] || Oa.기타, xt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ct = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Mt = (e) => {
  let [a, n, i] = e.split("-").map(Number);
  return new Date(a, n - 1, i);
}, mt = (e, a) => {
  let n = Mt(e);
  return n.setDate(n.getDate() + a), n;
}, Pt = (e) => `${e.getMonth() + 1}/${e.getDate()}`, zt = (e) => Ho[e.getDay()], Ft = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), Ht = (e, a) => "₩" + (Math.round(e * a / 100 / 100) * 100).toLocaleString("ko-KR"), un = 900, nt = (e) => `${Ft(e)}(${Ht(e, un)})`, at = (e) => String(e).padStart(2, "0"), ke = (e) => {
  let a = (Date.now() - e) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(e);
  return `${n.getMonth() + 1}/${n.getDate()} ${at(n.getHours())}:${at(n.getMinutes())}`;
}, Ua = (e) => {
  let a = (e || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, Yo = (e) => {
  try {
    return new URL(e).hostname.replace(/^www\./, "");
  } catch {
    return e;
  }
}, Dt = (e) => {
  let [a, n] = String(e).split(":").map(Number);
  return a * 60 + (n || 0);
}, Ut = (e) => `${at(Math.floor(e / 60) % 24)}:${at(e % 60)}`, ce = (e) => {
  let a = Dt(e.time), n = e.end ? Dt(e.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, fn = (e) => {
  let a = Math.floor(e / 60), n = e % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function Jo(e) {
  let a = e || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${at(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let i = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${at(Number(n[2]))}:${at(i)}`;
}
var Xo = Array.from({ length: 24 }, (e, a) => at(a));
function Ka({ value: e, onChange: a, disabled: n, label: i }) {
  let [r, g] = e ? e.split(":") : ["", ""], u = Array.from({ length: 12 }, (p, l) => at(l * 5));
  return g && !u.includes(g) && (u = [...u, g].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 시",
        value: r,
        disabled: n,
        onChange: (p) => a(p.target.value ? `${p.target.value}:${g || "00"}` : ""),
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "--" }),
          Xo.map((p) => /* @__PURE__ */ t("option", { value: p, children: p }, p))
        ]
      }
    ),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 분",
        value: g,
        disabled: n || !r,
        onChange: (p) => a(`${r}:${p.target.value}`),
        children: [
          !r && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          u.map((p) => /* @__PURE__ */ t("option", { value: p, children: p }, p))
        ]
      }
    )
  ] });
}
var Vo = (e) => {
  let a = e.filter((i) => i.time).map((i) => ({ id: i.id, ...ce(i) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (i) => a.forEach((r) => {
      i.id !== r.id && i.s < r.e && r.s < i.e && n.add(i.id);
    })
  ), n;
}, Ne = (e) => ut(e) ? `${e.lat},${e.lng}` : e.place ? ra(e.place) : "", Go = (e, a) => {
  let n = e ? Ne(e) : "", i = Ne(a);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (n ? "&origin=" + encodeURIComponent(n) : "");
}, ze = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(ut(e) ? `${e.lat},${e.lng}` : ra(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), ra = (...e) => [...e, "일본"].filter(Boolean).join(" "), ut = (e) => typeof e.lat == "number" && typeof e.lng == "number", gn = (e) => ut(e) ? `${e.lat},${e.lng}` : ra(e.name || e.title, e.area || e.place), $t = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(gn(e)), qo = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(gn(e)), wt = 256, Je = (e, a, n) => {
  let i = wt * 2 ** n, r = e * Math.PI / 180;
  return {
    x: (a + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * i
  };
}, Wa = (e, a, n) => {
  let i = wt * 2 ** n, r = Math.PI - 2 * Math.PI * a / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(r)), lng: e / i * 360 - 180 };
}, ne = (e) => Math.max(3, Math.min(18, e));
async function Xe(e) {
  let a = await window.storage.list(e, !0), n = (a && a.keys || []).map((r) => typeof r == "string" ? r : r.key).filter(Boolean), i = await Promise.all(n.map((r) => bt(r, null)));
  return n.map((r, g) => [r, i[g]]).filter(([, r]) => r);
}
async function bt(e, a) {
  try {
    let n = await window.storage.get(e, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function gt(e, a) {
  try {
    return !!await window.storage.set(e, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var Nt = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Map();
function Zo(e) {
  if (Nt.has(e)) return Promise.resolve(Nt.get(e));
  if (ye.has(e)) return ye.get(e);
  let a = bt(oa(e), null).then((n) => (ye.delete(e), n && Nt.set(e, n), n));
  return ye.set(e, a), a;
}
async function Ha(e) {
  Nt.delete(e);
  try {
    await window.storage.delete(oa(e), !0);
  } catch {
  }
}
var Qo = (e) => new Promise((a, n) => {
  let i = URL.createObjectURL(e), r = new Image();
  r.onload = () => {
    URL.revokeObjectURL(i), a(r);
  }, r.onerror = () => {
    URL.revokeObjectURL(i), n(new Error("bad image"));
  }, r.src = i;
});
async function ti(e) {
  let a = await Qo(e), n = 1280, i = 0.7, r = "";
  for (let g = 0; g < 5; g++) {
    let u = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), p = document.createElement("canvas");
    p.width = Math.max(1, Math.round(a.naturalWidth * u)), p.height = Math.max(1, Math.round(a.naturalHeight * u));
    let l = p.getContext("2d");
    if (l.fillStyle = "#fff", l.fillRect(0, 0, p.width, p.height), l.drawImage(a, 0, 0, p.width, p.height), r = p.toDataURL("image/jpeg", i), r.length < 6e5) break;
    n = Math.round(n * 0.8), i = Math.max(0.4, i - 0.08);
  }
  return r;
}
var ei = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: ct(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function ai() {
  for (let [e, a] of ei)
    try {
      let n = await fetch(e);
      if (!n.ok) continue;
      let i = a(await n.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var Ya = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Ce = (e) => e.fx ? `100엔 = ₩${Ya(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${Ya(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Ja(e, a) {
  let n = () => Object.fromEntries(a.map((d) => [d, 0])), i = n(), r = n(), g = [];
  e.forEach((d) => {
    let A = Number(d.amount) || 0, h = (d.split || []).filter((z) => a.includes(z));
    if (!(A <= 0)) {
      if (!h.length || !a.includes(d.payer)) {
        g.push(d);
        return;
      }
      i[d.payer] += A, h.forEach((z) => r[z] += A / h.length);
    }
  });
  let u = Object.fromEntries(a.map((d) => [d, i[d] - r[d]])), p = a.filter((d) => u[d] > 0.5).map((d) => ({ m: d, v: u[d] })).sort((d, A) => A.v - d.v), l = a.filter((d) => u[d] < -0.5).map((d) => ({ m: d, v: -u[d] })).sort((d, A) => A.v - d.v), x = [], w = 0, N = 0;
  for (; w < l.length && N < p.length; ) {
    let d = Math.min(l[w].v, p[N].v);
    d >= 1 && x.push({ from: l[w].m, to: p[N].m, v: Math.round(d) }), l[w].v -= d, p[N].v -= d, l[w].v < 0.5 && w++, p[N].v < 0.5 && N++;
  }
  return { paid: i, share: r, net: u, moves: x, skipped: g };
}
function lt({ name: e, members: a, size: n = 28 }) {
  let i = Math.max(0, a.indexOf(e));
  return /* @__PURE__ */ t(
    "span",
    {
      className: "jt-avatar",
      style: { width: n, height: n, background: q[(i * 2 + 3) % q.length], fontSize: n * 0.46 },
      "aria-hidden": "true",
      children: e ? e[0] : "?"
    }
  );
}
function st({ label: e, children: a }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ t("span", { children: e }),
    a
  ] });
}
function St({ title: e, onClose: a, children: n }) {
  return W(() => {
    let i = (r) => r.key === "Escape" && a();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ t(Jt, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function Et({ onConfirm: e, label: a = "삭제" }) {
  let [n, i] = y(!1);
  return W(() => {
    if (!n) return;
    let r = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(r);
  }, [n]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (r) => {
        r.stopPropagation(), n ? e() : i(!0);
      },
      children: [
        /* @__PURE__ */ t(mo, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
var Xa = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function bn(e) {
  let a = {};
  return Object.entries(e.reactions || {}).forEach(([n, i]) => a[n] = [...i]), a;
}
function ni(e, a, n) {
  let i = bn(e), r = (i[a] || []).includes(n), g = {};
  return Object.entries(i).forEach(([u, p]) => {
    let l = p.filter((x) => x !== n);
    l.length && (g[u] = l);
  }), r || (g[a] = [...g[a] || [], n]), { ...e, reactions: g };
}
function sa({ className: e, onTap: a, names: n = [], title: i, members: r = [], children: g, ...u }) {
  let [p, l] = y(!1), [x, w] = y("up left"), N = J(null), d = J(null), A = J(!1);
  W(() => {
    if (!p) return;
    let v = (M) => N.current && !N.current.contains(M.target) && l(!1);
    return document.addEventListener("pointerdown", v), () => document.removeEventListener("pointerdown", v);
  }, [p]), W(() => () => clearTimeout(d.current), []);
  let h = () => {
    if (N.current) {
      let v = N.current.getBoundingClientRect();
      w((v.top < 200 ? "down" : "up") + " " + (v.left > window.innerWidth - 210 ? "right" : "left"));
    }
    l(!0), navigator.vibrate && navigator.vibrate(15);
  }, z = () => {
    A.current = !1, clearTimeout(d.current), d.current = setTimeout(() => {
      A.current = !0, h();
    }, 450);
  }, C = () => clearTimeout(d.current);
  return /* @__PURE__ */ o("span", { className: "jt-hold", ref: N, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: e + " jt-holdbtn",
        ...u,
        title: n.length ? n.join(", ") : void 0,
        onPointerDown: z,
        onPointerUp: C,
        onPointerLeave: C,
        onPointerCancel: C,
        onContextMenu: (v) => {
          v.preventDefault(), C(), A.current = !0, h();
        },
        onClick: (v) => {
          if (v.stopPropagation(), A.current) {
            A.current = !1;
            return;
          }
          a(v);
        },
        children: g
      }
    ),
    p && /* @__PURE__ */ o("div", { className: "jt-whopop " + x, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ o("strong", { children: [
        i,
        " ",
        n.length,
        "명"
      ] }),
      n.length ? /* @__PURE__ */ t("ul", { children: n.map((v) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(lt, { name: v, members: r.length ? r : n, size: 22 }),
        v
      ] }, v)) }) : /* @__PURE__ */ t("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ee({ item: e, me: a, onReact: n, members: i = [] }) {
  let [r, g] = y(!1), [u, p] = y("up right"), l = J(null), x = bn(e), w = () => {
    if (!r && l.current) {
      let h = l.current.getBoundingClientRect(), C = l.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", v = h.top < 190 ? "down" : "up";
      p(v + " " + C);
    }
    g(!r);
  }, N = Xa.filter(([h]) => (x[h] || []).length), d = Object.keys(x).find((h) => x[h].includes(a));
  W(() => {
    if (!r) return;
    let h = (z) => l.current && !l.current.contains(z.target) && g(!1);
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [r]);
  let A = (h) => {
    n(h), g(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: l,
      onClick: (h) => h.stopPropagation(),
      onKeyDown: (h) => h.stopPropagation(),
      children: [
        N.map(([h, z]) => /* @__PURE__ */ o(
          sa,
          {
            className: "jt-rchip" + (d === h ? " on" : ""),
            onTap: () => A(h),
            names: x[h],
            members: i,
            title: `${h} ${z}`,
            "aria-pressed": d === h,
            "aria-label": `${z} ${x[h].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t("span", { className: "jt-emoji", children: h }),
              x[h].length
            ]
          },
          h
        )),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (r ? " open" : ""),
            onClick: w,
            "aria-expanded": r,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(Uo, { size: 16 })
          }
        ),
        r && /* @__PURE__ */ o("div", { className: "jt-rpop " + u, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: Xa.map(([h, z]) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (d === h ? " on" : ""),
              onClick: () => A(h),
              "aria-label": z,
              title: z,
              children: h
            },
            h
          )) }),
          N.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-rwho", children: N.map(([h]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ t("span", { className: "jt-emoji", children: h }),
            x[h].join(", ")
          ] }, h)) })
        ] })
      ]
    }
  );
}
function oi() {
  let [e, a] = y(null);
  return W(() => {
    if (!navigator.geolocation) return;
    let n = !0, i = () => navigator.geolocation.getCurrentPosition(
      (g) => n && a({ lat: g.coords.latitude, lng: g.coords.longitude }),
      () => {
      },
      { enableHighAccuracy: !1, timeout: 15e3, maximumAge: 6e4 }
    );
    i();
    let r = setInterval(() => document.visibilityState === "visible" && i(), 6e4);
    return () => {
      n = !1, clearInterval(r);
    };
  }, []), e;
}
var Va = (e) => e < 1e3 ? `${Math.round(e / 10) * 10}m` : e < 1e4 ? `${(e / 1e3).toFixed(1)}km` : `${Math.round(e / 1e3)}km`, ii = (e) => e < 1e3 ? "near" : e < 5e3 ? "mid" : "far";
function le(e, a) {
  let n = (a || []).find((i) => i.wishId === e.id) || (a || []).find((i) => !i.wishId && i.title === e.name);
  return n ? n.day : null;
}
function hn() {
  let [e, a] = y({});
  return [e, (r) => a((g) => ({ ...g, [r]: !g[r] })), (r, g) => a(g ? Object.fromEntries(r.map((u) => [u, !0])) : {})];
}
function xn({ ids: e, open: a, setAll: n }) {
  if (e.length < 2) return null;
  let i = e.every((r) => a[r]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-ghost sm", onClick: () => n(e, !i), children: [
    i ? /* @__PURE__ */ t(pn, { size: 15 }) : /* @__PURE__ */ t(kt, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function la({ count: e, open: a, onClick: n }) {
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
        /* @__PURE__ */ t(ho, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function Ae({ comments: e = [], me: a, members: n, onAdd: i, onDelete: r }) {
  let [g, u] = y(""), p = () => {
    let l = g.trim();
    l && (i(l), u(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (l) => l.stopPropagation(), onKeyDown: (l) => l.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((l) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(lt, { name: l.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("strong", { children: l.by }),
          /* @__PURE__ */ t("span", { children: ke(l.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: l.text })
      ] }),
      l.by === a && /* @__PURE__ */ t(Et, { onConfirm: () => r(l.id), label: "" })
    ] }, l.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: g,
          onChange: (l) => u(l.target.value),
          onKeyDown: (l) => l.key === "Enter" && !l.nativeEvent.isComposing && p(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: p, disabled: !g.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(sn, { size: 18 }) })
    ] })
  ] });
}
function ri({ initial: e, onSave: a, onCancel: n }) {
  let [i, r] = y(e?.title || "가족 일본여행"), [g, u] = y(e?.start || ct(new Date(Date.now() + 30 * 864e5))), [p, l] = y(e?.days || 4), [x, w] = y(e?.members || []), [N, d] = y(e?.rate || 900), [A, h] = y(e?.gmapsKey || ""), [z, C] = y("locked"), v = J(null), M = (S) => S ? S.length > 10 ? S.slice(0, 4) + "••••••••" + S.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [c, s] = y(""), E = () => {
    let S = c.trim();
    !S || x.includes(S) || (w([...x, S]), s(""));
  }, k = i.trim() && g && x.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    n && /* @__PURE__ */ t(jn, { onBack: n }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(st, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (S) => r(S.target.value) }) }),
      /* @__PURE__ */ t(st, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: g, onChange: (S) => u(S.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => l(Math.max(1, p - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            p,
            "일"
          ] }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => l(Math.min(30, p + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((S) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ t(lt, { name: S, members: x, size: 20 }),
          S,
          /* @__PURE__ */ t("button", { type: "button", onClick: () => w(x.filter((m) => m !== S)), "aria-label": `${S} 빼기`, children: /* @__PURE__ */ t(Jt, { size: 14 }) })
        ] }, S)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: c,
              onChange: (S) => s(S.target.value),
              onKeyDown: (S) => S.key === "Enter" && E(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: E, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(st, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: N, onChange: (S) => d(Number(S.target.value) || 0) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "구글 지도 API 키 (선택)" }),
        z === "edit" ? /* @__PURE__ */ t(
          "input",
          {
            ref: v,
            value: A,
            onChange: (S) => h(S.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ o("div", { className: "jt-keylock", children: [
