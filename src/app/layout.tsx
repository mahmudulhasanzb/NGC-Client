import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
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
