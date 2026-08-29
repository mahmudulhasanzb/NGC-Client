'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Award,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Trophy,
  Sparkles,
  Edit2,
  Trash2,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { CollegeStat, StatFormModal } from './StatFormModal';
import { DeleteStatModal } from './DeleteStatModal';

interface StatsManagementProps {
  initialStats: CollegeStat[];
}

const iconMap: Record<string, any> = {
  Users,
  GraduationCap,
  Award,
  Building2,
  BookOpen,
  Trophy,
  Sparkles,
};

export const StatsManagement: React.FC<StatsManagementProps> = ({
  initialStats,
}) => {
  const router = useRouter();
  const [stats, setStats] = useState<CollegeStat[]>(initialStats || []);

  useEffect(() => {
    if (initialStats) {
      setStats(initialStats);
    }
  }, [initialStats]);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statToEdit, setStatToEdit] = useState<CollegeStat | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [statToDelete, setStatToDelete] = useState<CollegeStat | null>(null);

  // Handlers
  const handleOpenCreate = () => {
    setStatToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (stat: CollegeStat) => {
    setStatToEdit(stat);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (stat: CollegeStat) => {
    setStatToDelete(stat);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = (savedStat: CollegeStat, isEdit: boolean) => {
    if (isEdit) {
      setStats((prev) =>
        prev.map((s) => (s.id === savedStat.id ? savedStat : s)),
      );
    } else {
      setStats((prev) => [...prev, savedStat]);
    }
    router.refresh();
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setStats((prev) => prev.filter((s) => s.id !== deletedId));
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <Activity className="h-3.5 w-3.5" />
            <span>Institutional Milestones & Counters</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            College Statistics Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage live numerical metrics and figures showcased on the homepage of Nabiganj Government College.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View on Homepage</span>
          </Link>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Counter</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      {stats.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const IconComp =
              (stat.icon && iconMap[stat.icon]) || iconMap.Award || Award;

            return (
              <div
                key={stat.id || `stat-${idx}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                {/* Header with Icon and Actions */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary shadow-xs">
                      <IconComp className="h-5 w-5" />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(stat)}
                        title="Edit Metric"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenDelete(stat)}
                        title="Delete Metric"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Figure & Label */}
                  <div className="font-serif text-3xl font-extrabold text-foreground tracking-tight">
                    {stat.value}
                  </div>
                  <h3 className="mt-1 font-serif text-sm font-bold text-foreground">
                    {stat.label}
                  </h3>
                </div>

                {/* Subtitle / Description & Order Index */}
                <div className="mt-4 border-t border-border/60 pt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="line-clamp-1 flex-1 pr-2">
                    {stat.description || 'Institutional metric'}
                  </span>
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold text-primary shrink-0">
                    Order #{stat.orderIndex}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground bg-card">
          <Activity className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <h3 className="font-serif text-base font-bold text-foreground">No milestone statistics found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            Add key figures such as enrolled students, faculty count, and pass rates.
          </p>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add First Counter</span>
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <StatFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        statToEdit={statToEdit}
      />

      {/* Delete Modal */}
      <DeleteStatModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
        stat={statToDelete}
      />
    </div>
  );
};
