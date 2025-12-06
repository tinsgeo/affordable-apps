'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  Sparkles, LogOut, Wand2, Eye, Code, Download,
  MessageSquare, Palette, Layout, Zap, CheckCircle,
  ChevronRight, RefreshCw, HelpCircle, Lightbulb, Globe   // ← ADD THIS
} from 'lucide-react';

type Step = 'type' | 'style' | 'features' | 'review' | 'generate';

interface WebsiteConfig {
  type: string;
  style: string;
  features: string[];
  customDetails: string;
}

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [config, setConfig] = useState<WebsiteConfig>({
    type: '',
    style: '',
    features: [],
    customDetails: ''
  });
  const [prompt, setPrompt] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const websiteTypes = [
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', desc: 'Menu, reservations, location' },
    { id: 'portfolio', name: 'Portfolio', icon: '🎨', desc: 'Showcase work and projects' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛍️', desc: 'Products, cart, checkout' },
    { id: 'saas', name: 'SaaS Landing', icon: '🚀', desc: 'Pricing, features, sign-up' },
    { id: 'blog', name: 'Blog', icon: '✍️', desc: 'Articles, categories, author' },
    { id: 'agency', name: 'Agency', icon: '💼', desc: 'Services, team, contact' },
    { id: 'landing', name: 'Landing Page', icon: '📱', desc: 'Single-page marketing' },
    { id: 'custom', name: 'Custom', icon: '⚡', desc: 'Something unique' }
  ];

  const styleOptions = [
    { id: 'modern', name: 'Modern Minimalist', desc: 'Clean, spacious, professional' },
    { id: 'bold', name: 'Bold & Vibrant', desc: 'Colorful, energetic, eye-catching' },
    { id: 'elegant', name: 'Elegant & Luxury', desc: 'Sophisticated, premium feel' },
    { id: 'playful', name: 'Playful & Fun', desc: 'Creative, casual, friendly' },
    { id: 'dark', name: 'Dark Mode', desc: 'Dark background, modern tech' },
    { id: 'brutalist', name: 'Brutalist', desc: 'Raw, bold, unconventional' }
  ];

  const featureOptions = [
    { id: 'contact', name: 'Contact Form', icon: '📧' },
    { id: 'gallery', name: 'Image Gallery', icon: '🖼️' },
    { id: 'testimonials', name: 'Testimonials', icon: '⭐' },
    { id: 'pricing', name: 'Pricing Tables', icon: '💰' },
    { id: 'team', name: 'Team Section', icon: '👥' },
    { id: 'faq', name: 'FAQ Section', icon: '❓' },
    { id: 'newsletter', name: 'Newsletter Signup', icon: '📬' },
    { id: 'social', name: 'Social Links', icon: '🔗' },
    { id: 'map', name: 'Location Map', icon: '🗺️' },
    { id: 'video', name: 'Video Background', icon: '🎥' },
    { id: 'animation', name: 'Smooth Animations', icon: '✨' },
    { id: 'search', name: 'Search Function', icon: '🔍' }
  ];

  // Auto-generate prompt based on selections
  useEffect(() => {
    if (config.type && config.style) {
      generatePrompt();
    }
  }, [config]);

  const generatePrompt = () => {
    const typeDesc = websiteTypes.find(t => t.id === config.type)?.name || '';
    const styleDesc = styleOptions.find(s => s.id === config.style)?.name || '';
    
    let promptText = `Build a ${styleDesc.toLowerCase()} ${typeDesc.toLowerCase()} website`;
    
    if (config.features.length > 0) {
      const featureNames = config.features.map(f => 
        featureOptions.find(opt => opt.id === f)?.name
      ).filter(Boolean);
      promptText += ` with ${featureNames.join(', ')}`;
    }
    
    if (config.customDetails.trim()) {
      promptText += `. ${config.customDetails}`;
    }
    
    promptText += '. Make it responsive, professional, and visually stunning with smooth animations.';
    
    setPrompt(promptText);
  };

  const generate = async () => {
    setLoading(true);
    setShowPreview(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setHtml(data.html);
    } catch (error) {
      console.error('Generation error:', error);
    }
    setLoading(false);
  };

  const resetBuilder = () => {
    setConfig({ type: '', style: '', features: [], customDetails: '' });
    setCurrentStep('type');
    setPrompt('');
    setHtml('');
    setShowPreview(false);
  };

  const toggleFeature = (featureId: string) => {
    setConfig(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const steps = [
    { id: 'type', name: 'Type', icon: Layout },
    { id: 'style', name: 'Style', icon: Palette },
    { id: 'features', name: 'Features', icon: Zap },
    { id: 'review', name: 'Review', icon: Eye },
    { id: 'generate', name: 'Generate', icon: Wand2 }
  ];

  const canProgress = () => {
    if (currentStep === 'type') return config.type !== '';
    if (currentStep === 'style') return config.style !== '';
    return true;
  };

  const getStepIndex = () => steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Website Builder</h1>
              <p className="text-xs text-gray-400">{auth.currentUser?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut(auth).then(() => router.push('/'))}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-gray-800 bg-gray-900/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = getStepIndex() > idx;
              
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id as Step)}
                    className={`flex flex-col items-center gap-2 transition-all ${
                      isActive ? 'scale-110' : 'scale-100 opacity-60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-green-500' 
                        : isActive 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                        : 'bg-gray-800'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{step.name}</span>
                  </button>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 mx-2 text-gray-600 hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Step 1: Website Type */}
        {currentStep === 'type' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">What type of website do you need?</h2>
              <p className="text-xl text-gray-400">Choose the category that best fits your project</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {websiteTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setConfig({ ...config, type: type.id })}
                  className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                    config.type === type.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-800 bg-gray-900/50 hover:border-purple-500/50'
                  }`}
                >
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{type.name}</h3>
                  <p className="text-sm text-gray-400">{type.desc}</p>
                  {config.type === type.id && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="w-6 h-6 text-purple-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setCurrentStep('style')}
                disabled={!canProgress()}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center gap-2"
              >
                Continue to Style
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Style Selection */}
        {currentStep === 'style' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Choose your style</h2>
              <p className="text-xl text-gray-400">Pick a design aesthetic that matches your brand</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {styleOptions.map(style => (
                <button
                  key={style.id}
                  onClick={() => setConfig({ ...config, style: style.id })}
                  className={`group relative p-8 rounded-2xl border-2 transition-all hover:scale-105 text-left ${
                    config.style === style.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-800 bg-gray-900/50 hover:border-purple-500/50'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-3">{style.name}</h3>
                  <p className="text-gray-400">{style.desc}</p>
                  {config.style === style.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-6 h-6 text-purple-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <button
                onClick={() => setCurrentStep('type')}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-lg transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('features')}
                disabled={!canProgress()}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center gap-2"
              >
                Continue to Features
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Features */}
        {currentStep === 'features' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Select features to include</h2>
              <p className="text-xl text-gray-400">Choose any features you'd like (optional)</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              {featureOptions.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    config.features.includes(feature.id)
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-800 bg-gray-900/50 hover:border-purple-500/30'
                  }`}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <div className="text-sm font-medium">{feature.name}</div>
                  {config.features.includes(feature.id) && (
                    <CheckCircle className="w-5 h-5 text-purple-500 mt-2 mx-auto" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12 max-w-2xl mx-auto">
              <label className="block mb-3 text-lg font-medium flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Any specific details or requirements?
              </label>
              <textarea
                value={config.customDetails}
                onChange={(e) => setConfig({ ...config, customDetails: e.target.value })}
                placeholder="E.g., Use blue and gold colors, include my business name 'Joe's Coffee', add a reservation system..."
                className="w-full h-32 p-4 bg-gray-900 border border-gray-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <button
                onClick={() => setCurrentStep('style')}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-lg transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('review')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 flex items-center gap-2"
              >
                Review Prompt
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 'review' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Review your prompt</h2>
              <p className="text-xl text-gray-400">This is what Claude will build for you</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-purple-500/30 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-purple-400 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-purple-400">Your AI Prompt:</h3>
                  <p className="text-lg leading-relaxed">{prompt}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 mb-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                Want to modify it?
              </h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 p-4 bg-black/50 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentStep('features')}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-lg transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setCurrentStep('generate');
                  generate();
                }}
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 flex items-center gap-3"
              >
                <Wand2 className="w-6 h-6" />
                Generate Website
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Generate & Preview */}
        {currentStep === 'generate' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                {loading ? 'Claude is building your website...' : html ? 'Your website is ready!' : 'Generating...'}
              </h2>
              {loading && (
                <div className="flex items-center justify-center gap-3 text-purple-400">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span className="text-lg">This usually takes 10-20 seconds</span>
                </div>
              )}
            </div>

            {html && (
              <>
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={resetBuilder}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Start Over
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([html], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'website.html';
                      a.click();
                    }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download HTML
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    {showPreview ? <Code className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    {showPreview ? 'View Code' : 'View Preview'}
                  </button>
                  <button
  onClick={async () => {
    const projectName = window.prompt?.("Name your project (e.g. my-restaurant-site)", `site-${Date.now()}`) || `site-${Date.now()}`;
    if (!projectName) return;

    const res = await fetch('/api/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html, projectName })
    });

    const data = await res.json();

    if (data.url) {
      alert(`Deployed! Live at: ${data.url}`);
      window.open(data.url, '_blank');
    } else {
      alert('Deploy failed: ' + (data.error || 'Unknown error'));
    }
  }}
  disabled={loading || !html}
  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
>
  <Globe className="w-5 h-5" />
  Deploy Live
</button>
                </div>

                <div className="border-4 border-purple-600 rounded-2xl overflow-hidden shadow-2xl">
                  {showPreview ? (
                    <iframe 
                      srcDoc={html} 
                      className="w-full h-[800px]" 
                      sandbox="allow-scripts"
                      title="Website Preview"
                    />
                  ) : (
                    <pre className="w-full h-[800px] overflow-auto p-6 bg-gray-950 text-sm">
                      <code>{html}</code>
                    </pre>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
