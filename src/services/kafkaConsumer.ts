import { Kafka } from 'kafkajs';
import prismaClient from "../prisma";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'order-group' });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'create-order-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const orderData = JSON.parse(message.value.toString());

      // Processa a criação da ordem no banco de dados
      await prismaClient.order.create({
        data: {
          branch: orderData.branch,
          name: orderData.name,
        },
      });

      console.log(`Order created for branch: ${orderData.branch}, name: ${orderData.name}`);
    },
  });
};

export { consumeMessages };
