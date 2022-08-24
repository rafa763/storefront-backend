import { Order, Product, OrdersModel, Cart } from '../../src/models/orders'
import { User, UserModel } from '../../src/models/users'
import { Product as P, ProductModel } from '../../src/models/products'
import db from '../../src/database'


const newOrder = new OrdersModel()
const newUser = new UserModel()
const newProduct = new ProductModel()
const order: Order = {
    user_id: 1,
    status: 'active'
}

const product: Product = {
    order_id: 1,
    product_id: 1
}

const usr: User = {
    username: 'xxxraafat69',
    first_name: 'james',
    last_name: 'adam',
    password: 'dummy_pass'
}


let ord: Order;
let p: P;
let pp: Product;
let crt: Cart[];

describe('Testing the orders module', () => {

    beforeAll(async () => {
        const connection = await db.connect()
        const sql = 
        'DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1; DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1; DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1;'
        await connection.query(sql)
        connection.release()
        const u = await newUser.create(usr)
        p = await newProduct.create({
            name: 'iphone',
            price: 20,
            category: 'elec',
            quantity: 3
        })
    })
    
    it('Should have a create order method', () => {
        expect(newOrder.createOrder).toBeDefined()
    })

    it('Test the create order method', async () => {
        ord = await newOrder.createOrder(order)
        expect({ user_id: ord.user_id, status: ord.status }).toEqual({
            user_id: order.user_id,
            status: order.status
        })
    })

    it('Should have app product to order method', () => {
        expect(newOrder.addProductToOrder).toBeDefined()
    })

    it('Test add product to order method', async () => {
        pp = await newOrder.addProductToOrder(ord.id as number, p.id as number)
        expect({order_id: pp.order_id, product_id: pp.product_id}).toEqual({
            order_id: product.order_id,
            product_id: product.product_id
        })
    }) 

    it('Should have a show cart method', () => {
        expect(newOrder.showCart).toBeDefined
    })

    it('Test show cart method', async () => {
        crt = await newOrder.showCart(ord.user_id )
        expect({name: p.name, price: p.price, category: p.category, quantity: p.quantity}).toEqual({
            name: 'iphone', 
            price: 20, 
            category: 'elec', 
            quantity: 3
        })
    })

    afterAll(async () => {
        const connection = await db.connect()
        const sql = 
        'TRUNCATE orders CASCADE; ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
        await connection.query(sql)
        connection.release()
    })
})