"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { env } from "~/env";
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
}

export default function ChatSocket({ channelName }: Readonly<Props>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!channelName) return;

    const socket = io(`${env.NEXT_PUBLIC_WS_URL}/chat`);
    socket.on("connect", () => socket.emit("chat_connect", channelName));

    socket.on("chat_message", (msg: Message) => {
      console.log(msg);
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
    <div className="flex h-[600px] w-[400px] flex-col gap-2 overflow-y-hidden bg-black px-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
}
