import React from 'react';
import Link from 'next/link';
import { Pin, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/format';

export interface NoticeItem {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  category: string;
  is_pinned?: boolean;
  published_at: string;
}

interface NoticeCardProps {
  noticeData?: NoticeItem;
  notice?: NoticeItem;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ noticeData, notice }) => {
  const item = noticeData || notice;

  if (!item) return null;

  const targetId = item._id || item.id || item.slug || '';

  return (
    <Link
      href={`/notice/${targetId}`}
      className="group flex flex-col justify-between rounded-xl border border-border bg-card p-3.5 transition-all hover:border-primary/40 hover:bg-secondary/15 hover:shadow-sm sm:p-4"
    >
      <div className="space-y-2">
        {/* Top: Category Badge & Pin */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary sm:text-xs">
            {item.category}
          </span>
          {item.is_pinned && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent">
              <Pin className="h-3 w-3 fill-accent" />
              <span>Pinned</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base">
          {item.title}
        </h3>
      </div>

      {/* Bottom: Date & Read Indicator */}
      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2.5 text-[11px] text-muted-foreground sm:text-xs">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-primary" />
          <span>{formatDate(item.published_at)}</span>
        </div>
        <span className="inline-flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          <span>View</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
};

export default NoticeCard;
