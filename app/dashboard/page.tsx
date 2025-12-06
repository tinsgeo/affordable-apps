'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setHtml(data.html);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="border-b border-gray-800 p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your AI Builder</h1>
        <button onClick={() => signOut(auth).then(() => router.push('/'))} className="text-gray-400 hover:text-white">
          Sign Out
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center p-12 gap-8">
        <div className="w-full max-w-4xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your dream website... (e.g. Modern Italian restaurant with booking form)"
            className="w-full h-32 p-6 bg-gray-900 rounded-xl text-lg resize-none focus:outline-none focus:ring-4 focus:ring-purple-500"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && generate()}
          />
          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="mt-6 w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-2xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition"
          >
            {loading ? 'Claude is building...' : 'Generate Website →'}
          </button>
        </div>

        {html && (
          <div className="w-full max-w-7xl border-4 border-purple-600 rounded-2xl overflow-hidden shadow-2xl">
            <iframe srcDoc={html} className="w-full h-screen" sandbox="allow-scripts" />
          </div>
        )}
      </main>
    </div>
  );
}
