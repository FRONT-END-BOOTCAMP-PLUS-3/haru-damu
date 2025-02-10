// app/api/mypage/healths/[id]/route.ts
import { NextResponse } from "next/server";

import { SbHealthRepository } from "@/infrastructure/repositories/sb_health_repository";

import getUser from "@/utils/supabase/get_user";

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import { HealthUsecase } from "@/application/usecases/healths/mypage_health_usecase";

const healthRepository = new SbHealthRepository();
const healthUsecase = new HealthUsecase(healthRepository);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const healthData = await healthUsecase.getHealthByUserId(userId);
    if (!healthData) {
      return NextResponse.json({ error: "Health data not found" }, { status: 404 });
    }

    const camelCasedHealthData = camelcaseKeys(healthData, { deep: true });
    return NextResponse.json(camelCasedHealthData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch health data" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { healthData } = body;
    if (!healthData || !healthData.activityCode) {
      return NextResponse.json({ error: "Missing health data or activity code" }, { status: 400 });
    }

    const snakeCasedHealthData = snakecaseKeys(healthData, { deep: true });
    const savedHealth = await healthUsecase.saveHealth(userId, snakeCasedHealthData);
    return NextResponse.json(savedHealth, { status: 201 });
  } catch (error) {
    console.error("Error saving health data:", error);
    return NextResponse.json({ error: "Failed to save health data" }, { status: 500 });
  }
}
