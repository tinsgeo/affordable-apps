// app/api/deploy/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { html, projectName } = await req.json();

  const token = process.env.VERCEL_TOKEN;
  if (!token) return NextResponse.json({ error: "Missing Vercel token" }, { status: 500 });

  // Create deployment via Vercel API
  const res = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      files: [
        {
          file: 'index.html',
          data: html,
        },
      ],
      projectSettings: {
        framework: null,
      },
      target: 'production',
    }),
  });

  const data = await res.json();

  if (data.error) {
    return NextResponse.json({ error: data.error.message });
  }

  return NextResponse.json({
    url: `https://${data.url}`,
  });
}
