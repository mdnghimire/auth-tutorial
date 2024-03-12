import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await db.user.findMany({
    include: {
      accounts: true,
    },
  });
  return NextResponse.json(users, {
    status: 200,
    statusText: "Users data fetched successfully",
  });
}
