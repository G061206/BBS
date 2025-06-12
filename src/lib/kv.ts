import { createClient } from '@vercel/kv';

// 使用Vercel KV客户端
export const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN
}); 
