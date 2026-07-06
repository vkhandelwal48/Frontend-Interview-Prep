import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/places').then((response) => {
      return response.json()
    }).then((resData) => {
      setAvailablePlaces(resData.places);
    });// this code will be executed when the response is received from the server
    // This code will create a infinite loop because the state is being updated on every render.
  }, []);
  // To fix this, we should use useEffect to fetch the data only once when the component mounts.
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
