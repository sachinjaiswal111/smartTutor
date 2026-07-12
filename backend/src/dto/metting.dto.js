export class MeetingResponseDto {
  constructor(meeting) {
    this.id = meeting.id;
    this.meetingCode = meeting.meetingCode;
    this.title = meeting.title;
    this.status = meeting.status;
    this.hostId = meeting.hostId;
    this.maxParticipants = meeting.maxParticipants;
    this.allowWaitingRoom = meeting.allowWaitingRoom;
    this.createdAt = meeting.createdAt;
  }
}