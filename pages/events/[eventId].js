import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import ErrorCard from "../../components/ui/ErrorCard";
import { getEventById } from "../../dummy-data";

export default function EventDetaiPage() {
  const { query, isReady } = useRouter();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      const res = getEventById(query.eventId);
      setTimeout(() => {
        setData(res);
        setIsLoading(false);
      }, 1000);
    }
  }, [isReady]);

  if (!isLoading && !data)
    return <ErrorCard btnHref="/events" btnTitle="Browse All Events">No event found.</ErrorCard>;

  return (
    <div className="min-h-screen text-center">
      {!isLoading ? (
        data && (
          <>
            <p className="bg-gradient-to-tr from-cyan-700 to-teal-500 text-green-100 text-5xl font-bold pt-14 pb-28 -mb-14">
              {data.title}
            </p>
            <div className="flex bg-neutral-800 w-[500px] mx-auto rounded-lg text-green-100">
              <img
                src={`/${data.image}`}
                alt={data.title}
                className="rounded-full h-64 w-64 object-cover border-4 m-6"
              />
              <div className="flex-col self-center">
                <AiOutlineCalendar size={20} />
                <p className="font-semibold text-sm mt-1 mb-8 text-left">
                  {new Date(data.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <GoLocation size={20} className="mb-1" />
                <span>
                  {data.location.split(", ").map((line, i) => (
                    <p
                      key={i}
                      className="text-sm font-semibold italic text-left"
                    >
                      {line}
                    </p>
                  ))}
                </span>
              </div>
            </div>
            <p className="max-w-[600px] mx-auto mt-4">{data.description}</p>
          </>
        )
      ) : (
        <div className="flex h-screen items-center justify-center space-x-2 animate-pulse">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
