import { z } from "zod";

export const createMeetingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title cannot exceed 255 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .optional(),

  maxParticipants: z
    .number()
    .int()
    .min(2, "Minimum participants is 2")
    .max(10, "Maximum participants is 10")
    .optional(),

  allowWaitingRoom: z
    .boolean()
    .optional(),
});