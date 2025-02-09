import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const emoteHTML = (id: string, size: number) =>
  `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0" width="${size * 1.5}px" height="${size * 1.5}px" alt="Emote ${id}">`;

export function parseMessageToHTML(
  message: string,
  emotes: Record<number, string[]> | null,
  emoteSize: number,
) {
  if (!emotes) return message;

  const stringReplacements: {
    stringToReplace: string;
    replacement: string;
  }[] = [];

  Object.entries(emotes).forEach(([id, positions]) => {
    const [position] = positions;
    const [start, end] = position!.split("-");

    if (!position || !start || !end) return;

    const stringToReplace = message.substring(
      parseInt(start, 10),
      parseInt(end, 10) + 1,
    );

    stringReplacements.push({
      stringToReplace: stringToReplace,
      replacement: emoteHTML(id, emoteSize),
    });
  });

  const messageHTML = stringReplacements.reduce(
    (acc, { stringToReplace, replacement }) => {
      return acc.split(stringToReplace).join(replacement);
    },
    message,
  );

  return messageHTML;
}
