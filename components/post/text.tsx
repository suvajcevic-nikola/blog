const PostText = ({ children }: { children: string }) => (
  <p className="line-clamp-2 overflow-hidden text-ellipsis text-lg text-white">
    {children}
  </p>
);

export default PostText;
