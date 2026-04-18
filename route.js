import OpenAI from "openai";

export async function POST(req) {
  const { message } = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "אתה עוזר אישי לסטודנטים בקורס מאקרו כלכלה. ענה בעברית פשוטה וברורה עם דוגמאות."
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  return new Response(JSON.stringify({
    reply: response.choices[0].message.content
  }));
}
