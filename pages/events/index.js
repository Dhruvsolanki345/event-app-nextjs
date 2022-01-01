import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import axios from "axios";
import EventList from "../../components/events/EventList";

export default function EventsPage(props) {
  const { events } = props;

  const yearRef = useRef();
  const monthRef = useRef();

  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();

    const year = yearRef.current.value;
    const month = monthRef.current.value;

    router.push(`/events/${year}/${month}`);
  };

  return (
    <div className="py-10"><Head>
    <title>All Events</title>
    <meta name="description" content="Find a lot of great events that will allow you to evolve" />
  </Head>
      <form
        onSubmit={submitHandler}
        className="flex mx-auto gap-4 items-center bg-white w-max p-3 rounded-md mb-10"
      >
        <p className="font-semibold">Year</p>
        <select ref={yearRef} name="year" className="border-2 rounded w-36">
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </select>
        <p className="font-semibold">Month</p>
        <select ref={monthRef} name="month" className="border-2 rounded w-36">
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <button className="py-1 px-4 bg-emerald-500 text-white font-semibold rounded-md shadow-md shadow-green-700">
          Find Events
        </button>
      </form>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await axios.get(
    "https://events-a5794-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = res.data;

  if (!data) return { notFound: true };

  let events = [];

  for (const key in data) {
    const event = data[key];
    events.push({
      id: key,
      ...event,
    });
  }

  return {
    props: {
      events,
    },
    revalidate: 100,
    // revalidate: 3600,
  };
}
