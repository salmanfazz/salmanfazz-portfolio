/**
 * The page shell: nav, hero, projects, statement, stack, work, education and the closing footer.
 *
 * Markup and class names follow the design kit in public/assets (system.css,
 * ui/, diagrams/, motion/, layout/). The kit's scripts animate this markup once
 * it is in the document: the hero's entrance, hovers and presses, the chat loop
 * in the hero window, the order ticking through its steps, the diagram's pulse
 * under the pointer and the statement that ripples like water. So this file
 * holds no animation code of its own.
 *
 * The three parts render through portals into the static <header>, <main> and
 * <footer> of index.html. The shell is memoised and its props never change, so
 * React does not touch these nodes again after the first render and the kit is
 * free to work on them.
 */

import React, { memo } from "react";
import { createPortal } from "react-dom";

const ICONS = "/assets/icons";

const Html = ({ as: Tag = "div", html, ...props }) => (
  <Tag {...props} dangerouslySetInnerHTML={{ __html: html }} />
);

const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

const ToolTile = ({ tool, size = 72 }) => (
  <span className={`ic-tile ic-tile--${size}`}>
    <img className={`ic${tool.shape ? ` ${tool.shape}` : ""}`} src={`${ICONS}/${tool.icon}.svg`} alt="" width={tool.w} height={tool.h} loading="lazy" />
  </span>
);

/* ──────────────────────────────────────────────────────────────────────────
   UI FRAGMENTS (kit markup from public/assets/ui, rewritten to the projects)
   ────────────────────────────────────────────────────────────────────────── */

const FILE_ICON = '<svg class="ui-icon" viewBox="0 0 16 16"><path d="M4 2.5h5l3 3v8H4z"/><path d="M9 2.5v3h3"/></svg>';
const TAG_ICON = '<svg class="ui-icon" viewBox="0 0 16 16"><path d="M2.5 8.2V3h5.2l5.8 5.8-5.2 5.2z"/><circle cx="5.6" cy="6.1" r=".9"/></svg>';
const TICK = '<span class="ui-check__box"><svg viewBox="0 0 16 16"><path d="m4.5 8.2 2.3 2.3 4.7-5"/></svg></span>';

// AI Worker: the open conversations of a travel agency (sample requests from the three journeys of
// the application-flow illustration; the names are illustrative)
const INBOX_ROWS = [
  ["BU", 1, "Budi", "What the Umrah package includes", "Open", "", "2m"],
  ["SI", 3, "Siti", "Booking two places", "Open", "", "6m"],
  ["AN", 4, "Andi", "Deposit proof sent", "Open", "", "11m"],
  ["RI", 2, "Rina", "Discount for our group", "Needs you", "is-you", "18m"],
  ["DE", 5, "Dewi", "Hotel near the Haram", "Replied", "is-done", "24m"],
  ["AG", 3, "Agus", "Departure dates for June", "Replied", "is-done", "31m"],
  ["PU", 1, "Putri", "Room for two parents", "Replied", "is-done", "38m"],
  ["HE", 4, "Hendra", "Manasik class schedule", "Replied", "is-done", "44m"],
  ["YU", 5, "Yusuf", "Passport renewal steps", "Replied", "is-done", "52m"],
];

