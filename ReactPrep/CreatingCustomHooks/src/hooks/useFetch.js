import { useEffect, useState } from 'react';
import { fetchUserPlaces } from '../http.js';

export function useFetch(fetchFn, initialValue) { // it should start with "use" to follow the React hook naming convention
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || 'Failed to fetch data.',
        });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return { isFetching, error, fetchedData, setFetchedData };
}
