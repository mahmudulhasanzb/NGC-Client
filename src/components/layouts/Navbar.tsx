'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@heroui/react';
// import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/admission', label: 'Admissions' },
  { href: '/notice', label: 'Notice' },
  { href: '/teacher', label: 'Teachers' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <img
              src="https://i.ibb.co.com/k64hgYN2/school-removebg-preview.png"
              alt="Nabiganj Govt. College Crest"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-base font-bold text-foreground sm:text-lg">
              Nabiganj Govt. College
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
              ESTD : 1984 | EIIN : 129524
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative pb-1 text-sm transition-colors hover:text-primary',
                  isActive
                    ? 'font-semibold text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-primary'
                    : 'font-medium text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Dashboard
              </Link>
              <Button
                onClick={() => authClient.signOut()}
                className="inline-flex h-9 items-center justify-center rounded-lg bg-destructive px-3.5 text-xs font-semibold text-destructive-foreground shadow-sm transition-all hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive cursor-pointer"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <Button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden cursor-pointer"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-8xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary',
                  pathname === link.href
                    ? 'bg-secondary text-primary'
                    : 'text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* Admin only */}
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-md  px-3 py-2.5 text-sm font-bold transition-colors hover:bg-secondary',
                    pathname === '/dashboard'
                      ? 'bg-secondary text-primary'
                      : 'text-muted-foreground',
                  )}
                >
                  Dashboard
                </Link>
                <Button
                onClick={() => authClient.signOut()}
                className="inline-flex h-9 items-center justify-center rounded-md bg-red-500 px-3 text-sm font-medium text-white shadow transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-ring active:ring-0 "
              >
                <span title="Logout from the account">Logout</span>
              </Button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm font-bold transition-colors hover:bg-secondary ',
                  pathname === '/login'
                    ? 'bg-secondary text-primary'
                    : 'text-muted-foreground',
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
