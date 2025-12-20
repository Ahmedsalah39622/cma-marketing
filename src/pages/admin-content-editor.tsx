import { useState, useEffect } from 'react';

export default function AdminContentEditor() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newSection, setNewSection] = useState({ key: '', type: 'section' });
  function handleAddSection() {
    if (!newSection.key) return;
    setContent(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `${newSection.key}-${Date.now()}`,
          type: newSection.type,
          key: newSection.key,
          data: {},
        },
      ],
    }));
    setNewSection({ key: '', type: 'section' });
  }

  function handleRemoveSection(sectionId) {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId),
    }));
  }

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => { setContent(data); setLoading(false); })
      .catch(() => { setError('Failed to load content'); setLoading(false); });
  }, []);

  function handleChange(sectionId, field, value, isJson = false) {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        let newValue = value;
        if (isJson) {
          try {
            newValue = JSON.parse(value);
          } catch {
            newValue = value; // keep as string if invalid
          }
        }
        return { ...s, data: { ...s.data, [field]: newValue } };
      })
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch {
      setError('Failed to save content');
    }
    setSaving(false);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!content) return null;

  return (
    <div className="card card-primary">
      <div className="card-header"><h3 className="card-title">Edit Site Content</h3></div>
      <div className="card-body">
        <div className="mb-4 p-2 border rounded bg-light">
          <h5>Add New Section</h5>
          <div className="form-inline mb-2">
            <input
              className="form-control mr-2"
              placeholder="Section key (e.g. about-section1)"
              value={newSection.key}
              onChange={e => setNewSection(s => ({ ...s, key: e.target.value }))}
            />
            <select
              className="form-control mr-2"
              value={newSection.type}
              onChange={e => setNewSection(s => ({ ...s, type: e.target.value }))}
            >
              <option value="section">section</option>
              <option value="page">page</option>
              <option value="navbar">navbar</option>
              <option value="footer">footer</option>
              <option value="media">media</option>
            </select>
            <button className="btn btn-success" onClick={handleAddSection} type="button">Add Section</button>
          </div>
        </div>
        {content.sections.map(section => (
          <div key={section.id} className="mb-4 border rounded p-2 position-relative">
            <h5>{section.key} <span className="badge badge-secondary ml-2">{section.type}</span></h5>
            <button className="btn btn-danger btn-sm position-absolute" style={{ top: 8, right: 8 }} onClick={() => handleRemoveSection(section.id)} type="button">Remove</button>
            {Object.entries(section.data).map(([field, value]) => {
              const isObject = typeof value === 'object' && value !== null;
              return (
                <div className="form-group" key={field}>
                  <label>{field}</label>
                  {isObject ? (
                    <textarea
                      className="form-control font-monospace"
                      rows={4}
                      value={JSON.stringify(value, null, 2)}
                      onChange={e => handleChange(section.id, field, e.target.value, true)}
                    />
                  ) : (
                    <input
                      className="form-control"
                      value={value}
                      onChange={e => handleChange(section.id, field, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {saving ? <span>Saving...</span> : <button className="btn btn-primary" onClick={handleSave}>Save All</button>}
      </div>
    </div>
  );
}
