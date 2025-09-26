import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    try {
        console.log(body);

        return NextResponse.json({ message: "Request successful", data: body });
    } catch (error) {
        return NextResponse.json({ message: "Request failed", error });
    }
}