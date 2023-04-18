// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { UserSchema } from "../../../../Schemas/user.schema";
import crypto from "crypto";
import { handlePrismaError } from "../../../../ErrorHandlers/prismaErrorHandler";

const prisma = new PrismaClient();

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;

  try {
    UserSchema.parse(data);
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  data.password = crypto
    .createHash("sha256")
    .update(data.password)
    .digest("hex");

  try {
    const user = await prisma.user.create({
      data,
    });

    res.status(200).json(user);
    return;
  } catch (error) {
    const message = handlePrismaError("user", error);
    res.status(400).json(message);
    return;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      break;
    case "POST":
      await createUser(req, res);
      break;
    case "PUT":
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      break;
  }
}
