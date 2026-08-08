import { NextResponse } from "next/server";
import { SKILLS_DATA } from "@/data/portfolioData";

export async function GET() {
  return NextResponse.json(SKILLS_DATA);
}
