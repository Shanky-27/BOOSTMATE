import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private API_KEY = 'AIzaSyD8hx5jBVGhiAlNaFCcHJbkUcmmRVgk96k';
  private url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.API_KEY}`;

  async generate(niche: string): Promise<string> {
    const body = {
      contents: [
        {
          parts: [
            {
              text: `You are a content generation assistant. Respond in a clear and consistently structured format.

Niche: "${niche}"

Provide:
1. 🎧 3 trending Reels audios (title and artist), format: "🎧 Audio: [Title] - [Artist] - [Why it's trending]"
2. 🎬 Viral content formats (short bullet points, one per line)
3. ✍ Captions + hashtags (include 1 caption + 5–10 hashtags per category)
4. 📅 Best time to post (bullet points with recommended time slots)
5. the links for audio should point to youtube or youtube music which should be correct link 

Make the output structured and consistent. Do NOT use Markdown (no **bold**, ## headings, etc.). Only use emoji icons (🎧, 🎬, ✍, 📅) to indicate categories.
return a JSON object with the following structure:
{
  "audios": [
    {
      "title": "",
      "artist": "",
      "description": "",
      "links":""
    },
    ...
  ],
  "formats": ["", "", ...],
  "captions": [
    {
      "caption": "",
      "hashtags": ["", "", ...]
    }
  ],
  "postingTimes": ["", "", ...]
}

Only return a valid JSON object, no extra commentary.`
            },
          ],
        },
      ],
    };

    const res = await axios.post(this.url, body);
    console.log(res)
    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No result.';
  }
}
