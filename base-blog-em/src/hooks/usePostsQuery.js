import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export const usePostsQuery = (currentPage, maxPostPage) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  // prefetch
  useEffect(() => {
    // 10페이지 까지 사전 데이터를 미리 가져오도록함.
    if(currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => fetchPosts(nextPage));
    }
  }, [currentPage, queryClient])

  // replace with useQuery
  const { data: posts, isError, error, isLoading, isFetching } = useQuery(
    ["posts", currentPage], 
    () => fetchPosts(currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  return { selectedPost, setSelectedPost, posts, isError, error, isLoading, isFetching}
}