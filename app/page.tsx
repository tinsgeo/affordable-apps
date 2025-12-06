// app/page.tsx
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setMessage(err.message.includes('wrong-password') ? 'Wrong password' : 'Error – try again');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            Affordable Apps
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            AI website builder — describe, deploy, done.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Welcome back' : 'Create account'}</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password (6+ chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 transition"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account →')}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-300">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-400 underline font-medium">
              {isLogin ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          {message && <p className="mt-4 text-center text-red-400">{message}</p>}
        </div>
      </div>
    </main>
  );
}
