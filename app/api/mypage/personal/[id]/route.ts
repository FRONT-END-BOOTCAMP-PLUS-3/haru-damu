import { SbUserRepository } from "@/infrastructure/repositories/sb_user_repository";

import type { NextApiRequest, NextApiResponse } from "next";

import { UserUsecase } from "@/application/usecases/users/mypage_personal_usecase";

const userRepository = new SbUserRepository();
const userUsecase = new UserUsecase(userRepository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userId = parseInt(id as string);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const user = await userUsecase.getUserById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
      }

      case "PUT": {
        const updatedUser = await userUsecase.updateUser(userId, req.body);
        return res.status(200).json(updatedUser);
      }

      case "DELETE":
        await userUsecase.deleteUser(userId);
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling user request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
