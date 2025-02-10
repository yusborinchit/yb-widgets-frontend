import Link from "next/link";
import { auth } from "~/server/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <pre className="whitespace-break-spaces rounded bg-neutral-100 p-4">
        {JSON.stringify(session?.user, null, 2)}
      </pre>
      <Link href="/dashboard/chat">Chat</Link>
    </>
  );
}
