import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  index,
} from "drizzle-orm/pg-core";

export const visitors = pgTable(
  "visitors",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    visitorId: text("visitor_id").notNull().unique(),

    // FIRST TOUCH
    firstSource: text("first_source"),
    firstMedium: text("first_medium"),
    firstCampaign: text("first_campaign"),
    firstContent: text("first_content"),
    firstTerm: text("first_term"),
    firstReferrer: text("first_referrer"),
    firstLandingUrl: text("first_landing_url"),

    // LAST TOUCH
    lastSource: text("last_source"),
    lastMedium: text("last_medium"),
    lastCampaign: text("last_campaign"),
    lastContent: text("last_content"),
    lastTerm: text("last_term"),
    lastReferrer: text("last_referrer"),
    lastLandingUrl: text("last_landing_url"),

    // Statistics
    pageViews: integer("page_views").notNull().default(0),

    firstSeenAt: timestamp("first_seen_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    lastSeenAt: timestamp("last_seen_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    firstSourceIdx: index("visitors_first_source_idx").on(
      table.firstSource
    ),

    lastSourceIdx: index("visitors_last_source_idx").on(
      table.lastSource
    ),

    firstSeenIdx: index("visitors_first_seen_idx").on(
      table.firstSeenAt
    ),
  })
);

export const trackingEvents = pgTable(
  "tracking_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    visitorId: text("visitor_id").notNull(),

    eventName: text("event_name").notNull(),

    page: text("page"),

    source: text("source"),
    medium: text("medium"),
    campaign: text("campaign"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    visitorIdx: index("tracking_events_visitor_idx").on(
      table.visitorId
    ),

    eventNameIdx: index("tracking_events_event_name_idx").on(
      table.eventName
    ),

    createdAtIdx: index("tracking_events_created_at_idx").on(
      table.createdAt
    ),
  })
);

export type Visitor = typeof visitors.$inferSelect;
export type NewVisitor = typeof visitors.$inferInsert;

export type TrackingEvent = typeof trackingEvents.$inferSelect;
export type NewTrackingEvent = typeof trackingEvents.$inferInsert;
