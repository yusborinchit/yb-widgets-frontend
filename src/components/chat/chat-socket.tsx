"use client";

import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { env } from "~/env";
import { useChat } from "~/hooks/use-chat";
import { type chats } from "~/server/db/schema";
import ChatMessage from "./chat-message";

export interface Message {
  id: string;
  color: string;
  isFirstMessage: boolean;
  isModerator: boolean;
  isSubscriber: boolean;
  username: string;
  message: string;
}

interface Props {
  channelName: string;
  chatConfig: typeof chats.$inferSelect;
}

export default function ChatSocket({
  channelName,
  chatConfig,
}: Readonly<Props>) {
  const { messages, addMessage, lastMessageRef } = useChat();

  useEffect(() => {
    if (!channelName) return;

    const socket = io(`${env.NEXT_PUBLIC_WS_URL}/chat`);

    socket.on("connect", () => socket.emit("chat_connect", channelName));
    socket.on("chat_message", addMessage);

    return () => {
      socket.disconnect();
    };
  }, [channelName, addMessage]);

  const config = {
    "--chat-width": `${chatConfig.width}px`,
    "--chat-height": `${chatConfig.height}px`,
    "--chat-background": chatConfig.backgroundColor,
  } as React.CSSProperties;

  return (
    <div
      style={config}
      className="flex h-[var(--chat-height,600px)] w-[var(--chat-width,800px)] flex-col gap-2 overflow-y-hidden bg-[var(--chat-background)] px-2"
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          chatConfig={chatConfig}
        />
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
}
