import axios from "axios";


export async function fetchNotionData() {
  const secret = process.env.NOTION_SECRET;
  const db = process.env.NOTION_DATABASE_ID;
  const url = `https://api.notion.com/v1/databases/${db}/query`;
  const config = {
    headers: {
      Authorization: `Bearer ${secret}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  };

  const res = await axios.post(url, { page_size: 100 }, config);

  return res.data
}
