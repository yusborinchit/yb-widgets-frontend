import Link from "next/link";
import MainContainer from "~/components/container/main-container";
import Header from "~/components/header";
import { auth } from "~/server/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <Header />
      <MainContainer as="main" className="flex flex-col gap-4">
        <pre className="whitespace-break-spaces rounded bg-neutral-100 p-4">
          {JSON.stringify(session?.user, null, 2)}
        </pre>
        <Link href={`/overlay/chat/${session?.user?.id}`}>Chat</Link>
        <Link href={`/overlay/notification/${session?.user?.id}`}>
          Notifications
        </Link>
        <Link href={`/overlay/triggers/${session?.user?.id}`}>Triggers</Link>
      </MainContainer>
    </>
  );
}
