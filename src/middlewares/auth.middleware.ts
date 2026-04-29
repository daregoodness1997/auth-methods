import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey =
    (req.headers["x-api-key"] as string) ||
    (req.headers.authorization?.split(" ")[1] as string);
  if (!apiKey) {
    return res.status(401).json({ error: "API key missing" });
  }

  const validKey = prisma.apiKey.findUnique({
    where: { key: apiKey, valid: true },
  });

  if (!validKey) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  next();
};

export { authMiddleware, apiKeyMiddleware };
