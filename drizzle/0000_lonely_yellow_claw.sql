CREATE TABLE "tracking_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visitor_id" text NOT NULL,
	"event_name" text NOT NULL,
	"page" text,
	"source" text,
	"medium" text,
	"campaign" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visitors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visitor_id" text NOT NULL,
	"first_source" text,
	"first_medium" text,
	"first_campaign" text,
	"first_content" text,
	"first_term" text,
	"first_referrer" text,
	"first_landing_url" text,
	"last_source" text,
	"last_medium" text,
	"last_campaign" text,
	"last_content" text,
	"last_term" text,
	"last_referrer" text,
	"last_landing_url" text,
	"page_views" integer DEFAULT 0 NOT NULL,
	"first_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "visitors_visitor_id_unique" UNIQUE("visitor_id")
);
--> statement-breakpoint
CREATE INDEX "tracking_events_visitor_idx" ON "tracking_events" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "tracking_events_event_name_idx" ON "tracking_events" USING btree ("event_name");--> statement-breakpoint
CREATE INDEX "tracking_events_created_at_idx" ON "tracking_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "visitors_first_source_idx" ON "visitors" USING btree ("first_source");--> statement-breakpoint
CREATE INDEX "visitors_last_source_idx" ON "visitors" USING btree ("last_source");--> statement-breakpoint
CREATE INDEX "visitors_first_seen_idx" ON "visitors" USING btree ("first_seen_at");