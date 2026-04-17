import { useEffect, useState } from "react";

type PostType = { id: number; title: string; body: string };

export default function Posts() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        const data = await res.json();

        if (mounted) {
          setPosts(data);
        }
      } catch (e) {
        console.error(Error);
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  // console.log(posts);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
