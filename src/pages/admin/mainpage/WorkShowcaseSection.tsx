// WorkShowcaseSection.tsx
'use client';

import { useState } from 'react';
import { WorkVideo } from '@/components/sections/work-showcase-section';
import { works as initialWorks } from '@/components/sections/work-showcase-data';

export default function WorkShowcaseSectionManagement() {
  const [works, setWorks] = useState<WorkVideo[]>(initialWorks);
  const [newClient, setNewClient] = useState('');
  const [newVideo, setNewVideo] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newClient || !newVideo) return;
    setWorks([
      ...works,
      {
        client: newClient,
        videoUrl: newVideo,
        title: newTitle,
      },
    ]);
    setNewClient('');
    setNewVideo('');
    setNewTitle('');
  };

  const handleRemove = (idx: number) => {
    setWorks(works.filter((_, i) => i !== idx));
  };

  // TODO: Save to backend or file

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">إدارة بعض من أعمالنا</h1>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-2">
        <input
          type="text"
          placeholder="اسم العميل"
          value={newClient}
          onChange={e => setNewClient(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="رابط الفيديو (YouTube embed)"
          value={newVideo}
          onChange={e => setNewVideo(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="عنوان الفيديو (اختياري)"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/3"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
        >
          إضافة
        </button>
      </div>
      <ul className="space-y-2">
        {works.map((work, idx) => (
          <li key={work.client + work.videoUrl + idx} className="flex items-center gap-2 bg-white/10 rounded p-2">
            <span className="flex-1 break-all">{work.client} - {work.title || work.videoUrl}</span>
            <button
              onClick={() => handleRemove(idx)}
              className="text-red-600 hover:underline"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
