import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { CoversManagement } from '@/components/dashboard/covers/CoversManagement';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardCoversPage() {
  const coversRes = await serverFetch({ path: 'covers' });
  const covers = coversRes?.data || [];

  return <CoversManagement initialCovers={covers} />;
}
