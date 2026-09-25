import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const firstTouch = request.cookies.get("attribution_first")?.value;
    const lastTouch = request.cookies.get("attribution_last")?.value;

    let first = null;
    let last = null;

    try {
        first = firstTouch ? JSON.parse(firstTouch) : null;
    } catch {
        first = null;
    }

    try {
        last = lastTouch ? JSON.parse(lastTouch) : null;
    } catch {
        last = null;
    }

    return NextResponse.json({
        first,
        last,
    });
}
