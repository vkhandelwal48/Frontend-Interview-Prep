import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id })
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({ queryKey: ['events', id] }); 
      const previousEvent = queryClient.getQueryData(['events', id]);
      queryClient.setQueryData(['events', id], newEvent);
      return { previousEvent }; // Return the previous event data so we can roll back if the mutation fails
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.previousEvent); // Roll back to the previous event data if the mutation fails
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['events', id],
      });// Refetch the event data after the mutation is complete
    }
  })

  function handleSubmit(formData) {
    mutate({ id, event : formData });
    navigate('../'); // up one level after successful submission
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = <div className="center">
      <LoadingIndicator />
    </div>
  }

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
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
