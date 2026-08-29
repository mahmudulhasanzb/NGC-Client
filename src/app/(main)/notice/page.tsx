import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { PublicNoticeList } from '@/components/notice/PublicNoticeList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AllNoticesPage() {
  const noticesRes = await serverFetch({ path: 'notices' });
  const notices = noticesRes?.data || [];

  return <PublicNoticeList initialNotices={notices} />;
}
