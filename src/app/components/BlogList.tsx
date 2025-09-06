'use client'
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";

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
            <Link href={`/blog/${b.id}`} className="list-link">
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