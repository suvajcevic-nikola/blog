import { useState } from "react";
import PostListCard from "./list-card";
import type { Post } from "@/types/post";
import DropdownSelect from "../dropdown-select";
import { cls } from "@/utils/helper";

const viewOptions = [
  { id: "grid", label: "Grid", value: "grid" },
  { id: "list", label: "List", value: "list" },
];

const sortOptions = [
  { id: "newest", label: "Newest", value: "date-desc" },
  { id: "oldest", label: "Oldest", value: "date-asc" },
];

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  const [viewOption, setViewOption] = useState(viewOptions[0]);
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  const sortedPosts = posts.sort((a, b) => {
    switch (sortOption.value) {
      case "date-desc":
        return b.createdAt - a.createdAt;
      case "date-asc":
        return a.createdAt - b.createdAt;
      default:
        return 0;
    }
  });

  const isGrid = viewOption.value === "grid";

  return (
    <div className="flex h-full w-full flex-col gap-4 p-8">
      <div className="flex gap-4 px-1">
        <div className="hidden sm:block">
          <DropdownSelect
            title="View"
            options={viewOptions}
            selectedOption={viewOption}
            setSelectedOption={setViewOption}
          />
        </div>
        <DropdownSelect
          title="Sort"
          options={sortOptions}
          selectedOption={sortOption}
          setSelectedOption={setSortOption}
        />
      </div>
      <div
        data-testid="posts-grid"
        className={cls(
          "xs:grid-cols-1 grid gap-4 overflow-x-auto",
          isGrid && "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {sortedPosts.map((post) => (
          <PostListCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
