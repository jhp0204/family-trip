// src/main.jsx
import { useState as At, useEffect as ni } from "react";
import { createRoot as oi } from "react-dom/client";

// src/app.jsx
import Sn, { useState as N, useEffect as K, useMemo as te, useCallback as An, useRef as J } from "react";
import {
  Plus as In,
  X as _e,
  Heart as Te,
  Trash2 as Fn,
  MapPin as zt,
  Settings as Dn,
  CalendarDays as $n,
  Wallet as Pn,
  Check as Ra,
  ExternalLink as Ut,
  Map as Rn,
  MessageSquare as _n,
  Send as _a,
  Pencil as ge,
  ChevronLeft as Tn,
  ChevronRight as Bn,
  ChevronDown as Bt,
  ChevronUp as Ta,
  Users as Ln,
  Crosshair as On,
  HelpCircle as Un,
  MessagesSquare as Kn,
  Megaphone as Wn,
  Pin as Hn,
  PinOff as va,
  Utensils as Yn,
  TrainFront as Jn,
  BedDouble as Xn,
  Ticket as qn,
  ShoppingBag as Gn,
  MoreHorizontal as Vn,
  Sun as Zn,
  CloudSun as Qn,
  Cloud as ya,
  CloudFog as to,
  CloudDrizzle as eo,
  CloudRain as ao,
  CloudSnow as no,
  CloudLightning as oo,
  Umbrella as io,
  SmilePlus as so,
  LocateFixed as ro,
  Star as lo,
  Navigation as Et
} from "lucide-react";

