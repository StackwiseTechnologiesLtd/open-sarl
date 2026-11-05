#!/usr/bin/env node
/**
 * Scrape LinkedIn post pages listed in lib/data/linkedin-articles.json.
 *
 * First-time setup (manual login — session saved locally, not committed):
 *   npm run linkedin:login
 *
 * Fetch text + images for all URLs:
 *   npm run linkedin:scrape
 *
 * Options:
 *   --login     Open browser to log in; saves .linkedin-auth/storage-state.json
 *   --headed    Show browser while scraping
 *   --post=N    Scrape only one post number
 */
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const CATALOG_PATH = resolve(ROOT, "lib/data/linkedin-articles.json");
const OUT_JSON = resolve(ROOT, "lib/data/linkedin-articles-enriched.json");
const AUTH_DIR = resolve(ROOT, ".linkedin-auth");
const STORAGE_STATE = resolve(AUTH_DIR, "storage-state.json");
const MEDIA_DIR = resolve(ROOT, "docs/media/linkedin");

const args = new Set(process.argv.slice(2));
const loginMode = args.has("--login");
const headed = args.has("--headed") || loginMode;
const onlyPost = [...args].find((a) => a.startsWith("--post="))?.split("=")[1];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugPost(n) {
  return String(n).padStart(2, "0");
}

function guessExt(url, contentType) {
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("gif")) return ".gif";
  const fromPath = extname(new URL(url).pathname.split("?")[0]);
  if (/^\.(jpe?g|png|webp|gif)$/i.test(fromPath)) return fromPath;
  return ".jpg";
}

async function downloadImage(request, url, destPath) {
  const res = await request.get(url, { timeout: 60_000 });
  if (!res.ok()) throw new Error(`HTTP ${res.status()} for ${url}`);
  const ext = guessExt(url, res.headers()["content-type"]);
  const finalPath = destPath.replace(/\.(jpg|png|webp|gif)$/i, "") + ext;
  await pipeline(res.body(), createWriteStream(finalPath));
  return finalPath.replace(ROOT + "/", "");
}

async function extractPost(page) {
  return page.evaluate(() => {
    const clean = (s) => (s ?? "").replace(/\s+/g, " ").trim();

    const authWall =
      /authwall|checkpoint/.test(location.pathname) ||
      /^Sign In\b/i.test(document.title) ||
      /^Join now\b/i.test(document.title) ||
      Boolean(document.querySelector(".authwall-join-form"));

    const jsonLd = [];
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(script.textContent || "");
        jsonLd.push(data);
      } catch {
        /* ignore */
      }
    }

    const author =
      clean(
        document.querySelector(".update-components-actor__name")?.textContent ||
          document.querySelector('[data-test-id="main-feed-activity-card"] h2')?.textContent ||
          document.querySelector(".profile-rail-card__actor-link")?.textContent,
      ) || null;

    const publishedAt =
      clean(
        document.querySelector(".update-components-actor__sub-description")?.textContent ||
          document.querySelector("time")?.getAttribute("datetime") ||
          document.querySelector("time")?.textContent,
      ) || null;

    const textSelectors = [
      ".feed-shared-update-v2__commentary",
      ".update-components-text",
      ".feed-shared-text-view",
      '[class*="feed-shared-inline-show-more-text"]',
      ".main-feed-activity-card__commentary",
    ];

    let text = "";
    for (const sel of textSelectors) {
      const el = document.querySelector(sel);
      if (el?.innerText?.trim()) {
        text = el.innerText.trim();
        break;
      }
    }

    if (!text) {
      const article =
        document.querySelector(".main-feed-activity-card") ||
        document.querySelector('[data-urn*="urn:li:activity"]') ||
        document.querySelector("main");
      text = article?.innerText?.trim().slice(0, 8000) ?? "";
    }

    const imageUrls = new Set();
    for (const img of document.querySelectorAll("img")) {
      const src = img.currentSrc || img.src;
      if (!src || !src.includes("media.licdn.com")) continue;
      if (src.includes("profile-displayphoto") || src.includes("company-logo")) continue;
      if (src.includes("emoji")) continue;
      imageUrls.add(src.split("?")[0] + (src.includes("?") ? "?" + src.split("?")[1] : ""));
    }

    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content");
    if (ogImage) imageUrls.add(ogImage);

    const hashtags = [...text.matchAll(/#[\w\u00C0-\u024F]+/g)].map((m) => m[0]);

    return {
      authWall,
      author,
      publishedAt,
      text,
      hashtags: [...new Set(hashtags)],
      imageUrls: [...imageUrls],
      pageTitle: document.title,
      jsonLd,
    };
  });
}

