import { useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CloudCog,
  Code2,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Mail,
  Menu,
  Network,
  Phone,
  Play,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Video,
  Workflow,
  X,
} from "lucide-react";

type Demo = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  source: string;
  duration: string;
  bullets: string[];
};

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
      "Production-oriented form handling and validation",
      "Credential boundaries and environment separation",
      "Microsoft Graph integration for message delivery",
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
      "REST API design and integration boundaries",
      "Authentication and database connectivity",
      "Practical automation patterns for business systems",
    ],
  },
];

const work = [
  {
    eyebrow: "FLAGSHIP TECHNICAL SHOWCASE",
    title: "Adventure Maker by Act (AMBA)",
    description:
      "A full-stack structured-content platform built around a canonical domain model, versioned import/export, APIs, external integrations, publishing, and controlled AI tooling.",
    details: [
      "React + TypeScript + Express + PostgreSQL/Prisma",
      "MCP tools call the product API instead of bypassing the application",
      "Wanderer's Guide, Owlbear Rodeo, rules-data, map and publishing integrations",
      "Deterministic schemas, validation and identity around AI-assisted workflows",
    ],
    links: [
      { label: "Live application", href: "https://amba.unwhelm.online" },
      {
        label: "GitHub",
        href: "https://github.com/edmund-landgraf/AdventureMakerByAct",
      },
    ],
  },
  {
    eyebrow: "SDK + VTT INTEGRATION",
    title: "AMBA → Owlbear Rodeo",
    description:
      "A separate extension that respects Owlbear's supported SDK and ownership model instead of pretending the source application controls the destination platform.",
    details: [
      "Map and token placement through the Owlbear SDK",
      "Stable metadata for re-import and upsert behavior",
      "Explicit ownership boundary between AMBA and the VTT",
      "Visual/stat-card validation and production-hosting documentation",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/edmund-landgraf/Amba-Owlbear-Extension",
      },
    ],
  },
  {
    eyebrow: "REAL-WORLD BUSINESS AUTOMATION",
    title: "Property-management systems integration",
    description:
      "API, ETL, reporting and workflow work around property-management platforms, SQL Server, spreadsheets, documents and operational SaaS tools.",
    details: [
      "Propertyware / AppFolio integration patterns",
      "JotForm, documents, leasing and operational workflow automation",
      "SQL Server, ETL and reporting pipelines",
      "Business process translated into software rather than isolated scripts",
    ],
    links: [
      { label: "Technical documents", href: "https://unwhelm.net/documents" },
      {
        label: "Integration portfolio",
        href: "https://github.com/edmund-landgraf",
      },
    ],
  },
];

const services = [
  {
    icon: Network,
    title: "Systems integration",
    text: "Connect APIs, databases and SaaS platforms with clear ownership, translation and failure boundaries.",
  },
  {
    icon: BrainCircuit,
    title: "AI-enabled applications",
    text: "Use LLMs, retrieval and agents where they help while keeping state, permissions and business rules deterministic.",
  },
  {
    icon: Database,
    title: "Data & automation",
    text: "Build practical ETL, reporting and workflow automation around the systems a business already depends on.",
  },
  {
    icon: CloudCog,
    title: "Cloud & infrastructure",
    text: "Deploy and operate applications across Linux, Windows, VPS, containers and hybrid cloud/on-prem environments.",
  },
];