const inboxHtml = `
<div class="ui ui-panel ui-win" data-ui="window" data-open="Open" data-work="Working" data-done="Replied">
  <div class="ui-win__bar">
    <span class="ui-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="ui-win__crumb">AI Worker <i>/</i> <b>Open</b></span>
    <span class="ui-spacer"></span>
    <span class="ui-win__search" aria-hidden="true"><svg class="ui-icon" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></svg><span class="ui-win__ph">Search</span><span class="ui-kbd">/</span></span>
  </div>
  <div class="ui-win__body">
    <nav class="ui-win__side" aria-hidden="true">
      <span class="ui-win__nav is-on"><svg class="ui-icon" viewBox="0 0 16 16"><path d="M2.5 9h3l1 1.5h3l1-1.5h3"/><path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z"/></svg>Open<em>4</em></span>
      <span class="ui-win__nav"><svg class="ui-icon" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 1.5"/></svg>Waiting<em>1</em></span>
      <span class="ui-win__nav"><svg class="ui-icon" viewBox="0 0 16 16"><path d="m3.5 8.4 2.8 2.8 6.2-6.4"/></svg>Replied</span>
      <span class="ui-win__label">Views</span>
      <span class="ui-win__nav"><span class="ui-win__hash">#</span>Bookings</span>
      <span class="ui-win__nav"><span class="ui-win__hash">#</span>Visas</span>
    </nav>
    <div class="ui-win__main">
      <div class="ui-win__cols" aria-hidden="true"><span>Customer</span><span>Request</span><span>Status</span><span>Age</span></div>
      <ul class="ui-win__rows">
        ${INBOX_ROWS.map(
          ([initials, tone, who, sub, status, cls, age]) =>
            `<li class="ui-win__row" data-row><span class="ui-avatar" data-tone="${tone}">${initials}</span><span class="ui-win__who">${who}</span><span class="ui-win__sub">${sub}</span><span class="ui-win__st${cls ? ` ${cls}` : ""}" data-st>${status}</span><span class="ui-win__age">${age}</span></li>`
        ).join("")}
      </ul>
    </div>
  </div>
</div>`;

const threadHtml = `
<div class="ui ui-panel ui-chat" data-ui="chat">
  <div class="ui-head">
    <span class="ui-agent" aria-hidden="true"></span>
    <div class="ui-title">AI Worker</div>
    <span class="ui-chat__online">In development</span>
    <span class="ui-spacer"></span>
  </div>
  <div class="ui-chat__body">
    <div class="ui-chat__day">Today, 10:42</div>
    <div class="ui-msg ui-msg--me" data-chat-q>
      <span class="ui-msg__text">What is included in your Umrah package?</span>
    </div>
    <div class="ui-msg ui-msg--bot" data-chat-a>
      <span class="ui-agent ui-msg__av" aria-hidden="true"></span>
      <span class="ui-msg__col">
        <span class="ui-chat__answer">The package includes the services listed in our itinerary. I can help you check <b>available departures</b>.</span>
        <span class="ui-chat__srcs">
          <span class="ui-chat__src">${FILE_ICON}Package itinerary</span>
          <span class="ui-chat__src">${FILE_ICON}Departure schedule</span>
        </span>
      </span>
    </div>
  </div>
  <div class="ui-chat__input">
    <span class="ui-chat__ph">Write a message</span>
    <span class="ui-chat__send" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 13V3.5M3.8 7.5 8 3.3l4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  </div>
</div>`;

// AI Worker: what it may do on its own and what a person decides (the three journeys of the
// application-flow illustration: grounded answer, staff approval, booking and deposit)
const SWITCH = (label, on) => `<button class="ui-switch${on ? " is-on" : ""}" type="button" role="switch" aria-checked="${on}" aria-label="${label}" tabindex="-1"><i></i></button>`;
const LEVELS = [
  ["Answer from agency knowledge", "Automatic when grounded", true],
  ["Draft sensitive replies", "Held for staff approval", true],
  ["Create booking requests", "Seat confirmed after the deposit check", true],
  ["Verify deposits, give discounts", "Decided by a person", false],
];
// The card loops by itself (asked for on 2026-11-14, with AI Detection, beside POS Bakso's). Its
// cycle flips only the two rows staff may switch, drafting and booking, and comes back to the
// written state every two cycles: the first row stays on and the last, a person's decision, stays off.
const levelsHtml = `
<div class="ui ui-panel ui-toggles" data-ui="toggles" data-ui-opts='{"order":[1,2,2,1]}'>
  <div class="ui-head">
    <svg class="ui-icon ui-toggles__ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8 13 4v3.6c0 3-2.1 5.4-5 6.6-2.9-1.2-5-3.6-5-6.6V4z"/><path d="m5.8 8 1.6 1.6 3-3.2"/></svg>
    <div class="ui-title">What AI Worker may do</div>
    <span class="ui-spacer"></span>
    <div class="ui-meta" data-tg-count>3 of 4 on</div>
  </div>
  <ul class="ui-toggles__list">
    ${LEVELS.map(([label, sub, on]) => `<li class="ui-tg"><span class="ui-tg__text"><span class="ui-tg__label">${label}</span><span class="ui-tg__sub">${sub}</span></span>${SWITCH(label, on)}</li>`).join("")}
  </ul>
</div>`;

