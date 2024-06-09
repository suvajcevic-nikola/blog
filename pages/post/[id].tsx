import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { Post } from "@/types/post";
import { PostArticle } from "@/components";

export const getServerSideProps = (async (context) => {
  const postId = context.params?.id;

  const res = await fetch(
    `https://5ebd9842ec34e900161923e7.mockapi.io/post/${postId}`,
  );
  const post: Post = await res.json();
  return { props: { post } };
}) satisfies GetServerSideProps<{ post: Post }>;

export default function Post({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
    <Head>
      <title>{post.title}</title>
    </Head>
    <div className="flex h-full w-full justify-center overflow-x-auto p-8">
      <PostArticle post={post} />
    </div>
    </>
  );
}
