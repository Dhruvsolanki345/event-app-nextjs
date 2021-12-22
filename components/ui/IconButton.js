import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";

export default function IconButton(props) {
  const { href, title } = props;
  return (
    <Link href={href}>
      <a className="w-max flex items-center gap-1 ml-auto mt-8 py-2 px-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md shadow-green-900">
        {title} <AiFillCaretRight size={20} />
      </a>
    </Link>
  );
}
