import { type FormEvent, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download, FileSearch, Search } from "lucide-react";

export type LibraryDocument = {
  id: string;
  title: string;
  description: string;
  filename: string;
  fileType: string;
  fileSize: string;
  category: string;
  tags: string[];
  lastUpdated: string;
};

export const documentLibrary: LibraryDocument[] = [
  {
    id: "arch-2.0",
    title: "UnwhelmNet 2.0 Architecture",
    description:
      "The definitive guide to our Hybrid Intelligence strategy, blending on-premise SQL Server 2022 with modern Cloud-AI RAG pipelines.",
    filename: "UnwhelmNetReplit2.md",
    fileType: "Markdown",
    fileSize: "12 KB",
    category: "Architecture",
    tags: ["Hybrid AI", "SQL Server 2022", "Node.js", "React", "Architecture"],
    lastUpdated: "2026-05-04",
  },
  {
    id: "appfolio-int",
    title: "AppFolio Platform Integration Guide",
    description:
      "Comprehensive guide for AppFolio Stack and Non-Stack partner integrations, including API authentication and data mapping.",
    filename: "Appfolio_Platform_Integration_Guide.md",
    fileType: "Markdown",
    fileSize: "65 KB",
    category: "Integration",
    tags: ["AppFolio", "API", "Rently", "TenantTurner"],
    lastUpdated: "2024-01-14",
  },
  {
    id: "python-proj",
    title: "Selected Python Projects (Northpoint)",
    description: "Python project documentation and examples showcasing automation capabilities and technical expertise.",
    filename: "edmund-Python prjoects.md",
    fileType: "Markdown",
    fileSize: "9.5 KB",
    category: "Technical",
    tags: ["Python", "Automation", "Scripts"],
    lastUpdated: "2024-01-20",
  },
  {
    id: "propware-auto",
    title: "Sheet to Propertyware Building Create",
    description: "Automated bulk building creation tool from Excel/CSV to Propertyware via REST API.",
    filename: "SheetToPropertywareBuildingCreate.md",
    fileType: "Markdown",
    fileSize: "7.7 KB",
    category: "Integration",
    tags: ["Propertyware", "API", "Automation", "Excel"],
    lastUpdated: "2024-11-05",
  },
];

export const documentCategories = ["All", "Architecture", "Integration", "AI Solutions", "Case Studies", "Technical"];

export function markdownViewerPath(filename: string) {
  return `/markdown-viewer?file=${encodeURIComponent(filename)}`;
}

export function documentFilePath(filename: string) {
  return `/documents/${encodeURIComponent(filename)}`;
}

export function documentFromSearch(search: string) {
  const markdownDocs = documentLibrary.filter((document) => document.fileType === "Markdown");
  const requested = new URLSearchParams(search).get("file");
  return markdownDocs.find((document) => document.filename === requested) ?? markdownDocs[0];
}

export function DocumentsPage({ onOpen }: { onOpen: (filename: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return documentLibrary.filter((document) => {
      const matchesCategory = category === "All" || document.category === category;
      const matchesQuery =
        !needle ||
        document.title.toLowerCase().includes(needle) ||
        document.description.toLowerCase().includes(needle) ||
        document.tags.some((tag) => tag.toLowerCase().includes(needle));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section className="section documents-section route-section">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <div className="eyebrow eyebrow-dark">
              <FileSearch size={15} /> TECHNICAL DOCUMENTS
            </div>
            <h1>Document library.</h1>
          </div>
          <p>
            Guides and technical notes from the existing library. Markdown files open in the built-in viewer and stay
            available at the same <code>/documents/</code> paths.
          </p>
        </div>

        <form className="document-toolbar" onSubmit={(event: FormEvent) => event.preventDefault()}>
          <label className="document-search">
            <Search size={16} />
            <input
              type="search"
              value={query}
              placeholder="Search documents..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="document-filters" role="group" aria-label="Document categories">
            {documentCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={item === category ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </form>

        {visible.length === 0 ? (
          <p className="document-empty">No documents match that search.</p>
        ) : (
          <div className="work-grid document-grid">
            {visible.map((document) => (
              <article className="work-card" key={document.id}>
                <div className="case-rail" aria-label="Document metadata">
                  <FileSearch size={18} />
                  <span>{document.category}</span>
                  <strong>{document.fileType}</strong>
                </div>
                <div className="work-content">
                  <div className="case-file-header">
                    <span className="card-eyebrow">{document.category}</span>
                    <span className="case-status">{document.fileSize}</span>
                  </div>
                  <h2>{document.title}</h2>
                  <p className="work-summary">{document.description}</p>
                  <p className="document-meta">Updated {document.lastUpdated}</p>
                  <div className="tag-row">
                    {document.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="work-links">
                    {document.fileType === "Markdown" ? (
                      <a
                        href={markdownViewerPath(document.filename)}
                        onClick={(event) => {
                          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                          event.preventDefault();
                          onOpen(document.filename);
                        }}
                      >
                        <FileSearch size={16} /> Read
                      </a>
                    ) : null}
                    <a href={documentFilePath(document.filename)} download={document.filename}>
                      <Download size={16} /> Download
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function MarkdownViewer({
  initialFilename,
  onSelect,
}: {
  initialFilename: string;
  onSelect: (filename: string) => void;
}) {
  const markdownDocs = documentLibrary.filter((document) => document.fileType === "Markdown");
  const active = markdownDocs.find((document) => document.filename === initialFilename) ?? markdownDocs[0];
  const [source, setSource] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch(documentFilePath(active.filename), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Failed to load ${active.filename}`);
        setSource(await response.text());
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setSource("");
        setError(reason instanceof Error ? reason.message : "Failed to load markdown file");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [active.filename]);

  return (
    <section className="section documents-section route-section">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <div className="eyebrow eyebrow-dark">
              <FileSearch size={15} /> MARKDOWN
            </div>
            <h1>Documentation viewer.</h1>
          </div>
          <p>Browse and read the same markdown files served from the document library.</p>
        </div>

        <div className="viewer-layout">
          <aside className="viewer-list" aria-label="Available documents">
            <h2>Available documents</h2>
            {markdownDocs.map((document) => (
              <a
                key={document.id}
                href={markdownViewerPath(document.filename)}
                className={document.id === active.id ? "active" : ""}
                aria-current={document.id === active.id ? "true" : undefined}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  onSelect(document.filename);
                }}
              >
                <strong>{document.title}</strong>
                <span>{document.description}</span>
              </a>
            ))}
          </aside>

          <article className="viewer-panel">
            <header>
              <h2>{active.title}</h2>
              <a href={documentFilePath(active.filename)} download={active.filename}>
                <Download size={16} /> {active.filename}
              </a>
            </header>
            {loading ? <p className="document-empty">Loading document…</p> : null}
            {error ? <p className="document-empty">{error}</p> : null}
            {!loading && !error ? (
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
              </div>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  );
}
