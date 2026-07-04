// import { useParams } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetail() {
  // const { eventId } = useParams();
  const data = useRouteLoaderData('event-detail');
  return <EventItem event={data.event} />;
}

export default EventDetail;

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch details for selected events.' }), {
      status: 500,
    });
  } else {
    return response;
  } 
}
