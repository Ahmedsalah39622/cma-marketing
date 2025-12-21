// social-links-management.tsx
'use client';

import { useState } from 'react';
import { SocialLink } from '@/components/sections/social-links-section';
import {
  tiktokLinks,
  instagramLinks,
  companyInstagramLinks,
  youtubeLinks,
  facebookLinks,
  managedPages,
  clientYoutube
} from '@/components/sections/social-links-data';

const sectionMap = {
  tiktok: tiktokLinks,
  instagram: instagramLinks,
  companiesInstagram: companyInstagramLinks,
  youtube: youtubeLinks,
  facebook: facebookLinks,
  managed: managedPages,
  clientYoutube: clientYoutube,
};

const sectionNames: Record<string, string> = {
  tiktok: 'تيك توك',
  instagram: 'انستقرام',
  companiesInstagram: 'شركات (انستقرام)',
  youtube: 'يوتيوب',
  facebook: 'فيسبوك',
  managed: 'الصفحات المدارة',
  clientYoutube: 'قناة العميل على يوتيوب',
};

export default function SocialLinksManagement({ section }: { section: keyof typeof sectionMap }) {
  const [links, setLinks] = useState<SocialLink[]>(sectionMap[section] || []);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (!newUrl) return;
    setLinks([...links, { url: newUrl, name: newName, platform: section as any }]);
    setNewUrl('');
    setNewName('');
  };

  const handleRemove = (idx: number) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  // TODO: Save to backend or file

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">إدارة {sectionNames[section]}</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="رابط جديد"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          className="border rounded px-3 py-2 w-2/3"
        />
        <input
          type="text"
          placeholder="اسم (اختياري)"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border rounded px-3 py-2 w-1/3"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
        >
          إضافة
        </button>
      </div>
      <ul className="space-y-2">
        {links.map((link, idx) => (
          <li key={link.url + idx} className="flex items-center gap-2 bg-white/10 rounded p-2">
            <span className="flex-1 break-all">{link.name || link.url}</span>
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
