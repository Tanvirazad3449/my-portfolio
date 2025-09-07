'use client'
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";

type BlogDoc = {
  title: string;
  content: string;
  updatedAt?: { seconds: number };
};

export default function BlogDetail() {
      const params = useParams<{ slug: string }>()
  const id = params.slug
  const [post, setPost] = useState<BlogDoc | null>(null);
  const [err, setErr] = useState<string | null>(null);
console.log('this is id', id)
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "blogs", id));
        if (!snap.exists()) { setErr("Not found"); return; }
        setPost(snap.data() as BlogDoc);
      } catch (e: unknown) {
  const message =
    e instanceof Error
      ? e.message
      : typeof e === "string"
      ? e
      : "Failed to load";

  setErr(message);
}

    })();
  }, [id]);

  if (err) return <p>{err} — <Link href="/">Back</Link></p>;
  if (!post) return <p>Loading…</p>;

  return (
    <article className="post">
      <Link href="/" className="back">← Back to articles</Link>
      <h1>{post.title}</h1>
      {post.updatedAt && (
        <p className="muted">
          Updated {new Date(post.updatedAt.seconds * 1000).toLocaleString()}
        </p>
      )}
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
