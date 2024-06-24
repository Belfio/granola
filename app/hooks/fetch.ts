import { useEffect, useState } from "react";

const useFecthDb = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (controller: AbortController) => {
      try {
        // signal controller
        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal,
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false);
      }
    };
    fetchData(controller);
    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, loading, error };
};

export default useFecthDb;
