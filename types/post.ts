export type Post = {
  id: string;
  createdAt: number;
  title: string;
  description: string;
  text: string;
};

export type Comment = {
  id: string;
  postId: string;
  name: string;
  text: string;
  createdAt: number;
};
