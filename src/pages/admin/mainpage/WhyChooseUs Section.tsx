import dynamic from 'next/dynamic';
const AdminWhyChooseUs = dynamic(() => import('../why-choose-us'), { ssr: false });

export default function WhyChooseUsSectionAdminPage() {
  return <AdminWhyChooseUs />;
}
