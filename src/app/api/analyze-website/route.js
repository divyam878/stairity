// API Route: Analyze Website Performance
// POST /api/analyze-website

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Use Google PageSpeed Insights API
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY || 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw'; // Public demo key
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&category=performance&category=accessibility&category=best-practices&category=seo`;

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('PageSpeed API error:', response.status, errorData);
      throw new Error(errorData.error?.message || 'PageSpeed API request failed');
    }

    const data = await response.json();
    
    // Extract scores
    const categories = data.lighthouseResult.categories;
    const audits = data.lighthouseResult.audits;

    const result = {
      url: data.id,
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100),
      metrics: {
        firstContentfulPaint: audits['first-contentful-paint']?.displayValue || 'N/A',
        largestContentfulPaint: audits['largest-contentful-paint']?.displayValue || 'N/A',
        totalBlockingTime: audits['total-blocking-time']?.displayValue || 'N/A',
        cumulativeLayoutShift: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        speedIndex: audits['speed-index']?.displayValue || 'N/A',
        timeToInteractive: audits['interactive']?.displayValue || 'N/A',
        serverResponseTime: audits['server-response-time']?.displayValue || 'N/A',
        domSize: audits['dom-size']?.displayValue || 'N/A',
        bootupTime: audits['bootup-time']?.displayValue || 'N/A',
        mainThreadWork: audits['mainthread-work-breakdown']?.displayValue || 'N/A',
        renderBlockingResources: audits['render-blocking-resources']?.displayValue || 'N/A',
        unusedJavascript: audits['unused-javascript']?.displayValue || 'N/A',
        unusedCss: audits['unused-css-rules']?.displayValue || 'N/A',
        networkRequests: audits['network-requests']?.details?.items?.length || 'N/A',
        totalByteWeight: audits['total-byte-weight']?.displayValue || 'N/A',
      },
      opportunities: Object.values(audits)
        .filter(audit => audit.score !== null && audit.score < 1 && audit.details?.type === 'opportunity')
        .slice(0, 5)
        .map(audit => ({
          title: audit.title,
          description: audit.description,
          savings: audit.displayValue || ''
        }))
    };

    return Response.json(result);

  } catch (error) {
    console.error('Website analysis error:', error);
    return Response.json(
      { error: 'Failed to analyze website. Please check the URL and try again.' },
      { status: 500 }
    );
  }
}
