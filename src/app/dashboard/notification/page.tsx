import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditNotificationForm from "~/components/form/edit-notification-form";
import SecretLink from "~/components/secret-link";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { QUERIES } from "~/server/db/sql";

export default async function NotificationDashboard() {
  const session = await auth();

  const followConfigPromise = QUERIES.getFollowConfigByUserId(session!.user.id);
  const mediaPromise = QUERIES.getMediaByUserId(session!.user.id);

  const [[followConfig], media] = await Promise.all([
    followConfigPromise,
    mediaPromise,
  ]);
  if (!followConfig || !media) return <div>Notification config not found</div>;

  const notificationLink = `${env.NEXT_PUBLIC_SITE_URL}/overlay/notification/${followConfig.channelId}`;

  return (
    <div>
      <Link
        href="/dashboard"
        className="flex items-center font-medium tracking-tighter"
      >
        <ArrowLeft className="size-4" /> <span>Go Back</span>
      </Link>
      <SecretLink link={notificationLink} />
      <EditNotificationForm followConfig={followConfig} media={media} />
    </div>
  );
}
