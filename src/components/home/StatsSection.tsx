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
      <div className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {fallbackDisplay}
      </div>
    );
  }

  return (
    <div
      ref={counterRef}
      className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl"
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
  const statsToDisplay =
    initialStats && initialStats.length > 0 ? initialStats.slice(0, 4) : [];

  if (statsToDisplay.length === 0) return null;

  return (
    <section className="border-y border-border/70 bg-secondary/30 py-12 sm:py-16">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Milestones & Impact</span>
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Our Journey in Numbers
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Decades of academic leadership, outstanding results, and institutional growth
          </p>
        </div>

        {/* 4-Column Stat Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {statsToDisplay.map((item, idx) => {
            const IconComponent =
              (item.icon && iconMap[item.icon]) || iconMap.Award || Award;
            const parsed = parseStatValue(item.value || '0');

            return (
              <div
                key={item.id || `stat-${idx}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Top Accent Indicator on Hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-transparent transition-colors duration-300 group-hover:bg-primary" />

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  <StatCounter
                    target={parsed.numericValue}
                    prefix={parsed.prefix}
                    suffix={parsed.suffix}
                    isNumeric={parsed.isNumeric}
                    fallbackDisplay={item.value}
                  />

                  <h3 className="mt-2 font-serif text-base font-semibold text-foreground sm:text-lg">
                    {item.label}
                  </h3>
                </div>

                {/* Subtitle / Description */}
                {item.description && (
                  <p className="mt-4 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
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
