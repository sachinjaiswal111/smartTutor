import { and, eq, ne } from "drizzle-orm";

import { db } from "../config/db.js";

import {
  meetings,
  meetingParticipants,
} from "../db/schema/index.js";

import ApiError from "../utils/ApiError.js";

export const endMeetingService = async (
  user,
  meetingCode
) => {
  // ----------------------------------------
  // Step 1 : Find Meeting
  // ----------------------------------------

  const meetingResult = await db
    .select()
    .from(meetings)
    .where(eq(meetings.meetingCode, meetingCode))
    .limit(1);

  const meeting = meetingResult[0];

  if (!meeting) {
    throw new ApiError(404, "Meeting not found.");
  }

  // ----------------------------------------
  // Step 2 : Authorization
  // ----------------------------------------

  if (meeting.hostId !== user.id) {
    throw new ApiError(
      403,
      "Only the host can end this meeting."
    );
  }

  // ----------------------------------------
  // Step 3 : Already Ended?
  // ----------------------------------------

  if (
    meeting.status === "ENDED" ||
    meeting.status === "CANCELLED"
  ) {
    throw new ApiError(
      400,
      "Meeting has already ended."
    );
  }

  // ----------------------------------------
  // Step 4 : Transaction
  // ----------------------------------------

  const result = await db.transaction(async (tx) => {
    // Update Meeting

    const [updatedMeeting] = await tx
      .update(meetings)
      .set({
        status: "ENDED",
        endedAt: new Date(),
      })
      .where(eq(meetings.id, meeting.id))
      .returning();

    // Update Participants

    await tx
      .update(meetingParticipants)
      .set({
        status: "LEFT",
        leftAt: new Date(),
      })
      .where(
        and(
          eq(meetingParticipants.meetingId, meeting.id),
          ne(meetingParticipants.status, "LEFT")
        )
      );

    return updatedMeeting;
  });

  // ----------------------------------------
  // Step 5 : Return DTO
  // ----------------------------------------

  return {
    meetingId: result.id,
    meetingCode: result.meetingCode,
    status: result.status,
    endedAt: result.endedAt,
  };
};