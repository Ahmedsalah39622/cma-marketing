const http = require('http');
(async () => {
  try {
    const url = 'http://localhost:3000/api/content/home';
    const payload = {
      hero: { title: 'Welcome (EN)', title_ar: 'مرحبا (AR)' },
      services: [
        { id: 's1', title: 'Service One', title_ar: 'الخدمة الأولى', description: 'Desc1', description_ar: 'وصف1' }
      ],
      navbar: { links: [{ label: 'Home', label_ar: 'الرئيسية', href: '/' }] },
      footer: { text: 'Footer EN', text_ar: 'تذييل AR' },
      api_test_marker: 'admin-post-full-test',
      api_test_marker_ar: 'اختبار-النشر-من-الادمن'
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('POST status', res.status);
    const body = await res.text();
    console.log('POST response (first 400 chars):', body.slice(0, 400));
  } catch (err) {
    console.error(err.stack || err);
    process.exitCode = 1;
  }
})();
