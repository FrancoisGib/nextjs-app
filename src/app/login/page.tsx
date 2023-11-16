import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
    async function login(formData: FormData) {
        'use server'
        console.log(formData.values());
        const email = formData.get("email");
        const password = formData.get("password");
        const res = await fetch(`http://localhost:3000/api/user/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, password: password }) });
        const user = await res.json();
        if (!user.error) {
            cookies().set("auth", JSON.stringify(user), {sameSite: "strict"});
            revalidatePath("/");
            redirect("/");
        }
    }

    return (
        <>
            <Link href="/sign-up" className="mt-5 mr-8 absolute right-0 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Sign up</Link>
            <div className="flex justify-center items-center h-screen">
                <form className="w-[300px] p-4 bg-white shadow-md rounded-md" action={login}>
                    <h2 className="text-2xl font-bold mb-4">Log In</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </>
    );
}