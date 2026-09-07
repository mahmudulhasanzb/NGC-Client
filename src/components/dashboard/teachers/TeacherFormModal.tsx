'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/api/serverMutation';
import { ImageUploader } from '@/components/common/ImageUploader';

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  presentAddress: string;
  permanentAddress: string;
  mpoIndexNo: string;
  joiningDate: string;
  experience: string;
  interest: string;
  email: string;
  phone: string;
  photoUrl: string;
  orderIndex: number;
  createdAt?: string;
}

export interface TeacherFormInputs {
  name: string;
  designation: string;
  department: string;
  qualification: string;
  presentAddress: string;
  permanentAddress: string;
  mpoIndexNo: string;
  joiningDate: string;
  experience: string;
  interest: string;
  email: string;
  phone: string;
  photoUrl: string;
  orderIndex: number;
}

interface TeacherFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedOrNewTeacher: Teacher, isEdit: boolean) => void;
  teacherToEdit?: Teacher | null;
}

const departments = [
  'Bangla',
  'English',
  'Physics',
  'Chemistry',
  'Mathematics',
  'Economics',
  'Business Studies',
  'ICT & Computer Science',
  'Administration',
  'Political Science',
  'History',
  'Philosophy',
  'Other',
];

// Helper to format date string into YYYY-MM-DD for <input type="date" />
function formatDateForInput(dateStr?: string | null): string {
  if (!dateStr) return '';
  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }
  return '';
}

