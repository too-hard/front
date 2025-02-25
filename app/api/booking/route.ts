import { NextResponse } from "next/server"

interface BookingJSON
{
    email:string;
    tourID: number;
    tourName: string;
    tourDate: string;
}

const url = 'http://localhost:8000/api/booking/';

export async function POST(request: Request) {
  const res = await request.json()
  console.log("Бронирование тура:", res)

  const { tourId, userEmail } = res
  if (!tourId || !userEmail) {
    return NextResponse.json({ error: "Missing tourId or userEmail" }, { status: 400 })
  }

  var resp = sendDataViaFetch(res)
  return NextResponse.json({ message: resp })
}

async function sendDataViaFetch(json:BookingJSON)
{
    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from("admin:admin").toString('base64'),
        })
    });

    const response = await fetch(request)

    if (!response.ok) {
        console.error("not ok, status:", response.status)

        if (response.body !== null) {
            const asString = await streamToString(response.body);
            console.error("ответ от сервера:", asString)
        }

        return "Ошибка бронирования. Обратитесь к администратору"

    } else if (response.body !== null) {
        const asString = await streamToString(response.body);
        console.log("ответ от сервера:", asString)
    }

    return "Бронирование успешно"
}

async function streamToString(stream) {
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
}