"use client";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { env } from "~/env";
import { type chats } from "~/server/db/schema";
import ChatMessage from "./chat-message";

export interface Message {
  id: string;
  color: string;
  emotes: Record<number, string[]> | null;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!channelName) return;

    const socket = io(`${env.NEXT_PUBLIC_WS_URL}/chat`);
    socket.on("connect", () => socket.emit("chat_connect", channelName));

    socket.on("chat_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [channelName]);

  useEffect(() => {
    if (!lastMessageRef.current) return;
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={
        {
          "--chat-width": `${chatConfig.width}px`,
          "--chat-height": `${chatConfig.height}px`,
          "--chat-background": chatConfig.backgroundColor,
        } as React.CSSProperties
      }
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
