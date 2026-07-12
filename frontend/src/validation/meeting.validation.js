import { z } from "zod";

export const createMeetingSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  maxParticipants: z
    .number()
    .min(2, "Minimum 2 participants")
    .max(100),

  allowWaitingRoom: z.boolean(),
});