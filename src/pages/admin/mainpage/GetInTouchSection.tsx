// GetInTouchSection.tsx
'use client';

import { useState } from 'react';

interface GetInTouchData {
  title: string;
  description: string;
  whatsapp: string;
  services: string[];
}

const initialData: GetInTouchData = {
  title: 'تواصل معنا',
  description: 'يمكنك التواصل معنا عبر الواتساب أو تعبئة النموذج.',
  whatsapp: '',
  services: [],
};

export default function GetInTouchSectionManagement() {
  const [data, setData] = useState<GetInTouchData>(initialData);
  const [newService, setNewService] = useState('');

  const handleServiceAdd = () => {
    if (!newService) return;
    setData({ ...data, services: [...data.services, newService] });
    setNewService('');
  };

  const handleServiceRemove = (idx: number) => {
    setData({ ...data, services: data.services.filter((_, i) => i !== idx) });
  };

  // TODO: Save to backend or file

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">إدارة تواصل معنا</h1>
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="العنوان"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          className="border rounded px-3 py-2 w-full"
        />
        <textarea
          placeholder="الوصف"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="رقم الواتساب"
          value={data.whatsapp}
          onChange={e => setData({ ...data, whatsapp: e.target.value })}
          className="border rounded px-3 py-2 w-full"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="نوع الخدمة"
            value={newService}
            onChange={e => setNewService(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          <button
            onClick={handleServiceAdd}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
          >
            إضافة خدمة
          </button>
        </div>
        <ul className="space-y-2 mt-2">
          {data.services.map((service, idx) => (
            <li key={service + idx} className="flex items-center gap-2 bg-white/10 rounded p-2">
              <span className="flex-1 break-all">{service}</span>
              <button
                onClick={() => handleServiceRemove(idx)}
                className="text-red-600 hover:underline"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
