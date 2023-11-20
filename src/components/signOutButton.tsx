import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default function SignOutButton() {
    const signOut = async () => {
        "use server"
        cookies().delete("token");
        redirect("/");
    }

    return (
        <>
            <form action={signOut}>
                <button onSubmit={signOut} className="mt-5 mr-8 absolute right-0 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Sign-out</button>
            </form>
        </>


    )
}