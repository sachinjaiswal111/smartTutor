import { eq } from "drizzle-orm";

import { db } from "../config/db.js";

import {
  meetings,
  meetingParticipants,
  users,
} from "../db/schema/index.js";

import ApiError from "../utils/ApiError.js";

export const getMeetingDetailsService = async (
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
  // Step 2 : Fetch Participants
  // ----------------------------------------

  const participants = await db
    .select({
      participantId: meetingParticipants.id,
      userId: users.id,
      username: users.username,
      role: meetingParticipants.role,
      status: meetingParticipants.status,
      joinedAt: meetingParticipants.joinedAt,
      leftAt: meetingParticipants.leftAt,
    })
    .from(meetingParticipants)
    .innerJoin(
      users,
      eq(meetingParticipants.userId, users.id)
    )
    .where(
      eq(meetingParticipants.meetingId, meeting.id)
    );

  // ----------------------------------------
  // Step 3 : Find Current User
  // ----------------------------------------

  const currentUser = participants.find(
    (participant) => participant.userId === user.id
  );

  // ----------------------------------------
  // Step 4 : Return DTO
  // ----------------------------------------

  return {
    meeting: {
      id: meeting.id,
      meetingCode: meeting.meetingCode,
      title: meeting.title,
      hostId: meeting.hostId,
      status: meeting.status,
      maxParticipants: meeting.maxParticipants,
      allowWaitingRoom:
        meeting.allowWaitingRoom,
      createdAt: meeting.createdAt,
      startedAt: meeting.startedAt,
      endedAt: meeting.endedAt,
    },

    participants,

    currentUser: currentUser ?? null,
  };
};