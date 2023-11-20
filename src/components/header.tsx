import Link from "next/link";
import SignOutButton from "./signOutButton";

export default function Header() {
    return (
        <>
            <div className="flex justify-center space-x-4 mt-4">
                <Link href="/" className="text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 rounded px-2 py-1 transition-colors duration-200">Menu</Link>
                <Link href="/profile" className="text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 rounded px-2 py-1 transition-colors duration-200">Profile</Link>
                <Link href="/dashboard" className="text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 rounded px-2 py-1 transition-colors duration-200">Dashboard</Link>
            </div>
            <SignOutButton />
        </>
    )
}