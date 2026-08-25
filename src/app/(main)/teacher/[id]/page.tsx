'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Compass,
  Calendar,
  Briefcase,
  Fingerprint,
  Lightbulb,
  Phone,
  Mail,
  Award,
  BookOpen,
} from 'lucide-react';

interface TeacherDetail {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo?: string;
  qualification: string;
  presentAddress: string;
  permanentAddress: string;
  mpoIndexNo: string;
  joiningDate: string;
  experience: string;
  interest: string;
  phone: string;
  email: string;
}

const teachersDetailedList: Record<string, TeacherDetail> = {
  '1': {
    id: '1',
    name: 'Prof. Md. Abdur Rahman',
    designation: 'Principal & Professor',
    department: 'Administration',
    photo:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.Sc (Hons), M.Sc (Physics, DU), BCS (General Education)',
    presentAddress: 'College Quarter, Nabiganj Govt. College Campus, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Shibpasha, Post: Nabiganj, Upazila: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N406889',
    joiningDate: '30 Jul, 1994',
    experience: '30+ Years of Academic Administration & Teaching',
    interest: 'Quantum Physics, Educational Leadership, Academic Policy',
    phone: '01777262980',
    email: 'principal@ngc.edu.bd',
  },
  '2': {
    id: '2',
    name: 'Dr. Shahinur Alam',
    designation: 'Associate Professor & Vice Principal',
    department: 'English',
    photo:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.A. (Hons), M.A., Ph.D. in English Literature (CU), BCS (Gen. Edu)',
    presentAddress: 'Teacher Residential Area, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Gujakhail, Post: Goplarbazar, Nabiganj, Habiganj',
    mpoIndexNo: 'N512304',
    joiningDate: '15 Mar, 2001',
    experience: '24 Years of Teaching & Literary Research',
    interest: 'Romantic Poetry, Post-colonial Literature, Applied Linguistics',
    phone: '01712345678',
    email: 'shahinur@ngc.edu.bd',
  },
  '3': {
    id: '3',
    name: 'Mohammad Nazmul Huda',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    photo:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.Sc (Hons), M.Sc in Applied Mathematics (SUST), BCS (Gen. Edu)',
    presentAddress: 'Main Road, Nabiganj Sadar, Habiganj',
    permanentAddress: 'Vill: Kargaon, Post: Nabiganj, Upazila: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N628491',
    joiningDate: '12 Sep, 2008',
    experience: '17 Years in Higher Secondary & Undergraduate Mathematics',
    interest: 'Differential Calculus, Complex Analysis, Mathematical Modeling',
    phone: '01819283746',
    email: 'nazmul.math@ngc.edu.bd',
  },
  '4': {
    id: '4',
    name: 'Begum Farhana Yasmin',
    designation: 'Assistant Professor',
    department: 'Physics',
    photo:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.Sc (Hons), M.Sc in Physics (DU), BCS (Gen. Edu)',
    presentAddress: 'College Staff Quarter, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Bausi, Post: Nabiganj, Upazila: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N674201',
    joiningDate: '01 Jun, 2011',
    experience: '14 Years in Classical & Modern Physics Instruction',
    interest: 'Optics, Solid State Physics, Practical Laboratory Instruction',
    phone: '01918273645',
    email: 'farhana.phy@ngc.edu.bd',
  },
  '5': {
    id: '5',
    name: 'Tanvir Ahmed Chowdhury',
    designation: 'Lecturer',
    department: 'Chemistry',
    photo:
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.Sc (Hons), M.Sc in Organic Chemistry (DU), BCS (Gen. Edu)',
    presentAddress: 'Hospital Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Shibpasha, Post: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N789230',
    joiningDate: '18 Nov, 2017',
    experience: '8 Years of Chemistry Teaching & Research',
    interest: 'Organic Synthesis, Environmental Chemistry, Laboratory Methods',
    phone: '01711223344',
    email: 'tanvir.chem@ngc.edu.bd',
  },
  '6': {
    id: '6',
    name: 'Syeda Nusrat Jahan',
    designation: 'Lecturer',
    department: 'Biology',
    photo:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.Sc (Hons), M.Sc in Botany (RU), BCS (Gen. Edu)',
    presentAddress: 'College Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Dinarpur, Post: Goplarbazar, Nabiganj, Habiganj',
    mpoIndexNo: 'N812340',
    joiningDate: '04 Jan, 2019',
    experience: '6 Years in Biology & Plant Physiology',
    interest: 'Plant Taxonomy, Genetics & Biotechnology, Microbiology',
    phone: '01611223344',
    email: 'nusrat.bio@ngc.edu.bd',
  },
  '7': {
    id: '7',
    name: 'Kazi Mahbubul Hasan',
    designation: 'Lecturer',
    department: 'Economics',
    photo:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.S.S (Hons), M.S.S in Economics (DU), BCS (Gen. Edu)',
    presentAddress: 'Sadar Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Inathganj, Post: Inathganj, Nabiganj, Habiganj',
    mpoIndexNo: 'N845621',
    joiningDate: '10 Feb, 2020',
    experience: '5 Years of Economics Instruction',
    interest: 'Macroeconomics, Bangladesh Economy, Development Studies',
    phone: '01511223344',
    email: 'mahbub.eco@ngc.edu.bd',
  },
  '8': {
    id: '8',
    name: 'Farzana Akter Khan',
    designation: 'Lecturer',
    department: 'Accounting',
    photo:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.B.A (Hons), M.B.A in AIS (DU), BCS (Gen. Edu)',
    presentAddress: 'Station Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Shibpasha, Post: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N890123',
    joiningDate: '15 Aug, 2021',
    experience: '4 Years in Financial & Management Accounting',
    interest: 'Auditing, Corporate Taxation, International Accounting Standards',
    phone: '01799887766',
    email: 'farzana.acc@ngc.edu.bd',
  },
  '9': {
    id: '9',
    name: 'Md. Tariqul Islam',
    designation: 'Lecturer',
    department: 'ICT & Computer',
    photo:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.Sc in CSE (SUST), BCS (Gen. Edu)',
    presentAddress: 'Teacher Quarter, Nabiganj Govt. College, Habiganj',
    permanentAddress: 'Vill: Auskandi, Post: Auskandi, Nabiganj, Habiganj',
    mpoIndexNo: 'N901245',
    joiningDate: '01 Mar, 2022',
    experience: '3+ Years in ICT & Programming Education',
    interest: 'Algorithms, Web Development, Database Management Systems',
    phone: '01822334455',
    email: 'tariqul.ict@ngc.edu.bd',
  },
  '10': {
    id: '10',
    name: 'Mahmuda Khatun',
    designation: 'Lecturer',
    department: 'Bangla',
    photo:
      'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.A. (Hons), M.A. in Bangla Literature (JU), BCS (Gen. Edu)',
    presentAddress: 'College Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Bausi, Post: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N913456',
    joiningDate: '12 Jul, 2022',
    experience: '3+ Years in Bangla Literature & Linguistics',
    interest: 'Modern Bengali Poetry, Folklore Studies, Cultural History',
    phone: '01933445566',
    email: 'mahmuda.ban@ngc.edu.bd',
  },
  '11': {
    id: '11',
    name: 'Golam Mostafa',
    designation: 'Lecturer',
    department: 'Political Science',
    photo:
      'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.S.S (Hons), M.S.S in Political Science (DU), BCS (Gen. Edu)',
    presentAddress: 'Main Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Shibpasha, Post: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N924567',
    joiningDate: '01 Nov, 2022',
    experience: '3 Years in Governance & Political Thought',
    interest: 'Constitutional Law, Public Administration, South Asian Politics',
    phone: '01744556677',
    email: 'mostafa.ps@ngc.edu.bd',
  },
  '12': {
    id: '12',
    name: 'Ahsan Habib',
    designation: 'Lecturer',
    department: 'Management',
    photo:
      'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    qualification: 'B.B.A (Hons), M.B.A in Management Studies (RU), BCS (Gen. Edu)',
    presentAddress: 'Bazar Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Inathganj, Post: Inathganj, Nabiganj, Habiganj',
    mpoIndexNo: 'N935678',
    joiningDate: '15 Jan, 2023',
    experience: '2+ Years in Strategic & Human Resource Management',
    interest: 'Organizational Behavior, Human Resource Development, Leadership',
    phone: '01855667788',
    email: 'ahsan.mgt@ngc.edu.bd',
  },
};

const TeacherDetailsPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || '';
  const teacher = teachersDetailedList[id];

  if (!teacher) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Teacher Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested faculty member profile could not be found.
        </p>
        <Link
          href="/teachers"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Teachers</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Teachers</span>
          </Link>
        </div>

        {/* 2-Column Main Layout: Left Teacher Card + Right Details */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left Column: Teacher Card (Sticky on desktop) */}
          <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
              {/* Photo */}
              <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-xl border border-border bg-secondary">
                {teacher.photo ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <GraduationCap className="h-16 w-16" />
                  </div>
                )}
              </div>

              {/* Tag / Department */}
              <div className="mb-2">
                <span className="inline-block rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {teacher.department}
                </span>
              </div>

              {/* Name & Designation */}
              <h1 className="font-serif text-xl font-bold leading-snug text-foreground sm:text-2xl">
                {teacher.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-primary">
                {teacher.designation}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Nabiganj Government College
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-2.5 border-t border-border/70 pt-5">
                {teacher.phone && (
                  <a
                    href={`tel:${teacher.phone}`}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Directly</span>
                  </a>
                )}
                {teacher.email && (
                  <a
                    href={`mailto:${teacher.email}`}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Structured Info Sections */}
          <div className="flex-1 space-y-6">
            {/* 2-Column Side-by-Side: Personal Info & Workplace Info */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Section 1: Personal Info */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-7">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Personal Info
                </h2>

                <div className="mt-6 space-y-6">
                  {/* Qualification */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Qualification
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {teacher.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Present Address */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Present Address
                      </span>
                      <p className="mt-0.5 text-sm font-semibold uppercase leading-relaxed text-foreground">
                        {teacher.presentAddress}
                      </p>
                    </div>
                  </div>

                  {/* Permanent Address */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Permanent Address
                      </span>
                      <p className="mt-0.5 text-sm font-semibold uppercase leading-relaxed text-foreground">
                        {teacher.permanentAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Workplace Info */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-7">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Workplace Info
                </h2>

                <div className="mt-6 space-y-6">
                  {/* MPO Index no. */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Fingerprint className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        MPO Index no.
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {teacher.mpoIndexNo}
                      </p>
                    </div>
                  </div>

                  {/* Joining Date */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Joining Date
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {teacher.joiningDate}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Experience
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {teacher.experience}
                      </p>
                    </div>
                  </div>

                  {/* Interest */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Interest
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {teacher.interest}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Contact Info */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-7">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Contact Info
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {/* Contact No */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Contact No.:
                    </span>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      <a
                        href={`tel:${teacher.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {teacher.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Email :
                    </span>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      <a
                        href={`mailto:${teacher.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {teacher.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsPage;
