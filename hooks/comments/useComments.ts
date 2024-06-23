import { useMemo } from "react";
import useQuery from "../data/useQuery";
import type { Comment } from "@/types/post";

const useComments = (postId: string) => {
  const endpoint = `post/${postId}/comments`;
  const cacheKey = `comments-${postId}`;
  const { isFetching, isLoading, isError, data, error, refetch } =
    useQuery<Comment>(endpoint, cacheKey);

  const sortedComments = useMemo(() => {
    return Array.isArray(data)
      ? data.sort((a, b) => a.createdAt - b.createdAt)
      : [];
  }, [data]);

  const commentsCount = sortedComments.length;

  return {
    isFetching,
    isLoading,
    isError,
    comments: sortedComments,
    commentsCount,
    error,
    refetch,
  };
};

export default useComments;
