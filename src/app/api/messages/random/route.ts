import { NextResponse } from 'next/server';
import { kv } from '@/lib/kv';

// 密码常量
const PASSWORD = 'hgqt@2025';

export async function GET(request: Request) {
  try {
    // 从URL获取密码参数
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    // 验证密码
    if (!password || password !== PASSWORD) {
      return NextResponse.json({ error: '密码错误或未提供' }, { status: 401 });
    }

    // 获取所有留言
    const messages = await kv.lrange('messages', 0, -1);

    // 检查留言列表是否为空
    if (!messages || messages.length === 0) {
      return NextResponse.json({ message: '暂无留言，请先添加留言' });
    }

    // 随机选择一条留言
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    // 返回随机留言
    return NextResponse.json({ message: randomMessage });
  } catch (error) {
    console.error('获取随机留言失败:', error);
    return NextResponse.json({ error: '获取失败，请稍后重试' }, { status: 500 });
  }
} 