import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  CheckCircle2,
  FileText,
  Calendar,
  CreditCard,
  HelpCircle,
  ExternalLink,
  Phone,
  Mail,
  AlertCircle,
  Download,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions 2026–2027 | Nabiganj Govt. College',
  description:
    'Official admission guidelines, eligibility criteria, program quotas, fee structure, and application instructions for Nabiganj Government College.',
};

const hscPrograms = [
  {
    group: 'Science',
    duration: '2 Years',
    seats: 150,
    minGpa: '3.75',
    eligibility: 'SSC with Science background, min GPA 3.0 in Higher Math & Biology.',
    subjects: 'Physics, Chemistry, Higher Math / Biology, ICT, Bangla, English',
    badge: 'High Demand',
  },
  {
    group: 'Business Studies',
    duration: '2 Years',
    seats: 200,
    minGpa: '2.75',
    eligibility: 'SSC from any discipline (Science, Business, or Humanities).',
    subjects: 'Accounting, Business Org., Finance / Marketing, ICT, Bangla, English',
    badge: 'Popular',
  },
  {
    group: 'Humanities',
    duration: '2 Years',
    seats: 250,
    minGpa: '2.50',
    eligibility: 'SSC from any discipline (Science, Business, or Humanities).',
    subjects: 'Economics, Civics & Good Governance, History, Islamic Studies, ICT, Bangla, English',
    badge: 'Open Intake',
  },
];

const degreePrograms = [
  {
    degree: 'B.A. (Pass)',
    title: 'Bachelor of Arts',
    duration: '3 Years',
    minGpa: 'GPA 2.00 in HSC',
    seats: 120,
    affiliated: 'National University (NU)',
  },
  {
    degree: 'B.S.S. (Pass)',
    title: 'Bachelor of Social Sciences',
    duration: '3 Years',
    minGpa: 'GPA 2.00 in HSC',
    seats: 150,
    affiliated: 'National University (NU)',
  },
  {
    degree: 'B.B.S. (Pass)',
    title: 'Bachelor of Business Studies',
    duration: '3 Years',
    minGpa: 'GPA 2.00 in HSC',
    seats: 120,
    affiliated: 'National University (NU)',
  },
];

const steps = [
  {
    step: '01',
    title: 'Online Application',
    description:
      'Apply online via the central education board portal (xiclassadmission.gov.bd) or National University portal for degree programs.',
  },
  {
    step: '02',
    title: 'College Preference Selection',
    description:
      'Select Nabiganj Govt. College (EIIN: 129524, College Code: 1301) as your 1st choice along with preferred academic group.',
  },
  {
    step: '03',
    title: 'Application Fee Payment',
    description:
      'Complete the payment of mandatory application fee using bKash, Nagad, Rocket, or Sonali Seba gateway.',
  },
  {
    step: '04',
    title: 'Merit List & Confirmation',
    description:
      'Check selected merit list results on the board portal and confirm primary selection via SMS pin confirmation.',
  },
  {
    step: '05',
    title: 'In-Person Enrollment',
    description:
      'Visit NGC campus with required original certificates, photos, and attested copies to complete final registration.',
  },
];

const requiredDocs = [
  'Original SSC / Equivalent Academic Transcript & 2 Photocopies',
  'Original Testimonial / Character Certificate from the Head of the Institution',
  '4 copies of recent passport-size lab print color photographs',
  'Photocopy of Student & Parents National ID Card (or Birth Registration Certificate)',
  'Printed copy of Online Admission Application Form and Payment Slip',
  'Quota certification documents (Freedom Fighter / Tribal / Disability), if applicable',
];

const admissionSchedule = [
  { event: 'Online Application Opens', date: '15 June, 2026', status: 'Upcoming' },
  { event: 'Application Submission Deadline', date: '10 July, 2026', status: 'Upcoming' },
  { event: 'First Merit List Publication', date: '18 July, 2026', status: 'Upcoming' },
  { event: 'Final Enrollment & Document Verification', date: '22–30 July, 2026', status: 'Upcoming' },
  { event: 'Commencement of Academic Classes', date: '01 August, 2026', status: 'Upcoming' },
];

