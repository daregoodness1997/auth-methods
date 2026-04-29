import { encrypt } from "../lib/encryption";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

const generateApiKey = () => {
  return `pk-${bcrypt.genSaltSync(10)}}`;
};

export const createApiKey = async (maxUsage?: number) => {
  const key = generateApiKey();
  return await prisma.apiKey.create({
    data: {
      key: encrypt(key),
      maxUsage,
    },
  });
};

export const getApiKey = async (id: string) => {
  return await prisma.apiKey.findUnique({ where: { id } });
};

export const invalidateApiKey = async (id: string) => {
  return await prisma.apiKey.update({
    where: { id },
    data: { valid: false },
  });
};

export const incrementApiKeyUsage = async (id: string) => {
  const apiKey = await getApiKey(id);
  if (!apiKey || !apiKey.valid) {
    throw new Error("Invalid API key");
  }
  if (apiKey.maxUsage && apiKey.usageCount >= apiKey.maxUsage) {
    await invalidateApiKey(id);
    throw new Error("API key usage limit exceeded");
  }
  return await prisma.apiKey.update({
    where: { id },
    data: { usageCount: apiKey.usageCount + 1 },
  });
};

export const deleteApiKey = async (id: string) => {
  return await prisma.apiKey.delete({ where: { id } });
};

export const listApiKeys = async () => {
  return await prisma.apiKey.findMany();
};
