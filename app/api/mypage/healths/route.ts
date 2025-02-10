import { NextResponse } from "next/server";
import { SbHealthRepository } from "@/infrastructure/repositories/sb_health_repository";
import { HealthUsecase } from "@/application/usecases/healths/mypage_health_usecase";
import getUser from "@/utils/supabase/get_user";

const healthRepository = new SbHealthRepository();
const healthUsecase = new HealthUsecase(healthRepository);

export async function GET(req: Request) {
  try {
    const user = await getUser("user");

    if (!user || !('userId' in user)) {
      return NextResponse.json({ error: "User not found or user ID missing" }, { status: 404 });
    }

    const healthData = await healthUsecase.getHealthByUserId(user.userId);

    // 건강 데이터가 없으면 빈 배열을 반환하고 오류를 발생시키지 않음
    return NextResponse.json(healthData || []);
  } catch (error) {
    console.error("Error fetching health data:", error);
    return NextResponse.json({ error: "Failed to fetch health data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUser("user");

    // user 객체가 제대로 있는지 확인하고 userId가 존재하는지 체크
    if (!user || !('userId' in user)) {
      return NextResponse.json({ error: "User not found or user ID missing" }, { status: 404 });
    }

    const userId = user.userId;

    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { healthData } = body;
    if (!healthData || !healthData.activityCode) {
      return NextResponse.json({ error: "Missing health data or activity code" }, { status: 400 });
    }

    // 건강 정보 저장 (생성 또는 수정)
    const savedHealth = await healthUsecase.saveHealth(userId, healthData);
    return NextResponse.json(savedHealth, { status: 201 });
  } catch (error) {
    console.error("Error saving health data:", error);
    return NextResponse.json({ error: "Failed to save health data" }, { status: 500 });
  }
}


