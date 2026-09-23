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

type Page = "home" | "real-estate" | "ai-solutions" | "ai-economics" | "web-design" | "platforms" | "case-studies" | "clients" | "diagramming" | "technical-skills" | "proof" | "videos" | "work" | "services" | "documents" | "approach" | "about" | "contact";

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
  "real-estate": "/real-estate",
  "ai-solutions": "/ai-solutions",
  "ai-economics": "/ai-economics",
  "web-design": "/web-design",
  platforms: "/platforms",
  "case-studies": "/case-studies",
  clients: "/clients",
  diagramming: "/diagramming",
  "technical-skills": "/technical-skills",
  proof: "/proof",
  videos: "/videos",
  work: "/work",
  services: "/services",
  documents: "/documents",
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
    proof: "Domain-specific integration experience and a broader engineering portfolio.",
    links: [
      { label: "Portfolio", href: "https://github.com/edmund-landgraf", icon: "github" },
    ],
  },
];

const documentLibrary = [
  {
    eyebrow: "PROPERTY MANAGEMENT",
    title: "Propertyware and AppFolio integration notes",
    summary:
      "A rebuilt home for the old technical-document lane: data movement, reporting, documents, leasing workflows, and operational automation around property-management platforms.",
    bullets: ["API and export boundaries", "SQL reporting and reconciliation", "Document and leasing workflow automation"],
  },
  {
    eyebrow: "AI + DATA",
    title: "RAG and semantic-search architecture",
    summary:
      "Notes for retrieval, embeddings, source ingestion, deterministic filters, and model boundaries behind AI-assisted applications.",
    bullets: ["Source-content ownership", "Embedding and retrieval flow", "Local and commercial model boundaries"],
  },
  {
    eyebrow: "APIS + DEPLOYMENT",
    title: "Application integration playbook",
    summary:
      "A place for the rebuilt API, deployment, authentication, and cloud/on-prem handoff material that used to live on supporting pages.",
    bullets: ["REST service boundaries", "Authentication and credentials", "Linux, Windows, VPS, and hybrid deployment"],
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

const projectGoals = [
  "API Integration & Workflow Automation",
  "Data Migration / System Consolidation",
  "Custom Reporting & Analytics Dashboards",
  "AI / LLM Implementation (Search / Automation)",
  "Process Optimization & SOP Standardization",
  "Other (describe in message)",
];

const cloudProviders = [
  "Amazon Web Services (AWS)",
  "Microsoft Azure",
  "Google Cloud Platform (GCP)",
  "Oracle Cloud Infrastructure (OCI)",
  "IBM Cloud",
  "DigitalOcean",
  "Vercel",
  "Cloudflare",
];

const realEstateSystems = {
  "Property Management": ["AppFolio", "Propertyware", "Buildium", "Yardi Breeze / Voyager", "Rent Manager", "Other"],
  "Leasing / Showings": ["Rently", "Tenant Turner", "ShowMojo", "Zillow Rentals / Apartments.com", "Avail", "Other"],
  Maintenance: ["PropertyMeld", "zInspector", "Latchel", "Fexa", "UpKeep", "Other"],
  "Document & e-Sign": ["DocuSign", "Dotloop", "Adobe Sign", "JotForm", "Formstack", "Other"],
  "Database / Reporting": ["Microsoft SQL Server", "Power BI", "Tableau", "Snowflake", "Excel (Advanced Modeling)", "Other"],
};
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

const parityPages: Partial<Record<Page, {
  eyebrow: string;
  title: string;
  intro: string;
  cards: { title: string; text: string; bullets: string[] }[];
}>> = {
  "real-estate": {
    eyebrow: "REAL ESTATE SOLUTIONS",
    title: "Property-management systems, rebuilt around operational proof.",
    intro:
      "The old real-estate lane becomes a focused page for AppFolio, Propertyware, leasing, maintenance, documents, data cleanup, and reporting work.",
    cards: [
      {
        title: "Platform integration",
        text: "Connect the systems that hold leasing, accounting, maintenance, showings, and document state.",
        bullets: ["Propertyware and AppFolio workflows", "Rently, JotForm, documents, and email", "Clear source-of-truth boundaries"],
      },
      {
        title: "Reporting and reconciliation",
        text: "Turn exports, spreadsheets, SQL data, and platform reports into auditable operating views.",
        bullets: ["SQL Server reporting", "Data cleanup pipelines", "Exception-focused dashboards"],
      },
      {
        title: "Workflow automation",
        text: "Automate repeated handoffs while keeping review points explicit for staff and managers.",
        bullets: ["Leasing and maintenance handoffs", "Document generation", "Operational SOP support"],
      },
    ],
  },
  "ai-solutions": {
    eyebrow: "AI SOLUTIONS",
    title: "AI under application controls.",
    intro:
      "The AI page is rebuilt around retrieval, semantic search, local models, commercial model boundaries, and deterministic business state.",
    cards: [
      {
        title: "Retrieval and RAG",
        text: "Build source-aware assistants where documents, embeddings, prompts, and citations are visible parts of the system.",
        bullets: ["Source ingestion", "Embedding search", "Prompt construction boundaries"],
      },
      {
        title: "AI workflow support",
        text: "Use models for drafting, classification, search, and review while keeping authoritative records outside the model.",
        bullets: ["Human review", "Structured outputs", "Policy-aware operations"],
      },
      {
        title: "Local and private options",
        text: "Support model choices across local, hosted, and commercial environments based on risk and infrastructure.",
        bullets: ["Local model demos", "Commercial model adapters", "Deployment constraints made explicit"],
      },
    ],
  },
  "ai-economics": {
    eyebrow: "AI ECONOMICS",
    title: "Make the cost model visible before the build gets expensive.",
    intro:
      "This page reframes the old AI Economics menu as practical ownership math: what to automate, what to review, where inference cost lives, and when a simpler system wins.",
    cards: [
      {
        title: "Cost of ownership",
        text: "Estimate operating cost across infrastructure, model calls, review time, and maintenance.",
        bullets: ["Inference and hosting cost", "Human review cost", "Maintenance and observability"],
      },
      {
        title: "Value triggers",
        text: "Prioritize AI where it reduces search, reconciliation, drafting, or routing work in repeated workflows.",
        bullets: ["High-volume knowledge lookup", "Classification and routing", "Drafting with review"],
      },
      {
        title: "Risk boundaries",
        text: "Model the cost of errors, privacy exposure, and ambiguous ownership before production rollout.",
        bullets: ["Permission boundaries", "Audit trails", "Fallback workflows"],
      },
    ],
  },
  "web-design": {
    eyebrow: "WEB APP DESIGN",
    title: "Modern web applications that fit the workflow.",
    intro:
      "The old web-app page is rebuilt as a product-surface page for React, APIs, dashboards, internal tools, and field-ready interfaces.",
    cards: [
      {
        title: "Application surfaces",
        text: "Design screens around repeated work, dense information, and clear next actions.",
        bullets: ["React and TypeScript", "Operational dashboards", "Form-heavy internal tools"],
      },
      {
        title: "Integration-first UI",
        text: "Treat the interface as the visible edge of APIs, permissions, validation, and data ownership.",
        bullets: ["API-backed views", "Validation and state handling", "Role-aware workflows"],
      },
      {
        title: "Deployment-ready builds",
        text: "Ship applications that can live behind real domains, servers, logs, and production handoffs.",
        bullets: ["Vite and Node hosting", "Nginx-friendly routing", "Cloud or VPS deployment"],
      },
    ],
  },
  platforms: {
    eyebrow: "PLATFORMS",
    title: "Platform boundaries made explicit.",
    intro:
      "The rebuilt platform page groups SaaS, database, cloud, and internal systems by what they own and how they exchange data.",
    cards: [
      {
        title: "SaaS adapters",
        text: "Connect business platforms without pretending every system owns the same state.",
        bullets: ["Propertyware and AppFolio", "JotForm and document systems", "GitHub and workflow tools"],
      },
      {
        title: "Data platforms",
        text: "Use SQL, spreadsheets, files, and warehouse-style flows where they fit the business process.",
        bullets: ["SQL Server", "Advanced Excel", "ETL and cleanup jobs"],
      },
      {
        title: "Infrastructure",
        text: "Deploy across Linux, Windows, VPS, cloud, and hybrid environments with a clear handoff model.",
        bullets: ["Windows and Linux hosting", "Reverse proxies", "Environment separation"],
      },
    ],
  },
  "case-studies": {
    eyebrow: "CASE STUDIES",
    title: "Case studies with the problem left in.",
    intro:
      "This old menu item now routes to a dedicated case-study surface that complements the selected-work page.",
    cards: [
      {
        title: "Adventure Maker by Act",
        text: "A structured content platform with canonical ownership, publishing, integrations, and controlled AI tooling.",
        bullets: ["React and TypeScript app", "API and database model", "AI-assisted authoring boundaries"],
      },
      {
        title: "AMBA to Owlbear Rodeo",
        text: "A VTT extension that moves structured adventure data into Owlbear while respecting ownership boundaries.",
        bullets: ["Supported Owlbear APIs", "Stable metadata", "Import and upsert behavior"],
      },
      {
        title: "Property-management automation",
        text: "Integration, ETL, reporting, document, and workflow automation around operational real-estate systems.",
        bullets: ["Platform integrations", "SQL reporting", "Workflow automation"],
      },
    ],
  },
  clients: {
    eyebrow: "CLIENTS",
    title: "Built for businesses with real workflows and limited patience for theater.",
    intro:
      "The clients page is rebuilt around fit: small and mid-sized teams that need direct engineering ownership across software, data, AI, and infrastructure.",
    cards: [
      {
        title: "Property-management operators",
        text: "Teams living between leasing, maintenance, documents, accounting, portals, spreadsheets, and reporting.",
        bullets: ["Operational clarity", "Reduced duplicate entry", "Cleaner reporting"],
      },
      {
        title: "Technical founders and owners",
        text: "People who need someone to reason through architecture and then build the working system.",
        bullets: ["Direct collaboration", "Prototype to production", "Practical tradeoffs"],
      },
      {
        title: "Internal operations teams",
        text: "Groups that need their existing tools to cooperate without buying a giant platform first.",
        bullets: ["Workflow mapping", "System integration", "Supportable automation"],
      },
    ],
  },
  diagramming: {
    eyebrow: "DIAGRAMMING",
    title: "Architecture diagrams that clarify ownership.",
    intro:
      "The diagramming page becomes a reusable explanation surface for API flows, data movement, AI boundaries, and deployment topology.",
    cards: [
      {
        title: "System maps",
        text: "Show which systems own which records and where handoffs happen.",
        bullets: ["Source-of-truth maps", "Failure points", "Credential boundaries"],
      },
      {
        title: "API and data flows",
        text: "Document contracts, transformations, queues, schedules, and reconciliation paths.",
        bullets: ["Request flows", "ETL diagrams", "Sync and retry behavior"],
      },
      {
        title: "AI architecture",
        text: "Make retrieval, prompts, model choices, and review boundaries visible before implementation.",
        bullets: ["RAG pipelines", "Human review loops", "Deterministic state"],
      },
    ],
  },
  "technical-skills": {
    eyebrow: "TECHNICAL SKILLS",
    title: "Senior implementation across software, data, AI, and infrastructure.",
    intro:
      "The technical-skills page is rebuilt as a compact capability map for the tools and judgment behind the work.",
    cards: [
      {
        title: "Application engineering",
        text: "Build usable systems with TypeScript, React, Node, APIs, validation, and deployment discipline.",
        bullets: ["React and TypeScript", "Node and Express", "REST API design"],
      },
      {
        title: "Data and integration",
        text: "Move between SQL, SaaS APIs, spreadsheets, documents, files, and reporting systems.",
        bullets: ["SQL Server", "ETL workflows", "SaaS integration"],
      },
      {
        title: "AI and infrastructure",
        text: "Use LLMs, retrieval, local models, VPS hosting, Linux, Windows, and cloud services where they fit.",
        bullets: ["RAG and embeddings", "Linux and Windows", "Cloud and VPS hosting"],
      },
    ],
  },
};
const pageLinks: PageLink[] = [
  { page: "real-estate", label: "Real Estate Solutions", text: "Property-management integration, reporting, documents, leasing, maintenance, and automation.", icon: DatabaseZap },
  { page: "ai-solutions", label: "AI Solutions", text: "RAG, semantic search, local and commercial model boundaries, and AI-enabled workflows.", icon: BrainCircuit },
  { page: "ai-economics", label: "AI Economics", text: "Cost, risk, review, and infrastructure tradeoffs before AI gets expensive.", icon: BadgeCheck },
  { page: "web-design", label: "Web App Design", text: "Modern web applications, dashboards, forms, and internal tools built around real workflows.", icon: Code2 },
  { page: "platforms", label: "Platforms", text: "SaaS, database, cloud, VPS, and internal platform boundaries made explicit.", icon: Layers3 },
  { page: "case-studies", label: "Case Studies", text: "AMBA, Owlbear Rodeo, and property-management automation rebuilt as case-study pages.", icon: FileSearch },
  { page: "clients", label: "Clients", text: "Who the work fits: owners, operators, technical founders, and internal operations teams.", icon: Network },
  { page: "diagramming", label: "Diagramming", text: "System maps, API flows, data movement, AI boundaries, and deployment topology.", icon: Route },
  { page: "technical-skills", label: "Technical Skills", text: "Application, integration, AI, data, cloud, Linux, Windows, and VPS capability map.", icon: TerminalSquare },
  { page: "videos", label: "Videos", text: "The rebuilt page for technical walkthroughs that used to live under the old video route.", icon: Video },
  { page: "documents", label: "Documents", text: "Rebuilt technical-document routes for property management, AI, APIs, and deployment notes.", icon: FileSearch },
  { page: "contact", label: "Contact Us", text: "The original intake flow reskinned for the redesign, ready for endpoint wiring.", icon: Mail },
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
        {parityPages[page] && <ParityPage page={page} navigate={navigate} />}
        {page === "proof" && (
          <ProofPage activeDemo={activeDemo} setActiveDemoId={setActiveDemoId} />
        )}
        {page === "videos" && (
          <ProofPage
            activeDemo={activeDemo}
            setActiveDemoId={setActiveDemoId}
            eyebrow="VIDEO LIBRARY"
            title="Video library"
            description="The old video-library route is rebuilt here with working technical walkthroughs for AI, data, integration, APIs, and deployment."
          />
        )}
        {page === "work" && <WorkPage />}
        {page === "services" && <ServicesPage />}
        {page === "documents" && <DocumentsPage />}
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
            <a {...routeLink("videos")}>Videos</a>
            <a {...routeLink("documents")}>Documents</a>
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

function ParityPage({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  const content = parityPages[page];
  if (!content) return null;

  return (
    <section className="section parity-section route-section">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <div className="eyebrow eyebrow-dark"><Route size={15} /> {content.eyebrow}</div>
            <h1>{content.title}</h1>
          </div>
          <p>{content.intro}</p>
        </div>

        <div className="parity-grid">
          {content.cards.map((card) => (
            <article className="parity-card" key={card.title}>
              <span className="card-eyebrow">Rebuilt route</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}><CheckCircle2 size={16} /> {bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="parity-next-panel">
          <div>
            <span className="card-eyebrow">NEXT STEP</span>
            <h2>Ready for copy passes and deeper source material.</h2>
            <p>Every old menu route now has a redesigned page surface. We can keep refining content without changing the route map.</p>
          </div>
          <button className="button button-primary" onClick={() => navigate("contact")}>Start a project <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
function ProofPage({
  activeDemo,
  setActiveDemoId,
  eyebrow = "PROOF BEFORE CLAIMS",
  title = "Watch the engineering, then judge the fit.",
  description = "Working technical walkthroughs expose the architecture while it runs: AI, data, integration, APIs, and deployment details instead of a vague services pitch.",
}: {
  activeDemo: Demo;
  setActiveDemoId: (id: string) => void;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="section proof-section route-section">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <div className="eyebrow eyebrow-dark"><Video size={15} /> {eyebrow}</div>
            <h1>{title}</h1>
          </div>
          <p>
            {description}
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
            These players stream the existing UnwhelmNet MP4 assets while local
            copies are staged for the replacement deployment.
          </span>
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

        <div className="work-grid case-file-grid">
          {work.map((item, index) => (
            <article className={index === 0 ? "work-card work-card-featured" : "work-card"} key={item.title}>
              <div className="case-rail" aria-label="Case file metadata">
                <FileSearch size={18} />
                <span>Case file</span>
                <strong>{item.links.length} {item.links.length === 1 ? "ref" : "refs"}</strong>
              </div>
              <div className="work-content">
                <div className="case-file-header">
                  <span className="card-eyebrow">{item.eyebrow}</span>
                  <span className="case-status">Inspectable artifact</span>
                </div>
                <h2>{item.title}</h2>
                <p className="work-summary">{item.summary}</p>
                <div className="work-matrix">
                  <div>
                    <h3>Boundary problem</h3>
                    <p>{item.problem}</p>
                  </div>
                  <div>
                    <h3>Evidence</h3>
                    <p>{item.proof}</p>
                  </div>
                </div>
                <div className="shipped-panel">
                  <h3>What shipped</h3>
                  <ul>
                    {item.shipped.map((detail) => (
                      <li key={detail}><CheckCircle2 size={16} /> {detail}</li>
                    ))}
                  </ul>
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
          <a className="text-link" href="https://github.com/edmund-landgraf" target="_blank" rel="noreferrer">
            Review public work <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}


function DocumentsPage() {
  return (
    <section className="section documents-section route-section">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <div className="eyebrow eyebrow-dark"><FileSearch size={15} /> TECHNICAL DOCUMENTS</div>
            <h1>Documents rebuilt into the new site.</h1>
          </div>
          <p>
            The old document route now has a new-site home. These entries preserve
            the major content lanes for parity; the wording can be tightened as the
            source material is edited back in.
          </p>
        </div>

        <div className="work-grid document-grid">
          {documentLibrary.map((document, index) => (
            <article className={index === 0 ? "work-card work-card-featured" : "work-card"} key={document.title}>
              <div className="case-rail" aria-label="Document metadata">
                <FileSearch size={18} />
                <span>Document</span>
                <strong>0{index + 1}</strong>
              </div>
              <div className="work-content">
                <div className="case-file-header">
                  <span className="card-eyebrow">{document.eyebrow}</span>
                  <span className="case-status">Rebuilt route</span>
                </div>
                <h2>{document.title}</h2>
                <p className="work-summary">{document.summary}</p>
                <div className="shipped-panel">
                  <h3>Coverage</h3>
                  <ul>
                    {document.bullets.map((bullet) => (
                      <li key={bullet}><CheckCircle2 size={16} /> {bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
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
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="contact-section contact-page">
      <div className="container contact-page-grid">
        <div className="contact-hero-copy">
          <div className="eyebrow">START WITH THE PROBLEM</div>
          <h1>Let's talk about your project.</h1>
          <p>
            Tell us about your systems and your goals. The original intake flow is
            preserved here, but tuned to the redesign: clearer sections, stronger
            boundaries, and enough structure to start the first technical conversation.
          </p>
          <div className="contact-proof-strip" aria-label="Contact workflow summary">
            <span><CheckCircle2 size={16} /> Workflow and system context</span>
            <span><CheckCircle2 size={16} /> Cloud, VPS, and data ownership</span>
            <span><CheckCircle2 size={16} /> Property-management platform detail</span>
          </div>
        </div>

        <aside className="contact-card contact-sidebar" aria-label="Contact information">
          <h2>Contact information</h2>
          <div className="contact-info-row">
            <Mail size={20} />
            <span>
              <small>Email</small>
              <strong>contact@unwhelm.com</strong>
            </span>
          </div>
          <div className="contact-info-row">
            <Phone size={20} />
            <span>
              <small>Voice / Fax</small>
              <strong>866-209-4787</strong>
            </span>
          </div>
          <div className="contact-info-row">
            <ServerCog size={20} />
            <span>
              <small>Availability</small>
              <strong>Mon-Fri, 8am-5pm PST</strong>
            </span>
          </div>
        </aside>
      </div>

      <div className="container contact-form-layout">
        <form className="intake-form" aria-label="Project intake form">
          <div className="form-action-bar">
            <div>
              <span className="card-eyebrow">PROJECT INTAKE</span>
              <h2>Contact Us</h2>
            </div>
            <button className="button button-primary" type="button" disabled>Delivery endpoint pending</button>
          </div>

          <section className="form-section">
            <h3>Customer information</h3>
            <div className="form-grid-two">
              <label>Name *<input required /></label>
              <label>Email *<input required type="email" /></label>
              <label>Phone<input /></label>
              <label>Company *<input required /></label>
              <label>Title / Role<input /></label>
              <label>Website<input placeholder="https://" /></label>
            </div>
          </section>

          <section className="form-section">
            <h3>Tell us more about your project</h3>
            <textarea required rows={6} placeholder="Describe your current challenges..." />
          </section>

          <section className="form-section">
            <h3>Project goals</h3>
            <div className="choice-grid">
              {projectGoals.map((goal) => (
                <label className="choice-pill" key={goal}>
                  <input type="checkbox" />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="form-section">
            <h3>On-premise / VPS systems</h3>
            <p>If you host any applications or databases on your own servers or a VPS, describe them below.</p>
            <textarea rows={4} placeholder="Example: SQL Server on Windows VPS, Docker on Ubuntu, internal IIS apps..." />
          </section>

          <section className="form-section">
            <h3>Cloud systems</h3>
            <div className="choice-grid">
              {cloudProviders.map((provider) => (
                <label className="choice-pill" key={provider}>
                  <input type="checkbox" />
                  <span>{provider}</span>
                </label>
              ))}
            </div>
            <input className="full-input" placeholder="Other cloud systems..." />
          </section>

          <section className="form-section">
            <h3>Real estate systems</h3>
            <div className="platform-group-grid">
              {Object.entries(realEstateSystems).map(([group, systems]) => (
                <div className="platform-group" key={group}>
                  <h4>{group}</h4>
                  {systems.map((system) => (
                    <label className="choice-pill compact" key={`${group}-${system}`}>
                      <input type="checkbox" />
                      <span>{system}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <input className="full-input" placeholder="Other platforms..." />
          </section>

          <label className="send-copy-row">
            <input type="checkbox" />
            <span>Send me a copy of this inquiry</span>
          </label>

          <button className="button button-primary form-submit" type="button" disabled>Delivery endpoint pending</button>
        </form>
      </div>
    </section>
  );
}
export default App;
