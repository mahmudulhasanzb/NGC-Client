import React from 'react';
import type { Metadata } from 'next';
import {
  Target,
  Eye,
  Heart,
  Award,
  BookOpen,
  Users,
  Building2,
  GraduationCap,
  Video,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { serverFetch } from '@/lib/api/serverFetch';
import { formatEmbedUrl } from '@/lib/embedUrl';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About Us | Nabiganj Govt. College',
  description:
    'Learn about the rich history, mission, vision, core values, and virtual tour of Nabiganj Government College.',
};

const highlights = [
  {
    icon: BookOpen,
    title: 'Diverse Programs',
    description:
      'Offering comprehensive programs in Science, Humanities, and Business Studies at both HSC and Degree levels.',
  },
  {
    icon: Users,
    title: 'Experienced Faculty',
    description:
      'Our dedicated educators bring decades of pedagogical expertise and scholarly mentorship to the classrooms.',
  },
  {
    icon: Building2,
    title: 'Modern Facilities',
    description:
      'Well-equipped science and computer laboratories, a resourceful central library, and spacious campus grounds.',
  },
  {
    icon: GraduationCap,
    title: 'Strong Alumni Network',
    description:
      'Thousands of distinguished graduates serving across public administration, industry, healthcare, and academia.',
  },
];

export default async function AboutPage() {
  const res = await serverFetch({ path: 'about' });
  const about = res?.data || {};

  const heading = about.heading || '40+ Years of Academic Excellence in Nabiganj';
  const subheading =
    about.subheading ||
    'Empowering generations through quality education, discipline, and integrity since 1984.';
  const description1 =
    about.description1 ||
    'Nabiganj Government College was founded with a profound vision to bring high-quality tertiary education to the students of Nabiganj and surrounding regions of Habiganj district.';
  const description2 =
    about.description2 ||
    'Under the supervision of the Ministry of Education and National University, our campus provides modern science laboratories, an extensive library, and experienced BCS educators.';
  const establishedYear = about.establishedYear || '1984';
  const eiinNumber = about.eiinNumber || '129524';
  const collegeCode = about.collegeCode || '1301';
  const nuCode = about.nuCode || '1706';

  const embedUrl = formatEmbedUrl(
    about.videoEmbedUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  );

  return (
    <div className="w-full bg-background">
      {/* Hero & Historical Overview */}
      <section className="py-12 sm:py-16 border-b border-border/70 bg-secondary/15">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Established in {establishedYear}</span>
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {heading}
              </h1>
              <p className="text-sm font-medium text-primary sm:text-base">
                {subheading}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description1}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description2}
              </p>

              {/* Badges / Codes */}
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                <div className="rounded-xl border border-border/80 bg-card p-3 text-center shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">
                    EIIN Number
                  </div>
                  <div className="font-serif text-sm font-bold text-foreground mt-0.5">
                    {eiinNumber}
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-card p-3 text-center shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">
                    College Code
                  </div>
                  <div className="font-serif text-sm font-bold text-foreground mt-0.5">
                    {collegeCode}
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-card p-3 text-center shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">
                    National Univ.
                  </div>
                  <div className="font-serif text-sm font-bold text-foreground mt-0.5">
                    {nuCode}
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-card p-3 text-center shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">
                    Affiliation
                  </div>
                  <div className="font-serif text-sm font-bold text-foreground mt-0.5">
                    BISE Sylhet
                  </div>
                </div>
              </div>
            </div>

            {/* Video Tour Embed Frame */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                <div className="flex items-center justify-between border-b border-border/70 bg-secondary/40 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Video className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-serif text-xs font-bold text-foreground">
                      Campus Tour & Documentary
                    </span>
                  </div>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    Live Embed
                  </span>
                </div>
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={embedUrl}
                    title="Nabiganj Government College Virtual Tour"
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="bg-secondary/30 py-16 sm:py-20 border-b border-border/60">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Our Principles
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Mission, Vision & Values
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              The foundational pillars that guide our institutional philosophy and teaching
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description:
                  about.missionText ||
                  'To provide accessible, high-quality education that empowers students from all socioeconomic backgrounds to realize their potentials and serve their communities.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                description:
                  about.visionText ||
                  'To stand as a nationally acclaimed center for holistic academic excellence, innovation, and character building — preparing global leaders of tomorrow.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                description:
                  about.valuesText ||
                  'Integrity, inclusivity, intellectual honesty, mutual respect, and community commitment form the cornerstone of every academic and co-curricular initiative.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary shadow-xs">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose NGC Highlights */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Institutional Excellence
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose NGC?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Discover what distinguishes Nabiganj Government College as an exemplary campus
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message Section */}
      <section className="bg-primary py-16 sm:py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Award className="mx-auto mb-4 h-12 w-12 text-accent" />
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Principal&apos;s Message
          </h2>
          <p className="mt-6 text-base italic leading-relaxed text-primary-foreground/90 sm:text-xl">
            &ldquo;At Nabiganj Government College, we believe that education is
            the most transformative force in shaping enlightened minds and
            responsible citizens. Our faculty and administration remain
            wholeheartedly dedicated to nurturing curiosity, ethical discipline,
            and academic distinction across all fields of study.&rdquo;
          </p>
          <div className="mt-6 font-serif text-lg font-semibold text-white">
            — The Principal, Nabiganj Govt. College
          </div>
        </div>
      </section>
    </div>
  );
}
