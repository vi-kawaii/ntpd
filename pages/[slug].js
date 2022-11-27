import { useEffect, useState } from "react";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import TextareaAutosize from "react-textarea-autosize";
import keyboardjs from "keyboardjs";
import { useAtom } from "jotai";
import notesAtom from "../notesAtom";
import { useRouter } from "next/router";

export default function Slug() {
  const [notes, setNotes] = useAtom(notesAtom);
  const [mount, setMount] = useState(false);
  const router = useRouter();

  function changeNotes({ target: { value } }) {
    setNotes((n) =>
      n.length === 0
        ? [{ key: 0, value }]
        : n.map((note) =>
            note.key.toString() === location.pathname.slice(1)
              ? { key: note.key, value }
              : { key: note.key, value: note.value }
          )
    );
  }

  useEffect(() => {
    if (!mount) {
      setMount(true);

      if (!notes.find((n) => n.key.toString() === location.pathname.slice(1))) {
        setNotes([...notes, { key: +location.pathname.slice(1), value: "" }]);
      }

      return;
    }
  }, [notes, mount, setNotes]);

  useEffect(() => {
    keyboardjs.bind("esc", () => {
      router.push("/");
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>ntpd</title>
      </Head>
      <Content>
        <Header slug />
        {mount && notes && (
          <TextareaAutosize
            placeholder="Напишите текст..."
            className="outline-none bg-transparent w-full resize-none"
            onChange={changeNotes}
            value={
              notes.find((n) => n.key.toString() === location.pathname.slice(1))
                ? notes.find(
                    (n) => n.key.toString() === location.pathname.slice(1)
                  ).value
                : ""
            }
          />
        )}
      </Content>
    </>
  );
}
