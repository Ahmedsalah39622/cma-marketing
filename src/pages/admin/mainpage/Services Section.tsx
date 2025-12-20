import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getHomePageContent, saveHomePageContent } from '../../../lib/content';

type ServicesContent = {
  services: {
    heading?: string;
    description?: string;
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
