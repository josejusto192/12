import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cuidar de Mim Também é Amor',
  description: 'Sua jornada de autocuidado começa aqui. Práticas simples e transformadoras para mulheres que merecem se priorizar.',
  keywords: ['autocuidado', 'wellness', 'saúde mental', 'mindfulness', 'mães', 'mulheres'],
  authors: [{ name: 'Cuidar de Mim' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF1493',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
