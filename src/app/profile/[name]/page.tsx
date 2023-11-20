import PostDisplayer from "@/components/postsDisplayer";
import { getPostByUserId } from "@/db/post";
import { getUserByName, getUsers } from "@/db/user";

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

type User = {
    name: string,
    email: string
}

export async function generateStaticParams() {
    const users: User[] = await getUsers();
    return users.map((user: User) => { user: user.name })
}