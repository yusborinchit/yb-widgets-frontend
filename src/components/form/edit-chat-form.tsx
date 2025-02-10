"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type chats } from "~/server/db/schema";
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

const editChatFormSchema = z.object({
  width: z
    .number({ message: "Width must be a number" })
    .min(1, { message: "Width must be greater than 0" }),
  height: z
    .number({ message: "Height must be a number" })
    .min(1, { message: "Height must be greater than 0" }),
  fontSize: z
    .number({ message: "Font size must be a number" })
    .min(1, { message: "Font size must be greater than 0" })
    .max(64, { message: "Font size must be less or equal to 64" }),
  backgroundColor: z
    .string({ message: "Background color must be a string" })
    .regex(/^#([0-9a-f]{3}){1,2}$/i, {
      message: "Background color must be a valid hex color",
    }),
});

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
      backgroundColor: chatConfig.backgroundColor,
    },
  });

  function onSubmit(values: z.infer<typeof editChatFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Width:</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="800" {...field} />
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
                  <Input type="number" placeholder="600" {...field} />
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
                <Input type="number" placeholder="18" {...field} />
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
              <FormDescription>
                The background color of the chat window. This can be any valid
                hex color.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4">Save Changes</Button>
      </form>
    </Form>
  );
}
