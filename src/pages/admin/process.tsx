import { useState, useEffect } from 'react';
import { SearchCode, GitBranch, Code2, TestTube2, Rocket, HeadphonesIcon } from 'lucide-react';
const iconOptions = [
  { name: 'SearchCode', icon: SearchCode },
  { name: 'GitBranch', icon: GitBranch },
  { name: 'Code2', icon: Code2 },
  { name: 'TestTube2', icon: TestTube2 },
  { name: 'Rocket', icon: Rocket },
  { name: 'HeadphonesIcon', icon: HeadphonesIcon },
];
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';


type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

type ProcessContent = {
  process: {
    heading?: string;
    steps?: ProcessStep[];
  };
};

export default function AdminProcessSection() {
  const [content, setContent] = useState<ProcessContent | null>(null);
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
      process: { ...prev.process, [field]: value },
    } : prev);
  };

  const handleStepChange = (idx: number, key: keyof ProcessStep, value: string) => {
    setContent(prev => {
      if (!prev) return prev;
      const steps = Array.isArray(prev.process.steps) ? [...prev.process.steps] : [];
      steps[idx] = { ...steps[idx], [key]: value };
      return {
        ...prev,
        process: { ...prev.process, steps },
      };
    });
  };

  const handleAddStep = () => {
    setContent(prev => {
      if (!prev) return prev;
      const process = prev.process || { steps: [] };
      const steps = Array.isArray(process.steps) ? [...process.steps] : [];
      steps.push({ number: String(steps.length + 1).padStart(2, '0'), title: '', title_ar: '', description: '', description_ar: '', icon: '' });
      return {
        ...prev,
        process: { ...process, steps }
      };
    });
  };

  const handleRemoveStep = (idx: number) => {
    setContent(prev => {
      if (!prev) return prev;
      const steps = Array.isArray(prev.process.steps) ? [...prev.process.steps] : [];
      steps.splice(idx, 1);
      // Re-number steps
      steps.forEach((s, i) => s.number = String(i + 1).padStart(2, '0'));
      return {
        ...prev,
        process: { ...prev.process, steps },
      };
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
        <title>Edit Process Section</title>
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
                      <Link href="/admin/hero" className="nav-link">Hero Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/services" className="nav-link">Services Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/solutions" className="nav-link">Solutions Section</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/navbar" className="nav-link">Navbar</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/footer" className="nav-link">Footer</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/process" className="nav-link active">Process</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/client-success-stories" className="nav-link">Client Success Stories</Link>
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
              <div style={{ maxWidth: 800 }}>
                <h2>Process Section</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Heading</label>
                  <input
                    value={content.process?.heading || ''}
                    onChange={e => handleChange('heading', e.target.value)}
                    className="form-control"
                    style={{ marginTop: 4 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 'bold' }}>Heading (Arabic)</label>
                    <input
                      value={(content.process as any)?.heading_ar || ''}
                      onChange={e => handleChange('heading_ar', e.target.value)}
                      className="form-control"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 'bold' }}>Steps</label>
                  <div>
                    {(Array.isArray(content.process?.steps) ? content.process.steps : []).map((step, idx) => (
                      <div key={idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 12, background: '#fafbfc' }}>
                        <div className="row">
                          <div className="col-md-2 mb-2">
                            <label>Number</label>
                            <input
                              value={step.number}
                              onChange={e => handleStepChange(idx, 'number', e.target.value)}
                              className="form-control"
                              type="text"
                            />
                          </div>
                              <div className="col-md-3 mb-2">
                                <label>Title</label>
                                <input
                                  value={step.title}
                                  onChange={e => handleStepChange(idx, 'title', e.target.value)}
                                  className="form-control"
                                  type="text"
                                />
                                <label style={{ marginTop: 8 }}>Title (Arabic)</label>
                                <input
                                  value={(step as any).title_ar || ''}
                                  onChange={e => handleStepChange(idx, 'title_ar', e.target.value)}
                                  className="form-control"
                                  type="text"
                                />
                              </div>
                              <div className="col-md-5 mb-2">
                                <label>Description</label>
                                <input
                                  value={step.description}
                                  onChange={e => handleStepChange(idx, 'description', e.target.value)}
                                  className="form-control"
                                  type="text"
                                />
                                <label style={{ marginTop: 8 }}>Description (Arabic)</label>
                                <input
                                  value={(step as any).description_ar || ''}
                                  onChange={e => handleStepChange(idx, 'description_ar', e.target.value)}
                                  className="form-control"
                                  type="text"
                                />
                              </div>
                          <div className="col-md-2 mb-2">
                            <label>Icon</label>
                            <select
                              value={step.icon}
                              onChange={e => handleStepChange(idx, 'icon', e.target.value)}
                              className="form-control mb-1"
                            >
                              <option value="">Select icon…</option>
                              {iconOptions.map(opt => (
                                <option key={opt.name} value={opt.name}>{opt.name}</option>
                              ))}
                            </select>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                              {iconOptions.map(opt => (
                                <button
                                  key={opt.name}
                                  type="button"
                                  style={{ border: step.icon === opt.name ? '2px solid #0ea5a8' : '1px solid #ccc', borderRadius: 6, background: '#fff', padding: 2, cursor: 'pointer' }}
                                  title={opt.name}
                                  onClick={() => handleStepChange(idx, 'icon', opt.name)}
                                >
                                  <opt.icon size={22} style={{ color: step.icon === opt.name ? '#0ea5a8' : '#222' }} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => handleRemoveStep(idx)}>
                          Remove Step
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-success" onClick={handleAddStep}>
                      Add Step
                    </button>
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Process Section
                </button>
                {saved && (
                  <span style={{ marginLeft: 16, color: 'green' }}>Saved!</span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
