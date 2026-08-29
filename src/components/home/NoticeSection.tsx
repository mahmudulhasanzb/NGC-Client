import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bell } from 'lucide-react';
import NoticeCard, { NoticeItem } from '../shared/NoticeCard';

interface NoticeSectionProps {
  notices?: NoticeItem[];
}

const NoticeSection: React.FC<NoticeSectionProps> = ({ notices = [] }) => {
  const featured = notices.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
              <Bell className="h-3.5 w-3.5" />
              <span>Official Circulars</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Notice Board
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Stay updated with official academic schedules, examination routines, and admission guidelines
            </p>
          </div>

          <Link
            href="/notice"
            className="hidden items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:inline-flex cursor-pointer"
          >
            View All Notices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Notice Card inside Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((notice) => (
            <NoticeCard key={notice.id || notice._id || notice.slug} noticeData={notice} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/notice"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline cursor-pointer"
          >
            View All Notices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;
