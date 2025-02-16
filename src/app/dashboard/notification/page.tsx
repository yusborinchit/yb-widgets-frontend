import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { default as EditFollowNotificationForm } from "~/components/form/edit-follow-notification-form";
import EditSubNotificationForm from "~/components/form/edit-sub-notification-form";
import SecretLink from "~/components/secret-link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { QUERIES } from "~/server/db/sql";

export default async function NotificationDashboard() {
  const session = await auth();

  const followConfigPromise = QUERIES.getFollowConfigByUserId(session!.user.id);
  const subConfigPromise = QUERIES.getSubConfigByUserId(session!.user.id);
  const mediaPromise = QUERIES.getMediaByUserId(session!.user.id);

  const [[followConfig], [subConfig], media] = await Promise.all([
    followConfigPromise,
    subConfigPromise,
    mediaPromise,
  ]);

  if (!followConfig || !subConfig || !media)
    return <div>Notification config not found</div>;

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
      <Tabs defaultValue="follow" className="mt-8">
        <TabsList className="w-full">
          <TabsTrigger value="follow" className="w-full">
            Follows
          </TabsTrigger>
          <TabsTrigger value="sub" className="w-full">
            Subscriptions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="follow">
          <EditFollowNotificationForm config={followConfig} media={media} />
        </TabsContent>
        <TabsContent value="sub">
          <EditSubNotificationForm config={subConfig} media={media} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
