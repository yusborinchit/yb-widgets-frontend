"use client";

import { ClipboardCopy, Eye, EyeOff, Info } from "lucide-react";
import { useSecretLink } from "~/hooks/use-secret-link";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Props {
  link: string;
}

export default function SecretLink({ link }: Readonly<Props>) {
  const { isHidden, hiddenLink, toggleVisibility, copyLink } =
    useSecretLink(link);

  return (
    <div className="mt-4 grid gap-2">
      <Alert variant="destructive">
        <Info className="size-5" />
        <AlertTitle>Do NOT share this link</AlertTitle>
        <AlertDescription>
          This link has to be hidden from the public.
        </AlertDescription>
      </Alert>
      <div className="flex items-center gap-2 rounded-md border border-destructive/50 px-3 py-2 text-destructive">
        <p className="w-full font-mono text-sm [word-break:break-all]">
          {isHidden ? hiddenLink : link}
        </p>
        <div className="flex items-center">
          <button
            onClick={copyLink}
            className="rounded-md p-2 transition-colors duration-75 hover:bg-destructive/10 active:bg-destructive/20"
          >
            <ClipboardCopy className="size-4" />
          </button>
          <button
            onClick={toggleVisibility}
            className="rounded-md p-2 transition-colors duration-75 hover:bg-destructive/10 active:bg-destructive/20"
          >
            {isHidden ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
