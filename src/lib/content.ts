// Function to fetch home page content
export async function getHomePageContent() {
  const res = await fetch('/api/content/home');
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

// Function to save home page content
export async function saveHomePageContent(content: any) {
  // Read existing content and merge so admin pages can send partial section objects
  const currentRes = await fetch('/api/content/home');
  const current = currentRes.ok ? await currentRes.json() : {};
  const payload = { ...(current || {}), ...(content || {}) };

  const res = await fetch('/api/content/home', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error('Failed to save content' + (txt ? `: ${txt}` : ''));
  }
  return res.json();
}
// Flexible content model for all site sections, navbar, footer, and media
export type SiteSection = {
  id: string;
  type: 'page' | 'section' | 'navbar' | 'footer' | 'media';
  key: string; // e.g. 'home-hero', 'about-section1', 'main-navbar', 'main-footer', 'logo', 'favicon', etc.
  data: any;
};

export type SiteContent = {
  sections: SiteSection[];
};

// Example default content (to be replaced by DB or API)
export const defaultContent: SiteContent = {
  sections: [
    { id: 'home-hero', type: 'section', key: 'home-hero', data: { title: 'Welcome', subtitle: 'Edit me in admin!' } },
    { id: 'about-main', type: 'section', key: 'about-main', data: { heading: 'About Novix', description: 'We are a team of passionate innovators dedicated to transforming businesses through cutting-edge technology solutions.' } },
    { id: 'services-main', type: 'section', key: 'services-main', data: { heading: 'Our Services', services: [
      { title: 'Custom Software Development', description: 'Tailored solutions built from the ground up.' },
      { title: 'Cloud Solutions', description: 'Scalable and secure cloud infrastructure.' }
    ] } },
    { id: 'main-navbar', type: 'navbar', key: 'main-navbar', data: { links: [
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'Services', href: '/services' },
      { text: 'Solutions', href: '/solutions' },
      { text: 'Contact', href: '/contact' }
    ] } },
    { id: 'main-footer', type: 'footer', key: 'main-footer', data: { copyright: '© 2025 CMA Marketing' } },
    { id: 'logo', type: 'media', key: 'logo', data: { url: '/logo.png' } },
    // Add more sections as needed: testimonials, solutions, contact, etc.
  ],
};
