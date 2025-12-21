import dynamic from 'next/dynamic';
const AdminProcessSection = dynamic(() => import('../process'), { ssr: false });

export default function ProcessSectionAdminPage() {
  return <AdminProcessSection />;
}
