import { Request, Response } from "express";
import AuthUserServices from "../../services/users/AuthUserServices";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserServices();

    const auth = await authUserService.execute({
      email,
      password,
    });

    return res.json(auth);
  }
}

export default AuthUserController;
