import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createApiKey } from "../services/apiKey.service";

export class ApiKeyController {
  async createApiKey(req: Request, res: Response) {
    const { maxUsage } = req.body;
    try {
      const apiKey = await createApiKey(maxUsage);
      res.status(201).json(apiKey);
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllApiKeys(req: Request, res: Response) {
    try {
      const apiKeys = await prisma.apiKey.findMany();
      res.status(200).json(apiKeys);
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
