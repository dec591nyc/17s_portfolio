import { NextResponse } from "next/server";
import { EXPERIENCES_DATA } from "@/data/portfolioData";

export async function GET() {
  return NextResponse.json(EXPERIENCES_DATA);
}
