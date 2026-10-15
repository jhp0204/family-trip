// src/main.jsx
import { useState as At, useEffect as oi } from "react";
import { createRoot as ii } from "react-dom/client";

// src/app.jsx
import Aa, { useState as w, useEffect as U, useMemo as te, useCallback as Ia, useRef as J } from "react";
import {
  Plus as Fa,
  X as _e,
  Heart as Te,
  Trash2 as Da,
  MapPin as zt,
  Settings as Pa,
  CalendarDays as $a,
  Wallet as Ra,
  Check as Tn,
  ExternalLink as Ut,
  Map as _a,
  MessageSquare as Ta,
  Send as Bn,
  Pencil as ge,
  ChevronLeft as Ba,
  ChevronRight as La,
  ChevronDown as Bt,
  ChevronUp as Ln,
  Users as Oa,
  Crosshair as Ua,
  HelpCircle as Ka,
  MessagesSquare as Wa,
  Megaphone as Ha,
  Pin as Ya,
  PinOff as wn,
  Utensils as Ja,
  TrainFront as Xa,
  BedDouble as qa,
  Ticket as Ga,
  ShoppingBag as Va,
  MoreHorizontal as Za,
  Sun as Qa,
  CloudSun as to,
  Cloud as kn,
  CloudFog as eo,
  CloudDrizzle as no,
  CloudRain as ao,
  CloudSnow as oo,
  CloudLightning as io,
  Umbrella as ro,
  SmilePlus as so,
  LocateFixed as lo,
  Star as co,
  Navigation as Et
} from "lucide-react";

// src/store.js
import { initializeApp as ya } from "firebase/app";
import {
  initializeFirestore as cn,
  persistentLocalCache as wa,
  persistentMultipleTabManager as ka,
  collection as Na,
  doc as un,
  onSnapshot as Ca,
  setDoc as gn,
  deleteDoc as za
} from "firebase/firestore";
var qt = "fjt:", kt = { config: null, code: null }, ke = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), Ea = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function Ne(e) {
  try {
    let n = String(e || "").trim(), a = n.includes("#") ? n.slice(n.indexOf("#") + 1) : n, i = new URLSearchParams(a).get("j") || (a.startsWith("j=") ? a.slice(2) : "");
    if (!i) return null;
    let r = Ea(i);
    return r && r.c && r.t ? r : null;
  } catch {
    return null;
  }
}
function fn() {
  let e = Ne(location.hash);
  if (e)
    return localStorage.setItem(qt + "conn", JSON.stringify(e)), e;
  try {
    let n = JSON.parse(localStorage.getItem(qt + "conn"));
    if (n && n.c && n.t)
      return history.replaceState(null, "", "#j=" + ke(n)), n;
  } catch {
  }
  return null;
}
function bn(e, n) {
  let a = { c: e, t: n };
  return localStorage.setItem(qt + "conn", JSON.stringify(a)), history.replaceState(null, "", "#j=" + ke(a)), a;
}
var xn = () => location.origin + location.pathname + "#j=" + ke({ c: kt.config, t: kt.code });
function hn() {
  localStorage.removeItem(qt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var jn = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", n = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(n, (a) => e[a % e.length]).join("");
};
function vn(e) {
  let n = String(e || "");
  try {
    let i = JSON.parse(n);
    if (i.apiKey && i.projectId && i.appId) return i;
  } catch {
  }
  let a = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((i) => {
    let r = n.match(new RegExp(i + `\\s*[:=]\\s*["']([^"']+)["']`));
    r && (a[i] = r[1]);
  }), a.apiKey && a.projectId && a.appId ? a : null;
}
var Xt = null, bt = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Set(), we = Promise.resolve(), je = null, pn = null, Ma = () => {
  clearTimeout(pn), pn = setTimeout(() => ye.forEach((e) => e()), 250);
}, dn = (e) => un(Xt, "trips", kt.code, "data", e), ve = (e) => qt + kt.code + ":" + e, mn = (e) => Promise.race([e.then(() => !0), new Promise((n) => setTimeout(() => n(!0), 4e3))]);
function Ce(e, n) {
  je && je(), bt.clear(), kt.config = e, kt.code = n;
  let a = ya(e, "fjt-" + Date.now());
  try {
    Xt = cn(a, { localCache: wa({ tabManager: ka() }) });
  } catch {
    Xt = cn(a, {});
  }
  let i;
  we = new Promise((v) => i = v), setTimeout(() => i(), 6e3);
  let r = !0;
  je = Ca(
    Na(Xt, "trips", n, "data"),
    (v) => {
      v.docChanges().forEach((x) => {
        x.type === "removed" ? bt.delete(x.doc.id) : bt.set(x.doc.id, x.doc.data().v);
      }), i(), r || Ma(), r = !1;
    },
    () => i()
  ), window.storage = Sa;
}
async function yn() {
  let e = un(Xt, "trips", kt.code, "data", "_ping");
  await Promise.race([
    gn(e, { v: "ok", t: Date.now() }),
    new Promise((n, a) => setTimeout(() => a(new Error("timeout")), 9e3))
  ]);
}
var Sa = {
  async get(e, n) {
    if (!n) {
      let a = localStorage.getItem(ve(e));
      if (a == null) throw new Error("not found");
      return { key: e, value: a, shared: !1 };
    }
    if (await we, !bt.has(e)) throw new Error("not found");
    return { key: e, value: bt.get(e), shared: !0 };
  },
  async set(e, n, a) {
    return a ? (bt.set(e, n), await mn(gn(dn(e), { v: n, t: Date.now() })), { key: e, value: n, shared: !0 }) : (localStorage.setItem(ve(e), n), { key: e, value: n, shared: !1 });
  },
  async delete(e, n) {
    return n ? (bt.delete(e), await mn(za(dn(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(ve(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", n) {
    return n ? (await we, { keys: [...bt.keys()].filter((a) => a.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
  },
  onChange(e) {
    return ye.add(e), () => ye.delete(e);
  }
};

// src/app.jsx
import { Fragment as ct, jsx as t, jsxs as o } from "react/jsx-runtime";
var q = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice" }, V = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], po = ["일", "월", "화", "수", "목", "금", "토"], Be = ["맛집", "관광", "쇼핑", "기타"], On = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Tt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Nn = {
  식비: { Icon: Ja, color: "#D9262E" },
  교통: { Icon: Xa, color: "#0C86AE" },
  숙소: { Icon: qa, color: "#7B5FC4" },
  체험: { Icon: Ga, color: "#E8800A" },
  쇼핑: { Icon: Va, color: "#0A9B6E" },
  기타: { Icon: Za, color: "#66718A" }
}, Fe = (e) => Nn[e] || Nn.기타, Dt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), mt = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Nt = (e) => {
  let [n, a, i] = e.split("-").map(Number);
  return new Date(n, a - 1, i);
}, ut = (e, n) => {
  let a = Nt(e);
  return a.setDate(a.getDate() + n), a;
}, ne = (e) => `${e.getMonth() + 1}/${e.getDate()}`, Lt = (e) => po[e.getDay()], G = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), ae = (e, n) => "₩" + (Math.round(e * n / 100 / 10) * 10).toLocaleString("ko-KR"), at = (e) => String(e).padStart(2, "0"), De = (e) => {
  let n = (Date.now() - e) / 1e3;
  if (n < 60) return "방금";
  if (n < 3600) return `${Math.floor(n / 60)}분 전`;
  if (n < 86400) return `${Math.floor(n / 3600)}시간 전`;
  let a = new Date(e);
  return `${a.getMonth() + 1}/${a.getDate()} ${at(a.getHours())}:${at(a.getMinutes())}`;
}, Ct = (e) => {
  let [n, a] = String(e).split(":").map(Number);
  return n * 60 + (a || 0);
}, $t = (e) => `${at(Math.floor(e / 60) % 24)}:${at(e % 60)}`, oe = (e) => {
  let n = Ct(e.time), a = e.end ? Ct(e.end) : n + 60;
  return a <= n && (a = n + 60), { s: n, e: Math.min(a, 24 * 60) };
}, Un = (e) => {
  let n = Math.floor(e / 60), a = e % 60;
  return [n ? `${n}시간` : "", a ? `${a}분` : ""].filter(Boolean).join(" ");
};
function mo(e) {
  let n = e || "", a = n.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (a) return `${at(Number(a[2]))}:${a[3]}`;
  if (a = n.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !a) return "";
  let i = a[3] === "반" ? 30 : a[4] ? Number(a[4]) : 0;
  return `${at(Number(a[2]))}:${at(i)}`;
}
var uo = Array.from({ length: 24 }, (e, n) => at(n));
function Cn({ value: e, onChange: n, disabled: a, label: i }) {
  let [r, v] = e ? e.split(":") : ["", ""], x = Array.from({ length: 12 }, (b, u) => at(u * 5));
  return v && !x.includes(v) && (x = [...x, v].sort()), /* @__PURE__ */ o("div", { className: "jt-tsel" + (a ? " off" : ""), children: [
    /* @__PURE__ */ o(
      "select",
      {
        "aria-label": i + " 시",
        value: r,
        disabled: a,
        onChange: (b) => n(b.target.value ? `${b.target.value}:${v || "00"}` : ""),
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
        disabled: a || !r,
        onChange: (b) => n(`${r}:${b.target.value}`),
        children: [
          !r && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          x.map((b) => /* @__PURE__ */ t("option", { value: b, children: b }, b))
        ]
      }
    )
  ] });
}
var go = (e) => {
  let n = e.filter((i) => i.time).map((i) => ({ id: i.id, ...oe(i) })), a = /* @__PURE__ */ new Set();
  return n.forEach(
    (i) => n.forEach((r) => {
      i.id !== r.id && i.s < r.e && r.s < i.e && a.add(i.id);
    })
  ), a;
}, de = (e) => jt(e) ? `${e.lat},${e.lng}` : e.place ? Oe(e.place) : "", fo = (e, n) => {
  let a = e ? de(e) : "", i = de(n);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (a ? "&origin=" + encodeURIComponent(a) : "");
}, Le = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(jt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), Oe = (...e) => [...e, "일본"].filter(Boolean).join(" "), jt = (e) => typeof e.lat == "number" && typeof e.lng == "number", Kn = (e) => jt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place), Mt = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Kn(e)), bo = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Kn(e)), ht = 256, ze = (e, n, a) => {
  let i = ht * 2 ** a, r = e * Math.PI / 180;
  return {
    x: (n + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * i
  };
}, zn = (e, n, a) => {
  let i = ht * 2 ** a, r = Math.PI - 2 * Math.PI * n / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(r)), lng: e / i * 360 - 180 };
}, Gt = (e) => Math.max(3, Math.min(18, e));
async function Ee(e) {
  let n = await window.storage.list(e, !0), a = (n && n.keys || []).map((r) => typeof r == "string" ? r : r.key).filter(Boolean), i = await Promise.all(a.map((r) => xt(r, null)));
  return a.map((r, v) => [r, i[v]]).filter(([, r]) => r);
}
async function xt(e, n) {
  try {
    let a = await window.storage.get(e, !0);
    return a && a.value ? JSON.parse(a.value) : n;
  } catch {
    return n;
  }
}
async function dt(e, n) {
  try {
    return !!await window.storage.set(e, JSON.stringify(n), !0);
  } catch {
    return !1;
  }
}
var xo = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: mt(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function ho() {
  for (let [e, n] of xo)
    try {
      let a = await fetch(e);
      if (!a.ok) continue;
      let i = n(await a.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var En = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), me = (e) => e.fx ? `100엔 = ₩${En(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${En(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Mn(e, n) {
  let a = () => Object.fromEntries(n.map((f) => [f, 0])), i = a(), r = a(), v = [];
  e.forEach((f) => {
    let z = Number(f.amount) || 0, C = (f.split || []).filter((s) => n.includes(s));
    if (!(z <= 0)) {
      if (!C.length || !n.includes(f.payer)) {
        v.push(f);
        return;
      }
      i[f.payer] += z, C.forEach((s) => r[s] += z / C.length);
    }
  });
  let x = Object.fromEntries(n.map((f) => [f, i[f] - r[f]])), b = n.filter((f) => x[f] > 0.5).map((f) => ({ m: f, v: x[f] })).sort((f, z) => z.v - f.v), u = n.filter((f) => x[f] < -0.5).map((f) => ({ m: f, v: -x[f] })).sort((f, z) => z.v - f.v), y = [], l = 0, M = 0;
  for (; l < u.length && M < b.length; ) {
    let f = Math.min(u[l].v, b[M].v);
    f >= 1 && y.push({ from: u[l].m, to: b[M].m, v: Math.round(f) }), u[l].v -= f, b[M].v -= f, u[l].v < 0.5 && l++, b[M].v < 0.5 && M++;
  }
  return { paid: i, share: r, net: x, moves: y, skipped: v };
}
function rt({ name: e, members: n, size: a = 28 }) {
  let i = Math.max(0, n.indexOf(e));
  return /* @__PURE__ */ t(
    "span",
    {
      className: "jt-avatar",
      style: { width: a, height: a, background: V[(i * 2 + 3) % V.length], fontSize: a * 0.46 },
      "aria-hidden": "true",
      children: e ? e[0] : "?"
    }
  );
}
function nt({ label: e, children: n }) {
  return /* @__PURE__ */ o("label", { className: "jt-field", children: [
    /* @__PURE__ */ t("span", { children: e }),
    n
  ] });
}
function Rt({ title: e, onClose: n, children: a }) {
  return U(() => {
    let i = (r) => r.key === "Escape" && n();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: n, children: /* @__PURE__ */ o("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ o("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ t(_e, { size: 20 }) })
    ] }),
    a
  ] }) });
}
function St({ onConfirm: e, label: n = "삭제" }) {
  let [a, i] = w(!1);
  return U(() => {
    if (!a) return;
    let r = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(r);
  }, [a]), /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-del" + (a ? " armed" : ""),
      onClick: (r) => {
        r.stopPropagation(), a ? e() : i(!0);
      },
      children: [
        /* @__PURE__ */ t(Da, { size: 15 }),
        a ? "한 번 더 누르면 삭제돼요" : n
      ]
    }
  );
}
var Sn = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Wn(e) {
  let n = {};
  return Object.entries(e.reactions || {}).forEach(([a, i]) => n[a] = [...i]), n;
}
function jo(e, n, a) {
  let i = Wn(e), r = (i[n] || []).includes(a), v = {};
  return Object.entries(i).forEach(([x, b]) => {
    let u = b.filter((y) => y !== a);
    u.length && (v[x] = u);
  }), r || (v[n] = [...v[n] || [], a]), { ...e, reactions: v };
}
function Ue({ className: e, onTap: n, names: a = [], title: i, members: r = [], children: v, ...x }) {
  let [b, u] = w(!1), [y, l] = w("up left"), M = J(null), f = J(null), z = J(!1);
  U(() => {
    if (!b) return;
    let N = (E) => M.current && !M.current.contains(E.target) && u(!1);
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [b]), U(() => () => clearTimeout(f.current), []);
  let C = () => {
    if (M.current) {
      let N = M.current.getBoundingClientRect();
      l((N.top < 200 ? "down" : "up") + " " + (N.left > window.innerWidth - 210 ? "right" : "left"));
    }
    u(!0), navigator.vibrate && navigator.vibrate(15);
  }, s = () => {
    z.current = !1, clearTimeout(f.current), f.current = setTimeout(() => {
      z.current = !0, C();
    }, 450);
  }, c = () => clearTimeout(f.current);
  return /* @__PURE__ */ o("span", { className: "jt-hold", ref: M, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: e + " jt-holdbtn",
        ...x,
        title: a.length ? a.join(", ") : void 0,
        onPointerDown: s,
        onPointerUp: c,
        onPointerLeave: c,
        onPointerCancel: c,
        onContextMenu: (N) => {
          N.preventDefault(), c(), z.current = !0, C();
        },
        onClick: (N) => {
          if (N.stopPropagation(), z.current) {
            z.current = !1;
            return;
          }
          n(N);
        },
        children: v
      }
    ),
    b && /* @__PURE__ */ o("div", { className: "jt-whopop " + y, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ o("strong", { children: [
        i,
        " ",
        a.length,
        "명"
      ] }),
      a.length ? /* @__PURE__ */ t("ul", { children: a.map((N) => /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t(rt, { name: N, members: r.length ? r : a, size: 22 }),
        N
      ] }, N)) }) : /* @__PURE__ */ t("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ke({ item: e, me: n, onReact: a, members: i = [] }) {
  let [r, v] = w(!1), [x, b] = w("up right"), u = J(null), y = Wn(e), l = () => {
    if (!r && u.current) {
      let C = u.current.getBoundingClientRect(), c = u.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", N = C.top < 190 ? "down" : "up";
      b(N + " " + c);
    }
    v(!r);
  }, M = Sn.filter(([C]) => (y[C] || []).length), f = Object.keys(y).find((C) => y[C].includes(n));
  U(() => {
    if (!r) return;
    let C = (s) => u.current && !u.current.contains(s.target) && v(!1);
    return document.addEventListener("pointerdown", C), () => document.removeEventListener("pointerdown", C);
  }, [r]);
  let z = (C) => {
    a(C), v(!1);
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
            onClick: l,
            "aria-expanded": r,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(so, { size: 16 })
          }
        ),
        r && /* @__PURE__ */ o("div", { className: "jt-rpop " + x, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: Sn.map(([C, s]) => /* @__PURE__ */ t(
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
function ee(e, n) {
  let a = (n || []).find((i) => i.wishId === e.id) || (n || []).find((i) => !i.wishId && i.title === e.name);
  return a ? a.day : null;
}
function Hn() {
  let [e, n] = w({});
  return [e, (r) => n((v) => ({ ...v, [r]: !v[r] })), (r, v) => n(v ? Object.fromEntries(r.map((x) => [x, !0])) : {})];
}
function Yn({ ids: e, open: n, setAll: a }) {
  if (e.length < 2) return null;
  let i = e.every((r) => n[r]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-ghost sm", onClick: () => a(e, !i), children: [
    i ? /* @__PURE__ */ t(Ln, { size: 15 }) : /* @__PURE__ */ t(Bt, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function Jn({ count: e, open: n, onClick: a }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      className: "jt-like jt-cbtn" + (n ? " open" : ""),
      onClick: (i) => {
        i.stopPropagation(), a();
      },
      "aria-expanded": n,
      children: [
        /* @__PURE__ */ t(Ta, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function We({ comments: e = [], me: n, members: a, onAdd: i, onDelete: r }) {
  let [v, x] = w(""), b = () => {
    let u = v.trim();
    u && (i(u), x(""));
  };
  return /* @__PURE__ */ o("div", { className: "jt-comments", onClick: (u) => u.stopPropagation(), onKeyDown: (u) => u.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((u) => /* @__PURE__ */ o("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(rt, { name: u.by, members: a, size: 24 }),
      /* @__PURE__ */ o("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("strong", { children: u.by }),
          /* @__PURE__ */ t("span", { children: De(u.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: u.text })
      ] }),
      u.by === n && /* @__PURE__ */ t(St, { onConfirm: () => r(u.id), label: "" })
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
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: b, disabled: !v.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(Bn, { size: 18 }) })
    ] })
  ] });
}
function vo({ initial: e, onSave: n, onCancel: a }) {
  let [i, r] = w(e?.title || "가족 일본여행"), [v, x] = w(e?.start || mt(new Date(Date.now() + 30 * 864e5))), [b, u] = w(e?.days || 4), [y, l] = w(e?.members || []), [M, f] = w(e?.rate || 900), [z, C] = w(e?.gmapsKey || ""), [s, c] = w(""), N = () => {
    let k = s.trim();
    !k || y.includes(k) || (l([...y, k]), c(""));
  }, E = i.trim() && v && y.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    a && /* @__PURE__ */ t(Xn, { onBack: a }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ o("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(nt, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (k) => r(k.target.value) }) }),
      /* @__PURE__ */ t(nt, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: v, onChange: (k) => x(k.target.value) }) }),
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
          /* @__PURE__ */ t("button", { type: "button", onClick: () => l(y.filter((h) => h !== k)), "aria-label": `${k} 빼기`, children: /* @__PURE__ */ t(_e, { size: 14 }) })
        ] }, k)) }),
        /* @__PURE__ */ o("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: s,
              onChange: (k) => c(k.target.value),
              onKeyDown: (k) => k.key === "Enter" && N(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: N, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(nt, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: M, onChange: (k) => f(Number(k.target.value) || 0) }) }),
      /* @__PURE__ */ t(nt, { label: "구글 지도 API 키 (선택)", children: /* @__PURE__ */ t(
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
          onClick: () => n({ title: i.trim(), start: v, days: b, members: y, rate: M || 900, gmapsKey: z }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      a && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: a, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(yo, {})
    ] })
  ] });
}
function yo() {
  let [e, n] = w(""), a = xn();
  return /* @__PURE__ */ o("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: a });
          return;
        } catch (r) {
          if (r && r.name === "AbortError") return;
        }
      try {
        await navigator.clipboard.writeText(a), n("링크를 복사했어요. 가족 채팅방에 붙여넣어 주세요.");
      } catch {
        n("자동 복사가 안 돼요. 아래 '주소 보기'를 열어 길게 눌러 복사해 주세요.");
      }
    }, children: "초대 링크 보내기" }),
    e && /* @__PURE__ */ t("p", { className: "jt-hint jt-formmsg", children: e }),
    /* @__PURE__ */ o("details", { children: [
      /* @__PURE__ */ t("summary", { children: "주소 보기" }),
      /* @__PURE__ */ t("code", { children: a })
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && hn();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Xn({ onBack: e, label: n = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ o("button", { type: "button", className: "jt-back", onClick: e, "aria-label": n, children: [
    /* @__PURE__ */ t(Ba, { size: 22 }),
    n
  ] }) });
}
function wo({ members: e, onPick: n, current: a, onBack: i }) {
  return /* @__PURE__ */ o("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(Xn, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((r) => /* @__PURE__ */ o("button", { className: "jt-who-btn" + (r === a ? " on" : ""), onClick: () => n(r), children: [
      /* @__PURE__ */ t(rt, { name: r, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: r }),
      r === a && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, r)) })
  ] });
}
function ko({ initial: e, preset: n, gkey: a, dayItems: i = [], onSave: r, onDelete: v }) {
  let [x, b] = w(e?.time || n?.time || ""), [u, y] = w(e?.end || n?.end || ""), [l, M] = w(e?.link || ""), [f, z] = w(e && jt(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [C, s] = w([]), [c, N] = w(!1), [E, k] = w(""), [h, A] = w(e?.title || ""), [j, R] = w(e?.place || ""), [d, $] = w(e?.memo || ""), [m, g] = w(!1), T = (_) => {
    if (A(_), !x || m) {
      let S = mo(_);
      S ? (b(S), g(!0)) : m && (b(""), g(!1));
    }
  }, F = async () => {
    let _ = (j || h).trim();
    if (!_) {
      k("장소 이름을 먼저 적어 주세요.");
      return;
    }
    N(!0), k(""), s([]);
    try {
      let S = await Qn(_, a);
      s(S), S.length || k("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      k("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    N(!1);
  }, X = x && u && Ct(u) <= Ct(x), H = x ? i.filter((_) => {
    if (!_.time) return !1;
    let S = oe({ time: x, end: X ? "" : u }), W = oe(_);
    return S.s < W.e && W.s < S.e;
  }) : [];
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(nt, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: h, onChange: (_) => T(_.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    m && x && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      "제목에서 ",
      x,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-two", children: [
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          Cn,
          {
            label: "시작",
            value: x,
            onChange: (_) => {
              b(_), g(!1), _ || y("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(Cn, { label: "끝", value: u, onChange: y, disabled: !x })
      ] })
    ] }),
    x && !u && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    X && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    x && u && !X && /* @__PURE__ */ o("p", { className: "jt-hint", children: [
      Un(Ct(u) - Ct(x)),
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
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: F, disabled: c, children: c ? "찾는 중" : "검색" })
      ] })
    ] }),
    E && /* @__PURE__ */ t("p", { className: "jt-hint", children: E }),
    C.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: C.map((_, S) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => {
          R(_.name), z({ lat: _.lat, lng: _.lng, placeId: _.placeId }), _.link && M(_.link), s([]), k("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: _.name }),
          /* @__PURE__ */ t("span", { children: _.area })
        ]
      }
    ) }, S)) }),
    f && /* @__PURE__ */ o("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(zt, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ o("a", { className: "jt-maplink", href: Mt({ title: h, place: j, link: l, ...f }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Ut, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => z(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(nt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: l, onChange: (_) => M(_.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(nt, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: d, onChange: (_) => $(_.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
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
          memo: d.trim(),
          link: l.trim(),
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
function No({ initial: e, onSave: n, onDelete: a }) {
  let [i, r] = w(e?.name || ""), [v, x] = w(e?.cat || "맛집"), [b, u] = w(e?.area || ""), [y, l] = w(e?.link || ""), [M, f] = w(e?.memo || "");
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(nt, { label: "이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (z) => r(z.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Be.map((z) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (v === z ? " on" : ""), onClick: () => x(z), children: z }, z)) })
    ] }),
    /* @__PURE__ */ t(nt, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: b, onChange: (z) => u(z.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(nt, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: y,
        onChange: (z) => l(z.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(nt, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: M, onChange: (z) => f(z.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim(),
        onClick: () => n({ name: i.trim(), cat: v, area: b.trim(), link: y.trim(), memo: M.trim() }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: a, label: "이 장소 삭제" })
  ] });
}
function Co({ settings: e, me: n, defaultDay: a, initial: i, onSave: r, onDelete: v }) {
  let { members: x, days: b, start: u, rate: y } = e, [l, M] = w(i?.title || ""), [f, z] = w(i ? String(Number(i.amount) || "") : ""), [C, s] = w(i && x.includes(i.payer) ? i.payer : n), [c, N] = w(i?.cat || "식비"), [E, k] = w(i ? Math.min(i.day, b - 1) : a), [h, A] = w(i ? (i.split || []).filter((m) => x.includes(m)) : x), j = Number(f) || 0, R = i ? [i.payer, ...i.split || []].filter((m, g, T) => m && !x.includes(m) && T.indexOf(m) === g) : [], d = (m) => A(h.includes(m) ? h.filter((g) => g !== m) : [...h, m]), $ = l.trim() && j > 0 && h.length > 0;
  return /* @__PURE__ */ o("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(nt, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: l, onChange: (m) => M(m.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(nt, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: f, onChange: (m) => z(m.target.value), placeholder: "0" }) }),
    j > 0 ? /* @__PURE__ */ o("p", { className: "jt-hint jt-fxhint", children: [
      "약 ",
      /* @__PURE__ */ t("b", { children: ae(j, y) }),
      /* @__PURE__ */ t("br", {}),
      me(e)
    ] }) : /* @__PURE__ */ t("p", { className: "jt-hint", children: me(e) }),
    R.length > 0 && /* @__PURE__ */ o("p", { className: "jt-warn-inline", children: [
      R.join(", "),
      "은(는) 지금 가족 목록에 없어서 빠졌어요. 아래에서 사람을 다시 골라 저장해 주세요."
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누가 냈나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((m) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (C === m ? " on" : ""), onClick: () => s(m), children: m }, m)) })
    ] }),
    /* @__PURE__ */ o("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "누구와 나누나요" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: x.map((m) => /* @__PURE__ */ o("button", { type: "button", className: "jt-chip" + (h.includes(m) ? " on" : ""), onClick: () => d(m), children: [
        h.includes(m) && /* @__PURE__ */ t(Tn, { size: 14 }),
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
      /* @__PURE__ */ t("div", { className: "jt-chips", children: On.map((m) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (c === m ? " on" : ""), onClick: () => N(m), children: m }, m)) })
