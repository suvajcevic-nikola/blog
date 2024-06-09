import type { Post } from "@/types/post";
import AllPosts from "./post";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const getServerSideProps = (async () => {
  const res = await fetch("https://5ebd9842ec34e900161923e7.mockapi.io/post");
  const posts: Post[] = await res.json();
  return { props: { posts } };
}) satisfies GetServerSideProps<{ posts: Post[] }>;

export default function Home({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <AllPosts posts={posts} />;
}
