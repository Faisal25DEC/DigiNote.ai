import { NextRequest, NextResponse } from "next/server";
import { GPTUtils } from "@/utils/GPTUtils/GPTUtils";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { imageUrl } = await req.json();
      const gptClient = new GPTUtils();

      const response = await gptClient.transcribeImage(imageUrl);

      const aiResponse = response.choices[0].message.parsed;
      return NextResponse.json(aiResponse);
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.error();
  }
}
