import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type Social = { platform: string; url: string };
type Partner = { name: string; logoUrl?: string; socials?: Social[] };

export default function AdminPartners() {
  const [content, setContent] = useState<any | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      const data = await getHomePageContent();
      setContent(data);
    }
    fetchContent();
  }, []);

  // Ensure partners section exists so inputs are controlled
  useEffect(() => {
    if (!content) return;
    if (!content.partners) {
      setContent((prev: any) => ({ ...(prev || {}), partners: [] }));
    }
  }, [content]);

  const partners: Partner[] = Array.isArray(content?.partners) ? content.partners : [];

  const handleChange = (idx: number, key: keyof Partner, value: any) => {
    setContent((prev: any) => {
      const updated = { ...(prev || {}) };
      const p = Array.isArray(updated.partners) ? [...updated.partners] : [];
      p[idx] = { ...(p[idx] || {}), [key]: value };
      updated.partners = p;
      return updated;
    });
  };

  const handleAdd = () => {
    setContent((prev: any) => ({ ...(prev || {}), partners: [...(Array.isArray(prev?.partners) ? prev.partners : []), { name: '', logoUrl: '', socials: [] }] }));
  };

  const handleRemove = (idx: number) => {
    setContent((prev: any) => {
      if (!prev) return prev;
      const p = Array.isArray(prev.partners) ? [...prev.partners] : [];
      p.splice(idx, 1);
      return { ...prev, partners: p };
    });
  };

  const handleAddSocial = (idx: number) => {
    setContent((prev: any) => {
      const updated = { ...(prev || {}) };
      const p = Array.isArray(updated.partners) ? [...updated.partners] : [];
      const socials = Array.isArray(p[idx]?.socials) ? [...p[idx].socials] : [];
      socials.push({ platform: 'instagram', url: '' });
      p[idx] = { ...(p[idx] || {}), socials };
      updated.partners = p;
      return updated;
    });
  };

  const handleRemoveSocial = (pIdx: number, sIdx: number) => {
    setContent((prev: any) => {
      const updated = { ...(prev || {}) };
      const p = Array.isArray(updated.partners) ? [...updated.partners] : [];
      if (!p[pIdx]) return updated;
      const socials = Array.isArray(p[pIdx].socials) ? [...p[pIdx].socials] : [];
      socials.splice(sIdx, 1);
      p[pIdx] = { ...(p[pIdx] || {}), socials };
      updated.partners = p;
      return updated;
    });
  };

  const handleFileUpload = (idx: number, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleChange(idx, 'logoUrl', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      await saveHomePageContent({ partners: content?.partners });
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
    } catch (err) {
      console.error('Failed to save Partners section', err);
      alert('Failed to save partners. Check console for details.');
    }
  };

  if (!content) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Edit Partners</title>
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
                      <Link href="/admin/partners" className="nav-link active">Partners Section</Link>
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
                <h2>Partners Section</h2>
                <div style={{ marginBottom: 12 }}>
                  <button type="button" className="btn btn-success" onClick={handleAdd}>Add Partner</button>
                </div>
                {(partners || []).map((partner, idx) => (
                  <div key={idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 12, background: '#fafbfc' }}>
                    <div className="row">
                      <div className="col-md-4 mb-2">
                        <label>Name</label>
                        <input className="form-control" value={partner.name || ''} onChange={e => handleChange(idx, 'name', e.target.value)} />
                      </div>
                      <div className="col-md-4 mb-2">
                        <label>Logo URL / Image</label>
                        <input className="form-control" value={partner.logoUrl || ''} onChange={e => handleChange(idx, 'logoUrl', e.target.value)} />
                        <input className="form-control mt-2" type="file" onChange={e => handleFileUpload(idx, e.target.files?.[0])} />
                      </div>
                      <div className="col-md-4 mb-2">
                        <label>CTA Button Text</label>
                        <input className="form-control" value={partner.cta || ''} onChange={e => handleChange(idx, 'cta', e.target.value)} />
                        <label style={{ marginTop: 8 }}>Accent Color</label>
                        <input type="color" className="form-control" value={partner.color || '#0ea5a4'} onChange={e => handleChange(idx, 'color', e.target.value)} />
                      </div>
                      <div className="col-md-4 mb-2">
                        <label>Preview</label>
                        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: 4 }}>
                          {partner.logoUrl ? <img src={partner.logoUrl as string} alt="logo" style={{ maxHeight: 56 }} /> : <span className="text-muted">No image</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <label style={{ fontWeight: 'bold' }}>Socials</label>
                      {(Array.isArray(partner.socials) ? partner.socials : []).map((s, si) => (
                        <div className="row" key={si} style={{ marginBottom: 8 }}>
                          <div className="col-md-4">
                            <select className="form-control" value={s.platform} onChange={e => {
                              const val = e.target.value;
                              setContent((prev: any) => {
                                const updated = { ...(prev || {}) };
                                const p = Array.isArray(updated.partners) ? [...updated.partners] : [];
                                const socials = Array.isArray(p[idx]?.socials) ? [...p[idx].socials] : [];
                                socials[si] = { ...(socials[si] || {}), platform: val };
                                p[idx] = { ...(p[idx] || {}), socials };
                                updated.partners = p;
                                return updated;
                              });
                            }}>
                              <option value="instagram">Instagram</option>
                              <option value="facebook">Facebook</option>
                              <option value="tiktok">TikTok</option>
                              <option value="youtube">YouTube</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <input className="form-control" value={s.url} onChange={e => {
                              const val = e.target.value;
                              setContent((prev: any) => {
                                const updated = { ...(prev || {}) };
                                const p = Array.isArray(updated.partners) ? [...updated.partners] : [];
                                const socials = Array.isArray(p[idx]?.socials) ? [...p[idx].socials] : [];
                                socials[si] = { ...(socials[si] || {}), url: val };
                                p[idx] = { ...(p[idx] || {}), socials };
                                updated.partners = p;
                                return updated;
                              });
                            }} />
                          </div>
                          <div className="col-md-2">
                            <button className="btn btn-danger" onClick={() => handleRemoveSocial(idx, si)}>Remove</button>
                          </div>
                        </div>
                      ))}
                      <div>
                        <button className="btn btn-secondary" onClick={() => handleAddSocial(idx)}>Add Social</button>
                      </div>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <label style={{ fontWeight: 'bold' }}>Services (one per line)</label>
                      <textarea className="form-control" rows={3} value={Array.isArray(partner.services) ? partner.services.join('\n') : ''} onChange={e => {
                        const lines = e.target.value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
                        handleChange(idx, 'services', lines);
                      }} />
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <button className="btn btn-danger" onClick={() => handleRemove(idx)}>Remove Partner</button>
                    </div>
                  </div>
                ))}

                <div>
                  <button className="btn btn-primary" onClick={handleSave}>Save Partners</button>
                  {saved && <span style={{ marginLeft: 12, color: 'green' }}>Saved!</span>}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
