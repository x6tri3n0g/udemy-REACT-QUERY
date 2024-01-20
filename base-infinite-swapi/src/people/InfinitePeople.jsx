import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetching, 
    isLoading, 
    isError, 
    error 
  } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.toString()}</div>;
  }

  return (
    <>
      {isFetching && (
        <div className="loading">Loading...</div>
      )}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person, index) => (
            <Person 
              key={`${person.name}-${index}`}
              name={person.name} 
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          ))
        })}
      </InfiniteScroll>
    </>
  );
}
