import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Endpoints Boti",
    version: "1.0.0",
    description:
      "API's para integração da funcionalidade de solicitações de pedidos da loja para almoxarifado." ,
  },
  servers: [
    {
      url: "http://localhost:3333",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
