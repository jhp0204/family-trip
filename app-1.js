// src/main.jsx
import { useState as gt, useEffect as io } from "react";
import { createRoot as so } from "react-dom/client";

// src/app.jsx
import { useState as N, useEffect as K, useMemo as Wt, useCallback as Ia, useRef as J } from "react";
import {
  Plus as Da,
  X as kt,
  Heart as de,
  Trash2 as Pa,
  MapPin as me,
  Settings as $a,
  CalendarDays as Ra,
  Wallet as _a,
  Check as Ze,
  ExternalLink as Rt,
  Map as La,
  MessageSquare as Ve,
  Image as Ta,
  Link2 as Ba,
  Send as Oa,
  Pencil as ue,
  ChevronLeft as Ua,
  ChevronRight as Qe,
  Utensils as Wa,
  TrainFront as Ka,
  BedDouble as Ha,
  Ticket as Ya,
  ShoppingBag as Ja,
  MoreHorizontal as Ga,
  Sun as qa,
  CloudSun as Xa,
  Cloud as Pe,
  CloudFog as Za,
  CloudDrizzle as Va,
  CloudRain as Qa,
  CloudSnow as tn,
  CloudLightning as en,
  Umbrella as an,
  SmilePlus as nn,
  LocateFixed as on,
  Star as rn,
  Navigation as sn
} from "lucide-react";

