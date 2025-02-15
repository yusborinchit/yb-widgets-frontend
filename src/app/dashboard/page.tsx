import { Bell, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { auth } from "~/server/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <pre className="whitespace-break-spaces rounded bg-neutral-100 p-4">
        {JSON.stringify(session?.user, null, 2)}
      </pre>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/chat">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Widget</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Show your twitch chat in real time and level up your stream!
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/notification">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notifications Widget
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Stay connected with your viewers and never miss a notification!
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/triggers" className="sm:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Triggers Widget
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Add a extra layer of interactivity with your chat with customs
                videos and sounds triggered via channel points!
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
}
