import { Context } from "hono";
import { ZodSchema, ZodError } from "zod";
import { errorResponse } from "./response";
import type { AppVariables } from "../config/hono.types";

export async function validate<T>(
  c: Context<{ Variables: AppVariables }>,
  schema: ZodSchema<T>,
): Promise<T | null> {
  try {
    const body = await c.req.json();
    return schema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      errorResponse(
        c,
        "Validation failed",
        422,
        err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      );
    } else {
      errorResponse(c, "Invalid JSON body", 400);
    }
    return null;
  }
}
