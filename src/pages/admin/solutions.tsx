import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type SolutionsContent = {
  solutions: {
    heading?: string;
    description?: string;
    solutions?: Array<{ title?: string; description?: string; icon?: string }>;
  };
};

export default function AdminSolutionsSection() {
  const [content, setContent] = useState<SolutionsContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      const data = await getHomePageContent();
      setContent(data);
    }
    fetchContent();
  }, []);

  const handleChange = (field: string, value: string) => {
    setContent((prev) => prev ? {
      ...prev,
      solutions: { ...prev.solutions, [field]: value },
    } : prev);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const arr = Array.isArray(prev.solutions?.solutions) ? [...prev.solutions!.solutions!] : [];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, solutions: { ...prev.solutions, solutions: arr } };
    });
  };

  const addItem = () => {
    setContent((prev) => {
      if (!prev) return prev;
      const arr = Array.isArray(prev.solutions?.solutions) ? [...prev.solutions!.solutions!] : [];
      arr.push({ title: '', title_ar: '', description: '', description_ar: '' });
      return { ...prev, solutions: { ...prev.solutions, solutions: arr } };
    });
  };

  const removeItem = (index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const arr = Array.isArray(prev.solutions?.solutions) ? [...prev.solutions!.solutions!] : [];
      arr.splice(index, 1);
      return { ...prev, solutions: { ...prev.solutions, solutions: arr } };
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
        <title>Edit Solutions Section</title>
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
                      <Link href="/admin/solutions" className="nav-link active">Solutions Section</Link>
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
              <div style={{ maxWidth: 800 }}>
                <h2>Solutions Section</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Heading</label>
                  <input
                    value={content.solutions?.heading || ''}
                    onChange={e => handleChange('heading', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Heading (Arabic)</label>
                    <input
                      value={(content.solutions as any)?.heading_ar || ''}
                      onChange={e => handleChange('heading_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Description</label>
                  <textarea
                    value={content.solutions?.description || ''}
                    onChange={e => handleChange('description', e.target.value)}
                    className="form-control"
                    rows={3}
                    style={{ marginTop: 4 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Description (Arabic)</label>
                    <textarea
                      value={(content.solutions as any)?.description_ar || ''}
                      onChange={e => handleChange('description_ar', e.target.value)}
                      className="form-control"
                      rows={3}
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 16, marginBottom: 16 }}>
                  <h4>Solution Items</h4>
                  {(Array.isArray(content.solutions?.solutions) ? content.solutions!.solutions! : []).map((item, idx) => (
                    <div key={idx} style={{ marginBottom: 12, padding: 12, borderRadius: 6, background: '#fff' }}>
                      <label style={{ fontWeight: 'bold' }}>Title</label>
                      <input
                        value={item.title || ''}
                        onChange={e => handleItemChange(idx, 'title', e.target.value)}
                        className="form-control"
                        style={{ marginTop: 4 }}
                      />
                      <label style={{ fontWeight: 'bold', marginTop: 8 }}>Title (Arabic)</label>
                      <input
                        value={(item as any).title_ar || ''}
                        onChange={e => handleItemChange(idx, 'title_ar', e.target.value)}
                        className="form-control"
                        style={{ marginTop: 4 }}
                      />
                      <label style={{ fontWeight: 'bold', marginTop: 8 }}>Description</label>
                      <textarea
                        value={item.description || ''}
                        onChange={e => handleItemChange(idx, 'description', e.target.value)}
                        className="form-control"
                        rows={2}
                        style={{ marginTop: 4 }}
                      />
                      <label style={{ fontWeight: 'bold', marginTop: 8 }}>Description (Arabic)</label>
                      <textarea
                        value={(item as any).description_ar || ''}
                        onChange={e => handleItemChange(idx, 'description_ar', e.target.value)}
                        className="form-control"
                        rows={2}
                        style={{ marginTop: 4 }}
                      />
                      <div style={{ marginTop: 8 }}>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItem(idx)}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>Add Solution Item</button>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Solutions Section
                </button>
                {saved && (
                  <span style={{ marginLeft: 16, color: 'green' }}>Saved!</span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
