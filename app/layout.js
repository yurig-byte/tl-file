import './globals.css'

export const metadata = {
  title: 'TIMELIMITED FILE',
  description: '팝업 스토어 정보 앱',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TL FILE',
  },
}

export const viewport = {
  themeColor: '#E8F5D0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}