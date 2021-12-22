import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy-data";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div className="py-10 min-h-screen">
      <EventList items={featuredEvents} />
    </div>
  );
}
