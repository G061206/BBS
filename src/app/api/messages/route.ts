import { NextResponse } from 'next/server';
import { kv } from '@/lib/kv';

// 密码常量
const PASSWORD = 'hgqt@2025';

export async function POST(request: Request) {
  try {
    // 解析请求体
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('解析JSON失败:', e);
      return NextResponse.json({ error: '无效的请求格式' }, { status: 400 });
    }
    
    const { message, password } = body;

    // 验证密码
    if (password !== PASSWORD) {
      return NextResponse.json({ error: '密码错误' }, { status: 401 });
    }

    // 验证留言内容
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: '留言内容不能为空' }, { status: 400 });
    }

    try {
      // 将留言存入KV数据库
      await kv.lpush('messages', message);
    } catch (kvError) {
      console.error('KV存储错误:', kvError);
      return NextResponse.json({ error: '数据库操作失败' }, { status: 500 });
    }

    // 返回成功响应
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('提交留言失败:', error);
    return NextResponse.json({ error: '提交失败，请稍后重试' }, { status: 500 });
  }
} 