import React from 'react';
import TeacherCard, { Teacher } from '@/components/teacher/TeacherCard';

const teachersList: Teacher[] = [
  {
    id: '1',
    name: 'Prof. Md. Abdur Rahman',
    designation: 'Principal & Professor',
    department: 'Administration',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '2',
    name: 'Dr. Shahinur Alam',
    designation: 'Associate Professor & Vice Principal',
    department: 'English',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '3',
    name: 'Mohammad Nazmul Huda',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '4',
    name: 'Begum Farhana Yasmin',
    designation: 'Assistant Professor',
    department: 'Physics',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '5',
    name: 'Tanvir Ahmed Chowdhury',
    designation: 'Lecturer',
    department: 'Chemistry',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '6',
    name: 'Syeda Nusrat Jahan',
    designation: 'Lecturer',
    department: 'Biology',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '7',
    name: 'Kazi Mahbubul Hasan',
    designation: 'Lecturer',
    department: 'Economics',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '8',
    name: 'Farzana Akter Khan',
    designation: 'Lecturer',
    department: 'Accounting',
    photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '9',
    name: 'Md. Tariqul Islam',
    designation: 'Lecturer',
    department: 'ICT & Computer',
    photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '10',
    name: 'Mahmuda Khatun',
    designation: 'Lecturer',
    department: 'Bangla',
    photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '11',
    name: 'Golam Mostafa',
    designation: 'Lecturer',
    department: 'Political Science',
    photo: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
  {
    id: '12',
    name: 'Ahsan Habib',
    designation: 'Lecturer',
    department: 'Management',
    photo: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
  },
];

const AllTeachersPage = () => {
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
