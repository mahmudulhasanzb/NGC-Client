'use client';

import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';
import { GalleryItem } from './GalleryFormModal';

interface DeleteGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
  item: GalleryItem | null;
}

export const DeleteGalleryModal: React.FC<DeleteGalleryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  item,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !item) return null;

  const handleDelete = async () => {
    setLoading(true);
    const toastId = toast.loading('Deleting gallery photo...');

    try {
      const res = await serverMutation({
        path: `gallery/${item.id}`,
        method: 'DELETE',
      });

      if (res?.success) {
        toast.success('Gallery photo deleted successfully!', { id: toastId });
        onSuccess(item.id);
        onClose();
      } else {
        toast.error(res?.message || 'Failed to delete photo', { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred while deleting photo', {
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
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-foreground">
              Delete Gallery Photo
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to remove <span className="font-semibold text-foreground">"{item.title}"</span>?
              This image will be removed from the public campus gallery and homepage moments.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-border/60 pt-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>Delete Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
