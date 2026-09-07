'use client';

import React, { useState } from 'react';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { CoverItem } from './CoverFormModal';
import { serverMutation } from '@/lib/api/serverMutation';

interface DeleteCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: string) => void;
  cover: CoverItem | null;
}

export const DeleteCoverModal: React.FC<DeleteCoverModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  cover,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !cover) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await serverMutation({
        path: `covers/${cover.id}`,
        method: 'DELETE',
      });

      if (res?.success) {
        toast.success('Cover slide deleted successfully');
        onSuccess(cover.id);
        onClose();
      } else {
        toast.error(res?.message || 'Failed to delete cover');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete cover');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all sm:p-7">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="font-serif text-lg font-bold text-foreground">
            Delete Hero Cover Slide?
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Are you sure you want to remove{' '}
            <span className="font-semibold text-foreground">"{cover.title}"</span>? It will no longer appear on the college homepage carousel.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2.5 text-xs font-semibold text-destructive-foreground shadow-sm transition-all hover:bg-destructive/90 cursor-pointer disabled:opacity-60"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Delete Slide
          </button>
        </div>
      </div>
    </div>
  );
};
