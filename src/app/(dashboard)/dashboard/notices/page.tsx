import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { NoticesManagement } from '@/components/dashboard/notices/NoticesManagement';

export const revalidate = 0;

export default async function DashboardNoticesPage() {
  const noticesRes = await serverFetch({ path: 'notices' });
  const notices = noticesRes?.data || [];

  return <NoticesManagement initialNotices={notices} />;
}
