// app/api/price/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { data } = body;

  const messages = [
    {
      role: 'system',
      content:
        'Bạn là một chuyên gia định giá bất động sản tại Việt Nam. Hãy ước lượng giá bán hợp lý cho căn nhà người dùng nhập và giải thích ngắn gọn vì sao.',
    },
    {
      role: 'user',
      content: `Thông tin căn nhà: ${data}`,
    },
  ];

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
    }),
  });

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content || 'Không thể định giá.';

  return NextResponse.json({ result: content });
}
