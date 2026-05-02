import Link from "next/link";
import { client } from "../../lib/sanity";

// This asks Sanity for all your posts
const fetchPosts = async () => {
  return await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id, title, "slug": slug.current, description, publishedAt
  }`);
};

export default async function BlogList() {
  const posts = await fetchPosts();

  return (
    <div className="bg-black text-green-500 min-h-screen p-8 font-mono">
      <h1 className="text-2xl mb-6 border-b border-green-500 pb-2">medha@portfolio:~/blog$ ls -la</h1>
      
      <div className="space-y-6">
        {posts.map((post: any) => (
          <div key={post._id} className="border border-gray-800 p-4 hover:border-green-500 transition-colors">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-bold cursor-pointer hover:text-white">./{post.title}</h2>
            </Link>
            <p className="text-gray-500 text-sm mt-1">{new Date(post.publishedAt).toLocaleDateString()}</p>
            <p className="mt-2 text-gray-300">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}