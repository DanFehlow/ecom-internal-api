import prismaClient from "../../prisma";

interface OrderService {
  order_id: string;
}

class RemoveOrderService {
  async execute({ order_id }: OrderService) {
    const order = await prismaClient.order.delete({
      where: {
        id: order_id,
      },
    });
    return order;
  }
}
export { RemoveOrderService };
