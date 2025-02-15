"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { UploadDropzone } from "~/lib/uploadthing";
import { updateFollowConfigAction } from "~/server/actions";
import { type follows, type medias } from "~/server/db/schema";
import { editFollowFormSchema } from "~/zod-schemas";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  followConfig: typeof follows.$inferSelect;
  media: (typeof medias.$inferSelect)[];
}

export default function EditNotificationForm({
  followConfig,
  media,
}: Readonly<Props>) {
  const router = useRouter();

  const form = useForm<z.infer<typeof editFollowFormSchema>>({
    resolver: zodResolver(editFollowFormSchema),
    defaultValues: {
      imageId: followConfig.imageId,
      soundId: followConfig.soundId,
      width: followConfig.width,
      height: followConfig.height,
      text: followConfig.text,
    },
  });

  const { images, sounds } = media.reduce(
    (acc, media) => {
      const [type] = media.type.split("/");

      if (type === "image" || type === "video") acc.images.push(media);
      if (type === "audio") acc.sounds.push(media);

      return acc;
    },
    { images: [], sounds: [] } as {
      images: (typeof medias.$inferSelect)[];
      sounds: (typeof medias.$inferSelect)[];
    },
  );

  async function onSubmit(values: z.infer<typeof editFollowFormSchema>) {
    const { success } = await updateFollowConfigAction(values);

    if (!success) {
      toast("Something went wrong", {
        description: "Try again later",
        position: "top-center",
      });
    } else {
      toast("Successfully updated follow config", {
        description: "Don't forget to restart the cache widget on OBS",
        position: "top-center",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid gap-4">
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image:</FormLabel>
              <Select
                defaultValue={field.value ?? "null"}
                onValueChange={(e) => field.onChange(e === "null" ? null : e)}
                disabled={images.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an image for the follow alert" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">No Image</SelectItem>
                  {images.map((media) => (
                    <SelectItem key={media.id} value={media.id}>
                      {media.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                In case of no image, the follow alert will be displayed as plain
                text
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="soundId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sound:</FormLabel>
              <Select
                defaultValue={field.value ?? "null"}
                onValueChange={(e) => field.onChange(e === "null" ? null : e)}
                disabled={sounds.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sound for the follow alert" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">No Sound</SelectItem>
                  {sounds.map((media) => (
                    <SelectItem key={media.id} value={media.id}>
                      {media.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                In case of no sound, the follow alert will be displayed on mute
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadDropzone
          endpoint="mediaUploader"
          onClientUploadComplete={() => {
            toast("Upload Complete", {
              position: "top-center",
            });
            router.refresh();
          }}
          onUploadError={() => {
            toast("Upload Error", {
              description: "Something went wrong!",
              position: "top-center",
            });
          }}
          appearance={{
            label: "text-neutral-600 hover:text-purple-500",
          }}
          className="ut-button:bg-purple-500 ut-button:focus-within:ring-purple-500 ut-allowed-content:text-neutral-400 ut-upload-icon:text-neutral-400 ut-button:ut-uploading:after:bg-purple-700"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Width:</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="800"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Height:</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="600"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Text:</FormLabel>
              <FormControl>
                <Input
                  placeholder="${user} thank you for the follow!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="mt-8"
        >
          {form.formState.isSubmitting && <Loader className="animate-spin" />}
          <span>
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </span>
        </Button>
      </form>
    </Form>
  );
}
