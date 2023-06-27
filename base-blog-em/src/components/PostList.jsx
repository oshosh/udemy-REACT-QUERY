export function PostList({ posts, setSelectedPost }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className='post-title' onClick={() => setSelectedPost(post)}>
          {post.title}
        </li>
      ))}
    </ul>
  );
}
