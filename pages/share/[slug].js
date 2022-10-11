import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import notesAtom from "../../notesAtom";
import { useState } from "react";

export default function Slug() {
  const router = useRouter();
  const [notes, setNotes] = useAtom(notesAtom);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount && router.isReady) {
      setMount(true);
      const key = notes.length !== 0 ? notes.at(-1).key + 1 : 0;

      setNotes([...notes, { key, value: router.query.slug }]);

      router.replace(`/${key}`);
    }
  }, [setNotes, notes, router, mount]);

  return null;
}
