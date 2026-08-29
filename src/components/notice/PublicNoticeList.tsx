'use client';

import React, { useState, useMemo } from 'react';
import { Search, FileText } from 'lucide-react';
import NoticeCard, { NoticeItem } from '@/components/shared/NoticeCard';

interface PublicNoticeListProps {
  initialNotices: NoticeItem[];
}

export const PublicNoticeList: React.FC<PublicNoticeListProps> = ({
  initialNotices,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Extract unique categories dynamically from actual database records
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(initialNotices.map((n) => n.category.toUpperCase())),
    );
    return ['ALL', ...cats.sort()];
  }, [initialNotices]);

  // Filter notices based on search & active category
  const filteredNotices = useMemo(() => {
    return initialNotices.filter((notice) => {
      const query = search.toLowerCase();
      const matchesSearch =
        notice.title.toLowerCase().includes(query) ||
        notice.category.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === 'ALL' ||
        notice.category.toUpperCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialNotices, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 border-b border-border/70 pb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            Official Circulars & Bulletins
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            College Notice Board
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Stay updated with academic schedules, examination routines, and official guidelines from Nabiganj Government College
          </p>
        </div>

        {/* Controls: Search and Category Filter Pills */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search circulars by title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat === 'ALL' ? 'All Notices' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notice Cards Grid */}
        {filteredNotices.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center text-muted-foreground p-6">
            <FileText className="h-8 w-8 text-muted-foreground/40 mb-2" />
            <p className="font-serif text-sm font-semibold">No notices found matching your search.</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('ALL');
              }}
              className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              Clear search filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {filteredNotices.map((notice) => (
              <NoticeCard key={notice.id || notice._id || notice.slug} noticeData={notice} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
