import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LogoFacebook, LogoLinkedin, Video } from '@gravity-ui/icons';

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/admission', label: 'Admissions' },
  { href: '/teacher', label: 'Faculty & Teachers' },
  { href: '/notice', label: 'Notice Board' },
  { href: '/gallery', label: 'Campus Moments' },
  { href: '/#contact', label: 'Contact Us' },
];

export function Footer() {
  return (
    <footer className="border-t border-[#172128] bg-[#09131a] text-[#f3faff]">
      <div className="mx-auto max-w-8xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16 sm:pb-8 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 overflow-hidden">
                <img
                  src="https://i.ibb.co.com/PG8yWcRN/school.jpg"
                  alt="Nabiganj Govt. College Crest"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-white sm:text-lg">
                  Nabiganj Govt. College
                </span>
                <span className="font-mono text-[10px] tracking-wider text-slate-400">
                  EIIN : 129524 | Code : 1301
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Nabiganj Government College is committed to providing quality
              higher education and fostering academic excellence since 1984.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-xs font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-xs font-semibold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Nabiganj, Habiganj, Sylhet Division, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <a href="tel:01777262980" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>01777262980</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <a href="mailto:info@ngc.edu.bd" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info@ngc.edu.bd</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="mb-4 font-serif text-xs font-semibold uppercase tracking-wider text-white">
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
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-primary hover:bg-primary hover:text-white cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credit */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p className="select-none">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-semibold text-slate-200">
              Nabiganj Government College
            </span>
            . All rights reserved. (EIIN: 129524)
          </p>
          <p className="select-none">
            Developed by{' '}
            <Link
              href="https://www.linkedin.com/in/mahmudulhasanzb/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-200 transition-colors hover:text-primary"
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
