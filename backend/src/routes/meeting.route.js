import { Router } from "express";

import { authenticate, verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

import { createMeetingSchema } from "../validators/meeting.validator.js";
import { createMeeting,joinMeeting } from "../controllers/meeting.controller.js";
import { joinMeetingSchema } from "../validators/joinMeeting.validator.js";
import { leaveMeetingSchema } from "../validators/leaveMeeting.validator.js";
import { leaveMeeting } from "../controllers/meeting.controller.js";
import { endMeetingSchema } from "../validators/endMeeting.validator.js";
import { endMeeting } from "../controllers/meeting.controller.js";
import { getMeetingDetails } from "../controllers/meeting.controller.js";
import { startMeeting } from "../controllers/meeting.controller.js";
import { startMeetingSchema } from "../validators/startMeeting.validator.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createMeetingSchema),
  createMeeting
);

router.post(
  "/:meetingCode/join",
  authenticate,
  validate(joinMeetingSchema),
  joinMeeting
);
router.post(
  "/:meetingCode/leave",
  authenticate,
  validate(leaveMeetingSchema),
  leaveMeeting
);

router.post(
  "/:meetingCode/end",
  authenticate,
  validate(endMeetingSchema),
  endMeeting
);

router.get(
  "/:meetingCode",
  authenticate,
  getMeetingDetails
);

router.post(
  "/:meetingCode/end",
  authenticate,
  validate(endMeetingSchema),
  endMeeting
);
router.patch(
  "/:meetingCode/start",
  authenticate,
  validate(startMeetingSchema),
  startMeeting
);
export default router;