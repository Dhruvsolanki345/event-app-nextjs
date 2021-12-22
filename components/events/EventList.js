import EventItem from "./EventItem";

export default function EventList(props) {
  const { items } = props;

  return (
    <div className="flex-col">
      {items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          location={item.location}
          date={item.date}
          image={item.image}
        />
      ))}
    </div>
  );
}
