import { useCallback, useEffect, useRef, useState } from "react";
import { type Message } from "~/components/chat/chat-socket";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastMessageRef.current) return;

    lastMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => {
      const draft = [...prev, message];
      return draft.length > 200 ? draft.slice(100) : draft;
    });
  }, []);

  return { messages, addMessage, lastMessageRef };
}
