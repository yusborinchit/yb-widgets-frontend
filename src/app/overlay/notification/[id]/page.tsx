import NotificationSocket from "~/components/notification/notification-socket";
import { QUERIES } from "~/server/db/sql";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotificationOverlay({ params }: Readonly<Props>) {
  const { id } = await params;

  const [user] = await QUERIES.getUserDataById(id);

  return user?.name && user?.refreshToken ? (
    <NotificationSocket
      channelName={user.name}
      refreshToken={user.refreshToken}
    />
  ) : (
    "Error"
  );
}
