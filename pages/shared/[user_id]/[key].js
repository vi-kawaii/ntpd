import { useRouter } from "next/router";
import useSWR from "swr";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Head from "next/head";
import Image from "next/image";

export default function Slug() {
  const router = useRouter();
  const { data } = useSWR(
    router && router.query.user_id
      ? `/api/shared?user_id=${router.query.user_id}&key=${router.query.key}`
      : null
  );

  return (
    <>
      <Head>
        <title>ntpd</title>
      </Head>
      <Content>
        <Header />
        {data && (
          <>
            <div className="flex items-center mb-4">
              <Image
                className="rounded-full"
                src={data.user.photo_50}
                alt=""
                width={35}
                height={35}
              />
              <div className="ml-4">
                {data.user.first_name + " " + data.user.last_name}
              </div>
            </div>
            <div className="whitespace-pre-wrap">{data.text || "Запись не найдена"}</div>
          </>
        )}
      </Content>
    </>
  );
}
