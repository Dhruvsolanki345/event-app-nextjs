import Image from "next/image"
import { AiOutlineCalendar } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import IconButton from "../ui/IconButton";

export default function EventItem(props) {
  const { location, image, date, title, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex mx-auto w-max bg-white rounded-xl shadow-2xl shadow-slate-900/50 overflow-hidden my-6">
      <Image src={`/${image}`} alt={title} className="h-60 w-60 object-cover" width={240} height={240} />
      <div className="w-96 p-4 flex-col">
        <p className="font-bold text-2xl mb-6">{title}</p>
        <p className="font-semibold text-sm text-neutral-600 mb-3 flex items-center gap-1">
          <AiOutlineCalendar size={20} /> {humanReadableDate}
        </p>
        <div className="flex items-center gap-1">
          <GoLocation size={20} />
          <span>
            {location.split(", ").map((line, i) => (
              <p key={i} className="text-sm text-gray-600 italic">
                {line}
              </p>
            ))}
          </span>
        </div>
        <IconButton href={`/events/${id}`} title="Explore Event" />
      </div>
    </div>
  );
}
