import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LogoFacebook, LogoLinkedin, Video } from '@gravity-ui/icons';

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/admission', label: 'Admissions' },
  { href: '/teachers', label: 'Faculty' },
  { href: '/noticeboard', label: 'Notice Board' },
  { href: '/moments', label: 'Campus Moments' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-8xl px-4 pt-10 pb-5 sm:px-6 sm:pt-12 sm:pb-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground overflow-hidden">
                <img
                  src="https://i.ibb.co.com/PG8yWcRN/school.jpg"
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-serif text-lg font-bold text-primary">
                Nabiganj Government College
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Nabiganj Government College is committed to providing quality
              higher education and fostering academic excellence since 1973.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Nabiganj, Habiganj, Sylhet Division, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <a href="tel:01777262980" className="flex gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>01777262980</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <a href="mailto:info@ngc.edu.bd" className="flex gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info@ngc.edu.bd</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              {[
                {
                  icon: LogoFacebook,
                  label: 'Facebook',
                  href: 'https://www.facebook.com/nabiganjgovernmentcollege.edu.bd?mibextid=LQQPHv',
                },
                {
                  icon: Video,
                  label: 'YouTube',
                  href: 'https://www.youtube.com/@nabiganjgovernmentcollege',
                },
                {
                  icon: LogoLinkedin,
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/nabiganj-government-college-309325229/',
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credit */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-5 text-xs text-muted-foreground sm:flex-row">
          <p className="select-none">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-semibold text-foreground">
              Nabiganj Government College
            </span>
            . All rights reserved.
          </p>
          <p className="select-none">
            Developed by{' '}
            <Link
              href="https://www.linkedin.com/in/mahmudulhasanzb/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Mahmudul Hasan <span className="text-primary font-bold">&gt;</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
