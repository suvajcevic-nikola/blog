import { useState } from "react";
import type { CustomError } from "@/types/data";
import { API_BASE_URL } from "@/utils/constants";

type ActionParams = {
  endpoint: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

const useAction = <T>({ endpoint, onSuccess, onError }: ActionParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const postData = async (body: T) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

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
  };

  return {
    isLoading,
    data,
    postData,
  };
};

export default useAction;
