import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getHomePageContent, saveHomePageContent } from '../lib/content';

// Simple section editor component for demonstration
function SectionEditor({
  title,
  content,
  onChange,
  onSave,
  saved,
}: {
  title: string;
  content: string;
  onChange: (field: 'title' | 'content', value: string) => void;
  onSave: () => void;
  saved: boolean;
}) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSave();
      }}
      style={{
        background: '#fff',
        padding: 24,
        borderRadius: 8,
        boxShadow: '0 2px 8px #0001',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 'bold' }}>Title</label>
        <input
          value={title}
          onChange={e => onChange('title', e.target.value)}
          className="form-control"
          style={{ marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 'bold' }}>Content</label>
        <textarea
          value={content}
          onChange={e => onChange('content', e.target.value)}
          className="form-control"
          rows={5}
          style={{ marginTop: 4 }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      {saved && (
        <span style={{ marginLeft: 16, color: 'green' }}>Saved!</span>
      )}
    </form>
  );
}

export default function AdminDashboard() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getHomePageContent();
        setContent(data);
      } catch (e) {
        // fallback: if file doesn't exist, set default structure
        setContent({
          hero: { title: '', subtitle: '' },
          about: { heading: '', description: '' },
          services: { heading: '', description: '' },
          solutions: { heading: '', description: '' },
          technology: { heading: '', description: '' },
          contact: { heading: '', description: '' },
        });
      }
    }
    fetchContent();
  }, []);

  const handleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Handler to update section content (now takes section name)
  const handleSectionChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => {
      const updated = { ...prev };
      updated[section] = { ...updated[section], [field]: value };
      return updated;
    });
  };

  // Handler to save section (calls API)
  const handleSectionSave = async () => {
    await saveHomePageContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };



  return (
    <>
      <Head>
        <title>AdminLTE Dashboard</title>
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
          <div className="sidebar">
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Main Page Sections Dropdown (pinned open) */}
                <li className="nav-item has-treeview menu-open">
                  <div className="nav-link w-100 text-left" style={{ cursor: 'pointer' }}>
                    <i className="nav-icon fas fa-folder"></i>
                    <p>
                      Main Page Sections
                      <i className="right fas fa-angle-down" style={{ marginLeft: 8 }}></i>
                    </p>
                  </div>
                  <ul className="nav nav-treeview" style={{ marginLeft: 16, display: 'block' }}>
                    <li className="nav-item">
                      <Link href="/admin/hero" className="nav-link">Hero Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/services" className="nav-link">Services Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/solutions" className="nav-link">Solutions Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/navbar" className="nav-link">Navbar</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/footer" className="nav-link">Footer</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/process" className="nav-link">Process</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/client-success-stories" className="nav-link">Client Success Stories</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <div className="content-wrapper">
          <section className="content pt-4">
            <div className="container-fluid">
              <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
                <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Dashboard Home</h1>
                <p style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
                  Welcome to your AdminLTE dashboard. Here you will see an overview and, in the future, graphs and analytics.
                </p>
                <div style={{ background: '#f4f6f9', border: '1px dashed #ccc', borderRadius: 8, padding: 40, textAlign: 'center', color: '#aaa', fontSize: 20 }}>
                  {/* Placeholder for future graphs */}
                  <i className="fas fa-chart-bar" style={{ fontSize: 48, marginBottom: 16 }}></i>
                  <div>Graphs and analytics coming soon...</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// src/pages/index.tsx
export async function Home() {
  const content = await getHomePageContent();

  return (
    <main>
      <section>
        <h1>{content.hero.title}</h1>
        <p>{content.hero.subtitle}</p>
      </section>
      <section>
        <h2>{content.about.heading}</h2>
        <p>{content.about.description}</p>
      </section>
      {/* ...other sections... */}
    </main>
  );
}
