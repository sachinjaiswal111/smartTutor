import crypto from "crypto";

export function generateMeetingCode(length = 8) {
  return crypto
    .randomBytes(length)
    .toString("hex")
    .toUpperCase()
    .slice(0, length);
}