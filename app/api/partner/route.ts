import { NextResponse } from "next/server";

import { SbPartnerRepository } from "@/infrastructure/repositories/sb_partner_repository";

import type { NextRequest } from "next/server";

import { PartnerUsecase } from "@/application/usecases/partner/partner_usecase";
import { Partner } from "@/domain/entities";

// 필요한 타입 정의

const partnerRepository = new SbPartnerRepository();
const partnerUsecase = new PartnerUsecase(partnerRepository);

export async function GET(req: NextRequest) {
  try {
    // URL에서 storeId 가져오기 (ex: /api/partner?storeId=1)
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get("storeId");

    if (!storeId) {
      return NextResponse.json({ message: "storeId is required" }, { status: 400 });
    }

    const partner: Partner | null = await partnerUsecase.findOneById(Number(storeId));

    if (!partner) {
      return NextResponse.json({ message: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json({ partner }, { status: 200 });
  } catch (error) {
    console.error("Error fetching partner:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
