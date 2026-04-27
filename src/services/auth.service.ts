import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

enum Role {
  USER = "USER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

export class AuthService {
  async register(email: string, password: string, name?: string, role?: Role) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: {
          create: { hash: hashedPassword },
        },
        name,
        role,
      },
    });

    const token = jwt.sign(
      { userId: user.id, role: role, name: name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    return { token };
  }
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { password: true },
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (user?.password?.hash) {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password.hash,
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    return { token };
  }
  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    return { message: "Password reset link sent to email (mock)", token };
  }
  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.password.update({
        where: { userId: decoded.userId },
        data: { hash: hashedPassword },
      });
      return { message: "Password reset successful" };
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }

  async logout(token: string) {}
}
