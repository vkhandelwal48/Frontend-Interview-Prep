import { Link, useNavigate, useParams, redirect, useSubmit, useNavigation } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const submit = useSubmit();
  const { id } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10000, // cached data is used without re-fetching behind the scenes if that data is less than 10s old
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({ queryKey: ['events', id] }); 
  //     const previousEvent = queryClient.getQueryData(['events', id]);
  //     queryClient.setQueryData(['events', id], newEvent);
  //     return { previousEvent }; // Return the previous event data so we can roll back if the mutation fails
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', id], context.previousEvent); // Roll back to the previous event data if the mutation fails
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['events', id],
  //     });// Refetch the event data after the mutation is complete
  //   }
  // })

  function handleSubmit(formData) {
    // mutate({ id, event : formData });
    // navigate('../'); // up one level after successful submission
    submit(formData, { method: 'PUT'}); // any method except GET
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // if (isPending) {
  //   content = <div className="center">
  //     <LoadingIndicator />
  //   </div>
  // }

  if (isError) {
    content = <>
      <ErrorBlock
        title="Failed to load event"
        message={
          error.info?.message ||
          'Failed to load event. Please check your inputs and try again later.'
        }
      />
      <div className="form-actions">
        <Link to="../" className="button">
          Okay
        </Link>
      </div>
    </>
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? <p>Sending data...</p> : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  const { id } = params;
  return queryClient.fetchQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id })
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(['events'])
  return redirect('../');
}

// even though we are using loader from React Router DOM. We still use useQuery Hook
// as provide or help us with caching. So we don't remove that code.
