import express, { Request, Response } from 'express'
import { Order, Product, OrdersModel } from '../../models/orders'
import { ModRequest } from '../../types/jwt'
import verifyToken from '../../middlewares/jwt'

const ord = express.Router()
const order = new OrdersModel();

// create order handler
ord.post('/', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        const {user_id, status} = req.body;
        if(!user_id || !status){
            return res.status(400).json({error: 'user_id and status required'})
        }
        if(user_id !== req.userId)
        {
            return res.status(401).json({error: 'token user_id and order user_id must match'})
        }
        const userOrder: Order = {user_id, status};
        const newOrder = await order.createOrder(userOrder);
        res.status(200).send(newOrder);
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
});

// add products to order handler
ord.post('/:id/products', verifyToken, async (req: Request, res: Response) => {
    try {
        const order_id = Number(req.params.id);
        const product_id = Number(req.body.product_id);
        if (!order_id || !product_id) {
            return res.status(400).send('id required for order and product');
        }
        // const p: Product = {order_id, product_id}
        const newProduct = await order.addProductToOrder(order_id, product_id);
        res.status(200).json(newProduct);
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
        
});

// show cart handler
ord.get('/:id/products', verifyToken, async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.id);
        if (!user_id) {
            return res.status(400).json('id required');
        }
        const showCart = await order.showCart(user_id);
        res.status(200).json(showCart);
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
});

// show active products in cart handler
ord.get('/:id/active_products', verifyToken, async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.id)
        if (!user_id) {
            return res.status(400).json('id required');
        }
        const active_products = await order.showCart(user_id)
        res.status(200).json(active_products)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// mark order complete handler
ord.post('/:id/complete', verifyToken, async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.id)
        if (!user_id) {
            return res.status(400).json('id required');
        }
        const order_id = Number(req.body.order_id)
        const mark_complete = await order.markComplete(order_id, user_id)
        res.status(200).json(mark_complete)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }

})

export default ord