import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NoticeCard, { NoticeItem } from '../shared/NoticeCard';

// Demo notice data matching college categories
export const demoNotices: NoticeItem[] = [
  {
    _id: '1',
    title: 'HSC Admission 2026: Application Process and Schedule',
    slug: 'hsc-admission-2026',
    category: 'Admission',
    is_pinned: true,
    published_at: '2026-03-01',
  },
  {
    _id: '2',
    title: 'Degree (Pass) 2nd Year Examination Form Fill-up Notice',
    slug: 'degree-2nd-year-form-fillup',
    category: 'Examination',
    is_pinned: true,
    published_at: '2026-02-28',
  },
  {
    _id: '3',
    title: 'Schedule of Annual Sports & Cultural Week 2026',
    slug: 'annual-sports-cultural-week-2026',
    category: 'Events',
    is_pinned: false,
    published_at: '2026-02-25',
  },
  {
    _id: '4',
    title: 'Holiday Notice: Shab-e-Barat Observance',
    slug: 'holiday-notice-shab-e-barat',
    category: 'General',
    is_pinned: false,
    published_at: '2026-02-22',
  },
];

interface NoticeSectionProps {
  notices?: NoticeItem[];
}

const NoticeSection: React.FC<NoticeSectionProps> = ({ notices = demoNotices }) => {
  const featured = notices.slice(0, 4);

  return (
    <section className="bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Notice Board
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Stay updated with the latest announcements, schedules, and academic news
            </p>
          </div>

          <Link
            href="/notice"
            className="hidden items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:inline-flex"
          >
            View All Notices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Notice Card inside Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((notice) => (
            <NoticeCard key={notice._id || notice.id} noticeData={notice} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/notice"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
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
