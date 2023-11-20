import PostDisplayer from "@/components/postsDisplayer";
import { getPostByUserId } from "@/db/post";
import { getUserByName } from "@/db/user";

type Post = {
    author: {
        name: string;
    };
    title: string;
    id: number;
}

export default async function ProfilePage({
    params
}: {
    params: { name: string };
}) {

    const user = await getUserByName(params.name);
    const userPosts: Post[] | void = await getPostByUserId(user!.id);

    if (user)
        return (
            <>
                <PostDisplayer posts={userPosts!} />
            </>


        );



}