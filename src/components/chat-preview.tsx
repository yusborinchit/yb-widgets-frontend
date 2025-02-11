"use client";

import { useEffect } from "react";
import { useChat } from "~/hooks/use-chat";
import { getRandomMockMessage } from "~/lib/utils";
import { type chats } from "~/server/db/schema";
import ChatMessage from "./chat/chat-message";
import { Label } from "./ui/label";

interface Props {
  chatConfig: typeof chats.$inferSelect;
}

export default function ChatPreview({ chatConfig }: Readonly<Props>) {
  const { messages, addMessage, lastMessageRef } = useChat();

  useEffect(() => {
    const interval = setInterval(() => {
      addMessage(getRandomMockMessage());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [addMessage]);

  return (
    <div className="grid gap-2">
      <Label>Chat Preview:</Label>
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
    </div>
  );
}
