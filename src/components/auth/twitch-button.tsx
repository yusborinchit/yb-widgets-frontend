"use client";

import { Loader, Twitch } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function TwitchButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    await signIn("twitch", {
      redirectTo: "/",
    });
  }

  return (
    <Button disabled={isLoading} onClick={handleSignIn}>
      {isLoading ? <Loader className="animate-spin" /> : <Twitch />}
      <span>{isLoading ? "Signing in..." : "Sign In with Twitch"}</span>
    </Button>
  );
}
