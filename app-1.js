// src/main.jsx
import { useState as mt, useEffect as to } from "react";
import { createRoot as eo } from "react-dom/client";

// src/app.jsx
import { useState as C, useEffect as Y, useMemo as Bt, useCallback as Sa, useRef as J } from "react";
import {
  Plus as Aa,
  X as vt,
  Heart as pe,
  Trash2 as Fa,
  MapPin as ce,
  Settings as Ia,
  CalendarDays as Da,
  Wallet as Pa,
  Check as Ge,
  ExternalLink as Pt,
  Map as $a,
  MessageSquare as qe,
  Image as Ra,
  Link2 as _a,
  Send as La,
  Pencil as Ta,
  ChevronLeft as Ba,
  ChevronRight as Xe,
  Utensils as Oa,
  TrainFront as Ua,
  BedDouble as Ka,
  Ticket as Wa,
  ShoppingBag as Ha,
  MoreHorizontal as Ya,
  Sun as Ja,
  CloudSun as Ga,
  Cloud as Fe,
  CloudFog as qa,
  CloudDrizzle as Xa,
  CloudRain as Za,
  CloudSnow as Va,
  CloudLightning as Qa,
  Umbrella as tn,
  SmilePlus as en,
  LocateFixed as an,
  Star as nn,
  Navigation as on
} from "lucide-react";

