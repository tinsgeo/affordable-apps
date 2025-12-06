import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  console.log('🚀 API route called');
  
  try {
    const body = await req.json();
    const { prompt } = body;
    
    console.log('📝 Received prompt:', prompt?.substring(0, 100) + '...');

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
      console.error('❌ No API key found in environment');
      return NextResponse.json(
        { 
          error: 'API key not configured. Please add NEXT_PUBLIC_ANTHROPIC_API_KEY to Vercel environment variables.' 
        },
        { status: 500 }
      );
    }

    console.log('🔑 API key found, calling Claude...');

    // Call Anthropic API directly
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
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

CRITICAL: Return ONLY the complete HTML code starting with <!DOCTYPE html>. No explanations, no markdown code blocks, no backticks, just pure HTML.`
          }
        ]
      })
    });

    console.log('📊 Claude API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', errorText);
      return NextResponse.json(
        { 
          error: `Claude API error: ${response.status}`,
          details: errorText
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('✅ Received response from Claude');

    // Extract HTML from response
    let htmlContent = '';
    if (data.content && data.content[0] && data.content[0].text) {
      htmlContent = data.content[0].text;
    } else {
      console.error('❌ Unexpected response format:', data);
      return NextResponse.json(
        { error: 'Unexpected response format from Claude' },
        { status: 500 }
      );
    }

    // Clean up markdown if present
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
    console.error('❌ Error in API route:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate website',
        details: error.message,
        type: error.constructor?.name || 'Unknown'
      },
      { status: 500 }
    );
  }
}
