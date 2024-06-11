import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { Post } from "@/types/post";
import { PostArticle } from "@/components";
import { API_BASE_URL } from "@/utils/constants";

export const getServerSideProps = (async (context) => {
  const postId = context.params?.id;

  const res = await fetch(`${API_BASE_URL}/post/${postId}`);
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
