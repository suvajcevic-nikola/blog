import { useState, useEffect, useCallback } from "react";
import type { CustomError } from "@/types/data";
import { API_BASE_URL } from "@/utils/constants";

type ReturnData<T> = T | T[] | null;

type UseQueryResult<T> = {
  isFetching: boolean;
  isError: boolean;
  data: ReturnData<T>;
  error: CustomError | null;
  refetch: () => void;
};

const useQuery = <T>(endpoint: string): UseQueryResult<T> => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [data, setData] = useState<ReturnData<T>>(null);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      const responseData = await response.json();
      if (!response.ok) {
        const err: CustomError = new Error();
        err.name = "FetchError";
        err.message = responseData;
        err.status = response.status;
        throw err;
      }
      setData(responseData);
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
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { isFetching, isError, data, error, refetch };
};

export default useQuery;
