'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, X, Crown, Zap, Sparkles, ChevronDown, 
  ChevronUp, Shield, CreditCard 
} from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free Tier',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out our platform',
    features: [
      { name: 'Monthly Site Generations', value: 'Up to 2 sites', included: true },
      { name: 'Download HTML/CSS Files', value: 'Basic export', included: true },
      { name: 'Edit Site via Prompt Revision', value: '', included: false },
      { name: 'One-Click Deployment to Vercel', value: '', included: false },
      { name: 'Priority Customer Support', value: 'Basic (community forums)', included: true },
      { name: 'Custom Themes and Templates', value: 'Limited (5 basic templates)', included: true },
      { name: 'Analytics Integration', value: '', included: false },
      { name: 'Collaboration Tools', value: '', included: false },
      { name: 'Storage for Generated Sites', value: '500MB total', included: true },
    ],
    cta: 'Current Plan',
    highlighted: false,
    stripeLink: null
  },
  {
    id: 'growth',
    name: 'Growth Tier',
    price: 79,
    period: 'month',
    description: 'For professionals and growing businesses',
    features: [
      { name: 'Monthly Site Generations', value: 'Up to 20 sites', included: true },
      { name: 'Download HTML/CSS Files', value: 'Enhanced export with optimized code', included: true },
      { name: 'Edit Site via Prompt Revision', value: 'Unlimited revisions per site, with version history', included: true },
      { name: 'One-Click Deployment to Vercel', value: '', included: false },
      { name: 'Priority Customer Support', value: 'Priority email support (response within 24 hours)', included: true },
      { name: 'Custom Themes and Templates', value: '50+ templates, plus custom theme imports', included: true },
      { name: 'Analytics Integration', value: 'Basic (Google Analytics setup guide)', included: true },
      { name: 'Collaboration Tools', value: '', included: false },
      { name: 'Storage for Generated Sites', value: '5GB total', included: true },
      { name: 'Additional Perks', value: 'Monthly usage reports and tips for better prompts', included: true },
    ],
    cta: 'Upgrade to Growth',
    highlighted: false,
    stripeLink: 'prod_TdBpA76py4klHo' // Stripe price ID
  },
  {
    id: 'unlimited',
    name: 'Unlimited Tier',
    price: 99,
    period: 'month',
    description: 'For teams and agencies',
    badge: 'Best Value',
    features: [
      { name: 'Monthly Site Generations', value: 'Unlimited sites', included: true },
      { name: 'Download HTML/CSS Files', value: 'Enhanced export with optimized code and assets bundled', included: true },
      { name: 'Edit Site via Prompt Revision', value: 'Unlimited revisions with AI-suggested improvements', included: true },
      { name: 'One-Click Deployment to Vercel', value: 'Automatic deployment with custom subdomain and preview links', included: true },
      { name: 'Priority Customer Support', value: '24/7 chat and phone support, plus dedicated account manager', included: true },
      { name: 'Custom Themes and Templates', value: 'Full library access (100+ templates, AI-generated custom themes)', included: true },
      { name: 'Analytics Integration', value: 'Built-in integration with Google Analytics, Hotjar, plus performance reports', included: true },
      { name: 'Collaboration Tools', value: 'Team invites, real-time co-editing, role-based access for up to 5 users', included: true },
      { name: 'Storage for Generated Sites', value: 'Unlimited storage with automatic backups', included: true },
      { name: 'Additional Perks', value: 'Exclusive access to beta features, AI SEO optimization and e-commerce modules', included: true },
    ],
    cta: 'Upgrade to Unlimited',
    highlighted: true,
    stripeLink: 'prod_TdBrlxrdJb7eCK' // Stripe price ID
  }
];

export default function PricingPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleUpgrade = async (plan: typeof plans[0]) => {
    if (plan.id === 'free') return;
    
    setLoading(plan.id);
    
    try {
      // Call your Stripe checkout API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.stripeLink,
          planName: plan.name
        })
      });

      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
          <Crown className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-400 font-medium">Transparent Pricing</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Start free, upgrade when you need more power. No hidden fees, cancel anytime.
        </p>

        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
        >
          {showDetails ? (
            <>
              Hide Full Details
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View Full Comparison
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500 scale-105'
                  : 'bg-gray-900/50 border border-gray-800'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-bold">{plan.badge}</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>

                <button
                  onClick={() => handleUpgrade(plan)}
                  disabled={plan.id === 'free' || loading === plan.id}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : plan.id === 'free'
                      ? 'bg-gray-800 cursor-default'
                      : 'bg-gray-800 hover:bg-gray-700'
                  } ${loading === plan.id ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>

              {/* Top 3 Features Preview */}
              <div className="space-y-3">
                {plan.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={feature.included ? 'text-white' : 'text-gray-600'}>
                        {feature.name}
                      </p>
                      {feature.value && (
                        <p className="text-sm text-gray-500">{feature.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                {!showDetails && (
                  <p className="text-sm text-gray-500 pt-2">
                    + {plan.features.length - 3} more features
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        {showDetails && (
          <div className="max-w-6xl mx-auto bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-6 font-bold">Feature</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="p-6 text-center font-bold">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((_, featureIdx) => (
                    <tr key={featureIdx} className="border-b border-gray-800 last:border-0">
                      <td className="p-6 font-medium">
                        {plans[0].features[featureIdx].name}
                      </td>
                      {plans.map(plan => {
                        const feature = plan.features[featureIdx];
                        return (
                          <td key={plan.id} className="p-6 text-center">
                            {feature.included ? (
                              feature.value ? (
                                <div>
                                  <Check className="w-5 h-5 text-green-400 mx-auto mb-1" />
                                  <p className="text-sm text-gray-400">{feature.value}</p>
                                </div>
                              ) : (
                                <Check className="w-5 h-5 text-green-400 mx-auto" />
                              )
                            ) : (
                              <X className="w-5 h-5 text-gray-600 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-6 py-4">
            <Shield className="w-5 h-5 text-green-400" />
            <div className="text-left">
              <p className="font-semibold text-green-400">Secure Payment Processing</p>
              <p className="text-sm text-gray-400">
                Powered by Stripe. Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <details className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
              <summary className="font-semibold cursor-pointer">Can I cancel anytime?</summary>
              <p className="text-gray-400 mt-2">Yes! Cancel anytime from your account settings. No questions asked.</p>
            </details>
            
            <details className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
              <summary className="font-semibold cursor-pointer">What payment methods do you accept?</summary>
              <p className="text-gray-400 mt-2">We accept all major credit cards, debit cards, and digital wallets through Stripe.</p>
            </details>
            
            <details className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
              <summary className="font-semibold cursor-pointer">Can I upgrade or downgrade my plan?</summary>
              <p className="text-gray-400 mt-2">Yes! You can change your plan at any time. Changes are prorated automatically.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
