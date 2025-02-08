"use client";

import { parseMessageToHTML } from "~/lib/utils";
import ChatBadge from "./chat-badge";
import { type Message } from "./chat-socket";

interface Props {
  message: Message;
}

export default function ChatMessage({
  message: { id, color, emotes, isModerator, isSubscriber, username, message },
}: Readonly<Props>) {
  return (
    <div
      key={id}
      className="flex items-start gap-2 text-lg text-white animate-in slide-in-from-left-[1000px]"
    >
      {isSubscriber && <ChatBadge src="/badges/sub.png" username={username} />}
      {isModerator && <ChatBadge src="/badges/mod.png" username={username} />}
      <p
        style={{ "--user-color": color } as React.CSSProperties}
        className="font-bold text-[var(--user-color)]"
      >
        {username}
      </p>
      <p
        className="flex w-full flex-wrap gap-0.5 break-all"
        dangerouslySetInnerHTML={{
          __html: parseMessageToHTML(message, emotes),
        }}
      />
    </div>
  );
}
