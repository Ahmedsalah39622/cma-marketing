import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type SocialItem = { name?: string; icon?: string; link?: string };
type QuickLink = { name?: string; path?: string };
type FooterContent = {
  footer: {
    copyright?: string;
    address?: string;
    // legacy simple socials string left for backward compatibility
    socials?: string;
    // new structured fields
    quickLinks?: QuickLink[];
    services?: string[];
    contact?: { email?: string; phones?: string[]; location?: string };
    socialsStructured?: SocialItem[];
  };
};

export default function AdminFooterSection() {
  const [content, setContent] = useState<FooterContent | null>(null);
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
      footer: { ...prev.footer, [field]: value },
    } : prev);
  };

  const updateFooter = (updater: (f: FooterContent['footer']) => FooterContent['footer']) => {
    setContent((prev) => {
      if (!prev) return prev;
      const baseFooter = prev.footer || {};
      const updated = updater(baseFooter as FooterContent['footer']);
      return { ...prev, footer: updated };
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
        <title>Edit Footer Section</title>
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
                      <Link href="/admin/footer" className="nav-link active">Footer</Link>
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
                <h2>Footer Section</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Copyright Text</label>
                  <input
                    value={content.footer?.copyright || ''}
                    onChange={e => handleChange('copyright', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Copyright Text (Arabic)</label>
                    <input
                      value={(content.footer as any)?.copyright_ar || ''}
                      onChange={e => handleChange('copyright_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Company Name</label>
                  <input
                    value={(content.footer as any)?.companyName || ''}
                    onChange={e => handleChange('companyName', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Company Name (Arabic)</label>
                    <input
                      value={(content.footer as any)?.companyName_ar || ''}
                      onChange={e => handleChange('companyName_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Short Description</label>
                  <textarea
                    value={(content.footer as any)?.description || ''}
                    onChange={e => handleChange('description', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                    rows={3}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Short Description (Arabic)</label>
                    <textarea
                      value={(content.footer as any)?.description_ar || ''}
                      onChange={e => handleChange('description_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                      rows={3}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Address</label>
                  <input
                    value={content.footer?.address || ''}
                    onChange={e => handleChange('address', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Address (Arabic)</label>
                    <input
                      value={(content.footer as any)?.address_ar || ''}
                      onChange={e => handleChange('address_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <h4>Quick Links</h4>
                  {(content.footer?.quickLinks || []).map((ql, idx) => (
                    <div key={idx} className="mb-2 d-flex">
                      <input
                        placeholder="Link name"
                        value={ql.name || ''}
                        onChange={e => updateFooter(f => {
                          const arr = Array.isArray(f.quickLinks) ? [...f.quickLinks] : [];
                          arr[idx] = { ...(arr[idx] || {}), name: e.target.value };
                          return { ...f, quickLinks: arr };
                        })}
                        className="form-control mr-2"
                        style={{ marginRight: 8 }}
                      />
                      <input
                        placeholder="Link name (Arabic)"
                        value={(ql as any).name_ar || ''}
                        onChange={e => updateFooter(f => {
                          const arr = Array.isArray(f.quickLinks) ? [...f.quickLinks] : [];
                          arr[idx] = { ...(arr[idx] || {}), name_ar: e.target.value };
                          return { ...f, quickLinks: arr };
                        })}
                        className="form-control mr-2"
                        style={{ marginRight: 8 }}
                      />
                      <input
                        placeholder="Path (e.g. /services)"
                        value={ql.path || ''}
                        onChange={e => updateFooter(f => {
                          const arr = Array.isArray(f.quickLinks) ? [...f.quickLinks] : [];
                          arr[idx] = { ...(arr[idx] || {}), path: e.target.value };
                          return { ...f, quickLinks: arr };
                        })}
                        className="form-control mr-2"
                        style={{ marginRight: 8 }}
                      />
                      <button className="btn btn-danger" type="button" onClick={() => updateFooter(f => {
                        const arr = Array.isArray(f.quickLinks) ? [...f.quickLinks] : [];
                        arr.splice(idx, 1);
                        return { ...f, quickLinks: arr };
                      })}>Remove</button>
                    </div>
                  ))}
                  <button className="btn btn-secondary" type="button" onClick={() => updateFooter(f => ({
                    ...f,
                    quickLinks: [ ...(Array.isArray(f.quickLinks) ? f.quickLinks : []), { name: '', name_ar: '', path: '' } ],
                  }))}>Add Quick Link</button>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h4>Our Services</h4>
                  {(content.footer?.services || []).map((s, idx) => (
                    <div key={idx} className="mb-2 d-flex">
                      <input
                        placeholder="Service name"
                        value={s || ''}
                        onChange={e => updateFooter(f => {
                          const arr = Array.isArray(f.services) ? [...f.services] : [];
                          arr[idx] = e.target.value;
                          return { ...f, services: arr };
                        })}
                        className="form-control mr-2"
                        style={{ marginRight: 8 }}
                      />
                      <input
                        placeholder="Service name (Arabic)"
                        value={Array.isArray((content.footer as any).services_ar) ? ((content.footer as any).services_ar[idx] || '') : ''}
                        onChange={e => updateFooter(f => {
                          const arrAr = Array.isArray((f as any).services_ar) ? [...(f as any).services_ar] : [];
                          arrAr[idx] = e.target.value;
                          return { ...f, services_ar: arrAr };
                        })}
                        className="form-control mr-2"
                        style={{ marginRight: 8 }}
                      />
                      <button className="btn btn-danger" type="button" onClick={() => updateFooter(f => {
                        const arr = Array.isArray(f.services) ? [...f.services] : [];
                        arr.splice(idx, 1);
                        const arrAr = Array.isArray((f as any).services_ar) ? [...(f as any).services_ar] : [];
                        arrAr.splice(idx, 1);
                        return { ...f, services: arr, services_ar: arrAr };
                      })}>Remove</button>
                    </div>
                  ))}
                  <button className="btn btn-secondary" type="button" onClick={() => updateFooter(f => ({
                    ...f,
                    services: [ ...(Array.isArray(f.services) ? f.services : []), '' ],
                    services_ar: [ ...(Array.isArray((f as any).services_ar) ? (f as any).services_ar : []), '' ],
                  }))}>Add Service</button>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h4>Contact Us</h4>
                  <div className="mb-2">
                    <label style={{ fontWeight: 'bold' }}>Email</label>
                    <input
                      value={content.footer?.contact?.email || ''}
                      onChange={e => updateFooter(f => ({ ...f, contact: { ...(f.contact || {}), email: e.target.value } }))}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ fontWeight: 'bold' }}>Phones</label>
                    {(content.footer?.contact?.phones || []).map((p, idx) => (
                      <div key={idx} className="d-flex mb-2">
                        <input
                          placeholder="Phone number"
                          value={p || ''}
                          onChange={e => updateFooter(f => {
                            const phones = Array.isArray(f.contact?.phones) ? [...f.contact!.phones!] : [];
                            phones[idx] = e.target.value;
                            return { ...f, contact: { ...(f.contact || {}), phones } };
                          })}
                          className="form-control mr-2"
                          style={{ marginRight: 8 }}
                        />
                        <button className="btn btn-danger" type="button" onClick={() => updateFooter(f => {
                          const phones = Array.isArray(f.contact?.phones) ? [...f.contact!.phones!] : [];
                          phones.splice(idx, 1);
                          return { ...f, contact: { ...(f.contact || {}), phones } };
                        })}>Remove</button>
                      </div>
                    ))}
                    <button className="btn btn-secondary" type="button" onClick={() => updateFooter(f => ({
                      ...f,
                      contact: { ...(f.contact || {}), phones: [ ...(Array.isArray(f.contact?.phones) ? f.contact!.phones! : []), '' ] },
                    }))}>Add Phone</button>
                  </div>
                  <div className="mb-2">
                    <label style={{ fontWeight: 'bold' }}>Location</label>
                    <input
                      value={content.footer?.contact?.location || ''}
                      onChange={e => updateFooter(f => ({ ...f, contact: { ...(f.contact || {}), location: e.target.value } }))}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h4>Social Media (structured)</h4>
                  <p style={{ marginBottom: 8 }}>Add social items with a name, icon class (FontAwesome), and link.</p>
                  {(content.footer?.socialsStructured || []).map((s, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="d-flex mb-2">
                        <input
                          placeholder="Name (e.g. Twitter)"
                          value={s.name || ''}
                          onChange={e => updateFooter(f => {
                            const arr = Array.isArray(f.socialsStructured) ? [...f.socialsStructured] : [];
                            arr[idx] = { ...(arr[idx] || {}), name: e.target.value };
                            return { ...f, socialsStructured: arr };
                          })}
                          className="form-control mr-2"
                          style={{ marginRight: 8 }}
                        />
                        <select
                          value={s.icon || ''}
                          onChange={e => updateFooter(f => {
                            const arr = Array.isArray(f.socialsStructured) ? [...f.socialsStructured] : [];
                            arr[idx] = { ...(arr[idx] || {}), icon: e.target.value };
                            return { ...f, socialsStructured: arr };
                          })}
                          className="form-control mr-2"
                          style={{ marginRight: 8 }}
                        >
                          <option value="">(use default)</option>
                          <option value="fab fa-facebook-f">Facebook</option>
                          <option value="fab fa-twitter">Twitter</option>
                          <option value="fab fa-linkedin-in">LinkedIn</option>
                          <option value="fab fa-instagram">Instagram</option>
                          <option value="fab fa-youtube">YouTube</option>
                          <option value="fab fa-github">GitHub</option>
                        </select>
                        <input
                          placeholder="Link (https://...)"
                          value={s.link || ''}
                          onChange={e => updateFooter(f => {
                            const arr = Array.isArray(f.socialsStructured) ? [...f.socialsStructured] : [];
                            arr[idx] = { ...(arr[idx] || {}), link: e.target.value };
                            return { ...f, socialsStructured: arr };
                          })}
                          className="form-control mr-2"
                          style={{ marginRight: 8 }}
                        />
                        <button className="btn btn-danger" type="button" onClick={() => updateFooter(f => {
                          const arr = Array.isArray(f.socialsStructured) ? [...f.socialsStructured] : [];
                          arr.splice(idx, 1);
                          return { ...f, socialsStructured: arr };
                        })}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-secondary" type="button" onClick={() => updateFooter(f => ({
                    ...f,
                    socialsStructured: [ ...(Array.isArray(f.socialsStructured) ? f.socialsStructured : []), { name: '', icon: '', link: '' } ],
                  }))}>Add Social</button>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Footer Section
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
