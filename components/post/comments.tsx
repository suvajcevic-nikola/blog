import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Button from "../button";
import Spinner from "../spinner";
import { useComments, useAddNewComment } from "@/hooks";
import type { Comment, NewComment } from "@/types/post";
import type { CustomError } from "@/types/data";
import { cls } from "@/utils/helper";
import useDeleteComment from "@/hooks/comments/useDeleteComment";

type FormState = {
  name: string;
  comment: string;
};

type VoteAction = { type: "increment" } | { type: "decrement" };

const senderName = (name: unknown) => {
  return typeof name === "string" && name.length > 0 ? name : "Anonymous";
};

const voteReducer = (state: number, action: VoteAction) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

const CommentItem = ({
  postId,
  comment,
  isMagicModeActive,
  refetchComments,
}: {
  postId: string;
  comment: Comment;
  isMagicModeActive: boolean;
  refetchComments: () => void;
}) => {
  const [voteCount, dispatch] = useReducer(voteReducer, 0);

  const onDeleteCommentSuccess = useCallback(() => {
    refetchComments();
  }, [refetchComments]);

  const onDeleteCommentError = useCallback((error: CustomError) => {
    alert(`"Failed to delete comment: ${error.message ?? "Unknown error"}`);
  }, []);

  const { isLoading: isLoadingDeleteComment, deleteComment } = useDeleteComment(
    {
      postId,
      commentId: comment.id,
      onSuccess: onDeleteCommentSuccess,
      onError: onDeleteCommentError,
    },
  );

  const handleDeleteComment = useCallback(() => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this comment?",
    );
    if (!isConfirmed) return;
    deleteComment();
  }, [deleteComment]);

  return (
    <div className="flex w-full flex-col justify-between sm:flex-row sm:items-center">
      <div className="flex h-full flex-col gap-1 sm:w-10/12">
        <p className="font-bold text-white">{senderName(comment.name)}</p>
        <p className="text-white">{comment.text}</p>
        <time
          className="text-sm font-light text-white"
          suppressHydrationWarning
        >
          {comment.createdAt
            ? new Date(comment.createdAt * 1000).toLocaleDateString()
            : null}
        </time>
      </div>
      <div className="flex h-full items-center justify-end gap-2 sm:w-2/12">
        {isMagicModeActive ? (
          <button
            onClick={handleDeleteComment}
            aria-label="Delete comment"
            className="text-red-500"
            disabled={isLoadingDeleteComment}
          >
            &#10006;
          </button>
        ) : (
          <div className="flex justify-between gap-2 text-white">
            <button
              onClick={() => dispatch({ type: "increment" })}
              aria-label="Increase vote count"
            >
              &#708;
            </button>
            <p className="w-8 text-center">{voteCount}</p>
            <button
              onClick={() => dispatch({ type: "decrement" })}
              aria-label="Decrease vote count"
            >
              &#709;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentsCount = ({
  count,
  isMagicModeActive,
  setIsMagicModeActive,
}: {
  count: number;
  isMagicModeActive: boolean;
  setIsMagicModeActive: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [clickCount, setClickCount] = useState(0);
  const maxClickCount = 20;

  const handleClickCount = useCallback(() => {
    setClickCount((prevCount) => prevCount + 1);
  }, [setClickCount]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (clickCount > 0 && !timer) {
      timer = setTimeout(() => {
        setClickCount(0);
        timer = null;
      }, 10000);
    }

    if (clickCount >= maxClickCount) {
      setIsMagicModeActive(true);
      setClickCount(0);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [clickCount, setIsMagicModeActive]);

  useEffect(() => {
    let magicModeTimer: NodeJS.Timeout | null = null;

    if (isMagicModeActive) {
      magicModeTimer = setTimeout(() => {
        setIsMagicModeActive(false);
      }, 60000);
    }

    return () => {
      if (magicModeTimer) {
        clearTimeout(magicModeTimer);
      }
    };
  }, [isMagicModeActive, setIsMagicModeActive]);

  return (
    <div className="rounded-m relative flex h-8 items-center">
      <div
        className={cls(
          "absolute h-full w-full rounded-md bg-gradient-to-r from-neutral-600 via-purple-500 to-fuchsia-600",
          isMagicModeActive && "animate-pulse",
        )}
      />
      <div
        style={{
          left: isMagicModeActive
            ? "100%"
            : `${(clickCount / maxClickCount) * 100}%`,
        }}
        className="absolute z-10 h-full w-full bg-neutral-900"
      />
      <button
        className="z-20 select-none text-xl font-bold text-white"
        onClick={handleClickCount}
        disabled={isMagicModeActive}
      >{`Comments (${count})`}</button>
    </div>
  );
};

const CommentsSkeleton = () => (
  <div className="flex w-full animate-pulse flex-col gap-4">
    <div className="h-8 w-4/12 rounded-md bg-neutral-600" />
    {Array(8)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="flex h-12 gap-2">
          <div className="aspect-square h-full w-1/12 rounded-md bg-neutral-600" />
          <div className="h-full w-full rounded-md bg-gradient-to-r from-neutral-600/80 to-neutral-600/20" />
        </div>
      ))}
    <span className="sr-only">Loading Comments...</span>
  </div>
);

const NewCommentForm = ({
  postId,
  onSubmit,
  isLoadingSubmit,
}: {
  postId: string;
  onSubmit: (comment: NewComment) => void;
  isLoadingSubmit: boolean;
}) => {
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
      data-testid="new-comment-form"
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

const PostComments = ({ postId }: { postId: string }) => {
  const [isMagicModeActive, setIsMagicModeActive] = useState(false);

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    comments,
    commentsCount,
    error: commentsError,
    refetch: refetchComments,
  } = useComments(postId);

  const onAddNewCommentSuccess = useCallback(() => {
    refetchComments();
  }, [refetchComments]);

  const onAddNewCommentError = useCallback((error: CustomError) => {
    alert(`"Failed to add new comment: ${error.message ?? "Unknown error"}`);
  }, []);

  const { isLoading: isLoadingAddNewComment, addNewComment } = useAddNewComment(
    {
      postId,
      onSuccess: onAddNewCommentSuccess,
      onError: onAddNewCommentError,
    },
  );

  const handleAddNewComment = useCallback(
    async (comment: NewComment) => {
      await addNewComment(comment);
    },
    [addNewComment],
  );

  if (isErrorComments && commentsError?.status === 500) {
    return null;
  }

  return (
    <div data-testid="post-comments" className="mt-4 flex flex-col items-start justify-start gap-6">
      <NewCommentForm
        postId={postId}
        onSubmit={handleAddNewComment}
        isLoadingSubmit={isLoadingAddNewComment}
      />
      {isLoadingComments ? (
        <CommentsSkeleton />
      ) : (
        <>
          <CommentsCount
            count={commentsCount}
            isMagicModeActive={isMagicModeActive}
            setIsMagicModeActive={setIsMagicModeActive}
          />
          <div className="flex w-full flex-col gap-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                postId={postId}
                comment={comment}
                isMagicModeActive={isMagicModeActive}
                refetchComments={refetchComments}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostComments;
