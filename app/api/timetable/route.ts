import { NextRequest, NextResponse } from "next/server";
import Librus from "librus-api";

export async function POST(req: NextRequest) {
  const { login, pass, month, year } = await req.json();

  if (!login || !pass) {
    return NextResponse.json(
      { error: "Missing 'login' or 'pass' in request body." },
      { status: 400 }
    );
  }

  try {
    const client = new Librus();

    await client.authorize(login, pass);

    const calendar = await client.calendar.getTimetable(month, year);

    return NextResponse.json({ calendar }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in POST /api/calendar:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
