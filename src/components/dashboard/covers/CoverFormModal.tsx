'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon, Sliders, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';
import { ImageUploader } from '@/components/common/ImageUploader';

export interface CoverItem {
  id: string;
  imageUrl: string;
  badge?: string | null;
  title: string;
  subtitle?: string | null;
  primaryCtaText?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaText?: string | null;
  secondaryCtaLink?: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CoverFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (cover: CoverItem, isNew: boolean) => void;
  coverToEdit?: CoverItem | null;
  suggestedOrder?: number;
}

export const CoverFormModal: React.FC<CoverFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  coverToEdit,
  suggestedOrder = 1,
}) => {
  const [loading, setLoading] = useState(false);

  // Form states
  const [imageUrl, setImageUrl] = useState('');
  const [badge, setBadge] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [primaryCtaText, setPrimaryCtaText] = useState('Apply for Admission');
  const [primaryCtaLink, setPrimaryCtaLink] = useState('/admission');
  const [secondaryCtaText, setSecondaryCtaText] = useState('Learn More');
  const [secondaryCtaLink, setSecondaryCtaLink] = useState('/about');
  const [orderIndex, setOrderIndex] = useState(suggestedOrder);
  const [isActive, setIsActive] = useState(true);

  const isEditing = Boolean(coverToEdit);

  useEffect(() => {
    if (coverToEdit) {
      setImageUrl(coverToEdit.imageUrl || '');
      setBadge(coverToEdit.badge || '');
      setTitle(coverToEdit.title || '');
      setSubtitle(coverToEdit.subtitle || '');
      setPrimaryCtaText(coverToEdit.primaryCtaText || 'Apply for Admission');
      setPrimaryCtaLink(coverToEdit.primaryCtaLink || '/admission');
      setSecondaryCtaText(coverToEdit.secondaryCtaText || 'Learn More');
      setSecondaryCtaLink(coverToEdit.secondaryCtaLink || '/about');
      setOrderIndex(coverToEdit.orderIndex !== undefined ? coverToEdit.orderIndex : 0);
      setIsActive(coverToEdit.isActive !== undefined ? coverToEdit.isActive : true);
    } else {
      setImageUrl('');
      setBadge('Established 1984 | EIIN: 129524');
      setTitle('');
      setSubtitle('');
      setPrimaryCtaText('Apply for Admission');
      setPrimaryCtaLink('/admission');
      setSecondaryCtaText('Learn More');
      setSecondaryCtaLink('/about');
      setOrderIndex(suggestedOrder);
      setIsActive(true);
    }
  }, [coverToEdit, isOpen, suggestedOrder]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Slide title is required');
      return;
    }

    if (!imageUrl.trim()) {
      toast.error('Cover background image is required');
      return;
    }

    setLoading(true);
    const payload = {
      imageUrl: imageUrl.trim(),
      badge: badge.trim() || null,
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      primaryCtaText: primaryCtaText.trim() || 'Apply for Admission',
      primaryCtaLink: primaryCtaLink.trim() || '/admission',
      secondaryCtaText: secondaryCtaText.trim() || null,
      secondaryCtaLink: secondaryCtaLink.trim() || null,
      orderIndex: Number(orderIndex) || 0,
      isActive: Boolean(isActive),
    };

    try {
      if (isEditing && coverToEdit) {
        const res = await serverMutation({
          path: `covers/${coverToEdit.id}`,
          method: 'PATCH',
          data: payload,
        });

        if (res?.success) {
          toast.success('Hero cover updated successfully!');
          onSuccess(res.data, false);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to update cover');
        }
      } else {
        const res = await serverMutation({
          path: 'covers',
          method: 'POST',
          data: payload,
        });

        if (res?.success) {
          toast.success('Hero cover created successfully!');
          onSuccess(res.data, true);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to create cover');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                {isEditing ? 'Edit Hero Cover Slide' : 'Add New Hero Cover Slide'}
              </h2>
              <p className="text-xs text-muted-foreground">
                Configure the background visuals and headline copy for the homepage carousel.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Background Image Uploader */}
          <div>
            <ImageUploader
              label="Cover Background Image (1920x1080 recommended)"
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              aspectRatio="banner"
              required
              helperText="Upload or enter a high-resolution landscape photo for the hero carousel."
            />
          </div>

          {/* Headline & Badge */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Top Badge Tag (Optional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Established 1984 | EIIN: 129524"
                className="w-full rounded-xl border border-border bg-secondary/20 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Display Order Index
              </label>
              <input
                type="number"
                min="0"
                value={orderIndex}
                onChange={(e) => setOrderIndex(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-secondary/20 px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Main Title */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Hero Slide Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Nabiganj Government College"
              className="w-full rounded-xl border border-border bg-secondary/20 px-3.5 py-2.5 text-xs font-serif font-bold text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Subtitle / Description */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Subtitle / Description
            </label>
            <textarea
              rows={3}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A brief inspiring sentence about the college's heritage, achievements, or campus environment..."
              className="w-full rounded-xl border border-border bg-secondary/20 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Action Buttons Configuration */}
          <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Call-To-Action Buttons
            </h4>
            
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={primaryCtaText}
                  onChange={(e) => setPrimaryCtaText(e.target.value)}
                  placeholder="Apply for Admission"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={primaryCtaLink}
                  onChange={(e) => setPrimaryCtaLink(e.target.value)}
                  placeholder="/admission"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={secondaryCtaText}
                  onChange={(e) => setSecondaryCtaText(e.target.value)}
                  placeholder="Learn More"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={secondaryCtaLink}
                  onChange={(e) => setSecondaryCtaLink(e.target.value)}
                  placeholder="/about"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between rounded-xl border border-border/80 bg-secondary/15 px-4 py-3">
            <div>
              <span className="text-xs font-semibold text-foreground">Slide Visibility</span>
              <p className="text-[11px] text-muted-foreground">
                When enabled, this slide appears live in the homepage hero carousel.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                isActive ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/70">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus:outline-hidden cursor-pointer disabled:opacity-60"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isEditing ? 'Save Changes' : 'Create Cover Slide'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
