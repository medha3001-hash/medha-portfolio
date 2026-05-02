import { client } from "../../../lib/sanity";

const fetchPost = async (slug: string) => {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);

  if (!post) return <div className="bg-black text-green-500 min-h-screen p-8 font-mono">Error 404: Post not found</div>;

  return (
    <article className="bg-black text-green-500 min-h-screen p-8 font-mono max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2"># {post.title}</h1>
      <p className="text-gray-500 border-b border-gray-800 pb-4 mb-6">
        Published: {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {post.body}
      </div>
    </article>
  );
}