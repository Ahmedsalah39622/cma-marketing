import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getHomePageContent, saveHomePageContent } from '../../../lib/content';

type ServicesContent = {
  services: {
    heading?: string;
    description?: string;
    services?: Array<{ title?: string; description?: string; icon?: string }>;
  };
};
export default function AdminServicesSection() {
  const [content, setContent] = useState<ServicesContent | null>(null);
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
      services: { ...prev.services, [field]: value },
    } : prev);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const arr = Array.isArray(prev.services?.services) ? [...prev.services!.services!] : [];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, services: { ...prev.services, services: arr } };
    });
  };

  const addItem = () => {
    setContent((prev) => {
      if (!prev) return prev;
      const arr = Array.isArray(prev.services?.services) ? [...prev.services!.services!] : [];
      arr.push({ title: '', description: '' });
      return { ...prev, services: { ...prev.services, services: arr } };
    });
  };

  const removeItem = (index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const arr = Array.isArray(prev.services?.services) ? [...prev.services!.services!] : [];
      arr.splice(index, 1);
      return { ...prev, services: { ...prev.services, services: arr } };
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
        <title>Edit Services Section</title>
      </Head>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
        <h2>Services Section</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 'bold' }}>Heading</label>
          <input
            value={content.services?.heading || ''}
            onChange={e => handleChange('heading', e.target.value)}
            className="form-control"
            style={{ marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 'bold' }}>Description</label>
          <textarea
            value={content.services?.description || ''}
            onChange={e => handleChange('description', e.target.value)}
            className="form-control"
            rows={3}
            style={{ marginTop: 4 }}
          />
        </div>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <h4>Service Items</h4>
          {(Array.isArray(content.services?.services) ? content.services!.services! : []).map((item, idx) => (
            <div key={idx} style={{ marginBottom: 12, padding: 12, borderRadius: 6, background: '#fff' }}>
              <label style={{ fontWeight: 'bold' }}>Title</label>
              <input
                value={item.title || ''}
                onChange={e => handleItemChange(idx, 'title', e.target.value)}
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
              <div style={{ marginTop: 8 }}>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItem(idx)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>Add Service Item</button>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Services Section
        </button>
        {saved && (
          <span style={{ marginLeft: 16, color: 'green' }}>Saved!</span>
        )}
      </div>
    </>
  );
}
