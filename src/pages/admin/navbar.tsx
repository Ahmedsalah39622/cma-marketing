import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type NavLink = { title?: string; href?: string };

export default function AdminNavbarSection() {
  const [content, setContent] = useState<any | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      const data = await getHomePageContent();
      setContent(data);
    }
    fetchContent();
  }, []);

  const update = (updater: (c: any) => any) => setContent((prev) => prev ? updater(prev) : prev);

  const handleSave = async () => {
    await saveHomePageContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  if (!content) return <div>Loading...</div>;

  const nav = content.navbar || content.mainNavbar || content['main-navbar'] || { links: [] };
  const links: NavLink[] = Array.isArray(nav.links) ? nav.links : [];

  return (
    <>
      <Head>
        <title>Edit Navbar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/adminlte/css/adminlte.min.css" />
        <link rel="stylesheet" href="/adminlte/plugins/fontawesome-free/css/all.min.css" />
      </Head>
      <div className="wrapper">
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link href="/admin" className="nav-link">Home</Link>
            </li>
          </ul>
        </nav>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <Link href="/admin" className="brand-link">
            <span className="brand-text font-weight-light">AdminLTE 3</span>
          </Link>
        </aside>
        <div className="content-wrapper">
          <section className="content pt-4">
            <div className="container-fluid">
              <div style={{ maxWidth: 900 }}>
                <h2>Navbar</h2>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 'bold' }}>Brand Text</label>
                  <input
                    className="form-control"
                    value={nav.brandText || ''}
                    onChange={e => update(c => ({ ...c, navbar: { ...(c.navbar || {}), brandText: e.target.value } }))}
                    style={{ marginTop: 6 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Brand Text (Arabic)</label>
                    <input
                      className="form-control"
                      value={nav.brandText_ar || ''}
                      onChange={e => update(c => ({ ...c, navbar: { ...(c.navbar || {}), brandText_ar: e.target.value } }))}
                      style={{ marginTop: 6 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 'bold' }}>Logo Image URL</label>
                  <input
                    className="form-control"
                    value={nav.logo || ''}
                    onChange={e => update(c => ({ ...c, navbar: { ...(c.navbar || {}), logo: e.target.value } }))}
                    style={{ marginTop: 6 }}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 'bold' }}>Primary CTA Label</label>
                  <input
                    className="form-control"
                    value={nav.ctaLabel || ''}
                    onChange={e => update(c => ({ ...c, navbar: { ...(c.navbar || {}), ctaLabel: e.target.value } }))}
                    style={{ marginTop: 6 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Primary CTA Label (Arabic)</label>
                    <input
                      className="form-control"
                      value={nav.ctaLabel_ar || ''}
                      onChange={e => update(c => ({ ...c, navbar: { ...(c.navbar || {}), ctaLabel_ar: e.target.value } }))}
                      style={{ marginTop: 6 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Primary CTA Link</label>
                  <input
                    className="form-control"
                    value={nav.ctaLink || ''}
                    onChange={e => update(c => ({ ...c, navbar: { ...(c.navbar || {}), ctaLink: e.target.value } }))}
                    style={{ marginTop: 6 }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <h4>Nav Links</h4>
                  {links.map((l, idx) => (
                    <div key={idx} className="d-flex mb-2">
                      <input value={l.title || ''} placeholder="Title" className="form-control mr-2" style={{ marginRight: 8 }} onChange={e => update(c => {
                        const base = c.navbar || {};
                        const arr = Array.isArray(base.links) ? [...base.links] : [];
                        arr[idx] = { ...(arr[idx] || {}), title: e.target.value };
                        return { ...c, navbar: { ...base, links: arr } };
                      })} />
                      <input value={(l as any).title_ar || ''} placeholder="Title (Arabic)" className="form-control mr-2" style={{ marginRight: 8 }} onChange={e => update(c => {
                        const base = c.navbar || {};
                        const arr = Array.isArray(base.links) ? [...base.links] : [];
                        arr[idx] = { ...(arr[idx] || {}), title_ar: e.target.value };
                        return { ...c, navbar: { ...base, links: arr } };
                      })} />
                      <input value={l.href || ''} placeholder="Href (e.g. /about)" className="form-control mr-2" style={{ marginRight: 8 }} onChange={e => update(c => {
                        const base = c.navbar || {};
                        const arr = Array.isArray(base.links) ? [...base.links] : [];
                        arr[idx] = { ...(arr[idx] || {}), href: e.target.value };
                        return { ...c, navbar: { ...base, links: arr } };
                      })} />
                      <button className="btn btn-danger" type="button" onClick={() => update(c => {
                        const base = c.navbar || {};
                        const arr = Array.isArray(base.links) ? [...base.links] : [];
                        arr.splice(idx, 1);
                        return { ...c, navbar: { ...base, links: arr } };
                      })}>Remove</button>
                    </div>
                  ))}
                  <button className="btn btn-secondary" type="button" onClick={() => update(c => {
                    const base = c.navbar || {};
                    const arr = Array.isArray(base.links) ? [...base.links] : [];
                    arr.push({ title: '', title_ar: '', href: '' });
                    return { ...c, navbar: { ...base, links: arr } };
                  })}>Add Link</button>
                </div>

                <button type="button" className="btn btn-primary" onClick={handleSave}>Save Navbar</button>
                {saved && <span style={{ marginLeft: 12, color: 'green' }}>Saved!</span>}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
