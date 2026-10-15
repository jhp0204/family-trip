// src/main.jsx
import { useState as ct, useEffect as fn } from "react";
import { createRoot as gn } from "react-dom/client";

// src/app.jsx
import { useState as N, useEffect as Z, useMemo as Jt, useCallback as ia, useRef as ft } from "react";
import {
  Plus as sa,
  X as bt,
  Heart as $t,
  Trash2 as la,
  MapPin as Zt,
  Settings as pa,
  CalendarDays as ca,
  Wallet as da,
  Check as ma,
  ExternalLink as Pt,
  Map as ua,
  MessageSquare as Ae,
  Image as fa,
  Link2 as ga,
  Send as xa,
  Pencil as ba,
  ChevronLeft as ha,
  ChevronRight as De,
  Utensils as ja,
  TrainFront as va,
  BedDouble as ya,
  Ticket as wa,
  ShoppingBag as ka,
  MoreHorizontal as Na,
  Sun as za,
  CloudSun as Ca,
  Cloud as xe,
  CloudFog as Ea,
  CloudDrizzle as Fa,
  CloudRain as Sa,
  CloudSnow as Ma,
  CloudLightning as Aa,
  Umbrella as Da
} from "lucide-react";

// src/store.js
import { initializeApp as Ge } from "firebase/app";
import {
  initializeFirestore as re,
  persistentLocalCache as Qe,
  persistentMultipleTabManager as Ze,
  collection as Ve,
  doc as Lt,
  onSnapshot as ta,
  setDoc as le,
  getDoc as ea,
  deleteDoc as aa
} from "firebase/firestore";
var yt = "fjt:", nt = { config: null, code: null }, Kt = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), na = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function Ht(t) {
  try {
    let n = String(t || "").trim(), a = n.includes("#") ? n.slice(n.indexOf("#") + 1) : n, r = new URLSearchParams(a).get("j") || (a.startsWith("j=") ? a.slice(2) : "");
    if (!r) return null;
    let l = na(r);
    return l && l.c && l.t ? l : null;
  } catch {
    return null;
  }
}
function pe() {
  let t = Ht(location.hash);
  if (t)
    return localStorage.setItem(yt + "conn", JSON.stringify(t)), t;
  try {
    let n = JSON.parse(localStorage.getItem(yt + "conn"));
    if (n && n.c && n.t)
      return history.replaceState(null, "", "#j=" + Kt(n)), n;
  } catch {
  }
  return null;
}
function ce(t, n) {
  let a = { c: t, t: n };
  return localStorage.setItem(yt + "conn", JSON.stringify(a)), history.replaceState(null, "", "#j=" + Kt(a)), a;
}
var de = () => location.origin + location.pathname + "#j=" + Kt({ c: nt.config, t: nt.code });
function me() {
  localStorage.removeItem(yt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var ue = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", n = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(n, (a) => t[a % t.length]).join("");
};
function fe(t) {
  let n = String(t || "");
  try {
    let r = JSON.parse(n);
    if (r.apiKey && r.projectId && r.appId) return r;
  } catch {
  }
  let a = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((r) => {
    let l = n.match(new RegExp(r + `\\s*[:=]\\s*["']([^"']+)["']`));
    l && (a[r] = l[1]);
  }), a.apiKey && a.projectId && a.appId ? a : null;
}
var mt = null, at = /* @__PURE__ */ new Map(), Wt = /* @__PURE__ */ new Set(), Ot = Promise.resolve(), Tt = null, ie = null, oa = () => {
  clearTimeout(ie), ie = setTimeout(() => Wt.forEach((t) => t()), 250);
}, Ut = (t) => t.startsWith("trip:photo:"), Rt = (t) => Ut(t) ? Lt(mt, "trips", nt.code, "photos", t.slice(11)) : Lt(mt, "trips", nt.code, "data", t), Bt = (t) => yt + nt.code + ":" + t, se = (t) => Promise.race([t.then(() => !0), new Promise((n) => setTimeout(() => n(!0), 4e3))]);
function Yt(t, n) {
  Tt && Tt(), at.clear(), nt.config = t, nt.code = n;
  let a = Ge(t, "fjt-" + Date.now());
  try {
    mt = re(a, { localCache: Qe({ tabManager: Ze() }) });
  } catch {
    mt = re(a, {});
  }
  let r;
  Ot = new Promise((u) => r = u), setTimeout(() => r(), 6e3);
  let l = !0;
  Tt = ta(
    Ve(mt, "trips", n, "data"),
    (u) => {
      u.docChanges().forEach((x) => {
        x.type === "removed" ? at.delete(x.doc.id) : at.set(x.doc.id, x.doc.data().v);
      }), r(), l || oa(), l = !1;
    },
    () => r()
  ), window.storage = ra;
}
async function ge() {
  let t = Lt(mt, "trips", nt.code, "data", "_ping");
  await Promise.race([
    le(t, { v: "ok", t: Date.now() }),
    new Promise((n, a) => setTimeout(() => a(new Error("timeout")), 9e3))
  ]);
}
var ra = {
  async get(t, n) {
    if (!n) {
      let a = localStorage.getItem(Bt(t));
      if (a == null) throw new Error("not found");
      return { key: t, value: a, shared: !1 };
    }
    if (Ut(t)) {
      let a = await ea(Rt(t));
      if (!a.exists()) throw new Error("not found");
      return { key: t, value: a.data().v, shared: !0 };
    }
    if (await Ot, !at.has(t)) throw new Error("not found");
    return { key: t, value: at.get(t), shared: !0 };
  },
  async set(t, n, a) {
    return a ? (Ut(t) || at.set(t, n), await se(le(Rt(t), { v: n, t: Date.now() })), { key: t, value: n, shared: !0 }) : (localStorage.setItem(Bt(t), n), { key: t, value: n, shared: !1 });
  },
  async delete(t, n) {
    return n ? (at.delete(t), await se(aa(Rt(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(Bt(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", n) {
    return n ? (await Ot, { keys: [...at.keys()].filter((a) => a.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return Wt.add(t), () => Wt.delete(t);
  }
};

// src/app.jsx
import { Fragment as it, jsx as e, jsxs as o } from "react/jsx-runtime";
var T = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, Vt = (t) => "trip:photo:" + t, U = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], Ia = ["일", "월", "화", "수", "목", "금", "토"], te = ["맛집", "관광", "쇼핑", "기타"], Ie = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], gt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, wt = 6, be = {
  식비: { Icon: ja, color: "#D9262E" },
  교통: { Icon: va, color: "#0C86AE" },
  숙소: { Icon: ya, color: "#7B5FC4" },
  체험: { Icon: wa, color: "#E8800A" },
  쇼핑: { Icon: ka, color: "#0A9B6E" },
  기타: { Icon: Na, color: "#66718A" }
}, Gt = (t) => be[t] || be.기타, lt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), tt = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), pt = (t) => {
  let [n, a, r] = t.split("-").map(Number);
  return new Date(n, a - 1, r);
}, et = (t, n) => {
  let a = pt(t);
  return a.setDate(a.getDate() + n), a;
}, zt = (t) => `${t.getMonth() + 1}/${t.getDate()}`, Ct = (t) => Ia[t.getDay()], B = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Et = (t, n) => "₩" + (Math.round(t * n / 100 / 10) * 10).toLocaleString("ko-KR"), q = (t) => String(t).padStart(2, "0"), he = (t) => {
  let n = (Date.now() - t) / 1e3;
  if (n < 60) return "방금";
  if (n < 3600) return `${Math.floor(n / 60)}분 전`;
  if (n < 86400) return `${Math.floor(n / 3600)}시간 전`;
  let a = new Date(t);
  return `${a.getMonth() + 1}/${a.getDate()} ${q(a.getHours())}:${q(a.getMinutes())}`;
}, je = (t) => {
  let n = (t || "").trim();
  if (!n) return "";
  /^https?:\/\//i.test(n) || (n = "https://" + n);
  try {
    let a = new URL(n);
    return a.hostname.includes(".") ? a.href : "";
  } catch {
    return "";
  }
}, $a = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, xt = (t) => {
  let [n, a] = String(t).split(":").map(Number);
  return n * 60 + (a || 0);
}, Xt = (t) => `${q(Math.floor(t / 60) % 24)}:${q(t % 60)}`, Ft = (t) => {
  let n = xt(t.time), a = t.end ? xt(t.end) : n + 60;
  return a <= n && (a = n + 60), { s: n, e: Math.min(a, 24 * 60) };
}, $e = (t) => {
  let n = Math.floor(t / 60), a = t % 60;
  return [n ? `${n}시간` : "", a ? `${a}분` : ""].filter(Boolean).join(" ");
};
function Pa(t) {
  let n = t || "", a = n.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (a) return `${q(Number(a[2]))}:${a[3]}`;
  if (a = n.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !a) return "";
  let r = a[3] === "반" ? 30 : a[4] ? Number(a[4]) : 0;
  return `${q(Number(a[2]))}:${q(r)}`;
}
var _a = Array.from({ length: 24 }, (t, n) => q(n));
function ve({ value: t, onChange: n, disabled: a, label: r }) {
  let [l, u] = t ? t.split(":") : ["", ""], x = Array.from({ length: 12 }, (c, f) => q(f * 5));
  return u && !x.includes(u) && (x = [...x, u].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (a ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 시",
        value: l,
        disabled: a,
        onChange: (c) => n(c.target.value ? `${c.target.value}:${u || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          _a.map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": r + " 분",
        value: u,
        disabled: a || !l,
        onChange: (c) => n(`${l}:${c.target.value}`),
        children: [
          !l && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          x.map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
        ]
      }
    )
  ] });
}
var Ta = (t) => {
  let n = t.filter((r) => r.time).map((r) => ({ id: r.id, ...Ft(r) })), a = /* @__PURE__ */ new Set();
  return n.forEach(
    (r) => n.forEach((l) => {
      r.id !== l.id && r.s < l.e && l.s < r.e && a.add(r.id);
    })
  ), a;
}, Ra = (...t) => [...t, "일본"].filter(Boolean).join(" "), _t = (t) => typeof t.lat == "number" && typeof t.lng == "number", Pe = (t) => _t(t) ? `${t.lat},${t.lng}` : Ra(t.name || t.title, t.area || t.place), ee = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Pe(t)), Ba = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Pe(t)), rt = 256, qt = (t, n, a) => {
  let r = rt * 2 ** a, l = t * Math.PI / 180;
  return {
    x: (n + 180) / 360 * r,
    y: (1 - Math.log(Math.tan(l) + 1 / Math.cos(l)) / Math.PI) / 2 * r
  };
}, ye = (t, n, a) => {
  let r = rt * 2 ** a, l = Math.PI - 2 * Math.PI * n / r;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(l)), lng: t / r * 360 - 180 };
}, kt = (t) => Math.max(3, Math.min(18, t));
async function ot(t, n) {
  try {
    let a = await window.storage.get(t, !0);
    return a && a.value ? JSON.parse(a.value) : n;
  } catch {
    return n;
  }
}
async function St(t, n) {
  try {
    return !!await window.storage.set(t, JSON.stringify(n), !0);
  } catch {
    return !1;
  }
}
var st = /* @__PURE__ */ new Map(), Mt = /* @__PURE__ */ new Map();
function La(t) {
  if (st.has(t)) return Promise.resolve(st.get(t));
  if (Mt.has(t)) return Mt.get(t);
  let n = ot(Vt(t), null).then((a) => (Mt.delete(t), a && st.set(t, a), a));
  return Mt.set(t, n), n;
}
async function we(t) {
  st.delete(t);
  try {
    await window.storage.delete(Vt(t), !0);
  } catch {
  }
}
var Wa = (t) => new Promise((n, a) => {
  let r = URL.createObjectURL(t), l = new Image();
  l.onload = () => {
    URL.revokeObjectURL(r), n(l);
  }, l.onerror = () => {
    URL.revokeObjectURL(r), a(new Error("bad image"));
  }, l.src = r;
});
async function Oa(t) {
  let n = await Wa(t), a = 1280, r = 0.7, l = "";
  for (let u = 0; u < 5; u++) {
    let x = Math.min(1, a / Math.max(n.naturalWidth, n.naturalHeight)), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(n.naturalWidth * x)), c.height = Math.max(1, Math.round(n.naturalHeight * x));
    let f = c.getContext("2d");
    if (f.fillStyle = "#fff", f.fillRect(0, 0, c.width, c.height), f.drawImage(n, 0, 0, c.width, c.height), l = c.toDataURL("image/jpeg", r), l.length < 6e5) break;
    a = Math.round(a * 0.8), r = Math.max(0.4, r - 0.08);
  }
  return l;
}
var Ua = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: tt(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function Ka() {
  for (let [t, n] of Ua)
    try {
      let a = await fetch(t);
      if (!a.ok) continue;
      let r = n(await a.json());
      if (r.rate > 0) return r;
    } catch {
    }
  return null;
}
var ke = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Dt = (t) => t.fx ? `100엔 = ₩${ke(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${ke(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Ne(t, n) {
  let a = () => Object.fromEntries(n.map((s) => [s, 0])), r = a(), l = a(), u = [];
  t.forEach((s) => {
    let w = Number(s.amount) || 0, b = (s.split || []).filter((p) => n.includes(p));
    if (!(w <= 0)) {
      if (!b.length || !n.includes(s.payer)) {
        u.push(s);
        return;
      }
      r[s.payer] += w, b.forEach((p) => l[p] += w / b.length);
    }
  });
  let x = Object.fromEntries(n.map((s) => [s, r[s] - l[s]])), c = n.filter((s) => x[s] > 0.5).map((s) => ({ m: s, v: x[s] })).sort((s, w) => w.v - s.v), f = n.filter((s) => x[s] < -0.5).map((s) => ({ m: s, v: -x[s] })).sort((s, w) => w.v - s.v), y = [], d = 0, g = 0;
  for (; d < f.length && g < c.length; ) {
    let s = Math.min(f[d].v, c[g].v);
    s >= 1 && y.push({ from: f[d].m, to: c[g].m, v: Math.round(s) }), f[d].v -= s, c[g].v -= s, f[d].v < 0.5 && d++, c[g].v < 0.5 && g++;
  }
  return { paid: r, share: l, net: x, moves: y, skipped: u };
}
function V({ name: t, members: n, size: a = 28 }) {
  let r = Math.max(0, n.indexOf(t));
  return /* @__PURE__ */ e(
    "span",
    {
      className: "jt-avatar",
      style: { width: a, height: a, background: U[(r * 2 + 3) % U.length], fontSize: a * 0.46 },
      "aria-hidden": "true",
      children: t ? t[0] : "?"
    }
  );
}
function Y({ label: t, children: n }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ e("span", { children: t }),
    n
  ] });
}
function Nt({ title: t, onClose: n, children: a }) {
  return Z(() => {
    let r = (l) => l.key === "Escape" && n();
    return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
  }, [n]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: n, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (r) => r.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ e(bt, { size: 20 }) })
    ] }),
    a
  ] }) });
}
function ht({ onConfirm: t, label: n = "삭제" }) {
  let [a, r] = N(!1);
  return Z(() => {
    if (!a) return;
    let l = setTimeout(() => r(!1), 3e3);
    return () => clearTimeout(l);
  }, [a]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (a ? " armed" : ""),
      onClick: (l) => {
        l.stopPropagation(), a ? t() : r(!0);
      },
      children: [
        /* @__PURE__ */ e(la, { size: 15 }),
        a ? "한 번 더 누르면 삭제돼요" : n
      ]
    }
  );
}
function ae({ id: t, data: n, className: a, onClick: r, alt: l = "사진" }) {
  let [u, x] = N(n || st.get(t) || null), [c, f] = N(!1);
  Z(() => {
    if (n) {
      x(n);
      return;
    }
    if (st.has(t)) {
      x(st.get(t));
      return;
    }
    let d = !0;
    return f(!1), La(t).then((g) => {
      d && (g ? x(g) : f(!0));
    }), () => {
      d = !1;
    };
  }, [t, n]);
  let y = u ? /* @__PURE__ */ e("img", { src: u, alt: l, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: c ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return r ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (a || ""), onClick: r, "aria-label": "사진 크게 보기", children: y }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (a || ""), children: y });
}
function Ha({ photos: t, index: n, onClose: a }) {
  let [r, l] = N(n), u = t.length;
  return Z(() => {
    let x = (c) => {
      c.key === "Escape" && a(), c.key === "ArrowRight" && l((f) => (f + 1) % u), c.key === "ArrowLeft" && l((f) => (f - 1 + u) % u);
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [u, a]), /* @__PURE__ */ o("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: a, children: [
    /* @__PURE__ */ e("button", { className: "jt-lb-close", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ e(bt, { size: 24 }) }),
    /* @__PURE__ */ e("div", { className: "jt-lb-stage", onClick: (x) => x.stopPropagation(), children: /* @__PURE__ */ e(ae, { id: t[r], className: "contain" }) }),
    u > 1 && /* @__PURE__ */ o(it, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (x) => {
            x.stopPropagation(), l((r - 1 + u) % u);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ e(ha, { size: 26 })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (x) => {
            x.stopPropagation(), l((r + 1) % u);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ e(De, { size: 26 })
        }
      ),
      /* @__PURE__ */ o("div", { className: "jt-lb-count", children: [
        r + 1,
        " / ",
        u
      ] })
    ] })
  ] });
}
function Ya({ text: t }) {
  let n = t.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ e("p", { className: "jt-post-text", children: n.map(
    (a, r) => r % 2 ? /* @__PURE__ */ e("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: a }, r) : a
  ) });
}
function _e({ url: t, onRemove: n }) {
  let a = /* @__PURE__ */ o(it, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(ga, { size: 16 }) }),
    /* @__PURE__ */ o("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: $a(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return n ? /* @__PURE__ */ o("div", { className: "jt-linkcard", children: [
    a,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: n, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(bt, { size: 16 }) })
  ] }) : /* @__PURE__ */ o("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    a,
    /* @__PURE__ */ e(Pt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function Ja({ initial: t, onSave: n, onCancel: a }) {
  let [r, l] = N(t?.title || "가족 일본여행"), [u, x] = N(t?.start || tt(new Date(Date.now() + 30 * 864e5))), [c, f] = N(t?.days || 4), [y, d] = N(t?.members || []), [g, s] = N(t?.rate || 900), [w, b] = N(""), p = () => {
    let m = w.trim();
    !m || y.includes(m) || (d([...y, m]), b(""));
  }, i = r.trim() && u && y.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(Y, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: r, onChange: (m) => l(m.target.value) }) }),
      /* @__PURE__ */ e(Y, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: u, onChange: (m) => x(m.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => f(Math.max(1, c - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            c,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => f(Math.min(30, c + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: y.map((m) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(V, { name: m, members: y, size: 20 }),
          m,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => d(y.filter((k) => k !== m)), "aria-label": `${m} 빼기`, children: /* @__PURE__ */ e(bt, { size: 14 }) })
        ] }, m)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: w,
              onChange: (m) => b(m.target.value),
              onKeyDown: (m) => m.key === "Enter" && p(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: p, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(Y, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: g, onChange: (m) => s(Number(m.target.value) || 0) }) }),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-primary",
          disabled: !i,
          onClick: () => n({ title: r.trim(), start: u, days: c, members: y, rate: g || 900 }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      a && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: a, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(Xa, {})
    ] })
  ] });
}
function Xa() {
  let [t, n] = N(""), a = de();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ e("strong", { children: "가족 초대" }),
    /* @__PURE__ */ e("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: a });
          return;
        } catch (l) {
          if (l && l.name === "AbortError") return;
        }
      try {
        await navigator.clipboard.writeText(a), n("링크를 복사했어요. 가족 채팅방에 붙여넣어 주세요.");
      } catch {
        n("자동 복사가 안 돼요. 아래 '주소 보기'를 열어 길게 눌러 복사해 주세요.");
      }
    }, children: "초대 링크 보내기" }),
    t && /* @__PURE__ */ e("p", { className: "jt-hint jt-formmsg", children: t }),
    /* @__PURE__ */ o("details", { children: [
      /* @__PURE__ */ e("summary", { children: "주소 보기" }),
      /* @__PURE__ */ e("code", { children: a })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && me();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function qa({ members: t, onPick: n }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((a) => /* @__PURE__ */ o("button", { className: "jt-who-btn", onClick: () => n(a), children: [
      /* @__PURE__ */ e(V, { name: a, members: t, size: 40 }),
      a
    ] }, a)) })
  ] });
}
function Ga({ initial: t, dayItems: n = [], onSave: a, onDelete: r }) {
  let [l, u] = N(t?.time || ""), [x, c] = N(t?.end || ""), [f, y] = N(t?.title || ""), [d, g] = N(t?.place || ""), [s, w] = N(t?.memo || ""), [b, p] = N(!1), i = (F) => {
    if (y(F), !l || b) {
      let h = Pa(F);
      h ? (u(h), p(!0)) : b && (u(""), p(!1));
    }
  }, m = l && x && xt(x) <= xt(l), k = l ? n.filter((F) => {
    if (!F.time) return !1;
    let h = Ft({ time: l, end: m ? "" : x }), I = Ft(F);
    return h.s < I.e && I.s < h.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(Y, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: f, onChange: (F) => i(F.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    b && l && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      l,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          ve,
          {
            label: "시작",
            value: l,
            onChange: (F) => {
              u(F), p(!1), F || c("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(ve, { label: "끝", value: x, onChange: c, disabled: !l })
