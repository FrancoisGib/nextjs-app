import Link from "next/link";

export default function RedirectButton({redirect, title} : {redirect: string, title: string}) {
    return (
        <Link href={redirect} className="mt-5 mr-8 absolute top-0 right-0 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >{title}</Link>
    )
}