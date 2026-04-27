import { prisma } from "../lib/prisma";

export class UserService {
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  async getAllUser() {
    return await prisma.user.findMany();
  }
}
