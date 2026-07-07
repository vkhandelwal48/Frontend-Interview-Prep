import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorComponent from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(async () => {}) // we can't use async directly in useEffect, we can create an async function inside useEffect and call it.
  useEffect(() => {
    setIsFetching(true);

    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });// this will be executed by the browser when the position has been fetched.
        // we can't use async await here as getCurrentPosition does not return a promise, it uses a callback function instead.
      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, please try again later' });
        setIsFetching(false);
      }
    }
    fetchPlaces();
    // this code will be executed when the response is received from the server
    // This code will create an infinite loop because the state is being updated on every render.
  }, []);
  // To fix this, we should use useEffect to fetch the data only once when the component mounts.

  if (error) {
    return <ErrorComponent title="An error occurred!" message={error.message} onConfirm={() => setError(null)} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
