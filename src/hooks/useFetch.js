import { useEffect, useState } from "react";

export function useFetch(fetchFn, initalValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchData] = useState(initalValue);

  useEffect(
    function () {
      async function fetchData() {
        setIsFetching(true);
        try {
          const data = await fetchFn();
          setFetchData(data);
        } catch (error) {
          setError({ message: error.message || "Failed to fetch data." });
        }
        setIsFetching(false);
      }
      fetchData();
    },
    [fetchFn]
  );

  return {
    isFetching,
    fetchedData,
    setFetchData,
    error,
  };
}