// src/store.js
import { initializeApp as vn } from "firebase/app";
import {
  initializeFirestore as ra,
  persistentLocalCache as yn,
  persistentMultipleTabManager as wn,
  collection as kn,
  doc as da,
  onSnapshot as Nn,
  setDoc as ma,
  deleteDoc as Cn
} from "firebase/firestore";
var qt = "fjt:", kt = { config: null, code: null }, ke = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), zn = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function Ne(e) {
  try {
    let a = String(e || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, i = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!i) return null;
    let s = zn(i);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function ua() {
  let e = Ne(location.hash);
  if (e)
    return localStorage.setItem(qt + "conn", JSON.stringify(e)), e;
  try {
    let a = JSON.parse(localStorage.getItem(qt + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + ke(a)), a;
  } catch {
  }
  return null;
}
function ga(e, a) {
  let n = { c: e, t: a };
  return localStorage.setItem(qt + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + ke(n)), n;
}
var fa = () => location.origin + location.pathname + "#j=" + ke({ c: kt.config, t: kt.code });
function ba() {
  localStorage.removeItem(qt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var xa = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => e[n % e.length]).join("");
};
function ha(e) {
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
var Xt = null, bt = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Set(), we = Promise.resolve(), je = null, la = null, En = () => {
  clearTimeout(la), la = setTimeout(() => ye.forEach((e) => e()), 250);
}, ca = (e) => da(Xt, "trips", kt.code, "data", e), ve = (e) => qt + kt.code + ":" + e, pa = (e) => Promise.race([e.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function Ce(e, a) {
  je && je(), bt.clear(), kt.config = e, kt.code = a;
  let n = vn(e, "fjt-" + Date.now());
  try {
    Xt = ra(n, { localCache: yn({ tabManager: wn() }) });
  } catch {
    Xt = ra(n, {});
  }
  let i;
  we = new Promise((y) => i = y), setTimeout(() => i(), 6e3);
  let s = !0;
  je = Nn(
    kn(Xt, "trips", a, "data"),
    (y) => {
      y.docChanges().forEach((v) => {
        v.type === "removed" ? bt.delete(v.doc.id) : bt.set(v.doc.id, v.doc.data().v);
      }), i(), s || En(), s = !1;
    },
    () => i()
  ), window.storage = Mn;
}
async function ja() {
  let e = da(Xt, "trips", kt.code, "data", "_ping");
  await Promise.race([
    ma(e, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var Mn = {
  async get(e, a) {
    if (!a) {
      let n = localStorage.getItem(ve(e));
      if (n == null) throw new Error("not found");
      return { key: e, value: n, shared: !1 };
    }
    if (await we, !bt.has(e)) throw new Error("not found");
    return { key: e, value: bt.get(e), shared: !0 };
  },
  async set(e, a, n) {
    return n ? (bt.set(e, a), await pa(ma(ca(e), { v: a, t: Date.now() })), { key: e, value: a, shared: !0 }) : (localStorage.setItem(ve(e), a), { key: e, value: a, shared: !1 });
  },
  async delete(e, a) {
    return a ? (bt.delete(e), await pa(Cn(ca(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(ve(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", a) {
    return a ? (await we, { keys: [...bt.keys()].filter((n) => n.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
  },
  onChange(e) {
    return ye.add(e), () => ye.delete(e);
  }
};

// src/app.jsx
import { Fragment as ct, jsx as t, jsxs as o } from "react/jsx-runtime";
var q = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice" }, V = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], co = ["일", "월", "화", "수", "목", "금", "토"], Be = ["맛집", "관광", "쇼핑", "기타"], Ba = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Tt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, wa = {
  식비: { Icon: Yn, color: "#D9262E" },
  교통: { Icon: Jn, color: "#0C86AE" },
  숙소: { Icon: Xn, color: "#7B5FC4" },
  체험: { Icon: qn, color: "#E8800A" },
  쇼핑: { Icon: Gn, color: "#0A9B6E" },
  기타: { Icon: Vn, color: "#66718A" }
}, Fe = (e) => wa[e] || wa.기타, Dt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), mt = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Nt = (e) => {
  let [a, n, i] = e.split("-").map(Number);
  return new Date(a, n - 1, i);
}, ut = (e, a) => {
  let n = Nt(e);
  return n.setDate(n.getDate() + a), n;
}, ae = (e) => `${e.getMonth() + 1}/${e.getDate()}`, Lt = (e) => co[e.getDay()], G = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), ne = (e, a) => "₩" + (Math.round(e * a / 100 / 10) * 10).toLocaleString("ko-KR"), nt = (e) => String(e).padStart(2, "0"), De = (e) => {
  let a = (Date.now() - e) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(e);
  return `${n.getMonth() + 1}/${n.getDate()} ${nt(n.getHours())}:${nt(n.getMinutes())}`;
}, Ct = (e) => {
  let [a, n] = String(e).split(":").map(Number);
  return a * 60 + (n || 0);
}, Pt = (e) => `${nt(Math.floor(e / 60) % 24)}:${nt(e % 60)}`, oe = (e) => {
  let a = Ct(e.time), n = e.end ? Ct(e.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, La = (e) => {
  let a = Math.floor(e / 60), n = e % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function po(e) {
  let a = e || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${nt(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let i = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${nt(Number(n[2]))}:${nt(i)}`;
}
var mo = Array.from({ length: 24 }, (e, a) => nt(a));
function ka({ value: e, onChange: a, disabled: n, label: i }) {
  let [s, y] = e ? e.split(":") : ["", ""], v = Array.from({ length: 12 }, (f, m) => nt(m * 5));
  return y && !v.includes(y) && (v = [...v, y].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 시",
        value: s,
        disabled: n,
        onChange: (f) => a(f.target.value ? `${f.target.value}:${y || "00"}` : ""),
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "--" }),
          mo.map((f) => /* @__PURE__ */ t("option", { value: f, children: f }, f))
        ]
      }
    ),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 분",
        value: y,
        disabled: n || !s,
        onChange: (f) => a(`${s}:${f.target.value}`),
        children: [
          !s && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          v.map((f) => /* @__PURE__ */ t("option", { value: f, children: f }, f))
        ]
      }
    )
  ] });
}
var uo = (e) => {
  let a = e.filter((i) => i.time).map((i) => ({ id: i.id, ...oe(i) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (i) => a.forEach((s) => {
      i.id !== s.id && i.s < s.e && s.s < i.e && n.add(i.id);
    })
  ), n;
}, de = (e) => jt(e) ? `${e.lat},${e.lng}` : e.place ? Oe(e.place) : "", go = (e, a) => {
  let n = e ? de(e) : "", i = de(a);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (n ? "&origin=" + encodeURIComponent(n) : "");
}, Le = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(jt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), Oe = (...e) => [...e, "일본"].filter(Boolean).join(" "), jt = (e) => typeof e.lat == "number" && typeof e.lng == "number", Oa = (e) => jt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place), Mt = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Oa(e)), fo = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Oa(e)), ht = 256, ze = (e, a, n) => {
  let i = ht * 2 ** n, s = e * Math.PI / 180;
  return {
    x: (a + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * i
  };
}, Na = (e, a, n) => {
  let i = ht * 2 ** n, s = Math.PI - 2 * Math.PI * a / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: e / i * 360 - 180 };
}, Gt = (e) => Math.max(3, Math.min(18, e));
async function Ee(e) {
  let a = await window.storage.list(e, !0), n = (a && a.keys || []).map((s) => typeof s == "string" ? s : s.key).filter(Boolean), i = await Promise.all(n.map((s) => xt(s, null)));
  return n.map((s, y) => [s, i[y]]).filter(([, s]) => s);
}
async function xt(e, a) {
  try {
    let n = await window.storage.get(e, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function dt(e, a) {
  try {
    return !!await window.storage.set(e, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var bo = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: mt(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function xo() {
  for (let [e, a] of bo)
    try {
      let n = await fetch(e);
      if (!n.ok) continue;
      let i = a(await n.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var Ca = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), me = (e) => e.fx ? `100엔 = ₩${Ca(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${Ca(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function za(e, a) {
  let n = () => Object.fromEntries(a.map((x) => [x, 0])), i = n(), s = n(), y = [];
  e.forEach((x) => {
    let b = Number(x.amount) || 0, I = (x.split || []).filter((r) => a.includes(r));
    if (!(b <= 0)) {
      if (!I.length || !a.includes(x.payer)) {
        y.push(x);
        return;
      }
      i[x.payer] += b, I.forEach((r) => s[r] += b / I.length);
    }
  });
  let v = Object.fromEntries(a.map((x) => [x, i[x] - s[x]])), f = a.filter((x) => v[x] > 0.5).map((x) => ({ m: x, v: v[x] })).sort((x, b) => b.v - x.v), m = a.filter((x) => v[x] < -0.5).map((x) => ({ m: x, v: -v[x] })).sort((x, b) => b.v - x.v), w = [], l = 0, M = 0;
  for (; l < m.length && M < f.length; ) {
    let x = Math.min(m[l].v, f[M].v);
    x >= 1 && w.push({ from: m[l].m, to: f[M].m, v: Math.round(x) }), m[l].v -= x, f[M].v -= x, m[l].v < 0.5 && l++, f[M].v < 0.5 && M++;
  }
  return { paid: i, share: s, net: v, moves: w, skipped: y };
}
function lt({ name: e, members: a, size: n = 28 }) {
  let i = Math.max(0, a.indexOf(e));
  return /* @__PURE__ */ t(
    "span",
    {
      className: "jt-avatar",
      style: { width: n, height: n, background: V[(i * 2 + 3) % V.length], fontSize: n * 0.46 },
      "aria-hidden": "true",
      children: e ? e[0] : "?"
    }
  );
}
function at({ label: e, children: a }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ t("span", { children: e }),
    a
  ] });
}
function Rt({ title: e, onClose: a, children: n }) {
  return K(() => {
    let i = (s) => s.key === "Escape" && a();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ t(_e, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function St({ onConfirm: e, label: a = "삭제" }) {
  let [n, i] = N(!1);
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
        /* @__PURE__ */ t(Fn, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
var Ea = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Ua(e) {
  let a = {};
  return Object.entries(e.reactions || {}).forEach(([n, i]) => a[n] = [...i]), a;
}
function ho(e, a, n) {
  let i = Ua(e), s = (i[a] || []).includes(n), y = {};
  return Object.entries(i).forEach(([v, f]) => {
    let m = f.filter((w) => w !== n);
    m.length && (y[v] = m);
  }), s || (y[a] = [...y[a] || [], n]), { ...e, reactions: y };
}
function Ue({ item: e, me: a, onReact: n }) {
  let [i, s] = N(!1), [y, v] = N("up right"), f = J(null), m = Ua(e), w = () => {
    if (!i && f.current) {
      let b = f.current.getBoundingClientRect(), r = f.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", d = b.top < 190 ? "down" : "up";
      v(d + " " + r);
    }
    s(!i);
  }, l = Ea.filter(([b]) => (m[b] || []).length), M = Object.keys(m).find((b) => m[b].includes(a));
  K(() => {
    if (!i) return;
    let b = (I) => f.current && !f.current.contains(I.target) && s(!1);
    return document.addEventListener("pointerdown", b), () => document.removeEventListener("pointerdown", b);
  }, [i]);
  let x = (b) => {
    n(b), s(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: f,
      onClick: (b) => b.stopPropagation(),
      onKeyDown: (b) => b.stopPropagation(),
      children: [
        l.map(([b, I]) => /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (M === b ? " on" : ""),
            onClick: () => x(b),
            "aria-pressed": M === b,
            "aria-label": `${I} ${m[b].length}명: ${m[b].join(", ")}`,
            title: m[b].join(", "),
            children: [
              /* @__PURE__ */ t("span", { className: "jt-emoji", children: b }),
              m[b].length
            ]
          },
          b
        )),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (i ? " open" : ""),
            onClick: w,
            "aria-expanded": i,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(so, { size: 16 })
          }
        ),
        i && /* @__PURE__ */ o("div", { className: "jt-rpop " + y, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: Ea.map(([b, I]) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (M === b ? " on" : ""),
              onClick: () => x(b),
              "aria-label": I,
              title: I,
              children: b
            },
            b
          )) }),
          l.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-rwho", children: l.map(([b]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ t("span", { className: "jt-emoji", children: b }),
            m[b].join(", ")
          ] }, b)) })
        ] })
      ]
    }
  );
}
function ee(e, a) {
  let n = (a || []).find((i) => i.wishId === e.id) || (a || []).find((i) => !i.wishId && i.title === e.name);
  return n ? n.day : null;
}
function Ka() {
  let [e, a] = N({});
  return [e, (s) => a((y) => ({ ...y, [s]: !y[s] })), (s, y) => a(y ? Object.fromEntries(s.map((v) => [v, !0])) : {})];
}
function Wa({ ids: e, open: a, setAll: n }) {
  if (e.length < 2) return null;
  let i = e.every((s) => a[s]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-ghost sm", onClick: () => n(e, !i), children: [
    i ? /* @__PURE__ */ t(Ta, { size: 15 }) : /* @__PURE__ */ t(Bt, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function Ha({ count: e, open: a, onClick: n }) {
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
        /* @__PURE__ */ t(_n, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function Ke({ comments: e = [], me: a, members: n, onAdd: i, onDelete: s }) {
  let [y, v] = N(""), f = () => {
    let m = y.trim();
    m && (i(m), v(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (m) => m.stopPropagation(), onKeyDown: (m) => m.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((m) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(lt, { name: m.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("strong", { children: m.by }),
          /* @__PURE__ */ t("span", { children: De(m.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: m.text })
      ] }),
      m.by === a && /* @__PURE__ */ t(St, { onConfirm: () => s(m.id), label: "" })
    ] }, m.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: y,
          onChange: (m) => v(m.target.value),
          onKeyDown: (m) => m.key === "Enter" && !m.nativeEvent.isComposing && f(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: f, disabled: !y.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(_a, { size: 18 }) })
    ] })
  ] });
}
function jo({ initial: e, onSave: a, onCancel: n }) {
  let [i, s] = N(e?.title || "가족 일본여행"), [y, v] = N(e?.start || mt(new Date(Date.now() + 30 * 864e5))), [f, m] = N(e?.days || 4), [w, l] = N(e?.members || []), [M, x] = N(e?.rate || 900), [b, I] = N(e?.gmapsKey || ""), [r, d] = N(""), E = () => {
    let k = r.trim();
    !k || w.includes(k) || (l([...w, k]), d(""));
  }, C = i.trim() && y && w.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    n && /* @__PURE__ */ t(Ya, { onBack: n }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(at, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (k) => s(k.target.value) }) }),
      /* @__PURE__ */ t(at, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: y, onChange: (k) => v(k.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => m(Math.max(1, f - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            f,
            "일"
          ] }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => m(Math.min(30, f + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ t("div", { className: "jt-chips", children: w.map((k) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ t(lt, { name: k, members: w, size: 20 }),
          k,
          /* @__PURE__ */ t("button", { type: "button", onClick: () => l(w.filter((h) => h !== k)), "aria-label": `${k} 빼기`, children: /* @__PURE__ */ t(_e, { size: 14 }) })
        ] }, k)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: r,
              onChange: (k) => d(k.target.value),
              onKeyDown: (k) => k.key === "Enter" && E(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: E, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(at, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: M, onChange: (k) => x(Number(k.target.value) || 0) }) }),
      /* @__PURE__ */ t(at, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ t(
        "input",
        {
          value: b,
          onChange: (k) => I(k.target.value.trim()),
          placeholder: "AIza로 시작하는 키",
          autoComplete: "off",
          spellCheck: !1
        }
      ) }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: "한 명만 넣으면 가족 모두에게 적용돼요. 비워 두면 기본 지도를 써요." }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-primary",
          disabled: !C,
          onClick: () => a({ title: i.trim(), start: y, days: f, members: w, rate: M || 900, gmapsKey: b }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(vo, {})
    ] })
  ] });
}
function vo() {
  let [e, a] = N(""), n = fa();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
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
    e && /* @__PURE__ */ t("p", { className: "jt-hint jt-formmsg", children: e }),
    /* @__PURE__ */ o("details", { children: [
      /* @__PURE__ */ t("summary", { children: "주소 보기" }),
      /* @__PURE__ */ t("code", { children: n })
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && ba();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Ya({ onBack: e, label: a = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-back", onClick: e, "aria-label": a, children: [
    /* @__PURE__ */ t(Tn, { size: 22 }),
    a
  ] }) });
}
function yo({ members: e, onPick: a, current: n, onBack: i }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(Ya, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((s) => /* @__PURE__ */ o("button", { className: "jt-who-btn" + (s === n ? " on" : ""), onClick: () => a(s), children: [
      /* @__PURE__ */ t(lt, { name: s, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: s }),
      s === n && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, s)) })
  ] });
}
function wo({ initial: e, preset: a, gkey: n, dayItems: i = [], onSave: s, onDelete: y }) {
  let [v, f] = N(e?.time || a?.time || ""), [m, w] = N(e?.end || a?.end || ""), [l, M] = N(e?.link || ""), [x, b] = N(e && jt(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [I, r] = N([]), [d, E] = N(!1), [C, k] = N(""), [h, S] = N(e?.title || ""), [j, R] = N(e?.place || ""), [p, P] = N(e?.memo || ""), [u, g] = N(!1), T = (_) => {
    if (S(_), !v || u) {
      let z = po(_);
      z ? (f(z), g(!0)) : u && (f(""), g(!1));
    }
  }, F = async () => {
    let _ = (j || h).trim();
    if (!_) {
      k("장소 이름을 먼저 적어 주세요.");
      return;
    }
    E(!0), k(""), r([]);
    try {
      let z = await Va(_, n);
      r(z), z.length || k("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      k("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    E(!1);
  }, X = v && m && Ct(m) <= Ct(v), H = v ? i.filter((_) => {
    if (!_.time) return !1;
    let z = oe({ time: v, end: X ? "" : m }), W = oe(_);
    return z.s < W.e && W.s < z.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: h, onChange: (_) => T(_.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    u && v && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      v,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          ka,
          {
            label: "시작",
            value: v,
            onChange: (_) => {
              f(_), g(!1), _ || w("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(ka, { label: "끝", value: m, onChange: w, disabled: !v })
      ] })
    ] }),
    v && !m && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    X && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    v && m && !X && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      La(Ct(m) - Ct(v)),
      " 동안"
    ] }),
    H.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      H.map((_) => `'${_.title}'(${_.time}${_.end ? `~${_.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: j,
            onChange: (_) => R(_.target.value),
            onKeyDown: (_) => _.key === "Enter" && !_.nativeEvent.isComposing && F(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: F, disabled: d, children: d ? "찾는 중" : "검색" })
      ] })
    ] }),
    C && /* @__PURE__ */ t("p", { className: "jt-hint", children: C }),
    I.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: I.map((_, z) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          R(_.name), b({ lat: _.lat, lng: _.lng, placeId: _.placeId }), _.link && M(_.link), r([]), k("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: _.name }),
          /* @__PURE__ */ t("span", { children: _.area })
        ]
      }
    ) }, z)) }),
    x && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(zt, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mt({ title: h, place: j, link: l, ...x }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Ut, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => b(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: l, onChange: (_) => M(_.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(at, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: p, onChange: (_) => P(_.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !h.trim() || X,
        onClick: () => s({
          time: v,
          end: v ? m : "",
          title: h.trim(),
          place: j.trim(),
          memo: p.trim(),
          link: l.trim(),
          lat: x ? x.lat : void 0,
          lng: x ? x.lng : void 0,
          placeId: x && x.placeId ? x.placeId : void 0
        }),
        children: e ? "수정 저장" : "일정 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: y, label: "이 일정 삭제" })
  ] });
}
function ko({ initial: e, onSave: a, onDelete: n }) {
  let [i, s] = N(e?.name || ""), [y, v] = N(e?.cat || "맛집"), [f, m] = N(e?.area || ""), [w, l] = N(e?.link || ""), [M, x] = N(e?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (b) => s(b.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Be.map((b) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (y === b ? " on" : ""), onClick: () => v(b), children: b }, b)) })
    ] }),
    /* @__PURE__ */ t(at, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: f, onChange: (b) => m(b.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: w,
        onChange: (b) => l(b.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(at, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: M, onChange: (b) => x(b.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim(),
        onClick: () => a({ name: i.trim(), cat: y, area: f.trim(), link: w.trim(), memo: M.trim() }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function No({ settings: e, me: a, defaultDay: n, initial: i, onSave: s, onDelete: y }) {
  let { members: v, days: f, start: m, rate: w } = e, [l, M] = N(i?.title || ""), [x, b] = N(i ? String(Number(i.amount) || "") : ""), [I, r] = N(i && v.includes(i.payer) ? i.payer : a), [d, E] = N(i?.cat || "식비"), [C, k] = N(i ? Math.min(i.day, f - 1) : n), [h, S] = N(i ? (i.split || []).filter((u) => v.includes(u)) : v), j = Number(x) || 0, R = i ? [i.payer, ...i.split || []].filter((u, g, T) => u && !v.includes(u) && T.indexOf(u) === g) : [], p = (u) => S(h.includes(u) ? h.filter((g) => g !== u) : [...h, u]), P = l.trim() && j > 0 && h.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: l, onChange: (u) => M(u.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(at, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: x, onChange: (u) => b(u.target.value), placeholder: "0" }) }),
    j > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ t("b", { children: ne(j, w) }),
      /* @__PURE__ */ t("br", {}),
      me(e)
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint", children: me(e) }),
    R.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      R.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: v.map((u) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (I === u ? " on" : ""), onClick: () => r(u), children: u }, u)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: v.map((u) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (h.includes(u) ? " on" : ""), onClick: () => p(u), children: [
        h.includes(u) && /* @__PURE__ */ t(Ra, { size: 14 }),
        u
      ] }, u)) }),
      j > 0 && h.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        G(j / h.length)
      ] }),
      h.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Ba.map((u) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (d === u ? " on" : ""), onClick: () => E(u), children: u }, u)) })
    ] }),
    /* @__PURE__ */ t(at, { label: "날짜", children: /* @__PURE__ */ t("select", { value: C, onChange: (u) => k(Number(u.target.value)), children: Array.from({ length: f }, (u, g) => {
      let T = ut(m, g);
      return /* @__PURE__ */ o("option", { value: g, children: [
        g + 1,
        "일차 ",
        ae(T),
        " (",
        Lt(T),
        ")"
      ] }, g);
    }) }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !P,
        onClick: () => s({ title: l.trim(), amount: j, payer: I, cat: d, day: C, split: h }),
        children: i ? "수정 저장" : "경비 기록하기"
      }
    ),
    i && /* @__PURE__ */ t(St, { onConfirm: y, label: "이 경비 삭제" })
  ] });
}
var pt = { name: "오사카", lat: 34.6937, lng: 135.5023 }, Ja = 16;
function $e(e) {
  return e === 0 ? { Icon: Zn, label: "맑음", tone: "#E8800A" } : e === 1 || e === 2 ? { Icon: Qn, label: e === 1 ? "대체로 맑음" : "구름 조금", tone: "#E8800A" } : e === 3 ? { Icon: ya, label: "흐림", tone: "#66718A" } : e === 45 || e === 48 ? { Icon: to, label: "안개", tone: "#66718A" } : e >= 51 && e <= 57 ? { Icon: eo, label: "이슬비", tone: "#0C86AE" } : e >= 61 && e <= 67 || e >= 80 && e <= 82 ? { Icon: ao, label: e >= 80 ? "소나기" : "비", tone: "#0C86AE" } : e >= 71 && e <= 77 || e === 85 || e === 86 ? { Icon: no, label: "눈", tone: "#7B5FC4" } : e >= 95 ? { Icon: oo, label: "뇌우", tone: "#7B5FC4" } : { Icon: ya, label: "흐림", tone: "#66718A" };
