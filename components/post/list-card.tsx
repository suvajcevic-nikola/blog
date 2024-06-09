import { type Post } from "@/types/post";
import PostTitle from "./title";
import PostDescription from "./description";

type PostListCardProps = {
  post: Post;
};

const PostListCard = ({ post }: PostListCardProps) => (
  <div className="flex w-[260px] flex-col gap-4 rounded-md bg-neutral-600 p-8 sm:w-[400px]">
    <PostTitle>{post.title}</PostTitle>
    <PostDescription>{post.description}</PostDescription>
  </div>
);

export default PostListCard;
