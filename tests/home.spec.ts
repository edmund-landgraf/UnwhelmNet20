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
  await expect(page.getByRole("heading", { name: "Choose the part of the work you want to inspect." })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Watch the engineering, then judge the fit." })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Case studies with the problem left in." })).toHaveCount(0);

  await expect(page.locator(".directory-card").filter({ hasText: "Proof of work" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Selected work/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Proof" })).toHaveAttribute("href", "/proof");
  await expect(page.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
  await expect(page.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
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

  await page.getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL(/\/approach$/);
  await expect(page.getByRole("heading", { level: 1, name: "Clarity before custom work gets expensive." })).toBeVisible();
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
  await expect(
    page.getByRole("link", { name: /Review integration documents/i })
  ).toHaveAttribute("href", "https://unwhelm.net/documents");
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
