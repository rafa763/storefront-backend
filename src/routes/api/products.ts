import express, { Request, Response } from 'express'
import { Product, ProductModel } from '../../models/products'
import verifyToken from '../../middlewares/jwt'
import { ModRequest } from '../../types/jwt'

const prod = express.Router()
const product = new ProductModel()

// index handler 
prod.get('/', async (req: Request, res: Response) => {
    try {
        const products = await product.index()
        res.status(200).json(products)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// show handler
prod.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const prod = await product.show(id)
        res.status(200).json(prod)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// create handler
prod.post('/', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        if(!req.userId) {
            res.status(401).json({ error: 'No token provided'})
        }
        const {name, price, category, quantity} = req.body
        if(!name || !price || !quantity) {
            res.status(400).json({ error: 'name, price, and quantity required'})
        }
        const p: Product = {name, price, category, quantity}
        const prod = await product.create(p)
        res.status(200).json(prod)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// update handler
prod.put('/', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        if(!req.userId)
        {
            res.status(401).json({ error: 'No token provided'})
        }
        const {id, name, price, category, quantity} = req.body
        const updProd: Product =  {id, name, price, category, quantity}
        const p = await product.update(updProd)
        res.status(200).json(p)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// delete handler
prod.delete('/', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        const id = req.body.id 
        if(!req.userId) {
            res.status(401).json({ error: 'No token provided'})
        }
        const delProduct = await product.delete(Number(id))
        res.status(200).send(delProduct)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

export default prod