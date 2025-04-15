import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrderController {
  async handle(req: Request, res: Response) {
    const listOrdersServices = new ListOrdersService();

    const orders = await listOrdersServices.execute();
    return res.json(orders);
  }
}
export { ListOrderController };
