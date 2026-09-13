import { cors } from "hono/cors";
import { ENV } from "../config/env";

export const corsMiddleware = cors({
  origin: [ENV.FRONTEND_URL, "http://localhost:3000"],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
