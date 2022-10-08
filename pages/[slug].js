import { useRouter } from "next/router";
import { useMemo, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";
import _debounce from "lodash/debounce";
import TextareaAutosize from "react-textarea-autosize";
import { useSWRConfig } from "swr";

export default function Slug() {
  const router = useRouter();
  const { data } = useSWR("/api/auth");
  const { data: note } = useSWR(
    data && data.isAuthorized ? `/api/note?key=${router.query.slug}` : null
  );
  const [text, setText] = useState("");
  const textRef = useRef();
  const slugRef = useRef();
  textRef.current = text;
  const [count, setCount] = useState(0);
  const { mutate } = useSWRConfig();

  const debounceSave = useMemo(
    () =>
      _debounce(() => {
        fetch("/api/save", {
          method: "POST",
          body: JSON.stringify({
            key: slugRef.current,
            value: textRef.current,
          }),
        });
        mutate(
          "/api/content",
          async (content) => {
            if (textRef.current === "") {
              return content.filter((c) => c.key !== slugRef.current);
            }

            return content.map((c) =>
              c.key === slugRef.current
                ? { key: c.key, value: textRef.current }
                : c
            );
          },
          { revalidate: false }
        );
      }, 300),
    []
  );

  function changeText({ target: { value } }) {
    setText(value.length > 4096 ? value.slice(0, 4096) : value);
    debounceSave();
  }

  useEffect(() => {
    slugRef.current = router.query.slug;
  }, [router]);

  useEffect(() => {
    setCount(text.length);
  }, [text]);

  useEffect(() => {
    if (data && !data.isAuthorized) {
      router.push("/");
    }
  }, [data, router]);

  useEffect(() => {
    if (note) {
      setText(note.text);
    }
  }, [note]);

  if (!data || !data.isAuthorized) {
    return null;
  }

  return (
    <>
      <Head>
        <title>ntpd</title>
      </Head>
      <Content>
        <Header slug />
        <div className="text-center text-neutral-500 mb-6">{count} / 4096</div>
        <TextareaAutosize
          autoFocus
          placeholder="Напишите текст..."
          className="outline-none bg-[#121212] w-full resize-none"
          onChange={changeText}
          value={text}
        />
      </Content>
    </>
  );
}
