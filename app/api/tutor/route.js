
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "אתה מורה אישי לסטודנטים בקורס מקרו כלכלה. ענה בצורה פשוטה, ברורה וקצרה עם דוגמאות כשצריך.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return new Response(
      JSON.stringify({ reply: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
