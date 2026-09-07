import type { Metadata } from 'next';
import { Space_Grotesk, PT_Serif, Space_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const ptSerif = PT_Serif({
  variable: '--font-pt-serif',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nabiganj Govt. College',
  description: 'Nabiganj Government College (NGC) - Excellence in Higher Education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ptSerif.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--card, #ffffff)',
              color: 'var(--foreground, #0f172a)',
              border: '1px solid rgba(0,0,0,0.08)',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '12px',
              boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#059669',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e11d48',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
