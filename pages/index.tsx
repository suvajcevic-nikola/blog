import Link from "next/link";
import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Post } from "@/types/post";
import { PostListCard } from "@/components";

export const getServerSideProps = (async () => {
  const res = await fetch("https://5ebd9842ec34e900161923e7.mockapi.io/post");
  const posts: Post[] = await res.json();
  return { props: { posts } };
}) satisfies GetServerSideProps<{ posts: Post[] }>;

export default function AllPosts({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>All Blog Posts</title>
      </Head>
      <div className="flex flex-wrap gap-4 overflow-x-auto p-8">
        {posts
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <PostListCard post={post} />
            </Link>
          ))}
      </div>
    </>
  );
}
