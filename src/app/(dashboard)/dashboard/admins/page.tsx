import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { AdminsManagement } from '@/components/dashboard/admins/AdminsManagement';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardAdminsPage() {
  const res = await serverFetch({ path: 'users' });
  const admins = res?.data || [];

  return <AdminsManagement initialAdmins={admins} />;
}
