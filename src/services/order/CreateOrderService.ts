import prismaClient from "../../prisma";
import { sendMessage } from "../../services/kafkaProducer";

interface OrderRequest {
  branch: string;
  name: string;
}

class CreateOrderService {
  async execute({ branch, name }: OrderRequest) {
 
    const order = await prismaClient.order.create({
      data: {
        branch: branch,
        name: name,
      },
    });

    const message = JSON.stringify({ id: order.id, branch: order.branch, name: order.name });
    await sendMessage('create-order-topic', message);

    return order;
  }
}

export { CreateOrderService };




// import prismaClient from "../../prisma";

// interface OrderRequest {
//   branch: string;
//   name: string;
// }

// class CreateOrderService {
//   async execute({ branch, name }: OrderRequest) {
//     const order = await prismaClient.order.create({
//       data: {
//         branch: branch,
//         name: name,
//       },
//     });

//     return order;
//   }
// }

// export { CreateOrderService };