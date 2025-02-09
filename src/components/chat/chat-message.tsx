"use client";

import { parseMessageToHTML } from "~/lib/utils";
import { type chats } from "~/server/db/schema";
import ChatBadge from "./chat-badge";
import { type Message } from "./chat-socket";

interface Props {
  message: Message;
  chatConfig: typeof chats.$inferSelect;
}

export default function ChatMessage({
  message: { id, color, emotes, isModerator, isSubscriber, username, message },
  chatConfig,
}: Readonly<Props>) {
  return (
    <div
      key={id}
      style={
        {
          "--chat-font-size": `${chatConfig.fontSize}px`,
          "--chat-user-color": color,
        } as React.CSSProperties
      }
      className="flex items-start gap-2 animate-in slide-in-from-left-[1000px]"
    >
      <div className="flex w-fit items-center gap-2">
        {isSubscriber && (
          <ChatBadge src="/badges/sub.png" username={username} />
        )}
        {isModerator && <ChatBadge src="/badges/mod.png" username={username} />}
        <p className="font-bold [color:var(--chat-user-color)] [font-size:var(--chat-font-size)]">
          {username}
        </p>
      </div>
      <p
        className="flex flex-1 flex-wrap items-center gap-2 break-all text-white [font-size:var(--chat-font-size)]"
        dangerouslySetInnerHTML={{
          __html: parseMessageToHTML(message, emotes, chatConfig.fontSize),
        }}
      />
    </div>
  );
}
