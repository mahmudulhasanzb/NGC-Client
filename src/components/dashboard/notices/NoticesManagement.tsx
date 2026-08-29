'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  FileText,
  Paperclip,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Notice, NoticeFormModal } from './NoticeFormModal';
import { DeleteNoticeModal } from './DeleteNoticeModal';
import { serverMutation } from '@/lib/api/serverMutation';

interface NoticesManagementProps {
  initialNotices: Notice[];
}

const categoryPills = [
  { value: 'ALL', label: 'All Notices' },
  { value: 'ADMISSION', label: 'Admission' },
  { value: 'EXAM', label: 'Examinations' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'EVENT', label: 'Events' },
  { value: 'GENERAL', label: 'General' },
];

const categoryBadgeStyles: Record<string, string> = {
  ADMISSION: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  EXAM: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  ACADEMIC: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  EVENT: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  GENERAL: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
};

export const NoticesManagement: React.FC<NoticesManagementProps> = ({
  initialNotices,
}) => {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>(initialNotices || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    if (initialNotices) {
      setNotices(initialNotices);
    }
  }, [initialNotices]);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState<Notice | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);

  // Filter notices
  const filteredNotices = useMemo(() => {
    return notices.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [notices, selectedCategory, searchQuery]);

  // Handlers
  const handleOpenCreate = () => {
    setNoticeToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (notice: Notice) => {
    setNoticeToEdit(notice);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (notice: Notice) => {
    setNoticeToDelete(notice);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = (savedNotice: Notice, isEdit: boolean) => {
    if (isEdit) {
      setNotices((prev) =>
        prev.map((n) => (n.id === savedNotice.id ? savedNotice : n)),
      );
    } else {
      setNotices((prev) => [savedNotice, ...prev]);
    }
    router.refresh();
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== deletedId));
    router.refresh();
  };

  // Toggle Featured status inline
  const handleToggleFeatured = async (notice: Notice) => {
    const newStatus = !notice.isFeatured;
    const toastId = toast.loading(
      newStatus ? 'Marking as featured...' : 'Unmarking featured...',
    );

    try {
      const res = await serverMutation({
        path: `notices/${notice.id}`,
        method: 'PATCH',
        data: { isFeatured: newStatus },
      });

      if (res?.success) {
        toast.success(
          newStatus ? 'Notice marked as featured!' : 'Notice unfeatured',
          { id: toastId },
        );
        setNotices((prev) =>
          prev.map((n) => (n.id === notice.id ? { ...n, isFeatured: newStatus } : n)),
        );
      } else {
        toast.error('Failed to update status', { id: toastId });
      }
    } catch {
      toast.error('Failed to update status', { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <FileText className="h-3.5 w-3.5" />
            <span>Circulars & Bulletins</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Manage College Notices
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create, update, and manage official notices for students and faculty.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices by title or content..."
            className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categoryPills.map((pill) => {
            const active = selectedCategory === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => setSelectedCategory(pill.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-2xs'
                    : 'bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notices Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => {
                  const badgeClass =
                    categoryBadgeStyles[notice.category] ||
                    categoryBadgeStyles.GENERAL;

                  const dateStr = new Date(
                    notice.publishedAt || notice.createdAt,
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <tr
                      key={notice.id}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      {/* Title & Attachment */}
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-serif font-bold text-foreground line-clamp-1">
                          {notice.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                          <span className="font-mono truncate max-w-[200px]">
                            /{notice.slug}
                          </span>
                          {notice.attachment && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                              <Paperclip className="h-2.5 w-2.5" />
                              <span>Attachment</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-bold ${badgeClass}`}
                        >
                          {notice.category}
                        </span>
                      </td>

                      {/* Featured Star Toggle */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(notice)}
                          title={
                            notice.isFeatured
                              ? 'Click to unfeature'
                              : 'Click to mark as featured'
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              notice.isFeatured
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-muted-foreground/40 hover:text-amber-500'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Published Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{dateStr}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href={`/notice/${notice.slug}`}
                            target="_blank"
                            title="View on public site"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(notice)}
                            title="Edit Notice"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenDelete(notice)}
                            title="Delete Notice"
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
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                    <p className="font-serif text-sm font-semibold">No notices found</p>
                    <p className="text-xs mt-0.5">
                      Try searching with different keywords or publish a new notice.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between border-t border-border/70 bg-secondary/20 px-5 py-3 text-xs text-muted-foreground">
          <span>Showing {filteredNotices.length} of {notices.length} total circulars</span>
          <span className="font-semibold text-primary">Live Database Records</span>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <NoticeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        noticeToEdit={noticeToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteNoticeModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
        notice={noticeToDelete}
      />
    </div>
  );
};
