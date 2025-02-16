"use server";

import { revalidatePath } from "next/cache";
import { type z } from "zod";
import {
  type editChatFormSchema,
  type editFollowFormSchema,
  type editSubFormSchema,
} from "~/zod-schemas";
import { auth } from "./auth";
import { MUTATIONS } from "./db/sql";

export async function updateChatConfigAction(
  values: z.infer<typeof editChatFormSchema>,
) {
  const session = await auth();

  const userId = session?.user.id;
  if (!userId) return { success: false };

  const result = await MUTATIONS.updateChatConfigByUserId(userId, values);
  if (result.length === 0) return { success: false };

  revalidatePath("/dashboard");

  return { success: true };
}

export async function updateFollowConfigAction(
  values: z.infer<typeof editFollowFormSchema>,
) {
  const session = await auth();

  const userId = session?.user.id;
  if (!userId) return { success: false };

  const result = await MUTATIONS.updateFollowConfigByUserId(userId, values);
  if (result.length === 0) return { success: false };

  revalidatePath("/dashboard");

  return { success: true };
}

export async function updateSubConfigAction(
  values: z.infer<typeof editSubFormSchema>,
) {
  const session = await auth();

  const userId = session?.user.id;
  if (!userId) return { success: false };

  const result = await MUTATIONS.updateSubConfigByUserId(userId, values);
  if (result.length === 0) return { success: false };

  revalidatePath("/dashboard");

  return { success: true };
}
