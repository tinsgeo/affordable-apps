import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Webhook signing secret from Stripe Dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    console.log('✅ Webhook received:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('💰 Payment successful:', session.id);
        
        // TODO: Update user's subscription in your database
        // const customerId = session.customer;
        // const subscriptionId = session.subscription;
        // const planName = session.metadata?.planName;
        
        // Example: Update Firebase or your database
        // await updateUserSubscription(customerId, {
        //   plan: planName,
        //   subscriptionId: subscriptionId,
        //   status: 'active'
        // });
        
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🔄 Subscription updated:', subscription.id);
        
        // TODO: Update subscription status in your database
        // await updateSubscriptionStatus(subscription.id, subscription.status);
        
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Subscription canceled:', subscription.id);
        
        // TODO: Downgrade user to free plan
        // await downgradeUserToFree(subscription.customer);
        
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('⚠️ Payment failed:', invoice.id);
        
        // TODO: Notify user of payment failure
        // await notifyPaymentFailed(invoice.customer_email);
        
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
