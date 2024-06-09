import Link from "next/link";
import { Post } from "@/types/post";
import { PostArticle } from "@/components";

type AllPostsProps = {
  posts: Post[];
};

export default function AllPosts({ posts }: AllPostsProps) {
  return (
    <div className="flex flex-wrap gap-4 overflow-x-auto p-8">
      {posts
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <PostArticle post={post} />
          </Link>
        ))}
    </div>
  );
}
