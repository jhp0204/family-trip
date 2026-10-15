// src/main.jsx
import { useState as It, useEffect as ri } from "react";
import { createRoot as si } from "react-dom/client";

// src/app.jsx
import Sa, { useState as w, useEffect as O, useMemo as te, useCallback as Ia, useRef as H } from "react";
import {
  Plus as Fa,
  X as _e,
  Heart as Be,
  Trash2 as Da,
  MapPin as Et,
  Settings as Pa,
  CalendarDays as $a,
  Wallet as Ra,
  Check as _n,
  ExternalLink as Kt,
  Map as Ta,
  MessageSquare as _a,
  Send as Bn,
  Pencil as fe,
  ChevronLeft as Ba,
  ChevronRight as La,
  ChevronDown as Lt,
  ChevronUp as Ln,
  Users as Oa,
  Crosshair as Ka,
  HelpCircle as Ua,
  MessagesSquare as Wa,
  Megaphone as Ha,
  Lock as Ya,
  Pin as Ja,
  PinOff as wn,
  Utensils as Xa,
  TrainFront as qa,
  BedDouble as Ga,
  Ticket as Va,
  ShoppingBag as Za,
  MoreHorizontal as Qa,
  Sun as to,
  CloudSun as eo,
  Cloud as kn,
  CloudFog as no,
  CloudDrizzle as ao,
  CloudRain as oo,
  CloudSnow as io,
  CloudLightning as ro,
  Umbrella as so,
  SmilePlus as lo,
  LocateFixed as co,
  Star as po,
  Navigation as vt
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
  setDoc as fn,
  deleteDoc as za
} from "firebase/firestore";
var qt = "fjt:", Nt = { config: null, code: null }, Ne = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), Ea = (e) => JSON.parse(decodeURIComponent(escape(atob(e.replace(/-/g, "+").replace(/_/g, "/")))));
function Ce(e) {
  try {
    let n = String(e || "").trim(), o = n.includes("#") ? n.slice(n.indexOf("#") + 1) : n, i = new URLSearchParams(o).get("j") || (o.startsWith("j=") ? o.slice(2) : "");
    if (!i) return null;
    let r = Ea(i);
    return r && r.c && r.t ? r : null;
  } catch {
    return null;
  }
}
function gn() {
  let e = Ce(location.hash);
  if (e)
    return localStorage.setItem(qt + "conn", JSON.stringify(e)), e;
  try {
    let n = JSON.parse(localStorage.getItem(qt + "conn"));
    if (n && n.c && n.t)
      return history.replaceState(null, "", "#j=" + Ne(n)), n;
  } catch {
  }
  return null;
}
function bn(e, n) {
  let o = { c: e, t: n };
  return localStorage.setItem(qt + "conn", JSON.stringify(o)), history.replaceState(null, "", "#j=" + Ne(o)), o;
}
var xn = () => location.origin + location.pathname + "#j=" + Ne({ c: Nt.config, t: Nt.code });
function hn() {
  localStorage.removeItem(qt + "conn"), history.replaceState(null, "", location.pathname), location.reload();
}
var jn = () => {
  let e = "abcdefghjkmnpqrstuvwxyz23456789", n = crypto.getRandomValues(new Uint8Array(14));
  return Array.from(n, (o) => e[o % e.length]).join("");
};
function vn(e) {
  let n = String(e || "");
  try {
    let i = JSON.parse(n);
    if (i.apiKey && i.projectId && i.appId) return i;
  } catch {
  }
  let o = {};
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((i) => {
    let r = n.match(new RegExp(i + `\\s*[:=]\\s*["']([^"']+)["']`));
    r && (o[i] = r[1]);
  }), o.apiKey && o.projectId && o.appId ? o : null;
}
var Xt = null, xt = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Set(), ke = Promise.resolve(), ve = null, pn = null, Ma = () => {
  clearTimeout(pn), pn = setTimeout(() => we.forEach((e) => e()), 250);
}, dn = (e) => un(Xt, "trips", Nt.code, "data", e), ye = (e) => qt + Nt.code + ":" + e, mn = (e) => Promise.race([e.then(() => !0), new Promise((n) => setTimeout(() => n(!0), 4e3))]);
function ze(e, n) {
  ve && ve(), xt.clear(), Nt.config = e, Nt.code = n;
  let o = ya(e, "fjt-" + Date.now());
  try {
    Xt = cn(o, { localCache: wa({ tabManager: ka() }) });
  } catch {
    Xt = cn(o, {});
  }
  let i;
  ke = new Promise((y) => i = y), setTimeout(() => i(), 6e3);
  let r = !0;
  ve = Ca(
    Na(Xt, "trips", n, "data"),
    (y) => {
      y.docChanges().forEach((x) => {
        x.type === "removed" ? xt.delete(x.doc.id) : xt.set(x.doc.id, x.doc.data().v);
      }), i(), r || Ma(), r = !1;
    },
    () => i()
  ), window.storage = Aa;
}
async function yn() {
  let e = un(Xt, "trips", Nt.code, "data", "_ping");
  await Promise.race([
    fn(e, { v: "ok", t: Date.now() }),
    new Promise((n, o) => setTimeout(() => o(new Error("timeout")), 9e3))
  ]);
}
var Aa = {
  async get(e, n) {
    if (!n) {
      let o = localStorage.getItem(ye(e));
      if (o == null) throw new Error("not found");
      return { key: e, value: o, shared: !1 };
    }
    if (await ke, !xt.has(e)) throw new Error("not found");
    return { key: e, value: xt.get(e), shared: !0 };
  },
  async set(e, n, o) {
    return o ? (xt.set(e, n), await mn(fn(dn(e), { v: n, t: Date.now() })), { key: e, value: n, shared: !0 }) : (localStorage.setItem(ye(e), n), { key: e, value: n, shared: !1 });
  },
  async delete(e, n) {
    return n ? (xt.delete(e), await mn(za(dn(e))), { key: e, deleted: !0, shared: !0 }) : (localStorage.removeItem(ye(e)), { key: e, deleted: !0, shared: !1 });
  },
  async list(e = "", n) {
    return n ? (await ke, { keys: [...xt.keys()].filter((o) => o.startsWith(e)), prefix: e, shared: !0 }) : { keys: [], prefix: e, shared: !1 };
  },
  onChange(e) {
    return we.add(e), () => we.delete(e);
  }
};

