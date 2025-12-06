// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';   // ← This line
import { SpeedInsights } from '@vercel/speed-insights/next'; // ← Bonus: performance tracking

export const metadata: Metadata = {
  title: 'Affordable Apps – AI Website Builder',
  description: 'Describe your site. Claude builds it instantly. No code needed.',
  metadataBase: new URL('https://affordable-apps-omega.vercel.app'), // ← change to your real URL later
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
        <Analytics />                 {/* ← Tracks page views */}
        <SpeedInsights />             {/* ← Tracks performance (optional but awesome) */}
      </body>
    </html>
  );
}
