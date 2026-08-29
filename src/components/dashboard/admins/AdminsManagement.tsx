'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  ShieldCheck,
  UserCheck,
  UserX,
  Mail,
  Edit2,
  Trash2,
  Calendar,
  Lock,
} from 'lucide-react';
import { AdminUser, AdminFormModal } from './AdminFormModal';
import { DeleteAdminModal } from './DeleteAdminModal';
import { formatDate } from '@/lib/format';

interface AdminsManagementProps {
  initialAdmins: AdminUser[];
}

export const AdminsManagement: React.FC<AdminsManagementProps> = ({
  initialAdmins,
}) => {
  const router = useRouter();
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins || []);

  useEffect(() => {
    if (initialAdmins) {
      setAdmins(initialAdmins);
    }
  }, [initialAdmins]);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState<AdminUser | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);

  // Handlers
  const handleOpenCreate = () => {
    setAdminToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (admin: AdminUser) => {
    setAdminToEdit(admin);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (admin: AdminUser) => {
    setAdminToDelete(admin);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = (savedAdmin: AdminUser, isEdit: boolean) => {
    if (isEdit) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === savedAdmin.id ? savedAdmin : a)),
      );
    } else {
      setAdmins((prev) => [savedAdmin, ...prev]);
    }
    router.refresh();
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== deletedId));
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Administrative Security & Access</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Internal Administrators Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage authenticated staff members and grant administrative credentials to Nabiganj Government College portal.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Administrator</span>
        </button>
      </div>

      {/* Admins Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Official Email</th>
                <th className="py-3 px-4">Role Permission</th>
                <th className="py-3 px-4">Access Status</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-secondary/20 transition-colors"
                  >
                    {/* Name & Avatar */}
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs">
                          {admin.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-serif text-foreground font-bold">
                            {admin.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-normal">
                            ID: {admin.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{admin.email}</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[11px] font-bold ${
                          admin.role === 'SUPER_ADMIN'
                            ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                            : 'bg-primary/10 text-primary border border-primary/20'
                        }`}
                      >
                        <Lock className="h-3 w-3" />
                        {admin.role}
                      </span>
                    </td>

                    {/* Active Status */}
                    <td className="py-3.5 px-4">
                      {admin.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 border border-emerald-500/20">
                          <UserCheck className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-600 border border-rose-500/20">
                          <UserX className="h-3 w-3" /> Suspended
                        </span>
                      )}
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          {admin.createdAt
                            ? formatDate(admin.createdAt)
                            : 'System Initial'}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(admin)}
                          title="Edit Administrator"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenDelete(admin)}
                          title="Revoke Administrator"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                    <p className="font-serif text-sm font-semibold">No administrators registered</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/70 bg-secondary/20 px-5 py-3 text-xs text-muted-foreground">
          <span>Total Administrators: {admins.length}</span>
          <span className="font-semibold text-primary">Internal Secure Accounts</span>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <AdminFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        adminToEdit={adminToEdit}
      />

      {/* Delete Modal */}
      <DeleteAdminModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
        admin={adminToDelete}
      />
    </div>
  );
};
