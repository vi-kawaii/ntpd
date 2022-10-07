import Head from "next/head";
import Header from "../components/Header";
import Card from "../components/Card";
import Content from "../components/Content";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/auth");
  const { data: content } = useSWR(
    data && data.isAuthorized ? "/api/content" : null
  );

  return (
    <>
      <Head>
        <title>ntpd</title>
      </Head>
      <Content>
        <Header home />
        <div className="divide-y divide-neutral-500">
          {data && !data.isAuthorized && (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)]">
              <svg
                width="60"
                viewBox="0 0 80 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 60C16.0444 56.0444 13.3506 51.0046 12.2592 45.518C11.1678 40.0314 11.728 34.3444 13.8687 29.1761C16.0095 24.0078 19.6348 19.5904 24.2861 16.4825C28.9374 13.3746 34.4059 11.7157 40 11.7157C45.5941 11.7157 51.0626 13.3746 55.7139 16.4825C60.3652 19.5904 63.9905 24.0078 66.1313 29.1761C68.272 34.3444 68.8322 40.0314 67.7408 45.518C66.6494 51.0046 63.9556 56.0444 60 60L40 40L20 60Z"
                  fill="#F562F8"
                />
                <rect
                  x="16.4426"
                  y="66.163"
                  width="11.9706"
                  height="11.9706"
                  transform="rotate(45 16.4426 66.163)"
                  stroke="#7270FF"
                  strokeWidth="5"
                />
                <rect
                  x="39.6345"
                  y="66.163"
                  width="11.9706"
                  height="11.9706"
                  transform="rotate(45 39.6345 66.163)"
                  stroke="#7270FF"
                  strokeWidth="5"
                />
                <rect
                  x="62.8264"
                  y="66.163"
                  width="11.9706"
                  height="11.9706"
                  transform="rotate(45 62.8264 66.163)"
                  stroke="#7270FF"
                  strokeWidth="5"
                />
              </svg>
              <div className="text-lg mt-4">Войдите в аккаунт</div>
            </div>
          )}
          {content &&
            (content.content.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)]">
                <svg
                  width="60"
                  viewBox="0 0 80 87"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 60C16.0444 56.0444 13.3506 51.0046 12.2592 45.518C11.1678 40.0314 11.728 34.3444 13.8687 29.1761C16.0095 24.0078 19.6348 19.5904 24.2861 16.4825C28.9374 13.3746 34.4059 11.7157 40 11.7157C45.5941 11.7157 51.0626 13.3746 55.7139 16.4825C60.3652 19.5904 63.9905 24.0078 66.1313 29.1761C68.272 34.3444 68.8322 40.0314 67.7408 45.518C66.6494 51.0046 63.9556 56.0444 60 60L40 40L20 60Z"
                    fill="#F562F8"
                  />
                  <rect
                    x="16.4426"
                    y="66.163"
                    width="11.9706"
                    height="11.9706"
                    transform="rotate(45 16.4426 66.163)"
                    stroke="#7270FF"
                    strokeWidth="5"
                  />
                  <rect
                    x="39.6345"
                    y="66.163"
                    width="11.9706"
                    height="11.9706"
                    transform="rotate(45 39.6345 66.163)"
                    stroke="#7270FF"
                    strokeWidth="5"
                  />
                  <rect
                    x="62.8264"
                    y="66.163"
                    width="11.9706"
                    height="11.9706"
                    transform="rotate(45 62.8264 66.163)"
                    stroke="#7270FF"
                    strokeWidth="5"
                  />
                </svg>
                <div className="text-lg mt-4">Нет ни одной записи</div>
              </div>
            ) : (
              content.content.map((note, i) => (
                <Card key={i} href={`/${note.key}`} description={note.text} />
              ))
            ))}
        </div>
      </Content>
    </>
  );
}
