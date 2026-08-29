import React from 'react';
import TeacherCard, { Teacher } from '@/components/teacher/TeacherCard';
import { serverFetch } from '@/lib/api/serverFetch';

export const revalidate = 60;

const fallbackTeachersList: Teacher[] = [
  {
    id: '1',
    name: 'Prof. Md. Safiqul Islam',
    designation: 'Principal & Professor',
    department: 'Administration',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: '2',
    name: 'Nazmun Nahar',
    designation: 'Associate Professor & Vice Principal',
    department: 'Bangla',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: '3',
    name: 'Mohammad Kabir Hossain',
    designation: 'Assistant Professor',
    department: 'English',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: '4',
    name: 'Begum Farhana Yasmin',
    designation: 'Assistant Professor',
    department: 'Physics',
    photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: '5',
    name: 'Md. Tariqul Islam',
    designation: 'Lecturer',
    department: 'Chemistry',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: '6',
    name: 'Abu Sayed Chowdhury',
    designation: 'Lecturer',
    department: 'Mathematics',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: '7',
    name: 'Md. Enamul Haque',
    designation: 'Lecturer',
    department: 'Economics',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: '8',
    name: 'Tanjim Ahmed',
    designation: 'Lecturer',
    department: 'ICT & Computer',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&h=600&q=80',
  },
];

const AllTeachersPage = async () => {
  const teachersRes = await serverFetch({ path: 'teachers' });
  const teachersList: Teacher[] =
    teachersRes?.data && teachersRes.data.length > 0
      ? teachersRes.data
      : fallbackTeachersList;

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Simple Page Header */}
        <div className="mb-8 border-b border-border/70 pb-6">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Teachers
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Meet the faculty members and educators of Nabiganj Government College
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {teachersList.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTeachersPage;
