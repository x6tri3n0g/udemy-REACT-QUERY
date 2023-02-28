import PostComments from "./PostComments";

export function PostDetail({ post }) {
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      <PostComments postId={post.id} />
    </>
  );
}
