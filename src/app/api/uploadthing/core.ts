/* eslint-disable @typescript-eslint/only-throw-error */

import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "~/server/auth";
import { MUTATIONS } from "~/server/db/sql";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
    video: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
    audio: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth();

      if (!session) throw new UploadThingError("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const [res] = await MUTATIONS.insertMedia({
        key: file.key,
        title: file.name,
        type: file.type,
        url: file.ufsUrl,
        uploadedBy: metadata.userId,
      });

      if (!res) throw new UploadThingError("Failed to insert media");
      revalidatePath("/dashboard/notification");

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
