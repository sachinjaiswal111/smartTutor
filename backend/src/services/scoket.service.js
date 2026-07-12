import { and, eq } from "drizzle-orm";

import { db } from "../config/db.js";

import {
    meetings,
    meetingParticipants,
} from "../db/schema/index.js";
import SocketError from "../utils/SocketError.js";

export const validateMeetingConnection = async (
    meetingCode,
    userId
) => {

    const result = await db
        .select()
        .from(meetings)
        .where(eq(meetings.meetingCode, meetingCode))
        .limit(1);

    const meeting = result[0];

    if (!meeting) {
        throw new SocketError(
    "Meeting not found",
    "MEETING_NOT_FOUND"
);
    }

    if (meeting.status !== "ACTIVE") {
        throw new SocketError(
    "Meeting is not active",
    "MEETING_NOT_ACTIVE"
);
    }

    const participant = await db
        .select()
        .from(meetingParticipants)
        .where(
            and(
                eq(
                    meetingParticipants.meetingId,
                    meeting.id
                ),
                eq(
                    meetingParticipants.userId,
                    userId
                )
            )
        )
        .limit(1);

    if (participant.length === 0) {
       throw new SocketError(
    "You are not a participant",
    "NOT_A_PARTICIPANT"
);
    }

    return meeting;
};

export const getMeetingParticipants =
async (meetingId) => {

    const participants = await db
        .select({
            id: users.id,
            username: users.username,
            role: meetingParticipants.role,
            status: meetingParticipants.status,
        })
        .from(meetingParticipants)
        .innerJoin(
            users,
            eq(
                meetingParticipants.userId,
                users.id
            )
        )
        .where(
            eq(
                meetingParticipants.meetingId,
                meetingId
            )
        );

    return participants;
};

export const areUsersInSameMeeting = async (
  meetingId,
  senderId,
  targetId
) => {
  const sender = await db
    .select()
    .from(meetingParticipants)
    .where(
      and(
        eq(meetingParticipants.meetingId, meetingId),
        eq(meetingParticipants.userId, senderId)
      )
    )
    .limit(1);

  const target = await db
    .select()
    .from(meetingParticipants)
    .where(
      and(
        eq(meetingParticipants.meetingId, meetingId),
        eq(meetingParticipants.userId, targetId)
      )
    )
    .limit(1);

  return sender.length > 0 && target.length > 0;
};