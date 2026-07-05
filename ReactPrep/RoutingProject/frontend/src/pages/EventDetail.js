// import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { useRouteLoaderData, redirect, defer, Await } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetail() {
  // const { eventId } = useParams();
  // const data = useRouteLoaderData('event-detail');
  const { event, events } = useRouteLoaderData('event-detail');
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetail;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch details for selected events.' }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw { message: 'Could not fetch events.'};
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
    // return json({ message: 'Could not fetch events.' }, { status: 500 }); // only react-router v6
  } else {
    // const resData = await response.json();
    // const res = new Response('any data' , { status: 200 });
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id), // await waits for this data to be loaded before loading this page component at all,
    events: loadEvents(), // will load this data after the page was loaded
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event.' }), {
      status: 500,
    });
  }

  return redirect('/events');
}
