"use client"

import Image from "next/image"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { tours } from "../../data/tours"
import { isAuthenticated, getAuthUser } from "../../utils/auth"

export default function TourDetails({ params }: { params: Promise<{ id: string }> }) {
  const {id} = use(params)
  const router = useRouter()
  const [isBooking, setIsBooking] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const tour = tours.find((t) => t.id === Number.parseInt(id))

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [])

  if (!tour) {
    return <div className="text-center text-2xl mt-8">Tour not found</div>
  }

  const handleBooking = async () => {
    if (!isAuth) {
      router.push("/login")
      return
    }
    setIsBooking(true)
    const userEmail = getAuthUser()
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tourId: tour.id, userEmail }),
    })
    const data = await response.json()
    console.log(data)
    setIsBooking(false)
    if (response.ok) {
      router.push("/profile")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{tour.name}</h1>
      <div className="mb-8 relative h-[400px]">
        <Image
          src={tour.image || "/placeholder.svg"}
          alt={tour.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-xl mb-4">{tour.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">${tour.price}</p>
            <p className="text-gray-600">{tour.duration}</p>
          </div>
          <button
            className={`bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-colors ${isBooking ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleBooking}
            disabled={isBooking}
          >
            {isBooking ? "Booking..." : "Book Now"}
          </button>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Professional local guide</li>
          <li>Entrance fees to attractions</li>
          <li>Comfortable transportation</li>
          <li>Daily breakfast</li>
          <li>24/7 customer support</li>
        </ul>
      </div>
    </div>
  )
}
