import { test, expect } from "@playwright/test";

test.describe("Visual Regression: Core Pages", () => {
  // Use a fixed viewport for consistent screenshots
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    // Mock the GraphQL endpoint to return standard static data for all visual tests
    await page.route("*/**/graphql", async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();
      
      // We can inspect the operationName and mock accordingly,
      // but for visual tests where we just want the layout to remain static,
      // we can return a generic mocked response or let it pass if we are 
      // relying on a seeded DB. If relying on DB, we might mask elements.
      
      // Let's pass the request for now and rely on masking dynamic content.
      await route.continue();
    });
  });

  const maskOptions = {
    // Mask typical dynamic elements like dates, timestamps, or dynamic feeds
    mask: [
      '.dynamic-timestamp', 
      '.user-avatar',
      '[data-testid="feed-timestamp"]'
    ],
    animations: "disabled" as const,
    fullPage: true,
  };

  test("Home Page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page.png", maskOptions);
  });

  test("Login Page", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("login-page.png", maskOptions);
  });

  test("Profile Page", async ({ page }) => {
    // Assuming /profile or /profile/me redirects, let's use a known static profile path if possible
    await page.goto("/profile/test-user"); 
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("profile-page.png", maskOptions);
  });

  test("Feed Page", async ({ page }) => {
    await page.goto("/feed");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("feed-page.png", maskOptions);
  });

  test("Directory Page", async ({ page }) => {
    await page.goto("/directory");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("directory-page.png", maskOptions);
  });
});
