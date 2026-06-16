import { useEffect, useState } from 'react'; 

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-slate-400">Loading...</p>;
  if (error)   return <p className="text-red-400">Error: {error}</p>;

  return (
    <ul className="space-y-3">
      {posts.map(post => (
        <li key={post.id} className="p-4 rounded-xl bg-slate-800 text-slate-200">
          <h3 className="font-bold">{post.title}</h3>
          <p className="text-sm text-slate-400">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}