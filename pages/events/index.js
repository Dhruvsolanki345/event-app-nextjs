import { useRouter } from "next/router";
import { useRef } from "react";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../dummy-data";

export default function EventsPage() {
  const events = getAllEvents();

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
    <div className="py-10 min-h-screen">
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