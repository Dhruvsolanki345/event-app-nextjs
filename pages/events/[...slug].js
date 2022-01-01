import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import EventList from "../../components/events/EventList";
import ErrorCard from "../../components/ui/ErrorCard";

export default function EventFilterPage(props) {
  const { errTxt, filteredEvents, year, month } = props;

  if (errTxt) {
    return (
      <ErrorCard btnHref="/events" btnTitle="Browse All Events">
        {errTxt}
      </ErrorCard>
    );
  }

  const date = new Date(year, month - 1).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="py-10">
      <Head>
          <title>Filtered Events</title>
          <meta name="description" content={`All events for ${month}/${year}`} />
        </Head>
      <div className="mx-auto mb-10 w-max">
        <p className="font-bold text-lg">Events in {date}</p>
        <Link href="/events">
          <div className="py-1 px-4 mx-auto mt-2 w-max cursor-pointer bg-emerald-500 text-white font-semibold rounded-md shadow-md shadow-green-700">
            Find Events
          </div>
        </Link>
      </div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  const res = await axios.get(
    "https://events-a5794-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = res.data;

  if (!data) return { notFound: true };

  let filteredEvents = [];

  const year = +slug[0];
  const month = +slug[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2012 ||
    year > 2022 ||
    month < 0 ||
    month > 12
  ) {
    return { props: { errTxt: "Please Enter Valid Filter Data" } };
  }

  for (const key in data) {
    const event = data[key];
    const eventDate = new Date(event.date);

    eventDate.getFullYear() === year &&
      eventDate.getMonth() === month - 1 &&
      filteredEvents.push({
        id: key,
        ...event,
      });
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return { props: { errTxt: "No Data Found For This Filter" } };
  }

  return {
    props: {
      filteredEvents,
      year,
      month,
    },
  };
}
