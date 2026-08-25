'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Pin,
  Tag,
  Download,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { formatDate } from '@/lib/format';

interface NoticeItem {
  _id: string;
  title: string;
  category: string;
  is_pinned?: boolean;
  published_at: string;
  document_url: string;
}

const allNoticesData: NoticeItem[] = [
  {
    _id: '1',
    title: 'HSC Admission 2026: Application Process and Schedule',
    category: 'Admission',
    is_pinned: true,
    published_at: '2026-03-01',
    document_url:
      'https://dhakacitycollege.edu.bd/upload/N_24_08_2026_16_37_04.jpg',
  },
  {
    _id: '2',
    title: 'Degree (Pass) 2nd Year Examination Form Fill-up Notice',
    category: 'Examination',
    is_pinned: true,
    published_at: '2026-02-28',
    document_url:
      'https://drive.google.com/file/d/1h0xCMdcrO1F11FFtkVtE1F47lAcH_ETh/view?usp=sharing',
  },
  {
    _id: '3',
    title: 'Schedule of Annual Sports & Cultural Week 2026',
    category: 'Events',
    is_pinned: false,
    published_at: '2026-02-25',
    document_url:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
  },
  {
    _id: '4',
    title: 'Holiday Notice: Shab-e-Barat Observance',
    category: 'General',
    is_pinned: false,
    published_at: '2026-02-22',
    document_url:
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
  },
  {
    _id: '5',
    title: 'Distribution of National Merit Scholarships for Degree Students',
    category: 'Scholarship',
    is_pinned: false,
    published_at: '2026-02-18',
    document_url:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
  },
  {
    _id: '6',
    title: 'HSC 1st Year Mid-term Examination Routine Published',
    category: 'Examination',
    is_pinned: false,
    published_at: '2026-02-15',
    document_url:
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
  },
  {
    _id: '7',
    title: 'College Library Book Requisition and Renewal Schedule',
    category: 'Academic',
    is_pinned: false,
    published_at: '2026-02-10',
    document_url:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
  },
  {
    _id: '8',
    title: 'Inter-College Science Fair 2026 Participation Call',
    category: 'Events',
    is_pinned: false,
    published_at: '2026-02-05',
    document_url:
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
  },
];

const isPdfOrDocUrl = (url: string) => {
  if (!url) return false;
  return (
    url.toLowerCase().includes('.pdf') ||
    url.includes('drive.google.com') ||
    url.includes('/pdf')
  );
};

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }
  return url;
};

const getDownloadUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
};

const NoticeDetailsPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || '';
  const [zoomLevel, setZoomLevel] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const notice = allNoticesData.find((n) => n._id === id);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const handleDownload = () => {
    if (!notice?.document_url) return;
    const isDrive = notice.document_url.includes('drive.google.com');

    if (isDrive) {
      const downloadLink = getDownloadUrl(notice.document_url);
      window.open(downloadLink, '_blank');
      return;
    }

    const ext = isPdfOrDocUrl(notice.document_url) ? 'pdf' : 'jpg';
    const filename = `Notice-${notice._id}.${ext}`;
    const proxyUrl = `/api/download?url=${encodeURIComponent(notice.document_url)}&filename=${encodeURIComponent(filename)}`;
    
    // Create direct download trigger
    const a = document.createElement('a');
    a.href = proxyUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!notice) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/50" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">
          Notice Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested notice could not be found.
        </p>
        <Link
          href="/notice"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Notices</span>
        </Link>
      </div>
    );
  }

  const isPdf = isPdfOrDocUrl(notice.document_url);
  const embedUrl = getEmbedUrl(notice.document_url);

  return (
    <div className="min-h-screen bg-background py-8 sm:py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="mb-4">
          <Link
            href="/notice"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Notices</span>
          </Link>
        </div>

        {/* Single Unified Notice Card */}
        <article className="overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
          {/* Metadata & Categories */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                <Tag className="h-3 w-3" />
                {notice.category}
              </span>
              {notice.is_pinned && (
                <span className="inline-flex items-center gap-1 rounded-md bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                  <Pin className="h-3 w-3 fill-accent" />
                  <span>Pinned</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>Published: {formatDate(notice.published_at)}</span>
            </div>
          </div>

          {/* Notice Title */}
          <h1 className="mt-5 font-serif text-xl font-bold leading-snug text-foreground sm:text-2xl lg:text-3xl">
            {notice.title}
          </h1>

          {/* Document Viewer (PDF iframe / Image with Zoom Controls) */}
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-border/70">
            {/* Zoom Controls for Images */}
            {!isPdf && (
              <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-xl border border-border/80 bg-background/90 p-1 shadow-sm backdrop-blur-md">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.75}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 cursor-pointer"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-[42px] text-center text-[11px] font-semibold text-foreground">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 cursor-pointer"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}

            {isPdf ? (
              <iframe
                src={embedUrl}
                title={notice.title}
                className="h-[650px] w-full border-0 sm:h-[750px] md:h-[850px]"
                allow="autoplay"
              />
            ) : (
              <div className="flex max-h-[850px] w-full items-center justify-center overflow-auto p-1">
                <img
                  src={notice.document_url}
                  alt={notice.title}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-out',
                  }}
                  className="h-auto w-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Bottom Download Button */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-5 sm:flex-row">
            <span className="text-xs text-muted-foreground">
              Official document of Nabiganj Government College
            </span>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 disabled:opacity-60 cursor-pointer active:scale-[0.98]"
            >
              {downloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download Notice</span>
                </>
              )}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NoticeDetailsPage;

