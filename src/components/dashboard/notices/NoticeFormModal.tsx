'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';

export interface Notice {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: 'GENERAL' | 'ACADEMIC' | 'ADMISSION' | 'EXAM' | 'EVENT';
  attachment?: string | null;
  isFeatured: boolean;
  publishedAt: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

interface NoticeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedOrNewNotice: Notice, isEdit: boolean) => void;
  noticeToEdit?: Notice | null;
}

const categories = [
  { value: 'GENERAL', label: 'General Announcement' },
  { value: 'ACADEMIC', label: 'Academic & Classes' },
  { value: 'ADMISSION', label: 'Admission Notice' },
  { value: 'EXAM', label: 'Examination & Routine' },
  { value: 'EVENT', label: 'Events & Programs' },
];

export const NoticeFormModal: React.FC<NoticeFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  noticeToEdit,
}) => {
  const isEdit = Boolean(noticeToEdit);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'GENERAL',
    attachment: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (noticeToEdit) {
      setFormData({
        title: noticeToEdit.title,
        content: noticeToEdit.content,
        category: noticeToEdit.category,
        attachment: noticeToEdit.attachment || '',
        isFeatured: noticeToEdit.isFeatured,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: 'GENERAL',
        attachment: '',
        isFeatured: false,
      });
    }
  }, [noticeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Notice title is required');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Notice content is required');
      return;
    }

    setLoading(true);
    const toastId = toast.loading(
      isEdit ? 'Updating notice...' : 'Publishing notice...',
    );

    try {
      if (isEdit && noticeToEdit) {
        const res = await serverMutation({
          path: `notices/${noticeToEdit.id}`,
          method: 'PATCH',
          data: {
            title: formData.title.trim(),
            content: formData.content.trim(),
            category: formData.category,
            attachment: formData.attachment.trim() || null,
            isFeatured: formData.isFeatured,
          },
        });

        if (res?.success) {
          toast.success('Notice updated successfully!', { id: toastId });
          onSuccess(res.data, true);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to update notice', { id: toastId });
        }
      } else {
        const res = await serverMutation({
          path: 'notices',
          method: 'POST',
          data: {
            title: formData.title.trim(),
            content: formData.content.trim(),
            category: formData.category,
            attachment: formData.attachment.trim() || null,
            isFeatured: formData.isFeatured,
          },
        });

        if (res?.success) {
          toast.success('Notice published successfully!', { id: toastId });
          onSuccess(res.data, false);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to publish notice', { id: toastId });
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while saving notice', {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 bg-secondary/30 px-6 py-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {isEdit ? 'Edit Notice' : 'Publish New Notice'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? 'Update circular details, attachment or category'
                : 'Broadcast official college announcements & circulars'}
            </p>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(85vh-80px)] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Notice Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. HSC 1st Year Examination Routine 2025"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Notice Category <span className="text-destructive">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Notice Content & Circular Details <span className="text-destructive">*</span>
            </label>
            <textarea
              rows={5}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write the full notice text, exam schedule instructions, deadlines, or room numbers..."
              className="w-full rounded-xl border border-border bg-background p-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
              required
            />
          </div>

          {/* Attachment PDF or Image Link */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Attachment Link (PDF / Circular Image URL) <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              value={formData.attachment}
              onChange={(e) => setFormData({ ...formData, attachment: e.target.value })}
              placeholder="https://example.com/notices/routine-2025.pdf"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border/80 bg-secondary/20 p-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">Featured Announcement</div>
                <div className="text-[11px] text-muted-foreground">
                  Pinned on homepage marquee & notice ticker
                </div>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full bg-border peer-checked:bg-primary transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/70">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isEdit ? 'Save Changes' : 'Publish Notice'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
