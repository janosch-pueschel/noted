import { useEffect, useState } from "react";

export default function useFetchData<T>(
  url: string,
): readonly [T | null, boolean, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);

        if (!response.ok) {
          throw new Error("Unable to fetch data.");
        }

        const data = await response.json();

        setData(data);
      } catch (err) {
        console.log(err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return [data, hasError, isLoading];
}
