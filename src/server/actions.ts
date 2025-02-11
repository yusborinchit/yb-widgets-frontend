"use server";

import { revalidatePath } from "next/cache";
import { type z } from "zod";
import { type editChatFormSchema } from "~/zod-schemas";
import { auth } from "./auth";
import { MUTATIONS } from "./db/sql";

export async function updateChatConfigAction(
  values: z.infer<typeof editChatFormSchema>,
) {
  const session = await auth();

  const userId = session?.user.id;
  if (!userId) return { success: false };

  const result = await MUTATIONS.updateChatConfigByUserId(userId, values);
  revalidatePath("/dashboard");

  console.log(result);

  return { success: true };
}
