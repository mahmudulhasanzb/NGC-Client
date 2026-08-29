import React from 'react';
import { serverFetch } from '@/lib/api/serverFetch';
import { PublicGalleryList } from '@/components/gallery/PublicGalleryList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GalleryPage() {
  const res = await serverFetch({ path: 'gallery' });
  const items = res?.data || [];

  return <PublicGalleryList initialItems={items} />;
}
