import { NextResponse } from "next/server";

import { SbHealthRepository } from "@/infrastructure/repositories/sb_health_repository";

import { HealthUsecase } from "@/application/usecases/healths/mypage_health_usecase";

const healthRepository = new SbHealthRepository();
const healthUsecase = new HealthUsecase(healthRepository);

// GET: 특정 유저 건강 데이터 조회 (GET /api/mypage/healths/[id])
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

    return NextResponse.json(healthData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch health data" }, { status: 500 });
  }
}

// POST: 건강 데이터 저장(업데이트 또는 생성) (POST /api/mypage/healths/[id])
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
    if (!healthData || !healthData.activity_code) {
      return NextResponse.json({ error: "Missing health data or activity code" }, { status: 400 });
    }

    const savedHealth = await healthUsecase.saveHealth(userId, healthData);
    return NextResponse.json(savedHealth, { status: 201 });
  } catch (error) {
    console.error("Error saving health data:", error); // 에러 로그 추가
    return NextResponse.json({ error: "Failed to save health data", details: error.message }, { status: 500 });
  }
}
