import { getMessageHTML } from "~/lib/utils";
import { type Message } from "./chat-socket";

interface Props {
  data: Message;
}

export default function ChatMessage({ data }: Readonly<Props>) {
  return (
    <div
      key={data.id}
      className="flex gap-2 text-xl text-white animate-in slide-in-from-left-[1000px]"
    >
      {/* TODO: Change to actually badges */}
      {data.isSubscriber && (
        <img
          src="/badges/sub.png"
          alt={`Sub Badge for ${data.username}`}
          className="size-6"
        />
      )}
      {data.isModerator && (
        <img
          src="/badges/mod.png"
          alt={`Mod Badge for ${data.username}`}
          className="size-6"
        />
      )}
      <p
        style={{ "--user-color": data.color } as React.CSSProperties}
        className="font-bold text-[var(--user-color)]"
      >
        {data.username}
      </p>
      <p
        className="flex gap-1"
        dangerouslySetInnerHTML={{
          __html: getMessageHTML(data.message, data.emotes),
        }}
      />
    </div>
  );
}
