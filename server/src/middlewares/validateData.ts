import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodSchema } from "zod";

export function validateData<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and parse the request body
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract error messages
        const errors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
        res.status(400).json({ errors });
        return;
      }
      // Pass unexpected errors to the default error handler
      next(error);
    }
  };
}
