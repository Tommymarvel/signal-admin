import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  
  const authToken = req.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ token: authToken });
}