async function runLogin(context, page) {
  mkdirSync(AUTH_DIR, { recursive: true });
  await page.goto("https://www.linkedin.com/login", { waitUntil: "domcontentloaded" });
  console.log("\nLog in to LinkedIn in the browser window.");
  console.log("When your feed loads, the session will be saved automatically (up to 5 minutes)…\n");

  await page.waitForURL(
    (url) =>
      url.hostname.includes("linkedin.com") &&
      !url.pathname.includes("/login") &&
      !url.pathname.includes("/checkpoint"),
    { timeout: 300_000 },
  );

  await sleep(2000);
  await context.storageState({ path: STORAGE_STATE });
  console.log(`Saved session to ${STORAGE_STATE}`);
}

async function scrapeItem(context, item) {
  const page = await context.newPage();
  const result = {
    post: item.post,
    topic: item.topic,
    url: item.url,
    resolvedUrl: null,
    author: null,
    publishedAt: null,
    text: null,
    hashtags: [],
    images: [],
    pageTitle: null,
    error: null,
    scrapedAt: new Date().toISOString(),
  };

  try {
    const response = await page.goto(item.url, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    });
    result.resolvedUrl = page.url();
    await page.waitForTimeout(2500);

    try {
      await page.locator('button[aria-label*="more"]').first().click({ timeout: 3000 });
      await page.getByRole("button", { name: /see more|voir plus/i }).click({ timeout: 2000 });
      await page.waitForTimeout(500);
    } catch {
      /* expand optional */
    }

    const extracted = await extractPost(page);
    if (extracted.authWall) {
      result.error = "LinkedIn auth wall — run npm run linkedin:login first";
      return result;
    }

    result.author = extracted.author;
    result.publishedAt = extracted.publishedAt;
    result.text = extracted.text || null;
    result.hashtags = extracted.hashtags;
    result.pageTitle = extracted.pageTitle;

    mkdirSync(MEDIA_DIR, { recursive: true });
    let index = 0;
    for (const imageUrl of extracted.imageUrls) {
      try {
        const base = resolve(MEDIA_DIR, `post-${slugPost(item.post)}-${index}.jpg`);
        const localPath = await downloadImage(page.request, imageUrl, base);
        result.images.push({ originalUrl: imageUrl, localPath });
        index += 1;
      } catch (err) {
        result.images.push({
          originalUrl: imageUrl,
          localPath: null,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
  } finally {
    await page.close();
  }

  return result;
}

async function main() {
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));

  const browser = await chromium.launch({ headless: !headed });

  const contextOptions = {
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 900 },
  };
  if (existsSync(STORAGE_STATE)) {
    contextOptions.storageState = STORAGE_STATE;
  }

  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  if (loginMode) {
    await runLogin(context, page);
    await browser.close();
    return;
  }

  if (!existsSync(STORAGE_STATE)) {
    console.warn("No saved LinkedIn session (.linkedin-auth/storage-state.json).");
    console.warn("Public previews may work; for full text run: npm run linkedin:login\n");
  }

  const enrichedItems = [];
  for (const item of catalog.items) {
    if (!item.url) {
      enrichedItems.push({
        post: item.post,
        topic: item.topic,
        url: null,
        resolvedUrl: null,
        author: null,
        publishedAt: null,
        text: null,
        hashtags: [],
        images: [],
        pageTitle: null,
        error: "No URL in catalog",
        scrapedAt: new Date().toISOString(),
      });
      continue;
    }
    if (onlyPost && String(item.post) !== onlyPost) continue;
    console.log(`Scraping post ${item.post}: ${item.topic.slice(0, 50)}…`);
    const row = await scrapeItem(context, item);
    enrichedItems.push(row);
    if (row.error) console.warn(`  ⚠ ${row.error}`);
    else console.log(`  ✓ ${row.text?.length ?? 0} chars, ${row.images.filter((i) => i.localPath).length} images`);
    await sleep(4000);
  }

  await browser.close();

  const payload = {
    title: catalog.title,
    sourceFile: catalog.sourceFile,
    scrapedAt: new Date().toISOString(),
    authState: existsSync(STORAGE_STATE) ? ".linkedin-auth/storage-state.json" : null,
    mediaDirectory: "docs/media/linkedin",
    items: enrichedItems,
  };

  writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${OUT_JSON}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
