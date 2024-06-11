import useAction from "../data/useAction";
import type { NewComment } from "@/types/post";

type UseAddNewCommentParams = {
  postId: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

const useAddNewComment = ({
  postId,
  onSuccess,
  onError,
}: UseAddNewCommentParams) => {
  const endpoint = `/post/${postId}/comments`;

  const { isLoading, data, postData } = useAction<NewComment>({
    endpoint,
    onSuccess,
    onError,
  });

  const addNewComment = (comment: NewComment) => postData(comment);

  return { isLoading, data, addNewComment };
};

export default useAddNewComment;