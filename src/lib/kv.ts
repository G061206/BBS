import { createClient } from '@vercel/kv';

// 使用Vercel KV客户端
export const kv = createClient({
  url: process.env.KV_URL || "https://optimal-urchin-32101.upstash.io",
  token: process.env.KV_REST_API_TOKEN || "AX1lAAIjcDFiYjgyZGNmNjI5OTc0YTJiODg1MmQ5NmY2YzEwYzM0YnAxMA"
}); 