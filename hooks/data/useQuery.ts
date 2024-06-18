import { useState, useEffect, useCallback } from "react";
import type { CustomError } from "@/types/data";
import { getFromDB, setToDB } from "@/utils/indexedDB";
import { fetchService } from "@/lib/fetch";

const useQuery = <T>(endpoint: string, cacheKey: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [data, setData] = useState<T | T[] | null>(null);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);

    try {
      const response = await fetchService(endpoint);
      const responseData = await response.json();
      if (!response.ok) {
        const err: CustomError = new Error();
        err.name = "FetchError";
        err.message = responseData;
        err.status = response.status;
        throw err;
      }

      if (JSON.stringify(responseData) !== JSON.stringify(data)) {
        setData(responseData);
        await setToDB("blog", cacheKey, responseData);
      }
    } catch (error) {
      const err = error as CustomError;
      console.error(err);
      setIsError(true);
      setError({
        status: err.status || 500,
        name: err.name,
        message: err.message,
      });
    } finally {
      setIsFetching(false);
    }
  }, [endpoint, cacheKey, data]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const cachedData = await getFromDB<T>("blog", cacheKey);
        if (cachedData) {
          setData(cachedData);
        }
      } catch (e) {
        console.error("Error fetching from IndexedDB:", e);
      } finally {
        setIsLoading(false);
      }

      fetchData();
    };

    loadData();
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { isFetching, isLoading, isError, data, error, refetch };
};

export default useQuery;
