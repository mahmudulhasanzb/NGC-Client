'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, Award, Users, GraduationCap, Building2, BookOpen, Trophy, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';

export interface CollegeStat {
  id: string;
  label: string;
  value: string;
  icon?: string | null;
  description?: string | null;
  orderIndex: number;
  createdAt?: string;
}

export interface StatFormInputs {
  label: string;
  value: string;
  icon: string;
  description: string;
  orderIndex: number;
}

interface StatFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedOrNewStat: CollegeStat, isEdit: boolean) => void;
  statToEdit?: CollegeStat | null;
}

const availableIcons = [
  { name: 'Users', label: 'Users / Students' },
  { name: 'GraduationCap', label: 'Graduation / Faculty' },
  { name: 'Award', label: 'Award / Success' },
  { name: 'Building2', label: 'Building / Heritage' },
  { name: 'BookOpen', label: 'Book / Library' },
  { name: 'Trophy', label: 'Trophy / Achievements' },
  { name: 'Sparkles', label: 'Sparkles / Quality' },
];

export const StatFormModal: React.FC<StatFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  statToEdit,
}) => {
  const isEdit = Boolean(statToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StatFormInputs>({
    defaultValues: {
      label: '',
      value: '',
      icon: 'Award',
      description: '',
      orderIndex: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (statToEdit) {
        reset({
          label: statToEdit.label || '',
          value: statToEdit.value || '',
          icon: statToEdit.icon || 'Award',
          description: statToEdit.description || '',
          orderIndex: statToEdit.orderIndex ?? 0,
        });
      } else {
        reset({
          label: '',
          value: '',
          icon: 'Award',
          description: '',
          orderIndex: 0,
        });
      }
    }
  }, [statToEdit, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: StatFormInputs) => {
    const toastId = toast.loading(
      isEdit ? 'Updating milestone metric...' : 'Adding milestone counter...',
    );

    const payload = {
      label: data.label.trim(),
      value: data.value.trim(),
      icon: data.icon,
      description: data.description.trim(),
      orderIndex: Number(data.orderIndex) || 0,
    };

    try {
      if (isEdit && statToEdit) {
        const res = await serverMutation({
          path: `stats/${statToEdit.id}`,
          method: 'PATCH',
          data: payload,
        });

        if (res?.success) {
          toast.success('Milestone metric updated successfully!', { id: toastId });
          onSuccess(res.data, true);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to update stat', { id: toastId });
        }
      } else {
        const res = await serverMutation({
          path: 'stats',
          method: 'POST',
          data: payload,
        });

        if (res?.success) {
          toast.success('Milestone counter added successfully!', { id: toastId });
          onSuccess(res.data, false);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to add stat', { id: toastId });
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Error saving milestone metric', { id: toastId });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 bg-secondary/30 px-6 py-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {isEdit ? 'Edit Milestone Counter' : 'Add New Milestone Counter'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? 'Update homepage dynamic stats, counter figures, or description'
                : 'Add a prominent metric counter for Nabiganj Government College'}
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Label */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Counter Title / Label <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              {...register('label', { required: 'Label is required' })}
              placeholder="e.g. Enrolled Students"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.label && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.label.message}
              </span>
            )}
          </div>

          {/* Value & Order Index */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Metric Value / Figure <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('value', { required: 'Value is required' })}
                placeholder="e.g. 4500+ or 98%"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
              {errors.value && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.value.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Display Order Index <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                {...register('orderIndex', {
                  valueAsNumber: true,
                  required: 'Order index is required',
                })}
                placeholder="1"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.orderIndex && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.orderIndex.message}
                </span>
              )}
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Icon Symbol <span className="text-destructive">*</span>
            </label>
            <select
              {...register('icon', { required: 'Icon is required' })}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {availableIcons.map((ic) => (
                <option key={ic.name} value={ic.name}>
                  {ic.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Supporting Subtitle / Description <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              {...register('description', { required: 'Description is required' })}
              placeholder="e.g. Pursuing HSC & Degree academic programs"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.description && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/70">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isEdit ? 'Save Changes' : 'Add Metric'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
