import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CreateUserSchema } from "../dtos/user/create-user-dto";
import { LoginUserSchema } from "../dtos/user/login-user-dto";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    const payload = CreateUserSchema.parse(req.body);
    try {
      const result = await this.authService.register(payload);

      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  async login(req: Request, res: Response) {
    const payload = LoginUserSchema.parse(req.body);
    try {
      const result = await this.authService.login(payload);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