// src/app.jsx
import { Fragment as pt, jsx as t, jsxs as a } from "react/jsx-runtime";
var q = { settings: "trip:settings", plan: "trip:plan", wish: "trip:wish", spend: "trip:spend", fx: "trip:fx", notice: "trip:notice" }, V = ["#E8800A", "#D9262E", "#0A9B6E", "#0C86AE", "#7B5FC4", "#8A5530", "#0A8F82", "#A8802F", "#CC3F7A"], mo = ["일", "월", "화", "수", "목", "금", "토"], Le = ["맛집", "관광", "쇼핑", "기타"], On = ["식비", "교통", "숙소", "체험", "쇼핑", "기타"], Bt = { 맛집: "#D9262E", 관광: "#0C86AE", 쇼핑: "#7B5FC4", 기타: "#66718A" }, Nn = {
  식비: { Icon: Xa, color: "#D9262E" },
  교통: { Icon: qa, color: "#0C86AE" },
  숙소: { Icon: Ga, color: "#7B5FC4" },
  체험: { Icon: Va, color: "#E8800A" },
  쇼핑: { Icon: Za, color: "#0A9B6E" },
  기타: { Icon: Qa, color: "#66718A" }
}, De = (e) => Nn[e] || Nn.기타, Pt = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ct = (e) => new Date(e.getTime() - e.getTimezoneOffset() * 6e4).toISOString().slice(0, 10), Ct = (e) => {
  let [n, o, i] = e.split("-").map(Number);
  return new Date(n, o - 1, i);
}, ft = (e, n) => {
  let o = Ct(e);
  return o.setDate(o.getDate() + n), o;
}, ne = (e) => `${e.getMonth() + 1}/${e.getDate()}`, Mt = (e) => mo[e.getDay()], G = (e) => "¥" + Math.round(e).toLocaleString("ko-KR"), ae = (e, n) => "₩" + (Math.round(e * n / 100 / 10) * 10).toLocaleString("ko-KR"), nt = (e) => String(e).padStart(2, "0"), Pe = (e) => {
  let n = (Date.now() - e) / 1e3;
  if (n < 60) return "방금";
  if (n < 3600) return `${Math.floor(n / 60)}분 전`;
  if (n < 86400) return `${Math.floor(n / 3600)}시간 전`;
  let o = new Date(e);
  return `${o.getMonth() + 1}/${o.getDate()} ${nt(o.getHours())}:${nt(o.getMinutes())}`;
}, zt = (e) => {
  let [n, o] = String(e).split(":").map(Number);
  return n * 60 + (o || 0);
}, Rt = (e) => `${nt(Math.floor(e / 60) % 24)}:${nt(e % 60)}`, oe = (e) => {
  let n = zt(e.time), o = e.end ? zt(e.end) : n + 60;
  return o <= n && (o = n + 60), { s: n, e: Math.min(o, 24 * 60) };
}, Kn = (e) => {
  let n = Math.floor(e / 60), o = e % 60;
  return [n ? `${n}시간` : "", o ? `${o}분` : ""].filter(Boolean).join(" ");
};
function uo(e) {
  let n = e || "", o = n.match(/(^|[^\d])([01]?\d|2[0-3])[:：]([0-5]\d)(?!\d)/);
  if (o) return `${nt(Number(o[2]))}:${o[3]}`;
  if (o = n.match(/(^|[^\d])([01]?\d|2[0-3])\s*시(?!간|장|내|티|즈)\s*(반|([0-5]?\d)\s*분)?/), !o) return "";
  let i = o[3] === "반" ? 30 : o[4] ? Number(o[4]) : 0;
  return `${nt(Number(o[2]))}:${nt(i)}`;
}
var fo = Array.from({ length: 24 }, (e, n) => nt(n));
function Cn({ value: e, onChange: n, disabled: o, label: i }) {
  let [r, y] = e ? e.split(":") : ["", ""], x = Array.from({ length: 12 }, (g, m) => nt(m * 5));
  return y && !x.includes(y) && (x = [...x, y].sort()), /* @__PURE__ */ a("div", { className: "jt-tsel" + (o ? " off" : ""), children: [
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 시",
        value: r,
        disabled: o,
        onChange: (g) => n(g.target.value ? `${g.target.value}:${y || "00"}` : ""),
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "--" }),
          fo.map((g) => /* @__PURE__ */ t("option", { value: g, children: g }, g))
        ]
      }
    ),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: ":" }),
    /* @__PURE__ */ a(
      "select",
      {
        "aria-label": i + " 분",
        value: y,
        disabled: o || !r,
        onChange: (g) => n(`${r}:${g.target.value}`),
        children: [
          !r && /* @__PURE__ */ t("option", { value: "", children: "--" }),
          x.map((g) => /* @__PURE__ */ t("option", { value: g, children: g }, g))
        ]
      }
    )
  ] });
}
var go = (e) => {
  let n = e.filter((i) => i.time).map((i) => ({ id: i.id, ...oe(i) })), o = /* @__PURE__ */ new Set();
  return n.forEach(
    (i) => n.forEach((r) => {
      i.id !== r.id && i.s < r.e && r.s < i.e && o.add(i.id);
    })
  ), o;
}, de = (e) => dt(e) ? `${e.lat},${e.lng}` : e.place ? Oe(e.place) : "", bo = (e, n) => {
  let o = e ? de(e) : "", i = de(n);
  return "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(i) + (o ? "&origin=" + encodeURIComponent(o) : "");
}, ge = (e) => "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + encodeURIComponent(dt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place)) + (e.placeId ? "&destination_place_id=" + encodeURIComponent(e.placeId) : ""), Oe = (...e) => [...e, "일본"].filter(Boolean).join(" "), dt = (e) => typeof e.lat == "number" && typeof e.lng == "number", Un = (e) => dt(e) ? `${e.lat},${e.lng}` : Oe(e.name || e.title, e.area || e.place), At = (e) => /^https?:\/\//.test(e.link || "") ? e.link : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(Un(e)), xo = (e) => "https://maps.google.com/maps?hl=ko&z=15&output=embed&q=" + encodeURIComponent(Un(e)), jt = 256, Ee = (e, n, o) => {
  let i = jt * 2 ** o, r = e * Math.PI / 180;
  return {
    x: (n + 180) / 360 * i,
    y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * i
  };
}, zn = (e, n, o) => {
  let i = jt * 2 ** o, r = Math.PI - 2 * Math.PI * n / i;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(r)), lng: e / i * 360 - 180 };
}, Gt = (e) => Math.max(3, Math.min(18, e));
async function Me(e) {
  let n = await window.storage.list(e, !0), o = (n && n.keys || []).map((r) => typeof r == "string" ? r : r.key).filter(Boolean), i = await Promise.all(o.map((r) => ht(r, null)));
  return o.map((r, y) => [r, i[y]]).filter(([, r]) => r);
}
async function ht(e, n) {
  try {
    let o = await window.storage.get(e, !0);
    return o && o.value ? JSON.parse(o.value) : n;
  } catch {
    return n;
  }
}
async function ut(e, n) {
  try {
    return !!await window.storage.set(e, JSON.stringify(n), !0);
  } catch {
    return !1;
  }
}
var ho = [
  ["https://api.frankfurter.dev/v1/latest?base=JPY&symbols=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  ["https://api.frankfurter.app/latest?from=JPY&to=KRW", (e) => ({ rate: e.rates.KRW * 100, date: e.date, source: "ECB 공식 기준환율" })],
  [
    "https://open.er-api.com/v6/latest/JPY",
    (e) => ({ rate: e.rates.KRW * 100, date: ct(new Date(e.time_last_update_unix * 1e3)), source: "ExchangeRate-API" })
  ]
];
async function jo() {
  for (let [e, n] of ho)
    try {
      let o = await fetch(e);
      if (!o.ok) continue;
      let i = n(await o.json());
      if (i.rate > 0) return i;
    } catch {
    }
  return null;
}
var En = (e) => e.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), me = (e) => e.fx ? `100엔 = ₩${En(e.rate)} (${e.fx.source}, ${e.fx.date.slice(5).replace("-", "/")}${e.fx.cached ? ", 마지막으로 받은 값" : ""})` : `100엔 = ₩${En(e.rate)} (설정에 입력한 환율, 자동 환율을 불러오지 못했어요)`;
function Mn(e, n) {
  let o = () => Object.fromEntries(n.map((b) => [b, 0])), i = o(), r = o(), y = [];
  e.forEach((b) => {
    let C = Number(b.amount) || 0, N = (b.split || []).filter((s) => n.includes(s));
    if (!(C <= 0)) {
      if (!N.length || !n.includes(b.payer)) {
        y.push(b);
        return;
      }
      i[b.payer] += C, N.forEach((s) => r[s] += C / N.length);
    }
  });
  let x = Object.fromEntries(n.map((b) => [b, i[b] - r[b]])), g = n.filter((b) => x[b] > 0.5).map((b) => ({ m: b, v: x[b] })).sort((b, C) => C.v - b.v), m = n.filter((b) => x[b] < -0.5).map((b) => ({ m: b, v: -x[b] })).sort((b, C) => C.v - b.v), h = [], c = 0, E = 0;
  for (; c < m.length && E < g.length; ) {
    let b = Math.min(m[c].v, g[E].v);
    b >= 1 && h.push({ from: m[c].m, to: g[E].m, v: Math.round(b) }), m[c].v -= b, g[E].v -= b, m[c].v < 0.5 && c++, g[E].v < 0.5 && E++;
  }
  return { paid: i, share: r, net: x, moves: h, skipped: y };
}
function rt({ name: e, members: n, size: o = 28 }) {
  let i = Math.max(0, n.indexOf(e));
  return /* @__PURE__ */ t(
    "span",
    {
      className: "jt-avatar",
      style: { width: o, height: o, background: V[(i * 2 + 3) % V.length], fontSize: o * 0.46 },
      "aria-hidden": "true",
      children: e ? e[0] : "?"
    }
  );
}
function at({ label: e, children: n }) {
  return /* @__PURE__ */ a("label", { className: "jt-field", children: [
    /* @__PURE__ */ t("span", { children: e }),
    n
  ] });
}
function Tt({ title: e, onClose: n, children: o }) {
  return O(() => {
    let i = (r) => r.key === "Escape" && n();
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n]), /* @__PURE__ */ t("div", { className: "jt-scrim", onClick: n, children: /* @__PURE__ */ a("div", { className: "jt-sheet", role: "dialog", "aria-label": e, onClick: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ a("div", { className: "jt-sheet-head", children: [
      /* @__PURE__ */ t("h3", { children: e }),
      /* @__PURE__ */ t("button", { className: "jt-icon", onClick: n, "aria-label": "닫기", children: /* @__PURE__ */ t(_e, { size: 20 }) })
    ] }),
    o
  ] }) });
}
function St({ onConfirm: e, label: n = "삭제" }) {
  let [o, i] = w(!1);
  return O(() => {
    if (!o) return;
    let r = setTimeout(() => i(!1), 3e3);
    return () => clearTimeout(r);
  }, [o]), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-del" + (o ? " armed" : ""),
      onClick: (r) => {
        r.stopPropagation(), o ? e() : i(!0);
      },
      children: [
        /* @__PURE__ */ t(Da, { size: 15 }),
        o ? "한 번 더 누르면 삭제돼요" : n
      ]
    }
  );
}
var An = [
  ["👍", "좋아요"],
  ["❤️", "사랑해요"],
  ["😆", "웃겨요"],
  ["😢", "슬퍼요"],
  ["😮", "놀라워요"]
];
function Wn(e) {
  let n = {};
  return Object.entries(e.reactions || {}).forEach(([o, i]) => n[o] = [...i]), n;
}
function vo(e, n, o) {
  let i = Wn(e), r = (i[n] || []).includes(o), y = {};
  return Object.entries(i).forEach(([x, g]) => {
    let m = g.filter((h) => h !== o);
    m.length && (y[x] = m);
  }), r || (y[n] = [...y[n] || [], o]), { ...e, reactions: y };
}
function Ke({ className: e, onTap: n, names: o = [], title: i, members: r = [], children: y, ...x }) {
  let [g, m] = w(!1), [h, c] = w("up left"), E = H(null), b = H(null), C = H(!1);
  O(() => {
    if (!g) return;
    let k = (z) => E.current && !E.current.contains(z.target) && m(!1);
    return document.addEventListener("pointerdown", k), () => document.removeEventListener("pointerdown", k);
  }, [g]), O(() => () => clearTimeout(b.current), []);
  let N = () => {
    if (E.current) {
      let k = E.current.getBoundingClientRect();
      c((k.top < 200 ? "down" : "up") + " " + (k.left > window.innerWidth - 210 ? "right" : "left"));
    }
    m(!0), navigator.vibrate && navigator.vibrate(15);
  }, s = () => {
    C.current = !1, clearTimeout(b.current), b.current = setTimeout(() => {
      C.current = !0, N();
    }, 450);
  }, p = () => clearTimeout(b.current);
  return /* @__PURE__ */ a("span", { className: "jt-hold", ref: E, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: e + " jt-holdbtn",
        ...x,
        title: o.length ? o.join(", ") : void 0,
        onPointerDown: s,
        onPointerUp: p,
        onPointerLeave: p,
        onPointerCancel: p,
        onContextMenu: (k) => {
          k.preventDefault(), p(), C.current = !0, N();
        },
        onClick: (k) => {
          if (k.stopPropagation(), C.current) {
            C.current = !1;
            return;
          }
          n(k);
        },
        children: y
      }
    ),
    g && /* @__PURE__ */ a("div", { className: "jt-whopop " + h, role: "dialog", "aria-label": i, children: [
      /* @__PURE__ */ a("strong", { children: [
        i,
        " ",
        o.length,
        "명"
      ] }),
      o.length ? /* @__PURE__ */ t("ul", { children: o.map((k) => /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t(rt, { name: k, members: r.length ? r : o, size: 22 }),
        k
      ] }, k)) }) : /* @__PURE__ */ t("p", { children: "아직 아무도 없어요." })
    ] })
  ] });
}
function Ue({ item: e, me: n, onReact: o, members: i = [] }) {
  let [r, y] = w(!1), [x, g] = w("up right"), m = H(null), h = Wn(e), c = () => {
    if (!r && m.current) {
      let N = m.current.getBoundingClientRect(), p = m.current.querySelector(".jt-rchip.add").getBoundingClientRect().right - 240 < 8 ? "left" : "right", k = N.top < 190 ? "down" : "up";
      g(k + " " + p);
    }
    y(!r);
  }, E = An.filter(([N]) => (h[N] || []).length), b = Object.keys(h).find((N) => h[N].includes(n));
  O(() => {
    if (!r) return;
    let N = (s) => m.current && !m.current.contains(s.target) && y(!1);
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [r]);
  let C = (N) => {
    o(N), y(!1);
  };
  return /* @__PURE__ */ a(
    "div",
    {
      className: "jt-react",
      ref: m,
      onClick: (N) => N.stopPropagation(),
      onKeyDown: (N) => N.stopPropagation(),
      children: [
        E.map(([N, s]) => /* @__PURE__ */ a(
          Ke,
          {
            className: "jt-rchip" + (b === N ? " on" : ""),
            onTap: () => C(N),
            names: h[N],
            members: i,
            title: `${N} ${s}`,
            "aria-pressed": b === N,
            "aria-label": `${s} ${h[N].length}명, 길게 누르면 누른 사람 보기`,
            children: [
              /* @__PURE__ */ t("span", { className: "jt-emoji", children: N }),
              h[N].length
            ]
          },
          N
        )),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "jt-rchip add" + (r ? " open" : ""),
            onClick: c,
            "aria-expanded": r,
            "aria-label": "이모티콘 남기기",
            children: /* @__PURE__ */ t(lo, { size: 16 })
          }
        ),
        r && /* @__PURE__ */ a("div", { className: "jt-rpop " + x, role: "dialog", "aria-label": "이모티콘 고르기", children: [
          /* @__PURE__ */ t("div", { className: "jt-rpop-row", children: An.map(([N, s]) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "jt-rpick" + (b === N ? " on" : ""),
              onClick: () => C(N),
              "aria-label": s,
              title: s,
              children: N
            },
            N
          )) }),
          E.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-rwho", children: E.map(([N]) => /* @__PURE__ */ a("li", { children: [
            /* @__PURE__ */ t("span", { className: "jt-emoji", children: N }),
            h[N].join(", ")
          ] }, N)) })
        ] })
      ]
    }
  );
}
function ee(e, n) {
  let o = (n || []).find((i) => i.wishId === e.id) || (n || []).find((i) => !i.wishId && i.title === e.name);
  return o ? o.day : null;
}
function Hn() {
  let [e, n] = w({});
  return [e, (r) => n((y) => ({ ...y, [r]: !y[r] })), (r, y) => n(y ? Object.fromEntries(r.map((x) => [x, !0])) : {})];
}
function Yn({ ids: e, open: n, setAll: o }) {
  if (e.length < 2) return null;
  let i = e.every((r) => n[r]);
  return /* @__PURE__ */ t("div", { className: "jt-foldall", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-ghost sm", onClick: () => o(e, !i), children: [
    i ? /* @__PURE__ */ t(Ln, { size: 15 }) : /* @__PURE__ */ t(Lt, { size: 15 }),
    i ? "모두 접기" : "모두 펼치기"
  ] }) });
}
function Jn({ count: e, open: n, onClick: o }) {
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
        /* @__PURE__ */ t(_a, { size: 15 }),
        "댓글 ",
        e || 0
      ]
    }
  );
}
function We({ comments: e = [], me: n, members: o, onAdd: i, onDelete: r }) {
  let [y, x] = w(""), g = () => {
    let m = y.trim();
    m && (i(m), x(""));
  };
  return /* @__PURE__ */ a("div", { className: "jt-comments", onClick: (m) => m.stopPropagation(), onKeyDown: (m) => m.stopPropagation(), children: [
    e.length === 0 && /* @__PURE__ */ t("p", { className: "jt-hint jt-nocomment", children: "첫 댓글을 남겨 보세요." }),
    /* @__PURE__ */ t("ul", { children: e.map((m) => /* @__PURE__ */ a("li", { className: "jt-comment", children: [
      /* @__PURE__ */ t(rt, { name: m.by, members: o, size: 24 }),
      /* @__PURE__ */ a("div", { className: "jt-comment-body", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("strong", { children: m.by }),
          /* @__PURE__ */ t("span", { children: Pe(m.createdAt) })
        ] }),
        /* @__PURE__ */ t("p", { children: m.text })
      ] }),
      m.by === n && /* @__PURE__ */ t(St, { onConfirm: () => r(m.id), label: "" })
    ] }, m.id)) }),
    /* @__PURE__ */ a("div", { className: "jt-inline jt-comment-input", children: [
      /* @__PURE__ */ t(
        "input",
        {
          value: y,
          onChange: (m) => x(m.target.value),
          onKeyDown: (m) => m.key === "Enter" && !m.nativeEvent.isComposing && g(),
          placeholder: "댓글 달기",
          "aria-label": "댓글 내용"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-send", onClick: g, disabled: !y.trim(), "aria-label": "댓글 보내기", children: /* @__PURE__ */ t(Bn, { size: 18 }) })
    ] })
  ] });
}
function yo({ initial: e, onSave: n, onCancel: o }) {
  let [i, r] = w(e?.title || "가족 일본여행"), [y, x] = w(e?.start || ct(new Date(Date.now() + 30 * 864e5))), [g, m] = w(e?.days || 4), [h, c] = w(e?.members || []), [E, b] = w(e?.rate || 900), [C, N] = w(e?.gmapsKey || ""), [s, p] = w("locked"), k = H(null), z = (M) => M ? M.length > 10 ? M.slice(0, 4) + "••••••••" + M.slice(-4) : "••••••••" : "설정 안 됨 (기본 지도 사용 중)", [A, v] = w(""), I = () => {
    let M = A.trim();
    !M || h.includes(M) || (c([...h, M]), v(""));
  }, j = i.trim() && y && h.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    o && /* @__PURE__ */ t(Xn, { onBack: o }),
    /* @__PURE__ */ t("h1", { children: e ? "여행 설정" : "우리 가족 여행 만들기" }),
    /* @__PURE__ */ a("div", { className: "jt-form", children: [
      /* @__PURE__ */ t(at, { label: "여행 이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (M) => r(M.target.value) }) }),
      /* @__PURE__ */ t(at, { label: "출발일", children: /* @__PURE__ */ t("input", { type: "date", value: y, onChange: (M) => x(M.target.value) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "여행 일수" }),
        /* @__PURE__ */ a("div", { className: "jt-stepper", children: [
          /* @__PURE__ */ t("button", { type: "button", onClick: () => m(Math.max(1, g - 1)), "aria-label": "하루 줄이기", children: "−" }),
          /* @__PURE__ */ a("strong", { children: [
            g,
            "일"
          ] }),
          /* @__PURE__ */ t("button", { type: "button", onClick: () => m(Math.min(30, g + 1)), "aria-label": "하루 늘리기", children: "+" })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "함께 가는 가족" }),
        /* @__PURE__ */ t("div", { className: "jt-chips", children: h.map((M) => /* @__PURE__ */ a("span", { className: "jt-chip on", children: [
          /* @__PURE__ */ t(rt, { name: M, members: h, size: 20 }),
          M,
          /* @__PURE__ */ t("button", { type: "button", onClick: () => c(h.filter((l) => l !== M)), "aria-label": `${M} 빼기`, children: /* @__PURE__ */ t(_e, { size: 14 }) })
        ] }, M)) }),
        /* @__PURE__ */ a("div", { className: "jt-inline", children: [
          /* @__PURE__ */ t(
            "input",
            {
              value: A,
              onChange: (M) => v(M.target.value),
              onKeyDown: (M) => M.key === "Enter" && I(),
              placeholder: "이름이나 호칭 (예: 엄마)"
            }
          ),
          /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: I, children: "추가" })
        ] })
      ] }),
      /* @__PURE__ */ t(at, { label: "예비 환율 (100엔당 원, 공식 환율을 못 불러올 때만 써요)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: E, onChange: (M) => b(Number(M.target.value) || 0) }) }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "구글 지도 API 키 (선택)" }),
        s === "edit" ? /* @__PURE__ */ t(
          "input",
          {
            ref: k,
            value: C,
            onChange: (M) => N(M.target.value.trim()),
            placeholder: "AIza로 시작하는 키",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": "구글 지도 API 키"
          }
        ) : /* @__PURE__ */ a("div", { className: "jt-keylock", children: [
          /* @__PURE__ */ t(Ya, { size: 15, "aria-hidden": "true" }),
          /* @__PURE__ */ t("span", { className: "jt-keylock-val", children: z(C) }),
          s === "locked" && /* @__PURE__ */ t(ko, { onDone: () => p("warn"), className: "sm", children: "길게 눌러 변경" })
        ] }),
        s === "warn" && /* @__PURE__ */ a("div", { className: "jt-keywarn", role: "alert", children: [
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
            /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => p("locked"), children: "취소" }),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: "jt-secondary sm",
                onClick: () => {
                  p("edit"), setTimeout(() => k.current && k.current.focus(), 50);
                },
                children: "확인했어요, 변경할게요"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "jt-hint", children: s === "edit" ? "고친 뒤 아래 '설정 저장'을 눌러야 적용돼요." : "실수로 바뀌지 않도록 잠겨 있어요. 한 명만 넣으면 가족 모두에게 적용돼요." }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "jt-primary",
          disabled: !j,
          onClick: () => n({ title: i.trim(), start: y, days: g, members: h, rate: E || 900, gmapsKey: C }),
          children: e ? "설정 저장" : "여행 시작하기"
        }
      ),
      o && /* @__PURE__ */ t("button", { className: "jt-ghost", onClick: o, children: "취소" }),
      /* @__PURE__ */ t("p", { className: "jt-note", children: "이 앱의 내용은 초대 링크를 가진 가족 모두에게 보이고, 누구나 수정할 수 있어요." }),
      /* @__PURE__ */ t(wo, {})
    ] })
  ] });
}
function wo() {
  let [e, n] = w(""), o = xn();
  return /* @__PURE__ */ a("div", { className: "jt-invite", children: [
    /* @__PURE__ */ t("strong", { children: "가족 초대" }),
    /* @__PURE__ */ t("p", { children: "이 링크를 받은 가족은 같은 여행으로 바로 들어와요. 링크를 연 다음 '홈 화면에 추가'를 하면 앱처럼 쓸 수 있어요." }),
    /* @__PURE__ */ t("button", { type: "button", className: "jt-primary", onClick: async () => {
      if (navigator.share)
        try {
          await navigator.share({ title: "가족 여행 앱", text: "우리 가족 여행 앱이에요. 눌러서 들어와 주세요.", url: o });
          return;
        } catch (r) {
          if (r && r.name === "AbortError") return;
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
          window.confirm("이 기기에서만 여행 연결을 끊을까요? 가족 데이터는 지워지지 않아요.") && hn();
        },
        children: "이 기기에서 연결 끊기"
      }
    )
  ] });
}
function Xn({ onBack: e, label: n = "돌아가기" }) {
  return /* @__PURE__ */ t("div", { className: "jt-backbar", children: /* @__PURE__ */ a("button", { type: "button", className: "jt-back", onClick: e, "aria-label": n, children: [
    /* @__PURE__ */ t(Ba, { size: 22 }),
    n
  ] }) });
}
function ko({ ms: e = 1e3, onDone: n, children: o, className: i = "" }) {
  let [r, y] = w(!1), x = H(null), g = (h) => {
    h.preventDefault(), y(!0), clearTimeout(x.current), x.current = setTimeout(() => {
      y(!1), navigator.vibrate && navigator.vibrate(20), n();
    }, e);
  }, m = () => {
    clearTimeout(x.current), y(!1);
  };
  return O(() => () => clearTimeout(x.current), []), /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "jt-presshold " + i + (r ? " pressing" : ""),
      style: { "--hold": e + "ms" },
      onPointerDown: g,
      onPointerUp: m,
      onPointerLeave: m,
      onPointerCancel: m,
      onContextMenu: (h) => h.preventDefault(),
      onKeyDown: (h) => (h.key === "Enter" || h.key === " ") && !h.repeat && g(h),
      onKeyUp: m,
      children: [
        /* @__PURE__ */ t("span", { className: "jt-presshold-fill", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "jt-presshold-label", children: o })
      ]
    }
  );
}
function No({ members: e, onPick: n, current: o, onBack: i }) {
  return /* @__PURE__ */ a("div", { className: "jt-setup", children: [
    i && /* @__PURE__ */ t(Xn, { onBack: i }),
    /* @__PURE__ */ t("h1", { children: i ? "누구로 바꿀까요?" : "누구로 들어올까요?" }),
    /* @__PURE__ */ t("div", { className: "jt-who-list", children: e.map((r) => /* @__PURE__ */ a("button", { className: "jt-who-btn" + (r === o ? " on" : ""), onClick: () => n(r), children: [
      /* @__PURE__ */ t(rt, { name: r, members: e, size: 40 }),
      /* @__PURE__ */ t("span", { className: "jt-who-name", children: r }),
      r === o && /* @__PURE__ */ t("em", { className: "jt-who-now", children: "지금 사용 중" })
    ] }, r)) })
  ] });
}
function Co({ initial: e, preset: n, gkey: o, dayItems: i = [], onSave: r, onDelete: y }) {
  let [x, g] = w(e?.time || n?.time || ""), [m, h] = w(e?.end || n?.end || ""), [c, E] = w(e?.link || ""), [b, C] = w(e && dt(e) ? { lat: e.lat, lng: e.lng, placeId: e.placeId } : null), [N, s] = w([]), [p, k] = w(!1), [z, A] = w(""), [v, I] = w(e?.title || ""), [j, M] = w(e?.place || ""), [l, R] = w(e?.memo || ""), [u, f] = w(!1), T = (_) => {
    if (I(_), !x || u) {
      let S = uo(_);
      S ? (g(S), f(!0)) : u && (g(""), f(!1));
    }
  }, D = async () => {
    let _ = (j || v).trim();
    if (!_) {
      A("장소 이름을 먼저 적어 주세요.");
      return;
    }
    k(!0), A(""), s([]);
    try {
      let S = await Qn(_, o);
      s(S), S.length || A("검색 결과가 없어요. 다른 이름이나 영어, 일본어로 검색해 보세요.");
    } catch {
      A("검색을 불러오지 못했어요. 장소 이름만 적어도 구글맵에서 찾을 수 있어요.");
    }
    k(!1);
  }, X = x && m && zt(m) <= zt(x), Y = x ? i.filter((_) => {
    if (!_.time) return !1;
    let S = oe({ time: x, end: X ? "" : m }), W = oe(_);
    return S.s < W.e && W.s < S.e;
  }) : [];
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "무엇을 하나요", children: /* @__PURE__ */ t("input", { value: v, onChange: (_) => T(_.target.value), placeholder: "예: 10:00 센소지 구경" }) }),
    u && x && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      "제목에서 ",
      x,
      "을 찾아 시작 시간에 넣었어요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-two", children: [
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "시작 (선택)" }),
        /* @__PURE__ */ t(
          Cn,
          {
            label: "시작",
            value: x,
            onChange: (_) => {
              g(_), f(!1), _ || h("");
            }
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "jt-field", children: [
        /* @__PURE__ */ t("span", { children: "끝 (선택)" }),
        /* @__PURE__ */ t(Cn, { label: "끝", value: m, onChange: h, disabled: !x })
      ] })
    ] }),
    x && !m && /* @__PURE__ */ t("p", { className: "jt-hint", children: "끝 시간이 없으면 시간표에 1시간으로 표시돼요." }),
    X && /* @__PURE__ */ t("p", { className: "jt-warn-inline", children: "끝 시간이 시작보다 빨라요. 끝 시간을 다시 골라 주세요." }),
    x && m && !X && /* @__PURE__ */ a("p", { className: "jt-hint", children: [
      Kn(zt(m) - zt(x)),
      " 동안"
    ] }),
    Y.length > 0 && /* @__PURE__ */ a("p", { className: "jt-warn-inline", children: [
      "같은 시간에 ",
      Y.map((_) => `'${_.title}'(${_.time}${_.end ? `~${_.end}` : ""})`).join(", "),
      " 일정이 있어요. 그대로 저장해도 돼요."
    ] }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "장소 (선택)" }),
      /* @__PURE__ */ a("div", { className: "jt-inline", children: [
        /* @__PURE__ */ t(
          "input",
          {
            value: j,
            onChange: (_) => M(_.target.value),
            onKeyDown: (_) => _.key === "Enter" && !_.nativeEvent.isComposing && D(),
            placeholder: "예: 오사카성, 이치란 도톤보리",
            "aria-label": "장소"
          }
        ),
        /* @__PURE__ */ t("button", { type: "button", className: "jt-secondary", onClick: D, disabled: p, children: p ? "찾는 중" : "검색" })
      ] })
    ] }),
    z && /* @__PURE__ */ t("p", { className: "jt-hint", children: z }),
    N.length > 0 && /* @__PURE__ */ t("ul", { className: "jt-results jt-form-results", children: N.map((_, S) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          M(_.name), C({ lat: _.lat, lng: _.lng, placeId: _.placeId }), _.link && E(_.link), s([]), A("");
        },
        children: [
          /* @__PURE__ */ t("strong", { children: _.name }),
          /* @__PURE__ */ t("span", { children: _.area })
        ]
      }
    ) }, S)) }),
    b && /* @__PURE__ */ a("div", { className: "jt-picked", children: [
      /* @__PURE__ */ t(Et, { size: 14 }),
      /* @__PURE__ */ t("span", { children: "지도 위치가 연결됐어요" }),
      /* @__PURE__ */ a("a", { className: "jt-maplink", href: At({ title: v, place: j, link: c, ...b }), target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ t(Kt, { size: 13 }),
        "구글맵에서 확인"
      ] }),
      /* @__PURE__ */ t("button", { type: "button", className: "jt-ghost sm", onClick: () => C(null), children: "연결 해제" })
    ] }),
    /* @__PURE__ */ t(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t("input", { type: "url", value: c, onChange: (_) => E(_.target.value), placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기" }) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 검색으로 고른 위치나 이름과 장소로 구글맵에서 찾아 줘요." }),
    /* @__PURE__ */ t(at, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: l, onChange: (_) => R(_.target.value), placeholder: "예약 번호, 집합 장소 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !v.trim() || X,
        onClick: () => r({
          time: x,
          end: x ? m : "",
          title: v.trim(),
          place: j.trim(),
          memo: l.trim(),
          link: c.trim(),
          lat: b ? b.lat : void 0,
          lng: b ? b.lng : void 0,
          placeId: b && b.placeId ? b.placeId : void 0
        }),
        children: e ? "수정 저장" : "일정 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: y, label: "이 일정 삭제" })
  ] });
}
function zo({ initial: e, onSave: n, onDelete: o }) {
  let [i, r] = w(e?.name || ""), [y, x] = w(e?.cat || "맛집"), [g, m] = w(e?.area || ""), [h, c] = w(e?.link || ""), [E, b] = w(e?.memo || "");
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "이름", children: /* @__PURE__ */ t("input", { value: i, onChange: (C) => r(C.target.value), placeholder: "예: 이치란 라멘" }) }),
    /* @__PURE__ */ a("div", { className: "jt-field", children: [
      /* @__PURE__ */ t("span", { children: "종류" }),
      /* @__PURE__ */ t("div", { className: "jt-chips", children: Le.map((C) => /* @__PURE__ */ t("button", { type: "button", className: "jt-chip" + (y === C ? " on" : ""), onClick: () => x(C), children: C }, C)) })
    ] }),
    /* @__PURE__ */ t(at, { label: "동네 (선택)", children: /* @__PURE__ */ t("input", { value: g, onChange: (C) => m(C.target.value), placeholder: "예: 시부야" }) }),
    /* @__PURE__ */ t(at, { label: "구글맵 링크 (선택)", children: /* @__PURE__ */ t(
      "input",
      {
        type: "url",
        value: h,
        onChange: (C) => c(C.target.value),
        placeholder: "구글맵 앱에서 공유한 링크를 붙여넣기"
      }
    ) }),
    /* @__PURE__ */ t("p", { className: "jt-hint", children: "링크가 없어도 이름과 동네로 구글맵에서 검색해 줘요." }),
    /* @__PURE__ */ t(at, { label: "메모 (선택)", children: /* @__PURE__ */ t("textarea", { rows: 2, value: E, onChange: (C) => b(C.target.value), placeholder: "왜 가고 싶은지, 영업시간 등" }) }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "jt-primary",
        disabled: !i.trim(),
        onClick: () => n({ name: i.trim(), cat: y, area: g.trim(), link: h.trim(), memo: E.trim() }),
        children: e ? "수정 저장" : "위시리스트에 추가"
      }
    ),
    e && /* @__PURE__ */ t(St, { onConfirm: o, label: "이 장소 삭제" })
  ] });
}
function Eo({ settings: e, me: n, defaultDay: o, initial: i, onSave: r, onDelete: y }) {
  let { members: x, days: g, start: m, rate: h } = e, [c, E] = w(i?.title || ""), [b, C] = w(i ? String(Number(i.amount) || "") : ""), [N, s] = w(i && x.includes(i.payer) ? i.payer : n), [p, k] = w(i?.cat || "식비"), [z, A] = w(i ? Math.min(i.day, g - 1) : o), [v, I] = w(i ? (i.split || []).filter((u) => x.includes(u)) : x), j = Number(b) || 0, M = i ? [i.payer, ...i.split || []].filter((u, f, T) => u && !x.includes(u) && T.indexOf(u) === f) : [], l = (u) => I(v.includes(u) ? v.filter((f) => f !== u) : [...v, u]), R = c.trim() && j > 0 && v.length > 0;
  return /* @__PURE__ */ a("div", { className: "jt-form", children: [
    /* @__PURE__ */ t(at, { label: "어디에 썼나요", children: /* @__PURE__ */ t("input", { value: c, onChange: (u) => E(u.target.value), placeholder: "예: 점심 라멘" }) }),
    /* @__PURE__ */ t(at, { label: "금액 (엔)", children: /* @__PURE__ */ t("input", { type: "number", inputMode: "numeric", value: b, onChange: (u) => C(u.target.value), placeholder: "0" }) }),
    j > 0 ? /* @__PURE__ */ a("p", { className: "jt-hint jt-fxhint", children: [
