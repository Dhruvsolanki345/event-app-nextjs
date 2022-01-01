import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineCalendar } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

import ErrorCard from "../../components/ui/ErrorCard";
import Spinner from "../../components/ui/Spinner";

export default function EventDetaiPage(props) {
  const { event } = props;

  const { isFallback } = useRouter();

  if (isFallback) return <Spinner />;

  if (!event)
    return (
      <ErrorCard btnHref="/events" btnTitle="Browse All Events">
        No event found.
      </ErrorCard>
    );

  return (
    <div className="text-center">
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <p className="bg-gradient-to-tr from-cyan-700 to-teal-500 text-green-100 text-5xl font-bold pt-14 pb-28 -mb-14">
        {event.title}
      </p>
      <div className="flex justify-center bg-neutral-800 w-[600px] mx-auto rounded-lg text-green-100 shadow-lg shadow-green-900/50">
        <div className="rounded-full h-72 w-72 border-4 my-6 overflow-hidden relative">
          <Image
            src={`/${event.image}`}
            alt={event.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex-col self-center ml-6">
          <AiOutlineCalendar size={20} />
          <p className="font-semibold text-sm mt-1 mb-8 text-left">
            {new Date(event.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <GoLocation size={20} className="mb-1" />
          <span>
            {event.location.split(", ").map((line, i) => (
              <p key={i} className="text-sm font-semibold italic text-left">
                {line}
              </p>
            ))}
          </span>
        </div>
      </div>
      <p className="max-w-[600px] mx-auto mt-4">{event.description}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const {
    params: { eventId },
  } = context;

  const res = await axios.get(
    `https://events-a5794-default-rtdb.asia-southeast1.firebasedatabase.app/events/${eventId}.json`
  );
  const data = res.data;

  return {
    props: {
      event: !data ? null : { id: eventId, ...data },
    },
    revalidate: 100,
    // revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const res = await axios.get(
    "https://events-a5794-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = res.data;

  let paramsEvents = [];

  for (const eventId in data) {
    paramsEvents.push({ params: { eventId } });
  }

  return {
    paths: paramsEvents,
    fallback: true,
  };
}
