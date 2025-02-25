import { NextResponse } from "next/server"

interface LoginJSON
{
    email:string;
    password: string;
}

const url = 'http://localhost:8000/api/login/';

export async function POST(request: Request) {
  const res = await request.json()

  console.log("Попытка входа:", res)
  var resp = await sendDataViaFetch(res)

  if (resp == "Вход выполнен успешно") {
      return NextResponse.json({ message: resp})
  }
  return NextResponse.json({ error: resp}, {status: 401})
}

async function sendDataViaFetch(json:LoginJSON)
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
        console.log("not ok, status:", response.status)

        if (response.body !== null) {
            const asString = await streamToString(response.body);
            console.log("ответ от сервера:", asString)
        }

        return "Неправильное имя пользователя или пароль"

    } else if (response.body !== null) {
        const asString = await streamToString(response.body);
        console.log("ответ от сервера:", asString)
    }

    return "Вход выполнен успешно"
}

async function streamToString(stream) {
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
}