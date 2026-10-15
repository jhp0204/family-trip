// src/main.jsx
import { useState as It, useEffect as bi } from "react";
import { createRoot as xi } from "react-dom/client";

// src/app.jsx
import Ra, { useState as w, useEffect as K, useMemo as te, useCallback as _a, useRef as Y } from "react";
import {
  Plus as Ba,
  X as We,
  Heart as He,
  Trash2 as La,
  MapPin as Et,
  Settings as Oa,
  CalendarDays as Ka,
  Wallet as Ua,
  Check as Yn,
  ExternalLink as Kt,
  Map as Wa,
  MessageSquare as Ha,
  Send as Jn,
  Pencil as be,
  ChevronLeft as Ya,
  ChevronRight as Ja,
  ChevronDown as At,
  ChevronUp as Vn,
  Users as Va,
  Crosshair as Xa,
  HelpCircle as qa,
  MessagesSquare as Ga,
  Megaphone as Za,
  Lock as Qa,
  WifiOff as to,
  Wifi as eo,
  Pin as no,
  PinOff as Mn,
  Utensils as ao,
  TrainFront as oo,
  BedDouble as io,
  Ticket as so,
  ShoppingBag as ro,
  MoreHorizontal as lo,
  Sun as co,
  CloudSun as po,
  Cloud as Fn,
  CloudFog as mo,
  CloudDrizzle as uo,
  CloudRain as fo,
  CloudSnow as go,
  CloudLightning as bo,
  Umbrella as xo,
  SmilePlus as ho,
  LocateFixed as jo,
  Star as vo,
  Navigation as vt
} from "lucide-react";

