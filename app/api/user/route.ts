import { type NextRequest, NextResponse } from "next/server"

interface RespJSON
{
  username: string
  email: string
  bookedTours: [{
    name: string
    date: string
  }]
}

const url = 'http://localhost:8000/api/user/';

export async function GET(request: NextRequest) {
  const userEmail = request.headers.get("X-User-Email")

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  console.error("Получение профиля:", userEmail)

  var resp = await sendDataViaFetch(userEmail)

  if (resp == "Пользователь не найден") {
      return NextResponse.json({ error: resp}, {status: 404})

  }
  return resp
}

async function sendDataViaFetch(mail)
{
    var request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from("admin:admin").toString('base64'),
            'X-User-Email': mail,
        })
    });

    const response = await fetch(request)
    if (!response.ok) {
        console.log("not ok, status:", response.status)

        if (response.body !== null) {
            const asString = await streamToString(response.body);
            console.log("ответ от сервера:", asString)
        }

        return "Пользователь не найден"

    } else if (response.body == null) {
        console.error("body is null")
        return "Пользователь не найден"
    }

    const bodyAsString = await streamToString(response.body)

    if (bodyAsString !== null) {
        let respJSON: RespJSON = JSON.parse(bodyAsString)
        console.error(respJSON)
        return NextResponse.json(respJSON)
    }
    return "Пользователь не найден"
}

async function streamToString(stream) {
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
}