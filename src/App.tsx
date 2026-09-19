import { type MouseEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  Code2,
  DatabaseZap,
  ExternalLink,
  FileSearch,
  Github,
  Layers3,
  Mail,
  Menu,
  MessageSquareCode,
  Network,
  Phone,
  Play,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Video,
  Workflow,
  X,
} from "lucide-react";

type Page = "home" | "proof" | "work" | "services" | "approach" | "about" | "contact";

type Demo = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  source: string;
  duration: string;
  bullets: string[];
};

type WorkItem = {
  eyebrow: string;
  title: string;
  summary: string;
  problem: string;
  shipped: string[];
  proof: string;
  links: { label: string; href: string; icon?: "github" | "external" }[];
};

type PageLink = {
  page: Page;
  label: string;
  text: string;
  icon: typeof Video;
};

const routeByPage: Record<Page, string> = {
  home: "/",
  proof: "/proof",
  work: "/work",
  services: "/services",
  approach: "/approach",
  about: "/about",
  contact: "/contact",
};

const navItems: { page: Page; label: string; cta?: boolean }[] = [
  { page: "proof", label: "Proof" },
  { page: "work", label: "Work" },
  { page: "services", label: "Services" },
  { page: "approach", label: "Approach" },
  { page: "about", label: "About" },
  { page: "contact", label: "Start a project", cta: true },
];

const demos: Demo[] = [
  {
    id: "vector",
    kicker: "AI + DATA",
    title: "Vector search with SQL Server",
    description:
      "A practical walkthrough of embeddings, semantic retrieval, cosine similarity, and a hybrid SQL + Python implementation built around real structured data.",
    source: "https://unwhelm.net/assets/VectorDB.mp4",
    duration: "Technical walkthrough",
    bullets: [
      "Store and query high-dimensional embeddings",
      "Use semantic retrieval where exact SQL filters break down",
      "Bridge database capabilities with Python when platform features are incomplete",
      "Keep deterministic SQL filters beside semantic retrieval",
    ],
  },
  {
    id: "rag",
    kicker: "AI + APPLICATION ARCHITECTURE",
    title: "Building a local RAG application",
    description:
      "A working retrieval-augmented chatbot: source ingestion, embeddings, nearest-neighbor retrieval, routing, prompt construction, and locally hosted models.",
    source: "https://unwhelm.net/assets/UnwhelmNetChatRAG.mp4",
    duration: "Architecture + demo",
    bullets: [
      "Treat source content and retrieval as explicit application layers",
      "Keep local and commercial model options behind a controlled boundary",
      "Show the limits of underpowered infrastructure instead of hiding them",
      "Separate source content, retrieval, model choice, and response construction",
    ],
  },
  {
    id: "contact",
    kicker: "FULL-STACK INTEGRATION",
    title: "Website-to-inbox engagement flow",
    description:
      "A public form moving through validation, Node/Express, environment-specific deployment, and Microsoft Graph message delivery.",
    source: "https://unwhelm.net/assets/unwhelmNodeNet_ContactUs.mp4",
    duration: "End-to-end demo",
    bullets: [
      "Production-oriented form handling, validation, and error handling",
      "Credential boundaries and environment separation",
      "Microsoft Graph integration for reliable delivery",
    ],
  },
  {
    id: "dotnet",
    kicker: ".NET + APIs",
    title: ".NET Core API integration",
    description:
      "A long-form implementation walkthrough covering REST services, authentication, databases, and enterprise integration patterns.",
    source: "https://unwhelm.net/assets/net-core-api-full.mp4",
    duration: "51:52",
    bullets: [
      "REST API design, service contracts, and integration boundaries",
      "Authentication and database connectivity",
      "Practical automation patterns for business systems",
    ],
  },
];

