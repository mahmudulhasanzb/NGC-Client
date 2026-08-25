'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Award } from 'lucide-react';
import { Button } from '@heroui/react';

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/396304/pexels-photo-396304.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    badge: 'Established 1984 | EIIN: 129524',
    title: 'Nabiganj Government College',
    subtitle:
      'Nurturing minds, building futures. A premier institution dedicated to academic excellence, character development, and community service in the heart of Nabiganj.',
    primaryCtaText: 'Apply for Admission',
    primaryCtaLink: '/admission',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    badge: 'Modern Infrastructure & Digital Library',
    title: 'World-Class Learning Environment',
    subtitle:
      'Empowering students with state-of-the-art laboratories, enriched digital library resources, and technology-driven classrooms for tomorrow’s leaders.',
    primaryCtaText: 'Explore Programs',
    primaryCtaLink: '/about',
    secondaryCtaText: 'View Notices',
    secondaryCtaLink: '/noticeboard',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    badge: 'Excellence In Higher Education',
    title: 'Celebrating Student Success',
    subtitle:
      'Consistently producing outstanding HSC and degree results through dedicated faculty mentorship and holistic student development programs.',
    primaryCtaText: 'Meet Our Faculty',
    primaryCtaLink: '/teachers',
    secondaryCtaText: 'Campus Moments',
    secondaryCtaLink: '/moments',
  },
];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch and mouse drag swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const minSwipeDistance = 50; // Minimum swipe distance in px

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  // 5s auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch swipe events
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      nextSlide(); // Swiped left -> next
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // Swiped right -> prev
    }
  };

  // Mouse swipe events
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    touchEndX.current = null;
    touchStartX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  return (
    <header className="w-full select-none">
      {/* Hero Banner Section with 5s Auto-rotation & Swipe */}
      <section
        className="relative flex min-h-[580px] items-center overflow-hidden lg:min-h-[660px] active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          isDragging.current = false;
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* Background Images with smooth Crossfade */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              transitionProperty: 'opacity, transform',
              transitionDuration: '1000ms',
            }}
          />
        ))}

        {/* Deep Emerald Overlay */}
        <div className="absolute inset-0 bg-hero-pattern" />

        {/* Content Container */}
        <div className="relative mx-auto w-full max-w-8xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            {/* Pill Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20 sm:text-sm">
              <Award className="h-4 w-4 text-accent" />
              <span>{slides[currentSlide].badge}</span>
            </div>

            {/* Main Title */}
            <h1
              key={`title-${currentSlide}`}
              className="font-serif text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl text-balance animate-fade-in"
            >
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${currentSlide}`}
              className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl animate-fade-in"
            >
              {slides[currentSlide].subtitle}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={slides[currentSlide].primaryCtaLink}
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] cursor-pointer"
              >
                {slides[currentSlide].primaryCtaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href={slides[currentSlide].secondaryCtaLink}
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-[0.98] cursor-pointer"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {slides[currentSlide].secondaryCtaText}
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2.5 z-20">
          {slides.map((_, idx) => (
            <Button
              key={idx}
              type="button"
              onClick={e => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer p-0 border-0 ${
                idx === currentSlide
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>
    </header>
  );
};

export default Header;
