import { z } from "zod";

export const editChatFormSchema = z.object({
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
  fontColor: z
    .string({ message: "Font color must be a string" })
    .regex(/^#([0-9a-f]{3}){1,2}$/i, {
      message: "Font color must be a valid hex color",
    }),
  backgroundColor: z
    .string({ message: "Background color must be a string" })
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/i, {
      message: "Background color must be a valid hex color",
    }),
});

export const editFollowFormSchema = z.object({
  imageId: z
    .string()
    .uuid({ message: "Image ID must be a valid UUID" })
    .nullable(),
  soundId: z
    .string()
    .uuid({ message: "Sound ID must be a valid UUID" })
    .nullable(),
  width: z
    .number({ message: "Width must be a number" })
    .min(1, { message: "Width must be greater than 0" }),
  height: z
    .number({ message: "Height must be a number" })
    .min(1, { message: "Height must be greater than 0" }),
  text: z.string({ message: "Text must be a string" }),
});

export const editSubFormSchema = z.object({
  imageId: z
    .string()
    .uuid({ message: "Image ID must be a valid UUID" })
    .nullable(),
  soundId: z
    .string()
    .uuid({ message: "Sound ID must be a valid UUID" })
    .nullable(),
  width: z
    .number({ message: "Width must be a number" })
    .min(1, { message: "Width must be greater than 0" }),
  height: z
    .number({ message: "Height must be a number" })
    .min(1, { message: "Height must be greater than 0" }),
  text: z.string({ message: "Text must be a string" }),
});
