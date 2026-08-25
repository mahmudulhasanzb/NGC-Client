'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@heroui/react';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  date: string;
  description?: string;
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Annual Prize Distribution Ceremony',
    image:
      'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'February 2026',
    description: 'Celebrating high academic achievers and distinction holders with honorable guests and faculty.',
  },
  {
    id: '2',
    title: 'District Science & Innovation Fair',
    image:
      'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'January 2026',
    description: 'Students presenting scientific models, renewable energy prototypes, and robotics projects.',
  },
  {
    id: '3',
    title: 'Morning Parade & Physical Drill',
    image:
      'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'February 2026',
    description: 'Discipline and fitness training during weekly morning assembly at central college grounds.',
  },
  {
    id: '4',
    title: 'Campus Sunset & Academic Building',
    image:
      'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'January 2026',
    description: 'The serene and green atmosphere of Nabiganj Government College campus at dusk.',
  },
  {
    id: '5',
    title: 'Faculty Reception & Welcome Meet',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'February 2026',
    description: 'Warm felicitations for newly joined professors and faculty members by the college board.',
  },
  {
    id: '6',
    title: 'Coding & Robotics Technology Workshop',
    image:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'February 2026',
    description: 'Hands-on programming boot camp training students in modern software development and web tech.',
  },
  {
    id: '7',
    title: 'Inter-Department Annual Football Tournament',
    image:
      'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'December 2025',
    description: 'Thrilling final match between Science and Commerce faculties at the college stadium.',
  },
  {
    id: '8',
    title: 'Central Library Study & Research Session',
    image:
      'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'January 2026',
    description: 'Students preparing for examinations and conducting collaborative academic research.',
  },
  {
    id: '9',
    title: 'Cultural Festival & Rabindra-Nazrul Jayanti',
    image:
      'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'November 2025',
    description: 'Musical performances, traditional poetry recitations, and drama staged by college cultural club.',
  },
  {
    id: '10',
    title: 'Special Prayer & Commemoration Gathering',
    image:
      'https://images.pexels.com/photos/7092340/pexels-photo-7092340.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'January 2026',
    description: 'Solemn prayer gathering for national peace, institutional progress, and student well-being.',
  },
  {
    id: '11',
    title: 'Physics & Chemistry Practical Lab Session',
    image:
      'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'October 2025',
    description: 'HSC students conducting chemistry titration and optics experiments under teacher supervision.',
  },
  {
    id: '12',
    title: 'Campus Green Tree Plantation Drive',
    image:
      'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    date: 'September 2025',
    description: 'Environmental Club volunteers planting fruit and herbal saplings across the college perimeter.',
  },
];

const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % galleryData.length);
  }, [lightboxIndex]);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + galleryData.length) % galleryData.length);
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  return (
    <div className="min-h-screen bg-background">
      {/* Compact & Clean Page Hero Banner */}
      <section className="border-b border-border/80 bg-secondary/30 py-6 sm:py-8">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Campus Gallery
            </h1>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Capturing memorable events, celebrations, and campus life at Nabiganj Government College.
            </p>
          </div>
        </div>
      </section>

      {/* Main Gallery Content */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryData.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/80 bg-card cursor-pointer shadow-xs"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Zoom Icon */}
                <div className="absolute right-3.5 top-3.5 rounded-full bg-black/40 p-2.5 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                  <ZoomIn className="h-4 w-4" />
                </div>

                {/* Hover Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="font-serif text-base font-semibold leading-snug drop-shadow-md sm:text-lg">
                    {item.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && galleryData[lightboxIndex] && (
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
                src={galleryData[lightboxIndex].image}
                alt={galleryData[lightboxIndex].title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            {/* Info Footer */}
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
                  {galleryData[lightboxIndex].title}
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  {lightboxIndex + 1} of {galleryData.length}
                </span>
              </div>

              {galleryData[lightboxIndex].description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {galleryData[lightboxIndex].description}
                </p>
              )}

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
                <Calendar className="h-4 w-4" />
                <span>{galleryData[lightboxIndex].date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
