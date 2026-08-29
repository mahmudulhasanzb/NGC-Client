'use client';

import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';
import { CollegeStat } from './StatFormModal';

interface DeleteStatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
  stat: CollegeStat | null;
}

export const DeleteStatModal: React.FC<DeleteStatModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  stat,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !stat) return null;

  const handleDelete = async () => {
    setLoading(true);
    const toastId = toast.loading('Deleting milestone metric...');

    try {
      const res = await serverMutation({
        path: `stats/${stat.id}`,
        method: 'DELETE',
      });

      if (res?.success) {
        toast.success('Milestone metric deleted successfully!', { id: toastId });
        onSuccess(stat.id);
        onClose();
      } else {
        toast.error(res?.message || 'Failed to delete stat', { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred while deleting stat', {
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
              Delete Milestone Counter
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to remove <span className="font-semibold text-foreground">"{stat.label}" ({stat.value})</span>?
              This counter will no longer appear in the homepage milestone statistics.
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
            <span>Delete Metric</span>
          </button>
        </div>
      </div>
    </div>
  );
};
