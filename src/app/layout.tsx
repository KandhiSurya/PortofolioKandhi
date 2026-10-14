import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kandhi Surya Atmadja | Full Stack Engineer & Cloud Systems Specialist',
  description:
    'Website portofolio profesional Kandhi Surya Atmadja, Sarjana Komputer S1 Sistem Informasi UPN Veteran Jawa Timur (IPK 3.69) dan alumni Bangkit Academy 2024 Cloud Computing. Berpengalaman di Dinas Sosial Provinsi Jawa Timur.',
  keywords: [
    'Kandhi Surya Atmadja',
    'Full Stack Developer',
    'Cloud Systems Specialist',
    'Bangkit Academy 2024',
    'Sistem Informasi UPN Veteran Jawa Timur',
    'Next.js',
    'Tailwind CSS',
    'PostgreSQL',
    'REST API',
    'Google Cloud Platform',
    'Dinas Sosial Provinsi Jawa Timur',
  ],
  authors: [{ name: 'Kandhi Surya Atmadja' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