// src/store.js
import { initializeApp as ja } from "firebase/app";
import {
  initializeFirestore as ve,
  persistentLocalCache as va,
  persistentMultipleTabManager as ya,
  collection as wa,
  doc as qt,
  onSnapshot as ka,
  setDoc as ke,
  getDoc as Na,
  deleteDoc as Ca
} from "firebase/firestore";
var Nt = "fjt:", rt = { config: null, code: null }, Qt = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), za = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function te(t) {
  try {
    let a = String(t || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, o = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!o) return null;
    let s = za(o);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function Ne() {
  let t = te(location.hash);
  if (t)
    return localStorage.setItem(Nt + "conn", JSON.stringify(t)), t;
  try {
    let a = JSON.parse(localStorage.getItem(Nt + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + Qt(a)), a;
  } catch {
  }
  return null;
}
function Ce(t, a) {
  let n = { c: t, t: a };
  return localStorage.setItem(Nt + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + Qt(n)), n;
}
var ze = () => location.origin + location.pathname + "#j=" + Qt({ c: rt.config, t: rt.code });
function Ee() {
  localStorage.removeItem(Nt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var Me = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => t[n % t.length]).join("");
};
function Se(t) {
  let a = String(t || "");
  try {
    let o = JSON.parse(a);
    if (o.apiKey && o.projectId && o.appId) return o;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((o) => {
    let s = a.match(new RegExp(o + `\\s*[:=]\\s*["']([^"']+)["']`));
    s && (n[o] = s[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var ut = null, ot = /* @__PURE__ */ new Map(), Xt = /* @__PURE__ */ new Set(), Zt = Promise.resolve(), Yt = null, ye = null, Ea = () => {
  clearTimeout(ye), ye = setTimeout(() => Xt.forEach((t) => t()), 250);
}, Vt = (t) => t.startsWith("trip:photo:"), Jt = (t) => Vt(t) ? qt(ut, "trips", rt.code, "photos", t.slice(11)) : qt(ut, "trips", rt.code, "data", t), Gt = (t) => Nt + rt.code + ":" + t, we = (t) => Promise.race([t.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function ee(t, a) {
  Yt && Yt(), ot.clear(), rt.config = t, rt.code = a;
  let n = ja(t, "fjt-" + Date.now());
  try {
    ut = ve(n, { localCache: va({ tabManager: ya() }) });
  } catch {
    ut = ve(n, {});
  }
  let o;
  Zt = new Promise((g) => o = g), setTimeout(() => o(), 6e3);
  let s = !0;
  Yt = ka(
    wa(ut, "trips", a, "data"),
    (g) => {
      g.docChanges().forEach((f) => {
        f.type === "removed" ? ot.delete(f.doc.id) : ot.set(f.doc.id, f.doc.data().v);
      }), o(), s || Ea(), s = !1;
    },
    () => o()
  ), window.storage = Ma;
}
async function Ae() {
  let t = qt(ut, "trips", rt.code, "data", "_ping");
  await Promise.race([
    ke(t, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var Ma = {
  async get(t, a) {
    if (!a) {
      let n = localStorage.getItem(Gt(t));
      if (n == null) throw new Error("not found");
      return { key: t, value: n, shared: !1 };
    }
    if (Vt(t)) {
      let n = await Na(Jt(t));
      if (!n.exists()) throw new Error("not found");
      return { key: t, value: n.data().v, shared: !0 };
    }
    if (await Zt, !ot.has(t)) throw new Error("not found");
    return { key: t, value: ot.get(t), shared: !0 };
  },
  async set(t, a, n) {
    return n ? (Vt(t) || ot.set(t, a), await we(ke(Jt(t), { v: a, t: Date.now() })), { key: t, value: a, shared: !0 }) : (localStorage.setItem(Gt(t), a), { key: t, value: a, shared: !1 });
  },
  async delete(t, a) {
    return a ? (ot.delete(t), await we(Ca(Jt(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(Gt(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", a) {
    return a ? (await Zt, { keys: [...ot.keys()].filter((n) => n.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return Xt.add(t), () => Xt.delete(t);
  }
};

// src/app.jsx
import { Fragment as pt, jsx as e, jsxs as r } from "react/jsx-runtime";
var B = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, de = (t) => "trip:photo:" + t, X = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], rn = ["일", "월", "화", "수", "목", "금", "토"], me = ["맛집", "관광", "쇼핑", "기타"], Ze = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], bt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Ct = 6, Ie = {
  식비: { Icon: Oa, color: "#D9262E" },
  교통: { Icon: Ua, color: "#0C86AE" },
  숙소: { Icon: Ka, color: "#7B5FC4" },
  체험: { Icon: Wa, color: "#E8800A" },
  쇼핑: { Icon: Ha, color: "#0A9B6E" },
  기타: { Icon: Ya, color: "#66718A" }
}, re = (t) => Ie[t] || Ie.기타, it = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), at = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), dt = (t) => {
  let [a, n, o] = t.split("-").map(Number);
  return new Date(a, n - 1, o);
}, nt = (t, a) => {
  let n = dt(t);
  return n.setDate(n.getDate() + a), n;
}, At = (t) => `${t.getMonth() + 1}/${t.getDate()}`, Ft = (t) => rn[t.getDay()], H = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), It = (t, a) => "₩" + (Math.round(t * a / 100 / 10) * 10).toLocaleString("ko-KR"), tt = (t) => String(t).padStart(2, "0"), Ve = (t) => {
  let a = (Date.now() - t) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(t);
  return `${n.getMonth() + 1}/${n.getDate()} ${tt(n.getHours())}:${tt(n.getMinutes())}`;
}, De = (t) => {
  let a = (t || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, sn = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, ht = (t) => {
  let [a, n] = String(t).split(":").map(Number);
  return a * 60 + (n || 0);
}, ae = (t) => `${tt(Math.floor(t / 60) % 24)}:${tt(t % 60)}`, Dt = (t) => {
  let a = ht(t.time), n = t.end ? ht(t.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, Qe = (t) => {
  let a = Math.floor(t / 60), n = t % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function ln(t) {
  let a = t || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${tt(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let o = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${tt(Number(n[2]))}:${tt(o)}`;
}
var pn = Array.from({ length: 24 }, (t, a) => tt(a));
function Pe({ value: t, onChange: a, disabled: n, label: o }) {
  let [s, g] = t ? t.split(":") : ["", ""], f = Array.from({ length: 12 }, (d, m) => tt(m * 5));
  return g && !f.includes(g) && (f = [...f, g].sort()), /* @__PURE__ */ r("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ r(
      "select",
      {
        "aria-label": o + " 시",
        value: s,
        disabled: n,
        onChange: (d) => a(d.target.value ? `${d.target.value}:${g || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          pn.map((d) => /* @__PURE__ */ e("option", { value: d, children: d }, d))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ r(
      "select",
      {
        "aria-label": o + " 분",
        value: g,
        disabled: n || !s,
        onChange: (d) => a(`${s}:${d.target.value}`),
        children: [
          !s && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          f.map((d) => /* @__PURE__ */ e("option", { value: d, children: d }, d))
        ]
      }
    )
  ] });
}
var cn = (t) => {
  let a = t.filter((o) => o.time).map((o) => ({ id: o.id, ...Dt(o) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (o) => a.forEach((s) => {
      o.id !== s.id && o.s < s.e && s.s < o.e && n.add(o.id);
    })
  ), n;
}, dn = (...t) => [...t, "일본"].filter(Boolean).join(" "), $t = (t) => typeof t.lat == "number" && typeof t.lng == "number", ta = (t) => $t(t) ? `${t.lat},${t.lng}` : dn(t.name || t.title, t.area || t.place), Ut = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ta(t)), mn = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(ta(t)), lt = 256, ne = (t, a, n) => {
  let o = lt * 2 ** n, s = t * Math.PI / 180;
  return {
    x: (a + 180) / 360 * o,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * o
  };
}, $e = (t, a, n) => {
  let o = lt * 2 ** n, s = Math.PI - 2 * Math.PI * a / o;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: t / o * 360 - 180 };
}, zt = (t) => Math.max(3, Math.min(18, t));
async function st(t, a) {
  try {
    let n = await window.storage.get(t, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function _t(t, a) {
  try {
    return !!await window.storage.set(t, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var ct = /* @__PURE__ */ new Map(), Lt = /* @__PURE__ */ new Map();
function un(t) {
  if (ct.has(t)) return Promise.resolve(ct.get(t));
  if (Lt.has(t)) return Lt.get(t);
  let a = st(de(t), null).then((n) => (Lt.delete(t), n && ct.set(t, n), n));
  return Lt.set(t, a), a;
}
async function Re(t) {
  ct.delete(t);
  try {
    await window.storage.delete(de(t), !0);
  } catch {
  }
}
var gn = (t) => new Promise((a, n) => {
  let o = URL.createObjectURL(t), s = new Image();
  s.onload = () => {
    URL.revokeObjectURL(o), a(s);
  }, s.onerror = () => {
    URL.revokeObjectURL(o), n(new Error("bad image"));
  }, s.src = o;
});
async function fn(t) {
  let a = await gn(t), n = 1280, o = 0.7, s = "";
  for (let g = 0; g < 5; g++) {
    let f = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), d = document.createElement("canvas");
    d.width = Math.max(1, Math.round(a.naturalWidth * f)), d.height = Math.max(1, Math.round(a.naturalHeight * f));
    let m = d.getContext("2d");
    if (m.fillStyle = "#fff", m.fillRect(0, 0, d.width, d.height), m.drawImage(a, 0, 0, d.width, d.height), s = d.toDataURL("image/jpeg", o), s.length < 6e5) break;
    n = Math.round(n * 0.8), o = Math.max(0.4, o - 0.08);
  }
  return s;
}
var bn = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: at(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function hn() {
  for (let [t, a] of bn)
    try {
      let n = await fetch(t);
      if (!n.ok) continue;
      let o = a(await n.json());
      if (o.rate > 0) return o;
    } catch {
    }
  return null;
}
var _e = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Ot = (t) => t.fx ? `100엔 = ₩${_e(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${_e(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Le(t, a) {
  let n = () => Object.fromEntries(a.map((b) => [b, 0])), o = n(), s = n(), g = [];
  t.forEach((b) => {
    let w = Number(b.amount) || 0, u = (b.split || []).filter((p) => a.includes(p));
    if (!(w <= 0)) {
      if (!u.length || !a.includes(b.payer)) {
        g.push(b);
        return;
      }
      o[b.payer] += w, u.forEach((p) => s[p] += w / u.length);
    }
  });
  let f = Object.fromEntries(a.map((b) => [b, o[b] - s[b]])), d = a.filter((b) => f[b] > 0.5).map((b) => ({ m: b, v: f[b] })).sort((b, w) => w.v - b.v), m = a.filter((b) => f[b] < -0.5).map((b) => ({ m: b, v: -f[b] })).sort((b, w) => w.v - b.v), j = [], h = 0, v = 0;
  for (; h < m.length && v < d.length; ) {
    let b = Math.min(m[h].v, d[v].v);
    b >= 1 && j.push({ from: m[h].m, to: d[v].m, v: Math.round(b) }), m[h].v -= b, d[v].v -= b, m[h].v < 0.5 && h++, d[v].v < 0.5 && v++;
  }
  return { paid: o, share: s, net: f, moves: j, skipped: g };
}
function et({ name: t, members: a, size: n = 28 }) {
  let o = Math.max(0, a.indexOf(t));
  return /* @__PURE__ */ e(
    "span",
    {
      className: "jt-avatar",
      style: { width: n, height: n, background: X[(o * 2 + 3) % X.length], fontSize: n * 0.46 },
      "aria-hidden": "true",
      children: t ? t[0] : "?"
    }
  );
}
function V({ label: t, children: a }) {
  return /* @__PURE__ */ r("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    a
  ] });
}
function Et({ title: t, onClose: a, children: n }) {
  return Y(() => {
    let o = (s) => s.key === "Escape" && a();
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, [a]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ r("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (o) => o.stopPropagation(), children: [
    /* @__PURE__ */ r("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ e(vt, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function yt({ onConfirm: t, label: a = "삭제" }) {
  let [n, o] = C(!1);
  return Y(() => {
    if (!n) return;
    let s = setTimeout(() => o(!1), 3e3);
    return () => clearTimeout(s);
  }, [n]), /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (s) => {
        s.stopPropagation(), n ? t() : o(!0);
      },
      children: [
        /* @__PURE__ */ e(Fa, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
function ue({ id: t, data: a, className: n, onClick: o, alt: s = "사진" }) {
  let [g, f] = C(a || ct.get(t) || null), [d, m] = C(!1);
  Y(() => {
    if (a) {
      f(a);
      return;
    }
    if (ct.has(t)) {
      f(ct.get(t));
      return;
    }
    let h = !0;
    return m(!1), un(t).then((v) => {
      h && (v ? f(v) : m(!0));
    }), () => {
      h = !1;
    };
  }, [t, a]);
  let j = g ? /* @__PURE__ */ e("img", { src: g, alt: s, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: d ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return o ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (n || ""), onClick: o, "aria-label": "사진 크게 보기", children: j }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (n || ""), children: j });
}
function xn({ photos: t, index: a, onClose: n }) {
  let [o, s] = C(a), g = t.length;
  return Y(() => {
    let f = (d) => {
      d.key === "Escape" && n(), d.key === "ArrowRight" && s((m) => (m + 1) % g), d.key === "ArrowLeft" && s((m) => (m - 1 + g) % g);
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [g, n]), /* @__PURE__ */ r("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: n, children: [
    /* @__PURE__ */ e("button", { className: "jt-lb-close", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ e(vt, { size: 24 }) }),
    /* @__PURE__ */ e("div", { className: "jt-lb-stage", onClick: (f) => f.stopPropagation(), children: /* @__PURE__ */ e(ue, { id: t[o], className: "contain" }) }),
    g > 1 && /* @__PURE__ */ r(pt, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (f) => {
            f.stopPropagation(), s((o - 1 + g) % g);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ e(Ba, { size: 26 })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (f) => {
            f.stopPropagation(), s((o + 1) % g);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ e(Xe, { size: 26 })
        }
      ),
      /* @__PURE__ */ r("div", { className: "jt-lb-count", children: [
        o + 1,
        " / ",
        g
      ] })
    ] })
  ] });
}
function jn({ text: t }) {
  let a = t.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ e("p", { className: "jt-post-text", children: a.map(
    (n, o) => o % 2 ? /* @__PURE__ */ e("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, o) : n
  ) });
}
var Te = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function ea(t) {
  let a = {};
  if (Object.entries(t.reactions || {}).forEach(([n, o]) => a[n] = [...o]), t.boardLikes && (t.likes || []).length) {
    let n = new Set(Object.values(a).flat()), o = t.likes.filter((s) => !n.has(s));
    o.length && (a["❤️"] = [...a["❤️"] || [], ...o]);
  }
  return a;
}
function vn(t, a, n, o) {
  let s = ea({ ...t, boardLikes: o }), g = (s[a] || []).includes(n), f = {};
  Object.entries(s).forEach(([m, j]) => {
    let h = j.filter((v) => v !== n);
    h.length && (f[m] = h);
  }), g || (f[a] = [...f[a] || [], n]);
  let d = { ...t, reactions: f };
  return o && (d.likes = []), d;
}
function Kt({ item: t, me: a, onReact: n, boardLikes: o = !1 }) {
  let [s, g] = C(!1), [f, d] = C("up right"), m = J(null), j = ea({ ...t, boardLikes: o }), h = () => {
    if (!s && m.current) {
      let u = m.current.getBoundingClientRect(), i = m.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", c = u.top < 190 ? "down" : "up";
      d(c + " " + i);
    }
    g(!s);
  }, v = Te.filter(([u]) => (j[u] || []).length), b = Object.keys(j).find((u) => j[u].includes(a));
  Y(() => {
    if (!s) return;
    let u = (p) => m.current && !m.current.contains(p.target) && g(!1);
    return document.addEventListener("pointerdown", u), () => document.removeEventListener("pointerdown", u);
  }, [s]);
  let w = (u) => {
    n(u), g(!1);
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: "jt-react",
      ref: m,
      onClick: (u) => u.stopPropagation(),
      onKeyDown: (u) => u.stopPropagation(),
      children: [
        v.map(([u, p]) => /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (b === u ? " on" : ""),
            onClick: () => w(u),
            "aria-pressed": b === u,
            "aria-label": `${p} ${j[u].length}명: ${j[u].join(", ")}`,
            title: j[u].join(", "),
            children: [
              /* @__PURE__ */ e("span", { className: "jt-emoji", children: u }),
              j[u].length
            ]
          },
          u
        )),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (s ? " open" : ""),
            onClick: h,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(en, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ r("div", { className: "jt-rpop " + f, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: Te.map(([u, p]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (b === u ? " on" : ""),
              onClick: () => w(u),
              "aria-label": p,
              title: p,
              children: u
            },
            u
          )) }),
          v.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: v.map(([u]) => /* @__PURE__ */ r("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: u }),
            j[u].join(", ")
          ] }, u)) })
        ] })
      ]
    }
  );
}
function ge({ count: t, open: a, onClick: n }) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (a ? " open" : ""),
      onClick: (o) => {
        o.stopPropagation(), n();
      },
      "aria-expanded": a,
      children: [
        /* @__PURE__ */ e(qe, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Wt({ comments: t = [], me: a, members: n, onAdd: o, onDelete: s }) {
  let [g, f] = C(""), d = () => {
    let m = g.trim();
    m && (o(m), f(""));
  };
  return /* @__PURE__ */ r("div", { className: "jt-comments", onClick: (m) => m.stopPropagation(), onKeyDown: (m) => m.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((m) => /* @__PURE__ */ r("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(et, { name: m.by, members: n, size: 24 }),
      /* @__PURE__ */ r("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("strong", { children: m.by }),
          /* @__PURE__ */ e("span", { children: Ve(m.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: m.text })
      ] }),
      m.by === a && /* @__PURE__ */ e(yt, { onConfirm: () => s(m.id), label: "" })
    ] }, m.id)) }),
    /* @__PURE__ */ r("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: g,
          onChange: (m) => f(m.target.value),
          onKeyDown: (m) => m.key === "Enter" && !m.nativeEvent.isComposing && d(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: d, disabled: !g.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(La, { size: 18 }) })
    ] })
  ] });
}
function aa({ url: t, onRemove: a }) {
  let n = /* @__PURE__ */ r(pt, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(_a, { size: 16 }) }),
    /* @__PURE__ */ r("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: sn(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return a ? /* @__PURE__ */ r("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(vt, { size: 16 }) })
  ] }) : /* @__PURE__ */ r("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ e(Pt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function yn({ initial: t, onSave: a, onCancel: n }) {
  let [o, s] = C(t?.title || "가족 일본여행"), [g, f] = C(t?.start || at(new Date(Date.now() + 30 * 864e5))), [d, m] = C(t?.days || 4), [j, h] = C(t?.members || []), [v, b] = C(t?.rate || 900), [w, u] = C(t?.gmapsKey || ""), [p, i] = C(""), c = () => {
    let x = p.trim();
    !x || j.includes(x) || (h([...j, x]), i(""));
  }, k = o.trim() && g && j.length > 0;
  return /* @__PURE__ */ r("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ r("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(V, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: o, onChange: (x) => s(x.target.value) }) }),
      /* @__PURE__ */ e(V, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: g, onChange: (x) => f(x.target.value) }) }),
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ r("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => m(Math.max(1, d - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ r("strong", { children: [
            d,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => m(Math.min(30, d + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: j.map((x) => /* @__PURE__ */ r("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(et, { name: x, members: j, size: 20 }),
          x,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => h(j.filter((l) => l !== x)), "aria-label": `${x} 빼기`, children: /* @__PURE__ */ e(vt, { size: 14 }) })
        ] }, x)) }),
        /* @__PURE__ */ r("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: p,
              onChange: (x) => i(x.target.value),
              onKeyDown: (x) => x.key === "Enter" && c(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: c, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(V, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: v, onChange: (x) => b(Number(x.target.value) || 0) }) }),
      /* @__PURE__ */ e(V, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ e(
        "input",
        {
          value: w,
          onChange: (x) => u(x.target.value.trim()),
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
          disabled: !k,
          onClick: () => a({ title: o.trim(), start: g, days: d, members: j, rate: v || 900, gmapsKey: w }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(wn, {})
    ] })
  ] });
}
function wn() {
  let [t, a] = C(""), n = ze();
  return /* @__PURE__ */ r("div", { className: "jt-invite", children: [
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
    /* @__PURE__ */ r("details", { children: [
      /* @__PURE__ */ e("summary", { children: "주소 보기" }),
      /* @__PURE__ */ e("code", { children: n })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && Ee();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function kn({ members: t, onPick: a }) {
  return /* @__PURE__ */ r("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((n) => /* @__PURE__ */ r("button", { className: "jt-who-btn", onClick: () => a(n), children: [
      /* @__PURE__ */ e(et, { name: n, members: t, size: 40 }),
      n
    ] }, n)) })
  ] });
}
function Nn({ initial: t, dayItems: a = [], onSave: n, onDelete: o }) {
  let [s, g] = C(t?.time || ""), [f, d] = C(t?.end || ""), [m, j] = C(t?.title || ""), [h, v] = C(t?.place || ""), [b, w] = C(t?.memo || ""), [u, p] = C(!1), i = (x) => {
    if (j(x), !s || u) {
      let l = ln(x);
      l ? (g(l), p(!0)) : u && (g(""), p(!1));
    }
  }, c = s && f && ht(f) <= ht(s), k = s ? a.filter((x) => {
    if (!x.time) return !1;
    let l = Dt({ time: s, end: c ? "" : f }), M = Dt(x);
    return l.s < M.e && M.s < l.e;
  }) : [];
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(V, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: m, onChange: (x) => i(x.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    u && s && /* @__PURE__ */ r("p", { className: "jt-hint", children: [
      "제목에서 ",
      s,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-two", children: [
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          Pe,
          {
            label: "시작",
            value: s,
            onChange: (x) => {
              g(x), p(!1), x || d("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(Pe, { label: "끝", value: f, onChange: d, disabled: !s })
