import PostDisplayer from "@/components/postsDisplayer";
import { getPosts } from "@/db/post"

type Post = {
    author: {
        name: string;
    };
    title: string;
    id: number;
}

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <PostDisplayer posts={posts} />
  )
}

