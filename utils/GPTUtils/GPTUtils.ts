import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { z } from "zod";

const ImageTranscription = z.object({
  markdownString: z.string(),
  htmlString: z.string(),
});
export class GPTUtils {
  openaiClient = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  constructor() {
    this.openaiClient = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
  }

  generatePrompt() {
    const systemPrompt = `"You are an advanced AI trained to transcribe and describe images in exhaustive detail. Your goal is to analyze the image presented to you and provide a comprehensive, accurate transcription of everything visible.`;
    return systemPrompt;
  }
  async generateText({
    messages = [],
    model = "gpt-4o-mini",
  }: {
    messages: ChatCompletionMessageParam[];
    model: string;
  }) {
    const response = await this.openaiClient.chat.completions.create({
      model,
      messages,
    });
    return response;
  }
  async transcribeImage(imageUrl: string) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "user",
        content:
          //   "YOU ARE PROVIDED WITH A IMAGE FROM USER. PLEASE DESCRIBE THE IMAGE.",
          [
            {
              type: "text",
              text: "Please transcribe this image content in a markdown. Use correct markdown symbols.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl.split("?")[0],
              },
            },
          ],
      },
    ];
    const response = await this.openaiClient.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: messages,
      response_format: zodResponseFormat(
        ImageTranscription,
        "image_transcription"
      ),
    });
    return response;
  }
}
