import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const completion = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: `Create a complete, beautiful, responsive website using only HTML, Tailwind CSS (via CDN), and vanilla JavaScript. The user wants: ${prompt}

Return ONLY the full <html> code, nothing else. No explanations, no markdown.`
      }
    ]
  });

  const html = completion.content[0].type === "text" ? completion.content[0].text : "";

  return Response.json({ html });
}
