// components/SignIn.tsx
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

type Props = {
  onSuccess?: () => void;
};

export function SignIn({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onSuccess?.();
      router.push('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-6 py-4 bg-white/10 backdrop-blur rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500"
      />
      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-6 py-4 bg-white/10 backdrop-blur rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition"
      >
        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account →')}
      </button>

      {error && <p className="text-red-400 text-center">{error}</p>}

      <p className="text-center text-gray-400">
        {isLogin ? "Don't have an account? " : "Already have one? "}
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-purple-400 underline font-medium">
          {isLogin ? 'Sign up free' : 'Sign in'}
        </button>
      </p>
    </form>
  );
}
