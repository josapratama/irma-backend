import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin";
import { ENV } from "../config/env";
import { createRouter } from "../config/hono.types";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../utils/validate";
import { successResponse, errorResponse } from "../utils/response";
import { loginSchema, changePasswordSchema } from "../schemas/auth.schema";

export const authRouter = createRouter();

// POST /api/auth/login
authRouter.post("/login", async (c) => {
  const body = await validate(c, loginSchema);
  if (!body) return;

  const admin = await Admin.findOne({ email: body.email.toLowerCase() });
  if (!admin) return errorResponse(c, "Invalid credentials", 401);

  const valid = await bcrypt.compare(body.password, admin.passwordHash);
  if (!valid) return errorResponse(c, "Invalid credentials", 401);

  const token = jwt.sign(
    { adminId: admin._id.toString(), email: admin.email },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRES_IN } as jwt.SignOptions,
  );

  return successResponse(c, { token, email: admin.email }, "Login successful");
});

// GET /api/auth/me  (protected)
authRouter.get("/me", authMiddleware, async (c) => {
  const email = c.get("adminEmail");
  return successResponse(c, { email }, "Authenticated");
});

// PATCH /api/auth/change-password  (protected)
authRouter.patch("/change-password", authMiddleware, async (c) => {
  const body = await validate(c, changePasswordSchema);
  if (!body) return;

  const adminId = c.get("adminId");
  const admin = await Admin.findById(adminId);
  if (!admin) return errorResponse(c, "Admin not found", 404);

  const valid = await bcrypt.compare(body.currentPassword, admin.passwordHash);
  if (!valid) return errorResponse(c, "Current password is incorrect", 401);

  admin.passwordHash = await bcrypt.hash(body.newPassword, 12);
  await admin.save();

  return successResponse(c, null, "Password changed successfully");
});

// POST /api/auth/setup — hanya jalan kalau belum ada admin (one-time setup)
authRouter.post("/setup", async (c) => {
  const count = await Admin.countDocuments();
  if (count > 0) return errorResponse(c, "Admin already exists", 409);

  const body = await validate(c, loginSchema);
  if (!body) return;

  const passwordHash = await bcrypt.hash(body.password, 12);
  const admin = await Admin.create({ email: body.email, passwordHash });

  return successResponse(c, { email: admin.email }, "Admin created", 201);
});
