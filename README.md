# 杭高钱塘留言板

这是一个使用 [Next.js]创建的留言板项目，用于毕业留言。

## 功能

- 密码保护的留言系统
- 提交留言功能
- 随机抽取留言功能
- 使用Vercel一键部署

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


## 页面文件导航

可快速修改前端代码，使网页显示你需要的内容  
项目使用Next.js的App Router结构，主要文件如下：  

主页面：src/app/page.tsx - 主要的留言板界面  
布局文件：src/app/layout.tsx - 应用程序的主布局  
样式文件：src/app/globals.css - 全局CSS样式  
API路由：src/app/api/messages/route.ts - 处理留言提交  
         src/app/api/messages/random/route.ts - 处理随机获取留言  

## 修改字号和颜色的方法  

项目使用Tailwind CSS进行样式设计，您可以通过以下方式修改UI：  

1. 修改字号  
在Tailwind CSS中，字号通过text-{size}类来控制，例如：  
text-xs - 极小  
text-sm - 小  
text-base - 基本（默认）  
text-lg - 大  
text-xl - 特大  
text-2xl, text-3xl, text-4xl等 - 更大的字号  

2. 修改颜色
Tailwind CSS中，颜色通过以下类来控制：  
文本颜色：text-{color}-{shade}  
背景颜色：bg-{color}-{shade}  
边框颜色：border-{color}-{shade}  
颜色包括：gray, red, yellow, green, blue, indigo, purple, pink等  
色调范围从100到900，如blue-100（浅）到blue-900（深）  

3. 修改背景渐变  
要修改页面背景渐变，找到src/app/page.tsx中的main元素  

4. 修改全局样式  
如果您想修改全局样式，可以编辑src/app/globals.css文件