// POS Bakso: one order's life, from the table QR to the payment
const orderHtml = `
<div class="ui ui-panel ui-checks" data-ui="checklist">
  <div class="ui-checks__head">
    <div class="ui-title">Table 4 · Mie Bakso ×2</div>
    <span class="ui-spacer"></span>
    <div class="ui-meta" data-checks-count>2 of 5</div>
  </div>
  <div class="ui-checks__bar"><i data-checks-bar style="--k:0.4"></i></div>
  <ul class="ui-checks__list">
    <li class="ui-check is-done">${TICK}<span class="ui-check__label">Ordered from the table QR</span></li>
    <li class="ui-check is-done">${TICK}<span class="ui-check__label">Confirmed by the admin</span></li>
    <li class="ui-check">${TICK}<span class="ui-check__label">Prepared in the kitchen</span></li>
    <li class="ui-check">${TICK}<span class="ui-check__label">Served and completed</span></li>
    <li class="ui-check">${TICK}<span class="ui-check__label">Paid, Rp 36.000</span></li>
  </ul>
</div>`;

// Affiliate app: the admin's product list (the demo's own products; "Featured" lifts one in the user app)
const PRODUCT_ROWS = [
  ["BE", 1, "Bluetooth Earbuds X2", "Budget, electronics · Rp 249.000", "Featured", "is-done", "4.4"],
  ["NH", 3, "Noise-Cancelling Headphones", "Premium, electronics · Rp 1.899.000", "Listed", "", "4.7"],
  ["SL", 4, "Smart LED Bulb (4-pack)", "Budget, home · Rp 189.000", "Listed", "", "4.3"],
  ["EM", 2, "Ergonomic Mesh Chair", "Premium, home, office · Rp 2.350.000", "Featured", "is-done", "4.6"],
  ["YM", 5, "Yoga Mat 6mm", "Budget, fitness · Rp 159.000", "Listed", "", "4.5"],
  ["AD", 3, "Adjustable Dumbbell 24kg", "Premium, fitness · Rp 1.499.000", "Featured", "is-done", "4.8"],
  ["MK", 1, "Mechanical Keyboard 75%", "Electronics, office · Rp 899.000", "Listed", "", "4.6"],
  ["AS", 4, "Aroma Diffuser Stone", "Budget, home · Rp 219.000", "Listed", "", "4.2"],
];

const productsHtml = `
<div class="ui ui-panel ui-win" data-ui="window" data-open="Listed" data-work="Updating" data-done="Featured">
  <div class="ui-win__bar">
    <span class="ui-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="ui-win__crumb">Affiliate admin <i>/</i> <b>Products</b></span>
    <span class="ui-spacer"></span>
    <span class="ui-win__search" aria-hidden="true"><svg class="ui-icon" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></svg><span class="ui-win__ph">Search</span><span class="ui-kbd">/</span></span>
  </div>
  <div class="ui-win__body">
    <nav class="ui-win__side" aria-hidden="true">
      <span class="ui-win__nav is-on">${TAG_ICON}All<em>8</em></span>
      <span class="ui-win__nav"><svg class="ui-icon" viewBox="0 0 16 16"><path d="m3.5 8.4 2.8 2.8 6.2-6.4"/></svg>Featured<em>3</em></span>
      <span class="ui-win__label">Tags</span>
      <span class="ui-win__nav"><span class="ui-win__hash">#</span>Budget</span>
      <span class="ui-win__nav"><span class="ui-win__hash">#</span>Premium</span>
      <span class="ui-win__nav"><span class="ui-win__hash">#</span>Home</span>
    </nav>
    <div class="ui-win__main">
      <div class="ui-win__cols" aria-hidden="true"><span>Product</span><span>Tags and price</span><span>Status</span><span>Rating</span></div>
      <ul class="ui-win__rows">
        ${PRODUCT_ROWS.slice(0, 6).map(
          ([initials, tone, who, sub, status, cls, rating]) =>
            `<li class="ui-win__row" data-row><span class="ui-avatar" data-tone="${tone}">${initials}</span><span class="ui-win__who">${who}</span><span class="ui-win__sub">${sub}</span><span class="ui-win__st${cls ? ` ${cls}` : ""}" data-st>${status}</span><span class="ui-win__age">${rating}</span></li>`
        ).join("")}
      </ul>
    </div>
  </div>
</div>`;

