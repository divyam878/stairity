"use server";

import puppeteer from "puppeteer";

export async function POST(request) {
  const { url } = await request.json();

  if (!url) {
    return new Response(JSON.stringify({ error: "No URL provided" }), {
      status: 400,
    });
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    const startTime = Date.now();

    await page.goto(url, { waitUntil: "load", timeout: 30000 });

    const endTime = Date.now();
    const pageLoadTime = endTime - startTime;

    // Collect resource types and size
    const performanceData = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      const summary = {
        totalRequests: resources.length,
        totalSizeKB: (
          resources.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024
        ).toFixed(2),
        scripts: resources.filter((r) => r.initiatorType === "script").length,
        images: resources.filter((r) => r.initiatorType === "img").length,
        fonts: resources.filter((r) => r.initiatorType === "font").length,
        css: resources.filter((r) => r.initiatorType === "link").length,
      };
      return summary;
    });

    // Collect SEO and metadata information
    const seoData = await page.evaluate(() => {
      const meta = {};
      const metaTags = document.querySelectorAll('meta');
      metaTags.forEach(tag => {
        const name = tag.getAttribute('name') || tag.getAttribute('property');
        const content = tag.getAttribute('content');
        if (name && content) {
          meta[name] = content;
        }
      });

      return {
        title: document.title,
        metaTags: meta,
        headings: {
          h1: document.querySelectorAll('h1').length,
          h2: document.querySelectorAll('h2').length,
          h3: document.querySelectorAll('h3').length,
        },
        images: Array.from(document.images).map(img => ({
          src: img.src,
          alt: img.alt,
          hasAlt: !!img.alt,
        })),
        links: {
          total: document.links.length,
          internal: Array.from(document.links).filter(link => 
            link.hostname === window.location.hostname
          ).length,
          external: Array.from(document.links).filter(link => 
            link.hostname !== window.location.hostname
          ).length,
        },
        structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(script => {
            try {
              return JSON.parse(script.textContent);
            } catch {
              return null;
            }
          }).filter(Boolean),
      };
    });

    // Additional technical analysis
    const technicalData = await page.evaluate(() => {
      return {
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        responsive: {
          hasViewportMeta: !!document.querySelector('meta[name="viewport"]'),
          mediaQueries: Array.from(document.styleSheets)
            .filter(sheet => {
              try {
                return sheet.cssRules;
              } catch {
                return false;
              }
            })
            .reduce((count, sheet) => {
              return count + Array.from(sheet.cssRules)
                .filter(rule => rule.type === CSSRule.MEDIA_RULE).length;
            }, 0),
        },
        security: {
          hasHttps: window.location.protocol === 'https:',
          hasCsp: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
        },
        technologies: {
          hasJQuery: typeof window.jQuery !== 'undefined',
          hasReact: !!document.querySelector('[data-reactroot], [data-reactid]'),
          hasGoogleAnalytics: typeof window.ga !== 'undefined' || typeof window.gtag !== 'undefined',
        }
      };
    });

    await browser.close();

    return new Response(
      JSON.stringify({
        url,
        pageLoadTime,
        ...performanceData,
        seo: seoData,
        technical: technicalData,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Analysis failed:", error);
    return new Response(JSON.stringify({ error: "Analysis failed" }), {
      status: 500,
    });
  }
}
