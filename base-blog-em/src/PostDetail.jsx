import PostComments from "./PostComments";

import { useMutation } from 'react-query';

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  console.log(response)
  return response.json();
}

export function PostDetail({ post }) {
  const deleteMutation = useMutation((postId) => deletePost(postId));
  const udpateMutation = useMutation((postId) => updatePost(postId));

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button
        onClick={() => deleteMutation.mutate(post.id)}
      >
        Delete
      </button>
      {deleteMutation.isError && <p style={{ color: 'red' }}>Error deleting the post.</p>}
      {deleteMutation.isLoading && <p style={{ color: 'purple' }}>Deleting the post.</p>}
      {deleteMutation.isSuccess && <p style={{ color: 'green' }}>Post has (not) been deleted.</p>}
      <button
        onClick={() => udpateMutation.mutate(post.id)}
      >
        Update title
      </button>
      {udpateMutation.isError && <p style={{ color: 'red' }}>Error updating the post.</p>}
      {udpateMutation.isLoading && <p style={{ color: 'purple' }}>Updating the post.</p>}
      {udpateMutation.isSuccess && <p style={{ color: 'green' }}>Post has (not) been updated.</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      <PostComments postId={post.id} />
    </>
  );
}
