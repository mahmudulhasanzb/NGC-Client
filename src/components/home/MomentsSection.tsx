'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ZoomIn, X, Calendar } from 'lucide-react';
import { Button } from '@heroui/react';
import { formatDate } from '@/lib/format';

export interface MomentItem {
  id: string;
  title: string;
  category?: string | null;
  imageUrl?: string;
  image?: string;
  createdAt?: string;
  date?: string;
}

interface MomentsSectionProps {
  initialItems?: MomentItem[];
}

const MomentsSection: React.FC<MomentsSectionProps> = ({ initialItems = [] }) => {
  const [selectedImage, setSelectedImage] = useState<MomentItem | null>(null);

  if (!initialItems || initialItems.length === 0) {
    return null;
  }

  const items = initialItems;
  const leftFeatured = items[0];
  const leftBottomLeft = items[1];
  const leftBottomRight = items[2];
  const rightTopLeft = items[3];
  const rightTopRight = items[4];
  const rightMiddle = items[5];
  const rightBottom = items[6];

  const renderCard = (item?: MomentItem, aspectRatio: string = 'aspect-[4/3]') => {
    if (!item) return null;
    const imgSrc = item.imageUrl || item.image || '';

    return (
      <div
        onClick={() => setSelectedImage(item)}
        className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-card cursor-pointer shadow-xs ${aspectRatio}`}
      >
        <img
          src={imgSrc}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top right zoom icon */}
        <div className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
          <ZoomIn className="h-4 w-4" />
        </div>

        {/* Bottom caption - only on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h4 className="font-serif text-sm font-semibold leading-snug drop-shadow-md sm:text-base">
            {item.title}
          </h4>
          {item.createdAt && (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-white/80">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            OUR MOMENTS
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            A glimpse into the vibrant life, events, and academic journey at Nabiganj Government College.
          </p>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary" />
        </div>

        {/* Asymmetric Moments Grid Layout */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
          {/* Left Column (Span 6) */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-6">
            {/* Top Large Featured Image */}
            {leftFeatured && renderCard(leftFeatured, 'aspect-[4/3] sm:aspect-[16/11]')}

            {/* Bottom 2 Side-by-Side Images */}
            {(leftBottomLeft || leftBottomRight) && (
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {leftBottomLeft && renderCard(leftBottomLeft, 'aspect-[4/3]')}
                {leftBottomRight && renderCard(leftBottomRight, 'aspect-[4/3]')}
              </div>
            )}
          </div>

          {/* Right Column (Span 6) */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-6">
            {/* Top 2 Side-by-Side Images */}
            {(rightTopLeft || rightTopRight) && (
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {rightTopLeft && renderCard(rightTopLeft, 'aspect-[4/3]')}
                {rightTopRight && renderCard(rightTopRight, 'aspect-[4/3]')}
              </div>
            )}

            {/* Middle Wide Image */}
            {rightMiddle && renderCard(rightMiddle, 'aspect-[16/7] sm:aspect-[16/6.5]')}

            {/* Bottom Wide Image */}
            {rightBottom && renderCard(rightBottom, 'aspect-[16/7] sm:aspect-[16/6.5]')}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98] cursor-pointer"
          >
            View All Media
          </Link>
        </div>
      </div>

      {/* Lightbox Modal on Image Click */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </Button>

          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl || selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[75vh] w-full object-contain bg-black"
            />
            <div className="p-5">
              <h3 className="font-serif text-xl font-bold text-foreground">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MomentsSection;
