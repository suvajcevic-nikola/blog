import { memo } from "react";
import Link from "next/link";
import { type Post } from "@/types/post";
import PostTitle from "./title";
import PostDescription from "./description";

const PostListCard = memo(({ post }: { post: Post }) => (
  <Link href={`/post/${post.id}`}>
    <div className="flex h-full w-full items-center justify-center rounded-md from-cyan-200 to-emerald-600 p-1 hover:bg-gradient-to-r">
      <div className="flex w-full flex-col gap-4 rounded-md bg-gradient-to-br from-neutral-600 from-60% via-neutral-700 to-emerald-800 p-8">
        <PostTitle>{post.title}</PostTitle>
        <PostDescription>{post.description}</PostDescription>
        {/* <PostDescription>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </PostDescription> */}
      </div>
    </div>
  </Link>
));

PostListCard.displayName = "PostListCard";

export default PostListCard;
