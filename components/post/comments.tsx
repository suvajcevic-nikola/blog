import type { Comment } from "@/types/post";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "../button";

type PostArticleProps = {
  commentsData: {
    isFetching: boolean;
    isError: boolean;
    comments: Comment[] | undefined;
    refetch: () => void;
  };
  postId: string;
};

type FormState = {
  name: string;
  comment: string;
};

type NewComment = {
  postId: string;
  name: string;
  text: string;
  createdAt: number;
};

type NewCommentFormProps = {
  postId: string;
  onSubmit: (comment: NewComment) => void;
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

const NewCommentForm = ({ postId, onSubmit }: NewCommentFormProps) => {
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
        createdAt: Date.now(),
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
      <Button type="submit" disabled={formState.comment?.length < 1}>
        Submit
      </Button>
    </form>
  );
};

const CommentsLoader = () => (
  <div className="text-white">Loading comments...</div>
);

const PostComments = ({ commentsData, postId }: PostArticleProps) => {
  const { isFetching, isError, comments, refetch } = commentsData;

  const commentsCount = Array.isArray(comments) ? comments.length : 0;

  const sortedComments = useMemo(() => {
    return Array.isArray(comments)
      ? comments.sort((a, b) => a.createdAt - b.createdAt)
      : [];
  }, [comments]);

  const handleAddNewComment = (comment: NewComment) => {
    // This is a mock function that simulates adding a new comment and refetching the comments list
    console.log("Adding new comment:", comment);
    refetch();
  };

  if (isError) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col items-start justify-start gap-6">
      <NewCommentForm postId={postId} onSubmit={handleAddNewComment} />
      {isFetching ? (
        <CommentsLoader />
      ) : (
        <>
          <div className="text-xl font-bold text-white">{`Comments (${commentsCount})`}</div>
          {Array.isArray(sortedComments) && (
            <div className="flex flex-col gap-4">
              {sortedComments
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostComments;
