import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Message } from "~/components/chat/chat-socket";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_MESSAGES = [
  {
    id: "67ec2ac1-672c-4a3c-b31f-4fb3adb5ab4c",
    color: "#1E90FF",
    isModerator: false,
    isSubscriber: false,
    username: "gamerX99",
    message:
      'Let\'s gooo! <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/3.0"/>',
  },
  {
    id: "1912c6ed-a494-40b5-bc04-cd6e3790cbb3",
    color: "#32CD32",
    isModerator: false,
    isSubscriber: true,
    username: "shadowNinja",
    message:
      'bro that shot was insane <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/425618/default/dark/3.0"/>',
  },
  {
    id: "38e67bdc-20bc-495e-b39d-e252113b9ea4",
    color: "#FFD700",
    isModerator: false,
    isSubscriber: false,
    username: "coolBreeze",
    message: "KEKW what was that",
  },
  {
    id: "9e5f1c70-0d5e-4094-94ea-84b04cfc78f6",
    color: "#FF4500",
    isModerator: false,
    isSubscriber: false,
    username: "noScopeKing",
    message: "First time chat! Hello everyone o7",
  },
  {
    id: "cf80d2d1-c5b9-480e-bcb9-1f57c0f3abaf",
    color: "#9400D3",
    isModerator: true,
    isSubscriber: true,
    username: "hyperBeam",
    message:
      'Streamer diff tbh <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/245/default/dark/3.0"/>',
  },
  {
    id: "7b83f101-f355-40bc-8376-e93c0ca6113e",
    color: "#DC143C",
    isModerator: false,
    isSubscriber: false,
    username: "pixelWarrior",
    message:
      'When\'s the next giveaway? <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/33/default/dark/3.0"/>',
  },
  {
    id: "b2db1b54-a37a-4dd1-8661-697f0e15daf5",
    color: "#008B8B",
    isModerator: false,
    isSubscriber: false,
    username: "randomDude",
    message: "BRUH moment detected",
  },
  {
    id: "2061970e-3433-4066-b3b3-f62810fb8466",
    color: "#4B0082",
    isModerator: false,
    isSubscriber: false,
    username: "frostByte",
    message:
      'That timing was unreal <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/354/default/dark/3.0"/>',
  },
  {
    id: "72003080-6b6a-4318-93d6-697235209c2e",
    color: "#4682B4",
    isModerator: false,
    isSubscriber: true,
    username: "chatMaster",
    message:
      'Chat, spam <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/425618/default/dark/3.0"/> if you saw that',
  },
  {
    id: "2a63c4e4-5e90-4289-955d-5a48a966cae4",
    color: "#FF69B4",
    isModerator: false,
    isSubscriber: true,
    username: "memeOverlord",
    message:
      'Mods asleep, post frogs <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/3.0"/>',
  },
  {
    id: "09766207-4fec-412a-9340-91b983a46832",
    color: "#556B2F",
    isModerator: false,
    isSubscriber: false,
    username: "lagDetector",
    message:
      'This emote is so cursed <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/41/default/dark/3.0"/>',
  },
  {
    id: "dbdff6a7-682c-444f-8196-5f4cdf1449cb",
    color: "#A52A2A",
    isModerator: true,
    isSubscriber: true,
    username: "clutchMaster",
    message: "Wait, did I just get baited? FeelsBadMan",
  },
  {
    id: "6ff11018-e81c-4d39-b424-4942768a292f",
    color: "#00CED1",
    isModerator: false,
    isSubscriber: false,
    username: "flipWizard",
    message:
      'Streamer, do a flip! <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/74510/default/dark/3.0"/>',
  },
  {
    id: "b2e12c20-77fa-4e49-8e11-ff182c0cfcda",
    color: "#D2691E",
    isModerator: true,
    isSubscriber: false,
    username: "bufferingGuy",
    message:
      'Chat, who else is watching in 240p? <img class="message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_db3cd788399347a8b2ebfb8a85f5badb/default/dark/3.0"/>',
  },
] as Message[];

export function getRandomMockMessage() {
  const mockMessage =
    MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)]!;
  return { ...mockMessage, id: crypto.randomUUID() };
}
