import { useRouter } from "next/router";
// import { getEventById } from "../../dummy-data";
import EventSummay from "../../components/event-detail/event-summary";
import EventLogitics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventDetailPage(props) {
  const router = useRouter();
  // const router = useRouter();
  // const eventId = router.query.eventId;
  const event = props.event;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <ErrorAlert>Wrong event id</ErrorAlert>;
  }

  return (
    <>
      <EventSummay title={event.title} />
      <EventLogitics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticPaths() {
  //if we have 100s of events it's better to fetch only the most visited ones
  //which are the featured events in this case
  // const response = await fetch(
  //   `https://nexjs-course-51824-default-rtdb.europe-west1.firebasedatabase.app/events.json`
  // );
  const response = await fetch(
    `https://nexjs-course-51824-default-rtdb.europe-west1.firebasedatabase.app/events.json?orderBy="isFeatured"&equalTo=true`
  );
  const data = await response.json();
  const events = [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const response = await fetch(
    `https://nexjs-course-51824-default-rtdb.europe-west1.firebasedatabase.app/events.json?orderBy="$key"&equalTo="${eventId}"`
  );
  const data = await response.json();
  if (!data[0]) {
    return {
      notFound: true,
    };
  }
  const key = Object.keys(data)[0];
  const event = { id: key, ...data[key] };

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}
