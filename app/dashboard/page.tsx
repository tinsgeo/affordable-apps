// app/dashboard/page.tsx
'use client';

import { auth } from '@/lib/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push('/');
    });
    return unsubscribe;
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-12">
      <h1 className="text-5xl font-bold mb-8">Welcome to your AI builder!</h1>
      <p className="text-2xl text-gray-300">
        You’re logged in as: {auth.currentUser?.email}
      </p>
      <p className="mt-12 text-xl">Full Claude AI dashboard coming in the next message</p>
    </main>
  );
}
