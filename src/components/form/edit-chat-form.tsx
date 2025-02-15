"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { updateChatConfigAction } from "~/server/actions";
import { type chats } from "~/server/db/schema";
import { editChatFormSchema } from "~/zod-schemas";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  chatConfig: typeof chats.$inferSelect;
}

export default function EditChatForm({ chatConfig }: Readonly<Props>) {
  const form = useForm<z.infer<typeof editChatFormSchema>>({
    resolver: zodResolver(editChatFormSchema),
    defaultValues: {
      width: chatConfig.width,
      height: chatConfig.height,
      fontSize: chatConfig.fontSize,
      fontColor: chatConfig.fontColor,
      backgroundColor: chatConfig.backgroundColor,
    },
  });

  async function onSubmit(values: z.infer<typeof editChatFormSchema>) {
    const { success } = await updateChatConfigAction(values);

    if (!success) {
      toast("Something went wrong", {
        description: "Try again later",
        position: "top-center",
      });
    } else {
      toast("Successfully updated chat config", {
        description: "Don't forget to restart the cache widget on OBS",
        position: "top-center",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid gap-4">
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
          name="fontSize"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Font Size:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="18"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fontColor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Font Color:</FormLabel>
                <FormControl>
                  <Input placeholder="#00000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Background Color:</FormLabel>
                <FormControl>
                  <Input placeholder="#00000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
