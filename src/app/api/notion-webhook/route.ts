import { NextRequest, NextResponse } from "next/server";
import { broadcast } from "../stream/route";

const NOTION_TOKEN = process.env.NOTION_SECRET!;
const DATABASE_ID = process.env.NOTION_DB!;

function fetchWithTimeout(resource: string, options: RequestInit = {}, timeout = 10000) {
  return Promise.race([
    fetch(resource, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)),
  ]);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook received:", body);

    let data = null;

    try {
      const res = await fetchWithTimeout(
        `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${NOTION_TOKEN}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
        },
        10000 // 10 seconds
      );
      if (res instanceof Response) {
        data = await res.json();
      } else {
        throw new Error("Notion API did not return a valid response");
      }
    } catch (err) {
      console.error("Notion API fetch failed:", err);
      return NextResponse.json({ status: "error", error: "Notion API request failed or timed out" }, { status: 504 });
    }

    broadcast(data);
    return NextResponse.json({ status: "update pushed" });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ status: "error", error: "Internal server error" }, { status: 500 });
  }
}
