// src/main.jsx
import { useState as Lt, useEffect as os } from "react";
import { createRoot as is } from "react-dom/client";

// src/app.jsx
import mo, { useState as j, useEffect as K, useMemo as le, useCallback as uo, useRef as J } from "react";
import {
  Plus as fo,
  X as Gt,
  Heart as oa,
  Trash2 as go,
  MapPin as Et,
  Settings as ho,
  CalendarDays as bo,
  Wallet as xo,
  Check as cn,
  ExternalLink as Bt,
  Map as jo,
  MessageSquare as yo,
  Image as vo,
  Link2 as wo,
  Send as pn,
  Pencil as Xt,
  ChevronLeft as dn,
  ChevronRight as mn,
  ChevronDown as Ct,
  ChevronUp as un,
  Users as ko,
  Crosshair as No,
  HelpCircle as Co,
  MessagesSquare as zo,
  Megaphone as fn,
  Lock as Eo,
  WifiOff as Ao,
  Wifi as Mo,
  Pin as So,
  PinOff as _a,
  Utensils as Io,
  TrainFront as Fo,
  BedDouble as Do,
  Ticket as Po,
  ShoppingBag as $o,
  MoreHorizontal as Ro,
  Sun as To,
  CloudSun as Bo,
  Cloud as Oa,
  CloudFog as Lo,
  CloudDrizzle as _o,
  CloudRain as Oo,
  CloudSnow as Uo,
  CloudLightning as Ko,
  Umbrella as Wo,
  SmilePlus as Ho,
  LocateFixed as Yo,
  Star as Jo,
  Navigation as At
} from "lucide-react";