const methods = [
  {
    number: "01",
    title: "Discover the real workflow",
    text: "Start with the business process, source systems, ownership rules and constraints before choosing technology.",
  },
  {
    number: "02",
    title: "Design the boundary",
    text: "Define what each system owns, how data is translated, where authentication lives and what happens when dependencies fail.",
  },
  {
    number: "03",
    title: "Build something demonstrable",
    text: "Move from architecture to a working integration, application or prototype that stakeholders can actually inspect.",
  },
  {
    number: "04",
    title: "Explain it at the right altitude",
    text: "Discuss outcomes with business leaders, contracts with architects, and implementation details with engineers.",
  },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDemoId, setActiveDemoId] = useState(demos[0].id);
  const activeDemo = demos.find((demo) => demo.id === activeDemoId) ?? demos[0];

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-inner">
          <button className="brand" onClick={() => go("top")} aria-label="UnwhelmNet home">
            <span>Unwhelm</span><strong>Net</strong>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <button onClick={() => go("demos")}>Demos</button>
            <button onClick={() => go("work")}>Work</button>
            <button onClick={() => go("services")}>Services</button>
            <button onClick={() => go("about")}>About</button>
            <button className="nav-cta" onClick={() => go("contact")}>Contact</button>
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
            <button onClick={() => go("demos")}>Demos</button>
            <button onClick={() => go("work")}>Work</button>
            <button onClick={() => go("services")}>Services</button>
            <button onClick={() => go("about")}>About</button>
            <button onClick={() => go("contact")}>Contact</button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow hero-glow-a" />
          <div className="hero-glow hero-glow-b" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" />
                SOFTWARE • AI • AUTOMATION • CLOUD
              </div>
              <h1>
                Systems that have to
                <span> work together.</span>
              </h1>
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
                <button className="button button-primary" onClick={() => go("demos")}>
                  <Play size={17} fill="currentColor" />
                  Watch the work
                </button>
                <button className="button button-secondary" onClick={() => go("work")}>
                  Explore engineering projects
                  <ArrowRight size={17} />
                </button>
              </div>
              <div className="hero-notes">
                <span><ShieldCheck size={16} /> Deterministic guardrails around AI</span>
                <span><Workflow size={16} /> Integration-first architecture</span>
                <span><ServerCog size={16} /> Cloud + on-prem deployment</span>
              </div>
            </div>

            <aside className="architecture-card" aria-label="Architecture snapshot">
              <div className="architecture-topline">
                <span>HOW THE WORK IS APPROACHED</span>
                <TerminalSquare size={18} />
              </div>
              <div className="architecture-flow">
                <div className="flow-node">
                  <small>BUSINESS</small>
                  <strong>Workflow</strong>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-node">
                  <small>APPLICATION</small>
                  <strong>API + Rules</strong>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-node">
                  <small>INTEGRATION</small>
                  <strong>Adapters</strong>
                </div>
              </div>
              <div className="architecture-divider" />
              <div className="architecture-principles">
                <div>
                  <Code2 size={18} />
                  <span>
                    <strong>Real code</strong>
                    <small>Not slideware</small>
                  </span>
                </div>
                <div>
                  <Layers3 size={18} />
                  <span>
                    <strong>Clear ownership</strong>
                    <small>Truth lives somewhere</small>
                  </span>
                </div>
                <div>
                  <BrainCircuit size={18} />
                  <span>
                    <strong>AI where useful</strong>
                    <small>State stays deterministic</small>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="proof-strip" aria-label="Capabilities">
          <div className="container proof-grid">
            <span>Working software</span>
            <span>API integrations</span>
            <span>AI under application controls</span>
            <span>SQL + data pipelines</span>
            <span>Linux + Windows deployment</span>
          </div>
        </section>

        <section id="demos" className="section demos-section">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <div className="eyebrow eyebrow-dark"><Video size={15} /> SEE THE WORK</div>
                <h2>Demonstrations before claims.</h2>
              </div>
              <p>
                The fastest way to evaluate technical depth is to watch a system being
                explained while it runs. These are full implementation walkthroughs, not
                promotional reels.
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
                    <h3>{activeDemo.title}</h3>
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
                These players currently stream the existing UnwhelmNet video assets while
                this redesign is staged.
              </span>
              <a href="https://unwhelm.net/videos" target="_blank" rel="noreferrer">
                Open the full video library <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="container">
            <div className="section-heading">
              <div className="eyebrow eyebrow-dark"><Sparkles size={15} /> SELECTED ENGINEERING WORK</div>
              <h2>Architecture you can inspect.</h2>
              <p>
                Public projects are presented as evidence of how systems are modeled,
                integrated, constrained and operated—not as a list of technologies.
              </p>
            </div>

            <div className="work-grid">
              {work.map((item, index) => (
                <article className={index === 0 ? "work-card work-card-featured" : "work-card"} key={item.title}>
                  <div className="work-index">0{index + 1}</div>
                  <div className="work-content">
                    <span className="card-eyebrow">{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}><CheckCircle2 size={16} /> {detail}</li>
                      ))}
                    </ul>
                    <div className="work-links">
                      {item.links.map((link) => (
                        <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                          {link.label === "GitHub" ? <Github size={16} /> : <ExternalLink size={16} />}
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

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <div className="eyebrow eyebrow-dark">WHAT UNWHELMNET DOES</div>
                <h2>Technical capability, stated plainly.</h2>
              </div>
              <p>
                The focus is not selling a stack. It is making independently designed
                systems cooperate reliably enough to support the business workflow.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon"><service.icon size={23} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>

            <div className="specialty-panel">
              <div>
                <span className="card-eyebrow">DEEP DOMAIN EXPERIENCE</span>
                <h3>Property-management technology</h3>
                <p>
                  UnwhelmNet has substantial hands-on work around Propertyware, AppFolio,
                  leasing, maintenance, documents, SQL reporting, ETL and operational
                  automation. That domain experience remains a specialty without limiting
                  the broader integration practice.
                </p>
              </div>
              <a className="text-link" href="https://unwhelm.net/documents" target="_blank" rel="noreferrer">
                Review integration documents <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="section method-section">
          <div className="container">
            <div className="section-heading">
              <div className="eyebrow">FROM DISCOVERY TO DEMO</div>
              <h2>Engineering that can survive a customer conversation.</h2>
              <p>
                A useful technical partner has to move between business requirements,
                architecture, implementation and explanation without losing the thread.
              </p>
            </div>

            <div className="method-grid">
              {methods.map((method) => (
                <article key={method.number}>
                  <span>{method.number}</span>
                  <h3>{method.title}</h3>
                  <p>{method.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div>
              <div className="eyebrow eyebrow-dark">EDMUND LANDGRAF / UNWHELMNET</div>
              <h2>Direct technical ownership.</h2>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                UnwhelmNet is built around direct access to the engineer doing the discovery,
                architecture and implementation.
              </p>
              <p>
                The work spans modern web applications, APIs, SQL and data pipelines,
                third-party SaaS integration, AI-assisted systems, Linux and Windows
                infrastructure, and the operational details required to get those systems
                deployed.
              </p>
              <p>
                The goal is not to make every engagement sound like an enterprise
                transformation. It is to understand the system, build the right boundary,
                demonstrate what works, and be explicit about what still needs hardening.
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

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <div className="eyebrow">START WITH THE PROBLEM</div>
              <h2>Have systems that should work together?</h2>
              <p>
                Describe the workflow, the platforms involved, and where the current process
                breaks down. The first conversation can stay at the business level or go
                straight into APIs and architecture.
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
      </main>

      <footer>
        <div className="container footer-inner">
          <div>
            <div className="brand footer-brand"><span>Unwhelm</span><strong>Net</strong></div>
            <p>Custom Software • AI • Automation • Cloud Infrastructure</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/edmund-landgraf" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://amba.unwhelm.online" target="_blank" rel="noreferrer">AMBA</a>
            <a href="mailto:contact@unwhelmnet.com">Contact</a>
          </div>
          <small>© {new Date().getFullYear()} UnwhelmNet</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
