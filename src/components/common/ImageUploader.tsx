'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { imageUpload } from '@/lib/imageUpload';

interface ImageUploaderProps {
  label: string;
  value?: string | null;
  onChange: (url: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'banner';
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  helperText,
  aspectRatio = 'square',
}) => {
  const [uploading, setUploading] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-[16/9]'
      : aspectRatio === 'banner'
      ? 'aspect-[21/9]'
      : 'aspect-square';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setUploading(true);
    const toastId = toast.loading('Uploading image to ImgBB...');

    try {
      const res = await imageUpload({ image: file });
      const uploadedUrl = res?.display_url || res?.url;

      if (uploadedUrl) {
        onChange(uploadedUrl);
        toast.success('Image uploaded successfully!', { id: toastId });
      } else {
        toast.error('Could not get image URL from ImgBB', { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload image to ImgBB', { id: toastId });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] text-primary hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{showManualUrl ? 'Upload File' : 'Or paste URL'}</span>
        </button>
      </div>

      {showManualUrl ? (
        /* Manual URL Input */
        <div className="flex gap-2">
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      ) : value ? (
        /* Uploaded Image Preview Box */
        <div className="relative group overflow-hidden rounded-2xl border border-border bg-card shadow-2xs max-w-sm">
          <div className={`${aspectClass} w-full overflow-hidden bg-secondary relative`}>
            <img
              src={value}
              alt="Uploaded"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Overlay buttons */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90 cursor-pointer shadow-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Dropzone Upload Button */
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-secondary/20 p-5 text-center transition-all cursor-pointer hover:border-primary hover:bg-secondary/40 ${
            uploading ? 'opacity-60 pointer-events-none' : ''
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
              <span className="text-xs font-semibold text-foreground">
                Uploading to ImgBB...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Click to upload image
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  PNG, JPG, WEBP up to 10MB (Hosted via ImgBB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {helperText && !error && (
        <p className="text-[11px] text-muted-foreground">{helperText}</p>
      )}

      {error && (
        <span className="text-[11px] text-destructive mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
};
