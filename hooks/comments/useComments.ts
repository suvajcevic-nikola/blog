import { useMemo } from "react";
import useQuery from "../data/useQuery";
import type { Comment } from "@/types/post";

const useComments = (postId: string) => {
  const endpoint = `/post/${postId}/comments`;
  const { isFetching, isError, data, error, refetch } =
    useQuery<Comment>(endpoint);

  const sortedComments = useMemo(() => {
    return Array.isArray(data)
      ? data.sort((a, b) => a.createdAt - b.createdAt)
      : [];
  }, [data]);

  const commentsCount = sortedComments.length;
  const isEmptyComments = commentsCount < 1;

  const isLoading = isFetching && isEmptyComments;

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
