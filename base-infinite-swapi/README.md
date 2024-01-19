# Infinite SWAPI

### A project to demonstrate React Query useInfiniteQuery, for the Udemy course "React Query: Server State Management for React"

## Installation

#. Download this directory, or clone or fork this repo
#. `npm install --legacy-peer-deps`

**Note** The `--legacy-peer-deps` is very important since this project uses [React Infinite Scroller](https://www.npmjs.com/package/react-infinite-scroller), which doesn't (yet) support React 17.

## Running the App

Run `npm start`. The app will be found at [http://localhost:3000]

## Server

This app uses the [Star Wars API](https://swapi.dev/) server.

## NOTE
### Basic
```js
const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});
```

### The Flow
1. Component mounts
  - `useInfiniteQuery()`는 data: `undefined`
    - 왜냐하면 아직 쿼리를 만들지 않았기 때문에
  - 쿼리 함수가 실행되면 첫 페이지를 가져옴
    - 이때 가져오는 페이지가 pageParam argument를 통해 가져오게 됨
    - 따라서, 우리가 정의한 `defaultUrl: string`이 이 요소의 기본값
2. Fetch first page
  - `data.pages[0]: { ... }`: 첫번째 페이지, 쿼리 함수가 반환하는 값
3. `getNextPageParam` Update `pageParam`
  - 데이터가 반환된 후 RQ가 `getNextPageParam`을 실행
    - `getNextPageParam`은 `lastPage`, `allPages`를 사용해서 (queryFn의) `pageParam`를 업데이트함
    - `lastPage.next`를 정상적으로 반환하면 `pageParam`으로 다음 페이지에 대한 URL를 반환함
4. `fetchNextPage` 함수 트리거
  - 유저가 scroll 혹은 button를 클릭하여 `fetchNextPage` 함수를 트리거하면 다음 페이지를 호출 
    -> 다시 `3`: Update `pageParam` / `getNextPageParam`을 실행할때 `nextPageParam`은 정의되지 않음
      - `data.pages[1]: { ... }`
  - `hasNextPage: true`
5. 다음 페이지가 없는 경우 `pageParam: undefined`
    - `hasNextPage`는 `false`가 반환


### useInfiniteQuery의 return "data"
```
{
    "pages": [
        {
            "count": number,  // 데이터 수
            "next": string, // 다음 페이지의 url
            "previous": null, // 이전 페이지가 없다면 null 혹은 page에 parameter를 조합한 url
            "results": Data[],
        },
    ],
    "pageParams": PageParam[] // page parameter를 포함한 url 혹은 null
}
```