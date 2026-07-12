import { db } from "../config/db.js";

import {
  meetings,
  meetingParticipants,
} from "../db/schema/meeting.js";

import ApiError from "../utils/ApiError.js";
import { hashPassword } from "../utils/password.js";

import { generateMeetingCode } from "../utils/generateMeetingCode.js";
import { MeetingResponseDto } from "../dto/metting.dto.js";

export const createMeetingService = async (user, meetingData) => {
  // 1. Only tutors can create meetings
  if (user.role !== "tutor") {
    throw new ApiError(403, "Only tutors can create meetings.");
  }

  // 2. Generate meeting code
  const meetingCode = generateMeetingCode();

  // 3. Hash meeting password (if provided)
  const passwordHash = meetingData.password
    ? await hashPassword(meetingData.password)
    : null;

  // 4. Create meeting and host participant atomically
  const createdMeeting = await db.transaction(async (tx) => {
    // Create meeting
    const [meeting] = await tx
      .insert(meetings)
      .values({
        meetingCode,
        title: meetingData.title,
        hostId: user.id,
        passwordHash,
        maxParticipants: meetingData.maxParticipants ?? 10,
        allowWaitingRoom: meetingData.allowWaitingRoom ?? false,
      })
      .returning();

    if (!meeting) {
      throw new ApiError(500, "Failed to create meeting.");
    }

    // Add host as participant
    await tx.insert(meetingParticipants).values({
      meetingId: meeting.id,
      userId: user.id,
      role: "HOST",
      status: "JOINED",
    });

    return meeting;
  });

  // 5. Return DTO
  return new MeetingResponseDto(createdMeeting);
};