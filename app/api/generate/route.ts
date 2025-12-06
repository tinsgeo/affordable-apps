import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  console.log('🚀 API route called');
  
  try {
    const { prompt } = await req.json();
    console.log('📝 Received prompt:', prompt);

    if (!prompt || typeof prompt !== 'string') {
      console.error('❌ Invalid prompt');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check API key
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('❌ No API key found');
      return NextResponse.json(
        { error: 'API key not configured. Check .env.local file.' },
        { status: 500 }
      );
    }

    console.log('🔑 API key found, initializing Anthropic...');
    const anthropic = new Anthropic({ apiKey });

    console.log('🤖 Calling Claude API...');
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `You are an expert web developer. Create a complete, beautiful, responsive HTML website based on this description: "${prompt}"

Requirements:
- Single HTML file with embedded CSS and JavaScript
- Modern, professional design with smooth animations
- Fully responsive (mobile, tablet, desktop)
- Use semantic HTML5
- Include beautiful gradients, shadows, and modern UI elements
- Add hover effects and transitions
- Make it visually stunning and production-ready
- Use a cohesive color scheme
- Include realistic placeholder content that fits the theme

IMPORTANT: Return ONLY the complete HTML code starting with <!DOCTYPE html>. No explanations, no markdown code blocks, just pure HTML.`
        }
      ]
    });

    console.log('✅ Received response from Claude');

    // Extract the HTML from Claude's response
    let htmlContent = '';
    if (message.content[0].type === 'text') {
      htmlContent = message.content[0].text;
    }

    // Clean up the response (remove markdown code blocks if present)
    const cleanHtml = htmlContent
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    console.log('📦 Sending HTML response (length:', cleanHtml.length, 'chars)');

    return NextResponse.json({ 
      html: cleanHtml,
      success: true 
    });

  } catch (error: any) {
    console.error('❌ API Error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate website',
        details: error.message,
        type: error.constructor.name
      },
      { status: 500 }
    );
  }
}

// Disable static optimization for this route
export const dynamic = 'force-dynamic';
