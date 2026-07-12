import { and, eq } from "drizzle-orm";

import { db } from "../config/db.js";

import {
  meetings,
  meetingParticipants,
} from "../db/schema/index.js";

import ApiError from "../utils/ApiError.js";

export const leaveMeetingService = async (
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
  // Step 2 : Find Participant
  // ----------------------------------------

  const participantResult = await db
    .select()
    .from(meetingParticipants)
    .where(
      and(
        eq(meetingParticipants.meetingId, meeting.id),
        eq(meetingParticipants.userId, user.id)
      )
    )
    .limit(1);

  const participant = participantResult[0];

  if (!participant) {
    throw new ApiError(
      404,
      "You are not a participant of this meeting."
    );
  }

  // ----------------------------------------
  // Step 3 : Already Left?
  // ----------------------------------------

  if (participant.status === "LEFT") {
    throw new ApiError(
      400,
      "You have already left this meeting."
    );
  }

  // ----------------------------------------
  // Step 4 : Update Participant
  // ----------------------------------------

  const [updatedParticipant] = await db
    .update(meetingParticipants)
    .set({
      status: "LEFT",
      leftAt: new Date(),
    })
    .where(eq(meetingParticipants.id, participant.id))
    .returning();

  // ----------------------------------------
  // Step 5 : Return DTO
  // ----------------------------------------

  return {
    meetingId: meeting.id,
    participantId: updatedParticipant.id,
    status: updatedParticipant.status,
    leftAt: updatedParticipant.leftAt,
  };
};