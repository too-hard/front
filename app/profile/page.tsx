"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getAuthUser } from "../utils/auth"

interface UserData {
  username: string
  email: string
  bookedTours: Array<{
    name: string
    date: string
  }>
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        router.push("/login")
        return
      }

      try {
        const userEmail = getAuthUser()
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "X-User-Email": userEmail || "",
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }
        const data = await response.json()
        setUserData(data)
      } catch (err) {
        setError("An error occurred while fetching user data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>
  }

  if (!userData) {
    return <div className="text-center mt-8">No user data available</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Booked Tours</h2>
        {userData.bookedTours.length > 0 ? (
          <ul className="list-disc list-inside">
            {userData.bookedTours.map((tour) => (
              <li key={tour.name} className="mb-2">
                {tour.name} - {tour.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tours booked yet.</p>
        )}
      </div>
    </div>
  )
}