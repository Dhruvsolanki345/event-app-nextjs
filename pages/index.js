import Head from "next/head";
import axios from "axios";
import EventList from "../components/events/EventList";

export default function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div className="py-10">
      <Head>
          <title>Featured Events</title>
          <meta name="description" content="Find a lot of great events that will allow you to evolve" />
        </Head>
      {featuredEvents.length !== 0 ? (
        <EventList items={featuredEvents} />
      ) : (
        <div className="bg-red-400 px-16 py-8 text-green-100 font-semibold text-xl rounded w-max mx-auto my-8">
          No Featured Event For Now.
        </div>
      )}
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await axios.get(
    "https://events-a5794-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = res.data;

  if (!data) return { notFound: true };

  let featuredEvents = [];

  for (const key in data) {
    const event = data[key];
    event.isFeatured &&
      featuredEvents.push({
        id: key,
        ...event,
      });
  }

  return {
    props: {
      featuredEvents,
    },
    revalidate: 100,
    // revalidate: 3600,
  };
}
