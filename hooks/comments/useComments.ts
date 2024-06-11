import useQuery from "../data/useQuery";
import type { Comment } from "@/types/post";

const useComments = (postId: string) => {
  const endpoint = `/post/${postId}/comments`;
  const { isFetching, isError, data, error, refetch } = useQuery<Comment>(endpoint);

  return { isFetching, isError, comments: data, error, refetch };
};

export default useComments;
