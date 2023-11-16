import { cookies } from "next/headers"

export default function DashboardPage() {
    const authCookie = cookies().get("auth");
    const id = JSON.parse(authCookie!.value).id;
    console.log(id)


    return (
        <div className="bg-white h-[100%] w-[100%] absolute flex justify-center items-center">
            <div className=" w-[90vw] h-[90vh] rounded-lg shadow-[0_0_40px_purple]"><p color="white">{id}</p></div>
        </div>
    )
}