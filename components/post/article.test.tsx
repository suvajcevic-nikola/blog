const { expect, describe, it } = require("@jest/globals");

import { render, screen } from "@testing-library/react";
import PostArticle from "./article";
import type { Post } from "@/types/post";

describe("PostArticle", () => {
  const mockPost: Post = {
    id: "1",
    createdAt: new Date().getTime(),
    title: "Test Title",
    description: "Test Description",
    text: "Test Text",
  };

  it("renders the post data correctly", () => {
    render(<PostArticle post={mockPost} />);

    expect(
      screen.getByText(
        new Date(mockPost.createdAt * 1000).toLocaleDateString(),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.text)).toBeInTheDocument();
  });

  it("renders the PostComments component with the correct postId", () => {
    render(<PostArticle post={mockPost} />);
  });
});
