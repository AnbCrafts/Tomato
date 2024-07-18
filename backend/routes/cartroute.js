import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cartController.js'
import authMddleware from '../middleware/auth.js';


const cartRouter = express.Router();


cartRouter.post('/add', authMddleware,addToCart)
cartRouter.post('/remove', authMddleware,removeFromCart)
cartRouter.post('/get', authMddleware,getCart)

export default cartRouter;


