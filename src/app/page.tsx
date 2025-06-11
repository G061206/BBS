'use client';

import { useState, useEffect } from 'react';

// 密码常量
const PASSWORD = 'hgqt@2025';

export default function Home() {
  // 状态管理
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [drawnMessage, setDrawnMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 从localStorage加载提交状态
  useEffect(() => {
    const submitted = localStorage.getItem('hasSubmitted') === 'true';
    setHasSubmitted(submitted);
  }, []);

  // 验证密码
  const handleAuthenticate = () => {
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('密码错误，请重试');
    }
  };

  // 提交留言
  const handleSubmit = async () => {
    if (!message.trim()) {
      setError('留言内容不能为空');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, password: PASSWORD }),
      });

      // 检查响应是否为JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`服务器未返回JSON: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `提交失败: ${response.status}`);
      }

      // 更新状态
      setMessage('');
      setHasSubmitted(true);
      localStorage.setItem('hasSubmitted', 'true');
      setSuccessMessage('留言提交成功！');

      // 3秒后清除成功消息
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('提交出错:', err);
      setError(err.message || '提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 抽取随机留言
  const handleDrawMessage = async () => {
    setIsDrawing(true);
    setError(null);

    try {
      const response = await fetch(`/api/messages/random?password=${PASSWORD}`);
      
      // 检查响应是否为JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`服务器未返回JSON: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `获取失败: ${response.status}`);
      }

      setDrawnMessage(data.message);
    } catch (err: any) {
      console.error('抽取留言出错:', err);
      setError(err.message || '获取留言失败，请稍后重试');
    } finally {
      setIsDrawing(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">杭高钱塘留言板</h1>

        {!isAuthenticated ? (
          // 密码验证视图
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">请输入密码</h2>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
              />
            </div>
            <button
              onClick={handleAuthenticate}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              进入
            </button>
            {error && <p className="mt-3 text-red-500 text-sm text-center">{error}</p>}
          </div>
        ) : (
          // 主功能视图
          <div className="space-y-6">
            {/* 提交区 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-black">留下你的祝福</h2>
              <div className="mb-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="在这里写下你的留言..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-2 rounded-md transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? '提交中...' : '提交留言'}
              </button>
              {successMessage && (
                <p className="mt-3 text-green-500 text-sm text-center">{successMessage}</p>
              )}
            </div>

            {/* 抽取区 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-black">抽取留言</h2>
              <div className="mb-4 min-h-[80px] p-4 border border-gray-200 rounded-md bg-gray-50">
                {drawnMessage ? (
                  <p className="text-gray-800">{drawnMessage}</p>
                ) : (
                  <p className="text-gray-400 italic">点击下方按钮抽取留言</p>
                )}
              </div>
              <button
                onClick={handleDrawMessage}
                disabled={!hasSubmitted || isDrawing}
                className={`w-full py-2 rounded-md transition-colors ${
                  !hasSubmitted || isDrawing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isDrawing ? '抽取中...' : '随机抽取一条'}
              </button>
              {!hasSubmitted && (
                <p className="mt-3 text-amber-500 text-sm text-center">
                  请先提交留言才能抽取
                </p>
              )}
            </div>

            {error && <p className="mt-3 text-red-500 text-sm text-center">{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