// AI Detection System: the pipeline's four stages, in the order they run (the stages of the demo).
// Written with the run already passed, which is the picture it rests on: a cycle presses "Run again",
// runs the stages from the first to the last, and ends on this passed run again.
const STAGE_TICK = '<span class="ui-pipe__ico"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 8.2 2.3 2.3 4.7-5"/></svg></span>';
const STAGES = [
  ["detect", "Object detection", "YOLOv10m", "1s"],
  ["extract", "Text reading", "RapidOCR, TrOCR", "2s"],
  ["verify", "Work-order check", "expected data", "1s"],
  ["result", "Suggestion", "reviewer decides", "1s"],
];
const detectionHtml = `
<div class="ui ui-panel ui-pipe" data-ui="pipeline-board">
  <div class="ui-pipe__head">
    <svg class="ui-icon ui-pipe__branch" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 5.5v-3h3M10.5 2.5h3v3M13.5 10.5v3h-3M5.5 13.5h-3v-3M4.5 8h7"/></svg>
    <span class="ui-pipe__repo">AI Detection</span><i class="ui-pipe__slash">/</i><code class="ui-pipe__ref">pipeline</code>
    <span class="ui-spacer"></span>
    <span class="ui-pipe__total"><svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8.5" r="5.5"/><path d="M8 5.5v3l2 1.25M6.5 1.75h3"/></svg><span data-pipe-total>5s</span></span>
    <span class="ui-chip ui-chip--ink ui-chip--live ui-pipe__chip" data-pipe-chip data-done="Suggested">Running</span>
  </div>
  <div class="ui-pipe__commit">
    <span class="ui-avatar" data-tone="4"><svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 5h2.2l1-1.5h4.6l1 1.5h2.2v7.5h-11z"/><circle cx="8" cy="8.6" r="2.2"/></svg></span>
    <span class="ui-pipe__msg">Field photo received</span>
    <code class="ui-pipe__sha">sample</code>
    <button class="ui-btn ui-btn--ghost ui-btn--sm ui-pipe__btn" type="button" tabindex="-1" data-pipe-btn data-done="Run again">Cancel</button>
  </div>
  <ol class="ui-pipe__steps">
    ${STAGES.map(
      ([id, name, tool, time]) =>
        `<li class="ui-pipe__step is-done" data-step="${id}">${STAGE_TICK}<span class="ui-pipe__name"><span class="ui-pipe__nm">${name}</span></span><code class="ui-pipe__cmd">${tool}</code><span class="ui-pipe__time" data-time="${time}">${time}</span><span class="ui-pipe__bar"><i></i></span></li>`
    ).join("")}
  </ol>
</div>`;

/* ──────────────────────────────────────────────────────────────────────────
   DIAGRAMS (public/assets/diagrams draws them from these specs)
   ────────────────────────────────────────────────────────────────────────── */

