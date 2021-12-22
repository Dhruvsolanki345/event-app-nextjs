import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-neutral-800 flex justify-between items-center px-10 py-4">
      <Link href="/">
        <p className="text-cyan-200 text-2xl cursor-pointer">Events App</p>
      </Link>
      <ul className="flex items-center text-green-100">
        <Link href="/events">
          <li className="cursor-pointer">Browse All Events</li>
        </Link>
      </ul>
    </div>
  );
}
