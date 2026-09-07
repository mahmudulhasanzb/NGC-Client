'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, Image as ImageIcon, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';
import { ImageUploader } from '@/components/common/ImageUploader';

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  caption?: string | null;
  category?: string | null;
  isFeatured: boolean;
  createdAt?: string;
}

export interface GalleryFormInputs {
  title: string;
  imageUrl: string;
  category: string;
  caption: string;
  isFeatured: boolean;
}

interface GalleryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedOrNewItem: GalleryItem, isEdit: boolean) => void;
  itemToEdit?: GalleryItem | null;
}

const categories = [
  'Campus',
  'Academic',
  'Ceremony',
  'Faculty',
  'Workshop',
  'Sports',
  'Cultural',
  'General',
];

export const GalleryFormModal: React.FC<GalleryFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  itemToEdit,
}) => {
  const isEdit = Boolean(itemToEdit);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormInputs>({
    defaultValues: {
      title: '',
      imageUrl: '',
      category: 'Campus',
      caption: '',
      isFeatured: false,
    },
  });

  const imageUrlValue = watch('imageUrl');
  const isFeaturedValue = watch('isFeatured');

  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        reset({
          title: itemToEdit.title || '',
          imageUrl: itemToEdit.imageUrl || '',
          category: itemToEdit.category || 'Campus',
          caption: itemToEdit.caption || '',
          isFeatured: Boolean(itemToEdit.isFeatured),
        });
      } else {
        reset({
          title: '',
          imageUrl: '',
          category: 'Campus',
          caption: '',
          isFeatured: false,
        });
      }
    }
  }, [itemToEdit, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: GalleryFormInputs) => {
    const toastId = toast.loading(
      isEdit ? 'Updating photo item...' : 'Adding photo to gallery...',
    );

    const payload = {
      title: data.title.trim(),
      imageUrl: data.imageUrl.trim(),
      category: data.category,
      caption: data.caption.trim() || null,
      isFeatured: Boolean(data.isFeatured),
    };

    try {
      if (isEdit && itemToEdit) {
        const res = await serverMutation({
          path: `gallery/${itemToEdit.id}`,
          method: 'PATCH',
          data: payload,
        });

        if (res?.success) {
          toast.success('Gallery photo updated successfully!', { id: toastId });
          onSuccess(res.data, true);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to update photo', { id: toastId });
        }
      } else {
        const res = await serverMutation({
          path: 'gallery',
          method: 'POST',
          data: payload,
        });

        if (res?.success) {
          toast.success('Photo added to campus gallery!', { id: toastId });
          onSuccess(res.data, false);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to add photo', { id: toastId });
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred while saving gallery photo', {
        id: toastId,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 bg-secondary/30 px-6 py-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {isEdit ? 'Edit Gallery Photo' : 'Add Photo to Gallery'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? 'Update media details, category, or homepage showcase tag'
                : 'Upload or link high-resolution campus and academic photography'}
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

        {/* Form Body with React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Photo Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Photo title is required' })}
              placeholder="e.g. Annual Prize Distribution Ceremony"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.title && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Category & Featured Toggle */}
          <div className="grid gap-4 sm:grid-cols-2 items-center">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-5">
              <label className="flex items-center gap-2.5 cursor-pointer rounded-xl border border-border bg-secondary/20 p-2.5">
                <input
                  type="checkbox"
                  {...register('isFeatured')}
                  className="h-4 w-4 rounded text-primary focus:ring-primary cursor-pointer"
                />
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Star className={`h-3.5 w-3.5 ${isFeaturedValue ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                  Show in Homepage Moments
                </span>
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="hidden"
              {...register('imageUrl', {
                required: 'Photo is required',
              })}
            />
            <ImageUploader
              label="Campus Photo"
              value={imageUrlValue}
              onChange={(url) =>
                setValue('imageUrl', url, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              required={true}
              error={errors.imageUrl?.message}
              aspectRatio="video"
            />
          </div>

          {/* Caption / Description */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Caption / Description <span className="text-destructive">*</span>
            </label>
            <textarea
              rows={3}
              {...register('caption', { required: 'Caption is required' })}
              placeholder="Brief description of the event, venue, and participating students..."
              className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.caption && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.caption.message}
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
              <span>{isEdit ? 'Save Changes' : 'Add Photo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
