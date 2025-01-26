import { Request, Response } from "express";
import { AddOrderItemService } from "../../services/order/AddOrderItemService";

class AddOrderItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const addItem = new AddOrderItemService();
    const order = await addItem.execute({
      order_id,
      product_id,
      amount,
    });

    return res.json(order);
  }
}

export { AddOrderItemController };
