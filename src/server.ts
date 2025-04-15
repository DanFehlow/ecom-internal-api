import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import "express-async-errors";
import cors from "cors";
import path from "path";
import swaggerSetup from "./swagger";
import { consumeMessages } from './services/kafkaConsumer';

const app = express();
app.use(express.json());

app.use(cors());

app.use(router);
swaggerSetup(app);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

//app.listen(3333, () => console.log("Servidor Online"));
const startServer = async () => {
  try {
    await consumeMessages(); // Iniciar o Kafka consumer para consumir mensagens
    app.listen(3333, () => console.log("Servidor Online e Kafka consumer ativo"));
  } catch (error) {
    console.error("Erro ao iniciar o servidor ou Kafka consumer:", error);
  }
};

startServer();
