"use client";

import { useEffect, useRef, useState } from "react";
import { getRandomMockMessage } from "~/lib/utils";
import { type chats } from "~/server/db/schema";
import ChatMessage from "./chat/chat-message";
import { type Message } from "./chat/chat-socket";

interface Props {
  chatConfig: typeof chats.$inferSelect;
}

export default function ChatPreview({ chatConfig }: Readonly<Props>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev, getRandomMockMessage()]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!lastMessageRef.current) return;
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative overflow-hidden rounded-md p-4">
      <div className="sticky left-0 top-0 flex h-[150px] flex-col gap-2 overflow-y-hidden">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            chatConfig={chatConfig}
            message={message}
          />
        ))}
        <div ref={lastMessageRef} />
      </div>
      <img
        src="/chat-preview.jpg"
        alt="Chat preview background"
        className="absolute inset-0 -z-10 scale-105 object-cover brightness-[0.3] grayscale"
      />
    </div>
  );
}
