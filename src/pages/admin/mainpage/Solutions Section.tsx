import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getHomePageContent, saveHomePageContent } from '../../../lib/content';

type SolutionsContent = {
  solutions: {
    heading?: string;
    description?: string;
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
      </Head>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
        <h2>Solutions Section</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 'bold' }}>Heading</label>
          <input
            value={content.solutions?.heading || ''}
            onChange={e => handleChange('heading', e.target.value)}
            className="form-control"
            style={{ marginTop: 4 }}
          />
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
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Solutions Section
        </button>
        {saved && (
          <span style={{ marginLeft: 16, color: 'green' }}>Saved!</span>
        )}
      </div>
    </>
  );
}
