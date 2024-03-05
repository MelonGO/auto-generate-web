import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth';

export const runtime = 'edge'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
})

export async function POST(req: Request) {
    const session = await auth();

    if (session?.user?.name !== 'admin') {
        return new Response('Unauthorized', { status: 401 });
    }

    const json = await req.json()
    const { messages } = json

    const response = await openai.chat.completions.create({
        model: process.env.MODEL ? process.env.MODEL : 'gpt-3.5-turbo',
        messages,
        stream: true
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}