/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://anmolgraphics.in', // 🔁 Replace with your domain
  generateRobotsTxt: true,             // ✅ Generate robots.txt automatically
  generateIndexSitemap: false,         // You can enable if you have large sites
  exclude: ['/server-sitemap.xml'],    // Optional
}
