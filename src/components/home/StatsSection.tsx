'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, GraduationCap, Award, Building2, BookOpen, Library } from 'lucide-react';

interface StatItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  numericValue: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
}

const statsData: StatItem[] = [
  {
    id: 'students',
    icon: Users,
    numericValue: 4500,
    suffix: '+',
    label: 'Enrolled Students',
    description: 'Pursuing HSC & Degree academic programs',
  },
  {
    id: 'faculty',
    icon: GraduationCap,
    numericValue: 55,
    suffix: '+',
    label: 'Expert Faculty',
    description: 'Experienced government BCS cadre educators',
  },
  {
    id: 'success-rate',
    icon: Award,
    numericValue: 98,
    suffix: '%',
    label: 'Academic Success',
    description: 'Consistent high pass rate in board exams',
  },
  {
    id: 'years',
    icon: Building2,
    numericValue: 40,
    suffix: '+',
    label: 'Years of Heritage',
    description: 'Serving the nation with pride since 1984',
  },
];

function StatCounter({
  target,
  prefix = '',
  suffix = '',
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1600; // 1.6s
          const steps = 40;
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={counterRef} className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

const StatsSection = () => {
  return (
    <section className="relative border-y border-border/70 bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Milestones & Impact
          </span>
          <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Our Journey in Numbers
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Four decades of academic excellence, student empowerment, and national recognition
          </p>
        </div>

        {/* Modern 4-Column Stat Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                {/* Top: Icon + Label */}
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <StatCounter target={item.numericValue} prefix={item.prefix} suffix={item.suffix} />
                  <h3 className="mt-2 font-serif text-base font-semibold text-foreground sm:text-lg">
                    {item.label}
                  </h3>
                </div>

                {/* Bottom: Micro description */}
                <p className="mt-3 border-t border-border/50 pt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
