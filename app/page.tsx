// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SignIn } from '@/components/SignIn';
import { Rocket, Zap, Palette, Globe, ArrowRight, Check, Play, Users, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [hoveredExample, setHoveredExample] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 23, minutes: 59, seconds: 59 });

  // Countdown timer (launch in 7 days)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Confetti on successful sign-up (you can trigger this from SignIn component later)
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const examples = [
    { name: "Restaurant", prompt: "Italian restaurant with hero, menu & booking" },
    { name: "Portfolio", prompt: "Dark-mode designer portfolio with gallery" },
    { name: "SaaS Landing", prompt: "Pricing page with 3 tiers & testimonials" },
    { name: "E-commerce", prompt: "Fashion store with carousel & cart" },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Founder, Bloom", text: "Built my entire startup site in 11 seconds. Insane.", avatar: "S" },
    { name: "Mike Torres", role: "Indie Maker", text: "Replaced my $3k/month agency. Best decision ever.", avatar: "M" },
    { name: "Alex Kim", role: "Designer", text: "The AI writes better code than most devs I know.", avatar: "A" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-900 text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-32 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Launch Badge + Countdown */}
          <div className="inline-flex flex-col items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full text-sm font-bold">
              <Sparkles className="w-5 h-5" />
              First 500 members get lifetime 50% off
            </div>
            <div className="flex gap-4 text-2xl font-mono font-bold">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded">{timeLeft.days}d</div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded">{timeLeft.hours.toString().padStart(2, '0')}h</div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded">{timeLeft.minutes.toString().padStart(2, '0')}m</div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded">{timeLeft.seconds.toString().padStart(2, '0')}s</div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Your Website Builds Itself
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              In Under 15 Seconds
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Describe anything in English. Claude 3.5 Sonnet writes perfect, responsive code — instantly.
          </p>

          {/* Video Demo */}
          <div className="max-w-4xl mx-auto mb-12 relative group cursor-pointer" onClick={triggerConfetti}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-3xl"
                poster="https://assets.mixkit.co/videos/preview/mixkit-glowing-gradient-lines-11809-large.jpg"
              >
                <source src="https://cdn.magicui.design/demo-video.mp4" type="video/mp4" />
                {/* Fallback: use any short 8-second AI coding clip or generate one later */}
              </video>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="bg-black/70 backdrop-blur p-6 rounded-full">
                  <Play className="w-16 h-16 fill-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
                Watch Claude build a site in 11s
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="max-w-md mx-auto">
            <SignIn onSuccess={triggerConfetti} />
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> No credit card</div>
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> Cancel anytime</div>
            <div className="flex items-center gap-2"><Users className="w-5 h-5" /> 487 spots left</div>
          </div>
        </div>
      </section>

      {/* Live Examples */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Real Sites Built in Seconds
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((ex, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredExample(i)}
                onMouseLeave={() => setHoveredExample(null)}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-purple-500"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/5"></div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${hoveredExample === i ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="text-5xl font-bold text-white/20">{ex.name}</div>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${hoveredExample === i ? 'opacity-100' : 'opacity-0'}`}>
                    <Rocket className="w-20 h-20 text-purple-400 animate-bounce" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg">{ex.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{ex.prompt}</p>
                  <div className="mt-4 text-purple-400 font-medium text-sm">Built in {8 + i * 2}s →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Founders Love It</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
                <p className="text-lg italic">“{t.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            Be One of the First 500
          </h2>
          <p className="text-2xl text-gray-300 mb-12">
            Lifetime 50% off + early access to new features
          </p>
          <div className="max-w-md mx-auto">
            <SignIn onSuccess={triggerConfetti} />
          </div>
          <p className="mt-8 text-gray-400 text-lg">
            <Users className="inline w-6 h-6 mr-2" />
            487 / 500 spots remaining
          </p>
        </div>
      </section>
    </main>
  );
}
