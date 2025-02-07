import Link from "next/link";
import { auth } from "~/server/auth";
import ProfileButton from "./auth/profile-button";
import MainContainer from "./container/main-container";
import { Button } from "./ui/button";

export default async function Header() {
  const session = await auth();

  return (
    <MainContainer
      as="header"
      className="flex items-center justify-between py-4"
    >
      <Link href="/" className="text-xl font-bold tracking-tighter">
        YusborinWidgets
      </Link>
      {session?.user ? (
        <ProfileButton user={session.user} />
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </MainContainer>
  );
}
