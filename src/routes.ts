import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: Daniel Fehlow
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: daniel.fehlow@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *                 example: Teste123!
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                   example: 1f44e59e-7f9c-4d8a-9fd4-48e8e34e4d1c
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   example: Daniel Fehlow
 *                 email:
 *                   type: string
 *                   description: The email address of the user
 *                   example: daniel.fehlow@example.com
 *       400:
 *         description: Bad request (e.g., email not provided or user already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Email Incorrect
 *       500:
 *         description: Internal server error
 */
router.post("/users", new CreateUserController().handle);


/**
 * @swagger
 * /session:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: dani@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: Teste123!
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's unique ID
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: Daniel Fehlow
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                   example: dani@example.com
 *                 token:
 *                   type: string
 *                   description: The authentication token for the user
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDUiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHBpcmF0aW9uX3N0YW5kYXJkYXkiOiI5MDYwMDEyMzQ1IiwiaWF0IjoxNjI3MzA5NTI3LCJleHBpcmF0aW9uX3N0YW5kYXJkYXkiOiI1NDMyMDAiLCJleHBpcmF0aW9uX3N0YW5kYXJkYXkiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.8Kx5j5phOQ9g2SxR3L1C9eFzU5lcM1JqUGT9R-6jc4Q
 *       400:
 *         description: Bad request (e.g., missing email or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: User/password incorrect
 *       401:
 *         description: Unauthorized (e.g., invalid email or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: User/password incorrect
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: An unexpected error occurred
 */
router.post("/session", new AuthUserController().handle);


/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 */
router.get("/me", isAuthenticated, new DetailUserController().handle);

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 */
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Category created successfully
 */
router.post(
  "/category",
  // isAuthenticated,
  new CreateCategoryController().handle
);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: List all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories listed successfully
 */
router.get(
  "/category",
  // isAuthenticated,
  new ListCategoryController().handle
);

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management
 */
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product created successfully
 */
router.post(
  "/product",
  // isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

/**
 * @swagger
 * /category/product:
 *   get:
 *     summary: List products by category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products listed by category successfully
 */
router.get(
  "/category/product",
  // isAuthenticated,
  new ListByCategoryController().handle
);

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management
 */
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Order created successfully
 */
router.post(
  "/order",
  // isAuthenticated,
  new CreateOrderController().handle
);

/**
 * @swagger
 * /order:
 *   delete:
 *     summary: Remove an order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Order removed successfully
 */
router.delete(
  "/order",
  // isAuthenticated,
  new RemoveOrderController().handle
);

/**
 * @swagger
 * /order/add:
 *   post:
 *     summary: Add an item to an order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Item added to order successfully
 */
router.post(
  "/order/add",
  // isAuthenticated,
  new AddItemController().handle
);

/**
 * @swagger
 * /order/remove:
 *   delete:
 *     summary: Remove an item from an order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Item removed from order successfully
 */
router.delete(
  "/order/remove",
  // isAuthenticated,
  new RemoveItemController().handle
);

/**
 * @swagger
 * /order/send:
 *   put:
 *     summary: Send an order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Order sent successfully
 */
router.put(
  "/order/send",
  // isAuthenticated,
  new SendOrderController().handle
);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders listed successfully
 */
router.get(
  "/orders",
  // isAuthenticated,
  new ListOrderController().handle
);

/**
 * @swagger
 * /order/detail:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 */
router.get(
  "/order/detail",
  // isAuthenticated,
  new DetailOrderController().handle
);

/**
 * @swagger
 * /order/finish:
 *   put:
 *     summary: Finish an order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Order finished successfully
 */
router.put(
  "/order/finish",
  // isAuthenticated,
  new FinishOrderController().handle
);

export { router };

// import { Router } from "express";
// import multer from "multer";
// import { CreateUserController } from "./controllers/user/CreateUserController";
// import AuthUserController from "./controllers/user/AuthUserController";
// import { DetailUserController } from "./controllers/user/DetailUserController";
// import { isAuthenticated } from "./middlewares/isAuthenticated";
// import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
// import { ListCategoryController } from "./controllers/category/ListCategoryController";
// import { CreateProductController } from "./controllers/product/CreateProductController";
// import uploadConfig from "./config/multer";
// import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
// import { CreateOrderController } from "./controllers/order/CreateOrderController";
// import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
// import { AddItemController } from "./controllers/order/AddItemController";
// import { RemoveItemController } from "./controllers/order/RemoveItemController";
// import { SendOrderController } from "./controllers/order/SendOrderController";
// import { ListOrderController } from "./controllers/order/ListOrderController";
// import { DetailOrderController } from "./controllers/order/DetailOrderController";
// import { FinishOrderController } from "./controllers/order/FinishOrderController";

// const router = Router();

// const upload = multer(uploadConfig.upload("./tmp"));

// // Rotas Users
// router.post("/users", new CreateUserController().handle);

// router.post("/session", new AuthUserController().handle);

// router.get("/me", isAuthenticated, new DetailUserController().handle);

// // Rotas de Category
// router.post(
//   "/category",
//   isAuthenticated,
//   new CreateCategoryController().handle
// );
// router.get("/category", isAuthenticated, new ListCategoryController().handle);

// // Rotas Product
// router.post(
//   "/product",
//   isAuthenticated,
//   upload.single("file"),
//   new CreateProductController().handle
// );

// router.get(
//   "/category/product",
//   isAuthenticated,
//   new ListByCategoryController().handle
// );

// //Rotas Order
// router.post("/order", isAuthenticated, new CreateOrderController().handle);
// router.delete("/order", isAuthenticated, new RemoveOrderController().handle);
// router.post("/order/add", isAuthenticated, new AddItemController().handle);
// router.delete(
//   "/order/remove",
//   isAuthenticated,
//   new RemoveItemController().handle
// );
// router.put("/order/send", isAuthenticated, new SendOrderController().handle);
// router.get("/orders", isAuthenticated, new ListOrderController().handle);
// router.get(
//   "/order/detail",
//   isAuthenticated,
//   new DetailOrderController().handle
// );
// router.put(
//   "/order/finish",
//   isAuthenticated,
//   new FinishOrderController().handle
// );

// export { router };
