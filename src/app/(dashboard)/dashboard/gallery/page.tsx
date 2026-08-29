import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { GalleryManagement } from '@/components/dashboard/gallery/GalleryManagement';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardGalleryPage() {
  const galleryRes = await serverFetch({ path: 'gallery' });
  const items = galleryRes?.data || [];

  return <GalleryManagement initialItems={items} />;
}
