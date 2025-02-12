import { NextResponse } from "next/server";

import { SbPartnerRepository } from "@/infrastructure/repositories/sb_partner_repository";

import type { NextRequest } from "next/server";
import type { Partner } from "@/domain/entities";

import { PartnerUsecase } from "@/application/usecases/partner/partner_usecase";

const partnerRepository = new SbPartnerRepository();
const partnerUsecase = new PartnerUsecase(partnerRepository);

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const storeId = Number(params?.id); // ✅ URL 파라미터에서 ID 가져오기

    if (isNaN(storeId)) {
      return NextResponse.json({ message: "Invalid store ID" }, { status: 400 });
    }

    const partner: Partner | null = await partnerUsecase.findOneById(storeId);

    if (!partner) {
      return NextResponse.json({ message: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json({ partner }, { status: 200 });
  } catch (error) {
    console.error("Error fetching partner:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
