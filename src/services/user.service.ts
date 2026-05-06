import { decrypt, encrypt } from "../lib/encryption";
import { prisma } from "../lib/prisma";
import { redisClient } from "../lib/redis";

export class UserService {
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  async getAllUser() {
    let users;
    if (await redisClient.exists("all_users")) {
      const cachedUsers = await redisClient.get("all_users");
      if (cachedUsers) {
        return JSON.parse(cachedUsers);
      }
    } else {
      users = await prisma.user.findMany({
        select: { name: true, email: true, role: true },
        cacheStrategy: { ttl: 60 },
      });
    }

    redisClient.setex("all_users", 50, JSON.stringify(users));
  }

  async addPersonalData(
    userId: string,
    data: {
      gender: string;
      age: number;
      nin: string;
      bvn: string;
      vin: string;
      maritalStatus: string;
    },
  ) {
    return await prisma.personalData.create({
      data: {
        userId,
        gender: encrypt(data.gender),
        age: data.age,
        nin: encrypt(data.nin),
        bvn: encrypt(data.bvn),
        vin: encrypt(data.vin),
        maritalStatus: encrypt(data.maritalStatus),
      },
    });
  }

  async getPersonalData(userId: string) {
    const personalData = await prisma.personalData.findUnique({
      where: { userId },
    });
    if (!personalData) return null;
    return {
      ...personalData,
      gender: personalData.gender ? decrypt(personalData.gender) : null,
      nin: personalData.nin ? decrypt(personalData.nin) : null,
      bvn: personalData.bvn ? decrypt(personalData.bvn) : null,
      vin: personalData.vin ? decrypt(personalData.vin) : null,
      maritalStatus: personalData.maritalStatus
        ? decrypt(personalData.maritalStatus)
        : null,
    };
  }
}
