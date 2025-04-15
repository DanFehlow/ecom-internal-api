import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserServices {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o usuario existe:
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    //Verificar se a senha esta correta:

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    //Se deu tudo certo vamos gerar o token ao usuário
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export default AuthUserServices;
