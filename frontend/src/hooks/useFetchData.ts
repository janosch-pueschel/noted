import { useEffect, useState } from "react";

export default function useFetchData<T>(
  fetchUrl: string,
): readonly [T | null, boolean, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      setHasError(false);
      setIsLoading(false);

      if (fetchUrl.trim() === "") {
        setData(null);

        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${fetchUrl}`,
          {
            signal: signal,
          },
        );

        if (!response.ok) {
          throw new Error("Unable to fetch data.");
        }

        const data = await response.json();

        setData(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("Request was canceled");
        } else {
          console.log(err);
          setHasError(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [fetchUrl]);

  return [data, hasError, isLoading];
}
