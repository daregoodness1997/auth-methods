import crypto from "crypto";

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.ENCRYPTION_KEY || "", "hex");
const iv = crypto.randomBytes(12);

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${encrypted}:${authTag}`;
}

export function decrypt(encryptedText: string): string {
  const [ivHex, data, authTagHex] = encryptedText.split(":");
  const ivBuffer = Buffer.from(ivHex, "hex");
  const authTagBuffer = Buffer.from(authTagHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  decipher.setAuthTag(authTagBuffer);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
