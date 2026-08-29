'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  GraduationCap,
  Mail,
  Phone,
  Edit2,
  Trash2,
  ExternalLink,
  User,
  Building,
  Award,
} from 'lucide-react';
import { Teacher, TeacherFormModal } from './TeacherFormModal';
import { DeleteTeacherModal } from './DeleteTeacherModal';

interface TeachersManagementProps {
  initialTeachers: Teacher[];
}

const departmentFilterList = [
  'ALL',
  'Administration',
  'Bangla',
  'English',
  'Physics',
  'Chemistry',
  'Mathematics',
  'Economics',
  'Business Studies',
  'ICT & Computer Science',
];

const departmentColors: Record<string, string> = {
  Bangla: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  English: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Physics: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Chemistry: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Mathematics: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
  Economics: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
  'Business Studies': 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  'ICT & Computer Science': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  Administration: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
};

export const TeachersManagement: React.FC<TeachersManagementProps> = ({
  initialTeachers,
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<Teacher | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  // Filter teachers
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesDept = selectedDept === 'ALL' || t.department === selectedDept;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q) ||
        t.qualification.toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [teachers, selectedDept, searchQuery]);

  // Handlers
  const handleOpenCreate = () => {
    setTeacherToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setTeacherToEdit(teacher);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (teacher: Teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = (savedTeacher: Teacher, isEdit: boolean) => {
    if (isEdit) {
      setTeachers((prev) =>
        prev.map((t) => (t.id === savedTeacher.id ? savedTeacher : t)),
      );
    } else {
      setTeachers((prev) => [savedTeacher, ...prev]);
    }
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== deletedId));
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Academic Faculty & Staff</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Faculty Directory Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage BCS cadre professors, department heads, and faculty profiles for Nabiganj Government College.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Search & Department Filter Toolbar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-2xs">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by faculty name, designation, or department..."
            className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Department Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/60">
          {departmentFilterList.map((dept) => {
            const active = selectedDept === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-2xs'
                    : 'bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>
      </div>

      {/* Teachers Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Qualifications & BCS</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => {
                  const deptColor =
                    departmentColors[teacher.department] ||
                    'bg-slate-500/10 text-slate-600 border-slate-500/20';

                  return (
                    <tr
                      key={teacher.id}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      {/* Avatar & Name & Designation */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary flex items-center justify-center font-bold text-xs text-primary">
                            {teacher.photoUrl ? (
                              <img
                                src={teacher.photoUrl}
                                alt={teacher.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              teacher.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-serif font-bold text-foreground truncate">
                              {teacher.name}
                            </div>
                            <div className="text-[11px] text-muted-foreground truncate">
                              {teacher.designation}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-bold ${deptColor}`}
                        >
                          {teacher.department}
                        </span>
                      </td>

                      {/* Qualifications */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="text-[11px] text-foreground font-medium line-clamp-2">
                          {teacher.qualification}
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-muted-foreground text-[11px]">
                        <div className="space-y-0.5">
                          {teacher.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                              <span className="truncate max-w-[150px]">
                                {teacher.email}
                              </span>
                            </div>
                          )}
                          {teacher.phone && (
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                              <span>{teacher.phone}</span>
                            </div>
                          )}
                          {!teacher.email && !teacher.phone && (
                            <span className="text-muted-foreground/60 italic">
                              Not provided
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href="/teacher"
                            target="_blank"
                            title="View on public directory"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(teacher)}
                            title="Edit Faculty"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenDelete(teacher)}
                            title="Delete Faculty"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <GraduationCap className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                    <p className="font-serif text-sm font-semibold">No faculty members found</p>
                    <p className="text-xs mt-0.5">
                      Try selecting a different department or register a new teacher.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between border-t border-border/70 bg-secondary/20 px-5 py-3 text-xs text-muted-foreground">
          <span>Showing {filteredTeachers.length} of {teachers.length} total faculty members</span>
          <span className="font-semibold text-primary">Live Database Records</span>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <TeacherFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        teacherToEdit={teacherToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteTeacherModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
        teacher={teacherToDelete}
      />
    </div>
  );
};
