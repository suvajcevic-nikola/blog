import type { Post } from "@/types/post";
import PostTitle from "./title";
import PostTime from "./time";
import PostText from "./text";
import PostComments from "./comments";

const PostArticle = ({ post }: { post: Post }) => {
  return (
    <div
      data-testid="post-article"
      className="flex h-full w-full justify-center overflow-x-auto p-8"
    >
      <article className="mx-auto w-full max-w-[800px] space-y-8 p-8">
        <PostTime>{post.createdAt}</PostTime>
        <PostTitle>{post.title}</PostTitle>
        <PostText>{post.text}</PostText>
        <PostComments postId={post.id} />
      </article>
    </div>
  );
};

export default PostArticle;
