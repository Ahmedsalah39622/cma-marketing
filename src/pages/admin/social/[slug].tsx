// [slug].tsx
'use client';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const SocialLinksManagement = dynamic(() => import('./social-links-management'), { ssr: false });

export default function SocialLinksAdminPage() {
  const router = useRouter();
  const { slug } = router.query;
  if (!slug || typeof slug !== 'string') return null;
  return <SocialLinksManagement section={slug as any} />;
}
