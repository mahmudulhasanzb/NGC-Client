import React from 'react';
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
} from 'lucide-react';
import { serverFetch } from '@/lib/api/serverFetch';
import { formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
          The requested faculty member profile could not be found.
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
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={teacher.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
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

              {/* Action Buttons */}
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
                      <p className="mt-0.5 text-sm font-semibold text-foreground leading-relaxed">
                        {teacher.qualification || 'Not provided'}
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
                        {teacher.presentAddress || 'Nabiganj, Habiganj, Sylhet'}
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
                        {teacher.permanentAddress || 'Nabiganj, Habiganj, Sylhet'}
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
                        {teacher.mpoIndexNo || 'N/A'}
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
                        {teacher.joiningDate
                          ? formatDate(teacher.joiningDate)
                          : 'Regular BCS Batch'}
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
                        {teacher.experience || `${teacher.designation} at NGC`}
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
                        {teacher.interest || 'Academic Teaching & Research'}
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
                      {teacher.phone ? (
                        <a
                          href={`tel:${teacher.phone}`}
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          {teacher.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Not provided</span>
                      )}
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
                      {teacher.email ? (
                        <a
                          href={`mailto:${teacher.email}`}
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          {teacher.email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Not provided</span>
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
