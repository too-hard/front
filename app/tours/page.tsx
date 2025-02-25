import Link from "next/link"
import Image from "next/image"
import { tours } from "../data/tours"

export default function Tours() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Available Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <div key={tour.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image
              src={tour.image || "/placeholder.svg"}
              alt={tour.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{tour.name}</h2>
              <p className="text-gray-600 mb-4">{tour.duration}</p>
              <p className="text-xl font-bold mb-4">${tour.price}</p>
              <Link
                href={`/tours/${tour.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors inline-block"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
