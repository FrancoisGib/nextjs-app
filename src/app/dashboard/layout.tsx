import SignOutButton from "@/components/signOutButton";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <>
            <SignOutButton />
            {children}
        </>
    )
}