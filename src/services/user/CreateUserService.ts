import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  nameParam: string;
  emailParam: string;
  passwordParam: string;
}

class CreateUserService {
  async execute({ nameParam, emailParam, passwordParam }: UserRequest) {
    // #######  validar: email não informado ########
    if (!emailParam) {
      throw new Error("Email empty");
    }
    // #######  validar: email já existe na base ########
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: emailParam,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    // #######  criptografando a senha ########
    const passwordHash = await hash(passwordParam, 8);

    // #######  criando o usuario ########
    const user = await prismaClient.user.create({
      data: {
        name: nameParam,
        email: emailParam,
        password: passwordHash,
      },
      // ##### campos de retorno apos o insert na tabela ######
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
