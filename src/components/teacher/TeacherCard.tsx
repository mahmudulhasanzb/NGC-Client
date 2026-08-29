import React from 'react';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo?: string | null;
  photoUrl?: string | null;
}

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const imageSrc = teacher.photoUrl || teacher.photo;

  return (
    <Link
      href={`/teacher/${teacher.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md cursor-pointer"
    >
      {/* Teacher Photo */}
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-secondary">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={teacher.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/60">
            <GraduationCap className="h-10 w-10" />
          </div>
        )}
      </div>

      {/* Tag / Department Badge */}
      <div className="mb-1.5 flex items-center">
        <span className="inline-block rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary sm:text-[11px]">
          {teacher.department}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-serif text-sm font-bold leading-snug text-foreground sm:text-base">
        {teacher.name}
      </h3>

      {/* Position */}
      <p className="mt-0.5 text-xs text-muted-foreground">
        {teacher.designation}
      </p>
    </Link>
  );
};

export default TeacherCard;
