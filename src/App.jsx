/**
 * Portfolio — Salman Fauzan Fahri Aulia
 * Single-file React component. Plain JS. Tailwind core utilities only.
 *
 * Stack: React 18 + Tailwind CSS + lucide-react icons.
 * All state in React (no localStorage / sessionStorage).
 * All demos use mock data + setTimeout-driven state. No network calls.
 *
 * (See run/deploy notes at the bottom of this file.)
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
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
  ExternalLink,
  Camera,
  Sparkles,
  AlertCircle,
  Smartphone,
  Eye,
  Server,
  Layout,
  Box,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────────────────── */

const IDENTITY = {
  name: "Salman Fauzan Fahri Aulia",
  title: "Mobile & AI Engineer",
  location: "Bandung, Indonesia",
  email: "salman.fazzz@gmail.com",
  github: "github.com/salmanfazz",
  githubUrl: "https://github.com/salmanfazz",
  linkedin: "linkedin.com/in/salmanfazz",
  linkedinUrl: "https://linkedin.com/in/salmanfazz",
};

const SKILL_GROUPS = [
  {
    label: "Mobile",
    icon: Smartphone,
    blurb: "Production apps in React Native & Flutter",
    items: ["React Native", "Flutter (Dart)", "Android (Java)", "Retrofit"],
  },
  {
    label: "AI / Computer Vision",
    icon: Eye,
    blurb: "End-to-end detection & text-extraction pipelines",
    items: [
      "Python",
      "YOLOv10m (training & inference)",
      "OpenCV",
      "OCR",
      "TrOCR",
      "Dataset preparation",
    ],
  },
  {
    label: "Backend / API",
    icon: Server,
    blurb: "REST services and integrations",
    items: ["NestJS", "FastAPI", "TypeScript", "Supabase", "REST API", "Zend (PHP)"],
  },
  {
    label: "Frontend",
    icon: Layout,
    blurb: "Modern, responsive web UI",
    items: ["React", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Quality & Tooling",
    icon: ShieldCheck,
    blurb: "Testing and code-quality discipline",
    items: [
      "SonarQube",
      "Unit testing (80% coverage)",
      "Vitest",
      "Playwright (E2E)",
      "Agile/Scrum",
    ],
  },
  {
    label: "DevOps",
    icon: Box,
    blurb: "Containerised deployment on Linux",
    items: ["Docker", "Cloudflare Tunnel", "Linux", "Git"],
  },
];

const EXPERIENCE = [
  {
    company: "PT. Neuronworks Indonesia",
    role: "Mobile Developer",
    period: "Jan 2025 — Present",
    bullets: [
      "Maintained a production React Native app at 80% test coverage under a zero-bug policy, clearing SonarQube issues.",
      "Increased test coverage to 80% across a React + NestJS monolith (frontend and backend).",
      "Led a large-scale Flutter 2.8 → 3.7 migration across the application's codebase and dependencies.",
      "Trained a YOLOv10m object detector on a large custom image dataset, achieving high detection accuracy.",
      "Exposed it via a FastAPI endpoint feeding a web client that verifies detections against transaction data and auto-fills forms.",
      "Added OCR + TrOCR text extraction (printed and handwritten); further detection in active development.",
      "Deployed to production on Linux with Docker and Cloudflare Tunnel.",
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
      "Built an Android school-management app (Java) for Telkom School covering schedules, teacher contact, and reminders.",
    ],
  },
];

const PROJECTS = [
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
  {
    id: "ai-detection",
    name: "AI Detection System",
    kind: "Computer Vision Pipeline",
    summary: "AI photo-verification pipeline — object detection, text extraction, and automated validation (illustrated with a generic parcel-delivery example).",
    topTags: ["YOLOv10m", "FastAPI", "TrOCR"],
    stack: [
      "Python",
      "YOLOv10m",
      "FastAPI",
      "OpenCV",
      "OCR",
      "TrOCR",
      "Docker",
      "Cloudflare Tunnel",
    ],
    ndaNote: "Real system under NDA — demo uses illustrative mock data only.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   PRIMITIVES
   ────────────────────────────────────────────────────────────────────────── */

const accent = "#3B82F6"; // primary blue
const accentSoft = "#DBEAFE"; // light blue tint

const SectionMarker = ({ index, label }) => (
  <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-widest uppercase text-stone-500">
    <span style={{ color: accent }}>§ {index}</span>
    <span className="h-px flex-1 bg-stone-200" />
    <span>{label}</span>
  </div>
);

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
      className={`inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-full border cursor-default transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-50 hover:border-blue-400 ${tones[tone]}`}
      style={style}
    >
      {children}
    </span>
  );
};

const Button = ({ children, variant = "primary", as = "button", className = "", ...props }) => {
  const Tag = as;
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";
  const variants = {
    primary: "text-white hover:opacity-90",
    ghost: "text-stone-900 border bg-white hover:bg-blue-50",
  };
  const style = variant === "primary" ? { backgroundColor: accent } : variant === "ghost" ? { borderColor: accent } : undefined;
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────────────────── */

function Hero({ onViewProjects }) {
  return (
    <header className="pt-12 pb-10 sm:pt-16 sm:pb-14">
      <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        Available for work · Remote &amp; on-site · Bandung, Indonesia
      </div>

      <h1 className="hero-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] font-semibold">
        {IDENTITY.name.split(" ").slice(0, 2).join(" ")}
        <br />
        <span>{IDENTITY.name.split(" ").slice(2).join(" ")}.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg sm:text-xl text-stone-700 leading-relaxed">
        AI engineer building computer-vision systems that ship to production.
      </p>
      <p className="mt-3 max-w-2xl text-base sm:text-lg text-stone-500 leading-relaxed">
        Full-stack engineer across mobile, web, and ML — with a strong focus on
        testing and code quality.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button onClick={onViewProjects}>
          View Projects
          <span aria-hidden>↓</span>
        </Button>
        <Button as="a" href={IDENTITY.githubUrl} target="_blank" rel="noreferrer" variant="ghost">
          <Github size={16} />
          GitHub
          <ArrowUpRight size={14} />
        </Button>
      </div>

      <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 max-w-2xl font-mono text-xs">
        <ContactRow icon={<Mail size={13} />} label="Email" value={IDENTITY.email} href={`mailto:${IDENTITY.email}`} />
        <ContactRow icon={<MapPin size={13} />} label="Based" value="Bandung, ID" />
        <ContactRow icon={<Github size={13} />} label="GitHub" value="@salmanfazz" href={IDENTITY.githubUrl} />
        <ContactRow icon={<Linkedin size={13} />} label="LinkedIn" value="@salmanfazz" href={IDENTITY.linkedinUrl} />
        <ContactRow
          icon={<ShieldCheck size={13} />}
          label="Availability"
          value="Full-time · Part-time · Contract · Remote"
          wide
        />
      </div>
    </header>
  );
}

const ContactRow = ({ icon, label, value, href, wide }) => {
  const inner = (
    <>
      <div className="text-stone-400 flex items-center gap-1.5 mb-1">
        {icon}
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      <div className={`text-stone-800 ${wide ? "" : "truncate"} flex items-center gap-1`}>
        {value}
        {href && <ArrowUpRight size={11} className="text-stone-400" />}
      </div>
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={`group hover:text-stone-900 transition-colors ${wide ? "col-span-2 sm:col-span-2" : ""}`}>
      {inner}
    </a>
  ) : (
    <div className={wide ? "col-span-2 sm:col-span-2" : ""}>{inner}</div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   SKILLS
   ────────────────────────────────────────────────────────────────────────── */

function Skills() {
  return (
    <section className="py-8 sm:py-10">
      <SectionMarker index="01" label="Stack" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {SKILL_GROUPS.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.label}>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className="text-stone-700" />
                <div className="font-mono text-xs uppercase tracking-widest text-stone-700">
                  {g.label}
                </div>
              </div>
              <div className="text-[12px] text-stone-500 mb-3 leading-snug">
                {g.blurb}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <Chip key={it}>{it}</Chip>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   EXPERIENCE
   ────────────────────────────────────────────────────────────────────────── */

function Experience() {
  return (
    <section className="py-8 sm:py-10">
      <SectionMarker index="02" label="Work" />
      <ol className="relative ml-3" style={{ borderLeft: "1px solid #DBEAFE" }}>
        {EXPERIENCE.map((e, i) => (
          <li key={e.company} className="pl-8 pb-12 last:pb-0 relative">
            <span
              className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-stone-50"
              style={{ backgroundColor: i === 0 ? accent : "#BFDBFE" }}
              aria-hidden
            />
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-2">
              {e.period}
            </div>
            <h3 className="text-xl sm:text-2xl text-stone-900 font-medium tracking-tight">
              {e.role}
            </h3>
            <div className="text-stone-600 mb-4">{e.company}</div>
            <ul className="space-y-2 max-w-3xl">
              {e.bullets.map((b, idx) => (
                <li key={idx} className="text-stone-700 leading-relaxed flex gap-3">
                  <span className="text-stone-300 select-none mt-1.5">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   EDUCATION & RESEARCH
   ────────────────────────────────────────────────────────────────────────── */

function EducationAndResearch() {
  return (
    <section className="py-8 sm:py-10">
      <SectionMarker index="03" label="Education & Research" />
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-2">
            2020 — 2024
          </div>
          <h3 className="text-xl sm:text-2xl text-stone-900 font-medium tracking-tight">
            Bachelor of Engineering (S1), Informatics Engineering
          </h3>
          <div className="text-stone-600 mt-1">
            UIN Sunan Gunung Djati Bandung
          </div>
          <div className="text-stone-500 mt-3 font-mono text-sm">
            GPA 3.6 / 4.0
          </div>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-2">
            Publication · SISFOKOM Journal (SINTA 3)
          </div>
          <a
            href="https://doi.org/10.32736/sisfokom.v13i3.2214"
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <h3 className="text-xl sm:text-2xl text-stone-900 font-medium tracking-tight group-hover:underline decoration-stone-400 underline-offset-4 leading-snug">
              Game and Application Purchasing Patterns on Steam using the
              K-Means Algorithm
              <ExternalLink size={16} className="inline-block ml-2 mb-1 text-stone-400 group-hover:text-stone-700 transition" />
            </h3>
          </a>
          <div className="text-stone-500 mt-3 font-mono text-xs break-all">
            doi.org/10.32736/sisfokom.v13i3.2214
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   PROJECTS
   ────────────────────────────────────────────────────────────────────────── */

function ProjectCard({ project, onOpen }) {
  return (
    <button
      onClick={() => onOpen(project.id)}
      className="group text-left bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:border-blue-400 hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-400">
          {project.kind}
        </div>
        <ArrowUpRight
          size={18}
          className="text-stone-300 group-hover:text-blue-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
        />
      </div>
      <h3 className="text-2xl sm:text-3xl text-stone-900 font-medium tracking-tight mb-3">
        {project.name}
      </h3>
      <p className="text-stone-600 leading-relaxed mb-6 flex-1">{project.summary}</p>
      <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
        {project.topTags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
        <span className="ml-auto font-mono text-xs text-stone-400 self-center">
          View demo →
        </span>
      </div>
    </button>
  );
}

function Projects({ onOpen }) {
  return (
    <section id="projects" className="py-8 sm:py-12 scroll-mt-8">
      <SectionMarker index="04" label="Selected Projects" />
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <h2 className="text-3xl sm:text-4xl text-stone-900 tracking-tight font-medium max-w-xl">
          Each card opens a working mock of the real product.
        </h2>
        <div className="font-mono text-xs text-stone-500">
          {PROJECTS.length} projects · click any card
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MODAL
   ────────────────────────────────────────────────────────────────────────── */

function Modal({ open, onClose, project, children }) {
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
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // focus close btn after small delay
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
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
        className="relative bg-stone-50 w-full sm:max-w-4xl sm:rounded-3xl rounded-t-3xl border border-stone-200 shadow-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden"
      >
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
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close dialog"
              className="shrink-0 w-10 h-10 rounded-full bg-stone-100 hover:bg-blue-500 hover:text-white text-stone-700 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">{children}</div>
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
          POS Bakso · interactive demo
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
        Interactive demo of POS Bakso, my point-of-sale project: customers
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
            className="mt-5 w-full py-2.5 rounded-full text-white text-sm font-medium hover:opacity-90 transition" style={{ backgroundColor: accent }}
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
                      style={{ backgroundColor: accent }}
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
          style={{ backgroundColor: accent }}
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
            Today · live demo data
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
        className={`font-medium text-stone-900 tracking-tight ${
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
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
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
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-medium hover:opacity-90 transition" style={{ backgroundColor: accent }}
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
                  style={on ? { backgroundColor: accent } : undefined}
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
                        style={{ backgroundColor: accent }}
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
                        style={p.featured ? { backgroundColor: accent } : undefined}
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
   DEMO 3 — AI DETECTION (parcel-delivery verification pipeline)
   ────────────────────────────────────────────────────────────────────────── */

// Fictional sample record for verification.
const PARCEL_EXPECTED = {
  trackingNumber: "TRK-8842-1097",
  packageFormat: "Standard Box — M",
};

// Bounding boxes on the illustrated parcel.
const PARCEL_BOXES = [
  { id: "pkg", label: "Package", conf: 0.94, x: 12, y: 22, w: 76, h: 64 },
  { id: "lbl", label: "Shipping label", conf: 0.91, x: 22, y: 32, w: 44, h: 30 },
];

const PIPELINE_STAGES = [
  { id: "detect", label: "Object Detection", icon: ScanLine },
  { id: "extract", label: "Text Extraction", icon: FileText },
  { id: "verify", label: "Verification", icon: ShieldCheck },
  { id: "result", label: "Result", icon: ClipboardCheck },
];

function AiDetectionDemo() {
  // stage: -1 idle, 0..3 active stage index, 4 finished
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
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
    trackingNumber: { value: "TRK-8842-1097", source: "OCR", conf: 0.95 },
    packageFormat: { value: "Standard Box — M", source: "OCR", conf: 0.92 },
    handwrittenNote: { value: "Fragile", source: "TrOCR", conf: 0.88 },
  };
  const checks = [
    {
      field: "Tracking Number",
      extracted: extracted.trackingNumber.value,
      expected: PARCEL_EXPECTED.trackingNumber,
      ok: extracted.trackingNumber.value === PARCEL_EXPECTED.trackingNumber,
    },
    {
      field: "Package Format",
      extracted: extracted.packageFormat.value,
      expected: PARCEL_EXPECTED.packageFormat,
      ok: extracted.packageFormat.value === PARCEL_EXPECTED.packageFormat,
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
            style={{ backgroundColor: accent }}
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
          Pipeline · YOLO + OCR + TrOCR · fictional sample
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
                  style={active ? { backgroundColor: accent } : undefined}
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
        {/* Illustrated parcel */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[5/4] rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
            <ParcelIllustration />

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
              PARCEL_BOXES.map((b, i) => (
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
                    style={{ backgroundColor: accent }}
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
                  label="Tracking Number"
                  value={extracted.trackingNumber.value}
                  source="OCR"
                  conf={extracted.trackingNumber.conf}
                  delay={0}
                />
                <ExtractedRow
                  label="Package Format"
                  value={extracted.packageFormat.value}
                  source="OCR"
                  conf={extracted.packageFormat.conf}
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

          {/* Verification */}
          <Panel title="Verification">
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

          {/* Result */}
          <Panel title="Result">
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
                      <ShieldCheck size={12} /> Valid
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
                    auto-filled summary
                  </span>
                </div>
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 space-y-1 font-mono text-[11px]">
                  <SummaryRow k="Tracking" v={extracted.trackingNumber.value} />
                  <SummaryRow k="Format" v={extracted.packageFormat.value} />
                  <SummaryRow k="Note" v={extracted.handwrittenNote.value} italic />
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>

      {/* NDA-safety caption */}
      <p className="mt-5 text-[11px] italic text-stone-500 leading-relaxed max-w-3xl">
        Interactive illustration of a computer-vision pipeline I built (object
        detection + OCR/TrOCR + automated validation). Demo uses fictional
        parcel-delivery data; the production system and its data are
        confidential.
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

// Pure CSS/SVG parcel illustration — no photo, no logos.
function ParcelIllustration() {
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
        <ellipse cx="100" cy="140" rx="68" ry="6" fill="rgba(0,0,0,0.12)" />
        {/* Box body (front face) */}
        <path
          d="M40 60 L100 40 L160 60 L160 124 L100 144 L40 124 Z"
          fill="#C9B496"
          stroke="#8C7656"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Box top */}
        <path
          d="M40 60 L100 40 L160 60 L100 80 Z"
          fill="#D7C19F"
          stroke="#8C7656"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Box side shading */}
        <path
          d="M100 80 L160 60 L160 124 L100 144 Z"
          fill="#B9A483"
          opacity="0.6"
        />
        {/* Tape seam */}
        <path d="M40 60 L100 80 L160 60" stroke="#8C7656" strokeWidth="1.2" fill="none" />
        <path d="M100 80 L100 144" stroke="#8C7656" strokeWidth="1.2" fill="none" />
        <rect
          x="74"
          y="62"
          width="52"
          height="6"
          fill="#E6D9BD"
          stroke="#8C7656"
          strokeWidth="0.6"
          transform="skewY(-18) translate(0,18)"
        />
        {/* Shipping label */}
        <g transform="translate(58 88)">
          <rect width="60" height="34" fill="#FAFAF7" stroke="#8C7656" strokeWidth="0.8" rx="1" />
          {/* Printed lines (mock) */}
          <rect x="4" y="4" width="38" height="2.5" fill="#1F1B16" />
          <rect x="4" y="9" width="28" height="1.6" fill="#6B6155" />
          <rect x="4" y="13" width="32" height="1.6" fill="#6B6155" />
          {/* Mock barcode */}
          <g transform="translate(4 18)">
            {Array.from({ length: 22 }).map((_, i) => (
              <rect
                key={i}
                x={i * 2.2}
                y="0"
                width={i % 3 === 0 ? 0.9 : 1.6}
                height="10"
                fill="#1F1B16"
              />
            ))}
          </g>
          {/* Handwritten "Fragile" — squiggle */}
          <path
            d="M 46 7 q 2 -3 4 0 t 4 0 t 4 0"
            fill="none"
            stroke="#9C2A2A"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M 46 11 q 2 -2 4 0 t 4 0 t 4 0"
            fill="none"
            stroke="#9C2A2A"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </g>
        {/* Corner edge highlights */}
        <path d="M40 60 L40 124" stroke="#A38C6B" strokeWidth="0.8" />
        <path d="M160 60 L160 124" stroke="#A38C6B" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-10 sm:py-14 border-t border-stone-200 mt-6">
      <SectionMarker index="05" label="Contact" />
      <div className="grid md:grid-cols-2 gap-10 items-end">
        <div>
          <h2 className="text-3xl sm:text-5xl text-stone-900 tracking-tight font-medium leading-tight">
            Let's build something.
          </h2>
          <p className="mt-4 text-stone-600 max-w-md leading-relaxed">
            Open to full-time, part-time, contract, and remote roles in mobile,
            computer vision, and full-stack — happy to chat about interesting
            problems.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as="a" href={`mailto:${IDENTITY.email}`}>
              <Mail size={15} />
              {IDENTITY.email}
            </Button>
            <Button as="a" href={IDENTITY.linkedinUrl} target="_blank" rel="noreferrer" variant="ghost">
              <Linkedin size={15} />
              LinkedIn
            </Button>
          </div>
        </div>
        <div className="font-mono text-xs text-stone-500 space-y-2 md:text-right">
          <div>© {new Date().getFullYear()} {IDENTITY.name}</div>
          <div>Built with React, Tailwind, and care.</div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   APP
   ────────────────────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [openId, setOpenId] = useState(null);
  const projectsRef = useRef(null);

  const open = (id) => setOpenId(id);
  const close = () => setOpenId(null);
  const project = PROJECTS.find((p) => p.id === openId);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 antialiased selection:bg-stone-900 selection:text-stone-50">
      {/* Inline keyframes (Tailwind core only) */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fadeIn .25s ease-out both; }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes pulseBox { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.85; } }
        @keyframes heroShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 70% 50%; } }
        .hero-gradient {
          color: #4F8BE4; /* fallback */
          background-image: linear-gradient(110deg, #4F8BE4 0%, #7DB3F5 60%, #4F8BE4 100%);
          background-size: 200% 100%;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: heroShift 7s ease-in-out infinite;
        }
        @supports not ((-webkit-background-clip: text) or (background-clip: text)) {
          .hero-gradient { color: #4F8BE4; -webkit-text-fill-color: currentColor; background-image: none; }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* top nav */}
      <nav className="sticky top-0 z-30 bg-stone-50/80 backdrop-blur border-b border-stone-200/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-stone-900">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            salmanfazz
          </a>
          <div className="hidden sm:flex items-center gap-7 font-mono text-xs uppercase tracking-widest text-stone-500">
            <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
            <a href="#work" className="hover:text-blue-600 transition">Work</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </div>
          <Button as="a" href={`mailto:${IDENTITY.email}`} variant="ghost" className="!px-3 !py-1.5 !text-xs">
            Get in touch
          </Button>
        </div>
      </nav>

      <main id="top" className="max-w-5xl mx-auto px-5 sm:px-8">
        <Hero onViewProjects={scrollToProjects} />
        <Skills />
        <div id="work">
          <Experience />
        </div>
        <EducationAndResearch />
        <div ref={projectsRef}>
          <Projects onOpen={open} />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </main>

      <Modal open={!!project} onClose={close} project={project}>
        {project?.id === "pos-bakso" && <PosDemo />}
        {project?.id === "affiliate-reco" && <AffiliateDemo />}
        {project?.id === "ai-detection" && <AiDetectionDemo />}
      </Modal>
    </div>
  );
}

