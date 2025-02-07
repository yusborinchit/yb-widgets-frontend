import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StringReplacement {
  stringToReplace: string;
  replacement: string;
}

export function getMessageHTML(
  message: string,
  emotes: Record<number, string[]>,
) {
  if (!emotes) return message;

  const stringReplacements: StringReplacement[] = [];
  Object.entries(emotes).forEach(([id, positions]) => {
    const position = positions[0];
    const [start, end] = position!.split("-");
    const stringToReplace = message.substring(
      parseInt(start!, 10),
      parseInt(end!, 10) + 1,
    );

    stringReplacements.push({
      stringToReplace: stringToReplace,
      replacement: `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0" width="24px" height="24px" />`,
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
