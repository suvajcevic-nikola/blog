import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { PageWithHead, PostsGrid, Spinner } from "@/components";
import type { Post } from "@/types/post";
import { API_BASE_URL } from "@/utils/constants";
import dynamic from "next/dynamic";

const DynamicErrorPlaceholder = dynamic(
  () =>
    import("@/components/error-boundary").then((mod) => mod.ErrorPlaceholder),
  {
    loading: () => <Spinner srText="Loading Fallback..." />,
  },
);

export const getServerSideProps = (async ({ res }) => {
  let posts: Post[] = [];
  let isError = false;

  const response = await fetch(`${API_BASE_URL}/post`);

  if (response.ok) {
    posts = await response.json();
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300",
    );
  } else {
    isError = true;
  }

  return { props: { posts, isError } };
}) satisfies GetServerSideProps<{ posts: Post[] }>;

export default function AllPosts({
  posts,
  isError,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (isError) {
    return (
      <DynamicErrorPlaceholder
        buttonTitle="Try again?"
        onButtonClick={() => window.location.reload()}
      />
    );
  }

  return (
    <PageWithHead title="Blog Posts">
      <PostsGrid posts={posts} />
    </PageWithHead>
  );
}
