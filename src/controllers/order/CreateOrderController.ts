import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { branch, name } = req.body;

    const createOrderService = new CreateOrderService();

    const result = await createOrderService.execute({
      branch,
      name,
    });

    return res.json(result);
  }
}

export { CreateOrderController };


// import { Request, Response } from "express";
// import { CreateOrderService } from "../../services/order/CreateOrderService";

// class CreateOrderController {
//   async handle(req: Request, res: Response) {
//     const { branch, name } = req.body;

//     const createOrderService = new CreateOrderService();

//     const order = await createOrderService.execute({
//       branch,
//       name,
//     });
//     return res.json(order);
//   }
// }

// export { CreateOrderController };
