import { useState } from "react";
import { toast } from "sonner";

export function useSecretLink(link: string) {
  const [isHidden, setIsHidden] = useState(true);

  const hiddenLink = "*".repeat(link.length);

  async function copyLink() {
    await navigator.clipboard.writeText(link);

    toast("Copied to clipboard", {
      description: "Don't forget to not share this link",
      position: "top-center",
    });
  }

  function toggleVisibility() {
    setIsHidden((prev) => !prev);
  }

  return { isHidden, hiddenLink, toggleVisibility, copyLink };
}
