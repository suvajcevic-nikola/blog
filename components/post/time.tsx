const PostTime = ({ children }: { children: number }) => (
  <time className="text-sm font-light text-white" suppressHydrationWarning>
    {new Date(children * 1000).toLocaleDateString() ?? null}
  </time>
);

export default PostTime;
