import { Router, Request, Response, NextFunction } from "express";
import { validateData } from "src/middlewares/validateData";
import { userCreateSchema } from "./userSchemas";
export const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = { message: "hello world!" };
    res.json(payload);
  } catch (err: unknown) {
    next(err);
  }
});

router.post(
  "/create",
  validateData(userCreateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "User created" });
    } catch (err: unknown) {
      next(err);
    }
  },
);
