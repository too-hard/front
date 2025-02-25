"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, removeAuthUser } from "./utils/auth"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Tour Booking App",
//   description: "Book your dream tour with us",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [])

  const handleLogout = () => {
    removeAuthUser()
    setIsAuth(false)
    router.push("/login")
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              TourBooker
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/tours">Tours</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              {!isAuth && (
                <>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                </>
              )}
              {isAuth && (
                <>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main className="container mx-auto mt-8 px-4">{children}</main>
        <footer className="bg-gray-200 mt-8 py-4">
          <div className="container mx-auto text-center">&copy; 2023 TourBooker. All rights reserved.</div>
        </footer>
      </body>
    </html>
  )
}
