"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { h } from "hastscript";
import "highlight.js/styles/vs2015.css"; // VS Code-like dark theme
import "@/css/markdown.css";

type Props = {
  content: string | undefined;
  heading?: string;
  className?: string;
};

export default function MarkdownView({
  content,
  heading,
  className = "prose max-w-none",
}: Props) {
  return (
    <div
      className={`devto-article h-full w-full overflow-y-auto overflow-x-hidden ${className}`}
    >
      {heading && <h1 className="text-3xl font-bold mt-6 mb-4">{heading}</h1>}

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: { className: ["devto-anchor"] },
              content: () =>
                h("span", { ariaHidden: "true", class: "devto-hash" }, "#"),
            },
          ],
          rehypeHighlight,
        ]}
        components={{
          a: (props) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          code: ({ node, className, children, ...props }) => (
            <code
              className={`text-sm font-mono bg-[#1e1e1e] text-[#d4d4d4] px-1 py-0.5 rounded ${className ?? ""}`}
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ children, ...props }) => (
            <pre
              className="bg-[#1e1e1e] text-[#d4d4d4] rounded-lg p-4 my-4 overflow-x-auto font-mono text-sm shadow-sm"
              {...props}
            >
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
