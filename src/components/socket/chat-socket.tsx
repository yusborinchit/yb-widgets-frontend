"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { env } from "~/env";

export interface Message {
  id: string;
  user: {
    color: string;
    avatar: string;
    badges: Record<string, number>;
    name: string;
  };
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
    <div className="relative flex max-w-[400px] flex-col bg-black/60 px-4">
      {messages.map((msg) => (
        <div key={msg.id} className="flex gap-2 text-xl text-white">
          <p
            style={{ "--user-color": msg.user.color } as React.CSSProperties}
            className="font-semibold text-[var(--user-color)]"
          >
            {msg.user.name}
          </p>
          <p>{msg.message}</p>
        </div>
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
}
