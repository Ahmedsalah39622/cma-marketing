import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type Social = { platform: string; url: string };
type Partner = { name: string; logoUrl?: string; socials?: Social[]; description?: string };

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
    setContent((prev: any) => ({
      ...(prev || {}),
      partners: [...(Array.isArray(prev?.partners) ? prev.partners : []), { name: '', name_ar: '', logoUrl: '', socials: [], description: '', description_ar: '' }]
    }));
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
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <div className="content-wrapper">
          <section className="content pt-4">
            <div className="container-fluid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
              <h2>Edit Partners Section</h2>
              <button className="btn btn-success mb-3" onClick={handleAdd}><i className="fas fa-plus"></i> Add Partner</button>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                {partners.map((p, idx) => (
                  <div key={idx} className="card mb-4" style={{ flex: '1 1 340px', minWidth: '320px', maxWidth: '420px' }}>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={p.name} onChange={e => handleChange(idx, 'name', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Name (Arabic)</label>
                        <input type="text" className="form-control" value={(p as any).name_ar || ''} onChange={e => handleChange(idx, 'name_ar', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" value={p.description || ''} onChange={e => handleChange(idx, 'description', e.target.value)} rows={2} placeholder="Enter partner description" />
                      </div>
                      <div className="form-group">
                        <label>Description (Arabic)</label>
                        <textarea className="form-control" value={(p as any).description_ar || ''} onChange={e => handleChange(idx, 'description_ar', e.target.value)} rows={2} placeholder="وصف الشريك" />
                      </div>
                      <div className="form-group">
                        <label>Logo</label>
                        <input type="file" className="form-control" accept="image/*" onChange={e => handleFileUpload(idx, e.target.files?.[0])} />
                        {p.logoUrl && <img src={p.logoUrl} alt="logo" style={{ width: 60, height: 60, marginTop: 8, borderRadius: 8 }} />}
                      </div>
                      <div className="form-group">
                        <label>Social Links</label>
                        {Array.isArray(p.socials) && p.socials.map((s, sIdx) => (
                          <div key={sIdx} className="input-group mb-2">
                            <select className="form-select" value={s.platform} onChange={e => handleChange(idx, 'socials', p.socials?.map((soc, i) => i === sIdx ? { ...soc, platform: e.target.value } : soc))}>
                              <option value="instagram">Instagram</option>
                              <option value="facebook">Facebook</option>
                              <option value="tiktok">TikTok</option>
                              <option value="youtube">YouTube</option>
                            </select>
                            <input type="text" className="form-control" placeholder="URL" value={s.url} onChange={e => handleChange(idx, 'socials', p.socials?.map((soc, i) => i === sIdx ? { ...soc, url: e.target.value } : soc))} />
                            <button className="btn btn-danger" type="button" onClick={() => handleRemoveSocial(idx, sIdx)}><i className="fas fa-trash"></i></button>
                          </div>
                        ))}
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => handleAddSocial(idx)}><i className="fas fa-plus"></i> Add Social</button>
                      </div>
                      <button className="btn btn-danger" onClick={() => handleRemove(idx)}><i className="fas fa-trash"></i> Remove Partner</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-success" onClick={handleSave}><i className="fas fa-save"></i> Save Changes</button>
              {saved && <span className="ml-3 text-success">Saved!</span>}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
