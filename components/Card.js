import Link from "next/link";

export default function Card({ href, text }) {
  return (
    <Link href={href}>
      <a className="block p-4 rounded-lg bg-neutral-800">
        <div className="line-clamp-4">{text}</div>
      </a>
    </Link>
  );
}
