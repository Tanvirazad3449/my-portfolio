"use client";

import { useRouter } from "next/navigation";
import React from "react";

type FirestoreTs = { toDate: () => Date };
type DateLike = Date | FirestoreTs | number | string | null | undefined;

function toDateSafe(v: DateLike): Date | undefined {
  if (!v) return undefined;
  if (v instanceof Date) return v;
  if (typeof v === "number") return new Date(v);
  if (typeof v === "string") return new Date(v);
  if (typeof v === "object" && "toDate" in v && typeof v.toDate === "function") {
    return v.toDate();
  }
  return undefined;
}

function formatDate(v: DateLike, locale?: string) {
  const d = toDateSafe(v);
  if (!d || isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}


export default function BlogItem({ id, publishedOn, title, teaser }: FirestoreDocType) {
  const d = toDateSafe(publishedOn);
  const formatted = formatDate(publishedOn);
  const router = useRouter()

  return (
    <button
      key={id}
      className="bg-primary/5 hover:bg-primary/10 justify-between start cursor-pointer flex flex-col md:flex-row w-full p-4 rounded-md"
      onClick={() =>
        router.push(`blogs/${id}`)
      }
    >
      <div>
        <p className="break-words text-left font-bold mb-1">{title}</p>
        <p className="text-sm text-left break-words overflow-wrap-anywhere text-primary/80 line-clamp-2">
          {teaser}
        </p>
      </div>

        <p className="text-xs text-primary text-left">
          Published on{" "}
          <time dateTime={d ? d.toISOString() : ""}>{formatted || "—"}</time>
        </p>
    </button>
  );
}