const AdmissionPage = () => {
  return (
    <div className="w-full bg-background">
      {/* 1. Header Banner */}
      <section className="border-b border-border/80 bg-secondary/30 py-8 sm:py-12">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Academic Session 2026–2027</span>
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Admission Guidelines & Eligibility
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Welcome to Nabiganj Government College (EIIN: 129524). Review admission
              criteria, seat quotas, eligibility requirements, and application procedures below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Institutional Identifiers Banner */}
      <section className="border-b border-border/60 bg-card py-5">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
              <span className="text-xs text-muted-foreground">EIIN Code</span>
              <p className="font-serif text-lg font-bold text-foreground sm:text-xl">129524</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
              <span className="text-xs text-muted-foreground">College Code (HSC)</span>
              <p className="font-serif text-lg font-bold text-foreground sm:text-xl">1301</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
              <span className="text-xs text-muted-foreground">National Univ. Code</span>
              <p className="font-serif text-lg font-bold text-foreground sm:text-xl">1706</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
              <span className="text-xs text-muted-foreground">Education Board</span>
              <p className="font-serif text-lg font-bold text-foreground sm:text-xl">Sylhet Board</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HSC Programs & Eligibility */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Higher Secondary Certificate (HSC)
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
              HSC Programs & Requirements
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Minimum GPA and subject prerequisites for class XI admission
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {hscPrograms.map((prog) => (
              <div
                key={prog.group}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {prog.group}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Seats: <strong className="text-foreground">{prog.seats}</strong>
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                    {prog.group} Group
                  </h3>

                  <div className="mt-4 rounded-xl bg-secondary/40 p-3.5">
                    <div className="text-xs text-muted-foreground">Minimum SSC Requirement</div>
                    <div className="mt-0.5 text-base font-bold text-primary">
                      GPA {prog.minGpa} & Above
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-foreground">Eligibility:</span>
                      <p className="mt-0.5 text-muted-foreground">{prog.eligibility}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Major Subjects:</span>
                      <p className="mt-0.5 text-muted-foreground">{prog.subjects}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  Duration: {prog.duration} • Sylhet Board
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Degree (Pass) Programs */}
      <section className="border-y border-border/60 bg-secondary/30 py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Undergraduate Level
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Degree (Pass) Programs (National University)
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Affiliated 3-year undergraduate degree courses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {degreePrograms.map((deg) => (
              <div
                key={deg.degree}
                className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {deg.degree}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {deg.duration}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-foreground">
                  {deg.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{deg.affiliated}</p>

                <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minimum Requirement:</span>
                    <span className="font-semibold text-foreground">{deg.minGpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Capacity:</span>
                    <span className="font-semibold text-foreground">{deg.seats} Students</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Step-by-Step Admission Process */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Workflow
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
              How to Apply (Step-by-Step)
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Follow these simple steps to complete your online application and enrollment
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="font-serif text-3xl font-black text-primary/30">
                  {s.step}
                </div>
                <h3 className="mt-2 font-serif text-base font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="http://xiclassadmission.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <span>XI Class Online Admission Portal</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="http://app1.nu.edu.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:text-primary"
            >
              <span>NU Degree Admission Portal</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Required Documents & Admission Schedule */}
      <section className="border-t border-border/60 bg-secondary/20 py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Required Documents Checklist */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                    Required Documents for Verification
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Must be submitted in physical form during final campus admission
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Important Note:</span>
                </div>
                <p className="mt-1">
                  Original SSC marksheet and testimonial must be shown at the time of verification.
                  Laminated documents are accepted.
                </p>
              </div>
            </div>

            {/* Right: Admission Dates Schedule */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                    Important Dates & Schedule
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Admission timeline for Session 2026–2027
                  </p>
                </div>
              </div>

              <div className="mt-6 divide-y divide-border/60">
                {admissionSchedule.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3.5 text-xs sm:text-sm">
                    <div>
                      <p className="font-medium text-foreground">{item.event}</p>
                      <p className="mt-0.5 text-xs text-primary font-semibold">{item.date}</p>
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Admission Helpline Desk */}
              <div className="mt-6 rounded-xl border border-border/80 bg-secondary/40 p-4">
                <h4 className="font-serif text-sm font-bold text-foreground">
                  Admission Helpline & Helpdesk
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Need assistance with your application? Contact our admission cell during office hours (9:00 AM – 4:00 PM).
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-primary">
                  <a href="tel:01777262980" className="flex items-center gap-1.5 hover:underline">
                    <Phone className="h-3.5 w-3.5" />
                    <span>01777262980</span>
                  </a>
                  <a href="mailto:admission@ngc.edu.bd" className="flex items-center gap-1.5 hover:underline">
                    <Mail className="h-3.5 w-3.5" />
                    <span>admission@ngc.edu.bd</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionPage;
