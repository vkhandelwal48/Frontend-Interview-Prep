// import { json } from 'react-router-dom';
import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  // const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;
  // return <EventsList events={events} />;

  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {/* once promise is resolved, we can use the data */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

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

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
