import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    const { email, password, name, role } = req.body;
    try {
      const result = await this.authService.register(
        email,
        password,
        name,
        role,
      );
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await this.authService.login(email, password);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
