/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除 output: 'export' 配置，让 Vercel 使用默认的服务端渲染
  trailingSlash: false,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig