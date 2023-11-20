import Header from "@/components/header";
import PostDisplayer from "@/components/postsDisplayer";
import RedirectButton from "@/components/redirectButton";
import { getPosts } from "@/db/post"
import { getAuth } from "@/lib/auth";

type Post = {
  author: {
    name: string;
  };
  title: string;
  id: number;
}

type User = {
  name: string;
  email: string;
}

const UserInfo = ({ user }: { user: User }) => (
  <div className="absolute top-0 left-0 m-4 bg-white border border-gray-200 rounded-lg p-4">
    <h2 className="text-lg font-bold mb-2">{user.name}</h2>
    <p className="text-gray-700">{user.email}</p>
  </div>
)

export default async function Home() {
  const auth = await getAuth();
  const getComponent = () => {
    if (auth)
      return <Header />
    return <RedirectButton title="Login" redirect="/login" />
  }
  const res = getComponent();

  const posts: Post[] = await getPosts();

  return (
    <>
      {res}
      {auth && <UserInfo user={auth} />}
      <PostDisplayer posts={posts} />
    </>
  )
}