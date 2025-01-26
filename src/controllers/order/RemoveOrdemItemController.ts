import { Request, Response } from "express";
import { RemoveOrdemItemService } from "../../services/order/RemoveOrdemItemService";

class RemoveOrdemItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    const removeItemService = new RemoveOrdemItemService();
    const order = await removeItemService.execute({
      item_id,
    });

    return res.json(order);
  }
}

export { RemoveOrdemItemController };
