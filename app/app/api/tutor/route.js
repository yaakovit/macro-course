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
          content: "אתה עוזר אישי לסטודנטים בקורס מאקרו כלכלה. ענה בעברית פשוטה, ברורה וקצרה עם דוגמאות כשצריך."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return new Response(
      JSON.stringify({
        reply: response.choices[0].message.content
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        reply: "אירעה שגיאה בחיבור לעוזר האישי."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
