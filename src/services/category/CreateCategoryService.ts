import prismaClient from "../../prisma";

interface CategoryRequest {
  nameParam: string;
}

class CreateCategoryService {
    
  async execute({ nameParam }: CategoryRequest) {
    if (nameParam === "") {
      throw new Error("Name invalid");
    }

    const category = await prismaClient.category.create({
      data: {
        name: nameParam,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
