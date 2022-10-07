import { useEffect, useState } from "react";
import { PlusIcon, XMarkIcon, ShareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import useSWR from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Header({ home, slug }) {
  const [pathname, setPathname] = useState("");
  const { data } = useSWR("/api/auth");
  const { data: newSlug } = useSWR(
    home && data && data.isAuthorized ? "/api/new-slug" : null
  );
  const router = useRouter();

  function share() {
    navigator.share({
      url: `https://ntpd.vercel.app/shared/${Cookies.get("user_id")}/${
        router.query.slug
      }`,
    });
  }

  useEffect(() => {
    setPathname(location.pathname);
  }, []);

  return (
    <div className="flex items-center justify-between mb-2 pt-2 pb-3">
      <svg
        width="40"
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
      {data &&
        (!data.isAuthorized ? (
          <a
            href={`//oauth.vk.com/authorize?client_id=51443585&display=page&response_type=token&scope=offline&v=5.131&redirect_uri=https://ntpd.vercel.app/callback&state=${pathname}`}
            className="bg-blue-500 rounded-lg px-3 py-1 ml-auto"
          >
            Войти
          </a>
        ) : (
          home &&
          newSlug && (
            <Link href={`/${newSlug.newSlug}`}>
              <a>
                <PlusIcon className="w-6" />
              </a>
            </Link>
          )
        ))}
      {!home && (
        <div className="flex">
          {slug && <button onClick={share}>
            <ShareIcon className="w-5" />
          </button>}
          <Link href="/">
            <a>
              <XMarkIcon className="w-6 ml-4" />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
