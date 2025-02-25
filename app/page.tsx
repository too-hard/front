import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="text-center">
      <div className="relative h-[400px] mb-8">
        <Image
          src="/images/home.jpg"
          alt="Beautiful travel destination"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome to TourBooker</h1>
          <p className="text-xl mb-8">Discover and book amazing tours around the world!</p>
          <Link
            href="/tours"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors"
          >
            Explore Tours
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Unforgettable Experiences</h2>
          <p>Embark on journeys that will create lasting memories.</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Expert Local Guides</h2>
          <p>Learn from knowledgeable guides who know the destinations inside out.</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Hassle-free Booking</h2>
          <p>Easy and secure booking process for your peace of mind.</p>
        </div>
      </div>
    </div>
  )
}