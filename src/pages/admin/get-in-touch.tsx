import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type ContactCard = { icon?: string; title?: string; details?: string[]; description?: string };
type GetInTouch = {
  title?: string;
  description?: string;
  whatsapp?: string;
  services?: string[];
  cards?: ContactCard[];
};

export default function AdminGetInTouch() {
  const [content, setContent] = useState<any | null>(null);
  const [saved, setSaved] = useState(false);
  const [newService, setNewService] = useState('');

  useEffect(() => {
    async function fetchContent() {
      const data = await getHomePageContent();
      setContent(data);
    }
    fetchContent();
  }, []);

  // Ensure section exists in the content object so inputs stay controlled
  useEffect(() => {
    if (!content) return;
    if (!content.getInTouch) {
      setContent((prev: any) => ({
        ...(prev || {}),
        getInTouch: {
          title: '',
          description: '',
          whatsapp: '',
          services: [],
          cards: [
            { icon: 'Phone', title: 'Phone', details: ['+20 1113146750'], description: 'Sun-Thurs from 8am to 6pm.' },
            { icon: 'Mail', title: 'Email', details: ['novix.its.co@gmail.com'], description: 'Online support 24/7' },
            { icon: 'MapPin', title: 'Office', details: ['Helmiet El-Zaitoun, Cairo, Egypt'], description: 'Contact with us' },
          ],
        },
      }));
    }
  }, [content]);
  // Card editing handlers
  const handleCardField = (idx: number, key: keyof ContactCard, value: any) => {
    setContent((prev: any) => {
      const cards = Array.isArray(prev?.getInTouch?.cards) ? [...prev.getInTouch.cards] : [];
      cards[idx] = { ...(cards[idx] || {}), [key]: value };
      return { ...(prev || {}), getInTouch: { ...(prev?.getInTouch || {}), cards } };
    });
  };
  const handleAddCard = () => {
    setContent((prev: any) => {
      const cards = Array.isArray(prev?.getInTouch?.cards) ? [...prev.getInTouch.cards] : [];
      cards.push({ icon: '', title: '', details: [''], description: '' });
      return { ...(prev || {}), getInTouch: { ...(prev?.getInTouch || {}), cards } };
    });
  };
  const handleRemoveCard = (idx: number) => {
    setContent((prev: any) => {
      const cards = Array.isArray(prev?.getInTouch?.cards) ? [...prev.getInTouch.cards] : [];
      cards.splice(idx, 1);
      return { ...(prev || {}), getInTouch: { ...(prev?.getInTouch || {}), cards } };
    });
  };

  const section: GetInTouch = content?.getInTouch || { title: '', description: '', whatsapp: '', services: [] };

  const handleField = (key: keyof GetInTouch, value: any) => {
    setContent((prev: any) => ({ ...(prev || {}), getInTouch: { ...(prev?.getInTouch || {}), [key]: value } }));
  };

  const handleAddService = () => {
    if (!newService) return;
    setContent((prev: any) => ({ ...(prev || {}), getInTouch: { ...(prev?.getInTouch || {}), services: [...(Array.isArray(prev?.getInTouch?.services) ? prev.getInTouch.services : []), newService] } }));
    setNewService('');
  };

  const handleRemoveService = (idx: number) => {
    setContent((prev: any) => {
      const services = Array.isArray(prev?.getInTouch?.services) ? [...prev.getInTouch.services] : [];
      services.splice(idx, 1);
      return { ...(prev || {}), getInTouch: { ...(prev?.getInTouch || {}), services } };
    });
  };

  const handleSave = async () => {
    try {
      // Send only the changed section to avoid overwriting other parts accidentally
      await saveHomePageContent({ getInTouch: content?.getInTouch });
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
    } catch (err) {
      console.error('Failed to save GetInTouch section', err);
      alert('Failed to save. Check console for details.');
    }
  };

  if (!content) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Edit Get In Touch</title>
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
                      <Link href="/admin/get-in-touch" className="nav-link active">Get in Touch</Link>
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
                <h2>Get In Touch</h2>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 'bold' }}>Title</label>
                  <input className="form-control" value={section.title || ''} onChange={e => handleField('title', e.target.value)} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 'bold' }}>Description</label>
                  <textarea className="form-control" rows={4} value={section.description || ''} onChange={e => handleField('description', e.target.value)} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 'bold' }}>WhatsApp Number</label>
                  <input className="form-control" value={section.whatsapp || ''} onChange={e => handleField('whatsapp', e.target.value)} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 'bold' }}>Services</label>
                  <div className="d-flex" style={{ gap: 8 }}>
                    <input className="form-control" value={newService} onChange={e => setNewService(e.target.value)} />
                    <button className="btn btn-secondary" onClick={handleAddService}>Add Service</button>
                  </div>
                  <ul style={{ marginTop: 8 }}>
                    {(Array.isArray(section.services) ? section.services : []).map((s: string, idx: number) => (
                      <li key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ flex: 1 }}>{s}</span>
                        <button className="btn btn-danger" onClick={() => handleRemoveService(idx)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontWeight: 'bold' }}>Contact Cards</label>
                  <button className="btn btn-success btn-sm mb-2 ml-2" onClick={handleAddCard} type="button">Add Card</button>
                  <ul style={{ marginTop: 8 }}>
                    {(Array.isArray(section.cards) ? section.cards : []).map((card, idx) => (
                      <li key={idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                        <div className="row">
                          <div className="col-md-2 mb-2">
                            <label>Icon</label>
                            <select className="form-control" value={card.icon || ''} onChange={e => handleCardField(idx, 'icon', e.target.value)}>
                              <option value="">Select Icon</option>
                              <option value="Phone">Phone</option>
                              <option value="Mail">Mail</option>
                              <option value="MapPin">MapPin</option>
                            </select>
                          </div>
                          <div className="col-md-2 mb-2">
                            <label>Title</label>
                            <input className="form-control" value={card.title || ''} onChange={e => handleCardField(idx, 'title', e.target.value)} placeholder="e.g. Phone" />
                          </div>
                          <div className="col-md-4 mb-2">
                            <label>Details (comma separated)</label>
                            <input className="form-control" value={Array.isArray(card.details) ? card.details.join(', ') : ''} onChange={e => handleCardField(idx, 'details', e.target.value.split(','))} placeholder="e.g. +20 1113146750, +20 22223333" />
                          </div>
                          <div className="col-md-3 mb-2">
                            <label>Description</label>
                            <input className="form-control" value={card.description || ''} onChange={e => handleCardField(idx, 'description', e.target.value)} placeholder="e.g. Sun-Thurs from 8am to 6pm." />
                          </div>
                          <div className="col-md-1 mb-2 d-flex align-items-end">
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveCard(idx)} type="button">Remove</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={handleSave}>Save Get In Touch</button>
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
