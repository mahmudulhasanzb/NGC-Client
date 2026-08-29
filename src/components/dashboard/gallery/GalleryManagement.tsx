'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Image as ImageIcon,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  ZoomIn,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { GalleryItem, GalleryFormModal } from './GalleryFormModal';
import { DeleteGalleryModal } from './DeleteGalleryModal';
import { serverMutation } from '@/lib/api/serverMutation';

interface GalleryManagementProps {
  initialItems: GalleryItem[];
}

const categoryFilterList = [
  'ALL',
  'Campus',
  'Academic',
  'Ceremony',
  'Faculty',
  'Workshop',
  'Sports',
  'Cultural',
];

const categoryColors: Record<string, string> = {
  Campus: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Academic: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Ceremony: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Faculty: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Workshop: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  Sports: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  Cultural: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
};

export const GalleryManagement: React.FC<GalleryManagementProps> = ({
  initialItems,
}) => {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>(initialItems || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  // Sync state when props refresh
  useEffect(() => {
    if (initialItems) {
      setItems(initialItems);
    }
  }, [initialItems]);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<GalleryItem | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.caption && item.caption.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Handlers
  const handleOpenCreate = () => {
    setItemToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setItemToEdit(item);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (item: GalleryItem) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = (savedItem: GalleryItem, isEdit: boolean) => {
    if (isEdit) {
      setItems((prev) =>
        prev.map((it) => (it.id === savedItem.id ? savedItem : it)),
      );
    } else {
      setItems((prev) => [savedItem, ...prev]);
    }
    router.refresh();
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setItems((prev) => prev.filter((it) => it.id !== deletedId));
    router.refresh();
  };

  // Toggle Featured status inline
  const handleToggleFeatured = async (item: GalleryItem) => {
    const newStatus = !item.isFeatured;
    const toastId = toast.loading(
      newStatus ? 'Adding to homepage moments...' : 'Removing from homepage moments...',
    );

    try {
      const res = await serverMutation({
        path: `gallery/${item.id}`,
        method: 'PATCH',
        data: { isFeatured: newStatus },
      });

      if (res?.success) {
        toast.success(
          newStatus ? 'Showcased in Homepage Moments!' : 'Removed from Homepage Moments',
          { id: toastId },
        );
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, isFeatured: newStatus } : it)),
        );
        router.refresh();
      } else {
        toast.error(res?.message || 'Failed to update showcase status', { id: toastId });
      }
    } catch {
      toast.error('Failed to update showcase status', { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Campus Photography & Media</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Gallery & Moments Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage academic event photography, campus life snapshots, and homepage moment showcases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/gallery"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Public Gallery</span>
          </Link>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by photo title, category, or caption..."
            className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/60">
          {categoryFilterList.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-2xs'
                    : 'bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const badgeColor =
              categoryColors[item.category || 'General'] ||
              'bg-slate-500/10 text-slate-600 border-slate-500/20';

            return (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Top Overlay Badge & Actions */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent">
                    <span
                      className={`rounded-md border bg-card/90 px-2 py-0.5 text-[10px] font-bold backdrop-blur-md ${badgeColor}`}
                    >
                      {item.category || 'General'}
                    </span>

                    {/* Inline Featured Star Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(item)}
                      title={
                        item.isFeatured
                          ? 'Featured in Homepage Moments (Click to unfeature)'
                          : 'Mark as Featured in Homepage Moments'
                      }
                      className={`flex h-7 w-7 items-center justify-center rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                        item.isFeatured
                          ? 'bg-accent text-accent-foreground shadow-xs'
                          : 'bg-black/40 text-white/80 hover:bg-black/60 hover:text-white'
                      }`}
                    >
                      <Star
                        className={`h-3.5 w-3.5 ${item.isFeatured ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Zoom Preview Trigger */}
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item)}
                    title="Zoom Photo"
                    className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:scale-110 cursor-pointer"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="flex items-center justify-between border-t border-border/60 pt-3">
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {item.isFeatured ? (
                        <span className="text-accent font-semibold flex items-center gap-1">
                          <Star className="h-3 w-3 fill-accent" /> Homepage Showcase
                        </span>
                      ) : (
                        'Standard Gallery'
                      )}
                    </span>

                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        title="Edit Photo"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenDelete(item)}
                        title="Delete Photo"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground bg-card">
          <ImageIcon className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <h3 className="font-serif text-base font-bold text-foreground">No photos found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            Try adjusting your search criteria or add new high-resolution campus photography.
          </p>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add First Photo</span>
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <GalleryFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        itemToEdit={itemToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteGalleryModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
        item={itemToDelete}
      />

      {/* Lightbox Zoom Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage.imageUrl}
              alt={previewImage.title}
              className="max-h-[70vh] w-full object-contain bg-black"
            />
            <div className="p-5">
              <h3 className="font-serif text-lg font-bold text-foreground">
                {previewImage.title}
              </h3>
              {previewImage.caption && (
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {previewImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
