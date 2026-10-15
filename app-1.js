// src/main.jsx
import { useState as It, useEffect as oi } from "react";
import { createRoot as ii } from "react-dom/client";

// src/app.jsx
import Sn, { useState as w, useEffect as U, useMemo as te, useCallback as In, useRef as J } from "react";
import {
  Plus as Fn,
  X as Te,
  Heart as Be,
  Trash2 as Dn,
  MapPin as Et,
  Settings as $n,
  CalendarDays as Pn,
  Wallet as Rn,
  Check as _a,
  ExternalLink as Ut,
  Map as _n,
  MessageSquare as Tn,
  Send as Ta,
  Pencil as ge,
  ChevronLeft as Bn,
  ChevronRight as Ln,
  ChevronDown as Lt,
  ChevronUp as Ba,
  Users as On,
  Crosshair as Un,
  HelpCircle as Kn,
  MessagesSquare as Wn,
  Megaphone as Hn,
  Pin as Yn,
  PinOff as ya,
  Utensils as Jn,
  TrainFront as Xn,
  BedDouble as qn,
  Ticket as Gn,
  ShoppingBag as Vn,
  MoreHorizontal as Zn,
  Sun as Qn,
  CloudSun as to,
  Cloud as wa,
  CloudFog as eo,
  CloudDrizzle as ao,
  CloudRain as no,
  CloudSnow as oo,
  CloudLightning as io,
  Umbrella as ro,
  SmilePlus as so,
  LocateFixed as lo,
  Star as co,
  Navigation as vt
} from "lucide-react";

