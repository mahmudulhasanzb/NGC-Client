import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Calendar,
  Briefcase,
  Phone,
  Mail,
  Award,
  BookOpen,
} from 'lucide-react';
import { serverFetch } from '@/lib/api/serverFetch';

export const revalidate = 60;

interface TeacherDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TeacherDetailsPage({
  params,
}: TeacherDetailPageProps) {
  const { id } = await params;
  const res = await serverFetch({ path: `teachers/${id}` });
  const teacher = res?.data;

  if (!teacher) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Teacher Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested faculty member profile could not be found or has been moved.
        </p>
        <Link
          href="/teacher"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Teachers</span>
        </Link>
      </div>
    );
  }

  const imageSrc = teacher.photoUrl || teacher.photo;

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Teachers</span>
          </Link>
        </div>

        {/* 2-Column Main Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left Column: Teacher Sticky Card */}
          <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
              {/* Photo */}
              <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-xl border border-border bg-secondary">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={teacher.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/60">
                    <GraduationCap className="h-16 w-16 text-primary/40" />
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

              {/* Direct Actions */}
              <div className="mt-6 flex flex-col gap-2.5 border-t border-border/70 pt-5">
                {teacher.phone && (
                  <a
                    href={`tel:${teacher.phone}`}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Directly</span>
                  </a>
                )}
                {teacher.email && (
                  <a
                    href={`mailto:${teacher.email}`}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary cursor-pointer"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Structured Info */}
          <div className="flex-1 space-y-6">
            {/* Academic Credentials & Department Info */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Section 1: Academic & Professional Details */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-7">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Academic Credentials
                </h2>

                <div className="mt-6 space-y-6">
                  {/* Qualification */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Degree & BCS Cadre
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground leading-relaxed">
                        {teacher.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Department & Faculty
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {teacher.department}
                      </p>
                    </div>
                  </div>

                  {/* Institution */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Institution
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        Nabiganj Govt. College, Habiganj, Sylhet
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Institutional & Experience Info */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-7">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Faculty Overview
                </h2>

                <div className="mt-6 space-y-6">
                  {/* Designation */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Designation
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {teacher.designation}
                      </p>
                    </div>
                  </div>

                  {/* Biography / Research Notes */}
                  {teacher.bio ? (
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">
                          Biography & Research
                        </span>
                        <p className="mt-0.5 text-sm leading-relaxed text-foreground">
                          {teacher.bio}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">
                          Status
                        </span>
                        <p className="mt-0.5 text-sm font-semibold text-foreground">
                          Active Government BCS Cadre Faculty
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Contact Info */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-7">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Official Contact Information
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {/* Contact Phone */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Phone Number:
                    </span>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {teacher.phone ? (
                        <a
                          href={`tel:${teacher.phone}`}
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          {teacher.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/70 italic">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Official Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Email Address:
                    </span>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {teacher.email ? (
                        <a
                          href={`mailto:${teacher.email}`}
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          {teacher.email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/70 italic">Not provided</span>
                      )}
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
}