const work: WorkItem[] = [
  {
    eyebrow: "FLAGSHIP PLATFORM",
    title: "Adventure Maker by Act",
    summary:
      "A full-stack structured-content platform with canonical data ownership, import/export, publishing, integrations, and controlled AI tooling.",
    problem:
      "Adventure content was spread across documents, maps, stat blocks, exports, VTT workflows, and AI helpers with no single durable model.",
    shipped: [
      "React + TypeScript + Express + PostgreSQL/Prisma product surface",
      "MCP tools that call the same API as the application",
      "Wanderer's Guide, Owlbear Rodeo, map, publishing, and rules-data integrations",
      "Versioned schemas and validation around AI-assisted authoring",
    ],
    proof: "Live app, public repo, published help system, API docs, and demoable workflows.",
    links: [
      { label: "Live application", href: "https://amba.unwhelm.online", icon: "external" },
      {
        label: "GitHub",
        href: "https://github.com/edmund-landgraf/AdventureMakerByAct",
        icon: "github",
      },
    ],
  },
  {
    eyebrow: "VTT EXTENSION",
    title: "AMBA to Owlbear Rodeo",
    summary:
      "A companion extension that respects Owlbear's SDK and ownership boundary while moving structured AMBA data into the tabletop surface.",
    problem:
      "The source application and the VTT each own different state; pretending otherwise creates brittle imports and confusing sync behavior.",
    shipped: [
      "Map and token placement through supported Owlbear APIs",
      "Stable metadata for re-import and upsert behavior",
      "Visual/stat-card validation and production hosting documentation",
      "Clear boundary between source content and table state",
    ],
    proof: "Public extension repo with integration-focused implementation details.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/edmund-landgraf/Amba-Owlbear-Extension",
        icon: "github",
      },
    ],
  },
  {
    eyebrow: "BUSINESS AUTOMATION",
    title: "Property-management systems integration",
    summary:
      "API, ETL, reporting, document, and workflow automation around property-management operations and line-of-business data.",
    problem:
      "Operational teams often live between Propertyware, AppFolio, spreadsheets, forms, email, documents, SQL reports, and manual reconciliation.",
    shipped: [
      "Propertyware / AppFolio integration patterns",
      "JotForm, document, leasing, and operational workflow automation",
      "SQL Server, ETL, reporting, and data cleanup pipelines",
      "Business processes translated into maintainable software",
    ],
    proof: "Domain-specific integration documents and a broader engineering portfolio.",
    links: [
      { label: "Technical documents", href: "https://unwhelm.net/documents", icon: "external" },
      { label: "Portfolio", href: "https://github.com/edmund-landgraf", icon: "github" },
    ],
  },
];

const serviceLanes = [
  {
    icon: Network,
    title: "Systems integration",
    fit: "Connect APIs, databases, and SaaS platforms with clear ownership, translation, and failure boundaries.",
    bullets: ["API contracts", "SaaS adapters", "Identity and permissions", "Failure handling"],
  },
  {
    icon: BrainCircuit,
    title: "AI-enabled applications",
    fit: "Use LLMs, retrieval, and agents where they help while keeping state, permissions, and business rules deterministic.",
    bullets: ["RAG and semantic search", "Agent boundaries", "Human review", "Deterministic state"],
  },
  {
    icon: DatabaseZap,
    title: "Data and automation",
    fit: "Build practical ETL, reporting, and workflow automation around the systems a business already depends on.",
    bullets: ["SQL pipelines", "Document workflows", "Scheduled jobs", "Operational dashboards"],
  },
  {
    icon: CloudCog,
    title: "Cloud and infrastructure",
    fit: "Deploy and operate applications across Linux, Windows, VPS, containers, cloud, and hybrid on-prem environments.",
    bullets: ["Linux and Windows hosting", "CI/CD", "VPS, cloud, and on-prem handoff", "Monitoring handoff"],
  },
];

const capabilities = [
  "Working software",
  "API integrations",
  "AI under application controls",
  "SQL + data pipelines",
  "Linux + Windows deployment",
];

const operatingPrinciples = [
  {
    icon: Code2,
    title: "Real code",
    text: "Not slideware",
  },
  {
    icon: Layers3,
    title: "Clear ownership",
    text: "Truth lives somewhere",
  },
  {
    icon: BrainCircuit,
    title: "AI where useful",
    text: "State stays deterministic",
  },
];

const outcomes = [
  { value: "4", label: "Working demo assets", detail: "technical walkthroughs, not teaser clips" },
  { value: "3", label: "Public proof tracks", detail: "AMBA, VTT extension, business integration" },
  { value: "1", label: "Senior owner", detail: "direct discovery, architecture, and implementation" },
];

const engagement = [
  {
    number: "01",
    title: "Discover the real workflow",
    text: "Start with the business process, source systems, ownership rules, and constraints before choosing technology.",
  },
  {
    number: "02",
    title: "Design the boundary",
    text: "Define what each system owns, how data is translated, where authentication lives, and what happens when dependencies fail.",
  },
  {
    number: "03",
    title: "Build something demonstrable",
    text: "Move from architecture to a working integration, application, or prototype that stakeholders can actually inspect.",
  },
  {
    number: "04",
    title: "Explain it at the right altitude",
    text: "Discuss outcomes with business leaders, contracts with architects, and implementation details with engineers.",
  },
];

