"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Clock, Users, ArrowRight, Play, CheckCircle, Star, X } from 'lucide-react';
import { SignIn } from '@/components/SignIn';

export default function InteractiveLanding() {
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 23, mins: 59, secs: 59 });
  const [spotsLeft, setSpotsLeft] = useState(487);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fullText = "a modern coffee shop website with menu and location";

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const examples = [
    { name: 'Restaurant', desc: 'Italian restaurant with hero, menu & booking', time: '8s', gradient: 'from-orange-500 to-red-600' },
    { name: 'Portfolio', desc: 'Dark-mode designer portfolio with gallery', time: '10s', gradient: 'from-purple-500 to-pink-600' },
    { name: 'SaaS Landing', desc: 'Pricing page with 3 tiers & testimonials', time: '12s', gradient: 'from-blue-500 to-cyan-600' },
    { name: 'E-commerce', desc: 'Fashion store with carousel & cart', time: '14s', gradient: 'from-green-500 to-emerald-600' }
  ];

  const testimonials = [
    { initial: 'S', name: 'Sarah Chen', role: 'Founder, Bloom', text: 'Built my entire startup site in 11 seconds. Insane.', color: 'bg-pink-500' },
    { initial: 'M', name: 'Mike Torres', role: 'Indie Maker', text: 'Replaced my $3k/month agency. Best decision ever.', color: 'bg-blue-500' },
    { initial: 'A', name: 'Alex Kim', role: 'Designer', text: 'The AI writes better code than most devs I know.', color: 'bg-purple-500' }
  ];

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Cursor follower */}
      <div 
        className="fixed w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300 ease-out"
        style={{ 
          left: mousePos.x - 128, 
          top: mousePos.y - 128,
          transform: 'translate(0, 0)'
        }}
      />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-purple-500/20">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Affordable Apps</h2>
            </div>
            
            <SignIn onSuccess={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Affordable Apps</span>
          </div>
          <button 
            onClick={handleAuthClick}
            className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
          >
            Sign In
          </button>
        </header>

        {/* Countdown Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-center animate-pulse">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="font-semibold">First 500 members get lifetime 50% off</span>
            <div className="flex gap-3">
              <div className="bg-black/30 px-3 py-1 rounded backdrop-blur">
                <span className="text-lg font-bold">{timeLeft.days}</span>
                <span className="text-xs ml-1">d</span>
              </div>
              <div className="bg-black/30 px-3 py-1 rounded backdrop-blur">
                <span className="text-lg font-bold">{timeLeft.hours}</span>
                <span className="text-xs ml-1">h</span>
              </div>
              <div className="bg-black/30 px-3 py-1 rounded backdrop-blur">
                <span className="text-lg font-bold">{timeLeft.mins}</span>
                <span className="text-xs ml-1">m</span>
              </div>
              <div className="bg-black/30 px-3 py-1 rounded backdrop-blur">
                <span className="text-lg font-bold">{timeLeft.secs}</span>
                <span className="text-xs ml-1">s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 animate-bounce">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">AI-Powered Website Builder</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Your Website Builds Itself<br />In Under 15 Seconds
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Describe anything in English. Claude 3.5 Sonnet writes perfect, responsive code — instantly.
          </p>

          {/* Interactive Demo */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 backdrop-blur border border-purple-500/30">
              <div className="bg-black/50 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-left text-lg">
                  <span className="text-purple-400">Build me </span>
                  <span className="text-white">{typedText}</span>
                  <span className="animate-pulse">|</span>
                </p>
              </div>
              
              <div className="relative group cursor-pointer" onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                <img 
                  src="https://assets.mixkit.co/videos/preview/mixkit-glowing-gradient-lines-11809-large.jpg" 
                  alt="Demo" 
                  className="w-full rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center group-hover:bg-black/30 transition-all">
                  <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                    <Play className="w-12 h-12 text-black" fill="black" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-sm">Watch Claude build a site in 11s</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <button 
              onClick={handleAuthClick}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>No credit card</span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <Users className="w-5 h-5" />
            <span className="font-semibold">{spotsLeft} / 500 spots remaining</span>
          </div>
        </section>

        {/* Examples Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Real Sites Built in Seconds</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((example, idx) => (
              <div 
                key={idx}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${example.gradient} rounded-xl mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                    <Sparkles className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{example.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{example.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">Built in {example.time}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Founders Love It</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center font-bold text-lg`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 text-center backdrop-blur border border-purple-500/30">
            <h2 className="text-4xl font-bold mb-4">Be One of the First 500</h2>
            <p className="text-xl text-gray-300 mb-8">Lifetime 50% off + early access to new features</p>
            
            <button 
              onClick={handleAuthClick}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95 mb-6 flex items-center gap-3 mx-auto"
            >
              Get Started Free
              <Zap className="w-6 h-6" />
            </button>
            
            <p className="text-gray-400">
              Don't have an account? 
              <button 
                onClick={handleAuthClick}
                className="text-purple-400 font-semibold hover:underline ml-1"
              >
                Sign up free
              </button>
            </p>
            
            <div className="mt-8 inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-6 py-3">
              <Users className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400">{spotsLeft} / 500 spots remaining</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 text-center text-gray-500 border-t border-gray-800">
          <p>© 2024 Affordable Apps. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
