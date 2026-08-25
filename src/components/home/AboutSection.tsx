import React from 'react';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

const aboutImage =
  'https://images.pexels.com/photos/19554793/pexels-photo-19554793.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To provide accessible, high-quality education that empowers students to become responsible citizens and visionary leaders.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be a leading center of academic excellence recognized for innovation, integrity, and dedicated community service.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Integrity, inclusivity, intellectual curiosity, and discipline guide every endeavor at Nabiganj Government College.',
  },
];

const AboutSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Campus Image + Floating Stat Card */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-sm">
              <img
                src={aboutImage}
                alt="Nabiganj Government College Campus"
                className="h-full w-full object-cover transition-transform duration-500 "
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-xl bg-primary px-6 py-4 text-primary-foreground shadow-xl sm:block border border-primary-foreground/10">
              <div className="font-serif text-3xl font-bold">40+</div>
              <div className="text-sm font-medium text-primary-foreground/80">
                Years of Excellence
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                About Our College
              </span>
              <h2 className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                A Legacy of Learning Since 1984
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Nabiganj Government College has stood as a beacon of higher education
                in the Habiganj district for over four decades. We offer comprehensive
                academic programs in Science, Humanities, and Business Studies, serving
                thousands of aspiring students from diverse backgrounds.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Our dedicated faculty, well-equipped labs, rich library facilities, and
                unwavering commitment to student success create an empowering environment
                where dreams transform into reality.
              </p>
            </div>

            {/* Core Values / Mission / Vision */}
            <div className="space-y-4 pt-2">
              {values.map((val) => (
                <div key={val.title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <val.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {val.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Read Our Full Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
