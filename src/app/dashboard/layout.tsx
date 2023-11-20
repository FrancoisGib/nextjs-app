import Header from "@/components/header";
import SignOutButton from "@/components/signOutButton";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <SignOutButton />
      {children}
    </>
  )
}