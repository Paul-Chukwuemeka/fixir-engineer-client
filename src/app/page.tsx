"use client";
import axios from "axios";
import { JSX, useEffect, useState } from "react";
import { NotionPageProperties } from "@/types";
import { NotionPage } from "@/types";
import Link from "next/link";
import Error from "@/components/error";
import Loading from "@/components/loading";

type NotionData = {
  results: NotionPage[];
  length: number;
  map: (
    arg0: (item: NotionPage, index: number) => JSX.Element
  ) => React.ReactNode;
};

export default function DashboardPage() {
  const [data, setData] = useState<NotionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    isError: boolean;
    message: string;
  } | null>(null);

  async function load() {
    setLoading(true);
    setError({
      isError: false,
      message: "",
    });
    try {
      const data = await axios.get("/api/notion-table");
      setData(data.data.results.slice().reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError({
        isError: true,
        message: "Failed to fetch data",
      });
    }
  }
  const time = 10000 * 6;

  useEffect(() => {
    load();
    const loadInterval = setInterval(() => {
      load();
    }, time);

    return () => clearInterval(loadInterval);
  }, [time]);

  return (
    <div className="p-6 flex flex-col gap-4">
      {loading && <Loading />}
      {error?.isError && <Error load={load} />}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">📊 Live Dashboard</h1>
        <button onClick={load}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            const props = (item as NotionPage)
              .properties as NotionPageProperties;
            console.log(item);
            return (
              <Link
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="flex gap-4 p-2 shadow-[0_0_2px] hover:scale-105 duration-500"
              >
                <p>
                  {props["Client Name"].rich_text[0]?.plain_text
                    ? props["Client Name"].rich_text[0]?.plain_text
                    : "Client Name unavailable"}
                </p>
                <p>
                  {new Date(
                    props["Created time"].created_time
                  ).toLocaleTimeString()}
                  ,
                  {new Date(
                    props["Created time"].created_time
                  ).toLocaleDateString()}

                  
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
