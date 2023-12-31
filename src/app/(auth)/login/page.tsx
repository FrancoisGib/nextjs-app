import RedirectButton from "@/components/redirectButton";
import { compare, getJwtSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage({searchParams}: {searchParams? : {error? : string}}) {

    const error = searchParams?.error ? "Invalid entries" : null

    async function login(formData: FormData) {
        'use server'
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const passwordChecked = await compare(email!, password!);
        if (!passwordChecked)
            redirect("/login?error=1");
        const res = await fetch(`http://localhost:3000/api/user/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, password: password }) });
        const user = await res.json();
        if (!user.error) {
            const key = getJwtSecretKey();
            const token = await new SignJWT({ id: user.id }).setProtectedHeader({ alg: "HS256" }).sign(key);
            cookies().set("token", token, { sameSite: true });
            redirect("/");
        }
    }

    return (
        <>
            <RedirectButton title="Sign up" redirect="/sign-up" />
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
                    {error}
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