import express from 'express'
import { addToCart, removeFromCart, getCart } from '../Controller/CartController.js'
import authMiddleWare from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleWare,addToCart)
cartRouter.delete('/remove',authMiddleWare,removeFromCart)
cartRouter.get('/get',authMiddleWare,getCart)

// cartRouter.get('/order',authMiddleWare,placeOrder)
export default cartRouter;