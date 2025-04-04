import './globals.css'
import type {ReactNode} from 'react'
import ReactQueryClientProvider from "@/component/ReactQueryClientProvider";

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en">
    <body>
    <ReactQueryClientProvider>
      {children}
    </ReactQueryClientProvider>
    </body>
    </html>
  )
}