export const TeacherFormModal: React.FC<TeacherFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  teacherToEdit,
}) => {
  const isEdit = Boolean(teacherToEdit);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TeacherFormInputs>({
    defaultValues: {
      name: '',
      designation: '',
      department: 'Bangla',
      qualification: '',
      presentAddress: '',
      permanentAddress: '',
      mpoIndexNo: '',
      joiningDate: '',
      experience: '',
      interest: '',
      email: '',
      phone: '',
      photoUrl: '',
      orderIndex: 0,
    },
  });

  const photoUrlValue = watch('photoUrl');

  useEffect(() => {
    if (isOpen) {
      if (teacherToEdit) {
        reset({
          name: teacherToEdit.name || '',
          designation: teacherToEdit.designation || '',
          department: teacherToEdit.department || 'Bangla',
          qualification: teacherToEdit.qualification || '',
          presentAddress: teacherToEdit.presentAddress || '',
          permanentAddress: teacherToEdit.permanentAddress || '',
          mpoIndexNo: teacherToEdit.mpoIndexNo || '',
          joiningDate: formatDateForInput(teacherToEdit.joiningDate),
          experience: teacherToEdit.experience || '',
          interest: teacherToEdit.interest || '',
          email: teacherToEdit.email || '',
          phone: teacherToEdit.phone || '',
          photoUrl: teacherToEdit.photoUrl || '',
          orderIndex: teacherToEdit.orderIndex ?? 0,
        });
      } else {
        reset({
          name: '',
          designation: '',
          department: 'Bangla',
          qualification: '',
          presentAddress: '',
          permanentAddress: '',
          mpoIndexNo: '',
          joiningDate: '',
          experience: '',
          interest: '',
          email: '',
          phone: '',
          photoUrl: '',
          orderIndex: 0,
        });
      }
    }
  }, [teacherToEdit, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: TeacherFormInputs) => {
    const toastId = toast.loading(
      isEdit ? 'Updating faculty profile...' : 'Adding faculty member...',
    );

    const payload = {
      name: data.name.trim(),
      designation: data.designation.trim(),
      department: data.department,
      qualification: data.qualification.trim(),
      presentAddress: data.presentAddress.trim(),
      permanentAddress: data.permanentAddress.trim(),
      mpoIndexNo: data.mpoIndexNo.trim(),
      joiningDate: data.joiningDate,
      experience: data.experience.trim(),
      interest: data.interest.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      photoUrl: data.photoUrl.trim(),
      orderIndex: Number(data.orderIndex) || 0,
    };

    try {
      if (isEdit && teacherToEdit) {
        const res = await serverMutation({
          path: `teachers/${teacherToEdit.id}`,
          method: 'PATCH',
          data: payload,
        });

        if (res?.success) {
          toast.success('Faculty profile updated successfully!', { id: toastId });
          onSuccess(res.data, true);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to update teacher', { id: toastId });
        }
      } else {
        const res = await serverMutation({
          path: 'teachers',
          method: 'POST',
          data: payload,
        });

        if (res?.success) {
          toast.success('Faculty member added successfully!', { id: toastId });
          onSuccess(res.data, false);
          onClose();
        } else {
          toast.error(res?.message || 'Failed to add teacher', { id: toastId });
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while saving teacher', {
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
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 bg-secondary/30 px-6 py-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {isEdit ? 'Edit Faculty Profile' : 'Add New Faculty Member'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? 'Update educator qualifications, service info, addresses, or designation'
                : 'Register government BCS cadre educator with complete profile details'}
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-4 max-h-[calc(85vh-80px)] overflow-y-auto"
        >
          {/* Section 1: Basic Identity */}
          <div className="border-b border-border/60 pb-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              1. Basic Identification & Role
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Full name is required' })}
                  placeholder="e.g. Prof. Md. Safiqul Islam"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.name && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Designation <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register('designation', { required: 'Designation is required' })}
                  placeholder="e.g. Associate Professor & Head of Dept."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.designation && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.designation.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Department <span className="text-destructive">*</span>
                </label>
                <select
                  {...register('department', { required: 'Department is required' })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
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

            <div className="mt-4">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Academic Qualifications & BCS Cadre <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register('qualification', {
                  required: 'Academic qualifications are required',
                })}
                placeholder="e.g. B.Sc (Hons), M.Sc in Physics (DU), 14th BCS (General Education)"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.qualification && (
                <span className="text-[11px] text-destructive mt-1 block">
                  {errors.qualification.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 2: Workplace & Service Details */}
          <div className="border-b border-border/60 pb-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              2. Workplace & Institutional Details
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  MPO Index No. <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register('mpoIndexNo', {
                    required: 'MPO Index Number is required',
                  })}
                  placeholder="e.g. N406889"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.mpoIndexNo && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.mpoIndexNo.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Joining Date (Select via Calendar) <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  {...register('joiningDate', {
                    required: 'Joining date is required',
                  })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                />
                {errors.joiningDate && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.joiningDate.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Teaching Experience <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register('experience', {
                    required: 'Teaching experience details are required',
                  })}
                  placeholder="e.g. 24+ Years of Academic Administration & Teaching"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.experience && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.experience.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Academic & Research Interests <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register('interest', {
                    required: 'Academic & research interests are required',
                  })}
                  placeholder="e.g. Quantum Physics, Solid State Physics, Optics"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.interest && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.interest.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Addresses */}
          <div className="border-b border-border/60 pb-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              3. Residential Addresses
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Present Address <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={2}
                  {...register('presentAddress', {
                    required: 'Present address is required',
                  })}
                  placeholder="e.g. College Quarter, Nabiganj Govt. College Campus, Nabiganj, Habiganj"
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.presentAddress && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.presentAddress.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Permanent Address <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={2}
                  {...register('permanentAddress', {
                    required: 'Permanent address is required',
                  })}
                  placeholder="e.g. Vill: Shibpasha, Post: Nabiganj, Upazila: Nabiganj, Dist: Habiganj"
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.permanentAddress && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.permanentAddress.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Contact & Photo */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              4. Contact Info & Profile Photo
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Official Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  placeholder="teacher@ngc.edu.bd"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.email && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Contact Phone Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                  })}
                  placeholder="+880 1711-XXXXXX"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.phone && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <input
                type="hidden"
                {...register('photoUrl', {
                  required: 'Profile photo is required',
                })}
              />
              <ImageUploader
                label="Profile Photo"
                value={photoUrlValue}
                onChange={(url) =>
                  setValue('photoUrl', url, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                required={true}
                error={errors.photoUrl?.message}
                aspectRatio="square"
              />
            </div>
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
              <span>{isEdit ? 'Save Changes' : 'Add Teacher'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
