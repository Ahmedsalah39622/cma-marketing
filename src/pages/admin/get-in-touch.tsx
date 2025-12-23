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
          title_ar: '',
          description: '',
          description_ar: '',
          whatsapp: '',
          services: [],
          services_ar: [],
          cards: [
            { icon: 'Phone', title: 'Phone', title_ar: 'هاتف', details: ['+20 1113146750'], description: 'Sun-Thurs from 8am to 6pm.', description_ar: 'من الأحد إلى الخميس من 8 صباحًا حتى 6 مساءً' },
            { icon: 'Mail', title: 'Email', title_ar: 'البريد الإلكتروني', details: ['novix.its.co@gmail.com'], description: 'Online support 24/7', description_ar: 'الدعم عبر الإنترنت 24/7' },
            { icon: 'MapPin', title: 'Office', title_ar: 'المكتب', details: ['Helmiet El-Zaitoun, Cairo, Egypt'], description: 'Contact with us', description_ar: 'اتصل بنا' },
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
      cards.push({ icon: '', title: '', title_ar: '', details: [''], description: '', description_ar: '' });
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
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
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
                    <i className="nav-icon fas fa-folder" />
                    <p>
                      Main Page Sections
                      <i className="right fas fa-angle-down" style={{ marginLeft: 8 }} />
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
              <h2>Edit Get In Touch Section</h2>

              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={section.title || ''} onChange={e => handleField('title', e.target.value)} />
                <div style={{ marginTop: 8 }}>
                  <label>Title (Arabic)</label>
                  <input type="text" className="form-control" value={(section as any).title_ar || ''} onChange={e => handleField('title_ar', e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={section.description || ''} onChange={e => handleField('description', e.target.value)} rows={2} />
                <div style={{ marginTop: 8 }}>
                  <label>Description (Arabic)</label>
                  <textarea className="form-control" value={(section as any).description_ar || ''} onChange={e => handleField('description_ar', e.target.value)} rows={2} />
                </div>
              </div>

              <div className="form-group">
                <label>WhatsApp</label>
                <input type="text" className="form-control" value={section.whatsapp || ''} onChange={e => handleField('whatsapp', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Services</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input type="text" className="form-control" value={newService} onChange={e => setNewService(e.target.value)} placeholder="Add new service" />
                  <button type="button" className="btn btn-primary" onClick={handleAddService}>Add</button>
                </div>
                <ul>
                  {Array.isArray(section.services) && section.services.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 8 }}>
                  <label>Services (Arabic)</label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input type="text" className="form-control" value={(content.getInTouch as any)?.services_ar?.join(',') || ''} onChange={e => {
                      const parts = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean);
                      setContent((prev: any) => ({ ...(prev || {}), getInTouch: { ...(prev?.getInTouch || {}), services_ar: parts } }));
                    }} placeholder="Comma-separated Arabic service names" />
                  </div>
                </div>
              </div>

              <h4>Contact Cards</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                {Array.isArray(section.cards) && section.cards.map((card, idx) => (
                  <div key={idx} className="card mb-3" style={{ flex: '1 1 340px', minWidth: '320px', maxWidth: '420px' }}>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Icon</label>
                        <input type="text" className="form-control" value={card.icon || ''} onChange={e => handleCardField(idx, 'icon', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" value={card.title || ''} onChange={e => handleCardField(idx, 'title', e.target.value)} />
                        <label style={{ marginTop: 8 }}>Title (Arabic)</label>
                        <input type="text" className="form-control" value={(card as any).title_ar || ''} onChange={e => handleCardField(idx, 'title_ar', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={card.description || ''} onChange={e => handleCardField(idx, 'description', e.target.value)} />
                        <label style={{ marginTop: 8 }}>Description (Arabic)</label>
                        <input type="text" className="form-control" value={(card as any).description_ar || ''} onChange={e => handleCardField(idx, 'description_ar', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Details (one per line)</label>
                        <textarea className="form-control" value={Array.isArray(card.details) ? card.details.join('\n') : ''} onChange={e => handleCardField(idx, 'details', e.target.value.split(/\r?\n/))} rows={2} />
                      </div>
                      <button type="button" className="btn btn-danger" onClick={() => handleRemoveCard(idx)}><i className="fas fa-trash" /> Remove Card</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16 }}>
                <button type="button" className="btn btn-primary mb-3" onClick={handleAddCard}><i className="fas fa-plus" /> Add Card</button>
                <button type="button" className="btn btn-success" onClick={async () => { await saveHomePageContent({ getInTouch: content?.getInTouch }); setSaved(true); setTimeout(() => setSaved(false), 1400); }}><i className="fas fa-save" /> Save Changes</button>
                {saved && <span className="ml-3 text-success">Saved!</span>}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
