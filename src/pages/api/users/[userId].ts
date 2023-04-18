// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  UserIdSchema,
  UserUpdateSchema,
} from "../../../../Schemas/user.schema";

const prisma = new PrismaClient();

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.query.userId;
  let userId;

  try {
    UserIdSchema.parse(Number(data));
    userId = Number(data);
  } catch (error) {
    res.status(400).json({ error, data });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: { equals: userId },
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }

    return;
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.userId;
  const data = req.body;
  let userId;

  try {
    UserIdSchema.parse(Number(id));
    userId = Number(id);
  } catch (error) {
    res.status(400).json({ error, id });
    return;
  }

  try {
    UserUpdateSchema.parse(data);
  } catch (error) {
    res.status(400).json({ error, data });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    if (user) {
      res.status(200).json({ old: data, new: user });
    } else {
      res.status(404);
    }

    return;
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

const deleteUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.query.userId;
  let userId;

  try {
    UserIdSchema.parse(Number(data));
    userId = Number(data);
  } catch (error) {
    res.status(400).json({ error, data });
    return;
  }

  try {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }

    return;
  } catch (error) {
    res.status(400).json(error);
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
      await getUserById(req, res);
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "PATCH":
      await updateUser(req, res);
      break;
    case "DELETE":
      await deleteUserById(req, res);
      break;
    default:
      break;
  }
}
