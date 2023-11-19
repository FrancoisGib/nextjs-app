import { getUserById } from "@/db/user";
import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const token = cookies().get("token")?.value;
    let user;
    if (token) {
        const res = await jwtVerify(token, getJwtSecretKey());
        user = await getUserById(Number(res.payload.id));
    }
    else {
        redirect("/login");
    }

    return (
        <div className="bg-white h-[100%] w-[100%] absolute flex justify-center items-center">
            <div className=" w-[90vw] h-[90vh] rounded-lg shadow-[0_0_40px_purple]"><p color="white">{user?.name}, {user?.email}</p></div>
        </div>
    )
}