// src/store.js
import { initializeApp as yn } from "firebase/app";
import {
  initializeFirestore as la,
  persistentLocalCache as wn,
  persistentMultipleTabManager as kn,
  collection as Nn,
  doc as ma,
  onSnapshot as Cn,
  setDoc as ua,
  deleteDoc as zn
} from "firebase/firestore";
var qt = "fjt:", Nt = { config: null, code: null }, Ne = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), En = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function Ce(e) {
  try {
    let a = String(e || "").trim(), n = a.includes("#") ? a.slice(a.indexOf("#") + 1) : a, i = new URLSearchParams(n).get("j") || (n.startsWith("j=") ? n.slice(2) : "");
    if (!i) return null;
    let r = En(i);
    return r && r.c && r.t ? r : null;
  } catch {
    return null;
  }
}
function ga() {
  let e = Ce(location.hash);
  if (e)
    return localStorage.setItem(qt + "conn", JSON.stringify(e)), e;
  try {
    let a = JSON.parse(localStorage.getItem(qt + "conn"));
    if (a && a.c && a.t)
      return history.replaceState(null, "", "#j=" + Ne(a)), a;
  } catch {
  }
  return null;
}
function fa(e, a) {
  let n = { c: e, t: a };
  return localStorage.setItem(qt + "conn", JSON.stringify(n)), history.replaceState(null, "", "#j=" + Ne(n)), n;
}
var ba = () => location.origin + location.pathname + "#j=" + Ne({ c: Nt.config, t: Nt.code });
function xa() {
  localStorage.removeItem(qt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var ha = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", a = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(a, (n) => e[n % e.length]).join("");
};
function ja(e) {
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
var Xt = null, xt = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Set(), ke = Promise.resolve(), ve = null, ca = null, Mn = () => {
  clearTimeout(ca), ca = setTimeout(() => we.forEach((e) => e()), 250);
}, pa = (e) => ma(Xt, "trips", Nt.code, "data", e), ye = (e) => qt + Nt.code + ":" + e, da = (e) => Promise.race([e.then(() => !0), new Promise((a) => setTimeout(() => a(!0), 4e3))]);
function ze(e, a) {
  ve && ve(), xt.clear(), Nt.config = e, Nt.code = a;
  let n = yn(e, "fjt-" + Date.now());
  try {
    Xt = la(n, { localCache: wn({ tabManager: kn() }) });
  } catch {
    Xt = la(n, {});
  }
  let i;
  ke = new Promise((v) => i = v), setTimeout(() => i(), 6e3);
  let r = !0;
  ve = Cn(
    Nn(Xt, "trips", a, "data"),
    (v) => {
      v.docChanges().forEach((x) => {
        x.type === "removed" ? xt.delete(x.doc.id) : xt.set(x.doc.id, x.doc.data().v);
      }), i(), r || Mn(), r = !1;
    },
    () => i()
  ), window.storage = An;
}
async function va() {
  let e = ma(Xt, "trips", Nt.code, "data", "_ping");
  await Promise.race([
    ua(e, { v: "ok", t: Date.now() }),
    new Promise((a, n) => setTimeout(() => n(new Error("timeout")), 9e3))
  ]);
}
var An = {
  async get(e, a) {
    if (!a) {
      let n = localStorage.getItem(ye(e));
      if (n == null) throw new Error("not found");
      return { key: e, value: n, shared: !1 };
    }
    if (await ke, !xt.has(e)) throw new Error("not found");
    return { key: e, value: xt.get(e), shared: !0 };
  },
  async set(e, a, n) {
    return n ? (xt.set(e, a), await da(ua(pa(e), { v: a, t: Date.now() })), { key: e, value: a, shared: !0 }) : (localStorage.setItem(ye(e), a), { key: e, value: a, shared: !1 });
  },
  async delete(e, a) {
    return a ? (xt.delete(e), await da(zn(pa(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(ye(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", a) {
    return a ? (await ke, { keys: [...xt.keys()].filter((n) => n.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
  },
  onChange(e) {
    return we.add(e), () => we.delete(e);
  }
};

// src/app.jsx
import { Fragment as pt, jsx as t, jsxs as o } from "react/jsx-runtime";
var q = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice" }, V = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], po = ["일", "월", "화", "수", "목", "금", "토"], Le = ["맛집", "관광", "쇼핑", "기타"], La = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Bt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, ka = {
  식비: { Icon: Jn, color: "#D9262E" },
  교통: { Icon: Xn, color: "#0C86AE" },
  숙소: { Icon: qn, color: "#7B5FC4" },
  체험: { Icon: Gn, color: "#E8800A" },
  쇼핑: { Icon: Vn, color: "#0A9B6E" },
  기타: { Icon: Zn, color: "#66718A" }
}, De = (e) => ka[e] || ka.기타, $t = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ct = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Ct = (e) => {
  let [a, n, i] = e.split("-").map(Number);
  return new Date(a, n - 1, i);
}, gt = (e, a) => {
  let n = Ct(e);
  return n.setDate(n.getDate() + a), n;
}, ae = (e) => `${e.getMonth() + 1}/${e.getDate()}`, Mt = (e) => po[e.getDay()], G = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), ne = (e, a) => "₩" + (Math.round(e * a / 100 / 10) * 10).toLocaleString("ko-KR"), nt = (e) => String(e).padStart(2, "0"), $e = (e) => {
  let a = (Date.now() - e) / 1e3;
  if (a < 60) return "방금";
  if (a < 3600) return `${Math.floor(a / 60)}분 전`;
  if (a < 86400) return `${Math.floor(a / 3600)}시간 전`;
  let n = new Date(e);
  return `${n.getMonth() + 1}/${n.getDate()} ${nt(n.getHours())}:${nt(n.getMinutes())}`;
}, zt = (e) => {
  let [a, n] = String(e).split(":").map(Number);
  return a * 60 + (n || 0);
}, Rt = (e) => `${nt(Math.floor(e / 60) % 24)}:${nt(e % 60)}`, oe = (e) => {
  let a = zt(e.time), n = e.end ? zt(e.end) : a + 60;
  return n <= a && (n = a + 60), { s: a, e: Math.min(n, 24 * 60) };
}, Oa = (e) => {
  let a = Math.floor(e / 60), n = e % 60;
  return [a ? `${a}시간` : "", n ? `${n}분` : ""].filter(Boolean).join(" ");
};
function mo(e) {
  let a = e || "", n = a.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (n) return `${nt(Number(n[2]))}:${n[3]}`;
  if (n = a.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !n) return "";
  let i = n[3] === "반" ? 30 : n[4] ? Number(n[4]) : 0;
  return `${nt(Number(n[2]))}:${nt(i)}`;
}
var uo = Array.from({ length: 24 }, (e, a) => nt(a));
function Na({ value: e, onChange: a, disabled: n, label: i }) {
  let [r, v] = e ? e.split(":") : ["", ""], x = Array.from({ length: 12 }, (b, u) => nt(u * 5));
  return v && !x.includes(v) && (x = [...x, v].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (n ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 시",
        value: r,
        disabled: n,
        onChange: (b) => a(b.target.value ? `${b.target.value}:${v || "00"}` : ""),
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "--" }),
          uo.map((b) => /* @__PURE__ */ t("option", { value: b, children: b }, b))
        ]
      }
    ),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 분",
        value: v,
        disabled: n || !r,
        onChange: (b) => a(`${r}:${b.target.value}`),
        children: [
          !r && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          x.map((b) => /* @__PURE__ */ t("option", { value: b, children: b }, b))
        ]
      }
    )
  ] });
}
var go = (e) => {
  let a = e.filter((i) => i.time).map((i) => ({ id: i.id, ...oe(i) })), n = /* @__PURE__ */ new Set();
  return a.forEach(
    (i) => a.forEach((r) => {
      i.id !== r.id && i.s < r.e && r.s < i.e && n.add(i.id);
    })
  ), n;
}, de = (e) => dt(e) ? `${e.lat},${e.lng}` : e.place ? Oe(e.place) : "", fo = (e, a) => {
  let n = e ? de(e) : "", i = de(a);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (n ? "&origin=" + encodeURIComponent(n) : "");
}, fe = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(dt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), Oe = (...e) => [...e, "일본"].filter(Boolean).join(" "), dt = (e) => typeof e.lat == "number" && typeof e.lng == "number", Ua = (e) => dt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place), At = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Ua(e)), bo = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Ua(e)), jt = 256, Ee = (e, a, n) => {
  let i = jt * 2 ** n, r = e * Math.PI / 180;
  return {
    x: (a + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * i
  };
}, Ca = (e, a, n) => {
  let i = jt * 2 ** n, r = Math.PI - 2 * Math.PI * a / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(r)), lng: e / i * 360 - 180 };
}, Gt = (e) => Math.max(3, Math.min(18, e));
async function Me(e) {
  let a = await window.storage.list(e, !0), n = (a && a.keys || []).map((r) => typeof r == "string" ? r : r.key).filter(Boolean), i = await Promise.all(n.map((r) => ht(r, null)));
  return n.map((r, v) => [r, i[v]]).filter(([, r]) => r);
}
async function ht(e, a) {
  try {
    let n = await window.storage.get(e, !0);
    return n && n.value ? JSON.parse(n.value) : a;
  } catch {
    return a;
  }
}
async function ut(e, a) {
  try {
    return !!await window.storage.set(e, JSON.stringify(a), !0);
  } catch {
    return !1;
  }
}
var xo = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: ct(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function ho() {
  for (let [e, a] of xo)
    try {
      let n = await fetch(e);
      if (!n.ok) continue;
      let i = a(await n.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var za = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), me = (e) => e.fx ? `100엔 = ₩${za(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${za(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Ea(e, a) {
  let n = () => Object.fromEntries(a.map((f) => [f, 0])), i = n(), r = n(), v = [];
  e.forEach((f) => {
    let z = Number(f.amount) || 0, C = (f.split || []).filter((s) => a.includes(s));
    if (!(z <= 0)) {
      if (!C.length || !a.includes(f.payer)) {
        v.push(f);
        return;
      }
      i[f.payer] += z, C.forEach((s) => r[s] += z / C.length);
    }
  });
  let x = Object.fromEntries(a.map((f) => [f, i[f] - r[f]])), b = a.filter((f) => x[f] > 0.5).map((f) => ({ m: f, v: x[f] })).sort((f, z) => z.v - f.v), u = a.filter((f) => x[f] < -0.5).map((f) => ({ m: f, v: -x[f] })).sort((f, z) => z.v - f.v), y = [], c = 0, M = 0;
  for (; c < u.length && M < b.length; ) {
    let f = Math.min(u[c].v, b[M].v);
    f >= 1 && y.push({ from: u[c].m, to: b[M].m, v: Math.round(f) }), u[c].v -= f, b[M].v -= f, u[c].v < 0.5 && c++, b[M].v < 0.5 && M++;
  }
  return { paid: i, share: r, net: x, moves: y, skipped: v };
}
function rt({ name: e, members: a, size: n = 28 }) {
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
function _t({ title: e, onClose: a, children: n }) {
  return U(() => {
    let i = (r) => r.key === "Escape" && a();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: a, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: a, "aria-label": "닫기", children: /* @__PURE__ */ t(Te, { size: 20 }) })
    ] }),
    n
  ] }) });
}
function St({ onConfirm: e, label: a = "삭제" }) {
  let [n, i] = w(!1);
  return U(() => {
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
        /* @__PURE__ */ t(Dn, { size: 15 }),
        n ? "한 번 더 누르면 삭제돼요" : a
      ]
    }
  );
}
var Ma = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Ka(e) {
  let a = {};
  return Object.entries(e.reactions || {}).forEach(([n, i]) => a[n] = [...i]), a;
}
function jo(e, a, n) {
  let i = Ka(e), r = (i[a] || []).includes(n), v = {};
  return Object.entries(i).forEach(([x, b]) => {
    let u = b.filter((y) => y !== n);
    u.length && (v[x] = u);
  }), r || (v[a] = [...v[a] || [], n]), { ...e, reactions: v };
}
function Ue({ className: e, onTap: a, names: n = [], title: i, members: r = [], children: v, ...x }) {
  let [b, u] = w(!1), [y, c] = w("up left"), M = J(null), f = J(null), z = J(!1);
  U(() => {
    if (!b) return;
    let N = (E) => M.current && !M.current.contains(E.target) && u(!1);
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [b]), U(() => () => clearTimeout(f.current), []);
  let C = () => {
    if (M.current) {
      let N = M.current.getBoundingClientRect();
      c((N.top < 200 ? "down" : "up") + " " + (N.left > window.innerWidth - 210 ? "right" : "left"));
    }
    u(!0), navigator.vibrate && navigator.vibrate(15);
  }, s = () => {
    z.current = !1, clearTimeout(f.current), f.current = setTimeout(() => {
      z.current = !0, C();
    }, 450);
  }, p = () => clearTimeout(f.current);
  return /* @__PURE__ */ o("span", { className: "jt-hold", ref: M, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: e + " jt-holdbtn",
        ...x,
        title: n.length ? n.join(", ") : void 0,
        onPointerDown: s,
        onPointerUp: p,
        onPointerLeave: p,
        onPointerCancel: p,
        onContextMenu: (N) => {
          N.preventDefault(), p(), z.current = !0, C();
        },
        onClick: (N) => {
          if (N.stopPropagation(), z.current) {
            z.current = !1;
            return;
          }
          a(N);
        },
        children: v
      }
    ),
    b && /* @__PURE__ */ o("div", { className: "jt-whopop " + y, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ o("strong", { children: [
        i,
        " ",
        n.length,
        "명"
      ] }),
      n.length ? /* @__PURE__ */ t("ul", { children: n.map((N) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(rt, { name: N, members: r.length ? r : n, size: 22 }),
        N
      ] }, N)) }) : /* @__PURE__ */ t("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ke({ item: e, me: a, onReact: n, members: i = [] }) {
  let [r, v] = w(!1), [x, b] = w("up right"), u = J(null), y = Ka(e), c = () => {
    if (!r && u.current) {
      let C = u.current.getBoundingClientRect(), p = u.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", N = C.top < 190 ? "down" : "up";
      b(N + " " + p);
    }
    v(!r);
  }, M = Ma.filter(([C]) => (y[C] || []).length), f = Object.keys(y).find((C) => y[C].includes(a));
  U(() => {
    if (!r) return;
    let C = (s) => u.current && !u.current.contains(s.target) && v(!1);
    return document.addEventListener("pointerdown", C), () => document.removeEventListener("pointerdown", C);
  }, [r]);
  let z = (C) => {
    n(C), v(!1);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "jt-react",
      ref: u,
      onClick: (C) => C.stopPropagation(),
      onKeyDown: (C) => C.stopPropagation(),
      children: [
        M.map(([C, s]) => /* @__PURE__ */ o(
          Ue,
          {
            className: "jt-rchip" + (f === C ? " on" : ""),
            onTap: () => z(C),
            names: y[C],
            members: i,
            title: `${C} ${s}`,
            "aria-pressed": f === C,
            "aria-label": `${s} ${y[C].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t("span", { className: "jt-emoji", children: C }),
              y[C].length
            ]
          },
          C
        )),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (r ? " open" : ""),
            onClick: c,
            "aria-expanded": r,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(so, { size: 16 })
          }
        ),
        r && /* @__PURE__ */ o("div", { className: "jt-rpop " + x, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: Ma.map(([C, s]) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (f === C ? " on" : ""),
              onClick: () => z(C),
              "aria-label": s,
              title: s,
              children: C
            },
            C
          )) }),
          M.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-rwho", children: M.map(([C]) => /* @__PURE__ */ o("li", { children: [
            /* @__PURE__ */ t("span", { className: "jt-emoji", children: C }),
            y[C].join(", ")
          ] }, C)) })
        ] })
      ]
    }
  );
}
function ee(e, a) {
  let n = (a || []).find((i) => i.wishId === e.id) || (a || []).find((i) => !i.wishId && i.title === e.name);
  return n ? n.day : null;
}
function Wa() {
  let [e, a] = w({});
  return [e, (r) => a((v) => ({ ...v, [r]: !v[r] })), (r, v) => a(v ? Object.fromEntries(r.map((x) => [x, !0])) : {})];
}
function Ha({ ids: e, open: a, setAll: n }) {
  if (e.length < 2) return null;
  let i = e.every((r) => a[r]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-ghost sm", onClick: () => n(e, !i), children: [
    i ? /* @__PURE__ */ t(Ba, { size: 15 }) : /* @__PURE__ */ t(Lt, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function Ya({ count: e, open: a, onClick: n }) {
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
        /* @__PURE__ */ t(Tn, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function We({ comments: e = [], me: a, members: n, onAdd: i, onDelete: r }) {
  let [v, x] = w(""), b = () => {
    let u = v.trim();
    u && (i(u), x(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (u) => u.stopPropagation(), onKeyDown: (u) => u.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((u) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(rt, { name: u.by, members: n, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("strong", { children: u.by }),
          /* @__PURE__ */ t("span", { children: $e(u.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: u.text })
      ] }),
      u.by === a && /* @__PURE__ */ t(St, { onConfirm: () => r(u.id), label: "" })
    ] }, u.id)) }),
    /* @__PURE__ */ o("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: v,
          onChange: (u) => x(u.target.value),
          onKeyDown: (u) => u.key === "Enter" && !u.nativeEvent.isComposing && b(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: b, disabled: !v.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(Ta, { size: 18 }) })
    ] })
  ] });
}
function vo({ initial: e, onSave: a, onCancel: n }) {
  let [i, r] = w(e?.title || "가족 일본여행"), [v, x] = w(e?.start || ct(new Date(Date.now() + 30 * 864e5))), [b, u] = w(e?.days || 4), [y, c] = w(e?.members || []), [M, f] = w(e?.rate || 900), [z, C] = w(e?.gmapsKey || ""), [s, p] = w(""), N = () => {
    let k = s.trim();
    !k || y.includes(k) || (c([...y, k]), p(""));
  }, E = i.trim() && v && y.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    n && /* @__PURE__ */ t(Ja, { onBack: n }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(at, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (k) => r(k.target.value) }) }),
      /* @__PURE__ */ t(at, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: v, onChange: (k) => x(k.target.value) }) }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "여행 일수" }),
        /* @__PURE__ */ o("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => u(Math.max(1, b - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ o("strong", { children: [
            b,
            "일"
          ] }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => u(Math.min(30, b + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ t("div", { className: "jt-chips", children: y.map((k) => /* @__PURE__ */ o("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ t(rt, { name: k, members: y, size: 20 }),
          k,
          /* @__PURE__ */ t("button", { type: "button", onClick: () => c(y.filter((h) => h !== k)), "aria-label": `${k} 빼기`, children: /* @__PURE__ */ t(Te, { size: 14 }) })
        ] }, k)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: s,
              onChange: (k) => p(k.target.value),
              onKeyDown: (k) => k.key === "Enter" && N(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: N, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(at, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: M, onChange: (k) => f(Number(k.target.value) || 0) }) }),
      /* @__PURE__ */ t(at, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ t(
        "input",
        {
          value: z,
          onChange: (k) => C(k.target.value.trim()),
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
          disabled: !E,
          onClick: () => a({ title: i.trim(), start: v, days: b, members: y, rate: M || 900, gmapsKey: z }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      n && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: n, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(yo, {})
    ] })
  ] });
}
function yo() {
  let [e, a] = w(""), n = ba();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: n });
          return;
        } catch (r) {
          if (r && r.name === "AbortError") return;
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && xa();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Ja({ onBack: e, label: a = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-back", onClick: e, "aria-label": a, children: [
    /* @__PURE__ */ t(Bn, { size: 22 }),
    a
  ] }) });
}
function wo({ members: e, onPick: a, current: n, onBack: i }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(Ja, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((r) => /* @__PURE__ */ o("button", { className: "jt-who-btn" + (r === n ? " on" : ""), onClick: () => a(r), children: [
      /* @__PURE__ */ t(rt, { name: r, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: r }),
      r === n && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, r)) })
  ] });
}
function ko({ initial: e, preset: a, gkey: n, dayItems: i = [], onSave: r, onDelete: v }) {
  let [x, b] = w(e?.time || a?.time || ""), [u, y] = w(e?.end || a?.end || ""), [c, M] = w(e?.link || ""), [f, z] = w(e && dt(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [C, s] = w([]), [p, N] = w(!1), [E, k] = w(""), [h, S] = w(e?.title || ""), [j, _] = w(e?.place || ""), [l, P] = w(e?.memo || ""), [m, g] = w(!1), R = (T) => {
    if (S(T), !x || m) {
      let A = mo(T);
      A ? (b(A), g(!0)) : m && (b(""), g(!1));
    }
  }, F = async () => {
    let T = (j || h).trim();
    if (!T) {
      k("장소 이름을 먼저 적어 주세요.");
      return;
    }
    N(!0), k(""), s([]);
    try {
      let A = await Za(T, n);
      s(A), A.length || k("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      k("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    N(!1);
  }, X = x && u && zt(u) <= zt(x), H = x ? i.filter((T) => {
    if (!T.time) return !1;
    let A = oe({ time: x, end: X ? "" : u }), W = oe(T);
    return A.s < W.e && W.s < A.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: h, onChange: (T) => R(T.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    m && x && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      x,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          Na,
          {
            label: "시작",
            value: x,
            onChange: (T) => {
              b(T), g(!1), T || y("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(Na, { label: "끝", value: u, onChange: y, disabled: !x })
      ] })
    ] }),
    x && !u && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    X && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    x && u && !X && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      Oa(zt(u) - zt(x)),
      " 동안"
    ] }),
    H.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      H.map((T) => `'${T.title}'(${T.time}${T.end ? `~${T.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ o("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: j,
            onChange: (T) => _(T.target.value),
            onKeyDown: (T) => T.key === "Enter" && !T.nativeEvent.isComposing && F(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: F, disabled: p, children: p ? "찾는 중" : "검색" })
      ] })
    ] }),
    E && /* @__PURE__ */ t("p", { className: "jt-hint", children: E }),
    C.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: C.map((T, A) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          _(T.name), z({ lat: T.lat, lng: T.lng, placeId: T.placeId }), T.link && M(T.link), s([]), k("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: T.name }),
          /* @__PURE__ */ t("span", { children: T.area })
        ]
      }
    ) }, A)) }),
    f && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(Et, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: At({ title: h, place: j, link: c, ...f }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Ut, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => z(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: c, onChange: (T) => M(T.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(at, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: l, onChange: (T) => P(T.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !h.trim() || X,
        onClick: () => r({
          time: x,
          end: x ? u : "",
          title: h.trim(),
          place: j.trim(),
          memo: l.trim(),
          link: c.trim(),
          lat: f ? f.lat : void 0,
          lng: f ? f.lng : void 0,
          placeId: f && f.placeId ? f.placeId : void 0
        }),
        children: e ? "수정 저장" : "일정 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: v, label: "이 일정 삭제" })
  ] });
}
function No({ initial: e, onSave: a, onDelete: n }) {
  let [i, r] = w(e?.name || ""), [v, x] = w(e?.cat || "맛집"), [b, u] = w(e?.area || ""), [y, c] = w(e?.link || ""), [M, f] = w(e?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (z) => r(z.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Le.map((z) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (v === z ? " on" : ""), onClick: () => x(z), children: z }, z)) })
    ] }),
    /* @__PURE__ */ t(at, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: b, onChange: (z) => u(z.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: y,
        onChange: (z) => c(z.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(at, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: M, onChange: (z) => f(z.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim(),
        onClick: () => a({ name: i.trim(), cat: v, area: b.trim(), link: y.trim(), memo: M.trim() }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: n, label: "이 장소 삭제" })
  ] });
}
function Co({ settings: e, me: a, defaultDay: n, initial: i, onSave: r, onDelete: v }) {
  let { members: x, days: b, start: u, rate: y } = e, [c, M] = w(i?.title || ""), [f, z] = w(i ? String(Number(i.amount) || "") : ""), [C, s] = w(i && x.includes(i.payer) ? i.payer : a), [p, N] = w(i?.cat || "식비"), [E, k] = w(i ? Math.min(i.day, b - 1) : n), [h, S] = w(i ? (i.split || []).filter((m) => x.includes(m)) : x), j = Number(f) || 0, _ = i ? [i.payer, ...i.split || []].filter((m, g, R) => m && !x.includes(m) && R.indexOf(m) === g) : [], l = (m) => S(h.includes(m) ? h.filter((g) => g !== m) : [...h, m]), P = c.trim() && j > 0 && h.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: c, onChange: (m) => M(m.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(at, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: f, onChange: (m) => z(m.target.value), placeholder: "0" }) }),
    j > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ t("b", { children: ne(j, y) }),
      /* @__PURE__ */ t("br", {}),
      me(e)
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint", children: me(e) }),
    _.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      _.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((m) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (C === m ? " on" : ""), onClick: () => s(m), children: m }, m)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((m) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (h.includes(m) ? " on" : ""), onClick: () => l(m), children: [
        h.includes(m) && /* @__PURE__ */ t(_a, { size: 14 }),
        m
      ] }, m)) }),
      j > 0 && h.length > 0 && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
        "1인당 ",
        G(j / h.length)
      ] }),
      h.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint", children: "나눌 사람을 한 명 이상 골라 주세요." })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: La.map((m) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (p === m ? " on" : ""), onClick: () => N(m), children: m }, m)) })
    ] }),
    /* @__PURE__ */ t(at, { label: "날짜", children: /* @__PURE__ */ t("select", { value: E, onChange: (m) => k(Number(m.target.value)), children: Array.from({ length: b }, (m, g) => {
      let R = gt(u, g);
      return /* @__PURE__ */ o("option", { value: g, children: [
        g + 1,
        "일차 ",
        ae(R),
        " (",
        Mt(R),
