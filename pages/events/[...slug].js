import Link from "next/link";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ErrorCard from "../../components/ui/ErrorCard";
import { getFilteredEvents } from "../../dummy-data";

export default function EventFilterPage() {
  const router = useRouter();

  if (!router.query.slug) return <p>Loading....</p>;

  const year = +router.query.slug[0];
  const month = +router.query.slug[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2012 ||
    year > 2022 ||
    month < 0 ||
    month > 12
  ) {
    return <ErrorCard btnHref="/events" btnTitle="Browse All Events">Please Enter Valid Filter Data</ErrorCard>;
  }

  const filteredEvents = getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <ErrorCard btnHref="/events" btnTitle="Browse All Events">No Data Found For This Filter</ErrorCard>;
  }

  const date = new Date(year, month - 1).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="py-10 min-h-screen">
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
