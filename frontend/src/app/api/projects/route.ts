import { NextResponse } from "next/server";
import { PROJECTS_DATA } from "@/data/portfolioData";

export async function GET() {
  return NextResponse.json(PROJECTS_DATA);
}
