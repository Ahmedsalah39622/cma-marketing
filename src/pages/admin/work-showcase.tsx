import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getHomePageContent, saveHomePageContent } from '../../lib/content';

type Work = { client: string; videoUrl: string; title?: string };

export default function AdminWorkShowcase() {
	const [content, setContent] = useState<any | null>(null);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		async function fetchContent() {
			const data = await getHomePageContent();
			setContent(data);
		}
		fetchContent();
	}, []);

	useEffect(() => {
		if (!content) return;
		if (!content.workShowcase) {
			setContent((prev: any) => ({ ...(prev || {}), workShowcase: [] }));
		}
	}, [content]);

	const works: Work[] = Array.isArray(content?.workShowcase) ? content.workShowcase : [];

	const handleChange = (idx: number, key: keyof Work, value: any) => {
		setContent((prev: any) => {
			const updated = { ...(prev || {}) };
			const w = Array.isArray(updated.workShowcase) ? [...updated.workShowcase] : [];
			w[idx] = { ...(w[idx] || {}), [key]: value };
			updated.workShowcase = w;
			return updated;
		});
	};

	const handleAdd = () => {
		setContent((prev: any) => ({ ...(prev || {}), workShowcase: [...(Array.isArray(prev?.workShowcase) ? prev.workShowcase : []), { client: '', videoUrl: '', title: '' }] }));
	};

	const handleRemove = (idx: number) => {
		setContent((prev: any) => {
			if (!prev) return prev;
			const w = Array.isArray(prev.workShowcase) ? [...prev.workShowcase] : [];
			w.splice(idx, 1);
			return { ...prev, workShowcase: w };
		});
	};

	const handleSave = async () => {
		try {
			await saveHomePageContent({ workShowcase: content?.workShowcase });
			setSaved(true);
			setTimeout(() => setSaved(false), 1400);
		} catch (err) {
			console.error('Failed to save work showcase', err);
			alert('Failed to save. Check console for details.');
		}
	};

	if (!content) return <div>Loading...</div>;

	return (
		<>
			<Head>
				<title>Edit Work Showcase</title>
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
							<h2>Edit Work Showcase</h2>
							<button type="button" className="btn btn-success mb-3" onClick={handleAdd}><i className="fas fa-plus" /> Add Work</button>

							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
								{works.map((w, idx) => (
									<div key={idx} className="card mb-4" style={{ flex: '1 1 340px', minWidth: '320px', maxWidth: '420px' }}>
										<div className="card-body">
											<div className="form-group">
												<label>Client</label>
												<input type="text" className="form-control" value={w.client || ''} onChange={e => handleChange(idx, 'client', e.target.value)} />
											</div>
											<div className="form-group">
												<label>Title</label>
												<input type="text" className="form-control" value={w.title || ''} onChange={e => handleChange(idx, 'title', e.target.value)} />
											</div>
											<div className="form-group">
												<label>Video URL</label>
												<input type="text" className="form-control" value={w.videoUrl || ''} onChange={e => handleChange(idx, 'videoUrl', e.target.value)} />
											</div>
											<button type="button" className="btn btn-danger" onClick={() => handleRemove(idx)}><i className="fas fa-trash" /> Remove</button>
										</div>
									</div>
								))}
							</div>

							<div style={{ marginTop: 12 }}>
								<button type="button" className="btn btn-primary" onClick={handleSave}>Save Work Showcase</button>
								{saved && <span style={{ marginLeft: 12, color: 'green' }}>Saved!</span>}
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
