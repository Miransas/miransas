import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  visitors,
  trackingEvents,
} from "@/db/schema";

export const dynamic = "force-dynamic";

type Attribution = {
  source: string;
  medium: string;
  campaign: string | null;
  content: string | null;
  term: string | null;
  referrer: string | null;
  landing_url: string;
  captured_at: string;
};

function parseCookie<T>(
  value?: string
): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const visitorId =
      request.cookies.get("visitor_id")?.value;

    if (!visitorId) {
      return NextResponse.json(
        {
          success: false,
          error: "visitor_id_missing",
        },
        { status: 400 }
      );
    }

    const firstTouch =
      parseCookie<Attribution>(
        request.cookies.get(
          "attribution_first"
        )?.value
      );

    const lastTouch =
      parseCookie<Attribution>(
        request.cookies.get(
          "attribution_last"
        )?.value
      );

    const body =
      await request.json().catch(
        () => ({})
      );

    const eventId =
      typeof body.eventId === "string"
        ? body.eventId
        : null;

    const eventName =
      typeof body.eventName === "string"
        ? body.eventName
        : "page_view";

    const page =
      typeof body.page === "string"
        ? body.page
        : null;

    /*
     * Event ID olmadan tracking kabul etmiyoruz.
     */
    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          error: "event_id_missing",
        },
        { status: 400 }
      );
    }

    /*
     * --------------------------------------------------
     * DUPLICATE KONTROLÜ
     * --------------------------------------------------
     *
     * Aynı event daha önce kaydedilmiş mi?
     */
    const existingEvent =
      await db
        .select({
          id: trackingEvents.id,
        })
        .from(trackingEvents)
        .where(
          eq(
            trackingEvents.eventId,
            eventId
          )
        )
        .limit(1);

    if (existingEvent.length > 0) {
      return NextResponse.json({
        success: true,
        duplicate: true,
      });
    }

    /*
     * --------------------------------------------------
     * VISITOR OLUŞTUR
     * --------------------------------------------------
     */

    await db
      .insert(visitors)
      .values({
        visitorId,

        firstSource:
          firstTouch?.source ?? "direct",

        firstMedium:
          firstTouch?.medium ?? "none",

        firstCampaign:
          firstTouch?.campaign ?? null,

        firstContent:
          firstTouch?.content ?? null,

        firstTerm:
          firstTouch?.term ?? null,

        firstReferrer:
          firstTouch?.referrer ?? null,

        firstLandingUrl:
          firstTouch?.landing_url ?? null,

        lastSource:
          lastTouch?.source ?? "direct",

        lastMedium:
          lastTouch?.medium ?? "none",

        lastCampaign:
          lastTouch?.campaign ?? null,

        lastContent:
          lastTouch?.content ?? null,

        lastTerm:
          lastTouch?.term ?? null,

        lastReferrer:
          lastTouch?.referrer ?? null,

        lastLandingUrl:
          lastTouch?.landing_url ?? null,

        pageViews: 0,
      })
      .onConflictDoNothing({
        target: visitors.visitorId,
      });

    /*
     * --------------------------------------------------
     * PAGE VIEW +1
     * --------------------------------------------------
     */

    const updateData: {
      pageViews: ReturnType<typeof sql>;
      lastSeenAt: Date;

      lastSource?: string;
      lastMedium?: string;
      lastCampaign?: string | null;
      lastContent?: string | null;
      lastTerm?: string | null;
      lastReferrer?: string | null;
      lastLandingUrl?: string | null;
    } = {
      pageViews:
        sql`${visitors.pageViews} + 1`,

      lastSeenAt: new Date(),
    };

    /*
     * Last touch sadece gerçek attribution
     * varsa güncellenir.
     */
    if (lastTouch) {
      updateData.lastSource =
        lastTouch.source;

      updateData.lastMedium =
        lastTouch.medium;

      updateData.lastCampaign =
        lastTouch.campaign;

      updateData.lastContent =
        lastTouch.content;

      updateData.lastTerm =
        lastTouch.term;

      updateData.lastReferrer =
        lastTouch.referrer;

      updateData.lastLandingUrl =
        lastTouch.landing_url;
    }

    await db
      .update(visitors)
      .set(updateData)
      .where(
        eq(
          visitors.visitorId,
          visitorId
        )
      );

    /*
     * --------------------------------------------------
     * EVENT INSERT
     * --------------------------------------------------
     */

    await db
      .insert(trackingEvents)
      .values({
        eventId,

        visitorId,

        eventName,

        page,

        source:
          lastTouch?.source ?? "direct",

        medium:
          lastTouch?.medium ?? "none",

        campaign:
          lastTouch?.campaign ?? null,
      })
      .onConflictDoNothing({
        target: trackingEvents.eventId,
      });

    return NextResponse.json({
      success: true,
      duplicate: false,
    });
  } catch (error) {
    console.error(
      "Tracking error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "tracking_failed",
      },
      { status: 500 }
    );
  }
}
