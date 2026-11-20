/**
 * Portfolio — Salman Fauzan Fahri Aulia
 *
 * This file holds the content (DATA), the project modal and the four project
 * demos. The page itself (nav, hero, sections, footer) is src/Shell.jsx, built
 * on the design kit in public/assets.
 *
 * Stack: React 18 + lucide-react icons. Tailwind styles the demos only
 * (scoped to .tw-scope, see src/index.css and tailwind.config.js).
 * All state in React (no localStorage / sessionStorage).
 * All demos use mock data + setTimeout-driven state. No network calls.
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal, flushSync } from "react-dom";
import Shell from "./Shell.jsx";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Receipt,
  Check,
  AlertTriangle,
  Loader2,
  Play,
  RotateCcw,
  ScanLine,
  FileText,
  ShieldCheck,
  ClipboardCheck,
  Star,
  Camera,
  AlertCircle,
  Box,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────────────────── */

const IDENTITY = {
  name: "Salman Fauzan Fahri Aulia",
  shortName: "Salman Fauzan",
  headline: "Salman Fauzan, AI engineer in Bandung",
  title: "AI & Full-Stack Engineer",
  location: "Bandung, Indonesia",
  email: "salman.fazzz@gmail.com",
  github: "github.com/salmanfazz",
  githubUrl: "https://github.com/salmanfazz",
  linkedin: "linkedin.com/in/salmanfazz",
  linkedinUrl: "https://www.linkedin.com/in/salmanfazz",
  // WhatsApp: the number as the footer prints it, and the chat link (wa.me plus the same digits,
  // country code first, no plus sign). Change both together.
  whatsapp: "+62 896-4979-9600",
  whatsappUrl: "https://wa.me/6289649799600",
};

// The twenty-four tools shown with their real marks, eight to a row (files in public/assets/icons;
// w and h are each file's own proportions, so the browser reserves its box before it loads).
// Row one is AI and backend, row two web and mobile, row three testing and operations.
const STACK_TOOLS = [
  { name: "Python", icon: "python", w: 40, h: 40, area: "AI and vision" },
  { name: "OpenCV", icon: "opencv", w: 32, h: 40, shape: "ic-tall", area: "Computer vision" },
  { name: "YOLOv10m", icon: "ultralytics", w: 40, h: 35, area: "Object detection" },
  { name: "FastAPI", icon: "fastapi", w: 40, h: 40, area: "Backend" },
  { name: "Pydantic", icon: "pydantic-icon", w: 40, h: 35, area: "Data validation" },
  { name: "LangGraph", icon: "langgraph", w: 40, h: 20, shape: "ic-land", area: "Agents" },
  { name: "PostgreSQL", icon: "postgresql", w: 39, h: 40, area: "Database" },
  { name: "WhatsApp", icon: "whatsapp", w: 40, h: 40, area: "Cloud API" },
  { name: "React", icon: "react", w: 40, h: 36, area: "Frontend" },
  { name: "Next.js", icon: "nextjs", w: 40, h: 40, area: "Frontend" },
  { name: "TypeScript", icon: "typescript", w: 40, h: 40, area: "Backend" },
  { name: "NestJS", icon: "nestjs", w: 40, h: 40, area: "Backend" },
  { name: "Supabase", icon: "supabase", w: 39, h: 40, area: "Backend" },
  { name: "Tailwind CSS", icon: "tailwindcss", w: 40, h: 24, shape: "ic-land", area: "Frontend" },
  { name: "shadcn/ui", icon: "shadcnui", w: 40, h: 40, shape: "ic-ink", area: "Frontend" },
  { name: "Flutter", icon: "flutter", w: 33, h: 40, shape: "ic-tall", area: "Mobile" },
  { name: "Dart", icon: "dart", w: 40, h: 40, area: "Mobile" },
  { name: "Android", icon: "android", w: 40, h: 23, shape: "ic-land", area: "Mobile" },
  { name: "Vitest", icon: "vitest", w: 40, h: 37, area: "Unit tests" },
  { name: "Playwright", icon: "playwright", w: 40, h: 30, shape: "ic-land", area: "E2E tests" },
  { name: "SonarQube", icon: "sonarqubeserver", w: 40, h: 40, area: "Code quality" },
  { name: "Git", icon: "git", w: 40, h: 40, area: "DevOps" },
  { name: "Docker", icon: "docker", w: 40, h: 29, shape: "ic-land", area: "DevOps" },
  { name: "Cloudflare", icon: "cloudflare", w: 40, h: 18, shape: "ic-land", area: "Tunnel" },
];

// Tools, skills and methods that have no real logo to show: the "Also in the stack" line. Every
// technology a project or the work history names is either a logo above or a word here.
const STACK_WORDS = [
  "OCR",
  "RapidOCR",
  "TrOCR",
  "YOLO OBB",
  "RAG",
  "LiteLLM",
  "OpenRouter",
  "FastEmbed",
  "Tool calling",
  "Agentic AI",
  "pgvector",
  "MinIO",
  "React Native",
  "REST API",
  "Linux",
  "Dataset preparation",
  "Unit testing",
  "Agile/Scrum",
];

// How a customer question becomes an answer: the customer-inquiry journey of the AI Worker
// illustrations (public/portfolio-illustrations/application-flow.html), shown in the statement section.
const AI_WORKER_STEPS = [
  { id: "ask", label: "Customer asks", note: "A customer reaches the agency on WhatsApp." },
  { id: "find", label: "Find business knowledge", note: "Taught knowledge is searched by meaning and by keyword." },
  { id: "draft", label: "Draft and check", note: "A draft is checked against the retrieved sources." },
  { id: "permit", label: "Check permission to act", note: "Trust rules choose an automatic reply, staff approval or a human handoff." },
  { id: "reply", label: "Customer receives a reply", note: "The cleared response is delivered through WhatsApp." },
];

const EDUCATION = {
  degree: "Bachelor of Engineering (S1), Informatics Engineering",
  school: "UIN Sunan Gunung Djati Bandung",
  period: "2020 — 2024",
  gpa: "GPA 3.6 / 4.0",
  certifications: [
    "Microsoft Certified Educator — Training (2022)",
    "Oracle Academy — Java Programming (2019)",
  ],
  publication: {
    venue: "Publication · SISFOKOM Journal (SINTA 3)",
    title: "Game and Application Purchasing Patterns on Steam using the K-Means Algorithm",
    url: "https://doi.org/10.32736/sisfokom.v13i3.2214",
  },
};

const EXPERIENCE = [
  {
    company: "PT. Neuronworks Indonesia",
    role: "Junior Programmer",
    period: "Jan 2025 — Aug 2026",
    summary:
      "Cross-functional role spanning mobile, full-stack, and AI / computer-vision development.",
    bullets: [
      "Maintained a production React Native app at 80% test coverage under a zero-bug policy, clearing SonarQube issues.",
      "Increased test coverage to 80% across a React + NestJS monolith (frontend and backend).",
      "Led a large-scale Flutter 2.8 → 3.7 migration across the application's codebase and dependencies.",
      "Trained a YOLOv10m object detector on a large custom image dataset, achieving high detection accuracy.",
      "Built a FastAPI inference service feeding a web client that verifies detections against transaction data and auto-fills forms.",
      "Added OCR + TrOCR text extraction (printed and handwritten); further detection capabilities in active development.",
      "Containerised with Docker; deployed on a Linux server.",
    ],
  },
  {
    company: "PT. Corbec Communication",
    role: "Frontend Web Developer (Internship)",
    period: "Sep — Nov 2023",
    bullets: [
      "Rebuilt and improved the UI/UX of the company website for its 5G Fixed Wireless Access products.",
    ],
  },
  {
    company: "PT. Samudera Aplikasi Indonesia",
    role: "Mobile Developer (Internship)",
    period: "Oct — Dec 2019",
    bullets: [
      "Built an Android school-management app (Java) for an educational institution covering schedules, teacher contact, and reminders.",
    ],
  },
];

