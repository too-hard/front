import { NextResponse } from "next/server"

interface RegisterJSON
{
    username:string;
    email:string;
    password: string;
}

const url = 'http://localhost:8000/api/register/';

export async function POST(request: Request) {
  const res = await request.json()
  console.log("Регистрация пользователя:", res)
  var resp = sendDataViaFetch(res)
  return NextResponse.json({ message: resp })
}

async function sendDataViaFetch(json:RegisterJSON)
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

        return "Ошибка регистрации. Обратитесь к администратору"

    } else if (response.body !== null) {
        const asString = await streamToString(response.body);
        console.log("ответ от сервера:", asString)
    }

    return "Регистрация успешна"
}

async function streamToString(stream) {
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
}