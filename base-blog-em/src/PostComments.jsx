import { useMemo } from 'react';
import { useQuery } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

const COMMENTS_STALE_TIME = 3000;

export default function PostComments({ postId }) {
  const { data, isError, error, isLoading } = useQuery(
    ['comments', postId], 
    () => fetchComments(postId), 
    { staleTime: COMMENTS_STALE_TIME }
  );

  if (isLoading) return <div>로딩중...</div>;
  if (isError) {
    return (
      <>
        <h3>에러 발생!</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  )
}