import { config } from "dotenv";
config();

export const ENV = {
  PORT: Number(process.env.PORT) || 3001,
  MONGODB_URI: process.env.MONGODB_URI ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "changeme-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ?? "",
  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER ?? "",
  SMTP_PASS: process.env.SMTP_PASS ?? "",
  SMTP_FROM: process.env.SMTP_FROM ?? "",
  SMTP_TO: process.env.SMTP_TO ?? "",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
} as const;
