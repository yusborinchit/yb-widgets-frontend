interface Props {
  src: string;
  username: string;
}

export default function ChatBadge({ src, username }: Readonly<Props>) {
  return (
    <img
      src={src}
      alt={`Badge for ${username}`}
      className="size-[var(--chat-font-size)]"
    />
  );
}
