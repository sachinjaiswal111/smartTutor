import { createMeetingService } from "../services/meeting.service.js";

import asyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { joinMeetingService } from "../services/joinMeeting.service.js";
import { leaveMeetingService } from "../services/leaveMeeting.service.js";
import { endMeetingService } from "../services/endMeeting.service.js";
import { getMeetingDetailsService } from "../services/getMeetingDeatails.service.js";
import { startMeetingService } from "../services/startMeeting.service.js";

export const createMeeting = asyncHandler(async (req, res) => {
  const meeting = await createMeetingService(req.user, req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      meeting,
      "Meeting created successfully."
    )
  );
});


export const joinMeeting = asyncHandler(async (req, res) => {
  const participant = await joinMeetingService(
    req.user,
    req.params.meetingCode,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      participant,
      "Joined meeting successfully."
    )
  );
});


export const leaveMeeting = asyncHandler(async (req, res) => {
  const result = await leaveMeetingService(
    req.user,
    req.params.meetingCode
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Left meeting successfully."
    )
  );
});


export const endMeeting = asyncHandler(async (req, res) => {
  const result = await endMeetingService(
    req.user,
    req.params.meetingCode
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Meeting ended successfully."
    )
  );
});


export const getMeetingDetails = asyncHandler(async (req, res) => {
  const result = await getMeetingDetailsService(
    req.user,
    req.params.meetingCode
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Meeting details fetched successfully."
    )
  );
});


export const startMeeting = asyncHandler(async (req, res) => {
  const result = await startMeetingService(
    req.user,
    req.params.meetingCode
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Meeting started successfully."
    )
  );
});