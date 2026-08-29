'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Play,
  X,
  Award,
  Video,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@heroui/react';
import { EmbedVideoPlayer } from '@/components/common/EmbedVideoPlayer';

export interface AboutSectionData {
  id?: string;
  heading?: string;
  subheading?: string;
  description1?: string;
  description2?: string;
  videoEmbedUrl?: string;
  videoThumbnail?: string | null;
  missionText?: string;
  visionText?: string;
  valuesText?: string;
  establishedYear?: string;
  eiinNumber?: string;
  collegeCode?: string;
  nuCode?: string;
}

interface AboutSectionProps {
  aboutData?: AboutSectionData | null;
}

const defaultThumbnail =
  'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';

const defaultEmbed =
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Nabiganj Government College Video Tour" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const heading = aboutData?.heading || '40+ Years of Academic Excellence';
  const subheading =
    aboutData?.subheading ||
    'Nabiganj Government College is a premier public institution fostering academic excellence across Science, Humanities, and Business Studies in Habiganj.';
  const description1 =
    aboutData?.description1 ||
    'Established with the visionary goal of bringing accessible, top-tier education to the students of Nabiganj, the college has nurtured generations of scholars and leaders.';
  const establishedYear = aboutData?.establishedYear || '1984';

  const rawEmbed = aboutData?.videoEmbedUrl || defaultEmbed;
  const thumbnail = aboutData?.videoThumbnail || defaultThumbnail;

  const corePillars = [
    {
      icon: Target,
      title: 'Mission',
      subtitle: aboutData?.missionText || 'Excellence in teaching and learning',
    },
    {
      icon: Eye,
      title: 'Vision',
      subtitle: aboutData?.visionText || 'Leadership in higher education',
    },
    {
      icon: Heart,
      title: 'Values',
      subtitle: aboutData?.valuesText || 'Integrity, discipline, and community',
    },
  ];

  // Close video modal on ESC key & lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Prominent Video Player (7 Columns) */}
          <div className="relative lg:col-span-7">
            <div
              onClick={() => setIsVideoOpen(true)}
              className="group relative aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden rounded-2xl border border-border/80 bg-black shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl cursor-pointer"
            >
              {/* Video Thumbnail */}
              <img
                src={thumbnail}
                alt="Nabiganj Government College Video Tour"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultThumbnail;
                }}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15 transition-opacity duration-300 group-hover:via-black/35" />

              {/* Central Pulsing Play Trigger */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75" />
                  <span className="absolute -inset-2 rounded-full border border-primary/40 animate-pulse" />
                  <Play className="h-7 w-7 sm:h-9 sm:w-9 fill-current translate-x-0.5" />
                </div>
                <span className="rounded-full bg-black/75 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10 tracking-wide">
                  Click to Watch Campus Tour
                </span>
              </div>

              {/* Bottom Caption Tag */}
              <div className="absolute bottom-3 left-4 text-xs font-medium text-white/90 drop-shadow-sm">
                Nabiganj Govt. College • Estd. {establishedYear}
              </div>
            </div>

            {/* Floating Heritage Badge */}
            <div className="absolute -bottom-4 -right-3 hidden rounded-xl bg-primary px-4 py-2.5 text-primary-foreground shadow-xl sm:flex items-center gap-2.5 border border-primary-foreground/15">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="font-serif text-lg font-bold leading-tight">
                  Estd. {establishedYear}
                </div>
                <div className="text-[10px] text-primary-foreground/80 leading-none">
                  Legacy of Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative (5 Columns) */}
          <div className="space-y-4 lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Institutional Legacy</span>
              </div>
              <h2 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {heading}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {subheading}
              </p>
            </div>

            {/* 3 Pillars in Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {corePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex flex-col items-center rounded-xl border border-border/80 bg-secondary/30 p-2.5 text-center transition-colors hover:border-primary/40 hover:bg-secondary/50"
                  >
                    <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="font-serif text-[11px] font-bold text-foreground">
                      {pillar.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                      {pillar.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                href="/about"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-xs font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none cursor-pointer"
              >
                Read Full Story
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-secondary px-4 text-xs font-semibold text-primary transition-colors hover:bg-secondary/80 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-primary" />
                <span>Play Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal with EmbedVideoPlayer */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          {/* Close Button */}
          <Button
            type="button"
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            onClick={() => setIsVideoOpen(false)}
            aria-label="Close video modal"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Modal Container */}
          <div
            className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Video className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="font-serif text-xs font-bold text-foreground">
                    Nabiganj Govt. College Campus Documentary
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    Official Virtual Tour & Campus Life
                  </p>
                </div>
              </div>
            </div>

            {/* Video Iframe Frame with Auto-Play */}
            <div className="relative aspect-video w-full bg-black">
              <EmbedVideoPlayer embedCode={rawEmbed} autoplay={true} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
