import { useCallback, useState } from "react";
import type { CustomError } from "@/types/data";
import { AllowedMethods, fetchService, RInit } from "@/lib/fetch";

type ActionParams = {
  endpoint: string;
  method?: AllowedMethods;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

const useAction = <T>({
  endpoint,
  method = "POST",
  onSuccess,
  onError,
}: ActionParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const actionFn = useCallback(
    async (body?: T) => {
      setIsLoading(true);
      try {
        const requestInit: RInit = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };
        body && (requestInit.body = JSON.stringify(body));
        const response = await fetchService(endpoint, requestInit);
        const responseData = await response.json();
        if (response.ok) {
          setData(responseData);
          if (onSuccess) {
            onSuccess(responseData);
          }
        } else {
          if (onError) {
            const err: CustomError = new Error();
            err.name = "FetchError";
            err.message = responseData;
            err.status = response.status;
            throw err;
          }
        }
      } catch (error) {
        if (onError) {
          const err = error as CustomError;
          console.error(err);
          onError({
            status: err.status || 500,
            name: err.name,
            message: err.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, method, onSuccess, onError],
  );

  return {
    isLoading,
    data,
    actionFn,
  };
};

export default useAction;
