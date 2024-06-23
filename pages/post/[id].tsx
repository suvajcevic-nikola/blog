import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { Post } from "@/types/post";
import { PageWithHead, PostArticle } from "@/components";
import { fetchService } from "@/lib/fetch";

export const getServerSideProps = (async ({ params }) => {
  const postId = params?.id;
  const response = await fetchService(`post/${postId}`);

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const post: Post = await response.json();
  return { props: { post } };
}) satisfies GetServerSideProps<{ post: Post }>;

export default function Post({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageWithHead title={post.title}>
      <PostArticle post={post} />
    </PageWithHead>
  );
}
