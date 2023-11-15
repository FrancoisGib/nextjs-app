import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function SignupPage() {
    const submit = async (formData: FormData) => {
        "use server"
        const values = formData.values();
        const name = values.next().value
        const email = values.next().value;
        const password = values.next().value;
        const res = await fetch("http://localhost:3000/api/user/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name, email: email, password: password }) });
        const msg = await res.json();
        revalidateTag("user");
        if (!msg.error)
            redirect('/');
        else
            console.log(msg.error)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <form action={submit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="name" className="sr-only">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                        placeholder="Name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-4 px-5 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}