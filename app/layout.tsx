import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import ThemeProvider from '@/context/theme-provider'
import DataProvider from '@/context/data-provider'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban Management App',
  description: 'Streamline your workflow with our powerful Kanban management app. Organize tasks, collaborate seamlessly, and boost productivity with visual boards, customizable columns, and drag-and-drop functionality. Stay in control of your projects, track progress, and manage deadlines effortlessly. Experience efficient task management like never before!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <DataProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </DataProvider>
      </body>
    </html>
  )
}
