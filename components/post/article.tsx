import type { Post } from "@/types/post";
import PostTitle from "./title";
import PostTime from "./time";
import PostText from "./text";
import PostComments from "./comments";
import useComments from "@/hooks/useComments";

type PostArticleProps = {
  post: Post;
};

const PostArticle = ({ post }: PostArticleProps) => {
  const commentsData = useComments(post.id);
  
  return (
    <article className="mx-auto w-full max-w-[800px] space-y-8 p-8">
      <PostTime>{post.createdAt}</PostTime>
      <PostTitle>{post.title}</PostTitle>
      <PostText>{post.text}</PostText>
      <PostComments commentsData={commentsData} postId={post.id} />
    </article>
  );
};

export default PostArticle;
