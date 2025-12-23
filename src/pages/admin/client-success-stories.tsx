import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type Story = { name: string; position?: string; content: string };
type ClientStoriesContent = { clientSuccessStories: Story[] };

export default function AdminClientSuccessStoriesSection() {
  const [content, setContent] = useState<ClientStoriesContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      const data = await getHomePageContent();
      setContent({ clientSuccessStories: data.clientSuccessStories || [] });
      // Prefer full content object in future; admin pages may send partials which are merged server-side.
    }
    fetchContent();
  }, []);

  const updateStory = (index: number, field: keyof Story | string, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const stories = [...prev.clientSuccessStories];
      stories[index] = { ...stories[index], [field]: value } as any;
      return { ...prev, clientSuccessStories: stories };
    });
  };

  const addStory = () => {
    setContent((prev) => prev ? { ...prev, clientSuccessStories: [...prev.clientSuccessStories, { name: '', name_ar: '', position: '', position_ar: '', content: '', content_ar: '' }] } : prev);
  };

  const removeStory = (index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const stories = prev.clientSuccessStories.filter((_, i) => i !== index);
      return { ...prev, clientSuccessStories: stories };
    });
  };

  const handleSave = async () => {
    await saveHomePageContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  if (!content) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Edit Client Success Stories Section</title>
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
                      <Link href="/admin/client-success-stories" className="nav-link active">Client Success Stories</Link>
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
              <div style={{ maxWidth: 900 }}>
                <h2>Client Success Stories</h2>
                <div style={{ marginBottom: 16 }}>
                  {content.clientSuccessStories.map((s, i) => (
                    <div key={i} style={{ marginBottom: 12, padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ fontWeight: 'bold' }}>Name</label>
                        <input value={s.name} onChange={e => updateStory(i, 'name', e.target.value)} className="form-control" style={{ marginTop: 4 }} />
                        <label style={{ fontWeight: 'bold', marginTop: 8 }}>Name (Arabic)</label>
                        <input value={(s as any).name_ar || ''} onChange={e => updateStory(i, 'name_ar', e.target.value)} className="form-control" style={{ marginTop: 4 }} />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ fontWeight: 'bold' }}>Position</label>
                        <input value={s.position} onChange={e => updateStory(i, 'position', e.target.value)} className="form-control" style={{ marginTop: 4 }} />
                        <label style={{ fontWeight: 'bold', marginTop: 8 }}>Position (Arabic)</label>
                        <input value={(s as any).position_ar || ''} onChange={e => updateStory(i, 'position_ar', e.target.value)} className="form-control" style={{ marginTop: 4 }} />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ fontWeight: 'bold' }}>Content</label>
                        <textarea value={s.content} onChange={e => updateStory(i, 'content', e.target.value)} rows={3} className="form-control" style={{ marginTop: 4 }} />
                        <label style={{ fontWeight: 'bold', marginTop: 8 }}>Content (Arabic)</label>
                        <textarea value={(s as any).content_ar || ''} onChange={e => updateStory(i, 'content_ar', e.target.value)} rows={3} className="form-control" style={{ marginTop: 4 }} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <button className="btn btn-sm btn-danger" onClick={() => removeStory(i)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <button className="btn btn-secondary" onClick={addStory}>Add Story</button>
                </div>
                <button className="btn btn-primary" onClick={handleSave}>Save Stories</button>
                {saved && <span style={{ marginLeft: 12, color: 'green' }}>Saved!</span>}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
