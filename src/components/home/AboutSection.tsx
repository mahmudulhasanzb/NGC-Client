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
  ExternalLink,
} from 'lucide-react';
import { Button } from '@heroui/react';

// YouTube Video ID for the College Documentary / Campus Tour
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'; // Replace with actual YouTube video ID

// Native YouTube HD thumbnail (no custom stock photo)
const videoThumbnail = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const fallbackThumbnail = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
const collegeVideoEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`;

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To provide accessible, high-quality education that empowers students to become responsible citizens and visionary leaders.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be a leading center of academic excellence recognized for innovation, integrity, and dedicated community service.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Integrity, inclusivity, intellectual curiosity, and discipline guide every endeavor at Nabiganj Government College.',
  },
];

const AboutSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(videoThumbnail);

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
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Native YouTube Video Card with Modal Trigger */}
          <div className="relative">
            <div
              onClick={() => setIsVideoOpen(true)}
              className="group relative aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden rounded-2xl border border-border/80 bg-black shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl cursor-pointer"
            >
              {/* Native YouTube Thumbnail */}
              <img
                src={thumbSrc}
                onError={() => setThumbSrc(fallbackThumbnail)}
                alt="Nabiganj Government College Video Tour"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dynamic Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 transition-opacity duration-300 group-hover:via-black/30" />

              {/* Central Pulsing Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/95">
                  <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75" />
                  <span className="absolute -inset-2 rounded-full border border-primary/50 animate-pulse" />
                  <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-current translate-x-0.5" />
                </div>
                <span className="rounded-full bg-black/70 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10 tracking-wide">
                  Click to Watch Video Tour
                </span>
              </div>
            </div>

            {/* Floating 40+ Years Badge */}
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-primary px-5 py-3.5 text-primary-foreground shadow-2xl sm:flex items-center gap-3 border border-primary-foreground/15">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-xs">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold leading-tight">40+ Years</div>
                <div className="text-[11px] font-medium text-primary-foreground/80">
                  of Academic Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                About Our College
              </span>
              <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                A Legacy of Learning Since 1984
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Nabiganj Government College has stood as a beacon of higher education
                in the Habiganj district for over four decades. We offer comprehensive
                academic programs in Science, Humanities, and Business Studies, serving
                thousands of aspiring students from diverse backgrounds.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Our dedicated faculty, well-equipped labs, rich library facilities, and
                unwavering commitment to student success create an empowering environment
                where dreams transform into reality.
              </p>
            </div>

            {/* Core Values / Mission / Vision */}
            <div className="space-y-4 pt-2">
              {values.map((val) => (
                <div key={val.title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <val.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {val.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              >
                Read Our Full Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-secondary px-5 text-sm font-semibold text-primary transition-colors hover:bg-secondary/80 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-primary" />
                <span>Play Campus Documentary</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          {/* Close Button */}
          <Button
            type="button"
            className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            onClick={() => setIsVideoOpen(false)}
            aria-label="Close video modal"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Modal Container */}
          <div
            className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-card border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Video className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-foreground">
                    Nabiganj Govt. College Campus Documentary
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Official Virtual Tour & Campus Life
                  </p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@nabiganjgovernmentcollege"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <span>YouTube Channel</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Video Iframe Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={collegeVideoEmbedUrl}
                title="Nabiganj Government College Campus Documentary"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
