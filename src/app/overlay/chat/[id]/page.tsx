import ChatSocket from "~/components/chat/chat-socket";
import { QUERIES } from "~/server/db/sql";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatOverlay({ params }: Readonly<Props>) {
  const { id } = await params;

  const userDataPromise = QUERIES.getUserDataById(id);
  const chatConfigPromise = QUERIES.getChatConfigByUserId(id);

  const [[user], [chatConfig]] = await Promise.all([
    userDataPromise,
    chatConfigPromise,
  ]);

  return user?.name && user?.refreshToken && chatConfig ? (
    <ChatSocket channelName={user.name} chatConfig={chatConfig} />
  ) : (
    "Error"
  );
}
