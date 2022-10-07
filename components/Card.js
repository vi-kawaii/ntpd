import Link from "next/link";

export default function Card({ href, description }) {
  return (
    <Link href={href}>
      <a className="block pb-4">
        <div className="line-clamp-2">{description}</div>
      </a>
    </Link>
  );
}
