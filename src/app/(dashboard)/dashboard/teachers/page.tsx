import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { TeachersManagement } from '@/components/dashboard/teachers/TeachersManagement';

export const revalidate = 0;

export default async function DashboardTeachersPage() {
  const teachersRes = await serverFetch({ path: 'teachers' });
  const teachers = teachersRes?.data || [];

  return <TeachersManagement initialTeachers={teachers} />;
}
