"use client";

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

type Props = {
  title: string;
  teaser?: string | undefined;
  publishedOn?: DateLike;
  className?: string;
  locale?: string; 
};

export default function BlogItem({
  title,
  teaser,
  publishedOn,
  className = "",
  locale,
}: Props) {
  const d = toDateSafe(publishedOn);
  const formatted = formatDate(publishedOn, locale);

  return (
    <div className={`w-full flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 shadow-none ${className}`}>
      <div className="flex-1 min-w-0">
        <p className="break-words">{title}</p>
        <p className="text-sm max-w-full md:max-w-[66%] break-words text-primary/60">
          {teaser}
        </p>
      </div>

      <div className="shrink-0 md:ml-auto text-left md:text-right">
        <p className="text-sm whitespace-nowrap text-primary/60">
          Published on{" "}
          <time dateTime={d ? d.toISOString() : ""}>{formatted || "—"}</time>
        </p>
      </div>
    </div>
  );
}
