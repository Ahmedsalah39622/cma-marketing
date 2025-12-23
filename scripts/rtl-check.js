const fetch = require('node-fetch');

const routes = ['/', '/about', '/services', '/contact', '/case-studies', '/admin', '/admin-content-editor'];
const host = 'http://localhost:3000';

function hasArabic(text) {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
}

(async () => {
  const results = [];
  for (const route of routes) {
    const url = host + route;
    try {
      const res = await fetch(url);
      const html = await res.text();
      const dirAttr = /<html[^>]*dir=(?:"|')([^"']+)(?:"|')/i.exec(html);
      const bodyDir = /<body[^>]*dir=(?:"|')([^"']+)(?:"|')/i.exec(html);
      const hasDirRtl = (dirAttr && dirAttr[1].toLowerCase()==='rtl') || (bodyDir && bodyDir[1].toLowerCase()==='rtl');
      const containsArabic = hasArabic(html);
      const usesRtlClass = /class=["'][^"']*rtl[^"']*["']/i.test(html);
      results.push({ route, status: res.status, hasDirRtl, bodyDir: bodyDir?bodyDir[1]:null, htmlDir: dirAttr?dirAttr[1]:null, containsArabic, usesRtlClass });
    } catch (err) {
      results.push({ route, error: err.message });
    }
  }
  console.log(JSON.stringify(results, null, 2));
})();
