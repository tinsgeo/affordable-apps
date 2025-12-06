// app/page.tsx
'use client';

import { useState } from 'react';
import { SignIn } from '@/components/SignIn';
import { Rocket, Zap, Palette, Globe, ArrowRight, Check } from 'lucide-react';

export default function Home() {
  const [hoveredExample, setHoveredExample] = useState<number | null>(null);

  const examples = [
    { name: "Restaurant", prompt: "Modern Italian restaurant with hero image, menu grid, and booking form" },
    { name: "Portfolio", prompt: "Minimal dark-mode portfolio for a designer with project gallery" },
    { name: "SaaS Landing", prompt: "SaaS pricing page with 3 tiers, testimonials, and animated CTA" },
    { name: "E-commerce", prompt: "Fashion store homepage with product carousel and cart button" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-900 text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-32 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> AI-Powered • No Code • Live in Seconds
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Your Website Builds Itself
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              While You Watch
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Type what you want in plain English. Claude 3.5 instantly creates a beautiful, responsive, production-ready website — then keeps improving it forever.
          </p>

          {/* Sign-in Card */}
          <div className="max-w-md mx-auto mb-16">
            <SignIn />
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> No credit card required</div>
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Live Examples Grid */}
      <section className="relative -mt-20 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Watch It Happen Live
          </h2>
          <p className="text-center text-xl text-gray-400 mb-12">
            These sites were generated in under 15 seconds each
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((ex, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredExample(i)}
                onMouseLeave={() => setHoveredExample(null)}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-indigo-500"
              >
                {/* Fake "screenshot" */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/5"></div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${hoveredExample === i ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="text-6xl font-bold text-white/20">{ex.name}</div>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${hoveredExample === i ? 'opacity-100' : 'opacity-0'}`}>
                    <Rocket className="w-16 h-16 text-indigo-400 animate-bounce" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{ex.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{ex.prompt}</p>
                  <div className="mt-4 flex items-center gap-2 text-indigo-400 font-medium">
                    Built in {8 + i * 2}s <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 bg-black/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Instant Deploy</h3>
            <p className="text-gray-400">One click → live on a real .vercel.app domain. No hosting setup.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Palette className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Unlimited Revisions</h3>
            <p className="text-gray-400">Say “make it dark mode” or “add Stripe checkout” — done in seconds, forever.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Powered by Claude 3.5</h3>
            <p className="text-gray-400">The smartest AI model on Earth writing production-grade code for you.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to build your next site in seconds?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join 500+ founders already using Affordable Apps
          </p>
          <div className="max-w-md mx-auto">
            <SignIn />
          </div>
        </div>
      </section>
    </main>
  );
}
