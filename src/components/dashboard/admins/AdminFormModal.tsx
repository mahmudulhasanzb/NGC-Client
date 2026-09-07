'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, ShieldCheck, UserCheck, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  isActive: boolean;
  createdAt?: string;
}

export interface AdminFormInputs {
  name: string;
  email: string;
  password?: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  isActive: boolean;
}

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedOrNewAdmin: AdminUser, isEdit: boolean) => void;
  adminToEdit?: AdminUser | null;
}

export const AdminFormModal: React.FC<AdminFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  adminToEdit,
}) => {
  const isEdit = Boolean(adminToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'ADMIN',
      isActive: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (adminToEdit) {
        reset({
          name: adminToEdit.name || '',
          email: adminToEdit.email || '',
          password: '',
          role: adminToEdit.role || 'ADMIN',
          isActive: adminToEdit.isActive ?? true,
        });
      } else {
        reset({
          name: '',
          email: '',
          password: '',
          role: 'ADMIN',
          isActive: true,
        });
      }
    }
  }, [adminToEdit, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: AdminFormInputs) => {
    const toastId = toast.loading(
      isEdit ? 'Updating administrator...' : 'Creating administrator account...',
    );

    try {
      if (isEdit && adminToEdit) {
        const payload: Record<string, any> = {
          name: data.name.trim(),
          role: data.role,
          isActive: Boolean(data.isActive),
        };

        const res = await serverMutation({
          path: `users/${adminToEdit.id}`,
          method: 'PATCH',
          data: payload,
        });

        if (res?.success) {
          toast.success('Administrator profile updated successfully!', { id: toastId });
          onSuccess(res.data, true);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to update administrator', { id: toastId });
        }
      } else {
        if (!data.password || data.password.length < 8) {
          toast.error('Password must be at least 8 characters long', { id: toastId });
          return;
        }

        const payload = {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          role: data.role,
        };

        const res = await serverMutation({
          path: 'users',
          method: 'POST',
          data: payload,
        });

        if (res?.success) {
          toast.success('Administrator account created successfully!', { id: toastId });
          onSuccess(res.data, false);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to create administrator', { id: toastId });
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred while saving administrator', {
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
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 bg-secondary/30 px-6 py-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {isEdit ? 'Edit Administrator Profile' : 'Add Internal Administrator'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? 'Update role permissions or activation status'
                : 'Grant internal dashboard access credentials to college staff'}
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
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Staff Full Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="e.g. Principal Secretariat / Registrar"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.name && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Official Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              disabled={isEdit}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email address',
                },
              })}
              placeholder="staff@ngc.edu.bd"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {errors.email && (
              <span className="text-[11px] text-destructive mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password (Only required on creation) */}
          {!isEdit && (
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Initial Password <span className="text-destructive">*</span>
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required for new accounts',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.password && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>
          )}

          {/* Role & Active Status */}
          <div className="grid gap-4 sm:grid-cols-2 items-center pt-1">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Administrative Role <span className="text-destructive">*</span>
              </label>
              <select
                {...register('role', { required: 'Role is required' })}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="ADMIN">ADMIN (Full Content Access)</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN (All Permissions)</option>
              </select>
            </div>

            {isEdit && (
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Account Status <span className="text-destructive">*</span>
                </label>
                <select
                  {...register('isActive')}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="true">Active (Access Enabled)</option>
                  <option value="false">Suspended (Access Disabled)</option>
                </select>
              </div>
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
              <span>{isEdit ? 'Save Changes' : 'Create Admin'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
