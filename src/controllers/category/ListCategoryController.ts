import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const createCategoryService = new ListCategoryService();
    const listcategory = await createCategoryService.execute();

    return res.json(listcategory);
  }
}

export { ListCategoryController };
