import { eq } from "drizzle-orm";
import ChatSocket from "~/components/chat/chat-socket";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatOverlay({ params }: Readonly<Props>) {
  const { id } = await params;

  const [user] = await db
    .select({ channelName: users.name })
    .from(users)
    .where(eq(users.id, id));

  return user?.channelName ? (
    <ChatSocket channelName={user.channelName} />
  ) : (
    "Error"
  );
}
