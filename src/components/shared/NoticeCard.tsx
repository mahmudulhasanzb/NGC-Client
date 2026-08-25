import React from 'react';
import Link from 'next/link';
import { Pin, Calendar, ArrowRight } from 'lucide-react';
import { formatDate, truncate } from '@/lib/format';

export interface NoticeItem {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  content: string;
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
      className="group block h-full rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:bg-secondary/15 hover:shadow-md hover:shadow-primary/10"
    >
      <div className="flex flex-col justify-between h-full space-y-4">
        <div className="space-y-2.5">
          {/* Badge and Pin */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {item.category}
            </span>
            {item.is_pinned && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                <Pin className="h-3.5 w-3.5 fill-accent" />
                <span>Pinned</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {truncate(item.content, 120)}
          </p>
        </div>

        {/* Footer: Date & Link Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>{formatDate(item.published_at)}</span>
          </div>
          <span className="inline-flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Read more
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NoticeCard;
