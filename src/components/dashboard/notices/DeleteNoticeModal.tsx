'use client';

import React, { useState } from 'react';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';
import { Notice } from './NoticeFormModal';

interface DeleteNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
  notice: Notice | null;
}

export const DeleteNoticeModal: React.FC<DeleteNoticeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  notice,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !notice) return null;

  const handleDelete = async () => {
    setLoading(true);
    const toastId = toast.loading('Deleting notice...');

    try {
      const res = await serverMutation({
        path: `notices/${notice.id}`,
        method: 'DELETE',
      });

      if (res?.success) {
        toast.success('Notice deleted successfully!', { id: toastId });
        onSuccess(notice.id);
        onClose();
      } else {
        toast.error(res?.message || 'Failed to delete notice', { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred while deleting notice', {
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
              Delete Notice
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-foreground">"{notice.title}"</span>?
              This notice will be archived from the public website.
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
            <span>Delete Notice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
