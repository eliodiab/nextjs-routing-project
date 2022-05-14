import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventSummay from "../../components/event-detail/event-summary";
import EventLogitics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventDetailPage() {
  const router = useRouter();

  console.log(router.query);
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
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
