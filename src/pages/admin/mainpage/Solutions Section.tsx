import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getHomePageContent, saveHomePageContent } from '../../../lib/content';

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
      arr.push({ title: '', description: '' });
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
          <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>Add Solution Item</button>
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
