import { Router, Request, Response, NextFunction } from "express";
export const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = { message: "hello world!" };
    res.json(payload);
  } catch (err: any) {
    next(err);
  }
});
