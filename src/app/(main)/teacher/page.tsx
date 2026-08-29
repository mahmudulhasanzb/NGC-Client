import React from 'react';
import TeacherCard, { Teacher } from '@/components/teacher/TeacherCard';
import { serverFetch } from '@/lib/api/serverFetch';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const AllTeachersPage = async () => {
  const teachersRes = await serverFetch({ path: 'teachers' });
  const teachersList: Teacher[] = teachersRes?.data || [];

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 border-b border-border/70 pb-6">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Teachers
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Meet the faculty members and educators of Nabiganj Government College
          </p>
        </div>

        {/* Teachers Grid */}
        {teachersList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {teachersList.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            <p className="font-serif text-base font-semibold">No faculty members currently listed.</p>
            <p className="text-xs mt-1">Please check back soon or contact the college administration office.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTeachersPage;
