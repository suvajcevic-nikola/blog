import { type Post } from "@/types/post";
import PostTitle from "./title";
import PostDescription from "./description";

type PostArticleProps = {
  post: Post;
};

export default function PostArticle(props: PostArticleProps) {
  const { post } = props;

  return (
    <article className="w-[260px] rounded-md bg-neutral-600 p-8 sm:w-[400px]">
      <PostTitle>{post.title}</PostTitle>
      <PostDescription>{post.description}</PostDescription>
    </article>
  );
}
