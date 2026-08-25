'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import NoticeCard, { NoticeItem } from '@/components/shared/NoticeCard';

// Demo all notices dataset
const allNoticesData: NoticeItem[] = [
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
  {
    _id: '5',
    title: 'Distribution of National Merit Scholarships for Degree Students',
    slug: 'national-merit-scholarship-distribution',
    category: 'Scholarship',
    is_pinned: false,
    published_at: '2026-02-18',
  },
  {
    _id: '6',
    title: 'HSC 1st Year Mid-term Examination Routine Published',
    slug: 'hsc-1st-year-midterm-routine',
    category: 'Examination',
    is_pinned: false,
    published_at: '2026-02-15',
  },
  {
    _id: '7',
    title: 'College Library Book Requisition and Renewal Schedule',
    slug: 'library-book-requisition-schedule',
    category: 'Academic',
    is_pinned: false,
    published_at: '2026-02-10',
  },
  {
    _id: '8',
    title: 'Inter-College Science Fair 2026 Participation Call',
    slug: 'science-fair-2026-participation',
    category: 'Events',
    is_pinned: false,
    published_at: '2026-02-05',
  },
];

const AllNoticesPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allNoticesData.map((n) => n.category)));
    return ['All', ...cats.sort()];
  }, []);

  // Filter notices based on search & active category
  const filteredNotices = useMemo(() => {
    return allNoticesData.filter((notice) => {
      const query = search.toLowerCase();
      const matchesSearch =
        notice.title.toLowerCase().includes(query) ||
        notice.category.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === 'All' || notice.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Notice Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Controls: Search and Category Filter Pills */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'border border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notice Cards Grid */}
          {filteredNotices.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center text-muted-foreground p-6">
              <p className="text-base font-medium">No notices found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                }}
                className="mt-3 text-sm font-semibold text-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {filteredNotices.map((notice) => (
                <NoticeCard key={notice._id || notice.id} noticeData={notice} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllNoticesPage;
