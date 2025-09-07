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
import "highlight.js/styles/github.css";
import "./dev-to-markdown.css";

type Props = {
  content: string | undefined;
  className?: string; // e.g. "prose max-w-none"
};

export default function DevToMarkdown({
  content,
  className = "prose max-w-none",
}: Props) {
  return (
    <div
      className={`devto-article h-full w-full overflow-y-auto overflow-x-hidden ${className}`}
    >
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
          img: (props) => <img {...props} loading="lazy" decoding="async" />,
          code: ({ className, children, ...props }) => {
            // wrap both inline and block code to avoid horizontal overflow
            
            return (
              <code
                className={`block break-words whitespace-pre-wrap ${className ?? ""}`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="devto-pre break-words whitespace-pre-wrap overflow-x-hidden"
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
