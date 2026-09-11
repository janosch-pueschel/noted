import { useCallback, useEffect, useRef, useState } from "react";

export default function useFetchData<T>(
  fetchUrl: string,
): readonly [T | null, boolean, boolean, () => Promise<void>] {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(fetchUrl.trim() !== "");

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort();

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setHasError(false);

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
  }, [fetchUrl]);

  useEffect(() => {
    // Fetch lifecycle intentionally updates loading/error state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  return [data, hasError, isLoading, fetchData];
}
