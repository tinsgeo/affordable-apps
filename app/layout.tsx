import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Affordable Apps',
  description: 'AI website & app builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
