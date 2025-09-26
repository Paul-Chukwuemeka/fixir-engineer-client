export async function fetchNotionData() {
    const secret = process.env.NOTION_SECRET
    const db = process.env.NOTION_DB


    const res = await fetch(
        `https://api.notion.com/v1/databases/${db}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
    }
    )

     if (!res.ok) throw new Error("Failed to fetch Notion data");

     return res.json();
}