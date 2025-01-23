import { Toaster } from "@/components/ui/sonner"
import Navbar from "./components/layout/Navbar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
