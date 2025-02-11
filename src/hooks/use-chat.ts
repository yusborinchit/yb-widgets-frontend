import { useCallback, useEffect, useRef, useState } from "react";
import { type Message } from "~/components/chat/chat-socket";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastMessageRef.current) return;
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  return { messages, addMessage, lastMessageRef };
}
