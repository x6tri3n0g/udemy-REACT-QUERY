import PostComments from "./PostComments";

import { useMutation } from 'react-query';

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const deleteMutation = useMutation((postId) => deletePost(postId));

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
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      <PostComments postId={post.id} />
    </>
  );
}
