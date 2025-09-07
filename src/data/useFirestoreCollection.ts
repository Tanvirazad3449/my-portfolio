"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, FirestoreError } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useFirestoreCollection<T extends { id: string }>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const ref = collection(db, path);
        const snap = await getDocs(ref);

        const items = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<T, "id">),
        })) as T[];

        if (isMounted) setData(items);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(err as FirestoreError);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [path]);

  return { data, loading, error };
}