// "lanes" keeps every node's name on a phone, where the diagram stands upright
const DETECTION_PIPELINE = JSON.stringify({
  layout: "lanes",
  ground: "none",
  alt: "A field photo goes from the review application to the FastAPI detector services, which check Equipment 1 and Equipment 2 and return suggested checks for a reviewer to decide on.",
  input: { label: "Field photo", icon: "ui:camera", sub: "Review application" },
  core: { label: "Detector APIs", icon: "fastapi" },
  lanes: [
    { label: "Equipment 1 checked", icon: "ui:scan-line", done: true, sub: "YOLOv10m, OCR" },
    { label: "Equipment 2 checked", icon: "ui:file-text", done: true, sub: "YOLO OBB, rules" },
    { label: "Reviewer decides", icon: "ui:clipboard-check", done: true, sub: "Decision stored" },
  ],
});

const PAPER = JSON.stringify({
  layout: "lanes",
  ground: "none",
  motion: { pulse: "none" },
  alt: "Game and application purchases on Steam go into K-Means clustering, which gives the purchasing patterns published in the journal paper.",
  input: { label: "Steam purchases", icon: "steam", sub: "Games, applications" },
  core: { label: "K-Means", icon: "ui:chart-scatter" },
  lanes: [
    { label: "Purchasing patterns", icon: "ui:shapes", done: true, sub: "Clusters" },
    { label: "Journal paper", icon: "ui:file-text", done: true, sub: "SISFOKOM, SINTA 3" },
  ],
});

// One placement for the four project visuals: centred in its panel, both ways. w and h are the
// fragment's own size. A panel too short for it (a small laptop, a phone) keeps the fragment's head
// 24px under its top and lets the foot run out under the panel's fade.
const centred = (w, h) => ({
  "--fit-max": `${w}px`,
  "--ax": `max(24px, 50% - ${w / 2}px)`,
  "--ay": `max(24px, calc(50% - ${h / 2}px))`,
  "--ay-sm": "24px",
});

