import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type BlogDoc = {
  title: string;
  content: string;
  updatedAt?: { seconds: number };
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogDoc | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "blogs", id));
        if (!snap.exists()) { setErr("Not found"); return; }
        setPost(snap.data() as BlogDoc);
      } catch (e: any) {
        setErr(e.message || "Failed to load");
      }
    })();
  }, [id]);

  if (err) return <p>{err} — <Link to="/">Back</Link></p>;
  if (!post) return <p>Loading…</p>;

  return (
    <article className="post">
      <Link to="/" className="back">← Back to articles</Link>
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
