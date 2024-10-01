import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { placeOrder,verifyOrder,userOrders, listOrders, updateStatus } from "../Controller/OrderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare,placeOrder);
orderRouter.post("/userorders",authMiddleWare,userOrders)
orderRouter.post('/verify',verifyOrder);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateStatus)

export default orderRouter;