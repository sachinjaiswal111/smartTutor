import { eq } from "drizzle-orm";

import { db } from "../config/db.js";

import { meetings } from "../db/schema/index.js";

import ApiError from "../utils/ApiError.js";

export const startMeetingService = async (
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
      "Only the host can start this meeting."
    );
  }

  // ----------------------------------------
  // Step 3 : Business Rules
  // ----------------------------------------

  if (meeting.status === "ACTIVE") {
    throw new ApiError(
      400,
      "Meeting is already active."
    );
  }

  if (meeting.status === "ENDED") {
    throw new ApiError(
      400,
      "Meeting has already ended."
    );
  }

  if (meeting.status === "CANCELLED") {
    throw new ApiError(
      400,
      "Meeting has been cancelled."
    );
  }

  // ----------------------------------------
  // Step 4 : Update Meeting
  // ----------------------------------------

  const [updatedMeeting] = await db
    .update(meetings)
    .set({
      status: "ACTIVE",
      startedAt: new Date(),
    })
    .where(eq(meetings.id, meeting.id))
    .returning();

  // ----------------------------------------
  // Step 5 : Return DTO
  // ----------------------------------------

  return {
    meetingId: updatedMeeting.id,
    meetingCode: updatedMeeting.meetingCode,
    status: updatedMeeting.status,
    startedAt: updatedMeeting.startedAt,
  };
};