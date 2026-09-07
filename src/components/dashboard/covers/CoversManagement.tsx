'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Sliders,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  ExternalLink,
  Layers,
  ArrowRight,
  MoveUp,
  MoveDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { CoverItem, CoverFormModal } from './CoverFormModal';
import { DeleteCoverModal } from './DeleteCoverModal';
import { serverMutation } from '@/lib/api/serverMutation';

interface CoversManagementProps {
  initialCovers: CoverItem[];
}

export const CoversManagement: React.FC<CoversManagementProps> = ({
  initialCovers,
}) => {
  const router = useRouter();
  const [covers, setCovers] = useState<CoverItem[]>(initialCovers || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

  useEffect(() => {
    if (initialCovers) {
      setCovers(initialCovers);
    }
  }, [initialCovers]);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [coverToEdit, setCoverToEdit] = useState<CoverItem | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [coverToDelete, setCoverToDelete] = useState<CoverItem | null>(null);

  // Filtered covers
  const filteredCovers = useMemo(() => {
    return covers.filter((item) => {
      const matchesStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === 'ACTIVE'
          ? item.isActive
          : !item.isActive;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [covers, searchQuery, statusFilter]);

  // Toggle active state
  const handleToggleActive = async (cover: CoverItem) => {
    const updatedStatus = !cover.isActive;
    try {
      const res = await serverMutation({
        path: `covers/${cover.id}`,
        method: 'PATCH',
        data: { isActive: updatedStatus },
      });

      if (res?.success) {
        setCovers((prev) =>
          prev.map((c) => (c.id === cover.id ? { ...c, isActive: updatedStatus } : c))
        );
        toast.success(
          updatedStatus ? 'Cover slide activated!' : 'Cover slide deactivated!'
        );
        router.refresh();
      } else {
        toast.error('Failed to update status');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update status');
    }
  };

  // Callback on form success
  const handleFormSuccess = (savedCover: CoverItem, isNew: boolean) => {
    if (isNew) {
      setCovers((prev) => [...prev, savedCover]);
    } else {
      setCovers((prev) =>
        prev.map((c) => (c.id === savedCover.id ? savedCover : c))
      );
    }
    router.refresh();
  };

  // Callback on delete success
  const handleDeleteSuccess = (id: string) => {
    setCovers((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <Layers className="h-3.5 w-3.5" />
            <span>Homepage Hero Carousel</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Hero Covers & Banners
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Control the large visual cover slides, headlines, and call-to-actions displayed on the college homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/30 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Live Site</span>
          </Link>
          <button
            onClick={() => {
              setCoverToEdit(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Hero Cover</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search covers by title or subtitle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center rounded-xl border border-border bg-card p-1 text-xs font-medium">
          {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground font-semibold shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {status === 'ALL'
                ? `All (${covers.length})`
                : status === 'ACTIVE'
                ? `Active (${covers.filter((c) => c.isActive).length})`
                : `Hidden (${covers.filter((c) => !c.isActive).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Covers Grid */}
      {filteredCovers.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
          <Layers className="h-10 w-10 text-muted-foreground/30 mb-3" />
          <h3 className="font-serif text-base font-semibold text-foreground">No hero covers found</h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm">
            {searchQuery
              ? 'No cover slides matched your filter. Clear the search or switch status tabs.'
              : 'Add your first cover slide to showcase Nabiganj Government College campus and announcements.'}
          </p>
          <button
            onClick={() => {
              setCoverToEdit(null);
              setIsFormOpen(true);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Cover Slide
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCovers.map((cover) => (
            <div
              key={cover.id}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-md ${
                cover.isActive
                  ? 'border-border/80 hover:border-primary/50'
                  : 'border-border/40 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Cover Image Thumbnail / Preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={cover.imageUrl}
                  alt={cover.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white/90 border border-white/10">
                    Order #{cover.orderIndex}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md border ${
                      cover.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {cover.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>

                {/* Bottom Overlay Title in Image */}
                <div className="absolute bottom-3 left-3 right-3">
                  {cover.badge && (
                    <span className="mb-1 inline-block text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                      {cover.badge}
                    </span>
                  )}
                  <h3 className="font-serif text-sm font-bold text-white line-clamp-1">
                    {cover.title}
                  </h3>
                </div>
              </div>

              {/* Cover Details Card Body */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div className="space-y-2.5">
                  {cover.subtitle ? (
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {cover.subtitle}
                    </p>
                  ) : (
                    <p className="text-xs italic text-muted-foreground/60">
                      No description provided.
                    </p>
                  )}

                  {/* Buttons preview */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                    {cover.primaryCtaText && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 text-primary font-semibold px-2 py-0.5 border border-primary/20">
                        {cover.primaryCtaText} → {cover.primaryCtaLink}
                      </span>
                    )}
                    {cover.secondaryCtaText && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-secondary text-muted-foreground font-medium px-2 py-0.5">
                        {cover.secondaryCtaText} → {cover.secondaryCtaLink}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(cover)}
                    title={cover.isActive ? 'Hide from homepage' : 'Show on homepage'}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                      cover.isActive
                        ? 'text-emerald-600 hover:text-emerald-700'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cover.isActive ? (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setCoverToEdit(cover);
                        setIsFormOpen(true);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
                      title="Edit slide"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setCoverToDelete(cover);
                        setIsDeleteOpen(true);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                      title="Delete slide"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <CoverFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCoverToEdit(null);
        }}
        onSuccess={handleFormSuccess}
        coverToEdit={coverToEdit}
        suggestedOrder={covers.length + 1}
      />

      <DeleteCoverModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setCoverToDelete(null);
        }}
        onSuccess={handleDeleteSuccess}
        cover={coverToDelete}
      />
    </div>
  );
};
