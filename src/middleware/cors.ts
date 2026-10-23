import { cors } from "hono/cors";
import { ENV } from "../config/env";

const allowedOrigins = [
  ...ENV.FRONTEND_URL.split(",").map((u) => u.trim().replace(/\/+$/, "")),
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

export const corsMiddleware = cors({
  origin: (incomingOrigin) => {
    if (!incomingOrigin) return allowedOrigins[0] || "*";
    const cleanOrigin = incomingOrigin.trim().replace(/\/+$/, "");
    if (allowedOrigins.some((ao) => ao === cleanOrigin)) {
      return incomingOrigin;
    }
    // Fallback: return incoming if matching wildcard or localhost
    if (cleanOrigin.includes("localhost") || cleanOrigin.includes("127.0.0.1")) {
      return incomingOrigin;
    }
    return allowedOrigins[0] || "*";
  },
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