// src/store.js
import { initializeApp as ao } from "firebase/app";
import {
  initializeFirestore as Ma,
  persistentLocalCache as no,
  persistentMultipleTabManager as oo,
  collection as io,
  doc as Oe,
  onSnapshot as so,
  setDoc as Fa,
  getDoc as ro,
  deleteDoc as lo
} from "firebase/firestore";
var ae = "fjt:", wt = { config: null, code: null }, He = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), co = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function Ye(e) {
  try {
    let a = String(e || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, i = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!i) return null;
    let s = co(i);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function Da() {
  let e = Ye(location.hash);
  if (e)
    return localStorage.setItem(ae + "conn", JSON.stringify(e)), e;
  try {
    let a = JSON.parse(localStorage.getItem(ae + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + He(a)), a;
  } catch {
  }
  return null;
}
function Pa(e, a) {
  let n = { c: e, t: a };
  return localStorage.setItem(ae + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + He(n)), n;
}
var $a = () => location.origin + location.pathname + "#j=" + He({ c: wt.config, t: wt.code });
function Ra() {
  localStorage.removeItem(ae + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var Ta = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => e[n % e.length]).join("");
};
function Ba(e) {
  let a = String(e || "");
  try {
    let i = JSON.parse(a);
    if (i.apiKey && i.projectId && i.appId) return i;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((i) => {
    let s = a.match(new RegExp(i + `\\s*[:=]\\s*["']([^"']+)["']`));
    s && (n[i] = s[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var Ot = null, vt = /* @__PURE__ */ new Map(), Ue = /* @__PURE__ */ new Set(), Ke = Promise.resolve(), Te = null, je = !1, Sa = null, Be = () => {
  clearTimeout(Sa), Sa = setTimeout(() => Ue.forEach((e) => e()), 250);
}, We = (e) => e.startsWith("trip:photo:"), Le = (e) => We(e) ? Oe(Ot, "trips", wt.code, "photos", e.slice(11)) : Oe(Ot, "trips", wt.code, "data", e), _e = (e) => ae + wt.code + ":" + e, Ia = (e) => Promise.race([e.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function Je(e, a) {
  Te && Te(), vt.clear(), wt.config = e, wt.code = a;
  let n = ao(e, "fjt-" + Date.now());
  try {
    Ot = Ma(n, { localCache: no({ tabManager: oo() }) });
  } catch {
    Ot = Ma(n, {});
  }
  let i;
  je = !1, Ke = new Promise((g) => i = g), setTimeout(() => i(), 8e3);
  let s = !0;
  Te = so(
    io(Ot, "trips", a, "data"),
    { includeMetadataChanges: !0 },
    (g) => {
      let d = g.docChanges();
      d.forEach((r) => {
        r.type === "removed" ? vt.delete(r.doc.id) : vt.set(r.doc.id, r.doc.data().v);
      });
      let c = !g.metadata.fromCache;
      (c || g.size > 0) && i(), c && !je ? (je = !0, Be()) : !s && d.length && Be(), s = !1;
    },
    () => {
      i(), Be();
    }
  ), window.storage = po;
}
async function La() {
  let e = Oe(Ot, "trips", wt.code, "data", "_ping");
  await Promise.race([
    Fa(e, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var po = {
  async get(e, a) {
    if (!a) {
      let n = localStorage.getItem(_e(e));
      if (n == null) throw new Error("not found");
      return { key: e, value: n, shared: !1 };
    }
    if (We(e)) {
      let n = await ro(Le(e));
      if (!n.exists()) throw new Error("not found");
      return { key: e, value: n.data().v, shared: !0 };
    }
    if (await Ke, !vt.has(e)) throw new Error("not found");
    return { key: e, value: vt.get(e), shared: !0 };
  },
  async set(e, a, n) {
    return n ? (We(e) || vt.set(e, a), await Ia(Fa(Le(e), { v: a, t: Date.now() })), { key: e, value: a, shared: !0 }) : (localStorage.setItem(_e(e), a), { key: e, value: a, shared: !1 });
  },
  async delete(e, a) {
    return a ? (vt.delete(e), await Ia(lo(Le(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(_e(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", a) {
    return a ? (await Ke, { keys: [...vt.keys()].filter((n) => n.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
  },
  // 서버와 한 번이라도 맞춰졌는지 (처음 연 기기에서 빈 화면을 "여행 없음"으로 착각하지 않게)
  isSynced() {
    return je;
  },
  onChange(e) {
    return Ue.add(e), () => Ue.delete(e);
  }
};

// src/app.jsx
import { Fragment as st, jsx as t, jsxs as o } from "react/jsx-runtime";
var X = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice", board: "trip:board" }, ia = (e) => "trip:photo:" + e, ne = 6, q = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], Go = ["일", "월", "화", "수", "목", "금", "토"], sa = ["맛집", "관광", "쇼핑", "기타"], gn = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Ht = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Ua = {
  식비: { Icon: Io, color: "#D9262E" },
  교통: { Icon: Fo, color: "#0C86AE" },
  숙소: { Icon: Do, color: "#7B5FC4" },
  체험: { Icon: Po, color: "#E8800A" },
  쇼핑: { Icon: $o, color: "#0A9B6E" },
  기타: { Icon: Ro, color: "#66718A" }
}, ta = (e) => Ua[e] || Ua.기타, yt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), dt = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Ft = (e) => {
  let [a, n, i] = e.split("-").map(Number);
  return new Date(a, n - 1, i);
}, ft = (e, a) => {
  let n = Ft(e);
  return n.setDate(n.getDate() + a), n;
}, $t = (e) => `${e.getMonth() + 1}/${e.getDate()}`, Mt = (e) => Go[e.getDay()], Dt = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), Yt = (e, a) => "₩" + (Math.round(e * a / 100 / 100) * 100).toLocaleString("ko-KR"), hn = 900, it = (e) => `${Dt(e)}(${Yt(e, hn)})`, ot = (e) => String(e).padStart(2, "0"), ke = (e) => {
  let a = (Date.now() - e) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(e);
  return `${n.getMonth() + 1}/${n.getDate()} ${ot(n.getHours())}:${ot(n.getMinutes())}`;
}, Ka = (e) => {
  let a = (e || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, Xo = (e) => {
  try {
    return new URL(e).hostname.replace(/^www\./, "");
  } catch {
    return e;
  }
}, Pt = (e) => {
  let [a, n] = String(e).split(":").map(Number);
  return a * 60 + (n || 0);
}, Kt = (e) => `${ot(Math.floor(e / 60) % 24)}:${ot(e % 60)}`, pe = (e) => {
  let a = Pt(e.time), n = e.end ? Pt(e.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, bn = (e) => {
  let a = Math.floor(e / 60), n = e % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function Vo(e) {
  let a = e || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${ot(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let i = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${ot(Number(n[2]))}:${ot(i)}`;
}
var qo = Array.from({ length: 24 }, (e, a) => ot(a));
function Wa({ value: e, onChange: a, disabled: n, label: i }) {
  let [s, g] = e ? e.split(":") : ["", ""], d = Array.from({ length: 12 }, (c, r) => ot(r * 5));
  return g && !d.includes(g) && (d = [...d, g].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 시",
        value: s,
        disabled: n,
        onChange: (c) => a(c.target.value ? `${c.target.value}:${g || "00"}` : ""),
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "--" }),
          qo.map((c) => /* @__PURE__ */ t("option", { value: c, children: c }, c))
        ]
      }
    ),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 분",
        value: g,
        disabled: n || !s,
        onChange: (c) => a(`${s}:${c.target.value}`),
        children: [
          !s && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          d.map((c) => /* @__PURE__ */ t("option", { value: c, children: c }, c))
        ]
      }
    )
  ] });
}
var Zo = (e) => {
  let a = e.filter((i) => i.time).map((i) => ({ id: i.id, ...pe(i) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (i) => a.forEach((s) => {
      i.id !== s.id && i.s < s.e && s.s < i.e && n.add(i.id);
    })
  ), n;
}, Ne = (e) => at(e) ? `${e.lat},${e.lng}` : e.place ? ra(e.place) : "", Qo = (e, a) => {
  let n = e ? Ne(e) : "", i = Ne(a);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (n ? "&origin=" + encodeURIComponent(n) : "");
}, ze = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(at(e) ? `${e.lat},${e.lng}` : ra(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), ra = (...e) => [...e, "일본"].filter(Boolean).join(" "), at = (e) => typeof e.lat == "number" && typeof e.lng == "number", xn = (e) => at(e) ? `${e.lat},${e.lng}` : ra(e.name || e.title, e.area || e.place), Rt = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(xn(e)), ti = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(xn(e)), kt = 256, Ge = (e, a, n) => {
  let i = kt * 2 ** n, s = e * Math.PI / 180;
  return {
    x: (a + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * i
  };
}, Ha = (e, a, n) => {
  let i = kt * 2 ** n, s = Math.PI - 2 * Math.PI * a / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: e / i * 360 - 180 };
}, oe = (e) => Math.max(3, Math.min(18, e));
async function Xe(e) {
  let a = await window.storage.list(e, !0), n = (a && a.keys || []).map((s) => typeof s == "string" ? s : s.key).filter(Boolean), i = await Promise.all(n.map((s) => bt(s, null)));
  return n.map((s, g) => [s, i[g]]).filter(([, s]) => s);
}
async function bt(e, a) {
  try {
    let n = await window.storage.get(e, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function ht(e, a) {
  try {
    return !!await window.storage.set(e, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var zt = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Map();
function ei(e) {
  if (zt.has(e)) return Promise.resolve(zt.get(e));
  if (ye.has(e)) return ye.get(e);
  let a = bt(ia(e), null).then((n) => (ye.delete(e), n && zt.set(e, n), n));
  return ye.set(e, a), a;
}
async function Ya(e) {
  zt.delete(e);
  try {
    await window.storage.delete(ia(e), !0);
  } catch {
  }
}
var ai = (e) => new Promise((a, n) => {
  let i = URL.createObjectURL(e), s = new Image();
  s.onload = () => {
    URL.revokeObjectURL(i), a(s);
  }, s.onerror = () => {
    URL.revokeObjectURL(i), n(new Error("bad image"));
  }, s.src = i;
});
async function ni(e) {
  let a = await ai(e), n = 1280, i = 0.7, s = "";
  for (let g = 0; g < 5; g++) {
    let d = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(a.naturalWidth * d)), c.height = Math.max(1, Math.round(a.naturalHeight * d));
    let r = c.getContext("2d");
    if (r.fillStyle = "#fff", r.fillRect(0, 0, c.width, c.height), r.drawImage(a, 0, 0, c.width, c.height), s = c.toDataURL("image/jpeg", i), s.length < 6e5) break;
    n = Math.round(n * 0.8), i = Math.max(0.4, i - 0.08);
  }
  return s;
}
var oi = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: dt(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function ii() {
  for (let [e, a] of oi)
    try {
      let n = await fetch(e);
      if (!n.ok) continue;
      let i = a(await n.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var Ja = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Ce = (e) => e.fx ? `100엔 = ₩${Ja(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${Ja(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Ga(e, a) {
  let n = () => Object.fromEntries(a.map((u) => [u, 0])), i = n(), s = n(), g = [];
  e.forEach((u) => {
    let I = Number(u.amount) || 0, p = (u.split || []).filter((k) => a.includes(k));
    if (!(I <= 0)) {
      if (!p.length || !a.includes(u.payer)) {
        g.push(u);
        return;
      }
      i[u.payer] += I, p.forEach((k) => s[k] += I / p.length);
    }
  });
  let d = Object.fromEntries(a.map((u) => [u, i[u] - s[u]])), c = a.filter((u) => d[u] > 0.5).map((u) => ({ m: u, v: d[u] })).sort((u, I) => I.v - u.v), r = a.filter((u) => d[u] < -0.5).map((u) => ({ m: u, v: -d[u] })).sort((u, I) => I.v - u.v), x = [], N = 0, E = 0;
  for (; N < r.length && E < c.length; ) {
    let u = Math.min(r[N].v, c[E].v);
    u >= 1 && x.push({ from: r[N].m, to: c[E].m, v: Math.round(u) }), r[N].v -= u, c[E].v -= u, r[N].v < 0.5 && N++, c[E].v < 0.5 && E++;
  }
  return { paid: i, share: s, net: d, moves: x, skipped: g };
}
function pt({ name: e, members: a, size: n = 28 }) {
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
function mt({ label: e, children: a }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ t("span", { children: e }),
    a
  ] });
}
function Nt({ title: e, onClose: a, children: n }) {
  return K(() => {
    let i = (s) => s.key === "Escape" && a();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ t(Gt, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function St({ onConfirm: e, label: a = "삭제" }) {
  let [n, i] = j(!1);
  return K(() => {
    if (!n) return;
    let s = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(s);
  }, [n]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (s) => {
        s.stopPropagation(), n ? e() : i(!0);
      },
      children: [
        /* @__PURE__ */ t(go, { size: 15 }),
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
function jn(e) {
  let a = {};
  return Object.entries(e.reactions || {}).forEach(([n, i]) => a[n] = [...i]), a;
}
function si(e, a, n) {
  let i = jn(e), s = (i[a] || []).includes(n), g = {};
  return Object.entries(i).forEach(([d, c]) => {
    let r = c.filter((x) => x !== n);
    r.length && (g[d] = r);
  }), s || (g[a] = [...g[a] || [], n]), { ...e, reactions: g };
}
function la({ className: e, onTap: a, names: n = [], title: i, members: s = [], children: g, ...d }) {
  let [c, r] = j(!1), [x, N] = j("up left"), E = J(null), u = J(null), I = J(!1);
  K(() => {
    if (!c) return;
    let v = (M) => E.current && !E.current.contains(M.target) && r(!1);
    return document.addEventListener("pointerdown", v), () => document.removeEventListener("pointerdown", v);
  }, [c]), K(() => () => clearTimeout(u.current), []);
  let p = () => {
    if (E.current) {
      let v = E.current.getBoundingClientRect();
      N((v.top < 200 ? "down" : "up") + " " + (v.left > window.innerWidth - 210 ? "right" : "left"));
    }
    r(!0), navigator.vibrate && navigator.vibrate(15);
  }, k = () => {
    I.current = !1, clearTimeout(u.current), u.current = setTimeout(() => {
      I.current = !0, p();
    }, 450);
  }, w = () => clearTimeout(u.current);
  return /* @__PURE__ */ o("span", { className: "jt-hold", ref: E, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: e + " jt-holdbtn",
        ...d,
        title: n.length ? n.join(", ") : void 0,
        onPointerDown: k,
        onPointerUp: w,
        onPointerLeave: w,
        onPointerCancel: w,
        onContextMenu: (v) => {
          v.preventDefault(), w(), I.current = !0, p();
        },
        onClick: (v) => {
          if (v.stopPropagation(), I.current) {
            I.current = !1;
            return;
          }
          a(v);
        },
        children: g
      }
    ),
    c && /* @__PURE__ */ o("div", { className: "jt-whopop " + x, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ o("strong", { children: [
        i,
        " ",
        n.length,
        "명"
      ] }),
      n.length ? /* @__PURE__ */ t("ul", { children: n.map((v) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(pt, { name: v, members: s.length ? s : n, size: 22 }),
        v
      ] }, v)) }) : /* @__PURE__ */ t("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ee({ item: e, me: a, onReact: n, members: i = [] }) {
  let [s, g] = j(!1), [d, c] = j("up right"), r = J(null), x = jn(e), N = () => {
    if (!s && r.current) {
      let p = r.current.getBoundingClientRect(), w = r.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", v = p.top < 190 ? "down" : "up";
      c(v + " " + w);
    }
    g(!s);
  }, E = Xa.filter(([p]) => (x[p] || []).length), u = Object.keys(x).find((p) => x[p].includes(a));
  K(() => {
    if (!s) return;
    let p = (k) => r.current && !r.current.contains(k.target) && g(!1);
    return document.addEventListener("pointerdown", p), () => document.removeEventListener("pointerdown", p);
  }, [s]);
  let I = (p) => {
    n(p), g(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: r,
      onClick: (p) => p.stopPropagation(),
      onKeyDown: (p) => p.stopPropagation(),
      children: [
        E.map(([p, k]) => /* @__PURE__ */ o(
          la,
          {
            className: "jt-rchip" + (u === p ? " on" : ""),
            onTap: () => I(p),
            names: x[p],
            members: i,
            title: `${p} ${k}`,
            "aria-pressed": u === p,
            "aria-label": `${k} ${x[p].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t("span", { className: "jt-emoji", children: p }),
              x[p].length
            ]
          },
          p
        )),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (s ? " open" : ""),
            onClick: N,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(Ho, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ o("div", { className: "jt-rpop " + d, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: Xa.map(([p, k]) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (u === p ? " on" : ""),
              onClick: () => I(p),
              "aria-label": k,
              title: k,
              children: p
            },
            p
          )) }),
          E.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-rwho", children: E.map(([p]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ t("span", { className: "jt-emoji", children: p }),
            x[p].join(", ")
          ] }, p)) })
        ] })
      ]
    }
  );
}
function ri() {
  let [e, a] = j(null), [n, i] = j("");
  return K(() => {
    if (!navigator.geolocation) {
      i("fail");
      return;
    }
    let s = !0, g = () => navigator.geolocation.getCurrentPosition(
      (c) => {
        s && (a({ lat: c.coords.latitude, lng: c.coords.longitude }), i(""));
      },
      (c) => s && i(c && c.code === 1 ? "denied" : "fail"),
      { enableHighAccuracy: !1, timeout: 15e3, maximumAge: 6e4 }
    );
    g();
    let d = setInterval(() => document.visibilityState === "visible" && g(), 6e4);
    return () => {
      s = !1, clearInterval(d);
    };
  }, []), [e, n];
}
var Va = (e) => e < 1e3 ? `${Math.round(e / 10) * 10}m` : e < 1e4 ? `${(e / 1e3).toFixed(1)}km` : `${Math.round(e / 1e3)}km`, li = (e) => e < 1e3 ? "near" : e < 5e3 ? "mid" : "far", qa = (e) => String(e || "").toLowerCase().replace(/[\s·・,.\-()（）'"!?&/]/g, "").replace(/(본점|지점|점|店)$/, "");
function Za(e, a) {
  if (e = qa(e), a = qa(a), !e || !a) return 0;
  if (e.includes(a) || a.includes(e)) return 1;
  let n = (c) => {
    let r = /* @__PURE__ */ new Map();
    for (let x = 0; x < c.length - 1; x++) r.set(c.slice(x, x + 2), (r.get(c.slice(x, x + 2)) || 0) + 1);
    return r;
  }, i = n(e), s = n(a), g = 0;
  i.forEach((c, r) => s.has(r) && (g += Math.min(c, s.get(r))));
  let d = e.length - 1 + (a.length - 1);
  return d > 0 ? 2 * g / d : 0;
}
var ci = (e) => e.lat > 24 && e.lat < 46 && e.lng > 122 && e.lng < 154, pi = (e) => /^https?:\/\/(share\.google|g\.co\/kgs|(www\.)?google\.[a-z.]+\/search)/i.test(String(e || ""));
async function di(e, a) {
  let n;
  try {
    n = await Me([e.name, e.area].filter(Boolean).join(" "), a);
  } catch {
    return { status: "error" };
  }
  let i = (n || []).filter(ci).map((d) => ({ r: d, score: Math.max(Za(e.name, d.name), Za(e.name, `${d.name} ${d.area}`)) })).filter((d) => d.score >= 0.5).sort((d, c) => c.score - d.score);
  if (!n || !n.length) return { status: "none" };
  if (!i.length) return { status: "diff" };
  let [s, g] = i;
  return !e.area && g && g.score >= s.score - 0.1 && Jt(s.r, g.r) > 1500 ? { status: "multi" } : { status: "ok", r: s.r };
}
var mi = {
  none: "검색 결과가 없어요",
  diff: "이름이 확실히 맞는 곳이 없어요",
  multi: "지점이 여러 곳이에요. 동네를 적으면 찾을 수 있어요",
  error: "검색을 못 했어요 (인터넷 연결 확인)"
};
function ui({ targets: e, gkey: a, onApply: n, onClose: i }) {
  let [s, g] = j([]), [d, c] = j(!1), [r, x] = j({}), N = J(!1);
  K(() => {
    let p = !0;
    return (async () => {
      let k = a && !Tt ? 250 : 1100;
      for (let w of e) {
        if (!p || N.current) break;
        let v = await di(w, a);
        if (!p) return;
        g((M) => [...M, { w, ...v }]), v.status === "ok" && x((M) => ({ ...M, [w.id]: !0 })), await new Promise((M) => setTimeout(M, k));
      }
      p && c(!0);
    })(), () => {
      p = !1;
    };
  }, []);
  let E = s.filter((p) => p.status === "ok"), u = s.filter((p) => p.status !== "ok"), I = E.filter((p) => r[p.w.id]);
  return /* @__PURE__ */ t(Nt, { title: "위치 없는 장소 한 번에 찾기", onClose: i, children: /* @__PURE__ */ o("div", { className: "jt-form", children: [
    d ? /* @__PURE__ */ o("p", { className: "jt-hint jt-geo-sum", children: [
      e.length,
      "곳 중 ",
      /* @__PURE__ */ o("b", { children: [
        E.length,
        "곳"
      ] }),
      "을 찾았어요. 확실하지 않은 ",
      u.length,
      "곳은 비워 뒀어요."
    ] }) : /* @__PURE__ */ o("div", { className: "jt-geo-run", children: [
      /* @__PURE__ */ t("div", { className: "jt-geo-bar", children: /* @__PURE__ */ t("i", { style: { width: `${s.length / e.length * 100}%` } }) }),
      /* @__PURE__ */ o("span", { children: [
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
            N.current = !0, c(!0);
          },
          children: "여기까지만 찾기"
        }
      )
    ] }),
    E.length > 0 && /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "찾았어요 (체크한 곳만 저장돼요)" }),
      /* @__PURE__ */ t("ul", { className: "jt-geo-list", children: E.map(({ w: p, r: k }) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("label", { children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            checked: !!r[p.id],
            onChange: (w) => x((v) => ({ ...v, [p.id]: w.target.checked }))
          }
        ),
        /* @__PURE__ */ o("span", { children: [
          /* @__PURE__ */ t("strong", { children: p.name }),
          /* @__PURE__ */ o("em", { children: [
            k.name,
            k.area ? `, ${k.area}` : ""
          ] })
        ] })
      ] }) }, p.id)) })
    ] }),
    u.length > 0 && /* @__PURE__ */ o(st, { children: [
      /* @__PURE__ */ t("h4", { className: "jt-subhead", children: "비워 둔 곳" }),
      /* @__PURE__ */ t("ul", { className: "jt-geo-list miss", children: u.map(({ w: p, status: k }) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o("span", { children: [
        /* @__PURE__ */ t("strong", { children: p.name }),
        /* @__PURE__ */ t("em", { children: mi[k] })
      ] }) }, p.id)) }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: '비워 둔 곳은 수정 화면의 "위치 검색"으로 직접 고를 수 있어요.' })
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !d || !I.length,
        onClick: () => {
          let p = {};
          I.forEach(({ w: k, r: w }) => {
            p[k.id] = {
              lat: w.lat,
              lng: w.lng,
              ...w.placeId ? { placeId: w.placeId } : {},
              // 구글 검색 링크(share.google 등)는 구글맵 링크로 바꿔 줌
              ...w.link && (!k.link || pi(k.link)) ? { link: w.link } : {},
              ...!k.area && w.area ? { area: w.area.split(" ").slice(0, 3).join(" ") } : {}
            };
          }), n(p);
        },
        children: d ? `선택한 ${I.length}곳에 위치 저장` : "찾는 중"
      }
    )
  ] }) });
}
function ce(e, a) {
  let n = (a || []).find((i) => i.wishId === e.id) || (a || []).find((i) => !i.wishId && i.title === e.name);
  return n ? n.day : null;
}
function yn() {
  let [e, a] = j({});
  return [e, (s) => a((g) => ({ ...g, [s]: !g[s] })), (s, g) => a(g ? Object.fromEntries(s.map((d) => [d, !0])) : {})];
}
function vn({ ids: e, open: a, setAll: n }) {
  if (e.length < 2) return null;
  let i = e.every((s) => a[s]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-ghost sm", onClick: () => n(e, !i), children: [
    i ? /* @__PURE__ */ t(un, { size: 15 }) : /* @__PURE__ */ t(Ct, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function ca({ count: e, open: a, onClick: n }) {
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
        /* @__PURE__ */ t(yo, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function Ae({ comments: e = [], me: a, members: n, onAdd: i, onDelete: s }) {
  let [g, d] = j(""), c = () => {
    let r = g.trim();
    r && (i(r), d(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (r) => r.stopPropagation(), onKeyDown: (r) => r.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((r) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(pt, { name: r.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("strong", { children: r.by }),
          /* @__PURE__ */ t("span", { children: ke(r.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: r.text })
      ] }),
      r.by === a && /* @__PURE__ */ t(St, { onConfirm: () => s(r.id), label: "" })
    ] }, r.id)) }),
