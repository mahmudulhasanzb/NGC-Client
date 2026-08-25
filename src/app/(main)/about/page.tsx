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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Nabiganj Govt. College',
  description:
    'Learn about the rich history, mission, vision, and core values of Nabiganj Government College.',
};

const campusImage =
  'https://images.pexels.com/photos/5147366/pexels-photo-5147366.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';

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

const AboutPage = () => {
  return (
    <div className="w-full bg-background">
      {/* History Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Our History
              </span>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Established in 1984
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Nabiganj Government College was founded with a profound vision
                to bring high-quality tertiary education to the students of
                Nabiganj and surrounding regions of Habiganj district. What
                began as a humble community effort has evolved into one of the
                most prominent government institutions in Sylhet Division.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Over the decades, the college has produced thousands of
                successful alumni who serve with distinction across the civil
                service, corporate enterprises, educational institutions, and
                healthcare sectors.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                With modern infrastructure, digital classrooms, and seasoned
                educators, Nabiganj Government College continues to champion
                moral integrity, critical inquiry, and academic brilliance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-sm">
                <img
                  src={campusImage}
                  alt="Nabiganj Government College Building"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="bg-secondary/30 py-16 sm:py-24 border-y border-border/60">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Our Principles
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Mission, Vision & Values
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              The foundational pillars that guide our institutional philosophy
              and teaching
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description:
                  'To provide accessible, high-quality education that empowers students from all socioeconomic backgrounds to realize their potentials and serve their communities.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                description:
                  'To stand as a nationally acclaimed center for holistic academic excellence, innovation, and character building — preparing global leaders of tomorrow.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                description:
                  'Integrity, inclusivity, intellectual honesty, mutual respect, and community commitment form the cornerstone of every academic and co-curricular initiative.',
              },
            ].map(item => (
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Institutional Excellence
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose NGC?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Discover what distinguishes Nabiganj Government College as an
              exemplary campus
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(item => (
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
      <section className="bg-primary py-16 sm:py-24 text-primary-foreground">
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
};

export default AboutPage;
