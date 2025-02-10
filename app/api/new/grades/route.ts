import { NextRequest, NextResponse } from "next/server";
import Librus from "librus-api";

export async function POST(req: NextRequest) {
  const { login, pass } = await req.json();

  if (!login || !pass) {
    return NextResponse.json(
      { error: "Missing 'login' or 'pass' in request body." },
      { status: 400 }
    );
  }

  try {
    const client = new Librus();

    await client.authorize(login, pass);

    const gradesRaw = await client.info.getGrades();

    const grades = gradesRaw.map((subject) => ({
      name: subject.name,
      semesters: subject.semester.map((semester) =>
        semester.grades.map((grade) => {
          return grade.value;
        })
      ),
    }));

    console.log("Grades:", JSON.stringify(grades, null, 0));

    return NextResponse.json({ grades }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in POST /api/grades:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
