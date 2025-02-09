import ChatSocket from "~/components/chat/chat-socket";
import { QUERIES } from "~/server/db/sql";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatOverlay({ params }: Readonly<Props>) {
  const { id } = await params;

  const userNamePromise = QUERIES.getUserNameById(id);
  const chatConfigPromise = QUERIES.getChatConfigByUserId(id);

  const [[user], [chatConfig]] = await Promise.all([
    userNamePromise,
    chatConfigPromise,
  ]);

  return user?.channelName && chatConfig ? (
    <ChatSocket channelName={user.channelName} chatConfig={chatConfig} />
  ) : (
    "Error"
  );
}
