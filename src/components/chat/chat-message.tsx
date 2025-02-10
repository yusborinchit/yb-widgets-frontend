"use client";

import { type chats } from "~/server/db/schema";
import ChatBadge from "./chat-badge";
import { type Message } from "./chat-socket";

interface Props {
  message: Message;
  chatConfig: typeof chats.$inferSelect;
}

export default function ChatMessage({
  message: { id, color, isModerator, isSubscriber, username, message },
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
        className="flex flex-1 flex-wrap items-center gap-1 break-all text-white [font-size:var(--chat-font-size)] [&>img]:size-[calc(var(--chat-font-size)*1.5)]"
        dangerouslySetInnerHTML={{
          __html: message,
        }}
      />
    </div>
  );
}
