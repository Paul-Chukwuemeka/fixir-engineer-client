import { NextResponse } from "next/server";
import { fetchNotionData } from "@/lib/notion";

export async function GET() {
  try {
    const data = await fetchNotionData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
