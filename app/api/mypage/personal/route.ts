import { NextResponse } from "next/server";

import { SbUserRepository } from "@/infrastructure/repositories/sb_user_repository";

import { UserUsecase } from "@/application/usecases/users/mypage_personal_usecase";
import getUser from "@/utils/supabase/get_user";

const userRepository = new SbUserRepository();
const userUsecase = new UserUsecase(userRepository);

export async function GET(req: Request) {
  try {
    const user = await getUser("user");

    if (!user || !('userId' in user)) {
      return NextResponse.json({ error: "User not found or user ID missing" }, { status: 404 });
    }

    const userInfo = await userUsecase.getUserById(user.userId);

    if (!userInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(userInfo);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getUser("user");

    if (!user || !('userId' in user)) {
      return NextResponse.json({ error: "User not found or user ID missing" }, { status: 404 });
    }

    const updatedUser = await req.json();
    
    const updatedUserInfo = await userUsecase.updateUser(user.userId, updatedUser);
    
    return NextResponse.json(updatedUserInfo);
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getUser("user");

    if (!user || !('userId' in user)) {
      return NextResponse.json({ error: "User not found or user ID missing" }, { status: 404 });
    }

    await userUsecase.deleteUser(user.userId);
    
    return new NextResponse(null, { status: 204 }); 
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
