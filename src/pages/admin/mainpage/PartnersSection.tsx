// partners-section-management.tsx
'use client';

import { useState } from 'react';
import { Partner } from '@/components/sections/partners-section';
import { partners as initialPartners } from '@/components/sections/partners-data';

export default function PartnersSectionManagement() {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [newName, setNewName] = useState('');
  const [newLogo, setNewLogo] = useState('');
  const [newSocial, setNewSocial] = useState('');
  const [newPlatform, setNewPlatform] = useState('instagram');

  const handleAdd = () => {
    if (!newName) return;
    setPartners([
      ...partners,
      {
        name: newName,
        logoUrl: newLogo,
        socials: newSocial ? [{ platform: newPlatform, url: newSocial }] : [],
      },
    ]);
    setNewName('');
    setNewLogo('');
    setNewSocial('');
    setNewPlatform('instagram');
  };

  const handleRemove = (idx: number) => {
    setPartners(partners.filter((_, i) => i !== idx));
  };

  // TODO: Save to backend or file

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">إدارة الشركاء</h1>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-2">
        <input
          type="text"
          placeholder="اسم الشريك"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/4"
        />
        <input
          type="text"
          placeholder="رابط الشعار (اختياري)"
          value={newLogo}
          onChange={e => setNewLogo(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/4"
        />
        <input
          type="text"
          placeholder="رابط السوشيال (اختياري)"
          value={newSocial}
          onChange={e => setNewSocial(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/4"
        />
        <select
          value={newPlatform}
          onChange={e => setNewPlatform(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/4"
        >
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
        >
          إضافة
        </button>
      </div>
      <ul className="space-y-2">
        {partners.map((partner, idx) => (
          <li key={partner.name + idx} className="flex items-center gap-2 bg-white/10 rounded p-2">
            <span className="flex-1 break-all">{partner.name}</span>
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
