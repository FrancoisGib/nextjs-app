import { getPostById } from "@/db/post";
import { MDXRemote } from 'next-mdx-remote/rsc'
 
export default async function PostPage({params}: {params? : {id : number}}) {
    const post = await getPostById(Number(params!.id));
    if (post)
        return (
            <div className="m-10 max-w-xl mx-auto h-[90vh] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-200 p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
                <MDXRemote source={post.content} />
            </div >
        )
}