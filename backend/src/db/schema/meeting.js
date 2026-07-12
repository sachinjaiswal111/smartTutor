import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  boolean,
  integer,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user.js";

/* ===========================
   ENUMS
=========================== */

export const meetingStatusEnum = pgEnum("meeting_status", [
  "SCHEDULED",
  "ACTIVE",
  "ENDED",
  "CANCELLED",
]);

export const participantRoleEnum = pgEnum("participant_role", [
  "HOST",
  "PARTICIPANT",
]);

export const participantStatusEnum = pgEnum("participant_status", [
  "WAITING",
  "JOINED",
  "LEFT",
  "REMOVED",
]);

/* ===========================
   MEETINGS
=========================== */

export const meetings = pgTable(
  "meetings",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    meetingCode: varchar("meeting_code", { length: 20 })
      .notNull()
      .unique(),

    title: varchar("title", { length: 255 }).notNull(),

    hostId: uuid("host_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    status: meetingStatusEnum("status")
      .notNull()
      .default("SCHEDULED"),

    passwordHash: varchar("password_hash", {
      length: 255,
    }),

    maxParticipants: integer("max_participants")
      .notNull()
      .default(10),

    allowWaitingRoom: boolean("allow_waiting_room")
      .notNull()
      .default(false),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),

    startedAt: timestamp("started_at", { withTimezone: true }),
    endedAt: timestamp("ended_at", { withTimezone: true })
  },
  (table) => ({
    meetingCodeIdx: index("meeting_code_idx").on(table.meetingCode),
    hostIdx: index("meeting_host_idx").on(table.hostId),
  })
);

/* ===========================
   PARTICIPANTS
=========================== */

export const meetingParticipants = pgTable(
  "meeting_participants",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    meetingId: uuid("meeting_id")
      .notNull()
      .references(() => meetings.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    role: participantRoleEnum("role")
      .notNull()
      .default("PARTICIPANT"),

    status: participantStatusEnum("status")
      .notNull()
      .default("JOINED"),

    joinedAt: timestamp("joined_at")
      .defaultNow()
      .notNull(),

    leftAt: timestamp("left_at"),
  },
  (table) => ({
    meetingUserUnique: unique("meeting_user_unique").on(
      table.meetingId,
      table.userId
    ),

    meetingIdx: index("participant_meeting_idx").on(table.meetingId),

    userIdx: index("participant_user_idx").on(table.userId),
  })
);

/* ===========================
   RELATIONS
=========================== */

export const meetingRelations = relations(meetings, ({ one, many }) => ({
  host: one(users, {
    fields: [meetings.hostId],
    references: [users.id],
  }),

  participants: many(meetingParticipants),
}));

export const meetingParticipantRelations = relations(
  meetingParticipants,
  ({ one }) => ({
    meeting: one(meetings, {
      fields: [meetingParticipants.meetingId],
      references: [meetings.id],
    }),

    user: one(users, {
      fields: [meetingParticipants.userId],
      references: [users.id],
    }),
  })
);