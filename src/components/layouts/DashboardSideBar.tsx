'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Bell,
  GraduationCap,
  Image as ImageIcon,
  BarChart3,
  Users,
  Globe,
  LogOut,
  ChevronDown,
  User,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const menuItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Notices',
    href: '/dashboard/notices',
    icon: Bell,
  },
  {
    label: 'Teachers & Faculty',
    href: '/dashboard/teachers',
    icon: GraduationCap,
  },
  {
    label: 'Gallery & Moments',
    href: '/dashboard/gallery',
    icon: ImageIcon,
  },
  {
    label: 'College Stats',
    href: '/dashboard/stats',
    icon: BarChart3,
  },
  {
    label: 'Manage Admins',
    href: '/dashboard/admins',
    icon: Users,
  },
];

const DashboardSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const role = user?.role || 'admin';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsUserDropdownOpen(false), 150);
  };

  const handleSignOut = async () => {
    const toastId = toast.loading('Signing out...');
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully', { id: toastId });
            router.push('/login');
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to sign out', { id: toastId });
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="flex h-16 items-center justify-between px-5 border-b border-border/70">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md font-serif font-bold text-base">
              NGC
            </div>
            <div>
              <div className="font-serif text-sm font-bold leading-tight text-foreground">
                Nabiganj Govt.
              </div>
              <div className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                Admin Portal
              </div>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3.5 space-y-1 overflow-y-auto max-h-[calc(100vh-175px)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 px-3 py-1">
            Management
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-primary/10 text-primary border border-primary/25 font-bold shadow-2xs'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary shadow-sm" />
                )}
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 px-3 py-1">
              Shortcuts
            </p>
            <Link
              href="/"
              target="_blank"
              className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
            >
              <Globe className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>View Public Website</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Admin Profile & Sign Out Section */}
      <div className="border-t border-border/70 p-3.5 relative">
        <div className="relative" ref={dropdownRef}>
          {/* Dropdown Popup */}
          {isUserDropdownOpen && (
            <div
              className="absolute bottom-full left-0 mb-2 w-full rounded-2xl border border-border bg-popover p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="px-3 py-2 border-b border-border/60 mb-1">
                <p className="text-xs font-bold text-foreground truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                  {user?.email || 'admin@ngc.edu.bd'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* Profile Card Trigger */}
          <div
            className="flex items-center gap-2.5 p-2 rounded-xl border border-border/70 bg-card hover:border-primary/40 hover:bg-secondary/40 cursor-pointer transition-all duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 font-bold text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : <Shield className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate leading-tight">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mt-0.5">
                {role}
              </p>
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                isUserDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-3 left-3 z-40">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card shadow-sm text-foreground hover:bg-secondary"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 flex-col bg-card border-r border-border shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSideBar;
