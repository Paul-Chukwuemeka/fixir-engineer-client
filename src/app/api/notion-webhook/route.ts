import { NextRequest, NextResponse } from "next/server";
import { broadcast } from "../stream/route";

const NOTION_TOKEN = process.env.NOTION_SECRET!;
const DATABASE_ID = process.env.NOTION_DB!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Webhook received:", body);

  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  broadcast(data);

  return NextResponse.json({ status: "update pushed" });
}
