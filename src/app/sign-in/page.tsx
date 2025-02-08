import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TwitchButton from "~/components/auth/twitch-button";
import { Separator } from "~/components/ui/separator";

export default function SignInPage() {
  return (
    <div className="grid h-screen place-items-center p-4">
      <section className="flex flex-col p-4">
        <Link
          href="/"
          className="flex items-center font-semibold tracking-tighter"
        >
          <ArrowLeft className="size-4" /> Go Back
        </Link>
        <div className="mt-4">
          <p className="text-sm tracking-tighter text-muted-foreground">
            Sign in to your account
          </p>
          <h2 className="text-5xl font-bold leading-[0.9] tracking-tighter">
            Welcome back!
          </h2>
        </div>
        <Separator className="my-6 bg-border" />
        <div className="flex flex-col gap-4">
          <TwitchButton />
        </div>
      </section>
    </div>
  );
}
