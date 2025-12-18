import { NextRequest, NextResponse } from 'next/server';

// Increase timeout for API routes
export const maxDuration = 60; // 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  console.log('🚀 API route called');
  
  try {
    const body = await req.json();
    const { prompt } = body;
    
    console.log('📝 Received prompt:', prompt?.substring(0, 100));

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

    console.log('🔑 API key found, calling Claude API...');

    // Call Claude API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55 second timeout

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-opus-4-5-20251101',
          max_tokens: 16384,
          messages: [{
            role: 'user',
            content: `You are an expert web developer. Create a complete, beautiful, responsive HTML website based on this description: "${prompt}"

Requirements:
- Single HTML file with embedded CSS and JavaScript
- Modern, professional design with animations
- Fully responsive (mobile, tablet, desktop)
- Keep it CONCISE - don't create overly complex mega-files
- Use semantic HTML5
- Include beautiful gradients and modern UI
- Make it visually stunning but COMPLETE
- Use a cohesive color scheme
- Include realistic placeholder content

CRITICAL: 
1. Return ONLY complete, valid HTML starting with <!DOCTYPE html> and ending with </html>
2. Keep the code efficient and not overly long
3. No explanations, no markdown code blocks, just pure HTML
4. Make sure to close ALL tags properly`
          }]
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('📊 Claude API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Claude API error:', response.status, errorText);
        return NextResponse.json(
          { 
            error: `Claude API returned error ${response.status}`,
            details: errorText.substring(0, 200)
          },
          { status: 500 }
        );
      }

      const data = await response.json();
      console.log('✅ Received response from Claude');

      // Extract HTML
      if (!data.content || !data.content[0] || !data.content[0].text) {
        console.error('❌ Unexpected response format:', JSON.stringify(data).substring(0, 200));
        return NextResponse.json(
          { error: 'Unexpected response format from Claude API' },
          { status: 500 }
        );
      }

      let htmlContent = data.content[0].text;

      // Clean up markdown if present
      htmlContent = htmlContent
        .replace(/```html\n?/gi, '')
        .replace(/```\n?/g, '')
        .trim();
      
      // Verify it starts with DOCTYPE or <html>
      if (!htmlContent.startsWith('<!DOCTYPE') && !htmlContent.startsWith('<html')) {
        console.error('⚠️ HTML does not start with DOCTYPE or <html>');
        console.error('First 200 chars:', htmlContent.substring(0, 200));
      }
      
      // Check if HTML is complete
      if (!htmlContent.includes('</html>')) {
        console.warn('⚠️ HTML may be incomplete - missing closing </html> tag');
        console.warn('Response may have been truncated. Consider simplifying the prompt.');
      }

      console.log('📦 Sending HTML response, length:', htmlContent.length);
      console.log('📦 First 100 chars:', htmlContent.substring(0, 100));
      console.log('📦 Last 100 chars:', htmlContent.substring(htmlContent.length - 100));

      return NextResponse.json({ 
        html: htmlContent,
        success: true 
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('⏱️ Request timeout after 55 seconds');
        return NextResponse.json(
          { error: 'Request timed out. Claude API took too long to respond. Please try again.' },
          { status: 504 }
        );
      }
      throw fetchError;
    }

  } catch (error: any) {
    console.error('❌ Unexpected error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred',
        details: error.message,
        type: error.constructor?.name || 'Unknown'
      },
      { status: 500 }
    );
  }
}
