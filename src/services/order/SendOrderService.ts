import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class SendOrderService {
  async execute({ order_id }: OrderRequest) {
    console.log("Order ID:", order_id);
    if (!order_id) {
      throw new Error("Order ID não fornecido");
    }

    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      },
    });

    return order;
  }
}

export { SendOrderService };
