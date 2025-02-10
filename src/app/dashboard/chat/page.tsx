import ChatPreview from "~/components/chat-preview";
import EditChatForm from "~/components/form/edit-chat-form";
import { auth } from "~/server/auth";
import { QUERIES } from "~/server/db/sql";

export default async function ChatPage() {
  const session = await auth();

  const [chatConfig] = await QUERIES.getChatConfigByUserId(session!.user.id);
  if (!chatConfig) return <div>Chat config not found</div>;

  return (
    <div className="grid gap-8">
      <ChatPreview chatConfig={chatConfig} />
      <EditChatForm chatConfig={chatConfig} />
    </div>
  );
}
