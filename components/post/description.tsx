const PostDescription = ({ children }: { children: string }) => (
  <p className="line-clamp-4 overflow-hidden text-ellipsis text-lg text-emerald-200">
    {children}
  </p>
);

export default PostDescription;
