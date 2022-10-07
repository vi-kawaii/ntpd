import Link from "next/link";

export default function Card({ title, href, description }) {
  return (
    <Link href={href}>
      <a className="block my-4">
        <div className="text-xl font-bold mt-2">{title}</div>
        <div className="line-clamp-2">{description}</div>
      </a>
    </Link>
  );
}
