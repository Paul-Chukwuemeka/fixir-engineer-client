"use client";
import { useEffect, useState } from "react";

type NotionData = {
  results: unknown[];
};

export default function DashboardPage() {
  const [data, setData] = useState<NotionData | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const parsed: NotionData = JSON.parse(event.data);
      setData(parsed);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">📊 Live Dashboard</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
