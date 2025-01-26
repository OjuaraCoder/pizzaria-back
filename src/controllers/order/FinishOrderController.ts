import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    const sendOrder = new FinishOrderService();
    const order = await sendOrder.execute({
      order_id,
    });

    return res.json(order);
  }
}

export { FinishOrderController };
