import { and, eq, ne, sql } from "drizzle-orm";

import { db } from "../config/db.js";

import {
  meetings,
  meetingParticipants,
} from "../db/schema/meeting.js";

import ApiError from "../utils/ApiError.js";
import { comparePassword } from "../utils/password.js";

export const joinMeetingService = async (
  user,
  meetingCode,
  { password }
) => {
  // --------------------------------------------------
  // Step 1 : Find meeting
  // --------------------------------------------------

  const result = await db
    .select()
    .from(meetings)
    .where(eq(meetings.meetingCode, meetingCode))
    .limit(1);

  const meeting = result[0];

  if (!meeting) {
    throw new ApiError(404, "Meeting not found.");
  }

  // --------------------------------------------------
  // Step 2 : Validate meeting status
  // --------------------------------------------------

  if (
    meeting.status === "ENDED" ||
    meeting.status === "CANCELLED"
  ) {
    throw new ApiError(
      400,
      "Meeting is no longer available."
    );
  }

  // --------------------------------------------------
  // Step 3 : Verify password
  // --------------------------------------------------

  if (meeting.passwordHash) {
    if (!password) {
      throw new ApiError(
        401,
        "Meeting password is required."
      );
    }

    const valid = await comparePassword(
      password,
      meeting.passwordHash
    );

    if (!valid) {
      throw new ApiError(
        401,
        "Invalid meeting password."
      );
    }
  }

  // --------------------------------------------------
  // Step 4 : Already joined?
  // --------------------------------------------------

  const existing = await db
    .select()
    .from(meetingParticipants)
    .where(
      and(
        eq(meetingParticipants.meetingId, meeting.id),
        eq(meetingParticipants.userId, user.id)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return {
      meetingId: meeting.id,
      participantId: existing[0].id,
      status: existing[0].status,
    };
  }

  // --------------------------------------------------
  // Step 5 : Check participant count
  // --------------------------------------------------

  const [{ count }] = await db
    .select({
      count: sql`count(*)`,
    })
    .from(meetingParticipants)
    .where(
      and(
        eq(meetingParticipants.meetingId, meeting.id),
        ne(meetingParticipants.status, "LEFT")
      )
    );

  if (Number(count) >= meeting.maxParticipants) {
    throw new ApiError(400, "Meeting is full.");
  }

  // --------------------------------------------------
  // Step 6 : Waiting room logic
  // --------------------------------------------------

  const participantStatus =
    meeting.allowWaitingRoom
      ? "WAITING"
      : "JOINED";

  // --------------------------------------------------
  // Step 7 : Create participant
  // --------------------------------------------------

  const [participant] = await db
    .insert(meetingParticipants)
    .values({
      meetingId: meeting.id,
      userId: user.id,
      status: participantStatus,
    })
    .returning();

  // --------------------------------------------------
  // Step 8 : Return DTO
  // --------------------------------------------------

  return {
    meetingId: meeting.id,
    participantId: participant.id,
    status: participant.status,
  };
};