"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { env } from "~/env";

export interface RaidNotification {
  type: "raid";
  username: string;
  viewerCount: number;
}

export interface FollowNotification {
  type: "follow";
  username: string;
}

export interface SubscriptionNotification {
  type: "subscription";
  tier: number;
  isGift: boolean;
  username: string;
}

export type Notification =
  | RaidNotification
  | FollowNotification
  | SubscriptionNotification;

interface Props {
  channelName: string;
  refreshToken: string;
}

export default function NotificationSocket({
  channelName,
  refreshToken,
}: Readonly<Props>) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!channelName) return;

    const socket = io(`${env.NEXT_PUBLIC_WS_URL}/notification`);

    socket.on("connect", () =>
      socket.emit("notification_connect", channelName, refreshToken),
    );

    socket.on("notification_event", (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, [channelName, refreshToken]);

  return (
    <div>
      {notifications.map((notification) =>
        notification.type === "follow" ? (
          <div key={crypto.randomUUID()}>follow {notification.username}</div>
        ) : notification.type === "subscription" ? (
          <div key={crypto.randomUUID()}>
            {notification.username} subscribed to {notification.tier} tier
            {notification.isGift ? " with a gift" : ""}
          </div>
        ) : (
          <div key={crypto.randomUUID()}>
            {notification.username} raided {notification.viewerCount} viewers
          </div>
        ),
      )}
    </div>
  );
}
