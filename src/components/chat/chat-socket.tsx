"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { env } from "~/env";
import ChatMessage from "./chat-message";

export interface Message {
  id: string;
  color: string;
  emotes: Record<number, string[]>;
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
    // TODO: Remove bg
    <div className="flex min-h-[600px] max-w-[400px] flex-col gap-2 bg-black/60 px-4">
      {messages.map((data) => (
        <ChatMessage key={data.id} data={data} />
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
}
