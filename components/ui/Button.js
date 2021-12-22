import Link from "next/link";

export default function Button(props) {
  const { href, title, className } = props;

  return (
    <Link href={href}>
      <button className={`w-max block mt-3 py-2 px-5 bg-emerald-500 text-white font-semibold rounded-lg shadow-md shadow-green-900 ${className}`}>
        {title}
      </button>
    </Link>
  );
}
