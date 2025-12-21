import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, planName } = await req.json();

    // Validate input
    if (!priceId || !planName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the app URL (for redirects)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Optional: Get user email from Firebase auth if available
    // You can add authentication check here and get user email
    // const userEmail = await getUserEmailFromAuth();

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Stripe Price ID from your dashboard
          quantity: 1,
        },
      ],
      mode: 'subscription',
      
      // Success redirect (after payment)
      success_url: `${appUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(planName)}`,
      
      // Cancel redirect (if user cancels)
      cancel_url: `${appUrl}/pricing?canceled=true`,
      
      // Additional settings
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      
      // Optional: Pre-fill customer email if you have it
      // customer_email: userEmail,
      
      // Metadata for tracking
      metadata: {
        planName: planName,
      },
      
      // Subscription settings
      subscription_data: {
        metadata: {
          planName: planName,
        },
      },
    });

    console.log('✅ Checkout session created:', session.id);

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    });

  } catch (error: any) {
    console.error('❌ Stripe checkout error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
