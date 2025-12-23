import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type HeroContent = {
  hero: {
    title?: string;
    title_ar?: string;
    subtitle?: string;
    subtitle_ar?: string;
    getStartedLabel?: string;
    getStartedLabel_ar?: string;
    getStartedTitle?: string;
    getStartedTitle_ar?: string;
    learnMoreLabel?: string;
    learnMoreLabel_ar?: string;
    learnMoreTitle?: string;
    learnMoreTitle_ar?: string;
    scrollLabel?: string;
    scrollLabel_ar?: string;
    scrollTitle?: string;
    scrollTitle_ar?: string;
  };
};

export default function AdminHeroSection() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [saved, setSaved] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
      hero: { ...prev.hero, [field]: value },
    } : prev);
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
        <title>Edit Hero Section</title>
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
                {/* Main Page Sections Dropdown (always open) */}
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
                      <Link href="/admin/hero" className="nav-link active">Hero Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/mainpage/Services%20Section" className="nav-link">Services Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/mainpage/Solutions%20Section" className="nav-link">Solutions Section</Link>
                    </li>
                    {/* Add more section links here as needed */}
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
                <h2>Hero Section</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Title (EN)</label>
                  <input
                    value={content.hero?.title || ''}
                    onChange={e => handleChange('title', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                  />
                  <label style={{ fontWeight: 'bold', marginTop: 8 }}>Title (AR)</label>
                  <input
                    value={content.hero?.title_ar || ''}
                    onChange={e => handleChange('title_ar', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Subtitle (EN)</label>
                  <textarea
                    value={content.hero?.subtitle || ''}
                    onChange={e => handleChange('subtitle', e.target.value)}
                    className="form-control"
                    rows={3}
                    style={{ marginTop: 4 }}
                  />
                  <label style={{ fontWeight: 'bold', marginTop: 8 }}>Subtitle (AR)</label>
                  <textarea
                    value={content.hero?.subtitle_ar || ''}
                    onChange={e => handleChange('subtitle_ar', e.target.value)}
                    className="form-control"
                    rows={3}
                    style={{ marginTop: 4 }}
                  />
                </div>
                <div style={{ marginTop: 16, marginBottom: 16, background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
                  <h4>Hero Section Button/Label Texts</h4>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontWeight: 'bold' }}>Get Started Label (EN)</label>
                    <input
                      value={content.hero?.getStartedLabel || ''}
                      onChange={e => handleChange('getStartedLabel', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                    <label style={{ fontWeight: 'bold', marginTop: 8 }}>Get Started Label (AR)</label>
                    <input
                      value={content.hero?.getStartedLabel_ar || ''}
                      onChange={e => handleChange('getStartedLabel_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontWeight: 'bold' }}>Get Started Title (EN)</label>
                    <input
                      value={content.hero?.getStartedTitle || ''}
                      onChange={e => handleChange('getStartedTitle', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                    <label style={{ fontWeight: 'bold', marginTop: 8 }}>Get Started Title (AR)</label>
                    <input
                      value={content.hero?.getStartedTitle_ar || ''}
                      onChange={e => handleChange('getStartedTitle_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontWeight: 'bold' }}>Learn More Label (EN)</label>
                    <input
                      value={content.hero?.learnMoreLabel || ''}
                      onChange={e => handleChange('learnMoreLabel', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                    <label style={{ fontWeight: 'bold', marginTop: 8 }}>Learn More Label (AR)</label>
                    <input
                      value={content.hero?.learnMoreLabel_ar || ''}
                      onChange={e => handleChange('learnMoreLabel_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontWeight: 'bold' }}>Learn More Title (EN)</label>
                    <input
                      value={content.hero?.learnMoreTitle || ''}
                      onChange={e => handleChange('learnMoreTitle', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                    <label style={{ fontWeight: 'bold', marginTop: 8 }}>Learn More Title (AR)</label>
                    <input
                      value={content.hero?.learnMoreTitle_ar || ''}
                      onChange={e => handleChange('learnMoreTitle_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontWeight: 'bold' }}>Scroll Arrow Label (EN)</label>
                    <input
                      value={content.hero?.scrollLabel || ''}
                      onChange={e => handleChange('scrollLabel', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                    <label style={{ fontWeight: 'bold', marginTop: 8 }}>Scroll Arrow Label (AR)</label>
                    <input
                      value={content.hero?.scrollLabel_ar || ''}
                      onChange={e => handleChange('scrollLabel_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontWeight: 'bold' }}>Scroll Arrow Title (EN)</label>
                    <input
                      value={content.hero?.scrollTitle || ''}
                      onChange={e => handleChange('scrollTitle', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                    <label style={{ fontWeight: 'bold', marginTop: 8 }}>Scroll Arrow Title (AR)</label>
                    <input
                      value={content.hero?.scrollTitle_ar || ''}
                      onChange={e => handleChange('scrollTitle_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Hero Section
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