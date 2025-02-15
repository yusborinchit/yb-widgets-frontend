import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ChatPreview from "~/components/chat-preview";
import EditChatForm from "~/components/form/edit-chat-form";
import SecretLink from "~/components/secret-link";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { QUERIES } from "~/server/db/sql";

export default async function ChatDashboard() {
  const session = await auth();

  const [chatConfig] = await QUERIES.getChatConfigByUserId(session!.user.id);
  if (!chatConfig) return <div>Chat config not found</div>;

  const chatLink = `${env.NEXT_PUBLIC_SITE_URL}/overlay/chat/${chatConfig.channelId}`;

  return (
    <div>
      <Link
        href="/dashboard"
        className="flex items-center font-medium tracking-tighter"
      >
        <ArrowLeft className="size-4" /> <span>Go Back</span>
      </Link>
      <SecretLink link={chatLink} />
      <ChatPreview chatConfig={chatConfig} />
      <EditChatForm chatConfig={chatConfig} />
    </div>
  );
}
