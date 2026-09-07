import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Pin,
  Tag,
  Download,
  FileText,
  Paperclip,
  User,
} from 'lucide-react';
import { serverFetch } from '@/lib/api/serverFetch';
import { formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NoticeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoticeDetailPage({
  params,
}: NoticeDetailPageProps) {
  const { id } = await params;
  const res = await serverFetch({ path: `notices/${id}` });
  const notice = res?.data;

  if (!notice) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/50" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">
          Notice Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested notice or circular could not be found or has expired.
        </p>
        <Link
          href="/notice"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Notices</span>
        </Link>
      </div>
    );
  }

  const dateValue = notice.publishedAt || notice.published_at || notice.createdAt;

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="mb-6">
          <Link
            href="/notice"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Notices</span>
          </Link>
        </div>

        {/* Notice Card */}
        <article className="overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                <Tag className="h-3 w-3" />
                {notice.category}
              </span>
              {notice.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-md bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                  <Pin className="h-3 w-3 fill-accent" />
                  <span>Featured Announcement</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>Published: {dateValue ? formatDate(dateValue) : 'Official'}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-5 font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            {notice.title}
          </h1>

          {/* Author Badge */}
          {notice.author && (
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span>Issued by: {notice.author.name} (Administration)</span>
            </div>
          )}

          {/* Main Notice Content */}
          <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/15 p-5 sm:p-6">
            <p className="text-xs sm:text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {notice.content}
            </p>
          </div>

          {/* Optional Attachment Link */}
          {notice.attachment && (
            <div className="mt-6 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Paperclip className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Official Attachment Available</div>
                  <div className="text-[11px] text-muted-foreground truncate max-w-sm">
                    {notice.attachment}
                  </div>
                </div>
              </div>

              <a
                href={notice.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Open File</span>
              </a>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground sm:flex-row">
            <span>Nabiganj Government College • Official Electronic Notice Board</span>
            <span className="font-mono text-xs font-semibold text-primary">EIIN: 129524 | Code: 1301</span>
          </div>
        </article>
      </div>
    </div>
  );
}
