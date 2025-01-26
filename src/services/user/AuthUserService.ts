import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  emailParam: string;
  passwordParam: string;
}

class AuthUserService {
  async execute({ emailParam, passwordParam }: AuthRequest) {
    
    const user = await prismaClient.user.findFirst({
      where: {
        email: emailParam,
      },
    });

    if (!user) {
      throw new Error("User/Password incorrect 0");
    }

    const passwordMatch = await compare(passwordParam, user.password);
    if (!passwordMatch) {
      throw new Error("User/Password incorrect 1");
    }

    //gerar um token JWT e devolver os dados do usuario com id e email
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

    return { id: user.id,
           name: user.name,
          email: user.email,
          token: token
         };
  }
}

export { AuthUserService };
