import React from 'react';
import Link from 'next/link';
import {
  Bell,
  GraduationCap,
  Image as ImageIcon,
  BarChart3,
  Users,
  PlusCircle,
  ArrowRight,
  School,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { serverFetch } from '@/lib/api/serverFetch';

export const revalidate = 0; // Fresh dashboard metrics on load

export default async function DashboardPage() {
  // Fetch real counts across modules
  const [noticesRes, teachersRes, galleryRes, statsRes, coversRes] = await Promise.all([
    serverFetch({ path: 'notices' }).catch(() => null),
    serverFetch({ path: 'teachers' }).catch(() => null),
    serverFetch({ path: 'gallery' }).catch(() => null),
    serverFetch({ path: 'stats' }).catch(() => null),
    serverFetch({ path: 'covers' }).catch(() => null),
  ]);

  const totalNotices = noticesRes?.data?.length ?? 0;
  const totalTeachers = teachersRes?.data?.length ?? 0;
  const totalGallery = galleryRes?.data?.length ?? 0;
  const totalStats = statsRes?.data?.length ?? 0;
  const totalCovers = coversRes?.data?.length ?? 0;

  const cards = [
    {
      title: 'Published Notices',
      count: totalNotices,
      description: 'Active circulars & updates',
      href: '/dashboard/notices',
      icon: Bell,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      actionLabel: 'Manage Notices',
    },
    {
      title: 'Faculty Members',
      count: totalTeachers,
      description: 'Government BCS cadre educators',
      href: '/dashboard/teachers',
      icon: GraduationCap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      actionLabel: 'Manage Faculty',
    },
    {
      title: 'Gallery Moments',
      count: totalGallery,
      description: 'Campus life photo archive',
      href: '/dashboard/gallery',
      icon: ImageIcon,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      actionLabel: 'Manage Gallery',
    },
    {
      title: 'College Stats',
      count: totalStats,
      description: 'Live homepage counters',
      href: '/dashboard/stats',
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      actionLabel: 'Manage Stats',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Nabiganj Government College
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Manage public notices, faculty directory, campus gallery, and college milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary hover:text-primary cursor-pointer shadow-2xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Public Site</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-transparent transition-colors duration-300 group-hover:bg-primary" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bgColor} ${card.color} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                    {card.count}
                  </span>
                </div>
                <h3 className="font-serif text-sm font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  <span>{card.actionLabel}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Institutional Meta */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Quick Operations (7 cols) */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs lg:col-span-7">
          <h2 className="font-serif text-base sm:text-lg font-bold text-foreground mb-1">
            Quick Actions
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Frequent operations for updating college portal content
          </p>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <Link
              href="/dashboard/notices"
              className="group flex items-center gap-3.5 rounded-xl border border-border/70 bg-secondary/25 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/60 cursor-pointer shadow-2xs"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition-transform group-hover:scale-105">
                <PlusCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-xs font-bold text-foreground transition-colors group-hover:text-primary truncate">
                  Publish Notice
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Exam, admission & circulars
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/teachers"
              className="group flex items-center gap-3.5 rounded-xl border border-border/70 bg-secondary/25 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/60 cursor-pointer shadow-2xs"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition-transform group-hover:scale-105">
                <PlusCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-xs font-bold text-foreground transition-colors group-hover:text-primary truncate">
                  Add Faculty
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Teacher profiles & departments
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/gallery"
              className="group flex items-center gap-3.5 rounded-xl border border-border/70 bg-secondary/25 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/60 cursor-pointer shadow-2xs"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-transform group-hover:scale-105">
                <PlusCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-xs font-bold text-foreground transition-colors group-hover:text-primary truncate">
                  Upload Photo
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Campus moments & events
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/admins"
              className="group flex items-center gap-3.5 rounded-xl border border-border/70 bg-secondary/25 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/60 cursor-pointer shadow-2xs"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Users className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-xs font-bold text-foreground transition-colors group-hover:text-primary truncate">
                  Manage Admins
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Credentials & permissions
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/covers"
              className="group flex items-center gap-3.5 rounded-xl border border-border/70 bg-secondary/25 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/60 cursor-pointer shadow-2xs"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 transition-transform group-hover:scale-105">
                <Layers className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-xs font-bold text-foreground transition-colors group-hover:text-primary truncate">
                  Hero Covers ({totalCovers})
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Change carousel slides
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Institutional Reference Card (5 cols) */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <School className="h-4 w-4 text-primary" />
              <h2 className="font-serif text-base font-bold text-foreground">
                Institutional Details
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Verified identity identifiers for Nabiganj Government College
            </p>

            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <dt className="text-muted-foreground">EIIN Number</dt>
                <dd className="font-mono font-bold text-primary">129524</dd>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <dt className="text-muted-foreground">College Code (BISE)</dt>
                <dd className="font-mono font-bold text-primary">1301</dd>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <dt className="text-muted-foreground">National University Code</dt>
                <dd className="font-mono font-bold text-primary">1706</dd>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <dt className="text-muted-foreground">Established</dt>
                <dd className="font-semibold text-foreground">1984 (Nationalized)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Location</dt>
                <dd className="font-semibold text-foreground">Habiganj, Sylhet Division</dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-primary" />
              <span>Academic Year 2026–2027</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Live Database Sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
