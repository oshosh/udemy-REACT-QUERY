import { useState } from 'react';
import { PostDetail } from './PostDetail';
import { usePostsQuery } from './hooks/usePostsQuery';
import { PostList } from './components/PostList';
import { PostPagination } from './components/PostPagination';
import { MAX_POST_PAGE } from './constants/variable';

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedPost, setSelectedPost, posts, isError, error, isLoading, isFetching } =
    usePostsQuery(currentPage, MAX_POST_PAGE);

  // isFetching => 캐시된 데이터를 표시하면서 업데이트 여부 판단
  // isLoading => isFetching의 하위 데이터 쿼리에 대해서 캐시된 데이터가 없음 상태에서 발생하고 캐시가 있는 경우는 작동 안함
  if (isLoading) return <h3>Loading...</h3>;
  // if (isFetching) return <h3>Fetch process...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <PostList posts={posts} setSelectedPost={setSelectedPost} />
      <PostPagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
