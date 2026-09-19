import { expect, test } from "@playwright/test";

const expectedVideos = [
  "https://unwhelm.net/assets/VectorDB.mp4",
  "https://unwhelm.net/assets/UnwhelmNetChatRAG.mp4",
  "https://unwhelm.net/assets/unwhelmNodeNet_ContactUs.mp4",
  "https://unwhelm.net/assets/net-core-api-full.mp4",
];

test("proof-first homepage has the recruiter-facing story", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: /Unwhelm your tech stack/i })
  ).toBeVisible();

  await expect(page.getByRole("button", { name: /Watch the work/i })).toBeVisible();
  await expect(page.getByText("SOFTWARE • AI • AUTOMATION • CLOUD", { exact: true })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Demonstrations before claims." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Architecture you can inspect." })).toBeVisible();

  await expect(page.getByText("Adventure Maker by Act (AMBA)")).toBeVisible();
  await expect(page.getByText("AMBA → Owlbear Rodeo")).toBeVisible();
  await expect(page.getByText("Property-management systems integration")).toBeVisible();

  await expect(page.getByText("Serving 50+ SMBs")).toHaveCount(0);
  await expect(page.getByText("Greenfield Properties")).toHaveCount(0);
  await expect(page.getByText("Pacific Coast Rentals")).toHaveCount(0);

  await page.screenshot({ path: "test-results/home-desktop.png", fullPage: true });
});

test("technical proof links are inspectable and externally targeted", async ({ page }) => {
  await page.goto("/");

  const amba = page.getByRole("link", { name: "Live application" });
  await expect(amba).toHaveAttribute("href", "https://amba.unwhelm.online");
  await expect(amba).toHaveAttribute("target", "_blank");

  const githubLinks = page.getByRole("link", { name: "GitHub" });
  await expect(githubLinks.first()).toHaveAttribute(
    "href",
    "https://github.com/edmund-landgraf/AdventureMakerByAct"
  );

  await expect(
    page.getByRole("link", { name: /Review integration documents/i })
  ).toHaveAttribute("href", "https://unwhelm.net/documents");
});

test("video demo selector swaps the working source", async ({ page }) => {
  await page.goto("/");

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

test("mobile navigation and core CTA remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Toggle navigation" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav.getByRole("button", { name: "Demos" })).toBeVisible();
  await expect(mobileNav.getByRole("button", { name: "Work" })).toBeVisible();
  await expect(mobileNav.getByRole("button", { name: "Contact" })).toBeVisible();

  await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });
});
