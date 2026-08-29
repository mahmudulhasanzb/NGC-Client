import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { AboutManagement } from '@/components/dashboard/about/AboutManagement';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardAboutPage() {
  const res = await serverFetch({ path: 'about' });
  const aboutData = res?.data || null;

  return <AboutManagement initialData={aboutData} />;
}
