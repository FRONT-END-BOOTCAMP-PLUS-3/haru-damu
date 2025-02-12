import { NextResponse } from "next/server";

import { SbPartnerRepository } from "@/infrastructure/repositories/sb_partner_repository";

import type { NextRequest } from "next/server";
import type { Partner } from "@/domain/entities";

import { PartnerUsecase } from "@/application/usecases/partner/partner_usecase";

const partnerRepository = new SbPartnerRepository();
const partnerUsecase = new PartnerUsecase(partnerRepository);

export async function GET(req: NextRequest, context: { params: { id?: string } }) {
  try {
    if (!context.params?.id) {
      return NextResponse.json({ message: "Invalid store ID" }, { status: 400 });
    }

    const storeId = Number(context.params.id);

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
