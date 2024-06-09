import type { Comment } from "@/types/post";
import { useState, useEffect, useCallback } from "react";

const useComments = (postId: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);
    try {
      const response = await fetch(
        `https://5ebd9842ec34e900161923e7.mockapi.io/post/${postId}/comments`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = (await response.json()) as Comment[];
      setComments(data);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const refetch = useCallback(() => {
    fetchComments();
  }, [fetchComments]);

  return { isFetching, isError, comments, refetch };
};

export default useComments;
