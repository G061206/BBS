import { createClient } from '@vercel/kv';

// 使用Vercel KV客户端
export const kv = createClient({
  url: "https://optimal-urchin-32101.upstash.io",
  token: "AX1lAAIjcDFiYjgyZGNmNjI5OTc0YTJiODg1MmQ5NmY2YzEwYzM0YnAxMA"
}); 