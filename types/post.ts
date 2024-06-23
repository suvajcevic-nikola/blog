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
  createdAt: number;
  name: string;
  text: string;
};

export type NewComment = Omit<Comment, "id" | "createdAt">;