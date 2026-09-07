'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Calendar, ImageIcon } from 'lucide-react';
import { Button } from '@heroui/react';
import { formatDate } from '@/lib/format';

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  caption?: string | null;
  category?: string | null;
  createdAt?: string;
}

interface PublicGalleryListProps {
  initialItems: GalleryItem[];
}

export const PublicGalleryList: React.FC<PublicGalleryListProps> = ({
  initialItems = [],
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % initialItems.length);
  }, [lightboxIndex, initialItems.length]);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + initialItems.length) % initialItems.length);
  }, [lightboxIndex, initialItems.length]);

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero Header */}
      <section className="border-b border-border/80 bg-secondary/30 py-8 sm:py-12">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-2">
              Campus Moments & Photography
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Photo Gallery
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Capturing memorable academic events, celebrations, and vibrant student life at Nabiganj Government College.
            </p>
          </div>
        </div>
      </section>

      {/* Main Gallery Content */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {initialItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {initialItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/80 bg-card cursor-pointer shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                >
                  {/* Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Dark Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Zoom Icon */}
                  <div className="absolute right-3.5 top-3.5 rounded-full bg-black/50 p-2.5 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                    <ZoomIn className="h-4 w-4" />
                  </div>

                  {/* Hover Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.category && (
                      <span className="mb-1.5 inline-block rounded-md bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-serif text-base font-semibold leading-snug drop-shadow-md sm:text-lg">
                      {item.title}
                    </h3>
                    {item.createdAt && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground bg-card shadow-2xs">
              <ImageIcon className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <h3 className="font-serif text-base font-bold text-foreground">No photos uploaded yet</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Campus photography will appear here once published from the administration dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && initialItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <Button
            type="button"
            className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 cursor-pointer"
            onClick={closeLightbox}
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Controls */}
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 cursor-pointer sm:left-8"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 cursor-pointer sm:right-8"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Modal Content Box */}
          <div
            className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-card shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative max-h-[70vh] bg-black/95 flex items-center justify-center overflow-hidden">
              <img
                src={initialItems[lightboxIndex].imageUrl}
                alt={initialItems[lightboxIndex].title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            {/* Info Footer */}
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
                  {initialItems[lightboxIndex].title}
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  {lightboxIndex + 1} of {initialItems.length}
                </span>
              </div>

              {initialItems[lightboxIndex].caption && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {initialItems[lightboxIndex].caption}
                </p>
              )}

              {initialItems[lightboxIndex].createdAt && (
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(initialItems[lightboxIndex].createdAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
