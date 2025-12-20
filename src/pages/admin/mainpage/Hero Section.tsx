import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getHomePageContent, saveHomePageContent } from '../../../lib/content';

type HeroContent = {
  hero: {
    title?: string;
    subtitle?: string;
    getStartedLabel?: string;
    getStartedTitle?: string;
    learnMoreLabel?: string;
    learnMoreTitle?: string;
    scrollLabel?: string;
    scrollTitle?: string;
  };
};
export default function AdminHeroSection() {
  const [content, setContent] = useState<HeroContent | null>(null);
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
      </Head>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
        <h2>Hero Section</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 'bold' }}>Title</label>
          <input
            value={content.hero?.title || ''}
            onChange={e => handleChange('title', e.target.value)}
            className="form-control"
            style={{ marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 'bold' }}>Subtitle</label>
          <textarea
            value={content.hero?.subtitle || ''}
            onChange={e => handleChange('subtitle', e.target.value)}
            className="form-control"
            rows={3}
            style={{ marginTop: 4 }}
          />
        </div>
        <div style={{ marginTop: 16, marginBottom: 16, background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <h4>Hero Section Button/Label Texts</h4>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 'bold' }}>Get Started Label</label>
            <input
              value={content.hero?.getStartedLabel || ''}
              onChange={e => handleChange('getStartedLabel', e.target.value)}
              className="form-control"
              style={{ marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 'bold' }}>Get Started Title</label>
            <input
              value={content.hero?.getStartedTitle || ''}
              onChange={e => handleChange('getStartedTitle', e.target.value)}
              className="form-control"
              style={{ marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 'bold' }}>Learn More Label</label>
            <input
              value={content.hero?.learnMoreLabel || ''}
              onChange={e => handleChange('learnMoreLabel', e.target.value)}
              className="form-control"
              style={{ marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 'bold' }}>Learn More Title</label>
            <input
              value={content.hero?.learnMoreTitle || ''}
              onChange={e => handleChange('learnMoreTitle', e.target.value)}
              className="form-control"
              style={{ marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 'bold' }}>Scroll Arrow Label</label>
            <input
              value={content.hero?.scrollLabel || ''}
              onChange={e => handleChange('scrollLabel', e.target.value)}
              className="form-control"
              style={{ marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 'bold' }}>Scroll Arrow Title</label>
            <input
              value={content.hero?.scrollTitle || ''}
              onChange={e => handleChange('scrollTitle', e.target.value)}
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
    </>
  );
}
