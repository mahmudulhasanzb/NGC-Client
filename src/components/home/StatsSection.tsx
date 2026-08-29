'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  Building2,
  BookOpen,
  Library,
  Sparkles,
} from 'lucide-react';

export interface CollegeStatItem {
  id: string;
  label: string;
  value: string;
  icon?: string | null;
  description?: string | null;
  orderIndex?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  GraduationCap,
  Award,
  Building2,
  BookOpen,
  Library,
  Sparkles,
};

const fallbackStats: CollegeStatItem[] = [
  {
    id: 'students',
    label: 'Enrolled Students',
    value: '4500+',
    icon: 'Users',
    description: 'HSC & Degree programs',
  },
  {
    id: 'faculty',
    label: 'Expert Faculty',
    value: '55+',
    icon: 'GraduationCap',
    description: 'Govt. BCS Cadre educators',
  },
  {
    id: 'success-rate',
    label: 'Academic Success',
    value: '98%',
    icon: 'Award',
    description: 'Board examination pass rate',
  },
  {
    id: 'years',
    label: 'Years of Heritage',
    value: '40+',
    icon: 'Building2',
    description: 'Established in 1984',
  },
];

// Helper to parse numeric string like "4500+", "98%", "$500" into numeric value, prefix, suffix
function parseStatValue(valStr: string) {
  const numericMatch = valStr.match(/\d[\d,]*/);
  if (!numericMatch) {
    return { numericValue: 0, prefix: '', suffix: valStr, isNumeric: false };
  }

  const rawNum = numericMatch[0].replace(/,/g, '');
  const num = parseInt(rawNum, 10);
  const matchIndex = valStr.indexOf(numericMatch[0]);
  const prefix = valStr.slice(0, matchIndex);
  const suffix = valStr.slice(matchIndex + numericMatch[0].length);

  return { numericValue: num, prefix, suffix, isNumeric: true };
}

function StatCounter({
  target,
  prefix = '',
  suffix = '',
  isNumeric = true,
  fallbackDisplay = '',
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  isNumeric?: boolean;
  fallbackDisplay?: string;
}) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isNumeric) return;
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1400; // 1.4s
          const steps = 30;
          const stepTime = duration / steps;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isNumeric]);

  if (!isNumeric) {
    return (
      <div className="font-serif text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        {fallbackDisplay}
      </div>
    );
  }

  return (
    <div
      ref={counterRef}
      className="font-serif text-2xl font-bold tracking-tight text-primary sm:text-3xl"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

interface StatsSectionProps {
  initialStats?: CollegeStatItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ initialStats }) => {
  // Display up to 4 stats for clean 4-column compact symmetry
  const statsToDisplay =
    initialStats && initialStats.length > 0
      ? initialStats.slice(0, 4)
      : fallbackStats;

  return (
    <section className="border-y border-border/70 bg-secondary/20 py-10 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
            Milestones & Impact
          </span>
          <h2 className="mt-0.5 font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Our Journey in Numbers
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-primary/60" />
        </div>

        {/* Compact 4-Column Stat Cards */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
          {statsToDisplay.map((item, idx) => {
            const IconComponent =
              (item.icon && iconMap[item.icon]) || iconMap.Award || Award;
            const parsed = parseStatValue(item.value || '0');

            return (
              <div
                key={item.id || `stat-${idx}`}
                className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xs"
              >
                {/* Header: Icon + Number */}
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>

                  <StatCounter
                    target={parsed.numericValue}
                    prefix={parsed.prefix}
                    suffix={parsed.suffix}
                    isNumeric={parsed.isNumeric}
                    fallbackDisplay={item.value}
                  />

                  <h3 className="mt-1 font-serif text-sm font-semibold text-foreground sm:text-base">
                    {item.label}
                  </h3>
                </div>

                {/* Subtitle / Description */}
                {item.description && (
                  <p className="mt-2 border-t border-border/40 pt-2 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
