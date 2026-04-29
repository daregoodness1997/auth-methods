import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    try {
      const user = await this.userService.getUserByEmail(String(email));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUser();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addPersonalData(req: Request, res: Response) {
    const { userId } = req.user as { userId: string };
    const { gender, age, nin, bvn, vin, maritalStatus } = req.body;
    try {
      const personalData = await this.userService.addPersonalData(userId, {
        gender,
        age,
        nin,
        bvn,
        vin,
        maritalStatus,
      });
      res.status(201).json(personalData);
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPersonalData(req: Request, res: Response) {
    const { userId } = req.user as { userId: string };
    try {
      const personalData = await this.userService.getPersonalData(userId);
      if (!personalData) {
        return res.status(404).json({ error: "Personal data not found" });
      }
      res.status(200).json(personalData);
    } catch (err: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
