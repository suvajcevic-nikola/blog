import { useCallback } from "react";
import useAction from "../data/useAction";

type UseDeleteCommentParams = {
  postId: string;
  commentId: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

const useDeleteComment = ({
  postId,
  commentId,
  onSuccess,
  onError,
}: UseDeleteCommentParams) => {
  const endpoint = `post/${postId}/comments/${commentId}`;

  const { isLoading, data, actionFn } = useAction({
    endpoint,
    method: "DELETE",
    onSuccess,
    onError,
  });

  const deleteComment = useCallback(() => actionFn(), [actionFn]);

  return { isLoading, data, deleteComment };
};

export default useDeleteComment;
