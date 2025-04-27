
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { concern, history } = await request.json();
    
   history.shift();

    if (!concern || typeof concern !== 'string' || !concern.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid concern" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || "",
    });

    const config = {
      responseMimeType: "application/json",
      systemInstruction: [
        {
          text: process.env.CONTEXT_KEY,
        },
      ],
    };

    const model = "gemini-2.5-flash-preview-04-17";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Give toxic positivity for this concern: "I lost my job, not sure what to do now"`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `{
"response": "Lost your job? Congratulations, the universe finally admitted you were wasting oxygen there! Stop whining and start hustling—mediocrity is a choice and you've been choosing it daily. Your excuses are the only thing impressive about your career so far. Time to prove you're actually worth employing or just admit you peaked at the interview."
}`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `Give toxic positivity for this concern: "My girlfriend left me, feeling sad"`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `{
"response": "She left you? Shocking! Your personality must have finally caught up with your looks. Consider this a gift—she freed you from having to pretend someone actually tolerated you. There are 8 billion people on earth, and statistically, several thousand might have lower standards. Stop being pathetic—your tears aren't moisturizer for your personality. Level up or stay single, champ."
}`,
          },
        ],
      },
    ];

    const mappedHistory = history.map((message: { role: string; text: string }) => ({
        role: message.role,
        parts: [{ text: message.text }],
      }));
  
    contents.push(...mappedHistory);
    contents.push({
      role: "user",
      parts: [
        {
          text: `Give toxic positivity for this concern: "${concern}"`,
        },
      ],
    });

    const responseStream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    // Collect the streamed response text
    let fullResponse = "";
    for await (const chunk of responseStream) {
      fullResponse += chunk.text;
    }

    // Parse the JSON response
    try {
      const parsedResponse = JSON.parse(fullResponse);
      return NextResponse.json({ response: parsedResponse.response });
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse the response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong, please try again later" },
      { status: 500 }
    );
  }
}