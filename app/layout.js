import './globals.css'

export const metadata = {
  title: '复利魅力体验器',
  description: '体验时间与复利的神奇力量',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}