// src/store.js
import { initializeApp as Sa } from "firebase/app";
import {
  initializeFirestore as xn,
  persistentLocalCache as Ma,
  persistentMultipleTabManager as Fa,
  collection as Ia,
  doc as yn,
  onSnapshot as Da,
  setDoc as wn,
  deleteDoc as Pa
} from "firebase/firestore";
var Xt = "fjt:", Nt = { config: null, code: null }, Me = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), $a = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function Fe(e) {
  try {
    let n = String(e || "").trim(), o = n.includes("#") ? n.slice(n.indexOf("#") + 1) : n, i = new URLSearchParams(o).get("j") || (o.startsWith("j=") ? o.slice(2) : "");
    if (!i) return null;
    let s = $a(i);
    return s && s.c && s.t ? s : null;
  } catch {
    return null;
  }
}
function kn() {
  let e = Fe(location.hash);
  if (e)
    return localStorage.setItem(Xt + "conn", JSON.stringify(e)), e;
  try {
    let n = JSON.parse(localStorage.getItem(Xt + "conn"));
    if (n && n.c && n.t)
      return history.replaceState(null, "", "#j=" + Me(n)), n;
  } catch {
  }
  return null;
}
function Nn(e, n) {
  let o = { c: e, t: n };
  return localStorage.setItem(Xt + "conn", JSON.stringify(o)), history.replaceState(null, "", "#j=" + Me(o)), o;
}
var Cn = () => location.origin + location.pathname + "#j=" + Me({ c: Nt.config, t: Nt.code });
function zn() {
  localStorage.removeItem(Xt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var En = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", n = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(n, (o) => e[o % e.length]).join("");
};
function An(e) {
  let n = String(e || "");
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
var Vt = null, xt = /* @__PURE__ */ new Map(), Ae = /* @__PURE__ */ new Set(), Se = Promise.resolve(), Ce = null, pe = !1, hn = null, ze = () => {
  clearTimeout(hn), hn = setTimeout(() => Ae.forEach((e) => e()), 250);
}, jn = (e) => yn(Vt, "trips", Nt.code, "data", e), Ee = (e) => Xt + Nt.code + ":" + e, vn = (e) => Promise.race([e.then(() => !0), new Promise((n) => setTimeout(() => n(!0), 4e3))]);
function Ie(e, n) {
  Ce && Ce(), xt.clear(), Nt.config = e, Nt.code = n;
  let o = Sa(e, "fjt-" + Date.now());
  try {
    Vt = xn(o, { localCache: Ma({ tabManager: Fa() }) });
  } catch {
    Vt = xn(o, {});
  }
  let i;
  pe = !1, Se = new Promise((h) => i = h), setTimeout(() => i(), 8e3);
  let s = !0;
  Ce = Da(
    Ia(Vt, "trips", n, "data"),
    { includeMetadataChanges: !0 },
    (h) => {
      let g = h.docChanges();
      g.forEach((d) => {
        d.type === "removed" ? xt.delete(d.doc.id) : xt.set(d.doc.id, d.doc.data().v);
      });
      let f = !h.metadata.fromCache;
      (f || h.size > 0) && i(), f && !pe ? (pe = !0, ze()) : !s && g.length && ze(), s = !1;
    },
    () => {
      i(), ze();
    }
  ), window.storage = Ta;
}
async function Sn() {
  let e = yn(Vt, "trips", Nt.code, "data", "_ping");
  await Promise.race([
    wn(e, { v: "ok", t: Date.now() }),
    new Promise((n, o) => setTimeout(() => o(new Error("timeout")), 9e3))
  ]);
}
var Ta = {
  async get(e, n) {
    if (!n) {
      let o = localStorage.getItem(Ee(e));
      if (o == null) throw new Error("not found");
      return { key: e, value: o, shared: !1 };
    }
    if (await Se, !xt.has(e)) throw new Error("not found");
    return { key: e, value: xt.get(e), shared: !0 };
  },
  async set(e, n, o) {
    return o ? (xt.set(e, n), await vn(wn(jn(e), { v: n, t: Date.now() })), { key: e, value: n, shared: !0 }) : (localStorage.setItem(Ee(e), n), { key: e, value: n, shared: !1 });
  },
  async delete(e, n) {
    return n ? (xt.delete(e), await vn(Pa(jn(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(Ee(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", n) {
    return n ? (await Se, { keys: [...xt.keys()].filter((o) => o.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
  },
  // 서버와 한 번이라도 맞춰졌는지 (처음 연 기기에서 빈 화면을 "여행 없음"으로 착각하지 않게)
  isSynced() {
    return pe;
  },
  onChange(e) {
    return Ae.add(e), () => Ae.delete(e);
  }
};

// src/app.jsx
import { Fragment as dt, jsx as t, jsxs as a } from "react/jsx-runtime";
var X = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice" }, G = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], yo = ["일", "월", "화", "수", "목", "금", "토"], Ye = ["맛집", "관광", "쇼핑", "기타"], Xn = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Bt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, In = {
  식비: { Icon: ao, color: "#D9262E" },
  교통: { Icon: oo, color: "#0C86AE" },
  숙소: { Icon: io, color: "#7B5FC4" },
  체험: { Icon: so, color: "#E8800A" },
  쇼핑: { Icon: ro, color: "#0A9B6E" },
  기타: { Icon: lo, color: "#66718A" }
}, Be = (e) => In[e] || In.기타, Pt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), st = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Ct = (e) => {
  let [n, o, i] = e.split("-").map(Number);
  return new Date(n, o - 1, i);
}, mt = (e, n) => {
  let o = Ct(e);
  return o.setDate(o.getDate() + n), o;
}, Lt = (e) => `${e.getMonth() + 1}/${e.getDate()}`, St = (e) => yo[e.getDay()], q = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), ne = (e, n) => "₩" + (Math.round(e * n / 100 / 10) * 10).toLocaleString("ko-KR"), et = (e) => String(e).padStart(2, "0"), Le = (e) => {
  let n = (Date.now() - e) / 1e3;
  if (n < 60) return "방금";
  if (n < 3600) return `${Math.floor(n / 60)}분 전`;
  if (n < 86400) return `${Math.floor(n / 3600)}시간 전`;
  let o = new Date(e);
  return `${o.getMonth() + 1}/${o.getDate()} ${et(o.getHours())}:${et(o.getMinutes())}`;
}, zt = (e) => {
  let [n, o] = String(e).split(":").map(Number);
  return n * 60 + (o || 0);
}, Tt = (e) => `${et(Math.floor(e / 60) % 24)}:${et(e % 60)}`, ae = (e) => {
  let n = zt(e.time), o = e.end ? zt(e.end) : n + 60;
  return o <= n && (o = n + 60), { s: n, e: Math.min(o, 24 * 60) };
}, qn = (e) => {
  let n = Math.floor(e / 60), o = e % 60;
  return [n ? `${n}시간` : "", o ? `${o}분` : ""].filter(Boolean).join(" ");
};
function wo(e) {
  let n = e || "", o = n.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (o) return `${et(Number(o[2]))}:${o[3]}`;
  if (o = n.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !o) return "";
  let i = o[3] === "반" ? 30 : o[4] ? Number(o[4]) : 0;
  return `${et(Number(o[2]))}:${et(i)}`;
}
var ko = Array.from({ length: 24 }, (e, n) => et(n));
function Dn({ value: e, onChange: n, disabled: o, label: i }) {
  let [s, h] = e ? e.split(":") : ["", ""], g = Array.from({ length: 12 }, (f, d) => et(d * 5));
  return h && !g.includes(h) && (g = [...g, h].sort()), /* @__PURE__ */ a("div", { className: "jt-tsel" + (o ? " off" : ""), children: [
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 시",
        value: s,
        disabled: o,
        onChange: (f) => n(f.target.value ? `${f.target.value}:${h || "00"}` : ""),
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "--" }),
          ko.map((f) => /* @__PURE__ */ t("option", { value: f, children: f }, f))
        ]
      }
    ),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 분",
        value: h,
        disabled: o || !s,
        onChange: (f) => n(`${s}:${f.target.value}`),
        children: [
          !s && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          g.map((f) => /* @__PURE__ */ t("option", { value: f, children: f }, f))
        ]
      }
    )
  ] });
}
var No = (e) => {
  let n = e.filter((i) => i.time).map((i) => ({ id: i.id, ...ae(i) })), o = /* @__PURE__ */ new Set();
  return n.forEach(
    (i) => n.forEach((s) => {
      i.id !== s.id && i.s < s.e && s.s < i.e && o.add(i.id);
    })
  ), o;
}, ue = (e) => ut(e) ? `${e.lat},${e.lng}` : e.place ? Je(e.place) : "", Co = (e, n) => {
  let o = e ? ue(e) : "", i = ue(n);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (o ? "&origin=" + encodeURIComponent(o) : "");
}, xe = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(ut(e) ? `${e.lat},${e.lng}` : Je(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), Je = (...e) => [...e, "일본"].filter(Boolean).join(" "), ut = (e) => typeof e.lat == "number" && typeof e.lng == "number", Gn = (e) => ut(e) ? `${e.lat},${e.lng}` : Je(e.name || e.title, e.area || e.place), Mt = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Gn(e)), zo = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Gn(e)), jt = 256, De = (e, n, o) => {
  let i = jt * 2 ** o, s = e * Math.PI / 180;
  return {
    x: (n + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(s) + 1 / Math.cos(s)) / Math.PI) / 2 * i
  };
}, Pn = (e, n, o) => {
  let i = jt * 2 ** o, s = Math.PI - 2 * Math.PI * n / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(s)), lng: e / i * 360 - 180 };
}, qt = (e) => Math.max(3, Math.min(18, e));
async function Pe(e) {
  let n = await window.storage.list(e, !0), o = (n && n.keys || []).map((s) => typeof s == "string" ? s : s.key).filter(Boolean), i = await Promise.all(o.map((s) => ht(s, null)));
  return o.map((s, h) => [s, i[h]]).filter(([, s]) => s);
}
async function ht(e, n) {
  try {
    let o = await window.storage.get(e, !0);
    return o && o.value ? JSON.parse(o.value) : n;
  } catch {
    return n;
  }
}
async function gt(e, n) {
  try {
    return !!await window.storage.set(e, JSON.stringify(n), !0);
  } catch {
    return !1;
  }
}
var Eo = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: st(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function Ao() {
  for (let [e, n] of Eo)
    try {
      let o = await fetch(e);
      if (!o.ok) continue;
      let i = n(await o.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var $n = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), fe = (e) => e.fx ? `100엔 = ₩${$n(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${$n(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Tn(e, n) {
  let o = () => Object.fromEntries(n.map((x) => [x, 0])), i = o(), s = o(), h = [];
  e.forEach((x) => {
    let A = Number(x.amount) || 0, v = (x.split || []).filter((E) => n.includes(E));
    if (!(A <= 0)) {
      if (!v.length || !n.includes(x.payer)) {
        h.push(x);
        return;
      }
      i[x.payer] += A, v.forEach((E) => s[E] += A / v.length);
    }
  });
  let g = Object.fromEntries(n.map((x) => [x, i[x] - s[x]])), f = n.filter((x) => g[x] > 0.5).map((x) => ({ m: x, v: g[x] })).sort((x, A) => A.v - x.v), d = n.filter((x) => g[x] < -0.5).map((x) => ({ m: x, v: -g[x] })).sort((x, A) => A.v - x.v), j = [], b = 0, z = 0;
  for (; b < d.length && z < f.length; ) {
    let x = Math.min(d[b].v, f[z].v);
    x >= 1 && j.push({ from: d[b].m, to: f[z].m, v: Math.round(x) }), d[b].v -= x, f[z].v -= x, d[b].v < 0.5 && b++, f[z].v < 0.5 && z++;
  }
  return { paid: i, share: s, net: g, moves: j, skipped: h };
}
function rt({ name: e, members: n, size: o = 28 }) {
  let i = Math.max(0, n.indexOf(e));
  return /* @__PURE__ */ t(
    "span",
    {
      className: "jt-avatar",
      style: { width: o, height: o, background: G[(i * 2 + 3) % G.length], fontSize: o * 0.46 },
      "aria-hidden": "true",
      children: e ? e[0] : "?"
    }
  );
}
function ot({ label: e, children: n }) {
  return /* @__PURE__ */ a("label", { className: "jt-field", children: [
    /* @__PURE__ */ t("span", { children: e }),
    n
  ] });
}
function Rt({ title: e, onClose: n, children: o }) {
  return K(() => {
    let i = (s) => s.key === "Escape" && n();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: n, children: /* @__PURE__ */ a("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ a("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ t(We, { size: 20 }) })
    ] }),
    o
  ] }) });
}
function Ft({ onConfirm: e, label: n = "삭제" }) {
  let [o, i] = w(!1);
  return K(() => {
    if (!o) return;
    let s = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(s);
  }, [o]), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-del" + (o ? " armed" : ""),
      onClick: (s) => {
        s.stopPropagation(), o ? e() : i(!0);
      },
      children: [
        /* @__PURE__ */ t(La, { size: 15 }),
        o ? "한 번 더 누르면 삭제돼요" : n
      ]
    }
  );
}
var Rn = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Zn(e) {
  let n = {};
  return Object.entries(e.reactions || {}).forEach(([o, i]) => n[o] = [...i]), n;
}
function So(e, n, o) {
  let i = Zn(e), s = (i[n] || []).includes(o), h = {};
  return Object.entries(i).forEach(([g, f]) => {
    let d = f.filter((j) => j !== o);
    d.length && (h[g] = d);
  }), s || (h[n] = [...h[n] || [], o]), { ...e, reactions: h };
}
function Ve({ className: e, onTap: n, names: o = [], title: i, members: s = [], children: h, ...g }) {
  let [f, d] = w(!1), [j, b] = w("up left"), z = Y(null), x = Y(null), A = Y(!1);
  K(() => {
    if (!f) return;
    let y = (C) => z.current && !z.current.contains(C.target) && d(!1);
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [f]), K(() => () => clearTimeout(x.current), []);
  let v = () => {
    if (z.current) {
      let y = z.current.getBoundingClientRect();
      b((y.top < 200 ? "down" : "up") + " " + (y.left > window.innerWidth - 210 ? "right" : "left"));
    }
    d(!0), navigator.vibrate && navigator.vibrate(15);
  }, E = () => {
    A.current = !1, clearTimeout(x.current), x.current = setTimeout(() => {
      A.current = !0, v();
    }, 450);
  }, N = () => clearTimeout(x.current);
  return /* @__PURE__ */ a("span", { className: "jt-hold", ref: z, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: e + " jt-holdbtn",
        ...g,
        title: o.length ? o.join(", ") : void 0,
        onPointerDown: E,
        onPointerUp: N,
        onPointerLeave: N,
        onPointerCancel: N,
        onContextMenu: (y) => {
          y.preventDefault(), N(), A.current = !0, v();
        },
        onClick: (y) => {
          if (y.stopPropagation(), A.current) {
            A.current = !1;
            return;
          }
          n(y);
        },
        children: h
      }
    ),
    f && /* @__PURE__ */ a("div", { className: "jt-whopop " + j, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ a("strong", { children: [
        i,
        " ",
        o.length,
        "명"
      ] }),
      o.length ? /* @__PURE__ */ t("ul", { children: o.map((y) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t(rt, { name: y, members: s.length ? s : o, size: 22 }),
        y
      ] }, y)) }) : /* @__PURE__ */ t("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Xe({ item: e, me: n, onReact: o, members: i = [] }) {
  let [s, h] = w(!1), [g, f] = w("up right"), d = Y(null), j = Zn(e), b = () => {
    if (!s && d.current) {
      let v = d.current.getBoundingClientRect(), N = d.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", y = v.top < 190 ? "down" : "up";
      f(y + " " + N);
    }
    h(!s);
  }, z = Rn.filter(([v]) => (j[v] || []).length), x = Object.keys(j).find((v) => j[v].includes(n));
  K(() => {
    if (!s) return;
    let v = (E) => d.current && !d.current.contains(E.target) && h(!1);
    return document.addEventListener("pointerdown", v), () => document.removeEventListener("pointerdown", v);
  }, [s]);
  let A = (v) => {
    o(v), h(!1);
  };
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-react",
      ref: d,
      onClick: (v) => v.stopPropagation(),
      onKeyDown: (v) => v.stopPropagation(),
      children: [
        z.map(([v, E]) => /* @__PURE__ */ a(
          Ve,
          {
            className: "jt-rchip" + (x === v ? " on" : ""),
            onTap: () => A(v),
            names: j[v],
            members: i,
            title: `${v} ${E}`,
            "aria-pressed": x === v,
            "aria-label": `${E} ${j[v].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t("span", { className: "jt-emoji", children: v }),
              j[v].length
            ]
          },
          v
        )),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (s ? " open" : ""),
            onClick: b,
            "aria-expanded": s,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(ho, { size: 16 })
          }
        ),
        s && /* @__PURE__ */ a("div", { className: "jt-rpop " + g, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: Rn.map(([v, E]) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (x === v ? " on" : ""),
              onClick: () => A(v),
              "aria-label": E,
              title: E,
              children: v
            },
            v
          )) }),
          z.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-rwho", children: z.map(([v]) => /* @__PURE__ */ a("li", { children: [
            /* @__PURE__ */ t("span", { className: "jt-emoji", children: v }),
            j[v].join(", ")
          ] }, v)) })
        ] })
      ]
    }
  );
}
function ee(e, n) {
  let o = (n || []).find((i) => i.wishId === e.id) || (n || []).find((i) => !i.wishId && i.title === e.name);
  return o ? o.day : null;
}
function Qn() {
  let [e, n] = w({});
  return [e, (s) => n((h) => ({ ...h, [s]: !h[s] })), (s, h) => n(h ? Object.fromEntries(s.map((g) => [g, !0])) : {})];
}
function ta({ ids: e, open: n, setAll: o }) {
  if (e.length < 2) return null;
  let i = e.every((s) => n[s]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-ghost sm", onClick: () => o(e, !i), children: [
    i ? /* @__PURE__ */ t(Vn, { size: 15 }) : /* @__PURE__ */ t(At, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function ea({ count: e, open: n, onClick: o }) {
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
        /* @__PURE__ */ t(Ha, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function qe({ comments: e = [], me: n, members: o, onAdd: i, onDelete: s }) {
  let [h, g] = w(""), f = () => {
    let d = h.trim();
    d && (i(d), g(""));
  };
  return /* @__PURE__ */ a("div", { className: "jt-comments", onClick: (d) => d.stopPropagation(), onKeyDown: (d) => d.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((d) => /* @__PURE__ */ a("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(rt, { name: d.by, members: o, size: 24 }),
      /* @__PURE__ */ a("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("strong", { children: d.by }),
          /* @__PURE__ */ t("span", { children: Le(d.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: d.text })
      ] }),
      d.by === n && /* @__PURE__ */ t(Ft, { onConfirm: () => s(d.id), label: "" })
    ] }, d.id)) }),
    /* @__PURE__ */ a("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: h,
          onChange: (d) => g(d.target.value),
          onKeyDown: (d) => d.key === "Enter" && !d.nativeEvent.isComposing && f(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: f, disabled: !h.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(Jn, { size: 18 }) })
    ] })
  ] });
}
function Mo({ initial: e, onSave: n, onCancel: o }) {
  let [i, s] = w(e?.title || "가족 일본여행"), [h, g] = w(e?.start || st(new Date(Date.now() + 30 * 864e5))), [f, d] = w(e?.days || 4), [j, b] = w(e?.members || []), [z, x] = w(e?.rate || 900), [A, v] = w(e?.gmapsKey || ""), [E, N] = w("locked"), y = Y(null), C = (M) => M ? M.length > 10 ? M.slice(0, 4) + "••••••••" + M.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [r, l] = w(""), S = () => {
    let M = r.trim();
    !M || j.includes(M) || (b([...j, M]), l(""));
  }, k = i.trim() && h && j.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    o && /* @__PURE__ */ t(na, { onBack: o }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ a("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(ot, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (M) => s(M.target.value) }) }),
      /* @__PURE__ */ t(ot, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: h, onChange: (M) => g(M.target.value) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "여행 일수" }),
        /* @__PURE__ */ a("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => d(Math.max(1, f - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ a("strong", { children: [
            f,
            "일"
          ] }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => d(Math.min(30, f + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ t("div", { className: "jt-chips", children: j.map((M) => /* @__PURE__ */ a("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ t(rt, { name: M, members: j, size: 20 }),
          M,
          /* @__PURE__ */ t("button", { type: "button", onClick: () => b(j.filter((p) => p !== M)), "aria-label": `${M} 빼기`, children: /* @__PURE__ */ t(We, { size: 14 }) })
        ] }, M)) }),
        /* @__PURE__ */ a("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: r,
              onChange: (M) => l(M.target.value),
              onKeyDown: (M) => M.key === "Enter" && S(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: S, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(ot, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: z, onChange: (M) => x(Number(M.target.value) || 0) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "구글 지도 API 키 (선택)" }),
        E === "edit" ? /* @__PURE__ */ t(
          "input",
          {
            ref: y,
            value: A,
            onChange: (M) => v(M.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ a("div", { className: "jt-keylock", children: [
          /* @__PURE__ */ t(Qa, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ t("span", { className: "jt-keylock-val", children: C(A) }),
          E === "locked" && /* @__PURE__ */ t(Io, { onDone: () => N("warn"), className: "sm", children: "길게 눌러 변경" })
        ] }),
        E === "warn" && /* @__PURE__ */ a("div", { className: "jt-keywarn", role: "alert", children: [
          /* @__PURE__ */ t("strong", { children: "API 키를 바꾸기 전에 확인해 주세요" }),
          /* @__PURE__ */ a("ul", { children: [
            /* @__PURE__ */ a("li", { children: [
              "바꾼 키는 저장하면 ",
              /* @__PURE__ */ t("b", { children: "가족 모두의 앱" }),
              "에 바로 적용돼요."
            ] }),
            /* @__PURE__ */ t("li", { children: "키가 틀리거나 사용 제한에 걸리면 지도, 장소 검색, 내 주변이 기본 지도로 바뀌어요." }),
            /* @__PURE__ */ t("li", { children: "새 키는 구글 클라우드에서 사이트 제한과 하루 사용 한도를 꼭 걸어 주세요. 한도를 걸지 않으면 요금이 나올 수 있어요." }),
            /* @__PURE__ */ t("li", { children: "키를 지우면 무료 기본 지도로 돌아가요." })
          ] }),
          /* @__PURE__ */ a("div", { className: "jt-keywarn-act", children: [
            /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => N("locked"), children: "취소" }),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  N("edit"), setTimeout(() => y.current && y.current.focus(), 50);
                },
                children: "확인했어요, 변경할게요"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: E === "edit" ? "고친 뒤 아래 '설정 저장'을 눌러야 적용돼요." : "실수로 바뀌지 않도록 잠겨 있어요. 한 명만 넣으면 가족 모두에게 적용돼요." }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-primary",
          disabled: !k,
          onClick: () => n({ title: i.trim(), start: h, days: f, members: j, rate: z || 900, gmapsKey: A }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      o && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: o, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(Fo, {})
    ] })
  ] });
}
function Fo() {
  let [e, n] = w(""), o = Cn();
  return /* @__PURE__ */ a("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: o });
          return;
        } catch (s) {
          if (s && s.name === "AbortError") return;
        }
      try {
        await navigator.clipboard.writeText(o), n("링크를 복사했어요. 가족 채팅방에 붙여넣어 주세요.");
      } catch {
        n("자동 복사가 안 돼요. 아래 '주소 보기'를 열어 길게 눌러 복사해 주세요.");
      }
    }, children: "초대 링크 보내기" }),
    e && /* @__PURE__ */ t("p", { className: "jt-hint jt-formmsg", children: e }),
    /* @__PURE__ */ a("details", { children: [
      /* @__PURE__ */ t("summary", { children: "주소 보기" }),
      /* @__PURE__ */ t("code", { children: o })
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: "jt-ghost",
        onClick: () => {
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && zn();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function na({ onBack: e, label: n = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-back", onClick: e, "aria-label": n, children: [
    /* @__PURE__ */ t(Ya, { size: 22 }),
    n
  ] }) });
}
function Io({ ms: e = 1e3, onDone: n, children: o, className: i = "" }) {
  let [s, h] = w(!1), g = Y(null), f = (j) => {
    j.preventDefault(), h(!0), clearTimeout(g.current), g.current = setTimeout(() => {
      h(!1), navigator.vibrate && navigator.vibrate(20), n();
    }, e);
  }, d = () => {
    clearTimeout(g.current), h(!1);
  };
  return K(() => () => clearTimeout(g.current), []), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-presshold " + i + (s ? " pressing" : ""),
      style: { "--hold": e + "ms" },
      onPointerDown: f,
      onPointerUp: d,
      onPointerLeave: d,
      onPointerCancel: d,
      onContextMenu: (j) => j.preventDefault(),
      onKeyDown: (j) => (j.key === "Enter" || j.key === " ") && !j.repeat && f(j),
      onKeyUp: d,
      children: [
        /* @__PURE__ */ t("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-presshold-label", children: o })
      ]
    }
  );
}
function Do() {
  let [e, n] = w(() => typeof navigator > "u" ? !0 : navigator.onLine !== !1), [o, i] = w(!1), [s, h] = w(!1);
  return K(() => {
    let g, f = () => {
      n(!0), h(!1), i(!0), clearTimeout(g), g = setTimeout(() => i(!1), 3e3);
    }, d = () => {
      n(!1), i(!1);
    };
    return window.addEventListener("online", f), window.addEventListener("offline", d), () => {
      window.removeEventListener("online", f), window.removeEventListener("offline", d), clearTimeout(g);
    };
  }, []), e && !o ? null : e ? /* @__PURE__ */ a("div", { className: "jt-netbar on", role: "status", children: [
    /* @__PURE__ */ t(eo, { size: 15, "aria-hidden": "true" }),
    "다시 연결됐어요. 저장해 둔 내용을 올리고 있어요."
  ] }) : /* @__PURE__ */ a("div", { className: "jt-netbar", role: "alert", children: [
    /* @__PURE__ */ a("button", { type: "button", className: "jt-netbar-head", onClick: () => h(!s), "aria-expanded": s, children: [
      /* @__PURE__ */ t(to, { size: 15, "aria-hidden": "true" }),
      /* @__PURE__ */ t("span", { children: "오프라인 상태예요. 입력한 내용은 연결되면 자동으로 올라가요." }),
      /* @__PURE__ */ t(At, { size: 16, className: "jt-fold-ic", "aria-hidden": "true" })
    ] }),
    s && /* @__PURE__ */ a("div", { className: "jt-netbar-body", children: [
      /* @__PURE__ */ a("p", { children: [
        /* @__PURE__ */ t("b", { children: "계속 쓸 수 있어요" }),
        " 일정, 가고 싶은 곳, 경비 보기와 입력, 정산, 채팅 쓰기, 길 찾기 버튼, 마지막으로 받은 날씨"
      ] }),
      /* @__PURE__ */ a("p", { children: [
        /* @__PURE__ */ t("b", { children: "연결되면 돼요" }),
        " 새 날씨 예보, 지도 화면, 장소 검색, 내 주변, 가족 위치 갱신, 새 채팅 받기"
      ] })
    ] })
  ] });
}
function Po({ members: e, onPick: n, current: o, onBack: i }) {
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(na, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((s) => /* @__PURE__ */ a("button", { className: "jt-who-btn" + (s === o ? " on" : ""), onClick: () => n(s), children: [
      /* @__PURE__ */ t(rt, { name: s, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: s }),
      s === o && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, s)) })
  ] });
}
function $o({ initial: e, preset: n, gkey: o, dayItems: i = [], onSave: s, onDelete: h }) {
  let [g, f] = w(e?.time || n?.time || ""), [d, j] = w(e?.end || n?.end || ""), [b, z] = w(e?.link || ""), [x, A] = w(e && ut(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [v, E] = w([]), [N, y] = w(!1), [C, r] = w(""), [l, S] = w(e?.title || ""), [k, M] = w(e?.place || ""), [p, $] = w(e?.memo || ""), [u, c] = w(!1), D = (_) => {
    if (S(_), !g || u) {
      let F = wo(_);
      F ? (f(F), c(!0)) : u && (f(""), c(!1));
    }
  }, R = async () => {
    let _ = (k || l).trim();
    if (!_) {
      r("장소 이름을 먼저 적어 주세요.");
      return;
    }
    y(!0), r(""), E([]);
    try {
      let F = await ra(_, o);
      E(F), F.length || r("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      r("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    y(!1);
  }, V = g && d && zt(d) <= zt(g), J = g ? i.filter((_) => {
    if (!_.time) return !1;
    let F = ae({ time: g, end: V ? "" : d }), W = ae(_);
    return F.s < W.e && W.s < F.e;
  }) : [];
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(ot, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: l, onChange: (_) => D(_.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    u && g && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      "제목에서 ",
      g,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-two", children: [
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          Dn,
          {
            label: "시작",
            value: g,
            onChange: (_) => {
              f(_), c(!1), _ || j("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(Dn, { label: "끝", value: d, onChange: j, disabled: !g })
      ] })
    ] }),
    g && !d && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    V && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    g && d && !V && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      qn(zt(d) - zt(g)),
      " 동안"
    ] }),
    J.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      J.map((_) => `'${_.title}'(${_.time}${_.end ? `~${_.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: k,
            onChange: (_) => M(_.target.value),
            onKeyDown: (_) => _.key === "Enter" && !_.nativeEvent.isComposing && R(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: R, disabled: N, children: N ? "찾는 중" : "검색" })
      ] })
    ] }),
    C && /* @__PURE__ */ t("p", { className: "jt-hint", children: C }),
    v.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: v.map((_, F) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          M(_.name), A({ lat: _.lat, lng: _.lng, placeId: _.placeId }), _.link && z(_.link), E([]), r("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: _.name }),
          /* @__PURE__ */ t("span", { children: _.area })
        ]
      }
    ) }, F)) }),
    x && /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(Et, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ a("a", { className: "jt-maplink", href: Mt({ title: l, place: k, link: b, ...x }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Kt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => A(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(ot, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: b, onChange: (_) => z(_.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(ot, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: p, onChange: (_) => $(_.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !l.trim() || V,
        onClick: () => s({
          time: g,
          end: g ? d : "",
          title: l.trim(),
          place: k.trim(),
          memo: p.trim(),
          link: b.trim(),
          lat: x ? x.lat : void 0,
          lng: x ? x.lng : void 0,
          placeId: x && x.placeId ? x.placeId : void 0
        }),
        children: e ? "수정 저장" : "일정 추가"
      }
    ),
    e && /* @__PURE__ */ t(Ft, { onConfirm: h, label: "이 일정 삭제" })
  ] });
}
function To({ initial: e, onSave: n, onDelete: o }) {
  let [i, s] = w(e?.name || ""), [h, g] = w(e?.cat || "맛집"), [f, d] = w(e?.area || ""), [j, b] = w(e?.link || ""), [z, x] = w(e?.memo || "");
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(ot, { label: "이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (A) => s(A.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Ye.map((A) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (h === A ? " on" : ""), onClick: () => g(A), children: A }, A)) })
    ] }),
    /* @__PURE__ */ t(ot, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: f, onChange: (A) => d(A.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(ot, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: j,
        onChange: (A) => b(A.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(ot, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: z, onChange: (A) => x(A.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim(),
        onClick: () => n({ name: i.trim(), cat: h, area: f.trim(), link: j.trim(), memo: z.trim() }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(Ft, { onConfirm: o, label: "이 장소 삭제" })
  ] });
}
function Ro({ settings: e, me: n, defaultDay: o, initial: i, onSave: s, onDelete: h }) {
  let { members: g, days: f, start: d, rate: j } = e, [b, z] = w(i?.title || ""), [x, A] = w(i ? String(Number(i.amount) || "") : ""), [v, E] = w(i && g.includes(i.payer) ? i.payer : n), [N, y] = w(i?.cat || "식비"), [C, r] = w(i ? Math.min(i.day, f - 1) : o), [l, S] = w(i ? (i.split || []).filter((u) => g.includes(u)) : g), k = Number(x) || 0, M = i ? [i.payer, ...i.split || []].filter((u, c, D) => u && !g.includes(u) && D.indexOf(u) === c) : [], p = (u) => S(l.includes(u) ? l.filter((c) => c !== u) : [...l, u]), $ = b.trim() && k > 0 && l.length > 0;
