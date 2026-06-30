import { useParams } from 'react-router-dom';
function EventDetail() {
  const { eventId } = useParams();
  return <h1>Event Detail Page for {eventId}</h1>;
}

export default EventDetail;
