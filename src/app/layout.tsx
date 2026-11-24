import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Kandhi Surya Atmadja | Full Stack Web & Mobile Developer',
  description:
    'Professional portfolio of Kandhi Surya Atmadja, Information Systems graduate from UPN Veteran Jawa Timur (GPA 3.69 / 4.00), Bangkit Academy 2024 Cloud Computing graduate, and Full Stack Developer with government & enterprise platform experience.',
  keywords: [
    'Kandhi Surya Atmadja',
    'Full Stack Web Developer',
    'Mobile Application Developer',
    'Next.js',
    'React',
    'Expo Go',
    'Laravel',
    'Supabase',
    'PostgreSQL',
    'Google Cloud Platform',
    'Artificial Intelligence',
    'Dinas Sosial Provinsi Jawa Timur',
    'Bangkit Academy 2024',
    'UPN Veteran Jawa Timur',
  ],
  authors: [{ name: 'Kandhi Surya Atmadja' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