// What each project card says and shows. The ids match PROJECTS in App.jsx.
const PROJECT_CARDS = {
  "ai-worker": {
    title: "AI Worker plans, acts and checks",
    body: "An AI employee that answers WhatsApp customers for Umrah and Haji agencies. A local prototype, shown in two illustrations.",
    menu: "WhatsApp AI employee, local prototype",
    tools: ["python", "fastapi", "postgresql"],
    panel: (
      <div className="panel">
        <div className="stage stage--fade-b">
          <Html className="at-rise fit" style={centred(380, 286)} data-ui-loop="" html={levelsHtml} />
        </div>
      </div>
    ),
  },
  "pos-bakso": {
    title: "POS Bakso takes orders by table QR",
    body: "Customers order from a QR code at their table. The admin dashboard confirms, prepares, completes and settles each order.",
    menu: "QR table ordering with an admin dashboard",
    tools: ["react", "nestjs", "playwright"],
    panel: (
      <div className="panel">
        <div className="stage stage--fade-b">
          <Html className="at-rise fit" style={centred(340, 268)} data-ui-loop="" html={orderHtml} />
        </div>
      </div>
    ),
  },
  "affiliate-reco": {
    title: "Affiliate app recommends products",
    body: "The admin panel manages the product list. The user app filters it by tag and puts featured and best-rated products first.",
    menu: "Admin panel and a recommending user app",
    tools: ["typescript", "tailwindcss", "vitest"],
    panel: (
      <div className="panel">
        <div className="stage stage--fade-b">
          <Html className="at-rise fit" style={centred(560, 342)} data-ui-still="" html={productsHtml} />
        </div>
      </div>
    ),
  },
  "ai-detection": {
    title: "AI Detection System verifies photos",
    body: "Two detectors check field photos. YOLO finds the equipment, OCR reads its identifier and a reviewer decides.",
    menu: "Detection, text reading and human review",
    tools: ["opencv", "python", "docker"],
    panel: (
      <div className="panel">
        <div className="stage stage--fade-b">
          <Html className="at-rise fit" style={centred(420, 256)} data-ui-loop="" html={detectionHtml} />
        </div>
      </div>
    ),
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   NAV
   ────────────────────────────────────────────────────────────────────────── */

function Nav({ identity, projects, tools, onOpen }) {
  // the stack's tools by icon: every mark a menu tile shows is one of the stack grid's
  const toolById = Object.fromEntries(tools.map((t) => [t.icon, t]));
  return (
    <div className="wrap nav__bar">
      <a className="skip-link" href="#top">Skip to content</a>
      <a className="nav__logo" href="#top">
        <span className="mark mark--initial" aria-hidden="true">S</span>
        {identity.shortName}
      </a>
      <nav className="nav__links" aria-label="Main">
        <div className="nav__item">
          <a className="nav__link" href="#projects">
            Projects{" "}
            <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="nav__menu">
            <div className="wrap grid">
              {projects.map((p) => {
                const card = PROJECT_CARDS[p.id];
                return (
                  <a key={p.id} className="menu-card span-3" href={`?project=${p.id}`} onClick={(e) => onOpen(p.id, e)}>
                    <div className="panel">
                      <div className="stage">
                        <div className="at-center tools-row">
                          {card.tools.map((id) => <ToolTile key={id} tool={toolById[id]} size={56} />)}
                        </div>
                      </div>
                    </div>
                    <span className="t-card">{p.name}</span>
                    <span className="t-small muted">{card.menu}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="nav__item"><a className="nav__link" href="#stack">Stack</a></div>
        <div className="nav__item"><a className="nav__link" href="#work">Work</a></div>
        <div className="nav__item"><a className="nav__link" href="#education">Education</a></div>
      </nav>
      <div className="nav__actions">
        <a className="nav__link" href={identity.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="btn btn--primary" href={`mailto:${identity.email}`}>Get in touch</a>
      </div>
      <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   HERO (dealt: centred headline over one window)
   ────────────────────────────────────────────────────────────────────────── */

function Hero({ identity }) {
  return (
    <section className="hero hero--centred" data-enter="" aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text">
          <div className="hero__c">
            <a className="pill" href={identity.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <span>Available for work</span><span className="muted">Remote and on-site</span>
            </a>
            <h1 id="hero-h">{identity.headline}</h1>
            <p className="hero__lead">
              I shipped computer-vision systems to production, and I&rsquo;m building agentic AI that does real business work.
            </p>
            <div className="btn-row">
              <a className="btn btn--primary" href={`mailto:${identity.email}`}>Get in touch</a>
              <a className="btn btn--secondary" href="#projects">See the projects</a>
            </div>
          </div>
          <div
            className="hero__window"
            data-fx="silk-folds"
            data-fx-seed="14"
            data-fx-params='{"speed":0,"tone":1,"calm":0.7}'
            role="img"
            aria-label="AI Worker, in development: its answer to a customer asking what the Umrah package includes, beside the list of open conversations"
          >
            <div className="ly-piece ui app" aria-hidden="true" data-ui-pause-host="">
              <Html className="app__pane app__pane--list" html={inboxHtml} />
              <Html className="app__pane app__pane--open" data-ui-loop="" html={threadHtml} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   PROJECTS (features-2x2; every card opens its illustration)
   ────────────────────────────────────────────────────────────────────────── */

function ProjectCard({ project, onOpen }) {
  const card = PROJECT_CARDS[project.id];
  return (
    <article
      className="card card--row card--open span-6"
      id={`project-${project.id}`}
      style={{ cursor: "pointer" }}
      onClick={(e) => onOpen(project.id, e)}
    >
      <h3>
        <a className="link" href={`?project=${project.id}`}>{card.title}</a>
      </h3>
      <p>{card.body}</p>
      {card.panel}
    </article>
  );
}

function Projects({ projects, onOpen }) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-h" data-screen="free">
      <div className="wrap">
        <div className="section-head">
          <h2 id="projects-h">
            Engineering projects you can open. <span className="muted">Each is an illustration of work under NDA.</span>
          </h2>
        </div>
        <div className="grid">
          {projects.map((p) => <ProjectCard key={p.id} project={p} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STACK (the skills and methods without a logo in the lead line, then sixteen
   real marks in one mosaic: the section's picture, named for screen readers)
   ────────────────────────────────────────────────────────────────────────── */

function Stack({ tools, words }) {
  return (
    <section className="section ground-surface" id="stack" aria-labelledby="stack-h" data-screen="free">
      <div className="wrap">
        <div className="section-head">
          <h2 id="stack-h">
            The stack behind the projects. <span className="muted">Mobile, web, computer vision and agents.</span>
          </h2>
          <p className="skills">Also in the stack: {words.slice(0, -1).join(", ")} and {words[words.length - 1]}.</p>
        </div>
        <div className="ic-grid ic-grid--mosaic tools" role="img" aria-label={`Tools: ${tools.map((t) => t.name).join(", ")}`}>
          {tools.map((t) => (
            <div className="ic-cell" key={t.icon}>
              <ToolTile tool={t} size={40} />
              <div>
                <div className="ic-cell__name">{t.name}</div>
                <div className="ic-cell__meta">{t.area}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STATEMENT (the dealt moment, liquid-type: the headline ripples like water
   under the pointer and settles; plain type on touch and reduced motion)
   ────────────────────────────────────────────────────────────────────────── */

function Statement({ steps }) {
  return (
    <section className="section statement" id="focus" aria-labelledby="focus-h" data-screen="free">
      <div className="wrap">
        <div className="grid">
          <div className="span-7" data-moment="liquid-type" data-moment-opts='{"strength": 0.8}'>
            <h2 className="mo-lt__type" id="focus-h">Agentic AI that does real work</h2>
            <p className="t-lead focus-lead">
              AI Worker answers WhatsApp customers for Umrah and Haji travel agencies. The model proposes; trust rules and people decide.
            </p>
          </div>
          <ol className="rows span-5">
            {steps.map((step) => (
              <li key={step.id}>
                <span className="rows__name">{step.label}</span>
                <p>{step.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   WORK (the production pipeline as a diagram, then the current role and the
   two internships)
   ────────────────────────────────────────────────────────────────────────── */

const EarlierRole = ({ role }) => (
  <li>
    <span className="rows__name">{role.role}</span>
    <p>{role.company}, {role.period}. {role.bullets.join(" ")}</p>
  </li>
);

function Work({ experience }) {
  const [current, ...earlier] = experience;
  const half = Math.ceil(current.bullets.length / 2);
  return (
    <section className="section" id="work" aria-labelledby="work-h" data-screen="free">
      <div className="wrap">
        <div className="section-head">
          <h2 id="work-h">Work history since 2019</h2>
          <p>
            {current.role} at {current.company}, {current.period}. {current.summary}
          </p>
        </div>
        <div className="panel">
          <div className="dg" data-diagram={DETECTION_PIPELINE} data-dg-still="" />
        </div>
        <div className="work-detail">
          <div className="stack-5">
            <h3 className="t-card">{current.company}, {current.period}</h3>
            <div className="grid">
              <ul className="rows span-6">
                {current.bullets.slice(0, half).map((b) => <li key={b}><p>{b}</p></li>)}
              </ul>
              <ul className="rows span-6">
                {current.bullets.slice(half).map((b) => <li key={b}><p>{b}</p></li>)}
              </ul>
            </div>
          </div>
          <div className="stack-5">
            <h3 className="t-card">Internships in 2023 and 2019</h3>
            <div className="grid">
              {earlier.map((e) => (
                <ul className="rows span-6" key={e.company}>
                  <EarlierRole role={e} />
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   EDUCATION (the degree, the paper and the certificates beside the paper's
   method as a diagram, the panel as tall as the rows)
   ────────────────────────────────────────────────────────────────────────── */

function Education({ education }) {
  return (
    <section className="section" id="education" aria-labelledby="education-h" data-screen="free">
      <div className="wrap">
        <div className="grid">
          <div className="span-7 stack-6">
            <h2 id="education-h">Education and research since 2020</h2>
            <ul className="rows">
              <li>
                <span className="rows__name">{education.degree}</span>
                <p>{education.school}, {education.period}. {education.gpa}.</p>
              </li>
              <li>
                <span className="rows__name">{education.publication.venue}</span>
                <p>
                  <a className="link" href={education.publication.url} target="_blank" rel="noopener noreferrer">
                    {education.publication.title}
                  </a>
                </p>
              </li>
              <li>
                <span className="rows__name">Certifications</span>
                <p>{education.certifications.join(". ")}.</p>
              </li>
            </ul>
          </div>
          <div className="panel span-5">
            <div className="dg" data-diagram={PAPER} data-dg-still="" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CLOSE AND FOOTER (the heading and the button on one row, on the
   footer-statement slab; the name set across it was removed on request)
   ────────────────────────────────────────────────────────────────────────── */

function Closing({ identity, projects, onOpen }) {
  // the WhatsApp link: the address given in the data, else one made from the number's digits (never
  // from a placeholder that still has an X in it)
  const waDigits = /x/i.test(identity.whatsapp) ? "" : identity.whatsapp.replace(/\D/g, "");
  const waUrl = identity.whatsappUrl || (waDigits ? `https://wa.me/${waDigits}` : null);
  return (
    <div className="wrap">
      <div className="closing__cta close--word">
        <div className="section-head--split">
          <div>
            <h2 id="close-h">Let&rsquo;s build something.</h2>
            <p className="t-lead">
              Open to full-time, part-time, contract, and remote roles in AI engineering, full-stack, and computer vision — happy to chat about interesting problems. Write to {identity.email} or message <span style={{ whiteSpace: "nowrap" }}>{identity.whatsapp}</span> on WhatsApp.
            </p>
          </div>
          <a className="btn btn--primary" href={`mailto:${identity.email}`}>
            Get in touch
            <Arrow />
          </a>
        </div>
      </div>
      <div className="closing__links">
        <div className="grid">
          <div className="span-4">
            <p className="footer__lede">{identity.title} in {identity.location}.</p>
          </div>
          <div className="span-2 footer__col">
            <h3>Projects</h3>
            <ul>
              {projects.map((p) => (
                <li key={p.id}>
                  <a href={`?project=${p.id}`} onClick={(e) => onOpen(p.id, e)}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="span-2 footer__col">
            <h3>Background</h3>
            <ul>
              <li><a href="#stack">Stack</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#education">Education</a></li>
            </ul>
          </div>
          <div className="span-2 footer__col">
            <h3>Code</h3>
            <ul>
              <li><a href={identity.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="span-2 footer__col">
            <h3>Contact</h3>
            <ul>
              <li><a href={identity.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li>{waUrl ? <a href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> : <span>WhatsApp</span>}</li>
            </ul>
          </div>
        </div>
        <div className="footer__legal">
          <span>&copy; {new Date().getFullYear()} {identity.name}. Product names and logos are trademarks of their owners.</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SHELL
   ────────────────────────────────────────────────────────────────────────── */

function Shell({ identity, projects, experience, education, tools, words, agentSteps, onOpen }) {
  const header = document.querySelector("header.nav");
  const main = document.querySelector("main#top");
  const footer = document.querySelector("footer.closing");
  return (
    <>
      {createPortal(<Nav identity={identity} projects={projects} tools={tools} onOpen={onOpen} />, header)}
      {createPortal(
        <>
          <Hero identity={identity} />
          <Projects projects={projects} onOpen={onOpen} />
          <Statement steps={agentSteps} />
          <Stack tools={tools} words={words} />
          <Work experience={experience} />
          <Education education={education} />
        </>,
        main
      )}
      {createPortal(<Closing identity={identity} projects={projects} onOpen={onOpen} />, footer)}
    </>
  );
}

export default memo(Shell);
