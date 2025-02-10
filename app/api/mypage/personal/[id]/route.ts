import { NextResponse } from "next/server";

import { SbUserRepository } from "@/infrastructure/repositories/sb_user_repository";

import { UserUsecase } from "@/application/usecases/users/mypage_personal_usecase";

const userRepository = new SbUserRepository();
const userUsecase = new UserUsecase(userRepository);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  const userId = parseInt(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const user = await userUsecase.getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  const userId = parseInt(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const updatedUser = await req.json(); // 요청 본문에서 수정된 사용자 데이터 가져오기
    const user = await userUsecase.updateUser(userId, updatedUser);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  const userId = parseInt(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    await userUsecase.deleteUser(userId);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
