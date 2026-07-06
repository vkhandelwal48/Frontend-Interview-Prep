import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // useEffect(async () => {}) // we can't use async directly in useEffect, we can create an async function inside useEffect and call it.
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }
    fetchPlaces();
    // this code will be executed when the response is received from the server
    // This code will create an infinite loop because the state is being updated on every render.
  }, []);
  // To fix this, we should use useEffect to fetch the data only once when the component mounts.
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
