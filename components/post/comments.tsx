import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "../button";
import Spinner from "../spinner";
import { useComments, useAddNewComment } from "@/hooks";
import type { Comment, NewComment } from "@/types/post";
import type { CustomError } from "@/types/data";

type PostArticleProps = {
  postId: string;
};

type FormState = {
  name: string;
  comment: string;
};

type NewCommentFormProps = {
  postId: string;
  onSubmit: (comment: NewComment) => void;
  isLoadingSubmit: boolean;
};

const senderName = (name: unknown) => {
  return typeof name === "string" && name.length > 0 ? name : "Anonymous";
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div>
      <p className="font-bold text-white">{senderName(comment.name)}</p>
      <p className="text-white">{comment.text}</p>
      <time className="text-sm font-light text-white" suppressHydrationWarning>
        {comment.createdAt
          ? new Date(comment.createdAt * 1000).toLocaleDateString()
          : null}
      </time>
    </div>
  );
};

const NewCommentForm = ({
  postId,
  onSubmit,
  isLoadingSubmit,
}: NewCommentFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const defaultFormState: FormState = { name: "", comment: "" };
  const [formState, setFormState] = useState<FormState>(defaultFormState);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    },
    [formState],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newComment: NewComment = {
        postId: postId,
        name: formState.name,
        text: formState.comment,
      };
      formRef.current?.reset();
      onSubmit(newComment);
    },
    [formState, postId, onSubmit],
  );

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit}
      onReset={() => setFormState(defaultFormState)}
      ref={formRef}
      data-test="new-comment-form"
    >
      <label className="flex flex-col gap-2">
        <span className="text-white">Name</span>
        <input
          type="text"
          name="name"
          className="rounded-md border-neutral-400 bg-neutral-700 p-2 text-white outline-fuchsia-500"
          onChange={handleInputChange}
          aria-label="Name"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-white">{"Comment (required)"}</span>
        <textarea
          name="comment"
          required
          className="rounded-md border-neutral-400 bg-neutral-700 p-2 text-white outline-fuchsia-500"
          onChange={handleInputChange}
          aria-label="Comment"
          rows={4}
        />
      </label>
      {isLoadingSubmit ? (
        <Spinner srText="Adding new comment in progress..." />
      ) : (
        <Button type="submit" disabled={formState.comment?.length < 1}>
          Submit
        </Button>
      )}
    </form>
  );
};

const PostComments = ({ postId }: PostArticleProps) => {
  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    comments,
    commentsCount,
    error: commentsError,
    refetch: refetchComments,
  } = useComments(postId);

  const { isLoading: isLoadingAddNewComment, addNewComment } = useAddNewComment(
    {
      postId,
      onSuccess: onAddNewCommentSuccess,
      onError: onAddNewCommentError,
    },
  );

  const handleAddNewComment = async (comment: NewComment) => {
    await addNewComment(comment);
  };

  function onAddNewCommentSuccess() {
    refetchComments();
  }

  function onAddNewCommentError(error: CustomError) {
    alert(`"Failed to add new comment: ${error.message ?? "Unknown error"}`);
  }

  if (isErrorComments && commentsError?.status === 500) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col items-start justify-start gap-6">
      <NewCommentForm
        postId={postId}
        onSubmit={handleAddNewComment}
        isLoadingSubmit={isLoadingAddNewComment}
      />
      {isLoadingComments ? (
        <Spinner srText="Loading Comments..." />
      ) : (
        <>
          <div className="text-xl font-bold text-white">{`Comments (${commentsCount})`}</div>
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostComments;
