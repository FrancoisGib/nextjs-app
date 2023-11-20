import { getUserById } from "@/db/user";
import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreatePost() {
    const token = cookies().get("token")?.value;
    let user: { id: number, name: string, email: string } | null;
    if (token) {
        const res = await jwtVerify(token, getJwtSecretKey());
        user = await getUserById(Number(res.payload.id));
    }
    else {
        redirect("/login");
    }

    const create = async (formData: FormData) => {
        "use server"
        const title = formData.get("title")!.toString();
        const published = Boolean(formData.get("published"));
        const content = formData.get("content")!.toString();
        let post = { title: title, published: published, content: content, authorEmail: user?.email };
        const res = await fetch("http://localhost:3000/api/post/create", { body: JSON.stringify(post), method: "POST", headers: { "Content-Type": "application/json" } })
        const newPost = await res.json();
        if (!res.ok)
            console.log(newPost.error);
        redirect(`/post/${newPost.id}`);
    }
    return (
        <>
            Name : {user?.name}  <br></br>  Email : {user?.email}
            <form action={create} id="postform">
                <input type="text" name="title" placeholder="Title" />
                <input type="checkbox" name="published" />
                <button type="submit" className="mt-5 mr-8 absolute right-0 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Create Post</button>
            </form>
            <textarea name="content" className="w-[90vw] h-[90vh] mx-[5%] mt-[10vh]" form="postform"></textarea>
        </>
    )
}