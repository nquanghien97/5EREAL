import { tavily } from "@tavily/core";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { MessageContent } from "openai/resources/beta/threads/messages.mjs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function extractText(content: MessageContent[]): string {
  for (const block of content) {
    if (block.type === "text") {
      return block.text.value;
    }
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const { name, area, price } = await req.json();
    const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY! });

    // 1. Tìm kiếm trên Tavily
    const response = await tvly.search(
      `Hãy tìm kiếm thông tin về giá bất động sản mới nhất trong vòng 1 tháng ở ${name}`,
      {
        searchDepth: "advanced",
        includeRawContent: "text",
      }
    );

    // 2. Tạo thread
    const thread = await client.beta.threads.create();

    // 3. Thêm message vào thread
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Hãy định giá bất động sản dựa vào các thông tin sau:
        - Đây là thông tin bất động sản từ các trang báo: ${JSON.stringify(response.results)},
        - Đây là thông tin bất động sản từ người dùng: Diện tích: ${area} m2, Giá: ${price} VNĐ, tên: ${name}.`,
    });

    // 4. Tạo run
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_DINH_GIA_BDS_ASSISTANT_ID!, // Assistant đã setup schema
    });

    // 5. Poll tới khi run hoàn thành
    let runStatus = await client.beta.threads.runs.retrieve(run.id, {
      thread_id: thread.id,
    });
    while (runStatus.status !== "completed" && runStatus.status !== "failed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await client.beta.threads.runs.retrieve(run.id, {
        thread_id: thread.id,
      });
    }

    if (runStatus.status === "failed") {
      return NextResponse.json(
        { message: "Run failed", details: runStatus.last_error },
        { status: 500 }
      );
    }

    // 6. Lấy message cuối cùng đã format
    const messages = await client.beta.threads.messages.list(thread.id);
    const lastMsg = messages.data[0];
    const formatted = extractText(lastMsg.content);

    return NextResponse.json({
      results: JSON.parse(formatted),
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 });
  }
}