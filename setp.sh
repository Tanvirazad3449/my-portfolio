#!/usr/bin/env bash

# 8. Create BlogList.tsx
cat << 'EOF' > src/pages/BlogList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export type Blog = {
  id: string;
  title: string;
  content?: string;
  updatedAt?: Timestamp;
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "blogs"), orderBy("updatedAt", "desc"));
      const snap = await getDocs(q);
      setBlogs(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Blog, "id">) }))
      );
      setLoading(false);
    })().catch((e) => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h2 className="page-title">Articles</h2>
      <ul className="list">
        {blogs.map((b) => (
          <li key={b.id} className="list-item">
            <Link to={\`/blog/\${b.id}\`} className="list-link">
              <span>{b.title}</span>
              {b.updatedAt && (
                <time className="muted">
                  {new Date(b.updatedAt.seconds * 1000).toLocaleDateString()}
                </time>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
EOF

# 9. Create BlogDetail.tsx
cat << 'EOF' > src/pages/BlogDetail.tsx
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
EOF

# 10. Create styles.css
cat << 'EOF' > src/styles.css
:root {
  --bg: #0b0d10;
  --panel: #11141a;
  --ink: #e9eef5;
  --muted: #9aa4b2;
  --accent: #4f8cff;
  --border: #1d2330;
}

* { box-sizing: border-box; }
html, body, #root { height: 100%; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: Inter, system-ui, Arial, sans-serif; }

.layout { display: grid; grid-template-columns: 300px 1fr; height: 100%; }

.sidebar {
  padding: 28px 22px;
  background: var(--panel);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 14px; position: sticky; top: 0; height: 100vh;
}
.avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #576bff, #2dd4bf); }
.name { margin: 6px 0 0; font-size: 22px; }
.role { margin: 0; color: var(--muted); font-size: 14px; }
.contact { display: grid; gap: 6px; margin-top: 8px; }
.contact a { color: var(--ink); text-decoration: none; opacity: .9; }
.contact a:hover { color: var(--accent); }
.nav { margin-top: 18px; display: grid; gap: 8px; }
.nav a { color: var(--ink); text-decoration: none; opacity: .9; }
.nav a.active { color: var(--accent); }

.content { padding: 32px 38px; overflow: auto; }

.page-title { margin-top: 0; }
.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.list-item { border: 1px solid var(--border); border-radius: 14px; background: rgba(255,255,255,0.02); }
.list-link { display: flex; justify-content: space-between; gap: 12px; padding: 14px 16px; align-items: center; color: var(--ink); text-decoration: none; }
.list-link:hover { background: rgba(255,255,255,0.04); }
.muted { color: var(--muted); font-size: 12px; }

.post h1 { margin-bottom: 6px; }
.back { color: var(--muted); text-decoration: none; }
.back:hover { color: var(--accent); }

.markdown { line-height: 1.6; }
.markdown pre { padding: 14px; border-radius: 12px; border: 1px solid var(--border); overflow: auto; }
.markdown code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.markdown a { color: var(--accent); }
EOF

echo "✅ Project scaffolded! Next steps:"
echo "1. cd my-portfolio"
echo "2. Fill in firebaseConfig in src/firebase.ts"
echo "3. npm run dev"