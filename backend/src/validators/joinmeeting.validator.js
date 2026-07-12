import { z } from "zod";

export const joinMeetingSchema = z.object({
  password: z
    .string()
    .min(6)
    .max(100)
    .optional(),
});