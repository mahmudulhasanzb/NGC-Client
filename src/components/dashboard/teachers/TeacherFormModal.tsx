'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
import { serverMutation } from '@/lib/api/serverMutation';

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  presentAddress?: string | null;
  permanentAddress?: string | null;
  mpoIndexNo?: string | null;
  joiningDate?: string | null;
  experience?: string | null;
  interest?: string | null;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  orderIndex: number;
  createdAt?: string;
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
  'Other',
];

export const TeacherFormModal: React.FC<TeacherFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  teacherToEdit,
}) => {
  const isEdit = Boolean(teacherToEdit);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    bio: '',
    orderIndex: 0,
  });

  useEffect(() => {
    if (teacherToEdit) {
      setFormData({
        name: teacherToEdit.name || '',
        designation: teacherToEdit.designation || '',
        department: teacherToEdit.department || 'Bangla',
        qualification: teacherToEdit.qualification || '',
        presentAddress: teacherToEdit.presentAddress || '',
        permanentAddress: teacherToEdit.permanentAddress || '',
        mpoIndexNo: teacherToEdit.mpoIndexNo || '',
        joiningDate: teacherToEdit.joiningDate || '',
        experience: teacherToEdit.experience || '',
        interest: teacherToEdit.interest || '',
        email: teacherToEdit.email || '',
        phone: teacherToEdit.phone || '',
        photoUrl: teacherToEdit.photoUrl || '',
        bio: teacherToEdit.bio || '',
        orderIndex: teacherToEdit.orderIndex || 0,
      });
    } else {
      setFormData({
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
        bio: '',
        orderIndex: 0,
      });
    }
  }, [teacherToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Teacher full name is required');
      return;
    }
    if (!formData.designation.trim()) {
      toast.error('Designation is required');
      return;
    }
    if (!formData.qualification.trim()) {
      toast.error('Academic qualifications are required');
      return;
    }

    setLoading(true);
    const toastId = toast.loading(
      isEdit ? 'Updating faculty profile...' : 'Adding faculty member...',
    );

    const payload = {
      name: formData.name.trim(),
      designation: formData.designation.trim(),
      department: formData.department,
      qualification: formData.qualification.trim(),
      presentAddress: formData.presentAddress.trim() || null,
      permanentAddress: formData.permanentAddress.trim() || null,
      mpoIndexNo: formData.mpoIndexNo.trim() || null,
      joiningDate: formData.joiningDate.trim() || null,
      experience: formData.experience.trim() || null,
      interest: formData.interest.trim() || null,
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      photoUrl: formData.photoUrl.trim() || null,
      bio: formData.bio.trim() || null,
      orderIndex: Number(formData.orderIndex) || 0,
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
                ? 'Update educator qualifications, career info, address, or designation'
                : 'Register government BCS cadre professor or lecturer with full profile'}
            </p>
          </div>
          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[calc(85vh-80px)] overflow-y-auto"
        >
          {/* Section 1: Basic Identity */}
          <div className="border-b border-border/60 pb-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              Basic Identification
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Prof. Md. Safiqul Islam"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Designation <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  placeholder="e.g. Associate Professor & Head of Dept."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Department <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
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
                  Display Order Index <span className="text-muted-foreground font-normal">(Lower displays first)</span>
                </label>
                <input
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      orderIndex: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="1"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Academic Qualifications & BCS Cadre <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) =>
                  setFormData({ ...formData, qualification: e.target.value })
                }
                placeholder="e.g. B.Sc (Hons), M.Sc (DU), BCS (General Education)"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Section 2: Workplace & Institutional Details */}
          <div className="border-b border-border/60 pb-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              Workplace & Service Details
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  MPO Index No.
                </label>
                <input
                  type="text"
                  value={formData.mpoIndexNo}
                  onChange={(e) =>
                    setFormData({ ...formData, mpoIndexNo: e.target.value })
                  }
                  placeholder="e.g. N406889"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Joining Date
                </label>
                <input
                  type="text"
                  value={formData.joiningDate}
                  onChange={(e) =>
                    setFormData({ ...formData, joiningDate: e.target.value })
                  }
                  placeholder="e.g. 30 Jul, 1994"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Teaching Experience
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  placeholder="e.g. 24 Years of Academic Leadership & Teaching"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Academic & Research Interests
                </label>
                <input
                  type="text"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  placeholder="e.g. Quantum Mechanics, Solid State Physics, Optics"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Addresses */}
          <div className="border-b border-border/60 pb-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              Residential Addresses
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Present Address
                </label>
                <textarea
                  rows={2}
                  value={formData.presentAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, presentAddress: e.target.value })
                  }
                  placeholder="e.g. College Quarter, Nabiganj Govt. College, Habiganj"
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Permanent Address
                </label>
                <textarea
                  rows={2}
                  value={formData.permanentAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, permanentAddress: e.target.value })
                  }
                  placeholder="e.g. Vill: Shibpasha, Post: Nabiganj, Dist: Habiganj"
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Contact & Photo */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-primary mb-3">
              Contact & Profile Media
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Official Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="teacher@ngc.edu.bd"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+880 1711-XXXXXX"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Profile Photo URL
              </label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={formData.photoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, photoUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {formData.photoUrl && (
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
                    <img
                      src={formData.photoUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Biography / Brief Overview
              </label>
              <textarea
                rows={2}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Brief summary of teaching philosophy, research publications..."
                className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
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
              <span>{isEdit ? 'Save Changes' : 'Add Teacher'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
