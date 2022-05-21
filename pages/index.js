// import { getFeaturedEvents } from "../dummy-data";
import styles from "../styles/Home.module.css";
import EventList from "../components/events/EventList";
import { useState } from "react";

export default function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  const [events, setEvents] = useState(props.events);

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `https://nexjs-course-51824-default-rtdb.europe-west1.firebasedatabase.app/events.json?orderBy="isFeatured"&equalTo=true`
  );
  const data = await response.json();
  const events = [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  return {
    props: {
      events: events,
    },
    revalidate: 30,
  };
}
