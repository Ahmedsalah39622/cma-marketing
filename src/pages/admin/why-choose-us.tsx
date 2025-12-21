import { useState, useEffect } from 'react';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

export default function AdminWhyChooseUs() {
  const [features, setFeatures] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomePageContent().then(data => {
      setFeatures(data.features || []);
      setLoading(false);
    });
  }, []);

  const updateFeature = (index, field, value) => {
    setFeatures(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addFeature = () => {
    setFeatures(prev => [...prev, { icon: '', title: '', description: '', color: '' }]);
  };

  const removeFeature = (index) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    await saveHomePageContent({ features });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Why Choose Us Features</h2>
      {features.map((f, i) => (
        <div key={i} className="mb-4 p-4 border rounded bg-white/5">
          <input value={f.icon} onChange={e => updateFeature(i, 'icon', e.target.value)} placeholder="Icon (e.g. Server)" className="form-control mb-2" />
          <input value={f.title} onChange={e => updateFeature(i, 'title', e.target.value)} placeholder="Title" className="form-control mb-2" />
          <input value={f.description} onChange={e => updateFeature(i, 'description', e.target.value)} placeholder="Description" className="form-control mb-2" />
          <input value={f.color} onChange={e => updateFeature(i, 'color', e.target.value)} placeholder="Color classes" className="form-control mb-2" />
          <button onClick={() => removeFeature(i)} className="btn btn-danger">Remove</button>
        </div>
      ))}
      <button onClick={addFeature} className="btn btn-secondary mb-4">Add Feature</button>
      <br />
      <button onClick={handleSave} className="btn btn-primary">Save Features</button>
      {saved && <span className="ml-4 text-green-600">Saved!</span>}
    </div>
  );
}
