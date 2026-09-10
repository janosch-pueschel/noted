export default function useMutation<TBody, TResponse>(
  fetchUrl: string,
  method: string,
): (body: TBody) => Promise<TResponse> {
  const mutate = async (body: TBody) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${fetchUrl}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        throw new Error("Mutation failed.");
      }

      const data = await response.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return mutate;
}
