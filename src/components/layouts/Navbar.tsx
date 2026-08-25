'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/admission', label: 'Admissions' },
  { href: '/teachers', label: 'Faculty' },
  { href: '/noticeboard', label: 'Notices' },
  { href: '/moments', label: 'Moments' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/10 bg-white/85 backdrop-blur-md dark:border-emerald-500/20 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-base font-bold text-emerald-950 dark:text-emerald-400 sm:text-lg">
              Nabiganj Govt. College
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-700/70 dark:text-emerald-400/70 sm:text-xs">
              Excellence in Higher Education
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-800 font-semibold dark:text-emerald-400'
                    : 'text-zinc-600 hover:text-emerald-800 dark:text-zinc-400 dark:hover:text-emerald-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/admission"
            className="inline-flex h-9 items-center justify-center rounded-md bg-emerald-800 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-emerald-50 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <div className="border-t border-emerald-900/10 bg-white dark:border-emerald-500/20 dark:bg-zinc-950 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold dark:bg-zinc-900 dark:text-emerald-400'
                      : 'text-zinc-600 hover:bg-emerald-50/50 hover:text-emerald-800 dark:text-zinc-400 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admission"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-10 w-full items-center justify-center rounded-md bg-emerald-800 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-none"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
