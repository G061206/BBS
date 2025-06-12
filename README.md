# 杭高钱塘留言板

这是一个使用 [Next.js]创建的留言板项目，用于毕业留言。

## 功能

- 密码保护的留言系统
- 提交留言功能
- 随机抽取留言功能
- 使用Vercel KV (Redis)存储数据

## 本地测试

首先，安装依赖：

```bash
npm install
# 或
yarn install
```

然后，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 部署到 Vercel

1. 将代码推送到GitHub仓库
2. 在Vercel上连接GitHub仓库
3. 配置以下环境变量：
   - `KV_URL` - Upstash Redis实例的URL (https://...)
   - `KV_REST_API_TOKEN` - Upstash Redis访问令牌
   - `KV_REST_API_READ_ONLY_TOKEN` - (可选) 只读令牌

## 本地开发

要在本地开发和测试项目，请创建一个`.env.local`文件并添加以下环境变量：

```
KV_URL=https://your-instance.upstash.io
KV_REST_API_TOKEN=your-token-here
```

## 技术栈

- [Next.js 15](https://nextjs.org/) - React框架
- [React 19](https://react.dev/) - UI库
- [Tailwind CSS 4](https://tailwindcss.com/) - 样式
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) - 数据存储
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

