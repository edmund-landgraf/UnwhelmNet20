import { expect, test } from "@playwright/test";

const expectedVideos = [
  "https://unwhelm.net/assets/VectorDB.mp4",
  "https://unwhelm.net/assets/UnwhelmNetChatRAG.mp4",
  "https://unwhelm.net/assets/unwhelmNodeNet_ContactUs.mp4",
  "https://unwhelm.net/assets/net-core-api-full.mp4",
];

test("homepage is a focused route entry point", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: /Build the system between the systems/i })
  ).toBeVisible();

  await expect(page.getByRole("button", { name: /Watch proof of work/i })).toBeVisible();
  await expect(page.getByText("SOFTWARE • AI • AUTOMATION • CLOUD", { exact: true })).toBeVisible();
  await expect(page.getByText(/hands-on engineering: discovery, architecture, implementation/i)).toBeVisible();
  await expect(page.getByText("Cloud + on-prem deployment")).toBeVisible();
  await expect(page.getByText("Working software")).toBeVisible();
  await expect(page.getByText("AI under application controls")).toBeVisible();
  await expect(page.getByText("Real code")).toBeVisible();
  await expect(page.getByText("Truth lives somewhere")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose the evidence trail you want to inspect." })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Watch the engineering, then judge the fit." })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Case studies with the problem left in." })).toHaveCount(0);

  await expect(page.locator(".directory-card").filter({ hasText: "Real Estate Solutions" })).toBeVisible();
  await expect(page.locator(".directory-card").filter({ hasText: "AI Solutions" })).toBeVisible();
  await expect(page.locator(".directory-card").filter({ hasText: "Technical Skills" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Proof" })).toHaveAttribute("href", "/proof");
  await expect(page.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
  await expect(page.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
  await expect(page.locator(".directory-card").filter({ hasText: "Videos" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Documents/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Approach" })).toHaveAttribute("href", "/approach");

  await page.screenshot({ path: "test-results/home-desktop.png", fullPage: true });
});

test("primary navigation opens separate pages instead of anchors", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Proof" }).click();
  await expect(page).toHaveURL(/\/proof$/);
  await expect(page.getByRole("heading", { level: 1, name: "Watch the engineering, then judge the fit." })).toBeVisible();

  await page.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1, name: "Case studies with the problem left in." })).toBeVisible();

  await page.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1, name: "Not a stack. A set of boundary problems." })).toBeVisible();

  await page.goto("/videos");
  await expect(page.getByRole("heading", { level: 1, name: "Video library" })).toBeVisible();

  await page.goto("/documents");
  await expect(page.getByRole("heading", { level: 1, name: "Document library." })).toBeVisible();
  await expect(page.getByText("Sheet to Propertyware Building Create")).toBeVisible();

  await page.goto("/about");
  const technicalDocuments = page.getByRole("link", { name: "Technical documents" });
  await expect(technicalDocuments).toHaveAttribute("href", "/documents");
  await technicalDocuments.click();
  await expect(page).toHaveURL(/\/documents$/);
  await expect(page.getByRole("heading", { level: 1, name: "Document library." })).toBeVisible();

  await page.goto("/git");
  await expect(page.getByRole("heading", { level: 1, name: "Public repos, selected for inspection." })).toBeVisible();
  await expect(page.getByText("Adventure Maker by Act")).toBeVisible();
  await expect(page.getByText("AMBA to Owlbear Rodeo")).toBeVisible();
  await expect(page.getByText("UnwhelmNet 2.0")).toBeVisible();

  await page.getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL(/\/approach$/);
  await expect(page.getByRole("heading", { level: 1, name: "Clarity before custom work gets expensive." })).toBeVisible();
  await expect(page.getByText("Explain it at the right altitude")).toBeVisible();
});

test("technical proof links are inspectable and externally targeted", async ({ page }) => {
  await page.goto("/work");

  const amba = page.getByRole("link", { name: "Live application" });
  await expect(amba).toHaveAttribute("href", "https://amba.unwhelm.online");
  await expect(amba).toHaveAttribute("target", "_blank");

  const githubLinks = page.getByRole("link", { name: "GitHub" });
  await expect(githubLinks.first()).toHaveAttribute(
    "href",
    "https://github.com/edmund-landgraf/AdventureMakerByAct"
  );

  await page.goto("/services");
  const curatedGit = page.getByRole("link", { name: /Review curated Git page/i });
  await expect(curatedGit).toHaveAttribute("href", "/git");
  await curatedGit.click();
  await expect(page).toHaveURL(/\/git$/);
  await expect(page.getByRole("heading", { level: 1, name: "Public repos, selected for inspection." })).toBeVisible();
});

test("video demo selector swaps the working source", async ({ page }) => {
  await page.goto("/proof");

  const video = page.locator("video").first();
  await expect(video).toHaveAttribute("src", expectedVideos[0]);
  await page.getByRole("tab", { name: /Building a local RAG application/i }).click();
  await expect(video).toHaveAttribute("src", expectedVideos[1]);

  await page.getByRole("tab", { name: /Website-to-inbox engagement flow/i }).click();
  await expect(video).toHaveAttribute("src", expectedVideos[2]);

  await page.getByRole("tab", { name: /.NET Core API integration/i }).click();
  await expect(video).toHaveAttribute("src", expectedVideos[3]);
});

test("existing production video assets are reachable", async ({ request }) => {
  for (const url of expectedVideos) {
    const response = await request.get(url, {
      headers: { Range: "bytes=0-1023" },
      timeout: 20_000,
    });
    expect([200, 206]).toContain(response.status());
    expect(response.headers()["content-type"] ?? "").toMatch(/video|octet-stream/i);
  }
});

test("mobile navigation routes to separate pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Toggle navigation" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav.getByRole("link", { name: "Proof" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Work" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Start a project" })).toBeVisible();

  await mobileNav.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1, name: "Case studies with the problem left in." })).toBeVisible();

  await page.screenshot({ path: "test-results/work-mobile.png", fullPage: true });
});

test("rebuilt parity routes avoid old-site page links", async ({ page }) => {
  for (const route of ["/", "/real-estate", "/ai-solutions", "/ai-economics", "/web-design", "/platforms", "/case-studies", "/clients", "/diagramming", "/technical-skills", "/proof", "/videos", "/work", "/services", "/documents", "/git", "/approach", "/about", "/contact"]) {
    await page.goto(route);
    const oldSitePageLinks = page.locator('a[href^="https://unwhelm.net"]:not([href*="/assets/"])');
    await expect(oldSitePageLinks).toHaveCount(0);
  }
});
test("legacy navigation routes are rebuilt in the redesign", async ({ page }) => {
  const routes = [
    ["/real-estate", "Property-management systems, rebuilt around operational proof."],
    ["/ai-solutions", "AI under application controls."],
    ["/ai-economics", "Make the cost model visible before the build gets expensive."],
    ["/web-design", "Modern web applications that fit the workflow."],
    ["/platforms", "Platform boundaries made explicit."],
    ["/case-studies", "Case studies with the problem left in."],
    ["/clients", "Built for businesses with real workflows and limited patience for theater."],
    ["/diagramming", "Architecture diagrams that clarify ownership."],
    ["/technical-skills", "Senior implementation across software, data, AI, and infrastructure."],
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.getByText("Rebuilt route").first()).toBeVisible();
  }
});