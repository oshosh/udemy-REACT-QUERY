import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}
 
export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    // 10페이지 까지 사전 데이터를 미리 가져오도록함.
    if(currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => fetchPosts(nextPage));
    }
  }, [currentPage, queryClient])

  // replace with useQuery
  const { data, isError, error, isLoading, isFetching } = useQuery(
    ["posts", currentPage], 
    () => fetchPosts(currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });
  // isFetching => 캐시된 데이터를 표시하면서 업데이트 여부 판단
  // isLoading => isFetching의 하위 데이터 쿼리에 대해서 캐시된 데이터가 없음 상태에서 발생하고 캐시가 있는 경우는 작동 안함

  if (isLoading) return <h3>Loading...</h3>;
  // if (isFetching) return <h3>Fetch process...</h3>;
  if (isError) return <><h3>Oops, something went wrong</h3><p>{error.toString()}</p></>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button 
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prevPage) => prevPage - 1)
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button 
          disabled={currentPage === maxPostPage}
          onClick={() => {
            setCurrentPage((prevPage) => prevPage + 1)
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
