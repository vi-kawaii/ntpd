import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../components/Header";
import Content from "../components/Content";
import Head from "next/head";

export default function Slug() {
  const router = useRouter();
  const { data } = useSWR("/api/auth");
  const { data: note } = useSWR(
    data && data.isAuthorized ? `/api/note?key=${router.query.slug}` : null
  );
  const [text, setText] = useState("");

  function changeText({ target: { value } }) {
    setText(value);
  }

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
        <Header />
        <textarea autoFocus placeholder="Напишите текст..." className="outline-none bg-[#121212] w-full h-[calc(100vh-90px)] resize-none" onChange={changeText} value={text}></textarea>
      </Content>
    </>
  );
}
