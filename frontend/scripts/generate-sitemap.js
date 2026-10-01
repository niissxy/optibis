import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const BASE_URL = 'https://optibis.id';
  const currentDate = new Date().toISOString().split('T')[0];

  const pkgMod = await import('../src/data/packages.js');
  const portMod = await import('../src/data/portfolio.js');
  const solMod = await import('../src/data/solutionLibrary.js');
  const virMod = await import('../src/data/viralog.js');

  const pkgs = Object.values(pkgMod.PACKAGE_DATA || {});
  const ports = Object.values(portMod.PORTFOLIO_DATA || {});
  const sols = solMod.SOLUTION_ITEMS || [];
  const virs = virMod.VIRALOG_CONTENT || [];
  const cats = virMod.VIRALOG_CATEGORIES || [];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/layanan', priority: '0.9', changefreq: 'weekly' },
    { url: '/paket', priority: '0.9', changefreq: 'weekly' },
    { url: '/digital-asset', priority: '0.9', changefreq: 'weekly' },
    { url: '/website', priority: '0.9', changefreq: 'weekly' },
    { url: '/digital-growth-team', priority: '0.9', changefreq: 'weekly' },
    { url: '/portofolio', priority: '0.8', changefreq: 'weekly' },
    { url: '/tools', priority: '0.8', changefreq: 'weekly' },
    { url: '/solution-library', priority: '0.8', changefreq: 'weekly' },
    { url: '/marketing-kit', priority: '0.8', changefreq: 'weekly' },
    { url: '/insight', priority: '0.8', changefreq: 'weekly' },
    { url: '/tentang', priority: '0.7', changefreq: 'monthly' },
    { url: '/content', priority: '0.9', changefreq: 'daily' },
    { url: '/trending', priority: '0.8', changefreq: 'daily' },
    { url: '/short-video', priority: '0.7', changefreq: 'daily' },
    { url: '/video', priority: '0.7', changefreq: 'daily' },
  ];

  const packagePages = pkgs.map((p) => ({
    url: `/paket/${p.pillarSlug}/${p.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
  }));

  const servicePages = [
    // Website Services (3 Standalone Services)
    { url: '/layanan/website/landing-page', priority: '0.85', changefreq: 'weekly' },
    { url: '/layanan/website/multi-page', priority: '0.85', changefreq: 'weekly' },
    { url: '/layanan/website/toko-online', priority: '0.85', changefreq: 'weekly' },
    // Digital Asset Services
    { url: '/layanan/digital-asset/brand-identity', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-asset/stationery-bisnis', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-asset/marketing-sales-assets', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-asset/social-media-assets', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-asset/content-media', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-asset/digital-channel-setup', priority: '0.8', changefreq: 'weekly' },
    // Digital Growth Team Services
    { url: '/layanan/digital-growth-team/strategi-planning', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-growth-team/content-management', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-growth-team/social-media-management', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-growth-team/website-management', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-growth-team/seo-visibility', priority: '0.8', changefreq: 'weekly' },
    { url: '/layanan/digital-growth-team/digital-advertising', priority: '0.8', changefreq: 'weekly' },
  ];

  const portfolioPages = ports.map((p) => ({
    url: `/portofolio/${p.slug}`,
    priority: '0.75',
    changefreq: 'monthly',
  }));

  const solutionPages = sols.map((s) => ({
    url: `/solution-library/${s.slug}`,
    priority: '0.75',
    changefreq: 'monthly',
  }));

  const virallogPages = virs.map((v) => ({
    url: `/content/${v.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: v.published_at ? v.published_at.split('T')[0] : currentDate,
  }));

  const categoryPages = cats.map((c) => ({
    url: `/kategori/${c.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  const allUrls = [
    ...staticPages,
    ...packagePages,
    ...servicePages,
    ...portfolioPages,
    ...solutionPages,
    ...virallogPages,
    ...categoryPages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Successfully generated sitemap.xml with ${allUrls.length} URLs at ${outputPath}`);
}

generateSitemap().catch(console.error);
