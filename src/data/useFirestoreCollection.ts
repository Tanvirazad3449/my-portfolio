"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, FirestoreError, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSections } from "@/providers/SectionProvider";

export function useFirestoreCollection<T extends { id: string }>(id?: string) {
  const { activeSection } = useSections();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        if (id) {
          const ref = doc(db, activeSection.toLowerCase(), id);
          const snap = await getDoc(ref);
          if (!isMounted) return;

          if (snap.exists()) {
            const item = { id: snap.id, ...(snap.data() as Omit<T, "id">) } as T;
            setData([item]);
          } else {
            setData([]);
          }
        } else {
          const ref = collection(db, activeSection.toLowerCase());
          const snap = await getDocs(ref);
          if (!isMounted) return;

          const items = snap.docs.map(
            (d) => ({ id: d.id, ...(d.data() as Omit<T, "id">) } as T)
          );
          setData(items);
        }
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
  }, [activeSection]);

  return { data, loading, error };
}
