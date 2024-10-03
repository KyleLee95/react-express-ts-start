import { z } from "zod";

export const userCreateSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
