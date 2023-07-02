import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery('sw-people', ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        // return lastPage.next || undefined;
        const nextPage = allPages.length + 1;
        return lastPage.results.length === 0 ? undefined : `${initialUrl}?page=${nextPage}`;
      },
    });
  // TODO: get data for InfiniteScroll via React Query
  if (isLoading) return <div className='loading'>Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className='loading'>Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
