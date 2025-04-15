import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092'], 
});

const producer = kafka.producer();

const sendMessage = async (topic: string, message: string) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      { value: message },
    ],
  });
  await producer.disconnect();
};

export { sendMessage };
