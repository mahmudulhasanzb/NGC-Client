import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { StatsManagement } from '@/components/dashboard/stats/StatsManagement';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardStatsPage() {
  const res = await serverFetch({ path: 'stats' });
  const stats = res?.data || [];

  return <StatsManagement initialStats={stats} />;
}