const competitorLessons = [
  "Buyers compare proof before promises: demos, case studies, and measurable workflows need to appear early.",
  "AI language must talk about governance, orchestration, and deterministic application state.",
  "Small-business buyers need clarity on process and engagement shape before they trust a custom build.",
  "Private/local deployment and integration with existing tools are meaningful differentiators.",
];

const pageLinks: PageLink[] = [
  {
    page: "proof",
    label: "Proof of work",
    text: "Video walkthroughs, API boundaries, data movement, and AI architecture you can inspect.",
    icon: Video,
  },
  {
    page: "work",
    label: "Selected work",
    text: "Case studies for AMBA, Owlbear Rodeo, and business workflow automation.",
    icon: FileSearch,
  },
  {
    page: "services",
    label: "Services",
    text: "Integration, AI applications, data automation, and deployment support.",
    icon: Network,
  },
  {
    page: "approach",
    label: "Approach",
    text: "A practical engagement model that proves value before custom work gets expensive.",
    icon: Route,
  },
];

function pageFromPath(pathname: string): Page {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const match = Object.entries(routeByPage).find(([, path]) => path === normalized);
  return (match?.[0] as Page | undefined) ?? "home";
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDemoId, setActiveDemoId] = useState(demos[0].id);
  const activeDemo = useMemo(
    () => demos.find((demo) => demo.id === activeDemoId) ?? demos[0],
    [activeDemoId]
  );

  useEffect(() => {
    const handlePopState = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPage: Page) => {
    const nextPath = routeByPage[nextPage];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: nextPage }, "", nextPath);
    }
    setPage(nextPage);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const routeLink = (nextPage: Page) => ({
    href: routeByPage[nextPage],
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      navigate(nextPage);
    },
  });

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-inner">
          <a className="brand" aria-label="UnwhelmNet home" {...routeLink("home")}>
            <span>Unwhelm</span><strong>Net</strong>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.page}
                className={`${item.cta ? "nav-cta" : ""} ${page === item.page ? "active" : ""}`}
                {...routeLink(item.page)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="menu-button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.page} className={page === item.page ? "active" : ""} {...routeLink(item.page)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className={`page-main page-${page}`}>
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "proof" && (
          <ProofPage activeDemo={activeDemo} setActiveDemoId={setActiveDemoId} />
        )}
        {page === "work" && <WorkPage />}
        {page === "services" && <ServicesPage />}
        {page === "approach" && <ApproachPage />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <footer>
        <div className="container footer-inner">
          <div>
            <a className="brand footer-brand" {...routeLink("home")}><span>Unwhelm</span><strong>Net</strong></a>
            <p>Custom Software • AI • Automation • Cloud Infrastructure</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/edmund-landgraf" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://amba.unwhelm.online" target="_blank" rel="noreferrer">AMBA</a>
            <a {...routeLink("contact")}>Contact</a>
          </div>
          <small>© {new Date().getFullYear()} UnwhelmNet</small>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              SOFTWARE • AI • AUTOMATION • CLOUD
            </div>
            <h1>Build the system between the systems.</h1>
            <p className="hero-lead">
              Senior software and integration engineering for businesses that need APIs,
              automation, AI-assisted applications, and infrastructure to work as one
              coherent system.
            </p>
            <p className="hero-support">
              UnwhelmNet is hands-on engineering: discovery, architecture, implementation,
              deployment, troubleshooting, and technical explanation without the layers of
              a large consultancy.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => navigate("proof")}>
                <Play size={17} fill="currentColor" />
                Watch proof of work
              </button>
              <button className="button button-secondary" onClick={() => navigate("contact")}>
                Scope an integration
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-notes">
              <span><ShieldCheck size={16} /> Deterministic guardrails around AI</span>
              <span><Workflow size={16} /> Integration-first architecture</span>
              <span><ServerCog size={16} /> Cloud + on-prem deployment</span>
            </div>
          </div>

          <aside className="operator-panel system-board" aria-label="Project fit summary">
            <div className="panel-topline">
              <span>LIVE BOUNDARY MAP</span>
              <TerminalSquare size={18} />
            </div>
            <div className="system-map" aria-hidden="true">
              <span className="system-node node-source">SaaS</span>
              <span className="system-node node-data">SQL</span>
              <span className="system-node node-core">API</span>
              <span className="system-node node-ai">AI</span>
              <span className="system-node node-deploy">Deploy</span>
              <span className="system-path path-one" />
              <span className="system-path path-two" />
              <span className="system-path path-three" />
              <span className="system-path path-four" />
            </div>
            <h2>When the workflow is real, but the system is scattered.</h2>
            <div className="signal-feed">
              <div>
                <span>01 / translate</span>
                <strong>APIs, files, forms, and databases agree on meaning.</strong>
              </div>
              <div>
                <span>02 / govern</span>
                <strong>AI assists the work without becoming the source of truth.</strong>
              </div>
              <div>
                <span>03 / ship</span>
                <strong>Automation survives credentials, failures, logs, and deployment.</strong>
              </div>
            </div>
            <div className="architecture-flow" aria-label="Workflow path">
              <span>Workflow</span><ChevronRight size={16} />
              <span>API + Rules</span><ChevronRight size={16} />
              <span>Adapters</span><ChevronRight size={16} />
              <span>Handoff</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="capability-strip" aria-label="Capabilities">
        <div className="container capability-grid">
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <section className="scoreboard" aria-label="Proof summary">
        <div className="container score-grid">
          {outcomes.map((item) => (
            <div className="score-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <small>{item.detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="home-directory" aria-label="Site sections">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow eyebrow-dark">ROUTE BOARD</div>
            <h2>Choose the evidence trail you want to inspect.</h2>
            <p>
              The site now behaves like the work: distinct surfaces with clear
              boundaries, visible proof, and no long-scroll scavenger hunt.
            </p>
          </div>
          <div className="directory-grid">
            {pageLinks.map((link) => (
              <button className="directory-card" key={link.page} onClick={() => navigate(link.page)}>
                <span className="directory-icon"><link.icon size={22} /></span>
                <span className="directory-copy">
                  <strong>{link.label}</strong>
                  <span>{link.text}</span>
                </span>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="principles-section" aria-label="Operating principles">
        <div className="container principles-grid">
          <div className="section-heading">
            <div className="eyebrow eyebrow-dark">OPERATING PRINCIPLES</div>
            <h2>How the work is approached.</h2>
            <p>
              The original promise still matters: practical engineering, explicit
              ownership, and AI bounded by application rules.
            </p>
          </div>
          <div className="principle-list">
            {operatingPrinciples.map((principle) => (
              <article key={principle.title}>
                <principle.icon size={19} />
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProofPage({
  activeDemo,
  setActiveDemoId,
}: {
  activeDemo: Demo;
  setActiveDemoId: (id: string) => void;
}) {
  return (
    <section className="section proof-section route-section">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <div className="eyebrow eyebrow-dark"><Video size={15} /> PROOF BEFORE CLAIMS</div>
            <h1>Watch the engineering, then judge the fit.</h1>
          </div>
          <p>
            Working technical walkthroughs expose the architecture while it runs:
            AI, data, integration, APIs, and deployment details instead of a vague services pitch.
          </p>
        </div>

        <div className="demo-browser">
          <div className="demo-list" role="tablist" aria-label="Technical demonstrations">
            {demos.map((demo) => (
              <button
                key={demo.id}
                className={demo.id === activeDemo.id ? "demo-tab active" : "demo-tab"}
                onClick={() => setActiveDemoId(demo.id)}
                role="tab"
                aria-selected={demo.id === activeDemo.id}
              >
                <span className="demo-kicker">{demo.kicker}</span>
                <strong>{demo.title}</strong>
                <span>{demo.description}</span>
                <small>{demo.duration}</small>
              </button>
            ))}
          </div>

          <div className="demo-player-card">
            <div className="player-frame">
              <video
                key={activeDemo.source}
                controls
                preload="metadata"
                playsInline
                src={activeDemo.source}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="player-copy">
              <div>
                <span className="demo-kicker">{activeDemo.kicker}</span>
                <h2>{activeDemo.title}</h2>
                <p>{activeDemo.description}</p>
              </div>
              <ul>
                {activeDemo.bullets.map((bullet) => (
                  <li key={bullet}><CheckCircle2 size={17} /> {bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="section-footnote">
          <span>
            These players stream the existing UnwhelmNet video assets while this
            route-based redesign is staged.
          </span>
          <a href="https://unwhelm.net/videos" target="_blank" rel="noreferrer">
            Open the full video library <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function WorkPage() {
  return (
    <section className="section work-section route-section">
      <div className="container">
        <div className="section-heading">
          <div className="eyebrow eyebrow-dark"><Sparkles size={15} /> SELECTED WORK</div>
          <h1>Case studies with the problem left in.</h1>
          <p>
            Public projects are presented as evidence of how systems are modeled,
            integrated, constrained, and operated, not as a list of technologies.
            The case studies keep the messy middle visible: what was broken, what shipped,
            and what evidence a buyer can inspect.
          </p>
        </div>

        <div className="work-grid">
          {work.map((item, index) => (
            <article className={index === 0 ? "work-card work-card-featured" : "work-card"} key={item.title}>
              <div className="work-index">0{index + 1}</div>
              <div className="work-content">
                <span className="card-eyebrow">{item.eyebrow}</span>
                <h2>{item.title}</h2>
                <p className="work-summary">{item.summary}</p>
                <div className="work-columns">
                  <div>
                    <h3>Problem</h3>
                    <p>{item.problem}</p>
                  </div>
                  <div>
                    <h3>What shipped</h3>
                    <ul>
                      {item.shipped.map((detail) => (
                        <li key={detail}><CheckCircle2 size={16} /> {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="proof-line">
                  <FileSearch size={17} />
                  <span>{item.proof}</span>
                </div>
                <div className="work-links">
                  {item.links.map((link) => (
                    <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                      {link.icon === "github" ? <Github size={16} /> : <ExternalLink size={16} />}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <section className="section services-section route-section">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <div className="eyebrow eyebrow-dark">SERVICE LANES</div>
            <h1>Not a stack. A set of boundary problems.</h1>
          </div>
          <p>
            Technical capability, stated plainly. The focus is not selling a stack;
            it is making independently designed systems cooperate reliably enough
            to support the business workflow.
          </p>
        </div>

        <div className="services-grid">
          {serviceLanes.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon"><service.icon size={23} /></div>
              <h2>{service.title}</h2>
              <p>{service.fit}</p>
              <ul>
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="specialty-panel">
          <div>
            <span className="card-eyebrow">DEEP DOMAIN EXPERIENCE</span>
            <h2>Property-management technology</h2>
            <p>
              Substantial hands-on work around Propertyware, AppFolio, leasing,
              maintenance, documents, SQL reporting, ETL, and operational automation.
              That specialty becomes a wedge, not a cage.
            </p>
          </div>
          <a className="text-link" href="https://unwhelm.net/documents" target="_blank" rel="noreferrer">
            Review integration documents <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ApproachPage() {
  return (
    <>
      <section className="section approach-section route-section">
        <div className="container approach-grid">
          <div className="section-heading">
            <div className="eyebrow"><Route size={15} /> ENGAGEMENT MODEL</div>
            <h1>Clarity before custom work gets expensive.</h1>
            <p>
              From discovery to demo, the work has to move between business requirements,
              architecture, implementation, and explanation without losing the thread.
            </p>
          </div>

          <div className="engagement-list">
            {engagement.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section intelligence-section">
        <div className="container intelligence-grid">
          <div>
            <div className="eyebrow eyebrow-dark"><BadgeCheck size={15} /> COMPETITIVE UPGRADE</div>
            <h2>What this redesign borrows from the market.</h2>
          </div>
          <div className="lesson-list">
            {competitorLessons.map((lesson) => (
              <div key={lesson}>
                <MessageSquareCode size={18} />
                <p>{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="section about-section route-section">
      <div className="container about-grid">
        <div>
          <div className="eyebrow eyebrow-dark">EDMUND LANDGRAF / UNWHELMNET</div>
          <h1>Direct technical ownership.</h1>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            UnwhelmNet is built around direct access to the engineer doing the
            discovery, architecture, and implementation.
          </p>
          <p>
            The work spans modern web applications, APIs, SQL and data pipelines,
            third-party SaaS integration, AI-assisted systems, Linux and Windows
            infrastructure, and the operational details required to get those systems
            deployed.
          </p>
          <p>
            The promise is deliberately practical: understand the workflow, build the
            right boundary, demonstrate what works, and be explicit about what still
            needs hardening.
          </p>
          <div className="about-links">
            <a href="https://github.com/edmund-landgraf" target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub portfolio
            </a>
            <a href="https://unwhelm.net/documents" target="_blank" rel="noreferrer">
              <ExternalLink size={17} /> Technical documents
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="contact-section contact-page">
      <div className="container contact-grid">
        <div>
          <div className="eyebrow">START WITH THE PROBLEM</div>
          <h1>Have systems that should work together?</h1>
          <p>
            Describe the workflow, the platforms involved, and where the current
            process breaks down. The first conversation can stay at the business
            level or go straight into APIs and architecture.
          </p>
        </div>
        <div className="contact-card">
          <a href="mailto:contact@unwhelmnet.com">
            <Mail size={20} />
            <span>
              <small>Email</small>
              <strong>contact@unwhelmnet.com</strong>
            </span>
            <ArrowRight size={18} />
          </a>
          <a href="tel:+18662094787">
            <Phone size={20} />
            <span>
              <small>Voice / Fax</small>
              <strong>866-209-4787</strong>
            </span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default App;
