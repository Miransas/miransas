ALTER TABLE "tracking_events" ADD COLUMN "event_id" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "tracking_events_event_id_unique" ON "tracking_events" USING btree ("event_id");