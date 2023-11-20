import PostDisplayer from "@/components/postsDisplayer";
import { getPostByUserId } from "@/db/post";
import { getAuth } from "@/lib/auth"

type Post = {
    author: {
        name: string;
    };
    title: string;
    id: number;
}

export default async function Profile() {
    const user = await getAuth();
    const userPosts: Post[] | void = await getPostByUserId(user!.id);
    if (user) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">{user.name}</h1>
                                <p className="mt-2 text-gray-600">{user.email}</p>
                            </div>
                            <div className="mt-10 grid grid-cols-3 gap-4">
                                {userPosts!.map((post, index) => (
                                    <div key={post.id} className={`p-4 rounded-lg shadow-md overflow-hidden ${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'}`}>
                                        <a href={`/post/${post.id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{post.title}</a>
                                        <p className="mt-2 text-gray-600">{post.author.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}