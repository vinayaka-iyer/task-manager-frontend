import { Toaster } from "@/components/ui/sonner"
import Navbar from "./components/layout/Navbar"
import { Outlet } from "react-router-dom"

export default function RootLayout({ children }) {
  return (
    <>
        <Navbar />
        <Outlet />
        <main>{children}</main>
        <Toaster />
        </>
  )
}