const PROJECTS = [
  {
    id: "ai-worker",
    name: "AI Worker",
    kind: "Agentic AI · Case Study",
    summary:
      "An AI employee that answers WhatsApp customers for Umrah and Haji travel agencies. It turns an agency's own knowledge into supervised replies and bookings.",
    topTags: ["FastAPI", "RAG", "Agentic"],
    stack: [
      "Python",
      "FastAPI",
      "LiteLLM / OpenRouter",
      "Hybrid RAG",
      "PostgreSQL / pgvector",
      "Next.js",
    ],
    wip: true,
    ndaNote:
      "Local prototype, November 2026 — illustrated walkthrough, not a live system.",
  },
  {
    id: "ai-detection",
    name: "AI Detection System",
    kind: "Computer Vision Pipeline",
    summary: "Photo verification for field work. Two detector services find the equipment in a photo, read its identifier and check it against the work order. The AI suggests each answer and a reviewer decides.",
    topTags: ["YOLOv10m", "FastAPI", "TrOCR"],
    stack: [
      "Python",
      "YOLOv10m",
      "YOLO OBB",
      "FastAPI",
      "OpenCV",
      "RapidOCR",
      "TrOCR",
      "Docker",
      "Cloudflare Tunnel",
    ],
    ndaNote: "Work under NDA — the walkthrough uses fictional data; the scores are from recorded validation runs.",
  },
  {
    id: "pos-bakso",
    name: "POS Bakso",
    kind: "Point-of-Sale Web App",
    summary: "Point-of-sale system — QR table ordering with an admin dashboard for order fulfilment and payment.",
    topTags: ["React", "NestJS", "Supabase"],
    stack: [
      "React",
      "NestJS",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "shadcn/ui",
      "Vitest",
      "Playwright",
    ],
  },
  {
    id: "affiliate-reco",
    name: "Affiliate Product Recommendation",
    kind: "Admin & User platform",
    summary: "A two-sided app with an admin panel for managing products and a user-facing app that recommends affiliate products.",
    topTags: ["React", "NestJS", "Supabase"],
    stack: [
      "React",
      "NestJS",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "shadcn/ui",
      "Vitest",
      "Playwright",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   PRIMITIVES
   ────────────────────────────────────────────────────────────────────────── */

const accent = "#2563EB"; // blue-600 — text, borders, decorative (WCAG AA 4.98:1 on stone-50)
const accentBg = "#1D4ED8"; // blue-700 — button bg with white text (WCAG 5.74:1)
const accentSoft = "#DBEAFE"; // light blue tint


const Chip = ({ children, tone = "default" }) => {
  const tones = {
    default: "border-stone-300 text-stone-700 bg-white",
    accent: "border-transparent text-white",
    soft: "border-transparent text-stone-800",
  };
  const style =
    tone === "accent"
      ? { backgroundColor: accent }
      : tone === "soft"
      ? { backgroundColor: accentSoft }
      : undefined;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-2 text-xs font-mono rounded-full border cursor-default transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus-visible:-translate-y-0.5 focus-visible:bg-blue-50 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 ${tones[tone]}`}
      style={style}
    >
      {children}
    </span>
  );
};


/* ──────────────────────────────────────────────────────────────────────────
   MODAL
   ────────────────────────────────────────────────────────────────────────── */

function Modal({ open, onClose, project, morph, children }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Esc key + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // Keys pressed inside an embedded illustration never reach this document: the frame posts its
    // Escape here once nothing is playing in it (portfolio-illustrations README).
    const onMessage = (e) => {
      if (e.origin !== window.location.origin || !e.data) return;
      if (e.data.source === "ai-worker-illustration" && e.data.action === "escape") onClose();
    };
    window.addEventListener("message", onMessage);
    // The page behind takes no focus while the dialog is open, so Tab leaving a frame stays here.
    const behind = [...document.querySelectorAll("header.nav, main, footer.closing")];
    behind.forEach((el) => { el.inert = true; });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // focus close btn after small delay
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      behind.forEach((el) => { el.inert = false; });
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 ${morph ? "" : "animate-fade-in"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        aria-hidden
      />
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className={`modal-dialog ${morph ? "" : "modal-enter"} relative bg-stone-50 w-full sm:max-w-4xl sm:rounded-3xl rounded-t-3xl border border-stone-200 shadow-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto overscroll-contain`}
      >
        {/* One scroll for the whole dialog (header and body together), on a phone and a desktop alike.
            The close button stays in the corner while it scrolls. */}
        <div className="sticky top-0 z-10 h-0">
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-6 top-6 sm:right-8 sm:top-8 w-10 h-10 rounded-full bg-stone-100 border border-stone-200 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-stone-700 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X size={18} />
          </button>
        </div>
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-stone-200 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-2">
                {project.kind}
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl text-stone-900 tracking-tight font-medium">
                {project.name}
              </h2>
              <p className="mt-3 text-stone-600 leading-relaxed max-w-2xl">
                {project.summary}
              </p>
              {project.ndaNote && (
                <div className="mt-3 inline-flex items-center gap-2 text-xs text-stone-600 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-full">
                  <ShieldCheck size={13} />
                  {project.ndaNote}
                </div>
              )}
            </div>
            <span className="shrink-0 w-10 h-10" aria-hidden />
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   DEMO 1 — POS BAKSO (customer ⇄ admin lifecycle)
   ────────────────────────────────────────────────────────────────────────── */

const MENU_BAKSO = [
  { id: "bakso", name: "Bakso", desc: "Classic meatball soup", price: 15000 },
  { id: "mie-bakso", name: "Mie Bakso", desc: "Noodles with meatballs", price: 18000 },
  { id: "bakso-urat", name: "Bakso Urat", desc: "Tendon meatball", price: 17000 },
  { id: "teh-manis", name: "Teh Manis", desc: "Sweet jasmine tea", price: 5000 },
  { id: "kerupuk", name: "Kerupuk", desc: "Crackers", price: 3000 },
];

const idr = (n) => "Rp " + n.toLocaleString("id-ID");

const CUSTOMER_POOL = [
  "Customer A",
  "Budi (demo)",
  "Siti (demo)",
  "Andi (demo)",
  "Rina (demo)",
];

const STATUS_FLOW = ["menunggu", "dikonfirmasi", "disiapkan", "selesai"];
const STATUS_META = {
  menunggu:     { label: "Menunggu",     english: "Waiting",     tone: "amber" },
  dikonfirmasi: { label: "Dikonfirmasi", english: "Confirmed",   tone: "sky" },
  disiapkan:    { label: "Disiapkan",    english: "Preparing",   tone: "amber" },
  selesai:      { label: "Selesai",      english: "Done",        tone: "green" },
  paid:         { label: "Paid",         english: "Paid",        tone: "emerald" },
};

// Seed a few demo orders already in-flight so the dashboard isn't empty.
const SEED_ORDERS = [
  {
    id: "#A1B2",
    customerName: "Budi (demo)",
    table: "03",
    items: { "mie-bakso": 1, "teh-manis": 1 },
    time: "12:14",
    status: "disiapkan",
  },
  {
    id: "#A1B3",
    customerName: "Siti (demo)",
    table: "05",
    items: { bakso: 2, kerupuk: 2 },
    time: "13:02",
    status: "selesai",
  },
  {
    id: "#A1B4",
    customerName: "Andi (demo)",
    table: "02",
    items: { "bakso-urat": 1, "teh-manis": 1 },
    time: "13:30",
    status: "dikonfirmasi",
  },
  {
    id: "#A1B5",
    customerName: "Rina (demo)",
    table: "07",
    items: { "mie-bakso": 1 },
    time: "13:48",
    status: "menunggu",
  },
];

const orderTotal = (items) =>
  Object.entries(items).reduce((s, [id, qty]) => {
    const m = MENU_BAKSO.find((x) => x.id === id);
    return s + (m ? m.price * qty : 0);
  }, 0);

const orderItemCount = (items) =>
  Object.values(items).reduce((s, q) => s + q, 0);

function nextOrderId(orders) {
  // Generate "#XnNm" style ids deterministically from existing count.
  const n = 6 + (orders.length - SEED_ORDERS.length);
  return "#A1B" + n;
}

function PosDemo() {
  const [view, setView] = useState("customer");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [cart, setCart] = useState({});
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [customerIdx, setCustomerIdx] = useState(0);
  const [now] = useState(() => new Date());

  // Cart ops
  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const sub = (id) =>
    setCart((c) => {
      const next = { ...c };
      const v = (next[id] || 0) - 1;
      if (v <= 0) delete next[id];
      else next[id] = v;
      return next;
    });

  const placeOrder = () => {
    if (Object.keys(cart).length === 0) return;
    const id = nextOrderId(orders);
    const customer = CUSTOMER_POOL[customerIdx % CUSTOMER_POOL.length];
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const newOrder = {
      id,
      customerName: customer,
      table: "01",
      items: { ...cart },
      time: `${hh}:${mm}`,
      status: "menunggu",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setPlacedOrderId(id);
    setCart({});
    setCustomerIdx((i) => i + 1);
  };

  const advanceOrder = (id) =>
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = STATUS_FLOW.indexOf(o.status);
        if (idx < 0 || idx === STATUS_FLOW.length - 1) return o;
        return { ...o, status: STATUS_FLOW[idx + 1] };
      })
    );

  const markPaid = (id) =>
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "paid" } : o))
    );

  const startNewOrder = () => {
    setPlacedOrderId(null);
    setCart({});
  };

  const placedOrder = orders.find((o) => o.id === placedOrderId);

  return (
    <div>
      {/* Top bar with view toggle */}
      <div className="px-5 sm:px-6 pt-5 pb-4 flex items-center justify-between gap-3 flex-wrap border-b border-stone-200 bg-stone-50/60">
        <div className="font-mono text-[11px] uppercase tracking-widest text-stone-500">
          POS Bakso · interactive illustration
        </div>
        <div
          role="tablist"
          className="inline-flex p-1 bg-stone-100 rounded-full border border-stone-200"
        >
          {[
            { v: "customer", label: "Customer" },
            { v: "admin", label: "Admin" },
          ].map((opt) => (
            <button
              key={opt.v}
              role="tab"
              aria-selected={view === opt.v}
              onClick={() => setView(opt.v)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full transition ${
                view === opt.v
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {view === "customer" ? (
        <CustomerView
          cart={cart}
          add={add}
          sub={sub}
          placeOrder={placeOrder}
          placedOrder={placedOrder}
          startNewOrder={startNewOrder}
        />
      ) : (
        <AdminView
          orders={orders}
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          advanceOrder={advanceOrder}
          markPaid={markPaid}
        />
      )}

      {/* Caption */}
      <p className="px-5 sm:px-6 pb-5 pt-3 text-[11px] italic text-stone-500 leading-relaxed">
        Interactive illustration of POS Bakso, my point-of-sale project: customers
        order via table QR, and admins confirm, prepare, complete, and settle
        payment. Built with React, NestJS, TypeScript, Supabase, Tailwind, and
        shadcn/ui; tested with Vitest and Playwright.
      </p>
    </div>
  );
}

/* ──── Customer view ──── */

function CustomerView({ cart, add, sub, placeOrder, placedOrder, startNewOrder }) {
  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const m = MENU_BAKSO.find((x) => x.id === id);
      return m ? { ...m, qty } : null;
    })
    .filter(Boolean);
  const total = orderTotal(cart);

  if (placedOrder) {
    const meta = STATUS_META[placedOrder.status];
    const waiting = placedOrder.status === "menunggu";
    return (
      <div className="p-5 sm:p-7">
        <div className="max-w-md mx-auto bg-white border border-stone-200 rounded-2xl p-6 text-center">
          <div
            className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: waiting ? "#fef3c7" : "#dcfce7" }}
          >
            {waiting ? (
              <Loader2
                size={22}
                className="animate-spin"
                style={{ color: "#b45309" }}
              />
            ) : (
              <Check size={22} style={{ color: "#15803d" }} />
            )}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
            Order {placedOrder.id} · Table {placedOrder.table}
          </div>
          <h3 className="text-xl mt-1 font-medium tracking-tight text-stone-900">
            {waiting ? "Waiting for confirmation" : meta.english}
          </h3>
          <p className="text-stone-600 text-sm mt-2">
            {waiting
              ? "Your order has been sent to the kitchen. Switch to the Admin view to advance it."
              : `Status: ${meta.label} (${meta.english}).`}
          </p>
          <div className="mt-5 text-left bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-1">
            {Object.entries(placedOrder.items).map(([id, qty]) => {
              const m = MENU_BAKSO.find((x) => x.id === id);
              return (
                <div key={id} className="flex justify-between text-sm">
                  <span className="text-stone-700">
                    {qty}× {m?.name}
                  </span>
                  <span className="font-mono text-stone-800">
                    {idr((m?.price || 0) * qty)}
                  </span>
                </div>
              );
            })}
            <div className="border-t border-dashed border-stone-300 pt-2 mt-2 flex justify-between text-sm">
              <span className="text-stone-600">Total</span>
              <span className="font-mono font-semibold text-stone-900">
                {idr(orderTotal(placedOrder.items))}
              </span>
            </div>
          </div>
          <button
            onClick={startNewOrder}
            className="mt-5 w-full py-2.5 rounded-full text-white text-sm font-medium hover:opacity-90 transition" style={{ backgroundColor: accentBg }}
          >
            Start a new order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 min-h-[460px]">
      {/* Menu side */}
      <div className="md:col-span-3 p-5 sm:p-6 border-b md:border-b-0 md:border-r border-stone-200">
        {/* QR intro */}
        <div className="flex items-start gap-3 p-3.5 bg-stone-50 border border-stone-200 rounded-xl mb-5">
          <QrIcon />
          <div className="min-w-0">
            <div className="text-stone-900 text-sm font-medium">
              Scan the QR code at your table to order
            </div>
            <div className="font-mono text-[11px] text-stone-500 mt-0.5">
              Table 01 · session demo-tbl-01
            </div>
          </div>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">
          Menu
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {MENU_BAKSO.map((m) => {
            const qty = cart[m.id] || 0;
            return (
              <button
                key={m.id}
                onClick={() => add(m.id)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-150 bg-white ${
                  qty > 0
                    ? "border-stone-900"
                    : "border-stone-200 hover:border-stone-400"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-stone-900 font-medium">{m.name}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {m.desc}
                    </div>
                  </div>
                  {qty > 0 && (
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded-full text-white shrink-0"
                      style={{ backgroundColor: accentBg }}
                    >
                      ×{qty}
                    </span>
                  )}
                </div>
                <div className="mt-2 font-mono text-sm text-stone-800">
                  {idr(m.price)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cart side */}
      <div className="md:col-span-2 p-5 sm:p-6 bg-stone-50 flex flex-col">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">
          Your order
        </div>
        <div className="flex-1 min-h-[160px]">
          {lines.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center text-stone-400 text-sm border border-dashed border-stone-300 rounded-xl p-6">
              Tap menu items to add to your order.
            </div>
          ) : (
            <ul className="space-y-2">
              {lines.map((l) => (
                <li
                  key={l.id}
                  className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-stone-900 truncate">
                      {l.name}
                    </div>
                    <div className="font-mono text-[11px] text-stone-500">
                      {idr(l.price)} ea
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <QtyBtn onClick={() => sub(l.id)} aria="Decrease">
                      <Minus size={11} />
                    </QtyBtn>
                    <span className="font-mono text-sm w-5 text-center">
                      {l.qty}
                    </span>
                    <QtyBtn onClick={() => add(l.id)} aria="Increase">
                      <Plus size={11} />
                    </QtyBtn>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between text-sm">
          <span className="text-stone-600">Total</span>
          <span className="font-mono text-stone-900 font-semibold">
            {idr(total)}
          </span>
        </div>
        <button
          disabled={lines.length === 0}
          onClick={placeOrder}
          className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-white text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          style={{ backgroundColor: accentBg }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

const QtyBtn = ({ children, onClick, aria }) => (
  <button
    onClick={onClick}
    aria-label={aria}
    className="w-7 h-7 rounded-full border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white text-stone-700 flex items-center justify-center transition"
  >
    {children}
  </button>
);

function QrIcon() {
  // Stylized QR placeholder — pure SVG.
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10 shrink-0"
      aria-hidden
    >
      <rect width="32" height="32" rx="4" fill="#fff" stroke="#d6d3d1" />
      {/* corner markers */}
      {[[3,3],[22,3],[3,22]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x} y={y} width="7" height="7" fill="#1a1a1a" />
          <rect x={x+1.5} y={y+1.5} width="4" height="4" fill="#fff" />
          <rect x={x+2.5} y={y+2.5} width="2" height="2" fill="#1a1a1a" />
        </g>
      ))}
      {/* data dots */}
      {[
        [13,4],[15,4],[17,4],[13,6],[19,6],
        [4,13],[6,13],[8,13],[13,13],[17,13],[20,13],[24,13],[27,13],
        [13,16],[15,16],[19,16],[22,16],[26,16],
        [4,18],[8,18],[13,18],[17,18],[24,18],
        [13,24],[15,24],[17,24],[19,24],[22,24],[27,24],
      ].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="2" height="2" fill="#1a1a1a" />
      ))}
    </svg>
  );
}

/* ──── Admin view ──── */

function AdminView({ orders, adminTab, setAdminTab, advanceOrder, markPaid }) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] min-h-[460px]">
      {/* Sidebar */}
      <aside className="hidden md:block bg-stone-50 border-r border-stone-200 p-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">
          Admin · demo
        </div>
        <nav className="space-y-1">
          <NavItem
            label="Dashboard"
            active={adminTab === "dashboard"}
            onClick={() => setAdminTab("dashboard")}
          />
          <NavItem
            label="Orders / Pesanan"
            active={adminTab === "orders"}
            onClick={() => setAdminTab("orders")}
          />
          <NavItem label="Menu" disabled />
          <NavItem label="Tables / Meja" disabled />
          <NavItem label="Categories / Kategori" disabled />
          <NavItem label="Reports / Laporan" disabled />
        </nav>
        <div className="mt-6 pt-4 border-t border-stone-200 font-mono text-[10px] text-stone-500">
          signed in as
          <div className="text-stone-800 mt-0.5">admin@demo</div>
        </div>
      </aside>

      {/* Mobile sub-tabs */}
      <div className="md:hidden border-b border-stone-200 px-4 pt-3 pb-2 flex gap-2">
        {[
          { v: "dashboard", label: "Dashboard" },
          { v: "orders", label: "Orders" },
        ].map((t) => (
          <button
            key={t.v}
            onClick={() => setAdminTab(t.v)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full transition ${
              adminTab === t.v
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white">
        {adminTab === "dashboard" ? (
          <AdminDashboard orders={orders} setAdminTab={setAdminTab} />
        ) : (
          <AdminOrders
            orders={orders}
            advanceOrder={advanceOrder}
            markPaid={markPaid}
          />
        )}
      </div>
    </div>
  );
}

const NavItem = ({ label, active, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition ${
      active
        ? "bg-stone-900 text-white"
        : disabled
        ? "text-stone-400 cursor-not-allowed"
        : "text-stone-700 hover:bg-stone-100"
    }`}
  >
    {label}
    {disabled && (
      <span className="ml-1 font-mono text-[9px] text-stone-400">· soon</span>
    )}
  </button>
);

/* Dashboard */

function AdminDashboard({ orders, setAdminTab }) {
  const today = orders.length;
  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "selesai" || o.status === "disiapkan" || o.status === "dikonfirmasi")
    .reduce((s, o) => s + orderTotal(o.items), 0);
  const awaiting = orders.filter((o) => o.status === "menunggu").length;
  const activeMenu = MENU_BAKSO.length;

  // Top menu — count item quantities across orders
  const counts = {};
  orders.forEach((o) =>
    Object.entries(o.items).forEach(([id, qty]) => {
      counts[id] = (counts[id] || 0) + qty;
    })
  );
  const topMenu = Object.entries(counts)
    .map(([id, qty]) => ({
      ...MENU_BAKSO.find((m) => m.id === id),
      qty,
    }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 4);

  const recent = orders.slice(0, 4);

  // Mock 7-day sales — last value scales with today's revenue
  const baseSeries = [320, 410, 280, 520, 380, 460];
  const series = [...baseSeries, Math.max(180, Math.round(revenue / 1000))];

  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h3 className="text-lg font-medium tracking-tight text-stone-900">
            Dashboard
          </h3>
          <div className="font-mono text-[11px] text-stone-500">
            Today · sample data
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Orders Today" value={today} />
        <StatCard label="Revenue Today" value={idr(revenue)} small />
        <StatCard label="Awaiting Confirmation" value={awaiting} tone={awaiting > 0 ? "amber" : "default"} />
        <StatCard label="Active Menu Items" value={activeMenu} />
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        {/* Sales chart */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
              7-day sales · mock
            </div>
            <div className="font-mono text-[10px] text-stone-500">
              units: × Rp 1.000
            </div>
          </div>
          <SalesSpark series={series} />
          <div className="grid grid-cols-7 mt-2 font-mono text-[9px] text-stone-400">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Today"].map((d) => (
              <div key={d} className="text-center">{d}</div>
            ))}
          </div>
        </div>

        {/* Top menu */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
            Top menu
          </div>
          {topMenu.length === 0 ? (
            <div className="text-stone-400 text-xs italic">No sales yet.</div>
          ) : (
            <ul className="space-y-2">
              {topMenu.map((m, i) => {
                const max = topMenu[0].qty;
                return (
                  <li key={m.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-stone-800 truncate">{m.name}</span>
                      <span className="font-mono text-stone-500">×{m.qty}</span>
                    </div>
                    <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(m.qty / max) * 100}%`,
                          backgroundColor:
                            i === 0 ? accent : "rgba(28,25,23,0.45)",
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-3 bg-stone-50 border border-stone-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
            Recent orders
          </div>
          <button
            onClick={() => setAdminTab("orders")}
            className="font-mono text-[10px] uppercase tracking-widest text-stone-600 hover:text-stone-900"
          >
            View all →
          </button>
        </div>
        <ul className="divide-y divide-stone-200">
          {recent.map((o) => (
            <li
              key={o.id}
              className="py-2 flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-stone-500 shrink-0 w-12">
                  {o.id}
                </span>
                <span className="text-stone-800 truncate">
                  {o.customerName}
                </span>
                <span className="font-mono text-stone-400 shrink-0">
                  · Table {o.table}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-stone-700">
                  {idr(orderTotal(o.items))}
                </span>
                <StatusBadge status={o.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone, small }) {
  const tones = {
    default: "bg-white",
    amber: "bg-amber-50 border-amber-200",
  };
  return (
    <div
      className={`border border-stone-200 rounded-xl p-3.5 ${
        tones[tone || "default"]
      }`}
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
        {label}
      </div>
      <div
        className={`font-mono font-medium text-stone-900 tracking-tight ${
          small ? "text-lg" : "text-2xl"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function SalesSpark({ series }) {
  const W = 320;
  const H = 64;
  const max = Math.max(...series, 1);
  const min = Math.min(...series, 0);
  const range = Math.max(max - min, 1);
  const step = W / (series.length - 1);
  const points = series.map((v, i) => {
    const x = i * step;
    const y = H - ((v - min) / range) * (H - 6) - 3;
    return [x, y];
  });
  const path = points.map(([x, y], i) => (i === 0 ? `M${x} ${y}` : `L${x} ${y}`)).join(" ");
  const area = `${path} L${W} ${H} L0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none" role="img" aria-label="7-day sales trend sparkline chart">
      <path d={area} fill={accent} opacity="0.12" />
      <path d={path} fill="none" stroke={accent} strokeWidth="1.6" />
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === points.length - 1 ? 3 : 1.8}
          fill={i === points.length - 1 ? accent : "#fff"}
          stroke={accent}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

/* Orders tab */

function AdminOrders({ orders, advanceOrder, markPaid }) {
  const active = orders.filter((o) => o.status !== "paid");
  const payable = orders.filter((o) => o.status === "selesai");
  const paid = orders.filter((o) => o.status === "paid");

  return (
    <div className="p-5 sm:p-6 space-y-5">
      <div>
        <h3 className="text-lg font-medium tracking-tight text-stone-900">
          Orders
        </h3>
        <div className="font-mono text-[11px] text-stone-500">
          Advance each order through its lifecycle.
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-stone-200 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-stone-50 border-b border-stone-200">
              <Th2>ID</Th2>
              <Th2>Customer</Th2>
              <Th2 className="hidden sm:table-cell">Table</Th2>
              <Th2 className="hidden md:table-cell">Items</Th2>
              <Th2>Total</Th2>
              <Th2 className="hidden md:table-cell">Time</Th2>
              <Th2>Status</Th2>
              <Th2 className="text-right">Action</Th2>
            </tr>
          </thead>
          <tbody>
            {active.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-stone-400 text-xs italic">
                  No active orders.
                </td>
              </tr>
            )}
            {active.map((o) => (
              <tr key={o.id} className="border-b border-stone-100 last:border-b-0">
                <td className="px-3 py-2.5 font-mono text-stone-700 whitespace-nowrap">
                  {o.id}
                </td>
                <td className="px-3 py-2.5 text-stone-800 whitespace-nowrap">
                  {o.customerName}
                </td>
                <td className="px-3 py-2.5 font-mono text-stone-600 hidden sm:table-cell">
                  {o.table}
                </td>
                <td className="px-3 py-2.5 font-mono text-stone-600 hidden md:table-cell">
                  {orderItemCount(o.items)}
                </td>
                <td className="px-3 py-2.5 font-mono text-stone-800">
                  {idr(orderTotal(o.items))}
                </td>
                <td className="px-3 py-2.5 font-mono text-stone-500 hidden md:table-cell">
                  {o.time}
                </td>
                <td className="px-3 py-2.5">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-3 py-2.5 text-right">
                  <OrderAction
                    order={o}
                    advanceOrder={advanceOrder}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-medium tracking-tight text-stone-900">
              Pembayaran · Payment
            </h4>
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
              Completed orders ready for payment
            </div>
          </div>
          <span className="font-mono text-[10px] text-stone-500">
            {payable.length} pending · {paid.length} paid
          </span>
        </div>
        {payable.length === 0 ? (
          <div className="border border-dashed border-stone-300 rounded-xl p-5 text-center text-xs text-stone-400 italic">
            Nothing waiting for payment.
          </div>
        ) : (
          <ul className="space-y-2">
            {payable.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between gap-3 bg-white border border-stone-200 rounded-xl px-3 py-2.5"
              >
                <div className="min-w-0 flex items-center gap-2.5">
                  <span className="font-mono text-stone-500 text-xs">
                    {o.id}
                  </span>
                  <span className="text-sm text-stone-900 truncate">
                    {o.customerName}
                  </span>
                  <span className="font-mono text-[11px] text-stone-400 shrink-0">
                    Table {o.table}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-sm text-stone-800">
                    {idr(orderTotal(o.items))}
                  </span>
                  <button
                    onClick={() => markPaid(o.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-medium hover:opacity-90 transition" style={{ backgroundColor: accentBg }}
                  >
                    Mark Paid
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {paid.length > 0 && (
          <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-stone-400">
            Paid today · {paid.map((p) => p.id).join(" · ")}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderAction({ order, advanceOrder }) {
  const nextLabel = {
    menunggu: "Confirm",
    dikonfirmasi: "Prepare",
    disiapkan: "Complete",
    selesai: null,
  }[order.status];

  if (!nextLabel) {
    return (
      <span className="font-mono text-[10px] text-stone-400">
        awaiting payment
      </span>
    );
  }
  return (
    <button
      onClick={() => advanceOrder(order.id)}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white text-stone-700 text-xs transition whitespace-nowrap"
    >
      {nextLabel}
    </button>
  );
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status];
  const tones = {
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    sky: "bg-sky-50 text-sky-800 border-sky-200",
    green: "bg-emerald-50 text-emerald-800 border-emerald-200",
    emerald: "bg-emerald-100 text-emerald-900 border-emerald-300",
  };
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap ${tones[meta.tone]}`}
      title={meta.english}
    >
      {meta.label}
    </span>
  );
}

const Th2 = ({ children, className = "" }) => (
  <th
    className={`px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest text-stone-500 ${className}`}
  >
    {children}
  </th>
);

/* ──────────────────────────────────────────────────────────────────────────
   DEMO 2 — AFFILIATE RECOMMENDATIONS
   ────────────────────────────────────────────────────────────────────────── */

const TAGS = [
  { id: "budget", label: "Budget" },
  { id: "premium", label: "Premium" },
  { id: "electronics", label: "Electronics" },
  { id: "home", label: "Home" },
  { id: "fitness", label: "Fitness" },
  { id: "office", label: "Office" },
];

const PRODUCTS_INIT = [
  { id: "p1", name: "Bluetooth Earbuds X2", price: 249000, rating: 4.4, tags: ["budget", "electronics"], featured: true },
  { id: "p2", name: "Noise-Cancelling Headphones", price: 1899000, rating: 4.7, tags: ["premium", "electronics"], featured: false },
  { id: "p3", name: "Smart LED Bulb (4-pack)", price: 189000, rating: 4.3, tags: ["budget", "home"], featured: false },
  { id: "p4", name: "Ergonomic Mesh Chair", price: 2350000, rating: 4.6, tags: ["premium", "home", "office"], featured: true },
  { id: "p5", name: "Yoga Mat 6mm", price: 159000, rating: 4.5, tags: ["budget", "fitness"], featured: false },
  { id: "p6", name: "Adjustable Dumbbell 24kg", price: 1499000, rating: 4.8, tags: ["premium", "fitness"], featured: true },
  { id: "p7", name: "Mechanical Keyboard 75%", price: 899000, rating: 4.6, tags: ["electronics", "office"], featured: false },
  { id: "p8", name: "Aroma Diffuser Stone", price: 219000, rating: 4.2, tags: ["budget", "home"], featured: false },
];

function AffiliateDemo() {
  const [view, setView] = useState("user");
  const [selectedTags, setSelectedTags] = useState(["budget"]);
  const [products, setProducts] = useState(PRODUCTS_INIT);

  const toggleTag = (id) =>
    setSelectedTags((t) =>
      t.includes(id) ? t.filter((x) => x !== id) : [...t, id]
    );

  const toggleFeatured = (id) =>
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));

  const recommended = useMemo(() => {
    let pool = products;
    if (selectedTags.length > 0) {
      pool = pool.filter((p) => p.tags.some((t) => selectedTags.includes(t)));
    }
    // Featured boost, then rating
    return [...pool].sort((a, b) => (b.featured - a.featured) * 100 + (b.rating - a.rating));
  }, [products, selectedTags]);

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <div
          role="tablist"
          className="inline-flex p-1 bg-stone-100 rounded-full border border-stone-200"
        >
          {["user", "admin"].map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full transition ${
                view === v ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {v} view
            </button>
          ))}
        </div>
        <div className="font-mono text-xs text-stone-400 hidden sm:block">
          {view === "user" ? "← shopper recommendations" : "← merchandiser controls"}
        </div>
      </div>

      {view === "user" ? (
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">
            Preferences
          </div>
          <div className="flex flex-wrap gap-2 mb-7">
            {TAGS.map((t) => {
              const on = selectedTags.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTag(t.id)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-full border transition ${
                    on
                      ? "text-white border-transparent"
                      : "bg-white text-stone-700 border-stone-300 hover:border-stone-900"
                  }`}
                  style={on ? { backgroundColor: accentBg } : undefined}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">
            Recommended for you · {recommended.length} result{recommended.length === 1 ? "" : "s"}
          </div>
          {recommended.length === 0 ? (
            <div className="text-center text-stone-400 text-sm border border-dashed border-stone-300 rounded-xl p-8">
              No matches. Try selecting a different tag.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommended.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-stone-200 rounded-xl p-4 hover:border-stone-400 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-stone-900 font-medium leading-tight">{p.name}</div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-stone-500">
                        <Star size={11} className="fill-stone-700 text-stone-700" />
                        <span className="font-mono">{p.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    {p.featured && (
                      <span
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded-full text-white uppercase tracking-wider"
                        style={{ backgroundColor: accentBg }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div className="font-mono text-sm text-stone-800">{idr(p.price)}</div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] uppercase tracking-wider text-stone-500 border border-stone-200 rounded-full px-1.5 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">
            Catalog · toggle <span className="text-stone-700">Featured</span> to boost a product in the user view
          </div>
          <div className="overflow-x-auto bg-white border border-stone-200 rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-stone-50 border-b border-stone-200">
                  <Th>Product</Th>
                  <Th>Tags</Th>
                  <Th>Price</Th>
                  <Th>Rating</Th>
                  <Th className="text-right">Featured</Th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-stone-100 last:border-b-0">
                    <td className="px-4 py-3 text-stone-900">{p.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] uppercase tracking-wider text-stone-500 border border-stone-200 rounded-full px-1.5 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-stone-700">{idr(p.price)}</td>
                    <td className="px-4 py-3 font-mono text-stone-700">{p.rating.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleFeatured(p.id)}
                        role="switch"
                        aria-checked={p.featured}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          p.featured ? "" : "bg-stone-200"
                        }`}
                        style={p.featured ? { backgroundColor: accentBg } : undefined}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                            p.featured ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const Th = ({ children, className = "" }) => (
  <th className={`px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-stone-500 ${className}`}>
    {children}
  </th>
);

/* ──────────────────────────────────────────────────────────────────────────
   DEMO 3 — AI DETECTION (photo-verification pipeline, shown on a generic object)
   ────────────────────────────────────────────────────────────────────────── */

// Fictional sample record for verification.
const SAMPLE_EXPECTED = {
  referenceId: "REF-8842-1097",
  category: "Category B — Medium",
};

// Bounding boxes on the illustrated object (percentages of the 5:4 frame, matching the drawing).
const SAMPLE_BOXES = [
  { id: "obj", label: "Object", conf: 0.94, x: 17, y: 22, w: 66, h: 71 },
  { id: "lbl", label: "Label", conf: 0.91, x: 27, y: 53, w: 34, h: 25 },
];

const PIPELINE_STAGES = [
  { id: "detect", label: "Object Detection", icon: ScanLine },
  { id: "extract", label: "Text Reading", icon: FileText },
  { id: "verify", label: "Work-order Check", icon: ShieldCheck },
  { id: "result", label: "Suggestion", icon: ClipboardCheck },
];

// The reviewer's note on a rejected suggestion (fictional, like the rest of the sample).
const SAMPLE_REJECT_NOTE = "Identifier partly covered, retake the photo";

function AiDetectionDemo() {
  // stage: -1 idle, 0..3 active stage index, 4 finished
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
  // The reviewer's decision on the finished suggestion: null, "approved" or "rejected"
  const [decision, setDecision] = useState(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const run = () => {
    clearTimers();
    setStage(0);
    setRunning(true);
    setDecision(null);
    timers.current.push(setTimeout(() => setStage(1), 1400));
    timers.current.push(setTimeout(() => setStage(2), 2900));
    timers.current.push(setTimeout(() => setStage(3), 4300));
    timers.current.push(
      setTimeout(() => {
        setStage(4);
        setRunning(false);
      }, 5500)
    );
  };

  const reset = () => {
    clearTimers();
    setStage(-1);
    setRunning(false);
    setDecision(null);
  };

  const isStarted = stage >= 0;
  const showBoxes = stage >= 0;
  const showExtraction = stage >= 1;
  const showVerification = stage >= 2;
  const showResult = stage >= 3;
  const finished = stage === 4;

  // All-pass result for this demo (fields match expected). We still visually
  // demonstrate a "needs review" state for the handwritten note tone.
  const extracted = {
    referenceId: { value: "REF-8842-1097", source: "RapidOCR", conf: 0.95 },
    category: { value: "Category B — Medium", source: "RapidOCR", conf: 0.92 },
    handwrittenNote: { value: "Checked", source: "TrOCR", conf: 0.88 },
  };
  const checks = [
    {
      field: "Reference ID",
      extracted: extracted.referenceId.value,
      expected: SAMPLE_EXPECTED.referenceId,
      ok: extracted.referenceId.value === SAMPLE_EXPECTED.referenceId,
    },
    {
      field: "Category",
      extracted: extracted.category.value,
      expected: SAMPLE_EXPECTED.category,
      ok: extracted.category.value === SAMPLE_EXPECTED.category,
    },
    {
      field: "Handwritten Note",
      extracted: extracted.handwrittenNote.value,
      expected: "—",
      ok: true,
      neutral: true,
    },
  ];
  const allOk = checks.every((c) => c.ok);

  return (
    <div className="p-5 sm:p-6">
      {/* Controls + stage strip */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
        <div className="flex items-center gap-2">
          <button
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition disabled:opacity-50"
            style={{ backgroundColor: accentBg }}
          >
            {running ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            {running ? "Running…" : finished ? "Run again" : "Run Detection"}
          </button>
          {isStarted && !running && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-stone-700 text-xs border border-stone-300 hover:border-stone-900 transition"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
        <div className="font-mono text-xs text-stone-500">
          Pipeline · YOLO + RapidOCR + TrOCR · fictional sample
        </div>
      </div>

      {/* Stage chips */}
      <ol className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {PIPELINE_STAGES.map((s, i) => {
          const Icon = s.icon;
          const active = stage >= i;
          const current = stage === i && stage < 4;
          return (
            <li
              key={s.id}
              className={`p-2.5 rounded-lg border transition-all duration-300 ${
                active ? "bg-white border-stone-900" : "bg-stone-50 border-stone-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition shrink-0 ${
                    active ? "text-white" : "bg-stone-200 text-stone-500"
                  }`}
                  style={active ? { backgroundColor: accentBg } : undefined}
                >
                  {current ? (
                    <Loader2 size={11} className="animate-spin" />
                  ) : active ? (
                    <Check size={11} />
                  ) : (
                    <Icon size={11} />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-stone-500 leading-none">
                    Step {i + 1}
                  </div>
                  <div className="text-xs text-stone-900 font-medium truncate mt-0.5">
                    {s.label}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Illustrated object */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[5/4] rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
            <ObjectIllustration />

            {/* Scan sweep on first stage */}
            {stage === 0 && (
              <div
                className="absolute left-0 right-0 h-12 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${accent}88 50%, transparent 100%)`,
                  animation: "scan 1.3s ease-in-out forwards",
                }}
              />
            )}

            {/* Bounding boxes */}
            {showBoxes &&
              SAMPLE_BOXES.map((b, i) => (
                <div
                  key={b.id}
                  className="absolute transition-all duration-500"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.w}%`,
                    height: `${b.h}%`,
                    border: `2px solid ${accent}`,
                    boxShadow: `0 0 0 1px ${accent}33`,
                    opacity: 1,
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div
                    className="absolute -top-5 left-0 font-mono text-[9px] px-1.5 py-0.5 rounded text-white whitespace-nowrap"
                    style={{ backgroundColor: accentBg }}
                  >
                    {b.label} · {b.conf.toFixed(2)}
                  </div>
                </div>
              ))}

            <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-widest text-white/80 bg-stone-900/40 backdrop-blur-sm px-1.5 py-0.5 rounded">
              Sample frame · illustrative
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-2 space-y-3">
          {/* Extracted */}
          <Panel title="Extracted Fields">
            {!showExtraction ? (
              <EmptyLine text={isStarted ? "awaiting OCR pass…" : "press Run Detection to begin"} />
            ) : (
              <ul className="space-y-2">
                <ExtractedRow
                  label="Reference ID"
                  value={extracted.referenceId.value}
                  source="RapidOCR"
                  conf={extracted.referenceId.conf}
                  delay={0}
                />
                <ExtractedRow
                  label="Category"
                  value={extracted.category.value}
                  source="RapidOCR"
                  conf={extracted.category.conf}
                  delay={100}
                />
                <ExtractedRow
                  label="Handwritten Note"
                  value={extracted.handwrittenNote.value}
                  source="TrOCR"
                  conf={extracted.handwrittenNote.conf}
                  delay={200}
                  italic
                />
              </ul>
            )}
          </Panel>

          {/* Work-order check */}
          <Panel title="Work-order Check">
            {!showVerification ? (
              <EmptyLine text="pending…" />
            ) : (
              <ul className="space-y-1.5">
                {checks.map((c, i) => (
                  <li
                    key={c.field}
                    className="flex items-center justify-between gap-2 text-xs animate-fade-in"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="text-stone-700">{c.field}</span>
                    {c.neutral ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        captured
                      </span>
                    ) : c.ok ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check size={10} /> match
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle size={10} /> needs review
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* Suggestion */}
          <Panel title="Suggestion">
            {!showResult ? (
              <EmptyLine text="—" />
            ) : (
              <div className="animate-fade-in space-y-3">
                <div className="flex items-center justify-between">
                  {allOk ? (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-medium"
                      style={{ backgroundColor: "#15803d" }}
                    >
                      <ShieldCheck size={12} /> Suggested valid
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-medium"
                      style={{ backgroundColor: "#b45309" }}
                    >
                      <AlertTriangle size={12} /> Needs Review
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-stone-500">
                    pre-filled for the reviewer
                  </span>
                </div>
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 space-y-1 font-mono text-[11px]">
                  <SummaryRow k="Reference" v={extracted.referenceId.value} />
                  <SummaryRow k="Category" v={extracted.category.value} />
                  <SummaryRow k="Note" v={extracted.handwrittenNote.value} italic />
                </div>
              </div>
            )}
          </Panel>

          {/* Reviewer decision: the person decides, and both sides are stored */}
          <Panel title="Reviewer Decision">
            {!finished ? (
              <EmptyLine text={isStarted ? "waits for the suggestion…" : "—"} />
            ) : decision === null ? (
              <div className="animate-fade-in flex items-center gap-2">
                <button
                  onClick={() => setDecision("approved")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium transition hover:opacity-90"
                  style={{ backgroundColor: accentBg }}
                >
                  <Check size={12} /> Approve
                </button>
                <button
                  onClick={() => setDecision("rejected")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-stone-700 text-xs border border-stone-300 hover:border-stone-900 transition"
                >
                  <X size={12} /> Reject
                </button>
              </div>
            ) : (
              <div className="animate-fade-in space-y-2">
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 space-y-1 font-mono text-[11px]">
                  <SummaryRow k="AI result" v="Valid · 0.95" />
                  <SummaryRow k="Reviewer" v={decision === "approved" ? "Approved" : "Rejected"} />
                  {decision === "rejected" && <SummaryRow k="Note" v={SAMPLE_REJECT_NOTE} italic />}
                </div>
                <div className="font-mono text-[10px] text-stone-500">
                  stored as one record for evaluation and retraining
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>

      {/* NDA-safety caption */}
      <p className="mt-5 text-[11px] italic text-stone-500 leading-relaxed max-w-3xl">
        Interactive illustration of a computer-vision pipeline I built (object
        detection, RapidOCR and TrOCR text reading, a check against the work
        order, and a reviewer's decision). It is shown on a generic object with
        fictional data; the client system and its data are confidential.
      </p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-3.5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-2.5">
        {title}
      </div>
      {children}
    </div>
  );
}

function EmptyLine({ text }) {
  return <div className="text-stone-400 text-xs italic">{text}</div>;
}

function ExtractedRow({ label, value, source, conf, delay, italic }) {
  return (
    <li
      className="flex items-start justify-between gap-3 text-xs animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">
          {label}
        </div>
        <div
          className={`font-mono text-stone-900 truncate ${
            italic ? "italic" : ""
          }`}
        >
          {value}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 border border-stone-200 rounded-full px-1.5 py-0.5">
          {source}
        </span>
        <span className="font-mono text-[10px] text-stone-500">
          {conf.toFixed(2)}
        </span>
      </div>
    </li>
  );
}

function SummaryRow({ k, v, italic }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-stone-500 uppercase text-[9px] tracking-wider">{k}</span>
      <span className={`text-stone-800 truncate ${italic ? "italic" : ""}`}>
        {v}
      </span>
    </div>
  );
}

// Pure SVG illustration of a generic object with a printed label: no photo, no logos, and nothing
// that names what the real system looks at.
function ObjectIllustration() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 30%, #FAFAF7 0%, #E7E5E4 60%, #D6D3D1 100%)",
      }}
    >
      <svg
        viewBox="0 0 200 160"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {/* Drop shadow */}
        <ellipse cx="100" cy="142" rx="66" ry="5" fill="rgba(0,0,0,0.10)" />
        {/* Body */}
        <path
          d="M40 60 L100 40 L160 60 L160 124 L100 144 L40 124 Z"
          fill="#CFD3D8"
          stroke="#6B7280"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Top face */}
        <path
          d="M40 60 L100 40 L160 60 L100 80 Z"
          fill="#E5E7EB"
          stroke="#6B7280"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Side face in shade */}
        <path d="M100 80 L160 60 L160 124 L100 144 Z" fill="#9CA3AF" opacity="0.55" />
        <path d="M100 80 L100 144" stroke="#6B7280" strokeWidth="1" fill="none" />
        {/* Printed label */}
        <g transform="translate(58 88)">
          <rect width="60" height="34" fill="#FAFAF7" stroke="#6B7280" strokeWidth="0.8" rx="2" />
          {/* Printed lines (mock) */}
          <rect x="4" y="4" width="30" height="2.6" fill="#1F2937" />
          <rect x="4" y="10" width="24" height="1.6" fill="#6B7280" />
          <rect x="4" y="14" width="34" height="1.6" fill="#6B7280" />
          {/* Reference code: a row of printed characters */}
          <g transform="translate(4 21)">
            {Array.from({ length: 11 }).map((_, i) => (
              <rect key={i} x={i * 4.6} y="0" width={i === 3 || i === 7 ? 1.6 : 3.4} height={i === 3 || i === 7 ? 1.2 : 5.5} transform={i === 3 || i === 7 ? "translate(0.9 2.2)" : undefined} fill="#1F2937" />
            ))}
          </g>
          {/* Handwritten note: two pen strokes */}
          <path d="M 41 6 q 2 -3 4 0 t 4 0 t 4 0" fill="none" stroke="#1E3A8A" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M 41 10.5 q 2 -2 4 0 t 4 0 t 4 0" fill="none" stroke="#1E3A8A" strokeWidth="1.1" strokeLinecap="round" />
        </g>
        {/* Edge highlights */}
        <path d="M40 60 L40 124" stroke="#9CA3AF" strokeWidth="0.8" />
        <path d="M160 60 L160 124" stroke="#9CA3AF" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CASE STUDY — AI DETECTION
   Three views of the same work: the walkthrough above, the architecture, and
   the recorded results with the text-reading research. Names stay generic
   ("Equipment 1", "Equipment 2"): the client and what it photographs are
   confidential. The scores are real, from recorded validation runs.
   ────────────────────────────────────────────────────────────────────────── */

const AI_DETECTION_VIEWS = [
  {
    id: "walkthrough",
    label: "Walkthrough",
    line: "One photo through the pipeline: detection, text reading, the check against the work order, a suggestion, and the reviewer's decision.",
  },
  {
    id: "architecture",
    label: "Architecture",
    line: "Eight parts in three layers, from the technician's photo to the reviewer's decision. Select one to see what it does and why it is there.",
  },
  {
    id: "results",
    label: "Results",
    line: "Scores from recorded validation runs, and what the text-reading research found.",
  },
];

function AiDetectionCaseStudy() {
  const [viewId, setViewId] = useState("walkthrough");
  const view = AI_DETECTION_VIEWS.find((v) => v.id === viewId);
  return (
    <div>
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="inline-flex p-1 rounded-full bg-stone-100 border border-stone-200" role="group" aria-label="Choose a view">
          {AI_DETECTION_VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={v.id === viewId}
              onClick={() => setViewId(v.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                v.id === viewId ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-stone-600 flex-1" style={{ minWidth: "16rem" }}>{view.line}</p>
      </div>
      {viewId === "walkthrough" && <AiDetectionDemo />}
      {viewId === "architecture" && <AiDetectionArchitecture />}
      {viewId === "results" && <AiDetectionResults />}
    </div>
  );
}

// The same eight parts as the written architecture diagram, as an illustration page of the kind
// AI Worker uses: select a part to read what it does and why.
function AiDetectionArchitecture() {
  return (
    <div className="p-5 sm:p-6">
      <IllustrationFrame
        src="/portfolio-illustrations/ai-detection-architecture.html?embed=1"
        title="AI Detection System architecture"
        height={1140}
      />
    </div>
  );
}

// Validation scores as recorded by the training runs, in percent.
const EQUIPMENT_1_SCORES = [
  ["Variant A", "599", "93.6", "93.5", "96.5", "78.5"],
  ["Variant B", "601", "94.0", "92.5", "96.3", "82.1"],
];
const EQUIPMENT_2_SCORES = [
  ["Labelled data only", "182", "90.9", "86.9", "92.1", "70.8"],
  ["After pseudo-labelling, promoted", "182", "89.9", "84.4", "90.9", "68.9"],
];
const OCR_FINDINGS = [
  {
    figure: "60.6% → 73.6%",
    text: "Identifier extraction in simulation, from joining text fragments and tolerating look-alike characters.",
  },
  {
    figure: "72.5% → 100%",
    text: "True matches against the work order, with false matches unchanged at 0.67%.",
  },
  {
    figure: "97%",
    text: "False accepts from edit-distance matching. Neighbouring identifiers differ by one digit, so it was rejected.",
  },
  {
    figure: "27%",
    text: "Of printed-label photos fail because of the photo or the label itself, which no parsing fixes.",
  },
];

// The score columns. A phone shows the three that matter most, so the table fits without a sideways scroll.
const SCORE_COLS = [
  { label: "Images", phone: false },
  { label: "Precision", phone: true },
  { label: "Recall", phone: true },
  { label: "mAP@0.50", phone: true },
  { label: "mAP@0.50–0.95", phone: false },
];
const scoreCell = (col) => `px-2.5 sm:px-4 py-2.5 text-right ${col.phone ? "" : "hidden sm:table-cell"}`;

function ScoreTable({ title, rows, note }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-stone-900 mb-2">{title}</h3>
      <div className="bg-white border border-stone-200 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 font-mono text-[10px] uppercase tracking-wider sm:tracking-widest text-stone-500">
              <th className="px-2.5 sm:px-4 py-2.5 font-normal">Model</th>
              {SCORE_COLS.map((col) => (
                <th key={col.label} className={`${scoreCell(col)} font-normal`}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([model, ...cells]) => (
              <tr key={model} className="border-b border-stone-100 last:border-0">
                <td className="px-2.5 sm:px-4 py-2.5 text-stone-900 sm:whitespace-nowrap">{model}</td>
                {cells.map((c, i) => (
                  <td key={SCORE_COLS[i].label} className={`${scoreCell(SCORE_COLS[i])} font-mono text-stone-700`}>
                    {i === 0 ? c : `${c}%`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-stone-600 leading-relaxed max-w-3xl">{note}</p>
    </div>
  );
}

function AiDetectionResults() {
  return (
    <div className="p-5 sm:p-6 space-y-6">
      <ScoreTable
        title="Equipment 1, two variant models"
        rows={EQUIPMENT_1_SCORES}
        note="Each variant has about 6,000 labelled images, roughly 1,500 per class. These are validation scores, not a separate test score."
      />
      <ScoreTable
        title="Equipment 2, one oriented-box model"
        rows={EQUIPMENT_2_SCORES}
        note="From 918 labelled photos. The pseudo-labelling round did not improve on the labelled-only model, and the cable is the weak class at 74.2% mAP@0.50."
      />

      <div>
        <h3 className="text-sm font-medium text-stone-900 mb-2">Text-reading research on about 9,000 field photos</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {OCR_FINDINGS.map((f) => (
            <div key={f.figure} className="bg-white border border-stone-200 rounded-xl p-3.5">
              <div className="font-mono text-lg text-stone-900">{f.figure}</div>
              <div className="mt-1 text-xs text-stone-600 leading-relaxed">{f.text}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-stone-600 leading-relaxed max-w-3xl">
          The extraction and matching changes are specified and simulated, not shipped yet. The larger
          fix is upstream: store the identifier as structured fields, standardise the printed label,
          and check the photo when it is taken.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-3.5">
        <h3 className="text-sm font-medium text-stone-900">The AI suggests, a reviewer decides</h3>
        <p className="mt-1 text-xs text-stone-600 leading-relaxed max-w-3xl">
          The models need to be evaluated against real reviewer decisions before any check is
          automated. The application stores each suggestion with the reviewer's decision, and a
          rejection keeps the reviewer's note. That record is what measures agreement and supplies
          the cases for retraining.
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CASE STUDY — AI WORKER (local prototype)
   Two interactive illustrations, kept as self-contained pages in
   public/portfolio-illustrations (copied from the project's own
   portfolio-illustrations/standalone folder) and shown one at a time.
   ────────────────────────────────────────────────────────────────────────── */

const AI_WORKER_VIEWS = [
  {
    id: "flow",
    label: "Application flow",
    title: "AI Worker application walkthrough",
    src: "/portfolio-illustrations/application-flow.html?embed=1",
    height: 1020,
    line: "Three journeys: a question answered from evidence, a reply held for staff approval, and a booking confirmed after a person verifies the deposit.",
  },
  {
    id: "stack",
    label: "Technology",
    title: "AI Worker technology architecture",
    src: "/portfolio-illustrations/tech-stack.html?embed=1",
    height: 1140,
    line: "Eight parts in three layers. Select one to see what it does and why it is there.",
  },
];

// An illustration page from public/portfolio-illustrations, shown in a frame as tall as its content.
// Give it a key when the page changes, so each page starts from its own usual height.
function IllustrationFrame({ src, title, height: usual }) {
  const [height, setHeight] = useState(usual); // the page's usual height, until it is measured
  const frameRef = useRef(null);

  // The page in the frame is served from this site, so the frame takes its content's height and is
  // told never to scroll by itself: the dialog's scroll is the only one.
  const fitFrame = useCallback(() => {
    const frame = frameRef.current;
    const doc = frame && frame.contentDocument;
    const app = doc && doc.getElementById("app");
    if (!app) return undefined;
    const win = frame.contentWindow;
    doc.documentElement.style.overflow = "hidden";
    // The diagram is drawn at 940x600 and scaled down to the frame's width. Its unscaled height
    // still counts as content, which left a strip of empty scroll inside the diagram: a second
    // scroll under the pointer. A negative margin takes that strip away; zoomed in, it is not set.
    const stage = doc.querySelector(".stage");
    const trim = () => {
      if (!stage) return;
      const scale = new win.DOMMatrixReadOnly(win.getComputedStyle(stage).transform).a;
      const want = scale < 1 ? `${Math.floor(stage.offsetHeight * (scale - 1))}px` : "";
      if (stage.style.marginBottom !== want) stage.style.marginBottom = want;
    };
    const measure = () => { trim(); setHeight(Math.ceil(app.getBoundingClientRect().height) + 2); };
    measure();
    const observer = new win.ResizeObserver(measure);
    observer.observe(app);
    const styled = stage ? new win.MutationObserver(trim) : null;
    if (styled) styled.observe(stage, { attributes: true, attributeFilter: ["style"] });
    return () => { observer.disconnect(); if (styled) styled.disconnect(); };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    let stop;
    const onLoad = () => { if (stop) stop(); stop = fitFrame(); };
    frame.addEventListener("load", onLoad);
    if (frame.contentDocument && frame.contentDocument.readyState === "complete") onLoad();
    return () => { frame.removeEventListener("load", onLoad); if (stop) stop(); };
  }, [fitFrame]);


  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      scrolling="no"
      className="block w-full rounded-2xl"
      style={{ height, border: 0, background: "transparent" }}
    />
  );
}

function AiWorkerCaseStudy() {
  const [viewId, setViewId] = useState("flow");
  const view = AI_WORKER_VIEWS.find((v) => v.id === viewId);

  return (
    <div className="p-5 sm:p-6 space-y-5">
      <p className="text-stone-700 leading-relaxed max-w-2xl">
        The model proposes; application rules decide whether it may answer on its
        own, needs staff approval, or must hand off to a person.
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="inline-flex p-1 rounded-full bg-stone-100 border border-stone-200" role="group" aria-label="Choose an illustration">
          {AI_WORKER_VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={v.id === viewId}
              onClick={() => setViewId(v.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                v.id === viewId ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-stone-600 flex-1" style={{ minWidth: "16rem" }}>{view.line}</p>
      </div>

      <IllustrationFrame key={view.id} src={view.src} title={view.title} height={view.height} />

      <p className="text-[11px] italic text-stone-500 leading-relaxed max-w-3xl">
        Sample messages, not live customer data. No messages are sent and no payments
        are processed. Built from the project implementation; production hosting is
        not verified.
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   APP
   ────────────────────────────────────────────────────────────────────────── */

// The card's picture grows into the dialog and shrinks back into it (View Transitions API; the two
// ends share one view-transition-name, see src/index.css). It needs the picture on screen, a window
// wide enough for the dialog to be a window (a phone gets a bottom sheet) and motion allowed;
// otherwise the dialog fades in as before.
const MORPH = "project-morph";
function morphSource(panel) {
  if (!panel || typeof document.startViewTransition !== "function") return null;
  if (!window.matchMedia("(min-width: 640px)").matches) return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const r = panel.getBoundingClientRect();
  const seen = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
  return seen >= r.height * 0.5 ? panel : null;
}

export default function Portfolio() {
  // A project opens from its card, the nav or a shared link: /?project=pos-bakso
  const [opened, setOpened] = useState(() => {
    const id = new URLSearchParams(window.location.search).get("project");
    return PROJECTS.some((p) => p.id === id) ? { id, morph: false } : null;
  });
  const openedRef = useRef(opened);
  openedRef.current = opened;
  const flying = useRef(false); // a transition is running: further clicks wait for it

  // Stable callbacks: the shell is memoised and must not re-render (see Shell.jsx).
  const open = useCallback((id, event) => {
    if (event) event.preventDefault();
    if (flying.current) return;
    window.history.replaceState(null, "", `?project=${id}`);
    const card = event && event.currentTarget.closest(".card"); // a nav or footer link has no card
    const panel = morphSource(card && card.querySelector(".panel"));
    if (!panel) {
      setOpened({ id, morph: false });
      return;
    }
    flying.current = true;
    panel.style.viewTransitionName = MORPH;
    document
      .startViewTransition(() => {
        panel.style.viewTransitionName = "";
        flushSync(() => setOpened({ id, morph: true }));
      })
      .finished.finally(() => {
        flying.current = false;
      });
  }, []);

  const close = useCallback(() => {
    const current = openedRef.current;
    if (!current || flying.current) return;
    window.history.replaceState(null, "", window.location.pathname);
    const panel = morphSource(document.querySelector(`#project-${current.id} > .panel`));
    if (!panel) {
      setOpened(null);
      return;
    }
    flying.current = true;
    document
      .startViewTransition(() => {
        flushSync(() => setOpened(null));
        panel.style.viewTransitionName = MORPH;
      })
      .finished.finally(() => {
        panel.style.viewTransitionName = "";
        flying.current = false;
      });
  }, []);

  const openId = opened ? opened.id : null;
  const project = PROJECTS.find((p) => p.id === openId);

  return (
    <>
      <Shell
        identity={IDENTITY}
        projects={PROJECTS}
        experience={EXPERIENCE}
        education={EDUCATION}
        tools={STACK_TOOLS}
        words={STACK_WORDS}
        agentSteps={AI_WORKER_STEPS}
        onOpen={open}
      />
      {project &&
        createPortal(
          // .tw-scope: Tailwind and its reset apply only inside the demos (src/index.css)
          <div className="tw-scope">
            <Modal open onClose={close} project={project} morph={opened.morph}>
              {project.id === "ai-worker" && <AiWorkerCaseStudy />}
              {project.id === "pos-bakso" && <PosDemo />}
              {project.id === "affiliate-reco" && <AffiliateDemo />}
              {project.id === "ai-detection" && <AiDetectionCaseStudy />}
            </Modal>
          </div>,
          document.body
        )}
    </>
  );
}
