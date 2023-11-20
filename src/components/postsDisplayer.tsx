import Link from "next/link";

type Post = {
    author: {
        name: string;
    };
    title: string;
    id: number;
}

export default function PostDisplayer({ posts }: { posts: Post[] }) {
    return (
        <>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4 justify-items-center w-[80vw] mx-auto mt-[10%]">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden w-full">
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{post.author.name}</div>
                            <Link href={`/post/${post.id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{post.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}