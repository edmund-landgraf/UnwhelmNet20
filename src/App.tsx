import { type MouseEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  DatabaseZap,
  ExternalLink,
  FileSearch,
  Github,
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
      "Embeddings, semantic retrieval, cosine similarity, and a hybrid SQL + Python implementation around real structured data.",
    source: "https://unwhelm.net/assets/VectorDB.mp4",
    duration: "Technical walkthrough",
    bullets: [
      "Turns approximate search into an inspectable data workflow",
      "Keeps deterministic SQL filters beside semantic retrieval",
      "Documents the practical platform gaps instead of hiding them",
    ],
  },
  {
    id: "rag",
    kicker: "LOCAL AI ARCHITECTURE",
    title: "Building a local RAG application",
    description:
      "Source ingestion, embeddings, nearest-neighbor retrieval, prompt routing, and locally hosted models shown as an application boundary.",
    source: "https://unwhelm.net/assets/UnwhelmNetChatRAG.mp4",
    duration: "Architecture + demo",
    bullets: [
      "Separates source content, retrieval, model choice, and response construction",
      "Supports local and commercial model options behind one contract",
      "Shows where hardware, latency, and data quality affect the result",
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
      "Production-oriented form validation and error handling",
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
      "REST API design and service contracts",
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
    fit: "When two or more tools own pieces of the same workflow.",
    bullets: ["API contracts", "SaaS adapters", "Identity and permissions", "Failure handling"],
  },
  {
    icon: BrainCircuit,
    title: "AI-enabled applications",
    fit: "When AI should assist the workflow without owning the truth.",
    bullets: ["RAG and semantic search", "Agent boundaries", "Human review", "Deterministic state"],
  },
  {
    icon: DatabaseZap,
    title: "Data and automation",
    fit: "When reporting, ETL, cleanup, or repeatable work is still manual.",
    bullets: ["SQL pipelines", "Document workflows", "Scheduled jobs", "Operational dashboards"],
  },
  {
    icon: CloudCog,
    title: "Cloud and infrastructure",
    fit: "When the app has to survive deployment, security, and support.",
    bullets: ["Linux and Windows hosting", "CI/CD", "VPS and cloud", "Monitoring handoff"],
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
    title: "Integration diagnosis",
    text: "Map systems, data ownership, authentication, failure points, and the smallest valuable automation path.",
  },
  {
    number: "02",
    title: "Proof build",
    text: "Ship a narrow working slice that uses real APIs, real data constraints, and a deployment target.",
  },
  {
    number: "03",
    title: "Production hardening",
    text: "Add validation, observability, documentation, handoff, and the boring pieces that keep software alive.",
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
              UnwhelmNet helps growing businesses turn disconnected software, manual
              operations, and AI experiments into working applications with clear
              ownership, integration boundaries, and deployment reality.
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
              <span><ShieldCheck size={16} /> AI under deterministic guardrails</span>
              <span><Workflow size={16} /> Workflow-first architecture</span>
              <span><ServerCog size={16} /> Cloud, VPS, Windows, and Linux delivery</span>
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
              <span>Contract</span><ChevronRight size={16} />
              <span>Automation</span><ChevronRight size={16} />
              <span>Handoff</span>
            </div>
          </aside>
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
            A stronger services site does not just list technologies. It shows the
            messy middle: what was broken, what shipped, and what evidence a buyer can inspect.
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
            Each service lane explains when to call, what gets designed, and where
            UnwhelmNet is strongest.
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
              The work starts by making ownership, system boundaries, and business value explicit.
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
          <h1>Direct access to the engineer doing the work.</h1>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            UnwhelmNet is for organizations that need someone who can talk to the
            business, inspect the systems, write the code, and explain what changed.
          </p>
          <p>
            The work spans modern web applications, APIs, SQL and data pipelines,
            SaaS integration, AI-assisted systems, Linux and Windows infrastructure,
            and the operational details required to get software deployed.
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
          <div className="eyebrow">START WITH THE WORKFLOW</div>
          <h1>Have systems that should work together?</h1>
          <p>
            Send the platforms involved, the workflow that breaks, and what a good
            first result would look like. A first conversation can stay business-level
            or go straight into APIs and architecture.
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
