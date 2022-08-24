import { Product, ProductModel } from "../../src/models/products";
import db from '../../src/database'

const newProduct = new ProductModel()
const product: Product = {
    name: 'iphone',
    price: 20000,
    category: 'electronics',
    quantity: 1
}

let prod: Product;

describe('Testing the products module', () => {

    it('Should have a create method', () => {
        expect(newProduct.create).toBeDefined()
    })

    it('Test the create method', async () => {
        prod = await newProduct.create(product)
        expect({name: product.name, price: product.price, category: product.category, quantity: product.quantity}).toEqual({
            name: prod.name,
            price: prod.price,
            category: prod.category,
            quantity: prod.quantity
        })
    })

    it('Should have an index method', () => {
        expect(newProduct.index).toBeDefined()
    })

    it('Test the index method', async () => {
        const p = await newProduct.index()
        expect(p).toContain(prod)
    })

    it('Should have a show method', () => {
        expect(newProduct).toBeDefined()
    })

    it('Test the show method', async () => {
        const findProduct = await newProduct.show(Number(prod.id))
        expect(findProduct).toEqual(prod)
    })

    afterAll(async () => {
        const connection = await db.connect()
        const sql = 
        'TRUNCATE products CASCADE; ALTER SEQUENCE products_id_seq RESTART WITH 1;'
        await connection.query(sql)
        connection.release()
    })
})