// src/store.js
import { initializeApp as wa } from "firebase/app";
import {
  initializeFirestore as ke,
  persistentLocalCache as ka,
  persistentMultipleTabManager as Na,
  collection as Ca,
  doc as Zt,
  onSnapshot as za,
  setDoc as ze,
  getDoc as Ea,
  deleteDoc as Ma
} from "firebase/firestore";
var zt = "fjt:", st = { config: null, code: null }, ee = (t) => btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), Sa = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
function ae(t) {
  try {
    let a = String(t || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, o = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!o) return null;
    let i = Sa(o);
    return i && i.c && i.t ? i : null;
  } catch {
    return null;
  }
}
function Ee() {
  let t = ae(location.hash);
  if (t)
    return localStorage.setItem(zt + "conn", JSON.stringify(t)), t;
  try {
    let a = JSON.parse(localStorage.getItem(zt + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + ee(a)), a;
  } catch {
  }
  return null;
}
function Me(t, a) {
  let n = { c: t, t: a };
  return localStorage.setItem(zt + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + ee(n)), n;
}
var Se = () => location.origin + location.pathname + "#j=" + ee({ c: st.config, t: st.code });
function Ae() {
  localStorage.removeItem(zt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var Fe = () => {
  let t = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => t[n % t.length]).join("");
};
function Ie(t) {
  let a = String(t || "");
  try {
    let o = JSON.parse(a);
    if (o.apiKey && o.projectId && o.appId) return o;
  } catch {
  }
  let n = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((o) => {
    let i = a.match(new RegExp(o + `\\s*[:=]\\s*["']([^"']+)["']`));
    i && (n[o] = i[1]);
  }), n.apiKey && n.projectId && n.appId ? n : null;
}
var ft = null, it = /* @__PURE__ */ new Map(), Vt = /* @__PURE__ */ new Set(), Qt = Promise.resolve(), Gt = null, Ne = null, Aa = () => {
  clearTimeout(Ne), Ne = setTimeout(() => Vt.forEach((t) => t()), 250);
}, te = (t) => t.startsWith("trip:photo:"), qt = (t) => te(t) ? Zt(ft, "trips", st.code, "photos", t.slice(11)) : Zt(ft, "trips", st.code, "data", t), Xt = (t) => zt + st.code + ":" + t, Ce = (t) => Promise.race([t.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function ne(t, a) {
  Gt && Gt(), it.clear(), st.config = t, st.code = a;
  let n = wa(t, "fjt-" + Date.now());
  try {
    ft = ke(n, { localCache: ka({ tabManager: Na() }) });
  } catch {
    ft = ke(n, {});
  }
  let o;
  Qt = new Promise((f) => o = f), setTimeout(() => o(), 6e3);
  let i = !0;
  Gt = za(
    Ca(ft, "trips", a, "data"),
    (f) => {
      f.docChanges().forEach((g) => {
        g.type === "removed" ? it.delete(g.doc.id) : it.set(g.doc.id, g.doc.data().v);
      }), o(), i || Aa(), i = !1;
    },
    () => o()
  ), window.storage = Fa;
}
async function De() {
  let t = Zt(ft, "trips", st.code, "data", "_ping");
  await Promise.race([
    ze(t, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var Fa = {
  async get(t, a) {
    if (!a) {
      let n = localStorage.getItem(Xt(t));
      if (n == null) throw new Error("not found");
      return { key: t, value: n, shared: !1 };
    }
    if (te(t)) {
      let n = await Ea(qt(t));
      if (!n.exists()) throw new Error("not found");
      return { key: t, value: n.data().v, shared: !0 };
    }
    if (await Qt, !it.has(t)) throw new Error("not found");
    return { key: t, value: it.get(t), shared: !0 };
  },
  async set(t, a, n) {
    return n ? (te(t) || it.set(t, a), await Ce(ze(qt(t), { v: a, t: Date.now() })), { key: t, value: a, shared: !0 }) : (localStorage.setItem(Xt(t), a), { key: t, value: a, shared: !1 });
  },
  async delete(t, a) {
    return a ? (it.delete(t), await Ce(Ma(qt(t))), { key: t, deleted: !0, shared: !0 }) : (localStorage.removeItem(Xt(t)), { key: t, deleted: !0, shared: !1 });
  },
  async list(t = "", a) {
    return a ? (await Qt, { keys: [...it.keys()].filter((n) => n.startsWith(t)), prefix: t, shared: !0 }) : { keys: [], prefix: t, shared: !1 };
  },
  onChange(t) {
    return Vt.add(t), () => Vt.delete(t);
  }
};

// src/app.jsx
import { Fragment as nt, jsx as e, jsxs as r } from "react/jsx-runtime";
var B = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", board: "trip:board", fx: "trip:fx" }, ge = (t) => "trip:photo:" + t, X = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], ln = ["일", "월", "화", "수", "목", "금", "토"], fe = ["맛집", "관광", "쇼핑", "기타"], ta = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], jt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Et = 6, $e = {
  식비: { Icon: Wa, color: "#D9262E" },
  교통: { Icon: Ka, color: "#0C86AE" },
  숙소: { Icon: Ha, color: "#7B5FC4" },
  체험: { Icon: Ya, color: "#E8800A" },
  쇼핑: { Icon: Ja, color: "#0A9B6E" },
  기타: { Icon: Ga, color: "#66718A" }
}, se = (t) => $e[t] || $e.기타, lt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ot = (t) => new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), mt = (t) => {
  let [a, n, o] = t.split("-").map(Number);
  return new Date(a, n - 1, o);
}, rt = (t, a) => {
  let n = mt(t);
  return n.setDate(n.getDate() + a), n;
}, It = (t) => `${t.getMonth() + 1}/${t.getDate()}`, Dt = (t) => ln[t.getDay()], Y = (t) => "¥" + Math.round(t).toLocaleString("ko-KR"), Pt = (t, a) => "₩" + (Math.round(t * a / 100 / 10) * 10).toLocaleString("ko-KR"), et = (t) => String(t).padStart(2, "0"), ea = (t) => {
  let a = (Date.now() - t) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(t);
  return `${n.getMonth() + 1}/${n.getDate()} ${et(n.getHours())}:${et(n.getMinutes())}`;
}, Re = (t) => {
  let a = (t || "").trim();
  if (!a) return "";
  /^https?:\/\//i.test(a) || (a = "https://" + a);
  try {
    let n = new URL(a);
    return n.hostname.includes(".") ? n.href : "";
  } catch {
    return "";
  }
}, pn = (t) => {
  try {
    return new URL(t).hostname.replace(/^www\./, "");
  } catch {
    return t;
  }
}, vt = (t) => {
  let [a, n] = String(t).split(":").map(Number);
  return a * 60 + (n || 0);
}, oe = (t) => `${et(Math.floor(t / 60) % 24)}:${et(t % 60)}`, $t = (t) => {
  let a = vt(t.time), n = t.end ? vt(t.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, aa = (t) => {
  let a = Math.floor(t / 60), n = t % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function cn(t) {
  let a = t || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${et(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let o = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${et(Number(n[2]))}:${et(o)}`;
}
var dn = Array.from({ length: 24 }, (t, a) => et(a));
function _e({ value: t, onChange: a, disabled: n, label: o }) {
  let [i, f] = t ? t.split(":") : ["", ""], g = Array.from({ length: 12 }, (c, d) => et(d * 5));
  return f && !g.includes(f) && (g = [...g, f].sort()), /* @__PURE__ */ r("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ r(
      "select",
      {
        "aria-label": o + " 시",
        value: i,
        disabled: n,
        onChange: (c) => a(c.target.value ? `${c.target.value}:${f || "00"}` : ""),
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          dn.map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
        ]
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ r(
      "select",
      {
        "aria-label": o + " 분",
        value: f,
        disabled: n || !i,
        onChange: (c) => a(`${i}:${c.target.value}`),
        children: [
          !i && /* @__PURE__ */ e("option", { value: "", children: "--" }),
          g.map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
        ]
      }
    )
  ] });
}
var mn = (t) => {
  let a = t.filter((o) => o.time).map((o) => ({ id: o.id, ...$t(o) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (o) => a.forEach((i) => {
      o.id !== i.id && o.s < i.e && i.s < o.e && n.add(o.id);
    })
  ), n;
}, un = (...t) => [...t, "일본"].filter(Boolean).join(" "), _t = (t) => typeof t.lat == "number" && typeof t.lng == "number", na = (t) => _t(t) ? `${t.lat},${t.lng}` : un(t.name || t.title, t.area || t.place), Ht = (t) => /^https?:\/\//.test(t.link || "") ? t.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(na(t)), gn = (t) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(na(t)), ct = 256, re = (t, a, n) => {
  let o = ct * 2 ** n, i = t * Math.PI / 180;
  return {
    x: (a + 180) / 360 * o,
    y: (1 - Math.log(Math.tan(i) + 1 / Math.cos(i)) / Math.PI) / 2 * o
  };
}, Le = (t, a, n) => {
  let o = ct * 2 ** n, i = Math.PI - 2 * Math.PI * a / o;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(i)), lng: t / o * 360 - 180 };
}, Mt = (t) => Math.max(3, Math.min(18, t));
async function pt(t, a) {
  try {
    let n = await window.storage.get(t, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function Bt(t, a) {
  try {
    return !!await window.storage.set(t, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var dt = /* @__PURE__ */ new Map(), Ot = /* @__PURE__ */ new Map();
function fn(t) {
  if (dt.has(t)) return Promise.resolve(dt.get(t));
  if (Ot.has(t)) return Ot.get(t);
  let a = pt(ge(t), null).then((n) => (Ot.delete(t), n && dt.set(t, n), n));
  return Ot.set(t, a), a;
}
async function Te(t) {
  dt.delete(t);
  try {
    await window.storage.delete(ge(t), !0);
  } catch {
  }
}
var hn = (t) => new Promise((a, n) => {
  let o = URL.createObjectURL(t), i = new Image();
  i.onload = () => {
    URL.revokeObjectURL(o), a(i);
  }, i.onerror = () => {
    URL.revokeObjectURL(o), n(new Error("bad image"));
  }, i.src = o;
});
async function bn(t) {
  let a = await hn(t), n = 1280, o = 0.7, i = "";
  for (let f = 0; f < 5; f++) {
    let g = Math.min(1, n / Math.max(a.naturalWidth, a.naturalHeight)), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(a.naturalWidth * g)), c.height = Math.max(1, Math.round(a.naturalHeight * g));
    let d = c.getContext("2d");
    if (d.fillStyle = "#fff", d.fillRect(0, 0, c.width, c.height), d.drawImage(a, 0, 0, c.width, c.height), i = c.toDataURL("image/jpeg", o), i.length < 6e5) break;
    n = Math.round(n * 0.8), o = Math.max(0.4, o - 0.08);
  }
  return i;
}
var xn = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (t) => ({ rate: t.rates.KRW * 100, date: t.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (t) => ({ rate: t.rates.KRW * 100, date: ot(new Date(t.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function jn() {
  for (let [t, a] of xn)
    try {
      let n = await fetch(t);
      if (!n.ok) continue;
      let o = a(await n.json());
      if (o.rate > 0) return o;
    } catch {
    }
  return null;
}
var Be = (t) => t.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), Kt = (t) => t.fx ? `100엔 = ₩${Be(t.rate)} (${t.fx.source}, ${t.fx.date.slice(5).replace("-", "/")}${t.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${Be(t.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Oe(t, a) {
  let n = () => Object.fromEntries(a.map((h) => [h, 0])), o = n(), i = n(), f = [];
  t.forEach((h) => {
    let w = Number(h.amount) || 0, m = (h.split || []).filter((p) => a.includes(p));
    if (!(w <= 0)) {
      if (!m.length || !a.includes(h.payer)) {
        f.push(h);
        return;
      }
      o[h.payer] += w, m.forEach((p) => i[p] += w / m.length);
    }
  });
  let g = Object.fromEntries(a.map((h) => [h, o[h] - i[h]])), c = a.filter((h) => g[h] > 0.5).map((h) => ({ m: h, v: g[h] })).sort((h, w) => w.v - h.v), d = a.filter((h) => g[h] < -0.5).map((h) => ({ m: h, v: -g[h] })).sort((h, w) => w.v - h.v), x = [], j = 0, y = 0;
  for (; j < d.length && y < c.length; ) {
    let h = Math.min(d[j].v, c[y].v);
    h >= 1 && x.push({ from: d[j].m, to: c[y].m, v: Math.round(h) }), d[j].v -= h, c[y].v -= h, d[j].v < 0.5 && j++, c[y].v < 0.5 && y++;
  }
  return { paid: o, share: i, net: g, moves: x, skipped: f };
}
function at({ name: t, members: a, size: n = 28 }) {
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
function St({ title: t, onClose: a, children: n }) {
  return K(() => {
    let o = (i) => i.key === "Escape" && a();
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, [a]), /* @__PURE__ */ e("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ r("div", { className: "jt-sheet", role: "dialog", "aria-label": t, onClick: (o) => o.stopPropagation(), children: [
    /* @__PURE__ */ r("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ e("h3", { children: t }),
      /* @__PURE__ */ e("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ e(kt, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function ut({ onConfirm: t, label: a = "삭제" }) {
  let [n, o] = N(!1);
  return K(() => {
    if (!n) return;
    let i = setTimeout(() => o(!1), 3e3);
    return () => clearTimeout(i);
  }, [n]), /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      className: "jt-del" + (n ? " armed" : ""),
      onClick: (i) => {
        i.stopPropagation(), n ? t() : o(!0);
      },
      children: [
        /* @__PURE__ */ e(Pa, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
function he({ id: t, data: a, className: n, onClick: o, alt: i = "사진" }) {
  let [f, g] = N(a || dt.get(t) || null), [c, d] = N(!1);
  K(() => {
    if (a) {
      g(a);
      return;
    }
    if (dt.has(t)) {
      g(dt.get(t));
      return;
    }
    let j = !0;
    return d(!1), fn(t).then((y) => {
      j && (y ? g(y) : d(!0));
    }), () => {
      j = !1;
    };
  }, [t, a]);
  let x = f ? /* @__PURE__ */ e("img", { src: f, alt: i, draggable: !1 }) : /* @__PURE__ */ e("span", { className: "jt-photo-wait", children: c ? "사진을 불러오지 못했어요" : "불러오는 중" });
  return o ? /* @__PURE__ */ e("button", { type: "button", className: "jt-photo " + (n || ""), onClick: o, "aria-label": "사진 크게 보기", children: x }) : /* @__PURE__ */ e("span", { className: "jt-photo " + (n || ""), children: x });
}
function vn({ photos: t, index: a, onClose: n }) {
  let [o, i] = N(a), f = t.length;
  return K(() => {
    let g = (c) => {
      c.key === "Escape" && n(), c.key === "ArrowRight" && i((d) => (d + 1) % f), c.key === "ArrowLeft" && i((d) => (d - 1 + f) % f);
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [f, n]), /* @__PURE__ */ r("div", { className: "jt-lightbox", role: "dialog", "aria-label": "사진 보기", onClick: n, children: [
    /* @__PURE__ */ e("button", { className: "jt-lb-close", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ e(kt, { size: 24 }) }),
    /* @__PURE__ */ e("div", { className: "jt-lb-stage", onClick: (g) => g.stopPropagation(), children: /* @__PURE__ */ e(he, { id: t[o], className: "contain" }) }),
    f > 1 && /* @__PURE__ */ r(nt, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav prev",
          onClick: (g) => {
            g.stopPropagation(), i((o - 1 + f) % f);
          },
          "aria-label": "이전 사진",
          children: /* @__PURE__ */ e(Ua, { size: 26 })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "jt-lb-nav next",
          onClick: (g) => {
            g.stopPropagation(), i((o + 1) % f);
          },
          "aria-label": "다음 사진",
          children: /* @__PURE__ */ e(Qe, { size: 26 })
        }
      ),
      /* @__PURE__ */ r("div", { className: "jt-lb-count", children: [
        o + 1,
        " / ",
        f
      ] })
    ] })
  ] });
}
function yn({ text: t }) {
  let a = t.split(/(https?:\/\/[^\s]+)/g);
  return /* @__PURE__ */ e("p", { className: "jt-post-text", children: a.map(
    (n, o) => o % 2 ? /* @__PURE__ */ e("a", { href: n, target: "_blank", rel: "noopener noreferrer", children: n }, o) : n
  ) });
}
var Ue = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function oa(t) {
  let a = {};
  if (Object.entries(t.reactions || {}).forEach(([n, o]) => a[n] = [...o]), t.boardLikes && (t.likes || []).length) {
    let n = new Set(Object.values(a).flat()), o = t.likes.filter((i) => !n.has(i));
    o.length && (a["❤️"] = [...a["❤️"] || [], ...o]);
  }
  return a;
}
function wn(t, a, n, o) {
  let i = oa({ ...t, boardLikes: o }), f = (i[a] || []).includes(n), g = {};
  Object.entries(i).forEach(([d, x]) => {
    let j = x.filter((y) => y !== n);
    j.length && (g[d] = j);
  }), f || (g[a] = [...g[a] || [], n]);
  let c = { ...t, reactions: g };
  return o && (c.likes = []), c;
}
function Yt({ item: t, me: a, onReact: n, boardLikes: o = !1 }) {
  let [i, f] = N(!1), [g, c] = N("up right"), d = J(null), x = oa({ ...t, boardLikes: o }), j = () => {
    if (!i && d.current) {
      let m = d.current.getBoundingClientRect(), s = d.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", v = m.top < 190 ? "down" : "up";
      c(v + " " + s);
    }
    f(!i);
  }, y = Ue.filter(([m]) => (x[m] || []).length), h = Object.keys(x).find((m) => x[m].includes(a));
  K(() => {
    if (!i) return;
    let m = (p) => d.current && !d.current.contains(p.target) && f(!1);
    return document.addEventListener("pointerdown", m), () => document.removeEventListener("pointerdown", m);
  }, [i]);
  let w = (m) => {
    n(m), f(!1);
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: "jt-react",
      ref: d,
      onClick: (m) => m.stopPropagation(),
      onKeyDown: (m) => m.stopPropagation(),
      children: [
        y.map(([m, p]) => /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "jt-rchip" + (h === m ? " on" : ""),
            onClick: () => w(m),
            "aria-pressed": h === m,
            "aria-label": `${p} ${x[m].length}명: ${x[m].join(", ")}`,
            title: x[m].join(", "),
            children: [
              /* @__PURE__ */ e("span", { className: "jt-emoji", children: m }),
              x[m].length
            ]
          },
          m
        )),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (i ? " open" : ""),
            onClick: j,
            "aria-expanded": i,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ e(nn, { size: 16 })
          }
        ),
        i && /* @__PURE__ */ r("div", { className: "jt-rpop " + g, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ e("div", { className: "jt-rpop-row", children: Ue.map(([m, p]) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (h === m ? " on" : ""),
              onClick: () => w(m),
              "aria-label": p,
              title: p,
              children: m
            },
            m
          )) }),
          y.length > 0 && /* @__PURE__ */ e("ul", { className: "jt-rwho", children: y.map(([m]) => /* @__PURE__ */ r("li", { children: [
            /* @__PURE__ */ e("span", { className: "jt-emoji", children: m }),
            x[m].join(", ")
          ] }, m)) })
        ] })
      ]
    }
  );
}
function be({ count: t, open: a, onClick: n }) {
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
        /* @__PURE__ */ e(Ve, { size: 15 }),
        "댓글 ",
        t || 0
      ]
    }
  );
}
function Jt({ comments: t = [], me: a, members: n, onAdd: o, onDelete: i }) {
  let [f, g] = N(""), c = () => {
    let d = f.trim();
    d && (o(d), g(""));
  };
  return /* @__PURE__ */ r("div", { className: "jt-comments", onClick: (d) => d.stopPropagation(), onKeyDown: (d) => d.stopPropagation(), children: [
    t.length === 0 && /* @__PURE__ */ e("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ e("ul", { children: t.map((d) => /* @__PURE__ */ r("li", { className: "jt-comment", children: [
      /* @__PURE__ */ e(at, { name: d.by, members: n, size: 24 }),
      /* @__PURE__ */ r("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("strong", { children: d.by }),
          /* @__PURE__ */ e("span", { children: ea(d.createdAt) })
        ] }),
        /* @__PURE__ */ e("p", { children: d.text })
      ] }),
      d.by === a && /* @__PURE__ */ e(ut, { onConfirm: () => i(d.id), label: "" })
    ] }, d.id)) }),
    /* @__PURE__ */ r("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: f,
          onChange: (d) => g(d.target.value),
          onKeyDown: (d) => d.key === "Enter" && !d.nativeEvent.isComposing && c(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "jt-send", onClick: c, disabled: !f.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ e(Oa, { size: 18 }) })
    ] })
  ] });
}
function ra({ url: t, onRemove: a }) {
  let n = /* @__PURE__ */ r(nt, { children: [
    /* @__PURE__ */ e("span", { className: "jt-linkcard-icon", children: /* @__PURE__ */ e(Ba, { size: 16 }) }),
    /* @__PURE__ */ r("span", { className: "jt-linkcard-text", children: [
      /* @__PURE__ */ e("strong", { children: pn(t) }),
      /* @__PURE__ */ e("span", { children: t })
    ] })
  ] });
  return a ? /* @__PURE__ */ r("div", { className: "jt-linkcard", children: [
    n,
    /* @__PURE__ */ e("button", { type: "button", className: "jt-icon sm", onClick: a, "aria-label": "링크 빼기", children: /* @__PURE__ */ e(kt, { size: 16 }) })
  ] }) : /* @__PURE__ */ r("a", { className: "jt-linkcard", href: t, target: "_blank", rel: "noopener noreferrer", children: [
    n,
    /* @__PURE__ */ e(Rt, { size: 15, className: "jt-linkcard-go" })
  ] });
}
function kn({ initial: t, onSave: a, onCancel: n }) {
  let [o, i] = N(t?.title || "가족 일본여행"), [f, g] = N(t?.start || ot(new Date(Date.now() + 30 * 864e5))), [c, d] = N(t?.days || 4), [x, j] = N(t?.members || []), [y, h] = N(t?.rate || 900), [w, m] = N(t?.gmapsKey || ""), [p, s] = N(""), v = () => {
    let b = p.trim();
    !b || x.includes(b) || (j([...x, b]), s(""));
  }, u = o.trim() && f && x.length > 0;
  return /* @__PURE__ */ r("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: t ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ r("div", { className: "jt-form", children: [
      /* @__PURE__ */ e(V, { label: "여행 이름", children: /* @__PURE__ */ e("input", { value: o, onChange: (b) => i(b.target.value) }) }),
      /* @__PURE__ */ e(V, { label: "출발일", children: /* @__PURE__ */ e("input", { type: "date", value: f, onChange: (b) => g(b.target.value) }) }),
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "여행 일수" }),
        /* @__PURE__ */ r("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ e("button", { type: "button", onClick: () => d(Math.max(1, c - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ r("strong", { children: [
            c,
            "일"
          ] }),
          /* @__PURE__ */ e("button", { type: "button", onClick: () => d(Math.min(30, c + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ e("div", { className: "jt-chips", children: x.map((b) => /* @__PURE__ */ r("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ e(at, { name: b, members: x, size: 20 }),
          b,
          /* @__PURE__ */ e("button", { type: "button", onClick: () => j(x.filter((l) => l !== b)), "aria-label": `${b} 빼기`, children: /* @__PURE__ */ e(kt, { size: 14 }) })
        ] }, b)) }),
        /* @__PURE__ */ r("div", { className: "jt-inline", children: [
          /* @__PURE__ */ e(
            "input",
            {
              value: p,
              onChange: (b) => s(b.target.value),
              onKeyDown: (b) => b.key === "Enter" && v(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ e("button", { type: "button", className: "jt-secondary", onClick: v, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ e(V, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ e("input", { type: "number", inputMode: "numeric", value: y, onChange: (b) => h(Number(b.target.value) || 0) }) }),
      /* @__PURE__ */ e(V, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ e(
        "input",
        {
          value: w,
          onChange: (b) => m(b.target.value.trim()),
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
          disabled: !u,
          onClick: () => a({ title: o.trim(), start: f, days: c, members: x, rate: y || 900, gmapsKey: w }),
          children: t ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ e("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ e("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ e(Nn, {})
    ] })
  ] });
}
function Nn() {
  let [t, a] = N(""), n = Se();
  return /* @__PURE__ */ r("div", { className: "jt-invite", children: [
    /* @__PURE__ */ e("strong", { children: "가족 초대" }),
    /* @__PURE__ */ e("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ e("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: n });
          return;
        } catch (i) {
          if (i && i.name === "AbortError") return;
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && Ae();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Cn({ members: t, onPick: a }) {
  return /* @__PURE__ */ r("div", { className: "jt-setup", children: [
    /* @__PURE__ */ e("h1", { children: "누구로 들어올까요?" }),
    /* @__PURE__ */ e("div", { className: "jt-who-list", children: t.map((n) => /* @__PURE__ */ r("button", { className: "jt-who-btn", onClick: () => a(n), children: [
      /* @__PURE__ */ e(at, { name: n, members: t, size: 40 }),
      n
    ] }, n)) })
  ] });
}
function zn({ initial: t, dayItems: a = [], onSave: n, onDelete: o }) {
  let [i, f] = N(t?.time || ""), [g, c] = N(t?.end || ""), [d, x] = N(t?.title || ""), [j, y] = N(t?.place || ""), [h, w] = N(t?.memo || ""), [m, p] = N(!1), s = (b) => {
    if (x(b), !i || m) {
      let l = cn(b);
      l ? (f(l), p(!0)) : m && (f(""), p(!1));
    }
  }, v = i && g && vt(g) <= vt(i), u = i ? a.filter((b) => {
    if (!b.time) return !1;
    let l = $t({ time: i, end: v ? "" : g }), M = $t(b);
    return l.s < M.e && M.s < l.e;
  }) : [];
  return /* @__PURE__ */ r("div", { className: "jt-form", children: [
    /* @__PURE__ */ e(V, { label: "무엇을 하나요", children: /* @__PURE__ */ e("input", { value: d, onChange: (b) => s(b.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    m && i && /* @__PURE__ */ r("p", { className: "jt-hint", children: [
      "제목에서 ",
      i,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ r("div", { className: "jt-two", children: [
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ e(
          _e,
          {
            label: "시작",
            value: i,
            onChange: (b) => {
              f(b), p(!1), b || c("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "jt-field", children: [
        /* @__PURE__ */ e("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ e(_e, { label: "끝", value: g, onChange: c, disabled: !i })
      ] })
    ] }),
    i && !g && /* @__PURE__ */ e("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    v && /* @__PURE__ */ e("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    i && g && !v && /* @__PURE__ */ r("p", { className: "jt-hint", children: [
      aa(vt(g) - vt(i)),
      " 동안"
    ] }),
    u.length > 0 && /* @__PURE__ */ r("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      u.map((b) => `'${b.title}'(${b.time}${b.end ? `~${b.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ e(V, { label: "장소 (선택)", children: /* @__PURE__ */ e("input", { value: j, onChange: (b) => y(b.target.value), placeholder: "예: 아사쿠사" }) }),
    /* @__PURE__ */ e(V, { label: "메모 (선택)", children: /* @__PURE__ */ e("textarea", { rows: 2, value: h, onChange: (b) => w(b.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ e(
      "button",
      {
        className: "jt-primary",
