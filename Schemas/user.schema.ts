import { z } from "zod";

export const UserIdSchema = z.number().int();

export const UserSchema = z.object({
  id: UserIdSchema.optional(),
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export const UserUpdateSchema = z.object({
  id: UserIdSchema.optional(),
  username: z.string().min(1).optional(),
  email: z.string().email().min(1).optional(),
  password: z.string().min(8).optional(),
});

// extract the inferred type
export type User = z.infer<typeof UserSchema>;
